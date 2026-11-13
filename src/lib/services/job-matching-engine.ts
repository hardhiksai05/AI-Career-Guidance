import { ProcessedJobDetails } from "./gemini-job-processor";
import { RawJobListing } from "./adzuna-service";

export interface CandidateProfileContext {
  fullName?: string | null;
  degree?: string | null;
  branch?: string | null;
  university?: string | null;
  skills: string[];
  projects?: string[];
  preferredLocations?: string[];
  experienceLevel?: string | null;
}

export interface MatchingWeights {
  technicalSkills: number;     // e.g. 0.35 (35%)
  educationEligibility: number; // e.g. 0.20 (20%)
  experienceCompatibility: number; // e.g. 0.20 (20%)
  projectsExperience: number;   // e.g. 0.15 (15%)
  locationPreferences: number;  // e.g. 0.10 (10%)
}

export const DEFAULT_MATCHING_WEIGHTS: MatchingWeights = {
  technicalSkills: 0.35,
  educationEligibility: 0.20,
  experienceCompatibility: 0.20,
  projectsExperience: 0.15,
  locationPreferences: 0.10,
};

export interface JobMatchResult {
  job: RawJobListing & ProcessedJobDetails & { id?: string };
  matchScore: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
  qualificationCompatibility: string;
  experienceCompatibility: string;
  matchExplanation: string;
}

/**
 * Deterministic TypeScript matching engine.
 * Computes multi-dimensional compatibility using normalized vector sets and heuristic weights.
 */
