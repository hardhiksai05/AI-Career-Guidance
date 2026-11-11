"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BotMessageSquare, Send, Sparkles, ArrowRight } from "lucide-react";

export const QuickChatbotWidget: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push("/dashboard/chatbot");
      return;
    }
    // Encode query into search params for preview
    router.push(`/dashboard/chatbot?initial=${encodeURIComponent(query)}`);
  };

  const starterPrompts = [
    "What math is needed for generative AI?",
    "Review my CS resume for cloud internships",
    "Compare Machine Learning Engineer vs Data Scientist",
  ];

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-[#0e1329] to-cyan-950/30 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden shadow-glow-purple">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-accent-purple/15 blur-[80px] pointer-events-none" />

      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Instant Career Dialogue Preview</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Have a question about your career trajectory?
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
          Ask our AI mentor about coursework, technical roadmaps, internship interviews, or skill gaps.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <BotMessageSquare className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything, e.g. How do I prepare for an AI engineer internship in 2026?"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-accent-purple hover:bg-purple-600 text-white font-medium text-sm flex items-center gap-2 shadow-glow-purple transition-all shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Starter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400">Suggestions:</span>
          {starterPrompts.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => {
                setQuery(prompt);
                router.push(`/dashboard/chatbot?initial=${encodeURIComponent(prompt)}`);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-accent-cyan/40 hover:bg-white/10 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

