import { ENGINEERING_BRANCHES } from "./branches";
import { BTECH_COURSES } from "./courses";
import { CAREER_FAMILIES } from "./career-families";
import { ROADMAPS_COLLECTION } from "./roadmaps-data";
import {
  EngineeringBranch,
  EngineeringBranchId,
  BTechCourse,
  CareerFamily,
  CareerFamilyId,
  CareerRole,
  RoadmapData,
} from "./types";

export * from "./types";
export { ENGINEERING_BRANCHES } from "./branches";
export { BTECH_COURSES } from "./courses";
export { CAREER_FAMILIES } from "./career-families";
export { ROADMAPS_COLLECTION } from "./roadmaps-data";

/**
 * Retrieve an engineering branch by ID
 */
export function getBranchById(id: string): EngineeringBranch | undefined {
  return ENGINEERING_BRANCHES.find((b) => b.id === id);
}

/**
 * Retrieve all courses under a specific branch
 */
export function getCoursesByBranch(branchId: string): BTechCourse[] {
  return BTECH_COURSES.filter((c) => c.branchId === branchId);
}

/**
 * Retrieve a specific course by ID or code
 */
export function getCourseById(idOrCode: string): BTechCourse | undefined {
  const normalized = idOrCode.toLowerCase().trim();
  return BTECH_COURSES.find(
    (c) =>
      c.id.toLowerCase() === normalized ||
      c.code.toLowerCase() === normalized ||
      c.name.toLowerCase() === normalized
  );
}

/**
 * Retrieve a career role by ID
 */
export function getCareerRoleById(roleId: string): CareerRole | undefined {
  for (const family of CAREER_FAMILIES) {
    const role = family.roles.find((r) => r.id === roleId);
    if (role) return role;
  }
  return undefined;
}

/**
 * Flatten all career roles across all 7 families
 */
export function getAllCareerRoles(): CareerRole[] {
  return CAREER_FAMILIES.flatMap((family) => family.roles);
}

/**
 * Retrieve roadmap data by ID or create a truthful "Roadmap Under Development" placeholder
 */
export function getRoadmapById(roadmapId?: string | null): RoadmapData | null {
  if (!roadmapId) return null;

  if (ROADMAPS_COLLECTION[roadmapId]) {
    return ROADMAPS_COLLECTION[roadmapId];
  }

  // Check if it's a known course or career without an individual roadmap
  const course = BTECH_COURSES.find((c) => c.roadmapId === roadmapId || c.id === roadmapId);
  if (course) {
    return createUnderDevelopmentRoadmap(
      roadmapId,
      course.name,
      course.degreeName,
      "course",
      course.branchId
    );
  }

  const role = getCareerRoleById(roadmapId);
  if (role) {
    return createUnderDevelopmentRoadmap(
      roadmapId,
      role.title,
      role.tagline,
      "career",
      undefined,
      role.familyId
    );
  }

  return null;
}

/**
 * Creates an honest "Roadmap Under Development" state as required by specification:
 * "If a roadmap is not yet available, show an honest 'Roadmap under development' state
 * instead of displaying generic or fabricated content."
 */
function createUnderDevelopmentRoadmap(
  id: string,
  title: string,
  subtitle: string,
  type: "course" | "career" | "government" | "higher-ed",
  branchId?: EngineeringBranchId,
  careerFamilyId?: CareerFamilyId
): RoadmapData {
  return {
    id,
    title: `${title} Roadmap`,
    targetRoleOrCourse: title,
    type,
    branchId,
    careerFamilyId,
    tagline: subtitle,
    overview: `Dedicated multi-phase curriculum for ${title} is currently being authored by engineering faculty and industry practitioners.`,
    estimatedTotalDuration: "Under Authoring",
    difficulty: "Intermediate",
    isComplete: false,
    lastUpdated: "2026",
    phases: [],
  };
}

/**
 * Maps career recommendation title / sector to a relevant roadmap ID.
 * Keeps backward compatibility for recommendations.ts
 */
export function findMatchingRoadmapId(title: string, sector?: string): string {
  const norm = title.toLowerCase();

  if (norm.includes("frontend") || norm.includes("react") || norm.includes("ui")) {
    return "roadmap-frontend";
  }
  if (norm.includes("backend") || norm.includes("node") || norm.includes("api")) {
    return "roadmap-backend";
  }
  if (norm.includes("full stack") || norm.includes("web development")) {
    return "roadmap-frontend";
  }
  if (norm.includes("ai") || norm.includes("artificial intelligence") || norm.includes("llm")) {
    return "roadmap-ai-engineer";
  }
  if (norm.includes("machine learning") || norm.includes("data scientist") || norm.includes("data science")) {
    return "roadmap-ai-engineer";
  }
  if (norm.includes("mechanical") || norm.includes("cad") || norm.includes("design engineer")) {
    return "roadmap-design-engineer";
  }
  if (norm.includes("upsc") || norm.includes("civil services") || norm.includes("ias") || norm.includes("ips")) {
    return "roadmap-upsc-cse";
  }

  // Fallback to primary track
  return "roadmap-frontend";
}

/**
 * Generates personalized roadmap recommendations using student profile & preferences
 */
