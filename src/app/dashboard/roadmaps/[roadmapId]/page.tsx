"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  getRoadmapProgress,
  saveRoadmapProgress,
  RoadmapProgressData,
} from "@/lib/services/roadmap-service";
import {
  getRoadmapById,
  BTECH_COURSES,
  getAllCareerRoles,
  RoadmapData,
} from "@/lib/btech-catalog";
import { IndividualRoadmapViewer } from "@/components/roadmaps/IndividualRoadmapViewer";
import { AnimatedRoadmapBackground } from "@/components/roadmaps/AnimatedRoadmapBackground";
import { ArrowLeft, ArrowRight, Compass, GraduationCap, ShieldAlert } from "lucide-react";

function RoadmapViewContent() {
  const params = useParams();
  const router = useRouter();
  const roadmapId = typeof params?.roadmapId === "string" ? params.roadmapId : "";

  const { user } = useAuth();
  const isConfigured = isSupabaseConfigured();

  // Retrieve Roadmap Data
  const roadmapData = useMemo(() => {
    return getRoadmapById(roadmapId);
  }, [roadmapId]);

  // Topic Completion Tracking State
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Load Saved Progress from Supabase
  useEffect(() => {
    async function loadProgress() {
      if (!user || !isConfigured || !roadmapId) {
        setIsLoadingProgress(false);
        return;
      }
      try {
        const progress = await getRoadmapProgress(user.uid, roadmapId);
        if (progress) {
          setCompletedTopicIds(progress.completed_missions || []);
        } else {
          setCompletedTopicIds([]);
        }
      } catch (err) {
        console.warn("[RoadmapViewPage] Progress load error:", err);
      } finally {
        setIsLoadingProgress(false);
      }
    }
    loadProgress();
  }, [user, isConfigured, roadmapId]);

  // Handle Toggle Topic Completion
  const handleToggleTopicCompletion = async (topicId: string) => {
    const updated = completedTopicIds.includes(topicId)
      ? completedTopicIds.filter((id) => id !== topicId)
      : [...completedTopicIds, topicId];

    setCompletedTopicIds(updated);

    if (user && isConfigured && roadmapId) {
      const totalTopics = roadmapData
        ? roadmapData.phases.flatMap((p) => p.topics).length
        : 10;
      const progressPct = Math.min(100, Math.round((updated.length / totalTopics) * 100));

      const payload: RoadmapProgressData = {
        firebase_uid: user.uid,
        career_id: roadmapId,
        career_title: roadmapData?.title || "Career Roadmap",
        current_level: 1,
        completed_missions: updated,
        completed_subtopics: [],
        progress_percentage: progressPct,
      };

      try {
        await saveRoadmapProgress(payload);
      } catch (err) {
        console.warn("[RoadmapViewPage] Save progress error:", err);
      }
    }
  };

  // Associated Course (if this roadmap corresponds to a course)
  const matchingCourse = useMemo(() => {
    return BTECH_COURSES.find(
      (c) => c.roadmapId === roadmapId || c.id === roadmapId || `roadmap-${c.id}` === roadmapId
    );
  }, [roadmapId]);

  if (!roadmapData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          <ShieldAlert className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Roadmap Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md">
          The requested learning roadmap &quot;{roadmapId}&quot; is not available in the database.
        </p>
        <Link
          href="/dashboard/roadmaps"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-xs font-bold shadow-glow-purple"
        >
          Back to Roadmap Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-12">
      <AnimatedRoadmapBackground />

      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard/roadmaps" className="hover:text-accent-cyan transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Roadmaps</span>
          </Link>
          <span>/</span>
          {matchingCourse ? (
            <>
              <Link
                href={`/dashboard/roadmaps/courses/${matchingCourse.id}`}
                className="hover:text-accent-cyan transition-colors"
              >
                {matchingCourse.name}
              </Link>
              <span>/</span>
            </>
          ) : (
            <>
              <Link href="/dashboard/roadmaps/courses" className="hover:text-accent-cyan transition-colors">
                Catalogue
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-accent-cyan font-semibold truncate max-w-xs">
            {roadmapData.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {matchingCourse && (
            <Link
              href={`/dashboard/roadmaps/courses/${matchingCourse.id}`}
              className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent-purple" />
              <span>Course Syllabus</span>
            </Link>
          )}

          <Link
            href="/dashboard/roadmaps"
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors"
          >
            ← Roadmap Dashboard
          </Link>
        </div>
      </div>

      {/* Active Roadmap Viewer Component */}
      <IndividualRoadmapViewer
        roadmap={roadmapData}
        completedTopicIds={completedTopicIds}
        onToggleTopicCompletion={handleToggleTopicCompletion}
        onClose={() => router.push("/dashboard/roadmaps")}
      />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading Individual Roadmap Workflow...
        </div>
      }
    >
      <RoadmapViewContent />
    </Suspense>
  );
}