export function calculateJobMatch(
  job: RawJobListing & ProcessedJobDetails & { id?: string },
  candidate: CandidateProfileContext,
  weights: MatchingWeights = DEFAULT_MATCHING_WEIGHTS
): JobMatchResult {
  const candidateSkillsNorm = new Set(
    (candidate.skills || []).map((s) => s.toLowerCase().trim())
  );

  const requiredSkillsNorm = (job.requiredSkills || []).map((s) => s.toLowerCase().trim());

  // 1. Technical Skills Score (35%)
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of job.requiredSkills || []) {
    const sLower = skill.toLowerCase().trim();
    if (
      candidateSkillsNorm.has(sLower) ||
      Array.from(candidateSkillsNorm).some((cs) => cs.includes(sLower) || sLower.includes(cs))
    ) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  let skillRatio = 0.5; // baseline if no specific skills listed
  if (requiredSkillsNorm.length > 0) {
    skillRatio = matchedSkills.length / requiredSkillsNorm.length;
  } else if (candidateSkillsNorm.size > 0) {
    skillRatio = 0.75;
  }
  const technicalSkillScore = Math.min(100, Math.round(skillRatio * 100));

  // 2. Education & Degree Eligibility Score (20%)
  let educationScore = 70;
  const candidateBranch = (candidate.branch || "").toLowerCase();
  const candidateDegree = (candidate.degree || "").toLowerCase();
  const jobCategory = (job.category || "").toLowerCase();
  const jobTitle = (job.title || "").toLowerCase();

  const isTechBranch = candidateBranch.includes("comp") || candidateBranch.includes("cse") || candidateBranch.includes("it") || candidateBranch.includes("ai") || candidateBranch.includes("data");
  const isEceBranch = candidateBranch.includes("elec") || candidateBranch.includes("ece") || candidateBranch.includes("vlsi") || candidateBranch.includes("embed");
  const isMechBranch = candidateBranch.includes("mech") || candidateBranch.includes("auto") || candidateBranch.includes("robot");
  const isCivilBranch = candidateBranch.includes("civil") || candidateBranch.includes("struct");

  if (jobTitle.includes("software") || jobTitle.includes("developer") || jobTitle.includes("web") || jobTitle.includes("data")) {
    educationScore = isTechBranch ? 95 : isEceBranch ? 85 : 70;
  } else if (jobTitle.includes("vlsi") || jobTitle.includes("embedded") || jobTitle.includes("hardware")) {
    educationScore = isEceBranch ? 95 : isTechBranch ? 80 : 65;
  } else if (jobTitle.includes("mechanical") || jobTitle.includes("cad") || jobTitle.includes("design engineer")) {
    educationScore = isMechBranch ? 95 : 60;
  } else if (jobTitle.includes("civil") || jobTitle.includes("structural") || jobTitle.includes("bim")) {
    educationScore = isCivilBranch ? 95 : 60;
  } else {
    educationScore = candidateDegree.includes("b.tech") || candidateDegree.includes("engineering") ? 85 : 75;
  }

  // 3. Experience Compatibility Score (20%)
  let experienceScore = 80;
  const candidateExp = (candidate.experienceLevel || "fresher").toLowerCase();
  const jobExp = (job.experienceLevel || "").toLowerCase();

  if (jobExp.includes("entry") || jobExp.includes("fresher") || job.contractType === "internship") {
    experienceScore = candidateExp.includes("senior") ? 80 : 95;
  } else if (jobExp.includes("senior")) {
    experienceScore = candidateExp.includes("senior") ? 95 : 55;
  } else {
    // mid-level
    experienceScore = 75;
  }

  // 4. Projects and Practical Experience Score (15%)
  let projectsScore = 65;
  const candidateProjects = (candidate.projects || []).map((p) => p.toLowerCase());
  if (candidateProjects.length > 0) {
    const hasRelatedProject = candidateProjects.some((proj) =>
      requiredSkillsNorm.some((skill) => proj.includes(skill)) ||
      jobTitle.split(" ").some((w) => w.length > 3 && proj.includes(w))
    );
    projectsScore = hasRelatedProject ? 90 : 75;
  } else if (matchedSkills.length >= 3) {
    projectsScore = 80;
  }

  // 5. Location and Preferences Score (10%)
  let locationScore = 70;
  const jobLocation = (job.location || "").toLowerCase();
  const prefLocations = (candidate.preferredLocations || []).map((l) => l.toLowerCase());

  if (jobLocation.includes("remote") || prefLocations.some((pl) => pl.includes("remote"))) {
    locationScore = 95;
  } else if (prefLocations.some((pl) => jobLocation.includes(pl) || pl.includes(jobLocation))) {
    locationScore = 95;
  } else if (jobLocation.includes("india") || prefLocations.length === 0) {
    locationScore = 80;
  }

  // Total Weighted Match Score (Heuristic Fit Index)
  const weightedTotal =
    technicalSkillScore * weights.technicalSkills +
    educationScore * weights.educationEligibility +
    experienceScore * weights.experienceCompatibility +
    projectsScore * weights.projectsExperience +
    locationScore * weights.locationPreferences;

  const matchScore = Math.min(99, Math.max(55, Math.round(weightedTotal)));

  // Generate clear contextual explanation
  let matchExplanation = "";
  if (matchedSkills.length > 0) {
    matchExplanation = `High alignment on ${matchedSkills.slice(0, 3).join(", ")}. Strong academic degree synergy with ${candidate.branch || "engineering"} coursework.`;
  } else {
    matchExplanation = `Good foundational engineering eligibility with transferable skills for ${job.title}. Focus on acquiring ${missingSkills.slice(0, 2).join(" and ")}.`;
  }

  const qualificationCompatibility = educationScore >= 85
    ? "Direct Academic Major Alignment"
    : "Transferable Engineering Background";

  const experienceCompatibility = experienceScore >= 85
    ? "Optimal Experience Tier for Candidates"
    : "Early Career Growth Opportunity";

  return {
    job,
    matchScore,
    matchedSkills,
    missingSkills,
    qualificationCompatibility,
    experienceCompatibility,
    matchExplanation,
  };
}

/**
 * Sorts and filters top job recommendations based on candidate profile.
 */
export function rankAndFilterJobs(
  jobs: (RawJobListing & ProcessedJobDetails & { id?: string })[],
  candidate: CandidateProfileContext,
  maxResults = 20
): JobMatchResult[] {
  const scored = jobs.map((j) => calculateJobMatch(j, candidate));

  // Sort descending by match score
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, maxResults);
}
