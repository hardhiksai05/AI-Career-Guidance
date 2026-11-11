export const APP_CONFIG = {
  name: "AI Career Guidance",
  tagline: "Discover Your Potential. Explore Your Future. Build Your Career.",
  heroHeadline: "Discover Your Future. Build Your Career.",
  heroDescription:
    "Your personal AI-powered career mentor. Discover your strengths, explore career opportunities and build a personalized learning roadmap to achieve your professional goals.",
  mission:
    "To help students make informed career decisions by combining intelligent technology, personalized learning guidance and career exploration.",
};

export const CAREER_DOMAINS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Software Development",
  "Web Development",
  "Cybersecurity",
  "Cloud Computing",
  "Business and Management",
  "Finance",
  "Healthcare",
  "Engineering",
  "Design and Creative Fields",
  "Research",
  "Not Sure Yet",
] as const;

export const PRIMARY_GOALS = [
  "Secure a high-impact internship",
  "Land a full-time entry level role",
  "Transition into a high-demand tech specialization",
  "Prepare for higher education / master's degree",
  "Build hands-on industry-standard portfolio projects",
  "Identify my career strengths from scratch",
] as const;

export const LEARNING_STYLES = [
  "Visual & Project-Based (Hands-on coding, building projects)",
  "Structured Coursework (Video lectures, modules & quizzes)",
  "Reading & Documentation (Deep dives, whitepapers & books)",
  "Collaborative & Mentorship (Peer programming & community)",
] as const;

export const TARGET_OUTCOMES = [
  "Job",
  "Internship",
  "Higher Education",
  "Skill Development",
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
];

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "AI Career Chatbot", href: "/dashboard/chatbot", icon: "BotMessageSquare" },
  { label: "Student Profile", href: "/dashboard/profile", icon: "UserCircle" },
  { label: "Career Recommendations", href: "/dashboard/recommendations", icon: "Sparkles" },
  { label: "Learning Roadmaps", href: "/dashboard/roadmaps", icon: "Compass" },
  { label: "Career Opportunities", href: "/dashboard/opportunities", icon: "Briefcase" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export const DEMO_RECOMMENDATIONS = [
  {
    id: "rec-1",
    title: "AI / Machine Learning Engineer",
    domain: "Artificial Intelligence",
    matchScore: 94,
    description: "Design and train deep neural networks, optimize transformer models, and deploy scalable ML inference systems.",
    averageSalary: "$125,000 - $165,000",
    growthRate: "+38% (High Growth)",
    topSkills: ["Python", "PyTorch", "Transformers", "LLMs", "Vector DBs", "Docker"],
    roadmapCount: 4,
  },
  {
    id: "rec-2",
    title: "Full Stack Cloud Architect",
    domain: "Software Development",
    matchScore: 89,
    description: "Architect end-to-end distributed web applications with serverless computing, Next.js, microservices and Kubernetes.",
    averageSalary: "$115,000 - $155,000",
    growthRate: "+26% (Very High)",
    topSkills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS / GCP", "CI/CD"],
    roadmapCount: 5,
  },
  {
    id: "rec-3",
    title: "Data Intelligence & Analytics Lead",
    domain: "Data Science",
    matchScore: 83,
    description: "Extract actionable predictive insights from complex multi-dimensional datasets to guide strategic organizational moves.",
    averageSalary: "$105,000 - $140,000",
    growthRate: "+28% (Growing)",
    topSkills: ["Python", "SQL", "Tableau", "Pandas", "Scikit-Learn", "A/B Testing"],
    roadmapCount: 3,
  },
];

export const DEMO_ROADMAPS = [
  {
    id: "rm-1",
    title: "Modern AI Engineer Roadmap 2026",
    domain: "Artificial Intelligence",
    description: "From Python fundamentals and Math for ML to Generative AI architectures, RAG systems, and production model serving.",
    estimatedWeeks: 16,
    completedStages: 2,
    totalStages: 6,
    difficulty: "Intermediate" as const,
    skillsCovered: ["Linear Algebra", "PyTorch", "Hugging Face", "LangChain", "Vector Indexing"],
  },
  {
    id: "rm-2",
    title: "Next.js & Full-Stack Systems",
    domain: "Software Development",
    description: "Master React 19, Server Components, TypeScript, relational databases, caching, and enterprise cloud deployment.",
    estimatedWeeks: 12,
    completedStages: 4,
    totalStages: 6,
    difficulty: "Beginner" as const,
    skillsCovered: ["TypeScript", "Next.js App Router", "Prisma", "Tailwind CSS", "OAuth"],
  },
  {
    id: "rm-3",
    title: "Cybersecurity & Cloud Defense",
    domain: "Cybersecurity",
    description: "Foundational network defense, threat modeling, zero-trust infrastructure, and DevSecOps pipelines.",
    estimatedWeeks: 14,
    completedStages: 1,
    totalStages: 5,
    difficulty: "Advanced" as const,
    skillsCovered: ["Network Security", "Linux Hardening", "Penetration Testing", "IAM", "SOC"],
  },
];

export const DEMO_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Junior AI Research Intern",
    company: "Anthropic Labs & AI Center",
    type: "Internship" as const,
    location: "San Francisco, CA (Hybrid)",
    mode: "Hybrid" as const,
    deadline: "Dec 15, 2026",
    matchScore: 95,
    tags: ["PyTorch", "Reinforcement Learning", "Evaluation", "Python"],
  },
  {
    id: "opp-2",
    title: "Graduate Software Engineer (Cloud)",
    company: "Stripe Platform",
    type: "Full-Time" as const,
    location: "Seattle, WA / Remote",
    mode: "Remote" as const,
    deadline: "Jan 10, 2027",
    matchScore: 91,
    tags: ["TypeScript", "Distributed Systems", "Go", "Docker"],
  },
  {
    id: "opp-3",
    title: "Data Science Fellowship 2026",
    company: "Google DeepMind Open Program",
    type: "Fellowship" as const,
    location: "London, UK / Remote",
    mode: "Remote" as const,
    deadline: "Nov 30, 2026",
    matchScore: 88,
    tags: ["Data Modeling", "Deep Learning", "TensorFlow", "Statistics"],
  },
];

