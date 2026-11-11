"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import {
  ENGINEERING_BRANCHES,
  BTECH_COURSES,
  getAllCareerRoles,
  getPersonalizedRoadmaps,
} from "@/lib/btech-catalog";
import { RoadmapHeader } from "@/components/roadmaps/RoadmapHeader";
import { RoadmapSearchEngine } from "@/components/roadmaps/RoadmapSearchEngine";
import { PersonalizedRecommendationsSection } from "@/components/roadmaps/PersonalizedRecommendationsSection";
import { ExploreCoursesBanner } from "@/components/roadmaps/ExploreCoursesBanner";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";

function RoadmapsDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const careerParam = searchParams.get("career");
  const courseParam = searchParams.get("course");
  const branchParam = searchParams.get("branch");

  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  // Redirect legacy query parameters to new dedicated subpages
  useEffect(() => {
    if (careerParam) {
      router.push(`/dashboard/roadmaps/${careerParam}`);
    } else if (courseParam) {
      router.push(`/dashboard/roadmaps/courses/${courseParam}`);
    } else if (branchParam) {
      router.push(`/dashboard/roadmaps/courses?branch=${branchParam}`);
    }
  }, [careerParam, courseParam, branchParam, router]);

  // Student Profile for Personalized Recommendations
  const [studentProfile, setStudentProfile] = useState<{
    branch?: string;
    degree?: string;
    skills?: string[];
    careerGoals?: string[];
  }>({});

  const allRoles = useMemo(() => getAllCareerRoles(), []);

  // Load Student Profile & Career Preferences from Supabase for Recommendations
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
        }
      } catch (err) {
        console.warn("[RoadmapsDashboard] Profile lookup error:", err);
      }
    }
    loadStudentProfile();
  }, [user, isConfigured]);

  // Derive Personalized Recommendations
  const personalizedRecommendations = useMemo(() => {
    return getPersonalizedRoadmaps(studentProfile);
  }, [studentProfile]);

  return (
    <div className="space-y-10 relative">
      <AnimatedRoadmapBackground />

      {/* 1. HERO SECTION (Preserved in place with statistics & Midnight AI styling) */}
      <RoadmapHeader
        totalCoursesCount={BTECH_COURSES.length}
        totalBranchesCount={ENGINEERING_BRANCHES.length}
        totalRolesCount={allRoles.length}
      />

      {/* 2. AI-POWERED ROADMAP SEARCH ENGINE */}
      <RoadmapSearchEngine />

      {/* 3. PERSONALIZED ROADMAP RECOMMENDATIONS */}
      <PersonalizedRecommendationsSection
        recommendations={personalizedRecommendations}
        studentBranch={studentProfile.branch}
        studentDegree={studentProfile.degree}
      />

      {/* 4. EXPLORE ALL COURSES CTA SECTION */}
      <ExploreCoursesBanner />
    </div>
  );
}

export default function RoadmapsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading B.Tech Course & Career Roadmaps...
        </div>
      }
    >
      <RoadmapsDashboardContent />
    </Suspense>
  );
}
