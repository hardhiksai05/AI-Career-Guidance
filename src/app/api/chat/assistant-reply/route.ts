import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Firebase user from Authorization Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid, missing, or expired Firebase authentication token" },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Bad Request: Missing request JSON payload" },
        { status: 400 }
      );
    }

    const { conversationId, content, metadata } = body;

    if (!conversationId || typeof conversationId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: conversationId is required and must be a string" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Bad Request: content is required and cannot be empty" },
        { status: 400 }
      );
    }

    // 3. Ensure server-side Supabase admin client is configured
    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          code: "SERVICE_ROLE_NOT_CONFIGURED",
          message:
            "SUPABASE_SERVICE_ROLE_KEY is not configured in server environment variables. Please add your service_role secret from Supabase Dashboard -> Project Settings -> API to .env.local",
        },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 4. Verify conversation ownership before calling RPC
    const { data: conv, error: convError } = await supabaseAdmin
      .from("chat_conversations")
      .select("id, firebase_uid")
      .eq("id", conversationId)
      .maybeSingle();

    if (convError) {
      console.error("[API assistant-reply] Error checking conversation:", convError);
      return NextResponse.json(
        { error: "Internal Server Error: Failed to verify conversation ownership" },
        { status: 500 }
      );
    }

    if (!conv) {
      return NextResponse.json(
        { error: "Not Found: Conversation does not exist" },
        { status: 404 }
      );
    }

    // Strict ownership verification: authenticated user's UID must match conversation owner
    if (conv.firebase_uid !== user.uid) {
      return NextResponse.json(
        { error: "Forbidden: You do not have permission to access or write to this conversation" },
        { status: 403 }
      );
    }

    // 5. Execute privileged RPC function with verified UID
    const { data: message, error: rpcError } = await supabaseAdmin.rpc(
      "insert_verified_assistant_reply",
      {
        p_conversation_id: conversationId,
        p_content: content.trim(),
        p_metadata: metadata && typeof metadata === "object" ? metadata : {},
        p_firebase_uid: user.uid,
      }
    );

    if (rpcError) {
      console.error("[API assistant-reply] RPC execution error:", rpcError);
      return NextResponse.json(
        { error: "Internal Server Error", message: rpcError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error: any) {
    console.error("[API assistant-reply] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

