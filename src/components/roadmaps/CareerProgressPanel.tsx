"use client";

import React from "react";
import { CareerItem, CareerAchievement, STANDARD_ACHIEVEMENTS } from "@/lib/career-catalog";
import {
  Trophy,
  Zap,
  Sparkles,
  Shield,
  Crown,
  Target,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface CareerProgressPanelProps {
  career: CareerItem;
  completedNodeIds: string[];
  userXp: number;
  userLevel: number;
  onSelectNextMission?: () => void;
}

export const CareerProgressPanel: React.FC<CareerProgressPanelProps> = ({
  career,
  completedNodeIds,
  userXp,
  userLevel,
  onSelectNextMission,
}) => {
  const totalNodes = career.nodes.length;
  const completedCount = career.nodes.filter((n) => completedNodeIds.includes(n.id)).length;
  const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;

  // Next recommended mission
  const nextNode =
    career.nodes.find((n) => !completedNodeIds.includes(n.id)) || career.nodes[career.nodes.length - 1];

  const achievements = career.achievements || STANDARD_ACHIEVEMENTS;

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-[#0a0d20]/90 border-2 border-purple-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
      {/* Background illumination */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-accent-cyan/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Banner: Career & Level */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/60 border border-pink-700/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> {career.difficultyRank || "S-Rank"} Specialization
            </span>
            <span className="text-xs font-mono text-accent-cyan font-semibold">
              {career.sector} Realm
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {career.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {career.tagline}
          </p>
        </div>

        {/* Level & XP Crest */}
        <div className="flex items-center gap-3.5 bg-black/40 border border-white/15 p-3 rounded-2xl shrink-0 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent-purple via-indigo-600 to-accent-cyan flex flex-col items-center justify-center font-black text-white shadow-glow-purple">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-200">LVL</span>
            <span className="text-xl leading-none font-mono">{userLevel}</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
              Career Experience
            </span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xl font-black text-amber-300">{userXp}</span>
              <span className="text-xs text-slate-400">/ 2000 XP</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              Tier {userLevel} Scholar
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Metric Cards */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" /> Quest Progression
          </span>
          <span className="font-extrabold text-accent-cyan">{progressPercent}% Cleared</span>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full p-0.5 border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-purple via-indigo-500 to-accent-cyan rounded-full transition-all duration-700 shadow-glow-cyan"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>
            {completedCount} of {totalNodes} Primary Missions Completed
          </span>
          <span>{career.estimatedDuration || "26 Weeks"} Curriculum Path</span>
        </div>
      </div>

      {/* Two Column Section: Next Mission Card & Achievement Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 relative z-10">
        {/* Next Recommended Mission */}
        {nextNode && (
          <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#121636] to-cyan-950/40 border border-purple-500/30 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" /> Next Recommended Mission
                </span>
                <span className="text-xs font-mono font-black text-amber-300 bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-400" /> +{nextNode.xpReward} XP
                </span>
              </div>

              <h4 className="text-base font-black text-white">{nextNode.questTitle}</h4>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {nextNode.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono text-accent-cyan">
                Stage {nextNode.level}: {nextNode.levelName}
              </span>

              {onSelectNextMission && (
                <button
                  type="button"
                  onClick={onSelectNextMission}
                  className="px-3.5 py-1.5 rounded-xl bg-accent-purple hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-purple transition-all"
                >
                  <span>Accept Mission</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Achievement Badges Rack */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Career Honors Rack
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {achievements.filter((a) => userXp >= a.unlockedAtXp).length}/{achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {achievements.map((ach) => {
              const isUnlocked = userXp >= ach.unlockedAtXp;
              return (
                <div
                  key={ach.id}
                  className={`relative p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all group ${
                    isUnlocked
                      ? "bg-gradient-to-b from-amber-500/20 to-purple-900/30 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] cursor-pointer"
                      : "bg-black/30 border-white/5 opacity-40 cursor-not-allowed"
                  }`}
                  title={`${ach.title}: ${ach.description} (${isUnlocked ? "Unlocked!" : `Unlocks at ${ach.unlockedAtXp} XP`})`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isUnlocked
                        ? "bg-amber-400/20 text-amber-300"
                        : "bg-white/5 text-slate-600"
                    }`}
                  >
                    {isUnlocked ? (
                      <Crown className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-300 mt-1 line-clamp-1">
                    {ach.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

