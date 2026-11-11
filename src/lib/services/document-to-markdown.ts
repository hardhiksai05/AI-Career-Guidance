import crypto from "crypto";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import JSZip from "jszip";

export type SupportedDocumentFormat =
  | "pdf"
  | "docx"
  | "doc"
  | "txt"
  | "rtf"
  | "md"
  | "xlsx"
  | "xls"
  | "csv"
  | "pptx"
  | "ppt"
  | "png"
  | "jpg"
  | "jpeg"
  | "webp";

export interface DocumentDetectionResult {
  format: SupportedDocumentFormat;
  mimeType: string;
  isSafe: boolean;
  error?: string;
}

export interface DocumentPreprocessingResult {
  markdown: string;
  rawText: string;
  format: SupportedDocumentFormat;
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
}

/**
 * PHASE 1: Format & Magic Bytes Detection
 * Inspects the actual binary signature of the file buffer rather than trusting file extension alone.
 */
export function detectDocumentFormat(
  buffer: Buffer,
  filename: string,
  providedMime?: string
): DocumentDetectionResult {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const len = buffer.length;

  if (len === 0) {
    return {
      format: "txt",
      mimeType: "text/plain",
      isSafe: false,
      error: "The uploaded file is empty (0 bytes).",
    };
  }

  // Reject dangerous executable headers
  if (len >= 2 && buffer[0] === 0x4d && buffer[1] === 0x5a) {
    // Windows PE / EXE
    return {
      format: "txt",
      mimeType: "application/octet-stream",
      isSafe: false,
      error: "Executable files (.exe/.dll) are rejected for security.",
    };
  }
  if (len >= 4 && buffer[0] === 0x7f && buffer[1] === 0x45 && buffer[2] === 0x4c && buffer[3] === 0x46) {
    // Linux ELF
    return {
      format: "txt",
      mimeType: "application/octet-stream",
      isSafe: false,
      error: "Executable ELF files are rejected for security.",
    };
  }

  // Reject script files disguised as text
  const dangerousExts = ["bat", "cmd", "sh", "bash", "ps1", "vbs", "jar", "pyc", "msi"];
  if (dangerousExts.includes(ext)) {
    return {
      format: "txt",
      mimeType: "application/octet-stream",
      isSafe: false,
      error: `Files with extension .${ext} are prohibited for security reasons.`,
    };
  }

  // 1. PDF: Starts with %PDF- (0x25 0x50 0x44 0x46)
  if (
    len >= 5 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    return { format: "pdf", mimeType: "application/pdf", isSafe: true };
  }

  // 2. Images:
  // PNG: \x89PNG\r\n\x1a\n (0x89 0x50 0x4E 0x47)
  if (
    len >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { format: "png", mimeType: "image/png", isSafe: true };
  }

  // JPEG / JPG: 0xFF 0xD8 0xFF
  if (
    len >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    const isJpg = ext === "jpg" || ext === "jpeg";
    return { format: isJpg && ext === "jpg" ? "jpg" : "jpeg", mimeType: "image/jpeg", isSafe: true };
  }

  // WEBP: Starts with RIFF (0x52 0x49 0x46 0x46) and bytes 8..11 are WEBP (0x57 0x45 0x42 0x50)
  if (
    len >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { format: "webp", mimeType: "image/webp", isSafe: true };
  }

  // 3. ZIP-based Office Open XML containers: Starts with PK\x03\x04 (0x50 0x4b 0x03 0x04)
  if (
    len >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  ) {
    const headerString = buffer.slice(0, Math.min(3000, len)).toString("binary");
    if (headerString.includes("word/") || ext === "docx") {
      return {
        format: "docx",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        isSafe: true,
      };
    }
    if (headerString.includes("xl/") || ext === "xlsx") {
      return {
        format: "xlsx",
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        isSafe: true,
      };
    }
    if (headerString.includes("ppt/") || ext === "pptx") {
      return {
        format: "pptx",
        mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        isSafe: true,
      };
    }
  }

  // 4. RTF: Starts with {\rtf (0x7B 0x5C 0x72 0x74 0x66)
  if (
    len >= 5 &&
    buffer[0] === 0x7b &&
    buffer[1] === 0x5c &&
    buffer[2] === 0x72 &&
    buffer[3] === 0x74 &&
    buffer[4] === 0x66
  ) {
    return { format: "rtf", mimeType: "application/rtf", isSafe: true };
  }

  // 5. Legacy OLE Compound Document (0xD0 0xCF 0x11 0xE0 0xA1 0xB1 0x1A 0xE1)
  if (
    len >= 8 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0 &&
    buffer[4] === 0xa1 &&
    buffer[5] === 0xb1 &&
    buffer[6] === 0x1a &&
    buffer[7] === 0xe1
  ) {
    if (ext === "xls") {
      return { format: "xls", mimeType: "application/vnd.ms-excel", isSafe: true };
    }
    if (ext === "ppt") {
      return { format: "ppt", mimeType: "application/vnd.ms-powerpoint", isSafe: true };
    }
    return { format: "doc", mimeType: "application/msword", isSafe: true };
  }

  // 6. Text-based formats: CSV, Markdown, TXT
  if (ext === "csv") {
    return { format: "csv", mimeType: "text/csv", isSafe: true };
  }
  if (ext === "md" || ext === "markdown") {
    return { format: "md", mimeType: "text/markdown", isSafe: true };
  }

  // Check if buffer contains null bytes (binary vs text)
  let nullBytes = 0;
  const sampleSize = Math.min(1024, len);
  for (let i = 0; i < sampleSize; i++) {
    if (buffer[i] === 0) nullBytes++;
  }

  if (nullBytes === 0 || ext === "txt") {
    return { format: "txt", mimeType: "text/plain", isSafe: true };
  }

  // Fallback check based on extension
  if (ext === "pdf") return { format: "pdf", mimeType: "application/pdf", isSafe: true };
  if (ext === "docx")
    return {
      format: "docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      isSafe: true,
    };
  if (ext === "doc") return { format: "doc", mimeType: "application/msword", isSafe: true };
  if (ext === "rtf") return { format: "rtf", mimeType: "application/rtf", isSafe: true };
  if (ext === "xlsx")
    return {
      format: "xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      isSafe: true,
    };
  if (ext === "xls") return { format: "xls", mimeType: "application/vnd.ms-excel", isSafe: true };
  if (ext === "pptx")
    return {
      format: "pptx",
      mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      isSafe: true,
    };
  if (ext === "ppt") return { format: "ppt", mimeType: "application/vnd.ms-powerpoint", isSafe: true };
  if (ext === "png") return { format: "png", mimeType: "image/png", isSafe: true };
  if (ext === "jpg" || ext === "jpeg") return { format: "jpeg", mimeType: "image/jpeg", isSafe: true };
  if (ext === "webp") return { format: "webp", mimeType: "image/webp", isSafe: true };

  return {
    format: "txt",
    mimeType: providedMime || "application/octet-stream",
    isSafe: false,
    error: `Unsupported file format (.${ext}). Supported formats: PDF, DOCX, DOC, TXT, RTF, MD, XLSX, XLS, CSV, PPTX, PPT, PNG, JPG, JPEG, WEBP.`,
  };
}

