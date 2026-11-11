"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  GraduationCap,
  Clock,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Wrench,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import {
  getCourseById,
  getBranchById,
  getCoursesByBranch,
  getAllCareerRoles,
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  BTechCourse,
  CareerRole,
} from "@/lib/btech-catalog";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";

  const course = useMemo(() => {
    return getCourseById(courseId);
  }, [courseId]);

  const branch = useMemo(() => {
    if (!course) return null;
    return getBranchById(course.branchId);
  }, [course]);

  const allRoles = useMemo(() => getAllCareerRoles(), []);

  // Associated Career Roles for this course
  const associatedRoles = useMemo(() => {
    if (!course) return [];
    const directMatches = allRoles.filter((r) =>
      course.relatedCareerIds.includes(r.id)
    );
    if (directMatches.length > 0) return directMatches;

    // Fallback: roles in the same branch
    return allRoles
      .filter((r) => r.eligibleBranches.includes(course.branchId) || r.eligibleBranches.includes("all"))
      .slice(0, 4);
  }, [course, allRoles]);

  // Related Courses in the same branch
  const relatedCourses = useMemo(() => {
    if (!course) return [];
    return getCoursesByBranch(course.branchId)
      .filter((c) => c.id !== course.id)
      .slice(0, 3);
  }, [course]);

  // If course not found
  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          <ShieldAlert className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md">
          The requested engineering course ID &quot;{courseId}&quot; could not be found in the B.Tech catalogue.
        </p>
        <Link
          href="/dashboard/roadmaps/courses"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-xs font-bold shadow-glow-purple"
        >
          Back to All Courses
        </Link>
      </div>
    );
  }

  const effectiveRoadmapId = course.roadmapId || `roadmap-${course.id}`;

  return (
    <div className="space-y-10 relative pb-12">
      <AnimatedRoadmapBackground />

      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard/roadmaps" className="hover:text-accent-cyan transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Roadmaps</span>
          </Link>
          <span>/</span>
          <Link href="/dashboard/roadmaps/courses" className="hover:text-accent-cyan transition-colors">
            All Courses
          </Link>
          <span>/</span>
          <span className="text-accent-cyan truncate max-w-xs">{course.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/roadmaps/courses"
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors"
          >
            ← Back to Catalog
          </Link>
          <Link
            href={`/dashboard/roadmaps/${effectiveRoadmapId}`}
            className="text-xs font-mono font-bold text-white px-4 py-1.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan hover:brightness-110 shadow-glow-purple transition-all flex items-center gap-1.5"
          >
            <span>Open Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#101438] via-[#0c102a] to-[#070918] border border-white/10 shadow-2xl overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
              branch?.colorGradient.badgeBg || "bg-purple-950/80"
            } ${branch?.colorGradient.badgeText || "text-purple-300"} border-white/10`}
          >
            {branch?.name || "Engineering"}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Degree Code: <strong className="text-white">{course.code}</strong>
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{course.recommendedDuration}</span>
          </span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {course.name}
          </h1>
          <p className="text-base sm:text-lg font-mono text-accent-cyan font-semibold">
            {course.degreeName}
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.overview}
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href={`/dashboard/roadmaps/${effectiveRoadmapId}`}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan hover:brightness-110 active:scale-[0.99] text-white text-sm font-bold shadow-glow-purple transition-all flex items-center gap-2.5 group"
          >
            <Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
            <span>Open Learning Roadmap</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard/roadmaps/courses"
            className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-semibold border border-white/10 transition-colors"
          >
            Browse Other Specializations
          </Link>
        </div>
      </div>

      {/* Grid: Prerequisites & Core Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prerequisites */}
        <div className="p-6 rounded-3xl bg-[#0b0e27]/80 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="text-base font-bold text-white">Recommended Prerequisites</h3>
          </div>
          <p className="text-xs text-slate-400">
            Foundational knowledge recommended before entering this university specialization:
          </p>
          <div className="space-y-2">
            {course.prerequisites.map((prereq, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{prereq}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Subjects / Curriculum Structure */}
        <div className="p-6 rounded-3xl bg-[#0b0e27]/80 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-accent-cyan">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-base font-bold text-white">Core Subjects & Semester Topics</h3>
          </div>
          <p className="text-xs text-slate-400">
            Pivotal academic subjects covered throughout the university curriculum:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {course.coreSubjects.map((subject, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-slate-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                <span className="truncate">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Competencies & Industry Skills */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0e27]/80 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-accent-purple">
          <Code2 className="w-5 h-5 text-accent-cyan" />
          <h3 className="text-lg font-bold text-white">Target Competencies & Industry Skills</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Skills and hands-on proficiencies that employers and recruiters expect from graduates of this specialization:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {course.expectedSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-mono hover:border-purple-500/40 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Associated Career Opportunities */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-accent-cyan" />
            <span>High-Growth Career Opportunities</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Professional industry roles directly associated with graduates from this degree specialization:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {associatedRoles.map((role) => (
            <div
              key={role.id}
              className="p-5 rounded-3xl bg-[#0b0e26]/90 border border-white/10 hover:border-purple-500/40 hover:bg-[#10143a] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-wider">
                    {role.familyId.replace("-", " & ").toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    {role.difficulty}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {role.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {role.tagline}
                </p>

                <div className="pt-1 flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Avg: <strong className="text-white">{role.averageSalary.split(" ")[0]}</strong></span>
                  <span>•</span>
                  <span>Growth: <strong className="text-emerald-400">{role.growthOutlook}</strong></span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {role.prerequisites.slice(0, 2).join(", ")}
                </span>
                <Link
                  href={`/dashboard/roadmaps/${role.roadmapId || role.id}`}
                  className="text-xs font-mono font-bold text-accent-cyan hover:underline flex items-center gap-1"
                >
                  <span>Launch Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Courses in the Same Branch */}
      {relatedCourses.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-purple" />
              <span>Related Specializations in {branch?.name}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Other related B.Tech tracks within the same engineering department:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCourses.map((rel) => (
              <Link
                key={rel.id}
                href={`/dashboard/roadmaps/courses/${rel.id}`}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all space-y-2 group block"
              >
                <div className="text-[10px] font-mono text-accent-cyan font-bold">
                  {rel.code}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {rel.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {rel.overview}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
