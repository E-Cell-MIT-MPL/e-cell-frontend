export interface InitiativeItem {
  id: string;
  num: string;
  heading: string;
  category:
    | "Mentorship"
    | "Summits"
    | "Publications"
    | "Policy & Incubation"
    | "Alumni & Community"
    | "Workshops";
  tag: string;
  status: string;
  image: string;
  description: string;
  fullDescription?: string;
  link?: string;
  actionLabel?: string;
  isExternalLink?: boolean;
  statBadge?: string;
  highlights?: string[];
}

export const INITIATIVE_CATEGORIES = [
  "All",
  "Mentorship",
  "Summits",
  "Publications",
  "Policy & Incubation",
  "Alumni & Community",
  "Workshops",
] as const;

export type InitiativeCategory = (typeof INITIATIVE_CATEGORIES)[number];

export const initiativesData: InitiativeItem[] = [
  {
    id: "startup-scoop",
    num: "01",
    heading: "Startup Scoop",
    category: "Publications",
    tag: "Newsletter",
    status: "Bi-Monthly Release",
    image: "/blogScreenshot.webp",
    description:
      "A bi-monthly publication delivering the latest developments, venture stories, and market analysis across the global and Indian startup landscape. Spotlights MAHE student founders and breakthrough innovations.",
    fullDescription:
      "Startup Scoop is E-Cell MIT Manipal's signature bi-monthly newsletter, bridging the gap between student innovators and real-world market intelligence. Each edition unpacks emerging tech sectors, loss-leader mechanics, venture funding patterns, and exclusive founder journey retrospectives.",
    link: "/blog",
    actionLabel: "Read Editions",
    isExternalLink: false,
    statBadge: "16+ Editions",
    highlights: [
      "Spotlights student-run ventures across MAHE",
      "Analysis of trending IPOs, AI shifts, and VC funding",
      "Over 5,000+ readers across campus & LinkedIn community",
    ],
  },
  {
    id: "business-clinic",
    num: "02",
    heading: "Business Clinic",
    category: "Mentorship",
    tag: "Mentorship & Advisory",
    status: "Year-Round Program",
    image: "/logo_business_clinic.webp",
    description:
      "A structured diagnostic and mentorship clinic helping early-stage student startups validate product-market fit, design go-to-market strategies, and test core functionality with industry mentors.",
    fullDescription:
      "Business Clinic operates as an intensive venture clinic for student entrepreneurs. Through milestone-driven diagnostic frameworks, startups test unit economics, refine problem statements, and build launch-ready MVPs under seasoned advisor guidance.",
    link: "/about",
    actionLabel: "Connect with Mentors",
    isExternalLink: false,
    statBadge: "40+ Startups Advised",
    highlights: [
      "1-on-1 problem-solution diagnostic reviews",
      "Customer validation and pricing model architecture",
      "Direct pathway to incubation at MUTBI & Innovation Centre",
    ],
  },
  {
    id: "e-10-summit",
    num: "03",
    heading: "E-10 Summit",
    category: "Summits",
    tag: "MAHE Leadership",
    status: "Annual Summit",
    image: "/initiatives/e10-summit.webp",
    description:
      "The premier inter-collegiate entrepreneurship summit uniting entrepreneurship bodies across all MAHE institutions to build institutional synergy, share best practices, and sign collaborative charters.",
    fullDescription:
      "The E-10 Entrepreneurship Summit brings together leadership teams from 10+ MAHE college entrepreneurship cells. The summit addresses cross-campus resource pooling, joint incubation pipelines, and unified sponsorship engagement to supercharge Manipal's regional startup cluster.",
    link: "https://www.linkedin.com/company/ecellmit",
    actionLabel: "Explore Summit Recap",
    isExternalLink: true,
    statBadge: "10+ Campuses United",
    highlights: [
      "Signatory landmark MAHE Entrepreneurship Charter",
      "Unified cross-college startup exchange network",
      "High-level strategy roundtables with academic leaders",
    ],
  },
  {
    id: "innovation-policy-consortium",
    num: "04",
    heading: "Innovation Policy Consortium",
    category: "Policy & Incubation",
    tag: "Policy & Governance",
    status: "Flagship Forum",
    image: "/initiatives/ipc.webp",
    description:
      "A national student-driven policy initiative challenging university teams to research real ecosystem bottlenecks and submit actionable white papers to state government leadership at MES.",
    fullDescription:
      "The Innovation Policy Consortium (IPC) empowers college cells to analyze real-world policy constraints in India's startup ecosystem. Selected teams formulate research-backed policy recommendations compiled into the official 'Bharat Yuva Innovation Policy Recommendation'.",
    link: "/ipc",
    actionLabel: "Explore IPC Portal",
    isExternalLink: false,
    statBadge: "Government Presentation",
    highlights: [
      "Multi-round research & Group Discussion evaluations",
      "Direct recommendation presentation to government delegates",
      "National collaboration platform for university policy think tanks",
    ],
  },
  {
    id: "conceptio",
    num: "05",
    heading: "Conceptio",
    category: "Policy & Incubation",
    tag: "B-Plan & Incubation",
    status: "Annual Challenge",
    image: "/initiatives/conceptio.webp",
    description:
      "The flagship business plan and pitching competition of E-Cell MIT Manipal, translating nascent technology concepts into viable, fundable enterprise ventures with cash prizes and incubation backing.",
    fullDescription:
      "Conceptio is the launching pad for collegiate ventures. Participants receive hands-on mentoring through product pitch rounds, business modeling workshops, and final presentation stages in front of seasoned angel investors and venture capitalists.",
    link: "/conceptio-form",
    actionLabel: "View Competition",
    isExternalLink: false,
    statBadge: "Cash Grants & Incubation",
    highlights: [
      "Structured ideation-to-prototype pipeline",
      "Pitch reviews before active angel investors and VCs",
      "Fast-track incubation through the MAHE Innovation Centre",
    ],
  },
  {
    id: "alumni-post-series",
    num: "06",
    heading: "Alumni Post Series",
    category: "Alumni & Community",
    tag: "Founder Stories",
    status: "Alumni Spotlight",
    image: "/people.jpg",
    description:
      "A story series spotlighting E-Cell and MAHE alumni—their career paths, founder journeys, lessons learned, and the people and ideas that helped shape their work.",
    fullDescription:
      "Alumni Post Series brings the experiences of E-Cell and MAHE alumni back to campus. Through editorial profiles and conversations, the series aims to share practical lessons from building careers and ventures with the next generation of student entrepreneurs.",
    link: "/blog",
    actionLabel: "Explore Stories",
    isExternalLink: false,
    highlights: [
      "Profiles of alumni and their professional journeys",
      "Lessons and perspectives for aspiring founders",
    ],
  },
  {
    id: "postmortem",
    num: "07",
    heading: "Postmortem",
    category: "Alumni & Community",
    tag: "Founder Learnings",
    status: "Event Series",
    image: "/initiatives/postmortem.webp",
    description:
      "A reflective session format for unpacking what happened after a venture, product, or event—surfacing decisions, setbacks, and lessons that others can learn from.",
    fullDescription:
      "Postmortem creates space for honest, structured reflection on projects and entrepreneurial efforts: what the team set out to do, what actually happened, and what they would change next time. The emphasis is on learning rather than assigning blame.",
    link: "/mes",
    actionLabel: "Explore MES",
    isExternalLink: false,
    highlights: [
      "A candid look at decisions, challenges, and outcomes",
      "Practical takeaways for future student teams",
    ],
  },
  {
    id: "money-quest",
    num: "08",
    heading: "Money Quest",
    category: "Summits",
    tag: "MES Competition",
    status: "MES 2026",
    image: "/initiatives/money-quest.webp",
    description:
      "A finance-themed competition blending a treasure hunt, bidding, and Monopoly-style strategy.",
    fullDescription:
      "Money Quest combines a treasure hunt with bidding rounds and Monopoly-inspired gameplay. It was featured among the competitions at Manipal Entrepreneurship Summit 2026.",
    link: "/mes",
    actionLabel: "Explore MES",
    isExternalLink: false,
    statBadge: "MES Competition",
    highlights: [
      "Treasure-hunt and bidding challenges",
      "Strategy-focused, Monopoly-inspired gameplay",
    ],
  },
  {
    id: "pitch-tank",
    num: "09",
    heading: "Pitch Tank",
    category: "Summits",
    tag: "Founder Pitching",
    status: "MES 2026",
    image: "/initiatives/pitch-tank.webp",
    description:
      "A live pitching competition where founders presented to venture capitalists, angel investors, and alumni.",
    fullDescription:
      "Pitch Tank was featured at Manipal Entrepreneurship Summit 2026, giving founders the opportunity to pitch live to VCs, angels, and alumni. The MES event listing describes a prize pool, but current availability and application details should be confirmed with event organizers.",
    link: "/mes",
    actionLabel: "Explore MES",
    isExternalLink: false,
    statBadge: "MES Competition",
    highlights: [
      "Live startup pitches to investors and alumni",
      "Prize and application details depend on the current edition",
    ],
  },
  {
    id: "case-maze",
    num: "10",
    heading: "Case Maze",
    category: "Summits",
    tag: "Case Competition",
    status: "MES 2026",
    image: "/initiatives/case-maze.webp",
    description:
      "A case competition built around real startup crises, challenging participants to work through difficult business decisions across two rounds.",
    fullDescription:
      "Case Maze was listed among the Manipal Entrepreneurship Summit 2026 competitions. Its format centers on real startup crises and a two-round challenge. Confirm the current edition's registration and event details with the organizers.",
    link: "/mes",
    actionLabel: "Explore MES",
    isExternalLink: false,
    statBadge: "MES Competition",
    highlights: [
      "Two rounds based on startup crisis cases",
      "Business decision-making under constraints",
    ],
  },
  {
    id: "techventure",
    num: "11",
    heading: "TechVenture",
    category: "Workshops",
    tag: "Hands-On Workshop",
    status: "August 2026",
    image: "/initiatives/techventure.jpg",
    description:
      "A hands-on workshop where students dived into web development, AI agents, startup ideation, and built their own websites — all in one event.",
    fullDescription:
      "TechVenture was a multi-track workshop designed to give students practical experience across the core pillars of modern entrepreneurship and technology. Participants explored web development fundamentals, experimented with AI agents, worked through startup idea generation frameworks, and walked away having built and deployed their own websites. The event blended learning with doing — giving every attendee a real, tangible output.",
    link: "/initiatives",
    actionLabel: "Explore Initiatives",
    isExternalLink: false,
    statBadge: "Aug 7, 2026",
    highlights: [
      "Web development fundamentals and live site building",
      "Hands-on introduction to AI agents and automation",
      "Startup idea generation and validation frameworks",
    ],
  },
];

export const INITIATIVE_METRICS = [
  { value: "11", label: "Initiatives Featured" },
  { value: "6", label: "Initiative Categories" },
  { value: "4", label: "MES Programs Featured" },
  { value: "2", label: "Alumni & Community Formats" },
] as const;
