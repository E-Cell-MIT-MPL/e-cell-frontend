"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MES_EGG_EVENT } from "./mesSignals";
import MesCountUp from "./MesCountUp";
import styles from "./mes.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

interface MesNextEditionProps {
  year?: number;
}

/** Teaser for the upcoming edition, with a "rendering" bar. */
export default function MesNextEdition({ year = 2027 }: MesNextEditionProps) {
  // Three quick taps on the year also unlock the easter egg (for phones without a keyboard).
  const taps = useRef<number[]>([]);
  const onYearTap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1500), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      window.dispatchEvent(new Event(MES_EGG_EVENT));
    }
  };

  return (
    <section className="relative px-4 py-28 sm:px-8 sm:py-40">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.4em] text-white/45 sm:text-xs">
          Next edition
        </p>

        <h2 className="mb-6 flex items-baseline gap-[0.2em] text-[clamp(4rem,17vw,12rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white">
          MES
          <button
            type="button"
            onClick={onYearTap}
            className={`${styles.shimmerText} cursor-default outline-none`}
          >
            <MesCountUp
              to={year}
              from={year - 7}
              duration={1.4}
              grouped={false}
            />
          </button>
        </h2>

        <p className="mb-10 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
          The sequel is in the works.
        </p>

        <div className="mb-10 w-full max-w-md">
          <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <span>Rendering</span>
            <span>mes_{year}</span>
          </div>
          <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10">
            <span
              className={`${styles.loader} absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent`}
            />
          </div>
        </div>

        <p className="max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
          Bigger stages, sharper competitions, louder nights. Dates and lineup
          drop soon. Until then, here&apos;s the bar {year - 1} set.
        </p>
      </motion.div>
    </section>
  );
}
