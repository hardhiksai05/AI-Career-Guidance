"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";

interface AIOrbLoaderProps {
  size?: "sm" | "md" | "lg";
  icon?: "sparkles" | "brain";
  className?: string;
}

export const AIOrbLoader: React.FC<AIOrbLoaderProps> = ({
  size = "md",
  icon = "sparkles",
  className = "",
}) => {
  const sizeMap = {
    sm: {
      container: "w-20 h-20",
      outerRing: "inset-0",
      middleRing: "inset-2",
      core: "w-10 h-10",
      iconSize: "w-4 h-4",
      particle1: "-top-1 w-2 h-2",
      particle2: "-bottom-1 w-2 h-2",
      particle3: "top-1/2 -right-1 w-1.5 h-1.5",
    },
    md: {
      container: "w-28 h-28 sm:w-32 sm:h-32",
      outerRing: "inset-0",
      middleRing: "inset-3",
      core: "w-16 h-16 sm:w-18 sm:h-18",
      iconSize: "w-7 h-7 sm:w-8 sm:h-8",
      particle1: "-top-1.5 w-3 h-3",
      particle2: "-bottom-1.5 w-2.5 h-2.5",
      particle3: "top-1/2 -right-1.5 w-2 h-2",
    },
    lg: {
      container: "w-36 h-36 sm:w-44 sm:h-44",
      outerRing: "inset-0",
      middleRing: "inset-4 sm:inset-5",
      core: "w-20 h-20 sm:w-24 sm:h-24",
      iconSize: "w-9 h-9 sm:w-11 sm:h-11",
      particle1: "-top-2 w-3.5 h-3.5",
      particle2: "-bottom-2 w-3 h-3",
      particle3: "top-1/2 -right-2 w-2.5 h-2.5",
    },
  };

  const s = sizeMap[size];

  return (
    <div className={`relative ${s.container} flex items-center justify-center select-none ${className}`}>
      {/* 1. Deep ambient pulsing atmospheric glow */}
      <motion.div
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-purple via-indigo-600 to-accent-cyan blur-2xl pointer-events-none"
      />

      {/* 2. Outer Ring: Clockwise rotation with dual satellite particles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className={`absolute ${s.outerRing} rounded-full border border-dashed border-purple-400/40`}
      >
        {/* Orbiting Satellite Particle A (Cyan glowing pill) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${s.particle1} rounded-full bg-accent-cyan shadow-glow-cyan`}
        />
        {/* Orbiting Satellite Particle B (Purple glowing pill) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${s.particle2} rounded-full bg-accent-purple shadow-glow-purple`}
        />
      </motion.div>

      {/* 3. Middle Ring: Counter-clockwise rotation with White/Cyan sparkle particle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className={`absolute ${s.middleRing} rounded-full border border-cyan-400/35`}
      >
        <div
          className={`absolute -translate-y-1/2 ${s.particle3} rounded-full bg-white shadow-[0_0_10px_#ffffff]`}
        />
      </motion.div>

      {/* 4. Central Glowing AI Orb (Multi-layer core with gradient ring) */}
      <motion.div
        animate={{
          scale: [0.94, 1.04, 0.94],
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.35)",
            "0 0 45px rgba(6, 182, 212, 0.45)",
            "0 0 20px rgba(139, 92, 246, 0.35)",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className={`${s.core} rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-accent-purple via-indigo-600 to-accent-cyan p-[1.5px] shadow-2xl relative z-10 flex items-center justify-center`}
      >
        <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#070918]/90 backdrop-blur-xl flex items-center justify-center border border-white/10">
          {icon === "brain" ? (
            <Brain className={`${s.iconSize} text-accent-cyan animate-pulse`} />
          ) : (
            <Sparkles className={`${s.iconSize} text-accent-cyan animate-pulse`} />
          )}
        </div>
      </motion.div>
    </div>
  );
};
