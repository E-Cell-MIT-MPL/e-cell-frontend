
"use client";

import { useState } from "react";

const nodes = [
  {
    id: "ideas",
    title: "Ideas",
    description:
      "Discover problems and imagine new possibilities.",
    icon: "✳",
    x: 50,
    y: 8,
  },
  {
    id: "founders",
    title: "Founders",
    description:
      "Turn ideas into ventures through action and experimentation.",
    icon: "↗",
    x: 87,
    y: 36,
  },
  {
    id: "mentors",
    title: "Mentors",
    description:
      "Learn from experience and navigate challenges.",
    icon: "◎",
    x: 73,
    y: 82,
  },
  {
    id: "investors",
    title: "Investors",
    description:
      "Access funding and support to help ventures grow.",
    icon: "＋",
    x: 27,
    y: 82,
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Experiment, adapt, and develop useful solutions.",
    icon: "◇",
    x: 13,
    y: 36,
  },
];

export default function EntrepreneurshipEcosystem() {
 const [active, setActive] = useState<string | null>(null);
const [hovered, setHovered] = useState<string | null>(null);

const highlighted = hovered ?? active; 

  return (
    <section className="mx-auto my-20 w-full max-w-6xl px-6 md:my-24">
      <div className="mb-12 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
          The Entrepreneurship Ecosystem
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          It takes an ecosystem.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base">
          Great ventures are rarely built alone. They grow through ideas,
          people, collaboration, and the right support.
        </p>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {nodes.map((node) => (
              <line
                key={node.id}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={highlighted === node.id ? "#FFFFFF" : "#454545"}
                strokeWidth={highlighted === node.id ? "0.6" : "0.25"}
                strokeDasharray={
                  highlighted === node.id ? "0" : "1.5 1.5"
                }
              />
            ))}

            <circle
              cx="50"
              cy="50"
              r="19"
              fill="none"
              stroke="#353535"
              strokeWidth="0.25"
            />

            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#252525"
              strokeWidth="0.25"
              strokeDasharray="1 2"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/30 bg-neutral-950 sm:h-28 sm:w-28">
            <span className="text-2xl text-white/80">∞</span>
            <span className="mt-1 text-center text-[9px] font-medium uppercase tracking-wider text-white/65">
              Entrepreneurship
            </span>
          </div>

          {nodes.map((node) => {
            const isActive = highlighted === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActive(node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                aria-pressed={active === node.id}
                aria-label={`Highlight ${node.title}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                className={`absolute z-20 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-[76px] sm:w-[76px] ${
                  isActive
                    ? "scale-105 border-white/80 bg-white text-black"
                    : "border-white/20 bg-neutral-950 text-white/80 hover:border-white/50"
                }`}
              >
                <span className="text-lg">{node.icon}</span>
                <span className="mt-1 text-[10px] font-medium sm:text-xs">
                  {node.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
              What makes it work
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {nodes.map((node, index) => {
              const isActive = highlighted === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActive(node.id)}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={active === node.id}
                  className="group flex w-full items-start gap-4 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300 ${
                      isActive
                        ? "border-white/70 bg-white text-black"
                        : "border-white/15 text-white/60 group-hover:border-white/40"
                    }`}
                  >
                    {node.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      {node.title}
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-white/45">
                      {node.description}
                    </span>
                  </span>

                  <span className="pt-1 text-xs text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-6 text-white/35">
            Hover over a category or select it to highlight its connection
            to the ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
