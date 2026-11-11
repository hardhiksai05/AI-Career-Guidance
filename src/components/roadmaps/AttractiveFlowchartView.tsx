"use client";

import React, { useMemo } from "react";
import { CareerItem, RoadmapNode, RoadmapSubtopic, RoadmapBranchGroup } from "@/lib/career-catalog";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
  Award,
  Layers,
  Code2,
  Info,
  Terminal,
  Cpu,
  BookOpen,
} from "lucide-react";

interface AttractiveFlowchartViewProps {
  career: CareerItem;
  zoom: number;
  pan: { x: number; y: number };
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  completedNodeIds: string[];
  completedSubtopicIds: string[];
  onSelectNode: (node: RoadmapNode) => void;
  onSelectSubtopic: (subtopic: RoadmapSubtopic) => void;
  onToggleSubtopicCompletion: (subtopicId: string, e?: React.MouseEvent) => void;
}

export const AttractiveFlowchartView: React.FC<AttractiveFlowchartViewProps> = ({
  career,
  zoom,
  pan,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  completedNodeIds,
  completedSubtopicIds,
  onSelectNode,
  onSelectSubtopic,
  onToggleSubtopicCompletion,
}) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className={`w-full h-full overflow-hidden relative cursor-grab select-none ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%),
          radial-gradient(rgba(250, 204, 21, 0.08) 1.2px, transparent 1.2px)
        `,
        backgroundSize: "100% 100%, 30px 30px",
        backgroundColor: "#060913",
      }}
    >
      {/* Dynamic Scaled / Panned Canvas Stage */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 origin-top transition-transform duration-75 select-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          minWidth: "1120px",
        }}
      >
        <div className="flex flex-col items-center pb-48">
          {/* ========================================================= */}
          {/* 1. TOP HEADER MODULE (ROADMAP.SH + ANIME CYBERPUNK FUSION) */}
          {/* ========================================================= */}
          <div className="w-full max-w-5xl grid grid-cols-12 gap-6 items-start mb-6 relative">
            {/* Left: Pre-requisites Cyber Terminal */}
            <div className="col-span-4 rounded-2xl p-4 bg-[#090d22]/90 border-2 border-white/20 shadow-xl backdrop-blur-md space-y-3 relative group hover:border-cyan-400/50 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-black text-white tracking-wide flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                  {career.prerequisitesBox?.title || "Pre-requisites (One of these)"}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  Stage 0
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(career.prerequisitesBox?.items || ["Frontend", "Backend", "Full-Stack"]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        onSelectSubtopic({
                          id: `prereq-${item}`,
                          title: `${item} Development`,
                          category: "Prerequisite Guild",
                          summary: `Foundational mastery in ${item} development accelerates understanding of ${career.title}.`,
                          details: `Students entering ${career.title} benefit immensely from understanding web lifecycles, API endpoints, asynchronous promises, and debugging protocols.`,
                          keyPoints: [
                            `Core programming proficiency in ${item} frameworks`,
                            "Handling REST and streaming asynchronous network requests",
                            "Environment configuration and build lifecycles",
                          ],
                          codeSnippet: `// Example prerequisite pipeline\nconst response = await fetch("/api/v1/mission", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ student: "Candidate", status: "ready" })\n});`,
                          recommendedResources: [
                            { title: `roadmap.sh / ${item.toLowerCase()}`, type: "doc" },
                          ],
                          handsOnTask: `Inspect the network tab in your browser developer tools to analyze payload serialization.`,
                          interviewQuestions: [
                            `How does your background in ${item} development directly augment this career track?`,
                          ],
                        })
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600 hover:border-cyan-400/60 text-xs font-bold text-slate-100 text-center transition-all hover:scale-105 shadow-md active:scale-95"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Center: Title with Pulsing Vertical Emitter */}
            <div className="col-span-4 flex flex-col items-center text-center pt-2">
              <div className="w-0.5 h-8 border-l-2 border-dotted border-sky-400 animate-pulse mb-2" />
              <div className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border-2 border-cyan-400/40 shadow-glow-cyan">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {career.title.split("(")[0].trim()}
                </h1>
                <span className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest block mt-0.5">
                  Interactive Learning Roadmap
                </span>
              </div>
              <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-400 via-sky-400 to-yellow-400 mt-2 shadow-[0_0_8px_#38bdf8]" />
            </div>

            {/* Right: roadmap.sh Community Hub Badge */}
            <div className="col-span-4 rounded-2xl p-4 bg-[#090d22]/90 border-2 border-white/20 shadow-xl backdrop-blur-md space-y-2.5 text-center hover:border-yellow-400/50 transition-colors">
              <span className="text-xs text-slate-300 block font-medium leading-relaxed">
                Explore deep syllabus branches and industry-verified milestones
              </span>
              <div className="py-2 px-4 rounded-xl bg-gradient-to-r from-yellow-400/10 via-amber-400/15 to-yellow-400/10 border border-yellow-400/40 text-xs font-black text-amber-300 tracking-wider font-mono flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>roadmap.sh / verified</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. SECOND ROW: RELATED ROADMAPS MODULE */}
          {/* ========================================================= */}
          <div className="w-full max-w-5xl grid grid-cols-12 gap-6 items-start mb-8 relative">
            <div className="col-span-4 rounded-2xl p-4 bg-[#090d22]/90 border-2 border-white/20 shadow-xl space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Related Roadmaps
                </span>
                <span className="text-[10px] text-purple-300 font-mono">5 Tracks</span>
              </div>

              <div className="space-y-1.5">
                {(
                  career.relatedRoadmaps || [
                    "Vibe Coding",
                    "Claude Code",
                    "Prompt Engineering",
                    "Inference Engineering",
                    "Forward Deployed Engineer",
                  ]
                ).map((rel) => (
                  <div
                    key={rel}
                    onClick={() =>
                      onSelectSubtopic({
                        id: `rel-${rel}`,
                        title: rel,
                        category: "Related Specialization",
                        summary: `Explore how ${rel} connects and complements ${career.title}.`,
                        details: `${rel} is an emerging high-growth discipline tightly integrated with modern AI-driven product workflows.`,
                        keyPoints: [
                          "Modern industry tooling and workflow alignment",
                          "Complementary technical credentials and case studies",
                          "High cross-domain market demand",
                        ],
                        recommendedResources: [{ title: `Guide to ${rel}`, type: "doc" }],
                        handsOnTask: `Review 3 open-source repositories tagged with #${rel
                          .toLowerCase()
                          .replace(/\s+/g, "-")}.`,
                        interviewQuestions: [`How do skills in ${rel} augment this roadmap?`],
                      })
                    }
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-purple-500/40 cursor-pointer text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                      <span>{rel}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Central Continuing Spine with Glow */}
            <div className="col-span-4 flex flex-col items-center">
              <div className="w-0.5 h-full min-h-[140px] bg-gradient-to-b from-yellow-400 via-sky-400 to-yellow-400 shadow-[0_0_10px_#38bdf8]" />
            </div>

            <div className="col-span-4" />
          </div>

          {/* ========================================================= */}
          {/* 3. CENTRAL VERTICAL SPINE WITH NODES & BRANCHES */}
          {/* ========================================================= */}
          <div className="w-full max-w-6xl flex flex-col items-center relative">
            {career.nodes.map((node, nodeIdx) => {
              const leftGroups = node.branchGroups?.filter((g) => g.side === "left") || [];
              const rightGroups = node.branchGroups?.filter((g) => g.side === "right") || [];
              const isCompleted = completedNodeIds.includes(node.id);
              const isLevel1 = node.level === 1;

              return (
                <div key={node.id} className="w-full flex flex-col items-center relative my-6">
                  {/* Central Spine Line from Above */}
                  <div className="w-0.5 h-10 bg-gradient-to-b from-yellow-400 to-yellow-400 shadow-[0_0_8px_#facc15]" />

                  {/* ----------------------------------------------------- */}
                  {/* MAIN SPINE MILESTONE HUB (LUMINOUS GOLDEN ROADMAP PILL) */}
                  {/* ----------------------------------------------------- */}
                  <div className="relative z-20 flex items-center justify-center group">
                    {/* Glowing Aura Behind Milestone */}
                    <div
                      className={`absolute -inset-2 rounded-3xl blur-md transition-opacity duration-300 ${
                        isCompleted
                          ? "bg-emerald-500/40 opacity-80"
                          : "bg-yellow-400/40 opacity-70 group-hover:opacity-100"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => onSelectNode(node)}
                      className={`relative px-9 py-3.5 rounded-2xl font-black text-sm sm:text-base border-2 shadow-2xl transition-all duration-200 flex items-center gap-3 tracking-wide active:scale-95 hover:scale-105 ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.5)]"
                          : "bg-gradient-to-r from-[#FACC15] via-[#FDE047] to-[#EAB308] text-slate-950 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                      }`}
                    >
                      {/* Left Badge */}
                      <span className="w-6 h-6 rounded-lg bg-black/15 flex items-center justify-center font-mono font-black text-[11px] text-slate-950">
                        {node.level}
                      </span>

                      {/* Main Title */}
                      <span className="font-extrabold">{node.label}</span>

                      {/* XP / Status Pill */}
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-black/15 text-slate-950 flex items-center gap-1">
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-slate-950" /> Cleared
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 fill-slate-950" /> +{node.xpReward} XP
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* ----------------------------------------------------- */}
                  {/* HORIZONTAL BRANCHES (LEFT & RIGHT BOXES WITH CYBER CONDUITS) */}
                  {/* ----------------------------------------------------- */}
                  <div className="w-full grid grid-cols-2 gap-16 items-start mt-6 relative">
                    {/* Glowing Cyber Connector Bars between Milestone Hub and Left/Right Columns */}
                    <div className="absolute -top-3 left-0 right-0 h-6 flex items-center justify-center -z-0 pointer-events-none">
                      {leftGroups.length > 0 && (
                        <div className="w-[38%] h-[2px] bg-gradient-to-l from-yellow-400 via-purple-500 to-purple-400 shadow-[0_0_10px_#8b5cf6]" />
                      )}
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-slate-950 shadow-[0_0_12px_#facc15] shrink-0 mx-3 animate-pulse" />
                      {rightGroups.length > 0 && (
                        <div className="w-[38%] h-[2px] bg-gradient-to-r from-yellow-400 via-cyan-500 to-cyan-400 shadow-[0_0_10px_#06b6d4]" />
                      )}
                    </div>

                    {/* ---------------- LEFT COLUMN BRANCHES ---------------- */}
                    <div className="flex flex-col items-end space-y-6 pr-4 relative z-10">
                      {leftGroups.map((group) => (
                        <div
                          key={group.id}
                          className="w-full max-w-md rounded-2xl p-4 bg-[#0a0f26]/95 border-2 border-purple-500/40 shadow-2xl space-y-3 relative group hover:border-purple-400 transition-all duration-200"
                        >
                          {/* Tech Notch Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                              <span className="text-xs font-black text-purple-200 tracking-wide uppercase">
                                {group.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                              {group.subtopics.length} topics
                            </span>
                          </div>

                          {/* Subtopic Chips Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {group.subtopics.map((sub) => {
                              const isDone = completedSubtopicIds.includes(sub.id);
                              return (
                                <div
                                  key={sub.id}
                                  onClick={() => onSelectSubtopic(sub)}
                                  className={`p-3 rounded-xl border text-left transition-all duration-150 hover:scale-[1.03] active:scale-95 flex items-center justify-between gap-2 shadow-lg cursor-pointer ${
                                    isDone
                                      ? "bg-gradient-to-br from-emerald-950 via-[#072418] to-emerald-950 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                                      : "bg-gradient-to-r from-[#FEF08A] to-[#FDE047] hover:from-[#FDE047] hover:to-[#FACC15] text-slate-950 border-yellow-500 font-extrabold shadow-[0_0_12px_rgba(250,204,21,0.35)]"
                                  }`}
                                >
                                  <span className="text-xs font-bold leading-snug line-clamp-2">
                                    {sub.title}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleSubtopicCompletion(sub.id, e);
                                    }}
                                    className="shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
                                    title={isDone ? "Mark Incomplete" : "Mark Completed"}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-700 hover:text-slate-950" />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ---------------- RIGHT COLUMN BRANCHES ---------------- */}
                    <div className="flex flex-col items-start space-y-6 pl-4 relative z-10">
                      {rightGroups.map((group) => (
                        <div
                          key={group.id}
                          className="w-full max-w-md rounded-2xl p-4 bg-[#0a0f26]/95 border-2 border-cyan-500/40 shadow-2xl space-y-3 relative group hover:border-cyan-400 transition-all duration-200"
                        >
                          {/* Tech Notch Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                              <span className="text-xs font-black text-cyan-200 tracking-wide uppercase">
                                {group.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                              {group.subtopics.length} topics
                            </span>
                          </div>

                          {/* Subtopic Chips Stack */}
                          <div className="flex flex-col space-y-2.5">
                            {group.subtopics.map((sub) => {
                              const isDone = completedSubtopicIds.includes(sub.id);
                              return (
                                <div
                                  key={sub.id}
                                  onClick={() => onSelectSubtopic(sub)}
                                  className={`px-4 py-3 rounded-xl border text-left transition-all duration-150 hover:scale-[1.02] active:scale-95 flex items-center justify-between gap-3 shadow-lg cursor-pointer ${
                                    isDone
                                      ? "bg-gradient-to-br from-emerald-950 via-[#072418] to-emerald-950 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                                      : "bg-gradient-to-r from-[#FEF08A] to-[#FDE047] hover:from-[#FDE047] hover:to-[#FACC15] text-slate-950 border-yellow-500 font-extrabold shadow-[0_0_12px_rgba(250,204,21,0.35)]"
                                  }`}
                                >
                                  <span className="text-xs font-bold leading-snug">
                                    {sub.title}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleSubtopicCompletion(sub.id, e);
                                    }}
                                    className="shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
                                    title={isDone ? "Mark Incomplete" : "Mark Completed"}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-700 hover:text-slate-950" />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
