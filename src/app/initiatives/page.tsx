import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativesClientView from "@/components/initiatives/InitiativesClientView";

export const metadata: Metadata = {
  title: "Our Initiatives | E-Cell MIT Manipal - Empowering Ventures & Innovation",
  description:
    "Explore E-Cell MIT Manipal's initiatives: Startup Scoop, Business Clinic, E-10 Summit, IPC, Conceptio, the Alumni Post Series, and MES programs including Pitch Tank, Money Quest, and Case Maze.",
  openGraph: {
    title: "Our Initiatives | E-Cell MIT Manipal",
    description:
      "Explore E-Cell MIT Manipal's initiatives: Startup Scoop, Business Clinic, E-10 Summit, IPC, Conceptio, the Alumni Post Series, and MES programs including Pitch Tank, Money Quest, and Case Maze.",
    url: "https://ecellmit.com/initiatives",
    siteName: "E-Cell MIT Manipal",
    images: [
      {
        url: "/picture_e10_summit.webp",
        width: 1200,
        height: 630,
        alt: "E-Cell MIT Manipal Initiatives",
      },
    ],
    type: "website",
  },
};

export default function InitiativesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startup Scoop",
        description:
          "Bi-monthly entrepreneurship newsletter showcasing venture analysis and student startups.",
        url: "https://ecellmit.com/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Business Clinic",
        description:
          "Structured venture mentorship and diagnostic clinic for student founders.",
        url: "https://ecellmit.com/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "E-10 Summit",
        description:
          "Inter-collegiate entrepreneurship summit uniting MAHE institution E-Cells.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Innovation Policy Consortium",
        description:
          "Student-led policy forum formulating recommendation white papers for MES.",
        url: "https://ecellmit.com/ipc",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Conceptio",
        description:
          "Flagship business plan competition providing cash grants and incubation.",
        url: "https://ecellmit.com/conceptio-form",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Alumni Post Series",
        description:
          "Editorial profiles spotlighting E-Cell and MAHE alumni career paths and founder journeys.",
        url: "https://ecellmit.com/blog",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Postmortem",
        description:
          "A reflective session format for learning from venture, product, and event outcomes.",
        url: "https://ecellmit.com/mes",
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "Money Quest",
        description:
          "A finance-themed competition combining a treasure hunt, bidding, and strategy gameplay.",
        url: "https://ecellmit.com/mes",
      },
      {
        "@type": "ListItem",
        position: 9,
        name: "Pitch Tank",
        description:
          "A live startup pitching competition featured at Manipal Entrepreneurship Summit 2026.",
        url: "https://ecellmit.com/mes",
      },
      {
        "@type": "ListItem",
        position: 10,
        name: "Case Maze",
        description:
          "A two-round business case competition built around real startup crises.",
        url: "https://ecellmit.com/mes",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-16 bg-black/40 backdrop-blur-md border-b border-white/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-4">
            04 — Ecosystem & Action
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mb-5 text-white tracking-tight">
            Our Initiatives
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Discover the year-round summits, diagnostic clinics, publications,
            and policy consortiums building a robust founder ecosystem at MIT
            Manipal and across MAHE.
          </p>
        </div>
      </section>

      {/* Client View with Filter Tabs & Grid */}
      <InitiativesClientView />

      <Footer />
    </div>
  );
}
