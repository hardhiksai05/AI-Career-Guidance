import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isGenericDialogueTitle(t?: string | null): boolean {
  if (!t) return true;
  const s = t.trim().toLowerCase();
  return (
    s === "new career dialogue" ||
    s === "new career conversation" ||
    s === "getting started with ai careers" ||
    s === "new conversation" ||
    s === "new chat" ||
    s === "career dialogue" ||
    s.startsWith("conv-")
  );
}

function formatConversationTitle(prompt: string): string {
  if (!prompt || typeof prompt !== "string") return "New Career Dialogue";

  let cleaned = prompt
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/[#*_~>\[\]\(\)\{\}\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "Career Consultation";

  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  const MAX_LEN = 45;
  if (cleaned.length > MAX_LEN) {
    const truncated = cleaned.slice(0, MAX_LEN);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 18) {
      cleaned = truncated.slice(0, lastSpace).trim() + "...";
    } else {
      cleaned = truncated.trim() + "...";
    }
  }

  return cleaned;
}

async function ensureUserProfile(supabaseAdmin: any, user: { uid: string; email?: string }) {
  try {
    const { data: existing } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("firebase_uid", user.uid)
      .maybeSingle();

    if (!existing) {
      await supabaseAdmin.from("profiles").upsert(
        {
          firebase_uid: user.uid,
          email: user.email || "",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firebase_uid" }
      );
    }
  } catch (err) {
    console.warn("[API chat/conversations] Profile check warning:", err);
  }
}

/**
 * GET /api/chat/conversations
 * Fetch conversations for authenticated user, or fetch messages for ?conversationId=xxx
 */
export async function GET(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid authentication token" },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { conversations: [], messages: [] },
        { status: 200 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");
    const rawLimit = parseInt(url.searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? rawLimit : 50, 1), 100);
    const beforeCursor = url.searchParams.get("before");

    // If conversationId is requested, return paginated messages for that conversation
    if (conversationId) {
      if (!UUID_REGEX.test(conversationId)) {
        return NextResponse.json({ messages: [], hasMore: false });
      }

      // Verify conversation ownership before returning messages
      const { data: conv } = await supabaseAdmin
        .from("chat_conversations")
        .select("id, firebase_uid")
        .eq("id", conversationId)
        .maybeSingle();

      if (!conv || conv.firebase_uid !== user.uid) {
        return NextResponse.json(
          { error: "Forbidden", message: "Conversation not accessible" },
          { status: 403 }
        );
      }

      // Build paginated query with selected columns only (no select("*"))
      let query = supabaseAdmin
        .from("chat_messages")
        .select("id, conversation_id, firebase_uid, role, content, metadata, created_at")
        .eq("conversation_id", conversationId)
        .eq("firebase_uid", user.uid);

      if (beforeCursor && !isNaN(new Date(beforeCursor).getTime())) {
        query = query.lt("created_at", beforeCursor);
      }

      // Order by created_at descending to get the latest messages up to limit
      const { data: messages, error } = await query
        .order("created_at", { ascending: false })
        .limit(limit + 1);

      if (error) {
        console.warn("[API chat/conversations] Messages fetch error:", error);
        return NextResponse.json({ messages: [], hasMore: false });
      }

      const rawList = messages || [];
      const hasMore = rawList.length > limit;
      const sliced = hasMore ? rawList.slice(0, limit) : rawList;

      // Reverse to return messages in chronological order (oldest to newest)
      const chronologicalMessages = [...sliced].reverse();

      return NextResponse.json({
        messages: chronologicalMessages,
        hasMore,
        nextCursor: hasMore ? sliced[sliced.length - 1]?.created_at : null,
      });
    }

    // Otherwise, return all conversations for the user with required columns only (no N+1 loop)
    await ensureUserProfile(supabaseAdmin, user);

    const { data: conversations, error } = await supabaseAdmin
      .from("chat_conversations")
      .select("id, firebase_uid, title, category, metadata, last_message_at, created_at, updated_at")
      .eq("firebase_uid", user.uid)
      .eq("archived", false)
      .order("last_message_at", { ascending: false })
      .limit(100);

    if (error) {
      console.warn("[API chat/conversations] Conversations fetch error:", error);
      return NextResponse.json({ conversations: [] });
    }

    return NextResponse.json({
      conversations: conversations || [],
    });
  } catch (error: any) {
    console.error("[API chat/conversations] GET error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch chat data" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chat/conversations
 * Create a new conversation securely on the server
 */
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid authentication token" },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      // Fallback local conversation
      const tempId = crypto.randomUUID();
      return NextResponse.json({
        conversation: {
          id: tempId,
          firebase_uid: user.uid,
          title: "New Career Dialogue",
          archived: false,
          last_message_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });
    }

    const body = await req.json().catch(() => ({}));
    const title = (body.title && typeof body.title === "string" ? body.title.trim() : "") || "New Career Dialogue";

    const supabaseAdmin = getSupabaseAdminClient();
    await ensureUserProfile(supabaseAdmin, user);

    const targetId = body.id && UUID_REGEX.test(body.id) ? body.id : crypto.randomUUID();

    const { data: conversation, error } = await supabaseAdmin
      .from("chat_conversations")
      .insert({
        id: targetId,
        firebase_uid: user.uid,
        title,
      })
      .select()
      .single();

    if (error) {
      console.error("[API chat/conversations] Insert error:", error);
      return NextResponse.json(
        { error: "Internal Server Error", message: "Failed to create conversation" },
        { status: 500 }
      );
    }

    return NextResponse.json({ conversation });
  } catch (error: any) {
    console.error("[API chat/conversations] POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to create conversation" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/chat/conversations
 * Rename an existing conversation
 */
export async function PATCH(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { conversationId, title } = body;

    if (!conversationId || !title || !UUID_REGEX.test(conversationId)) {
      return NextResponse.json({ error: "Bad Request", message: "Valid conversationId and title are required" }, { status: 400 });
    }

    const sanitizedTitle = String(title).trim().slice(0, 100);
    if (!sanitizedTitle) {
      return NextResponse.json({ error: "Bad Request", message: "Title cannot be empty" }, { status: 400 });
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json({ success: true });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { error } = await supabaseAdmin
      .from("chat_conversations")
      .update({ title: sanitizedTitle, updated_at: new Date().toISOString() })
      .eq("id", conversationId)
      .eq("firebase_uid", user.uid);

    if (error) {
      console.error("[API chat/conversations] PATCH error:", error);
      return NextResponse.json({ error: "Internal Server Error", message: "Failed to update conversation title" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[API chat/conversations] PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: "Failed to update conversation title" }, { status: 500 });
  }
}

/**
 * DELETE /api/chat/conversations
 * Delete a conversation
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");

    if (!conversationId || !UUID_REGEX.test(conversationId)) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json({ success: true });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { error } = await supabaseAdmin
      .from("chat_conversations")
      .delete()
      .eq("id", conversationId)
      .eq("firebase_uid", user.uid);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

