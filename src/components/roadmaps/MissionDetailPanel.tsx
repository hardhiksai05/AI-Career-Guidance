"use client";

import React, { useState } from "react";
import { RoadmapNode } from "@/lib/career-catalog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  X,
  Zap,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Code2,
  Briefcase,
  GitBranch,
  ExternalLink,
  Crown,
  Copy,
  Check,
  Terminal,
  HelpCircle,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";

interface MissionDetailPanelProps {
  node: RoadmapNode;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
}

export const MissionDetailPanel: React.FC<MissionDetailPanelProps> = ({
  node,
  isCompleted,
  onClose,
  onToggleComplete,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="max-w-3xl w-full rounded-3xl bg-[#0b0f24] border-2 border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Top Quest Banner */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-950/80 border border-purple-600/60 text-purple-300 font-mono text-xs font-black">
                {node.levelName}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono font-black text-amber-300 bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 fill-amber-400" /> +{node.xpReward} XP Reward
              </span>
              {isCompleted && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-600/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Check className="w-3 h-3" /> Mission Cleared
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
              {node.questTitle}
            </h3>
            <p className="text-xs text-accent-cyan font-mono">{node.label}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quest Description & Learning Objectives */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Quest Objective & Lore
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {node.description}
          </p>
        </div>

        {/* Prerequisites */}
        {node.prerequisites?.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-accent-cyan" /> Prerequisites & Dependencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {node.prerequisites.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-mono"
                >
                  Required: {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills to Acquire: Technical & Soft */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-purple-400" /> Technical Competencies
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {node.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-cyan" /> Soft Skills Mastery
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {node.softSkills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Technologies & Tooling */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Recommended Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {node.languagesAndTools.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Boss Quest: Practical Portfolio Project */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-500/30 space-y-2.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-pink-400" /> Practical Boss Quest (Portfolio Deliverable)
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {node.practicalProjects.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0 mt-1.5" />
                <span className="font-medium leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Curated Learning Resources & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Curated Guild Courses
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {node.recommendedCourses.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Certifications & Badges
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {node.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Readiness Checklist */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Mission Readiness Verification
          </h4>
          <div className="space-y-1.5 text-xs text-slate-300">
            {node.readinessChecklist.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant={isCompleted ? "outline" : "primary"}
            onClick={onToggleComplete}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            className="w-full sm:w-auto text-sm font-bold shadow-glow-purple"
          >
            {isCompleted ? "Quest Completed (Click to Reset)" : `Complete Mission (+${node.xpReward} XP)`}
          </Button>

          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            Close Panel
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

