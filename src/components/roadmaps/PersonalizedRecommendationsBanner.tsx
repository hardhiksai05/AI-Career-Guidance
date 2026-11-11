"use client";

import React from "react";
import { PersonalizedRecommendation } from "@/lib/btech-catalog";
import { Sparkles, ArrowRight, AlertCircle, Compass } from "lucide-react";
import { motion } from "framer-motion";

interface PersonalizedRecommendationsBannerProps {
  recommendations: PersonalizedRecommendation[];
  studentBranch?: string;
  studentDegree?: string;
  onSelectRoadmap: (roadmapId: string) => void;
}

export const PersonalizedRecommendationsBanner: React.FC<PersonalizedRecommendationsBannerProps> = ({
  recommendations,
  studentBranch,
  studentDegree,
  onSelectRoadmap,
}) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-[#0b0f2a]/90 border border-purple-500/30 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-accent-cyan">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Personalized Roadmap Recommendations
            </h3>
            <p className="text-xs text-slate-400">
              {studentBranch || studentDegree
                ? `Calibrated for your background in ${studentDegree || studentBranch}`
                : "Calibrated from your student profile and career aspirations"}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Showing {recommendations.length} curated pathways
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            onClick={() => onSelectRoadmap(rec.roadmapId)}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border inline-block ${rec.badgeColor}`}
              >
                {rec.category}
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
                {rec.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {rec.reason}
              </p>

              {/* Missing Prerequisites Pill if cross-branch */}
              {rec.missingPrerequisites && rec.missingPrerequisites.length > 0 && (
                <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-300 space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-[10px] uppercase font-mono">
                    <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" /> Prerequisite Notice:
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Additional recommended study: {rec.missingPrerequisites.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-accent-cyan font-semibold">
              <span>Open Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
