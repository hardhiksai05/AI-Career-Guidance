import crypto from "crypto";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import {
  detectDocumentFormat,
  preprocessDocumentToMarkdown,
  retrieveRelevantMarkdownSections,
  SupportedDocumentFormat,
} from "./document-to-markdown";

export interface ChatAttachmentMeta {
  id: string;
  name: string;
  size: number;
  format: SupportedDocumentFormat;
  mimeType: string;
  storagePath: string;
  markdownStoragePath: string;
  contentHash: string;
  tokenReductionPercentage: number;
  estimatedMarkdownTokens: number;
  createdAt: string;
}

const STORAGE_BUCKET = "student-resumes";

const EXPANDED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/rtf",
  "application/json",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/jpg",
  "application/octet-stream",
];

let bucketConfigured = false;

async function ensureBucketAllowedMimeTypes(supabaseAdmin: any): Promise<void> {
  if (bucketConfigured) return;
  try {
    await supabaseAdmin.storage.updateBucket(STORAGE_BUCKET, {
      fileSizeLimit: 26214400, // 25MB
      allowedMimeTypes: EXPANDED_MIME_TYPES,
    });
    bucketConfigured = true;
  } catch (e) {
    console.warn("[ChatAttachmentService] updateBucket warning:", e);
  }
}

/**
 * Robust storage uploader with automatic MIME type self-healing and binary octet-stream fallback.
 */
async function safeUploadToStorage(
  supabaseAdmin: any,
  path: string,
  buffer: Buffer,
  contentType: string
): Promise<void> {
  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    const errMsg = error.message || "";
    if (errMsg.toLowerCase().includes("mime type") || errMsg.toLowerCase().includes("not supported")) {
      console.warn(
        `[ChatAttachmentService] Storage rejected MIME type "${contentType}". Attempting bucket config update and octet-stream fallback...`
      );
      await ensureBucketAllowedMimeTypes(supabaseAdmin);

      // Retry with application/octet-stream if restricted
      const retry = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, buffer, {
        contentType: "application/octet-stream",
        upsert: true,
      });

      if (retry.error) {
        throw new Error(`Failed to upload file to storage: ${retry.error.message}`);
      }
      return;
    }

    throw new Error(`Failed to upload file to storage: ${error.message}`);
  }
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 100);
}

/**
 * Stores and processes an uploaded chat attachment.
 * Universal pipeline: saves original in user-isolated storage, pre-processes to Markdown,
 * and caches normalized markdown for rapid, low-token retrieval.
 */
export async function processAndStoreChatAttachment(params: {
  fileBuffer: Buffer;
  filename: string;
  mimeType?: string;
  firebaseUid: string;
  conversationId?: string;
}): Promise<ChatAttachmentMeta> {
  const { fileBuffer, filename, mimeType, firebaseUid } = params;

  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase Admin client is not configured.");
  }

  const supabaseAdmin = getSupabaseAdminClient();
  const detection = detectDocumentFormat(fileBuffer, filename, mimeType);
  if (!detection.isSafe || detection.error) {
    throw new Error(detection.error || "Unsupported or dangerous file format.");
  }

  const attachmentId = crypto.randomUUID();
  const safeFilename = sanitizeFilename(filename);
  const storagePath = `${firebaseUid}/attachments/${attachmentId}/${safeFilename}`;
  const markdownStoragePath = `${firebaseUid}/attachments/${attachmentId}/normalized.md`;
  const metaStoragePath = `${firebaseUid}/attachments/${attachmentId}/meta.json`;

  // 1. Upload original document with robust MIME handling
  await safeUploadToStorage(supabaseAdmin, storagePath, fileBuffer, detection.mimeType);

  // 2. Preprocess to clean, standardized Markdown (local or vision)
  const preprocessResult = await preprocessDocumentToMarkdown(
    fileBuffer,
    safeFilename,
    detection.mimeType
  );

  // 3. Store normalized Markdown in storage cache alongside the file
  const markdownBuffer = Buffer.from(preprocessResult.markdown, "utf8");
  try {
    await safeUploadToStorage(
      supabaseAdmin,
      markdownStoragePath,
      markdownBuffer,
      "text/markdown; charset=utf-8"
    );
  } catch (mdErr) {
    console.warn("[ChatAttachmentService] Failed to cache normalized Markdown:", mdErr);
  }

  const meta: ChatAttachmentMeta = {
    id: attachmentId,
    name: safeFilename,
    size: fileBuffer.length,
    format: preprocessResult.format,
    mimeType: detection.mimeType,
    storagePath,
    markdownStoragePath,
    contentHash: preprocessResult.contentHash,
    tokenReductionPercentage: preprocessResult.tokenReductionPercentage,
    estimatedMarkdownTokens: preprocessResult.estimatedMarkdownTokens,
    createdAt: new Date().toISOString(),
  };

  // 4. Cache metadata
  try {
    await safeUploadToStorage(
      supabaseAdmin,
      metaStoragePath,
      Buffer.from(JSON.stringify(meta), "utf8"),
      "application/json"
    );
  } catch (metaErr) {
    console.warn("[ChatAttachmentService] Failed to cache metadata:", metaErr);
  }

  return meta;
}

