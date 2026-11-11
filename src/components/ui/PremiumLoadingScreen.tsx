"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { AIOrbLoader } from "@/components/ui/AIOrbLoader";

export type LoadingPreset =
  | "auth"
  | "recommendations"
  | "jobs"
  | "chatbot"
  | "cv"
  | "roadmap"
  | "general";

const PRESET_CONFIGS: Record<
  LoadingPreset,
  {
    heading: string;
    description: string;
    statusMessages: string[];
    icon: "sparkles" | "brain";
  }
> = {
  auth: {
    heading: "Securing Your Workspace",
    description: "Preparing your secure student workspace.",
    statusMessages: [
      "Verifying your identity...",
      "Validating authenticated Firebase session...",
      "Securing student workspace tokens...",
    ],
    icon: "sparkles",
  },
  recommendations: {
    heading: "Preparing Your Career Insights",
    description: "Your next career opportunity starts with understanding your strengths.",
    statusMessages: [
      "Reviewing your academic profile...",
      "Analysing your skills and experience...",
      "Discovering suitable career paths...",
      "Preparing personalized recommendations...",
    ],
    icon: "brain",
  },
  jobs: {
    heading: "Discovering Your Next Opportunity",
    description: "Finding opportunities that align with your skills and career goals.",
    statusMessages: [
      "Connecting to job data sources...",
      "Discovering relevant job opportunities...",
      "Analysing required skills...",
      "Matching opportunities with your CV...",
      "Ranking your best job matches...",
    ],
    icon: "sparkles",
  },
  chatbot: {
    heading: "AI Career Mentor Is Thinking",
    description: "Your AI career mentor is preparing a helpful response.",
    statusMessages: [
      "Understanding your question...",
      "Synthesizing curriculum and industry context...",
      "Preparing relevant career information...",
      "Generating your response...",
    ],
    icon: "brain",
  },
  cv: {
    heading: "Understanding Your Professional Profile",
    description: "Turning your CV into meaningful career insights.",
    statusMessages: [
      "Securely processing your document...",
      "Extracting education and qualifications...",
      "Identifying technical skills...",
      "Analysing projects and experience...",
    ],
    icon: "brain",
  },
  roadmap: {
    heading: "Building Your Learning Journey",
    description: "Your personalized roadmap is being prepared.",
    statusMessages: [
      "Preparing your learning path...",
      "Organizing essential skills...",
      "Arranging learning milestones...",
      "Calibrating semester checklists...",
    ],
    icon: "sparkles",
  },
  general: {
    heading: "Calibrating AI Intelligence",
    description: "Processing your request with high-precision AI models.",
    statusMessages: [
      "Initializing workspace resources...",
      "Synchronizing platform modules...",
      "Applying personalized calibration...",
    ],
    icon: "sparkles",
  },
};

export interface PremiumLoadingScreenProps {
  preset?: LoadingPreset;
  heading?: string;
  description?: string;
  statusMessages?: string[];
  progress?: number | null;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PremiumLoadingScreen: React.FC<PremiumLoadingScreenProps> = ({
  preset = "general",
  heading,
  description,
  statusMessages,
  progress = null,
  fullScreen = false,
  size = "md",
  className = "",
}) => {
  const config = PRESET_CONFIGS[preset] || PRESET_CONFIGS.general;
  const finalHeading = heading || config.heading;
  const finalDescription = description || config.description;
  const finalMessages = statusMessages && statusMessages.length > 0 ? statusMessages : config.statusMessages;

  const [activeMsgIdx, setActiveMsgIdx] = useState(0);

  useEffect(() => {
    if (!finalMessages || finalMessages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveMsgIdx((prev) => (prev + 1) % finalMessages.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [finalMessages]);

  const content = (
    <div className={`flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto select-none ${className}`}>
      {/* 1. Centerpiece Animated AI Orb */}
      <AIOrbLoader size={fullScreen ? "lg" : size} icon={config.icon} className="mb-6 sm:mb-8" />

      {/* 2. Heading with clean gradient */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight"
      >
        <span className="bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
          {finalHeading}
        </span>
      </motion.h2>

      {/* 3. Dynamic Rotating Status Badge */}
      <div className="h-9 my-3 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMsgIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-accent-cyan font-medium shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-xs">{finalMessages[activeMsgIdx]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Descriptive Context Sentence */}
      {finalDescription && (
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          {finalDescription}
        </p>
      )}

      {/* 5. Progress Indicator (Exact Percentage or Indeterminate Beam) */}
      <div className="w-full max-w-xs mt-6 space-y-1.5">
        {typeof progress === "number" && progress >= 0 ? (
          <>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-0.5">
              <span>Progress</span>
              <span className="text-accent-cyan font-bold">{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden relative border border-white/5">
            <motion.div
              animate={{
                x: ["-100%", "250%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent-cyan to-accent-purple rounded-full blur-[0.5px]"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen fixed inset-0 z-50 bg-[#070913] flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-accent-purple/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Logo and Platform Branding */}
        <div className="relative z-10 flex items-center justify-center pt-2">
          <Logo size="md" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto py-8">
          {content}
        </div>

        {/* Bottom subtle platform info */}
        <div className="relative z-10 text-center pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            AI Career Guidance Platform • Secure Neural Session
          </span>
        </div>
      </div>
    );
  }

  return <div className="py-16 sm:py-24">{content}</div>;
};

