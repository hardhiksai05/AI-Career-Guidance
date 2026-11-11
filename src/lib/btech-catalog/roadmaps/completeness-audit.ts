import { BTECH_COURSES } from "../courses";
import { getAllCareerRoles } from "../index";
import { ALL_ROADMAPS_COLLECTION } from "./index";

export interface CourseRoadmapAuditItem {
  courseId: string;
  courseName: string;
  engineeringBranch: string;
  roadmapId: string;
  status: "Not Started" | "Content Generation in Progress" | "Under Review" | "Published" | "Needs Updating";
  phaseCount: number;
  topicCount: number;
  resourceAvailability: "Complete" | "Partial" | "Missing";
  referenceSources: string;
  lastUpdated: string;
}

export interface RoadmapAuditSummary {
  totalCourses: number;
  totalCareerTracks: number;
  totalRoadmapsCreated: number;
  totalRoadmapsPublished: number;
  totalRoadmapsIncomplete: number;
  coursesByBranch: Record<string, number>;
  publishedByBranch: Record<string, number>;
  auditList: CourseRoadmapAuditItem[];
}

/**
 * Executes a comprehensive audit across all courses and career tracks in the platform.
 * Validates phase counts, topic counts, learning resource availability, and publication readiness.
 */
export function getRoadmapCompletenessAudit(): RoadmapAuditSummary {
  const auditList: CourseRoadmapAuditItem[] = [];
  const coursesByBranch: Record<string, number> = {};
  const publishedByBranch: Record<string, number> = {};

  let totalPublished = 0;
  let totalIncomplete = 0;

  for (const course of BTECH_COURSES) {
    coursesByBranch[course.branchId] = (coursesByBranch[course.branchId] || 0) + 1;

    const roadmapId = course.roadmapId || `roadmap-${course.id}`;
    const roadmap = ALL_ROADMAPS_COLLECTION[roadmapId] || ALL_ROADMAPS_COLLECTION[course.id];

    if (!roadmap || !roadmap.isComplete || roadmap.phases.length === 0) {
      totalIncomplete++;
      auditList.push({
        courseId: course.id,
        courseName: course.name,
        engineeringBranch: course.branchId,
        roadmapId,
        status: "Not Started",
        phaseCount: roadmap?.phases?.length || 0,
        topicCount: 0,
        resourceAvailability: "Missing",
        referenceSources: "None",
        lastUpdated: "Pending",
      });
    } else {
      const topicCount = roadmap.phases.flatMap((p) => p.topics).length;
      const allResources = roadmap.phases
        .flatMap((p) => p.topics)
        .flatMap((t) => t.learningResources || []);
      const resourceAvailability =
        allResources.length >= topicCount ? "Complete" : allResources.length > 0 ? "Partial" : "Missing";

      const refSource = roadmap.roadmapShReference?.title || roadmap.externalResourceNotice || "AICTE / University Curricula";

      totalPublished++;
      publishedByBranch[course.branchId] = (publishedByBranch[course.branchId] || 0) + 1;

      auditList.push({
        courseId: course.id,
        courseName: course.name,
        engineeringBranch: course.branchId,
        roadmapId,
        status: "Published",
        phaseCount: roadmap.phases.length,
        topicCount,
        resourceAvailability,
        referenceSources: refSource,
        lastUpdated: roadmap.lastUpdated || "2026",
      });
    }
  }

  const allCareerRoles = getAllCareerRoles();

  return {
    totalCourses: BTECH_COURSES.length,
    totalCareerTracks: allCareerRoles.length,
    totalRoadmapsCreated: Object.keys(ALL_ROADMAPS_COLLECTION).length,
    totalRoadmapsPublished: totalPublished,
    totalRoadmapsIncomplete: totalIncomplete,
    coursesByBranch,
    publishedByBranch,
    auditList,
  };
}

