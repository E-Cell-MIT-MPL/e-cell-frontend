"use client";

import { useEffect, useRef, useState } from "react";

const initiatives = [
  {
    num: "01",
    heading: "Startup Scoop",
    description:
      "A bi-monthly newsletter delivering the latest news, trends, and updates from the world of entrepreneurship. Highlighting groundbreaking innovations, inspiring success stories, and spotlighting startups from MAHE with their journeys and achievements.",
    tag: "Newsletter",
  },
  {
    num: "02",
    heading: "Business Clinic",
    description:
      "A structured mentorship program helping startups refine ideas, validate feasibility, and identify target markets. Startups test core functionality, gather user feedback, and launch simplified products guided by key performance metrics to ensure market readiness.",
    tag: "Mentorship",
  },
  {
    num: "03",
    heading: "E-10 Summit",
    description:
      "The E10 Entrepreneurship Summit brings MAHE's entrepreneurial communities together to foster collaboration and innovation. Featuring discussions, success stories, charter signings, and initiatives — building a stronger entrepreneurial ecosystem in Manipal.",
    tag: "Summit",
  },
];

function InitiativeBlock({
  initiative,
  index,
  active,
}: {
  initiative: (typeof initiatives)[0];
  index: number;
  active: boolean;
}) {
  return (
    <div
      className="group border-b border-white/10 last:border-b-0 overflow-hidden cursor-default"
      style={
        active
          ? {
              animation: `fadeSlideUp 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s both`,
            }
          : { opacity: 0 }
      }
    >
      {/* Hover background */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[80px,1fr,32px] items-center gap-6 lg:gap-10 py-10 lg:py-14 transition-all duration-300 group-hover:px-4">
        {/* Number + tag */}
        <div className="flex lg:flex-col items-center lg:items-start gap-3">
          <span className="text-white/20 font-mono text-xs tracking-widest tabular-nums">{initiative.num}</span>
          <span className="text-white/30 text-[10px] font-medium tracking-[0.15em] uppercase border border-white/10 px-2 py-0.5">
            {initiative.tag}
          </span>
        </div>

        {/* Content */}
        <div>
          <h3
            className="text-white font-bold leading-tight mb-0 group-hover:mb-4 transition-all duration-300"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
          >
            {initiative.heading}
          </h3>
          {/* Description hidden until hover */}
          <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-2xl max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out">
            {initiative.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-end">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/20 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* Subtle bottom highlight on hover */}
      <div className="h-px bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
    </div>
  );
}

export default function InitiativesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ini-in-view");
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".ini-reveal");
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="initiatives"
      ref={sectionRef}
      className="bg-black/60 backdrop-blur-sm py-32 lg:py-48 border-t border-white/5"
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ini-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .ini-reveal.ini-in-view { opacity: 1; transform: translateY(0); }
        .ini-reveal:nth-child(2) { transition-delay: 0.1s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="ini-reveal text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
              04 — What We Do
            </p>
            <h2
              className="ini-reveal text-white font-black leading-[0.88]"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
            >
              WHAT<br />WE DO
            </h2>
          </div>
          <a
            href="/initiatives"
            className="ini-reveal inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-200 group self-start lg:mb-3"
          >
            View All
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Initiative list */}
        <div className="border-t border-white/10">
          {initiatives.map((initiative, i) => (
            <InitiativeBlock
              key={initiative.heading}
              initiative={initiative}
              index={i}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
