"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Cpu,
  Layers,
  Map,
  GraduationCap,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Sparkles,
    title: "Personalized Career Guidance",
    description:
      "Unlike static articles or generic job boards, our system contextualizes advice to your precise year of study, technical interests, and ambition level.",
    color: "text-accent-purple-light",
    bg: "bg-purple-950/40 border-purple-800/40",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description:
      "Synthesizes natural language inputs, resume contents, and market analytics into high-fidelity compatibility ratings and custom suggestions.",
    color: "text-accent-cyan",
    bg: "bg-cyan-950/40 border-cyan-800/40",
  },
  {
    icon: Layers,
    title: "Multiple Career Domains",
    description:
      "Extensive coverage across 14+ tech and professional domains including Machine Learning, Cybersecurity, Cloud Systems, Fintech, and Bio-informatics.",
    color: "text-blue-400",
    bg: "bg-blue-950/40 border-blue-800/40",
  },
  {
    icon: Map,
    title: "Structured Learning Paths",
    description:
      "Never wonder what tutorial to watch next. Clear curriculum checkpoints with estimated completion timelines and verified project concepts.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40 border-emerald-800/40",
  },
  {
    icon: GraduationCap,
    title: "Student-Focused Experience",
    description:
      "Designed from the ground up for students seeking high-impact internships, early-career software roles, or prestigious postgraduate research programs.",
    color: "text-amber-400",
    bg: "bg-amber-950/40 border-amber-800/40",
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-4">
            Competitive Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="text-gradient-purple-cyan">AI Career Guidance</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A purpose-built intelligence ecosystem engineered to eliminate career confusion and
            accelerate your trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`glass-panel rounded-2xl p-7 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${
                  index === 0 ? "lg:col-span-1" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.bg}`}
                >
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Advantage</span>
                </div>
              </motion.div>
            );
          })}

          {/* Quick Stat Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel rounded-2xl p-7 border border-accent-purple/30 bg-gradient-to-br from-purple-900/20 via-background-surface/80 to-indigo-900/20 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple-light">
                Built For Modern Tech Careers
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                100% Focused on Measurable Student Outcomes
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Whether aiming for Fortune 500 tech companies, fast-growing AI startups, or elite
                research programs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Next-Gen Architecture</span>
              <span className="text-accent-cyan font-semibold">Updated for 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

