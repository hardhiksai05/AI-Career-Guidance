"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  getProfile,
  upsertProfile,
  getCareerPreferences,
  StudentProfile,
} from "@/lib/services/profile-service";
import {
  getResumes,
  uploadResume,
  getResumeDownloadUrl,
  deleteResume,
  ResumeDocument,
} from "@/lib/services/resume-service";
import { ExtractedCvData } from "@/lib/services/cv-extractor";
import { formatFileSize } from "@/lib/utils";
import {
  GraduationCap,
  FileText,
  GitCompare,
  UploadCloud,
  CheckCircle2,
  Edit,
  Save,
  X,
  Download,
  Trash2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Check,
  Eye,
  Calendar,
  Briefcase,
  Code,
  RotateCw,
  Cpu,
  FileCode,
  Award,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"academic" | "cv" | "skills">("academic");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Resume states
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [inspectingId, setInspectingId] = useState<string | null>(null);

  // Extracted CV Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStatusText, setExtractionStatusText] = useState("");
  const [reviewModalData, setReviewModalData] = useState<{
    resumeId: string;
    filename: string;
    uploadedAt: string;
    data: ExtractedCvData;
    normalizedMarkdown?: string;
    tokenMetrics?: any;
  } | null>(null);
  const [reviewModalTab, setReviewModalTab] = useState<"fields" | "markdown">("fields");
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [isConfirmingExtraction, setIsConfirmingExtraction] = useState(false);

  // Skills state from career preferences
  const [userSkills, setUserSkills] = useState<string[]>([]);

  // Form State
  const [profile, setProfile] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    university: "",
    degree: "",
    branch: "",
    graduationYear: "2027",
    gpa: "",
    bio: "",
  });

  const isConfigured = isSupabaseConfigured();

  // Load Profile, Preferences and Resumes from Supabase
  const loadData = useCallback(async () => {
    if (!user) return;
    setIsLoadingProfile(true);

    try {
      // 1. Fetch Profile
      const savedProfile = await getProfile(user.uid);
      if (savedProfile) {
        setProfile({
          fullName: savedProfile.full_name || user.displayName || "",
          email: savedProfile.email || user.email || "",
          phone: savedProfile.phone || "",
          university: savedProfile.university || "",
          degree: savedProfile.degree || "",
          branch: savedProfile.branch || "",
          graduationYear: savedProfile.graduation_year || "2027",
          gpa: savedProfile.gpa || "",
          bio: savedProfile.bio || "",
        });
      }

      // 2. Fetch Career Preferences Skills
      const prefs = await getCareerPreferences(user.uid);
      if (prefs?.target_skills) {
        setUserSkills(prefs.target_skills);
      }

      // 3. Fetch Resumes
      const userResumes = await getResumes(user.uid);
      setResumes(userResumes);
    } catch (err) {
      console.warn("[ProfilePage] Data loading note:", err);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Save Profile Handler
  const handleSaveProfile = async () => {
    if (!profile.fullName.trim() || !profile.email.trim()) {
      showToast({
        type: "error",
        title: "Profile Update Failed",
        description: "Full name and email cannot be left blank.",
        duration: 4000,
      });
      return;
    }

    if (!user) return;
    setIsSaving(true);

    try {
      if (isConfigured) {
        await upsertProfile({
          firebase_uid: user.uid,
          email: profile.email.trim(),
          full_name: profile.fullName.trim(),
          university: profile.university.trim() || null,
          degree: profile.degree.trim() || null,
          branch: profile.branch.trim() || null,
          graduation_year: profile.graduationYear.trim() || null,
          gpa: profile.gpa.trim() || null,
          phone: profile.phone.trim() || null,
          bio: profile.bio.trim() || null,
        });
      }

      setIsEditing(false);
      showToast({
        type: "success",
        title: "Profile Updated Successfully",
        description: "Your academic credentials have been synchronized with Supabase.",
        duration: 4000,
      });
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Save Failed",
        description: err?.message || "Could not save profile changes to Supabase.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // CV File Upload Handler with Independent Gemini Processing
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Reset input so re-selecting same file triggers event
    event.target.value = "";

    // Client-side validations
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".txt")) {
      showToast({
        type: "error",
        title: "Unsupported File Format",
        description: "Please select a PDF, DOC, DOCX, or TXT document.",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast({
        type: "error",
        title: "File Exceeds Size Limit",
        description: "Maximum file size is 10 MB.",
      });
      return;
    }

    setIsUploadingCv(true);
    setUploadProgress(25);
    setExtractionStatusText("Uploading new CV version to private storage...");

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => (prev && prev < 75 ? prev + 15 : prev));
    }, 250);

    try {
      // 1. Upload new unique file record to Supabase
      const uploadedRecord = await uploadResume(file, user.uid);
      clearInterval(progressInterval);
      setUploadProgress(85);
      setResumes((prev) => [uploadedRecord, ...prev]);

      // 2. Immediately trigger Gemini extraction for THIS specific newly uploaded CV
      setExtractionStatusText("Extracting profile & skills with Gemini AI...");
      const token = await user.getIdToken();

      const extractRes = await fetch("/api/resumes/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resumeId: uploadedRecord.id }),
      });

      if (!extractRes.ok) {
        const errData = await extractRes.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to extract CV content");
      }

      const extractJson = await extractRes.json();
      setUploadProgress(100);

      // 3. Open Review & Confirmation Modal with newly extracted data
      if (extractJson.extractedData) {
        setReviewModalData({
          resumeId: uploadedRecord.id,
          filename: file.name,
          uploadedAt: new Date().toISOString(),
          data: extractJson.extractedData,
          normalizedMarkdown: extractJson.normalizedMarkdown || "",
          tokenMetrics: extractJson.tokenMetrics || null,
        });
        setReviewModalTab("fields");
        setIsReviewModalOpen(true);
      }

      showToast({
        type: "success",
        title: "CV Uploaded & Preprocessed",
        description: `Successfully normalized ${file.name} to Markdown and extracted profile details.`,
        duration: 4000,
      });
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error("[ProfilePage] Upload & extraction error:", err);
      showToast({
        type: "error",
        title: "Extraction Error",
        description: err?.message || "Document uploaded, but AI extraction encountered an error.",
      });
    } finally {
      setIsUploadingCv(false);
      setUploadProgress(null);
      setExtractionStatusText("");
    }
  };

  // Inspect previous resume extraction
  const handleInspectResume = async (resume: ResumeDocument) => {
    if (!user) return;
    setInspectingId(resume.id);

    try {
      const token = await user.getIdToken();
      // 1. Check if extraction already exists
      const res = await fetch(`/api/resumes/extracted?resumeId=${resume.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.extractedData) {
        setReviewModalData({
          resumeId: resume.id,
          filename: resume.original_filename,
          uploadedAt: resume.created_at,
          data: data.extractedData,
          normalizedMarkdown: data.normalizedMarkdown || "",
          tokenMetrics: data.tokenMetrics || null,
        });
        setReviewModalTab("fields");
        setIsReviewModalOpen(true);
      } else {
        // Run extraction on demand if not yet extracted
        showToast({
          type: "info",
          title: "Analyzing Document",
          description: "Converting to Markdown & running AI extraction...",
        });
        const extractRes = await fetch("/api/resumes/extract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resumeId: resume.id }),
        });
        const extractJson = await extractRes.json();
        if (extractJson.extractedData) {
          setReviewModalData({
            resumeId: resume.id,
            filename: resume.original_filename,
            uploadedAt: resume.created_at,
            data: extractJson.extractedData,
            normalizedMarkdown: extractJson.normalizedMarkdown || "",
            tokenMetrics: extractJson.tokenMetrics || null,
          });
          setReviewModalTab("fields");
          setIsReviewModalOpen(true);
        }
      }
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Inspect Failed",
        description: err?.message || "Could not load extracted CV information.",
      });
    } finally {
      setInspectingId(null);
    }
  };

  // Retry extraction on a failed or un-extracted CV
  const handleRetryExtraction = async (resume: ResumeDocument) => {
    if (!user) return;
    setRetryingId(resume.id);
    showToast({
      type: "info",
      title: "Retrying Extraction",
      description: `Re-running preprocessing & AI extraction for ${resume.original_filename}...`,
    });

    try {
      const token = await user.getIdToken();
      const extractRes = await fetch("/api/resumes/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resumeId: resume.id, forceReprocess: true }),
      });
      const extractJson = await extractRes.json();
      if (!extractRes.ok) {
        throw new Error(extractJson.message || "Failed to retry extraction");
      }

      if (extractJson.extractedData) {
        setReviewModalData({
          resumeId: resume.id,
          filename: resume.original_filename,
          uploadedAt: resume.created_at,
          data: extractJson.extractedData,
          normalizedMarkdown: extractJson.normalizedMarkdown || "",
          tokenMetrics: extractJson.tokenMetrics || null,
        });
        setReviewModalTab("fields");
        setIsReviewModalOpen(true);
        await loadData();
      }

      showToast({
        type: "success",
        title: "Retry Successful",
        description: "CV successfully normalized to Markdown and analyzed by Gemini.",
      });
    } catch (retryErr: any) {
      showToast({
        type: "error",
        title: "Retry Failed",
        description: retryErr?.message || "Extraction retry failed.",
      });
    } finally {
      setRetryingId(null);
    }
  };

  // Confirm Extracted Data & Update Profile
  const handleConfirmExtraction = async () => {
    if (!reviewModalData || !user) return;
    setIsConfirmingExtraction(true);

    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/resumes/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeId: reviewModalData.resumeId,
          confirmedData: reviewModalData.data,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || "Failed to confirm profile updates");
      }

      // Update local profile state immediately
      const ext = reviewModalData.data;
      setProfile((prev) => ({
        ...prev,
        fullName: ext.fullName || prev.fullName,
        email: ext.email || prev.email,
        phone: ext.phone || prev.phone,
        university: ext.university || prev.university,
        degree: ext.degree || prev.degree,
        branch: ext.branch || prev.branch,
        graduationYear: ext.graduationYear || prev.graduationYear,
        gpa: ext.gpa || prev.gpa,
        bio: ext.bio || prev.bio,
      }));

      if (ext.technicalSkills && ext.technicalSkills.length > 0) {
        setUserSkills((prev) => Array.from(new Set([...prev, ...ext.technicalSkills])));
      }

      // Update resume status in list
      setResumes((prev) =>
        prev.map((r) =>
          r.id === reviewModalData.resumeId ? { ...r, upload_status: "verified" } : r
        )
      );

      setIsReviewModalOpen(false);

      showToast({
        type: "success",
        title: "Profile Synchronized with Verified CV",
        description: "Your academic background and skills have been updated in Supabase.",
        duration: 3500,
      });

      // Automatically trigger career recommendation reanalysis for the newly confirmed CV
      showToast({
        type: "info",
        isLoading: true,
        title: "Analysing Your New CV",
        description: "We are reviewing your skills, education and experience to update your career recommendations.",
        duration: 5000,
      });

      try {
        const recsRes = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ forceRegenerate: false }),
        });

        if (recsRes.ok) {
          const recsData = await recsRes.json();
          if (recsData.cached) {
            showToast({
              type: "info",
              title: "Your Analysis Is Already Up to Date",
              description: "This CV has already been analysed. Your existing career recommendations are ready.",
              action: {
                label: "View Recommendations",
                onClick: () => router.push("/dashboard/recommendations"),
              },
              duration: 6000,
            });
          } else {
            showToast({
              type: "success",
              title: "Career Analysis Updated!",
              description: "Your new CV has been analysed successfully. Your personalized career recommendations are ready.",
              action: {
                label: "View Recommendations",
                onClick: () => router.push("/dashboard/recommendations"),
              },
              duration: 8000,
            });
          }
        }
      } catch (recErr) {
        console.warn("[ProfilePage] Automatic recommendation generation notice:", recErr);
        showToast({
          type: "error",
          title: "Analysis Could Not Be Completed",
          description: "We could not update your recommendations. Your previous successful results are still available.",
          action: {
            label: "Retry",
            onClick: () => router.push("/dashboard/recommendations"),
          },
          duration: 6000,
        });
      }
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Confirmation Failed",
        description: err?.message || "Failed to update profile from CV.",
      });
    } finally {
      setIsConfirmingExtraction(false);
    }
  };

  // Download CV Handler
  const handleDownloadCv = async (resume: ResumeDocument) => {
    setDownloadingId(resume.id);
    try {
      const signedUrl = await getResumeDownloadUrl(resume.storage_path);
      const a = document.createElement("a");
      a.href = signedUrl;
      a.download = resume.original_filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast({
        type: "info",
        title: "Download Dispatched",
        description: `Secure download link generated for ${resume.original_filename}.`,
      });
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Download Failed",
        description: err?.message || "Could not generate download link.",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  // Delete CV Handler
  const handleDeleteCv = async (resume: ResumeDocument) => {
    if (!user) return;
    if (!confirm(`Are you sure you want to delete ${resume.original_filename}?`)) {
      return;
    }

    setDeletingId(resume.id);
    try {
      await deleteResume(resume.id, resume.storage_path, user.uid);
      setResumes((prev) => prev.filter((r) => r.id !== resume.id));
      showToast({
        type: "success",
        title: "Resume Deleted",
        description: "The document was removed from Supabase storage.",
      });
    } catch (err: any) {
      showToast({
        type: "error",
        title: "Delete Failed",
        description: err?.message || "Could not delete document.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (name.slice(0, 2) || "ST").toUpperCase();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Student Profile & CV Intelligence
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Manage your verified academic credentials, resume versions, and extracted skills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                leftIcon={<X className="w-3.5 h-3.5" />}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveProfile}
                isLoading={isSaving}
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setActiveTab("academic")}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "academic"
              ? "border-accent-purple text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Academic Information</span>
        </button>

        <button
          onClick={() => setActiveTab("cv")}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "cv"
              ? "border-accent-cyan text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>CV & Documents</span>
          {resumes.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-accent-cyan/20 text-accent-cyan font-mono">
              {resumes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "skills"
              ? "border-emerald-400 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <GitCompare className="w-4 h-4" />
          <span>Verified Skills & Experience</span>
          {userSkills.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {userSkills.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Academic */}
      {activeTab === "academic" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#0b0f22]/90 border border-white/10 p-6 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-cyan" />
              <span>Enrollment & Degree Program</span>
            </h3>

            {isLoadingProfile ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-accent-purple" />
                <span className="text-xs font-mono">Loading profile records...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profile.fullName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
                <Input
                  label="University Email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <Input
                  label="College / University"
                  value={profile.university}
                  disabled={!isEditing}
                  placeholder="e.g. Stanford University"
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                />
                <Input
                  label="Degree Program"
                  value={profile.degree}
                  disabled={!isEditing}
                  placeholder="e.g. Bachelor of Technology (B.Tech)"
                  onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                />
                <Input
                  label="Branch / Specialization"
                  value={profile.branch}
                  disabled={!isEditing}
                  placeholder="e.g. Computer Science & AI"
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  value={profile.phone}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
                <Input
                  label="Expected Graduation Year"
                  value={profile.graduationYear}
                  disabled={!isEditing}
                  placeholder="e.g. 2026"
                  onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                />
                <Input
                  label="Cumulative GPA / Grade"
                  value={profile.gpa}
                  disabled={!isEditing}
                  placeholder="e.g. 3.9 / 4.0"
                  onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                />
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Professional Bio / Summary</label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Brief background summary extracted from CV or entered manually..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-purple disabled:opacity-60"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0b0f22]/90 border border-white/10 p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-cyan mx-auto flex items-center justify-center font-bold text-2xl text-white shadow-glow-purple mb-4">
                {getInitials(profile.fullName)}
              </div>
              <h4 className="text-lg font-bold text-white">{profile.fullName || "Student"}</h4>
              <p className="text-xs text-accent-cyan font-medium">{profile.degree || "Degree Enrolled"}</p>
              <p className="text-xs text-slate-400 mt-1">{profile.university || "University"}</p>

              {resumes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 block">Latest Active CV:</span>
                  <span className="font-semibold text-slate-200 truncate block">
                    {resumes[0].original_filename}
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    Uploaded {new Date(resumes[0].created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CV & Documents */}
      {activeTab === "cv" && (
        <div className="rounded-2xl bg-[#0b0f22]/90 border border-white/10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-purple-light" />
                <span>Uploaded Resumes & Portfolios</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Upload a new CV to automatically extract education, skills, and projects with Gemini AI.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<UploadCloud className="w-4 h-4" />}
              isLoading={isUploadingCv}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload New CV
            </Button>
          </div>

          {/* Upload & Extraction Progress Indicator */}
          {uploadProgress !== null && (
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
              <div className="flex justify-between text-xs text-purple-200">
                <span>{extractionStatusText || "Processing document..."}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Document List */}
          {resumes.length === 0 ? (
            <div className="py-12 border-2 border-dashed border-white/10 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">No resumes uploaded yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Upload your CV (PDF, DOCX, or TXT) to automatically calibrate your career roadmaps.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                Select File
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume, idx) => {
                const isLatest = idx === 0;
                const isVerified = resume.upload_status === "verified";

                return (
                  <div
                    key={resume.id}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-accent-purple-light shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                            {resume.original_filename}
                          </p>
                          {isLatest && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-emerald-300">
                              Active Version
                            </span>
                          )}
                          {isVerified && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300">
                              Verified
                            </span>
                          )}
                          {resume.upload_status === "failed" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300">
                              Failed / Retryable
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatFileSize(resume.file_size)} • Uploaded{" "}
                          {new Date(resume.created_at).toLocaleDateString()} at{" "}
                          {new Date(resume.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                      {resume.upload_status === "failed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRetryExtraction(resume)}
                          isLoading={retryingId === resume.id}
                          className="border-rose-500/40 text-rose-300 hover:bg-rose-950/30"
                          leftIcon={<RotateCw className="w-3.5 h-3.5" />}
                        >
                          Retry Extraction
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleInspectResume(resume)}
                        isLoading={inspectingId === resume.id}
                        leftIcon={<Eye className="w-3.5 h-3.5 text-accent-cyan" />}
                      >
                        Review Extracted Data
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadCv(resume)}
                        isLoading={downloadingId === resume.id}
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCv(resume)}
                        isLoading={deletingId === resume.id}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
                        leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Verified Skills & Experience */}
      {activeTab === "skills" && (
        <div className="rounded-2xl bg-[#0b0f22]/90 border border-white/10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-emerald-400" />
                <span>Extracted & Verified Skills</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Synchronized directly from your latest confirmed CV and career preferences.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<UploadCloud className="w-4 h-4" />}
            >
              Update via CV
            </Button>
          </div>

          {userSkills.length === 0 ? (
            <div className="p-8 text-center border border-white/10 rounded-xl space-y-2">
              <Code className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-white">No skills extracted yet</p>
              <p className="text-xs text-slate-400">
                Upload a CV in the &quot;CV & Documents&quot; tab to automatically calibrate your skill inventory.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 hover:border-accent-purple transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* REVIEW & CONFIRM EXTRACTED DATA MODAL */}
      {isReviewModalOpen && reviewModalData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="rounded-3xl bg-[#0c1026] border border-purple-500/30 p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-cyan" />
                  <h3 className="text-lg font-bold text-white">
                    Review Extracted CV Information
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Extracted from <strong className="text-slate-200">{reviewModalData.filename}</strong> using Gemini AI. Review before updating your profile.
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setReviewModalTab("fields")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  reviewModalTab === "fields"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Extracted Profile Fields</span>
              </button>

              <button
                type="button"
                onClick={() => setReviewModalTab("markdown")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  reviewModalTab === "markdown"
                    ? "bg-accent-cyan/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Normalized Markdown & Token Analytics</span>
              </button>
            </div>

            {/* TAB 1: Structured Form Fields */}
            {reviewModalTab === "fields" && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Extracted Full Name"
                    value={reviewModalData.data.fullName}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, fullName: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Extracted Email"
                    value={reviewModalData.data.email}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, email: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="University / College"
                    value={reviewModalData.data.university}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, university: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Degree Program"
                    value={reviewModalData.data.degree}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, degree: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Branch / Major"
                    value={reviewModalData.data.branch}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, branch: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Expected Graduation"
                    value={reviewModalData.data.graduationYear}
                    onChange={(e) =>
                      setReviewModalData({
                        ...reviewModalData,
                        data: { ...reviewModalData.data, graduationYear: e.target.value },
                      })
                    }
                  />
                </div>

                {/* Technical Skills */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="font-semibold text-slate-300 block">Extracted Technical Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewModalData.data.technicalSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-200 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Non-Technical Skills */}
                {reviewModalData.data.nonTechnicalSkills && reviewModalData.data.nonTechnicalSkills.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="font-semibold text-slate-300 block">Non-Technical Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {reviewModalData.data.nonTechnicalSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-200 text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {reviewModalData.data.projects && reviewModalData.data.projects.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="font-semibold text-slate-300 block">Extracted Projects:</span>
                    <ul className="space-y-1.5 text-slate-300">
                      {reviewModalData.data.projects.map((p, idx) => (
                        <li key={idx} className="border-b border-white/5 pb-1">
                          <strong>{p.title}:</strong> {p.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Work Experience */}
                {reviewModalData.data.workExperience && reviewModalData.data.workExperience.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="font-semibold text-slate-300 block">Work Experience:</span>
                    <ul className="space-y-1.5 text-slate-300">
                      {reviewModalData.data.workExperience.map((w, idx) => (
                        <li key={idx}>
                          <strong>{w.role}</strong> at {w.company} ({w.duration}) — {w.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {reviewModalData.data.certifications && reviewModalData.data.certifications.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="font-semibold text-slate-300 block">Certifications:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {reviewModalData.data.certifications.map((c, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {reviewModalData.data.achievements && reviewModalData.data.achievements.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="font-semibold text-slate-300 block">Achievements & Honors:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {reviewModalData.data.achievements.map((a, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[11px]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Normalized Markdown & Token Analytics */}
            {reviewModalTab === "markdown" && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs">
                {/* Token Optimization Analytics Card */}
                {reviewModalData.tokenMetrics ? (
                  <div className="p-4 rounded-2xl bg-[#121832]/80 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-accent-cyan" />
                        <span className="font-bold text-white">Gemini Token Optimization Metrics</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-[11px] font-bold">
                        {reviewModalData.tokenMetrics.tokenReductionPercentage}% Token Savings
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-slate-400 block">Format:</span>
                        <span className="font-bold text-white uppercase">
                          {reviewModalData.tokenMetrics.format || "PDF"}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-slate-400 block">Raw Document Size:</span>
                        <span className="font-bold text-slate-200">
                          {formatFileSize(reviewModalData.tokenMetrics.rawSizeBytes || 0)}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-slate-400 block">Normalized Size:</span>
                        <span className="font-bold text-accent-cyan">
                          {formatFileSize(reviewModalData.tokenMetrics.markdownSizeBytes || 0)}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-slate-400 block">Est. Gemini Tokens:</span>
                        <span className="font-bold text-emerald-300">
                          ~{reviewModalData.tokenMetrics.estimatedMarkdownTokens} tokens
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-slate-400">
                    Token optimization metrics ready.
                  </div>
                )}

                {/* Markdown Code Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-accent-purple" />
                      <span>Preprocessed Markdown Payload (Input to Gemini)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Standardized structure & clean headings
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-[11px] text-slate-200 overflow-x-auto whitespace-pre-wrap max-h-72 leading-relaxed selection:bg-purple-500/30">
                    {reviewModalData.normalizedMarkdown ||
                      `# ${reviewModalData.data.fullName || "Candidate Resume"}\n\n## Education\n- **University:** ${reviewModalData.data.university}\n- **Degree:** ${reviewModalData.data.degree}\n\n## Technical Skills\n${reviewModalData.data.technicalSkills.map((s) => `- ${s}`).join("\n")}`}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReviewModalOpen(false)}
                disabled={isConfirmingExtraction}
              >
                Keep Current Profile
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmExtraction}
                isLoading={isConfirmingExtraction}
                leftIcon={<Check className="w-4 h-4" />}
                className="shadow-glow-purple"
              >
                Confirm & Sync to Profile
              </Button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
