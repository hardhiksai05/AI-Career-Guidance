"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { upsertProfile, upsertCareerPreferences } from "@/lib/services/profile-service";
import {
  Mail,
  CheckCircle2,
  RotateCcw,
  Clock,
  ArrowRight,
  LogOut,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { user, loading, isAuthenticated, isEmailVerified, resendVerification, refreshUser, signOutUser } = useAuth();
  const { showToast } = useToast();

  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cooldown, setCooldown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Cooldown countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0 && !canResend) {
      timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [cooldown, canResend]);

  // If already verified, forward to target
  useEffect(() => {
    if (!loading && isAuthenticated && isEmailVerified) {
      router.replace(redirectTarget);
    }
  }, [loading, isAuthenticated, isEmailVerified, redirectTarget, router]);

  // If not authenticated at all, redirect to /login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
    }
  }, [loading, isAuthenticated, redirectTarget, router]);

  const handleResendEmail = async () => {
    if (!canResend || resending) return;
    setResending(true);
    setStatusNotice(null);

    try {
      await resendVerification();
      setCanResend(false);
      setCooldown(45);
      showToast({
        type: "success",
        title: "Verification Email Sent",
        description: `A fresh verification link has been dispatched to ${user?.email}.`,
      });
      setStatusNotice("New link sent! Please check your spam or promotional folders if it does not appear in your inbox.");
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Resend Failed",
        description: err?.message || "Could not dispatch verification email. Please try again shortly.",
      });
    } finally {
      setResending(false);
    }
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    setStatusNotice(null);

    try {
      const isVerified = await refreshUser();
      if (isVerified) {
        if (user) {
          try {
            const savedDraft =
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("onboarding_draft") || "null")
                : null;
            if (savedDraft) {
              await upsertProfile({
                firebase_uid: user.uid,
                email: user.email || "",
                full_name: savedDraft.academic?.fullName || user.displayName || "Student",
                username: savedDraft.basic?.username || null,
                university: savedDraft.academic?.university || null,
                degree: savedDraft.academic?.degree || null,
                branch: savedDraft.academic?.branch || null,
                graduation_year: savedDraft.academic?.graduationYear || null,
              });

              if (savedDraft.preferences) {
                await upsertCareerPreferences({
                  firebase_uid: user.uid,
                  preferred_domains: savedDraft.preferences.domains || [],
                  career_goals: savedDraft.preferences.primaryGoal || null,
                  target_skills: savedDraft.preferences.targetSkills || [],
                  preferred_learning_style: savedDraft.preferences.preferredLearningStyle || null,
                  experience_level: savedDraft.preferences.targetOutcome || null,
                });
              }

              if (typeof window !== "undefined") {
                localStorage.removeItem("onboarding_draft");
              }
            }
          } catch (syncErr) {
            console.warn("Supabase profile sync note:", syncErr);
          }
        }

        showToast({
          type: "success",
          title: "Email Verified Successfully!",
          description: "Welcome to AI Career Guidance. Redirecting to your student dashboard...",
        });
        setTimeout(() => {
          router.replace(redirectTarget);
        }, 1200);
      } else {
        setStatusNotice(
          "Verification link not yet clicked. Please open the link in your email to activate your workspace."
        );
        showToast({
          type: "info",
          title: "Verification Pending",
          description: "We checked Firebase Authentication: your email is not verified yet.",
        });
      }
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Check Failed",
        description: err?.message || "Could not check verification status.",
      });
    } finally {
      setChecking(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.replace("/login");
  };

  const userEmail = user?.email || "your registered email";

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[450px] bg-accent-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[400px] bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="p-6 sm:px-10 flex items-center justify-between relative z-10">
        <Logo />
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Card */}
      <main className="flex-1 py-10 px-4 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg p-6 sm:p-10 rounded-3xl bg-[#0b0f24]/90 border-2 border-purple-500/30 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          {/* Animated Envelope Icon */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-accent-purple/30 to-accent-cyan/30 border border-purple-500/30 mx-auto flex items-center justify-center text-accent-cyan shadow-glow-purple relative">
            <Mail className="w-8 h-8 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-cyan animate-ping opacity-75" />
          </div>

          <div>
            <Badge variant="purple" size="md" className="mb-3">
              Action Required
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Verify Your Email Address
            </h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              We dispatched an activation link from Firebase Authentication to:
            </p>
          </div>

          {/* Email Target Box */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto flex items-center justify-center gap-2.5">
            <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
            <span className="text-sm font-bold text-white font-mono break-all">{userEmail}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#070b1a] border border-white/5 text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              How to complete verification:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
              <li>Open your email inbox in a browser or mail client.</li>
              <li>Click the verification link sent by <strong>AI Career Guidance</strong>.</li>
              <li>Return to this tab and click <strong>&quot;I Have Verified My Email&quot;</strong> below.</li>
            </ol>
          </div>

          {statusNotice && (
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2.5 text-left max-w-md mx-auto">
              <AlertTriangle className="w-4 h-4 text-accent-cyan shrink-0" />
              <p className="leading-relaxed">{statusNotice}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              isLoading={checking}
              onClick={handleCheckStatus}
              className="w-full sm:w-auto shadow-glow-purple px-6"
              leftIcon={<RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />}
            >
              I Have Verified My Email
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={!canResend || resending}
              isLoading={resending}
              onClick={handleResendEmail}
              className="w-full sm:w-auto"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              {canResend ? (
                "Resend Link"
              ) : (
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" /> Resend in {cooldown}s
                </span>
              )}
            </Button>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Wrong email address?</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-accent-cyan hover:underline font-semibold"
            >
              Sign up with another email
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} AI Career Guidance • Firebase Authentication Secure Verification
      </footer>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

