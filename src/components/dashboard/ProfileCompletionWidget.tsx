"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getProfile } from "@/lib/services/profile-service";
import { getResumes } from "@/lib/services/resume-service";

export const ProfileCompletionWidget: React.FC = () => {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  const [percentage, setPercentage] = useState(75);
  const [stagesVerified, setStagesVerified] = useState(3);

  useEffect(() => {
    async function checkReadiness() {
      if (!user || !isConfigured) return;

      try {
        const [profile, resumes] = await Promise.all([
          getProfile(user.uid),
          getResumes(user.uid),
        ]);

        let stages = 1; // Stage 1: Account created
        if (user.emailVerified) stages++; // Stage 2: Email verified
        if (profile?.university && profile?.degree) stages++; // Stage 3: Academic details
        if (resumes && resumes.length > 0) stages++; // Stage 4: Resume uploaded

        setStagesVerified(stages);
        setPercentage(Math.round((stages / 4) * 100));
      } catch (err) {
        console.warn("[ProfileCompletionWidget] Error:", err);
      }
    }

    checkReadiness();
  }, [user, isConfigured]);

  return (
    <div className="rounded-2xl p-6 bg-[#0f142b]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-accent-purple-light">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Profile Readiness</h4>
            <span className="text-[10px] text-slate-400">
              {isConfigured ? "Supabase Synchronized" : "Local Preview"}
            </span>
          </div>
        </div>
        <span className="text-sm font-extrabold text-accent-cyan">{percentage}%</span>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        {percentage === 100
          ? "All stages complete! Your verified academic profile and resume are active in private storage."
          : "Academic credentials and career domains configured. Uploading a resume unlocks 100% fidelity matching."}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {stagesVerified} of 4 stages verified
        </span>
        <Link
          href="/dashboard/profile"
          className="text-accent-purple-light hover:underline font-semibold inline-flex items-center gap-1"
        >
          View Profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
