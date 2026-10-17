// Data for the MES (Manipal Entrepreneurship Summit) page.
// Keep copy here so sections stay presentational and easy to edit.

export interface MesEvent {
  id: string;
  name: string;
  /** One short line shown on the back of the card. */
  tagline: string;
  /** Small label on the back of the card, e.g. the prize pool. */
  meta?: string;
}

export interface MesStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface MesEventGroup {
  id: string;
  title: string;
  /** One-line summary shown beside the group title. */
  blurb: string;
  events: MesEvent[];
}

export const mesEventGroups2026: MesEventGroup[] = [
  {
    id: "competitions",
    title: "Competitions",
    blurb: "Five arenas, with just shy of ₹3 lakh in prizes.",
    events: [
      {
        id: "pitch-tank",
        name: "Pitch Tank",
        tagline:
          "Founders pitched live to VCs, angels and alumni for real funding.",
        meta: "₹1.5L prize pool",
      },
      {
        id: "conceptio",
        name: "Conceptiō",
        tagline:
          "A national ideathon that pushed raw ideas to proof-of-concept.",
        meta: "₹75K prize pool",
      },
      {
        id: "blindspot",
        name: "Blindspot",
        tagline: "You're the VC. Find the fatal flaw before you fund it.",
        meta: "₹25K prize pool",
      },
      {
        id: "case-maze",
        name: "Case Maze",
        tagline: "Real startup crises, two rounds, no easy answers.",
        meta: "₹25K prize pool",
      },
      {
        id: "money-quest",
        name: "Money Quest",
        tagline: "Treasure hunt meets bidding wars meets Monopoly.",
        meta: "₹20K prize pool",
      },
    ],
  },
  {
    id: "platforms",
    title: "Flagship platforms",
    blurb: "Where policy got written and startups set up shop.",
    events: [
      {
        id: "ipc",
        name: "Innovation Policy Consortium",
        tagline:
          "Students drafted startup policy and presented it to government.",
        meta: "National · Policy",
      },
      {
        id: "innovation-mela",
        name: "Innovation Mela",
        tagline:
          "A campus-long expo of startups, with investors walking the floor.",
        meta: "Startup expo",
      },
    ],
  },
  {
    id: "conclaves",
    title: "Conclaves",
    blurb: "Three rooms of conversations worth leaving with.",
    events: [
      {
        id: "coining-the-future",
        name: "Coining the Future",
        tagline: "Fintech voices on money's shift to digital-first.",
        meta: "Fintech panel",
      },
      {
        id: "built-by-her",
        name: "Built By Her",
        tagline: "Women founders on leadership and building to last.",
        meta: "Leadership panel",
      },
      {
        id: "mindverse",
        name: "Mindverse",
        tagline: "AI, mixed reality and the future of human experience.",
        meta: "Tech & society",
      },
    ],
  },
];

export const mesStats2026: MesStat[] = [
  { value: 30, suffix: "K+", label: "People through the gates" },
  { value: 50, suffix: "+", label: "Speakers on stage" },
  { value: 10, label: "Competitions, platforms and conclaves" },
  {
    value: 3,
    prefix: "≈₹",
    suffix: "L",
    label: "In prizes, just shy of three lakh",
  },
];

/** Frames for the hero reel — event photos from MES 2026, in /public/mes/reel. */
export const mesReelFrames: string[] = Array.from(
  { length: 14 },
  (_, i) => `/mes/reel/${String(i + 1).padStart(2, "0")}.webp`,
);
