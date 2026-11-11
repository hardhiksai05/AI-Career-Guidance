"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  GraduationCap,
  Briefcase,
  Compass,
  ArrowRight,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import {
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  CAREER_FAMILIES,
  getAllCareerRoles,
  getCoursesByBranch,
  getBranchById,
  BTechCourse,
} from "@/lib/btech-catalog";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";
import { CourseCatalogueSearchEngine } from "@/components/roadmaps/CourseCatalogueSearchEngine";
import { PremiumLoadingScreen } from "@/components/ui/PremiumLoadingScreen";

const ITEMS_PER_PAGE = 12;

// Aliases and domain abbreviations mapping for intelligent discovery
const ALIAS_MAP: Record<string, string[]> = {
  cse: ["computer science and engineering", "software engineering", "computer engineering"],
  cs: ["computer science and engineering", "software engineering"],
  it: ["information technology", "computer science and engineering"],
  ai: ["artificial intelligence and machine learning", "artificial intelligence and data science"],
  ml: ["artificial intelligence and machine learning"],
  aiml: ["artificial intelligence and machine learning"],
  "ai&ml": ["artificial intelligence and machine learning"],
  ds: ["data science", "big data analytics", "artificial intelligence and data science"],
  aids: ["artificial intelligence and data science"],
  "ai&ds": ["artificial intelligence and data science"],
  vlsi: ["vlsi design and technology", "microelectronics", "semiconductor technology"],
  embedded: ["embedded systems", "iot", "internet of things"],
  robotics: ["robotics and automation", "robotics engineering", "mechatronics engineering"],
  ece: ["electronics and communication engineering", "vlsi", "embedded systems", "communication systems"],
  eee: ["electrical and electronics engineering", "power electronics", "electric vehicle technology"],
  ee: ["electrical engineering", "power systems engineering", "electrical machines"],
  iot: ["internet of things"],
  cyber: ["cyber security", "computer science and information security"],
  security: ["cyber security", "computer science and information security"],
  mech: ["mechanical engineering", "automobile engineering", "mechatronics engineering", "production engineering"],
  cad: ["cad/cam engineering", "automotive design engineering", "mechanical engineering"],
  cam: ["cad/cam engineering", "manufacturing engineering"],
  ev: ["electric vehicle technology", "power electronics"],
  civil: ["civil engineering", "structural engineering", "transportation engineering", "environmental engineering"],
  chem: ["chemical engineering", "petroleum engineering", "polymer engineering"],
  bio: ["biotechnology", "biomedical engineering", "bioinformatics", "genetic engineering"],
  biotech: ["biotechnology", "bioinformatics", "genetic engineering"],
  aero: ["aerospace engineering", "aeronautical engineering", "avionics engineering"],
  frontend: ["computer science and engineering", "information technology", "software engineering"],
  backend: ["computer science and engineering", "information technology", "software engineering"],
  "ai engineer": ["artificial intelligence and machine learning", "artificial intelligence and data science", "data science"],
  "data analyst": ["data science", "big data analytics", "computer science and business systems"],
  "cloud engineer": ["cloud computing", "computer science and engineering", "information technology"],
};

function CoursesCatalogueContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBranch = searchParams.get("branch") || "all";
  const initialSearch = searchParams.get("search") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBranchId, setSelectedBranchId] = useState(initialBranch);
  const [selectedFamilyId, setSelectedFamilyId] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const allRoles = useMemo(() => getAllCareerRoles(), []);

  // Update URL query parameters on filter changes without full reload
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBranchId !== "all") params.set("branch", selectedBranchId);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    const queryString = params.toString();
    const targetUrl = queryString ? `/dashboard/roadmaps/courses?${queryString}` : "/dashboard/roadmaps/courses";
    window.history.replaceState(null, "", targetUrl);
  }, [selectedBranchId, searchQuery]);

  // Intelligent Filtered Courses based on all combined criteria
  const filteredCourses = useMemo(() => {
    const raw = searchQuery.trim().toLowerCase();
    const expandedTerms = raw ? ALIAS_MAP[raw] || [] : [];

    return BTECH_COURSES.filter((course) => {
      // 1. Engineering Branch filter
      if (selectedBranchId !== "all" && course.branchId !== selectedBranchId) {
        return false;
      }

      // 2. Career Family filter (matches courses whose related careers fall in this family)
      if (selectedFamilyId !== "all") {
        const familyRoles = allRoles.filter((r) => r.familyId === selectedFamilyId);
        const familyRoleIds = new Set(familyRoles.map((r) => r.id));
        const hasMatchingRole = course.relatedCareerIds.some((id) => familyRoleIds.has(id));
        if (!hasMatchingRole) return false;
      }

      // 3. Difficulty Level filter (matches courses with career tracks at this difficulty)
      if (selectedDifficulty !== "all") {
        const hasMatchingDiffRole = course.relatedCareerIds.some((roleId) => {
          const role = allRoles.find((r) => r.id === roleId);
          return role?.difficulty === selectedDifficulty;
        });
        if (!hasMatchingDiffRole) return false;
      }

      // 4. Learning Duration filter
      if (selectedDuration !== "all") {
        if (selectedDuration === "24-plus-months") {
          // B.Tech 4-year degrees match 24+ months
        } else if (selectedDuration === "18-24-months") {
          if (!course.recommendedDuration.toLowerCase().includes("year")) return false;
        }
      }

      // 5. Search query filter (Intelligent matching: exact, partial, code, alias, subjects, skills, career roles, branch name)
      if (raw) {
        const cName = course.name.toLowerCase();
        const cCode = course.code.toLowerCase();
        const cDegree = course.degreeName.toLowerCase();
        const cOverview = course.overview.toLowerCase();
        const branchObj = getBranchById(course.branchId);
        const bName = branchObj?.name.toLowerCase() || "";

        const matchDirect =
          cName.includes(raw) ||
          cCode.includes(raw) ||
          cDegree.includes(raw) ||
          cOverview.includes(raw) ||
          bName.includes(raw);

        const matchAlias = expandedTerms.some((term) => cName.includes(term) || bName.includes(term));

        const matchSubject = course.coreSubjects.some((s) => s.toLowerCase().includes(raw));
        const matchSkill = course.expectedSkills.some((s) => s.toLowerCase().includes(raw));

        // Career role keyword match (e.g. user searches "Frontend" or "AI Engineer")
        const matchCareerRole = course.relatedCareerIds.some((roleId) => {
          const role = allRoles.find((r) => r.id === roleId);
          if (!role) return false;
          return role.title.toLowerCase().includes(raw) || role.tagline.toLowerCase().includes(raw);
        });

        if (!matchDirect && !matchAlias && !matchSubject && !matchSkill && !matchCareerRole) {
          return false;
        }
      }

      return true;
    });
  }, [selectedBranchId, selectedFamilyId, selectedDifficulty, selectedDuration, searchQuery, allRoles]);

  // Reset page when any filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBranchId, selectedFamilyId, selectedDifficulty, selectedDuration, selectedCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const activeBranchObj = useMemo(() => {
    if (selectedBranchId === "all") return null;
    return getBranchById(selectedBranchId);
  }, [selectedBranchId]);

  return (
    <div className="space-y-8 relative pb-12">
      <AnimatedRoadmapBackground />

      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard/roadmaps" className="hover:text-accent-cyan transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Roadmaps</span>
          </Link>
          <span>/</span>
          <span className="text-white font-semibold">All Courses</span>
          {activeBranchObj && (
            <>
              <span>/</span>
              <span className="text-accent-cyan">{activeBranchObj.name}</span>
            </>
          )}
        </div>

        <Link
          href="/dashboard/roadmaps"
          className="text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1"
        >
          <span>Main Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 1. Page Heading and Description */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#101438] via-[#0c102a] to-[#070918] border border-white/10 shadow-2xl overflow-hidden">
        <div className="space-y-3 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Complete Academic Curriculum Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore All Engineering Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover engineering branches, specializations and career-oriented learning opportunities. Explore university prerequisites, semester subject structures, and direct career mappings.
          </p>
          <div className="text-xs font-mono text-slate-400 pt-1">
            Showing <span className="text-white font-bold">{filteredCourses.length}</span> of{" "}
            <span className="text-accent-cyan font-bold">{BTECH_COURSES.length}</span> university specializations across{" "}
            <span className="text-accent-purple font-bold">{ENGINEERING_BRANCHES.length}</span> branches
          </div>
        </div>
      </div>

      {/* 2 & 3. AI-Powered Course Search Engine & Multi-Filter Controls */}
      <CourseCatalogueSearchEngine
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBranchId={selectedBranchId}
        onBranchChange={setSelectedBranchId}
        selectedFamilyId={selectedFamilyId}
        onFamilyChange={setSelectedFamilyId}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredCount={filteredCourses.length}
        totalCount={BTECH_COURSES.length}
      />

      {/* 4. Engineering Branch Categories (Category Pills) */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
          Filter by Engineering Branch
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-900/40">
          <button
            type="button"
            onClick={() => setSelectedBranchId("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
              selectedBranchId === "all"
                ? "bg-accent-purple text-white shadow-glow-purple"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All Branches ({BTECH_COURSES.length})
          </button>
          {ENGINEERING_BRANCHES.map((branch) => {
            const isSelected = selectedBranchId === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => setSelectedBranchId(branch.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-glow-purple"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{branch.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({branch.specializationCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Filtered Course Results */}
      {paginatedCourses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
          <p className="text-base font-semibold text-slate-300">No matching engineering courses found</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search terms or resetting filters using the &quot;Reset Filters&quot; button above.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedBranchId("all");
              setSelectedFamilyId("all");
              setSelectedDifficulty("all");
              setSelectedDuration("all");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedCourses.map((course) => {
            const branch = ENGINEERING_BRANCHES.find((b) => b.id === course.branchId);

            return (
              <div
                key={course.id}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#0b0e27]/90 to-[#070918]/90 border border-white/10 hover:border-purple-500/40 hover:bg-[#0e1234] transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Branch & Code Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        branch?.colorGradient.badgeBg || "bg-purple-950/80"
                      } ${branch?.colorGradient.badgeText || "text-purple-300"} border-white/10`}
                    >
                      {branch?.name || "Engineering"}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-accent-cyan">
                      {course.code}
                    </span>
                  </div>

                  {/* Course Name & Degree */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      {course.degreeName}
                    </p>
                  </div>

                  {/* Overview */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {course.overview}
                  </p>

                  {/* Meta Stats: Duration & Career Opportunities */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{course.recommendedDuration.split("(")[0].trim()}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-accent-cyan" />
                      <span>{course.relatedCareerIds.length} Career Tracks</span>
                    </div>
                  </div>

                  {/* Expected Skills Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      Target Competencies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {course.expectedSkills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.expectedSkills.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                          +{course.expectedSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action: View Course Details */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <Link
                    href={`/dashboard/roadmaps/courses/${course.id}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-cyan text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-transparent text-center"
                  >
                    <span>View Course Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {course.roadmapId && (
                    <Link
                      href={`/dashboard/roadmaps/${course.roadmapId}`}
                      title="Launch Roadmap Directly"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-accent-cyan hover:text-white transition-colors border border-white/10"
                    >
                      <Compass className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 flex items-center justify-between border-t border-white/10 text-xs font-mono text-slate-400">
          <div>
            Page <span className="text-white font-bold">{currentPage}</span> of{" "}
            <span className="text-white font-bold">{totalPages}</span> ({filteredCourses.length} Total Results)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/30 text-white font-bold">
              {currentPage}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoursesCataloguePage() {
  return (
    <Suspense fallback={<PremiumLoadingScreen preset="roadmap" />}>
      <CoursesCatalogueContent />
    </Suspense>
  );
}
