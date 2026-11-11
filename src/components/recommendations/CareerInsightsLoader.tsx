"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Compass, Layers } from "lucide-react";

const ROTATING_MESSAGES = [
  "Reviewing your academic background and coursework...",
  "Preparing your personalized career insights...",
  "Matching your skills with high-growth tech roles...",
  "Organizing tailored learning roadmap recommendations...",
];

interface CareerInsightsLoaderProps {
  isAnalyzing?: boolean;
}

export const CareerInsightsLoader: React.FC<CareerInsightsLoaderProps> = ({
  isAnalyzing = false,
}) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 sm:py-28 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto">
      {/* AI Circular Orbital Loader */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-purple/30 to-accent-cyan/30 blur-2xl animate-pulse" />

        {/* Outer orbital ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-purple-500/40"
        >
          {/* Orbital Satellite Dot 1 */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-cyan shadow-glow-cyan" />
          {/* Orbital Satellite Dot 2 */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-purple shadow-glow-purple" />
        </motion.div>

        {/* Counter-rotating middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border border-cyan-400/30"
        >
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
        </motion.div>

        {/* Inner pulsing core */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-accent-purple via-indigo-600 to-accent-cyan p-[1.5px] shadow-2xl shadow-purple-500/30"
        >
          <div className="w-full h-full rounded-2xl bg-[#080c1e] flex items-center justify-center backdrop-blur-xl">
            {isAnalyzing ? (
              <Brain className="w-8 h-8 text-accent-cyan animate-pulse" />
            ) : (
              <Sparkles className="w-8 h-8 text-accent-cyan animate-pulse" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2.5"
      >
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {isAnalyzing ? "Synthesizing AI Recommendations" : "Preparing Your Career Insights"}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
          Your personalized career recommendations are being calibrated. This will only take a moment.
        </p>

        {/* Animated Rotating Status Text */}
        <div className="h-7 pt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-accent-cyan font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping shrink-0" />
              <span>{ROTATING_MESSAGES[msgIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
