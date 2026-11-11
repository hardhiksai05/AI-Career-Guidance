import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "cyan" | "emerald" | "amber" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "purple",
  size = "md",
  className,
  dot = false,
}) => {
  const variantStyles = {
    purple: "bg-purple-950/60 text-purple-300 border-purple-800/40",
    cyan: "bg-cyan-950/60 text-cyan-300 border-cyan-800/40",
    emerald: "bg-emerald-950/60 text-emerald-300 border-emerald-800/40",
    amber: "bg-amber-950/60 text-amber-300 border-amber-800/40",
    neutral: "bg-slate-800/60 text-slate-300 border-slate-700/50",
  };

  const dotColors = {
    purple: "bg-purple-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    neutral: "bg-slate-400",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1.5",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border backdrop-blur-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
};