async function extractPdfText(buffer: Buffer): Promise<{ text: string; isScanned: boolean }> {
  let text = "";
  try {
    const pdfModule: any = await import("pdf-parse").then((m: any) => m?.default || m).catch(() => null);
    if (typeof pdfModule === "function") {
      const data = await pdfModule(buffer);
      text = data?.text || "";
    } else if (pdfModule?.PDFParse) {
      const parser = new pdfModule.PDFParse({ data: buffer });
      const result = await parser.getText();
      text = typeof result === "string" ? result : result?.text || "";
      if (typeof parser.destroy === "function") {
        await parser.destroy();
      }
    } else if (typeof pdfModule?.default === "function") {
      const data = await pdfModule.default(buffer);
      text = data?.text || "";
    }
  } catch (pdfErr: any) {
    console.warn("[DocumentToMarkdown] PDF parsing fallback:", pdfErr);
    return { text: "", isScanned: true };
  }

  const cleanChars = text.replace(/[^a-zA-Z0-9]/g, "").length;
  const isScanned = cleanChars < 45;
  return { text, isScanned };
}

/**
 * Converts Mammoth HTML output to well-structured markdown
 */
function convertMammothHtmlToText(html: string, fallbackText: string): string {
  try {
    let md = html;
    md = md.replace(/<h1>(.*?)<\/h1>/gi, "\n\n# $1\n\n");
    md = md.replace(/<h2>(.*?)<\/h2>/gi, "\n\n## $1\n\n");
    md = md.replace(/<h3>(.*?)<\/h3>/gi, "\n\n### $1\n\n");
    md = md.replace(/<h4>(.*?)<\/h4>/gi, "\n\n#### $1\n\n");

    md = md.replace(/<li><p>(.*?)<\/p><\/li>/gi, "- $1\n");
    md = md.replace(/<li>(.*?)<\/li>/gi, "- $1\n");
    md = md.replace(/<\/?(ul|ol)>/gi, "\n");

    md = md.replace(/<p>(.*?)<\/p>/gi, "$1\n\n");

    md = md.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<em>(.*?)<\/em>/gi, "*$1*");

    md = md.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

    md = md.replace(/<table>/gi, "\n\n");
    md = md.replace(/<\/table>/gi, "\n\n");
    md = md.replace(/<tr>/gi, "| ");
    md = md.replace(/<\/tr>/gi, " |\n");
    md = md.replace(/<t[hd]>(.*?)<\/t[hd]>/gi, "$1 | ");

    md = md.replace(/<[^>]+>/g, "");

    md = md
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");

    return md.trim() || fallbackText;
  } catch {
    return fallbackText;
  }
}

