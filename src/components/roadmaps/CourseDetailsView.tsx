"use client";

import React, { useState } from "react";
import { BTechCourse, CareerRole } from "@/lib/btech-catalog/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Briefcase,
  ExternalLink,
} from "lucide-react";

interface CourseDetailsViewProps {
  courses: BTechCourse[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  onLaunchRoadmap: (roadmapId: string) => void;
  careerRoles: CareerRole[];
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onLaunchRoadmap,
  careerRoles,
}) => {
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Resolve related careers
  const relatedRoles = (selectedCourse?.relatedCareerIds || [])
    .map((roleId) => careerRoles.find((r) => r.id === roleId))
    .filter(Boolean) as CareerRole[];

  if (!selectedCourse) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            2. Specialization Curriculum & Course Details
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a specialized degree program to inspect its core subjects, required skills, and mapped career roadmaps.
          </p>
        </div>
        <span className="text-xs font-mono text-accent-cyan bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
          {courses.length} Specializations in this Branch
        </span>
      </div>

      {/* Horizontal Carousel of Specializations */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-900/50">
        {courses.map((course) => {
          const isSelected = course.id === selectedCourse.id;

          return (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelectCourse(course.id)}
              className={`px-4 py-2.5 rounded-2xl border text-left shrink-0 transition-all ${
                isSelected
                  ? "bg-purple-950/80 border-accent-purple text-white shadow-glow-purple font-bold"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              <div className="text-xs font-mono font-bold text-accent-cyan">{course.code}</div>
              <div className="text-xs truncate max-w-[200px]">{course.name}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Course Deep Dive Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#0b0e26] border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="purple" size="sm">
                Degree Code: {selectedCourse.code}
              </Badge>
              <Badge variant="cyan" size="sm">
                {selectedCourse.recommendedDuration}
              </Badge>
              {selectedCourse.hasDedicatedRoadmap && (
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Dedicated Roadmap Ready
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedCourse.degreeName}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
              {selectedCourse.overview}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => onLaunchRoadmap(selectedCourse.roadmapId || selectedCourse.id)}
              className="shadow-glow-purple flex items-center gap-2 text-sm w-full sm:w-auto"
            >
              <Compass className="w-4 h-4" /> Open Learning Roadmap
            </Button>
          </div>
        </div>

        {/* Core Subjects & Prerequisites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Subjects */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> University Core Subjects
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedCourse.coreSubjects.map((sub, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 shrink-0" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Skills & Prerequisites */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-purple flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Expected Professional Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCourse.expectedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs text-slate-300">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Prerequisites & Recommended Background:
              </span>
              <p className="text-slate-300">{selectedCourse.prerequisites.join(" • ")}</p>
            </div>
          </div>
        </div>

        {/* Related Careers Row */}
        {relatedRoles.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-accent-cyan" /> Direct Career Opportunities for this Specialization
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                Click any role to inspect its industry roadmap
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedRoles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => onLaunchRoadmap(role.roadmapId || role.id)}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent-purple/40 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-accent-cyan transition-colors">
                        {role.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{role.difficulty}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{role.tagline}</p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-accent-cyan">
                    <span>{role.averageSalary.split(" ")[0]}</span>
                    <span className="inline-flex items-center gap-0.5">
                      View Roadmap <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
