import { getGeminiClient, isGeminiConfigured } from "@/lib/gemini";
import { RawJobListing } from "./adzuna-service";

export interface ProcessedJobDetails {
  requiredSkills: string[];
  qualifications: string[];
  experienceLevel: string | null;
  descriptionSummary: string;
  responsibilities: string[];
  category: string;
  extractedWithModel?: string;
  usedAi: boolean;
}

const DEFAULT_GEMINI_JOB_MODEL = "gemini-2.5-flash-lite";

export function getJobProcessingModelName(): string {
  return process.env.GEMINI_JOB_MODEL?.trim() || DEFAULT_GEMINI_JOB_MODEL;
}

/**
 * Extracts skills, qualifications, responsibilities, and summary using Gemini 2.5 Flash-Lite.
 * Strict rule: Never asks Gemini to invent salary, company, location, or application URL.
 */
export async function processJobDescriptionWithGemini(
  job: RawJobListing
): Promise<ProcessedJobDetails> {
  const modelName = getJobProcessingModelName();

  if (!isGeminiConfigured()) {
    console.log("[GeminiJobProcessor] Gemini unconfigured, falling back to deterministic extraction.");
    return extractJobDetailsDeterministically(job);
  }

  try {
    const ai = getGeminiClient();

    const prompt = `
You are a precision Job Description Parser. Analyze the following job listing and extract structured technical metadata.

JOB TITLE: ${job.title}
COMPANY: ${job.company}
LOCATION: ${job.location}
RAW DESCRIPTION:
${job.description.slice(0, 3000)}

STRICT RULES:
1. Extract only what is explicitly stated or directly implied in the text.
2. DO NOT invent salaries, company info, locations, dates, or URLs.
3. If experience requirements are absent, return null.
4. "requiredSkills": Extract up to 8 core technical and professional skills as concise strings (e.g., ["Python", "Docker", "SQL", "Git"]).
5. "qualifications": Extract degree/education requirements (e.g., ["B.Tech in Computer Science or related engineering field"]).
6. "experienceLevel": Return "Entry-Level / Fresher", "Mid-Level (2-5 yrs)", "Senior (5+ yrs)", or null.
7. "descriptionSummary": A clear, informative 2-sentence summary of the job's core purpose.
8. "responsibilities": 3-4 bullet points of primary duties.
9. "category": Concise role category (e.g. "Software Engineering", "Data & AI", "Electronics", "Core Engineering").

OUTPUT FORMAT:
Return valid JSON adhering strictly to this schema:
{
  "requiredSkills": ["skill1", "skill2"],
  "qualifications": ["qual1"],
  "experienceLevel": "Entry-Level / Fresher" | null,
  "descriptionSummary": "Summary text...",
  "responsibilities": ["resp1", "resp2"],
  "category": "Category name"
}
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    clearTimeout(timeout);

    const text = response.text || "";
    const parsed = JSON.parse(text);

    return {
      requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills.filter(Boolean) : [],
      qualifications: Array.isArray(parsed.qualifications) ? parsed.qualifications.filter(Boolean) : [],
      experienceLevel: parsed.experienceLevel || deriveExperienceLevel(job.title, job.description),
      descriptionSummary: parsed.descriptionSummary || job.description.slice(0, 200) + "...",
      responsibilities: Array.isArray(parsed.responsibilities) ? parsed.responsibilities.filter(Boolean) : [],
      category: parsed.category || job.category || "Technology & Engineering",
      extractedWithModel: modelName,
      usedAi: true,
    };
  } catch (err: any) {
    console.warn(`[GeminiJobProcessor] Gemini (${modelName}) failed or timed out: ${err?.message}. Using deterministic fallback.`);
    return extractJobDetailsDeterministically(job);
  }
}

/**
 * Deterministic fallback that extracts skills and metadata using regex, keywords, and rule-based heuristics.
 * Zero AI credit consumption.
 */
export function extractJobDetailsDeterministically(job: RawJobListing): ProcessedJobDetails {
  const text = `${job.title} ${job.description}`.toLowerCase();

  const KNOWN_SKILLS = [
    "python", "javascript", "typescript", "react", "next.js", "node.js", "java", "c++", "c#",
    "sql", "postgresql", "mysql", "mongodb", "redis", "docker", "kubernetes", "aws", "azure", "gcp",
    "git", "linux", "html", "css", "tailwind", "rest api", "graphql", "machine learning", "pytorch",
    "tensorflow", "scikit-learn", "pandas", "numpy", "power bi", "tableau", "verilog", "systemverilog",
    "matlab", "simulink", "autocad", "solidworks", "ansys", "embedded c", "iot", "cybersecurity",
    "agile", "jira", "ci/cd", "figma"
  ];

  const matchedSkills: string[] = [];
  for (const skill of KNOWN_SKILLS) {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(text)) {
      // Capitalize nicely
      matchedSkills.push(capitalizeSkill(skill));
    }
  }

  // If no skills found, infer from title
  if (matchedSkills.length === 0) {
    matchedSkills.push("Problem Solving", "Engineering Principles", "Analytical Thinking");
  }

  const experienceLevel = deriveExperienceLevel(job.title, job.description);

  return {
    requiredSkills: matchedSkills.slice(0, 8),
    qualifications: ["B.Tech / B.E. in Engineering or equivalent technical degree"],
    experienceLevel,
    descriptionSummary: job.description.slice(0, 220).replace(/\s+/g, " ").trim() + (job.description.length > 220 ? "..." : ""),
    responsibilities: [
      `Collaborate with engineering teammates on ${job.title} deliverables.`,
      "Analyze requirements, debug issues, and execute test verifications.",
      "Participate in agile sprints, technical documentation, and quality code reviews."
    ],
    category: job.category || "Engineering & Technology",
    usedAi: false,
  };
}

function capitalizeSkill(skill: string): string {
  const map: Record<string, string> = {
    "next.js": "Next.js",
    "node.js": "Node.js",
    "c++": "C++",
    "c#": "C#",
    "sql": "SQL",
    "html": "HTML5",
    "css": "CSS3",
    "aws": "AWS",
    "gcp": "GCP",
    "ci/cd": "CI/CD",
    "rest api": "REST APIs",
    "ui/ux": "UI/UX",
    "vlsi": "VLSI",
    "iot": "IoT",
  };
  return map[skill] || skill.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function deriveExperienceLevel(title: string, desc: string): string {
  const combined = `${title} ${desc}`.toLowerCase();
  if (combined.includes("intern") || combined.includes("trainee") || combined.includes("graduate") || combined.includes("fresher") || combined.includes("entry level") || combined.includes("junior")) {
    return "Entry-Level / Fresher (0-2 yrs)";
  }
  if (combined.includes("lead") || combined.includes("architect") || combined.includes("principal") || combined.includes("senior") || combined.includes("sr.")) {
    return "Senior (5+ yrs)";
  }
  return "Mid-Level (2-5 yrs)";
}
