"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/authentication/LoginForm";
import { AIOrbLoader } from "@/components/ui/AIOrbLoader";
import {
  Sparkles,
  Compass,
  Briefcase,
  GraduationCap,
  Target,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background radial ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="p-5 sm:px-10 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Branding, Futuristic Illustration & Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1024]/90 via-[#0a0e20]/80 to-[#070a18]/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden min-h-[580px]"
          >
            {/* Ambient internal soft glows */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-accent-purple/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent-cyan/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Headline and Supporting Text */}
            <div className="space-y-3 relative z-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Your Intelligent Career Companion Awaits
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                Unlock your potential with personalized AI career guidance, intelligent learning
                roadmaps and opportunities matched to your skills.
              </p>
            </div>

            {/* Premium Visual Illustration: Glowing Orb with Orbiting Rings & Floating Career Icons */}
            <div className="my-8 py-6 relative flex items-center justify-center">
              {/* Outer Network Rings & Subtle Atmospheric Glow */}
              <div className="absolute w-72 h-72 rounded-full border border-purple-500/15 animate-[spin_24s_linear_infinite] pointer-events-none" />
              <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20 border-dashed animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

              {/* Floating Career Badge 1 (Top Left): Graduation */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-6 px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/30 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-purple-200 shadow-lg shadow-purple-950/40"
              >
                <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Academic Fit</span>
              </motion.div>

              {/* Floating Career Badge 2 (Top Right): Discovery */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-cyan-200 shadow-lg shadow-cyan-950/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-purple-light" />
                <span>Career AI</span>
              </motion.div>

              {/* Floating Career Badge 3 (Bottom Right): Verified Jobs */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 right-8 px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-indigo-200 shadow-lg shadow-indigo-950/40"
              >
                <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Live Matches</span>
              </motion.div>

              {/* Centerpiece: AI Orbital Loader */}
              <div className="relative z-10 py-4">
                <AIOrbLoader size="lg" icon="sparkles" />
              </div>
            </div>

            {/* Three Small Feature Highlights */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 gap-2.5 relative z-10">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-accent-purple-light shrink-0">
                  <Target className="w-3 h-3 text-accent-cyan" />
                </div>
                <span className="font-medium">1. AI-Powered Career Discovery</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-accent-cyan shrink-0">
                  <Compass className="w-3 h-3 text-accent-cyan" />
                </div>
                <span className="font-medium">2. Personalized Learning Roadmaps</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                  <Briefcase className="w-3 h-3 text-accent-cyan" />
                </div>
                <span className="font-medium">3. CV-Matched Job Opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Premium Glassmorphism Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#0c1024]/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative"
          >
            {/* Top gradient highlight border */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center p-12 gap-3 text-slate-400">
                  <AIOrbLoader size="sm" />
                  <span className="text-xs font-mono">Preparing login workspace...</span>
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-5 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} AI Career Guidance. All rights reserved.
      </footer>
    </div>
  );
}
