// /data/ipc-config.ts

export const REGISTRATION_CLOSES_DATE = "2025-12-17T23:59:59";
export const SUBMISSION_CLOSES_DATE = "2026-01-21T23:59:59";

// --- Types ---
export type Benefit = {
  title: string;
  subtitle: string;
  description: string;
};

export type Step = {
  id: number;
  date: string;
  start: string;
  end: string;
  title: string;
  short: string;
  details: string[];
  deliverables: string[];
  evaluation: string[];
  type: "round" | "event";
};

// --- Data ---
export const IPC_BENEFITS: Benefit[] = [
  {
    title: "Policy Formulation Experience",
    subtitle: "Practical exposure to policy formulation",
    description: "Hands-on policy formulation & ecosystem analysis.",
  },
  {
    title: "National Policy Network",
    subtitle: "Inter-college collaboration platform",
    description: "Strengthening student research culture & policy network.",
  },
  {
    title: "Present to Government",
    subtitle: "Showcase policy recommendations at MES 2026",
    description:
      "Submission of 'Bharat Yuva Innovation Policy Recommendation 2026'.",
  },
  {
    title: "Real-World Impact",
    subtitle: "Contribute to national startup ecosystem",
    description:
      "Address pressing challenges within India's business and startup ecosystem.",
  },
];

export const STEPS: Step[] = [
  {
    id: 1,
    date: "9th Dec — 17th Dec, 2025",
    start: "2025-12-09T00:00:00",
    end: REGISTRATION_CLOSES_DATE,
    title: "Phase 1: Registration Phase",
    short: "Registration and team formation.",
    details: [
      "Eligibility criteria:Open only to college E-Cells and entrepreneurship-driven student organizations.",
      "Mode of Registration: Through the official E-Cell MIT Manipal website.",
    ],
    deliverables: ["Official team registration via portal "],
    evaluation: ["N/A"],
    type: "event",
  },
  {
    id: 2,
    date: "Deadline: 23rd Dec, 2025",
    start: "2025-12-18T00:00:00",
    end: SUBMISSION_CLOSES_DATE,
    title: "Phase 2: Case Study Submission",
    short: "Submission of Case Study for Policy.",
    details: [
      "Teams will identify real-world policy and business ecosystem problems",
      "Submission of Case Study for Policy",
      "Details on the format will be released soon",
    ],
    deliverables: ["Policy Case Study Document"],
    evaluation: [
      "Relevance to India's startup ecosystem",
      "Clarity of problem statement",
    ],
    type: "round",
  },
  {
    id: 3,
    date: "10th Jan, 2026",
    start: "2026-01-10T00:00:00",
    end: "2026-01-10T23:59:59",
    title: "Phase 3: Evaluation – GD Round",
    short: "Group Discussion (GD) Round for shortlisted teams.",
    details: [
      "Group Discussion (GD) Round",
      "Guidelines for the GD will be released soon",
    ],
    deliverables: ["Active participation in GD"],
    evaluation: ["Policy insight", "Team collaboration", "Argument quality"],
    type: "event",
  },
  {
    id: 4,
    date: "Deadline: 21st Jan, 2026",
    start: "2026-01-11T00:00:00",
    end: "2026-01-21T23:59:59",
    title: "Phase 4: Final Policy Document Submission",
    short: "Submission of research-backed policy solution.",
    details: [
      "Teams must develop and submit a comprehensive research-backed policy solution.",
      "Final Policy Document Submission date is 21st January, 2026.",
    ],
    deliverables: ["Final Policy Recommendation Document "],
    evaluation: [
      "Research depth",
      "Feasibility",
      "Potential impact of solution",
    ],
    type: "round",
  },
  {
    id: 5,
    date: "11th Feb, 2026",
    start: "2026-02-11T00:00:00",
    end: "2026-02-11T23:59:59",
    title: "Phase 5: Policy Compilation Event",
    short: "Policy recommendation document compilation at IPC 2026.",
    details: [
      "Policy recommendation document compilation at the Innovation Policy Consortium 2026",
      "Venue: MIT Manipal",
    ],
    deliverables: ["N/A"],
    evaluation: ["N/A"],
    type: "event",
  },
  {
    id: 6,
    date: "12th Feb, 2026",
    start: "2026-02-12T00:00:00",
    end: "2026-02-12T23:59:59",
    title: "Phase 6: Final Presentation at MES 2026",
    short:
      "Presentation of 'Bharat Yuva Innovation Policy Recommendation 2026'.",
    details: [
      "Presentation of 'Bharat Yuva Innovation Policy Recommendation 2026' to the government of Karnataka  at the inauguration of the Manipal Entrepreneurship Summit 2026",
      "Venue: MIT Manipal",
    ],
    deliverables: ["Final presentation of policy"],
    evaluation: ["Overall presentation quality", "Policy impact statement"],
    type: "event",
  },
];
