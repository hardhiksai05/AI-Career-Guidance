"use client";

import React from "react";
import { EngineeringBranch } from "@/lib/btech-catalog/types";
import {
  Code2,
  Cpu,
  Zap,
  Cog,
  Building2,
  FlaskConical,
  Dna,
  Rocket,
  Layers,
  ArrowRight,
  BookOpen,
  Briefcase,
} from "lucide-react";

interface BranchCatalogueGridProps {
  branches: EngineeringBranch[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
}

function renderBranchIcon(iconName: string, className = "w-6 h-6") {
  switch (iconName) {
    case "Code2":
      return <Code2 className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "Cog":
      return <Cog className={className} />;
    case "Building2":
      return <Building2 className={className} />;
    case "FlaskConical":
      return <FlaskConical className={className} />;
    case "Dna":
      return <Dna className={className} />;
    case "Rocket":
      return <Rocket className={className} />;
    default:
      return <Layers className={className} />;
  }
}

export const BranchCatalogueGrid: React.FC<BranchCatalogueGridProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            1. Select an Engineering Branch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Browse our centralized B.Tech catalogue covering 9 foundational engineering branches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => {
          const isSelected = selectedBranchId === branch.id;

          return (
            <div
              key={branch.id}
              onClick={() => onSelectBranch(branch.id)}
              className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-b from-[#181d45] to-[#0c102a] border-accent-purple shadow-glow-purple scale-[1.01]"
                  : "bg-[#0b0e26]/80 border-white/10 hover:border-white/20 hover:bg-[#101438]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-accent-cyan to-pink-500" />
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected
                        ? "bg-accent-purple text-white shadow-lg shadow-purple-950/60"
                        : "bg-white/5 border border-white/10 text-accent-cyan"
                    }`}
                  >
                    {renderBranchIcon(branch.iconName)}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${branch.colorGradient.badgeBg} ${branch.colorGradient.badgeText} ${branch.colorGradient.border}`}
                  >
                    {branch.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-accent-cyan transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {branch.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-accent-purple" />
                    <strong>{branch.specializationCount}</strong> Specializations
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
                    <strong>{branch.availableCareerFamilies.length}</strong> Career Families
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
                <span
                  className={
                    isSelected ? "text-accent-cyan" : "text-slate-400 group-hover:text-slate-200"
                  }
                >
                  {isSelected ? "Branch Selected" : "Explore Specializations"}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isSelected ? "text-accent-cyan" : "text-slate-400"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
