"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PremiumLoadingScreen } from "@/components/ui/PremiumLoadingScreen";
import { AIOrbLoader } from "@/components/ui/AIOrbLoader";
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
  Sparkles,
  Eye,
  Edit2,
  AlertCircle,
  Award,
  Code,
  Briefcase,
  Check,
} from "lucide-react";

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  university: z.string().min(2, "College/University is required"),
  degree: z.string().min(2, "Degree is required (e.g. B.S., B.Tech, M.S.)"),
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
  const [method, setMethod] = useState<"manual" | "resume">(
    initialData.submissionMethod || "manual"
  );
  const [uploadedResume, setUploadedResume] = useState<StudentAcademicInfo["resumeFile"]>(
    initialData.resumeFile || null
  );
  const [tempFileRef, setTempFileRef] = useState<any>(initialData.tempFileRef || null);
  const [extractedCvData, setExtractedCvData] = useState<any>(
    initialData.extractedCvData || null
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [hasExtracted, setHasExtracted] = useState<boolean>(
    Boolean(initialData.extractedCvData)
  );
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [autoFilledFields, setAutoFilledFields] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndExtractFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAndExtractFile(e.target.files[0]);
    }
  };

  const processAndExtractFile = async (file: File) => {
    setExtractionError(null);

    // 1. Validate file extension & MIME
    const validExtensions = ["pdf", "docx", "doc"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!validExtensions.includes(ext)) {
      setExtractionError("Please upload a valid PDF or DOCX file.");
      return;
    }

    // 2. Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setExtractionError("File size exceeds 10MB limit. Please upload a smaller document.");
      return;
    }

    setUploadedResume({
      name: file.name,
      size: file.size,
      type: file.type || "application/pdf",
      uploadedAt: new Date().toLocaleTimeString(),
    });

    // 3. Initiate AI Extraction via server endpoint
    setIsExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/onboarding/extract-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze document");
      }

      const extracted = data.extractedData;
      setExtractedCvData(extracted);
      setTempFileRef(data.tempFileRef || null);
      setHasExtracted(true);

      // 4. Populate form fields strictly from extracted data (do not overwrite if already non-empty and unverified)
      const filledMap: Record<string, boolean> = {};

      if (extracted?.fullName) {
        setValue("fullName", extracted.fullName);
        filledMap.fullName = true;
      }
      if (extracted?.university) {
        setValue("university", extracted.university);
        filledMap.university = true;
      }
      if (extracted?.degree) {
        setValue("degree", extracted.degree);
        filledMap.degree = true;
      }
      if (extracted?.branch) {
        setValue("branch", extracted.branch);
        filledMap.branch = true;
      }
      if (extracted?.graduationYear) {
        setValue("graduationYear", String(extracted.graduationYear));
        filledMap.graduationYear = true;
      }
      if (extracted?.gpa) {
        setValue("cgpa", String(extracted.gpa));
        filledMap.cgpa = true;
      }
      if (extracted?.phone) {
        setValue("phone", String(extracted.phone));
        filledMap.phone = true;
      }

      setAutoFilledFields(filledMap);
    } catch (err: any) {
      console.error("[Step2] CV Extraction error:", err);
      setExtractionError(
        err?.message ||
          "Could not analyze the document automatically. You can proceed by entering details manually below."
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedResume(null);
    setTempFileRef(null);
    setExtractedCvData(null);
    setHasExtracted(false);
    setShowReviewDetails(false);
    setAutoFilledFields({});
    setExtractionError(null);
  };

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
      submissionMethod: method,
      resumeFile: uploadedResume,
      tempFileRef,
      extractedCvData,
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
          onClick={() => {
            setMethod("manual");
            setExtractionError(null);
          }}
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
          onClick={() => {
            setMethod("resume");
            setExtractionError(null);
          }}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            method === "resume"
              ? "bg-accent-cyan text-white shadow-glow-cyan"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Option B: Upload CV / Resume
        </button>
      </div>

      {/* OPTION B: CV Upload & Extraction Box */}
      {method === "resume" && (
        <div className="space-y-4">
          {/* AI Loading State during document analysis */}
          {isExtracting ? (
            <div className="p-6 rounded-2xl bg-midnight-card/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
              <PremiumLoadingScreen
                preset="cv"
                heading="Understanding Your Academic Profile"
                statusMessages={[
                  "Processing your CV...",
                  "Extracting academic information...",
                  "Identifying technical skills...",
                  "Organizing your professional experience...",
                  "Preparing your registration profile...",
                ]}
                description="Extracting structured academic credentials, projects, and technical skills with Gemini AI."
              />
            </div>
          ) : !hasExtracted ? (
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

              <label
                htmlFor="cv-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-accent-cyan shadow-glow-cyan">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Drop your CV/Resume here, or{" "}
                    <span className="text-accent-cyan underline">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PDF or DOCX (Max 10MB) • Automatic AI field extraction
                  </p>
                </div>
              </label>
            </div>
          ) : (
            /* CV Analysed Success Card */
            <div className="rounded-2xl bg-gradient-to-br from-purple-950/50 via-[#0b0f24] to-cyan-950/40 border border-purple-500/30 p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-accent-purple-light shrink-0">
                    <Sparkles className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Your CV Has Been Analysed!</span>
                      <Badge variant="cyan" size="sm">
                        AI Extracted
                      </Badge>
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      We extracted your academic and professional information. Please review the details before continuing.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowReviewDetails(!showReviewDetails)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-accent-cyan transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showReviewDetails ? "Hide Summary" : "Review Information"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                    title="Remove and upload different CV"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Uploaded File Info pill */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-3 py-2 rounded-xl bg-black/30 border border-white/5">
                <span className="flex items-center gap-2 text-white font-medium truncate">
                  <FileText className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span className="truncate">{uploadedResume?.name}</span>
                </span>
                <span className="text-[11px] text-slate-500 shrink-0">
                  {uploadedResume?.size ? formatFileSize(uploadedResume.size) : ""}
                </span>
              </div>

              {/* Extended Review Details Accordion */}
              {showReviewDetails && extractedCvData && (
                <div className="space-y-3 pt-2 text-xs border-t border-white/5">
                  {extractedCvData.technicalSkills?.length > 0 && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1.5">
                        Identified Technical Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedCvData.technicalSkills.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-200 text-[11px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {extractedCvData.projects?.length > 0 && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">
                        Projects Detected:
                      </span>
                      <div className="space-y-1">
                        {extractedCvData.projects.slice(0, 3).map((p: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px]"
                          >
                            <span className="font-medium text-white truncate">{p.title}</span>
                            <span className="text-slate-500 truncate max-w-[150px]">
                              {p.techStack?.join(", ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {extractedCvData.bio && (
                    <p className="text-slate-400 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                      &quot;{extractedCvData.bio}&quot;
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {extractionError && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{extractionError}</span>
            </div>
          )}
        </div>
      )}

      {/* Manual & Verified Registration Input Fields */}
      <div className="space-y-4 pt-2">
        <div className="relative">
          <Input
            label="Full Name"
            placeholder="e.g. Alex Vance"
            leftIcon={<GraduationCap className="w-4 h-4" />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          {autoFilledFields.fullName && (
            <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> CV Extracted
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="College / University"
              placeholder="e.g. Stanford University"
              leftIcon={<Building2 className="w-4 h-4" />}
              error={errors.university?.message}
              {...register("university")}
            />
            {autoFilledFields.university && (
              <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> CV Extracted
              </span>
            )}
          </div>

          <div className="relative">
            <Input
              label="Degree Program"
              placeholder="e.g. Bachelor of Technology (B.Tech)"
              leftIcon={<BookOpen className="w-4 h-4" />}
              error={errors.degree?.message}
              {...register("degree")}
            />
            {autoFilledFields.degree && (
              <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> CV Extracted
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <Input
            label="Branch / Specialization"
            placeholder="e.g. Computer Science & Artificial Intelligence"
            leftIcon={<BookOpen className="w-4 h-4" />}
            error={errors.branch?.message}
            {...register("branch")}
          />
          {autoFilledFields.branch && (
            <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> CV Extracted
            </span>
          )}
        </div>

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

          <div className="relative">
            <Input
              label="Graduation Year"
              placeholder="e.g. 2027"
              type="text"
              leftIcon={<Calendar className="w-4 h-4" />}
              error={errors.graduationYear?.message}
              {...register("graduationYear")}
            />
            {autoFilledFields.graduationYear && (
              <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> CV Extracted
              </span>
            )}
          </div>
        </div>

        {/* Optional CGPA & Phone if extracted or available */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="relative">
            <Input
              label="CGPA / GPA (Optional)"
              placeholder="e.g. 8.8 / 10 or 3.7 / 4.0"
              leftIcon={<Award className="w-4 h-4" />}
              {...register("cgpa")}
            />
            {autoFilledFields.cgpa && (
              <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> CV Extracted
              </span>
            )}
          </div>

          <div className="relative">
            <Input
              label="Phone Number (Optional)"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
            />
            {autoFilledFields.phone && (
              <span className="absolute top-0 right-0 text-[10px] text-accent-cyan font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> CV Extracted
              </span>
            )}
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
