"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden border border-purple-500/30 bg-gradient-to-b from-[#121838] via-[#0d122b] to-[#0a0d1f] shadow-2xl shadow-purple-900/20 text-center"
        >
          {/* Internal glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-purple/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-60 h-60 bg-accent-cyan/15 blur-[100px] pointer-events-none" />

          {/* Sparkle icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-6 text-accent-purple-light shadow-glow-purple">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Your Future Starts With{" "}
            <span className="text-gradient-purple-cyan">One Decision.</span>
          </h2>

          <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of ambitious students shaping their trajectories with AI-guided career
            mentorship, curated skill roadmaps, and automated opportunity matching.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/signup"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-base px-8 py-3.5 shadow-glow-purple"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started
            </Button>
            <Button
              href="/dashboard"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base px-7 py-3.5"
            >
              Preview Student Workspace
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free Onboarding
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Instant Profile Alignment
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

