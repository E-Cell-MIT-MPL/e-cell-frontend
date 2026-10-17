"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { MesEvent } from "@/data/mesEvents";
import styles from "./mes.module.css";

interface MesEventCardProps {
  event: MesEvent;
  flipped: boolean;
  onToggle: () => void;
  /** Position in the group, used to stagger the entrance. */
  index: number;
  /** Extra classes from the parent grid (column spans, aspect ratio). */
  className?: string;
}

/** Flip card: event name on the front, a one-line description on the back. */
export default function MesEventCard({
  event,
  flipped,
  onToggle,
  index,
  className = "",
}: MesEventCardProps) {
  const frontRef = useRef<HTMLDivElement>(null);

  // Cursor-follow highlight on the front face (CSS vars, no re-render).
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = frontRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - r.left}px`);
    el.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      className={`[perspective:1200px] ${className}`}
      initial={{ opacity: 0, y: 40, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        onPointerMove={onPointerMove}
        aria-pressed={flipped}
        aria-label={`${event.name}: ${flipped ? event.tagline : "show description"}`}
        className="group relative block h-full w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0, scale: flipped ? 1.02 : 1 }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
            mass: 0.9,
          }}
        >
          {/* Front */}
          <div
            ref={frontRef}
            className={`${styles.cardFront} absolute inset-0 flex items-center justify-center overflow-hidden text-center rounded-2xl border border-white/10 p-3.5 backdrop-blur-sm transition-colors duration-300 [backface-visibility:hidden] group-hover:border-white/30 sm:p-4 lg:p-5`}
          >
            <span className="absolute right-3.5 top-3.5 h-1.5 w-1.5 rounded-full bg-white/25 transition-all duration-300 group-hover:scale-150 group-hover:bg-white/80 lg:right-5 lg:top-5" />
            <h4 className="text-balance text-[15px] font-bold leading-[1.08] tracking-tight text-white sm:text-lg lg:text-xl xl:text-2xl">
              {event.name}
            </h4>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white p-3 text-center text-black lg:gap-3 shadow-[0_20px_60px_-20px_rgba(255,255,255,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-4 md:p-3 lg:p-5">
            {event.meta && (
              <span className="text-[9px] font-semibold uppercase leading-tight tracking-[0.15em] text-black/45 lg:text-[10px] lg:tracking-[0.2em]">
                {event.meta}
              </span>
            )}
            <p className="text-balance text-[12.5px] font-semibold leading-snug md:text-xs lg:text-sm xl:text-base">
              {event.tagline}
            </p>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
