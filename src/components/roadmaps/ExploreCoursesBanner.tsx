"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Layers, GraduationCap } from "lucide-react";
import { ENGINEERING_BRANCHES, BTECH_COURSES } from "@/lib/btech-catalog";

export const ExploreCoursesBanner: React.FC = () => {
  return (
    <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#12163b] via-[#0d102e] to-[#080a1e] border border-purple-500/20 overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent-purple/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-64 h-64 bg-accent-cyan/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="space-y-3 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Full Academic & Degree Directory</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Explore the Complete Course Library
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Browse all engineering branches, university specializations and career-oriented learning paths in one place. Inspect curriculum prerequisites, tools, and semester competencies.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{ENGINEERING_BRANCHES.length} Major Branches</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-accent-purple" />
            <span>{BTECH_COURSES.length} Degree Specializations</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <Link
          href="/dashboard/roadmaps/courses"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan hover:brightness-110 active:scale-[0.99] text-white text-sm font-bold shadow-glow-purple transition-all group"
        >
          <span>Explore All Courses</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

