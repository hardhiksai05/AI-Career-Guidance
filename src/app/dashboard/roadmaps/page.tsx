"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getAllRoadmapProgress } from "@/lib/services/roadmap-service";
import {
  CAREER_CATALOG,
  CAREER_SECTORS,
  CareerSector,
  CareerItem,
} from "@/lib/career-catalog";
import { InteractiveRoadmapCanvas } from "@/components/roadmaps/InteractiveRoadmapCanvas";
import { AnimeRoadmapHero } from "@/components/roadmaps/AnimeRoadmapHero";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";
import {
  Sparkles,
  Zap,
  Clock,
  Compass,
  Trophy,
  ArrowRight,
  Shield,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";

function RoadmapsContent() {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();
  const searchParams = useSearchParams();
  const careerParam = searchParams.get("career");

  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCareerId, setSelectedCareerId] = useState<string>("tech-ai");

  // Track global XP / level across all visited or explored tracks
  const [userXp, setUserXp] = useState<number>(450);

  // If URL has ?career=..., select that career immediately
  useEffect(() => {
    if (careerParam) {
      const match = CAREER_CATALOG.find(
        (c) =>
          c.id.toLowerCase() === careerParam.toLowerCase() ||
          c.title.toLowerCase().includes(careerParam.toLowerCase())
      );
      if (match) {
        setSelectedCareerId(match.id);
        setSelectedSector("All");
      }
    }
  }, [careerParam]);

  // Load cumulative XP across all tracks from Supabase
  useEffect(() => {
    async function loadGlobalProgress() {
      if (!user || !isConfigured) return;
      try {
        const allTracks = await getAllRoadmapProgress(user.uid);
        if (allTracks && allTracks.length > 0) {
          const totalEarned = allTracks.reduce((sum, t) => sum + (t.total_xp || 0), 0);
          setUserXp(Math.max(450, totalEarned));
          // If no URL careerParam was provided, default to most recently accessed
          if (!careerParam && allTracks[0]?.career_id) {
            setSelectedCareerId(allTracks[0].career_id);
          }
        }
      } catch (err) {
        console.warn("[RoadmapsPage] Could not load cumulative progress:", err);
      }
    }
    loadGlobalProgress();
  }, [user, isConfigured, careerParam]);
  const userLevel = useMemo(() => {
    if (userXp >= 1800) return 6;
    if (userXp >= 1200) return 5;
    if (userXp >= 750) return 4;
    if (userXp >= 400) return 3;
    if (userXp >= 150) return 2;
    return 1;
  }, [userXp]);

  // Filter careers by sector & search query
  const filteredCareers = useMemo(() => {
    return CAREER_CATALOG.filter((career) => {
      const matchSector = selectedSector === "All" || career.sector === selectedSector;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        career.title.toLowerCase().includes(q) ||
        career.sector.toLowerCase().includes(q) ||
        career.overview.toLowerCase().includes(q) ||
        career.nodes.some((n) =>
          n.skills.some((s) => s.toLowerCase().includes(q))
        );
      return matchSector && matchSearch;
    });
  }, [selectedSector, searchQuery]);

  const selectedCareer = useMemo(() => {
    return (
      CAREER_CATALOG.find((c) => c.id === selectedCareerId) ||
      filteredCareers[0] ||
      CAREER_CATALOG[0]
    );
  }, [selectedCareerId, filteredCareers]);

  return (
    <div className="space-y-8 relative">
      {/* Anime Energy Particles Background Canvas */}
      <AnimatedRoadmapBackground />

      {/* 1. ANIME ROADMAP HERO SECTION */}
      <AnimeRoadmapHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSector={selectedSector}
        onSectorSelect={setSelectedSector}
        totalCareersCount={CAREER_CATALOG.length}
        filteredCount={filteredCareers.length}
        userXp={userXp}
        userLevel={userLevel}
      />

      {/* 2. CAREER CLASS SELECTOR CAROUSEL (RPG GUILD REGISTRY) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-pulse" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Select Career Destiny Class ({filteredCareers.length} Available)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Scroll horizontally to browse all classes
          </span>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-purple-900/50">
          {filteredCareers.map((c) => {
            const isSelected = c.id === selectedCareer.id;
            const rank = c.difficultyRank || "A-Rank";

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCareerId(c.id)}
                className={`p-4 rounded-2xl border text-left shrink-0 w-72 transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1b1f48] to-[#0d1028] border-accent-purple shadow-glow-purple scale-[1.02]"
                    : "bg-[#0a0d22]/90 border-white/10 hover:border-white/20 hover:bg-[#0f1430]"
                }`}
              >
                {/* Glow Edge Indicator */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-pink-500 to-accent-cyan" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-wider">
                    {c.sector}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      rank.startsWith("S")
                        ? "bg-pink-950/80 text-pink-300 border border-pink-700/60"
                        : "bg-purple-950/80 text-purple-300 border border-purple-700/60"
                    }`}
                  >
                    {rank}
                  </span>
                </div>

                <h4 className="text-sm font-black text-white truncate group-hover:text-accent-cyan transition-colors">
                  {c.title}
                </h4>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {c.tagline}
                </p>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Zap className="w-3 h-3" />
                    +{c.totalXp || 2300} XP
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3" />
                    {c.estimatedDuration || "6-12 Mo"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PRIMARY INTERACTIVE ROADMAP CANVAS (ALL 3 MODES + RPG HUD + INSPECTION MODALS) */}
      <div className="space-y-4">
        <InteractiveRoadmapCanvas career={selectedCareer} />
      </div>
    </div>
  );
}

export default function RoadmapsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading roadmaps...</div>}>
      <RoadmapsContent />
    </Suspense>
  );
}
