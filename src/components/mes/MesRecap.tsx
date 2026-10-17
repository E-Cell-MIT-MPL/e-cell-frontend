"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MesEventGroup as Group, MesStat } from "@/data/mesEvents";
import MesEventGroup from "./MesEventGroup";
import MesStats from "./MesStats";

interface MesRecapProps {
  year: number;
  stats: MesStat[];
  groups: Group[];
  /** Link to that edition's website, shown at the end. */
  siteUrl?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "What happened in {year}": headline stats, then the events in stacked
 * subsections. Only one event card is flipped at a time across all groups.
 */
export default function MesRecap({
  year,
  stats,
  groups,
  siteUrl,
}: MesRecapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  // Escape or a click outside the cards turns the open card back.
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveId(null);
    const onDown = (e: PointerEvent) => {
      if (!eventsRef.current?.contains(e.target as Node)) setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [activeId]);

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id));

  return (
    <section
      id={`mes-${year}`}
      className="relative px-4 pb-28 pt-12 sm:px-8 sm:pb-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-white/40 sm:text-xs">
            MES {year} · Recap
          </p>
          <h2 className="text-[2.75rem] font-bold leading-[0.95] tracking-tight text-white sm:text-7xl">
            What happened
            <br />
            <span className="text-white/30">in {year}.</span>
          </h2>
        </motion.div>

        <MesStats stats={stats} />

        <motion.p
          className="mb-12 mt-20 max-w-md text-sm leading-relaxed text-white/50 sm:mt-28 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          The events behind those numbers. Tap a card to see what each one was
          about.
        </motion.p>

        <div ref={eventsRef} className="flex flex-col gap-14 sm:gap-20">
          {groups.map((group, i) => (
            <MesEventGroup
              key={group.id}
              group={group}
              number={i + 1}
              activeId={activeId}
              onToggle={toggle}
            />
          ))}
        </div>

        {siteUrl && (
          <Link
            href={siteUrl}
            className="group mt-16 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white sm:mt-20"
          >
            Explore the MES {year} website
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
