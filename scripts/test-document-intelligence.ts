import * as XLSX from "xlsx";
import JSZip from "jszip";
import {
  detectDocumentFormat,
  extractSpreadsheetToMarkdown,
  extractPptxToMarkdown,
  normalizeToMarkdown,
  chunkMarkdownDocument,
  retrieveRelevantMarkdownSections,
  calculateTokenOptimizationMetrics,
  preprocessDocumentToMarkdown,
} from "../src/lib/services/document-to-markdown";

async function runTests() {
  console.log("=== UNIVERSAL DOCUMENT INTELLIGENCE TEST SUITE ===\n");
  let passed = 0;
  let total = 0;

  function assert(desc: string, condition: boolean) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${desc}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${desc}`);
    }
  }

  // 1. Format Detection Tests
  console.log("--- 1. Format Detection Tests ---");

  // PDF
  const pdfBuffer = Buffer.from("%PDF-1.4 sample content for testing");
  const pdfDet = detectDocumentFormat(pdfBuffer, "cv.pdf");
  assert("Detects PDF magic header %PDF-", pdfDet.format === "pdf" && pdfDet.isSafe);

  // PNG
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00]);
  const pngDet = detectDocumentFormat(pngHeader, "architecture.png");
  assert("Detects PNG magic bytes", pngDet.format === "png" && pngDet.isSafe);

  // JPEG
  const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
  const jpegDet = detectDocumentFormat(jpegHeader, "screenshot.jpg");
  assert("Detects JPEG magic bytes", (jpegDet.format === "jpg" || jpegDet.format === "jpeg") && jpegDet.isSafe);

  // Dangerous Windows EXE
  const exeBuffer = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00]);
  const exeDet = detectDocumentFormat(exeBuffer, "malicious.exe");
  assert("Rejects Windows PE Executable", !exeDet.isSafe && Boolean(exeDet.error?.includes("Executable")));

  // Dangerous Script
  const scriptBuffer = Buffer.from("@echo off\ndel /f /q C:\\*.*");
  const scriptDet = detectDocumentFormat(scriptBuffer, "script.bat");
  assert("Rejects .bat executable script", !scriptDet.isSafe);

  // 2. Spreadsheet Extraction (XLSX / CSV)
  console.log("\n--- 2. Spreadsheet Parsing & Markdown Table Generation ---");
  const wb = XLSX.utils.book_new();
  const wsData = [
    ["Candidate", "Role", "Proficiency", "Years"],
    ["Alice", "AI Engineer", "Expert", 4],
    ["Bob", "DevOps Engineer", "Advanced", 3],
    ["Charlie", "Full-Stack Dev", "Intermediate", 2],
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Engineers");
  const xlsxBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const xlsxDet = detectDocumentFormat(xlsxBuffer, "candidates.xlsx");
  assert("Detects XLSX container", xlsxDet.format === "xlsx" && xlsxDet.isSafe);

  const xlsxMd = extractSpreadsheetToMarkdown(xlsxBuffer);
  assert("Extracts sheet header", xlsxMd.includes("### Sheet: Engineers"));
  assert("Formats candidate table row", xlsxMd.includes("| Alice | AI Engineer | Expert | 4 |"));
  assert("Formats markdown table divider", xlsxMd.includes("| --- | --- | --- | --- |"));

  // 3. Presentation Extraction (PPTX)
  console.log("\n--- 3. Presentation Parsing (PPTX) ---");
  const pptxZip = new JSZip();
  pptxZip.file(
    "ppt/slides/slide1.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
     <p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
       <p:cSld>
         <p:spTree>
           <p:sp><p:txBody><a:p><a:r><a:t>AI Engineering Career Roadmap</a:t></a:r></a:p></p:txBody></p:sp>
           <p:sp><p:txBody><a:p><a:r><a:t>Phase 1: Foundations of Machine Learning</a:t></a:r></a:p></p:txBody></p:sp>
         </p:spTree>
       </p:cSld>
     </p:sld>`
  );
  pptxZip.file(
    "ppt/slides/slide2.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
     <p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
       <p:cSld>
         <p:spTree>
           <p:sp><p:txBody><a:p><a:r><a:t>Phase 2: Large Language Models and RAG</a:t></a:r></a:p></p:txBody></p:sp>
         </p:spTree>
       </p:cSld>
     </p:sld>`
  );
  const pptxBuffer = await pptxZip.generateAsync({ type: "nodebuffer" });

  const pptxDet = detectDocumentFormat(pptxBuffer, "roadmap.pptx");
  assert("Detects PPTX container", pptxDet.format === "pptx" && pptxDet.isSafe);

  const pptxMd = await extractPptxToMarkdown(pptxBuffer);
  assert("Extracts Slide 1 heading", pptxMd.includes("### Slide 1"));
  assert("Extracts Slide 1 content", pptxMd.includes("AI Engineering Career Roadmap"));
  assert("Extracts Slide 2 heading", pptxMd.includes("### Slide 2"));
  assert("Extracts Slide 2 content", pptxMd.includes("Phase 2: Large Language Models and RAG"));

  // 4. Smart Document Chunking & Relevance Retrieval
  console.log("\n--- 4. Chunking & Query Relevance Retrieval ---");
  const longDocumentMd = `
# Engineering Career Handbook

## Overview
This document contains comprehensive career advice for engineering disciplines.

## Cloud & DevOps Specialization
Kubernetes orchestration, Docker containers, Linux fundamentals, and Terraform infrastructure as code are essential for DevOps roles. CI/CD pipelines automate testing and deployment.

## Machine Learning & AI Engineering
Deep learning frameworks like PyTorch and TensorFlow, transformer architectures, vector embeddings, retrieval-augmented generation (RAG), and model fine-tuning are critical skills.

## Cybersecurity
Network security, penetration testing, threat modeling, and cryptography protect digital assets against vulnerabilities.
`;

  const chunks = chunkMarkdownDocument(longDocumentMd, 100);
  assert("Chunks markdown into multiple logical sections", chunks.length >= 3);

  const devopsQuery = "What tools and skills do I need for Kubernetes and Docker?";
  const retrievedDevops = retrieveRelevantMarkdownSections(longDocumentMd, devopsQuery, 150);
  assert("Retrieves DevOps section for DevOps query", retrievedDevops.includes("Cloud & DevOps Specialization"));

  const aiQuery = "How does RAG and PyTorch work in AI Engineering?";
  const retrievedAi = retrieveRelevantMarkdownSections(longDocumentMd, aiQuery, 150);
  assert("Retrieves AI Engineering section for AI query", retrievedAi.includes("Machine Learning & AI Engineering"));

  // 5. Preprocessing Master Pipeline
  console.log("\n--- 5. Preprocessing Master Pipeline & Metrics ---");
  const textBuffer = Buffer.from(
    `## Technical Skills\n- Python\n- TypeScript\n- Next.js\n- PostgreSQL\n\n## Education\nBS in Computer Science (2025)`
  );
  const prepResult = await preprocessDocumentToMarkdown(textBuffer, "skills.md");
  assert("Preprocesses markdown file", prepResult.format === "md");
  assert("Computes SHA-256 hash", typeof prepResult.contentHash === "string" && prepResult.contentHash.length === 64);
  assert("Includes headings count", prepResult.headingsCount >= 2);
  assert("Calculates estimated tokens", prepResult.estimatedMarkdownTokens > 0);

  console.log(`\n========================================`);
  console.log(`Total tests: ${total} | Passed: ${passed} | Failed: ${total - passed}`);
  console.log(`========================================`);

  if (passed === total) {
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution error:", e);
  process.exit(1);
});
