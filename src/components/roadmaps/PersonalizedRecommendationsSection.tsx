"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import {
  PersonalizedRecommendation,
  getCareerRoleById,
  getCourseById,
  getRoadmapById,
  getBranchById,
} from "@/lib/btech-catalog";

interface Props {
  recommendations: PersonalizedRecommendation[];
  studentBranch?: string;
  studentDegree?: string;
}

export const PersonalizedRecommendationsSection: React.FC<Props> = ({
  recommendations,
  studentBranch,
  studentDegree,
}) => {
  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-accent-cyan text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Learning Trajectories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Personalized Roadmap Recommendations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore learning paths selected according to your academic background, existing skills and career interests.
          </p>
        </div>

        {studentBranch && (
          <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>Profile: {studentBranch}</span>
          </div>
        )}
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendations.slice(0, 6).map((rec, idx) => {
          const role = getCareerRoleById(rec.roleOrCourseId);
          const course = getCourseById(rec.roleOrCourseId);
          const roadmap = getRoadmapById(rec.roadmapId);

          const description =
            role?.tagline || course?.overview || roadmap?.overview || "Structured 7-phase learning roadmap.";
          const difficulty = role?.difficulty || roadmap?.difficulty || "Intermediate";
          const duration = roadmap?.estimatedTotalDuration || course?.recommendedDuration || "6–12 Months";
          const branchName = course
            ? getBranchById(course.branchId)?.name
            : role?.familyId
            ? role.familyId.replace("-", " & ").toUpperCase()
            : "Engineering";
          const skills =
            role?.prerequisites ||
            course?.expectedSkills ||
            (roadmap
              ? roadmap.phases.flatMap((p) => p.topics).map((t) => t.title).slice(0, 4)
              : ["Core Fundamentals", "Applied Architecture"]);

          const isDirectBranch = rec.category === "Degree Direct Match";

          return (
            <div
              key={`${rec.roleOrCourseId}-${idx}`}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0b0e27]/90 to-[#070918]/90 border border-white/10 hover:border-purple-500/40 hover:bg-[#0e1234] transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              {/* Subtle Ambient Corner Glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20 ${
                  isDirectBranch ? "bg-accent-cyan" : "bg-accent-purple"
                }`}
              />

              <div className="space-y-4 relative z-10">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isDirectBranch
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                        : "bg-purple-950/80 text-purple-300 border-purple-500/40"
                    }`}
                  >
                    {rec.category}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {difficulty}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">
                    {branchName}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Why This Roadmap is Recommended */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-accent-cyan" />
                    <span>Why Recommended</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {rec.reason}
                  </p>
                </div>

                {/* Prerequisite Notices (if cross-branch) */}
                {rec.missingPrerequisites && rec.missingPrerequisites.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Recommended Study: </span>
                      <span className="text-slate-400">
                        {rec.missingPrerequisites.join(", ")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Key Skills Covered */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    <span>Key Competencies</span>
                    <span>{duration.split("(")[0].trim()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-500">
                        +{skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button: Directly Open Roadmap Page */}
              <div className="pt-4 mt-4 border-t border-white/5">
                <Link
                  href={`/dashboard/roadmaps/${rec.roadmapId}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-cyan text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-transparent"
                >
                  <Compass className="w-4 h-4 text-accent-cyan group-hover/btn:text-white transition-colors" />
                  <span>Open Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
