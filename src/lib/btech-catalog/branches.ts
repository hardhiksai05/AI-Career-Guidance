import { EngineeringBranch } from "./types";

export const ENGINEERING_BRANCHES: EngineeringBranch[] = [
  {
    id: "cse-it",
    name: "Computer Science & Information Technology",
    code: "CSE / IT",
    shortDescription:
      "Software systems, computing foundations, AI, cloud architectures, cybersecurity, and modern digital engineering.",
    longDescription:
      "Covers computing theory, data structures, algorithms, operating systems, and cutting-edge software engineering across 16 university-level specializations.",
    iconName: "Code2",
    colorGradient: {
      from: "from-purple-500/20",
      to: "to-cyan-500/20",
      border: "border-purple-500/30",
      badgeBg: "bg-purple-950/60",
      badgeText: "text-purple-300",
    },
    specializationCount: 16,
    availableCareerFamilies: [
      "software-it",
      "ai-data",
      "business-management",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    shortDescription:
      "Semiconductor physics, VLSI design, embedded hardware, signal processing, and next-generation wireless communications.",
    longDescription:
      "Bridges hardware and software across microelectronics, FPGA programming, chip design, RF communications, and autonomous robotics systems.",
    iconName: "Cpu",
    colorGradient: {
      from: "from-blue-500/20",
      to: "to-indigo-500/20",
      border: "border-blue-500/30",
      badgeBg: "bg-blue-950/60",
      badgeText: "text-blue-300",
    },
    specializationCount: 12,
    availableCareerFamilies: [
      "core-engineering",
      "software-it",
      "ai-data",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    shortDescription:
      "Electric power systems, high-voltage grids, electric vehicles, renewable energy, and power electronic converters.",
    longDescription:
      "Focuses on generation, transmission, electrical machines, electric mobility, industrial control, and smart microgrid infrastructure.",
    iconName: "Zap",
    colorGradient: {
      from: "from-amber-500/20",
      to: "to-orange-500/20",
      border: "border-amber-500/30",
      badgeBg: "bg-amber-950/60",
      badgeText: "text-amber-300",
    },
    specializationCount: 11,
    availableCareerFamilies: [
      "core-engineering",
      "business-management",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    code: "MECH",
    shortDescription:
      "Thermodynamics, mechanical design, CAD/CAM, robotics, mechatronics, and advanced automotive engineering.",
    longDescription:
      "The foundational core discipline governing physical machinery, materials technology, thermal energy, finite element analysis, and automated manufacturing.",
    iconName: "Cog",
    colorGradient: {
      from: "from-rose-500/20",
      to: "to-pink-500/20",
      border: "border-rose-500/30",
      badgeBg: "bg-rose-950/60",
      badgeText: "text-rose-300",
    },
    specializationCount: 12,
    availableCareerFamilies: [
      "core-engineering",
      "business-management",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    code: "CIVIL",
    shortDescription:
      "Structural mechanics, geotechnical foundations, transportation hubs, environmental systems, and smart city BIM.",
    longDescription:
      "Planning, designing, and constructing sustainable physical infrastructure including mega-bridges, transit highways, environmental hydraulics, and geomatics.",
    iconName: "Building2",
    colorGradient: {
      from: "from-emerald-500/20",
      to: "to-teal-500/20",
      border: "border-emerald-500/30",
      badgeBg: "bg-emerald-950/60",
      badgeText: "text-emerald-300",
    },
    specializationCount: 11,
    availableCareerFamilies: [
      "core-engineering",
      "business-management",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "chem",
    name: "Chemical & Process Engineering",
    code: "CHEM",
    shortDescription:
      "Chemical unit operations, petroleum refining, reaction kinetics, process control, and polymer engineering.",
    longDescription:
      "Applies chemistry, physics, and mathematical modelling to transform raw materials into pharmaceutical, energy, plastic, and high-performance chemical products.",
    iconName: "FlaskConical",
    colorGradient: {
      from: "from-cyan-500/20",
      to: "to-blue-500/20",
      border: "border-cyan-500/30",
      badgeBg: "bg-cyan-950/60",
      badgeText: "text-cyan-300",
    },
    specializationCount: 8,
    availableCareerFamilies: [
      "core-engineering",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "biotech",
    name: "Biotechnology & Biomedical Engineering",
    code: "BIOTECH / BME",
    shortDescription:
      "Genomics, cellular engineering, bioinformatics, biomechanics, biomedical instrumentation, and medical devices.",
    longDescription:
      "Intersects molecular biology, clinical medicine, and physical engineering to design healthcare diagnostics, therapeutic bioprocesses, and artificial organs.",
    iconName: "Dna",
    colorGradient: {
      from: "from-teal-500/20",
      to: "to-emerald-500/20",
      border: "border-teal-500/30",
      badgeBg: "bg-teal-950/60",
      badgeText: "text-teal-300",
    },
    specializationCount: 8,
    availableCareerFamilies: [
      "core-engineering",
      "ai-data",
      "research-higher-ed",
    ],
  },
  {
    id: "aero",
    name: "Aerospace & Aeronautical Engineering",
    code: "AERO",
    shortDescription:
      "Aerodynamics, propulsion systems, flight mechanics, orbital mechanics, space satellites, and UAV drones.",
    longDescription:
      "Covers commercial and military aircraft dynamics, rocket propulsion, satellite orbital guidance, spacecraft structures, and autonomous drone avionics.",
    iconName: "Rocket",
    colorGradient: {
      from: "from-sky-500/20",
      to: "to-indigo-500/20",
      border: "border-sky-500/30",
      badgeBg: "bg-sky-950/60",
      badgeText: "text-sky-300",
    },
    specializationCount: 8,
    availableCareerFamilies: [
      "core-engineering",
      "government-public",
      "research-higher-ed",
    ],
  },
  {
    id: "other-eng",
    name: "Other Core & Specialized Engineering",
    code: "SPECIALIZED",
    shortDescription:
      "Agricultural engineering, marine systems, metallurgy, materials science, mining, fire safety, and industrial technology.",
    longDescription:
      "Specialized engineering fields serving vital national and industrial sectors, from ocean vessels and metallurgy to packaging and safety systems.",
    iconName: "Layers",
    colorGradient: {
      from: "from-violet-500/20",
      to: "to-fuchsia-500/20",
      border: "border-violet-500/30",
      badgeBg: "bg-violet-950/60",
      badgeText: "text-violet-300",
    },
    specializationCount: 15,
    availableCareerFamilies: [
      "core-engineering",
      "business-management",
      "government-public",
      "research-higher-ed",
    ],
  },
];