/**
 * Retrieves normalized Markdown for a specific attachment, strictly validating user ownership.
 */
export async function getAttachmentMarkdown(
  attachmentId: string,
  firebaseUid: string
): Promise<{ meta: ChatAttachmentMeta | null; markdown: string } | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const supabaseAdmin = getSupabaseAdminClient();

  const markdownStoragePath = `${firebaseUid}/attachments/${attachmentId}/normalized.md`;
  const metaStoragePath = `${firebaseUid}/attachments/${attachmentId}/meta.json`;

  const [mdRes, metaRes] = await Promise.all([
    supabaseAdmin.storage.from(STORAGE_BUCKET).download(markdownStoragePath),
    supabaseAdmin.storage.from(STORAGE_BUCKET).download(metaStoragePath),
  ]);

  if (mdRes.error || !mdRes.data) {
    console.warn(`[ChatAttachmentService] Markdown not found for attachment ${attachmentId}:`, mdRes.error);
    return null;
  }

  const markdown = await mdRes.data.text();
  let meta: ChatAttachmentMeta | null = null;
  if (metaRes.data) {
    try {
      meta = JSON.parse(await metaRes.data.text());
    } catch {
      meta = null;
    }
  }

  return { meta, markdown };
}

/**
 * Retrieves and formats relevant context from all provided attachments.
 * Employs relevance chunk filtering to keep token usage minimal and avoid context window explosion.
 */
export async function getRelevantAttachmentContext(
  attachmentIds: string[],
  query: string,
  firebaseUid: string,
  maxTotalTokens = 3500
): Promise<string> {
  if (!attachmentIds || attachmentIds.length === 0) return "";

  const docs = await Promise.all(
    attachmentIds.slice(0, 5).map(async (id) => {
      const data = await getAttachmentMarkdown(id, firebaseUid);
      return data ? { id, ...data } : null;
    })
  );

  const validDocs = docs.filter(
    (d): d is { id: string; meta: ChatAttachmentMeta | null; markdown: string } => Boolean(d && d.markdown)
  );

  if (validDocs.length === 0) return "";

  const tokensPerDoc = Math.max(600, Math.floor(maxTotalTokens / validDocs.length));

  const sections: string[] = [];

  for (const doc of validDocs) {
    const docName = doc.meta?.name || `Attachment-${doc.id.slice(0, 8)}`;
    const docFormat = doc.meta?.format || "document";
    const filteredMd = retrieveRelevantMarkdownSections(doc.markdown, query, tokensPerDoc);

    sections.push(
      `--- ATTACHED DOCUMENT: "${docName}" (Format: ${docFormat.toUpperCase()}) ---
${filteredMd}`
    );
  }

  return `<uploaded_documents>
${sections.join("\n\n")}
</uploaded_documents>`;
}

