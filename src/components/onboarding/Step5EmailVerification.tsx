"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatAuthError } from "@/lib/auth-errors";
import { upsertProfile, upsertCareerPreferences } from "@/lib/services/profile-service";
import { OnboardingData } from "@/types";
import {
  Mail,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  ArrowRight,
  LogIn,
  Info,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface Step5Props {
  email: string;
  onUpdateEmail: (newEmail: string) => void;
  onboardingData?: OnboardingData;
}

export const Step5EmailVerification: React.FC<Step5Props> = ({ email, onboardingData }) => {
  const router = useRouter();
  const { user, refreshUser, resendVerification, signInWithGoogle, signInWithGitHub } = useAuth();
  const { showToast } = useToast();

  const [resendCooldown, setResendCooldown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Real verification state from Firebase User
  const isVerified = Boolean(user?.emailVerified);

  // 45-second resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0 && !canResend) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, canResend]);

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setStatusMessage(null);

    try {
      await resendVerification();
      setCanResend(false);
      setResendCooldown(45);
      setStatusMessage(`A new verification email has been dispatched from Firebase to ${user?.email || email}.`);
      showToast({
        type: "success",
        title: "Verification Email Sent",
        description: `Check your inbox at ${user?.email || email}.`,
      });
    } catch (err: any) {
      const formatted = formatAuthError(err);
      setStatusMessage(formatted.message);
      showToast({
        type: "error",
        title: formatted.title,
        description: formatted.message,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setStatusNoticeMessage(null);

    try {
      const verified = await refreshUser();
      if (verified) {
        if (user) {
          try {
            const savedDraft =
              onboardingData ||
              (typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("onboarding_draft") || "null")
                : null);

            if (savedDraft) {
              await upsertProfile({
                firebase_uid: user.uid,
                email: user.email || email,
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
            console.warn("Supabase onboarding profile sync note:", syncErr);
          }
        }

        showToast({
          type: "success",
          title: "Email Verified Successfully!",
          description: "Your AI Career Guidance workspace is now activated.",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        setStatusMessage(
          "Verification link not yet clicked. Please open the link in your email to activate your account."
        );
        showToast({
          type: "info",
          title: "Verification Pending",
          description: "Firebase confirms your email is not verified yet. Please click the link in your email.",
        });
      }
    } catch (err: any) {
      const formatted = formatAuthError(err);
      setStatusMessage(formatted.message);
    } finally {
      setIsChecking(false);
    }
  };

  const setStatusNoticeMessage = setStatusMessage;

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    setStatusMessage(null);

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithGitHub();
      }
      showToast({
        type: "success",
        title: "Authenticated with " + (provider === "google" ? "Google" : "GitHub"),
        description: "Redirecting to your student dashboard...",
      });
      router.push("/dashboard");
    } catch (err: any) {
      const formatted = formatAuthError(err);
      setStatusMessage(formatted.message);
      showToast({
        type: "error",
        title: formatted.title,
        description: formatted.message,
      });
    } finally {
      setOauthLoading(null);
    }
  };

  const displayEmail = user?.email || email;

  return (
    <div className="space-y-6">
      {/* 1. Verified Success State */}
      {isVerified ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-950/80 border border-emerald-500/50 mx-auto flex items-center justify-center text-emerald-400 shadow-glow-cyan">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <Badge variant="emerald" size="md" className="mb-3">
              Verified by Firebase
            </Badge>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Email Verified Successfully!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              Your academic credentials for <strong>{displayEmail}</strong> are confirmed. Your
              personalized AI Career Guidance workspace is unlocked.
            </p>
          </div>

          <div className="pt-2">
            <Button
              href="/dashboard"
              variant="primary"
              size="lg"
              className="shadow-glow-purple px-8"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Student Dashboard
            </Button>
          </div>
        </div>
      ) : (
        /* 2. Pending Verification State */
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-accent-purple/30 to-accent-cyan/30 border border-purple-500/30 mx-auto flex items-center justify-center text-accent-cyan shadow-glow-purple relative">
            <Mail className="w-8 h-8 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-cyan animate-ping opacity-75" />
          </div>

          <div>
            <Badge variant="purple" size="md" className="mb-3">
              Step 5: Email Verification
            </Badge>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Verify Your Email Address
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
              Firebase Authentication has sent an activation link to your inbox. You must click the
              link to activate your workspace.
            </p>
          </div>

          {/* Email Target Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2.5 truncate">
              <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
              <span className="text-sm font-bold text-white font-mono truncate">
                {displayEmail}
              </span>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="p-4 rounded-2xl bg-[#070b1a] border border-white/5 text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Activation Instructions:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
              <li>Open your email inbox (and check spam or promotional folders).</li>
              <li>Click the verification link provided in the email.</li>
              <li>Click <strong>&quot;Check Verification Status&quot;</strong> below to enter your dashboard.</li>
            </ol>
          </div>

          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2.5 text-left max-w-md mx-auto">
              <Info className="w-4 h-4 text-accent-cyan shrink-0" />
              <p className="leading-relaxed">{statusMessage}</p>
            </div>
          )}

          {/* Real Actions: Check Status & Resend */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              isLoading={isChecking}
              onClick={handleCheckStatus}
              className="w-full sm:w-auto shadow-glow-purple px-6"
              leftIcon={<RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />}
            >
              Check Verification Status
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={!canResend || isResending}
              isLoading={isResending}
              onClick={handleResend}
              className="w-full sm:w-auto"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              {canResend ? (
                "Resend Verification Link"
              ) : (
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" /> Resend in {resendCooldown}s
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Alternative Social Sign In */}
      <div className="pt-6 border-t border-white/10 text-center space-y-3">
        <p className="text-xs text-slate-400">
          Or authenticate instantly with your university provider:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            disabled={oauthLoading !== null}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{oauthLoading === "google" ? "Connecting..." : "Verify via Google"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("github")}
            disabled={oauthLoading !== null}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>{oauthLoading === "github" ? "Connecting..." : "Verify via GitHub"}</span>
          </button>
        </div>
      </div>

      {/* Return to Login link */}
      <div className="pt-2 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent-cyan transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Already have a verified account? Return to Login</span>
        </Link>
      </div>
    </div>
  );
};
