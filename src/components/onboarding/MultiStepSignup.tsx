"use client";

import React, { useState } from "react";
import { OnboardingData, UserBasicInfo, StudentAcademicInfo, CareerPreferencesInfo } from "@/types";
import { Step1BasicAccount } from "./Step1BasicAccount";
import { Step2StudentInfo } from "./Step2StudentInfo";
import { Step3CareerPreferences } from "./Step3CareerPreferences";
import { Step4ReviewSummary } from "./Step4ReviewSummary";
import { Step5EmailVerification } from "./Step5EmailVerification";
import { Check, User, GraduationCap, Target, Eye, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialFormData: OnboardingData = {
  basic: {
    username: "",
    email: "alex.vance@caltech.edu",
    password: "",
    confirmPassword: "",
  },
  academic: {
    fullName: "",
    university: "",
    degree: "",
    branch: "",
    currentYear: "3rd Year (Junior)",
    graduationYear: "2027",
    submissionMethod: "manual",
    resumeFile: null,
  },
  preferences: {
    domains: ["Artificial Intelligence", "Machine Learning"],
    primaryGoal: "Secure a high-impact internship",
    targetSkills: ["Python", "PyTorch", "Next.js", "System Design"],
    preferredLearningStyle: "Visual & Project-Based (Hands-on coding, building projects)",
    targetOutcome: "Internship",
  },
};

const stepsInfo = [
  { step: 1, title: "Account", icon: User },
  { step: 2, title: "Academics", icon: GraduationCap },
  { step: 3, title: "Preferences", icon: Target },
  { step: 4, title: "Review", icon: Eye },
  { step: 5, title: "Verify", icon: Mail },
];

export const MultiStepSignup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialFormData);

  const handleStep1Submit = (basic: UserBasicInfo) => {
    setFormData((prev) => ({ ...prev, basic }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (academic: StudentAcademicInfo) => {
    setFormData((prev) => {
      const updatedPreferences = { ...prev.preferences };
      if (
        academic.extractedCvData?.technicalSkills &&
        academic.extractedCvData.technicalSkills.length > 0
      ) {
        const extracted = academic.extractedCvData.technicalSkills.slice(0, 8);
        const combined = Array.from(
          new Set([...extracted, ...prev.preferences.targetSkills])
        );
        updatedPreferences.targetSkills = combined;
      }
      return { ...prev, academic, preferences: updatedPreferences };
    });
    setCurrentStep(3);
  };

  const handleStep3Submit = (preferences: CareerPreferencesInfo) => {
    setFormData((prev) => ({ ...prev, preferences }));
    setCurrentStep(4);
  };

  const handleCompleteReview = () => {
    setCurrentStep(5);
  };

  const handleUpdateEmail = (newEmail: string) => {
    setFormData((prev) => ({
      ...prev,
      basic: { ...prev.basic, email: newEmail },
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative z-10">
          {stepsInfo.map((s, index) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div key={s.step} className="flex flex-col items-center flex-1 relative">
                {/* Connecting lines between steps */}
                {index > 0 && (
                  <div
                    className={`absolute top-4 -left-1/2 w-full h-[2px] -z-10 transition-colors duration-300 ${
                      currentStep >= s.step ? "bg-accent-purple" : "bg-white/10"
                    }`}
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    // Only allow navigating back to previously visited steps (except step 5)
                    if (s.step < currentStep && currentStep !== 5) {
                      setCurrentStep(s.step);
                    }
                  }}
                  disabled={s.step > currentStep || currentStep === 5}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-accent-purple text-white shadow-glow-purple cursor-pointer"
                      : isCurrent
                      ? "bg-[#0d1226] border-2 border-accent-cyan text-accent-cyan shadow-glow-cyan"
                      : "bg-[#0d1226] border border-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                  aria-label={`Step ${s.step}: ${s.title}`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-white" /> : <Icon className="w-4 h-4" />}
                </button>

                <span
                  className={`text-[11px] font-semibold mt-2 tracking-wide uppercase transition-colors ${
                    isCurrent
                      ? "text-accent-cyan"
                      : isCompleted
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Container Form */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0d1226]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Step1BasicAccount
                initialData={formData.basic}
                onNext={handleStep1Submit}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Step2StudentInfo
                initialData={formData.academic}
                onNext={handleStep2Submit}
                onBack={() => setCurrentStep(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Step3CareerPreferences
                initialData={formData.preferences}
                onNext={handleStep3Submit}
                onBack={() => setCurrentStep(2)}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Step4ReviewSummary
                data={formData}
                onBack={() => setCurrentStep(3)}
                onJumpToStep={(step) => setCurrentStep(step)}
                onComplete={handleCompleteReview}
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Step5EmailVerification
                email={formData.basic.email || "student@university.edu"}
                onUpdateEmail={handleUpdateEmail}
                onboardingData={formData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
