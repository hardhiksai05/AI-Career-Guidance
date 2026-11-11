"use client";

import React from "react";
import {
  Sparkles,
  GitBranch,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Focus,
  Move,
} from "lucide-react";

export type RoadmapViewMode = "skilltree" | "flowchart" | "curriculum";

interface RoadmapViewSwitcherProps {
  currentView: RoadmapViewMode;
  onViewChange: (view: RoadmapViewMode) => void;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
  isIsolatedView?: boolean;
  onToggleIsolatedView?: () => void;
  activeStage?: number;
  onJumpToStage?: (stage: number) => void;
}

export const RoadmapViewSwitcher: React.FC<RoadmapViewSwitcherProps> = ({
  currentView,
  onViewChange,
  zoom = 1,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
  isFullscreen = false,
  isIsolatedView = false,
  onToggleIsolatedView,
  activeStage,
  onJumpToStage,
}) => {
  return (
    <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 bg-[#0a0d20]/95 p-2.5 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-2xl">
      {/* 1. Main View Tabs (Flowchart | Skill Tree | Curriculum) */}
      <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/5 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => onViewChange("flowchart")}
          className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap active:scale-95 ${
            currentView === "flowchart"
              ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-black shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Interactive Flowchart</span>
        </button>

        <button
          type="button"
          onClick={() => onViewChange("skilltree")}
          className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap active:scale-95 ${
            currentView === "skilltree"
              ? "bg-gradient-to-r from-accent-purple via-indigo-600 to-pink-600 text-white shadow-glow-purple font-black scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Anime Skill Tree</span>
        </button>

        <button
          type="button"
          onClick={() => onViewChange("curriculum")}
          className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap active:scale-95 ${
            currentView === "curriculum"
              ? "bg-slate-700 text-white shadow-sm font-black scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Curriculum Checklist</span>
        </button>
      </div>

      {/* 2. Stage Quick Jump Navigator (Visible in flowchart/skilltree) */}
      {currentView !== "curriculum" && onJumpToStage && (
        <div className="hidden lg:flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">
            Jump to:
          </span>
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => onJumpToStage(lvl)}
              className="px-2 py-1 rounded-md text-[10px] font-mono font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={`Jump to Level ${lvl}`}
            >
              L{lvl}
            </button>
          ))}
        </div>
      )}

      {/* 3. Canvas Zoom, Isolation & Fullscreen Controls */}
      {currentView !== "curriculum" && (
        <div className="flex items-center justify-end gap-1.5 px-1">
          {/* Zoom Out Button */}
          {onZoomOut && (
            <button
              type="button"
              onClick={onZoomOut}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors active:scale-95"
              title="Zoom Out (Scroll wheel down)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          )}

          {/* Reset Zoom Percent Button */}
          {onResetZoom && (
            <button
              type="button"
              onClick={onResetZoom}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-black text-amber-300 bg-amber-950/40 border border-amber-600/30 hover:bg-amber-900/40 transition-colors"
              title="Reset Zoom to 100% (Double click canvas)"
            >
              {Math.round(zoom * 100)}%
            </button>
          )}

          {/* Zoom In Button */}
          {onZoomIn && (
            <button
              type="button"
              onClick={onZoomIn}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors active:scale-95"
              title="Zoom In (Scroll wheel up)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          )}

          <div className="w-[1px] h-6 bg-white/10 mx-1" />

          {/* Focus Canvas Only (Hide Entire Webpage) */}
          {onToggleIsolatedView && (
            <button
              type="button"
              onClick={onToggleIsolatedView}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
                isIsolatedView
                  ? "bg-accent-cyan text-slate-950 border-cyan-400 shadow-glow-cyan"
                  : "bg-white/5 text-slate-200 border-white/10 hover:border-cyan-400/50 hover:text-white"
              }`}
              title={
                isIsolatedView
                  ? "Exit Flowchart Focus Mode"
                  : "Focus Flowchart ONLY (Hides entire webpage)"
              }
            >
              {isIsolatedView ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exit Focus</span>
                </>
              ) : (
                <>
                  <Focus className="w-3.5 h-3.5 text-accent-cyan" />
                  <span className="hidden sm:inline">Flowchart Only</span>
                </>
              )}
            </button>
          )}

          {/* Fullscreen Handler */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors active:scale-95"
              title={isFullscreen ? "Exit Fullscreen" : "Full Screen Window"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
