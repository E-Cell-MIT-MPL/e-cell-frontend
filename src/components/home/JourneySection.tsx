"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { num: "01", label: "IDEA", desc: "A spark of insight" },
  { num: "02", label: "EXPOSURE", desc: "Workshops & events" },
  { num: "03", label: "NETWORK", desc: "Founders & peers" },
  { num: "04", label: "MENTORSHIP", desc: "Expert guidance" },
  { num: "05", label: "EXECUTION", desc: "Build & validate" },
  { num: "06", label: "VENTURE", desc: "Startup launched" },
];

export default function JourneySection() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("journey-in-view");
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".journey-reveal");
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black/60 backdrop-blur-sm py-32 lg:py-48 border-t border-white/5 overflow-hidden">
      <style>{`
        .journey-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .journey-reveal.journey-in-view { opacity: 1; transform: translateY(0); }
        .journey-reveal:nth-child(2) { transition-delay: 0.1s; }

        @keyframes stageIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <p className="journey-reveal text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
          02 — The Journey
        </p>
        <h2
          className="journey-reveal text-white font-black leading-[0.88] mb-20 lg:mb-28"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          FROM IDEA<br />TO VENTURE
        </h2>

        {/* Desktop: horizontal stages */}
        <div className="hidden lg:block relative">
          {/* Horizontal rule */}
          <div className="absolute top-[1.35rem] left-0 right-0 h-px bg-white/10" />

          <div className="grid grid-cols-6 gap-0 relative">
            {stages.map((stage, i) => (
              <div
                key={stage.label}
                className="flex flex-col pr-6"
                style={
                  active
                    ? {
                        animation: `stageIn 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
                      }
                    : { opacity: 0 }
                }
              >
                {/* Dot on the line */}
                <div className="flex items-center gap-2.5 mb-7 relative z-10">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/40 bg-black"
                    style={
                      active
                        ? {
                            backgroundColor: i === stages.length - 1 ? "white" : undefined,
                            boxShadow: i === stages.length - 1 ? "0 0 12px rgba(255,255,255,0.6)" : undefined,
                          }
                        : {}
                    }
                  />
                  <span className="text-white/20 text-[10px] font-mono tracking-widest">{stage.num}</span>
                </div>

                <p className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-1.5">
                  {stage.label}
                </p>
                <p className="text-white/35 text-xs leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stacked */}
        <div className="lg:hidden flex flex-col border-t border-white/10">
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              className="flex items-start gap-6 py-7 border-b border-white/8"
              style={
                active
                  ? { animation: `stageIn 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both` }
                  : { opacity: 0 }
              }
            >
              <span className="text-white/15 font-black font-mono text-3xl w-12 flex-shrink-0">{stage.num}</span>
              <div className="pt-1">
                <p className="text-white font-semibold text-base tracking-widest uppercase mb-1">
                  {stage.label}
                </p>
                <p className="text-white/40 text-sm">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
