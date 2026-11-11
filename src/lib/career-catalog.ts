export type CareerSector =
  | "Technology"
  | "Business"
  | "Finance"
  | "Engineering"
  | "Healthcare"
  | "Creative"
  | "Other Sectors";

export type RpgLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type RpgLevelName =
  | "LEVEL 1 – FOUNDATION"
  | "LEVEL 2 – BEGINNER"
  | "LEVEL 3 – INTERMEDIATE"
  | "LEVEL 4 – ADVANCED"
  | "LEVEL 5 – EXPERT"
  | "LEVEL 6 – PROFESSIONAL";

export interface RoadmapSubtopic {
  id: string;
  title: string;
  category?: string;
  summary: string;
  details: string;
  keyPoints: string[];
  codeSnippet?: string;
  recommendedResources: { title: string; url?: string; type: "course" | "doc" | "video" }[];
  handsOnTask: string;
  interviewQuestions: string[];
}

export interface RoadmapBranchGroup {
  id: string;
  side: "left" | "right";
  title: string;
  subtopics: RoadmapSubtopic[];
}

export interface RoadmapNode {
  id: string;
  level: RpgLevel;
  levelName: RpgLevelName;
  stage: "Beginner" | "Intermediate" | "Advanced" | "Job Readiness";
  label: string;
  questTitle: string;
  xpReward: number;
  description: string;
  prerequisites: string[];
  estimatedWeeks: number;
  skills: string[];
  softSkills: string[];
  languagesAndTools: string[];
  recommendedCourses: string[];
  certifications: string[];
  practicalProjects: string[];
  readinessChecklist: string[];
  branchGroups?: RoadmapBranchGroup[];
}

export interface CareerAchievement {
  id: string;
  title: string;
  badgeIcon: string;
  description: string;
  unlockedAtXp: number;
}

export interface CareerItem {
  id: string;
  title: string;
  sector: CareerSector;
  tagline: string;
  overview: string;
  averageSalary: string;
  growthOutlook: string;
  difficultyRank: "D-Rank" | "C-Rank" | "B-Rank" | "A-Rank" | "S-Rank" | "SS-Rank";
  totalXp: number;
  estimatedDuration: string;
  accordionInfo?: {
    question: string;
    answer: string;
    keyResponsibilities: string[];
    averageSalaryDetail: string;
  };
  prerequisitesBox?: {
    title: string;
    items: string[];
  };
  relatedRoadmaps?: string[];
  achievements?: CareerAchievement[];
  nodes: RoadmapNode[];
}

export const CAREER_SECTORS: { id: CareerSector; label: string; count: number }[] = [
  { id: "Technology", label: "Technology", count: 16 },
  { id: "Business", label: "Business", count: 7 },
  { id: "Finance", label: "Finance", count: 5 },
  { id: "Engineering", label: "Engineering", count: 7 },
  { id: "Healthcare", label: "Healthcare", count: 6 },
  { id: "Creative", label: "Creative", count: 6 },
  { id: "Other Sectors", label: "Other Sectors", count: 8 },
];

export const STANDARD_ACHIEVEMENTS: CareerAchievement[] = [
  {
    id: "ach-1",
    title: "Novice Initiate",
    badgeIcon: "Sparkles",
    description: "Completed Level 1 Foundation questline and awakened core domain intuition.",
    unlockedAtXp: 150,
  },
  {
    id: "ach-2",
    title: "Skill Adept",
    badgeIcon: "Zap",
    description: "Acquired fundamental tooling and executed first operational benchmark.",
    unlockedAtXp: 400,
  },
  {
    id: "ach-3",
    title: "Cyber Vanguard",
    badgeIcon: "Shield",
    description: "Built scalable multi-module architectures and integrated data pipelines.",
    unlockedAtXp: 750,
  },
  {
    id: "ach-4",
    title: "Master Architect",
    badgeIcon: "Cpu",
    description: "Engineered high-throughput enterprise optimizations and autonomous workflows.",
    unlockedAtXp: 1200,
  },
  {
    id: "ach-5",
    title: "Apex Professional",
    badgeIcon: "Crown",
    description: "Published public capstone proof-of-work and conquered mock industry interviews.",
    unlockedAtXp: 1800,
  },
];