/**
 * Lightweight parser for RTF text content
 */
function parseRtfText(rtf: string): string {
  let text = rtf.replace(/\{\\*?\\[^{}]+;\}|[{}]|\\\n?[A-Za-z]+\b-?\d* ?/g, " ");
  text = text.replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  return text.trim();
}

/**
 * Safe text extractor for legacy .doc binary files
 */
function extractLegacyDocText(buffer: Buffer): string {
  const textChars: string[] = [];
  let inWord = false;
  let word: string[] = [];

  for (let i = 0; i < buffer.length; i++) {
    const code = buffer[i];
    if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
      word.push(String.fromCharCode(code));
      inWord = true;
    } else {
      if (inWord) {
        if (word.length >= 3) {
          textChars.push(word.join(""));
        }
        word = [];
        inWord = false;
      }
    }
  }
  if (word.length >= 3) textChars.push(word.join(""));
  return textChars.join(" ");
}

/**
 * Safe text extractor for spreadsheets: XLSX, XLS, CSV
 * Formats sheets into clean Markdown tables with sheet headers
 */
export function extractSpreadsheetToMarkdown(buffer: Buffer): string {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const parts: string[] = [];

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;

      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (!rows || rows.length === 0) continue;

      parts.push(`### Sheet: ${sheetName}\n`);

      const maxCols = Math.min(
        15,
        Math.max(...rows.map((r) => (Array.isArray(r) ? r.length : 0)))
      );
      if (maxCols === 0) continue;

      const displayRows = rows.slice(0, 100);

      const headerRow = displayRows[0] || [];
      const headerCols = Array.from({ length: maxCols }, (_, i) => {
        const val = headerRow[i];
        return val !== undefined && val !== null && String(val).trim() !== ""
          ? String(val).replace(/\|/g, "\\|").trim()
          : `Column ${i + 1}`;
      });

      parts.push(`| ${headerCols.join(" | ")} |`);
      parts.push(`| ${headerCols.map(() => "---").join(" | ")} |`);

      for (let r = 1; r < displayRows.length; r++) {
        const row = displayRows[r] || [];
        const cells = Array.from({ length: maxCols }, (_, i) => {
          const val = row[i];
          return val !== undefined && val !== null ? String(val).replace(/\|/g, "\\|").trim() : "";
        });
        parts.push(`| ${cells.join(" | ")} |`);
      }

      if (rows.length > 100) {
        parts.push(`\n*(Truncated: showing first 100 of ${rows.length} rows)*\n`);
      }
      parts.push("");
    }

    return parts.join("\n").trim() || "No tabular data found in spreadsheet.";
  } catch (err: any) {
    console.error("[DocumentToMarkdown] Spreadsheet extraction error:", err);
    return `Spreadsheet content could not be parsed: ${err?.message || "Unknown error"}`;
  }
}

