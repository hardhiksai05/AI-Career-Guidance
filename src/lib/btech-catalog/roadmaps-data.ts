import { RoadmapData } from "./types";
import { ALL_ROADMAPS_COLLECTION } from "./roadmaps";

export const ROADMAPS_COLLECTION: Record<string, RoadmapData> = {
  ...ALL_ROADMAPS_COLLECTION,
  // =========================================================================
  // 1. SOFTWARE & IT ROADMAPS (Referenced to roadmap.sh)
  // =========================================================================
  "roadmap-frontend": {
    id: "roadmap-frontend",
    title: "Frontend Engineering Roadmap",
    targetRoleOrCourse: "Frontend Developer",
    type: "career",
    careerFamilyId: "software-it",
    tagline: "Step-by-step path to becoming a modern frontend developer in 2026.",
    overview:
      "A complete curriculum covering internet basics, HTML/CSS semantics, modern JavaScript & TypeScript, React 19, Next.js App Router, state management, web performance, and browser security.",
    estimatedTotalDuration: "6 to 9 Months (15-20 hrs/week)",
    difficulty: "Beginner",
    roadmapShReference: {
      url: "https://roadmap.sh/frontend",
      title: "roadmap.sh/frontend",
      note: "Learning progression, core skill sequences, and tools structured after roadmap.sh frontend guide.",
    },
    isComplete: true,
    lastUpdated: "2026",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1 – Foundation",
        tagline: "Internet Architecture & Semantic Web Core",
        description:
          "Master how the browser parses documents, DNS resolution, HTTP request lifecycles, and accessible semantic HTML5/CSS3.",
        difficulty: "Beginner",
        topics: [
          {
            id: "fe-p1-internet",
            title: "How the Web Works & Browser Mechanics",
            description:
              "DNS lookups, IP routing, TCP handshakes, TLS negotiation, and DOM/CSSOM render tree construction inside modern Chromium/Gecko engines.",
            learningObjectives: [
              "Trace a packet from URL entry to pixels on screen",
              "Understand HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)",
              "Identify Critical Rendering Path bottlenecks",
            ],
            prerequisites: ["None"],
            skillsGained: ["Network inspection", "Critical Rendering Path awareness", "DNS debugging"],
            toolsAndTechnologies: ["Chrome DevTools", "curl", "Wireshark Basics"],
            estimatedDuration: "1-2 Weeks",
            completionCriteria: "Able to explain critical rendering path in DevTools Performance tab.",
            learningResources: [
              {
                title: "How Browsers Work (web.dev)",
                url: "https://web.dev/critical-rendering-path/",
                type: "documentation",
                provider: "web.dev / Google",
                isFree: true,
              },
              {
                title: "roadmap.sh Frontend Guide",
                url: "https://roadmap.sh/frontend",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Record a Chrome DevTools performance trace on a heavy site and identify Layout Shifts and Long Tasks.",
            ],
          },
          {
            id: "fe-p1-html-css",
            title: "Semantic HTML5, Accessible Forms & Modern CSS",
            description:
              "Semantic landmark elements, ARIA attributes for screen readers, CSS Flexbox, Grid, CSS custom properties, and responsive media queries.",
            learningObjectives: [
              "Build zero-div soup semantic layouts using header, main, nav, section, article",
              "Master 2D layouts using CSS Grid and Flexbox alignment",
              "Ensure WCAG 2.1 AA accessibility compliance",
            ],
            prerequisites: ["Browser basics"],
            skillsGained: ["Semantic markup", "Responsive design", "CSS Grid & Flexbox", "Web Accessibility (a11y)"],
            toolsAndTechnologies: ["HTML5", "CSS3", "Lighthouse", "WAVE Accessibility Tool"],
            estimatedDuration: "3 Weeks",
            completionCriteria: "Pass Lighthouse Accessibility audit with 100/100 score on a responsive page.",
            learningResources: [
              {
                title: "MDN Web Docs: HTML & CSS Modules",
                url: "https://developer.mozilla.org/en-US/docs/Learn",
                type: "documentation",
                provider: "Mozilla MDN",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Code a fully responsive, keyboard-navigable landing page without JavaScript or CSS libraries.",
            ],
          },
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2 – Core Knowledge",
        tagline: "JavaScript Deep Dive & Asynchronous Programming",
        description:
          "Data structures, execution contexts, lexical scoping, closures, prototype inheritance, event loop microtasks, and ES6+ features.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "fe-p2-js-core",
            title: "JavaScript Runtime Engine, Closures & Event Loop",
            description:
              "V8 engine internals, call stack, memory heap, garbage collection, hoisting, closures, Promises, async/await, and microtask vs macrotask execution.",
            learningObjectives: [
              "Deconstruct closure memory retention and memory leaks",
              "Master asynchronous flow with Promises, async/await, and Promise.allSettled",
              "Manipulate the DOM efficiently without unnecessary reflows",
            ],
            prerequisites: ["Basic programming logic"],
            skillsGained: ["JavaScript ES6+", "Async programming", "Event delegation", "DOM manipulation"],
            toolsAndTechnologies: ["Node.js runtime", "Browser Console", "ESLint"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Complete 25 algorithmic and DOM manipulation coding challenges.",
            learningResources: [
              {
                title: "javascript.info — The Modern JavaScript Tutorial",
                url: "https://javascript.info",
                type: "book",
                provider: "javascript.info",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Build an interactive task planner with local storage persistence, filtering, and drag-and-drop using vanilla JS.",
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3 – Intermediate Skills",
        tagline: "TypeScript, Build Tools & Component Architectures",
        description:
          "Type annotations, interfaces, generics, utility types, module bundlers (Vite), and Tailwind CSS design systems.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "fe-p3-ts",
            title: "TypeScript for Production Frontend",
            description:
              "Static type checking, interfaces vs type aliases, discriminated unions, generic constraints, and strict null checking.",
            learningObjectives: [
              "Configure tsconfig.json with strict flags for enterprise codebases",
              "Write strongly typed component props, event handlers, and API response models",
              "Eliminate 'any' types using generic functions and type guards",
            ],
            prerequisites: ["JavaScript fundamentals"],
            skillsGained: ["TypeScript", "Type safety", "Compiler configuration", "Interface design"],
            toolsAndTechnologies: ["TypeScript 5+", "tsc", "Vite", "Tailwind CSS"],
            estimatedDuration: "3 Weeks",
            completionCriteria: "Pass strict type-checking on a multi-screen application with zero errors.",
            learningResources: [
              {
                title: "Official TypeScript Handbook",
                url: "https://www.typescriptlang.org/docs/handbook/intro.html",
                type: "documentation",
                provider: "Microsoft",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Refactor a vanilla JS application into strict TypeScript with generic API fetcher wrappers.",
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4 – Advanced Skills",
        tagline: "React 19, Next.js App Router & Server Components",
        description:
          "Virtual DOM diffing, React Hooks (useState, useEffect, useMemo, useCallback, useTransition), Server Components (RSC), and server actions.",
        difficulty: "Advanced",
        topics: [
          {
            id: "fe-p4-react-next",
            title: "React 19 & Next.js Full Stack Architecture",
            description:
              "React component lifecycles, custom hooks, React Server Components vs Client Components, streaming SSR, and suspense boundaries.",
            learningObjectives: [
              "Architect scalable React component hierarchies with unidirectional data flow",
              "Implement streaming server rendering with React Suspense",
              "Manage global state with TanStack Query (React Query) and Zustand",
            ],
            prerequisites: ["TypeScript", "Modern JavaScript"],
            skillsGained: ["React 19", "Next.js App Router", "Server Actions", "TanStack Query", "Zustand"],
            toolsAndTechnologies: ["React 19", "Next.js", "Zustand", "TanStack Query", "Tailwind CSS"],
            estimatedDuration: "5 Weeks",
            completionCriteria: "Build a multi-page dynamic Next.js application with SSR and optimistic UI updates.",
            learningResources: [
              {
                title: "React Official Documentation (react.dev)",
                url: "https://react.dev",
                type: "documentation",
                provider: "Meta",
                isFree: true,
              },
              {
                title: "Next.js App Router Documentation",
                url: "https://nextjs.org/docs",
                type: "documentation",
                provider: "Vercel",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Develop an e-commerce catalog with search debouncing, infinite scroll, optimistic cart updates, and SSR.",
            ],
          },
        ],
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5 – Projects and Portfolio",
        tagline: "Industry-Caliber Real World Deliverables",
        description:
          "Progress from beginner utility tools to an advanced enterprise-grade production web application.",
        difficulty: "Advanced",
        topics: [
          {
            id: "fe-p5-projects",
            title: "Full-Scale Production Portfolio Build",
            description:
              "Create four milestone projects demonstrating UI craftsmanship, data resilience, accessibility, and high performance.",
            learningObjectives: [
              "Deploy responsive, high-performance web applications with CI/CD",
              "Document architectural choices and component hierarchies in GitHub READMEs",
            ],
            prerequisites: ["React / Next.js", "TypeScript", "Tailwind CSS"],
            skillsGained: ["Portfolio design", "Production deployment", "State persistence", "API integrations"],
            toolsAndTechnologies: ["GitHub Actions", "Vercel", "Framer Motion", "Supabase"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Deploy three live projects with public GitHub repositories and 95+ Lighthouse scores.",
            learningResources: [
              {
                title: "roadmap.sh Project Ideas",
                url: "https://roadmap.sh/frontend/projects",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
            ],
            practicalAssignments: ["Publish and link live URLs for all capstone deliverables."],
            projectSuggestions: [
              {
                title: "Beginner: Developer Bookmark & Snippet Vault",
                level: "Beginner",
                description: "Categorized code snippet store with syntax highlighting, search, and local storage.",
                skillsExercised: ["TypeScript", "DOM manipulation", "CSS Grid", "Local Storage"],
                deliverables: ["Live web app", "Clean GitHub repository"],
              },
              {
                title: "Intermediate: Real-Time Collaborative Whiteboard",
                level: "Intermediate",
                description: "Canvas drawing board with multi-user cursors via WebSockets, shape creation, and undo/redo history.",
                skillsExercised: ["HTML5 Canvas API", "WebSockets", "State machine logic", "React Hooks"],
                deliverables: ["Multi-user deployment", "Architecture diagram"],
              },
              {
                title: "Advanced: B2B Analytics Dashboard with AI Insights",
                level: "Advanced",
                description: "Complex charting dashboard with interactive filters, CSV export, dark mode, and LLM summary generation.",
                skillsExercised: ["Next.js App Router", "Recharts", "TanStack Table", "Tailwind CSS", "Server Actions"],
                deliverables: ["Responsive dashboard", "Zero layout shift", "Full test suite"],
              },
              {
                title: "Industry Capstone: Modern SaaS Platform with Auth & Billing",
                level: "Industry Capstone",
                description: "End-to-end web application with authentication, role-based access, payment integration, and dark/light theming.",
                skillsExercised: ["Next.js", "Supabase / Firebase Auth", "Stripe API", "Zod validation"],
                deliverables: ["Live production deployment on Vercel", "Comprehensive documentation"],
              },
            ],
          },
        ],
      },
      {
        phaseNumber: 6,
        phaseName: "Phase 6 – Industry Readiness",
        tagline: "Technical Interviews, Coding Challenges & Resume",
        description:
          "System design interviews, machine coding rounds, DOM manipulation problem solving, and behavioral STAR frameworks.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "fe-p6-interview-prep",
            title: "Frontend Technical Interview Mastery",
            description:
              "Practice live coding rounds: debounce/throttle implementations, custom Promise.all polyfills, deep clone functions, and frontend system design.",
            learningObjectives: [
              "Solve classic JavaScript polyfill questions in under 15 minutes",
              "Design scalable frontend architectures (news feed, autocomplete, infinite scroll) in 45-minute rounds",
              "Format resume with measurable metrics (e.g., 'reduced LCP by 42%')",
            ],
            prerequisites: ["Phases 1-5 completion"],
            skillsGained: ["Live coding agility", "Frontend system design", "Technical articulation", "Behavioral STAR"],
            toolsAndTechnologies: ["GreatFrontEnd", "LeetCode", "Excalidraw for System Design"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Complete 15 mock frontend coding and system design interviews.",
            learningResources: [
              {
                title: "GreatFrontEnd Interview Preparation",
                url: "https://www.greatfrontend.com",
                type: "interactive",
                provider: "GreatFrontEnd",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Conduct 3 peer mock interviews and produce a 1-page ATS-optimized frontend engineer resume.",
            ],
          },
        ],
      },
      {
        phaseNumber: 7,
        phaseName: "Phase 7 – Specialization and Growth",
        tagline: "Micro-Frontends, WebGL & Long-Term Mastery",
        description:
          "Micro-frontend federations, WebAssembly (Wasm), Three.js 3D rendering, engineering leadership, and open-source contributions.",
        difficulty: "Advanced",
        topics: [
          {
            id: "fe-p7-specialization",
            title: "Advanced Specialization Pathways",
            description:
              "Choose from 3D Web Graphics (Three.js/WebGL), Micro-Frontends (Module Federation), or Performance Optimization Specialists.",
            learningObjectives: [
              "Configure Module Federation across distributed independent repos",
              "Render 3D scenes with Three.js and shaders",
              "Contribute meaningful PRs to prominent open-source frontend projects",
            ],
            prerequisites: ["Senior-level frontend proficiency"],
            skillsGained: ["Module Federation", "3D Web Graphics", "WebAssembly", "Architecture leadership"],
            toolsAndTechnologies: ["Three.js", "WebAssembly", "Webpack Module Federation", "Turborepo"],
            estimatedDuration: "Ongoing Career Path",
            completionCriteria: "Merge 1 open source pull request and lead technical decision making.",
            learningResources: [
              {
                title: "Three.js Journey",
                url: "https://threejs-journey.com",
                type: "course",
                provider: "Bruno Simon",
                isFree: false,
              },
            ],
            practicalAssignments: ["Build a 3D interactive product showcase using React Three Fiber."],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. BACKEND & DISTRIBUTED SYSTEMS (Referenced to roadmap.sh)
  // =========================================================================
  "roadmap-backend": {
    id: "roadmap-backend",
    title: "Backend Engineering Roadmap",
    targetRoleOrCourse: "Backend Developer",
    type: "career",
    careerFamilyId: "software-it",
    tagline: "Master server development, relational and NoSQL databases, microservices, and high-scale APIs.",
    overview:
      "A complete curriculum covering backend languages (Node.js/Go/Python), database design, indexing, caching with Redis, message queues (Kafka/RabbitMQ), and distributed system design.",
    estimatedTotalDuration: "6 to 9 Months (15-20 hrs/week)",
    difficulty: "Intermediate",
    roadmapShReference: {
      url: "https://roadmap.sh/backend",
      title: "roadmap.sh/backend",
      note: "Structured after the official roadmap.sh backend engineering roadmap.",
    },
    isComplete: true,
    lastUpdated: "2026",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1 – Foundation",
        tagline: "Operating Systems, Networking & Protocol Basics",
        description:
          "Linux command line, process lifecycles, memory sockets, TCP/IP, DNS, HTTP/HTTPS methods, headers, and status codes.",
        difficulty: "Beginner",
        topics: [
          {
            id: "be-p1-linux-net",
            title: "Linux CLI, Networking & HTTP Architecture",
            description:
              "Linux permissions, process management (systemd, ps, top), SSH keys, TCP 3-way handshakes, TLS certificates, and REST principles.",
            learningObjectives: [
              "Master Linux terminal administration and bash scripting",
              "Understand idempotency, safe vs unsafe HTTP methods, and status codes",
              "Inspect network sockets and ports with netstat / ss / lsof",
            ],
            prerequisites: ["None"],
            skillsGained: ["Linux Administration", "Bash Scripting", "HTTP/REST", "Networking"],
            toolsAndTechnologies: ["Ubuntu Linux", "Bash", "Postman", "OpenSSL"],
            estimatedDuration: "2 Weeks",
            completionCriteria: "Configure an Ubuntu server with firewall rules, non-root user, and SSH keys.",
            learningResources: [
              {
                title: "roadmap.sh Backend Guide",
                url: "https://roadmap.sh/backend",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
              {
                title: "Linux Command Line Journey",
                url: "https://linuxjourney.com",
                type: "course",
                provider: "LinuxJourney",
                isFree: true,
              },
            ],
            practicalAssignments: ["Write a bash script to monitor CPU/memory thresholds and log alerts to a file."],
          },
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2 – Core Knowledge",
        tagline: "Backend Language Mastery & API Architecture",
        description:
          "Pick a backend language (Node.js/TypeScript, Go, or Python), understand concurrency models, author RESTful APIs, and handle authentication.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "be-p2-api-auth",
            title: "REST APIs, Middleware & JWT/OAuth Security",
            description:
              "Clean architecture controllers, services, repositories, request validation, bcrypt hashing, JWT access/refresh token rotation, and CORS.",
            learningObjectives: [
              "Build modular REST APIs with robust error handling middleware",
              "Implement secure authentication with hashed passwords and refresh tokens",
              "Validate request payloads using Zod or Joi schemas",
            ],
            prerequisites: ["Phase 1"],
            skillsGained: ["REST API Architecture", "Authentication & JWT", "Middleware Patterns", "Validation"],
            toolsAndTechnologies: ["Node.js / Express / Fastify", "TypeScript", "Zod", "Bcrypt"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Build a production-ready authentication microservice with refresh token rotation.",
            learningResources: [
              {
                title: "MDN Express Tutorial",
                url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
                type: "documentation",
                provider: "MDN",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Create an API with role-based access control (Admin, User, Moderator) and rate limiting.",
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3 – Intermediate Skills",
        tagline: "Relational & NoSQL Databases, Indexing & Transactions",
        description:
          "PostgreSQL deep dive, ACID transactions, B-Tree and GIN indexes, EXPLAIN ANALYZE query planning, and Redis in-memory caching.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "be-p3-databases",
            title: "PostgreSQL Modeling, Indexing & Redis Caching",
            description:
              "Relational normal forms, foreign keys, cascade constraints, transaction isolation levels, indexing strategies, and cache-aside patterns in Redis.",
            learningObjectives: [
              "Diagnose and optimize slow queries using EXPLAIN (ANALYZE, BUFFERS)",
              "Design schema migrations with tools like Prisma or Drizzle ORM",
              "Implement cache-aside and cache invalidation strategies using Redis",
            ],
            prerequisites: ["Phase 2"],
            skillsGained: ["PostgreSQL", "SQL Optimization", "Redis Caching", "Transactions & Locking"],
            toolsAndTechnologies: ["PostgreSQL 16+", "Redis", "Prisma / Drizzle", "pgAdmin"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Optimize a query from 250ms to < 5ms by creating appropriate composite indexes.",
            learningResources: [
              {
                title: "Use The Index, Luke! A Guide to Database Performance",
                url: "https://use-the-index-luke.com",
                type: "book",
                provider: "Markus Winand",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Build a banking transfer simulation with row-level locking (SELECT FOR UPDATE) to prevent double-spending.",
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4 – Advanced Skills",
        tagline: "Asynchronous Message Queues, WebSockets & Microservices",
        description:
          "Event-driven architecture with Apache Kafka or RabbitMQ, real-time WebSockets, background job workers, and gRPC service-to-service communication.",
        difficulty: "Advanced",
        topics: [
          {
            id: "be-p4-event-driven",
            title: "Event-Driven Microservices & Message Brokers",
            description:
              "Pub/Sub messaging, consumer groups, idempotency keys, dead letter queues (DLQ), gRPC protocol buffers, and distributed tracing.",
            learningObjectives: [
              "Decouple monolithic processes using RabbitMQ / Kafka event streams",
              "Author strongly typed RPC services with Protocol Buffers and gRPC",
              "Handle partial failures gracefully with circuit breaker patterns",
            ],
            prerequisites: ["Phase 3"],
            skillsGained: ["Message Queues", "Kafka / RabbitMQ", "gRPC / Protobuf", "Distributed Resiliency"],
            toolsAndTechnologies: ["Apache Kafka", "RabbitMQ", "gRPC", "BullMQ"],
            estimatedDuration: "5 Weeks",
            completionCriteria: "Construct an asynchronous order processing pipeline with notification workers.",
            learningResources: [
              {
                title: "Designing Data-Intensive Applications",
                url: "https://dataintensive.net",
                type: "book",
                provider: "Martin Kleppmann",
                isFree: false,
              },
            ],
            practicalAssignments: [
              "Implement an asynchronous video transcoding worker pool triggered by S3 upload webhooks.",
            ],
          },
        ],
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5 – Projects and Portfolio",
        tagline: "Scalable Enterprise Backend Projects",
        description: "Develop resilient backend services ready for high-load production environments.",
        difficulty: "Advanced",
        topics: [
          {
            id: "be-p5-projects",
            title: "Backend Production Portfolio Showcase",
            description: "Four full-scale backend systems demonstrating concurrency, caching, and data integrity.",
            learningObjectives: [
              "Containerize services using Docker and run end-to-end integration tests",
              "Benchmark API throughput using k6 load testing tools",
            ],
            prerequisites: ["Phases 1-4"],
            skillsGained: ["System benchmarking", "Docker containerization", "Load testing", "API documentation"],
            toolsAndTechnologies: ["Docker", "k6", "Swagger / OpenAPI", "GitHub Actions"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Publish 3 repositories with automated tests, docker-compose, and k6 benchmark results.",
            learningResources: [
              {
                title: "roadmap.sh Backend Projects",
                url: "https://roadmap.sh/backend/projects",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
            ],
            practicalAssignments: ["Deploy services on AWS/DigitalOcean with automated healthchecks."],
            projectSuggestions: [
              {
                title: "Beginner: URL Shortener with Analytics & TTL",
                level: "Beginner",
                description: "Custom base62 hashing service with click count analytics, expiration TTL, and Redis caching.",
                skillsExercised: ["REST API", "PostgreSQL", "Redis", "Hashing algorithms"],
                deliverables: ["REST service", "k6 load test report"],
              },
              {
                title: "Intermediate: Real-Time Chat Engine with Presence & Read Receipts",
                level: "Intermediate",
                description: "WebSocket chat server with channel subscriptions, persistent message history, and typing indicators.",
                skillsExercised: ["WebSockets", "Redis Pub/Sub", "PostgreSQL partitioning", "JWT Auth"],
                deliverables: ["Live WebSocket server", "Postman / Thunder Client collection"],
              },
              {
                title: "Advanced: High-Throughput E-Commerce Flash Sale Engine",
                level: "Advanced",
                description: "Handles extreme traffic spikes with Redis atomic decrements (Lua scripts), RabbitMQ queues, and zero overselling.",
                skillsExercised: ["Atomic Redis operations", "Message queues", "Distributed transactions", "k6 load testing"],
                deliverables: ["Passes 10,000 req/sec k6 test with zero oversell", "Architecture documentation"],
              },
              {
                title: "Industry Capstone: Multi-Tenant SaaS Billing & Metered API Gateway",
                level: "Industry Capstone",
                description: "API gateway tracking tenant rate limits, token buckets, Stripe metered invoicing, and webhook delivery guarantees.",
                skillsExercised: ["Token bucket rate limiting", "Webhook retries with exponential backoff", "PostgreSQL RLS"],
                deliverables: ["Production Docker-compose deployment", "Comprehensive automated integration test suite"],
              },
            ],
          },
        ],
      },
      {
        phaseNumber: 6,
        phaseName: "Phase 6 – Industry Readiness",
        tagline: "System Design Interviews, DSA & Concurrency",
        description:
          "High-Level Design (HLD), Low-Level Design (LLD), concurrency race conditions, and distributed systems trade-offs (CAP theorem).",
        difficulty: "Advanced",
        topics: [
          {
            id: "be-p6-system-design",
            title: "System Design & Distributed Algorithms",
            description:
              "Design Twitter, TinyURL, Uber backend, or Distributed Cache: calculate QPS, storage estimations, load balancer setups, database partitioning, and consensus.",
            learningObjectives: [
              "Estimate throughput, storage, and bandwidth for hyper-scale platforms",
              "Apply CAP Theorem, PACELC, and consistent hashing to distributed system design",
              "Articulate trade-offs between SQL vs NoSQL and synchronous vs asynchronous communication",
            ],
            prerequisites: ["Phases 1-5"],
            skillsGained: ["System Design (HLD/LLD)", "Capacity Estimation", "Database Sharding", "Consistent Hashing"],
            toolsAndTechnologies: ["Excalidraw", "LeetCode Medium/Hard", "ByteByteGo"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Complete 10 full system design mock interviews with detailed whiteboarding.",
            learningResources: [
              {
                title: "roadmap.sh System Design Primer",
                url: "https://roadmap.sh/system-design",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
            ],
            practicalAssignments: ["Write a complete 4-page system architecture specification for a global photo-sharing service."],
          },
        ],
      },
      {
        phaseNumber: 7,
        phaseName: "Phase 7 – Specialization and Growth",
        tagline: "Site Reliability, Cloud Native & Principal Engineering",
        description:
          "Kubernetes operators, database internals, zero-downtime database migrations, and staff-level technical leadership.",
        difficulty: "Advanced",
        topics: [
          {
            id: "be-p7-staff-level",
            title: "Cloud Native & Database Internals",
            description:
              "LSM Trees vs B+ Trees, WAL journal architecture, Raft consensus algorithm implementation, and distributed tracing with OpenTelemetry.",
            learningObjectives: [
              "Implement a simplified Raft consensus leader election in Go/Rust/TypeScript",
              "Instrument microservices with OpenTelemetry distributed traces and Jaeger",
            ],
            prerequisites: ["Senior backend proficiency"],
            skillsGained: ["Raft Consensus", "OpenTelemetry", "Database Storage Engines", "Engineering Leadership"],
            toolsAndTechnologies: ["OpenTelemetry", "Jaeger", "Prometheus", "Kubernetes"],
            estimatedDuration: "Ongoing Career Path",
            completionCriteria: "Deploy distributed tracing across 3 connected microservices.",
            learningResources: [
              {
                title: "The Raft Consensus Algorithm",
                url: "https://raft.github.io",
                type: "interactive",
                provider: "Stanford University",
                isFree: true,
              },
            ],
            practicalAssignments: ["Build a minimal key-value store using write-ahead logging (WAL) and memory table."],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. AI & MACHINE LEARNING ROADMAPS (Referenced to roadmap.sh)
  // =========================================================================
  "roadmap-ai-engineer": {
    id: "roadmap-ai-engineer",
    title: "AI Engineer Roadmap (LLMs & Generative AI)",
    targetRoleOrCourse: "AI Engineer",
    type: "career",
    careerFamilyId: "ai-data",
    tagline: "Build production AI applications, RAG pipelines, fine-tune models, and deploy autonomous agents.",
    overview:
      "A complete curriculum covering Python for AI, prompt engineering, embeddings, vector databases (Pinecone, Chroma, pgvector), LangChain / LlamaIndex, evaluation frameworks, and multi-agent coordination.",
    estimatedTotalDuration: "6 to 8 Months (15-20 hrs/week)",
    difficulty: "Intermediate",
    roadmapShReference: {
      url: "https://roadmap.sh/ai-engineer",
      title: "roadmap.sh/ai-engineer",
      note: "Based on roadmap.sh AI Engineer learning roadmap and modern LLM application stack.",
    },
    isComplete: true,
    lastUpdated: "2026",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1 – Foundation",
        tagline: "Python Mastery, Math Foundations & Prompt Architecture",
        description:
          "Python 3.12, NumPy, tokenization mechanics, API authentication with OpenAI/Gemini/Anthropic, and few-shot prompt design.",
        difficulty: "Beginner",
        topics: [
          {
            id: "ai-p1-python-llm-basics",
            title: "Python for AI & LLM Foundation Principles",
            description:
              "Virtual environments, asynchronous programming in Python, tokenizers (BPE), temperature, top_p, system instructions, and structured JSON outputs.",
            learningObjectives: [
              "Understand token probability distributions and generation sampling",
              "Call foundation model APIs with schema validation using Pydantic",
              "Engineer multi-shot and chain-of-thought prompts for deterministic extraction",
            ],
            prerequisites: ["Basic Programming"],
            skillsGained: ["Python", "Foundation Model APIs", "Pydantic", "Prompt Engineering"],
            toolsAndTechnologies: ["Python 3.12", "Google AI Studio", "OpenAI SDK", "Pydantic"],
            estimatedDuration: "2 Weeks",
            completionCriteria: "Build a reliable resume information extractor returning strict validated Pydantic JSON.",
            learningResources: [
              {
                title: "roadmap.sh AI Engineer Guide",
                url: "https://roadmap.sh/ai-engineer",
                type: "interactive",
                provider: "roadmap.sh",
                isFree: true,
              },
              {
                title: "DeepLearning.AI Prompt Engineering for Developers",
                url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
                type: "course",
                provider: "DeepLearning.AI",
                isFree: true,
              },
            ],
            practicalAssignments: ["Build a CLI assistant that transforms messy interview notes into clean JSON candidate evaluations."],
          },
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2 – Core Knowledge",
        tagline: "Embeddings, Vector Databases & Retrieval Augmented Generation (RAG)",
        description:
          "Dense vector representations, cosine similarity, chunking strategies, pgvector, Pinecone, Hybrid Search (Dense + BM25), and cross-encoder re-ranking.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "ai-p2-rag-vectors",
            title: "Vector Search & Production RAG Pipelines",
            description:
              "Semantic chunking, parent document retrievers, embedding models (text-embedding-3, bge-large), pgvector indexing (HNSW/IVFFlat), and reciprocal rank fusion (RRF).",
            learningObjectives: [
              "Choose optimal document chunking sizes and overlaps based on use case",
              "Configure HNSW vector indexes in PostgreSQL with pgvector",
              "Implement hybrid search combining BM25 keyword matching with dense vector similarity",
            ],
            prerequisites: ["Phase 1"],
            skillsGained: ["Vector Search", "pgvector", "Semantic Retrieval", "Reranking"],
            toolsAndTechnologies: ["PostgreSQL (pgvector)", "Pinecone / Chroma", "Sentence Transformers", "Cohere Rerank"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Construct a RAG system on 1,000 PDF pages with source citations and < 800ms latency.",
            learningResources: [
              {
                title: "Pinecone Learning Center: Vector Search Explained",
                url: "https://www.pinecone.io/learn/",
                type: "documentation",
                provider: "Pinecone",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Build a multi-document research assistant that queries SEC 10-K financial filings with verbatim citations.",
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3 – Intermediate Skills",
        tagline: "AI Orchestration, Tool Calling & Function Execution",
        description:
          "LangChain, LlamaIndex, function-calling schemas, SQL query generation, web search tool integration, and guardrail validation.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "ai-p3-tool-calling",
            title: "Agentic Tool Calling & Framework Orchestration",
            description:
              "Model tool calling protocols, executing sandboxed Python code, invoking third-party REST APIs, and preventing prompt injection with Guardrails.",
            learningObjectives: [
              "Bind native tool definitions to LLM chats for real-time calculations",
              "Construct safe Text-to-SQL query engines with read-only database connections",
              "Enforce output guardrails with NeMo Guardrails or Instructor",
            ],
            prerequisites: ["Phase 2"],
            skillsGained: ["Tool Calling", "Function Execution", "Text-to-SQL", "Output Guardrails"],
            toolsAndTechnologies: ["LangChain", "LlamaIndex", "Instructor", "DuckDuckGo API"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Deploy an AI customer support bot that checks live orders, computes shipping, and initiates returns.",
            learningResources: [
              {
                title: "LlamaIndex Documentation",
                url: "https://docs.llamaindex.ai",
                type: "documentation",
                provider: "LlamaIndex",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Build an autonomous GitHub PR summarizer that clones repos, analyzes diffs, and posts review comments.",
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4 – Advanced Skills",
        tagline: "Multi-Agent Frameworks & Fine-Tuning (LoRA)",
        description:
          "Stateful multi-agent systems with LangGraph and CrewAI, human-in-the-loop workflows, parameter-efficient fine-tuning (PEFT/LoRA), and model evaluation.",
        difficulty: "Advanced",
        topics: [
          {
            id: "ai-p4-agents-lora",
            title: "LangGraph Multi-Agent Workflows & LoRA Fine-Tuning",
            description:
              "Cycles and conditionals in agent graphs, supervisor-worker hierarchies, memory persistence, instruction fine-tuning using Unsloth/Hugging Face, and Ragas evaluation.",
            learningObjectives: [
              "Build cyclic state machines for multi-agent collaboration in LangGraph",
              "Fine-tune open-weights models (Llama 3, Mistral) on custom domain datasets with LoRA",
              "Evaluate RAG quality using Faithfulness, Answer Relevance, and Context Precision metrics (RAGAS)",
            ],
            prerequisites: ["Phase 3"],
            skillsGained: ["LangGraph", "Multi-Agent Systems", "LoRA Fine-Tuning", "RAG Evaluation (RAGAS)"],
            toolsAndTechnologies: ["LangGraph", "CrewAI", "Unsloth / Hugging Face", "Ragas"],
            estimatedDuration: "5 Weeks",
            completionCriteria: "Train a LoRA adapter and evaluate a 3-agent research team on complex technical topics.",
            learningResources: [
              {
                title: "LangGraph Multi-Agent Workflows",
                url: "https://langchain-ai.github.io/langgraph/",
                type: "documentation",
                provider: "LangChain",
                isFree: true,
              },
            ],
            practicalAssignments: [
              "Create a 3-agent software engineering squad (Architect, Coder, Code Reviewer) that iteratively drafts and tests code.",
            ],
          },
        ],
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5 – Projects and Portfolio",
        tagline: "Industry AI Applications & Production Pipelines",
        description: "Four end-to-end AI applications ready for enterprise production.",
        difficulty: "Advanced",
        topics: [
          {
            id: "ai-p5-projects",
            title: "Production AI Portfolio",
            description: "Build robust AI systems with streaming interfaces, monitoring, and measurable accuracy.",
            learningObjectives: [
              "Deploy AI apps with streaming Server-Sent Events (SSE) interfaces",
              "Log prompt latency, token costs, and traces with Langfuse or Arize Phoenix",
            ],
            prerequisites: ["Phases 1-4"],
            skillsGained: ["Production AI", "Observability (Langfuse)", "Streaming SSE", "Latency Optimization"],
            toolsAndTechnologies: ["Next.js", "FastAPI", "Langfuse", "Docker"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Publish 3 live AI applications with full telemetry monitoring.",
            learningResources: [
              {
                title: "Langfuse Open Source LLM Observability",
                url: "https://langfuse.com",
                type: "documentation",
                provider: "Langfuse",
                isFree: true,
              },
            ],
            practicalAssignments: ["Include live demo videos and telemetry screenshots in GitHub repositories."],
            projectSuggestions: [
              {
                title: "Beginner: AI Document Intelligence & Summarizer",
                level: "Beginner",
                description: "Uploads PDFs, extracts tabular figures, and generates executive briefing notes with citations.",
                skillsExercised: ["Python", "Document parsing", "Gemini 2.5 Flash API", "Streamlit / Next.js"],
                deliverables: ["Working demo app", "GitHub repo"],
              },
              {
                title: "Intermediate: Production RAG Knowledge Base with Source Verifiability",
                level: "Intermediate",
                description: "Hybrid search RAG on engineering textbooks with inline citation popups and hallucination detection.",
                skillsExercised: ["pgvector", "BM25 Hybrid Search", "Cross-Encoder Reranking", "React UI"],
                deliverables: ["Live app with < 900ms response time", "Ragas benchmark evaluation"],
              },
              {
                title: "Advanced: Autonomous Software Bug Triage Agent",
                level: "Advanced",
                description: "Listens to GitHub issue webhooks, reproduces errors in a Docker sandbox, and opens draft pull requests with proposed fixes.",
                skillsExercised: ["LangGraph", "Docker container sandboxing", "GitHub API", "Tool calling"],
                deliverables: ["Autonomous GitHub bot", "Architecture design document"],
              },
              {
                title: "Industry Capstone: Enterprise Multi-Agent Research & Competitive Intelligence Suite",
                level: "Industry Capstone",
                description: "Coordinated agent team scraping web data, synthesizing market shifts, drafting slide presentations, and monitoring news feeds.",
                skillsExercised: ["Multi-agent orchestration", "Langfuse telemetry", "Vector caching", "FastAPI backend"],
                deliverables: ["Full production architecture", "Comprehensive test report and token cost analysis"],
              },
            ],
          },
        ],
      },
      {
        phaseNumber: 6,
        phaseName: "Phase 6 – Industry Readiness",
        tagline: "AI Engineering Interviews & Token Optimization",
        description:
          "System design for AI apps, context window optimization, latency reduction, cost modeling, and interview questions.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "ai-p6-interview",
            title: "AI System Design & Technical Interview Prep",
            description:
              "Practice designing Copilot systems, semantic search at scale, prompt caching, token reduction, and handling model degradation.",
            learningObjectives: [
              "Design a multi-tenant enterprise RAG system serving 100k daily queries",
              "Calculate ROI, token pricing models, and cache hit rate benefits",
              "Articulate trade-offs between RAG vs Fine-Tuning vs In-Context Learning",
            ],
            prerequisites: ["Phases 1-5"],
            skillsGained: ["AI System Design", "Cost Economics", "Token Optimization", "Interview Presentation"],
            toolsAndTechnologies: ["Excalidraw", "Token Cost Calculators"],
            estimatedDuration: "3 Weeks",
            completionCriteria: "Complete 5 mock AI system design interviews.",
            learningResources: [
              {
                title: "Patterns for Building LLM-based Systems & Products",
                url: "https://eugeneyan.com/writing/llm-patterns/",
                type: "book",
                provider: "Eugene Yan",
                isFree: true,
              },
            ],
            practicalAssignments: ["Write a 3-page RFC comparing RAG vs Fine-tuning for a medical diagnosis application."],
          },
        ],
      },
      {
        phaseNumber: 7,
        phaseName: "Phase 7 – Specialization and Growth",
        tagline: "Multimodal AI, Audio/Vision Foundation Models & Future Horizons",
        description:
          "Multimodal vision-language models, real-time voice streaming agents (WebRTC), on-device SLMs (Edge AI), and AI alignment research.",
        difficulty: "Advanced",
        topics: [
          {
            id: "ai-p7-multimodal",
            title: "Multimodal Vision & Real-Time Audio Agents",
            description:
              "Gemini Live multimodal APIs, WebRTC audio streaming, Whisper transcription, and on-device quantization (GGUF / ONNX).",
            learningObjectives: [
              "Stream bidirectional audio over WebRTC to low-latency voice models",
              "Quantize and run small language models (Phi-3, Gemma) locally on CPU/GPU",
            ],
            prerequisites: ["Senior AI engineering proficiency"],
            skillsGained: ["Real-Time Voice AI", "WebRTC", "Quantization", "Edge AI"],
            toolsAndTechnologies: ["WebRTC", "Gemma 2", "llama.cpp", "ONNX Runtime"],
            estimatedDuration: "Ongoing Career Path",
            completionCriteria: "Build a sub-500ms voice conversational agent running in a browser.",
            learningResources: [
              {
                title: "Hugging Face Quantization Guide",
                url: "https://huggingface.co/docs/transformers/main/en/quantization",
                type: "documentation",
                provider: "Hugging Face",
                isFree: true,
              },
            ],
            practicalAssignments: ["Deploy an on-device local LLM using WebGPU in Chrome."],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 4. CORE ENGINEERING ROADMAP: MECHANICAL DESIGN & PRODUCT ENGINEERING
  // =========================================================================
  "roadmap-design-engineer": {
    id: "roadmap-design-engineer",
    title: "Mechanical Design & Product Engineering Roadmap",
    targetRoleOrCourse: "Design Engineer",
    type: "career",
    careerFamilyId: "core-engineering",
    branchId: "mech",
    tagline: "Authentic engineering progression from 2D drafting to FEA simulation and DFM physical production.",
    overview:
      "A complete curriculum for mechanical design engineers: engineering drawing standards (GD&T ASME Y14.5), 3D parametric CAD modeling (SolidWorks/CATIA), material selection, finite element analysis (ANSYS), and Design for Manufacturing (DFM/DFA).",
    estimatedTotalDuration: "8 to 12 Months (15 hrs/week)",
    difficulty: "Intermediate",
    externalResourceNotice:
      "Curated from accredited mechanical engineering bodies: ASME, NPTEL IIT Madras, and ISO standards.",
    isComplete: true,
    lastUpdated: "2026",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1 – Foundation",
        tagline: "Engineering Mechanics, Strength of Materials & Technical Graphics",
        description:
          "Statics equilibrium, free body diagrams, stress-strain constitutive relations, shear force and bending moment diagrams, and orthographic projections.",
        difficulty: "Beginner",
        topics: [
          {
            id: "mech-p1-mechanics",
            title: "Engineering Statics & Strength of Materials",
            description:
              "Calculate reaction forces, centroid & moment of inertia, normal and shear stresses, principal stresses via Mohr's Circle, and beam deflection formulas.",
            learningObjectives: [
              "Draw accurate Free Body Diagrams (FBD) for complex multi-link assemblies",
              "Calculate maximum bending stress and shear stress profiles in I-beams",
              "Construct Mohr's circle to determine principal stresses and maximum shear planes",
            ],
            prerequisites: ["High School Physics", "Trigonometry & Calculus"],
            skillsGained: ["Stress Analysis", "Free Body Diagrams", "Beam Deflection", "Mohr's Circle"],
            toolsAndTechnologies: ["Engineering Hand Calculations", "MDSolids", "Python NumPy for Matrix Stress"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Complete hand calculation verification for a loaded cantilever crane beam with safety factors.",
            learningResources: [
              {
                title: "NPTEL: Strength of Materials (IIT Kharagpur)",
                url: "https://nptel.ac.in/courses/112105171",
                type: "course",
                provider: "NPTEL / IIT Kharagpur",
                isFree: true,
              },
              {
                title: "Mechanics of Materials (Beer, Johnston & DeWolf)",
                type: "book",
                provider: "McGraw Hill Education",
                isFree: false,
              },
            ],
            practicalAssignments: ["Calculate the maximum safe load on a shaft subjected to combined bending and torsion."],
          },
          {
            id: "mech-p1-gdt",
            title: "Technical Drafting & GD&T (ASME Y14.5)",
            description:
              "Orthographic projections, auxiliary views, section cuts, limits and fits (hole-basis vs shaft-basis), and Geometric Dimensioning & Tolerancing (GD&T).",
            learningObjectives: [
              "Apply feature control frames with datums (A, B, C) according to ASME Y14.5",
              "Interpret true position, flatness, cylindricity, runout, and maximum material condition (MMC)",
              "Calculate tolerance stack-ups for 1D and 2D assembly chains",
            ],
            prerequisites: ["Technical Drawing Basics"],
            skillsGained: ["GD&T Symbol Mastery", "Tolerance Stack-Up Analysis", "2D Production Drawings"],
            toolsAndTechnologies: ["ASME Y14.5 Standards", "AutoCAD", "DraftSight"],
            estimatedDuration: "3 Weeks",
            completionCriteria: "Produce a fully GD&T-toleranced manufacturing drawing ready for CNC milling.",
            learningResources: [
              {
                title: "NPTEL: Engineering Drawing & Computer Graphics",
                url: "https://nptel.ac.in/courses/112103019",
                type: "course",
                provider: "NPTEL / IIT Guwahati",
                isFree: true,
              },
            ],
            practicalAssignments: ["Perform a worst-case and RSS tolerance stack-up analysis on a 5-part bearing housing."],
          },
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2 – Core Knowledge",
        tagline: "Parametric 3D CAD Modeling & Machine Elements Design",
        description:
          "SolidWorks/CATIA solid modeling, complex sweeps/lofts, parametric constraints, designing shafts, spur/helical gears, bearings, and bolted joints.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "mech-p2-cad-machine-design",
            title: "3D Parametric Modeling & Machine Elements Sizing",
            description:
              "Parametric sketch relations, parent-child features, multi-body parts, top-down assembly modeling, and sizing gears and bearings per Shigley standards.",
            learningObjectives: [
              "Model complex parts with robust, non-breaking parametric feature trees",
              "Design spur gears using AGMA bending and contact surface fatigue standards",
              "Select deep groove and tapered roller bearings based on dynamic L10 life ratings",
            ],
            prerequisites: ["Phase 1"],
            skillsGained: ["SolidWorks / CATIA", "Parametric 3D Modeling", "Machine Element Sizing", "Bearing Life"],
            toolsAndTechnologies: ["SolidWorks / Autodesk Inventor", "Shigley Mechanical Engineering Design"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Create a 30-component speed reducer gearbox assembly with working motion studies.",
            learningResources: [
              {
                title: "Shigley's Mechanical Engineering Design (Budynas & Nisbett)",
                type: "book",
                provider: "McGraw Hill",
                isFree: false,
              },
              {
                title: "NPTEL: Design of Machine Elements (IIT Kharagpur)",
                url: "https://nptel.ac.in/courses/112105124",
                type: "course",
                provider: "NPTEL / IIT Kharagpur",
                isFree: true,
              },
            ],
            practicalAssignments: ["Design a two-stage spur gearbox transmitting 15 kW at 1440 RPM with CAD assembly."],
          },
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3 – Intermediate Skills",
        tagline: "Finite Element Analysis (FEA) & Stress Simulation",
        description:
          "Linear static structural simulation, meshing quality metrics (skewness, aspect ratio), boundary condition modeling, and convergence studies in ANSYS.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "mech-p3-fea",
            title: "ANSYS Structural Simulation & Convergence",
            description:
              "Element types (tet vs hex), stress singularities (re-entrant corners), mesh refinement, contact types (bonded, frictionless, frictional), and Von Mises yield criteria.",
            learningObjectives: [
              "Differentiate between physical stress concentrations and artificial mathematical singularities",
              "Perform mesh independence studies showing < 2% variance in peak stress",
              "Evaluate safety factors against tensile yield and ultimate fatigue strength",
            ],
            prerequisites: ["Phase 2"],
            skillsGained: ["ANSYS Mechanical", "FEA Meshing", "Von Mises Stress", "Convergence Verification"],
            toolsAndTechnologies: ["ANSYS Workbench Structural", "HyperMesh"],
            estimatedDuration: "5 Weeks",
            completionCriteria: "Simulate a loaded automotive suspension control arm and verify convergence.",
            learningResources: [
              {
                title: "Cornell University: A Hands-on Introduction to Engineering Simulations",
                url: "https://www.edx.org/learn/engineering/cornell-university-a-hands-on-introduction-to-engineering-simulations",
                type: "course",
                provider: "Cornell University / edX",
                isFree: true,
              },
            ],
            practicalAssignments: ["Run an FEA analysis on an L-bracket and compare the results to theoretical beam formulas."],
          },
        ],
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4 – Advanced Skills",
        tagline: "Design for Manufacturing (DFM) & Injection Molding / Sheet Metal",
        description:
          "Sheet metal bend allowances, plastic injection molding draft angles, uniform wall thickness, rib design, and casting parting line optimization.",
        difficulty: "Advanced",
        topics: [
          {
            id: "mech-p4-dfm",
            title: "DFM for Plastics, Sheet Metal & Die Casting",
            description:
              "Plastic part design rules (draft, fillets, knit lines, sink marks), sheet metal K-factor and minimum bend radius, and CNC tool accessibility constraints.",
            learningObjectives: [
              "Incorporate 1-2 degree draft angles and constant wall thicknesses in injection molded enclosures",
              "Calculate flat pattern blank lengths for sheet metal enclosures using K-factor",
              "Design for Assembly (DFA) by minimizing fastener counts and using snap-fits",
            ],
            prerequisites: ["Phase 3"],
            skillsGained: ["DFM / DFA", "Plastic Part Design", "Sheet Metal Enclosures", "Tooling Constraints"],
            toolsAndTechnologies: ["SolidWorks Mold Design", "DFMPro", "Moldflow Basics"],
            estimatedDuration: "4 Weeks",
            completionCriteria: "Design an injection molded handheld device enclosure ready for tooling with zero sink marks.",
            learningResources: [
              {
                title: "Protolabs Design for Manufacturability Guidelines",
                url: "https://www.protolabs.com/resources/design-tips/",
                type: "documentation",
                provider: "Protolabs",
                isFree: true,
              },
            ],
            practicalAssignments: ["Redesign a multi-piece welded assembly into a single stamped sheet metal bracket."],
          },
        ],
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5 – Projects and Portfolio",
        tagline: "Tangible Physical Machine Portfolio",
        description: "Four engineering projects demonstrating CAD mastery, stress simulation, and production feasibility.",
        difficulty: "Advanced",
        topics: [
          {
            id: "mech-p5-projects",
            title: "Mechanical Design Capstone Portfolio",
            description: "Complete design dossiers including 3D CAD files, FEA reports, BOM, and manufacturing drawings.",
            learningObjectives: [
              "Produce complete manufacturing documentation packages (BOM, 2D PDF drawings, STEP models)",
              "Validate structural integrity under dynamic impact or cyclic fatigue loading",
            ],
            prerequisites: ["Phases 1-4"],
            skillsGained: ["Engineering Portfolio", "BOM Creation", "CAD Presentation", "FEA Reports"],
            toolsAndTechnologies: ["SolidWorks", "ANSYS", "KeyShot Rendering", "GrabCAD"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Publish 3 comprehensive design portfolios with photo-realistic renderings and FEA reports.",
            learningResources: [
              {
                title: "GrabCAD Community Engineering Library",
                url: "https://grabcad.com/library",
                type: "interactive",
                provider: "GrabCAD",
                isFree: true,
              },
            ],
            practicalAssignments: ["Assemble all calculation sheets, drawings, and renders into an engineering portfolio binder."],
            projectSuggestions: [
              {
                title: "Beginner: Precision Ergonomic Benchtop Vise",
                level: "Beginner",
                description: "Acme threaded screw, cast iron body, hardened steel jaw inserts, and detailed 2D manufacturing drawings.",
                skillsExercised: ["Thread design", "Parametric modeling", "Limits & fits", "2D Drafting"],
                deliverables: ["Full SolidWorks assembly", "Complete 2D manufacturing drawings"],
              },
              {
                title: "Intermediate: Autonomous Drone Gimbals with Vibration Isolation",
                level: "Intermediate",
                description: "3-axis motorized camera gimbal with silicone dampeners, carbon fiber arms, and brushless motor mounts.",
                skillsExercised: ["Center of gravity balancing", "Vibration dampening", "3D Printing DFM"],
                deliverables: ["CAD model with balanced CG", "Modal vibration FEA report"],
              },
              {
                title: "Advanced: Formula Student Double-Wishbone Suspension System",
                level: "Advanced",
                description: "Tubular steel wishbones, upright steering knuckles, pushrod rocker assembly, and stress simulation under 3G bump + 1.5G cornering.",
                skillsExercised: ["Kinematic roll center calculation", "FEA stress verification in ANSYS", "Welding jigs"],
                deliverables: ["Kinematic motion study", "FEA safety factor report"],
              },
              {
                title: "Industry Capstone: Medical Robotic Surgical Tool End-Effector",
                level: "Industry Capstone",
                description: "Miniature tendon-driven robotic gripper, stainless steel 316L bio-compatible components, and micro-machining tolerances.",
                skillsExercised: ["Micro-mechanism design", "Medical grade materials (ISO 10993)", "Precision GD&T"],
                deliverables: ["Complete production dossier with DFM analysis", "Assembly instructions"],
              },
            ],
          },
        ],
      },
      {
        phaseNumber: 6,
        phaseName: "Phase 6 – Industry Readiness",
        tagline: "Mechanical Engineering Interviews & Machine Design Questions",
        description:
          "Technical whiteboard interviews on failure theories, material selection charts (Ashby plots), and hands-on CAD modeling tests.",
        difficulty: "Intermediate",
        topics: [
          {
            id: "mech-p6-interview",
            title: "Design Engineering Technical Interview",
            description:
              "Practice timed CAD modeling tests, explain failure criteria (Tresca vs Von Mises vs Rankine), and present portfolio designs to senior chief engineers.",
            learningObjectives: [
              "Solve timed SolidWorks modeling challenges under 30 minutes",
              "Select materials using Ashby property charts (strength-to-weight, thermal expansion)",
              "Explain failure mechanisms: fatigue, creep, brittle fracture, and buckling",
            ],
            prerequisites: ["Phases 1-5"],
            skillsGained: ["Timed CAD Modeling", "Material Selection", "Failure Analysis", "Interview Presentation"],
            toolsAndTechnologies: ["SolidWorks CSWA/CSWP Sample Exams", "Ashby Material Selection Charts"],
            estimatedDuration: "3 Weeks",
            completionCriteria: "Pass a timed CSWP-level CAD sample exam.",
            learningResources: [
              {
                title: "SolidWorks Official Certification Program (CSWA / CSWP)",
                url: "https://www.solidworks.com/certifications",
                type: "documentation",
                provider: "Dassault Systèmes",
                isFree: false,
              },
            ],
            practicalAssignments: ["Model a 3-part casting assembly from a 2D drawing under a 45-minute timer."],
          },
        ],
      },
      {
        phaseNumber: 7,
        phaseName: "Phase 7 – Specialization and Growth",
        tagline: "Topology Optimization, Additive Metal Manufacturing & R&D",
        description:
          "Generative design, lattice structures, metal laser powder bed fusion (LPBF), CFD aero-thermal design, and Chief Engineer career track.",
        difficulty: "Advanced",
        topics: [
          {
            id: "mech-p7-generative-design",
            title: "Generative Design & Metal 3D Printing",
            description:
              "Topology optimization algorithms, removing redundant material along load paths, designing self-supporting lattice structures, and post-machining metal prints.",
            learningObjectives: [
              "Perform topology optimization in ANSYS reducing mass by 35% while keeping stress below yield",
              "Design parts for Laser Powder Bed Fusion (LPBF) with overhang support mitigation",
            ],
            prerequisites: ["Senior design engineering proficiency"],
            skillsGained: ["Topology Optimization", "Generative Design", "Metal Additive Manufacturing"],
            toolsAndTechnologies: ["ANSYS Topology Optimization", "nTopology", "Autodesk Generative Design"],
            estimatedDuration: "Ongoing Career Path",
            completionCriteria: "Optimize an aircraft structural bracket for titanium 3D printing.",
            learningResources: [
              {
                title: "nTopology Educational Resources",
                url: "https://ntopology.com/resources/",
                type: "documentation",
                provider: "nTopology",
                isFree: true,
              },
            ],
            practicalAssignments: ["Redesign an internal combustion engine connecting rod using topology optimization."],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 5. GOVERNMENT / PUBLIC SECTOR ROADMAP: UPSC CIVIL SERVICES
  // =========================================================================
  "roadmap-upsc-cse": {
    id: "roadmap-upsc-cse",
    title: "UPSC Civil Services Examination (IAS / IPS / IFS) Roadmap",
    targetRoleOrCourse: "UPSC Civil Services",
    type: "government",
    careerFamilyId: "government-public",
    tagline: "Rigorous 12-month structured preparation strategy for India's premier public leadership exam.",
    overview:
      "A systematic stage-by-stage pathway tailored for B.Tech engineers: leveraging engineering analytical strengths for CSAT and General Studies, selecting optional subjects, answer-writing frameworks, and personality interview preparation.",
    estimatedTotalDuration: "12 to 18 Months (30-40 hrs/week)",
    difficulty: "Advanced",
    externalResourceNotice:
      "Official examination guidelines sourced from the Union Public Service Commission (upsc.gov.in) syllabus notifications.",
    isComplete: true,
    lastUpdated: "2026",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1 – Foundation",
        tagline: "NCERT Base & Core Constitutional Literacy",
        description:
          "Foundational reading of NCERT textbooks (Class 6-12) across Indian Polity, Modern History, Geography, and Macroeconomics.",
        difficulty: "Beginner",
        topics: [
          {
            id: "upsc-p1-ncert",
            title: "NCERT Foundation & Basic Subject Coverage",
            description:
              "Read essential NCERTs to establish baseline terminology and conceptual clarity across Indian heritage, constitution, physical geography, and economic development.",
            learningObjectives: [
              "Build foundational mental maps of Indian constitutional governance (Articles 1-51A)",
              "Understand physical geomorphology, climate patterns, and monsoons",
              "Trace Indian national freedom movement milestones from 1857 to 1947",
            ],
            prerequisites: ["Undergraduate Degree", "Consistent Daily Reading Habit"],
            skillsGained: ["Conceptual Clarity", "General Knowledge Baseline", "Notes Condensation"],
            toolsAndTechnologies: ["NCERT Textbooks", "The Hindu / Indian Express Newspaper"],
            estimatedDuration: "8 Weeks",
            completionCriteria: "Complete basic NCERT reading across History, Polity, Geography, and Economy.",
            learningResources: [
              {
                title: "NCERT Official Digital Textbooks",
                url: "https://ncert.nic.in/textbook.php",
                type: "book",
                provider: "NCERT",
                isFree: true,
              },
            ],
            practicalAssignments: ["Summarize daily editorial analyses into a 150-word synthesis notebook."],
          },
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2 – Core Knowledge",
        tagline: "Standard Reference Works (Polity, History, Economy & Environment)",
        description:
          "In-depth mastery of standard reference textbooks: Laxmikanth (Polity), Spectrum (Modern History), Ramesh Singh / Nitin Singhania (Economy), and Shankar IAS (Environment).",
        difficulty: "Intermediate",
        topics: [
          {
            id: "upsc-p2-standard-books",
            title: "Standard GS Reference Textbooks",
            description:
              "Constitutional amendments, parliamentary procedures, statutory commissions, monetary and fiscal policy, ecological biodiversity, and international treaties.",
            learningObjectives: [
              "Master all provisions of the Indian Constitution via M. Laxmikanth",
              "Analyze macro-economic indicators, inflation indices, and fiscal deficits",
              "Understand global environmental conventions (UNFCCC, CBD, Ramsar sites)",
            ],
            prerequisites: ["Phase 1"],
            skillsGained: ["Polity & Governance", "Macro-Economics", "Modern History", "Ecological Sciences"],
            toolsAndTechnologies: ["Standard Reference Textbooks", "PIB (Press Information Bureau)"],
            estimatedDuration: "16 Weeks",
            completionCriteria: "Score >= 100 on previous year UPSC Prelims GS Paper I questions.",
            learningResources: [
              {
                title: "Indian Polity by M. Laxmikanth",
                type: "book",
                provider: "McGraw Hill",
                isFree: false,
              },
              {
                title: "Press Information Bureau (PIB) Government Releases",
                url: "https://pib.gov.in",
                type: "documentation",
                provider: "Government of India",
                isFree: true,
              },
            ],
            practicalAssignments: ["Map out all landmark Supreme Court constitutional judgments from Kesavananda Bharati to present."],
          },
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3 – Intermediate Skills",
        tagline: "Optional Subject Selection & Depth Study",
        description:
          "Selection of Optional Subject (e.g., Mathematics, Mechanical Engineering, Electrical Engineering, Geography, Public Administration, or Sociology) and 500-mark syllabus completion.",
        difficulty: "Advanced",
        topics: [
          {
            id: "upsc-p3-optional",
            title: "Optional Subject Paper I & Paper II Mastery",
            description:
              "B.Tech students often leverage technical optionals (Mathematics, Electrical, Mechanical, Civil) or humanities optionals (Geography, PSIR, Anthropology) for high scoring potential.",
            learningObjectives: [
              "Complete 100% syllabus coverage of both Optional Paper I and Paper II",
              "Solve last 10 years of UPSC Optional question papers with model answers",
            ],
            prerequisites: ["Phase 2"],
            skillsGained: ["Specialized Subject Authority", "Analytical Synthesis", "High-Volume Problem Solving"],
            toolsAndTechnologies: ["Optional Standard University Textbooks", "UPSC PYQs"],
            estimatedDuration: "16 Weeks",
            completionCriteria: "Complete syllabus notes and 10 full-length optional test papers.",
            learningResources: [
              {
                title: "UPSC Official Previous Question Papers",
                url: "https://upsc.gov.in/examinations/previous-question-papers",
                type: "documentation",
                provider: "UPSC",
                isFree: true,
              },
            ],
            practicalAssignments: ["Write complete 20-mark answers under a strict 10-minute timer."],
          },
        ],
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4 – Advanced Skills",
        tagline: "Mains Answer Writing & Ethics (GS Paper IV)",
        description:
          "Daily answer writing: structuring introduction, body bullet points with case studies, government schemes, diagrams, and resolving ethical dilemma case studies.",
        difficulty: "Advanced",
        topics: [
          {
            id: "upsc-p4-mains-writing",
            title: "Mains Answer Writing Frameworks & Ethics Case Studies",
            description:
              "Master the 10-mark (150 words) and 15-mark (250 words) formats. Study Western and Indian ethical philosophy, Nolan principles of public life, and emotional intelligence in administration.",
            learningObjectives: [
              "Structure answers with crisp multi-dimensional perspectives (Political, Economic, Social, Environmental, Legal)",
              "Solve complex ethics case studies balancing legal duty vs compassionate humanitarian concern",
            ],
            prerequisites: ["Phase 3"],
            skillsGained: ["Speed Handwriting (2000 words in 3 hrs)", "Ethical Case Resolution", "Diagrammatic Representation"],
            toolsAndTechnologies: ["Mains Answer Booklets", "Timer / Stopwatch"],
            estimatedDuration: "12 Weeks",
            completionCriteria: "Write 30 full 3-hour mock mains examinations across GS 1, 2, 3, and 4.",
            learningResources: [
              {
                title: "Lexicon for Ethics, Integrity & Aptitude",
                type: "book",
                provider: "Chronicle Books",
                isFree: false,
              },
            ],
            practicalAssignments: ["Complete a 3-hour full GS Paper IV Ethics paper including all 6 situational case studies."],
          },
        ],
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5 – Projects and Portfolio",
        tagline: "Prelims Intensive Test Series & CSAT Optimization",
        description:
          "Solve 50+ full-length Prelims mock tests, master option elimination techniques, and ensure CSAT qualifying threshold (>= 66/200 marks).",
        difficulty: "Advanced",
        topics: [
          {
            id: "upsc-p5-prelims-mocks",
            title: "Prelims Test Series & Negative Marking Control",
            description:
              "Simulated test series replicating real examination pressure: managing risk appetite between 75-85 attempted questions and analyzing mistake patterns.",
            learningObjectives: [
              "Consistently score 105+ in GS Paper I mock tests across reputable coaching test series",
              "Guarantee > 100 marks in CSAT Paper II to avoid disqualification",
            ],
            prerequisites: ["Phases 1-4"],
            skillsGained: ["Intelligent Elimination", "Exam Time Strategy", "Negative Marking Mitigation"],
            toolsAndTechnologies: ["OMR Sheets", "Stopwatch", "Detailed Test Series Solutions"],
            estimatedDuration: "10 Weeks",
            completionCriteria: "Score >= 110 marks on 5 consecutive full-length all-India Prelims mock exams.",
            learningResources: [
              {
                title: "UPSC Prelims Past 10 Years Solved Papers",
                type: "book",
                provider: "Disha Publications",
                isFree: false,
              },
            ],
            practicalAssignments: ["Analyze 500 incorrectly answered questions and maintain a personal mistake log book."],
          },
        ],
      },
      {
        phaseNumber: 6,
        phaseName: "Phase 6 – Industry Readiness",
        tagline: "Detailed Application Form (DAF) & Personality Test Interview",
        description:
          "Preparing the Detailed Application Form (DAF), home state governance profiles, hobbies, geopolitical stances, and mock interview boards at Dholpur House.",
        difficulty: "Advanced",
        topics: [
          {
            id: "upsc-p6-interview",
            title: "UPSC Personality Test Board Preparation",
            description:
              "Defending your engineering background, justification for choosing civil services over tech roles, national policy debates, and executive composure under cross-examination.",
            learningObjectives: [
              "Formulate balanced, constitutionally grounded perspectives on controversial socio-political topics",
              "Connect engineering degree knowledge to public infrastructure, cyber governance, and digital delivery",
              "Maintain calm, authentic, and polite composure during stressful board questioning",
            ],
            prerequisites: ["Mains qualification"],
            skillsGained: ["Executive Articulation", "Stress Management", "Policy Presentation", "Diplomatic Balance"],
            toolsAndTechnologies: ["Mock Interview Boards", "Video Recordings for Body Language Analysis"],
            estimatedDuration: "6 Weeks",
            completionCriteria: "Attend 4 peer and panel mock interviews with positive assessment on poise and depth.",
            learningResources: [
              {
                title: "UPSC Interview Transcripts & Guidance",
                type: "documentation",
                provider: "Civil Services Mentorship Forums",
                isFree: true,
              },
            ],
            practicalAssignments: ["Record a 30-minute mock interview answering questions on your engineering major and home state."],
          },
        ],
      },
      {
        phaseNumber: 7,
        phaseName: "Phase 7 – Specialization and Growth",
        tagline: "LBSNAA Training, Sub-Divisional Leadership & Cadre Policy",
        description:
          "Foundation course at Lal Bahadur Shastri National Academy of Administration (LBSNAA) Mussoorie, district training, and career progression to Joint Secretary / Chief Secretary.",
        difficulty: "Advanced",
        topics: [
          {
            id: "upsc-p7-cadre-growth",
            title: "Administrative Career Progression & Service Leadership",
            description:
              "Post-selection training at LBSNAA, field posting as Sub-Divisional Magistrate (SDM), District Magistrate (DM), departmental secretary, and international multilateral representation.",
            learningObjectives: [
              "Understand the hierarchy from Junior Time Scale (Pay Level 10) to Cabinet Secretary (Pay Level 17)",
              "Explore central deputations to ministries (Finance, Commerce, External Affairs, IT)",
            ],
            prerequisites: ["Final UPSC Selection"],
            skillsGained: ["Public Administration", "Crisis Management", "Inter-Departmental Coordination"],
            toolsAndTechnologies: ["DoPT Service Manuals", "LBSNAA Curriculum"],
            estimatedDuration: "30-Year Career Horizon",
            completionCriteria: "Successful completion of district probation.",
            learningResources: [
              {
                title: "Lal Bahadur Shastri National Academy of Administration",
                url: "https://www.lbsnaa.gov.in",
                type: "documentation",
                provider: "Government of India",
                isFree: true,
              },
            ],
            practicalAssignments: ["Study successful district administrative case studies (e.g. Swachh Bharat, digital governance)."],
          },
        ],
      },
    ],
  },
};