// Helper to generate the 6-Level RPG roadmap nodes for all careers
function buildStandardNodes(careerTitle: string, sector: CareerSector): RoadmapNode[] {
  const slug = careerTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return [
    {
      id: `${slug}-lvl-1`,
      level: 1,
      levelName: "LEVEL 1 – FOUNDATION",
      stage: "Beginner",
      label: "Core Domain Foundations",
      questTitle: "Initiation: Awaken Core Intuition",
      xpReward: 150,
      description: `Foundational principles, terminology, and historical evolution of ${careerTitle} in the ${sector} realm.`,
      prerequisites: ["Curiosity & Basic Academic Literacy"],
      estimatedWeeks: 4,
      skills: ["Analytical Reasoning", "Core Principles", "Research Literacy"],
      softSkills: ["Curiosity", "Self-Discipline", "Active Listening"],
      languagesAndTools: ["Industry Software Suite", "Documentation Tooling", "Spreadsheets"],
      recommendedCourses: [`Introduction to ${careerTitle} Specialization`, "Domain Foundations & History"],
      certifications: [`Associate Apprentice in ${careerTitle}`],
      practicalProjects: ["Foundational Case Study", "Comparative Industry Review"],
      readinessChecklist: ["Master primary domain vocabulary", "Understand ethical and safety guidelines"],
      branchGroups: [
        {
          id: `${slug}-bg-1`,
          side: "right",
          title: "Foundational Quests",
          subtopics: [
            {
              id: `${slug}-sub-1-1`,
              title: `What is a ${careerTitle}?`,
              category: "Role Definition",
              summary: `Comprehensive overview of the ${careerTitle} profession, market demand, and core value proposition.`,
              details: `A ${careerTitle} plays a vital role in the ${sector} industry. Professionals in this space analyze requirements, design systemic solutions, and execute standard operating procedures that drive strategic organizational impact.`,
              keyPoints: [
                "Understand the day-to-day responsibilities and operational expectations",
                "Learn the standard industry nomenclature and core domain taxonomy",
                "Appreciate how this role interfaces with cross-functional partner teams"
              ],
              codeSnippet: `// Standard domain lifecycle workflow\nconst workflow = {\n  discipline: '${careerTitle}',\n  level: 'Level 1 Foundation',\n  deliverable: 'Baseline Specification & Feasibility Blueprint'\n};`,
              recommendedResources: [
                { title: `Official Industry Guide to ${careerTitle}`, type: "doc" },
                { title: `Introduction to ${careerTitle} Specialization`, type: "course" }
              ],
              handsOnTask: `Write an executive summary defining a mock project scope within the domain of ${careerTitle}.`,
              interviewQuestions: [
                `How do you define the primary objective of a ${careerTitle} in modern industry?`,
                `What are the most common challenges faced during initial project onboarding?`
              ]
            },
            {
              id: `${slug}-sub-1-2`,
              title: "Roles & Responsibilities",
              category: "Operational Scope",
              summary: "Day-to-day duties, deliverables, and performance evaluation metrics.",
              details: "Covers standard task distributions across junior, mid-level, and senior stages, including quality assurance, stakeholder briefing, and documentation hygiene.",
              keyPoints: [
                "Core daily deliverables and milestone tracking",
                "Cross-functional collaboration with domain specialists",
                "Quality assurance guidelines and compliance requirements"
              ],
              recommendedResources: [
                { title: "Professional Standards & Ethics Codex", type: "doc" }
              ],
              handsOnTask: "Build a weekly responsibility schedule for an entry-level practitioner.",
              interviewQuestions: [
                "Describe how you prioritize conflicting deadlines when multiple stakeholders request updates."
              ]
            }
          ]
        }
      ]
    },
    {
      id: `${slug}-lvl-2`,
      level: 2,
      levelName: "LEVEL 2 – BEGINNER",
      stage: "Beginner",
      label: "Tooling & Standard Operating Procedures",
      questTitle: "Awakening: Master the Primary Toolkits",
      xpReward: 250,
      description: `Hands-on training with modern industry toolkits, workflows, and operating procedures in ${careerTitle}.`,
      prerequisites: [`${slug}-lvl-1`],
      estimatedWeeks: 6,
      skills: ["Process Execution", "Quality Assurance", "Data Tracking"],
      softSkills: ["Attention to Detail", "Time Management", "Collaboration"],
      languagesAndTools: ["Industry Standard Suite", "Version / Asset Management", "Diagnostic Tools"],
      recommendedCourses: [`Applied Tooling & Standards in ${careerTitle}`],
      certifications: ["Entry-Level Technical Credential"],
      practicalProjects: ["Tooling Benchmark Pipeline", "Standardized Workflow Implementation"],
      readinessChecklist: ["Navigate primary software suite without guidance", "Demonstrate safety & precision"],
      branchGroups: [
        {
          id: `${slug}-bg-2-left`,
          side: "left",
          title: "Mechanics & Diagnostics",
          subtopics: [
            {
              id: `${slug}-sub-2-1`,
              title: "Standard Software Suite",
              category: "Tooling",
              summary: "Mastery of essential desktop, cloud, and diagnostic utilities.",
              details: "Step-by-step mastery of primary applications, keyboard workflows, automated linters, and cloud workspaces.",
              keyPoints: [
                "Software installation, configuration, and environment setup",
                "Asset management and structured file taxonomy",
                "Automated validation and error reporting"
              ],
              recommendedResources: [
                { title: "Standard Tooling Handbook & Best Practices", type: "doc" }
              ],
              handsOnTask: "Configure a complete local workspace matching current enterprise guidelines.",
              interviewQuestions: [
                "Which software suite do you prefer for this discipline and why?"
              ]
            }
          ]
        },
        {
          id: `${slug}-bg-2-right`,
          side: "right",
          title: "Common Terminology",
          subtopics: [
            {
              id: `${slug}-sub-2-2`,
              title: "Domain Taxonomy & Vocabulary",
              category: "Vocabulary",
              summary: "Comprehensive dictionary of fundamental terminology and operational metrics.",
              details: "Understanding specific acronyms, formal standards, and statistical benchmarks used daily on the job.",
              keyPoints: [
                "Mastery of 25+ standard terms and acronyms",
                "Understanding the distinction between theoretical models and real-world execution",
                "Common misconceptions and anti-patterns"
              ],
              recommendedResources: [
                { title: "Comprehensive Domain Glossary", type: "doc" }
              ],
              handsOnTask: "Create a flashcard reference deck covering core technical terms.",
              interviewQuestions: [
                "Explain the technical distinction between process verification and process validation."
              ]
            }
          ]
        }
      ]
    },
    {
      id: `${slug}-lvl-3`,
      level: 3,
      levelName: "LEVEL 3 – INTERMEDIATE",
      stage: "Intermediate",
      label: "Applied Practice & System Architecture",
      questTitle: "Ascension: Assemble Modular Systems",
      xpReward: 350,
      description: `Designing end-to-end workflows, solving real-world domain challenges, and managing data pipelines.`,
      prerequisites: [`${slug}-lvl-2`],
      estimatedWeeks: 8,
      skills: ["Complex Problem Solving", "System Architecture", "Performance Tuning"],
      softSkills: ["Stakeholder Communication", "Critical Thinking", "Adaptability"],
      languagesAndTools: ["Advanced Enterprise Tooling", "Automation Scripts", "Database Integration"],
      recommendedCourses: [`Intermediate ${careerTitle} Masterclass`, "Domain Applied Practicum"],
      certifications: ["Professional Practitioner Certification"],
      practicalProjects: ["Comprehensive Multi-Module Project", "Live Data / Case Pipeline"],
      readinessChecklist: ["Resolve real-world edge cases", "Document architectural decisions"],
      branchGroups: [
        {
          id: `${slug}-bg-3`,
          side: "right",
          title: "System Integration",
          subtopics: [
            {
              id: `${slug}-sub-3-1`,
              title: "End-to-End Pipeline Design",
              category: "Architecture",
              summary: "Connecting modular inputs, processing nodes, and reliable output delivery.",
              details: "Architecting resilient pipelines that handle latency spikes, data corruption, and sudden capacity surges gracefully.",
              keyPoints: [
                "Modular decomposition of complex problems",
                "Fault tolerance, retry policies, and circuit breakers",
                "Latency budgets and throughput monitoring"
              ],
              recommendedResources: [
                { title: "Scalable Systems Architecture", type: "course" }
              ],
              handsOnTask: "Draft a system architecture diagram illustrating end-to-end data flow.",
              interviewQuestions: [
                "How would you design a system to maintain high availability under a 10x traffic spike?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: `${slug}-lvl-4`,
      level: 4,
      levelName: "LEVEL 4 – ADVANCED",
      stage: "Advanced",
      label: "Optimization, Governance & Scaling",
      questTitle: "Mastery: Eliminate System Bottlenecks",
      xpReward: 450,
      description: `Deep technical optimization, regulatory compliance, risk mitigation, and scaling large initiatives.`,
      prerequisites: [`${slug}-lvl-3`],
      estimatedWeeks: 8,
      skills: ["Strategic Architecture", "Risk Analysis", "Cross-Disciplinary Coordination"],
      softSkills: ["Negotiation", "Mentorship", "Executive Presentation"],
      languagesAndTools: ["Enterprise Analytics", "CI/CD / Governance Tools", "Security Frameworks"],
      recommendedCourses: [`Advanced ${careerTitle} & Systems Architecture`],
      certifications: ["Senior Specialist Credential"],
      practicalProjects: ["Enterprise-Grade Optimization Audit", "High-Fidelity Capstone Deliverable"],
      readinessChecklist: ["Conduct peer reviews", "Design scalable fault-tolerant processes"],
      branchGroups: [
        {
          id: `${slug}-bg-4`,
          side: "right",
          title: "Optimization Specialization",
          subtopics: [
            {
              id: `${slug}-sub-4-1`,
              title: "Optimization & Performance Tuning",
              category: "Optimization",
              summary: "Benchmarking, bottleneck elimination, and resource cost reduction.",
              details: "Systematic profiling, memory leak detection, algorithmic complexity reduction, and operational cost management.",
              keyPoints: [
                "Profiling CPU, memory, and network bottlenecks",
                "Quantifying operational costs per unit of work",
                "Implementing caching and pre-computation layers"
              ],
              recommendedResources: [
                { title: "High-Performance Engineering Patterns", type: "doc" }
              ],
              handsOnTask: "Profile an existing project and produce a formal bottleneck remediation report.",
              interviewQuestions: [
                "Walk us through a scenario where you identified and resolved an elusive performance bottleneck."
              ]
            }
          ]
        }
      ]
    },
    {
      id: `${slug}-lvl-5`,
      level: 5,
      levelName: "LEVEL 5 – EXPERT",
      stage: "Advanced",
      label: "Autonomous Workflows & Enterprise Strategy",
      questTitle: "Dominion: Enterprise-Scale Leadership",
      xpReward: 500,
      description: `Leading cross-functional strategic initiatives, implementing AI-augmented workflows, and security governance.`,
      prerequisites: [`${slug}-lvl-4`],
      estimatedWeeks: 6,
      skills: ["Enterprise Leadership", "AI Workflow Automation", "Strategic Governance"],
      softSkills: ["Executive Influence", "Crisis Management", "Vision Casting"],
      languagesAndTools: ["Enterprise Cloud Clusters", "Executive BI Dashboards", "Compliance Frameworks"],
      recommendedCourses: ["Enterprise Domain Leadership Executive Program"],
      certifications: ["Fellow / Master of Practice"],
      practicalProjects: ["Multi-Million Dollar Efficiency Overhaul", "Enterprise Policy Blueprint"],
      readinessChecklist: ["Establish multi-quarter organizational roadmaps", "Audit risk mitigation frameworks"],
      branchGroups: [
        {
          id: `${slug}-bg-5`,
          side: "right",
          title: "Enterprise Strategy",
          subtopics: [
            {
              id: `${slug}-sub-5-1`,
              title: "Strategic AI Automation & Tooling",
              category: "Enterprise",
              summary: "Leveraging cutting-edge AI copilot workflows to augment team productivity.",
              details: "Integrating agentic tools, automated code reviews, and structured generative pipelines into core operations.",
              keyPoints: [
                "Quantifying AI productivity leverage ratios",
                "Establishing data privacy and model governance guardrails",
                "Continuous automated quality evaluation"
              ],
              recommendedResources: [
                { title: "Enterprise AI Transformation Playbook", type: "doc" }
              ],
              handsOnTask: "Design an AI augmentation workflow that automates 30% of repetitive operational reporting.",
              interviewQuestions: [
                "How do you evaluate security and IP considerations when introducing AI tooling into an enterprise?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: `${slug}-lvl-6`,
      level: 6,
      levelName: "LEVEL 6 – PROFESSIONAL",
      stage: "Job Readiness",
      label: "Portfolio Capstone & Industry Entry",
      questTitle: "Apex: The Grandmaster Capstone",
      xpReward: 600,
      description: `Assembling verified portfolio proof-of-work, resume calibration, mock interviews, and employment matching.`,
      prerequisites: [`${slug}-lvl-5`],
      estimatedWeeks: 4,
      skills: ["Technical Interviewing", "Portfolio Presentation", "Industry Domain Fluency"],
      softSkills: ["Storytelling", "Interview Poise", "Networking"],
      languagesAndTools: ["GitHub / Digital Portfolio", "LinkedIn / Professional Profile", "Resume ATS"],
      recommendedCourses: [`Technical Interview Masterclass for ${careerTitle}`],
      certifications: ["Capstone Completion Honors"],
      practicalProjects: ["Public Capstone Showcase", "End-to-End Case Study with Measured KPIs"],
      readinessChecklist: ["Complete 3 polished portfolio projects", "Pass 5 mock technical interview loops"],
      branchGroups: [
        {
          id: `${slug}-bg-6`,
          side: "right",
          title: "Industry Readiness",
          subtopics: [
            {
              id: `${slug}-sub-6-1`,
              title: "Portfolio Development & Proof-of-Work",
              category: "Hiring",
              summary: "Structuring public repositories, case studies, and live demonstrations.",
              details: "Recruiters evaluate proof-of-work over static credentials. Build modular, documented, and fully deployable case studies.",
              keyPoints: [
                "Documentation hygiene with reproducible READMEs",
                "Live demo links with zero setup friction",
                "Clear quantification of personal technical contributions"
              ],
              recommendedResources: [
                { title: "The Modern Technical Portfolio Guide", type: "course" }
              ],
              handsOnTask: "Publish a clean, production-ready portfolio case study with measurable outcomes.",
              interviewQuestions: [
                "Pick your strongest portfolio project and defend your core architectural decisions."
              ]
            }
          ]
        }
      ]
    }
  ];
}

// Full career catalog across all 7 sectors (54 Careers)
export const CAREER_CATALOG: CareerItem[] = [
  // 1. TECHNOLOGY (16 Careers)
  {
    id: "tech-ai",
    title: "AI Engineer (Artificial Intelligence)",
    sector: "Technology",
    tagline: "Build LLM applications, autonomous agents, RAG pipelines, and foundation model infrastructure.",
    overview: "AI Engineers build software products and scalable systems powered by Large Language Models (LLMs), vector databases, retrieval pipelines, and neural networks.",
    averageSalary: "$135,000 - $185,000",
    growthOutlook: "+38% (High Growth)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    accordionInfo: {
      question: "What is an AI Engineer?",
      answer: "An AI Engineer builds production-grade software applications and infrastructure powered by artificial intelligence and Large Language Models (LLMs). Unlike traditional Machine Learning engineers who train models from raw mathematical loss functions, AI Engineers focus on orchestrating foundation models (GPT-4o, Claude 3.5, Gemini 2.0, Llama 3), building vector retrieval pipelines (RAG), creating autonomous tool-calling agents, optimizing inference latency, and integrating intelligent features directly into software products.",
      keyResponsibilities: [
        "Architect Retrieval-Augmented Generation (RAG) pipelines over enterprise knowledge bases",
        "Build autonomous AI agents with function calling, dynamic tool usage, and memory",
        "Fine-tune open-weight models (Llama 3, Mistral) using LoRA / QLoRA for domain-specific tasks",
        "Deploy and optimize low-latency model inference servers using vLLM, TensorRT-LLM, and Docker",
        "Implement guardrails, prompt injection defenses, and rigorous LLM evaluation benchmarks (Ragas, TruLens)"
      ],
      averageSalaryDetail: "$135,000 - $185,000 / year (Entry/Mid-Level) • $210,000+ (Senior AI Engineer)"
    },
    prerequisitesBox: {
      title: "Pre-requisites (One of these)",
      items: ["Frontend", "Backend", "Full-Stack"]
    },
    relatedRoadmaps: [
      "Vibe Coding",
      "Claude Code",
      "Prompt Engineering",
      "Inference Engineering",
      "Forward Deployed Engineer"
    ],
    nodes: [
      {
        id: "ai-lvl-1",
        level: 1,
        levelName: "LEVEL 1 – FOUNDATION",
        stage: "Beginner",
        label: "AI Fundamentals & The LLM Revolution",
        questTitle: "Initiation: Awaken the Neural Core",
        xpReward: 150,
        description: "Understanding the role of the modern AI Engineer, model taxonomy, token economics, and AI product architecture.",
        prerequisites: ["Programming fundamentals (Python or TypeScript)"],
        estimatedWeeks: 3,
        skills: ["Software Engineering", "AI Intuition", "Token Economics"],
        softSkills: ["Curiosity", "First-Principles Thinking", "Communication"],
        languagesAndTools: ["Python 3.12", "TypeScript", "VS Code / Cursor", "Git"],
        recommendedCourses: ["DeepLearning.AI: AI for Everyone", "Andrej Karpathy: Neural Networks Zero to Hero"],
        certifications: ["NVIDIA Certified Associate: Generative AI"],
        practicalProjects: ["First API-driven AI CLI tool", "Comparative analysis of modern frontier models"],
        readinessChecklist: ["Distinguish between ML Engineer, AI Engineer, and Data Scientist", "Understand token pricing and inference cost math"],
        branchGroups: [
          {
            id: "ai-bg-intro-right",
            side: "right",
            title: "Core Role Foundations",
            subtopics: [
              {
                id: "ai-sub-what-is",
                title: "What is an AI Engineer?",
                category: "Role Definition",
                summary: "The emergence of the AI Engineer as the bridge between research models and production software.",
                details: "The AI Engineer is one of the fastest-growing roles in tech. While ML researchers train foundational models from scratch, AI Engineers take those frontier models and build real-world software around them. This involves prompt engineering, context management, semantic search, agentic tool invocation, evaluations, and scalable backend infrastructure.",
                keyPoints: [
                  "Difference between ML Researcher, ML Engineer, and AI Engineer",
                  "Why foundation models shifted engineering from model-training to model-orchestration",
                  "The AI stack: Models -> Frameworks (LangChain, LlamaIndex) -> Vector DBs -> APIs -> UIs"
                ],
                codeSnippet: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))\nresponse = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[{"role": "user", "content": "Explain vector embeddings in 1 sentence."}]\n)\nprint(response.choices[0].message.content)`,
                recommendedResources: [
                  { title: "Swyx: The Rise of the AI Engineer (Essay)", type: "doc" },
                  { title: "Latent Space Podcast & AI Engineering Summit", type: "video" }
                ],
                handsOnTask: "Build a script that calls 2 different foundation model APIs (e.g. OpenAI and Gemini) and benchmarks response latency and output quality.",
                interviewQuestions: [
                  "How does the role of an AI Engineer differ from a classical Machine Learning Engineer?",
                  "What are the major engineering hurdles when taking an LLM prototype into high-traffic production?"
                ]
              },
              {
                id: "ai-sub-roles-resp",
                title: "Roles and Responsibilities",
                category: "Daily Workflows",
                summary: "Day-to-day responsibilities: RAG systems, model evaluation, tool calling, and guardrails.",
                details: "An AI Engineer spends their day designing structured prompt templates, building vector indexing pipelines, monitoring hallucinations, evaluating output quality with automated test suites, reducing token costs, and optimizing streaming latency for user interfaces.",
                keyPoints: [
                  "Designing and maintaining reliable RAG ingestion pipelines",
                  "Writing unit tests and evaluation benchmarks for non-deterministic model outputs",
                  "Securing applications against prompt injections, data leaks, and jailbreaks",
                  "Tracking latency, Time-to-First-Token (TTFT), and throughput"
                ],
                recommendedResources: [
                  { title: "Production AI Engineering Checklist", type: "doc" }
                ],
                handsOnTask: "Create an automated evaluation test script that checks whether an LLM summary includes 3 required factual keywords.",
                interviewQuestions: [
                  "How do you evaluate and test software when the core engine (an LLM) is probabilistic and non-deterministic?"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ai-lvl-2",
        level: 2,
        levelName: "LEVEL 2 – BEGINNER",
        stage: "Beginner",
        label: "How LLMs Work & Prompt Mechanics",
        questTitle: "Awakening: Master the Token Grimoire",
        xpReward: 250,
        description: "Core architecture of Large Language Models: tokenization, context windows, sampling parameters, temperature, and advanced prompt engineering.",
        prerequisites: ["ai-lvl-1"],
        estimatedWeeks: 4,
        skills: ["Tokenization Math", "Context Window Sizing", "Decoding Strategies", "Prompt Engineering"],
        softSkills: ["Patience", "Analytical Thinking", "Precision"],
        languagesAndTools: ["Tiktoken", "HuggingFace Transformers", "Python", "Google Colab"],
        recommendedCourses: ["Andrej Karpathy: Let's build GPT from scratch", "Stanford CS224N: NLP with Deep Learning"],
        certifications: ["DeepLearning.AI Generative AI for Everyone"],
        practicalProjects: ["Custom Byte-Pair Encoding (BPE) Tokenizer", "Decoding visualizer for Temperature and Top-P"],
        readinessChecklist: ["Calculate cost per 1M tokens accurately", "Explain self-attention intuitively"],
        branchGroups: [
          {
            id: "ai-bg-llm-left",
            side: "left",
            title: "Core LLM Elements",
            subtopics: [
              {
                id: "ai-sub-tokens",
                title: "Tokens & Tokenization (BPE)",
                category: "Foundations",
                summary: "How text is split into sub-word tokens using Byte-Pair Encoding (BPE).",
                details: "LLMs do not read words or characters; they read tokens. A token is typically ~4 characters of English text (or ~0.75 words). Understanding tokenization is crucial because context windows, rate limits, and billing are all calculated in tokens.",
                keyPoints: [
                  "Byte-Pair Encoding (BPE) algorithm intuition",
                  "Token limits: Input tokens (Prompt) vs Output tokens (Completion)",
                  "Token count calculation using tiktoken (OpenAI) or tokenizers library"
                ],
                codeSnippet: `import tiktoken\n\nenc = tiktoken.encoding_for_model("gpt-4o")\ntext = "AI Engineers build future technology!"\ntokens = enc.encode(text)\nprint(f"Token count: {len(tokens)}")\nprint(f"Token IDs: {tokens}")`,
                recommendedResources: [
                  { title: "OpenAI Tiktokenizer Web Tool", type: "doc" },
                  { title: "Karpathy: Let's build a GPT Tokenizer", type: "video" }
                ],
                handsOnTask: "Write a script that counts tokens for a 10-page PDF document and calculates exact API costs across GPT-4o, Claude 3.5 Sonnet, and Gemini 2.0 Flash.",
                interviewQuestions: [
                  "Why do LLMs struggle with basic character-level tasks like counting the letter 'r' in 'strawberry'?"
                ]
              },
              {
                id: "ai-sub-temperature",
                title: "Sampling Parameters & Temperature",
                category: "Inference",
                summary: "Controlling probability distributions: Temperature, Top-P, and Top-K.",
                details: "Mathematically, temperature divides the raw logit scores before the softmax function is applied: Softmax(z_i / T). When T approaches 0, the highest score dominates with near-100% probability (deterministic). When T is high, probabilities flatten (creative).",
                keyPoints: [
                  "Temperature = 0.0: Greedy decoding (ideal for code, math, and JSON)",
                  "Temperature = 0.7-1.0: Creative writing, brainstorming",
                  "Top-P (Nucleus Sampling): Cut off tail probabilities dynamically"
                ],
                codeSnippet: `// Configuration for strict JSON structured output\nconst config = {\n  model: "gpt-4o",\n  temperature: 0.0,\n  response_format: { type: "json_object" }\n};`,
                recommendedResources: [
                  { title: "Visualizing Softmax Temperature Scaling", type: "video" }
                ],
                handsOnTask: "Run a prompt 10 times at temperature 0.0 and 10 times at temperature 1.2, plotting the variance in output length and token diversity.",
                interviewQuestions: [
                  "Why should you always set temperature to 0 when generating structured JSON data or code?"
                ]
              }
            ]
          },
          {
            id: "ai-bg-llm-right",
            side: "right",
            title: "Common Terminology",
            subtopics: [
              {
                id: "ai-sub-embeddings",
                title: "Embeddings & Vector Spaces",
                category: "Concepts",
                summary: "High-dimensional vector representations that capture semantic meaning of text.",
                details: "An embedding maps a piece of text (word, sentence, or document) to an array of floating-point numbers (e.g. 1,536 dimensions in text-embedding-3-small). Texts with similar meanings end up close together in the vector space.",
                keyPoints: [
                  "Dense vector representation vs sparse keyword matching (TF-IDF / BM25)",
                  "Cosine similarity and Euclidean distance in high-dimensional space",
                  "Why embedding quality determines the upper ceiling of RAG system accuracy"
                ],
                codeSnippet: `import numpy as np\n\ndef cosine_similarity(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\nsim = cosine_similarity(vec_a, vec_b)\nprint(f"Similarity: {sim:.4f}")`,
                recommendedResources: [
                  { title: "OpenAI Guide to Text Embeddings", type: "doc" }
                ],
                handsOnTask: "Embed 10 sentences about different sports and compute an all-pairs cosine similarity matrix.",
                interviewQuestions: [
                  "How does semantic search using embeddings differ from classical keyword search like Elasticsearch BM25?"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ai-lvl-3",
        level: 3,
        levelName: "LEVEL 3 – INTERMEDIATE",
        stage: "Intermediate",
        label: "Vector Databases & Semantic Retrieval",
        questTitle: "Ascension: Forge the High-Dimensional Index",
        xpReward: 350,
        description: "Vector mathematics, HNSW indexing, similarity metrics, pgvector, ChromaDB, Qdrant, and hybrid search.",
        prerequisites: ["ai-lvl-2"],
        estimatedWeeks: 5,
        skills: ["Vector Indexing", "Similarity Search", "Hybrid Retrieval", "Database Partitioning"],
        softSkills: ["Precision", "Benchmarking"],
        languagesAndTools: ["Pinecone", "ChromaDB", "Qdrant", "pgvector", "Python"],
        recommendedCourses: ["DeepLearning.AI: Vector Databases: from Embeddings to Applications"],
        certifications: ["Qdrant Vector Database Certification"],
        practicalProjects: ["Multi-Tenant Vector Search with pgvector", "Semantic Document Search Engine with ChromaDB"],
        readinessChecklist: ["Implement HNSW index tuning in production", "Implement hybrid sparse/dense search"],
        branchGroups: [
          {
            id: "ai-bg-vec-right",
            side: "right",
            title: "Vector Architecture",
            subtopics: [
              {
                id: "ai-sub-hybrid-search",
                title: "Hybrid Search (Dense + Sparse)",
                category: "Retrieval",
                summary: "Combining semantic embeddings with BM25 keyword matching for optimal recall.",
                details: "Dense vector search alone fails on exact product SKUs, code identifiers, or obscure person names. Hybrid search fuses BM25 keyword scoring with dense vector search using Reciprocal Rank Fusion (RRF) to capture both semantic intent and exact keyword matches.",
                keyPoints: [
                  "Reciprocal Rank Fusion (RRF) formula: RRF(d) = sum(1 / (k + rank(d)))",
                  "Dense vectors capture semantics; sparse vectors (BM25, SPLADE) capture exact tokens",
                  "Production standard in enterprise search (Elasticsearch, Qdrant, Pinecone Hybrid)"
                ],
                codeSnippet: `function rrf(denseRank, sparseRank, k = 60) {\n  return (1 / (k + denseRank)) + (1 / (k + sparseRank));\n}`,
                recommendedResources: [
                  { title: "Qdrant Hybrid Search & Reciprocal Rank Fusion Guide", type: "doc" }
                ],
                handsOnTask: "Build a search engine combining BM25 keyword search with sentence-transformer embeddings using Reciprocal Rank Fusion.",
                interviewQuestions: [
                  "What is Reciprocal Rank Fusion (RRF) and why is it preferred over raw score weighting in hybrid search?"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ai-lvl-4",
        level: 4,
        levelName: "LEVEL 4 – ADVANCED",
        stage: "Advanced",
        label: "Advanced RAG Architecture & Evaluation",
        questTitle: "Mastery: Build the Hallucination Ward",
        xpReward: 450,
        description: "Chunking strategies, cross-encoder re-ranking (Cohere Rerank), multi-query retrieval, self-reflective RAG, and Ragas evaluation.",
        prerequisites: ["ai-lvl-3"],
        estimatedWeeks: 6,
        skills: ["Chunking Optimization", "Reranking Models", "RAG Evaluation Metrics", "Prompt Injection Defense"],
        softSkills: ["Experimental Rigor", "Data Hygiene"],
        languagesAndTools: ["LangChain", "LlamaIndex", "Cohere Rerank", "Ragas", "FastAPI"],
        recommendedCourses: ["DeepLearning.AI: Advanced RAG with LlamaIndex", "Full Stack Deep Learning: LLM BootCamp"],
        certifications: ["LangChain Certified Developer"],
        practicalProjects: ["Production Enterprise RAG with Cohere Reranking", "Automated RAG Evaluation Pipeline with Ragas"],
        readinessChecklist: ["Measure Faithfulness and Answer Relevance systematically", "Implement sliding window chunking with metadata"],
        branchGroups: [
          {
            id: "ai-bg-rag-left",
            side: "left",
            title: "Document Ingestion",
            subtopics: [
              {
                id: "ai-sub-chunking",
                title: "Chunking Strategies",
                category: "Ingestion",
                summary: "Fixed-size, sentence-level, semantic, and recursive character chunking.",
                details: "Chunking breaks long documents into digestible text units. Too small, and context is fragmented; too large, and embeddings lose specificity. Recursive character chunking respects paragraph and sentence boundaries.",
                keyPoints: [
                  "Fixed-size chunking with overlap (e.g. 500 characters, 50 character overlap)",
                  "Recursive character chunking (splits on paragraphs -> sentences -> words)",
                  "Semantic chunking: dynamically split text at semantic breakpoints"
                ],
                recommendedResources: [
                  { title: "Visual Guide to Chunking Strategies for RAG", type: "doc" }
                ],
                handsOnTask: "Compare retrieval recall when using 200-token chunks vs 1,000-token chunks on a complex technical manual.",
                interviewQuestions: [
                  "What are the pros and cons of high chunk overlap in RAG ingestion?"
                ]
              }
            ]
          },
          {
            id: "ai-bg-rag-right",
            side: "right",
            title: "Advanced Retrieval",
            subtopics: [
              {
                id: "ai-sub-reranking",
                title: "Re-Ranking (Cross-Encoders)",
                category: "Retrieval",
                summary: "Using cross-encoder models (Cohere Rerank, BGE-Reranker) to boost top-1 accuracy.",
                details: "In two-stage retrieval: vector search fetches top 30 chunks, and a cross-encoder reranks them to pick the top 5 most relevant documents.",
                keyPoints: [
                  "Two-stage retrieval pipeline: High-recall bi-encoder -> High-precision cross-encoder",
                  "Cohere Rerank API and open-source BGE-Reranker models",
                  "Dramatically reduces context window noise and LLM hallucination"
                ],
                recommendedResources: [
                  { title: "Cohere Rerank Documentation & Benchmarks", type: "doc" }
                ],
                handsOnTask: "Add Cohere Rerank to a basic LangChain RAG pipeline and measure the accuracy increase.",
                interviewQuestions: [
                  "Why can't we use a cross-encoder for the entire database search instead of vector search?"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ai-lvl-5",
        level: 5,
        levelName: "LEVEL 5 – EXPERT",
        stage: "Advanced",
        label: "AI Agents & Autonomous State Graphs",
        questTitle: "Dominion: Command the Agentic Swarm",
        xpReward: 500,
        description: "ReAct patterns, function / tool calling, stateful cyclic graphs with LangGraph, short & long-term memory, and multi-agent systems.",
        prerequisites: ["ai-lvl-4"],
        estimatedWeeks: 6,
        skills: ["LangGraph State Machines", "Function Calling", "Tool Schema Design", "Multi-Agent Coordination"],
        softSkills: ["Systems Thinking", "Debugging Complex State"],
        languagesAndTools: ["LangGraph", "LangChain", "OpenAI Tool Calling", "CrewAI", "Docker"],
        recommendedCourses: ["DeepLearning.AI: AI Agents with LangGraph", "Harrison Chase: Building Stateful Agents"],
        certifications: ["LangChain Agent Specialist"],
        practicalProjects: ["Autonomous Customer Support Agent with Refund Tool", "Multi-Agent Research Swarm with Web Browsing"],
        readinessChecklist: ["Implement Human-in-the-Loop approval nodes", "Prevent runaway recursion with state iteration ceilings"],
        branchGroups: [
          {
            id: "ai-bg-agent-right",
            side: "right",
            title: "Agentic Engineering",
            subtopics: [
              {
                id: "ai-sub-react-pattern",
                title: "The ReAct Pattern",
                category: "Agent Architecture",
                summary: "Interleaving Reasoning and Acting to solve multi-step problems autonomously.",
                details: "Pioneered by Yao et al., ReAct guides LLMs to articulate a Thought, choose an Action (tool call), receive an Observation (tool response), and repeat until the final answer is synthesized.",
                keyPoints: [
                  "Thought -> Action -> Action Input -> Observation -> Thought -> Final Answer",
                  "Self-correction: detecting tool errors and retrying with alternative queries",
                  "Enforcing tool schemas through strict JSON validation"
                ],
                recommendedResources: [
                  { title: "ReAct Paper (Princeton & Google)", type: "doc" }
                ],
                handsOnTask: "Implement a zero-dependency ReAct agent loop from scratch in Python using vanilla OpenAI API calls.",
                interviewQuestions: [
                  "How does the ReAct pattern prevent models from hallucinating tool arguments?"
                ]
              },
              {
                id: "ai-sub-langgraph",
                title: "LangGraph & State Machines",
                category: "Frameworks",
                summary: "Building cyclic, multi-agent workflows with state machines and checkpointing.",
                details: "Linear DAGs cannot model loops, retries, and human approvals. LangGraph models agent workflows as stateful graphs with nodes, edges, and persistent checkpoints.",
                keyPoints: [
                  "Cyclic graph workflows vs linear chains",
                  "State schemas and reducers in LangGraph",
                  "Human-in-the-loop: pausing execution for manager approval before sensitive actions"
                ],
                recommendedResources: [
                  { title: "LangGraph Official Tutorials & Architecture Guides", type: "doc" }
                ],
                handsOnTask: "Build a LangGraph workflow that drafts an email, pauses for human approval via CLI, and sends it upon confirmation.",
                interviewQuestions: [
                  "Why are state graphs superior to unrestricted autonomous loops for enterprise agents?"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ai-lvl-6",
        level: 6,
        levelName: "LEVEL 6 – PROFESSIONAL",
        stage: "Job Readiness",
        label: "Production Inference & Capstone Conquest",
        questTitle: "Apex: The Grandmaster Inference Engine",
        xpReward: 600,
        description: "vLLM serving, PagedAttention, 4-bit model quantization (AWQ, GGUF), streaming SSE, and technical interview mastery.",
        prerequisites: ["ai-lvl-5"],
        estimatedWeeks: 4,
        skills: ["vLLM Deployment", "PagedAttention", "Model Quantization", "Streaming Protocols", "Interview Storytelling"],
        softSkills: ["Production Empathy", "Incident Management", "Leadership"],
        languagesAndTools: ["vLLM", "Ollama", "Docker", "FastAPI", "Prometheus", "Grafana"],
        recommendedCourses: ["Full Stack Deep Learning: Deployment & LLMOps", "vLLM Production Guide"],
        certifications: ["NVIDIA Certified Professional: Generative AI Infrastructure"],
        practicalProjects: ["Self-Hosted Low-Latency LLM API Cluster with vLLM", "End-to-End AI Engineering Portfolio with Live Web App"],
        readinessChecklist: ["Deploy a containerized model endpoint on cloud GPU", "Pass 5 mock AI engineering system design interviews"],
        branchGroups: [
          {
            id: "ai-bg-deploy-right",
            side: "right",
            title: "Production Infrastructure",
            subtopics: [
              {
                id: "ai-sub-vllm",
                title: "vLLM & PagedAttention",
                category: "Inference",
                summary: "High-throughput model serving using virtual memory management for KV caches.",
                details: "vLLM's PagedAttention algorithm manages the KV cache like virtual memory pages in an OS, delivering 2x to 4x higher serving throughput on open-weight models (Llama 3, Mistral).",
                keyPoints: [
                  "PagedAttention: Eliminating KV cache memory fragmentation",
                  "Continuous batching vs static request batching",
                  "Time to First Token (TTFT) vs Inter-Token Latency (ITL)"
                ],
                recommendedResources: [
                  { title: "vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention (Paper)", type: "doc" }
                ],
                handsOnTask: "Deploy an open-weight Llama 3 8B model using vLLM in a Docker container and benchmark requests per second.",
                interviewQuestions: [
                  "Explain how PagedAttention solves GPU memory fragmentation during LLM inference."
                ]
              },
              {
                id: "ai-sub-quantization",
                title: "Model Quantization (GGUF, AWQ)",
                category: "Optimization",
                summary: "Compressing 16-bit float model weights to 4-bit integers with minimal quality loss.",
                details: "Quantization reduces weight precision to 4-bit or 8-bit integers (AWQ, GPTQ, GGUF), shrinking a 70B parameter model from ~140GB down to ~40GB so it can run on affordable consumer hardware.",
                keyPoints: [
                  "Precision formats: FP16 -> INT8 -> INT4",
                  "GGUF format for local execution via llama.cpp and Ollama",
                  "AWQ (Activation-aware Weight Quantization) for high-throughput GPU serving"
                ],
                recommendedResources: [
                  { title: "Hugging Face Guide to Quantization Techniques", type: "doc" }
                ],
                handsOnTask: "Download an FP16 model and quantize it to 4-bit using AWQ, comparing memory footprint and generation speed.",
                interviewQuestions: [
                  "What is the trade-off between model quantization and generation quality?"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tech-ml",
    title: "Machine Learning",
    sector: "Technology",
    tagline: "Develop predictive statistical models and automated decision pipelines.",
    overview: "Machine Learning specialists focus on algorithm design, feature engineering, and high-accuracy statistical prediction engines.",
    averageSalary: "$120,000 - $160,000",
    growthOutlook: "+34% (Very High)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Machine Learning", "Technology"),
  },
  {
    id: "tech-data-science",
    title: "Data Science",
    sector: "Technology",
    tagline: "Extract quantitative insights and predictive foresight from multi-dimensional data.",
    overview: "Data Scientists combine statistical rigor, coding, and business acumen to transform big data into decisive organizational advantages.",
    averageSalary: "$110,000 - $150,000",
    growthOutlook: "+30% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Data Science", "Technology"),
  },
  {
    id: "tech-data-analytics",
    title: "Data Analytics",
    sector: "Technology",
    tagline: "Turn historical and real-time operational data into actionable business intelligence.",
    overview: "Data Analysts bridge the gap between complex databases and executive decision-makers through SQL, dashboards, and KPI analysis.",
    averageSalary: "$85,000 - $120,000",
    growthOutlook: "+25% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "22 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Data Analytics", "Technology"),
  },
  {
    id: "tech-software-dev",
    title: "Software Development",
    sector: "Technology",
    tagline: "Engineer robust, maintainable, and high-performance software applications.",
    overview: "Software Developers design algorithms, architect OOP systems, write scalable code, and construct resilient software applications.",
    averageSalary: "$105,000 - $150,000",
    growthOutlook: "+26% (Very High)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Software Development", "Technology"),
  },
  {
    id: "tech-frontend",
    title: "Frontend Development",
    sector: "Technology",
    tagline: "Craft modern, responsive, accessible, and high-performance user interfaces.",
    overview: "Frontend Developers specialize in client-side architectures, state management, web performance optimization, and user interactions.",
    averageSalary: "$95,000 - $140,000",
    growthOutlook: "+24% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Frontend Development", "Technology"),
  },
  {
    id: "tech-backend",
    title: "Backend Development",
    sector: "Technology",
    tagline: "Architect secure server engines, microservices, and distributed database systems.",
    overview: "Backend Engineers build resilient business logic, design REST/GraphQL APIs, manage data persistence, and guarantee high availability.",
    averageSalary: "$110,000 - $155,000",
    growthOutlook: "+28% (Very High)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Backend Development", "Technology"),
  },
  {
    id: "tech-fullstack",
    title: "Full Stack Development",
    sector: "Technology",
    tagline: "Bridge client interactions and server architectures into unified digital products.",
    overview: "Full Stack Engineers bridge frontend experiences, backend infrastructure, CI/CD deployment, and relational/NoSQL datastores.",
    averageSalary: "$115,000 - $160,000",
    growthOutlook: "+31% (Very High)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Full Stack Development", "Technology"),
  },
  {
    id: "tech-mobile",
    title: "Mobile App Development",
    sector: "Technology",
    tagline: "Design native and cross-platform mobile apps for iOS and Android ecosystems.",
    overview: "Mobile Developers engineer smooth, touch-optimized applications utilizing Swift, Kotlin, React Native, and Flutter.",
    averageSalary: "$100,000 - $145,000",
    growthOutlook: "+22% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Mobile App Development", "Technology"),
  },
  {
    id: "tech-cybersecurity",
    title: "Cybersecurity",
    sector: "Technology",
    tagline: "Protect enterprise networks, cloud workloads, and critical infrastructure from adversaries.",
    overview: "Cybersecurity professionals defend enterprise assets, conduct penetration testing, manage SOC pipelines, and audit cryptographic protocols.",
    averageSalary: "$115,000 - $165,000",
    growthOutlook: "+35% (Extremely High)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Cybersecurity", "Technology"),
  },
  {
    id: "tech-cloud",
    title: "Cloud Computing",
    sector: "Technology",
    tagline: "Design fault-tolerant, auto-scaling infrastructure on AWS, Azure, and Google Cloud.",
    overview: "Cloud Architects configure scalable serverless engines, multi-region container clusters, VPC networking, and cloud IAM security.",
    averageSalary: "$120,000 - $170,000",
    growthOutlook: "+29% (Very High)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Cloud Computing", "Technology"),
  },
  {
    id: "tech-devops",
    title: "DevOps",
    sector: "Technology",
    tagline: "Automate build, test, and release cycles with Infrastructure as Code and Kubernetes.",
    overview: "DevOps Specialists integrate development and IT operations through automated CI/CD pipelines, Docker, Kubernetes, and Terraform.",
    averageSalary: "$115,000 - $160,000",
    growthOutlook: "+27% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("DevOps", "Technology"),
  },
  {
    id: "tech-networking",
    title: "Networking",
    sector: "Technology",
    tagline: "Architect resilient IP backbones, software-defined networks, and high-speed routing.",
    overview: "Network Engineers manage routing protocols, BGP peering, optical switches, enterprise firewalls, and SD-WAN topologies.",
    averageSalary: "$90,000 - $130,000",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "22 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Networking", "Technology"),
  },
  {
    id: "tech-database",
    title: "Database Administration",
    sector: "Technology",
    tagline: "Ensure 99.999% availability, transaction safety, and query optimization at scale.",
    overview: "DBAs manage indexing strategies, write-ahead logging, replication topologies, automated backups, and database security.",
    averageSalary: "$95,000 - $135,000",
    growthOutlook: "+19% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Database Administration", "Technology"),
  },
  {
    id: "tech-gamedev",
    title: "Game Development",
    sector: "Technology",
    tagline: "Build immersive interactive experiences, physics engines, and real-time graphics.",
    overview: "Game Developers code real-time physics, graphics shaders, game AI, and multiplayer netcode using Unreal Engine and Unity.",
    averageSalary: "$85,000 - $130,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Game Development", "Technology"),
  },
  {
    id: "tech-blockchain",
    title: "Blockchain",
    sector: "Technology",
    tagline: "Architect smart contracts, decentralized consensus, and cryptographic applications.",
    overview: "Blockchain Engineers write verified Solidity smart contracts, build zero-knowledge proof circuits, and configure decentralized infrastructure.",
    averageSalary: "$120,000 - $175,000",
    growthOutlook: "+25% (High Growth)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Blockchain", "Technology"),
  },

  // 2. BUSINESS (7 Careers)
  {
    id: "biz-analyst",
    title: "Business Analyst",
    sector: "Business",
    tagline: "Translate complex business objectives into precise technical specifications.",
    overview: "Business Analysts evaluate organizational workflows, identify operational bottlenecks, and formulate actionable data-backed solutions.",
    averageSalary: "$80,000 - $115,000",
    growthOutlook: "+23% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "22 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Business Analyst", "Business"),
  },
  {
    id: "biz-pm",
    title: "Product Manager",
    sector: "Business",
    tagline: "Lead cross-functional teams to discover, define, and ship transformative products.",
    overview: "Product Managers own the product roadmap, analyze user feedback, orchestrate sprints, and balance market viability with engineering feasibility.",
    averageSalary: "$110,000 - $160,000",
    growthOutlook: "+28% (Very High)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Product Manager", "Business"),
  },
  {
    id: "biz-project-mgr",
    title: "Project Manager",
    sector: "Business",
    tagline: "Deliver complex strategic initiatives on schedule, within scope, and under budget.",
    overview: "Project Managers organize timelines, remove dependencies, manage risk registers, and ensure cross-functional execution.",
    averageSalary: "$90,000 - $130,000",
    growthOutlook: "+20% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Project Manager", "Business"),
  },
  {
    id: "biz-marketing",
    title: "Marketing",
    sector: "Business",
    tagline: "Orchestrate multi-channel acquisition campaigns and data-driven brand growth.",
    overview: "Marketing Strategists harness consumer psychology, performance marketing, content engines, and analytics to scale customer acquisition.",
    averageSalary: "$75,000 - $115,000",
    growthOutlook: "+22% (High Growth)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Marketing", "Business"),
  },
  {
    id: "biz-hr",
    title: "Human Resources",
    sector: "Business",
    tagline: "Cultivate high-performing talent ecosystems, culture, and organizational leadership.",
    overview: "HR Leaders steer talent acquisition, competitive compensation modeling, employee retention, and leadership development programs.",
    averageSalary: "$75,000 - $110,000",
    growthOutlook: "+19% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Human Resources", "Business"),
  },
  {
    id: "biz-entrepreneurship",
    title: "Entrepreneurship",
    sector: "Business",
    tagline: "Found disruptive ventures, achieve product-market fit, and scale resilient enterprises.",
    overview: "Founders discover unmet market demands, assemble founding teams, secure venture capital, and build repeatable business models.",
    averageSalary: "Variable / Equity Driven",
    growthOutlook: "+25% (High Growth)",
    difficultyRank: "SS-Rank",
    totalXp: 2300,
    estimatedDuration: "32 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Entrepreneurship", "Business"),
  },
  {
    id: "biz-operations",
    title: "Operations Management",
    sector: "Business",
    tagline: "Streamline global supply chains, resource logistics, and organizational efficiency.",
    overview: "Operations Managers optimize supply logistics, vendor agreements, inventory systems, and standard quality frameworks.",
    averageSalary: "$85,000 - $125,000",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Operations Management", "Business"),
  },

  // 3. FINANCE (5 Careers)
  {
    id: "fin-analyst",
    title: "Financial Analyst",
    sector: "Finance",
    tagline: "Conduct rigorous financial modeling, DCF valuations, and capital allocation analysis.",
    overview: "Financial Analysts forecast corporate revenue streams, build three-statement financial models, and evaluate capital expenditure opportunities.",
    averageSalary: "$85,000 - $125,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Financial Analyst", "Finance"),
  },
  {
    id: "fin-accounting",
    title: "Accounting",
    sector: "Finance",
    tagline: "Ensure GAAP/IFRS fiscal accuracy, regulatory compliance, and tax optimization.",
    overview: "Accountants and CPAs audit balance sheets, manage general ledger reconciliations, and structure tax governance for global entities.",
    averageSalary: "$75,000 - $110,000",
    growthOutlook: "+17% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Accounting", "Finance"),
  },
  {
    id: "fin-investment",
    title: "Investment Analysis",
    sector: "Finance",
    tagline: "Evaluate private equity, venture portfolios, and public asset allocation strategies.",
    overview: "Investment Analysts perform deep fundamental research, assess macro-economic trends, and structure portfolio allocation strategies.",
    averageSalary: "$100,000 - $160,000",
    growthOutlook: "+23% (High Growth)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Investment Analysis", "Finance"),
  },
  {
    id: "fin-banking",
    title: "Banking",
    sector: "Finance",
    tagline: "Execute M&A syndications, debt underwriting, and commercial credit facilities.",
    overview: "Bankers structure liquidity solutions, underwrite commercial mortgages, syndicate corporate loans, and manage client capital accounts.",
    averageSalary: "$90,000 - $145,000",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Banking", "Finance"),
  },
  {
    id: "fin-risk",
    title: "Risk Management",
    sector: "Finance",
    tagline: "Quantify market exposure, credit defaults, and systemic operational risks.",
    overview: "Risk Managers model Value-at-Risk (VaR), formulate hedging derivatives strategies, and audit institutional stress-test models.",
    averageSalary: "$95,000 - $140,000",
    growthOutlook: "+24% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Risk Management", "Finance"),
  },

  // 4. ENGINEERING (7 Careers)
  {
    id: "eng-civil",
    title: "Civil Engineering",
    sector: "Engineering",
    tagline: "Design resilient transportation grids, structural foundations, and mega-infrastructure.",
    overview: "Civil Engineers plan, design, and oversee construction of sustainable bridges, highways, water treatment plants, and public works.",
    averageSalary: "$85,000 - $125,000",
    growthOutlook: "+19% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Civil Engineering", "Engineering"),
  },
  {
    id: "eng-mechanical",
    title: "Mechanical Engineering",
    sector: "Engineering",
    tagline: "Innovate thermodynamic engines, CAD prototypes, and advanced electromechanical systems.",
    overview: "Mechanical Engineers design mechanical assemblies, perform finite element analysis (FEA), and manufacture precision machinery.",
    averageSalary: "$90,000 - $130,000",
    growthOutlook: "+20% (Steady)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Mechanical Engineering", "Engineering"),
  },
  {
    id: "eng-electrical",
    title: "Electrical Engineering",
    sector: "Engineering",
    tagline: "Engineer high-voltage power distribution, smart grids, and renewable energy circuits.",
    overview: "Electrical Engineers design transformer systems, renewable energy inverters, PCB layouts, and industrial power distribution grids.",
    averageSalary: "$92,000 - $135,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Electrical Engineering", "Engineering"),
  },
  {
    id: "eng-electronics",
    title: "Electronics Engineering",
    sector: "Engineering",
    tagline: "Design microcontrollers, semiconductor chips, and high-frequency communication circuits.",
    overview: "Electronics Engineers develop embedded firmware, VLSI semiconductor microchips, IoT transceivers, and digital signal processors.",
    averageSalary: "$95,000 - $140,000",
    growthOutlook: "+23% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Electronics Engineering", "Engineering"),
  },
  {
    id: "eng-chemical",
    title: "Chemical Engineering",
    sector: "Engineering",
    tagline: "Scale molecular reactions, industrial polymers, and green biochemical synthesis.",
    overview: "Chemical Engineers transform raw materials into scalable pharmaceuticals, battery chemistries, and sustainable industrial polymers.",
    averageSalary: "$95,000 - $138,000",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Chemical Engineering", "Engineering"),
  },
  {
    id: "eng-robotics",
    title: "Robotics",
    sector: "Engineering",
    tagline: "Combine kinematic actuators, computer vision, and autonomous control algorithms.",
    overview: "Robotics Engineers build autonomous mobile robots (AMRs), industrial robotic arms, SLAM navigation systems, and sensor fusion pipelines.",
    averageSalary: "$105,000 - $155,000",
    growthOutlook: "+32% (Very High)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "30 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Robotics", "Engineering"),
  },
  {
    id: "eng-aerospace",
    title: "Aerospace Engineering",
    sector: "Engineering",
    tagline: "Design supersonic aerodynamics, rocket propulsion, and orbital satellite systems.",
    overview: "Aerospace Engineers design launch vehicles, computational fluid dynamics (CFD) airfoils, orbital avionics, and deep-space probes.",
    averageSalary: "$110,000 - $160,000",
    growthOutlook: "+22% (High Growth)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "30 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Aerospace Engineering", "Engineering"),
  },

  // 5. HEALTHCARE (6 Careers)
  {
    id: "health-medicine",
    title: "Medicine",
    sector: "Healthcare",
    tagline: "Diagnose acute pathologies, prescribe clinical therapies, and safeguard human lives.",
    overview: "Physicians and clinicians combine diagnostic science, clinical pharmacology, and empathetic care to treat human ailments.",
    averageSalary: "$200,000 - $350,000+",
    growthOutlook: "+24% (High Growth)",
    difficultyRank: "SS-Rank",
    totalXp: 2300,
    estimatedDuration: "36 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Medicine", "Healthcare"),
  },
  {
    id: "health-nursing",
    title: "Nursing",
    sector: "Healthcare",
    tagline: "Deliver critical patient care, triage emergency cases, and clinical leadership.",
    overview: "Registered Nurses and Nurse Practitioners administer critical medications, coordinate hospital care plans, and advocate for patient recovery.",
    averageSalary: "$78,000 - $115,000",
    growthOutlook: "+26% (Very High)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Nursing", "Healthcare"),
  },
  {
    id: "health-pharmacy",
    title: "Pharmacy",
    sector: "Healthcare",
    tagline: "Ensure therapeutic drug safety, clinical compounding, and pharmacokinetics.",
    overview: "Pharmacists analyze drug interactions, optimize therapeutic dosage regimens, and advise clinicians on advanced pharmacology.",
    averageSalary: "$115,000 - $145,000",
    growthOutlook: "+16% (Steady)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Pharmacy", "Healthcare"),
  },
  {
    id: "health-biotech",
    title: "Biotechnology",
    sector: "Healthcare",
    tagline: "Engineer CRISPR gene therapies, recombinant proteins, and diagnostic assays.",
    overview: "Biotechnologists conduct recombinant DNA synthesis, develop monoclonal antibodies, and manufacture clinical biotherapeutics.",
    averageSalary: "$90,000 - $135,000",
    growthOutlook: "+27% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Biotechnology", "Healthcare"),
  },
  {
    id: "health-lab",
    title: "Medical Laboratory Science",
    sector: "Healthcare",
    tagline: "Perform hematology diagnostics, PCR sequencing, and clinical pathology tests.",
    overview: "Medical Laboratory Scientists analyze patient biological specimens, operate automated immunoassay analyzers, and detect cellular abnormalities.",
    averageSalary: "$65,000 - $95,000",
    growthOutlook: "+19% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "22 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Medical Laboratory Science", "Healthcare"),
  },
  {
    id: "health-public",
    title: "Public Health",
    sector: "Healthcare",
    tagline: "Track epidemiological vectors, health policy, and community disease prevention.",
    overview: "Public Health Specialists design vaccine distribution strategies, study global epidemiological data, and formulate municipal health policy.",
    averageSalary: "$70,000 - $105,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Public Health", "Healthcare"),
  },

  // 6. CREATIVE (6 Careers)
  {
    id: "creat-uiux",
    title: "UI/UX Design",
    sector: "Creative",
    tagline: "Craft intuitive user journeys, accessible design systems, and delightful interfaces.",
    overview: "Product Designers conduct user research, build interactive Figma prototypes, and establish scalable design tokens.",
    averageSalary: "$90,000 - $135,000",
    growthOutlook: "+25% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("UI/UX Design", "Creative"),
  },
  {
    id: "creat-graphic",
    title: "Graphic Design",
    sector: "Creative",
    tagline: "Shape iconic visual identities, typography systems, and high-impact brand media.",
    overview: "Graphic Designers craft visual brand languages, packaging systems, editorial publications, and digital campaign collateral.",
    averageSalary: "$60,000 - $90,000",
    growthOutlook: "+16% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Graphic Design", "Creative"),
  },
  {
    id: "creat-animation",
    title: "Animation",
    sector: "Creative",
    tagline: "Breathe life into 2D and 3D characters, kinetic motion graphics, and visual effects.",
    overview: "Animators choreograph character keyframes, rig 3D skeletons, and produce dynamic motion graphics for cinema, web, and games.",
    averageSalary: "$70,000 - $110,000",
    growthOutlook: "+20% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Animation", "Creative"),
  },
  {
    id: "creat-video",
    title: "Video Editing",
    sector: "Creative",
    tagline: "Sculpt cinematic narrative pacing, color grading, and broadcast-ready audio design.",
    overview: "Video Editors curate visual narratives, color grade raw log footage, synchronize multi-track audio, and deliver broadcast media.",
    averageSalary: "$65,000 - $100,000",
    growthOutlook: "+22% (High Growth)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Video Editing", "Creative"),
  },
  {
    id: "creat-game-art",
    title: "Game Art",
    sector: "Creative",
    tagline: "Model PBR 3D environments, character concept art, and photorealistic textures.",
    overview: "Game Artists sculpt high-poly models in ZBrush, bake PBR textures in Substance Painter, and assemble environments in Unreal Engine.",
    averageSalary: "$75,000 - $115,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "26 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Game Art", "Creative"),
  },
  {
    id: "creat-digital-media",
    title: "Digital Media",
    sector: "Creative",
    tagline: "Produce viral digital content, interactive podcasts, and streaming broadcast campaigns.",
    overview: "Digital Media Producers manage multi-platform content channels, interactive livestream production, and community engagement formats.",
    averageSalary: "$65,000 - $95,000",
    growthOutlook: "+23% (High Growth)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Digital Media", "Creative"),
  },

  // 7. OTHER SECTORS (8 Careers)
  {
    id: "other-law",
    title: "Law",
    sector: "Other Sectors",
    tagline: "Champion client rights, draft watertight contracts, and litigate statutory disputes.",
    overview: "Attorneys and legal counsels master jurisprudence, construct appellate arguments, negotiate corporate mergers, and advise on regulation.",
    averageSalary: "$120,000 - $210,000+",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "S-Rank",
    totalXp: 2300,
    estimatedDuration: "32 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Law", "Other Sectors"),
  },
  {
    id: "other-teaching",
    title: "Teaching and Education",
    sector: "Other Sectors",
    tagline: "Inspire next-generation minds through pedagogy, curriculum design, and mentorship.",
    overview: "Educators cultivate critical inquiry, deliver structured learning modules, and support academic, emotional, and social development.",
    averageSalary: "$55,000 - $85,000",
    growthOutlook: "+17% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Teaching and Education", "Other Sectors"),
  },
  {
    id: "other-govt",
    title: "Government Services",
    sector: "Other Sectors",
    tagline: "Formulate public policy, diplomatic foreign affairs, and civic administration.",
    overview: "Public Servants implement municipal legislation, administer public utility frameworks, and ensure democratic civic operations.",
    averageSalary: "$70,000 - $110,000",
    growthOutlook: "+15% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Government Services", "Other Sectors"),
  },
  {
    id: "other-agri",
    title: "Agriculture",
    sector: "Other Sectors",
    tagline: "Optimize precision agronomy, soil microbiome health, and global food security.",
    overview: "Agricultural Scientists utilize satellite telemetry, automated drip irrigation, and genetic seed selection to maximize crop yields.",
    averageSalary: "$68,000 - $105,000",
    growthOutlook: "+19% (Steady)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "22 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Agriculture", "Other Sectors"),
  },
  {
    id: "other-manufacturing",
    title: "Manufacturing",
    sector: "Other Sectors",
    tagline: "Automate assembly lines with Six Sigma precision and industrial robotics.",
    overview: "Manufacturing Engineers lead high-volume production plants, audit quality tolerances, and reduce supply cycle times.",
    averageSalary: "$80,000 - $120,000",
    growthOutlook: "+18% (Steady)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Manufacturing", "Other Sectors"),
  },
  {
    id: "other-hospitality",
    title: "Hospitality",
    sector: "Other Sectors",
    tagline: "Curate world-class luxury guest experiences, international resorts, and tourism.",
    overview: "Hospitality Managers orchestrate five-star guest relations, culinary logistics, luxury hotel operations, and international revenue management.",
    averageSalary: "$60,000 - $95,000",
    growthOutlook: "+22% (High Growth)",
    difficultyRank: "C-Rank",
    totalXp: 2300,
    estimatedDuration: "20 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Hospitality", "Other Sectors"),
  },
  {
    id: "other-env",
    title: "Environmental Science",
    sector: "Other Sectors",
    tagline: "Mitigate carbon emissions, restore natural ecosystems, and lead climate solutions.",
    overview: "Environmental Scientists model climate feedback loops, audit biodiversity conservation, and enforce global environmental standards.",
    averageSalary: "$72,000 - $110,000",
    growthOutlook: "+25% (High Growth)",
    difficultyRank: "B-Rank",
    totalXp: 2300,
    estimatedDuration: "24 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Environmental Science", "Other Sectors"),
  },
  {
    id: "other-research",
    title: "Research",
    sector: "Other Sectors",
    tagline: "Expand human knowledge through empirical experimentation, peer review, and discovery.",
    overview: "Scientific Researchers formulate novel hypotheses, secure research grants, author peer-reviewed publications, and mentor scholars.",
    averageSalary: "$80,000 - $130,000",
    growthOutlook: "+21% (High Growth)",
    difficultyRank: "A-Rank",
    totalXp: 2300,
    estimatedDuration: "28 Weeks",
    achievements: STANDARD_ACHIEVEMENTS,
    nodes: buildStandardNodes("Research", "Other Sectors"),
  },
];
