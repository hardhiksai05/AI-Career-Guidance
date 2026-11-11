"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Compass, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RoadmapHeaderProps {
  totalCoursesCount: number;
  totalBranchesCount: number;
  totalRolesCount: number;
}

export const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  totalCoursesCount,
  totalBranchesCount,
  totalRolesCount,
}) => {
  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#101438] via-[#0c102a] to-[#070918] border border-purple-500/20 overflow-hidden shadow-2xl">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[320px] bg-accent-purple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[350px] h-[240px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 space-y-5 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="md" dot className="shadow-glow-purple px-3 py-1">
            <Compass className="w-3.5 h-3.5 text-accent-cyan mr-1.5" />
            B.Tech Engineering & Career Roadmap System
          </Badge>
          <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            {totalBranchesCount} Engineering Branches • {totalCoursesCount} University Specializations • {totalRolesCount} Career Tracks
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Explore Your <span className="text-gradient-purple-cyan">Career Roadmaps</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Choose your engineering branch, discover career paths, and follow a structured learning journey from beginner to industry-ready professional.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Curated using global reference roadmaps (including roadmap.sh for software, accredited engineering standards, and national competitive commissions). Explore technical software tracks, core engineering disciplines, business leadership, or public service careers.
          </p>
        </div>
      </div>
    </div>
  );
};
