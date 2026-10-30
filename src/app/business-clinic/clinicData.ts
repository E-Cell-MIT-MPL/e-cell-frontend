import { Lightbulb, Compass, Coins, Users, Sprout } from "lucide-react";

export const services = [
  {
    title: "Idea Validation",
    icon: Lightbulb,
    keyword: "TEST THE POSSIBILITY.",
    description:
      "Understand your idea's potential, identify assumptions, and explore whether your solution addresses a real need.",
    detail: "The problem. The people. The proof.",
    tag: "START WITH A BETTER QUESTION",
  },
  {
    title: "Business Strategy",
    icon: Compass,
    keyword: "FIND YOUR DIRECTION.",
    description:
      "Explore business models, market positioning, and practical approaches to building a sustainable venture.",
    detail: "A clearer model. A more deliberate move.",
    tag: "MAKE YOUR NEXT MOVE COUNT",
  },
  {
    title: "Mentorship",
    icon: Users,
    keyword: "BORROW PERSPECTIVE.",
    description:
      "Gain perspectives from experienced mentors and individuals familiar with entrepreneurial challenges.",
    detail: "A fresh pair of eyes on what matters.",
    tag: "YOU DON'T HAVE TO GO ALONE",
  },
  {
    title: "Fundraising Guidance",
    icon: Coins,
    keyword: "BUILD YOUR CASE.",
    description:
      "Understand funding readiness, investor expectations, and how to communicate your venture effectively.",
    detail: "Readiness before the pitch.",
    tag: "TURN YOUR THINKING INTO A STORY",
  },
  {
    title: "Network & Growth",
    icon: Sprout,
    keyword: "OPEN NEW DOORS.",
    description:
      "Discover opportunities to connect, collaborate, and grow within the entrepreneurial ecosystem.",
    detail: "Good company. New possibilities.",
    tag: "PROGRESS IS A SHARED JOURNEY",
  },
];

export type FounderStory =
  | { status: "placeholder"; id: string; category: string }
  | {
      status: "verified";
      id: string;
      category: string;
      name: string;
      role: string;
      quote: string;
      portrait: string;
    };

// Replace a placeholder only with an approved quote, identity, and licensed portrait.
// Deliberately no generated founders, invented affiliations, or example endorsements.
export const founderStories: FounderStory[] = [
  { status: "placeholder", id: "validation", category: "Idea → validation" },
  { status: "placeholder", id: "strategy", category: "Strategy" },
  { status: "placeholder", id: "mentorship", category: "Mentorship" },
  { status: "placeholder", id: "growth", category: "Network & growth" },
];
