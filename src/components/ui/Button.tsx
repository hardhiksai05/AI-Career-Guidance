"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#070913] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 h-8",
      md: "text-sm px-5 py-2.5 gap-2 h-10",
      lg: "text-base px-6 py-3 gap-2.5 h-12",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-accent-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-400/20 focus:ring-accent-purple",
      secondary:
        "bg-background-surface/80 hover:bg-background-surface text-slate-200 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-md focus:ring-slate-400",
      outline:
        "bg-transparent text-slate-200 hover:text-white border border-slate-700 hover:border-accent-purple/50 hover:bg-accent-purple/10 focus:ring-accent-purple",
      ghost:
        "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 focus:ring-slate-500",
      cyan:
        "bg-gradient-to-r from-accent-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 border border-cyan-400/20 focus:ring-accent-cyan",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName} target={target} rel={rel}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        suppressHydrationWarning
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

