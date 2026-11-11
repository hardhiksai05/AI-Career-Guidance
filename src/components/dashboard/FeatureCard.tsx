import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  gradient: string;
  iconColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  href,
  icon: Icon,
  badge,
  gradient,
  iconColor,
}) => {
  return (
    <div className="group rounded-2xl bg-gradient-to-br from-[#11162f]/80 to-[#0a0d1e]/80 border border-white/5 hover:border-purple-500/30 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${gradient}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          {badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-accent-purple-light transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan hover:text-white transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Explore Feature</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

