"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Compass, Sparkles, Brain, Cpu, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Three.js scene on client only (SSR: false)
const HeroScene3D = dynamic(
  () => import("@/components/landing/HeroScene3D"),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />
    ),
  }
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Background */}
      <HeroScene3D />

      {/* Radiant ambient glow gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-accent-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[350px] bg-accent-cyan/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center mb-6"
        >
          <Badge variant="purple" size="md" dot className="px-3.5 py-1.5 shadow-glow-purple">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan mr-1.5" />
            AI-Powered Career Intelligence Platform
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]"
        >
          Discover Your Future.{" "}
          <span className="text-gradient-purple-cyan block sm:inline">
            Build Your Career.
          </span>
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Your personal AI-powered career mentor. Discover your strengths, explore career
          opportunities and build a personalized learning roadmap to achieve your professional
          goals.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Button
            href="/signup"
            size="lg"
            variant="primary"
            className="w-full sm:w-auto text-base px-8 py-3.5 shadow-glow-purple"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Get Started Free
          </Button>
          <Button
            href="#features"
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto text-base px-7 py-3.5"
            leftIcon={<Compass className="w-4 h-4 text-accent-cyan" />}
          >
            Explore Features
          </Button>
        </motion.div>

        {/* Floating Metrics / Tags Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="glass-panel rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 text-accent-cyan mb-1">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Alignment</span>
            </div>
            <p className="text-xl font-bold text-white">98.4%</p>
            <p className="text-xs text-slate-400">Match accuracy rate</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 text-accent-purple-light mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Tech Domains</span>
            </div>
            <p className="text-xl font-bold text-white">14+ Tracks</p>
            <p className="text-xs text-slate-400">AI, Cloud, Cyber & more</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Step Roadmaps</span>
            </div>
            <p className="text-xl font-bold text-white">Tailored</p>
            <p className="text-xs text-slate-400">Adaptive skill milestones</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Mentorship</span>
            </div>
            <p className="text-xl font-bold text-white">24/7 AI</p>
            <p className="text-xs text-slate-400">Guided student support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

