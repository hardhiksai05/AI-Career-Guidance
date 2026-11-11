"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OnboardingData } from "@/types";
import { formatFileSize } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { formatAuthError } from "@/lib/auth-errors";
import {
  User,
  GraduationCap,
  Sparkles,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  ShieldCheck,
  Building,
  Target,
  Edit,
  AlertCircle,
} from "lucide-react";

interface Step4Props {
  data: OnboardingData;
  onBack: () => void;
  onJumpToStep: (step: number) => void;
  onComplete: () => void;
}

export const Step4ReviewSummary: React.FC<Step4Props> = ({
  data,
  onBack,
  onJumpToStep,
  onComplete,
}) => {
  const router = useRouter();
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const [isFinishing, setIsFinishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCompleteRegistration = async () => {
    if (!data.basic.email || !data.basic.password) {
      setErrorMessage("Account email and password are required. Please return to Step 1 to complete them.");
      return;
    }

    setIsFinishing(true);
    setErrorMessage(null);

    try {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("onboarding_draft", JSON.stringify(data));
        } catch (e) {
          // ignore localStorage error
        }
      }
      const createdUser = await signUp(
        data.basic.email,
        data.basic.password,
        data.basic.username || data.academic.fullName
      );

      // Associate pending CV and extracted data with the new Firebase user
      if (
        createdUser &&
        (data.academic.tempFileRef || data.academic.extractedCvData)
      ) {
        try {
          const token = await createdUser.getIdToken();
          await fetch("/api/onboarding/claim-cv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tempFileRef: data.academic.tempFileRef,
              extractedData: data.academic.extractedCvData,
            }),
          });
        } catch (claimErr) {
          console.warn("[Step4] Onboarding claim-cv note:", claimErr);
        }
      }

      showToast({
        type: "success",
        title: "Account Created!",
        description: `Verification link dispatched to ${data.basic.email}.`,
      });
      onComplete();
    } catch (err: any) {
      const formatted = formatAuthError(err);
      setErrorMessage(formatted.message);
      showToast({
        type: "error",
        title: formatted.title,
        description: formatted.message,
      });
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Review & Complete Registration</h3>
        <p className="text-sm text-slate-400 mt-1">
          Review your onboarding configuration before activating your AI Career Guidance workspace.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 shadow-glow-purple">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Account Details */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <User className="w-4 h-4 text-accent-purple-light" />
              <span>Account Credentials</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
            >
              <Edit className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Username:</span>
              <p className="font-semibold text-white mt-0.5">{data.basic.username || "—"}</p>
            </div>
            <div>
              <span className="text-slate-400">Email Address:</span>
              <p className="font-semibold text-white mt-0.5">{data.basic.email || "—"}</p>
            </div>
          </div>
        </div>

        {/* Student Academic Details */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <GraduationCap className="w-4 h-4 text-accent-cyan" />
              <span>Academic Profile</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
            >
              <Edit className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Full Name:</span>
              <p className="font-semibold text-white mt-0.5">{data.academic.fullName || "—"}</p>
            </div>
            <div>
              <span className="text-slate-400">University:</span>
              <p className="font-semibold text-white mt-0.5">{data.academic.university || "—"}</p>
            </div>
            <div>
              <span className="text-slate-400">Degree & Branch:</span>
              <p className="font-semibold text-white mt-0.5">
                {data.academic.degree} • {data.academic.branch}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Year / Graduation:</span>
              <p className="font-semibold text-white mt-0.5">
                {data.academic.currentYear} (Class of {data.academic.graduationYear})
              </p>
            </div>
          </div>
        </div>

        {/* CV Upload Status */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>CV / Resume Document</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
            >
              <Edit className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="text-xs">
            {data.academic.resumeFile ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/30 text-cyan-200">
                  <span className="font-medium truncate max-w-[240px]">
                    {data.academic.resumeFile.name}
                  </span>
                  <span className="text-slate-400">
                    {formatFileSize(data.academic.resumeFile.size)}
                  </span>
                </div>
                {data.academic.extractedCvData && (
                  <div className="flex items-center gap-2 text-[11px] text-purple-300">
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>Academic & professional credentials extracted and staged for account linking.</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 italic">
                Manual academic profile chosen (No resume attached). You can upload a CV later in
                Settings.
              </p>
            )}
          </div>
        </div>

        {/* Career Preferences */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Career Trajectory & Interests</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
            >
              <Edit className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400">Domains:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.preferences.domains.map((d) => (
                  <Badge key={d} variant="purple" size="sm">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-400">Target Outcome:</span>
                <p className="text-white font-medium">{data.preferences.targetOutcome}</p>
              </div>
              <div>
                <span className="text-slate-400">Primary Goal:</span>
                <p className="text-white font-medium">{data.preferences.primaryGoal}</p>
              </div>
            </div>
            <div className="pt-1">
              <span className="text-slate-400">Target Skills to Cultivate:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.preferences.targetSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous Step
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          isLoading={isFinishing}
          onClick={handleCompleteRegistration}
          className="shadow-glow-purple"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

