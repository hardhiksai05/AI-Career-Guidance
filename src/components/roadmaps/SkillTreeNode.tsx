"use client";

import React from "react";
import { RoadmapNode } from "@/lib/career-catalog";
import {
  Lock,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Award,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";

export type SkillNodeState = "locked" | "available" | "in-progress" | "completed";

interface SkillTreeNodeProps {
  node: RoadmapNode;
  state: SkillNodeState;
  onClick: () => void;
  onQuickToggleComplete?: (e: React.MouseEvent) => void;
}

export const SkillTreeNode: React.FC<SkillTreeNodeProps> = ({
  node,
  state,
  onClick,
  onQuickToggleComplete,
}) => {
  const isLocked = state === "locked";
  const isCompleted = state === "completed";
  const isInProgress = state === "in-progress";
  const isAvailable = state === "available";

  // Dynamic state styles
  let stateContainerClasses = "";
  let auraGlowClasses = "";
  let badgeLabel = "";
  let badgeColor = "";

  if (isCompleted) {
    stateContainerClasses =
      "bg-gradient-to-br from-[#0c261e] via-[#091f18] to-[#07130e] border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]";
    auraGlowClasses = "from-emerald-500/20 to-teal-500/0";
    badgeLabel = "Quest Cleared";
    badgeColor = "text-emerald-400 bg-emerald-950/80 border-emerald-600/60";
  } else if (isInProgress) {
    stateContainerClasses =
      "bg-gradient-to-br from-[#1f1238] via-[#150d28] to-[#0b0717] border-2 border-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.45)] ring-2 ring-purple-500/30";
    auraGlowClasses = "from-purple-500/30 via-pink-500/20 to-transparent animate-pulse";
    badgeLabel = "Active Mission";
    badgeColor = "text-purple-300 bg-purple-950/80 border-purple-500";
  } else if (isAvailable) {
    stateContainerClasses =
      "bg-gradient-to-br from-[#0d1d2e] via-[#091522] to-[#060e17] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]";
    auraGlowClasses = "from-cyan-500/20 to-transparent";
    badgeLabel = "Ready to Unlock";
    badgeColor = "text-accent-cyan bg-cyan-950/80 border-cyan-500/60";
  } else {
    // Locked
    stateContainerClasses =
      "bg-[#0a0d1a]/80 border border-white/10 opacity-70 grayscale-[0.6] hover:opacity-90 transition-opacity";
    auraGlowClasses = "from-transparent to-transparent";
    badgeLabel = "Stage Locked";
    badgeColor = "text-slate-500 bg-black/40 border-slate-700";
  }

  return (
    <div
      onClick={isLocked ? undefined : onClick}
      className={`relative rounded-3xl p-6 transition-all duration-300 select-none ${
        isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
      } ${stateContainerClasses}`}
      style={{ width: "100%", maxWidth: "560px" }}
    >
      {/* Background Aura Radial */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r pointer-events-none -z-0 ${auraGlowClasses}`}
      />

      {/* Cyber Corner Decals */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/20 pointer-events-none" />

      {/* Top Meta Line: Level, XP Reward, Status */}
      <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          {/* Level Gem */}
          <span className="px-2.5 py-1 rounded-xl bg-black/50 border border-white/15 text-xs font-mono font-black text-white flex items-center gap-1.5 shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                isCompleted
                  ? "bg-emerald-400 shadow-[0_0_8px_#10b981]"
                  : isInProgress
                  ? "bg-purple-400 shadow-[0_0_8px_#8b5cf6] animate-ping"
                  : isAvailable
                  ? "bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                  : "bg-slate-600"
              }`}
            />
            LVL {node.level}
          </span>

          <span
            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg border ${badgeColor}`}
          >
            {badgeLabel}
          </span>
        </div>

        {/* XP Reward Badge */}
        <span className="flex items-center gap-1 text-xs font-mono font-black text-amber-300 bg-amber-950/40 border border-amber-600/50 px-2.5 py-1 rounded-xl shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          +{node.xpReward} XP
        </span>
      </div>

      {/* Quest Title & Main Label */}
      <div className="space-y-1 relative z-10">
        <div className="flex items-center gap-2">
          {isLocked && <Lock className="w-4 h-4 text-slate-500 shrink-0" />}
          {isCompleted && <Crown className="w-4 h-4 text-emerald-400 shrink-0" />}
          {isInProgress && <Flame className="w-4 h-4 text-pink-400 shrink-0 animate-bounce" />}
          {isAvailable && <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />}

          <span className="text-[11px] font-mono uppercase tracking-wider text-accent-cyan font-bold">
            {node.questTitle}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
          {node.label}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
          {node.description}
        </p>
      </div>

      {/* Skill Pills */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 relative z-10">
        {node.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
          >
            {skill}
          </span>
        ))}
        {node.languagesAndTools.slice(0, 2).map((tool) => (
          <span
            key={tool}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/50 border border-purple-700/40 text-purple-200"
          >
            {tool}
          </span>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {node.estimatedWeeks}w
          </span>

          {!isLocked && onQuickToggleComplete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickToggleComplete(e);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isCompleted
                  ? "bg-emerald-500 text-white border-emerald-400 shadow-glow-cyan"
                  : "bg-white/5 border-white/20 text-slate-400 hover:text-white hover:border-white/40"
              }`}
              title={isCompleted ? "Completed (Click to undo)" : "Mark as Complete"}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}

          {!isLocked && (
            <span className="text-xs font-bold text-accent-cyan flex items-center gap-1 hover:underline">
              Quest Log <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

