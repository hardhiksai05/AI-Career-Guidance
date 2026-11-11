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

    // If conversationId is requested, return messages for that conversation
    if (conversationId) {
      if (!UUID_REGEX.test(conversationId)) {
        return NextResponse.json({ messages: [] });
      }

      const { data: messages, error } = await supabaseAdmin
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .eq("firebase_uid", user.uid)
        .order("created_at", { ascending: true });

      if (error) {
        console.warn("[API chat/conversations] Messages fetch error:", error);
        return NextResponse.json({ messages: [] });
      }

      return NextResponse.json({ messages: messages || [] });
    }

    // Otherwise, return all conversations for the user
    await ensureUserProfile(supabaseAdmin, user);

    const { data: conversations, error } = await supabaseAdmin
      .from("chat_conversations")
      .select("*")
      .eq("firebase_uid", user.uid)
      .eq("archived", false)
      .order("last_message_at", { ascending: false });

    if (error) {
      console.warn("[API chat/conversations] Conversations fetch error:", error);
      return NextResponse.json({ conversations: [] });
    }

    const convList = conversations || [];

    // Automatically heal and rename generic conversations ("New Career Dialogue")
    // to the question the student actually asked in that dialogue!
    const genericConvs = convList.filter((c) => isGenericDialogueTitle(c.title));
    if (genericConvs.length > 0) {
      try {
        const genericIds = genericConvs.map((c) => c.id);
        const { data: userMsgs } = await supabaseAdmin
          .from("chat_messages")
          .select("conversation_id, content, created_at")
          .in("conversation_id", genericIds)
          .eq("role", "user")
          .order("created_at", { ascending: true });

        if (userMsgs && userMsgs.length > 0) {
          const firstPromptByConv: Record<string, string> = {};
          for (const msg of userMsgs) {
            if (!firstPromptByConv[msg.conversation_id] && msg.content?.trim()) {
              firstPromptByConv[msg.conversation_id] = msg.content.trim();
            }
          }

          for (const c of convList) {
            const firstPrompt = firstPromptByConv[c.id];
            if (firstPrompt && isGenericDialogueTitle(c.title)) {
              const updatedTitle = formatConversationTitle(firstPrompt);
              c.title = updatedTitle;
              // Persist update to Supabase
              supabaseAdmin
                .from("chat_conversations")
                .update({ title: updatedTitle, updated_at: new Date().toISOString() })
                .eq("id", c.id)
                .then(
                  () => {},
                  (err: any) => console.warn("[API conversations] Auto-update title warning:", err)
                );
            }
          }
        }
      } catch (autoRenameErr) {
        console.warn("[API conversations] Auto-rename resolution note:", autoRenameErr);
      }
    }

    return NextResponse.json({ conversations: convList });
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
        { error: "Failed to create conversation: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ conversation });
  } catch (error: any) {
    console.error("[API chat/conversations] POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create conversation" },
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
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json({ success: true });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { error } = await supabaseAdmin
      .from("chat_conversations")
      .update({ title: title.trim(), updated_at: new Date().toISOString() })
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

