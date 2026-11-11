import { getGeminiClient } from "@/lib/gemini";
import {
  preprocessDocumentToMarkdown,
  DocumentPreprocessingResult,
} from "./document-to-markdown";

export interface ExtractedCvData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  branch: string;
  graduationYear: string;
  gpa: string;
  technicalSkills: string[];
  nonTechnicalSkills: string[];
  workExperience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    role?: string;
    duration?: string;
    githubUrl?: string;
    liveUrl?: string;
    achievements?: string[];
  }[];
  certifications: string[];
  achievements: string[];
  bio: string;
  githubProfileUrl?: string;
  _preprocessingMetrics?: {
    format: string;
    contentHash: string;
    rawSizeBytes: number;
    markdownSizeBytes: number;
    estimatedRawTokens: number;
    estimatedMarkdownTokens: number;
    tokenReductionPercentage: number;
    isScanned: boolean;
    headingsCount: number;
    listsCount: number;
    tablesCount: number;
  };
}

const EXTRACTION_SYSTEM_INSTRUCTION = `You are an elite, highly accurate AI CV and Resume extraction specialist for university students and professionals.
Your objective is to analyze the provided CV/Resume Markdown document and extract all personal, academic, skill, work experience, projects, certifications, and achievements.

CRITICAL RULES:
1. Extract data faithfully from the Markdown source.
2. If a specific field is not mentioned (e.g. GPA or Phone), provide an empty string "" or empty array [] rather than hallucinating.
3. Separate technical skills (programming languages, frameworks, cloud, databases) from non-technical skills (communication, agile, teamwork, leadership).
4. Extract all stated achievements, honors, and awards.
5. For projects, extract title, description, techStack, role, duration, githubUrl, liveUrl, and achievements. If a GitHub or live URL is not explicitly in the text, return "". DO NOT invent or fabricate URLs or project outcomes.
6. Output strictly valid JSON matching the requested schema.
7. Do not fabricate or infer skills or work experiences that are not explicitly stated.`;

/**
 * Extracts structured student profile information from raw file bytes using
 * local document-to-markdown preprocessing and Google Gemini AI.
 */
export async function extractCvContent(
  fileBuffer: Buffer,
  fileType: string,
  filename: string
): Promise<{
  extractedData: ExtractedCvData;
  preprocessing: DocumentPreprocessingResult;
}> {
  // Step 1: Preprocess document to clean Markdown locally
  const preprocessing = await preprocessDocumentToMarkdown(
    fileBuffer,
    filename,
    fileType
  );

  const ai = getGeminiClient();

  const promptText = `
Analyze this structured CV/Resume document and extract candidate details into this exact JSON schema:
{
  "fullName": string,
  "email": string,
  "phone": string,
  "university": string,
  "degree": string,
  "branch": string,
  "graduationYear": string,
  "gpa": string,
  "technicalSkills": string[],
  "nonTechnicalSkills": string[],
  "workExperience": [
    {
      "role": string,
      "company": string,
      "duration": string,
      "description": string
    }
  ],
  "projects": [
    {
      "title": string,
      "description": string,
      "techStack": string[],
      "role": string,
      "duration": string,
      "githubUrl": string,
      "liveUrl": string,
      "achievements": string[]
    }
  ],
  "certifications": string[],
  "achievements": string[],
  "bio": string
}
`;

  let parts: any[] = [];

  // Scanned PDF check: If no usable local text was found, use Gemini Multimodal OCR Fallback
  if (preprocessing.isScanned && preprocessing.format === "pdf") {
    console.log(
      `[CV Extractor] Scanned PDF detected (${filename}). Using Gemini Multimodal OCR fallback.`
    );
    parts = [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: fileBuffer.toString("base64"),
        },
      },
      {
        text: `This document is a scanned image/PDF without selectable text. Perform OCR and extract the information.\n\n${promptText}`,
      },
    ];
  } else {
    // Normal document: Send optimized clean Markdown directly to Gemini!
    // Large document chunking safeguard
    const safeMarkdown =
      preprocessing.markdown.length > 50000
        ? preprocessing.markdown.slice(0, 50000) + "\n\n...[Document Truncated at 50k chars]"
        : preprocessing.markdown;

    parts = [
      {
        text: `Below is the candidate's CV document converted to clean Markdown:\n\n---\n${safeMarkdown}\n---\n\n${promptText}`,
      },
    ];
  }

  const primaryModel = "gemini-2.0-flash";
  const fallbackModel = "gemini-1.5-flash";

  let parsed: ExtractedCvData | null = null;
  let lastError: any = null;

  // Phase 6: Error Handling & Retry Loop with Model Fallback
  // Try primary model (up to 3 attempts with progressive backoff for transient 503/429)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await ai.models.generateContent({
        model: primaryModel,
        contents: [{ role: "user", parts }],
        config: {
          systemInstruction: EXTRACTION_SYSTEM_INSTRUCTION,
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      });

      parsed = parseExtractionJson(res.text?.trim() || "");
      if (parsed) break;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      console.warn(
        `[CV Extractor] Attempt ${attempt} on ${primaryModel} failed (${status}):`,
        err?.message || err
      );

      // If it's a transient 503 high-demand spike or rate limit, back off and retry
      if (attempt < 3) {
        const backoffMs = attempt * 2000;
        console.log(`[CV Extractor] Waiting ${backoffMs}ms before attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    }
  }

  // If primary model failed, try fallback model
  if (!parsed) {
    console.warn(`[CV Extractor] Attempting fallback model: ${fallbackModel}`);
    try {
      const fallbackRes = await ai.models.generateContent({
        model: fallbackModel,
        contents: [{ role: "user", parts }],
        config: {
          systemInstruction: EXTRACTION_SYSTEM_INSTRUCTION,
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      });

      parsed = parseExtractionJson(fallbackRes.text?.trim() || "");
    } catch (fallbackErr: any) {
      console.error(
        `[CV Extractor] Fallback model (${fallbackModel}) failed:`,
        fallbackErr?.message || fallbackErr
      );
      lastError = fallbackErr;
    }
  }

  if (!parsed) {
    const errorMsg =
      lastError?.message || "Failed to extract CV information with Gemini AI";
    throw new Error(`Gemini Extraction Error: ${errorMsg}`);
  }

  // Auto-detect GitHub profile link from markdown if not extracted by LLM
  if (!parsed.githubProfileUrl) {
    const ghMatch = preprocessing.markdown.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
    if (ghMatch && ghMatch[1]) {
      const u = ghMatch[1].toLowerCase();
      if (!["topics", "explore", "about", "contact", "settings", "pricing", "features"].includes(u)) {
        parsed.githubProfileUrl = `https://github.com/${ghMatch[1]}`;
      }
    }
  }

  // Attach preprocessing metrics
  parsed._preprocessingMetrics = {
    format: preprocessing.format,
    contentHash: preprocessing.contentHash,
    rawSizeBytes: preprocessing.rawSizeBytes,
    markdownSizeBytes: preprocessing.markdownSizeBytes,
    estimatedRawTokens: preprocessing.estimatedRawTokens,
    estimatedMarkdownTokens: preprocessing.estimatedMarkdownTokens,
    tokenReductionPercentage: preprocessing.tokenReductionPercentage,
    isScanned: preprocessing.isScanned,
    headingsCount: preprocessing.headingsCount,
    listsCount: preprocessing.listsCount,
    tablesCount: preprocessing.tablesCount,
  };

  return {
    extractedData: parsed,
    preprocessing,
  };
}