/**
 * Text extractor for PowerPoint presentations (.pptx)
 * Unzips Office Open XML slides and extracts titles, bullets, and body content
 */
export async function extractPptxToMarkdown(buffer: Buffer): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    const slideEntries: { name: string; num: number; file: JSZip.JSZipObject }[] = [];

    zip.forEach((relativePath, zipEntry) => {
      const match = relativePath.match(/^ppt\/slides\/slide(\d+)\.xml$/i);
      if (match) {
        slideEntries.push({
          name: relativePath,
          num: parseInt(match[1], 10),
          file: zipEntry,
        });
      }
    });

    slideEntries.sort((a, b) => a.num - b.num);

    if (slideEntries.length === 0) {
      return "Presentation contains no readable slides.";
    }

    const slidesMd: string[] = [];

    for (const item of slideEntries) {
      const xml = await item.file.async("text");
      // Match text nodes <a:t>...</a:t>
      const textMatches = Array.from(xml.matchAll(/<a:t[^>]*>(.*?)<\/a:t>/gi)).map((m) => m[1]);
      if (textMatches.length > 0) {
        slidesMd.push(`### Slide ${item.num}`);
        const lines = textMatches
          .map((t) =>
            t
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .trim()
          )
          .filter(Boolean);

        for (const line of lines) {
          slidesMd.push(`- ${line}`);
        }
        slidesMd.push("");
      }
    }

    return slidesMd.join("\n").trim() || "No text found in presentation slides.";
  } catch (err: any) {
    console.error("[DocumentToMarkdown] PPTX extraction error:", err);
    return `Presentation content could not be parsed: ${err?.message || "Unknown error"}`;
  }
}

/**
 * Safe text extractor for legacy .ppt binary files
 */
function extractLegacyPptText(buffer: Buffer): string {
  const rawText = extractLegacyDocText(buffer);
  const segments = rawText.split(/\s{4,}/).filter((s) => s.trim().length > 3);
  const mdLines: string[] = ["### Presentation Slides (Extracted Content)"];
  for (const seg of segments) {
    mdLines.push(`- ${seg.trim()}`);
  }
  return mdLines.join("\n");
}

/**
 * Image OCR & Diagram Understanding via Google Gemini Vision
 * Analyzes uploaded screenshots, charts, diagrams, resumes, certificates, and invoices.
 */
