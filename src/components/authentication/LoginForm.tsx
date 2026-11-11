"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { formatAuthError } from "@/lib/auth-errors";
import {
  Mail,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  KeyRound,
  RotateCcw,
  Clock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { signIn, signInWithGoogle, signInWithGitHub, sendVerification, resetPassword, isConfigured } = useAuth();
  const { showToast } = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Unverified Email Checkpoint State
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendingVerification, setResendingVerification] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // GitHub Provider Configuration Guide Modal
  const [showGithubGuideModal, setShowGithubGuideModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    setErrorMessage(null);
    setUnverifiedEmail(null);

    try {
      const loggedUser = await signIn(data.email, data.password, data.rememberMe);

      // Section 7: If email verification is incomplete, block normal dashboard access
      if (!loggedUser.emailVerified) {
        setUnverifiedEmail(loggedUser.email || data.email);
        showToast({
          type: "warning",
          title: "Email Verification Required",
          description: "Please verify your email address to unlock your student dashboard.",
        });
        return;
      }

      showToast({
        type: "success",
        title: "Signed In Successfully",
        description: "Welcome back to your AI Career Guidance workspace.",
      });
      router.push(redirectTarget);
    } catch (err: any) {
      const formatted = formatAuthError(err);
      setErrorMessage(formatted.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    setErrorMessage(null);
    setUnverifiedEmail(null);

    try {
      const loggedUser = provider === "google" ? await signInWithGoogle() : await signInWithGitHub();

      showToast({
        type: "success",
        title: "Authentication Successful",
        description: `Signed in via ${provider === "google" ? "Google" : "GitHub"}.`,
      });
      router.push(redirectTarget);
    } catch (err: any) {
      // Section 6: If GitHub provider is not enabled in Firebase Console, show helpful setup guide
      if (provider === "github" && err?.code === "auth/operation-not-allowed") {
        setShowGithubGuideModal(true);
      } else {
        const formatted = formatAuthError(err);
        setErrorMessage(formatted.message);
        showToast({
          type: "error",
          title: formatted.title,
          description: formatted.message,
        });
      }
    } finally {
      setOauthLoading(null);
    }
  };

  const handleResendFromLogin = async () => {
    setResendingVerification(true);
    try {
      await sendVerification();
      showToast({
        type: "success",
        title: "Verification Email Sent",
        description: `A fresh link has been dispatched to ${unverifiedEmail}.`,
      });
    } catch (err: any) {
      const formatted = formatAuthError(err);
      showToast({
        type: "error",
        title: formatted.title,
        description: formatted.message,
      });
    } finally {
      setResendingVerification(false);
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes("@")) {
      showToast({
        type: "error",
        title: "Invalid Email",
        description: "Please enter a valid email address for password reset.",
      });
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetEmail.trim());
      setResetSuccess(true);
      showToast({
        type: "success",
        title: "Password Reset Link Dispatched",
        description: `Check your inbox at ${resetEmail.trim()} for instructions.`,
      });
    } catch (err: any) {
      const formatted = formatAuthError(err);
      showToast({
        type: "error",
        title: formatted.title,
        description: formatted.message,
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" suppressHydrationWarning>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="purple" size="sm" dot>
            {isConfigured ? "Firebase Authentication Active" : "Configuring Environment Keys"}
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Continue your journey towards your dream career.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 shadow-lg">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {/* Unverified Email Warning Checkpoint */}
      {unverifiedEmail && (
        <div className="mb-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3 shadow-xl">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Email Verification Required</h4>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Your account (<strong>{unverifiedEmail}</strong>) is created, but you must click the
                verification link in your email before accessing the student dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              isLoading={resendingVerification}
              onClick={handleResendFromLogin}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto text-xs"
            >
              Resend Verification Email
            </Button>

            <Button
              href={`/verify-email?redirect=${encodeURIComponent(redirectTarget)}`}
              variant="primary"
              size="sm"
              className="w-full sm:w-auto text-xs"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Go to Verification Page
            </Button>
          </div>
        </div>
      )}

      {/* Social Logins */}
      <div className="space-y-3 mb-6" suppressHydrationWarning>
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          disabled={oauthLoading !== null}
          suppressHydrationWarning
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-200 transition-all duration-200 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
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
          <span>{oauthLoading === "google" ? "Connecting to Google..." : "Continue with Google"}</span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthSignIn("github")}
          disabled={oauthLoading !== null}
          suppressHydrationWarning
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-200 transition-all duration-200 disabled:opacity-50"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>{oauthLoading === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#070913] px-3 text-xs uppercase tracking-wider text-slate-500 font-semibold absolute">
          OR
        </span>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
        <Input
          label="Email Address"
          placeholder="student@university.edu"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          placeholder="••••••••••••"
          isPassword
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              suppressHydrationWarning
              className="rounded bg-background-surface border-slate-700 text-accent-purple focus:ring-accent-purple"
              {...register("rememberMe")}
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setShowForgotModal(true);
              setResetSuccess(false);
            }}
            className="text-xs text-accent-cyan hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4 shadow-glow-purple"
          isLoading={submitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        New to AI Career Guidance?{" "}
        <Link
          href="/signup"
          className="text-accent-purple-light font-semibold hover:underline"
        >
          Create your account
        </Link>
      </p>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="max-w-md w-full rounded-2xl bg-[#0f142e] border border-white/10 p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-accent-purple-light">
                <KeyRound className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Reset Your Password</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your registered academic email and Firebase Authentication will send a password reset link.
              </p>
            </div>

            {resetSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Reset instructions have been dispatched to <strong>{resetEmail}</strong>.
                  Please check your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                <Input
                  label="Registered Email"
                  placeholder="student@university.edu"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={resetLoading}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* GitHub Provider Configuration Guide Modal (Section 6) */}
      {showGithubGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-2xl bg-[#0f142e] border-2 border-purple-500/40 p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">GitHub Provider Setup Required</h3>
              </div>
              <button
                onClick={() => setShowGithubGuideModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              GitHub Sign-In is not yet enabled in your Firebase project. To activate GitHub OAuth
              for your students, follow these 8 steps in your Firebase Console:
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-300">
              <li>
                Open the{" "}
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Firebase Console <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Go to <strong>Authentication</strong> in the left sidebar menu.</li>
              <li>Open the <strong>Sign-in method</strong> tab.</li>
              <li>Click <strong>Add new provider</strong> and choose <strong>GitHub</strong>.</li>
              <li>Toggle the switch to <strong>Enable</strong>.</li>
              <li>
                Copy the <strong>Authorization callback URL</strong> shown by Firebase and paste it
                into your GitHub Developer OAuth App settings (GitHub Settings &gt; Developer settings &gt; OAuth Apps).
              </li>
              <li>
                Copy your GitHub <strong>Client ID</strong> and <strong>Client Secret</strong> from GitHub into the Firebase provider dialog.
              </li>
              <li>Click <strong>Save</strong>. GitHub authentication will immediately begin working!</li>
            </ol>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowGithubGuideModal(false)}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
