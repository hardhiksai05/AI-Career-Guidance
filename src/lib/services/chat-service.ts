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

async function getFirebaseToken(): Promise<string | null> {
  try {
    const { auth } = await import("@/lib/firebase");
    if (!auth?.currentUser) return null;
    return await auth.currentUser.getIdToken();
  } catch {
    return null;
  }
}

/**
 * Fetch all active conversations for the authenticated user, sorted by last_message_at.
 * Uses secure server-side API /api/chat/conversations with fallback to Supabase client.
 */
export async function getConversations(firebaseUid: string): Promise<ChatConversation[]> {
  try {
    const token = await getFirebaseToken();
    if (token) {
      const res = await fetch("/api/chat/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.conversations)) {
          return data.conversations;
        }
      }
    }
  } catch (err) {
    console.warn("[ChatService] API fetch conversations failed, trying direct Supabase:", err);
  }

  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .eq("archived", false)
    .order("last_message_at", { ascending: false });

  if (error) {
    console.warn("[ChatService] Error fetching conversations from Supabase:", error);
    return [];
  }

  return data || [];
}

/**
 * Creates a new conversation.
 * Uses secure server-side API /api/chat/conversations with fallback to Supabase client.
 */
export async function createConversation(
  firebaseUid: string,
  title: string = "New Career Dialogue"
): Promise<ChatConversation> {
  try {
    const token = await getFirebaseToken();
    if (token) {
      const res = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.conversation?.id) {
          return data.conversation;
        }
      }
    }
  } catch (err) {
    console.warn("[ChatService] API create conversation failed, trying direct Supabase:", err);
  }

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
    console.warn("[ChatService] Error creating conversation in Supabase:", error);
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
  try {
    const token = await getFirebaseToken();
    if (token) {
      const res = await fetch("/api/chat/conversations", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId, title: title.trim() }),
      });
      if (res.ok) return;
    }
  } catch (err) {
    console.warn("[ChatService] API rename failed, trying direct Supabase:", err);
  }

  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("chat_conversations")
    .update({ title: title.trim(), updated_at: new Date().toISOString() })
    .eq("id", conversationId)
    .eq("firebase_uid", firebaseUid);

  if (error) {
    console.warn("[ChatService] Error renaming conversation:", error);
  }
}

/**
 * Deletes a conversation and its messages.
 */
export async function deleteConversation(
  conversationId: string,
  firebaseUid: string
): Promise<void> {
  try {
    const token = await getFirebaseToken();
    if (token) {
      const res = await fetch(`/api/chat/conversations?conversationId=${encodeURIComponent(conversationId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return;
    }
  } catch (err) {
    console.warn("[ChatService] API delete failed, trying direct Supabase:", err);
  }

  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("chat_conversations")
    .delete()
    .eq("id", conversationId)
    .eq("firebase_uid", firebaseUid);

  if (error) {
    console.warn("[ChatService] Error deleting conversation:", error);
  }
}

/**
 * Retrieves all messages for a specific conversation in chronological order.
 */
export async function getConversationMessages(
  conversationId: string,
  firebaseUid: string
): Promise<ChatMessageItem[]> {
  try {
    const token = await getFirebaseToken();
    if (token) {
      const res = await fetch(`/api/chat/conversations?conversationId=${encodeURIComponent(conversationId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          return data.messages;
        }
      }
    }
  } catch (err) {
    console.warn("[ChatService] API getConversationMessages failed, trying direct Supabase:", err);
  }

  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .eq("firebase_uid", firebaseUid)
    .order("created_at", { ascending: true });

  if (error) {
    console.warn("[ChatService] Error fetching messages from Supabase:", error);
    return [];
  }

  return data || [];
}

/**
 * Appends a user message to a conversation.
 */
export async function sendChatMessage(
  conversationId: string,
  firebaseUid: string,
  role: "user" | "assistant",
  content: string,
  metadata: Record<string, any> = {}
): Promise<ChatMessageItem> {
  if (role === "assistant") {
    return await saveAssistantReply(conversationId, content, metadata);
  }

  if (!isSupabaseConfigured()) {
    return {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      firebase_uid: firebaseUid,
      role: "user",
      content,
      metadata,
      created_at: new Date().toISOString(),
    };
  }

  const supabase = getSupabaseClient();

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
    console.warn("[ChatService] Warning sending user message via Supabase client:", error);
    return {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      firebase_uid: firebaseUid,
      role: "user",
      content,
      metadata,
      created_at: new Date().toISOString(),
    };
  }

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
 */
export async function saveAssistantReply(
  conversationId: string,
  content: string,
  metadata: Record<string, any> = {}
): Promise<ChatMessageItem> {
  const firebaseAuth = (await import("@/lib/firebase")).auth;
  const token = await firebaseAuth?.currentUser?.getIdToken();

  if (!token) {
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
    }
  } catch (apiErr) {
    console.warn("[ChatService] Network error calling /api/chat/assistant-reply:", apiErr);
  }

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
