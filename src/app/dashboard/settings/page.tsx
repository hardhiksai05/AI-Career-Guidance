"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  Bell,
  Sliders,
  Shield,
  Save,
  CheckCircle2,
  Cpu,
  Database,
  Lock,
  Sparkles,
  Info,
} from "lucide-react";

export default function SettingsPage() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [tone, setTone] = useState("technical");
  const [username, setUsername] = useState(user?.displayName || "alex_dev");
  const [email, setEmail] = useState(user?.email || "alex.vance@caltech.edu");

  React.useEffect(() => {
    if (user?.displayName) setUsername(user.displayName);
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: "success",
      title: "Settings Saved",
      description: "Your workspace and mentor preferences have been synchronized.",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Platform Settings
            </h1>
            <Badge variant="purple" size="sm">
              Configuration
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Control your AI mentor preferences, notification subscriptions, and account settings.
          </p>
        </div>
      </div>

      {/* 1. Account Settings */}
      <div className="rounded-3xl bg-[#0b0f22]/90 border border-white/10 p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
          <Lock className="w-5 h-5 text-accent-purple-light" />
          <span>Account & Security Settings</span>
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Email Address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Input label="New Password" placeholder="••••••••••••" isPassword />
            <Input label="Confirm New Password" placeholder="••••••••••••" isPassword />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
              Save Account Changes
            </Button>
          </div>
        </form>
      </div>

      {/* 2. AI Mentor Customization */}
      <div className="rounded-3xl bg-[#0b0f22]/90 border border-white/10 p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
          <Sparkles className="w-5 h-5 text-accent-cyan" />
          <span>AI Mentor Persona & Guidance Tone</span>
        </h3>

        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Conversational Guidance Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setTone("technical");
                showToast({
                  type: "info",
                  title: "Guidance Style Updated",
                  description: "Mentor persona set to Direct & Technical.",
                });
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                tone === "technical"
                  ? "bg-purple-950/40 border-accent-purple shadow-glow-purple text-white"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <p className="text-sm font-bold text-white mb-1">Direct & Technical</p>
              <p className="text-xs text-slate-400">
                Rigorous code critiques, architectural breakdown, and industry standards.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setTone("exploratory");
                showToast({
                  type: "info",
                  title: "Guidance Style Updated",
                  description: "Mentor persona set to Encouraging & Exploratory.",
                });
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                tone === "exploratory"
                  ? "bg-cyan-950/40 border-accent-cyan shadow-glow-cyan text-white"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <p className="text-sm font-bold text-white mb-1">Encouraging & Exploratory</p>
              <p className="text-xs text-slate-400">
                Gentle step-by-step coaching, concept scaffolding, and exploration.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Architecture Roadmap Status */}
      <div className="rounded-3xl bg-[#0b0f22]/90 border border-white/10 p-6 sm:p-8 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span>Architecture Implementation Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 text-accent-purple-light font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" /> Part 1: Website Foundation
            </div>
            <p className="text-slate-400">
              Next.js 14 App Router, Three.js 3D hero, Tailwind design system, onboarding & dashboard layout.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 text-accent-cyan font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" /> Part 2: Firebase Authentication
            </div>
            <p className="text-slate-400">
              Email/Password auth, Google OAuth, GitHub OAuth, password recovery & protected session states.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
              <Database className="w-4 h-4 text-blue-400" /> Part 3: Supabase PostgreSQL
            </div>
            <p className="text-slate-400">
              Relational schemas, student profiles, chat history, private CV storage & Row Level Security.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Part 4: Gemini AI Engine
            </div>
            <p className="text-slate-400">
              Gemini 2.0 streaming chatbot, CV multimodal extraction, and AI recommendation matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
