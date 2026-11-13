import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import {
  generateCareerAdvice,
  streamCareerAdvice,
  ChatHistoryMessage,
  StudentCareerContext,
  isGeminiConfigured,
} from "@/lib/gemini";
import { checkChatMessageRateLimit } from "@/lib/server-rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

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

async function ensureUserProfileExists(supabaseAdmin: any, user: { uid: string; email?: string }) {
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
    console.warn("[API Gemini] Note: ensureUserProfileExists warning:", err);
  }
}

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

    const {
      conversationId: rawConversationId,
      message,
      stream = true,
      isRegenerate = false,
      clientHistory,
      attachmentIds,
      attachments,
      title: requestedTitle,
    } = body;

    if (!rawConversationId || typeof rawConversationId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: conversationId is required and must be a string" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Bad Request: message is required and cannot be empty" },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 4000) {
      return NextResponse.json(
        { error: "Bad Request: message cannot exceed 4000 characters" },
        { status: 400 }
      );
    }

    // 3. Server-side Rate Limiting: 20 user message submissions per student per 2 minutes
    const rateLimit = checkChatMessageRateLimit(user.uid);
    if (!rateLimit.allowed) {
      console.warn(
        `[API Gemini] User ${user.uid} exceeded chatbot message rate limit. Cooldown remaining: ${rateLimit.retryAfterSeconds}s.`
      );
      return NextResponse.json(
        {
          error: "Rate Limit Exceeded",
          message:
            "You have reached the chatbot message limit. Please wait a moment before sending another message.",
          retryAfter: rateLimit.retryAfterSeconds,
          resetTimeMs: rateLimit.resetTimeMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 4. Ensure server configuration
    if (!isGeminiConfigured()) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          code: "GEMINI_NOT_CONFIGURED",
          message: "GEMINI_API_KEY is not configured in server environment variables.",
        },
        { status: 503 }
      );
    }

    const hasSupabaseAdmin = isSupabaseAdminConfigured();
    const supabaseAdmin = hasSupabaseAdmin ? getSupabaseAdminClient() : null;

    let resolvedConversationId = rawConversationId;
    let resolvedTitle: string | null = null;

    if (supabaseAdmin) {
      await ensureUserProfileExists(supabaseAdmin, user);

      const isRawValidUuid = UUID_REGEX.test(rawConversationId);

      if (isRawValidUuid) {
        const { data: conv } = await supabaseAdmin
          .from("chat_conversations")
          .select("id, firebase_uid, title")
          .eq("id", rawConversationId)
          .maybeSingle();

        const derivedTitleFromMsg = formatConversationTitle(trimmedMessage);
        const finalTitle =
          requestedTitle &&
          typeof requestedTitle === "string" &&
          !isGenericDialogueTitle(requestedTitle)
            ? requestedTitle.trim().slice(0, 100)
            : derivedTitleFromMsg;

        if (conv) {
          if (conv.firebase_uid !== user.uid) {
            return NextResponse.json(
              { error: "Forbidden: You do not own this conversation" },
              { status: 403 }
            );
          }
          resolvedConversationId = conv.id;
          resolvedTitle = conv.title;

          // If current conversation title is generic, update it with what the user asked!
          if (isGenericDialogueTitle(conv.title)) {
            await supabaseAdmin
              .from("chat_conversations")
              .update({
                title: finalTitle,
                updated_at: new Date().toISOString(),
              })
              .eq("id", conv.id);
            resolvedTitle = finalTitle;
          }
        } else {
          // Valid UUID but record doesn't exist yet: upsert it with the derived user question title
          const { data: newConv } = await supabaseAdmin
            .from("chat_conversations")
            .upsert(
              {
                id: rawConversationId,
                firebase_uid: user.uid,
                title: finalTitle,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "id" }
            )
            .select()
            .single();

          if (newConv?.id) {
            resolvedConversationId = newConv.id;
            resolvedTitle = newConv.title;
          }
        }
      } else {
        // Conversation ID is client-generated non-UUID string: auto-create UUID conversation
        const derivedTitleFromMsg = formatConversationTitle(trimmedMessage);
        const finalTitle =
          requestedTitle &&
          typeof requestedTitle === "string" &&
          !isGenericDialogueTitle(requestedTitle)
            ? requestedTitle.trim().slice(0, 100)
            : derivedTitleFromMsg;
        const newUuid = crypto.randomUUID();
        const { data: newConv } = await supabaseAdmin
          .from("chat_conversations")
          .insert({
            id: newUuid,
            firebase_uid: user.uid,
            title: finalTitle,
          })
          .select()
          .single();

        resolvedConversationId = newConv?.id || newUuid;
        resolvedTitle = newConv?.title || finalTitle;
      }
    }

    // 4. Retrieve Document Context if attachments are specified
    const validAttachmentIds = Array.isArray(attachmentIds)
      ? (attachmentIds.filter((id) => typeof id === "string" && id.trim().length > 0) as string[])
      : [];

    let documentContext = "";
    if (validAttachmentIds.length > 0) {
      try {
        const { getRelevantAttachmentContext } = await import(
          "@/lib/services/chat-attachment-service"
        );
        documentContext = await getRelevantAttachmentContext(
          validAttachmentIds,
          trimmedMessage,
          user.uid
        );
      } catch (attErr) {
        console.warn("[API Gemini] Failed to retrieve attachment context:", attErr);
      }
    }

    // 5. Store the incoming user message (prevent duplicate on regenerate)
    let userMsgRecord: any = null;

    if (supabaseAdmin) {
      if (isRegenerate) {
        const { data: latestUserMsg } = await supabaseAdmin
          .from("chat_messages")
          .select("id, conversation_id, firebase_uid, role, content, created_at, metadata")
          .eq("conversation_id", resolvedConversationId)
          .eq("role", "user")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestUserMsg && latestUserMsg.content.trim() === trimmedMessage) {
          userMsgRecord = latestUserMsg;
        }
      }

      if (!userMsgRecord) {
        const insertPayload = {
          conversation_id: resolvedConversationId,
          firebase_uid: user.uid,
          role: "user",
          content: trimmedMessage,
          metadata: {
            client: "web-chatbot",
            attachments: Array.isArray(attachments) ? attachments : [],
            attachmentIds: validAttachmentIds,
          },
        };

        let { data: newRecord, error: userMsgError } = await supabaseAdmin
          .from("chat_messages")
          .insert(insertPayload)
          .select()
          .single();

        if (userMsgError && (userMsgError.code === "23503" || userMsgError.message?.includes("foreign key"))) {
          // Re-ensure profile exists and retry
          await ensureUserProfileExists(supabaseAdmin, user);
          const retry = await supabaseAdmin
            .from("chat_messages")
            .insert(insertPayload)
            .select()
            .single();
          newRecord = retry.data;
          userMsgError = retry.error;
        }

        if (userMsgError) {
          console.warn("[API Gemini] Warning: Could not persist user message:", userMsgError);
        }

        userMsgRecord = newRecord || {
          id: `usr-${Date.now()}`,
          conversation_id: resolvedConversationId,
          firebase_uid: user.uid,
          role: "user",
          content: trimmedMessage,
          created_at: new Date().toISOString(),
        };
      }
    } else {
      userMsgRecord = {
        id: `usr-${Date.now()}`,
        conversation_id: resolvedConversationId,
        firebase_uid: user.uid,
        role: "user",
        content: trimmedMessage,
        created_at: new Date().toISOString(),
      };
    }

    // 6. Build multi-turn context
    let history: ChatHistoryMessage[] = [];

    if (Array.isArray(clientHistory) && clientHistory.length > 0) {
      history = clientHistory
        .filter(
          (m: any) =>
            m &&
            (m.role === "user" || m.role === "assistant" || m.sender === "user" || m.sender === "ai") &&
            typeof (m.content || m.text) === "string"
        )
        .slice(-10)
        .map((m: any) => ({
          role: (m.role === "assistant" || m.sender === "ai" ? "assistant" : "user") as "user" | "assistant",
          content: (m.content || m.text || "").slice(0, 2000),
        }));
    } else if (supabaseAdmin) {
      const { data: historyRows } = await supabaseAdmin
        .from("chat_messages")
        .select("role, content, created_at")
        .eq("conversation_id", resolvedConversationId)
        .neq("id", userMsgRecord.id)
        .order("created_at", { ascending: false })
        .limit(10);

      history = (historyRows || [])
        .reverse()
        .map((row) => ({
          role: row.role as "user" | "assistant",
          content: row.content,
        }));
    }

    // 7. Securely retrieve authenticated student's profile & career preferences
    let studentProfile: any = null;
    let careerPrefs: any = null;

    if (supabaseAdmin) {
      try {
        const [profileResult, prefsResult] = await Promise.all([
          supabaseAdmin
            .from("profiles")
            .select("full_name, email, university, degree, branch, graduation_year, gpa, bio")
            .eq("firebase_uid", user.uid)
            .maybeSingle(),
          supabaseAdmin
            .from("career_preferences")
            .select("preferred_domains, career_goals, target_skills, preferred_learning_style, preferred_locations, experience_level")
            .eq("firebase_uid", user.uid)
            .maybeSingle(),
        ]);
        studentProfile = profileResult.data;
        careerPrefs = prefsResult.data;
      } catch (ctxErr) {
        console.warn("[API Gemini] Note: student context query warning:", ctxErr);
      }
    }

    const studentContext: StudentCareerContext = {
      fullName: studentProfile?.full_name || null,
      email: studentProfile?.email || user.email || null,
      university: studentProfile?.university || null,
      degree: studentProfile?.degree || null,
      branch: studentProfile?.branch || null,
      graduationYear: studentProfile?.graduation_year || null,
      gpa: studentProfile?.gpa || null,
      bio: studentProfile?.bio || null,
      preferredDomains: careerPrefs?.preferred_domains || [],
      careerGoals: careerPrefs?.career_goals || null,
      targetSkills: careerPrefs?.target_skills || [],
      preferredLearningStyle: careerPrefs?.preferred_learning_style || null,
      preferredLocations: careerPrefs?.preferred_locations || [],
      experienceLevel: careerPrefs?.experience_level || null,
    };

    const wantsStream =
      stream !== false &&
      (req.headers.get("accept")?.includes("text/event-stream") || stream === true);

    // 8A. Standard Non-Streaming JSON Response (if explicitly requested with stream: false)
    if (!wantsStream) {
      const aiResponseText = await generateCareerAdvice(
        history,
        trimmedMessage,
        studentContext,
        documentContext
      );

      let assistantMsgRecord: any = null;

      if (supabaseAdmin) {
        const { data: rpcMsg, error: rpcError } = await supabaseAdmin.rpc(
          "insert_verified_assistant_reply",
          {
            p_conversation_id: resolvedConversationId,
            p_firebase_uid: user.uid,
            p_content: aiResponseText,
            p_metadata: {
              model: "gemini-3.1-flash-lite",
              turns: history.length + 1,
              personalized: true,
              hasDocuments: Boolean(documentContext),
              attachmentsCount: validAttachmentIds.length,
              domains: studentContext.preferredDomains,
            },
          }
        );

        if (rpcError) {
          console.warn("[API Gemini] RPC failed, falling back to direct insert:", rpcError);
          const { data: fallbackMsg } = await supabaseAdmin
            .from("chat_messages")
            .insert({
              conversation_id: resolvedConversationId,
              firebase_uid: user.uid,
              role: "assistant",
              content: aiResponseText,
              metadata: {
                model: "gemini-3.1-flash-lite",
                turns: history.length + 1,
              },
            })
            .select()
            .single();
          assistantMsgRecord = fallbackMsg;
        } else {
          assistantMsgRecord = rpcMsg;
        }

        await supabaseAdmin
          .from("chat_conversations")
          .update({
            last_message_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", resolvedConversationId);
      }

      return NextResponse.json({
        success: true,
        conversationId: resolvedConversationId,
        title: resolvedTitle,
        userMessage: {
          id: userMsgRecord.id,
          role: userMsgRecord.role,
          content: userMsgRecord.content,
          created_at: userMsgRecord.created_at,
        },
        assistantMessage: {
          id: assistantMsgRecord?.id || `msg-${Date.now()}`,
          role: "assistant",
          content: aiResponseText,
          created_at: assistantMsgRecord?.created_at || new Date().toISOString(),
        },
      });
    }

    // 8B. Real-Time Server-Sent Events (SSE) Streaming Response
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        let fullResponseText = "";

        try {
          // Emit initial start event with user message and context indicator
          controller.enqueue(
            encoder.encode(
              `event: start\ndata: ${JSON.stringify({
                userMessageId: userMsgRecord.id,
                conversationId: resolvedConversationId,
                title: resolvedTitle,
                personalized: true,
                studentMajor: studentContext.branch || studentContext.degree || null,
              })}\n\n`
            )
          );

          // Stream progressive chunks from Gemini with personalized and document context
          for await (const chunk of streamCareerAdvice(
            history,
            trimmedMessage,
            studentContext,
            documentContext
          )) {
            if (req.signal.aborted) {
              console.log("[API Gemini Streaming] Client aborted request mid-stream.");
              break;
            }
            if (chunk) {
              fullResponseText += chunk;
              controller.enqueue(
                encoder.encode(
                  `event: delta\ndata: ${JSON.stringify({ chunk })}\n\n`
                )
              );
            }
          }

          // If client cancelled generation early
          if (req.signal.aborted) {
            if (fullResponseText.trim() && supabaseAdmin) {
              await supabaseAdmin.from("chat_messages").insert({
                conversation_id: resolvedConversationId,
                firebase_uid: user.uid,
                role: "assistant",
                content: `${fullResponseText}\n\n*[Response stopped by user]*`,
                metadata: {
                  model: "gemini-3.1-flash-lite",
                  stoppedByUser: true,
                },
              });
            }
            return;
          }

          if (!fullResponseText.trim()) {
            fullResponseText =
              "I am here to guide your career exploration. Feel free to ask about software roles, skills, or learning roadmaps.";
          }

          let assistantMsgRecord: any = null;

          if (supabaseAdmin) {
            const { data: rpcMsg, error: rpcError } = await supabaseAdmin.rpc(
              "insert_verified_assistant_reply",
              {
                p_conversation_id: resolvedConversationId,
                p_firebase_uid: user.uid,
                p_content: fullResponseText,
                p_metadata: {
                  model: "gemini-3.1-flash-lite",
                  turns: history.length + 1,
                  streamed: true,
                  personalized: true,
                  hasDocuments: Boolean(documentContext),
                  attachmentsCount: validAttachmentIds.length,
                  domains: studentContext.preferredDomains,
                },
              }
            );

            if (rpcError) {
              console.warn("[API Gemini Streaming] RPC insert warning, falling back to direct insert:", rpcError);
              const { data: directMsg } = await supabaseAdmin
                .from("chat_messages")
                .insert({
                  conversation_id: resolvedConversationId,
                  firebase_uid: user.uid,
                  role: "assistant",
                  content: fullResponseText,
                  metadata: {
                    model: "gemini-3.1-flash-lite",
                    streamed: true,
                  },
                })
                .select()
                .single();
              assistantMsgRecord = directMsg;
            } else {
              assistantMsgRecord = rpcMsg;
            }

            await supabaseAdmin
              .from("chat_conversations")
              .update({
                last_message_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq("id", resolvedConversationId);
          }

          const savedMessage = assistantMsgRecord || {
            id: `msg-${Date.now()}`,
            role: "assistant",
            content: fullResponseText,
            created_at: new Date().toISOString(),
          };

          controller.enqueue(
            encoder.encode(
              `event: complete\ndata: ${JSON.stringify({
                conversationId: resolvedConversationId,
                title: resolvedTitle,
                assistantMessage: savedMessage,
              })}\n\n`
            )
          );
        } catch (streamErr: any) {
          console.error("[API Gemini Streaming] Error in stream generation:", streamErr);
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({
                error: streamErr?.message || "Failed to generate streaming response",
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.error("[API Gemini] Unhandled error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to process career mentorship dialogue",
      },
      { status: 500 }
    );
  }
}
