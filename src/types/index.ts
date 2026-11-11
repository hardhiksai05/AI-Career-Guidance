export interface UserBasicInfo {
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface StudentAcademicInfo {
  fullName: string;
  university: string;
  degree: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  cgpa?: string | null;
  phone?: string | null;
  submissionMethod: "manual" | "resume";
  resumeFile?: {
    name: string;
    size: number;
    type: string;
    uploadedAt: string;
  } | null;
  tempFileRef?: {
    storagePath: string;
    originalFilename: string;
    fileSize: number;
    fileType: string;
    tempId: string;
  } | null;
  extractedCvData?: any | null;
}

export interface CareerPreferencesInfo {
  domains: string[];
  primaryGoal: string;
  targetSkills: string[];
  preferredLearningStyle: string;
  targetOutcome: string;
}

export interface OnboardingData {
  basic: UserBasicInfo;
  academic: StudentAcademicInfo;
  preferences: CareerPreferencesInfo;
}

export interface CareerRecommendationPreview {
  id: string;
  title: string;
  matchScore: number;
  domain: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  topSkills: string[];
  roadmapCount: number;
}

export interface OpportunityPreview {
  id: string;
  title: string;
  company: string;
  type: "Full-Time" | "Internship" | "Research" | "Fellowship";
  location: string;
  mode: "Remote" | "Hybrid" | "On-site";
  deadline: string;
  matchScore: number;
  tags: string[];
}

export interface LearningRoadmapPreview {
  id: string;
  title: string;
  description: string;
  domain: string;
  estimatedWeeks: number;
  completedStages: number;
  totalStages: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skillsCovered: string[];
}

