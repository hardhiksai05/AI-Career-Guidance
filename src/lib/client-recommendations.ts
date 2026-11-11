import { CareerRecommendation } from "./recommendations";
import { StudentProfile, CareerPreferences } from "./services/profile-service";

/**
 * Client-safe fallback recommendation generator.
 * Does not import any server-side SDKs (Gemini, Firebase Admin, etc.).
 * Guarantees that recommendations always render instantly on client side
 * even if network, Vercel cold-start, or upstream AI services are slow or offline.
 */
export function getClientFallbackRecommendations(
  profile?: StudentProfile | null,
  preferences?: CareerPreferences | null
): CareerRecommendation[] {
  const domains = (preferences?.preferred_domains || []).map((d) => d.toLowerCase());
  const degree = (profile?.degree || "").toLowerCase();
  const branch = (profile?.branch || "").toLowerCase();

  const isCloudOrSecurity =
    domains.some((d) => d.includes("cloud") || d.includes("security") || d.includes("cyber")) ||
    branch.includes("cyber") ||
    branch.includes("cloud");

  if (isCloudOrSecurity) {
    return [
      {
        id: "cloud-security-architect",
        title: "Cloud Security Solutions Architect",
        sector: "Technology",
        category: "Strong Match",
        compatibilityScore: 94,
        scoreBasis: `Exceptional alignment with your ${profile?.branch || "technical"} degree and focus on cloud infrastructure security.`,
        description: "Designs and hardens enterprise cloud environments, implementing zero-trust security and infrastructure-as-code automation.",
        whyItMatches: `Directly aligns with your background in ${profile?.branch || "Cloud Systems"} and interest in securing containerized workloads.`,
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

  // Default AI / Data Science / Full-Stack Technology recommendations
  return [
    {
      id: "ai-engineer",
      title: "AI & Machine Learning Engineer",
      sector: "Technology",
      category: "Strong Match",
      compatibilityScore: 95,
      scoreBasis: `Excellent synergy with your ${profile?.degree || "computing"} background and focus on applied intelligence.`,
      description: "Builds, deploys, and fine-tunes neural network models, LLM agents, and real-time inference pipelines.",
      whyItMatches: `Capitalizes directly on your studies in ${profile?.branch || "Artificial Intelligence"} and interest in machine learning.`,
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
