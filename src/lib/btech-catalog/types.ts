/**
 * Centralized Types for B.Tech Course Catalogue & Career Roadmap System
 * Covers 9 Engineering Branches, 100+ Specializations, 7 Career Families,
 * and comprehensive 7-phase learning roadmaps.
 */

export type EngineeringBranchId =
  | "cse-it"
  | "ece"
  | "eee"
  | "mech"
  | "civil"
  | "chem"
  | "biotech"
  | "aero"
  | "other-eng";

export type CareerFamilyId =
  | "software-it"
  | "ai-data"
  | "core-engineering"
  | "business-management"
  | "finance-analytics"
  | "government-public"
  | "research-higher-ed";

export type RoadmapDifficulty = "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced";

export interface EngineeringBranch {
  id: EngineeringBranchId;
  name: string;
  code: string;
  shortDescription: string;
  longDescription: string;
  iconName: string; // Lucide icon key
  colorGradient: {
    from: string;
    to: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
  specializationCount: number;
  availableCareerFamilies: CareerFamilyId[];
}

export interface BTechCourse {
  id: string;
  branchId: EngineeringBranchId;
  name: string;
  code: string;
  degreeName: string; // e.g., "B.Tech in Computer Science and Engineering"
  overview: string;
  coreSubjects: string[];
  prerequisites: string[];
  expectedSkills: string[];
  recommendedDuration: string; // e.g., "4 Years (8 Semesters)"
  relatedCareerIds: string[];
  hasDedicatedRoadmap: boolean;
  roadmapId?: string;
}

export interface CareerRole {
  id: string;
  familyId: CareerFamilyId;
  title: string;
  tagline: string;
  overview: string;
  averageSalary: string;
  growthOutlook: string;
  difficulty: RoadmapDifficulty;
  eligibleBranches: (EngineeringBranchId | "all")[];
  prerequisites: string[];
  roadmapShUrl?: string; // Reference to roadmap.sh if applicable
  sourceAttribution?: string;
  hasDedicatedRoadmap: boolean;
  roadmapId?: string;
  // Specific metadata for Government & Public Sector
  governmentExamInfo?: {
    examName: string;
    conductingBody: string;
    eligibility: string;
    selectionStages: string[];
    officialWebsite?: string;
  };
  // Specific metadata for Research & Higher Education
  higherEducationInfo?: {
    targetDegree: string;
    entranceExams: string[];
    topInstitutions: string[];
    keyResearchDomains: string[];
  };
}

export interface CareerFamily {
  id: CareerFamilyId;
  name: string;
  description: string;
  iconName: string;
  roleCount: number;
  roles: CareerRole[];
}

export interface LearningResource {
  title: string;
  url?: string;
  type: "course" | "documentation" | "book" | "video" | "interactive";
  provider: string; // e.g. "roadmap.sh", "NPTEL", "MIT OpenCourseWare", "Official Docs", "Coursera"
  isFree?: boolean;
}

export interface ProjectSuggestion {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Industry Capstone";
  description: string;
  skillsExercised: string[];
  deliverables: string[];
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  skillsGained: string[];
  toolsAndTechnologies: string[];
  estimatedDuration: string; // e.g. "2-3 Weeks"
  completionCriteria: string;
  learningResources: LearningResource[];
  practicalAssignments: string[];
  projectSuggestions?: ProjectSuggestion[];
}

export interface RoadmapPhase {
  phaseNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  phaseName: string;
  tagline: string;
  description: string;
  difficulty: RoadmapDifficulty;
  topics: RoadmapTopic[];
}

export interface RoadmapData {
  id: string;
  title: string;
  targetRoleOrCourse: string;
  type: "course" | "career" | "government" | "higher-ed";
  branchId?: EngineeringBranchId;
  careerFamilyId?: CareerFamilyId;
  tagline: string;
  overview: string;
  estimatedTotalDuration: string;
  difficulty: RoadmapDifficulty;
  roadmapShReference?: {
    url: string;
    title: string;
    note: string;
  };
  externalResourceNotice?: string;
  phases: RoadmapPhase[];
  isComplete: boolean; // false = under development state
  lastUpdated: string;
}

export interface StudentProgressState {
  completedTopicIds: string[];
  activeTopicId?: string;
  lastAccessedAt: string;
  progressPercentage: number;
}
