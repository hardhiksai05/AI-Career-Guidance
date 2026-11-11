import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import { processAndStoreChatAttachment } from "@/lib/services/chat-attachment-service";

export const dynamic = "force-dynamic";

// Maximum upload size: 25 MB
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user from Firebase Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid, missing, or expired authentication token" },
        { status: 401 }
      );
    }

    // 2. Parse multipart form data
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { error: "Bad Request: Expected multipart/form-data payload" },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const conversationId = formData.get("conversationId");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Bad Request: No file attached to the request" },
        { status: 400 }
      );
    }

    const uploadedFile = file as File;

    if (uploadedFile.size === 0) {
      return NextResponse.json(
        { error: "Bad Request: The uploaded file is empty (0 bytes)" },
        { status: 400 }
      );
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Payload Too Large: File exceeds maximum allowed size (25MB)" },
        { status: 413 }
      );
    }

    // 3. Convert file to buffer and process
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const attachmentMeta = await processAndStoreChatAttachment({
      fileBuffer,
      filename: uploadedFile.name || "document",
      mimeType: uploadedFile.type || undefined,
      firebaseUid: user.uid,
      conversationId: typeof conversationId === "string" ? conversationId : undefined,
    });

    return NextResponse.json({
      success: true,
      attachment: attachmentMeta,
    });
  } catch (err: any) {
    console.error("[API Chat Upload] Error processing upload:", err);
    return NextResponse.json(
      {
        error: err?.message || "Failed to process and store chat attachment",
      },
      { status: 500 }
    );
  }
}

