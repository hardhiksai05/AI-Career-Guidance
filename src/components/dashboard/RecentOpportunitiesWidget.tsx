import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, MapPin, Calendar } from "lucide-react";
import { DEMO_OPPORTUNITIES } from "@/lib/constants";

export const RecentOpportunitiesWidget: React.FC = () => {
  const opp = DEMO_OPPORTUNITIES[0];

  return (
    <div className="rounded-2xl p-6 bg-[#0f142b]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Target Opportunity</h4>
              <span className="text-[10px] text-slate-400">Curated Demonstration</span>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
            {opp.type}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{opp.title}</h3>
        <p className="text-xs text-accent-cyan font-medium mb-3">{opp.company}</p>

        <div className="space-y-1.5 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{opp.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Application Deadline: {opp.deadline}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-emerald-400 font-semibold">{opp.matchScore}% Match Score</span>
        <Link
          href="/dashboard/opportunities"
          className="text-emerald-300 hover:underline font-semibold inline-flex items-center gap-1"
        >
          View Listings <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

