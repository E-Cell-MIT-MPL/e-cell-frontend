"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 300, suffix: "+", label: "Startups Associated", sub: "Ventures supported across MAHE" },
  { number: 25, suffix: "+", label: "VCs & Investors", sub: "Connected through MES and Pitch Tank" },
  { number: 5, prefix: "₹", suffix: "Cr+", label: "Funding Offered", sub: "Across 9 editions of MES" },
];

function useCounter(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active, index }: { stat: typeof stats[0]; active: boolean; index: number }) {
  const count = useCounter(stat.number, 1800, active);

  return (
    <div
      className="group py-12 lg:py-16 px-0 flex flex-col justify-between min-h-[180px] border-b border-white/10 lg:border-b-0"
      style={{
        opacity: 0,
        animation: active ? `fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s forwards` : "none",
      }}
    >
      <div>
        {/* Big number */}
        <div className="flex items-end gap-0 mb-3">
          {"prefix" in stat && stat.prefix && (
            <span
              className="text-white font-black mb-[0.35em]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              {stat.prefix}
            </span>
          )}
          <span
            className="text-white font-black leading-none"
            style={{ fontSize: "clamp(4rem, 10vw, 9rem)", letterSpacing: "-0.04em", lineHeight: "0.85" }}
          >
            {count}
          </span>
          <span
            className="text-white font-black mb-[0.35em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            {stat.suffix}
          </span>
        </div>
        <p className="text-white/80 font-semibold text-base sm:text-lg tracking-wide uppercase mb-2">
          {stat.label}
        </p>
        <p className="text-white/30 text-sm leading-relaxed">{stat.sub}</p>
      </div>
    </div>
  );
}

export default function StatsSection() {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("st-in-view"); });
      },
      { threshold: 0.2 }
    );
    const els = sectionRef.current?.querySelectorAll(".st-reveal");
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black/60 backdrop-blur-sm py-32 lg:py-48 border-t border-white/5">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .st-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .st-reveal.st-in-view { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        {/* Section header */}
        <p className="st-reveal text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
          03 — Impact
        </p>
        <h2
          className="st-reveal text-white font-black leading-[0.88] mb-24"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          RESULTS THAT<br />MATTER
        </h2>

        {/* Stats grid with dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`${i > 0 ? "lg:pl-16" : ""} ${i < stats.length - 1 ? "lg:pr-16" : ""}`}>
              <StatItem stat={stat} active={active} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
