"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Target, Lightbulb, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0a0d1e]">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <Badge variant="purple" size="md">
              Our Guiding Mission
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Empowering Every Student to Navigate the{" "}
              <span className="text-gradient-purple-cyan">AI Era With Clarity</span>
            </h2>

            <div className="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-accent-purple backdrop-blur-md">
              <p className="text-lg sm:text-xl text-slate-200 font-medium italic leading-relaxed">
                “To help students make informed career decisions by combining intelligent
                technology, personalized learning guidance and career exploration.”
              </p>
            </div>

            <p className="text-base text-slate-400 leading-relaxed">
              In a rapidly evolving technological landscape, traditional one-size-fits-all academic
              counseling is no longer sufficient. Modern students face an overwhelming array of
              emerging tools, overlapping job descriptions, and fragmented resources. AI Career
              Guidance acts as an always-accessible, personalized career mentor that evaluates your
              specific skill base, projects realistic milestones, and illuminates unambiguous paths
              to high-growth professional careers.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/signup" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Your Journey
              </Button>
              <Button href="/dashboard" variant="outline">
                View Student Dashboard Preview
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Algorithmic Precision</h3>
                  <p className="text-sm text-slate-400">
                    Proprietary matching algorithms that eliminate bias and surface the highest-fit
                    career pathways tailored to your unique profile.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Actionable Roadmaps</h3>
                  <p className="text-sm text-slate-400">
                    No theoretical hand-waving. Every recommendation is accompanied by concrete,
                    verifiable skill roadmaps with stage-by-stage mastery checklists.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Student-Centric Philosophy</h3>
                  <p className="text-sm text-slate-400">
                    Designed specifically for high school, undergraduate, and graduate students to
                    maximize internship readiness and job-market competitiveness.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Privacy & Security First</h3>
                  <p className="text-sm text-slate-400">
                    Your personal information, resume documents, and goals remain strictly
                    confidential with enterprise-grade data boundaries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

