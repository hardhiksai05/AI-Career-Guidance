import { getGeminiClient, StudentCareerContext } from "./gemini";
import { CAREER_CATALOG } from "./career-catalog";

export interface CareerRecommendation {
  id: string;
  title: string;
  sector: "Technology" | "Business" | "Engineering" | "Finance" | "Healthcare" | "Creative" | "Other Sectors";
  category: "Strong Match" | "Good Match" | "Explore";
  compatibilityScore: number; // 0 to 100
  scoreBasis: string;
  description: string;
  whyItMatches: string;
  requiredSkills: string[];
  missingSkills: string[];
  certifications: string[];
  exampleProjects: string[];
  entryLevelRoles: string[];
  growthOpportunities: string;
  roadmapId: string;
  saved?: boolean;
}

/**
 * Finds the closest matching career in CAREER_CATALOG to link to interactive roadmaps.
 */
export function findMatchingRoadmapId(title: string, sector?: string): string {
  const normalizedTitle = title.toLowerCase();

  // Direct ID check
  const exactId = CAREER_CATALOG.find((c) => c.id === normalizedTitle);
  if (exactId) return exactId.id;

  // Title keyword matching
  const exactTitle = CAREER_CATALOG.find(
    (c) =>
      c.title.toLowerCase().includes(normalizedTitle) ||
      normalizedTitle.includes(c.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
  );
  if (exactTitle) return exactTitle.id;

  // Keyword associations
  if (normalizedTitle.includes("ai") || normalizedTitle.includes("artificial intelligence") || normalizedTitle.includes("llm")) {
    return "tech-ai";
  }
  if (normalizedTitle.includes("machine learning") || normalizedTitle.includes("deep learning")) {
    return "tech-ml";
  }
  if (normalizedTitle.includes("data sci")) {
    return "tech-data-science";
  }
  if (normalizedTitle.includes("data analy")) {
    return "tech-data-analytics";
  }
  if (normalizedTitle.includes("cloud") || normalizedTitle.includes("devops") || normalizedTitle.includes("sre") || normalizedTitle.includes("infrastructure")) {
    return "tech-cloud";
  }
  if (normalizedTitle.includes("cyber") || normalizedTitle.includes("security") || normalizedTitle.includes("infosec")) {
    return "tech-cybersecurity";
  }
  if (normalizedTitle.includes("full") || normalizedTitle.includes("web") || normalizedTitle.includes("software")) {
    return "tech-fullstack";
  }
  if (normalizedTitle.includes("product") || normalizedTitle.includes("management")) {
    return "biz-product-manager";
  }
  if (normalizedTitle.includes("finance") || normalizedTitle.includes("quant")) {
    return "fin-quant-analyst";
  }
  if (normalizedTitle.includes("robot") || normalizedTitle.includes("embed")) {
    return "eng-robotics";
  }
  if (normalizedTitle.includes("bio") || normalizedTitle.includes("health")) {
    return "health-bioinformatics";
  }
  if (normalizedTitle.includes("ux") || normalizedTitle.includes("ui") || normalizedTitle.includes("design")) {
    return "creative-ux-designer";
  }

  // Fallback to sector first item or default
  const sectorItem = CAREER_CATALOG.find((c) => c.sector === sector);
  return sectorItem ? sectorItem.id : "tech-ai";
}

/**
 * Generates intelligent, personalized career recommendations using Google Gemini AI.
 * Analyzes degree, skills, domain preferences, career goals, and experience level.
 * Produces >= 5 recommendations categorized into Strong Match, Good Match, and Explore across IT and Non-IT.
 */
export async function generateRecommendationsWithGemini(
  context: StudentCareerContext
): Promise<CareerRecommendation[]> {
  const ai = getGeminiClient();

  const studentSummary = `
STUDENT PROFILE:
- Name: ${context.fullName || "Student"}
- University: ${context.university || "University"}
- Degree & Major: ${[context.degree, context.branch].filter(Boolean).join(" in ") || "Undergraduate Studies"}
- Graduation Year: ${context.graduationYear || "Upcoming"}
- GPA: ${context.gpa || "N/A"}
- Preferred Domains: ${(context.preferredDomains || []).join(", ") || "Open to suggestions"}
- Career Goals: ${context.careerGoals || "Secure a high-impact role and master high-demand skills"}
- Existing / Target Skills: ${(context.targetSkills || []).join(", ") || "Foundational computing and problem solving"}
- Experience Level: ${context.experienceLevel || "Undergraduate Student"}
- Learning Preference: ${context.preferredLearningStyle || "Project-based"}
- Preferred Locations: ${(context.preferredLocations || []).join(", ") || "Global / Remote"}
- Bio: ${context.bio || "Student preparing for industry entry"}
`;

  const prompt = `
You are the Chief AI Career Strategist for university students. Analyze the following authenticated student profile and generate at least 5 highly personalized career recommendations.

${studentSummary}

REQUIREMENTS:
1. Provide at least 5 distinct career paths.
2. Include careers across Technology (IT) as well as adjacent/interdisciplinary sectors (Engineering, Business, Finance, Healthcare, Creative).
3. Assign a realistic Compatibility Score (an estimated score between 60% and 98%) with a clear explanation of its basis. Note that these are heuristic alignment estimates, not scientifically guaranteed employment probabilities.
4. Categorize recommendations into:
   - "Strong Match": Highest alignment with their current skills, degree, and stated goals.
   - "Good Match": Strong potential alignment where the student has transferable skills.
   - "Explore": Cross-disciplinary or emerging fields that expand their horizons.
5. For each career, conduct a rigorous skill-gap analysis:
   - "requiredSkills": core technical and non-technical skills required for the role.
   - "missingSkills": specific skills this student still needs to acquire based on their profile.
   - "whyItMatches": deeply personalized 2-3 sentence justification citing their actual degree (${context.degree || context.branch || "studies"}) and specific background.
   - "certifications": 2-3 real industry-standard certifications.
   - "exampleProjects": 2-3 concrete portfolio project ideas with recommended tech stacks.
   - "entryLevelRoles": 2-3 specific entry-level job titles suitable for university graduates.
   - "growthOpportunities": mid/senior-level progression trajectories.

OUTPUT FORMAT:
Respond with a strict JSON array of objects. Do not wrap in markdown quotes if possible, or respond with valid JSON:
[
  {
    "id": "slug-or-career-id",
    "title": "Career Title",
    "sector": "Technology" | "Business" | "Engineering" | "Finance" | "Healthcare" | "Creative" | "Other Sectors",
    "category": "Strong Match" | "Good Match" | "Explore",
    "compatibilityScore": 92,
    "scoreBasis": "High overlap between your degree in ... and your target skills in ...",
    "description": "2-sentence career summary",
    "whyItMatches": "Direct justification citing the student's degree and skills",
    "requiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    "missingSkills": ["Skill A", "Skill B"],
    "certifications": ["Cert 1", "Cert 2"],
    "exampleProjects": ["Project 1 with stack", "Project 2 with stack"],
    "entryLevelRoles": ["Associate Role 1", "Junior Role 2"],
    "growthOpportunities": "Senior Role -> Lead Architect / Director path"
  }
]
`;

  const primaryModel = "gemini-3.5-flash";
  const fallbackModel = "gemini-3.1-flash-lite";

  try {
    const response = await ai.models.generateContent({
      model: primaryModel,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    const rawJson = response.text?.trim() || "";
    const parsed = parseRecommendationJson(rawJson);
    if (parsed && parsed.length >= 5) {
      return parsed.map((item) => ({
        ...item,
        roadmapId: findMatchingRoadmapId(item.title, item.sector),
      }));
    }
    throw new Error("Gemini returned insufficient recommendations count");
  } catch (err: any) {
    console.warn(`[Recommendations Engine] Primary model (${primaryModel}) issue:`, err?.message || err);

    try {
      const fallbackResponse = await ai.models.generateContent({
        model: fallbackModel,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      });

      const fallbackJson = fallbackResponse.text?.trim() || "";
      const parsedFallback = parseRecommendationJson(fallbackJson);
      if (parsedFallback && parsedFallback.length >= 5) {
        return parsedFallback.map((item) => ({
          ...item,
          roadmapId: findMatchingRoadmapId(item.title, item.sector),
        }));
      }
    } catch (fallbackErr: any) {
      console.error(`[Recommendations Engine] Fallback model failed:`, fallbackErr?.message || fallbackErr);
    }

    // Deterministic fallback based on profile if upstream API is offline
    return generateDeterministicFallback(context);
  }
}

function parseRecommendationJson(raw: string): CareerRecommendation[] | null {
  try {
    let clean = raw.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```\s*/, "").replace(/```$/, "").trim();
    }
    const data = JSON.parse(clean);
    if (Array.isArray(data)) return data;
    if (data.recommendations && Array.isArray(data.recommendations)) return data.recommendations;
    return null;
  } catch (e) {
    console.warn("[Recommendations] Failed to parse JSON:", e);
    return null;
  }
}

/**
 * Generates reliable, structured recommendations based on student profile if Gemini API is unreachable.
 */
function generateDeterministicFallback(context: StudentCareerContext): CareerRecommendation[] {
  const domains = (context.preferredDomains || []).map((d) => d.toLowerCase());
  const degree = (context.degree || "").toLowerCase();
  const branch = (context.branch || "").toLowerCase();

  const isAIorData = domains.some((d) => d.includes("ai") || d.includes("data") || d.includes("machine learning")) ||
    branch.includes("artificial intelligence") || branch.includes("data science");

  const isCloudOrSecurity = domains.some((d) => d.includes("cloud") || d.includes("security") || d.includes("cyber")) ||
    branch.includes("cyber") || branch.includes("cloud");

  if (isCloudOrSecurity) {
    return [
      {
        id: "cloud-security-architect",
        title: "Cloud Security Solutions Architect",
        sector: "Technology",
        category: "Strong Match",
        compatibilityScore: 94,
        scoreBasis: `Exceptional alignment with your ${context.branch || "technical"} degree and focus on cloud infrastructure security.`,
        description: "Designs and hardens enterprise cloud environments, implementing zero-trust security and infrastructure-as-code automation.",
        whyItMatches: `Directly aligns with your background in ${context.branch || "Cloud Systems"} and interest in securing containerized workloads.`,
        requiredSkills: ["AWS / Azure Governance", "Kubernetes Security", "Terraform", "Zero Trust IAM", "Linux Hardening"],
        missingSkills: ["Enterprise Threat Modeling", "Multi-Account AWS Landing Zones"],
        certifications: ["AWS Certified Security - Specialty", "Certified Kubernetes Security Specialist (CKS)"],
        exampleProjects: ["Automated DevSecOps Pipeline with SAST/DAST", "Multi-Region Zero-Trust AWS VPC Architecture"],
        entryLevelRoles: ["Associate Cloud Security Analyst", "Junior DevSecOps Engineer"],
        growthOpportunities: "Cloud Security Specialist -> Principal Security Architect -> VP of Infrastructure",
        roadmapId: "tech-cloud",
      },
      {
        id: "devsecops-engineer",
        title: "DevSecOps & Platform Engineer",
        sector: "Technology",
        category: "Strong Match",
        compatibilityScore: 90,
        scoreBasis: "Strong synergy between continuous delivery automation and container infrastructure.",
        description: "Bridges the gap between software release velocity and automated vulnerability governance.",
        whyItMatches: `Leverages your interest in Docker, Kubernetes, and automated deployment pipelines.`,
        requiredSkills: ["Docker & Containers", "CI/CD Pipelines (GitHub Actions)", "IaC (Terraform)", "Prometheus & Grafana"],
        missingSkills: ["ArgoCD GitOps Workflows", "Service Mesh (Istio)"],
        certifications: ["Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"],
        exampleProjects: ["GitOps Kubernetes Microservices Cluster", "Automated Image Vulnerability Scanning Bot"],
        entryLevelRoles: ["Junior DevOps Engineer", "Associate Cloud Systems Administrator"],
        growthOpportunities: "DevSecOps Lead -> Platform Engineering Director",
        roadmapId: "tech-cloud",
      },
      {
        id: "cybersecurity-incident-analyst",
        title: "Information Security Analyst",
        sector: "Technology",
        category: "Good Match",
        compatibilityScore: 84,
        scoreBasis: "Solid foundation in networking protocols and operating systems hygiene.",
        description: "Monitors security telemetry, hunts for indicators of compromise, and mitigates enterprise cyber threats.",
        whyItMatches: `Matches your coursework in cybersecurity fundamentals and threat mitigation.`,
        requiredSkills: ["SIEM & Log Analysis (Splunk)", "Network Packet Inspection", "Incident Response", "Python Scripting"],
        missingSkills: ["Digital Forensics", "Active Directory Security Auditing"],
        certifications: ["CompTIA Security+", "GIAC Certified Incident Handler (GCIH)"],
        exampleProjects: ["Home Lab Splunk SIEM Deployment with Active Directory", "Automated Threat Intelligence Feeder"],
        entryLevelRoles: ["SOC Analyst Tier 1", "Cybersecurity Operations Associate"],
        growthOpportunities: "Senior SOC Analyst -> Threat Hunter -> CISO",
        roadmapId: "tech-cybersecurity",
      },
      {
        id: "technical-systems-consultant",
        title: "Cloud & Security Technical Consultant",
        sector: "Business",
        category: "Good Match",
        compatibilityScore: 78,
        scoreBasis: "Combines technical depth with client-facing solution delivery.",
        description: "Advises enterprise clients on modernizing infrastructure securely while aligning with compliance mandates.",
        whyItMatches: `Allows you to leverage your technical expertise while developing commercial strategy.`,
        requiredSkills: ["Cloud Financial Management (FinOps)", "SOC2 / ISO 27001 Frameworks", "Technical Architecture Presentation"],
        missingSkills: ["Enterprise RFP Proposal Writing", "Client Stakeholder Negotiation"],
        certifications: ["AWS Certified Solutions Architect - Associate"],
        exampleProjects: ["Cloud Migration Feasibility Assessment", "Compliance Posture Audit Report"],
        entryLevelRoles: ["Associate Technical Consultant", "Client Solutions Analyst"],
        growthOpportunities: "Engagement Manager -> Practice Director",
        roadmapId: "biz-product-manager",
      },
      {
        id: "embedded-systems-security",
        title: "IoT & Hardware Security Engineer",
        sector: "Engineering",
        category: "Explore",
        compatibilityScore: 71,
        scoreBasis: "Cross-disciplinary path connecting firmware logic to cyber resilience.",
        description: "Hardens embedded microcontrollers, connected devices, and industrial control systems against physical and wireless exploits.",
        whyItMatches: `Explores the physical edge of cybersecurity in automotive, robotics, and smart infrastructure.`,
        requiredSkills: ["Embedded C/C++", "RTOS Architecture", "Hardware Debugging (JTAG, UART)", "Firmware Reverse Engineering"],
        missingSkills: ["Hardware Protocol Analysis", "Oscilloscope Signal Debugging"],
        certifications: ["Certified Embedded Systems Security Professional"],
        exampleProjects: ["Secure Boot Firmware Implementation on ESP32", "CAN Bus Automotive Attack Simulator"],
        entryLevelRoles: ["Junior Firmware Security Engineer", "Embedded Hardware Tester"],
        growthOpportunities: "Principal Embedded Security Architect",
        roadmapId: "eng-robotics",
      },
    ];
  }

  // Default AI / Data Science / General Tech recommendations
  return [
    {
      id: "ai-engineer",
      title: "AI & Machine Learning Engineer",
      sector: "Technology",
      category: "Strong Match",
      compatibilityScore: 95,
      scoreBasis: `Excellent synergy with your ${context.degree || "computing"} background and focus on applied intelligence.`,
      description: "Builds, deploys, and fine-tunes neural network models, LLM agents, and real-time inference pipelines.",
      whyItMatches: `Capitalizes directly on your studies in ${context.branch || "Artificial Intelligence"} and interest in machine learning.`,
      requiredSkills: ["Python", "PyTorch / TensorFlow", "Vector Databases (Pinecone/Milvus)", "RAG Architectures", "Docker"],
      missingSkills: ["Distributed Model Training (DeepSpeed)", "vLLM Inference Optimization"],
      certifications: ["NVIDIA Certified Associate: Generative AI", "AWS Machine Learning Specialty"],
      exampleProjects: ["Enterprise Multi-Modal RAG Search System", "Autonomous Task-Planning Multi-Agent System"],
      entryLevelRoles: ["Junior AI Engineer", "Associate Machine Learning Developer"],
      growthOpportunities: "Staff AI Engineer -> Head of AI Research",
      roadmapId: "tech-ai",
    },
    {
      id: "data-scientist",
      title: "Quantitative Data Scientist",
      sector: "Technology",
      category: "Strong Match",
      compatibilityScore: 89,
      scoreBasis: "Strong match between statistical modeling, programming proficiency, and business analytics.",
      description: "Applies advanced statistics, machine learning, and exploratory data analysis to solve complex operational challenges.",
      whyItMatches: `Integrates your quantitative problem-solving skills with data-driven modeling.`,
      requiredSkills: ["Python & SQL", "Pandas, NumPy, Scikit-Learn", "Hypothesis Testing", "Data Storytelling"],
      missingSkills: ["Causal Inference Modeling", "Production MLOps Deployment"],
      certifications: ["IBM Data Science Professional", "Google Advanced Data Analytics Certificate"],
      exampleProjects: ["Customer Churn Predictive Pipeline", "E-Commerce Dynamic Pricing Engine"],
      entryLevelRoles: ["Associate Data Scientist", "Data Science Fellow"],
      growthOpportunities: "Lead Data Scientist -> Chief Data Officer",
      roadmapId: "tech-data-science",
    },
    {
      id: "mlops-platform-engineer",
      title: "MLOps & AI Infrastructure Engineer",
      sector: "Technology",
      category: "Good Match",
      compatibilityScore: 82,
      scoreBasis: "High industry demand for engineers who can automate machine learning lifecycles.",
      description: "Builds continuous model training, evaluation, tracking, and scalable inference infrastructure.",
      whyItMatches: `Connects your data science acumen with modern software engineering and containerization.`,
      requiredSkills: ["MLflow / Weights & Biases", "Kubernetes (Kubeflow)", "Feature Stores", "CI/CD for ML"],
      missingSkills: ["CUDA Kernel Acceleration", "Triton Inference Server"],
      certifications: ["Databricks Certified Machine Learning Professional"],
      exampleProjects: ["Automated Model Retraining Pipeline with Drift Detection", "Low-Latency FastAPI Model Serving Server"],
      entryLevelRoles: ["Junior MLOps Engineer", "Platform Systems Associate"],
      growthOpportunities: "Staff MLOps Architect -> Director of AI Infrastructure",
      roadmapId: "tech-ml",
    },
    {
      id: "ai-product-manager",
      title: "AI Product & Strategy Manager",
      sector: "Business",
      category: "Good Match",
      compatibilityScore: 76,
      scoreBasis: "Combines technical AI comprehension with user empathy and product lifecycle strategy.",
      description: "Directs AI-enabled product roadmaps, aligning engineering capabilities with commercial market needs.",
      whyItMatches: `Translates your technical understanding into strategic leadership and high-level product design.`,
      requiredSkills: ["Product Discovery & User Research", "AI Ethics & Safety", "Agile / Scrum Methodologies", "Metrics & KPI Analytics"],
      missingSkills: ["Go-to-Market (GTM) Strategy", "Financial Unit Economics Modeling"],
      certifications: ["Product School: Certified Product Manager (CPM)"],
      exampleProjects: ["AI Copilot Feature Specification & User Journey Map", "Market Opportunity Analysis Document"],
      entryLevelRoles: ["Associate Product Manager (APM)", "Product Operations Analyst"],
      growthOpportunities: "Group Product Manager -> VP of Product",
      roadmapId: "biz-product-manager",
    },
    {
      id: "bioinformatics-computational-biologist",
      title: "Bioinformatics & Health AI Specialist",
      sector: "Healthcare",
      category: "Explore",
      compatibilityScore: 68,
      scoreBasis: "High-impact interdisciplinary domain applying machine learning to genomics and drug discovery.",
      description: "Applies computational algorithms to sequence analysis, protein folding prediction, and biomedical data sets.",
      whyItMatches: `Offers a fascinating cross-disciplinary exploration applying AI algorithms to life sciences.`,
      requiredSkills: ["Python & R", "Genomic Sequence Alignment", "BioPython", "Statistical Genetics"],
      missingSkills: ["Molecular Biology Fundamentals", "Next-Gen Sequencing (NGS) Tools"],
      certifications: ["Coursera: Genomic Data Science Specialization"],
      exampleProjects: ["CRISPR Off-Target Predictive Classifier", "Cancer Gene Expression Analysis with PCA"],
      entryLevelRoles: ["Junior Computational Biologist", "Bioinformatics Data Associate"],
      growthOpportunities: "Principal Computational Scientist -> Biotech Research Director",
      roadmapId: "health-bioinformatics",
    },
  ];
}

