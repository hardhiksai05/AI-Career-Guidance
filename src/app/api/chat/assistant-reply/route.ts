import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_CONTENT_LENGTH = 15000; // 15 KB content ceiling
const MAX_METADATA_BYTES = 2048;  // Strict 2 KB metadata limit

interface SanitizedChatMetadata {
  model?: string;
  tokensUsed?: number | { promptTokens?: number; completionTokens?: number; totalTokens?: number };
  source?: string;
  finishReason?: string;
}

/**
 * Sanitizes chat metadata to strictly known keys and types, enforcing max 2KB size.
 */
function sanitizeChatMetadata(raw: any): SanitizedChatMetadata {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }

  const sanitized: SanitizedChatMetadata = {};

  // 1. model: string (max 100 chars)
  if (typeof raw.model === "string") {
    sanitized.model = raw.model.trim().slice(0, 100);
  }

  // 2. tokensUsed: number or structured object
  if (typeof raw.tokensUsed === "number" && Number.isFinite(raw.tokensUsed) && raw.tokensUsed >= 0) {
    sanitized.tokensUsed = Math.floor(raw.tokensUsed);
  } else if (raw.tokensUsed && typeof raw.tokensUsed === "object" && !Array.isArray(raw.tokensUsed)) {
    const obj: any = {};
    if (typeof raw.tokensUsed.promptTokens === "number") obj.promptTokens = Math.floor(raw.tokensUsed.promptTokens);
    if (typeof raw.tokensUsed.completionTokens === "number") obj.completionTokens = Math.floor(raw.tokensUsed.completionTokens);
    if (typeof raw.tokensUsed.totalTokens === "number") obj.totalTokens = Math.floor(raw.tokensUsed.totalTokens);
    sanitized.tokensUsed = obj;
  }

  // 3. source: string (max 50 chars)
  if (typeof raw.source === "string") {
    sanitized.source = raw.source.trim().slice(0, 50);
  }

  // 4. finishReason: string (max 50 chars)
  if (typeof raw.finishReason === "string") {
    sanitized.finishReason = raw.finishReason.trim().slice(0, 50);
  }

  // Check 2KB payload ceiling
  const serialized = JSON.stringify(sanitized);
  if (serialized.length > MAX_METADATA_BYTES) {
    return { model: sanitized.model, source: sanitized.source };
  }

  return sanitized;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Firebase user from Authorization Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid, missing, or expired authentication token" },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing request JSON payload" },
        { status: 400 }
      );
    }

    const { conversationId, content, metadata } = body;

    if (!conversationId || typeof conversationId !== "string" || !UUID_REGEX.test(conversationId.trim())) {
      return NextResponse.json(
        { error: "Bad Request", message: "A valid UUID conversationId is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Bad Request", message: "Message content is required" },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { error: "Bad Request", message: `Message content cannot exceed ${MAX_CONTENT_LENGTH} characters` },
        { status: 400 }
      );
    }

    // 3. Ensure server-side Supabase admin client is configured
    if (!isSupabaseAdminConfigured()) {
      console.error("[API assistant-reply] Supabase admin credentials not configured");
      return NextResponse.json(
        {
          error: "Service Unavailable",
          message: "Database service temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const cleanConvId = conversationId.trim();

    // 4. Strict IDOR Check: Conversation MUST exist and belong to the authenticated user
    const { data: conv, error: convErr } = await supabaseAdmin
      .from("chat_conversations")
      .select("id, firebase_uid")
      .eq("id", cleanConvId)
      .maybeSingle();

    if (convErr) {
      console.error("[API assistant-reply] Conversation query error:", convErr);
      return NextResponse.json(
        { error: "Internal Server Error", message: "Failed to verify conversation access." },
        { status: 500 }
      );
    }

    if (!conv) {
      return NextResponse.json(
        { error: "Not Found", message: "Conversation not found" },
        { status: 404 }
      );
    }

    if (conv.firebase_uid !== user.uid) {
      return NextResponse.json(
        { error: "Forbidden", message: "You do not have permission to access or write to this conversation" },
        { status: 403 }
      );
    }

    // 5. Sanitize metadata (strict key allowlist, max 2KB)
    const sanitizedMetadata = sanitizeChatMetadata(metadata);

    // 6. Execute privileged RPC function with verified UID or fallback to direct insert
    let messageData: any = null;
    const { data: message, error: rpcError } = await supabaseAdmin.rpc(
      "insert_verified_assistant_reply",
      {
        p_conversation_id: conv.id,
        p_content: trimmedContent,
        p_metadata: sanitizedMetadata,
        p_firebase_uid: user.uid,
      }
    );

    if (rpcError) {
      console.warn("[API assistant-reply] RPC fallback to direct insert:", rpcError);
      const { data: directMsg, error: insertError } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          conversation_id: conv.id,
          firebase_uid: user.uid,
          role: "assistant",
          content: trimmedContent,
          metadata: sanitizedMetadata,
        })
        .select()
        .single();

      if (insertError) {
        console.error("[API assistant-reply] Direct insert failed:", insertError);
        return NextResponse.json(
          { error: "Internal Server Error", message: "Failed to persist assistant reply" },
          { status: 500 }
        );
      }
      messageData = directMsg;
    } else {
      messageData = message;
    }

    return NextResponse.json({
      success: true,
      message: messageData,
    });
  } catch (error: any) {
    console.error("[API assistant-reply] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

