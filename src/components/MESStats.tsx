
"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 50, suffix: "+", label: "Speakers" },
  { number: 100, suffix: "+", label: "Startups" },
  { number: 30000, suffix: "+", label: "Footfall" },
];

export default function MESStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setVisible(true);
      setCounts(stats.map((stat) => stat.number));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const duration = 1400;
    const startTime = performance.now();
    let animationFrame: number;

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((stat) =>
          Math.floor(stat.number * easedProgress)
        )
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCounts(stats.map((stat) => stat.number));
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [visible]);

  return (
    <div
      ref={sectionRef}
      className={`mx-auto mb-20 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0 ${
        visible ? "mes-stats-visible" : ""
      }`}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          style={{ "--stat-index": index } as React.CSSProperties}
          className={`mes-stat-item group relative flex min-h-32 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] sm:rounded-none sm:border-0 sm:bg-transparent sm:hover:bg-transparent ${
            index > 0 ? "sm:border-l sm:border-white/15" : ""
          }`}
        >
          <div className="text-3xl font-black tracking-tight text-white transition-transform duration-300 group-hover:scale-105 sm:text-4xl">
            {counts[index].toLocaleString("en-IN")}
            {stat.suffix}
          </div>

          <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
            {stat.label}
          </div>

          <div className="mes-stat-line" />
        </div>
      ))}

      <style jsx>{`
        .mes-stat-item {
          opacity: 1;
          transform: translateY(0);
        }

        .mes-stats-visible .mes-stat-item {
          animation: stats-enter 600ms ease both;
          animation-delay: calc(var(--stat-index) * 150ms);
        }

        .mes-stat-line {
          width: 0;
          height: 1px;
          margin-top: 16px;
          background: rgba(255, 255, 255, 0.65);
          transition: width 400ms ease;
        }

        .mes-stats-visible .mes-stat-item .mes-stat-line {
          width: 28px;
          transition-delay: calc(var(--stat-index) * 150ms + 300ms);
        }

        .mes-stat-item:hover .mes-stat-line {
          width: 52px;
        }

        @keyframes stats-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mes-stat-item,
          .mes-stats-visible .mes-stat-item {
            opacity: 1;
            transform: none;
            animation: none;
            transition: none;
          }

          .mes-stat-line,
          .mes-stats-visible .mes-stat-item .mes-stat-line {
            width: 28px;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
