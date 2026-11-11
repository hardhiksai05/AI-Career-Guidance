"use client";

import React from "react";

interface EnergyConnectionProps {
  isActive?: boolean;
  isCompleted?: boolean;
  length?: number;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const EnergyConnection: React.FC<EnergyConnectionProps> = ({
  isActive = true,
  isCompleted = false,
  length = 40,
  orientation = "vertical",
  className = "",
}) => {
  const isVertical = orientation === "vertical";
  const w = isVertical ? 20 : length;
  const h = isVertical ? length : 20;

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: `${w}px`, height: `${h}px` }}
      aria-hidden="true"
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Neon energy gradient */}
          <linearGradient
            id="energyPulseGrad"
            x1="0%"
            y1="0%"
            x2={isVertical ? "0%" : "100%"}
            y2={isVertical ? "100%" : "0%"}
          >
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonBeamGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background pipe */}
        {isVertical ? (
          <line
            x1="10"
            y1="0"
            x2="10"
            y2={length}
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : (
          <line
            x1="0"
            y1="10"
            x2={length}
            y2="10"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Active Animated Energy Beam */}
        {isActive && (
          <>
            {isVertical ? (
              <line
                x1="10"
                y1="0"
                x2="10"
                y2={length}
                stroke={isCompleted ? "#10b981" : "url(#energyPulseGrad)"}
                strokeWidth={isCompleted ? "3.5" : "3"}
                strokeDasharray="6 4"
                className="animate-[dash_1.2s_linear_infinite]"
                filter="url(#neonBeamGlow)"
              />
            ) : (
              <line
                x1="0"
                y1="10"
                x2={length}
                y2="10"
                stroke={isCompleted ? "#10b981" : "url(#energyPulseGrad)"}
                strokeWidth={isCompleted ? "3.5" : "3"}
                strokeDasharray="6 4"
                className="animate-[dash_1.2s_linear_infinite]"
                filter="url(#neonBeamGlow)"
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
};

