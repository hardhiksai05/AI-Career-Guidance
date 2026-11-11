"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  ChevronDown,
  Filter,
  Sparkles,
  RotateCcw,
  BookOpen,
  Code2,
} from "lucide-react";
import {
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  CAREER_FAMILIES,
  getAllCareerRoles,
  getBranchById,
  BTechCourse,
} from "@/lib/btech-catalog";

interface SuggestionItem {
  id: string;
  courseId: string;
  title: string;
  degreeName: string;
  branchName: string;
  badgeCode: string;
  matchedVia: string;
}

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBranchId: string;
  onBranchChange: (b: string) => void;
  selectedFamilyId: string;
  onFamilyChange: (f: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (d: string) => void;
  selectedDuration: string;
  onDurationChange: (dur: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  filteredCount: number;
  totalCount: number;
}

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

export const CourseCatalogueSearchEngine: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  selectedBranchId,
  onBranchChange,
  selectedFamilyId,
  onFamilyChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDuration,
  onDurationChange,
  selectedCategory,
  onCategoryChange,
  filteredCount,
  totalCount,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allRoles = useMemo(() => getAllCareerRoles(), []);

  // Compute Autocomplete Suggestions using Intelligent Matching
  const suggestions: SuggestionItem[] = useMemo(() => {
    const raw = searchQuery.trim().toLowerCase();
    if (!raw) return [];

    const matches: SuggestionItem[] = [];
    const addedCourseIds = new Set<string>();

    // 1. Check alias expansion (e.g. "CSE" -> "computer science and engineering")
    const expandedTerms = ALIAS_MAP[raw] || [];

    for (const course of BTECH_COURSES) {
      const cName = course.name.toLowerCase();
      const cCode = course.code.toLowerCase();
      const cDegree = course.degreeName.toLowerCase();
      const cBranch = course.branchId.toLowerCase();
      const branchObj = getBranchById(course.branchId);
      const bName = branchObj?.name.toLowerCase() || "";

      let matchedVia = "";

      // Exact or partial name/code match
      if (cName.includes(raw) || cCode.includes(raw)) {
        matchedVia = "Course Title Match";
      } else if (cDegree.includes(raw)) {
        matchedVia = "Degree Match";
      } else if (bName.includes(raw) || cBranch.includes(raw)) {
        matchedVia = "Branch Alignment";
      } else if (expandedTerms.some((term) => cName.includes(term))) {
        matchedVia = "Intelligent Alias";
      } else if (course.coreSubjects.some((s) => s.toLowerCase().includes(raw))) {
        matchedVia = "Core Subject";
      } else if (course.expectedSkills.some((s) => s.toLowerCase().includes(raw))) {
        matchedVia = "Key Competency";
      } else {
        // Career role match
        const matchingRole = allRoles.find(
          (r) =>
            course.relatedCareerIds.includes(r.id) &&
            (r.title.toLowerCase().includes(raw) || r.tagline.toLowerCase().includes(raw))
        );
        if (matchingRole) {
          matchedVia = `Career: ${matchingRole.title}`;
        }
      }

      if (matchedVia && !addedCourseIds.has(course.id)) {
        addedCourseIds.add(course.id);
        matches.push({
          id: course.id,
          courseId: course.id,
          title: course.name,
          degreeName: course.degreeName,
          branchName: branchObj?.name || "Engineering",
          badgeCode: course.code,
          matchedVia,
        });
      }

      if (matches.length >= 8) break;
    }

    return matches;
  }, [searchQuery, allRoles]);

  // Keyboard navigation for dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && searchQuery.trim()) {
        e.preventDefault();
        setIsOpen(false);
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
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Click outside to dismiss dropdown
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

  // Select suggestion: updates search query & filter, allows direct navigation
  const handleSelectSuggestion = (item: SuggestionItem) => {
    onSearchChange(item.title);
    setIsOpen(false);
    // Directly navigate to course details page
    router.push(`/dashboard/roadmaps/courses/${item.courseId}`);
  };

  // Reset all filters
  const handleResetFilters = () => {
    onSearchChange("");
    onBranchChange("all");
    onFamilyChange("all");
    onDifficultyChange("all");
    onDurationChange("all");
    onCategoryChange("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedBranchId !== "all" ||
    selectedFamilyId !== "all" ||
    selectedDifficulty !== "all" ||
    selectedDuration !== "all" ||
    selectedCategory !== "all";

  // Highlight matching text helper
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
      {/* Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>AI-Powered Course Search Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Find Your Engineering Course
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Search any B.Tech course, specialization, engineering subject or career to view curriculum prerequisites and roadmap tracks.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
          <span>Results:</span>
          <strong className="text-accent-cyan">{filteredCount}</strong>
          <span>of</span>
          <strong className="text-white">{totalCount}</strong>
        </div>
      </div>

      {/* 1. Large Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none transition-colors" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => {
              if (searchQuery.trim().length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search any B.Tech course, specialization, engineering subject or career (e.g. CSE, AI & ML, VLSI, Robotics, Frontend)..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-accent-purple/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent-purple/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
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

        {/* Intelligent Autocomplete Dropdown */}
        {isOpen && searchQuery.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#0a0d26] border border-purple-500/30 shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="p-2.5 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 px-4">
              <span>Matching Courses & Specializations ({suggestions.length})</span>
              <span className="hidden sm:inline">Press Enter or Click to view course details</span>
            </div>

            {suggestions.length === 0 ? (
              <div className="p-6 text-center space-y-1">
                <p className="text-sm font-semibold text-slate-300">No matching courses found</p>
                <p className="text-xs text-slate-500">
                  Try searching for &quot;CSE&quot;, &quot;VLSI&quot;, &quot;Artificial Intelligence&quot;, or &quot;Robotics&quot;.
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
                          <GraduationCap className="w-4 h-4 text-accent-purple" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white truncate">
                              {highlightMatch(item.title, searchQuery)}
                            </h4>
                            <span className="text-[10px] font-mono text-accent-cyan font-bold">
                              ({item.badgeCode})
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate">
                            {item.degreeName} • <span className="text-slate-300">{item.branchName}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-cyan-950/80 text-cyan-300 border-cyan-500/40">
                          {item.matchedVia}
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

      {/* 2. Search Filters Row */}
      <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Branch Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Branch
          </label>
          <div className="relative">
            <select
              value={selectedBranchId}
              onChange={(e) => onBranchChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                All Branches (9)
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

        {/* Career Family Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Career Family
          </label>
          <div className="relative">
            <select
              value={selectedFamilyId}
              onChange={(e) => onFamilyChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                All Career Families (7)
              </option>
              {CAREER_FAMILIES.map((f) => (
                <option key={f.id} value={f.id} className="bg-[#0b0e24] text-white">
                  {f.name} ({f.roleCount})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Difficulty Level
          </label>
          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                All Difficulties
              </option>
              <option value="Beginner" className="bg-[#0b0e24] text-white">
                Beginner
              </option>
              <option value="Intermediate" className="bg-[#0b0e24] text-white">
                Intermediate
              </option>
              <option value="Advanced" className="bg-[#0b0e24] text-white">
                Advanced
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Learning Duration */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Duration
          </label>
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => onDurationChange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-accent-purple pr-8 transition-colors cursor-pointer"
            >
              <option value="all" className="bg-[#0b0e24] text-white">
                Any Duration
              </option>
              <option value="1-3-months" className="bg-[#0b0e24] text-white">
                1–3 Months
              </option>
              <option value="3-6-months" className="bg-[#0b0e24] text-white">
                3–6 Months
              </option>
              <option value="6-12-months" className="bg-[#0b0e24] text-white">
                6–12 Months
              </option>
              <option value="12-18-months" className="bg-[#0b0e24] text-white">
                12–18 Months
              </option>
              <option value="18-24-months" className="bg-[#0b0e24] text-white">
                18–24 Months
              </option>
              <option value="24-plus-months" className="bg-[#0b0e24] text-white">
                24+ Months (Degree)
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex flex-col justify-end">
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            className={`w-full py-2 px-3.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 h-[34px] ${
              hasActiveFilters
                ? "bg-white/10 text-white border-white/20 hover:bg-white/20 cursor-pointer"
                : "bg-white/[0.02] text-slate-600 border-white/5 cursor-not-allowed"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
