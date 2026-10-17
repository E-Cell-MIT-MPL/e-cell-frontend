
"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Industry Leaders",
    desc: "Hear insights from founders and industry leaders shaping what's next.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Startup Showcase",
    desc: "Explore emerging ventures, bold ideas, and new possibilities.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "Workshops",
    desc: "Build practical skills through interactive sessions and hands-on learning.",
  },
];

export default function MESFeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`mes-cards mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ${
        visible ? "mes-cards-visible" : ""
      }`}
    >
      {cards.map((card, index) => (
        <div
          key={card.title}
          style={{ "--card-index": index } as React.CSSProperties}
          className="mes-feature-card group relative isolate min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#080808] p-5 sm:p-6"
        >
          <div
            className="mes-card-image"
            style={{ backgroundImage: `url("${card.image}")` }}
          />

          <div className="mes-card-overlay" />
          <div className="mes-card-border" />

          <div className="relative z-10">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/30">
              <svg
                className="mes-card-icon h-5 w-5 text-white/75"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d={card.icon}
                />
              </svg>
            </div>

            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
              {card.title}
            </h3>

            <p className="text-sm leading-6 text-white/65">
              {card.desc}
            </p>
          </div>
        </div>
      ))}

      <style jsx>{`
        .mes-feature-card {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 650ms ease,
            transform 350ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
          transition-delay: calc(var(--card-index) * 120ms);
          will-change: transform;
        }

        .mes-cards-visible .mes-feature-card {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .mes-cards-visible .mes-feature-card:hover {
          transform: translate3d(0, -7px, 0) scale(1.025);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.3);
        }

        .mes-card-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%);
          opacity: 0.48;
          transform: scale(1.02);
          transition:
            opacity 400ms ease,
            transform 600ms ease;
          pointer-events: none;
        }

        .mes-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            110deg,
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.35)
          );
          pointer-events: none;
        }

        .mes-cards-visible .mes-feature-card:hover .mes-card-image {
          opacity: 0.65;
          transform: scale(1.07);
        }

        .mes-card-icon {
          transition:
            transform 300ms ease,
            color 300ms ease;
        }

        .mes-cards-visible
          .mes-feature-card:hover
          .mes-card-icon {
          transform: scale(1.15);
          color: white;
        }

        .mes-card-border {
          position: absolute;
          inset: 0;
          z-index: 20;
          padding: 1px;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          background: conic-gradient(
            from var(--border-angle, 0deg),
            transparent 0deg,
            transparent 260deg,
            rgba(255, 255, 255, 0.95) 315deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 250ms ease;
        }

        .mes-cards-visible .mes-feature-card:hover .mes-card-border {
          opacity: 1;
          animation: border-trace 2.5s linear infinite;
        }

        @property --border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-trace {
          from {
            --border-angle: 0deg;
          }
          to {
            --border-angle: 360deg;
          }
        }

        @media (hover: none) {
          .mes-cards-visible .mes-feature-card:active {
            transform: scale(0.98);
            border-color: rgba(255, 255, 255, 0.4);
          }

          .mes-cards-visible .mes-feature-card:active .mes-card-image {
            opacity: 0.65;
          }

          .mes-cards-visible .mes-feature-card:active .mes-card-icon {
            transform: scale(1.1);
            color: white;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mes-feature-card,
          .mes-cards-visible .mes-feature-card {
            opacity: 1;
            transform: none;
            transition: none;
            will-change: auto;
          }

          .mes-card-image,
          .mes-card-icon {
            transition: none;
          }

          .mes-cards-visible .mes-feature-card:hover .mes-card-border {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
