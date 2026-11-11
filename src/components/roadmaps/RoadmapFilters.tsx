"use client";

import React from "react";
import { Search, X, SlidersHorizontal, BookOpen, Layers } from "lucide-react";
import { ENGINEERING_BRANCHES } from "@/lib/btech-catalog/branches";
import { CAREER_FAMILIES } from "@/lib/btech-catalog/career-families";
import { EngineeringBranchId, CareerFamilyId, RoadmapDifficulty } from "@/lib/btech-catalog/types";

interface RoadmapFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBranch: string; // "all" or EngineeringBranchId
  onBranchChange: (branchId: string) => void;
  selectedFamily: string; // "all" or CareerFamilyId
  onFamilyChange: (familyId: string) => void;
  selectedDifficulty: string; // "all" | "Beginner" | "Intermediate" | "Advanced"
  onDifficultyChange: (difficulty: string) => void;
  selectedDuration: string; // "all" | "< 6 months" | "6-12 months" | "> 12 months"
  onDurationChange: (duration: string) => void;
  filteredCoursesCount: number;
  filteredRolesCount: number;
}

export const RoadmapFilters: React.FC<RoadmapFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  selectedFamily,
  onFamilyChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDuration,
  onDurationChange,
  filteredCoursesCount,
  filteredRolesCount,
}) => {
  return (
    <div className="space-y-4 rounded-3xl p-5 sm:p-6 bg-[#0c102a]/80 border border-white/10 backdrop-blur-md">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-accent-cyan absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by course name, degree specialization, or career role (e.g. Artificial Intelligence, VLSI, Robotics, Frontend)..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/40 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Engineering Branch Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 font-semibold block">
            Engineering Branch
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-accent-purple text-xs"
          >
            <option value="all">All Engineering Branches (9)</option>
            {ENGINEERING_BRANCHES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>
        </div>

        {/* Career Family Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 font-semibold block">
            Career Family
          </label>
          <select
            value={selectedFamily}
            onChange={(e) => onFamilyChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-accent-purple text-xs"
          >
            <option value="all">All Career Families (7)</option>
            {CAREER_FAMILIES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.roleCount} roles)
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 font-semibold block">
            Difficulty Level
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-accent-purple text-xs"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="Beginner">Beginner (Foundational)</option>
            <option value="Intermediate">Intermediate (Core Practice)</option>
            <option value="Advanced">Advanced (Specialized)</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 font-semibold block">
            Learning Duration
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-accent-purple text-xs"
          >
            <option value="all">All Durations</option>
            <option value="short">Under 6 Months</option>
            <option value="medium">6 to 12 Months</option>
            <option value="long">Degree / Multi-Year</option>
          </select>
        </div>
      </div>

      {/* Quick Pills for Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Quick Tier:</span>
          {["all", "Beginner", "Intermediate", "Advanced"].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => onDifficultyChange(tier)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                selectedDifficulty === tier
                  ? "bg-accent-purple text-white font-bold shadow-glow-purple"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tier === "all" ? "All Levels" : tier}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Showing: <strong className="text-white">{filteredCoursesCount}</strong> Courses &{" "}
          <strong className="text-white">{filteredRolesCount}</strong> Careers
        </div>
      </div>
    </div>
  );
};
