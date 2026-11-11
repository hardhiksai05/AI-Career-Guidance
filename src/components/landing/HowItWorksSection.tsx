"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { UserPlus, Target, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Create your student profile",
    description:
      "Enter your academic credentials, current degree and specialization, or seamlessly upload your existing CV for automated profile structuring.",
    icon: UserPlus,
    accent: "purple",
    glow: "shadow-purple-500/20",
    color: "text-purple-400",
  },
  {
    step: "02",
    title: "Share your interests and skills",
    description:
      "Select tech domains that spark your curiosity, rank your career aspirations, and identify the core technical skills you wish to cultivate.",
    icon: Target,
    accent: "cyan",
    glow: "shadow-cyan-500/20",
    color: "text-cyan-400",
  },
  {
    step: "03",
    title: "Discover suitable career options",
    description:
      "Our AI matching engine scans industry demand to present highly compatible roles, salary ranges, and realistic career trajectory forecasts.",
    icon: Sparkles,
    accent: "blue",
    glow: "shadow-blue-500/20",
    color: "text-blue-400",
  },
  {
    step: "04",
    title: "Follow your personalized roadmap",
    description:
      "Execute milestone-driven learning paths, bridge critical skill gaps, and track your readiness for competitive internships and full-time roles.",
    icon: MapPin,
    accent: "emerald",
    glow: "shadow-emerald-500/20",
    color: "text-emerald-400",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="purple" size="md" className="mb-4">
            Four-Step Framework
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How AI Career Guidance <span className="text-gradient-purple-cyan">Works</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A frictionless, intelligent pathway designed to transform raw student potential into
            targeted, market-ready industry capability.
          </p>
        </div>

        {/* Connected Steps Grid / Timeline */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 -translate-y-12 bg-gradient-to-r from-accent-purple/30 via-accent-cyan/30 to-emerald-500/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative"
                >
                  <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-[#0c1022] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg ${item.glow}`}
                        >
                          <Icon className={`w-7 h-7 ${item.color}`} />
                        </div>
                        <span className="text-3xl font-black text-slate-700 group-hover:text-slate-500 transition-colors font-mono">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent-purple-light transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-slate-400 gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${item.color}`} />
                      <span>Stage {index + 1} of 4</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