function parseExtractionJson(raw: string): ExtractedCvData | null {
  try {
    let clean = raw.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```\s*/, "").replace(/```$/, "").trim();
    }

    const data = JSON.parse(clean);
    return {
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      university: data.university || "",
      degree: data.degree || "",
      branch: data.branch || "",
      graduationYear: String(data.graduationYear || ""),
      gpa: String(data.gpa || ""),
      technicalSkills: Array.isArray(data.technicalSkills)
        ? data.technicalSkills.map((s: any) => String(s).trim()).filter(Boolean)
        : [],
      nonTechnicalSkills: Array.isArray(data.nonTechnicalSkills)
        ? data.nonTechnicalSkills.map((s: any) => String(s).trim()).filter(Boolean)
        : [],
      workExperience: Array.isArray(data.workExperience)
        ? data.workExperience.map((w: any) => ({
            role: String(w.role || "").trim(),
            company: String(w.company || "").trim(),
            duration: String(w.duration || "").trim(),
            description: String(w.description || "").trim(),
          }))
        : [],
      projects: Array.isArray(data.projects)
        ? data.projects.map((p: any) => ({
            title: String(p.title || "").trim(),
            description: String(p.description || "").trim(),
            techStack: Array.isArray(p.techStack)
              ? p.techStack.map((t: any) => String(t).trim()).filter(Boolean)
              : [],
            role: String(p.role || "").trim(),
            duration: String(p.duration || "").trim(),
            githubUrl: String(p.githubUrl || "").trim(),
            liveUrl: String(p.liveUrl || "").trim(),
            achievements: Array.isArray(p.achievements)
              ? p.achievements.map((a: any) => String(a).trim()).filter(Boolean)
              : [],
          }))
        : [],
      certifications: Array.isArray(data.certifications)
        ? data.certifications.map((c: any) => String(c).trim()).filter(Boolean)
        : [],
      achievements: Array.isArray(data.achievements)
        ? data.achievements.map((a: any) => String(a).trim()).filter(Boolean)
        : [],
      bio: data.bio || "",
      githubProfileUrl: data.githubProfileUrl ? String(data.githubProfileUrl).trim() : "",
    };
  } catch (e) {
    console.warn("[CV Extractor] Failed to parse JSON:", e);
    return null;
  }
}