export async function extractImageToMarkdown(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<string> {
  const { getGeminiClient } = await import("@/lib/gemini");
  const ai = getGeminiClient();

  const base64Data = buffer.toString("base64");
  const prompt = `You are a high-accuracy document intelligence and visual OCR specialist.
File: "${filename}".

Analyze this image and generate structured Markdown:
1. **Accurate Verbatim OCR:** Extract all readable text, headers, lists, numbers, and data points accurately.
2. **Visual & Architectural Diagram Analysis:**
   - If the image contains a workflow, architecture diagram, flow chart, system map, or infographic:
   - Provide a section: "### Visual & Diagram Structure"
   - Detail the entities, dependencies, data flow, and layers.
   - If appropriate, provide a clean, valid Mermaid flowchart (\`\`\`mermaid\\nflowchart TD\\n...\\n\`\`\`).
3. **Structured Format:** Organize the output using clear Markdown headings (##, ###), bullet points, and tables.

Return ONLY clean, well-formatted Markdown content. Do not wrap the entire output in outer markdown codeblocks.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            { text: prompt },
          ],
        },
      ],
    });

    const reply = response.text?.trim();
    if (!reply) {
      throw new Error("No text or visual description returned by vision model.");
    }
    return reply;
  } catch (err: any) {
    console.error(`[DocumentToMarkdown] Gemini Vision OCR failed for ${filename}:`, err);
    return `[Image OCR Note: Optical character recognition could not be completed automatically: ${
      err?.message || "Vision inference failed"
    }]`;
  }
}

/**
 * PHASE 2: Local Document Text & Structure Extraction
 */
async function extractRawDocumentText(
  buffer: Buffer,
  format: SupportedDocumentFormat,
  filename: string,
  mimeType: string
): Promise<{ text: string; isScanned: boolean }> {
  switch (format) {
    case "pdf": {
      const pdfRes = await extractPdfText(buffer);
      // If PDF is scanned, run Gemini OCR
      if (pdfRes.isScanned) {
        try {
          const ocrText = await extractImageToMarkdown(buffer, "application/pdf", filename);
          return { text: ocrText, isScanned: true };
        } catch {
          return pdfRes;
        }
      }
      return pdfRes;
    }

    case "docx": {
      const htmlResult = await mammoth.convertToHtml({ buffer });
      const rawResult = await mammoth.extractRawText({ buffer });

      let text = rawResult.value || "";
      if (htmlResult.value) {
        text = convertMammothHtmlToText(htmlResult.value, text);
      }
      return { text, isScanned: false };
    }

    case "rtf": {
      const text = parseRtfText(buffer.toString("utf8"));
      return { text, isScanned: false };
    }

    case "doc": {
      const text = extractLegacyDocText(buffer);
      return { text, isScanned: false };
    }

    case "xlsx":
    case "xls":
    case "csv": {
      const text = extractSpreadsheetToMarkdown(buffer);
      return { text, isScanned: false };
    }

    case "pptx": {
      const text = await extractPptxToMarkdown(buffer);
      return { text, isScanned: false };
    }

    case "ppt": {
      const text = extractLegacyPptText(buffer);
      return { text, isScanned: false };
    }

    case "png":
    case "jpg":
    case "jpeg":
    case "webp": {
      const text = await extractImageToMarkdown(buffer, mimeType, filename);
      return { text, isScanned: false };
    }

    case "md":
    case "txt":
    default: {
      const text = buffer.toString("utf8");
      return { text, isScanned: false };
    }
  }
}

/**
 * PHASE 3: Markdown Normalization
 * Standardizes headings, lists, tables, removes repeated headers/footers, and removes noise.
 */
export function normalizeToMarkdown(rawText: string): {
  markdown: string;
  headingsCount: number;
  listsCount: number;
  tablesCount: number;
} {
  const lines = rawText.split(/\r?\n/);
  const normalizedLines: string[] = [];
  let headingsCount = 0;
  let listsCount = 0;
  let tablesCount = 0;

  const sectionHeaderRegex =
    /^(summary|profile|bio|objective|experience|work experience|employment|education|academic background|skills|technical skills|key skills|non-technical skills|projects|academic projects|certifications|courses|achievements|honors|publications|contact|personal details|languages)[\s:]*$/i;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (normalizedLines.length > 0 && normalizedLines[normalizedLines.length - 1] !== "") {
        normalizedLines.push("");
      }
      continue;
    }

    // Filter out page footers like "Page 1 of 2", "Page 2/3", or lone page numbers
    if (/^(page\s+\d+(\s+of\s+\d+)?|\d+\s*\/\s*\d+|\bcurriculum\s+vitae\b)$/i.test(line)) {
      continue;
    }

    // Check if line is a table row (contains multiple pipes or tab separated values)
    if (line.includes("\t") && line.split("\t").length >= 2) {
      const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        tablesCount++;
        normalizedLines.push(`| ${parts.join(" | ")} |`);
        continue;
      }
    } else if (line.startsWith("|") && line.endsWith("|")) {
      tablesCount++;
      normalizedLines.push(line);
      continue;
    }

    // Check for Section Headings
    if (sectionHeaderRegex.test(line)) {
      headingsCount++;
      const formattedTitle = line.replace(/[:]/g, "").trim();
      normalizedLines.push("");
      normalizedLines.push(`## ${capitalizeWords(formattedTitle)}`);
      normalizedLines.push("");
      continue;
    }

    // Check for existing Markdown headings (# Heading)
    if (/^#{1,4}\s+/.test(line)) {
      headingsCount++;
      normalizedLines.push(line);
      continue;
    }

    // Check for bullet points (•, *, -, +, o)
    if (/^[•\*\-\+o]\s+/.test(line)) {
      listsCount++;
      const itemText = line.replace(/^[•\*\-\+o]\s+/, "").trim();
      normalizedLines.push(`- ${itemText}`);
      continue;
    }

    // Check for numbered lists (1. , 1) , [1])
    if (/^(\d+)[\.\)]\s+/.test(line)) {
      listsCount++;
      normalizedLines.push(line);
      continue;
    }

    // Key-value pairs (e.g. "Email: user@example.com", "Phone: +1 234 567")
    if (/^[A-Za-z\s]{2,20}:\s+[^\s]/.test(line)) {
      normalizedLines.push(`**${line.substring(0, line.indexOf(":"))}:** ${line.substring(line.indexOf(":") + 1).trim()}`);
      continue;
    }

    // Standard line
    normalizedLines.push(line);
  }

  const markdown = normalizedLines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { markdown, headingsCount, listsCount, tablesCount };
}

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * PHASE 4: Token Optimization Calculation
 */
