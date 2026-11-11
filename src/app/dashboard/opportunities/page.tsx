"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { DEMO_OPPORTUNITIES } from "@/lib/constants";
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
} from "lucide-react";

export default function OpportunitiesPage() {
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["opp-1"]);

  const types = ["All", "Internship", "Full-Time", "Fellowship"];

  const filtered =
    selectedType === "All"
      ? DEMO_OPPORTUNITIES
      : DEMO_OPPORTUNITIES.filter((o) => o.type === selectedType);

  const toggleBookmark = (opp: typeof DEMO_OPPORTUNITIES[0]) => {
    if (bookmarkedIds.includes(opp.id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== opp.id));
      showToast({
        type: "info",
        title: "Removed from Saved",
        description: `${opp.title} removed from your saved opportunities.`,
        duration: 3000,
      });
    } else {
      setBookmarkedIds([...bookmarkedIds, opp.id]);
      showToast({
        type: "success",
        title: "Opportunity Saved",
        description: `${opp.title} at ${opp.company} added to your bookmarks.`,
        duration: 3000,
      });
    }
  };

  const handleApply = (opp: typeof DEMO_OPPORTUNITIES[0]) => {
    showToast({
      type: "info",
      title: "Application Portal Staged",
      description: `Targeting ${opp.title} at ${opp.company}. Live ATS pipelines will connect in Part 5.`,
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Career Opportunities & Fellowships
            </h1>
            <Badge variant="emerald" size="sm">
              Part 5 Dynamic Feed
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Curated student roles and competitive programs aligned with your target skills.
          </p>
        </div>
      </div>

      {/* Part 5 Scope Banner */}
      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-accent-cyan shrink-0" />
        <span>
          <strong>Live Integrations in Part 5:</strong> Aggregated listings, verified recruiter
          pipelines, and automated GitHub portfolio reviews will connect in Part 5.
        </span>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedType === t
                ? "bg-accent-cyan text-white shadow-glow-cyan"
                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Listings Cards */}
      <div className="space-y-4">
        {filtered.map((opp) => {
          const isBookmarked = bookmarkedIds.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="rounded-2xl bg-[#0b0f22]/90 border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                    {opp.matchScore}% Compatibility
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {opp.type}
                  </span>
                  <span className="text-xs text-accent-cyan font-medium">
                    {opp.mode}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white hover:text-accent-cyan transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>{opp.company}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {opp.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Deadline: {opp.deadline}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col items-center gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => handleApply(opp)}
                >
                  Apply Preview
                </Button>
                <button
                  onClick={() => toggleBookmark(opp)}
                  className={`p-2.5 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                    isBookmarked
                      ? "bg-accent-purple/20 border-accent-purple text-accent-purple-light"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                  aria-label={isBookmarked ? "Remove Bookmark" : "Save Opportunity"}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  <span className="hidden sm:inline">
                    {isBookmarked ? "Saved" : "Save"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
