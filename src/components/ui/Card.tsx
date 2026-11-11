import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "glass" | "solid" | "glow";
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "glass",
  hoverEffect = false,
  className,
  ...props
}) => {
  const variantStyles = {
    glass: "glass-card",
    solid: "bg-background-surface/90 border border-slate-800/80",
    glow: "glass-card border-purple-500/20 shadow-glow-purple",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variantStyles[variant],
        hoverEffect &&
          "hover:border-accent-purple/40 hover:shadow-glow-purple hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

