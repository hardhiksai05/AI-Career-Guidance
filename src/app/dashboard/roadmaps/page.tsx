"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import {
  getRoadmapProgress,
  getAllRoadmapProgress,
  saveRoadmapProgress,
  RoadmapProgressData,
} from "@/lib/services/roadmap-service";
import {
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  CAREER_FAMILIES,
  getAllCareerRoles,
  getBranchById,
  getCoursesByBranch,
  getCourseById,
  getRoadmapById,
  getPersonalizedRoadmaps,
  PersonalizedRecommendation,
  RoadmapData,
} from "@/lib/btech-catalog";
import { RoadmapHeader } from "@/components/roadmaps/RoadmapHeader";
import { RoadmapFilters } from "@/components/roadmaps/RoadmapFilters";
import { BranchCatalogueGrid } from "@/components/roadmaps/BranchCatalogueGrid";
import { CourseDetailsView } from "@/components/roadmaps/CourseDetailsView";
import { IndividualRoadmapViewer } from "@/components/roadmaps/IndividualRoadmapViewer";
import { PersonalizedRecommendationsBanner } from "@/components/roadmaps/PersonalizedRecommendationsBanner";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";
import {
  Compass,
  Briefcase,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Shield,
  Sparkles,
} from "lucide-react";

function RoadmapsContent() {
  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();
  const searchParams = useSearchParams();
  const careerParam = searchParams.get("career");
  const courseParam = searchParams.get("course");
  const branchParam = searchParams.get("branch");

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branchParam || "cse-it");
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  // Selected Course
  const [selectedCourseId, setSelectedCourseId] = useState<string>("course-cse");

  // Active Individual Roadmap View (null = viewing catalog, string = viewing roadmap ID)
  const [activeRoadmapId, setActiveRoadmapId] = useState<string | null>("roadmap-frontend");

  // Student Profile for Personalized Recommendations
  const [studentProfile, setStudentProfile] = useState<{
    branch?: string;
    degree?: string;
    skills?: string[];
    careerGoals?: string[];
  }>({});

  // Topic Completion Tracking State (Pure educational progress tracking)
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [activeRoadmapProgress, setActiveRoadmapProgress] = useState<RoadmapProgressData | null>(null);

  // 1. Load Student Profile & Career Preferences from Supabase
  useEffect(() => {
    async function loadStudentProfile() {
      if (!user || !isConfigured) return;
      try {
        const supabase = getSupabaseClient();
        const [profileRes, prefsRes] = await Promise.all([
          supabase
            .from("profiles")
            .select("branch, degree, graduation_year")
            .eq("firebase_uid", user.uid)
            .maybeSingle(),
          supabase
            .from("career_preferences")
            .select("preferred_domains, target_skills, career_goals")
            .eq("firebase_uid", user.uid)
            .maybeSingle(),
        ]);

        const profileData = profileRes.data;
        const prefsData = prefsRes.data;

        if (profileData || prefsData) {
          setStudentProfile({
            branch: profileData?.branch || "",
            degree: profileData?.degree || "",
            skills: prefsData?.target_skills || [],
            careerGoals: prefsData?.career_goals || [],
          });

          // Match student branch to initial selection if present
          if (profileData?.branch) {
            const bNorm = profileData.branch.toLowerCase();
            const matchingBranch = ENGINEERING_BRANCHES.find(
              (b) =>
                bNorm.includes(b.code.toLowerCase()) ||
                bNorm.includes(b.name.toLowerCase().split(" ")[0])
            );
            if (matchingBranch && !branchParam) {
              setSelectedBranchId(matchingBranch.id);
            }
          }
        }
      } catch (err) {
        console.warn("[RoadmapsPage] Profile lookup error:", err);
      }
    }
    loadStudentProfile();
  }, [user, isConfigured, branchParam]);

  // 2. Handle URL parameters (?career=..., ?course=..., ?branch=...)
  useEffect(() => {
    if (careerParam) {
      // Find matching roadmap or role
      const allRoles = getAllCareerRoles();
      const role = allRoles.find(
        (r) =>
          r.id.toLowerCase() === careerParam.toLowerCase() ||
          r.title.toLowerCase().includes(careerParam.toLowerCase())
      );
      if (role) {
        setActiveRoadmapId(role.roadmapId || role.id);
      } else {
        setActiveRoadmapId(careerParam);
      }
    } else if (courseParam) {
      const course = getCourseById(courseParam);
      if (course) {
        setSelectedCourseId(course.id);
        setSelectedBranchId(course.branchId);
        if (course.roadmapId) {
          setActiveRoadmapId(course.roadmapId);
        }
      }
    }
  }, [careerParam, courseParam]);

  // 3. Load Saved Roadmap Progress for Active Roadmap from Supabase
  useEffect(() => {
    async function loadProgress() {
      if (!user || !isConfigured || !activeRoadmapId) return;
      try {
        const progress = await getRoadmapProgress(user.uid, activeRoadmapId);
        if (progress) {
          setActiveRoadmapProgress(progress);
          setCompletedTopicIds(progress.completed_missions || []);
        } else {
          setCompletedTopicIds([]);
        }
      } catch (err) {
        console.warn("[RoadmapsPage] Progress fetch error:", err);
      }
    }
    loadProgress();
  }, [user, isConfigured, activeRoadmapId]);

  // Toggle Topic Completion & Save Progress
  const handleToggleTopicCompletion = async (topicId: string) => {
    const updated = completedTopicIds.includes(topicId)
      ? completedTopicIds.filter((id) => id !== topicId)
      : [...completedTopicIds, topicId];

    setCompletedTopicIds(updated);

    if (user && isConfigured && activeRoadmapId) {
      const currentRoadmap = getRoadmapById(activeRoadmapId);
      const totalTopics = currentRoadmap
        ? currentRoadmap.phases.flatMap((p) => p.topics).length
        : 10;
      const progressPct = Math.min(100, Math.round((updated.length / totalTopics) * 100));

      const payload: RoadmapProgressData = {
        firebase_uid: user.uid,
        career_id: activeRoadmapId,
        career_title: currentRoadmap?.title || "Career Roadmap",
        current_level: 1,
        completed_missions: updated,
        completed_subtopics: [],
        progress_percentage: progressPct,
      };

      try {
        await saveRoadmapProgress(payload);
      } catch (err) {
        console.warn("[RoadmapsPage] Save progress error:", err);
      }
    }
  };

  // Personalized Recommendations
  const personalizedRecommendations = useMemo(() => {
    return getPersonalizedRoadmaps(studentProfile);
  }, [studentProfile]);

  // Filtered Courses based on Search and Branch
  const filteredCourses = useMemo(() => {
    return BTECH_COURSES.filter((course) => {
      const matchBranch = selectedBranchId === "all" || course.branchId === selectedBranchId;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.degreeName.toLowerCase().includes(q) ||
        course.coreSubjects.some((s) => s.toLowerCase().includes(q)) ||
        course.expectedSkills.some((s) => s.toLowerCase().includes(q));

      return matchBranch && matchSearch;
    });
  }, [selectedBranchId, searchQuery]);

  // Filtered Career Roles based on Search, Family, Difficulty
  const allRoles = useMemo(() => getAllCareerRoles(), []);

  const filteredRoles = useMemo(() => {
    return allRoles.filter((role) => {
      const matchFamily = selectedFamilyId === "all" || role.familyId === selectedFamilyId;
      const matchDifficulty =
        selectedDifficulty === "all" || role.difficulty === selectedDifficulty;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        role.title.toLowerCase().includes(q) ||
        role.tagline.toLowerCase().includes(q) ||
        role.overview.toLowerCase().includes(q) ||
        role.prerequisites.some((p) => p.toLowerCase().includes(q));

      return matchFamily && matchDifficulty && matchSearch;
    });
  }, [allRoles, selectedFamilyId, selectedDifficulty, searchQuery]);

  // Courses for the selected branch (for the course details view)
  const branchCourses = useMemo(() => {
    return getCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  // Current Active Roadmap Object
  const currentRoadmapData = useMemo(() => {
    return getRoadmapById(activeRoadmapId);
  }, [activeRoadmapId]);

  return (
    <div className="space-y-10 relative">
      <AnimatedRoadmapBackground />

      {/* SECTION 1: HEADER */}
      <RoadmapHeader
        totalCoursesCount={BTECH_COURSES.length}
        totalBranchesCount={ENGINEERING_BRANCHES.length}
        totalRolesCount={allRoles.length}
      />

      {/* SECTION 8: PERSONALIZED RECOMMENDATIONS BANNER */}
      <PersonalizedRecommendationsBanner
        recommendations={personalizedRecommendations}
        studentBranch={studentProfile.branch}
        studentDegree={studentProfile.degree}
        onSelectRoadmap={(id) => {
          setActiveRoadmapId(id);
          window.scrollTo({ top: 350, behavior: "smooth" });
        }}
      />

      {/* SECTION 2: SEARCH & FILTERS */}
      <RoadmapFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBranch={selectedBranchId}
        onBranchChange={setSelectedBranchId}
        selectedFamily={selectedFamilyId}
        onFamilyChange={setSelectedFamilyId}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        filteredCoursesCount={filteredCourses.length}
        filteredRolesCount={filteredRoles.length}
      />

      {/* SECTION 5: INDIVIDUAL ROADMAP VIEWER (When active) */}
      {currentRoadmapData && (
        <div id="active-roadmap-viewer" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Active Learning Roadmap
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveRoadmapId(null)}
              className="text-xs font-mono text-accent-cyan hover:underline"
            >
              Back to Catalog Overview
            </button>
          </div>

          <IndividualRoadmapViewer
            roadmap={currentRoadmapData}
            completedTopicIds={completedTopicIds}
            onToggleTopicCompletion={handleToggleTopicCompletion}
            onClose={() => setActiveRoadmapId(null)}
          />
        </div>
      )}

      {/* SECTION 3: ENGINEERING BRANCH CARDS */}
      <BranchCatalogueGrid
        branches={ENGINEERING_BRANCHES}
        selectedBranchId={selectedBranchId}
        onSelectBranch={(branchId) => {
          setSelectedBranchId(branchId);
          const firstCourse = getCoursesByBranch(branchId)[0];
          if (firstCourse) {
            setSelectedCourseId(firstCourse.id);
          }
        }}
      />

      {/* SECTION 4: COURSE DETAILS & SPECIALIZATION BREAKDOWN */}
      <CourseDetailsView
        courses={branchCourses.length > 0 ? branchCourses : filteredCourses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={setSelectedCourseId}
        onLaunchRoadmap={(roadmapId) => {
          setActiveRoadmapId(roadmapId);
          const viewerEl = document.getElementById("active-roadmap-viewer");
          if (viewerEl) {
            viewerEl.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 400, behavior: "smooth" });
          }
        }}
        careerRoles={allRoles}
      />

      {/* SECTION: CAREER FAMILIES EXPLORER (Across B.Tech Branches) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            3. Explore Career Paths Across B.Tech Branches
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A B.Tech graduate is not restricted to careers matching their degree. Explore high-growth opportunities across all 7 career families.
          </p>
        </div>

        {/* Career Family Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-900/50">
          <button
            type="button"
            onClick={() => setSelectedFamilyId("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              selectedFamilyId === "all"
                ? "bg-accent-purple text-white shadow-glow-purple"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            All Career Families ({allRoles.length})
          </button>
          {CAREER_FAMILIES.map((family) => {
            const isSelected = selectedFamilyId === family.id;
            return (
              <button
                key={family.id}
                type="button"
                onClick={() => setSelectedFamilyId(family.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? "bg-accent-purple text-white shadow-glow-purple"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {family.name} ({family.roleCount})
              </button>
            );
          })}
        </div>

        {/* Career Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              onClick={() => {
                setActiveRoadmapId(role.roadmapId || role.id);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              className="p-5 rounded-3xl bg-[#0b0e26]/90 border border-white/10 hover:border-purple-500/40 hover:bg-[#10143a] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-wider">
                    {role.familyId.replace("-", " & ").toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    {role.difficulty}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {role.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {role.tagline}
                </p>

                {role.governmentExamInfo && (
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-300 space-y-1">
                    <div className="font-semibold">{role.governmentExamInfo.examName}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">
                      {role.governmentExamInfo.eligibility}
                    </div>
                  </div>
                )}

                {role.higherEducationInfo && (
                  <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-[11px] text-indigo-300 space-y-1">
                    <div className="font-semibold">{role.higherEducationInfo.targetDegree}</div>
                    <div className="text-[10px] text-slate-400">
                      Exams: {role.higherEducationInfo.entranceExams.join(", ")}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{role.averageSalary.split(" ")[0]}</span>
                <span className="text-accent-cyan font-semibold inline-flex items-center gap-1">
                  Launch Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading B.Tech Course & Career Roadmaps...</div>}>
      <RoadmapsContent />
    </Suspense>
  );
}
