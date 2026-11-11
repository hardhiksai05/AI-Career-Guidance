"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MultiStepSignup } from "@/components/onboarding/MultiStepSignup";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="p-6 sm:px-10 flex items-center justify-between relative z-10">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline">Already have an account?</span>
          <Link
            href="/login"
            className="text-xs sm:text-sm font-semibold text-accent-cyan hover:underline"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors ml-2 pl-4 border-l border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
        <div className="text-center max-w-xl mx-auto mb-8">
          <Badge variant="purple" size="md" className="mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-accent-cyan" />
            Personalized Onboarding
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Start discovering your future with AI Career Guidance.
          </p>
        </div>

        <MultiStepSignup />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} AI Career Guidance. Onboarding preview experience (Part 1).
      </footer>
    </div>
  );
}

