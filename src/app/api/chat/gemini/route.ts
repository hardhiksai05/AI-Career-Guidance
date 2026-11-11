import { NextRequest, NextResponse } from "next/server";
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
import { getRelevantAttachmentContext } from "@/lib/services/chat-attachment-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
      conversationId,
      message,
      stream = true,
      isRegenerate = false,
      clientHistory,
      attachmentIds,
      attachments,
    } = body;

    if (!conversationId || typeof conversationId !== "string") {
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

    // 3. Ensure server configuration
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

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          code: "SUPABASE_ADMIN_NOT_CONFIGURED",
          message: "SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
        },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 4. Verify conversation exists and strictly belongs to the verified user
    const { data: conv, error: convError } = await supabaseAdmin
      .from("chat_conversations")
      .select("id, firebase_uid, title")
      .eq("id", conversationId)
      .maybeSingle();

    if (convError || !conv) {
      return NextResponse.json(
        { error: "Not Found: Conversation not found or inaccessible" },
        { status: 404 }
      );
    }

    if (conv.firebase_uid !== user.uid) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this conversation" },
        { status: 403 }
      );
    }

    // 5. Retrieve Document Context if attachments are specified
    const validAttachmentIds = Array.isArray(attachmentIds)
      ? (attachmentIds.filter((id) => typeof id === "string" && id.trim().length > 0) as string[])
      : [];

    let documentContext = "";
    if (validAttachmentIds.length > 0) {
      try {
        documentContext = await getRelevantAttachmentContext(
          validAttachmentIds,
          trimmedMessage,
          user.uid
        );
      } catch (attErr) {
        console.warn("[API Gemini] Failed to retrieve attachment context:", attErr);
      }
    }

    // 6. Store the incoming user message (prevent duplicate on regenerate)
    let userMsgRecord: any = null;

    if (isRegenerate) {
      const { data: latestUserMsg } = await supabaseAdmin
        .from("chat_messages")
        .select("id, conversation_id, firebase_uid, role, content, created_at, metadata")
        .eq("conversation_id", conversationId)
        .eq("role", "user")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestUserMsg && latestUserMsg.content.trim() === trimmedMessage) {
        userMsgRecord = latestUserMsg;
      }
    }

    if (!userMsgRecord) {
      const { data: newRecord, error: userMsgError } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          firebase_uid: user.uid,
          role: "user",
          content: trimmedMessage,
          metadata: {
            client: "web-chatbot",
            attachments: Array.isArray(attachments) ? attachments : [],
            attachmentIds: validAttachmentIds,
          },
        })
        .select()
        .single();

      if (userMsgError) {
        console.error("[API Gemini] Failed to persist user message:", userMsgError);
        return NextResponse.json(
          { error: "Database Error: Failed to store user message" },
          { status: 500 }
        );
      }
      userMsgRecord = newRecord;
    }

    // 7. Build multi-turn context (prefer validated clientHistory if provided, else query Supabase most recent 10)
    let history: ChatHistoryMessage[] = [];

    if (Array.isArray(clientHistory) && clientHistory.length > 0) {
      // Validate and take the last 10 turns
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
    } else {
      // Fetch recent 10 messages from Supabase in reverse order, then flip to chronological
      const { data: historyRows } = await supabaseAdmin
        .from("chat_messages")
        .select("role, content, created_at")
        .eq("conversation_id", conversationId)
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

    // 7. Securely retrieve authenticated student's profile & career preferences from Supabase
    // Server-enforced using user.uid (never trusting arbitrary client-supplied profile data)
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

    const studentProfile = profileResult.data;
    const careerPrefs = prefsResult.data;

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

      const { data: assistantMsgRecord, error: rpcError } = await supabaseAdmin.rpc(
        "insert_verified_assistant_reply",
        {
          p_conversation_id: conversationId,
          p_firebase_uid: user.uid,
          p_content: aiResponseText,
          p_metadata: {
            model: "gemini-3.5-flash-lite",
            turns: history.length + 1,
            personalized: true,
            hasDocuments: Boolean(documentContext),
            attachmentsCount: validAttachmentIds.length,
            domains: studentContext.preferredDomains,
          },
        }
      );

      if (rpcError) {
        console.error("[API Gemini] RPC insert_verified_assistant_reply error:", rpcError);
        return NextResponse.json(
          { error: "Database Error: Failed to record assistant response" },
          { status: 500 }
        );
      }

      await supabaseAdmin
        .from("chat_conversations")
        .update({
          last_message_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId);

      return NextResponse.json({
        success: true,
        userMessage: {
          id: userMsgRecord.id,
          role: userMsgRecord.role,
          content: userMsgRecord.content,
          created_at: userMsgRecord.created_at,
        },
        assistantMessage: {
          id: assistantMsgRecord.id,
          role: assistantMsgRecord.role,
          content: assistantMsgRecord.content,
          created_at: assistantMsgRecord.created_at,
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
                conversationId,
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
            if (fullResponseText.trim()) {
              await supabaseAdmin.rpc("insert_verified_assistant_reply", {
                p_conversation_id: conversationId,
                p_firebase_uid: user.uid,
                p_content: `${fullResponseText}\n\n*[Response stopped by user]*`,
                p_metadata: {
                  model: "gemini-3.5-flash-lite",
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

          // Persist the full completed assistant reply using the verified RPC
          const { data: assistantMsgRecord, error: rpcError } = await supabaseAdmin.rpc(
            "insert_verified_assistant_reply",
            {
              p_conversation_id: conversationId,
              p_firebase_uid: user.uid,
              p_content: fullResponseText,
              p_metadata: {
                model: "gemini-3.5-flash-lite",
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
            console.error("[API Gemini Streaming] Failed to persist verified assistant reply:", rpcError);
          }

          // Update conversation timestamp
          await supabaseAdmin
            .from("chat_conversations")
            .update({
              last_message_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", conversationId);

          // Emit complete event with saved assistant message
          const savedMessage = assistantMsgRecord || {
            id: `msg-${Date.now()}`,
            role: "assistant",
            content: fullResponseText,
            created_at: new Date().toISOString(),
          };

          controller.enqueue(
            encoder.encode(
              `event: complete\ndata: ${JSON.stringify({
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
        Connection: "keep-alive",
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
