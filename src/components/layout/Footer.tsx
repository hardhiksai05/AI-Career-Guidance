"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Mail, MapPin, Sparkles, Github, Twitter, Linkedin, X, Shield, FileText } from "lucide-react";

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="bg-[#050711] border-t border-white/5 relative overflow-hidden text-slate-400">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover Your Potential. Explore Your Future. Build Your Career. Empowering students with cutting-edge artificial intelligence, tailored skill roadmaps, and intelligent career alignment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-accent-purple/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-accent-purple/50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-accent-purple/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent-cyan transition-colors">
                  About Mission
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-accent-cyan transition-colors">
                  Key Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-accent-cyan transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-accent-cyan transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              AI Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/chatbot" className="hover:text-accent-purple-light transition-colors">
                  AI Career Chatbot
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="hover:text-accent-purple-light transition-colors">
                  Student Profile Analysis
                </Link>
              </li>
              <li>
                <Link href="/dashboard/recommendations" className="hover:text-accent-purple-light transition-colors">
                  Career Recommendations
                </Link>
              </li>
              <li>
                <Link href="/dashboard/roadmaps" className="hover:text-accent-purple-light transition-colors">
                  Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/dashboard/opportunities" className="hover:text-accent-purple-light transition-colors">
                  Internships & Roles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Placeholder */}
          <div className="space-y-3" id="contact">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Support & Inquiries
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-cyan" />
                <span>support@aicareerguidance.platform</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-purple" />
                <span>Global AI Student Community</span>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Career Guidance. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalContent("privacy")}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalContent("terms")}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-accent-purple-light flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" /> Built for the Next Generation
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Privacy Policy / Terms */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-slate-200">
          <div className="max-w-xl w-full rounded-3xl bg-[#0b0f24] border border-white/10 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                {modalContent === "privacy" ? (
                  <Shield className="w-5 h-5 text-accent-cyan" />
                ) : (
                  <FileText className="w-5 h-5 text-accent-purple-light" />
                )}
                <h3 className="text-lg font-bold text-white">
                  {modalContent === "privacy" ? "Student Data Privacy Policy" : "Platform Terms & Conditions"}
                </h3>
              </div>
              <button
                onClick={() => setModalContent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {modalContent === "privacy" ? (
                <>
                  <p>
                    <strong>1. Confidential Student Records:</strong> AI Career Guidance is committed to safeguarding your academic transcripts, resume contents, and career aspirations. We adhere to zero-retention principles for third-party model training.
                  </p>
                  <p>
                    <strong>2. Cloud Storage Encryption:</strong> Uploaded resume files and portfolios are stored in isolated encrypted cloud buckets protected by Row Level Security (RLS) policies.
                  </p>
                  <p>
                    <strong>3. Your Rights:</strong> You can export, update, or permanently delete your student profile and conversation history at any time from your settings workspace.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Educational Guidance:</strong> AI Career Guidance provides algorithmically assisted learning roadmaps and career trajectory simulations for educational purposes.
                  </p>
                  <p>
                    <strong>2. User Conduct:</strong> Users agree to provide truthful academic credentials to ensure highest accuracy in curriculum alignment and opportunity matches.
                  </p>
                  <p>
                    <strong>3. Intellectual Property:</strong> Career curriculum frameworks and proprietary scoring metrics are protected. External references are credited to respective academic open standards.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded-xl bg-accent-purple hover:bg-purple-600 text-xs font-semibold text-white transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
