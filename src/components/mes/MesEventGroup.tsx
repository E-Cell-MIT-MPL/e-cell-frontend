"use client";

import { motion } from "framer-motion";
import type { MesEventGroup as Group } from "@/data/mesEvents";
import MesEventCard from "./MesEventCard";

interface MesEventGroupProps {
  group: Group;
  /** 1-based position, shown as 01, 02, … */
  number: number;
  activeId: string | null;
  onToggle: (id: string) => void;
}

// Static class maps so Tailwind can see every class.
const MD_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};
const SPAN: Record<number, string> = {
  1: "col-span-6",
  2: "col-span-3",
  3: "col-span-2",
};

/**
 * Phones get a 6-column grid with rows of at most 3 cards, balanced so there's
 * never a lone card (5 → 2 + 3). Rows of 3 use taller cards so the text fits.
 */
function mobileRows(n: number): number[] {
  const rows = Math.ceil(n / 3);
  const base = Math.floor(n / rows);
  const extra = n % rows;
  return Array.from(
    { length: rows },
    (_, i) => base + (i >= rows - extra ? 1 : 0),
  );
}

/**
 * One subsection of the events grid: a numbered header and a full-width row
 * of flip cards. Every group's row is the same height on md+, so cards in
 * smaller groups simply get wider.
 */
export default function MesEventGroup({
  group,
  number,
  activeId,
  onToggle,
}: MesEventGroupProps) {
  const n = group.events.length;
  const perCard = mobileRows(n).flatMap(
    (len) => Array(len).fill(len) as number[],
  );

  return (
    <div>
      <motion.div
        className="mb-5 flex flex-col gap-1 border-t border-white/15 pt-5 sm:mb-6 md:flex-row md:items-baseline md:justify-between"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-white/35">
            {String(number).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {group.title}
          </h3>
        </div>
        <p className="text-xs text-white/45 sm:text-sm">{group.blurb}</p>
      </motion.div>

      <div
        className={`grid grid-cols-6 gap-2.5 sm:gap-3 md:h-[clamp(9.5rem,17vw,14.5rem)] lg:gap-4 ${MD_COLS[n] ?? ""}`}
      >
        {group.events.map((event, i) => {
          const rowLen = perCard[i];
          return (
            <MesEventCard
              key={event.id}
              event={event}
              index={i}
              flipped={activeId === event.id}
              onToggle={() => onToggle(event.id)}
              className={`${SPAN[rowLen]} md:col-span-1 ${
                rowLen === 3 ? "aspect-[3/4]" : "aspect-square"
              } md:aspect-auto md:h-full`}
            />
          );
        })}
      </div>
    </div>
  );
}
