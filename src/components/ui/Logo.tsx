import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false, size = "md" }) => {
  const sizeClasses = {
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-base",
    lg: "w-11 h-11 text-xl",
  };

  const textSize = {
    sm: "text-base font-semibold",
    md: "text-lg font-bold",
    lg: "text-2xl font-extrabold",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-all duration-200 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-tr from-accent-purple via-indigo-500 to-accent-cyan p-[1.5px] shadow-glow-purple group-hover:shadow-glow-cyan transition-shadow duration-300 flex items-center justify-center`}
      >
        <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Sparkles className="w-4 h-4 text-accent-cyan group-hover:text-accent-purple-light transition-colors duration-200" />
        </div>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`${textSize[size]} tracking-tight text-white flex items-center gap-1.5`}>
            AI Career <span className="text-gradient-purple-cyan">Guidance</span>
          </span>
          <span className="text-[10px] tracking-wider uppercase text-muted-foreground font-medium -mt-1 hidden sm:block">
            Next-Gen Mentorship
          </span>
        </div>
      )}
    </Link>
  );
};

