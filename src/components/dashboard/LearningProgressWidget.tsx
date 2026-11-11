"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import { DEMO_ROADMAPS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getAllRoadmapProgress, RoadmapProgressData } from "@/lib/services/roadmap-service";

export const LearningProgressWidget: React.FC = () => {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  const [activeTrack, setActiveTrack] = useState<RoadmapProgressData | null>(null);

  useEffect(() => {
    async function loadActiveTrack() {
      if (!user || !isConfigured) return;
      try {
        const tracks = await getAllRoadmapProgress(user.uid);
        if (tracks && tracks.length > 0) {
          setActiveTrack(tracks[0]);
        }
      } catch (err) {
        console.warn("[LearningProgressWidget] Error loading track:", err);
      }
    }
    loadActiveTrack();
  }, [user, isConfigured]);

  const fallbackRoadmap = DEMO_ROADMAPS[0];
  const title = activeTrack?.career_title || fallbackRoadmap.title;
  const currentStage = activeTrack ? activeTrack.current_level : fallbackRoadmap.completedStages;
  const totalStages = 6;
  const progressPercent = activeTrack
    ? activeTrack.progress_percentage
    : Math.round((fallbackRoadmap.completedStages / fallbackRoadmap.totalStages) * 100);

  return (
    <div className="rounded-2xl p-6 bg-[#0f142b]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Active Roadmap</h4>
              <span className="text-[10px] text-slate-400">
                {activeTrack ? "Supabase Progress" : "Demonstration Content"}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-accent-purple-light">
            Stage {currentStage} / {totalStages}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">
          {activeTrack
            ? `Mastering Level ${currentStage} milestones in ${title}. ${activeTrack.completed_missions?.length || 0} quests completed.`
            : fallbackRoadmap.description}
        </p>

        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Overall Progress</span>
            <span className="font-semibold text-slate-200">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-purple to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Current: Level {currentStage}
        </span>
        <Link
          href="/dashboard/roadmaps"
          className="text-accent-purple-light hover:underline font-semibold inline-flex items-center gap-1"
        >
          View Roadmap <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
