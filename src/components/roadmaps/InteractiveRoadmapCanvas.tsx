"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { CareerItem, RoadmapNode, RoadmapSubtopic } from "@/lib/career-catalog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SkillTreeNode, SkillNodeState } from "./SkillTreeNode";
import { EnergyConnection } from "./EnergyConnection";
import { CareerProgressPanel } from "./CareerProgressPanel";
import { MissionDetailPanel } from "./MissionDetailPanel";
import { AchievementPopup } from "./AchievementPopup";
import { RoadmapViewSwitcher, RoadmapViewMode } from "./RoadmapViewSwitcher";
import { AttractiveFlowchartView } from "./AttractiveFlowchartView";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  getRoadmapProgress,
  saveRoadmapProgress,
  unlockAchievement,
} from "@/lib/services/roadmap-service";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  ExternalLink,
  Code2,
  Briefcase,
  GitBranch,
  Move,
  Info,
  Check,
  Copy,
  Terminal,
  HelpCircle,
  Crown,
  Flame,
  Zap,
  Focus,
} from "lucide-react";

interface InteractiveRoadmapCanvasProps {
  career: CareerItem;
}

export const InteractiveRoadmapCanvas: React.FC<InteractiveRoadmapCanvasProps> = ({ career }) => {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  // Default to Interactive Flowchart as requested by the user
  const [viewMode, setViewMode] = useState<RoadmapViewMode>("flowchart");

  // Viewport State: Zoom and Pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dedicated "Focus Flowchart Only" (Isolated Canvas Viewport)
  const [isIsolatedView, setIsIsolatedView] = useState(false);

  // RPG Completion Tracking State (Nodes & Subtopics)
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([
    career.nodes[0]?.id || "ai-lvl-1",
  ]);
  const [completedSubtopicIds, setCompletedSubtopicIds] = useState<string[]>([
    "ai-sub-what-is",
    "ai-sub-tokens",
  ]);

  // Inspection Modals
  const [activeMissionNode, setActiveMissionNode] = useState<RoadmapNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<RoadmapSubtopic | null>(null);

  // Top Info Accordion Open/Closed
  const [accordionOpen, setAccordionOpen] = useState(false);

  // Level-up celebration popup state
  const [levelUpPopup, setLevelUpPopup] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    xpEarned: number;
    nextLevelName?: string;
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    xpEarned: 0,
  });

  const [copiedCode, setCopiedCode] = useState(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasFrameRef = useRef<HTMLDivElement>(null);

  // Load saved roadmap progress from Supabase on mount / career change
  useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      if (!user || !isConfigured) return;
      try {
        const saved = await getRoadmapProgress(user.uid, career.id);
        if (saved && isMounted) {
          if (saved.completed_missions && saved.completed_missions.length > 0) {
            setCompletedNodeIds(saved.completed_missions);
          }
          if (saved.completed_subtopics && saved.completed_subtopics.length > 0) {
            setCompletedSubtopicIds(saved.completed_subtopics);
          }
        }
      } catch (e) {
        console.warn("[Roadmap] Error loading progress:", e);
      }
    }
    loadProgress();
    return () => {
      isMounted = false;
    };
  }, [user, career.id, isConfigured]);

  // Helper to persist roadmap progress changes into Supabase
  const persistProgressToDb = (newNodes: string[], newSubtopics: string[]) => {
    if (!user || !isConfigured) return;

    let xp = 150;
    career.nodes.forEach((n) => {
      if (newNodes.includes(n.id)) {
        xp += n.xpReward || 250;
      }
    });

    const totalNodes = career.nodes.length || 1;
    const progressPct = Math.round((newNodes.length / totalNodes) * 100);
    const lvl =
      xp >= 1800 ? 6 : xp >= 1200 ? 5 : xp >= 750 ? 4 : xp >= 400 ? 3 : xp >= 150 ? 2 : 1;

    saveRoadmapProgress({
      firebase_uid: user.uid,
      career_id: career.id,
      career_title: career.title,
      current_level: lvl,
      completed_missions: newNodes,
      completed_subtopics: newSubtopics,
      total_xp: xp,
      progress_percentage: progressPct,
    }).catch((err) => console.warn("[Roadmap] Failed to persist progress:", err));

    if (newNodes.length > 0) {
      unlockAchievement(user.uid, "first_mission", career.id).catch(() => {});
    }
    if (lvl >= 2) {
      unlockAchievement(user.uid, "stage_ascension", career.id).catch(() => {});
    }
  };

  // Calculate User Level & XP based on completed nodes & subtopics
  const userXp = useMemo(() => {
    let xp = 150; // Base starting initiation XP
    career.nodes.forEach((node) => {
      if (completedNodeIds.includes(node.id)) {
        xp += node.xpReward || 250;
      }
    });
    return Math.min(2300, xp);
  }, [career.nodes, completedNodeIds]);

  const userLevel = useMemo(() => {
    if (userXp >= 1800) return 6;
    if (userXp >= 1200) return 5;
    if (userXp >= 750) return 4;
    if (userXp >= 400) return 3;
    if (userXp >= 150) return 2;
    return 1;
  }, [userXp]);

  // Helper to determine node state in the RPG Skill Tree
  const getNodeState = (node: RoadmapNode, index: number): SkillNodeState => {
    if (completedNodeIds.includes(node.id)) return "completed";
    if (index === 0) return "in-progress";

    const prevNode = career.nodes[index - 1];
    if (prevNode && completedNodeIds.includes(prevNode.id)) {
      return "available";
    }

    return "locked";
  };

  const handleToggleNodeCompletion = (node: RoadmapNode) => {
    const isAlreadyDone = completedNodeIds.includes(node.id);
    let nextNodes: string[];

    if (isAlreadyDone) {
      nextNodes = completedNodeIds.filter((id) => id !== node.id);
      setCompletedNodeIds(nextNodes);
    } else {
      nextNodes = [...completedNodeIds, node.id];
      setCompletedNodeIds(nextNodes);

      // Trigger Anime Victory / Level Up Celebration Popup
      const nextIdx = career.nodes.findIndex((n) => n.id === node.id) + 1;
      const nextNode = career.nodes[nextIdx];

      setLevelUpPopup({
        isOpen: true,
        title: `${node.questTitle} Complete!`,
        subtitle: `You have mastered ${node.label} and claimed your rewards.`,
        xpEarned: node.xpReward || 250,
        nextLevelName: nextNode?.questTitle,
      });
    }

    persistProgressToDb(nextNodes, completedSubtopicIds);
  };

  const toggleSubtopicCompletion = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let nextSubtopics: string[];
    if (completedSubtopicIds.includes(topicId)) {
      nextSubtopics = completedSubtopicIds.filter((id) => id !== topicId);
      setCompletedSubtopicIds(nextSubtopics);
    } else {
      nextSubtopics = [...completedSubtopicIds, topicId];
      setCompletedSubtopicIds(nextSubtopics);
    }

    persistProgressToDb(completedNodeIds, nextSubtopics);
  };

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Smooth Zoom Controls (Bounded between 0.4x and 2.2x)
  const handleZoomIn = () =>
    setZoom((prev) => Math.min(2.2, Number((prev + 0.15).toFixed(2))));
  const handleZoomOut = () =>
    setZoom((prev) => Math.max(0.4, Number((prev - 0.15).toFixed(2))));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Quick Stage Jump Navigator
  const handleJumpToStage = (stageLevel: number) => {
    const stageYOffsets: Record<number, number> = {
      1: 40,
      2: -320,
      3: -700,
      4: -1080,
      5: -1460,
      6: -1840,
    };
    setPan({ x: 0, y: stageYOffsets[stageLevel] || 0 });
    setZoom(1);
  };

  // Non-passive mouse wheel zoom (zooms canvas without scrolling the webpage)
  useEffect(() => {
    const frame = canvasFrameRef.current;
    if (!frame) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent webpage scrolling when hovering over canvas
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      setZoom((prev) => Math.min(2.2, Math.max(0.4, Number((prev + delta).toFixed(2)))));
    };

    frame.addEventListener("wheel", handleWheel, { passive: false });
    return () => frame.removeEventListener("wheel", handleWheel);
  }, [viewMode, isIsolatedView]);

  // Fullscreen / Isolation Handlers
  const handleToggleFullscreen = () => {
    const target = canvasFrameRef.current;
    if (!target) return;
    if (!document.fullscreenElement) {
      target.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Escape key exits isolated view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsIsolatedView(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Canvas Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, select, textarea, .roadmap-interactive-box"
      )
    )
      return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const accordion = career.accordionInfo || {
    question: `What is a ${career.title}?`,
    answer: career.overview,
    keyResponsibilities: [
      `Analyze ${career.sector} requirements and design scalable systems`,
      `Implement standard operating procedures and technical benchmarks`,
      `Collaborate across engineering, product, and leadership teams`,
      `Continuously optimize workflows and mentor junior colleagues`,
    ],
    averageSalaryDetail: `${career.averageSalary} • ${career.growthOutlook}`,
  };

  return (
    <div className="space-y-6 relative">
      {/* 1. CAREER PROGRESS & RPG STATUS HUD (Only visible in normal mode) */}
      {!isIsolatedView && (
        <CareerProgressPanel
          career={career}
          completedNodeIds={completedNodeIds}
          userXp={userXp}
          userLevel={userLevel}
          onSelectNextMission={() => {
            const next =
              career.nodes.find((n) => !completedNodeIds.includes(n.id)) || career.nodes[0];
            if (next) setActiveMissionNode(next);
          }}
        />
      )}

      {/* 2. TOP ROADMAP.SH EXPANDABLE ACCORDION BANNER (Only visible in normal mode) */}
      {!isIsolatedView && (
        <div className="rounded-2xl bg-[#0a0d20] border border-white/10 shadow-lg overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan shrink-0">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                {accordion.question}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{accordionOpen ? "Collapse Info" : "Expand Overview"}</span>
              {accordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {accordionOpen && (
            <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs sm:text-sm text-slate-300">
              <p className="leading-relaxed">{accordion.answer}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent-cyan block">
                    Core Responsibilities
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {accordion.keyResponsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent-purple-light block">
                    Market Compensation & Outlook
                  </span>
                  <p className="text-sm font-semibold text-white">{accordion.averageSalaryDetail}</p>
                  <p className="text-xs text-slate-400">
                    Calculated from verified tech industry placement reports and global compensation surveys.
                  </p>
                  <div className="pt-2">
                    <Badge variant="emerald" size="sm">
                      {career.growthOutlook}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. 3-WAY VIEW SWITCHER & CONTROLS (Only in normal mode) */}
      {!isIsolatedView && (
        <RoadmapViewSwitcher
          currentView={viewMode}
          onViewChange={setViewMode}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
          isIsolatedView={isIsolatedView}
          onToggleIsolatedView={() => setIsIsolatedView(true)}
          onJumpToStage={handleJumpToStage}
        />
      )}

      {/* ===================================================================== */}
      {/* 4. CANVAS CONTAINER FRAME (SUPPORTS NORMAL AND ISOLATED FOCUS MODE)   */}
      {/* ===================================================================== */}
      {viewMode !== "curriculum" ? (
        <div
          ref={canvasFrameRef}
          className={`${
            isIsolatedView
              ? "fixed inset-0 z-50 w-screen h-screen bg-[#060913] flex flex-col p-4 sm:p-6"
              : "rounded-3xl bg-[#060913] border-2 border-yellow-500/30 relative overflow-hidden h-[860px] shadow-2xl flex flex-col"
          }`}
        >
          {/* FLOATING TOP HUD (DEDICATED CONTROLS WHEN IN ISOLATED VIEW) */}
          {isIsolatedView ? (
            <div className="z-30 mb-3 flex items-center justify-between gap-3 bg-[#0a0f26]/90 p-3 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center font-mono font-black text-slate-950 text-xs shadow-md">
                  LVL
                </span>
                <div>
                  <h3 className="text-sm font-black text-white">{career.title} Flowchart</h3>
                  <p className="text-[11px] text-slate-400">
                    Focused Flowchart Canvas • Press [Esc] to return to full dashboard
                  </p>
                </div>
              </div>

              {/* View Switcher inside Isolated View */}
              <div className="flex items-center gap-2">
                <RoadmapViewSwitcher
                  currentView={viewMode}
                  onViewChange={setViewMode}
                  zoom={zoom}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onResetZoom={handleResetZoom}
                  isIsolatedView={true}
                  onToggleIsolatedView={() => setIsIsolatedView(false)}
                  onJumpToStage={handleJumpToStage}
                />

                <button
                  type="button"
                  onClick={() => setIsIsolatedView(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-100 flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  <X className="w-4 h-4 text-rose-400" />
                  <span>Exit Focus</span>
                </button>
              </div>
            </div>
          ) : (
            /* Floating Hint in Standard Mode */
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl text-xs text-slate-300 pointer-events-none shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>Scroll mouse wheel to zoom • Drag to pan • Click yellow pills for deep dive</span>
            </div>
          )}

          {/* Quick Floating Zoom / Reset Control Pill at Bottom Right */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-xl">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-amber-300 bg-amber-950/40 border border-amber-600/30 hover:bg-amber-900/40 transition-colors"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-5 bg-white/10 mx-0.5" />

            <button
              type="button"
              onClick={() => setIsIsolatedView(!isIsolatedView)}
              className="p-1.5 rounded-xl text-accent-cyan hover:bg-cyan-950/60 transition-colors"
              title={
                isIsolatedView
                  ? "Exit Flowchart Focus"
                  : "Focus Flowchart ONLY (Hides entire webpage)"
              }
            >
              {isIsolatedView ? <Minimize2 className="w-4 h-4" /> : <Focus className="w-4 h-4" />}
            </button>
          </div>

          {/* ACTIVE VIEW RENDERER (FLOWCHART OR SKILL TREE) */}
          {viewMode === "flowchart" ? (
            <AttractiveFlowchartView
              career={career}
              zoom={zoom}
              pan={pan}
              isDragging={isDragging}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              completedNodeIds={completedNodeIds}
              completedSubtopicIds={completedSubtopicIds}
              onSelectNode={setActiveMissionNode}
              onSelectSubtopic={setSelectedSubtopic}
              onToggleSubtopicCompletion={toggleSubtopicCompletion}
            />
          ) : (
            /* ANIME SKILL TREE VIEW */
            <div
              ref={canvasContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`flex-1 w-full h-full overflow-hidden relative cursor-grab select-none ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              style={{
                backgroundImage:
                  "radial-gradient(rgba(139, 92, 246, 0.15) 1.2px, transparent 1.2px)",
                backgroundSize: "32px 32px",
                backgroundColor: "#060913",
              }}
            >
              <div
                className="absolute top-12 left-1/2 -translate-x-1/2 origin-top transition-transform duration-75 select-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  minWidth: "780px",
                }}
              >
                <div className="flex flex-col items-center pb-36 space-y-2">
                  {career.nodes.map((node, index) => {
                    const state = getNodeState(node, index);
                    const isNodeCompleted = state === "completed";

                    return (
                      <div key={node.id} className="w-full flex flex-col items-center">
                        {index > 0 && (
                          <EnergyConnection
                            isActive={true}
                            isCompleted={isNodeCompleted}
                            length={52}
                            orientation="vertical"
                          />
                        )}

                        <SkillTreeNode
                          node={node}
                          state={state}
                          onClick={() => setActiveMissionNode(node)}
                          onQuickToggleComplete={() => handleToggleNodeCompletion(node)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CURRICULUM CHECKLIST VIEW */
        <div className="rounded-3xl bg-[#0a0d20]/90 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">{career.title} Curriculum Questline</h2>
              <p className="text-xs text-slate-300 mt-1">{career.overview}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">
                6 Progression Levels
              </Badge>
              <Badge variant="purple" size="sm">
                2,300 Total XP
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            {career.nodes.map((node, idx) => {
              const isCompleted = completedNodeIds.includes(node.id);

              return (
                <div
                  key={node.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isCompleted
                      ? "bg-emerald-950/20 border-emerald-500/40"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-700/50 flex items-center justify-center font-mono font-black text-purple-300 text-xs">
                        0{node.level}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent-cyan font-bold block">
                          {node.levelName}
                        </span>
                        <h3 className="text-base font-bold text-white">{node.questTitle}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 border border-amber-600/40 px-2.5 py-1 rounded-lg">
                        +{node.xpReward} XP
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleNodeCompletion(node)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10"
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>{isCompleted ? "Completed" : "Mark Cleared"}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{node.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-white/5">
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Key Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {node.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Tools & Platforms:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {node.languagesAndTools.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-800/40 text-purple-200 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. MISSION DETAIL MODAL (WHEN A NODE IS CLICKED) */}
      {activeMissionNode && (
        <MissionDetailPanel
          node={activeMissionNode}
          isCompleted={completedNodeIds.includes(activeMissionNode.id)}
          onClose={() => setActiveMissionNode(null)}
          onToggleComplete={() => handleToggleNodeCompletion(activeMissionNode)}
        />
      )}

      {/* 6. SUBTOPIC DETAIL MODAL (WHEN ANY SUBTOPIC PILL IS CLICKED) */}
      {selectedSubtopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="max-w-2xl w-full rounded-3xl bg-[#0b0f24] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan" size="sm">
                    {selectedSubtopic.category || "Core Curriculum"}
                  </Badge>
                  {completedSubtopicIds.includes(selectedSubtopic.id) && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800">
                      <Check className="w-3.5 h-3.5" /> Mastered
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {selectedSubtopic.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubtopic(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  Overview & Concept
                </h4>
                <p className="leading-relaxed text-slate-200">{selectedSubtopic.summary}</p>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {selectedSubtopic.details}
                </p>
              </div>

              {/* Key Competencies */}
              {selectedSubtopic.keyPoints && selectedSubtopic.keyPoints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-purple-light" />
                    Key Competencies
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs">
                    {selectedSubtopic.keyPoints.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Code Snippet */}
              {selectedSubtopic.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
                      Example Architecture Code
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(selectedSubtopic.codeSnippet!)}
                      className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Snippet
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-purple-200 overflow-x-auto leading-relaxed">
                    <code>{selectedSubtopic.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Hands-On Challenge */}
              {selectedSubtopic.handsOnTask && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    Hands-On Student Quest
                  </span>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {selectedSubtopic.handsOnTask}
                  </p>
                </div>
              )}

              {/* Interview Preparation */}
              {selectedSubtopic.interviewQuestions && selectedSubtopic.interviewQuestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-accent-purple-light" />
                    Interview Evaluation Questions
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {selectedSubtopic.interviewQuestions.map((q, i) => (
                      <li
                        key={i}
                        className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200 font-medium"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleSubtopicCompletion(selectedSubtopic.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedSubtopicIds.includes(selectedSubtopic.id)
                    ? "bg-emerald-500 text-white shadow-glow-cyan"
                    : "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md"
                }`}
              >
                {completedSubtopicIds.includes(selectedSubtopic.id) ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Completed (+50 XP)
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" /> Mark Topic as Mastered
                  </>
                )}
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSubtopic(null)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ACHIEVEMENT / LEVEL-UP CELEBRATION MODAL */}
      <AchievementPopup
        isOpen={levelUpPopup.isOpen}
        title={levelUpPopup.title}
        subtitle={levelUpPopup.subtitle}
        xpEarned={levelUpPopup.xpEarned}
        nextLevelName={levelUpPopup.nextLevelName}
        onClose={() => setLevelUpPopup((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
