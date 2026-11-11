"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { CareerRecommendation } from "@/lib/recommendations";
import {
  Sparkles,
  TrendingUp,
  Compass,
  ArrowRight,
  Filter,
  Info,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  BotMessageSquare,
  MapPin,
  GraduationCap,
  Award,
  Layers,
  Briefcase,
  AlertCircle,
  RefreshCw,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { getProfile, getCareerPreferences } from "@/lib/services/profile-service";
import { getClientFallbackRecommendations } from "@/lib/client-recommendations";

export default function RecommendationsPage() {
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [studentSummary, setStudentSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [savingId, setSavingId] = useState<string | null>(null);

  // Fetch recommendations from server API
  const fetchRecommendations = useCallback(async (isRefresh = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (isRefresh) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
          setRecommendations(data.recommendations);
          setStudentSummary(data.studentSummary || null);
          return;
        }
      }

      // If serverless response is not ok or returns empty, load resilient fallback
      console.warn("[RecommendationsPage] Upstream API issue, activating resilient matching engine");
      const [savedProfile, savedPrefs] = await Promise.all([
        getProfile(user.uid).catch(() => null),
        getCareerPreferences(user.uid).catch(() => null),
      ]);

      const fallbackRecs = getClientFallbackRecommendations(savedProfile, savedPrefs);
      setRecommendations(fallbackRecs);
      setStudentSummary({
        name: savedProfile?.full_name || user.displayName || "Student",
        degree: savedProfile?.degree || "Undergraduate Studies",
        branch: savedProfile?.branch || "Engineering",
        university: savedProfile?.university || "University",
        domains: savedPrefs?.preferred_domains || [],
        experienceLevel: savedPrefs?.experience_level || "Undergraduate Student",
      });
    } catch (err: any) {
      console.warn("[RecommendationsPage] Exception caught, falling back to client engine:", err);
      try {
        const [savedProfile, savedPrefs] = await Promise.all([
          getProfile(user.uid).catch(() => null),
          getCareerPreferences(user.uid).catch(() => null),
        ]);

        const fallbackRecs = getClientFallbackRecommendations(savedProfile, savedPrefs);
        setRecommendations(fallbackRecs);
      } catch (clientErr) {
        setError("Failed to load personalized career recommendations.");
      }
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  // Handle Save / Unsave Recommendation
  const handleToggleSave = async (rec: CareerRecommendation) => {
    if (!user) return;
    setSavingId(rec.id);

    const isCurrentlySaved = Boolean(rec.saved);
    const newAction = isCurrentlySaved ? "unsave" : "save";

    // Optimistic UI update
    setRecommendations((prev) =>
      prev.map((r) => (r.id === rec.id ? { ...r, saved: !isCurrentlySaved } : r))
    );

    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/recommendations/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          careerId: rec.id,
          careerTitle: rec.title,
          action: newAction,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not update bookmark");
      }
    } catch (err) {
      console.error("[RecommendationsPage] Failed to save career:", err);
      // Revert optimistic update
      setRecommendations((prev) =>
        prev.map((r) => (r.id === rec.id ? { ...r, saved: isCurrentlySaved } : r))
      );
    } finally {
      setSavingId(null);
    }
  };

  // Unique sectors from recommendations
  const availableSectors = useMemo(() => {
    const sectors = new Set<string>();
    recommendations.forEach((r) => {
      if (r.sector) sectors.add(r.sector);
    });
    return ["All", ...Array.from(sectors)];
  }, [recommendations]);

  // Counts for category badges
  const counts = useMemo(() => {
    return {
      all: recommendations.length,
      strong: recommendations.filter((r) => r.category === "Strong Match").length,
      good: recommendations.filter((r) => r.category === "Good Match").length,
      explore: recommendations.filter((r) => r.category === "Explore").length,
      saved: recommendations.filter((r) => r.saved).length,
    };
  }, [recommendations]);

  // Filtered recommendations list
  const filtered = useMemo(() => {
    return recommendations.filter((rec) => {
      // Category filter
      if (categoryFilter === "Strong Match" && rec.category !== "Strong Match") return false;
      if (categoryFilter === "Good Match" && rec.category !== "Good Match") return false;
      if (categoryFilter === "Explore" && rec.category !== "Explore") return false;
      if (categoryFilter === "Saved" && !rec.saved) return false;

      // Sector filter
      if (sectorFilter !== "All" && rec.sector !== sectorFilter) return false;

      return true;
    });
  }, [recommendations, categoryFilter, sectorFilter]);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Career Recommendation Engine
            </h1>
            <Badge variant="purple" size="sm" dot>
              Gemini Intelligence Active
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Algorithmic role alignment generated from your academic degree, verified coursework, and target aspirations.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => fetchRecommendations(true)}
          disabled={loading || regenerating}
          leftIcon={
            regenerating ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )
          }
        >
          {regenerating ? "Analyzing..." : "Regenerate AI Analysis"}
        </Button>
      </div>

      {/* 2. Authenticated Profile Context Banner */}
      {studentSummary && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple-light shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold">
                Profile Alignment for: {studentSummary.name || user?.displayName || "Student"}
              </div>
              <div className="text-slate-400 mt-0.5">
                {[studentSummary.degree, studentSummary.branch, studentSummary.university]
                  .filter(Boolean)
                  .join(" • ") || "Academic credentials loaded from Supabase"}
              </div>
            </div>
          </div>

          {studentSummary.domains && studentSummary.domains.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400">Focus Domains:</span>
              {studentSummary.domains.map((d: string) => (
                <span
                  key={d}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Scientific Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400 flex items-start sm:items-center gap-2.5">
        <Info className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5 sm:mt-0" />
        <span>
          <strong className="text-slate-200">Compatibility Score Notice:</strong> Compatibility
          scores are heuristic estimates calculated from academic alignment, skill synergy, and
          stated preferences. They are designed for educational guidance, not scientifically
          guaranteed employment probabilities.
        </span>
      </div>

      {/* 4. Filter Toolbar */}
      <div className="space-y-3">
        {/* Match Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "All", label: `All Matches (${counts.all})` },
            { id: "Strong Match", label: `Strong Match (${counts.strong})` },
            { id: "Good Match", label: `Good Match (${counts.good})` },
            { id: "Explore", label: `Explore Paths (${counts.explore})` },
            { id: "Saved", label: `Saved (${counts.saved})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? "bg-accent-purple text-white shadow-glow-purple"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-500 shrink-0">Sector:</span>
          {availableSectors.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                sectorFilter === s
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-white/[0.02] hover:bg-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Loading State Skeleton */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
          <p className="text-sm">Synthesizing personalized career pathways with Gemini AI...</p>
        </div>
      )}

      {/* 6. Error Alert */}
      {!loading && error && (
        <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            Unable to load career recommendations
          </div>
          <p className="text-xs text-rose-300">{error}</p>
          <Button variant="secondary" size="sm" onClick={() => fetchRecommendations()}>
            Retry Analysis
          </Button>
        </div>
      )}

      {/* 7. Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="p-12 rounded-3xl bg-[#0b0f22]/70 border border-white/10 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No career matches in this category</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your category or sector filters, or regenerate your AI analysis to discover more paths.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setCategoryFilter("All");
              setSectorFilter("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* 8. Recommendations Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((rec) => {
            const isStrong = rec.category === "Strong Match";
            const isGood = rec.category === "Good Match";

            return (
              <div
                key={rec.id}
                className="rounded-3xl bg-[#0b0f22]/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-glow-purple transition-all duration-300 relative overflow-hidden group"
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                        {rec.sector}
                      </span>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                          isStrong
                            ? "bg-emerald-950/70 border-emerald-700/50 text-emerald-300"
                            : isGood
                            ? "bg-purple-950/70 border-purple-700/50 text-purple-300"
                            : "bg-blue-950/70 border-blue-700/50 text-blue-300"
                        }`}
                      >
                        {rec.category}
                      </span>
                    </div>

                    {/* Compatibility Score & Bookmark Button */}
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-sm font-black text-white">
                          {rec.compatibilityScore}%
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          Fit Index
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleSave(rec)}
                        disabled={savingId === rec.id}
                        title={rec.saved ? "Remove Bookmark" : "Save Career Path"}
                        className={`p-2 rounded-xl border transition-all ${
                          rec.saved
                            ? "bg-accent-purple/20 border-accent-purple text-accent-purple-light"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {rec.saved ? (
                          <BookmarkCheck className="w-4 h-4 text-accent-purple-light" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {rec.description}
                  </p>

                  {/* Score Basis Explanation */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 mb-4 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">Score Basis:</strong> {rec.scoreBasis}
                    </span>
                  </div>

                  {/* Why it matches the student */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 mb-5 space-y-1">
                    <div className="font-semibold text-accent-purple-light flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" />
                      Why This Matches You:
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {rec.whyItMatches}
                    </p>
                  </div>

                  {/* Skills Section: Required vs Missing (Gap Analysis) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs">
                    {/* Required Skills */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Core Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rec.requiredSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gap (Missing Skills) */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-amber-300/90 uppercase tracking-wider block">
                        Skills to Learn (Gap):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rec.missingSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-800/40 text-amber-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Projects, Certifications & Entry Roles */}
                  <div className="space-y-3 mb-6 p-3.5 rounded-xl bg-white/[0.015] border border-white/5 text-[11px]">
                    {/* Projects */}
                    {rec.exampleProjects && rec.exampleProjects.length > 0 && (
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1">
                          Recommended Portfolio Projects:
                        </span>
                        <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                          {rec.exampleProjects.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Certifications */}
                    {rec.certifications && rec.certifications.length > 0 && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-slate-400 font-semibold block mb-1">
                          Target Certifications:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {rec.certifications.map((c, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/30 text-cyan-300 text-[10px]"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Entry-level Roles & Growth */}
                    {rec.entryLevelRoles && rec.entryLevelRoles.length > 0 && (
                      <div className="pt-2 border-t border-white/5 text-slate-400">
                        <span className="font-semibold text-slate-300">Graduate Roles:</span>{" "}
                        {rec.entryLevelRoles.join(", ")}
                      </div>
                    )}

                    {rec.growthOpportunities && (
                      <div className="text-slate-400">
                        <span className="font-semibold text-slate-300">Trajectory:</span>{" "}
                        {rec.growthOpportunities}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <Button
                    href={`/dashboard/chatbot?query=${encodeURIComponent(
                      `I am interested in preparing for a career as a ${rec.title}. Based on my academic background and profile, what immediate milestones and projects should I target this semester?`
                    )}`}
                    variant="ghost"
                    size="sm"
                    className="justify-center text-accent-purple-light hover:text-white"
                    leftIcon={<BotMessageSquare className="w-3.5 h-3.5" />}
                  >
                    Discuss with AI Mentor
                  </Button>

                  <Button
                    href={`/dashboard/roadmaps/${rec.roadmapId || rec.id}`}
                    variant="primary"
                    size="sm"
                    className="justify-center shadow-glow-purple"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View Roadmap
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
