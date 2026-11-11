"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { PremiumLoadingScreen } from "@/components/ui/PremiumLoadingScreen";
import { StudentJobRecommendationView } from "@/lib/services/job-recommendation-service";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  Filter,
  CheckCircle2,
  Info,
  Bookmark,
  BookmarkCheck,
  Search,
  RefreshCw,
  Loader2,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  Zap,
} from "lucide-react";

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState<StudentJobRecommendationView[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Metadata from API
  const [cachedStatus, setCachedStatus] = useState<boolean>(true);
  const [modelUsed, setModelUsed] = useState<string>("gemini-2.5-flash-lite");
  const [jobSource, setJobSource] = useState<string>("adzuna_live");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContract, setSelectedContract] = useState<string>("All");
  const [selectedExperience, setSelectedExperience] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [hasSalaryOnly, setHasSalaryOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"match" | "newest" | "salary">("match");

  // Bookmarked Job IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Expanded Job Card for Details
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("saved_job_ids");
        if (saved) setBookmarkedIds(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Fetch job recommendations
  const fetchJobs = useCallback(
    async (forceSync = false) => {
      if (!user) {
        setLoading(false);
        return;
      }

      if (forceSync) {
        setSyncing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const token = await user.getIdToken();
        const url = forceSync ? "/api/jobs/sync" : "/api/jobs";
        const method = forceSync ? "POST" : "GET";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to load opportunities");
        }

        const data = await res.json();
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setCachedStatus(Boolean(data.cached));
          setModelUsed(data.modelUsed || "gemini-2.5-flash-lite");
          setJobSource(data.source || "adzuna");
          setLastUpdated(data.lastUpdated || new Date().toISOString());
        }
      } catch (err: any) {
        console.error("[OpportunitiesPage] Fetch error:", err);
        setError(err?.message || "Failed to load job listings");
      } finally {
        setLoading(false);
        setSyncing(false);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchJobs(false);
  }, [fetchJobs]);

  // Toggle Bookmark
  const toggleBookmark = (jobId: string, title: string, company: string) => {
    const isBookmarked = bookmarkedIds.includes(jobId);
    let updated: string[];

    if (isBookmarked) {
      updated = bookmarkedIds.filter((id) => id !== jobId);
      showToast({
        type: "info",
        title: "Bookmark Removed",
        description: `${title} at ${company} removed from your saved list.`,
        duration: 2500,
      });
    } else {
      updated = [...bookmarkedIds, jobId];
      showToast({
        type: "success",
        title: "Opportunity Saved",
        description: `${title} at ${company} saved to your bookmarks.`,
        duration: 2500,
      });
    }

    setBookmarkedIds(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("saved_job_ids", JSON.stringify(updated));
      } catch {}
    }
  };

  // Derive unique location filter options
  const locationOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      const loc = j.location.split(",")[0].trim();
      if (loc) set.add(loc);
    });
    return ["All", ...Array.from(set).slice(0, 8)];
  }, [jobs]);

  // Filtered & Sorted Jobs (up to 50 items)
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.location.toLowerCase().includes(q) ||
            j.requiredSkills.some((s) => s.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Contract type filter
        if (selectedContract !== "All") {
          if (selectedContract === "Internship" && j.contractType !== "internship") return false;
          if (selectedContract === "Full-Time" && j.contractType !== "full_time") return false;
          if (selectedContract === "Saved" && !bookmarkedIds.includes(j.id)) return false;
        }

        // Location filter
        if (selectedLocation !== "All") {
          if (!j.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
        }

        // Salary filter
        if (hasSalaryOnly && !j.salaryMin && !j.salaryMax) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "match") return b.matchScore - a.matchScore;
        if (sortBy === "newest") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        if (sortBy === "salary") return (b.salaryMax || 0) - (a.salaryMax || 0);
        return 0;
      })
      .slice(0, 50);
  }, [jobs, searchQuery, selectedContract, selectedLocation, hasSalaryOnly, sortBy, bookmarkedIds]);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Live Sync Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CV-Matched Job Opportunities
            </h1>
            <Badge variant="cyan" size="sm" dot>
              Gemini 2.5 Flash-Lite Active
            </Badge>
            <Badge variant="purple" size="sm">
              Adzuna Job Data Engine
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Real engineering and tech positions algorithmic-ranked against your CV skills, coursework, and degree.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fetchJobs(true)}
            disabled={loading || syncing}
            leftIcon={
              syncing ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )
            }
          >
            {syncing ? "Syncing Adzuna..." : "Sync Latest Jobs"}
          </Button>
        </div>
      </div>

      {/* 2. Caching & Performance Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0c122c]/90 via-[#0e1638]/80 to-[#0c122c]/90 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-accent-cyan shrink-0">
            <ShieldCheck className="w-5 h-5 text-accent-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-bold">
                {cachedStatus ? "Cached Opportunities Loaded" : "Live Opportunities Synchronized"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {cachedStatus ? "Zero AI credits consumed – instant database response" : "Processed with Gemini 2.5 Flash-Lite"}
              </span>
            </div>
            <div className="text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
              <span>Model: <strong className="text-slate-300 font-mono">{modelUsed}</strong></span>
              <span>•</span>
              <span>Source: <strong className="text-slate-300 capitalize">{jobSource.replace("_", " ")}</strong></span>
              {lastUpdated && (
                <>
                  <span>•</span>
                  <span>
                    Updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-accent-cyan bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            Showing {filteredJobs.length} of {jobs.length} Opportunities (Top 50 Cap)
          </span>
        </div>
      </div>

      {/* 3. Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-[#090d24] border border-white/10 space-y-3 shadow-lg">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, company, technology (e.g. Python, React, VLSI, Bangalore)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-accent-cyan transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-white/5">
          {/* Contract / Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Full-Time", "Internship", "Saved"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedContract(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedContract === t
                    ? "bg-accent-purple text-white shadow-glow-purple"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {t === "Saved" ? `Saved (${bookmarkedIds.length})` : t}
              </button>
            ))}
          </div>

          {/* Location & Sorting Selects */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Location selector */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc} className="bg-slate-900 text-white">
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary filter toggle */}
            <button
              onClick={() => setHasSalaryOnly(!hasSalaryOnly)}
              className={`px-2.5 py-1 rounded-lg text-xs border flex items-center gap-1 transition-colors ${
                hasSalaryOnly
                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <DollarSign className="w-3 h-3" />
              <span>Disclosed Salary</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300">
              <span className="text-[11px] text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="match" className="bg-slate-900 text-white">Best CV Match</option>
                <option value="newest" className="bg-slate-900 text-white">Newest First</option>
                <option value="salary" className="bg-slate-900 text-white">Highest Salary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Premium AI Job Discovery Loader */}
      {loading && (
        <PremiumLoadingScreen preset="jobs" />
      )}

      {/* 5. Error Banner */}
      {!loading && error && (
        <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            Unable to load job listings
          </div>
          <p className="text-xs text-rose-300">{error}</p>
          <Button variant="secondary" size="sm" onClick={() => fetchJobs()}>
            Retry Fetch
          </Button>
        </div>
      )}

      {/* 6. Empty State */}
      {!loading && !error && filteredJobs.length === 0 && (
        <div className="p-12 rounded-3xl bg-[#0b0f22]/70 border border-white/10 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No opportunities match your active filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try loosening your search query, resetting location preferences, or syncing the latest Adzuna listings.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedContract("All");
              setSelectedLocation("All");
              setHasSalaryOnly(false);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* 7. Opportunity Cards Grid */}
      {!loading && !error && filteredJobs.length > 0 && (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isBookmarked = bookmarkedIds.includes(job.id);
            const isExpanded = expandedJobId === job.id;

            const formattedSalary =
              job.salaryMin && job.salaryMax
                ? `₹${(job.salaryMin / 100000).toFixed(1)}L - ₹${(job.salaryMax / 100000).toFixed(1)}L / yr`
                : job.salaryMin
                ? `₹${(job.salaryMin / 100000).toFixed(1)}L+ / yr`
                : null;

            return (
              <div
                key={job.id}
                className="rounded-3xl bg-[#0b0f22]/90 border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-glow-cyan space-y-4 group"
              >
                {/* Top Row: Meta Badges & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Badge Pill Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono shadow-sm">
                        {job.matchScore}% CV Fit
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 capitalize">
                        {job.contractType?.replace("_", " ") || "Full-Time"}
                      </span>
                      {job.experienceLevel && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
                          {job.experienceLevel}
                        </span>
                      )}
                      {formattedSalary && (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {formattedSalary}
                        </span>
                      )}
                    </div>

                    {/* Job Title & Company */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-200">{job.company}</span>
                        <span>•</span>
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions: Save & Apply */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                    <button
                      onClick={() => toggleBookmark(job.id, job.title, job.company)}
                      className={`p-2.5 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                        isBookmarked
                          ? "bg-accent-purple/20 border-accent-purple text-accent-purple-light"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save Opportunity"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                      <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
                    </button>

                    <Button
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      className="shadow-glow-purple text-xs"
                    >
                      Apply on Employer Portal
                    </Button>
                  </div>
                </div>

                {/* Short Job Description Summary */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {job.descriptionSummary}
                </p>

                {/* Skills Analysis: Matched vs Missing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-white/5">
                  {/* Matched Skills */}
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                      Skills Matched from Your CV ({job.matchedSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills.length > 0 ? (
                        job.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px]"
                          >
                            ✓ {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic text-[11px]">
                          Foundational engineering eligibility
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <span className="text-[11px] font-semibold text-amber-300/90 block mb-1">
                      Skill Gap / Recommended to Learn ({job.missingSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.length > 0 ? (
                        job.missingSkills.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-800/40 text-amber-300 text-[11px]"
                          >
                            + {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-400 font-semibold text-[11px]">
                          Complete technical skill overlap!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match Explanation Box */}
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Compatibility Analysis:</strong>{" "}
                    <span className="text-slate-300">{job.matchExplanation}</span>
                  </div>
                </div>

                {/* Expandable Details Section */}
                {isExpanded && (
                  <div className="pt-3 border-t border-white/10 space-y-3 text-xs text-slate-300 animate-fade-in">
                    {/* Responsibilities */}
                    {job.responsibilities.length > 0 && (
                      <div>
                        <strong className="text-white block mb-1">Key Responsibilities:</strong>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                          {job.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Qualifications */}
                    {job.qualifications.length > 0 && (
                      <div>
                        <strong className="text-white block mb-1">Academic & Technical Eligibility:</strong>
                        <div className="flex flex-wrap gap-1">
                          {job.qualifications.map((q, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200 text-[11px]"
                            >
                              {q}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Raw Description Snippet */}
                    <div>
                      <strong className="text-white block mb-1">Full Listing Excerpt:</strong>
                      <p className="text-[11px] text-slate-400 bg-black/40 p-3 rounded-xl border border-white/5 font-mono leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Footer: Toggle Expand & Posting Meta */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Posted: {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>

                  <button
                    onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    className="text-accent-cyan hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>{isExpanded ? "Hide Details" : "Inspect Responsibilities & Eligibility"}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
