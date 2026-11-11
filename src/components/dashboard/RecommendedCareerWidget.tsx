"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { DEMO_RECOMMENDATIONS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getCareerPreferences } from "@/lib/services/profile-service";

export const RecommendedCareerWidget: React.FC = () => {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  const [topRec, setTopRec] = useState(DEMO_RECOMMENDATIONS[0]);
  const [preferredDomains, setPreferredDomains] = useState<string[]>([]);

  useEffect(() => {
    async function loadPreferences() {
      if (!user || !isConfigured) return;
      try {
        const prefs = await getCareerPreferences(user.uid);
        if (prefs && prefs.preferred_domains && prefs.preferred_domains.length > 0) {
          setPreferredDomains(prefs.preferred_domains);
          // Match top recommendation domain if matches
          const matched = DEMO_RECOMMENDATIONS.find((r) =>
            prefs.preferred_domains.some(
              (d) => r.domain.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(r.domain.toLowerCase())
            )
          );
          if (matched) {
            setTopRec(matched);
          }
        }
      } catch (err) {
        console.warn("[RecommendedCareerWidget] Error loading preferences:", err);
      }
    }
    loadPreferences();
  }, [user, isConfigured]);

  return (
    <div className="rounded-2xl p-6 bg-[#0f142b]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-accent-cyan">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Top Match Preview</h4>
              <span className="text-[10px] text-slate-400">
                {preferredDomains.length > 0 ? "Calibrated from Preferences" : "Demonstration Model"}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
            {topRec.matchScore}% Match
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{topRec.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{topRec.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topRec.topSkills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-accent-cyan" /> {topRec.growthRate}
        </span>
        <Link
          href="/dashboard/recommendations"
          className="text-accent-cyan hover:underline font-semibold inline-flex items-center gap-1"
        >
          Explore Matches <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
