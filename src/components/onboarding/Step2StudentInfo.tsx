"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StudentAcademicInfo } from "@/types";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Award,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  university: z.string().min(2, "College/University is required"),
  degree: z.string().min(2, "Degree is required (e.g. B.Tech, B.S., M.S.)"),
  branch: z.string().min(2, "Branch/Specialization is required (e.g. Computer Science)"),
  currentYear: z.string().min(1, "Please select current year of study"),
  graduationYear: z.string().min(4, "Graduation year is required (e.g. 2027)"),
  cgpa: z.string().optional(),
  phone: z.string().optional(),
});

type Step2FormData = z.infer<typeof step2Schema>;

interface Step2Props {
  initialData: StudentAcademicInfo;
  onNext: (data: StudentAcademicInfo) => void;
  onBack: () => void;
}

export const Step2StudentInfo: React.FC<Step2Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fullName: initialData.fullName || "",
      university: initialData.university || "",
      degree: initialData.degree || "",
      branch: initialData.branch || "",
      currentYear: initialData.currentYear || "3rd Year (Junior)",
      graduationYear: initialData.graduationYear || "2027",
      cgpa: initialData.cgpa || "",
      phone: initialData.phone || "",
    },
  });

  const onSubmitForm = (data: Step2FormData) => {
    onNext({
      fullName: data.fullName,
      university: data.university,
      degree: data.degree,
      branch: data.branch,
      currentYear: data.currentYear,
      graduationYear: data.graduationYear,
      cgpa: data.cgpa || null,
      phone: data.phone || null,
      submissionMethod: "manual",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Student Academic Information</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Enter your academic details to calibrate your personalized curriculum roadmaps and career guidance.
          You can upload your detailed CV anytime from your dashboard after registration.
        </p>
      </div>

      {/* Manual Academic Information Form */}
      <div className="space-y-4 pt-1">
        <Input
          label="Full Name"
          placeholder="e.g. Alex Vance"
          leftIcon={<GraduationCap className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="College / University"
            placeholder="e.g. Stanford University"
            leftIcon={<Building2 className="w-4 h-4" />}
            error={errors.university?.message}
            {...register("university")}
          />

          <Input
            label="Degree Program"
            placeholder="e.g. Bachelor of Technology (B.Tech)"
            leftIcon={<BookOpen className="w-4 h-4" />}
            error={errors.degree?.message}
            {...register("degree")}
          />
        </div>

        <Input
          label="Engineering Branch / Specialization"
          placeholder="e.g. Computer Science & Artificial Intelligence"
          leftIcon={<BookOpen className="w-4 h-4" />}
          error={errors.branch?.message}
          {...register("branch")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Current Year of Study
            </label>
            <select
              {...register("currentYear")}
              className="w-full rounded-xl bg-[#0d1224]/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all"
            >
              <option value="1st Year (Freshman)">1st Year (Freshman)</option>
              <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
              <option value="3rd Year (Junior)">3rd Year (Junior)</option>
              <option value="4th Year (Senior)">4th Year (Senior)</option>
              <option value="Graduate / Master's">Graduate / Master&apos;s</option>
              <option value="Recent Graduate">Recent Graduate</option>
            </select>
          </div>

          <Input
            label="Expected Graduation Year"
            placeholder="e.g. 2027"
            type="text"
            leftIcon={<Calendar className="w-4 h-4" />}
            error={errors.graduationYear?.message}
            {...register("graduationYear")}
          />
        </div>

        {/* Optional Academic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Input
            label="CGPA / GPA (Optional)"
            placeholder="e.g. 8.8 / 10 or 3.7 / 4.0"
            leftIcon={<Award className="w-4 h-4" />}
            {...register("cgpa")}
          />

          <Input
            label="Phone Number (Optional)"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone className="w-4 h-4" />}
            {...register("phone")}
          />
        </div>
      </div>

      {/* Helpful Info Callout */}
      <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-2.5 text-xs text-purple-200">
        <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />
        <span>
          Fast manual registration. You can upload and analyze your complete CV / resume inside the dashboard profile anytime.
        </span>
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
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Career Preferences
        </Button>
      </div>
    </form>
  );
};