export function calculateTokenOptimizationMetrics(
  rawBuffer: Buffer,
  rawText: string,
  normalizedMarkdown: string,
  format: SupportedDocumentFormat,
  isScanned: boolean
) {
  const rawSizeBytes = rawBuffer.length;
  const markdownSizeBytes = Buffer.byteLength(normalizedMarkdown, "utf8");

  let estimatedRawTokens = 0;
  if (format === "pdf" || format === "png" || format === "jpg" || format === "jpeg" || format === "webp") {
    estimatedRawTokens = Math.max(
      Math.round(rawSizeBytes / 3.2),
      Math.round(rawText.length / 3.8)
    );
  } else {
    estimatedRawTokens = Math.max(
      Math.round(rawSizeBytes / 4),
      Math.round(rawText.length / 3.8)
    );
  }

  const estimatedMarkdownTokens = Math.max(1, Math.round(normalizedMarkdown.length / 3.8));

  let tokenReductionPercentage = 0;
  if (estimatedRawTokens > estimatedMarkdownTokens) {
    tokenReductionPercentage = Math.round(
      ((estimatedRawTokens - estimatedMarkdownTokens) / estimatedRawTokens) * 100
    );
  }

  const contentHash = crypto.createHash("sha256").update(rawBuffer).digest("hex");

  return {
    rawSizeBytes,
    markdownSizeBytes,
    estimatedRawTokens,
    estimatedMarkdownTokens,
    tokenReductionPercentage,
    contentHash,
  };
}

/**
 * PHASE 5: Smart Document Chunking & Relevance Retrieval
 * Breaks large documents into coherent sections, computes semantic keyword relevance,
 * and passes only relevant chunks to Gemini to preserve tokens and prevent context overflow.
 */
