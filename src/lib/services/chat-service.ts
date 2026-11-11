import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface ChatConversation {
  id: string;
  firebase_uid: string;
  title: string;
  archived: boolean;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessageItem {
  id: string;
  conversation_id: string;
  firebase_uid: string;
  role: "user" | "assistant";
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
}

/**
 * Fetch all active conversations for the authenticated user, sorted by last_message_at.
 */
export async function getConversations(firebaseUid: string): Promise<ChatConversation[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .eq("archived", false)
    .order("last_message_at", { ascending: false });

  if (error) {
    console.error("[ChatService] Error fetching conversations:", error);
    throw error;
  }

  return data || [];
}

/**
 * Creates a new conversation.
 */
export async function createConversation(
  firebaseUid: string,
  title: string = "New Career Conversation"
): Promise<ChatConversation> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = getSupabaseClient();

  let { data, error } = await supabase
    .from("chat_conversations")
    .insert({
      firebase_uid: firebaseUid,
      title: title.trim(),
    })
    .select()
    .single();

  // If foreign key constraint fails because profile record is missing, auto-create stub and retry
  if (error && (error.code === "23503" || error.message?.includes("foreign key"))) {
    try {
      const firebaseAuth = (await import("@/lib/firebase")).auth;
      const currentUser = firebaseAuth?.currentUser;
      await supabase.from("profiles").upsert(
        {
          firebase_uid: firebaseUid,
          email: currentUser?.email || "",
          full_name: currentUser?.displayName || null,
          profile_picture_url: currentUser?.photoURL || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firebase_uid" }
      );

      const retry = await supabase
        .from("chat_conversations")
        .insert({
          firebase_uid: firebaseUid,
          title: title.trim(),
        })
        .select()
        .single();

      if (!retry.error && retry.data) {
        return retry.data;
      }
      error = retry.error;
    } catch (e) {
      console.warn("[ChatService] Failed to auto-provision profile on retry:", e);
    }
  }

  if (error) {
    console.error("[ChatService] Error creating conversation:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  return data;
}

/**
 * Renames an existing conversation.
 */
export async function renameConversation(
  conversationId: string,
  title: string,
  firebaseUid: string
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("chat_conversations")
    .update({ title: title.trim(), updated_at: new Date().toISOString() })
    .eq("id", conversationId)
    .eq("firebase_uid", firebaseUid);

  if (error) {
    console.error("[ChatService] Error renaming conversation:", error);
    throw error;
  }
}

/**
 * Deletes a conversation and its messages.
 */
export async function deleteConversation(
  conversationId: string,
  firebaseUid: string
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("chat_conversations")
    .delete()
    .eq("id", conversationId)
    .eq("firebase_uid", firebaseUid);

  if (error) {
    console.error("[ChatService] Error deleting conversation:", error);
    throw error;
  }
}

/**
 * Retrieves all messages for a specific conversation in chronological order.
 */
export async function getConversationMessages(
  conversationId: string,
  firebaseUid: string
): Promise<ChatMessageItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .eq("firebase_uid", firebaseUid)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[ChatService] Error fetching messages:", error);
    throw error;
  }

  return data || [];
}

/**
 * Appends a user message to a conversation.
 * Strictly validated by RLS to role = 'user' and owned conversation.
 */
export async function sendChatMessage(
  conversationId: string,
  firebaseUid: string,
  role: "user" | "assistant",
  content: string,
  metadata: Record<string, any> = {}
): Promise<ChatMessageItem> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = getSupabaseClient();

  if (role === "assistant") {
    // Assistant messages must use the trusted server function or route
    return await saveAssistantReply(conversationId, content, metadata);
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      conversation_id: conversationId,
      firebase_uid: firebaseUid,
      role: "user",
      content,
      metadata,
    })
    .select()
    .single();

  if (error) {
    console.error("[ChatService] Error sending chat message:", error);
    throw error;
  }

  // Update conversation last_message_at
  await supabase
    .from("chat_conversations")
    .update({
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", conversationId)
    .eq("firebase_uid", firebaseUid);

  return data;
}

/**
 * Saves a trusted assistant reply into the conversation.
 * Migrated to secure server-side API route: POST /api/chat/assistant-reply.
 * Authenticates using Firebase ID Token; server verifies conversation ownership
 * before executing the privileged insert_verified_assistant_reply RPC via service_role.
 */
export async function saveAssistantReply(
  conversationId: string,
  content: string,
  metadata: Record<string, any> = {}
): Promise<ChatMessageItem> {
  const firebaseAuth = (await import("@/lib/firebase")).auth;
  const token = await firebaseAuth?.currentUser?.getIdToken();

  if (!token) {
    throw new Error("Unauthorized: User not authenticated in Firebase.");
  }

  try {
    const res = await fetch("/api/chat/assistant-reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversationId,
        content,
        metadata,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.message) {
        return data.message;
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.code === "SERVICE_ROLE_NOT_CONFIGURED") {
        console.warn("[ChatService] SUPABASE_SERVICE_ROLE_KEY pending in server configuration (.env.local).");
      } else {
        console.error("[ChatService] Server API error saving assistant reply:", errData);
      }
    }
  } catch (apiErr) {
    console.warn("[ChatService] Network error calling /api/chat/assistant-reply:", apiErr);
  }

  // Graceful fallback representation for UI continuity
  return {
    id: `assistant-${Date.now()}`,
    conversation_id: conversationId,
    firebase_uid: firebaseAuth?.currentUser?.uid || "",
    role: "assistant",
    content,
    metadata,
    created_at: new Date().toISOString(),
  };
}

