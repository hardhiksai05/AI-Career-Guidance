"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import {
  BotMessageSquare,
  UserCheck,
  Sparkles,
  Compass,
  Briefcase,
  GitCompare,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BotMessageSquare,
    title: "AI Career Chatbot",
    description:
      "Interactive conversational guidance powered by advanced language models to brainstorm trajectories, answer technical inquiries, and advise on career questions.",
    badge: "Core AI",
    link: "/dashboard/chatbot",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-accent-purple-light",
    borderHover: "hover:border-purple-500/40",
  },
  {
    icon: UserCheck,
    title: "Student Profile Analysis",
    description:
      "Deep structural extraction of your academic background, coursework, projects, and CV to identify hidden strengths and competitive advantages.",
    badge: "Intelligent Intake",
    link: "/dashboard/profile",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-accent-cyan",
    borderHover: "hover:border-cyan-500/40",
  },
  {
    icon: Sparkles,
    title: "Personalized Career Recommendations",
    description:
      "Multi-criteria compatibility scoring that matches your unique profile with top industry roles, emerging specializations, and salary outlooks.",
    badge: "Matching Engine",
    link: "/dashboard/recommendations",
    color: "from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-400",
    borderHover: "hover:border-indigo-500/40",
  },
  {
    icon: Compass,
    title: "Learning Roadmaps",
    description:
      "Step-by-step curriculum with curated milestones, verified project templates, and documentation references to take you from fundamentals to mastery.",
    badge: "Milestone Paths",
    link: "/dashboard/roadmaps",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/40",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description:
      "Curated listings of internships, graduate positions, and competitive research fellowships matched directly to your verified skill portfolio.",
    badge: "Market Intel",
    link: "/dashboard/opportunities",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
  },
  {
    icon: GitCompare,
    title: "Skill Gap Analysis",
    description:
      "Automated comparison of your current tech stack against real-time job market requirements to pinpoint the exact skills you need to learn next.",
    badge: "Market Calibration",
    link: "/dashboard/profile",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/40",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#080b18]">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-4">
            Feature Previews
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Comprehensive{" "}
            <span className="text-gradient-purple-cyan">Career Excellence</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A cohesive suite of intelligent tools crafted to transition ambitious students from
            uncertainty to structured, high-value career trajectories.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={feature.link}
                  className={`group block h-full p-7 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-white/5 ${feature.borderHover} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass relative overflow-hidden`}
                >
                  {/* Subtle top light bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-background-surface/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-accent-purple-light transition-colors flex items-center gap-1.5">
                    {feature.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-accent-cyan" />
                  </h3>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