export function chunkMarkdownDocument(
  markdown: string,
  maxChunkTokens = 600
): { title: string; content: string; estimatedTokens: number }[] {
  const lines = markdown.split(/\r?\n/);
  const chunks: { title: string; content: string; estimatedTokens: number }[] = [];

  let currentTitle = "Overview";
  let currentLines: string[] = [];

  function flushChunk() {
    if (currentLines.length === 0) return;
    const content = currentLines.join("\n").trim();
    if (content) {
      chunks.push({
        title: currentTitle,
        content,
        estimatedTokens: Math.max(1, Math.round(content.length / 3.8)),
      });
    }
    currentLines = [];
  }

  for (const line of lines) {
    // Detect major heading
    if (/^#{1,3}\s+(.+)/.test(line)) {
      const match = line.match(/^#{1,3}\s+(.+)/);
      const heading = match ? match[1].trim() : "Section";

      // If current chunk has substantial content, flush it
      const currentTokenEst = Math.round(currentLines.join("\n").length / 3.8);
      if (currentTokenEst >= maxChunkTokens / 2) {
        flushChunk();
        currentTitle = heading;
      } else {
        currentTitle = heading;
      }
    }

    currentLines.push(line);

    // If accumulated chunk exceeds maxChunkTokens, flush
    if (Math.round(currentLines.join("\n").length / 3.8) >= maxChunkTokens) {
      flushChunk();
    }
  }

  flushChunk();
  return chunks;
}

/**
 * Retrieves the most relevant chunks from document markdown based on query relevance.
 * If entire document is under maxBudgetTokens (e.g. 2500 tokens), returns all content.
 */
export function retrieveRelevantMarkdownSections(
  markdown: string,
  query: string,
  maxBudgetTokens = 2500
): string {
  const totalTokens = Math.round(markdown.length / 3.8);
  if (totalTokens <= maxBudgetTokens) {
    return markdown;
  }

  const chunks = chunkMarkdownDocument(markdown, 500);
  if (chunks.length <= 1) {
    return markdown.slice(0, maxBudgetTokens * 4);
  }

  // Extract keywords from query (excluding common stopwords)
  const stopwords = new Set([
    "the", "is", "at", "which", "on", "a", "an", "and", "or", "in", "for", "to", "of",
    "with", "as", "by", "from", "it", "this", "that", "what", "how", "can", "you", "tell", "me"
  ]);

  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopwords.has(w));

  // Score each chunk
  const scoredChunks = chunks.map((chunk, index) => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    for (const word of queryWords) {
      if (lowerTitle.includes(word)) score += 5; // Title match has high weight
      const occurrences = (lowerContent.match(new RegExp(`\\b${word}\\b`, "g")) || []).length;
      score += occurrences;
    }

    // Give a slight boost to initial overview section
    if (index === 0) score += 2;

    return { ...chunk, score, originalIndex: index };
  });

  // Sort by score descending
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top chunks until maxBudgetTokens
  const selected: typeof scoredChunks = [];
  let budgetRemaining = maxBudgetTokens;

  for (const chunk of scoredChunks) {
    if (budgetRemaining <= 150) break;
    if (chunk.estimatedTokens <= budgetRemaining) {
      selected.push(chunk);
      budgetRemaining -= chunk.estimatedTokens;
    } else {
      // Partially truncate chunk to fit budget
      const sliceLength = budgetRemaining * 4;
      selected.push({
        ...chunk,
        content: chunk.content.slice(0, sliceLength) + "\n\n*(Section truncated)*",
      });
      break;
    }
  }

  // Re-sort selected chunks by original document order for natural readability
  selected.sort((a, b) => a.originalIndex - b.originalIndex);

  return selected
    .map((c) => `### [Relevant Section: ${c.title}]\n${c.content}`)
    .join("\n\n---\n\n");
}

/**
 * Master Preprocessing Entrypoint:
 * Takes raw file buffer, validates format, extracts text locally (or via vision if image/scanned),
 * and standardizes to clean Markdown.
 */
export async function preprocessDocumentToMarkdown(
  fileBuffer: Buffer,
  filename: string,
  providedMime?: string
): Promise<DocumentPreprocessingResult> {
  // Phase 1: Format detection
  const detection = detectDocumentFormat(fileBuffer, filename, providedMime);
  if (!detection.isSafe || detection.error) {
    throw new Error(detection.error || "Unsupported or invalid file format.");
  }

  // Phase 2: Local document extraction (or Gemini Vision if image/scanned)
  const { text: rawText, isScanned } = await extractRawDocumentText(
    fileBuffer,
    detection.format,
    filename,
    detection.mimeType
  );

  // Phase 3: Markdown normalization
  const { markdown, headingsCount, listsCount, tablesCount } = normalizeToMarkdown(rawText);

  // Phase 4: Token metrics calculation
  const metrics = calculateTokenOptimizationMetrics(
    fileBuffer,
    rawText,
    markdown,
    detection.format,
    isScanned
  );

  return {
    markdown,
    rawText,
    format: detection.format,
    contentHash: metrics.contentHash,
    rawSizeBytes: metrics.rawSizeBytes,
    markdownSizeBytes: metrics.markdownSizeBytes,
    estimatedRawTokens: metrics.estimatedRawTokens,
    estimatedMarkdownTokens: metrics.estimatedMarkdownTokens,
    tokenReductionPercentage: metrics.tokenReductionPercentage,
    isScanned,
    headingsCount,
    listsCount,
    tablesCount,
  };
}
