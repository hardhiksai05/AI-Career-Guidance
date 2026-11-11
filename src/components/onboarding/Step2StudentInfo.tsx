"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StudentAcademicInfo } from "@/types";
import { formatFileSize } from "@/lib/utils";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  UploadCloud,
  FileText,
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  university: z.string().min(2, "College/University is required"),
  degree: z.string().min(2, "Degree is required (e.g. B.S., B.Tech, M.S.)"),
  branch: z.string().min(2, "Branch/Specialization is required (e.g. Computer Science)"),
  currentYear: z.string().min(1, "Please select current year of study"),
  graduationYear: z.string().min(4, "Graduation year is required (e.g. 2027)"),
});

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
  const [method, setMethod] = useState<"manual" | "resume">(initialData.submissionMethod || "manual");
  const [uploadedResume, setUploadedResume] = useState<StudentAcademicInfo["resumeFile"]>(
    initialData.resumeFile || null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    fullName: string;
    university: string;
    degree: string;
    branch: string;
    currentYear: string;
    graduationYear: string;
  }>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fullName: initialData.fullName || "",
      university: initialData.university || "",
      degree: initialData.degree || "",
      branch: initialData.branch || "",
      currentYear: initialData.currentYear || "3rd Year",
      graduationYear: initialData.graduationYear || "2027",
    },
  });

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      setUploadNotice("Please upload a valid PDF or DOCX file.");
      return;
    }

    setUploadedResume({
      name: file.name,
      size: file.size,
      type: file.type || "application/pdf",
      uploadedAt: new Date().toLocaleTimeString(),
    });
    setUploadNotice("CV file attached successfully (Frontend staging ready for Part 3).");

    // Optional smart autofill simulation if fields are blank
    setValue("fullName", "Alex Vance");
    setValue("university", "California Institute of Technology");
    setValue("degree", "Bachelor of Science");
    setValue("branch", "Computer Science & AI");
  };

  const handleRemoveFile = () => {
    setUploadedResume(null);
    setUploadNotice(null);
  };

  const onSubmitForm = (data: {
    fullName: string;
    university: string;
    degree: string;
    branch: string;
    currentYear: string;
    graduationYear: string;
  }) => {
    onNext({
      ...data,
      submissionMethod: method,
      resumeFile: uploadedResume,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Student Academic Information</h3>
        <p className="text-sm text-slate-400 mt-1">
          Provide your current academic context so our AI can align recommendations with your stage.
        </p>
      </div>

      {/* Method Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-black/40 border border-white/10">
        <button
          type="button"
          onClick={() => setMethod("manual")}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            method === "manual"
              ? "bg-accent-purple text-white shadow-glow-purple"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Option A: Enter Manually
        </button>
        <button
          type="button"
          onClick={() => setMethod("resume")}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            method === "resume"
              ? "bg-accent-cyan text-white shadow-glow-cyan"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Option B: Upload CV / Resume
        </button>
      </div>

      {/* OPTION B: CV Upload Box */}
      {method === "resume" && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              isDragging
                ? "border-accent-cyan bg-cyan-950/20"
                : "border-slate-700 bg-background-surface/40 hover:border-slate-600"
            }`}
          >
            <input
              type="file"
              id="cv-upload-input"
              className="hidden"
              accept=".pdf,.docx,.doc"
              onChange={handleFileInput}
            />

            {!uploadedResume ? (
              <label
                htmlFor="cv-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-accent-cyan shadow-glow-cyan">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Drop your resume here, or <span className="text-accent-cyan underline">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF or DOCX (Max 15MB)</p>
                </div>
                <div className="text-[11px] text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                  Note: Stored securely in Part 3 (Supabase Storage) & parsed via Gemini in Part 4.
                </div>
              </label>
            ) : (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-accent-cyan">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white truncate max-w-[220px] sm:max-w-xs">
                      {uploadedResume.name}
                    </p>
                    <p className="text-xs text-cyan-300">
                      {formatFileSize(uploadedResume.size)} • Ready for processing
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  aria-label="Remove uploaded CV"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {uploadNotice && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
          )}
        </div>
      )}

      {/* Manual Fields (Visible in both or manual to confirm verified profile data) */}
      <div className="space-y-4 pt-2">
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
          label="Branch / Specialization"
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
              className="w-full rounded-xl bg-[#0d1224]/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
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
            label="Graduation Year"
            placeholder="e.g. 2027"
            type="number"
            leftIcon={<Calendar className="w-4 h-4" />}
            error={errors.graduationYear?.message}
            {...register("graduationYear")}
          />
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
          Previous
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

