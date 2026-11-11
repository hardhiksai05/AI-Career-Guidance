"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/authentication/LoginForm";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Brain, Cpu, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <header className="p-6 sm:px-10 flex items-center justify-between relative z-10">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Brand Visual & Abstract AI Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-between h-full p-8 rounded-3xl bg-gradient-to-br from-[#121835]/90 via-[#0d1226]/80 to-[#090d1c]/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Ambient internal orb */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-purple/25 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-accent-cyan/20 rounded-full blur-[70px] pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <Badge variant="purple" size="md" dot>
                Secure Authentication
              </Badge>
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
                Your Intelligent Career Companion Awaits
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Log in to resume customized AI career dialogues, review dynamic learning progress,
                and discover newly matched opportunities.
              </p>
            </div>

            {/* Abstract Visual AI Graphic */}
            <div className="my-8 p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-accent-purple-light" />
                  </div>
                  <span className="text-xs font-semibold text-white">AI Alignment Active</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  High Fidelity
                </span>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan" />
                <div className="h-2 w-1/2 rounded-full bg-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Real-time Market Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Adaptive Roadmaps</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 relative z-10">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent-cyan" />
                Encrypted Session Standard
              </span>
              <span>Part 1 Interface</span>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-6 sm:p-10 rounded-3xl bg-[#0d1226]/80 border border-white/10 backdrop-blur-2xl shadow-xl"
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} AI Career Guidance. Frontend preview interface.
      </footer>
    </div>
  );
}

