"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Compass,
  Briefcase,
  GraduationCap,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Layers,
  Code2,
  Check,
} from "lucide-react";
import {
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  getAllCareerRoles,
  getCoursesByBranch,
  EngineeringBranchId,
  BTechCourse,
  CareerRole,
} from "@/lib/btech-catalog";

interface SearchSuggestion {
  id: string;
  title: string;
  subtitle: string;
  type: "course" | "career" | "branch" | "skill";
  badgeText: string;
  badgeColor: string;
  roadmapId: string;
  courseId?: string;
}

export const RoadmapSearchEngine: React.FC = () => {
  const router = useRouter();

  // Search input state
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Compact selection controls state
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  const allRoles = useMemo(() => getAllCareerRoles(), []);

  // Filter courses available for the selected branch in dropdown
  const availableCourses = useMemo(() => {
    if (selectedBranchId === "all") return BTECH_COURSES;
    return getCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  // When branch changes, reset selected course if not in that branch
  const handleBranchChange = (branchId: string) => {
    setSelectedBranchId(branchId);
    setSelectedCourseId("all");
  };

  // Compile search suggestions from database (debounced via reactive query)
  const suggestions: SearchSuggestion[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchSuggestion[] = [];

    // 1. Search in B.Tech Courses & Specializations
    for (const course of BTECH_COURSES) {
      const matchName = course.name.toLowerCase().includes(q);
      const matchCode = course.code.toLowerCase().includes(q);
      const matchDegree = course.degreeName.toLowerCase().includes(q);
      const matchSubject = course.coreSubjects.some((s) => s.toLowerCase().includes(q));
      const matchSkill = course.expectedSkills.some((s) => s.toLowerCase().includes(q));

      if (matchName || matchCode || matchDegree || matchSubject || matchSkill) {
        const branch = ENGINEERING_BRANCHES.find((b) => b.id === course.branchId);
        results.push({
          id: `course-${course.id}`,
          title: course.name,
          subtitle: `${course.degreeName} • ${branch?.name || "Engineering"}`,
          type: "course",
          badgeText: course.code,
          badgeColor: "bg-purple-950/80 text-purple-300 border-purple-500/40",
          roadmapId: course.roadmapId || `roadmap-${course.id}`,
          courseId: course.id,
        });
      }
      if (results.length >= 10) break;
    }

    // 2. Search in Career Roles across all families
    if (results.length < 12) {
      for (const role of allRoles) {
        const matchTitle = role.title.toLowerCase().includes(q);
        const matchTagline = role.tagline.toLowerCase().includes(q);
        const matchPrereq = role.prerequisites.some((p) => p.toLowerCase().includes(q));

        if (matchTitle || matchTagline || matchPrereq) {
          results.push({
            id: `role-${role.id}`,
            title: role.title,
            subtitle: role.tagline,
            type: "career",
            badgeText: role.difficulty,
            badgeColor: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
            roadmapId: role.roadmapId || role.id,
          });
        }
        if (results.length >= 12) break;
      }
    }

    // 3. Search in Engineering Branches
    if (results.length < 14) {
      for (const branch of ENGINEERING_BRANCHES) {
        if (
          branch.name.toLowerCase().includes(q) ||
          branch.code.toLowerCase().includes(q) ||
          branch.shortDescription.toLowerCase().includes(q)
        ) {
          results.push({
            id: `branch-${branch.id}`,
            title: branch.name,
            subtitle: `${branch.specializationCount} Specializations • ${branch.code}`,
            type: "branch",
            badgeText: "Branch",
            badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
            roadmapId: `roadmap-branch-${branch.id}`,
          });
        }
      }
    }

    return results.slice(0, 10);
  }, [query, allRoles]);

  // Keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        handleExploreCustomQuery(query.trim());
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      } else {
        handleExploreCustomQuery(query.trim());
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Selection handler
  const handleSelectSuggestion = (item: SearchSuggestion) => {
    setQuery(item.title);
    setIsOpen(false);

    if (item.type === "course" && item.courseId) {
      router.push(`/dashboard/roadmaps/courses/${item.courseId}`);
    } else if (item.roadmapId) {
      router.push(`/dashboard/roadmaps/${item.roadmapId}`);
    } else {
      router.push(`/dashboard/roadmaps/courses?search=${encodeURIComponent(item.title)}`);
    }
  };

  // Fallback enter submit
  const handleExploreCustomQuery = (searchTxt: string) => {
    if (!searchTxt) return;
    // Check if query exactly matches a known course
    const course = BTECH_COURSES.find(
      (c) =>
        c.name.toLowerCase() === searchTxt.toLowerCase() ||
        c.code.toLowerCase() === searchTxt.toLowerCase()
    );
    if (course) {
      router.push(`/dashboard/roadmaps/courses/${course.id}`);
      return;
    }

    // Check if query matches a role
    const role = allRoles.find(
      (r) => r.title.toLowerCase() === searchTxt.toLowerCase() || r.id === searchTxt.toLowerCase()
    );
    if (role) {
      router.push(`/dashboard/roadmaps/${role.roadmapId || role.id}`);
      return;
    }

    // Otherwise navigate to courses catalog with query
    router.push(`/dashboard/roadmaps/courses?search=${encodeURIComponent(searchTxt)}`);
  };

  // Primary action button: Explore Roadmap based on select controls
  const handleExploreButton = () => {
    if (selectedCourseId !== "all") {
      const course = BTECH_COURSES.find((c) => c.id === selectedCourseId);
      if (course?.roadmapId) {
        router.push(`/dashboard/roadmaps/${course.roadmapId}`);
      } else if (course?.id) {
        router.push(`/dashboard/roadmaps/courses/${course.id}`);
      }
      return;
    }

    if (selectedBranchId !== "all") {
      router.push(`/dashboard/roadmaps/courses?branch=${selectedBranchId}`);
      return;
    }

    if (query.trim()) {
      handleExploreCustomQuery(query.trim());
      return;
    }

    // Default to Courses catalogue
    router.push("/dashboard/roadmaps/courses");
  };

  // Text highlight helper
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={i} className="text-accent-cyan font-bold bg-cyan-950/40 rounded px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c0f2b] via-[#090c22] to-[#060818] border border-white/10 shadow-2xl space-y-6">
      {/* Header Info */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span>AI-Powered Roadmap Search Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Find Your Perfect Learning Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Search any engineering course, specialization or career path and discover a structured learning journey designed to take you from beginner to advanced.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none transition-colors peer-focus:text-accent-cyan" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => {
              if (query.trim().length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search courses, specializations, careers or skills (e.g. AI & ML, VLSI, Robotics, Frontend, UPSC)..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-accent-purple/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent-purple/20 transition-all shadow-inner"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                setHighlightedIndex(-1);
                inputRef.current?.focus();
              }}
              className="absolute right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Autocomplete Dropdown */}
        {isOpen && query.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#0a0d26] border border-purple-500/30 shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="p-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 px-3">
              <span>Matching Courses & Career Roadmaps ({suggestions.length})</span>
              <span className="hidden sm:inline">Use ↑ ↓ to navigate • Enter to select</span>
            </div>

            {suggestions.length === 0 ? (
              <div className="p-6 text-center space-y-1">
                <p className="text-sm font-semibold text-slate-300">No matching roadmap found</p>
                <p className="text-xs text-slate-500">
                  Try searching for &quot;Computer Science&quot;, &quot;VLSI&quot;, &quot;Robotics&quot;, or &quot;AI Engineer&quot;.
                </p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                {suggestions.map((item, idx) => {
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`p-3.5 px-4 flex items-center justify-between cursor-pointer transition-all ${
                        isHighlighted
                          ? "bg-purple-900/30 border-l-4 border-accent-cyan pl-3"
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          {item.type === "course" && <GraduationCap className="w-4 h-4 text-accent-purple" />}
                          {item.type === "career" && <Briefcase className="w-4 h-4 text-accent-cyan" />}
                          {item.type === "branch" && <Compass className="w-4 h-4 text-emerald-400" />}
                          {item.type === "skill" && <Code2 className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {highlightMatch(item.title, query)}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">
                            {highlightMatch(item.subtitle, query)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                        >
                          {item.badgeText}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compact Course Selection & Learning Duration Controls */}
      <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Branch Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            1. Engineering Branch
          </label>
          <div className="relative">
            <select
              value={selectedBranchId}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                All Engineering Branches (9)
              </option>
              {ENGINEERING_BRANCHES.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#0b0e24] text-white">
                  {b.name} ({b.specializationCount})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Course / Specialization Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            2. University Course
          </label>
          <div className="relative">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                All Courses ({availableCourses.length})
              </option>
              {availableCourses.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0b0e24] text-white">
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Learning Duration Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            3. Preferred Duration
          </label>
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                Any Duration (Self-Paced)
              </option>
              <option value="1-3-months" className="bg-[#0b0e24] text-white">
                1–3 Months (Crash / Sprint)
              </option>
              <option value="3-6-months" className="bg-[#0b0e24] text-white">
                3–6 Months (Foundation)
              </option>
              <option value="6-12-months" className="bg-[#0b0e24] text-white">
                6–12 Months (Comprehensive)
              </option>
              <option value="12-18-months" className="bg-[#0b0e24] text-white">
                12–18 Months (Specialist)
              </option>
              <option value="18-24-months" className="bg-[#0b0e24] text-white">
                18–24 Months (Full Degree Depth)
              </option>
              <option value="24-plus-months" className="bg-[#0b0e24] text-white">
                More than 24 Months
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Action Button: Explore Roadmap */}
        <div className="flex flex-col justify-end">
          <button
            type="button"
            onClick={handleExploreButton}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-xs font-bold hover:brightness-110 active:scale-[0.99] transition-all shadow-glow-purple flex items-center justify-center gap-2 group h-[38px]"
          >
            <Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
