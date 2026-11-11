import { RoadmapData } from "../types";

/**
 * Auto-generated comprehensive roadmaps for EEE branch courses.
 * Total specializations: 11
 */
export const ROADMAPS_EEE: Record<string, RoadmapData> = {
  "roadmap-course-eee": {
    "id": "roadmap-course-eee",
    "title": "Electrical and Electronics Engineering Roadmap",
    "targetRoleOrCourse": "Electrical and Electronics Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical and Electronics Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Network Analysis & Circuit Theory, Electromagnetic Fields & Dielectrics, Electrical Machines (Transformers), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EEE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical and Electronics Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-eee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EEE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EEE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-eee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical and Electronics Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EEE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical and Electronics Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EEE",
        "description": "Deep dive into the primary academic subjects: Network Analysis & Circuit Theory, Electromagnetic Fields & Dielectrics, and Electrical Machines (Transformers.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p2-subject-1",
            "title": "Network Analysis & Circuit Theory: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Network Analysis & Circuit Theory.",
            "learningObjectives": [
              "Analyze the governing equations of Network Analysis & Circuit Theory",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-eee-p1-math"
            ],
            "skillsGained": [
              "Network Analysis & Circuit Theory analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Network Analysis & Circuit Theory.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Network Analysis & Circuit Theory formulation."
            ]
          },
          {
            "id": "course-eee-p2-subject-2",
            "title": "Electromagnetic Fields & Dielectrics: System Design & Mechanics",
            "description": "Comprehensive exploration of Electromagnetic Fields & Dielectrics, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Electromagnetic Fields & Dielectrics",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Electromagnetic Fields & Dielectrics modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Electromagnetic Fields & Dielectrics application."
            ]
          },
          {
            "id": "course-eee-p2-subject-3",
            "title": "Electrical Machines (Transformers: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Electrical Machines (Transformers.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Electrical Machines (Transformers setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-eee-p2-subject-2"
            ],
            "skillsGained": [
              "Electrical Machines (Transformers dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Electrical Machines (Transformers and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EEE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Power Flow Simulation in ETAP / MATLAB",
              "Motor Drive Speed Control",
              "Single Line Diagram (SLD) Design",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-eee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Induction",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical and Electronics Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p4-specialization-core",
            "title": "Induction: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Induction, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-eee-p2-subject-3",
              "course-eee-p3-tools"
            ],
            "skillsGained": [
              "Induction engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-eee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EEE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical and Electronics Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical and Electronics Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EEE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EEE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EEE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-eee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-eee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p6-minor-project",
            "title": "Intermediate Applied Project in EEE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-eee-p3-tools",
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Power Flow Simulation in ETAP / MATLAB",
              "Motor Drive Speed Control",
              "Single Line Diagram (SLD) Design",
              "Switchgear & Relay Coordination"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-eee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-eee-p6-minor-project",
              "course-eee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EEE."
            ]
          },
          {
            "id": "course-eee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EEE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical and Electronics Engineering."
            ]
          }
        ]
      }
    ]
  },
  "course-eee": {
    "id": "roadmap-course-eee",
    "title": "Electrical and Electronics Engineering Roadmap",
    "targetRoleOrCourse": "Electrical and Electronics Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical and Electronics Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Network Analysis & Circuit Theory, Electromagnetic Fields & Dielectrics, Electrical Machines (Transformers), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EEE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical and Electronics Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-eee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EEE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EEE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-eee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical and Electronics Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EEE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical and Electronics Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EEE",
        "description": "Deep dive into the primary academic subjects: Network Analysis & Circuit Theory, Electromagnetic Fields & Dielectrics, and Electrical Machines (Transformers.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p2-subject-1",
            "title": "Network Analysis & Circuit Theory: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Network Analysis & Circuit Theory.",
            "learningObjectives": [
              "Analyze the governing equations of Network Analysis & Circuit Theory",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-eee-p1-math"
            ],
            "skillsGained": [
              "Network Analysis & Circuit Theory analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Network Analysis & Circuit Theory.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Network Analysis & Circuit Theory formulation."
            ]
          },
          {
            "id": "course-eee-p2-subject-2",
            "title": "Electromagnetic Fields & Dielectrics: System Design & Mechanics",
            "description": "Comprehensive exploration of Electromagnetic Fields & Dielectrics, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Electromagnetic Fields & Dielectrics",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Electromagnetic Fields & Dielectrics modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Electromagnetic Fields & Dielectrics application."
            ]
          },
          {
            "id": "course-eee-p2-subject-3",
            "title": "Electrical Machines (Transformers: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Electrical Machines (Transformers.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Electrical Machines (Transformers setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-eee-p2-subject-2"
            ],
            "skillsGained": [
              "Electrical Machines (Transformers dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Electrical Machines (Transformers and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EEE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Power Flow Simulation in ETAP / MATLAB",
              "Motor Drive Speed Control",
              "Single Line Diagram (SLD) Design",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-eee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Induction",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical and Electronics Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-eee-p4-specialization-core",
            "title": "Induction: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Induction, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-eee-p2-subject-3",
              "course-eee-p3-tools"
            ],
            "skillsGained": [
              "Induction engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-eee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EEE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical and Electronics Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical and Electronics Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EEE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EEE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EEE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-eee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-eee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p6-minor-project",
            "title": "Intermediate Applied Project in EEE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-eee-p3-tools",
              "course-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Power Flow Simulation in ETAP / MATLAB",
              "Motor Drive Speed Control",
              "Single Line Diagram (SLD) Design",
              "Switchgear & Relay Coordination"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-eee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-eee-p6-minor-project",
              "course-eee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical and Electronics Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-eee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical and Electronics Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical and Electronics Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EEE."
            ]
          },
          {
            "id": "course-eee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EEE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical and Electronics Engineering."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-ee": {
    "id": "roadmap-course-ee",
    "title": "Electrical Engineering Roadmap",
    "targetRoleOrCourse": "Electrical Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power System Analysis & Stability, High Voltage Engineering & Testing, Switchgear and Protective Relaying), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-ee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-ee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EE",
        "description": "Deep dive into the primary academic subjects: Power System Analysis & Stability, High Voltage Engineering & Testing, and Switchgear and Protective Relaying.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p2-subject-1",
            "title": "Power System Analysis & Stability: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power System Analysis & Stability.",
            "learningObjectives": [
              "Analyze the governing equations of Power System Analysis & Stability",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-ee-p1-math"
            ],
            "skillsGained": [
              "Power System Analysis & Stability analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power System Analysis & Stability.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power System Analysis & Stability formulation."
            ]
          },
          {
            "id": "course-ee-p2-subject-2",
            "title": "High Voltage Engineering & Testing: System Design & Mechanics",
            "description": "Comprehensive exploration of High Voltage Engineering & Testing, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in High Voltage Engineering & Testing",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-ee-p2-subject-1"
            ],
            "skillsGained": [
              "High Voltage Engineering & Testing modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark High Voltage Engineering & Testing application."
            ]
          },
          {
            "id": "course-ee-p2-subject-3",
            "title": "Switchgear and Protective Relaying: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Switchgear and Protective Relaying.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Switchgear and Protective Relaying setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-ee-p2-subject-2"
            ],
            "skillsGained": [
              "Switchgear and Protective Relaying dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Switchgear and Protective Relaying and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-ee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Substation Layout Design",
              "Fault Current Calculation (Symmetrical Components)",
              "High-Voltage Insulation Coordination",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-ee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Electrical Machine Design Principles",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p4-specialization-core",
            "title": "Electrical Machine Design Principles: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Electrical Machine Design Principles, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-ee-p2-subject-3",
              "course-ee-p3-tools"
            ],
            "skillsGained": [
              "Electrical Machine Design Principles engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-ee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-ee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-ee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p6-minor-project",
            "title": "Intermediate Applied Project in EE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-ee-p3-tools",
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Substation Layout Design",
              "Fault Current Calculation (Symmetrical Components)",
              "High-Voltage Insulation Coordination"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-ee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-ee-p6-minor-project",
              "course-ee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EE."
            ]
          },
          {
            "id": "course-ee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical Engineering."
            ]
          }
        ]
      }
    ]
  },
  "course-ee": {
    "id": "roadmap-course-ee",
    "title": "Electrical Engineering Roadmap",
    "targetRoleOrCourse": "Electrical Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power System Analysis & Stability, High Voltage Engineering & Testing, Switchgear and Protective Relaying), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-ee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-ee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EE",
        "description": "Deep dive into the primary academic subjects: Power System Analysis & Stability, High Voltage Engineering & Testing, and Switchgear and Protective Relaying.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p2-subject-1",
            "title": "Power System Analysis & Stability: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power System Analysis & Stability.",
            "learningObjectives": [
              "Analyze the governing equations of Power System Analysis & Stability",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-ee-p1-math"
            ],
            "skillsGained": [
              "Power System Analysis & Stability analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power System Analysis & Stability.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power System Analysis & Stability formulation."
            ]
          },
          {
            "id": "course-ee-p2-subject-2",
            "title": "High Voltage Engineering & Testing: System Design & Mechanics",
            "description": "Comprehensive exploration of High Voltage Engineering & Testing, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in High Voltage Engineering & Testing",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-ee-p2-subject-1"
            ],
            "skillsGained": [
              "High Voltage Engineering & Testing modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark High Voltage Engineering & Testing application."
            ]
          },
          {
            "id": "course-ee-p2-subject-3",
            "title": "Switchgear and Protective Relaying: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Switchgear and Protective Relaying.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Switchgear and Protective Relaying setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-ee-p2-subject-2"
            ],
            "skillsGained": [
              "Switchgear and Protective Relaying dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Switchgear and Protective Relaying and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-ee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Substation Layout Design",
              "Fault Current Calculation (Symmetrical Components)",
              "High-Voltage Insulation Coordination",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-ee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Electrical Machine Design Principles",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ee-p4-specialization-core",
            "title": "Electrical Machine Design Principles: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Electrical Machine Design Principles, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-ee-p2-subject-3",
              "course-ee-p3-tools"
            ],
            "skillsGained": [
              "Electrical Machine Design Principles engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-ee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-ee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-ee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p6-minor-project",
            "title": "Intermediate Applied Project in EE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-ee-p3-tools",
              "course-ee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Substation Layout Design",
              "Fault Current Calculation (Symmetrical Components)",
              "High-Voltage Insulation Coordination"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-ee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-ee-p6-minor-project",
              "course-ee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EE."
            ]
          },
          {
            "id": "course-ee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical Engineering."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-power-systems": {
    "id": "roadmap-course-power-systems",
    "title": "Power Systems Engineering Roadmap",
    "targetRoleOrCourse": "Power Systems Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Power Systems Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power System Operation and Control, HVDC Transmission & FACTS Devices, Power Quality Analysis & Harmonics), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for POWER",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Power Systems Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-power-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for POWER",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Power Systems Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to POWER",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-power-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Power Systems Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Power Systems Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in POWER",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Power Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of POWER",
        "description": "Deep dive into the primary academic subjects: Power System Operation and Control, HVDC Transmission & FACTS Devices, and Power Quality Analysis & Harmonics.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p2-subject-1",
            "title": "Power System Operation and Control: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power System Operation and Control.",
            "learningObjectives": [
              "Analyze the governing equations of Power System Operation and Control",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-power-systems-p1-math"
            ],
            "skillsGained": [
              "Power System Operation and Control analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power System Operation and Control.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power System Operation and Control formulation."
            ]
          },
          {
            "id": "course-power-systems-p2-subject-2",
            "title": "HVDC Transmission & FACTS Devices: System Design & Mechanics",
            "description": "Comprehensive exploration of HVDC Transmission & FACTS Devices, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in HVDC Transmission & FACTS Devices",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-1"
            ],
            "skillsGained": [
              "HVDC Transmission & FACTS Devices modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark HVDC Transmission & FACTS Devices application."
            ]
          },
          {
            "id": "course-power-systems-p2-subject-3",
            "title": "Power Quality Analysis & Harmonics: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Power Quality Analysis & Harmonics.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Power Quality Analysis & Harmonics setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Power Quality Analysis & Harmonics dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Power Quality Analysis & Harmonics and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for POWER",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Power Systems Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Load Flow Analysis (Newton-Raphson)",
              "FACTS Sizing for Voltage Stability",
              "ETAP Power Grid Modeling",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-power-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & SCADA and Energy Management Systems (EMS)",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Power Systems Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p4-specialization-core",
            "title": "SCADA and Energy Management Systems (EMS): Architecture, Standards & Implementation",
            "description": "Detailed exploration of SCADA and Energy Management Systems (EMS), examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-3",
              "course-power-systems-p3-tools"
            ],
            "skillsGained": [
              "SCADA and Energy Management Systems (EMS) engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-power-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for POWER systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Power Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Power Systems Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in POWER",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Power Systems Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional POWER processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional POWER models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-power-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-power-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p6-minor-project",
            "title": "Intermediate Applied Project in POWER",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Power Systems Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-power-systems-p3-tools",
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Load Flow Analysis (Newton-Raphson)",
              "FACTS Sizing for Voltage Stability",
              "ETAP Power Grid Modeling"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-power-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-power-systems-p6-minor-project",
              "course-power-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Power Systems Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of POWER."
            ]
          },
          {
            "id": "course-power-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in POWER",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Power Systems Engineering."
            ]
          }
        ]
      }
    ]
  },
  "course-power-systems": {
    "id": "roadmap-course-power-systems",
    "title": "Power Systems Engineering Roadmap",
    "targetRoleOrCourse": "Power Systems Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Power Systems Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power System Operation and Control, HVDC Transmission & FACTS Devices, Power Quality Analysis & Harmonics), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for POWER",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Power Systems Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-power-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for POWER",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Power Systems Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to POWER",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-power-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Power Systems Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Power Systems Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in POWER",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Power Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of POWER",
        "description": "Deep dive into the primary academic subjects: Power System Operation and Control, HVDC Transmission & FACTS Devices, and Power Quality Analysis & Harmonics.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p2-subject-1",
            "title": "Power System Operation and Control: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power System Operation and Control.",
            "learningObjectives": [
              "Analyze the governing equations of Power System Operation and Control",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-power-systems-p1-math"
            ],
            "skillsGained": [
              "Power System Operation and Control analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power System Operation and Control.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power System Operation and Control formulation."
            ]
          },
          {
            "id": "course-power-systems-p2-subject-2",
            "title": "HVDC Transmission & FACTS Devices: System Design & Mechanics",
            "description": "Comprehensive exploration of HVDC Transmission & FACTS Devices, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in HVDC Transmission & FACTS Devices",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-1"
            ],
            "skillsGained": [
              "HVDC Transmission & FACTS Devices modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark HVDC Transmission & FACTS Devices application."
            ]
          },
          {
            "id": "course-power-systems-p2-subject-3",
            "title": "Power Quality Analysis & Harmonics: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Power Quality Analysis & Harmonics.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Power Quality Analysis & Harmonics setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Power Quality Analysis & Harmonics dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Power Quality Analysis & Harmonics and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for POWER",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Power Systems Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Load Flow Analysis (Newton-Raphson)",
              "FACTS Sizing for Voltage Stability",
              "ETAP Power Grid Modeling",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-power-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & SCADA and Energy Management Systems (EMS)",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Power Systems Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-systems-p4-specialization-core",
            "title": "SCADA and Energy Management Systems (EMS): Architecture, Standards & Implementation",
            "description": "Detailed exploration of SCADA and Energy Management Systems (EMS), examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-power-systems-p2-subject-3",
              "course-power-systems-p3-tools"
            ],
            "skillsGained": [
              "SCADA and Energy Management Systems (EMS) engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-power-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for POWER systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Power Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Power Systems Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in POWER",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Power Systems Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional POWER processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional POWER models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-power-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-power-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p6-minor-project",
            "title": "Intermediate Applied Project in POWER",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Power Systems Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-power-systems-p3-tools",
              "course-power-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Load Flow Analysis (Newton-Raphson)",
              "FACTS Sizing for Voltage Stability",
              "ETAP Power Grid Modeling"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-power-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-power-systems-p6-minor-project",
              "course-power-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Power Systems Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Power Systems Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of POWER."
            ]
          },
          {
            "id": "course-power-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in POWER",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Power Systems Engineering."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-power-electronics": {
    "id": "roadmap-course-power-electronics",
    "title": "Power Electronics Roadmap",
    "targetRoleOrCourse": "Power Electronics",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Power Electronics",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power Semiconductor Devices (IGBT, SiC, GaN)), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for PE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Power Electronics.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-power-electronics-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for PE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Power Electronics.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to PE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-power-electronics-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Power Electronics",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Power Electronics.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in PE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Power Electronics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of PE",
        "description": "Deep dive into the primary academic subjects: Power Semiconductor Devices (IGBT, SiC, and GaN).",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p2-subject-1",
            "title": "Power Semiconductor Devices (IGBT: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power Semiconductor Devices (IGBT.",
            "learningObjectives": [
              "Analyze the governing equations of Power Semiconductor Devices (IGBT",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-power-electronics-p1-math"
            ],
            "skillsGained": [
              "Power Semiconductor Devices (IGBT analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power Semiconductor Devices (IGBT.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power Semiconductor Devices (IGBT formulation."
            ]
          },
          {
            "id": "course-power-electronics-p2-subject-2",
            "title": "SiC: System Design & Mechanics",
            "description": "Comprehensive exploration of SiC, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in SiC",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-1"
            ],
            "skillsGained": [
              "SiC modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark SiC application."
            ]
          },
          {
            "id": "course-power-electronics-p2-subject-3",
            "title": "GaN): Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within GaN).",
            "learningObjectives": [
              "Model transient and steady-state behaviors of GaN) setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-2"
            ],
            "skillsGained": [
              "GaN) dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for GaN) and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for PE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Power Electronics.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Converter Simulation in PLECS / MATLAB Simscape",
              "Gate Driver Circuit Design",
              "PCB Design for High di/dt and dv/dt",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-power-electronics-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Switched-Mode Power Supplies (SMPS)",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Power Electronics.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p4-specialization-core",
            "title": "Switched-Mode Power Supplies (SMPS): Architecture, Standards & Implementation",
            "description": "Detailed exploration of Switched-Mode Power Supplies (SMPS), examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-3",
              "course-power-electronics-p3-tools"
            ],
            "skillsGained": [
              "Switched-Mode Power Supplies (SMPS) engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-power-electronics-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for PE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Power Electronics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Power Electronics.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in PE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Power Electronics.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional PE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional PE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-power-electronics-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-power-electronics-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p6-minor-project",
            "title": "Intermediate Applied Project in PE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Power Electronics.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-power-electronics-p3-tools",
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Converter Simulation in PLECS / MATLAB Simscape",
              "Gate Driver Circuit Design",
              "PCB Design for High di/dt and dv/dt"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-power-electronics-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-power-electronics-p6-minor-project",
              "course-power-electronics-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Power Electronics.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Power Electronics Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of PE."
            ]
          },
          {
            "id": "course-power-electronics-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in PE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Power Electronics."
            ]
          }
        ]
      }
    ]
  },
  "course-power-electronics": {
    "id": "roadmap-course-power-electronics",
    "title": "Power Electronics Roadmap",
    "targetRoleOrCourse": "Power Electronics",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Power Electronics",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Power Semiconductor Devices (IGBT, SiC, GaN)), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for PE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Power Electronics.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-power-electronics-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for PE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Power Electronics.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to PE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-power-electronics-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Power Electronics",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Power Electronics.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in PE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Power Electronics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of PE",
        "description": "Deep dive into the primary academic subjects: Power Semiconductor Devices (IGBT, SiC, and GaN).",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p2-subject-1",
            "title": "Power Semiconductor Devices (IGBT: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Power Semiconductor Devices (IGBT.",
            "learningObjectives": [
              "Analyze the governing equations of Power Semiconductor Devices (IGBT",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-power-electronics-p1-math"
            ],
            "skillsGained": [
              "Power Semiconductor Devices (IGBT analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Power Semiconductor Devices (IGBT.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Power Semiconductor Devices (IGBT formulation."
            ]
          },
          {
            "id": "course-power-electronics-p2-subject-2",
            "title": "SiC: System Design & Mechanics",
            "description": "Comprehensive exploration of SiC, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in SiC",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-1"
            ],
            "skillsGained": [
              "SiC modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark SiC application."
            ]
          },
          {
            "id": "course-power-electronics-p2-subject-3",
            "title": "GaN): Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within GaN).",
            "learningObjectives": [
              "Model transient and steady-state behaviors of GaN) setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-2"
            ],
            "skillsGained": [
              "GaN) dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for GaN) and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for PE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Power Electronics.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Converter Simulation in PLECS / MATLAB Simscape",
              "Gate Driver Circuit Design",
              "PCB Design for High di/dt and dv/dt",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-power-electronics-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Switched-Mode Power Supplies (SMPS)",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Power Electronics.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-power-electronics-p4-specialization-core",
            "title": "Switched-Mode Power Supplies (SMPS): Architecture, Standards & Implementation",
            "description": "Detailed exploration of Switched-Mode Power Supplies (SMPS), examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-power-electronics-p2-subject-3",
              "course-power-electronics-p3-tools"
            ],
            "skillsGained": [
              "Switched-Mode Power Supplies (SMPS) engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-power-electronics-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for PE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Power Electronics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Power Electronics.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in PE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Power Electronics.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional PE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional PE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-power-electronics-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-power-electronics-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p6-minor-project",
            "title": "Intermediate Applied Project in PE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Power Electronics.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-power-electronics-p3-tools",
              "course-power-electronics-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Converter Simulation in PLECS / MATLAB Simscape",
              "Gate Driver Circuit Design",
              "PCB Design for High di/dt and dv/dt"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-power-electronics-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-power-electronics-p6-minor-project",
              "course-power-electronics-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Power Electronics Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Power Electronics Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-power-electronics-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Power Electronics.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Power Electronics Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of PE."
            ]
          },
          {
            "id": "course-power-electronics-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in PE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Power Electronics."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-control-systems": {
    "id": "roadmap-course-control-systems",
    "title": "Control Systems Roadmap",
    "targetRoleOrCourse": "Control Systems",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Control Systems",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Linear Control Theory (Frequency & Time Domain), State-Space Analysis & Observer Design, Nonlinear Control Systems), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for CONTROL",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Control Systems.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-control-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for CONTROL",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Control Systems.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to CONTROL",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-control-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Control Systems",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Control Systems.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in CONTROL",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Control Systems."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of CONTROL",
        "description": "Deep dive into the primary academic subjects: Linear Control Theory (Frequency & Time Domain), State-Space Analysis & Observer Design, and Nonlinear Control Systems.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p2-subject-1",
            "title": "Linear Control Theory (Frequency & Time Domain): Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Linear Control Theory (Frequency & Time Domain).",
            "learningObjectives": [
              "Analyze the governing equations of Linear Control Theory (Frequency & Time Domain)",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-control-systems-p1-math"
            ],
            "skillsGained": [
              "Linear Control Theory (Frequency & Time Domain) analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Linear Control Theory (Frequency & Time Domain).",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Linear Control Theory (Frequency & Time Domain) formulation."
            ]
          },
          {
            "id": "course-control-systems-p2-subject-2",
            "title": "State-Space Analysis & Observer Design: System Design & Mechanics",
            "description": "Comprehensive exploration of State-Space Analysis & Observer Design, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in State-Space Analysis & Observer Design",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-1"
            ],
            "skillsGained": [
              "State-Space Analysis & Observer Design modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark State-Space Analysis & Observer Design application."
            ]
          },
          {
            "id": "course-control-systems-p2-subject-3",
            "title": "Nonlinear Control Systems: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Nonlinear Control Systems.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Nonlinear Control Systems setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Nonlinear Control Systems dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Nonlinear Control Systems and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for CONTROL",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Control Systems.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Bode / Nyquist Stability Margin Tuning",
              "Kalman Filter Implementation",
              "State Feedback Controller Design in MATLAB",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-control-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Digital Control & Discrete State Estimation",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Control Systems.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p4-specialization-core",
            "title": "Digital Control & Discrete State Estimation: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Digital Control & Discrete State Estimation, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-3",
              "course-control-systems-p3-tools"
            ],
            "skillsGained": [
              "Digital Control & Discrete State Estimation engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-control-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for CONTROL systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Control Systems."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Control Systems.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in CONTROL",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Control Systems.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional CONTROL processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional CONTROL models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-control-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-control-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p6-minor-project",
            "title": "Intermediate Applied Project in CONTROL",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Control Systems.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-control-systems-p3-tools",
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Bode / Nyquist Stability Margin Tuning",
              "Kalman Filter Implementation",
              "State Feedback Controller Design in MATLAB"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-control-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-control-systems-p6-minor-project",
              "course-control-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Control Systems.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Control Systems Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of CONTROL."
            ]
          },
          {
            "id": "course-control-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in CONTROL",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Control Systems."
            ]
          }
        ]
      }
    ]
  },
  "course-control-systems": {
    "id": "roadmap-course-control-systems",
    "title": "Control Systems Roadmap",
    "targetRoleOrCourse": "Control Systems",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Control Systems",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Linear Control Theory (Frequency & Time Domain), State-Space Analysis & Observer Design, Nonlinear Control Systems), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for CONTROL",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Control Systems.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-control-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for CONTROL",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Control Systems.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to CONTROL",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-control-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Control Systems",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Control Systems.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in CONTROL",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Control Systems."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of CONTROL",
        "description": "Deep dive into the primary academic subjects: Linear Control Theory (Frequency & Time Domain), State-Space Analysis & Observer Design, and Nonlinear Control Systems.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p2-subject-1",
            "title": "Linear Control Theory (Frequency & Time Domain): Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Linear Control Theory (Frequency & Time Domain).",
            "learningObjectives": [
              "Analyze the governing equations of Linear Control Theory (Frequency & Time Domain)",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-control-systems-p1-math"
            ],
            "skillsGained": [
              "Linear Control Theory (Frequency & Time Domain) analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Linear Control Theory (Frequency & Time Domain).",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Linear Control Theory (Frequency & Time Domain) formulation."
            ]
          },
          {
            "id": "course-control-systems-p2-subject-2",
            "title": "State-Space Analysis & Observer Design: System Design & Mechanics",
            "description": "Comprehensive exploration of State-Space Analysis & Observer Design, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in State-Space Analysis & Observer Design",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-1"
            ],
            "skillsGained": [
              "State-Space Analysis & Observer Design modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark State-Space Analysis & Observer Design application."
            ]
          },
          {
            "id": "course-control-systems-p2-subject-3",
            "title": "Nonlinear Control Systems: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Nonlinear Control Systems.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Nonlinear Control Systems setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Nonlinear Control Systems dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Nonlinear Control Systems and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for CONTROL",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Control Systems.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Bode / Nyquist Stability Margin Tuning",
              "Kalman Filter Implementation",
              "State Feedback Controller Design in MATLAB",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-control-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Digital Control & Discrete State Estimation",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Control Systems.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-control-systems-p4-specialization-core",
            "title": "Digital Control & Discrete State Estimation: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Digital Control & Discrete State Estimation, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-control-systems-p2-subject-3",
              "course-control-systems-p3-tools"
            ],
            "skillsGained": [
              "Digital Control & Discrete State Estimation engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-control-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for CONTROL systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Control Systems."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Control Systems.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in CONTROL",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Control Systems.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional CONTROL processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional CONTROL models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-control-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-control-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p6-minor-project",
            "title": "Intermediate Applied Project in CONTROL",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Control Systems.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-control-systems-p3-tools",
              "course-control-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Bode / Nyquist Stability Margin Tuning",
              "Kalman Filter Implementation",
              "State Feedback Controller Design in MATLAB"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-control-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-control-systems-p6-minor-project",
              "course-control-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Control Systems Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Control Systems Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-control-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Control Systems.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Control Systems Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of CONTROL."
            ]
          },
          {
            "id": "course-control-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in CONTROL",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Control Systems."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-machines": {
    "id": "roadmap-course-machines",
    "title": "Electrical Machines Roadmap",
    "targetRoleOrCourse": "Electrical Machines",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical Machines",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Electromagnetic Fields in Rotating Machinery, Permanent Magnet Synchronous Motors (PMSM), Brushless DC (BLDC) Motor Engineering), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for MACHINES",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical Machines.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-electrical-machines-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for MACHINES",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical Machines.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to MACHINES",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-electrical-machines-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical Machines",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical Machines.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in MACHINES",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical Machines."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of MACHINES",
        "description": "Deep dive into the primary academic subjects: Electromagnetic Fields in Rotating Machinery, Permanent Magnet Synchronous Motors (PMSM), and Brushless DC (BLDC) Motor Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p2-subject-1",
            "title": "Electromagnetic Fields in Rotating Machinery: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Electromagnetic Fields in Rotating Machinery.",
            "learningObjectives": [
              "Analyze the governing equations of Electromagnetic Fields in Rotating Machinery",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-electrical-machines-p1-math"
            ],
            "skillsGained": [
              "Electromagnetic Fields in Rotating Machinery analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Electromagnetic Fields in Rotating Machinery.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Electromagnetic Fields in Rotating Machinery formulation."
            ]
          },
          {
            "id": "course-electrical-machines-p2-subject-2",
            "title": "Permanent Magnet Synchronous Motors (PMSM): System Design & Mechanics",
            "description": "Comprehensive exploration of Permanent Magnet Synchronous Motors (PMSM), focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Permanent Magnet Synchronous Motors (PMSM)",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-1"
            ],
            "skillsGained": [
              "Permanent Magnet Synchronous Motors (PMSM) modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Permanent Magnet Synchronous Motors (PMSM) application."
            ]
          },
          {
            "id": "course-electrical-machines-p2-subject-3",
            "title": "Brushless DC (BLDC) Motor Engineering: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Brushless DC (BLDC) Motor Engineering.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Brushless DC (BLDC) Motor Engineering setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-2"
            ],
            "skillsGained": [
              "Brushless DC (BLDC) Motor Engineering dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Brushless DC (BLDC) Motor Engineering and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for MACHINES",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical Machines.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Motor Torque-Speed Characteristic Profiling",
              "FEA Magnetic Flux Simulation (Maxwell/JMAG)",
              "Stator Winding Pattern Calculation",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-electrical-machines-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Thermal Analysis & Cooling of Motors",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical Machines.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p4-specialization-core",
            "title": "Thermal Analysis & Cooling of Motors: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Thermal Analysis & Cooling of Motors, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-3",
              "course-electrical-machines-p3-tools"
            ],
            "skillsGained": [
              "Thermal Analysis & Cooling of Motors engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-electrical-machines-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for MACHINES systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical Machines."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical Machines.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in MACHINES",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical Machines.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional MACHINES processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional MACHINES models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-electrical-machines-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-electrical-machines-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p6-minor-project",
            "title": "Intermediate Applied Project in MACHINES",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical Machines.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-electrical-machines-p3-tools",
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Motor Torque-Speed Characteristic Profiling",
              "FEA Magnetic Flux Simulation (Maxwell/JMAG)",
              "Stator Winding Pattern Calculation"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-electrical-machines-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-electrical-machines-p6-minor-project",
              "course-electrical-machines-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical Machines.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical Machines Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of MACHINES."
            ]
          },
          {
            "id": "course-electrical-machines-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in MACHINES",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical Machines."
            ]
          }
        ]
      }
    ]
  },
  "course-electrical-machines": {
    "id": "roadmap-course-machines",
    "title": "Electrical Machines Roadmap",
    "targetRoleOrCourse": "Electrical Machines",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electrical Machines",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Electromagnetic Fields in Rotating Machinery, Permanent Magnet Synchronous Motors (PMSM), Brushless DC (BLDC) Motor Engineering), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for MACHINES",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electrical Machines.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-electrical-machines-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for MACHINES",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electrical Machines.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to MACHINES",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-electrical-machines-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electrical Machines",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electrical Machines.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in MACHINES",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electrical Machines."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of MACHINES",
        "description": "Deep dive into the primary academic subjects: Electromagnetic Fields in Rotating Machinery, Permanent Magnet Synchronous Motors (PMSM), and Brushless DC (BLDC) Motor Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p2-subject-1",
            "title": "Electromagnetic Fields in Rotating Machinery: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Electromagnetic Fields in Rotating Machinery.",
            "learningObjectives": [
              "Analyze the governing equations of Electromagnetic Fields in Rotating Machinery",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-electrical-machines-p1-math"
            ],
            "skillsGained": [
              "Electromagnetic Fields in Rotating Machinery analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Electromagnetic Fields in Rotating Machinery.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Electromagnetic Fields in Rotating Machinery formulation."
            ]
          },
          {
            "id": "course-electrical-machines-p2-subject-2",
            "title": "Permanent Magnet Synchronous Motors (PMSM): System Design & Mechanics",
            "description": "Comprehensive exploration of Permanent Magnet Synchronous Motors (PMSM), focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Permanent Magnet Synchronous Motors (PMSM)",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-1"
            ],
            "skillsGained": [
              "Permanent Magnet Synchronous Motors (PMSM) modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Permanent Magnet Synchronous Motors (PMSM) application."
            ]
          },
          {
            "id": "course-electrical-machines-p2-subject-3",
            "title": "Brushless DC (BLDC) Motor Engineering: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Brushless DC (BLDC) Motor Engineering.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Brushless DC (BLDC) Motor Engineering setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-2"
            ],
            "skillsGained": [
              "Brushless DC (BLDC) Motor Engineering dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Brushless DC (BLDC) Motor Engineering and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for MACHINES",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electrical Machines.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Motor Torque-Speed Characteristic Profiling",
              "FEA Magnetic Flux Simulation (Maxwell/JMAG)",
              "Stator Winding Pattern Calculation",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-electrical-machines-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Thermal Analysis & Cooling of Motors",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electrical Machines.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-electrical-machines-p4-specialization-core",
            "title": "Thermal Analysis & Cooling of Motors: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Thermal Analysis & Cooling of Motors, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-electrical-machines-p2-subject-3",
              "course-electrical-machines-p3-tools"
            ],
            "skillsGained": [
              "Thermal Analysis & Cooling of Motors engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-electrical-machines-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for MACHINES systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electrical Machines."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electrical Machines.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in MACHINES",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electrical Machines.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional MACHINES processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional MACHINES models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-electrical-machines-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-electrical-machines-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p6-minor-project",
            "title": "Intermediate Applied Project in MACHINES",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electrical Machines.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-electrical-machines-p3-tools",
              "course-electrical-machines-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Motor Torque-Speed Characteristic Profiling",
              "FEA Magnetic Flux Simulation (Maxwell/JMAG)",
              "Stator Winding Pattern Calculation"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-electrical-machines-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-electrical-machines-p6-minor-project",
              "course-electrical-machines-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electrical Machines Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electrical Machines Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-electrical-machines-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electrical Machines.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electrical Machines Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of MACHINES."
            ]
          },
          {
            "id": "course-electrical-machines-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in MACHINES",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electrical Machines."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-renewable-energy": {
    "id": "roadmap-renewable-energy",
    "title": "Renewable Energy Engineering Roadmap",
    "targetRoleOrCourse": "Renewable Energy Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Renewable Energy Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Solar Photovoltaic Systems & MPPT Algorithms, Wind Turbine Generators & Aerodynamics, Battery Energy Storage Systems (BESS)), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for RENEWABLE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Renewable Energy Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-renewable-energy-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for RENEWABLE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Renewable Energy Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to RENEWABLE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-renewable-energy-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Renewable Energy Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Renewable Energy Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in RENEWABLE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Renewable Energy Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of RENEWABLE",
        "description": "Deep dive into the primary academic subjects: Solar Photovoltaic Systems & MPPT Algorithms, Wind Turbine Generators & Aerodynamics, and Battery Energy Storage Systems (BESS).",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p2-subject-1",
            "title": "Solar Photovoltaic Systems & MPPT Algorithms: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Solar Photovoltaic Systems & MPPT Algorithms.",
            "learningObjectives": [
              "Analyze the governing equations of Solar Photovoltaic Systems & MPPT Algorithms",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-renewable-energy-p1-math"
            ],
            "skillsGained": [
              "Solar Photovoltaic Systems & MPPT Algorithms analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Solar Photovoltaic Systems & MPPT Algorithms.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Solar Photovoltaic Systems & MPPT Algorithms formulation."
            ]
          },
          {
            "id": "course-renewable-energy-p2-subject-2",
            "title": "Wind Turbine Generators & Aerodynamics: System Design & Mechanics",
            "description": "Comprehensive exploration of Wind Turbine Generators & Aerodynamics, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Wind Turbine Generators & Aerodynamics",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-1"
            ],
            "skillsGained": [
              "Wind Turbine Generators & Aerodynamics modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Wind Turbine Generators & Aerodynamics application."
            ]
          },
          {
            "id": "course-renewable-energy-p2-subject-3",
            "title": "Battery Energy Storage Systems (BESS): Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Battery Energy Storage Systems (BESS).",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Battery Energy Storage Systems (BESS) setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-2"
            ],
            "skillsGained": [
              "Battery Energy Storage Systems (BESS) dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Battery Energy Storage Systems (BESS) and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for RENEWABLE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Renewable Energy Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "PVsyst Solar Plant Performance Modeling",
              "MPPT Charge Controller Tuning",
              "Battery Energy Storage Sizing",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-renewable-energy-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Microgrids & Hybrid Renewable Architectures",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Renewable Energy Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p4-specialization-core",
            "title": "Microgrids & Hybrid Renewable Architectures: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Microgrids & Hybrid Renewable Architectures, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-3",
              "course-renewable-energy-p3-tools"
            ],
            "skillsGained": [
              "Microgrids & Hybrid Renewable Architectures engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-renewable-energy-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for RENEWABLE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Renewable Energy Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Renewable Energy Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in RENEWABLE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Renewable Energy Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional RENEWABLE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional RENEWABLE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-renewable-energy-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-renewable-energy-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p6-minor-project",
            "title": "Intermediate Applied Project in RENEWABLE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Renewable Energy Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-renewable-energy-p3-tools",
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "PVsyst Solar Plant Performance Modeling",
              "MPPT Charge Controller Tuning",
              "Battery Energy Storage Sizing"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-renewable-energy-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-renewable-energy-p6-minor-project",
              "course-renewable-energy-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Renewable Energy Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of RENEWABLE."
            ]
          },
          {
            "id": "course-renewable-energy-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in RENEWABLE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Renewable Energy Engineering."
            ]
          }
        ]
      }
    ]
  },
  "course-renewable-energy": {
    "id": "roadmap-renewable-energy",
    "title": "Renewable Energy Engineering Roadmap",
    "targetRoleOrCourse": "Renewable Energy Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Renewable Energy Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Solar Photovoltaic Systems & MPPT Algorithms, Wind Turbine Generators & Aerodynamics, Battery Energy Storage Systems (BESS)), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for RENEWABLE",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Renewable Energy Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-renewable-energy-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for RENEWABLE",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Renewable Energy Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to RENEWABLE",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-renewable-energy-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Renewable Energy Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Renewable Energy Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in RENEWABLE",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Renewable Energy Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of RENEWABLE",
        "description": "Deep dive into the primary academic subjects: Solar Photovoltaic Systems & MPPT Algorithms, Wind Turbine Generators & Aerodynamics, and Battery Energy Storage Systems (BESS).",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p2-subject-1",
            "title": "Solar Photovoltaic Systems & MPPT Algorithms: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Solar Photovoltaic Systems & MPPT Algorithms.",
            "learningObjectives": [
              "Analyze the governing equations of Solar Photovoltaic Systems & MPPT Algorithms",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-renewable-energy-p1-math"
            ],
            "skillsGained": [
              "Solar Photovoltaic Systems & MPPT Algorithms analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Solar Photovoltaic Systems & MPPT Algorithms.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Solar Photovoltaic Systems & MPPT Algorithms formulation."
            ]
          },
          {
            "id": "course-renewable-energy-p2-subject-2",
            "title": "Wind Turbine Generators & Aerodynamics: System Design & Mechanics",
            "description": "Comprehensive exploration of Wind Turbine Generators & Aerodynamics, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Wind Turbine Generators & Aerodynamics",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-1"
            ],
            "skillsGained": [
              "Wind Turbine Generators & Aerodynamics modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Wind Turbine Generators & Aerodynamics application."
            ]
          },
          {
            "id": "course-renewable-energy-p2-subject-3",
            "title": "Battery Energy Storage Systems (BESS): Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Battery Energy Storage Systems (BESS).",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Battery Energy Storage Systems (BESS) setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-2"
            ],
            "skillsGained": [
              "Battery Energy Storage Systems (BESS) dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Battery Energy Storage Systems (BESS) and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for RENEWABLE",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Renewable Energy Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "PVsyst Solar Plant Performance Modeling",
              "MPPT Charge Controller Tuning",
              "Battery Energy Storage Sizing",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-renewable-energy-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Microgrids & Hybrid Renewable Architectures",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Renewable Energy Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-renewable-energy-p4-specialization-core",
            "title": "Microgrids & Hybrid Renewable Architectures: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Microgrids & Hybrid Renewable Architectures, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-renewable-energy-p2-subject-3",
              "course-renewable-energy-p3-tools"
            ],
            "skillsGained": [
              "Microgrids & Hybrid Renewable Architectures engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-renewable-energy-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for RENEWABLE systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Renewable Energy Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Renewable Energy Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in RENEWABLE",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Renewable Energy Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional RENEWABLE processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional RENEWABLE models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-renewable-energy-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-renewable-energy-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p6-minor-project",
            "title": "Intermediate Applied Project in RENEWABLE",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Renewable Energy Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-renewable-energy-p3-tools",
              "course-renewable-energy-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "PVsyst Solar Plant Performance Modeling",
              "MPPT Charge Controller Tuning",
              "Battery Energy Storage Sizing"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-renewable-energy-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-renewable-energy-p6-minor-project",
              "course-renewable-energy-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Renewable Energy Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-renewable-energy-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Renewable Energy Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Renewable Energy Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of RENEWABLE."
            ]
          },
          {
            "id": "course-renewable-energy-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in RENEWABLE",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Renewable Energy Engineering."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-smart-grid": {
    "id": "roadmap-course-smart-grid",
    "title": "Smart Grid Technology Roadmap",
    "targetRoleOrCourse": "Smart Grid Technology",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Smart Grid Technology",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Smart Metering Infrastructure & Protocols, Phasor Measurement Units (PMU) & WAMS, Demand Response & Dynamic Pricing Schemes), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for SMARTGRID",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Smart Grid Technology.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-smart-grid-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for SMARTGRID",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Smart Grid Technology.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to SMARTGRID",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-smart-grid-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Smart Grid Technology",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Smart Grid Technology.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in SMARTGRID",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Smart Grid Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of SMARTGRID",
        "description": "Deep dive into the primary academic subjects: Smart Metering Infrastructure & Protocols, Phasor Measurement Units (PMU) & WAMS, and Demand Response & Dynamic Pricing Schemes.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p2-subject-1",
            "title": "Smart Metering Infrastructure & Protocols: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Smart Metering Infrastructure & Protocols.",
            "learningObjectives": [
              "Analyze the governing equations of Smart Metering Infrastructure & Protocols",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-smart-grid-p1-math"
            ],
            "skillsGained": [
              "Smart Metering Infrastructure & Protocols analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Smart Metering Infrastructure & Protocols.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Smart Metering Infrastructure & Protocols formulation."
            ]
          },
          {
            "id": "course-smart-grid-p2-subject-2",
            "title": "Phasor Measurement Units (PMU) & WAMS: System Design & Mechanics",
            "description": "Comprehensive exploration of Phasor Measurement Units (PMU) & WAMS, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Phasor Measurement Units (PMU) & WAMS",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-1"
            ],
            "skillsGained": [
              "Phasor Measurement Units (PMU) & WAMS modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Phasor Measurement Units (PMU) & WAMS application."
            ]
          },
          {
            "id": "course-smart-grid-p2-subject-3",
            "title": "Demand Response & Dynamic Pricing Schemes: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Demand Response & Dynamic Pricing Schemes.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Demand Response & Dynamic Pricing Schemes setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-2"
            ],
            "skillsGained": [
              "Demand Response & Dynamic Pricing Schemes dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Demand Response & Dynamic Pricing Schemes and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for SMARTGRID",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Smart Grid Technology.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Smart Grid Communication Protocol Modeling",
              "Demand Response Simulation",
              "Grid Synchrophasor Telemetry Analysis",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-smart-grid-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Cybersecurity for Smart Electrical Grids",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Smart Grid Technology.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p4-specialization-core",
            "title": "Cybersecurity for Smart Electrical Grids: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Cybersecurity for Smart Electrical Grids, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-3",
              "course-smart-grid-p3-tools"
            ],
            "skillsGained": [
              "Cybersecurity for Smart Electrical Grids engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-smart-grid-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for SMARTGRID systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Smart Grid Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Smart Grid Technology.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in SMARTGRID",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Smart Grid Technology.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional SMARTGRID processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional SMARTGRID models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-smart-grid-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-smart-grid-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p6-minor-project",
            "title": "Intermediate Applied Project in SMARTGRID",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Smart Grid Technology.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-smart-grid-p3-tools",
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Smart Grid Communication Protocol Modeling",
              "Demand Response Simulation",
              "Grid Synchrophasor Telemetry Analysis"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-smart-grid-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-smart-grid-p6-minor-project",
              "course-smart-grid-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Smart Grid Technology.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of SMARTGRID."
            ]
          },
          {
            "id": "course-smart-grid-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in SMARTGRID",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Smart Grid Technology."
            ]
          }
        ]
      }
    ]
  },
  "course-smart-grid": {
    "id": "roadmap-course-smart-grid",
    "title": "Smart Grid Technology Roadmap",
    "targetRoleOrCourse": "Smart Grid Technology",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Smart Grid Technology",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Smart Metering Infrastructure & Protocols, Phasor Measurement Units (PMU) & WAMS, Demand Response & Dynamic Pricing Schemes), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for SMARTGRID",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Smart Grid Technology.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-smart-grid-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for SMARTGRID",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Smart Grid Technology.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to SMARTGRID",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-smart-grid-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Smart Grid Technology",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Smart Grid Technology.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in SMARTGRID",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Smart Grid Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of SMARTGRID",
        "description": "Deep dive into the primary academic subjects: Smart Metering Infrastructure & Protocols, Phasor Measurement Units (PMU) & WAMS, and Demand Response & Dynamic Pricing Schemes.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p2-subject-1",
            "title": "Smart Metering Infrastructure & Protocols: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Smart Metering Infrastructure & Protocols.",
            "learningObjectives": [
              "Analyze the governing equations of Smart Metering Infrastructure & Protocols",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-smart-grid-p1-math"
            ],
            "skillsGained": [
              "Smart Metering Infrastructure & Protocols analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Smart Metering Infrastructure & Protocols.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Smart Metering Infrastructure & Protocols formulation."
            ]
          },
          {
            "id": "course-smart-grid-p2-subject-2",
            "title": "Phasor Measurement Units (PMU) & WAMS: System Design & Mechanics",
            "description": "Comprehensive exploration of Phasor Measurement Units (PMU) & WAMS, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Phasor Measurement Units (PMU) & WAMS",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-1"
            ],
            "skillsGained": [
              "Phasor Measurement Units (PMU) & WAMS modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Phasor Measurement Units (PMU) & WAMS application."
            ]
          },
          {
            "id": "course-smart-grid-p2-subject-3",
            "title": "Demand Response & Dynamic Pricing Schemes: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Demand Response & Dynamic Pricing Schemes.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Demand Response & Dynamic Pricing Schemes setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-2"
            ],
            "skillsGained": [
              "Demand Response & Dynamic Pricing Schemes dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Demand Response & Dynamic Pricing Schemes and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for SMARTGRID",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Smart Grid Technology.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Smart Grid Communication Protocol Modeling",
              "Demand Response Simulation",
              "Grid Synchrophasor Telemetry Analysis",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-smart-grid-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Cybersecurity for Smart Electrical Grids",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Smart Grid Technology.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-smart-grid-p4-specialization-core",
            "title": "Cybersecurity for Smart Electrical Grids: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Cybersecurity for Smart Electrical Grids, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-smart-grid-p2-subject-3",
              "course-smart-grid-p3-tools"
            ],
            "skillsGained": [
              "Cybersecurity for Smart Electrical Grids engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-smart-grid-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for SMARTGRID systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Smart Grid Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Smart Grid Technology.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in SMARTGRID",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Smart Grid Technology.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional SMARTGRID processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional SMARTGRID models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-smart-grid-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-smart-grid-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p6-minor-project",
            "title": "Intermediate Applied Project in SMARTGRID",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Smart Grid Technology.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-smart-grid-p3-tools",
              "course-smart-grid-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Smart Grid Communication Protocol Modeling",
              "Demand Response Simulation",
              "Grid Synchrophasor Telemetry Analysis"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-smart-grid-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-smart-grid-p6-minor-project",
              "course-smart-grid-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Smart Grid Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-smart-grid-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Smart Grid Technology.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Smart Grid Technology Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of SMARTGRID."
            ]
          },
          {
            "id": "course-smart-grid-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in SMARTGRID",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Smart Grid Technology."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-ev": {
    "id": "roadmap-course-ev",
    "title": "Electric Vehicle Technology Roadmap",
    "targetRoleOrCourse": "Electric Vehicle Technology",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electric Vehicle Technology",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (EV Powertrain Architecture & Sizing, Battery Management Systems (BMS) & State of Charge (SoC), EV Traction Inverters & Motor Drives), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EV",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electric Vehicle Technology.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-ev-tech-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EV",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electric Vehicle Technology.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EV",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-ev-tech-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electric Vehicle Technology",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electric Vehicle Technology.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EV",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electric Vehicle Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EV",
        "description": "Deep dive into the primary academic subjects: EV Powertrain Architecture & Sizing, Battery Management Systems (BMS) & State of Charge (SoC), and EV Traction Inverters & Motor Drives.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p2-subject-1",
            "title": "EV Powertrain Architecture & Sizing: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for EV Powertrain Architecture & Sizing.",
            "learningObjectives": [
              "Analyze the governing equations of EV Powertrain Architecture & Sizing",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-ev-tech-p1-math"
            ],
            "skillsGained": [
              "EV Powertrain Architecture & Sizing analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in EV Powertrain Architecture & Sizing.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical EV Powertrain Architecture & Sizing formulation."
            ]
          },
          {
            "id": "course-ev-tech-p2-subject-2",
            "title": "Battery Management Systems (BMS) & State of Charge (SoC): System Design & Mechanics",
            "description": "Comprehensive exploration of Battery Management Systems (BMS) & State of Charge (SoC), focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Battery Management Systems (BMS) & State of Charge (SoC)",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-1"
            ],
            "skillsGained": [
              "Battery Management Systems (BMS) & State of Charge (SoC) modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Battery Management Systems (BMS) & State of Charge (SoC) application."
            ]
          },
          {
            "id": "course-ev-tech-p2-subject-3",
            "title": "EV Traction Inverters & Motor Drives: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within EV Traction Inverters & Motor Drives.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of EV Traction Inverters & Motor Drives setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-2"
            ],
            "skillsGained": [
              "EV Traction Inverters & Motor Drives dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for EV Traction Inverters & Motor Drives and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EV",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electric Vehicle Technology.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "BMS Firmware Algorithm Implementation (SoC / SoH)",
              "Motor Inverter Field-Oriented Control (FOC)",
              "Thermal Cooling Modeling for Battery Packs",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-ev-tech-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & DC Fast Charging Systems & CCS Standards",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electric Vehicle Technology.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p4-specialization-core",
            "title": "DC Fast Charging Systems & CCS Standards: Architecture, Standards & Implementation",
            "description": "Detailed exploration of DC Fast Charging Systems & CCS Standards, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-3",
              "course-ev-tech-p3-tools"
            ],
            "skillsGained": [
              "DC Fast Charging Systems & CCS Standards engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-ev-tech-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EV systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electric Vehicle Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electric Vehicle Technology.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EV",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electric Vehicle Technology.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EV processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EV models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-ev-tech-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-ev-tech-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p6-minor-project",
            "title": "Intermediate Applied Project in EV",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electric Vehicle Technology.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-ev-tech-p3-tools",
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "BMS Firmware Algorithm Implementation (SoC / SoH)",
              "Motor Inverter Field-Oriented Control (FOC)",
              "Thermal Cooling Modeling for Battery Packs"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-ev-tech-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-ev-tech-p6-minor-project",
              "course-ev-tech-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electric Vehicle Technology.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EV."
            ]
          },
          {
            "id": "course-ev-tech-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EV",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electric Vehicle Technology."
            ]
          }
        ]
      }
    ]
  },
  "course-ev-tech": {
    "id": "roadmap-course-ev",
    "title": "Electric Vehicle Technology Roadmap",
    "targetRoleOrCourse": "Electric Vehicle Technology",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Electric Vehicle Technology",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (EV Powertrain Architecture & Sizing, Battery Management Systems (BMS) & State of Charge (SoC), EV Traction Inverters & Motor Drives), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for EV",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Electric Vehicle Technology.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-ev-tech-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for EV",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Electric Vehicle Technology.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to EV",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-ev-tech-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Electric Vehicle Technology",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Electric Vehicle Technology.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in EV",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Electric Vehicle Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of EV",
        "description": "Deep dive into the primary academic subjects: EV Powertrain Architecture & Sizing, Battery Management Systems (BMS) & State of Charge (SoC), and EV Traction Inverters & Motor Drives.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p2-subject-1",
            "title": "EV Powertrain Architecture & Sizing: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for EV Powertrain Architecture & Sizing.",
            "learningObjectives": [
              "Analyze the governing equations of EV Powertrain Architecture & Sizing",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-ev-tech-p1-math"
            ],
            "skillsGained": [
              "EV Powertrain Architecture & Sizing analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in EV Powertrain Architecture & Sizing.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical EV Powertrain Architecture & Sizing formulation."
            ]
          },
          {
            "id": "course-ev-tech-p2-subject-2",
            "title": "Battery Management Systems (BMS) & State of Charge (SoC): System Design & Mechanics",
            "description": "Comprehensive exploration of Battery Management Systems (BMS) & State of Charge (SoC), focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Battery Management Systems (BMS) & State of Charge (SoC)",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-1"
            ],
            "skillsGained": [
              "Battery Management Systems (BMS) & State of Charge (SoC) modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Battery Management Systems (BMS) & State of Charge (SoC) application."
            ]
          },
          {
            "id": "course-ev-tech-p2-subject-3",
            "title": "EV Traction Inverters & Motor Drives: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within EV Traction Inverters & Motor Drives.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of EV Traction Inverters & Motor Drives setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-2"
            ],
            "skillsGained": [
              "EV Traction Inverters & Motor Drives dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for EV Traction Inverters & Motor Drives and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for EV",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Electric Vehicle Technology.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "BMS Firmware Algorithm Implementation (SoC / SoH)",
              "Motor Inverter Field-Oriented Control (FOC)",
              "Thermal Cooling Modeling for Battery Packs",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-ev-tech-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & DC Fast Charging Systems & CCS Standards",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Electric Vehicle Technology.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-ev-tech-p4-specialization-core",
            "title": "DC Fast Charging Systems & CCS Standards: Architecture, Standards & Implementation",
            "description": "Detailed exploration of DC Fast Charging Systems & CCS Standards, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-ev-tech-p2-subject-3",
              "course-ev-tech-p3-tools"
            ],
            "skillsGained": [
              "DC Fast Charging Systems & CCS Standards engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-ev-tech-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for EV systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Electric Vehicle Technology."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Electric Vehicle Technology.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in EV",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Electric Vehicle Technology.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional EV processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional EV models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-ev-tech-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-ev-tech-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p6-minor-project",
            "title": "Intermediate Applied Project in EV",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Electric Vehicle Technology.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-ev-tech-p3-tools",
              "course-ev-tech-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "BMS Firmware Algorithm Implementation (SoC / SoH)",
              "Motor Inverter Field-Oriented Control (FOC)",
              "Thermal Cooling Modeling for Battery Packs"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-ev-tech-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-ev-tech-p6-minor-project",
              "course-ev-tech-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Electric Vehicle Technology Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-ev-tech-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Electric Vehicle Technology.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Electric Vehicle Technology Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of EV."
            ]
          },
          {
            "id": "course-ev-tech-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in EV",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Electric Vehicle Technology."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-energy-systems": {
    "id": "roadmap-course-energy-systems",
    "title": "Energy Systems Engineering Roadmap",
    "targetRoleOrCourse": "Energy Systems Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Energy Systems Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Energy Conservation & Industrial Energy Auditing, Thermal and Electrical Energy Storage Systems, Hydrogen Energy & Fuel Cell Technologies), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for ENERGY",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Energy Systems Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-energy-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for ENERGY",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Energy Systems Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to ENERGY",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-energy-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Energy Systems Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Energy Systems Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in ENERGY",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Energy Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of ENERGY",
        "description": "Deep dive into the primary academic subjects: Energy Conservation & Industrial Energy Auditing, Thermal and Electrical Energy Storage Systems, and Hydrogen Energy & Fuel Cell Technologies.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p2-subject-1",
            "title": "Energy Conservation & Industrial Energy Auditing: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Energy Conservation & Industrial Energy Auditing.",
            "learningObjectives": [
              "Analyze the governing equations of Energy Conservation & Industrial Energy Auditing",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-energy-systems-p1-math"
            ],
            "skillsGained": [
              "Energy Conservation & Industrial Energy Auditing analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Energy Conservation & Industrial Energy Auditing.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Energy Conservation & Industrial Energy Auditing formulation."
            ]
          },
          {
            "id": "course-energy-systems-p2-subject-2",
            "title": "Thermal and Electrical Energy Storage Systems: System Design & Mechanics",
            "description": "Comprehensive exploration of Thermal and Electrical Energy Storage Systems, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Thermal and Electrical Energy Storage Systems",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Thermal and Electrical Energy Storage Systems modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Thermal and Electrical Energy Storage Systems application."
            ]
          },
          {
            "id": "course-energy-systems-p2-subject-3",
            "title": "Hydrogen Energy & Fuel Cell Technologies: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Hydrogen Energy & Fuel Cell Technologies.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Hydrogen Energy & Fuel Cell Technologies setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Hydrogen Energy & Fuel Cell Technologies dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Hydrogen Energy & Fuel Cell Technologies and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for ENERGY",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Energy Systems Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Industrial Energy Audit Execution",
              "Carbon Footprint Quantification",
              "Fuel Cell Thermodynamic Modeling",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-energy-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Life Cycle Assessment (LCA) of Energy Systems",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Energy Systems Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p4-specialization-core",
            "title": "Life Cycle Assessment (LCA) of Energy Systems: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Life Cycle Assessment (LCA) of Energy Systems, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-3",
              "course-energy-systems-p3-tools"
            ],
            "skillsGained": [
              "Life Cycle Assessment (LCA) of Energy Systems engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-energy-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for ENERGY systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Energy Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Energy Systems Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in ENERGY",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Energy Systems Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional ENERGY processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional ENERGY models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-energy-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-energy-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p6-minor-project",
            "title": "Intermediate Applied Project in ENERGY",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Energy Systems Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-energy-systems-p3-tools",
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Industrial Energy Audit Execution",
              "Carbon Footprint Quantification",
              "Fuel Cell Thermodynamic Modeling"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-energy-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-energy-systems-p6-minor-project",
              "course-energy-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Energy Systems Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of ENERGY."
            ]
          },
          {
            "id": "course-energy-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in ENERGY",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Energy Systems Engineering."
            ]
          }
        ]
      }
    ]
  },
  "course-energy-systems": {
    "id": "roadmap-course-energy-systems",
    "title": "Energy Systems Engineering Roadmap",
    "targetRoleOrCourse": "Energy Systems Engineering",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Energy Systems Engineering",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (Energy Conservation & Industrial Energy Auditing, Thermal and Electrical Energy Storage Systems, Hydrogen Energy & Fuel Cell Technologies), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for ENERGY",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Energy Systems Engineering.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-energy-systems-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for ENERGY",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Energy Systems Engineering.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to ENERGY",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-energy-systems-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Energy Systems Engineering",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Energy Systems Engineering.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in ENERGY",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Energy Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of ENERGY",
        "description": "Deep dive into the primary academic subjects: Energy Conservation & Industrial Energy Auditing, Thermal and Electrical Energy Storage Systems, and Hydrogen Energy & Fuel Cell Technologies.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p2-subject-1",
            "title": "Energy Conservation & Industrial Energy Auditing: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for Energy Conservation & Industrial Energy Auditing.",
            "learningObjectives": [
              "Analyze the governing equations of Energy Conservation & Industrial Energy Auditing",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-energy-systems-p1-math"
            ],
            "skillsGained": [
              "Energy Conservation & Industrial Energy Auditing analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in Energy Conservation & Industrial Energy Auditing.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical Energy Conservation & Industrial Energy Auditing formulation."
            ]
          },
          {
            "id": "course-energy-systems-p2-subject-2",
            "title": "Thermal and Electrical Energy Storage Systems: System Design & Mechanics",
            "description": "Comprehensive exploration of Thermal and Electrical Energy Storage Systems, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Thermal and Electrical Energy Storage Systems",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Thermal and Electrical Energy Storage Systems modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Thermal and Electrical Energy Storage Systems application."
            ]
          },
          {
            "id": "course-energy-systems-p2-subject-3",
            "title": "Hydrogen Energy & Fuel Cell Technologies: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within Hydrogen Energy & Fuel Cell Technologies.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of Hydrogen Energy & Fuel Cell Technologies setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-2"
            ],
            "skillsGained": [
              "Hydrogen Energy & Fuel Cell Technologies dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for Hydrogen Energy & Fuel Cell Technologies and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for ENERGY",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Energy Systems Engineering.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Industrial Energy Audit Execution",
              "Carbon Footprint Quantification",
              "Fuel Cell Thermodynamic Modeling",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-energy-systems-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Life Cycle Assessment (LCA) of Energy Systems",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Energy Systems Engineering.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-energy-systems-p4-specialization-core",
            "title": "Life Cycle Assessment (LCA) of Energy Systems: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Life Cycle Assessment (LCA) of Energy Systems, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-energy-systems-p2-subject-3",
              "course-energy-systems-p3-tools"
            ],
            "skillsGained": [
              "Life Cycle Assessment (LCA) of Energy Systems engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-energy-systems-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for ENERGY systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Energy Systems Engineering."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Energy Systems Engineering.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in ENERGY",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Energy Systems Engineering.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional ENERGY processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional ENERGY models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-energy-systems-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-energy-systems-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p6-minor-project",
            "title": "Intermediate Applied Project in ENERGY",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Energy Systems Engineering.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-energy-systems-p3-tools",
              "course-energy-systems-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Industrial Energy Audit Execution",
              "Carbon Footprint Quantification",
              "Fuel Cell Thermodynamic Modeling"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-energy-systems-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-energy-systems-p6-minor-project",
              "course-energy-systems-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Energy Systems Engineering Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-energy-systems-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Energy Systems Engineering.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Energy Systems Engineering Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of ENERGY."
            ]
          },
          {
            "id": "course-energy-systems-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in ENERGY",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Energy Systems Engineering."
            ]
          }
        ]
      }
    ]
  },
  "roadmap-course-ind-auto": {
    "id": "roadmap-course-ind-auto",
    "title": "Industrial Automation Roadmap",
    "targetRoleOrCourse": "Industrial Automation",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Industrial Automation",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (PLC Architecture & IEC 61131-3 Programming, Variable Frequency Drives & Motion Controllers, SCADA & Industrial HMI Screen Design), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for IND-AUTO",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Industrial Automation.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for IND-AUTO",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Industrial Automation.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to IND-AUTO",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Industrial Automation",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Industrial Automation.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in IND-AUTO",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Industrial Automation."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of IND-AUTO",
        "description": "Deep dive into the primary academic subjects: PLC Architecture & IEC 61131-3 Programming, Variable Frequency Drives & Motion Controllers, and SCADA & Industrial HMI Screen Design.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p2-subject-1",
            "title": "PLC Architecture & IEC 61131-3 Programming: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for PLC Architecture & IEC 61131-3 Programming.",
            "learningObjectives": [
              "Analyze the governing equations of PLC Architecture & IEC 61131-3 Programming",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p1-math"
            ],
            "skillsGained": [
              "PLC Architecture & IEC 61131-3 Programming analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in PLC Architecture & IEC 61131-3 Programming.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical PLC Architecture & IEC 61131-3 Programming formulation."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p2-subject-2",
            "title": "Variable Frequency Drives & Motion Controllers: System Design & Mechanics",
            "description": "Comprehensive exploration of Variable Frequency Drives & Motion Controllers, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Variable Frequency Drives & Motion Controllers",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Variable Frequency Drives & Motion Controllers modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Variable Frequency Drives & Motion Controllers application."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p2-subject-3",
            "title": "SCADA & Industrial HMI Screen Design: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within SCADA & Industrial HMI Screen Design.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of SCADA & Industrial HMI Screen Design setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-2"
            ],
            "skillsGained": [
              "SCADA & Industrial HMI Screen Design dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for SCADA & Industrial HMI Screen Design and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for IND-AUTO",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Industrial Automation.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Ladder Logic & Structured Text Coding",
              "VFD Motor Speed & Torque Tuning",
              "HMI Graphical Interface Configuration",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Industrial Ethernet (Profinet",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Industrial Automation.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p4-specialization-core",
            "title": "Industrial Ethernet (Profinet: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Industrial Ethernet (Profinet, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-3",
              "course-industrial-automation-eee-p3-tools"
            ],
            "skillsGained": [
              "Industrial Ethernet (Profinet engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for IND-AUTO systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Industrial Automation."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Industrial Automation.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in IND-AUTO",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Industrial Automation.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional IND-AUTO processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional IND-AUTO models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p6-minor-project",
            "title": "Intermediate Applied Project in IND-AUTO",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Industrial Automation.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p3-tools",
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Ladder Logic & Structured Text Coding",
              "VFD Motor Speed & Torque Tuning",
              "HMI Graphical Interface Configuration"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p6-minor-project",
              "course-industrial-automation-eee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Industrial Automation.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Industrial Automation Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of IND-AUTO."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in IND-AUTO",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Industrial Automation."
            ]
          }
        ]
      }
    ]
  },
  "course-industrial-automation-eee": {
    "id": "roadmap-course-ind-auto",
    "title": "Industrial Automation Roadmap",
    "targetRoleOrCourse": "Industrial Automation",
    "type": "course",
    "branchId": "eee",
    "tagline": "Comprehensive 7-phase learning roadmap for B.Tech in Industrial Automation",
    "overview": "A complete, structured curriculum covering mathematical foundations, core subjects (PLC Architecture & IEC 61131-3 Programming, Variable Frequency Drives & Motion Controllers, SCADA & Industrial HMI Screen Design), laboratory simulation tools, advanced specialization, hands-on capstone projects, and industry/GATE readiness.",
    "estimatedTotalDuration": "8 Semesters (4 Years) or 12-18 Months Fast-Track",
    "difficulty": "Intermediate",
    "roadmapShReference": {
      "url": "https://nptel.ac.in",
      "title": "IEEE Power & Energy Society / NPTEL EEE",
      "note": "Built using IEEE PES benchmarks, Central Electricity Authority norms, and AICTE model curricula."
    },
    "externalResourceNotice": "Aligned with AICTE model curricula, university academic regulations, and professional bodies (IEEE Power & Energy Society / NPTEL EEE).",
    "isComplete": true,
    "lastUpdated": "2026",
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Phase 1 – Foundations & Mathematics",
        "tagline": "Mathematical Foundations & Scientific Fundamentals for IND-AUTO",
        "description": "Establish rigorous mastery over the core mathematical concepts, physics principles, and foundational logic required for Industrial Automation.",
        "difficulty": "Beginner",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p1-math",
            "title": "Applied Engineering Mathematics & Modeling for IND-AUTO",
            "description": "Differential calculus, linear algebra, vector calculus, differential equations, and computational logic tailored for Industrial Automation.",
            "learningObjectives": [
              "Formulate engineering problems into analytical mathematical models",
              "Master matrices, eigenvalue problems, and linear systems relevant to IND-AUTO",
              "Solve ordinary and partial differential equations governing system dynamics"
            ],
            "prerequisites": [
              "High School Mathematics",
              "Basic Calculus"
            ],
            "skillsGained": [
              "Mathematical modeling",
              "Vector algebra",
              "Matrix operations",
              "Differential equations"
            ],
            "toolsAndTechnologies": [
              "Scientific Calculator",
              "Python (NumPy / SymPy)",
              "MATLAB Basics"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Solve and simulate a set of 10 applied engineering differential equations and eigenvalue problems.",
            "learningResources": [
              {
                "title": "Engineering Mathematics (NPTEL / IIT)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "MIT OCW: Linear Algebra & Differential Equations",
                "url": "https://ocw.mit.edu",
                "type": "course",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Model a 2nd-order dynamic response curve using Python or MATLAB and plot stability metrics."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p1-science-core",
            "title": "Fundamental Sciences & Introduction to Industrial Automation",
            "description": "Core scientific laws, conservation principles, introductory terminology, and the foundational scope of B.Tech in Industrial Automation.",
            "learningObjectives": [
              "Understand foundational governing laws and conservation theorems",
              "Identify primary components, operational standards, and system boundaries in IND-AUTO",
              "Master unit systems, dimensional analysis, and error propagation"
            ],
            "prerequisites": [
              "Basic Physics & Chemistry"
            ],
            "skillsGained": [
              "Dimensional analysis",
              "System scoping",
              "Physical reasoning",
              "Technical documentation"
            ],
            "toolsAndTechnologies": [
              "Engineering Workstation",
              "Scientific Computing Tools"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Complete foundational concept exam with 85%+ score on governing principles and terminology.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Write an in-depth technical brief dissecting a benchmark industrial case study in Industrial Automation."
            ]
          }
        ]
      },
      {
        "phaseNumber": 2,
        "phaseName": "Phase 2 – Core Discipline Subjects",
        "tagline": "Fundamental Theory & Primary Academic Subjects of IND-AUTO",
        "description": "Deep dive into the primary academic subjects: PLC Architecture & IEC 61131-3 Programming, Variable Frequency Drives & Motion Controllers, and SCADA & Industrial HMI Screen Design.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p2-subject-1",
            "title": "PLC Architecture & IEC 61131-3 Programming: Principles & Analytical Foundations",
            "description": "Theoretical structures, fundamental equations, design constraints, and classic problem formulations for PLC Architecture & IEC 61131-3 Programming.",
            "learningObjectives": [
              "Analyze the governing equations of PLC Architecture & IEC 61131-3 Programming",
              "Derive system response functions and characteristic behaviors",
              "Apply standard analytical procedures to evaluate component performance"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p1-math"
            ],
            "skillsGained": [
              "PLC Architecture & IEC 61131-3 Programming analysis",
              "Theoretical modeling",
              "Design validation"
            ],
            "toolsAndTechnologies": [
              "Domain Calculation Tools",
              "Simulators",
              "Python/MATLAB"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Successfully solve 5 comprehensive numerical design problems in PLC Architecture & IEC 61131-3 Programming.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a parametric sensitivity analysis on a classical PLC Architecture & IEC 61131-3 Programming formulation."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p2-subject-2",
            "title": "Variable Frequency Drives & Motion Controllers: System Design & Mechanics",
            "description": "Comprehensive exploration of Variable Frequency Drives & Motion Controllers, focusing on practical design criteria, material/system constraints, and operational efficiency.",
            "learningObjectives": [
              "Understand component interactions and architectural layouts in Variable Frequency Drives & Motion Controllers",
              "Calculate loading, stress, bandwidth, or flow rates according to standards",
              "Evaluate trade-offs between performance, cost, and reliability"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Variable Frequency Drives & Motion Controllers modeling",
              "Component sizing",
              "System efficiency optimization"
            ],
            "toolsAndTechnologies": [
              "CAD/CAE Tools",
              "Specialized Analysis Software"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a verified design calculation sheet adhering to professional engineering codes.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Design a prototype schematic for a benchmark Variable Frequency Drives & Motion Controllers application."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p2-subject-3",
            "title": "SCADA & Industrial HMI Screen Design: Dynamics, Analysis & Control",
            "description": "Examine the operational dynamics, feedback loops, stability criteria, and signal/energy flow within SCADA & Industrial HMI Screen Design.",
            "learningObjectives": [
              "Model transient and steady-state behaviors of SCADA & Industrial HMI Screen Design setups",
              "Determine system stability bounds and operating margins",
              "Implement standard compensation and control strategies"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-2"
            ],
            "skillsGained": [
              "SCADA & Industrial HMI Screen Design dynamics",
              "Stability testing",
              "Control synthesis"
            ],
            "toolsAndTechnologies": [
              "Simulation Workbenches",
              "Data Acquisition Suites"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Synthesize a feedback/control model demonstrating stability under 20% external disturbance.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Simulate a disturbance-rejection scenario for SCADA & Industrial HMI Screen Design and verify damping ratios."
            ]
          }
        ]
      },
      {
        "phaseNumber": 3,
        "phaseName": "Phase 3 – Practical Skills & Laboratory Work",
        "tagline": "Hands-on Toolchains, Simulators, and Laboratory Protocols",
        "description": "Transition theory into tangible engineering practice using modern industry simulation suites, hardware test benches, and software environments.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p3-tools",
            "title": "Industry Software, CAD/EDA & Simulation Environments for IND-AUTO",
            "description": "Master the essential industry design, modeling, programming, and simulation tools utilized in Industrial Automation.",
            "learningObjectives": [
              "Set up project workflows, version control, and model configurations",
              "Build high-fidelity 2D/3D models, schematics, or software pipelines",
              "Run convergence tests and interpret simulation diagnostics"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-1"
            ],
            "skillsGained": [
              "Simulation proficiency",
              "Software-assisted design",
              "Toolchain automation"
            ],
            "toolsAndTechnologies": [
              "Ladder Logic & Structured Text Coding",
              "VFD Motor Speed & Torque Tuning",
              "HMI Graphical Interface Configuration",
              "Version Control / Git"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Generate a fully validated simulation model matching experimental or textbook benchmarks within 3% tolerance.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Create an automated simulation batch script that executes 20 parameter variations."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p3-lab",
            "title": "Laboratory Protocols, Instrumentation & Measurement Systems",
            "description": "Sensors, calibration procedures, data acquisition (DAQ) hardware, experimental verification, and laboratory safety standards.",
            "learningObjectives": [
              "Calibrate sensors, instrumentation probes, and data logging equipment",
              "Execute standard experimental test runs in accordance with safety guidelines",
              "Perform rigorous statistical uncertainty analysis on collected empirical data"
            ],
            "prerequisites": [
              "Basic Physics Laboratory experience"
            ],
            "skillsGained": [
              "Instrumentation calibration",
              "Data acquisition",
              "Error analysis",
              "Lab safety protocols"
            ],
            "toolsAndTechnologies": [
              "Oscilloscopes / DAQ Cards / Test Benches",
              "Excel / Python Data Analysis"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Draft an audit-ready laboratory report including uncertainty bounds and repeatability metrics.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct an end-to-end sensor calibration curve test and derive linear regression R^2 metrics."
            ]
          }
        ]
      },
      {
        "phaseNumber": 4,
        "phaseName": "Phase 4 – Intermediate Specialization",
        "tagline": "Applied Systems Engineering & Industrial Ethernet (Profinet",
        "description": "Advance beyond basic theory into specialized workflows, architectural modularity, and applied systems engineering for Industrial Automation.",
        "difficulty": "Intermediate",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p4-specialization-core",
            "title": "Industrial Ethernet (Profinet: Architecture, Standards & Implementation",
            "description": "Detailed exploration of Industrial Ethernet (Profinet, examining industrial standards, production constraints, and performance benchmarking.",
            "learningObjectives": [
              "Incorporate national and international design codes into specifications",
              "Analyze lifecycle reliability, thermal/structural/computational tolerances",
              "Design modular subsystems capable of seamless integration"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p2-subject-3",
              "course-industrial-automation-eee-p3-tools"
            ],
            "skillsGained": [
              "Industrial Ethernet (Profinet engineering",
              "Standards compliance",
              "Modular architecture"
            ],
            "toolsAndTechnologies": [
              "Specialized Industry Suite",
              "Standards Reference Library (ISO/IEEE/ASME/BIS)"
            ],
            "estimatedDuration": "5 Weeks",
            "completionCriteria": "Complete a comprehensive subsystem design proposal with standard compliance checklist.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Audit a legacy system design against updated industry standards and submit remediation recommendations."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p4-optimization",
            "title": "Optimization Techniques, Reliability & Risk Analysis",
            "description": "Mathematical optimization, FMEA (Failure Mode and Effects Analysis), design margin management, and cost-performance trade-offs.",
            "learningObjectives": [
              "Formulate multi-objective optimization problems for IND-AUTO systems",
              "Conduct comprehensive FMEA matrices and determine Risk Priority Numbers (RPN)",
              "Design for reliability, maintainability, and environmental sustainability"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Design optimization",
              "FMEA",
              "Reliability engineering",
              "Lifecycle costing"
            ],
            "toolsAndTechnologies": [
              "Optimization Solvers",
              "FMEA Sheets",
              "Monte Carlo Simulators"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver an optimization study showing at least 15% improvement in efficiency or weight/cost metric.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Construct an end-to-end FMEA worksheet for a mission-critical subsystem in Industrial Automation."
            ]
          }
        ]
      },
      {
        "phaseNumber": 5,
        "phaseName": "Phase 5 – Advanced Specialization & Emerging Technologies",
        "tagline": "Cutting-Edge Innovation, Next-Gen Methodologies & Industry 4.0",
        "description": "Explore contemporary breakthroughs, AI/automation integration, smart materials, digital twins, and sustainable practices transforming Industrial Automation.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p5-emerging-tech",
            "title": "Next-Generation Technologies & Digital Transformation in IND-AUTO",
            "description": "Emerging paradigms such as AI-assisted design, digital twins, smart sensor integration, and advanced automation within Industrial Automation.",
            "learningObjectives": [
              "Understand how machine learning and automation augment traditional IND-AUTO processes",
              "Model a simplified digital twin or predictive maintenance setup",
              "Assess emerging sustainability and carbon-neutral technological shifts"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Emerging tech integration",
              "Digital twins",
              "Predictive modeling",
              "Modern engineering workflows"
            ],
            "toolsAndTechnologies": [
              "AI/ML Frameworks",
              "Cloud Platforms",
              "IoT Gateways",
              "Modern Toolchains"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Demonstrate a working prototype combining traditional IND-AUTO models with modern data-driven insights.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Build a predictive maintenance anomaly detector on historical sensor/system performance logs."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p5-enterprise-integration",
            "title": "Enterprise Systems, Scalability & Regulatory Compliance",
            "description": "Large-scale deployment considerations, safety certifiability, supply-chain constraints, and international regulatory clearances.",
            "learningObjectives": [
              "Navigate regulatory audit processes and documentation requirements",
              "Design scalable architecture capable of high-throughput continuous operation",
              "Synthesize cross-functional engineering deliverables for commercial production"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p5-emerging-tech"
            ],
            "skillsGained": [
              "Regulatory compliance",
              "Enterprise scalability",
              "Cross-functional engineering"
            ],
            "toolsAndTechnologies": [
              "ERP/PLM Systems",
              "Compliance Management Frameworks"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Prepare a mock regulatory filing dossier satisfying safety and performance certifications.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Perform a gap analysis of an engineering blueprint against ISO/regulatory clearance requirements."
            ]
          }
        ]
      },
      {
        "phaseNumber": 6,
        "phaseName": "Phase 6 – Projects & Practical Experience",
        "tagline": "Hands-on Portfolio, Minor Projects & Capstone Engineering System",
        "description": "Execute progressive hands-on projects, from component-level modeling to an industry-grade multidisciplinary capstone project.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p6-minor-project",
            "title": "Intermediate Applied Project in IND-AUTO",
            "description": "Design, simulate, and validate a standalone module or subsystem addressing a concrete engineering problem in Industrial Automation.",
            "learningObjectives": [
              "Scope an engineering problem and define functional requirements",
              "Select appropriate components, algorithms, or material configurations",
              "Produce verified design documentation and simulation results"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p3-tools",
              "course-industrial-automation-eee-p4-specialization-core"
            ],
            "skillsGained": [
              "Project scoping",
              "Independent implementation",
              "Verification testing"
            ],
            "toolsAndTechnologies": [
              "Ladder Logic & Structured Text Coding",
              "VFD Motor Speed & Torque Tuning",
              "HMI Graphical Interface Configuration"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Deliver a fully functioning simulation model, source code/schematic, and technical report.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Publish project files with comprehensive README, mathematical models, and performance graphs."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p6-capstone-project",
            "title": "Industry-Ready Multidisciplinary Capstone System",
            "description": "A comprehensive, production-grade end-to-end engineering system incorporating design, simulation, optimization, testing, and lifecycle costing.",
            "learningObjectives": [
              "Architect a complex, integrated system meeting strict commercial constraints",
              "Perform full design verification, failure analysis, and benchmark comparisons",
              "Present technical findings to an evaluation panel of faculty and mentors"
            ],
            "prerequisites": [
              "course-industrial-automation-eee-p6-minor-project",
              "course-industrial-automation-eee-p5-enterprise-integration"
            ],
            "skillsGained": [
              "Full-lifecycle engineering",
              "System integration",
              "Technical defense & presentation"
            ],
            "toolsAndTechnologies": [
              "Complete Professional Engineering Suite",
              "GitHub / Project Portfolio"
            ],
            "estimatedDuration": "6 Weeks",
            "completionCriteria": "Successfully defend the capstone project with formal documentation, working deliverables, and performance validation.",
            "learningResources": [
              {
                "title": "Industrial Automation Core Lectures (NPTEL / MoE)",
                "url": "https://nptel.ac.in/courses",
                "type": "course",
                "provider": "NPTEL / IIT",
                "isFree": true
              },
              {
                "title": "Industrial Automation Curriculum Reference & Open Courseware",
                "url": "https://ocw.mit.edu",
                "type": "documentation",
                "provider": "MIT OpenCourseWare",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Host capstone repository with architectural schematics, simulation data, and recorded video walkthrough."
            ]
          }
        ]
      },
      {
        "phaseNumber": 7,
        "phaseName": "Phase 7 – Career, Industry & Higher Education Readiness",
        "tagline": "Professional Portfolios, Technical Interviews, GATE/Higher Ed & Placements",
        "description": "Prepare for campus placements, technical engineering interviews, professional licenses, GATE/GRE examinations, and higher studies.",
        "difficulty": "Advanced",
        "topics": [
          {
            "id": "course-industrial-automation-eee-p7-interview-prep",
            "title": "Core Technical Interview Mastery & Portfolio Architecture",
            "description": "Systematic review of high-yield core questions, design challenges, problem-solving interviews, and portfolio presentation for Industrial Automation.",
            "learningObjectives": [
              "Answer foundational and advanced core technical questions with confidence",
              "Present capstone projects effectively to technical recruiters and hiring managers",
              "Construct an ATS-optimized engineering resume highlighting quantifiable achievements"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Interview articulation",
              "Resume optimization",
              "Portfolio presentation"
            ],
            "toolsAndTechnologies": [
              "GitHub",
              "Portfolio Website",
              "LinkedIn",
              "Overleaf (LaTeX Resume)"
            ],
            "estimatedDuration": "3 Weeks",
            "completionCriteria": "Pass 3 mock technical interviews and finalize a verified engineering portfolio.",
            "learningResources": [
              {
                "title": "Industrial Automation Interview Questions & Preparation (GeeksforGeeks/NPTEL)",
                "url": "https://www.geeksforgeeks.org",
                "type": "course",
                "provider": "GeeksforGeeks",
                "isFree": true
              },
              {
                "title": "Harvard FAS Resume & Cover Letter Guide",
                "url": "https://careerservices.fas.harvard.edu",
                "type": "documentation",
                "provider": "Harvard University",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Conduct a recorded 45-minute mock technical interview covering core subjects of IND-AUTO."
            ]
          },
          {
            "id": "course-industrial-automation-eee-p7-higher-ed-exams",
            "title": "Competitive Examinations (GATE / ESE), Certifications & Higher Education",
            "description": "Syllabus alignment for GATE in relevant engineering discipline, UPSC ESE, PSU entrance patterns, and MS/M.Tech application strategies.",
            "learningObjectives": [
              "Master previous 10 years of GATE / competitive exam questions in IND-AUTO",
              "Understand admissions criteria for IITs, IISc, and premier global universities (GRE/TOEFL)",
              "Formulate a 3-year career development roadmap post graduation"
            ],
            "prerequisites": [
              "Completion of Phases 1 through 6"
            ],
            "skillsGained": [
              "Competitive exam problem-solving",
              "Research proposal drafting",
              "Career planning"
            ],
            "toolsAndTechnologies": [
              "GATE Test Series",
              "Research Papers / IEEE Xplore",
              "Syllabus Guides"
            ],
            "estimatedDuration": "4 Weeks",
            "completionCriteria": "Achieve 80%+ accuracy in a timed, full-length GATE / technical subject mock examination.",
            "learningResources": [
              {
                "title": "GATE Official Portal & Previous Question Papers",
                "url": "https://gate2026.iitk.ac.in",
                "type": "documentation",
                "provider": "GATE / IIT Organizing Institute",
                "isFree": true
              },
              {
                "title": "NPTEL GATE Preparation Portal",
                "url": "https://gate.nptel.ac.in",
                "type": "course",
                "provider": "NPTEL / MoE India",
                "isFree": true
              }
            ],
            "practicalAssignments": [
              "Solve and analyze 50 past GATE questions across the core subjects of Industrial Automation."
            ]
          }
        ]
      }
    ]
  }
};
