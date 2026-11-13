import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import { processAndStoreChatAttachment } from "@/lib/services/chat-attachment-service";
import { checkChatUploadRateLimit } from "@/lib/server-rate-limit";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// Maximum upload size: 25 MB
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Disallowed executable extensions
const BLOCKED_EXTENSIONS = new Set([
  ".exe", ".bat", ".cmd", ".sh", ".bash", ".bin", ".msi", ".dll", ".so",
  ".dylib", ".vbs", ".js", ".mjs", ".cjs", ".scr", ".pif", ".com", ".ps1",
  ".jar", ".py", ".php", ".asp", ".aspx", ".cgi"
]);

/**
 * Validates document content via Magic Bytes to prevent spoofed MIME types
 */
function validateFileMagicBytes(buffer: Buffer, ext: string): { valid: boolean; detectedMime?: string } {
  if (buffer.length < 4) {
    return { valid: false };
  }

  // 1. Check for executable signatures (DOS MZ or Linux ELF) -> INSTANT REJECT
  if (buffer[0] === 0x4d && buffer[1] === 0x5a) {
    // 'MZ' DOS/Windows executable header
    return { valid: false };
  }
  if (buffer[0] === 0x7f && buffer[1] === 0x45 && buffer[2] === 0x4c && buffer[3] === 0x46) {
    // ELF executable header
    return { valid: false };
  }

  // 2. PDF: %PDF- (0x25 0x50 0x44 0x46 0x2D)
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    return { valid: true, detectedMime: "application/pdf" };
  }

  // 3. ZIP / DOCX / XLSX / PPTX: PK (0x50 0x4B 0x03 0x04 or 0x50 0x4B 0x05 0x06)
  if (
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07)
  ) {
    if (ext === ".docx") return { valid: true, detectedMime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
    if (ext === ".xlsx") return { valid: true, detectedMime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    if (ext === ".pptx") return { valid: true, detectedMime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" };
    return { valid: true, detectedMime: "application/zip" };
  }

  // 4. Legacy DOC / XLS / PPT: OLE Compound Document (0xD0 0xCF 0x11 0xE0)
  if (
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0
  ) {
    return { valid: true, detectedMime: "application/msword" };
  }

  // 5. Images: PNG (0x89 0x50 0x4E 0x47)
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, detectedMime: "image/png" };
  }

  // JPEG (0xFF 0xD8 0xFF)
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: "image/jpeg" };
  }

  // WEBP (RIFF....WEBP)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer.slice(8, 12).toString("ascii") === "WEBP"
  ) {
    return { valid: true, detectedMime: "image/webp" };
  }

  // 6. Text-based files (txt, md, csv, rtf, json)
  // Check for presence of null bytes (which indicate binary/malicious files)
  const isBinary = buffer.slice(0, Math.min(buffer.length, 1024)).includes(0x00);
  if (!isBinary && [".txt", ".md", ".csv", ".rtf", ".json"].includes(ext)) {
    return { valid: true, detectedMime: ext === ".json" ? "application/json" : "text/plain" };
  }

  return { valid: false };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user from Firebase Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid, missing, or expired authentication token" },
        { status: 401 }
      );
    }

    // 2. Server-side Rate Limiting: 5 uploads per 10 minutes per student
    const rateLimit = checkChatUploadRateLimit(user.uid);
    if (!rateLimit.allowed) {
      console.warn(`[API Chat Upload] User ${user.uid} exceeded chat upload rate limit. Retry in ${rateLimit.retryAfterSeconds}s.`);
      return NextResponse.json(
        {
          error: "Rate Limit Exceeded",
          message: "You have reached the upload limit. You can upload up to 5 documents every 10 minutes. Please try again later.",
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 3. Parse multipart form data
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { error: "Bad Request", message: "Expected multipart/form-data payload" },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const rawConversationId = formData.get("conversationId");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Bad Request", message: "No file attached to the request" },
        { status: 400 }
      );
    }

    const uploadedFile = file as File;

    if (uploadedFile.size === 0) {
      return NextResponse.json(
        { error: "Bad Request", message: "The uploaded file is empty (0 bytes)" },
        { status: 400 }
      );
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Payload Too Large", message: "File exceeds maximum allowed size (25MB)" },
        { status: 413 }
      );
    }

    // 4. Sanitize and validate filename & extension
    const originalName = uploadedFile.name || "document.pdf";
    const baseName = path.basename(originalName);
    const ext = path.extname(baseName).toLowerCase();

    if (BLOCKED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Unsupported Media Type", message: `Executable or script file type (${ext}) is not permitted.` },
        { status: 415 }
      );
    }

    const sanitizedFilename = baseName
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 150);

    // 5. Verify conversationId ownership if provided
    let verifiedConversationId: string | undefined = undefined;
    if (typeof rawConversationId === "string" && rawConversationId.trim()) {
      const trimmedConvId = rawConversationId.trim();
      if (!UUID_REGEX.test(trimmedConvId)) {
        return NextResponse.json(
          { error: "Bad Request", message: "Invalid conversationId format (must be a valid UUID)" },
          { status: 400 }
        );
      }

      if (isSupabaseAdminConfigured()) {
        const supabaseAdmin = getSupabaseAdminClient();
        const { data: conv, error: convErr } = await supabaseAdmin
          .from("chat_conversations")
          .select("id, firebase_uid")
          .eq("id", trimmedConvId)
          .maybeSingle();

        if (convErr || !conv) {
          return NextResponse.json(
            { error: "Not Found", message: "Associated conversation not found" },
            { status: 404 }
          );
        }

        if (conv.firebase_uid !== user.uid) {
          return NextResponse.json(
            { error: "Forbidden", message: "You do not have permission to attach files to this conversation" },
            { status: 403 }
          );
        }
        verifiedConversationId = conv.id;
      }
    }

    // 6. Inspect Magic Bytes of the uploaded file
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const magicCheck = validateFileMagicBytes(fileBuffer, ext);
    if (!magicCheck.valid) {
      return NextResponse.json(
        {
          error: "Unprocessable Entity",
          message: "File signature mismatch or unsupported binary format. Only valid documents (PDF, DOCX, TXT, MD, CSV) and images are accepted.",
        },
        { status: 422 }
      );
    }

    // 7. Process and store attachment safely
    const attachmentMeta = await processAndStoreChatAttachment({
      fileBuffer,
      filename: sanitizedFilename,
      mimeType: magicCheck.detectedMime || uploadedFile.type || "application/octet-stream",
      firebaseUid: user.uid,
      conversationId: verifiedConversationId,
    });

    return NextResponse.json({
      success: true,
      attachment: attachmentMeta,
    });
  } catch (err: any) {
    console.error("[API Chat Upload] Error processing upload:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to process and store file attachment. Please try again.",
      },
      { status: 500 }
    );
  }
}

