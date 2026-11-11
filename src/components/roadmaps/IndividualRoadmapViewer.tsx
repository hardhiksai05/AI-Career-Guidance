"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  RoadmapData,
  RoadmapPhase,
  RoadmapTopic,
  LearningResource,
  ProjectSuggestion,
} from "@/lib/btech-catalog/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
  Wrench,
  AlertCircle,
  HelpCircle,
  FileCode,
  Compass,
  Check,
  Share2,
  Columns,
  Rows,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IndividualRoadmapViewerProps {
  roadmap: RoadmapData;
  completedTopicIds: string[];
  onToggleTopicCompletion: (topicId: string) => void;
  onClose?: () => void;
}

export const IndividualRoadmapViewer: React.FC<IndividualRoadmapViewerProps> = ({
  roadmap,
  completedTopicIds,
  onToggleTopicCompletion,
  onClose,
}) => {
  const [layoutMode, setLayoutMode] = useState<"vertical" | "horizontal">("vertical");
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Compute total and completed topics
  const allTopics = useMemo(() => {
    return roadmap.phases.flatMap((p) => p.topics);
  }, [roadmap]);

  const completedCount = useMemo(() => {
    return allTopics.filter((t) => completedTopicIds.includes(t.id)).length;
  }, [allTopics, completedTopicIds]);

  const progressPercentage = useMemo(() => {
    if (allTopics.length === 0) return 0;
    return Math.round((completedCount / allTopics.length) * 100);
  }, [allTopics.length, completedCount]);

  // First uncompleted topic (for Resume functionality)
  const nextUpTopic = useMemo(() => {
    return allTopics.find((t) => !completedTopicIds.includes(t.id)) || allTopics[0];
  }, [allTopics, completedTopicIds]);

  // Expand next uncompleted topic initially
  useEffect(() => {
    if (nextUpTopic && !expandedTopicId) {
      setExpandedTopicId(nextUpTopic.id);
    }
  }, [nextUpTopic, expandedTopicId]);

  const handleResumeNext = () => {
    if (!nextUpTopic) return;
    setExpandedTopicId(nextUpTopic.id);
    // Find phase of next topic
    const phaseIdx = roadmap.phases.findIndex((p) =>
      p.topics.some((t) => t.id === nextUpTopic.id)
    );
    if (phaseIdx !== -1) {
      setActivePhaseIndex(phaseIdx);
    }
    const el = document.getElementById(`topic-card-${nextUpTopic.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.7, Number((prev + delta).toFixed(2)))));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && viewerRef.current) {
      viewerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Under development honest state
  if (!roadmap.isComplete || roadmap.phases.length === 0) {
    return (
      <div className="rounded-3xl p-8 sm:p-12 bg-[#0c102b]/90 border border-white/10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <Wrench className="w-8 h-8 animate-pulse" />
        </div>
        <div className="max-w-xl mx-auto space-y-2">
          <Badge variant="purple" size="md">
            Roadmap Under Active Development
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{roadmap.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The full comprehensive 7-phase learning journey for <strong>{roadmap.targetRoleOrCourse}</strong>{" "}
            is currently being finalized by academic curriculum designers and industry mentors.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 max-w-md mx-auto text-xs text-slate-400 text-left space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Compass className="w-4 h-4 text-accent-cyan" /> Next Steps You Can Take Now:
          </div>
          <p>
            • Explore related completed tracks like <strong>Frontend</strong>, <strong>Backend</strong>, or{" "}
            <strong>AI Engineering</strong>.
          </p>
          <p>• Consult our AI Career Mentor chatbot to receive a personalized syllabus for this domain.</p>
        </div>
        {onClose && (
          <Button variant="secondary" onClick={onClose} className="mt-4">
            Back to Roadmaps Catalogue
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={viewerRef}
      className={`rounded-3xl bg-[#090d24] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 relative ${
        isFullscreen ? "p-6 fixed inset-0 z-50 overflow-y-auto" : "p-4 sm:p-8"
      }`}
    >
      {/* Top Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" size="sm">
              {roadmap.type.toUpperCase()}
            </Badge>
            <Badge variant="purple" size="sm">
              Difficulty: {roadmap.difficulty}
            </Badge>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-accent-cyan" /> {roadmap.estimatedTotalDuration}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {roadmap.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{roadmap.overview}</p>

          {/* Source Attribution Notice */}
          {roadmap.roadmapShReference && (
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
              <span>Source & Structure Reference:</span>
              <a
                href={roadmap.roadmapShReference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-semibold"
              >
                {roadmap.roadmapShReference.title}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-500 text-[11px] hidden sm:inline">
                ({roadmap.roadmapShReference.note})
              </span>
            </div>
          )}

          {roadmap.externalResourceNotice && (
            <p className="text-xs text-slate-400 italic">{roadmap.externalResourceNotice}</p>
          )}
        </div>

        {/* Progress & Controls Bar */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
          {/* Completion Status */}
          <div className="w-full sm:w-56 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Roadmap Progress:</span>
              <span className="text-accent-cyan font-bold">
                {completedCount} / {allTopics.length} ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full"
              />
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            {nextUpTopic && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleResumeNext}
                className="shadow-glow-purple flex items-center gap-1.5 text-xs"
              >
                <Compass className="w-3.5 h-3.5" /> Resume Next Topic
              </Button>
            )}

            {/* Layout Toggle */}
            <div className="flex items-center bg-white/5 rounded-xl p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setLayoutMode("vertical")}
                title="Vertical Connected View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  layoutMode === "vertical"
                    ? "bg-purple-950/80 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Rows className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("horizontal")}
                title="Horizontal Phase Stepper"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  layoutMode === "horizontal"
                    ? "bg-purple-950/80 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-white/5 rounded-xl p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => handleZoom(0.1)}
                title="Zoom In"
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom(-0.1)}
                title="Zoom Out"
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                title="Reset Zoom"
                className="px-1.5 text-[10px] font-mono text-slate-400 hover:text-white"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white"
              >
                Close Roadmap
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Roadmap Body */}
      <div
        className="pt-8 transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Horizontal Stepper Mode: Tab selector for Phases */}
        {layoutMode === "horizontal" && (
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-purple-900/50">
              {roadmap.phases.map((phase, idx) => {
                const isSelected = activePhaseIndex === idx;
                const phaseCompleted = phase.topics.every((t) =>
                  completedTopicIds.includes(t.id)
                );

                return (
                  <button
                    key={phase.phaseNumber}
                    type="button"
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`px-4 py-3 rounded-2xl border text-left shrink-0 transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-purple-950/80 border-accent-purple text-white shadow-glow-purple"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        phaseCompleted
                          ? "bg-emerald-500 text-black font-extrabold"
                          : isSelected
                          ? "bg-accent-purple text-white"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {phaseCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : phase.phaseNumber}
                    </span>
                    <div>
                      <div className="text-xs font-bold">{phase.phaseName}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{phase.tagline}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase List Display */}
        <div className="space-y-12">
          {(layoutMode === "vertical"
            ? roadmap.phases
            : [roadmap.phases[activePhaseIndex]]
          ).map((phase, pIdx) => {
            return (
              <div key={phase.phaseNumber} className="relative">
                {/* Phase Connecting Line in vertical mode */}
                {layoutMode === "vertical" && pIdx < roadmap.phases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/40 via-cyan-500/20 to-transparent pointer-events-none" />
                )}

                {/* Phase Header Banner */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/40 flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg shadow-purple-950/50">
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {phase.phaseName}
                      </h3>
                      <Badge variant="purple" size="sm">
                        {phase.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-accent-cyan font-mono mt-0.5">{phase.tagline}</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">{phase.description}</p>
                  </div>
                </div>

                {/* Phase Topics Grid / List */}
                <div className="ml-0 sm:ml-16 space-y-4">
                  {phase.topics.map((topic) => {
                    const isCompleted = completedTopicIds.includes(topic.id);
                    const isExpanded = expandedTopicId === topic.id;

                    return (
                      <div
                        key={topic.id}
                        id={`topic-card-${topic.id}`}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isExpanded
                            ? "bg-[#0f1433] border-accent-purple/60 shadow-xl"
                            : isCompleted
                            ? "bg-[#0b1026]/90 border-emerald-500/30"
                            : "bg-[#0c102b]/60 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Topic Summary Card Row */}
                        <div
                          className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                          onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                        >
                          <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                            {/* Completion Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTopicCompletion(topic.id);
                              }}
                              className={`mt-0.5 sm:mt-0 p-1 rounded-lg transition-transform hover:scale-110 shrink-0 ${
                                isCompleted
                                  ? "text-emerald-400 hover:text-emerald-300"
                                  : "text-slate-500 hover:text-slate-300"
                              }`}
                              title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4
                                  className={`text-sm sm:text-base font-bold transition-colors ${
                                    isCompleted
                                      ? "text-slate-200 line-through decoration-emerald-500/50"
                                      : "text-white"
                                  }`}
                                >
                                  {topic.title}
                                </h4>
                                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-accent-cyan" /> {topic.estimatedDuration}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                                {topic.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isCompleted && (
                              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
                                <Check className="w-3 h-3" /> Complete
                              </span>
                            )}
                            <button
                              type="button"
                              className="text-slate-400 hover:text-white p-1 rounded-lg"
                              title={isExpanded ? "Collapse" : "Expand Details"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Detailed Expandable Section */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="border-t border-white/10 p-4 sm:p-6 bg-black/30 space-y-5 text-xs text-slate-300"
                            >
                              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                                {topic.description}
                              </p>

                              {/* Learning Objectives & Skills Gained */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                                  <span className="font-semibold text-accent-cyan flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                                    <Sparkles className="w-3.5 h-3.5" /> What You Will Learn (Objectives)
                                  </span>
                                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                                    {topic.learningObjectives.map((obj, i) => (
                                      <li key={i}>{obj}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                                  <span className="font-semibold text-accent-purple flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                                    <Layers className="w-3.5 h-3.5" /> Skills Gained & Verification
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {topic.skillsGained.map((skill, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[11px]"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="pt-2 text-slate-400">
                                    <strong>Completion Criteria:</strong> {topic.completionCriteria}
                                  </div>
                                </div>
                              </div>

                              {/* Tools & Prerequisites */}
                              <div className="flex flex-wrap items-center gap-4 py-2 border-y border-white/5 text-[11px] font-mono">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400">Tools & Tech:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {topic.toolsAndTechnologies.map((tool, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-0.5 rounded bg-white/5 text-slate-200 border border-white/10"
                                      >
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {topic.prerequisites.length > 0 && (
                                  <div className="flex items-center gap-1.5 text-slate-400">
                                    <span>Prerequisites:</span>
                                    <span className="text-slate-300">
                                      {topic.prerequisites.join(", ")}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Curated Learning Resources */}
                              {topic.learningResources.length > 0 && (
                                <div className="space-y-2">
                                  <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-accent-cyan" /> Recommended Learning
                                    Resources:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {topic.learningResources.map((res, i) => (
                                      <a
                                        key={i}
                                        href={res.url || "#"}
                                        target={res.url ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent-purple/50 transition-colors flex items-center justify-between group"
                                      >
                                        <div className="min-w-0 pr-2">
                                          <div className="text-xs font-semibold text-white group-hover:text-accent-cyan truncate">
                                            {res.title}
                                          </div>
                                          <div className="text-[10px] text-slate-400">
                                            {res.provider} • {res.type.toUpperCase()}{" "}
                                            {res.isFree && "(Free)"}
                                          </div>
                                        </div>
                                        {res.url && (
                                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-cyan shrink-0" />
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Practical Hands-on Assignments */}
                              {topic.practicalAssignments.length > 0 && (
                                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                                  <span className="font-semibold text-purple-300 text-xs flex items-center gap-1.5">
                                    <FileCode className="w-3.5 h-3.5" /> Hands-On Assignment:
                                  </span>
                                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                                    {topic.practicalAssignments.map((assign, i) => (
                                      <li key={i}>{assign}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Project Suggestions if any */}
                              {topic.projectSuggestions && topic.projectSuggestions.length > 0 && (
                                <div className="space-y-2">
                                  <span className="font-semibold text-slate-200 text-xs">
                                    Suggested Portfolio Projects:
                                  </span>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {topic.projectSuggestions.map((proj, i) => (
                                      <div
                                        key={i}
                                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-white text-xs">
                                            {proj.title}
                                          </span>
                                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                                            {proj.level}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">{proj.description}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Mark Complete Action Button */}
                              <div className="pt-2 flex items-center justify-end">
                                <Button
                                  variant={isCompleted ? "secondary" : "primary"}
                                  size="sm"
                                  onClick={() => onToggleTopicCompletion(topic.id)}
                                  className="flex items-center gap-1.5 text-xs"
                                >
                                  {isCompleted ? (
                                    <>
                                      <Circle className="w-3.5 h-3.5" /> Mark Incomplete
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Mark Topic Complete
                                    </>
                                  )}
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
