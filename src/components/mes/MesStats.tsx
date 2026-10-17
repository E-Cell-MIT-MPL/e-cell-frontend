"use client";

import { motion } from "framer-motion";
import type { MesStat } from "@/data/mesEvents";
import MesCountUp from "./MesCountUp";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Headline numbers in big type, counting up each time they scroll into view. */
export default function MesStats({ stats }: { stats: MesStat[] }) {
  return (
    <div className="grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={`flex flex-col justify-between gap-3 py-8 sm:py-10 ${
            i % 2 === 1 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"
          } ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${
            i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
          } ${i % 2 === 1 ? "border-l border-white/10" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
        >
          <div className="text-[clamp(2.75rem,9vw,6rem)] font-bold leading-none tracking-[-0.05em] text-white">
            {stat.prefix && (
              <span className="text-white/45">{stat.prefix}</span>
            )}
            <MesCountUp to={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-xs leading-snug text-white/45 sm:text-sm">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
