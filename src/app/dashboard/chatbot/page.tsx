/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  getConversations,
  createConversation,
  renameConversation,
  deleteConversation,
  getConversationMessages,
  sendChatMessage,
} from "@/lib/services/chat-service";
import { MarkdownRenderer } from "@/components/chatbot/MarkdownRenderer";
import { AIOrbLoader } from "@/components/ui/AIOrbLoader";
import {
  BotMessageSquare,
  Send,
  User,
  Plus,
  Search,
  MessageSquare,
  Edit2,
  Trash2,
  X,
  Check,
  AlertTriangle,
  PanelLeftClose,
  PanelLeft,
  Copy,
  RotateCcw,
  Square,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Sparkles,
  Compass,
  ArrowRight,
  Code2,
  Briefcase,
  Layers,
  Paperclip,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Presentation,
  FileCode,
  UploadCloud,
  Loader2,
} from "lucide-react";

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  format: string;
  mimeType: string;
  status: "uploading" | "ready" | "error";
  error?: string;
  file?: File;
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  feedback?: "like" | "dislike" | null;
  isError?: boolean;
  attachments?: {
    id: string;
    name: string;
    size: number;
    format: string;
    mimeType: string;
    previewUrl?: string;
  }[];
}

export interface ConversationWithMessages {
  id: string;
  title: string;
  updatedAt: Date;
  messages: ChatMessage[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileFormat(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return ext;
}

function getFileBadgeColor(format: string) {
  switch (format) {
    case "pdf":
      return { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" };
    case "docx":
    case "doc":
      return { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" };
    case "xlsx":
    case "xls":
    case "csv":
      return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
    case "pptx":
    case "ppt":
      return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" };
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" };
    case "md":
    case "txt":
    case "rtf":
    default:
      return { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" };
  }
}

function renderFileIcon(format: string, className = "w-4 h-4") {
  switch (format) {
    case "xlsx":
    case "xls":
    case "csv":
      return <FileSpreadsheet className={className} />;
    case "pptx":
    case "ppt":
      return <Presentation className={className} />;
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return <ImageIcon className={className} />;
    case "md":
      return <FileCode className={className} />;
    default:
      return <FileText className={className} />;
  }
}

function isGenericTitle(title?: string | null): boolean {
  if (!title) return true;
  const t = title.trim().toLowerCase();
  return (
    t === "new career dialogue" ||
    t === "new career conversation" ||
    t === "getting started with ai careers" ||
    t === "new conversation" ||
    t === "new chat" ||
    t === "career dialogue" ||
    t.startsWith("conv-")
  );
}

function formatConversationTitle(prompt: string): string {
  if (!prompt || typeof prompt !== "string") return "New Career Dialogue";

  // Clean markdown syntax, code snippets, urls, and brackets
  let cleaned = prompt
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/[#*_~>\[\]\(\)\{\}\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "Career Consultation";

  // Capitalize first character
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Truncate cleanly at word boundary to max ~42 characters
  const MAX_LEN = 42;
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

const CHATBOT_THINKING_STATUSES = [
  "Understanding your question...",
  "Preparing relevant information...",
  "Generating your response...",
];

function ChatbotThinkingIndicator() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % CHATBOT_THINKING_STATUSES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 py-2 px-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-midnight-card/60 to-cyan-950/30 border border-purple-500/20 backdrop-blur-md w-fit shadow-md shadow-purple-950/20">
      <AIOrbLoader size="sm" />
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-purple-200 flex items-center gap-1.5">
          <span>AI Career Mentor</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </span>
        <span className="text-[11px] text-slate-400 transition-all duration-300">
          {CHATBOT_THINKING_STATUSES[statusIndex]}
        </span>
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const initialParam = searchParams.get("query");
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  const [conversations, setConversations] = useState<ConversationWithMessages[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // File attachments state
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputDocRef = useRef<HTMLInputElement>(null);
  const fileInputImgRef = useRef<HTMLInputElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);

  // Requirement 2: Chat history hidden by default
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Rename state
  const [editingConvId, setEditingConvId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [convToDelete, setConvToDelete] = useState<ConversationWithMessages | null>(null);

  // Edit message state
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");

  // Copy feedback state
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Scroll to bottom tracking
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);

  // Textarea input auto-expand ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // AbortController for Stop Generation
  const abortControllerRef = useRef<AbortController | null>(null);
  const isSendingRef = useRef(false);

  // Helper to create a fresh in-memory conversation draft with welcoming AI mentor message
  const createFreshConversation = useCallback((): ConversationWithMessages => {
    const id =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `draft-${Date.now()}`;
    return {
      id,
      title: "New Career Dialogue",
      updatedAt: new Date(),
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: "ai",
          text: `Hello ${user?.displayName || "there"}! I am your AI Career Mentor. I can help you evaluate tech career trajectories, explore learning roadmaps, design portfolio projects, or prepare for technical interviews. What would you like to discuss today?`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };
  }, [user?.displayName]);

  // Select an existing conversation from history
  const selectConversation = (id: string) => {
    setActiveConvId(id);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("active_chatbot_conv_id", id);
    }
    setMobileSidebarOpen(false);
  };

  // 1. Initial Load: Fetch persistent conversations from Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadConversations() {
      if (!user) {
        setIsLoadingHistory(false);
        return;
      }

      setIsLoadingHistory(true);

      try {
        let convList: ConversationWithMessages[] = [];
        if (isConfigured) {
          const remoteConvs = await getConversations(user.uid);
          convList = remoteConvs.map((rc) => ({
            id: rc.id,
            title: rc.title,
            updatedAt: new Date(rc.last_message_at),
            messages: [],
          }));
        }

        if (isMounted) {
          // Check if user refreshed the page with an active conversation
          const savedActiveId =
            typeof window !== "undefined"
              ? sessionStorage.getItem("active_chatbot_conv_id")
              : null;
          const canRestore =
            savedActiveId && convList.some((c) => c.id === savedActiveId);

          if (canRestore && savedActiveId) {
            setConversations(convList);
            setActiveConvId(savedActiveId);

            // Load messages for the restored conversation
            const msgs = await getConversationMessages(savedActiveId, user.uid);
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id === savedActiveId) {
                  return {
                    ...c,
                    messages: msgs.map((m) => ({
                      id: m.id,
                      sender: m.role === "assistant" ? "ai" : "user",
                      text: m.content,
                      timestamp: new Date(m.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                      attachments: m.metadata?.attachments || [],
                    })),
                  };
                }
                return c;
              })
            );
          } else {
            // Fresh chat on navigation: zero duplicate DB records
            const freshConv = createFreshConversation();
            setConversations([freshConv, ...convList]);
            setActiveConvId(freshConv.id);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("active_chatbot_conv_id", freshConv.id);
            }
          }
        }
      } catch (err) {
        console.warn("[Chatbot] Error loading conversation history:", err);
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    }

    loadConversations();
    return () => {
      isMounted = false;
    };
  }, [user, isConfigured, createFreshConversation]);

  // 2. Load messages whenever active conversation changes (if not yet loaded)
  useEffect(() => {
    let isMounted = true;
    async function loadActiveMessages() {
      if (!user || !activeConvId || !isConfigured) return;
      const target = conversations.find((c) => c.id === activeConvId);
      if (target && target.messages.length > 0) return; // already loaded

      try {
        const msgs = await getConversationMessages(activeConvId, user.uid);
        if (isMounted && msgs.length > 0) {
          const firstUserMsg = msgs.find(
            (m) => m.role === "user" || (m as any).sender === "user"
          )?.content;

          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === activeConvId) {
                const autoTitle =
                  isGenericTitle(c.title) && firstUserMsg
                    ? formatConversationTitle(firstUserMsg)
                    : c.title;

                if (autoTitle !== c.title && user && isConfigured) {
                  renameConversation(activeConvId, autoTitle, user.uid).catch(() => {});
                }

                return {
                  ...c,
                  title: autoTitle,
                  messages: msgs.map((m) => ({
                    id: m.id,
                    sender: m.role === "assistant" ? "ai" : "user",
                    text: m.content,
                    timestamp: new Date(m.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    attachments: m.metadata?.attachments || [],
                  })),
                };
              }
              return c;
            })
          );
        }
      } catch (err) {
        console.warn("[Chatbot] Error fetching active messages:", err);
      }
    }

    loadActiveMessages();
    return () => {
      isMounted = false;
    };
  }, [activeConvId, user, isConfigured, conversations]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConvId) || conversations[0];
  }, [conversations, activeConvId]);

  // Handle URL query parameter if present
  useEffect(() => {
    if (initialParam && activeConversation && !isLoadingHistory) {
      handleSendMessage(initialParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialParam, isLoadingHistory]);

  // Autoscroll handler: only scrolls automatically if user has not scrolled upward
  useEffect(() => {
    if (!userScrolledUpRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [activeConversation?.messages, isTyping]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    userScrolledUpRef.current = !isNearBottom;
    setShowScrollBottom(!isNearBottom);
  };

  const scrollToBottom = () => {
    userScrolledUpRef.current = false;
    setShowScrollBottom(false);
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Close attachment menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target as Node)
      ) {
        setAttachmentMenuOpen(false);
      }
    }
    if (attachmentMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [attachmentMenuOpen]);

  // Handle Attachment Selection & Multi-File Preprocessing
  const handleFilesSelected = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setAttachmentMenuOpen(false);

    if (!user) {
      alert("Please sign in to upload and analyze documents with the AI Mentor.");
      return;
    }

    const fileList = Array.from(files);
    const newItems: AttachedFile[] = fileList.map((f) => ({
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      size: f.size,
      format: getFileFormat(f.name),
      mimeType: f.type,
      status: "uploading",
      file: f,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));

    setAttachedFiles((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      if (!item.file) continue;

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        if (activeConvId) {
          formData.append("conversationId", activeConvId);
        }

        const token = await user.getIdToken();
        const res = await fetch("/api/chat/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Upload and document preprocessing failed");
        }

        setAttachedFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  id: data.attachment.id,
                  format: data.attachment.format || f.format,
                  status: "ready",
                }
              : f
          )
        );
      } catch (err: any) {
        console.error("[Chatbot] Document upload error:", err);
        setAttachedFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: "error",
                  error: err?.message || "Failed to process file",
                }
              : f
          )
        );
      }
    }
  };

  // Textarea auto-expand
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !isStreaming && !isTyping) {
        handleSendMessage(inputText);
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  // Handle New Chat: creates a fresh in-memory draft without polluting the database with empty records
  const handleNewChat = () => {
    // If the active conversation is already an empty conversation (no user messages), keep it without creating duplicates
    if (activeConversation) {
      const userMsgs = activeConversation.messages.filter((m) => m.sender === "user");
      if (userMsgs.length === 0) {
        setSearchQuery("");
        setMobileSidebarOpen(false);
        return;
      }
    }

    const fresh = createFreshConversation();
    setConversations((prev) => [
      fresh,
      ...prev.filter(
        (c) => c.messages.some((m) => m.sender === "user") || c.id !== fresh.id
      ),
    ]);
    setActiveConvId(fresh.id);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("active_chatbot_conv_id", fresh.id);
    }
    setSearchQuery("");
    setMobileSidebarOpen(false);
  };

  // Stop Generation Handler
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    isSendingRef.current = false;
    setIsStreaming(false);
    setIsTyping(false);
  };

  // Core Send/Stream function
  const executeSendMessage = async (
    textToSend: string,
    targetConvId: string,
    customHistory?: ChatMessage[],
    isRegenerate: boolean = false,
    attachmentsToSend: AttachedFile[] = []
  ) => {
    const trimmed = textToSend.trim();
    if (!trimmed || !targetConvId || isSendingRef.current || isStreaming) return;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("active_chatbot_conv_id", targetConvId);
    }
    isSendingRef.current = true;

    const readyAttachments = attachmentsToSend.filter((f) => f.status === "ready");
    const attachmentIds = readyAttachments.map((f) => f.id);
    const attachmentsMeta = readyAttachments.map((f) => ({
      id: f.id,
      name: f.name,
      size: f.size,
      format: f.format,
      mimeType: f.mimeType,
      previewUrl: f.previewUrl,
    }));

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachments: attachmentsMeta.length > 0 ? attachmentsMeta : undefined,
    };

    const streamAssistantId = `stream-${Date.now()}`;
    const assistantPlaceholder: ChatMessage = {
      id: streamAssistantId,
      sender: "ai",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Determine if the conversation currently has a generic default title that should be renamed to the user's question
    const currentConv = conversations.find((c) => c.id === targetConvId);
    const shouldRename = currentConv ? isGenericTitle(currentConv.title) : true;
    const derivedTitle = shouldRename
      ? formatConversationTitle(trimmed)
      : (currentConv?.title || "New Career Dialogue");

    // Optimistically update conversation state
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === targetConvId) {
          const baseMessages = customHistory !== undefined ? customHistory : c.messages;
          return {
            ...c,
            title: shouldRename ? derivedTitle : c.title,
            updatedAt: new Date(),
            messages: [...baseMessages, userMsg, assistantPlaceholder],
          };
        }
        return c;
      })
    );

    // Sync title rename to database in the background
    if (shouldRename && user && isConfigured) {
      renameConversation(targetConvId, derivedTitle, user.uid).catch((err) =>
        console.warn("[Chatbot] Auto-rename background sync error:", err)
      );
    }

    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsTyping(true);
    setIsStreaming(true);

    if (user && isConfigured) {
      let accumulatedText = "";
      let firstChunkReceived = false;

      // Initialize AbortController for cancellation
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const token = await user.getIdToken();
        const baseHistory = customHistory !== undefined ? customHistory : (activeConversation?.messages || []);
        const historyPayload = baseHistory
          .filter((m) => m && m.text && !m.isError)
          .map((m) => ({
            role: m.sender === "ai" ? "assistant" : "user",
            content: m.text,
          }));

        let res = await fetch("/api/chat/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            conversationId: targetConvId,
            title: derivedTitle,
            message: trimmed,
            stream: true,
            isRegenerate,
            clientHistory: historyPayload,
            attachmentIds,
            attachments: attachmentsMeta,
          }),
          signal: controller.signal,
        });

        // Handle 429 rate limit immediately without retrying
        if (res.status === 429) {
          const errJson = await res.json().catch(() => ({}));
          const cooldownMsg = errJson.retryAfter
            ? `${errJson.message || "You have reached the chatbot message limit. Please wait a moment before sending another message."} (Cooldown: ${errJson.retryAfter}s remaining)`
            : errJson.message || "You have reached the chatbot message limit. Please wait a moment before sending another message.";

          setIsTyping(false);
          setIsStreaming(false);
          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === targetConvId) {
                return {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === streamAssistantId
                      ? {
                          ...m,
                          text: `⏳ **Message Limit Reached**\n\n${cooldownMsg}`,
                          isError: true,
                        }
                      : m
                  ),
                };
              }
              return c;
            })
          );
          showToast({
            type: "error",
            title: "Rate Limit Exceeded",
            description: cooldownMsg,
            duration: 6000,
          });
          return;
        }

        // Dual-tier fallback: if SSE streaming request is rejected or fails (and not 429), attempt standard JSON response
        if (!res.ok) {
          console.warn("[Chatbot] SSE streaming rejected (status " + res.status + "), falling back to non-streaming JSON...");
          res = await fetch("/api/chat/gemini", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              conversationId: targetConvId,
              title: derivedTitle,
              message: trimmed,
              stream: false,
              isRegenerate,
              clientHistory: historyPayload,
              attachmentIds,
              attachments: attachmentsMeta,
            }),
            signal: controller.signal,
          });

          if (res.ok) {
            const jsonResult = await res.json();
            const aiText = jsonResult.assistantMessage?.content || "No response received.";
            if (jsonResult.conversationId && jsonResult.conversationId !== targetConvId) {
              const newDbId = jsonResult.conversationId;
              setConversations((prev) =>
                prev.map((c) =>
                  c.id === targetConvId ? { ...c, id: newDbId } : c
                )
              );
              setActiveConvId(newDbId);
            }
            const finalJsonTitle =
              jsonResult.title && !isGenericTitle(jsonResult.title) ? jsonResult.title : null;
            if (finalJsonTitle) {
              setConversations((prev) =>
                prev.map((c) =>
                  c.id === targetConvId || c.id === jsonResult.conversationId
                    ? { ...c, title: finalJsonTitle }
                    : c
                )
              );
            }
            setIsTyping(false);
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id === targetConvId || c.id === jsonResult.conversationId) {
                  return {
                    ...c,
                    title: finalJsonTitle || (shouldRename ? derivedTitle : c.title),
                    updatedAt: new Date(),
                    messages: c.messages.map((m) =>
                      m.id === streamAssistantId
                        ? {
                            ...m,
                            id: jsonResult.assistantMessage?.id || m.id,
                            text: aiText,
                          }
                        : m
                    ),
                  };
                }
                return c;
              })
            );
            return;
          }
        }

        if (!res.ok) {
          let errorText = "";
          try {
            const raw = await res.text();
            try {
              const errJson = JSON.parse(raw);
              errorText = errJson.message || errJson.error || raw;
            } catch {
              errorText = raw;
            }
          } catch {
            errorText = `HTTP ${res.status}`;
          }
          throw new Error(errorText || `HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) {
          throw new Error("Streaming reader not supported or stream empty.");
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split("\n\n");
          buffer = blocks.pop() || "";

          for (const block of blocks) {
            if (!block.trim()) continue;

            const eventMatch = block.match(/^event:\s*(\w+)/m);
            const dataMatch = block.match(/^data:\s*(.+)$/m);
            const eventType = eventMatch ? eventMatch[1] : "delta";
            const dataRaw = dataMatch ? dataMatch[1] : null;

            if (eventType === "start" && dataRaw) {
              try {
                const parsed = JSON.parse(dataRaw);
                if (parsed.conversationId && parsed.conversationId !== targetConvId) {
                  const newDbId = parsed.conversationId;
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === targetConvId ? { ...c, id: newDbId } : c
                    )
                  );
                  setActiveConvId(newDbId);
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("active_chatbot_conv_id", newDbId);
                  }
                }
                if (parsed.title && !isGenericTitle(parsed.title)) {
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === targetConvId || c.id === parsed.conversationId
                        ? { ...c, title: parsed.title }
                        : c
                    )
                  );
                }
              } catch (e) {
                console.warn("[Chatbot Stream] Error parsing start event:", e);
              }
            } else if (eventType === "delta" && dataRaw) {
              try {
                const parsed = JSON.parse(dataRaw);
                if (parsed.chunk) {
                  accumulatedText += parsed.chunk;
                  if (!firstChunkReceived) {
                    firstChunkReceived = true;
                    setIsTyping(false);
                  }

                  setConversations((prev) =>
                    prev.map((c) => {
                      if (c.id === targetConvId) {
                        return {
                          ...c,
                          updatedAt: new Date(),
                          messages: c.messages.map((m) =>
                            m.id === streamAssistantId
                              ? { ...m, text: accumulatedText }
                              : m
                          ),
                        };
                      }
                      return c;
                    })
                  );
                }
              } catch (e) {
                console.warn("[Chatbot Stream] Error parsing delta chunk:", e);
              }
            } else if (eventType === "complete" && dataRaw) {
              try {
                const parsed = JSON.parse(dataRaw);
                if (parsed.conversationId && parsed.conversationId !== targetConvId) {
                  const newDbId = parsed.conversationId;
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === targetConvId ? { ...c, id: newDbId } : c
                    )
                  );
                  setActiveConvId(newDbId);
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("active_chatbot_conv_id", newDbId);
                  }
                }
                const finalTitleFromEvent =
                  parsed.title && !isGenericTitle(parsed.title) ? parsed.title : null;
                if (finalTitleFromEvent) {
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === targetConvId || c.id === parsed.conversationId
                        ? { ...c, title: finalTitleFromEvent }
                        : c
                    )
                  );
                }
                if (parsed.assistantMessage) {
                  const finalRecord = parsed.assistantMessage;
                  setConversations((prev) =>
                    prev.map((c) => {
                      if (c.id === targetConvId || c.id === parsed.conversationId) {
                        return {
                          ...c,
                          title: finalTitleFromEvent || (shouldRename ? derivedTitle : c.title),
                          updatedAt: new Date(),
                          messages: c.messages.map((m) =>
                            m.id === streamAssistantId
                              ? {
                                  ...m,
                                  id: finalRecord.id || m.id,
                                  text: finalRecord.content || accumulatedText,
                                }
                              : m
                          ),
                        };
                      }
                      return c;
                    })
                  );
                }
                if (parsed.persistenceFailed) {
                  showToast({
                    type: "warning",
                    title: "Cloud Sync Notice",
                    description: "Response generated successfully, but could not be saved to cloud history.",
                    duration: 4500,
                  });
                }
              } catch (e) {
                console.warn("[Chatbot Stream] Error parsing complete event:", e);
              }
            } else if (eventType === "error" && dataRaw) {
              try {
                const parsed = JSON.parse(dataRaw);
                if (parsed.warning) {
                  showToast({
                    type: "warning",
                    title: "History Sync Warning",
                    description: parsed.warning,
                    duration: 5000,
                  });
                  continue;
                }
                throw new Error(parsed.error || "Streaming generation failed");
              } catch (e: any) {
                throw e;
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("[Chatbot] Stream cancelled by user.");
          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === targetConvId) {
                return {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === streamAssistantId
                      ? {
                          ...m,
                          text: accumulatedText
                            ? `${accumulatedText}\n\n*[Response stopped by user]*`
                            : "*[Response stopped]*",
                        }
                      : m
                  ),
                };
              }
              return c;
            })
          );
        } else {
          console.error("[Chatbot] Gemini streaming error:", err);
          const errorContent = accumulatedText
            ? `${accumulatedText}\n\n⚠️ *Generation interrupted: ${err?.message || "Connection lost"}*`
            : `⚠️ **Unable to complete mentorship dialogue:** ${err?.message || "Gemini service temporarily unreachable"}. Please check your connection or retry in a moment.`;

          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === targetConvId) {
                return {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === streamAssistantId
                      ? { ...m, text: errorContent, isError: true }
                      : m
                  ),
                };
              }
              return c;
            })
          );
        }
      } finally {
        setIsTyping(false);
        setIsStreaming(false);
        isSendingRef.current = false;
        abortControllerRef.current = null;
      }
      return;
    }

    // Unauthenticated preview fallback
    setTimeout(() => {
      setIsTyping(false);
      setIsStreaming(false);
      isSendingRef.current = false;
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Please sign in with your student account to unlock real Gemini AI mentorship and save conversation history.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              updatedAt: new Date(),
              messages: [...c.messages, aiReply],
            };
          }
          return c;
        })
      );
    }, 600);
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversation || isStreaming || isSendingRef.current) return;
    const isStillUploading = attachedFiles.some((f) => f.status === "uploading");
    if (isStillUploading) {
      return;
    }
    const currentAttachments = [...attachedFiles];
    setAttachedFiles([]);
    executeSendMessage(text, activeConversation.id, undefined, false, currentAttachments);
  };

  // Regenerate Response (pass isRegenerate = true to prevent duplicate user message in Supabase)
  const handleRegenerate = async (lastUserText: string) => {
    if (!activeConversation || isStreaming || isSendingRef.current) return;
    // Remove the last assistant response from the thread
    const currentMsgs = activeConversation.messages;
    let slicedMsgs = currentMsgs;
    if (currentMsgs.length > 0 && currentMsgs[currentMsgs.length - 1].sender === "ai") {
      slicedMsgs = currentMsgs.slice(0, -1);
    }
    // Also remove the corresponding user message from UI list so it's re-added cleanly
    if (slicedMsgs.length > 0 && slicedMsgs[slicedMsgs.length - 1].sender === "user") {
      slicedMsgs = slicedMsgs.slice(0, -1);
    }
    executeSendMessage(lastUserText, activeConversation.id, slicedMsgs, true);
  };

  // Edit and Resend User Message
  const handleSaveAndResend = (msgIndex: number, newText: string) => {
    if (!activeConversation || !newText.trim() || isStreaming || isSendingRef.current) return;
    // Retain history up to (but not including) this user message
    const trimmedHistory = activeConversation.messages.slice(0, msgIndex);
    setEditingMessageId(null);
    executeSendMessage(newText, activeConversation.id, trimmedHistory, false);
  };

  // Copy Complete Message
  const handleCopyMessage = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(msgId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch {}
  };

  // Like / Dislike Feedback
  const handleFeedback = (msgId: string, type: "like" | "dislike") => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation?.id) {
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === msgId
                ? { ...m, feedback: m.feedback === type ? null : type }
                : m
            ),
          };
        }
        return c;
      })
    );
  };

  // Rename Conversation
  const startRename = (conv: ConversationWithMessages, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingConvId(conv.id);
    setRenameInput(conv.title);
  };

  const saveRename = async (convId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!renameInput.trim()) return;

    const trimmed = renameInput.trim();
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, title: trimmed } : c))
    );
    setEditingConvId(null);

    if (user && isConfigured) {
      try {
        await renameConversation(convId, trimmed, user.uid);
      } catch (err) {
        console.warn("[Chatbot] Rename persist error:", err);
      }
    }
  };

  // Delete Conversation
  const confirmDelete = (conv: ConversationWithMessages, e: React.MouseEvent) => {
    e.stopPropagation();
    setConvToDelete(conv);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!convToDelete) return;
    const delId = convToDelete.id;

    setConversations((prev) => prev.filter((c) => c.id !== delId));
    setDeleteModalOpen(false);
    setConvToDelete(null);

    if (activeConvId === delId) {
      const remaining = conversations.filter((c) => c.id !== delId);
      if (remaining.length > 0) {
        setActiveConvId(remaining[0].id);
      } else {
        handleNewChat();
      }
    }

    if (user && isConfigured) {
      try {
        await deleteConversation(delId, user.uid);
      } catch (err) {
        console.warn("[Chatbot] Delete persist error:", err);
      }
    }
  };

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return conversations;

    return conversations.filter((c) => {
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchMessage = c.messages.some((m) => m.text.toLowerCase().includes(q));
      return matchTitle || matchMessage;
    });
  }, [conversations, searchQuery]);

  // Grouping: Today, Yesterday, Previous 7 Days, Older
  const groupedConversations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yest = new Date(today);
    yest.setDate(yest.getDate() - 1);

    const sevenDays = new Date(today);
    sevenDays.setDate(sevenDays.getDate() - 7);

    const groups: {
      today: ConversationWithMessages[];
      yesterday: ConversationWithMessages[];
      previous7Days: ConversationWithMessages[];
      older: ConversationWithMessages[];
    } = {
      today: [],
      yesterday: [],
      previous7Days: [],
      older: [],
    };

    filteredConversations.forEach((c) => {
      const date = new Date(c.updatedAt);
      if (date >= today) {
        groups.today.push(c);
      } else if (date >= yest) {
        groups.yesterday.push(c);
      } else if (date >= sevenDays) {
        groups.previous7Days.push(c);
      } else {
        groups.older.push(c);
      }
    });

    return groups;
  }, [filteredConversations]);

  // Prompt Starter Cards for Empty State
  const emptyStateCards = [
    {
      icon: <Compass className="w-5 h-5 text-accent-cyan" />,
      title: "6-Month Cloud & DevOps Roadmap",
      description: "Breakdown of Linux, Docker, Kubernetes, Terraform & AWS certifications.",
      prompt: "Can you create a structured 6-month roadmap for transitioning into Cloud/DevOps Engineering from university computer science?",
    },
    {
      icon: <Code2 className="w-5 h-5 text-accent-purple-light" />,
      title: "FAANG Technical Interview Strategy",
      description: "Mastering LeetCode patterns, STAR behavioral framework & system design.",
      prompt: "How should I structure my technical and behavioral interview preparation for top tech summer internships?",
    },
    {
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack vs AI Engineering",
      description: "Comparison of career trajectories, compensation, and required foundational skills.",
      prompt: "Can you compare Full-Stack Development vs AI/ML Engineering in terms of career growth, day-to-day work, and skill requirements?",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      title: "Portfolio Project & Resume Audit",
      description: "3 resume-worthy production project ideas with modern tech stacks.",
      prompt: "Suggest 3 production-grade portfolio projects that demonstrate distributed systems, cloud architecture, or AI engineering to recruiters.",
    },
  ];

  return (
    <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden">
      {/* Main Chat Interface: Fits 100% Screen Height, Zero Outer Scroll */}
      <div className="flex-1 min-h-0 rounded-2xl sm:rounded-3xl bg-[#090d20] border border-white/10 flex overflow-hidden shadow-2xl relative h-full">
        {/* Desktop Left Sidebar: Hidden by default (Requirement 2) */}
        <div
          className={`${
            sidebarOpen ? "w-80 border-r border-white/10 opacity-100" : "w-0 border-none opacity-0 pointer-events-none"
          } transition-all duration-300 ease-in-out hidden sm:flex flex-col bg-[#070a18]/95 overflow-hidden shrink-0 z-20 h-full`}
        >
          {/* Sidebar Top: New Chat & Search Box */}
          <div className="p-3.5 space-y-2.5 border-b border-white/5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Conversations</span>
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Hide sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleNewChat}
              className="w-full justify-center shadow-sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Start New Dialogue
            </Button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Conversation List Scroll Area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-4">
            {isLoadingHistory ? (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
                <AIOrbLoader size="sm" />
                <p className="text-xs text-slate-400 font-medium">Syncing conversations...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-2">
                <p className="text-xs font-semibold text-slate-300">No matching conversations</p>
                <p className="text-[11px] text-slate-500">
                  No records match &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-accent-cyan hover:underline font-medium"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <>
                {/* Today */}
                {groupedConversations.today.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">
                      Today
                    </span>
                    <div className="space-y-1">
                      {groupedConversations.today.map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conv={conv}
                          isActive={conv.id === activeConvId}
                          isEditing={editingConvId === conv.id}
                          renameInput={renameInput}
                          setRenameInput={setRenameInput}
                          onSelect={() => selectConversation(conv.id)}
                          onStartRename={(e) => startRename(conv, e)}
                          onSaveRename={(e) => saveRename(conv.id, e)}
                          onCancelRename={() => setEditingConvId(null)}
                          onConfirmDelete={(e) => confirmDelete(conv, e)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Yesterday */}
                {groupedConversations.yesterday.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">
                      Yesterday
                    </span>
                    <div className="space-y-1">
                      {groupedConversations.yesterday.map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conv={conv}
                          isActive={conv.id === activeConvId}
                          isEditing={editingConvId === conv.id}
                          renameInput={renameInput}
                          setRenameInput={setRenameInput}
                          onSelect={() => selectConversation(conv.id)}
                          onStartRename={(e) => startRename(conv, e)}
                          onSaveRename={(e) => saveRename(conv.id, e)}
                          onCancelRename={() => setEditingConvId(null)}
                          onConfirmDelete={(e) => confirmDelete(conv, e)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Previous 7 Days */}
                {groupedConversations.previous7Days.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">
                      Previous 7 Days
                    </span>
                    <div className="space-y-1">
                      {groupedConversations.previous7Days.map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conv={conv}
                          isActive={conv.id === activeConvId}
                          isEditing={editingConvId === conv.id}
                          renameInput={renameInput}
                          setRenameInput={setRenameInput}
                          onSelect={() => selectConversation(conv.id)}
                          onStartRename={(e) => startRename(conv, e)}
                          onSaveRename={(e) => saveRename(conv.id, e)}
                          onCancelRename={() => setEditingConvId(null)}
                          onConfirmDelete={(e) => confirmDelete(conv, e)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Older */}
                {groupedConversations.older.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">
                      Older
                    </span>
                    <div className="space-y-1">
                      {groupedConversations.older.map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conv={conv}
                          isActive={conv.id === activeConvId}
                          isEditing={editingConvId === conv.id}
                          renameInput={renameInput}
                          setRenameInput={setRenameInput}
                          onSelect={() => selectConversation(conv.id)}
                          onStartRename={(e) => startRename(conv, e)}
                          onSaveRename={(e) => saveRename(conv.id, e)}
                          onCancelRename={() => setEditingConvId(null)}
                          onConfirmDelete={(e) => confirmDelete(conv, e)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Slide-over Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex sm:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[85%] bg-[#080c1d] border-r border-white/10 p-4 flex flex-col space-y-4 shadow-2xl z-10 h-full">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-accent-cyan" />
                  <span>Chat History</span>
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleNewChat}
                className="w-full justify-center shrink-0"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                New Chat
              </Button>

              <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
                {conversations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => selectConversation(c.id)}
                    className={`p-2.5 rounded-xl text-xs cursor-pointer truncate ${
                      c.id === activeConvId
                        ? "bg-purple-950/80 border border-purple-500/40 text-white font-semibold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {c.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Central Stage: Conversation Interface */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#080c1e]/90 min-w-0 relative h-full">
          {/* Header Bar with Toggle History Button and Integrated Controls */}
          <div className="p-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 truncate">
              {/* Left-side Sidebar Toggle Arrow / Icon (Requirement 2) */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden sm:inline-flex p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all items-center gap-1.5 text-xs shrink-0"
                title={sidebarOpen ? "Hide chat history" : "Open chat history"}
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4 text-accent-cyan" />
                ) : (
                  <PanelLeft className="w-4 h-4 text-purple-300" />
                )}
                <span className="font-medium text-[11px] hidden md:inline">
                  {sidebarOpen ? "Hide" : "History"}
                </span>
              </button>

              {/* Mobile History Toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="sm:hidden p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs shrink-0"
                title="Open chat history"
              >
                <PanelLeft className="w-4 h-4 text-purple-300" />
              </button>

              <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-accent-purple-light shrink-0">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
              </div>

              <div className="truncate">
                <h3 className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-2">
                  <span>AI Career Mentor</span>
                  <span className="text-slate-600 font-normal hidden md:inline">•</span>
                  <span className="text-slate-400 font-normal text-xs hidden md:inline truncate">
                    {activeConversation?.title || "Career Dialogue"}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="primary"
                size="sm"
                onClick={handleNewChat}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="shadow-glow-purple text-xs py-1.5 px-3"
              >
                New Chat
              </Button>
            </div>
          </div>

          {/* Messages Scroll Area: ONLY THIS INNER CONTENT SCROLLS */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto"
          >
            {/* Centered Conversation Container */}
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-5 space-y-6 pb-52">
              {/* Empty State Prompt Starter Cards */}
              {activeConversation && activeConversation.messages.length <= 1 && (
                <div className="py-4 space-y-5">
                  <div className="text-center space-y-1.5">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto text-accent-cyan shadow-glow-purple">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      How can I guide your tech career today?
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Choose a starter prompt below or ask any question about skills, roadmaps, interview strategy, and coding.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {emptyStateCards.map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(card.prompt)}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-accent-purple/40 text-left transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {card.icon}
                            <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                              {card.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                        <span className="text-[10px] text-accent-cyan flex items-center gap-1 font-medium mt-2.5 group-hover:translate-x-1 transition-transform">
                          <span>Ask Mentor</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Conversation Messages */}
              {activeConversation?.messages
                .filter((m) => !(m.sender === "ai" && !m.text && isTyping))
                .map((m, idx) => {
                  const isAi = m.sender === "ai";
                  const isEditingThis = editingMessageId === m.id;
                  const isLastAssistantMessage =
                    isAi && idx === activeConversation.messages.length - 1;

                  if (!isAi) {
                    // User Message: Subtle Right-Aligned Bubble (Requirement 4)
                    return (
                      <div key={m.id} className="flex justify-end group">
                        <div className="max-w-[85%] sm:max-w-[75%] space-y-1">
                          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] border border-white/10 text-slate-100 shadow-sm transition-colors space-y-2">
                            {/* Attached Files Badges in Message */}
                            {m.attachments && m.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pb-1">
                                {m.attachments.map((att) => {
                                  const colors = getFileBadgeColor(att.format);
                                  return (
                                    <div
                                      key={att.id}
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${colors.border} ${colors.bg} text-xs text-slate-200 shadow-sm`}
                                    >
                                      {att.previewUrl ? (
                                        <img
                                          src={att.previewUrl}
                                          alt={att.name}
                                          className="w-4 h-4 rounded object-cover"
                                        />
                                      ) : (
                                        <span className={colors.text}>
                                          {renderFileIcon(att.format, "w-3.5 h-3.5")}
                                        </span>
                                      )}
                                      <span className="font-medium truncate max-w-[140px]" title={att.name}>
                                        {att.name}
                                      </span>
                                      <span className="text-[10px] text-slate-400">
                                        ({formatFileSize(att.size)})
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {isEditingThis ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editingMessageText}
                                  onChange={(e) => setEditingMessageText(e.target.value)}
                                  rows={3}
                                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white focus:outline-none focus:border-white resize-none"
                                />
                                <div className="flex items-center justify-end gap-2 text-xs">
                                  <button
                                    onClick={() => setEditingMessageId(null)}
                                    className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveAndResend(idx, editingMessageText)}
                                    className="px-3 py-1 rounded-lg bg-white text-black font-semibold hover:bg-slate-200"
                                  >
                                    Save & Resubmit
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                                {m.text}
                              </p>
                            )}
                          </div>

                          {/* User Message Action Toolbar */}
                          {!isEditingThis && (
                            <div className="flex items-center justify-end gap-2 px-1 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>{m.timestamp}</span>
                              <button
                                onClick={() => {
                                  setEditingMessageId(m.id);
                                  setEditingMessageText(m.text);
                                }}
                                className="inline-flex items-center gap-1 hover:text-white"
                                title="Edit message"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Assistant Message: Clean Unboxed Flow (ChatGPT-Inspired, Requirement 4)
                  return (
                    <div key={m.id} className="flex gap-3 group items-start">
                      {/* Avatar */}
                      <div className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shrink-0 text-accent-purple-light shadow-sm mt-0.5">
                        <BotMessageSquare className="w-4 h-4" />
                      </div>

                      {/* Content Area: No heavy card bubble wrapper */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed select-text">
                          <MarkdownRenderer
                            content={m.text}
                            isStreaming={isStreaming && isLastAssistantMessage}
                          />
                        </div>

                        {/* Action Bar (Assistant Responses) */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                          {/* Timestamp */}
                          <span className="text-[10px] text-slate-500 font-mono">
                            {m.timestamp}
                          </span>

                          <span className="text-slate-600">•</span>

                          {/* Copy Complete Response */}
                          <button
                            onClick={() => handleCopyMessage(m.id, m.text)}
                            className="inline-flex items-center gap-1 p-1 hover:text-white hover:bg-white/5 rounded transition-colors"
                            title="Copy response"
                          >
                            {copiedMessageId === m.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 text-[10px]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Copy</span>
                              </>
                            )}
                          </button>

                          {/* Regenerate Response */}
                          {idx > 0 && activeConversation.messages[idx - 1]?.sender === "user" && (
                            <button
                              onClick={() =>
                                handleRegenerate(activeConversation.messages[idx - 1].text)
                              }
                              disabled={isStreaming}
                              className="inline-flex items-center gap-1 p-1 hover:text-white hover:bg-white/5 rounded transition-colors disabled:opacity-40"
                              title="Regenerate response"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Regenerate</span>
                            </button>
                          )}

                          {/* Feedback: Like */}
                          <button
                            onClick={() => handleFeedback(m.id, "like")}
                            className={`p-1 rounded hover:bg-white/5 transition-colors ${
                              m.feedback === "like" ? "text-emerald-400" : "hover:text-white"
                            }`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Feedback: Dislike */}
                          <button
                            onClick={() => handleFeedback(m.id, "dislike")}
                            className={`p-1 rounded hover:bg-white/5 transition-colors ${
                              m.feedback === "dislike" ? "text-rose-400" : "hover:text-white"
                            }`}
                            title="Unhelpful response"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Retry if Error */}
                          {m.isError && (
                            <button
                              onClick={() => {
                                const lastUser = activeConversation.messages
                                  .filter((msg) => msg.sender === "user")
                                  .pop();
                                if (lastUser) handleRegenerate(lastUser.text);
                              }}
                              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold text-[10px] ml-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Retry</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Typing / Thinking Indicator */}
              {isTyping && <ChatbotThinkingIndicator />}
            </div>
          </div>

          {/* Floating "Scroll to Bottom" button */}
          {showScrollBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-24 right-6 sm:right-8 z-20 p-2 rounded-full bg-[#141b3d] border border-purple-500/30 text-purple-300 hover:text-white shadow-xl hover:scale-105 transition-all"
              title="Scroll to latest message"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Centered Multiline Message Composer: Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-[#080c1e] via-[#080c1e]/95 to-transparent pointer-events-none z-10">
            <div className="max-w-3xl mx-auto w-full pointer-events-auto space-y-1.5">
              {/* Quick Prompt Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                {[
                  "Skills for AI Engineering",
                  "Python decorators with example",
                  "AI Eng vs ML Eng comparison",
                  "RAG architecture with diagram",
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    disabled={isStreaming}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white shrink-0 transition-colors disabled:opacity-40"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Selected Files Preview Strip */}
              {attachedFiles.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                  {attachedFiles.map((att) => {
                    const colors = getFileBadgeColor(att.format);
                    return (
                      <div
                        key={att.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-md text-xs shrink-0 max-w-xs group shadow-sm`}
                      >
                        {att.previewUrl ? (
                          <img
                            src={att.previewUrl}
                            alt={att.name}
                            className="w-7 h-7 rounded-lg object-cover border border-white/20 shrink-0"
                          />
                        ) : (
                          <div className={`p-1 rounded-lg ${colors.text} shrink-0`}>
                            {renderFileIcon(att.format, "w-4 h-4")}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p
                            className="font-medium text-slate-200 truncate max-w-[130px] text-xs"
                            title={att.name}
                          >
                            {att.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>{formatFileSize(att.size)}</span>
                            <span>•</span>
                            {att.status === "uploading" && (
                              <span className="flex items-center gap-1 text-accent-cyan">
                                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                <span>Preprocessing...</span>
                              </span>
                            )}
                            {att.status === "ready" && (
                              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                                <Check className="w-2.5 h-2.5" />
                                <span>Ready</span>
                              </span>
                            )}
                            {att.status === "error" && (
                              <span
                                className="flex items-center gap-1 text-rose-400 font-medium"
                                title={att.error}
                              >
                                <AlertTriangle className="w-2.5 h-2.5" />
                                <span>Error</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setAttachedFiles((prev) => prev.filter((f) => f.id !== att.id))}
                          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                          title="Remove attachment"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Multiline Composer Container with Drag & Drop */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingOver(true);
                }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleFilesSelected(e.dataTransfer.files);
                  }
                }}
                className={`rounded-2xl bg-[#0e132c]/95 backdrop-blur-xl border ${
                  isDraggingOver
                    ? "border-accent-cyan ring-2 ring-accent-cyan/40 bg-[#0e173d]"
                    : "border-white/10 focus-within:border-accent-purple/50 focus-within:ring-1 focus-within:ring-accent-purple/30"
                } shadow-2xl p-2 sm:p-2.5 flex items-end gap-2 transition-all relative`}
              >
                {/* Attachment Menu Button & Popover */}
                <div ref={attachmentMenuRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                    disabled={isStreaming || isTyping}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all disabled:opacity-40"
                    title="Attach document or image"
                  >
                    <Plus className="w-4 h-4 text-accent-cyan" />
                  </button>

                  {/* Attachment Options Popover */}
                  {attachmentMenuOpen && (
                    <div className="absolute bottom-12 left-0 w-64 rounded-2xl bg-[#0e142e] border border-white/10 shadow-2xl p-2 z-30 space-y-1 backdrop-blur-xl animate-popover">
                      <div className="px-3 py-1.5 border-b border-white/5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Add Attachment
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setAttachmentMenuOpen(false);
                          fileInputDocRef.current?.click();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-medium">Upload Document</p>
                          <p className="text-[10px] text-slate-400">PDF, Word, Excel, PPTX, TXT</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAttachmentMenuOpen(false);
                          fileInputImgRef.current?.click();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                          <ImageIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-medium">Upload Image (OCR)</p>
                          <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, Diagrams</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Hidden File Inputs */}
                <input
                  ref={fileInputDocRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc,.xlsx,.xls,.csv,.pptx,.ppt,.txt,.rtf,.md"
                  onChange={(e) => {
                    if (e.target.files) handleFilesSelected(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
                <input
                  ref={fileInputImgRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    if (e.target.files) handleFilesSelected(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />

                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={
                    isDraggingOver
                      ? "Drop files here to analyze with Gemini..."
                      : "Ask anything about career roadmaps, skills, courses, or interview prep... (Enter to send, Shift+Enter for new line)"
                  }
                  disabled={isStreaming || isTyping}
                  className="flex-1 max-h-36 min-h-[38px] px-2 py-2 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none resize-none overflow-y-auto leading-relaxed"
                />

                {isStreaming ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleStopGeneration}
                    className="border-rose-500/50 text-rose-300 hover:bg-rose-950/40 shrink-0"
                    leftIcon={<Square className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const msg = inputText.trim() || (attachedFiles.length > 0 ? "Please analyze the attached document(s) and provide your guidance." : "");
                      if (msg) handleSendMessage(msg);
                    }}
                    disabled={
                      (!inputText.trim() && attachedFiles.length === 0) ||
                      isStreaming ||
                      isTyping ||
                      attachedFiles.some((f) => f.status === "uploading")
                    }
                    rightIcon={
                      attachedFiles.some((f) => f.status === "uploading") ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )
                    }
                    className="shadow-glow-purple shrink-0"
                  >
                    Send
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteModalOpen && convToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl bg-[#0e142e] border border-white/10 p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Conversation?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete &quot;<strong>{convToDelete.title}</strong>&quot;? All messages in this conversation will be permanently removed.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setConvToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={executeDelete}
                className="bg-rose-600 hover:bg-rose-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Conversation Item Component
interface ConversationItemProps {
  conv: ConversationWithMessages;
  isActive: boolean;
  isEditing: boolean;
  renameInput: string;
  setRenameInput: (v: string) => void;
  onSelect: () => void;
  onStartRename: (e: React.MouseEvent) => void;
  onSaveRename: (e?: React.FormEvent) => void;
  onCancelRename: () => void;
  onConfirmDelete: (e: React.MouseEvent) => void;
}

function ConversationItem({
  conv,
  isActive,
  isEditing,
  renameInput,
  setRenameInput,
  onSelect,
  onStartRename,
  onSaveRename,
  onCancelRename,
  onConfirmDelete,
}: ConversationItemProps) {
  if (isEditing) {
    return (
      <form
        onSubmit={onSaveRename}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 p-1 rounded-xl bg-purple-950/40 border border-purple-500/50"
      >
        <input
          type="text"
          value={renameInput}
          onChange={(e) => setRenameInput(e.target.value)}
          autoFocus
          className="flex-1 px-2 py-1 bg-transparent text-xs text-white focus:outline-none"
        />
        <button
          type="submit"
          className="p-1 rounded hover:bg-emerald-950/60 text-emerald-400"
          title="Save title"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onCancelRename}
          className="p-1 rounded hover:bg-rose-950/60 text-rose-400"
          title="Cancel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </form>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`group flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
        isActive
          ? "bg-purple-950/80 border border-purple-500/40 text-white font-semibold shadow-md"
          : "text-slate-300 hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-2 truncate pr-2">
        <MessageSquare
          className={`w-3.5 h-3.5 shrink-0 ${
            isActive ? "text-accent-cyan" : "text-slate-500 group-hover:text-slate-400"
          }`}
        />
        <span className="truncate">{conv.title}</span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={onStartRename}
          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Rename conversation"
        >
          <Edit2 className="w-3 h-3" />
        </button>
        <button
          onClick={onConfirmDelete}
          className="p-1 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
          title="Delete conversation"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
