"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CAREER_SECTORS, CareerSector } from "@/lib/career-catalog";
import {
  Sparkles,
  Search,
  Zap,
  Shield,
  Target,
  Compass,
  Trophy,
  Flame,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";

interface AnimeRoadmapHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedSector: string;
  onSectorSelect: (sec: string) => void;
  totalCareersCount: number;
  filteredCount: number;
  userXp: number;
  userLevel: number;
}

export const AnimeRoadmapHero: React.FC<AnimeRoadmapHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedSector,
  onSectorSelect,
  totalCareersCount,
  filteredCount,
  userXp,
  userLevel,
}) => {
  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#121636] via-[#0d122b] to-[#070a1a] border border-purple-500/30 overflow-hidden shadow-2xl">
      {/* Anime Energy Beams / Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[380px] h-[250px] bg-accent-cyan/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Subtitle & Search */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="purple" size="md" dot className="shadow-glow-purple px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan mr-1.5" />
              RPG Skill Tree & Cyber Progression
            </Badge>
            <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/40 border border-pink-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> Season 1: Destiny Awaken
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Choose Your <span className="text-gradient-purple-cyan">Destiny</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Every great career begins with your first mission.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Unlock progressive skill crystals, conquer real-world boss projects, and level up from
              Level 1 Foundation to Level 6 Apex Professional across 54 tech and industry domains.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-accent-cyan absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by career class, keyword or skill (e.g. AI Engineer, Full Stack, Robotics, Medicine)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all backdrop-blur-md"
              />
            </div>
            <span className="text-xs text-slate-400 flex items-center shrink-0 self-center">
              Active Quests: <strong className="text-white mx-1">{filteredCount}</strong> / {totalCareersCount}
            </span>
          </div>

          {/* Sector Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <button
              type="button"
              onClick={() => onSectorSelect("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSector === "All"
                  ? "bg-gradient-to-r from-accent-purple to-pink-600 text-white shadow-glow-purple scale-105"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              All Guilds ({totalCareersCount})
            </button>
            {CAREER_SECTORS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSectorSelect(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSector === sec.id
                    ? "bg-accent-cyan text-slate-950 shadow-glow-cyan scale-105"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {sec.label} ({sec.count})
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Original Futuristic Anime AI Mentor HUD */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-[#0a0d20]/80 border-2 border-cyan-500/30 backdrop-blur-2xl shadow-xl space-y-4 relative overflow-hidden group">
            {/* Holographic Top Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-accent-cyan uppercase">
                  Aegis • AI Navigator
                </span>
              </div>
              <span className="text-[11px] font-mono font-extrabold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-700/50">
                CLASS S-SCHOLAR
              </span>
            </div>

            {/* Mentor Persona Avatar Graphic (Original Anime Cyber Visor) */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-cyan shrink-0">
                <div className="w-full h-full rounded-2xl bg-[#080b18] flex items-center justify-center relative overflow-hidden">
                  {/* Stylized Cyber Visor Glyph */}
                  <div className="w-10 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4] animate-pulse" />
                  <div className="absolute bottom-2 text-[9px] font-mono font-bold text-purple-300">
                    AI•01
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-white">Mentor Directive</h4>
                <p className="text-xs text-slate-300 mt-0.5 italic leading-relaxed">
                  &ldquo;A journey of 10,000 lines of code begins with a single function call.&rdquo;
                </p>
              </div>
            </div>

            {/* RPG Status Gauges */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>XP Acquired</span>
                </div>
                <p className="text-base font-black text-white font-mono">{userXp} XP</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Trophy className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Current Tier</span>
                </div>
                <p className="text-base font-black text-accent-cyan font-mono">Level {userLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

