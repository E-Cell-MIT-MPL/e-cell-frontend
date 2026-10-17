"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MesLetterReel from "./MesLetterReel";

interface MesHeroProps {
  /** Photos shown inside the MES letters. */
  frames: string[];
  /** Optional year shown after the summit name. */
  year?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "E-Cell MIT Manipal presents MES — Manipal Entrepreneurship Summit",
 * followed by the MES mindset statement. The MES letters are windows onto
 * the event photos; the page background shows around them. The title drifts
 * back and fades as you scroll past it.
 */
export default function MesHero({ frames, year }: MesHeroProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      className="relative flex flex-col items-center px-4 pb-24 pt-1 sm:pb-32 sm:pt-2"
      aria-label="MES"
    >
      <h1 className="sr-only">
        E-Cell MIT Manipal presents MES — Manipal Entrepreneurship Summit
        {year ? ` ${year}` : ""}
      </h1>

      <motion.div
        ref={titleRef}
        className="flex flex-col items-center text-center"
        style={{ scale, opacity, y }}
      >
        <motion.p
          className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-white/55 sm:mb-3 sm:text-xs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          E-Cell MIT Manipal presents
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 1.15, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <MesLetterReel text="MES" frames={frames} />
        </motion.div>

        <motion.div
          className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/40 sm:w-16" />
          <span className="text-sm font-semibold tracking-wide text-white/85 sm:text-xl">
            Manipal Entrepreneurship Summit
            {year && (
              <span className="ml-3 font-normal tracking-[0.3em] text-white/50">
                {year}
              </span>
            )}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/40 sm:w-16" />
        </motion.div>
      </motion.div>

      {/* The MES mindset */}
      <motion.div
        className="mt-14 max-w-3xl text-center sm:mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      >
        <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
          Don&apos;t just imagine the future.{" "}
          <span className="text-white/45">Build it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
          Entrepreneurship is more than starting a business. It&apos;s about
          spotting opportunities, challenging the status quo, and transforming
          ideas into solutions that matter.
        </p>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-white/80 sm:text-sm">
          Think boldly. Question everything. Build what matters.
        </p>
      </motion.div>
    </section>
  );
}