export interface PersonalizedRecommendation {
  roleOrCourseId: string;
  title: string;
  category: "Degree Direct Match" | "Cross-Branch Emerging Path" | "National Leadership";
  reason: string;
  missingPrerequisites?: string[];
  roadmapId: string;
  badgeColor: string;
}

export function getPersonalizedRoadmaps(studentProfile?: {
  branch?: string;
  degree?: string;
  skills?: string[];
  careerGoals?: string[];
}): PersonalizedRecommendation[] {
  const recommendations: PersonalizedRecommendation[] = [];
  const studentBranch = studentProfile?.branch?.toLowerCase() || "";
  const studentDegree = studentProfile?.degree?.toLowerCase() || "";

  // 1. Direct Degree Alignment
  if (
    studentBranch.includes("computer") ||
    studentBranch.includes("cse") ||
    studentBranch.includes("it") ||
    studentBranch.includes("information")
  ) {
    recommendations.push({
      roleOrCourseId: "role-ai-engineer",
      title: "AI Engineer (LLMs & Multi-Agent Systems)",
      category: "Degree Direct Match",
      reason: "Directly amplifies your Computer Science foundations with foundation models, RAG, and multi-agent systems.",
      roadmapId: "roadmap-ai-engineer",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/40",
    });
    recommendations.push({
      roleOrCourseId: "role-frontend-dev",
      title: "Frontend Engineering & Next.js",
      category: "Degree Direct Match",
      reason: "Industry standard web development track referenced to roadmap.sh/frontend.",
      roadmapId: "roadmap-frontend",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/40",
    });
    recommendations.push({
      roleOrCourseId: "role-backend-dev",
      title: "Backend & Distributed Systems",
      category: "Degree Direct Match",
      reason: "PostgreSQL, indexing, Redis caching, and microservices architecture.",
      roadmapId: "roadmap-backend",
      badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-500/40",
    });
  } else if (
    studentBranch.includes("mech") ||
    studentBranch.includes("automobile") ||
    studentDegree.includes("mech")
  ) {
    recommendations.push({
      roleOrCourseId: "role-mechanical-design-eng",
      title: "Mechanical Design & Simulation Engineer",
      category: "Degree Direct Match",
      reason: "Perfect alignment with your Mechanical degree: 3D CAD modeling, GD&T (ASME Y14.5), and ANSYS FEA simulation.",
      roadmapId: "roadmap-design-engineer",
      badgeColor: "text-rose-400 bg-rose-950/60 border-rose-500/40",
    });
    // Cross-Branch software exploration as requested in Part 8
    recommendations.push({
      roleOrCourseId: "role-ai-engineer",
      title: "Cross-Branch: AI & Data Engineering for Mechanical Systems",
      category: "Cross-Branch Emerging Path",
      reason: "Cross-branch transition: leverage your mathematical background to develop AI for predictive maintenance and digital twins.",
      missingPrerequisites: ["Python 3.12 Programming", "SQL Database Basics"],
      roadmapId: "roadmap-ai-engineer",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/40",
    });
  } else if (
    studentBranch.includes("civil") ||
    studentBranch.includes("structural") ||
    studentDegree.includes("civil")
  ) {
    recommendations.push({
      roleOrCourseId: "role-structural-engineer",
      title: "Structural Engineering & High-Rise Design",
      category: "Degree Direct Match",
      reason: "Core civil path: STAAD.Pro, ETABS high-rise seismic modeling, and RCC concrete structural analysis.",
      roadmapId: "roadmap-structural-engineer",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/40",
    });
    recommendations.push({
      roleOrCourseId: "role-frontend-dev",
      title: "Cross-Branch: Full-Stack Web Development",
      category: "Cross-Branch Emerging Path",
      reason: "Cross-branch transition into modern software engineering, web application delivery, and SaaS platforms.",
      missingPrerequisites: ["HTML/CSS/JavaScript", "Data Structures"],
      roadmapId: "roadmap-frontend",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/40",
    });
  } else {
    // Default recommendations for all students
    recommendations.push({
      roleOrCourseId: "role-ai-engineer",
      title: "AI Engineer (LLMs & Generative AI)",
      category: "Cross-Branch Emerging Path",
      reason: "Highest growth technological discipline open to all engineering majors with Python prerequisites.",
      missingPrerequisites: ["Python Fundamentals"],
      roadmapId: "roadmap-ai-engineer",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/40",
    });
    recommendations.push({
      roleOrCourseId: "role-frontend-dev",
      title: "Modern Frontend Engineering",
      category: "Cross-Branch Emerging Path",
      reason: "Industry standard career roadmap referenced to roadmap.sh/frontend.",
      roadmapId: "roadmap-frontend",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/40",
    });
  }

  // Always offer National Leadership / Public Sector path
  recommendations.push({
    roleOrCourseId: "role-upsc-civil-services",
    title: "UPSC Civil Services (IAS / IPS / IFS)",
    category: "National Leadership",
    reason: "Open to all B.Tech branches: prestigious administrative leadership governing public policy and national development.",
    roadmapId: "roadmap-upsc-cse",
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-500/40",
  });

  return recommendations;
}
