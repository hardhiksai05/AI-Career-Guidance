"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FeatureCard } from "@/components/dashboard/FeatureCard";
import { ProfileCompletionWidget } from "@/components/dashboard/ProfileCompletionWidget";
import { RecommendedCareerWidget } from "@/components/dashboard/RecommendedCareerWidget";
import { LearningProgressWidget } from "@/components/dashboard/LearningProgressWidget";
import { RecentOpportunitiesWidget } from "@/components/dashboard/RecentOpportunitiesWidget";
import { QuickChatbotWidget } from "@/components/dashboard/QuickChatbotWidget";
import {
  BotMessageSquare,
  UserCircle,
  Sparkles,
  Compass,
  Briefcase,
  ArrowRight,
  Info,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const featureCards = [
  {
    title: "AI Career Chatbot",
    description: "Converse with our intelligent mentor for real-time guidance, coursework advice, and interview preparation.",
    href: "/dashboard/chatbot",
    icon: BotMessageSquare,
    badge: "Interactive AI",
    gradient: "bg-purple-950/60 border-purple-800/40",
    iconColor: "text-accent-purple-light",
  },
  {
    title: "Student Profile",
    description: "Manage your academic background, verified coursework, technical skills, and uploaded CV documents.",
    href: "/dashboard/profile",
    icon: UserCircle,
    badge: "Profile",
    gradient: "bg-cyan-950/60 border-cyan-800/40",
    iconColor: "text-accent-cyan",
  },
  {
    title: "Career Recommendations",
    description: "AI compatibility scoring matching your strengths against current industry demands and salary projections.",
    href: "/dashboard/recommendations",
    icon: Sparkles,
    badge: "Personalized",
    gradient: "bg-indigo-950/60 border-indigo-800/40",
    iconColor: "text-indigo-400",
  },
  {
    title: "Learning Roadmaps",
    description: "Detailed step-by-step technical roadmaps with milestone checklists and practical project templates.",
    href: "/dashboard/roadmaps",
    icon: Compass,
    badge: "Milestones",
    gradient: "bg-blue-950/60 border-blue-800/40",
    iconColor: "text-blue-400",
  },
  {
    title: "Career Opportunities",
    description: "Curated internships, graduate programs, and research fellowships calibrated to your skill tier.",
    href: "/dashboard/opportunities",
    icon: Briefcase,
    badge: "Listings",
    gradient: "bg-emerald-950/60 border-emerald-800/40",
    iconColor: "text-emerald-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Architecture Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-blue-950/40 to-cyan-950/40 border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-accent-cyan shrink-0" />
          <span>
            <strong>Architecture Status:</strong> Firebase Authentication (Part 2) and Supabase
            PostgreSQL & Private Storage (Part 3) are active. Gemini Multimodal AI connects in Part 4.
          </span>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-accent-cyan bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
          Supabase + Firebase Active
        </span>
      </div>

      {/* Welcome Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#131938] via-[#0d1229] to-[#0a0d20] border border-white/10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <Badge variant="purple" size="md" className="mb-4">
            <Sparkles className="w-3 h-3 text-accent-cyan mr-1.5" />
            AI Workspace Online
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to Your Career Journey!
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore your potential and discover opportunities that match your ambitions. Your
            personalized roadmap is calibrated to your latest interests and skills.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              href="/dashboard/chatbot"
              variant="primary"
              size="md"
              className="shadow-glow-purple"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Career Discovery
            </Button>
            <Button
              href="/dashboard/recommendations"
              variant="secondary"
              size="md"
            >
              View Match Breakdown
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 5 Main Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Primary Platform Modules
            </h2>
            <p className="text-xs text-slate-400">
              Direct access to all career guidance engines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* Live Preview Widgets Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Student Activity Overview
            </h2>
            <p className="text-xs text-slate-400">
              Demonstration snapshots of your career progress & matches
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileCompletionWidget />
          <RecommendedCareerWidget />
          <LearningProgressWidget />
          <RecentOpportunitiesWidget />
        </div>
      </div>

      {/* Quick Interactive Chatbot Widget */}
      <QuickChatbotWidget />
    </div>
  );
}

