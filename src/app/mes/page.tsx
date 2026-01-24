import { Metadata } from "next";
import Link from "next/link";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DomeGallery from "@/components/DomeGallery";

const mesGalleryImages = [
  {
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    alt: "Audience at a startup event",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Panel discussion on stage",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Networking at an entrepreneurship summit",
  },
  {
    src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80",
    alt: "Speaker presenting at a conference",
  },
  {
    src: "https://images.unsplash.com/photo-1522202222206-79c6a5fd3e0e?auto=format&fit=crop&w=1200&q=80",
    alt: "Students collaborating on laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    alt: "Workshop session in progress",
  },
  {
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    alt: "Startup pitch on stage",
  },
];

const pastSpeakersRow1 = [
  {
    name: "Aarav Mehta",
    title: "Founder & CEO",
    company: "Nova Labs",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Diya Kapoor",
    title: "Partner",
    company: "Crest Capital",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rohan Nair",
    title: "Head of Product",
    company: "Bluemint",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Isha Verma",
    title: "Co-founder",
    company: "OrbitX",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
  },
];

const pastSpeakersRow2 = [
  {
    name: "Karthik Rao",
    title: "VP, Growth",
    company: "ZenStack",
    image:
      "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mira Shah",
    title: "Angel Investor",
    company: "Shah Ventures",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cffc6?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Aditya Singh",
    title: "CTO",
    company: "HelioGrid",
    image:
      "https://images.unsplash.com/photo-1544723795-432537d12f6c?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sara Fernandes",
    title: "Head of Innovation",
    company: "Northbridge",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90d61b7?auto=format&fit=crop&w=400&q=80",
  },
];

// Dome settings (code-only “controls”)
// Tweak these values to change how the dome looks/behaves on /mes.
const MES_DOME_CONFIG = {
  // Visual density
  segments: 25,

  // Dome radius (indirect). Higher = bigger/closer dome.
  fit: 0.6,

  // Interaction + motion
  autoRotate: true,
  autoRotateSpeedDegPerSec: 6,
  stopAutoRotateOnUserInteraction: true,
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,

  // Enlarge size
  openedImageWidth: "298px",
  openedImageHeight: "298px",

  // Styling
  overlayBlurColor: "#020617",
  grayscale: true,
} as const;

// Static metadata for SEO
export const metadata: Metadata = {
  title:
    "MES 2026 Coming Soon | Manipal Entrepreneurship Summit - E-Cell MIT Manipal",
  description:
    "Get ready for MES 2026 - Manipal Entrepreneurship Summit. Join the biggest entrepreneurship event at MIT Manipal. Register your interest and be the first to know when tickets go live.",
};

export default function MESComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <Navbar />

      {/* Dome Gallery Hero (first thing users see) */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <DomeGallery images={mesGalleryImages} {...MES_DOME_CONFIG} />
        </div>

        {/* Subtle overlay + text */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-900/90 pointer-events-none" />
        {/* Bottom fade for smoother scroll transition */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-500 bg-clip-text text-transparent">
              MES 2026
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-200">
              Manipal Entrepreneurship Summit
            </p>
            <p className="mt-2 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
              Get ready for the biggest entrepreneurship event of the year. Where innovation meets
              opportunity, and dreams become reality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Past Speakers – parallax background + 2 carousels */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Parallax-ish background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-fixed bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="pointer-events-none absolute -top-48 left-[-10%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-24 right-[-10%] h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes mes-marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              @keyframes mes-marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            `,
          }}
        />

        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-300/80">
              Our Past Speakers
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
              Leaders who&apos;ve shared their stories at MES
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
              Two quick highlights from previous editions.
            </p>
          </div>

          {/* Carousel Row 1 */}
          <div className="relative mb-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent" />

            <div className="overflow-hidden py-1">
              <div
                className="flex gap-6 md:gap-8"
                style={{ width: "max-content", animation: "mes-marquee-left 28s linear infinite" }}
              >
                {[...pastSpeakersRow1, ...pastSpeakersRow1].map((s, i) => (
                  <button
                    key={`${s.name}-r1-${i}`}
                    type="button"
                    className="group relative h-80 w-64 shrink-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 text-left shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                  >
                    {/* Speaker image */}
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-active:scale-100"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-950/40 to-slate-950/95" />

                    {/* Pixel border glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl border border-slate-700/70 group-hover:border-blue-400/80 group-active:border-blue-400/90 transition-colors duration-300" />

                    {/* Pixel corners */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-3 top-3 h-1.5 w-6 rounded-full bg-blue-400/0 group-hover:bg-blue-400/80 group-active:bg-blue-300 transition-colors duration-300" />
                      <div className="absolute right-3 top-3 h-1.5 w-6 rounded-full bg-purple-400/0 group-hover:bg-purple-400/80 group-active:bg-purple-300 transition-colors duration-300" />
                      <div className="absolute left-3 bottom-3 h-1.5 w-6 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/80 group-active:bg-cyan-300 transition-colors duration-300" />
                      <div className="absolute right-3 bottom-3 h-1.5 w-6 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/80 group-active:bg-emerald-300 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="relative flex h-full flex-col justify-end px-5 pb-5 pt-6">
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-300/80">
                        Past Speaker
                      </p>
                      <p className="text-lg font-semibold text-white group-hover:text-slate-50">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        {s.title} · <span className="text-slate-100">{s.company}</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Row 2 */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent" />

            <div className="overflow-hidden py-1">
              <div
                className="flex gap-6 md:gap-8"
                style={{ width: "max-content", animation: "mes-marquee-right 32s linear infinite" }}
              >
                {[...pastSpeakersRow2, ...pastSpeakersRow2].map((s, i) => (
                  <button
                    key={`${s.name}-r2-${i}`}
                    type="button"
                    className="group relative h-80 w-64 shrink-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 text-left shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-active:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-950/40 to-slate-950/95" />
                    <div className="pointer-events-none absolute inset-0 rounded-3xl border border-slate-700/70 group-hover:border-blue-400/80 group-active:border-blue-400/90 transition-colors duration-300" />
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-3 top-3 h-1.5 w-6 rounded-full bg-blue-400/0 group-hover:bg-blue-400/80 group-active:bg-blue-300 transition-colors duration-300" />
                      <div className="absolute right-3 top-3 h-1.5 w-6 rounded-full bg-purple-400/0 group-hover:bg-purple-400/80 group-active:bg-purple-300 transition-colors duration-300" />
                      <div className="absolute left-3 bottom-3 h-1.5 w-6 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/80 group-active:bg-cyan-300 transition-colors duration-300" />
                      <div className="absolute right-3 bottom-3 h-1.5 w-6 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/80 group-active:bg-emerald-300 transition-colors duration-300" />
                    </div>
                    <div className="relative flex h-full flex-col justify-end px-5 pb-5 pt-6">
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-300/80">
                        Past Speaker
                      </p>
                      <p className="text-lg font-semibold text-white group-hover:text-slate-50">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        {s.title} · <span className="text-slate-100">{s.company}</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/about"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Learn About E-Cell
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
