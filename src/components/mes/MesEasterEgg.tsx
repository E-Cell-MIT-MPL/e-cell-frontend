"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { MES_EGG_EVENT } from "./mesSignals";

const SECRET = "2027";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Type 2027 anywhere on the page (or tap the 2027 in the next-edition section
 * three times). The year rolls over from 2026 to 2027 and confetti falls.
 * MesSoundtrack hears the same event and switches to the party track.
 */
export default function MesEasterEgg() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    console.log(
      "%cpsst — MES has a secret. Try typing the next year.",
      "color:#fff;background:#000;padding:4px 8px;border-radius:4px",
    );

    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)))
        return;
      typed = (typed + e.key).slice(-SECRET.length);
      if (typed === SECRET) {
        typed = "";
        window.dispatchEvent(new Event(MES_EGG_EVENT));
      }
    };
    const onEgg = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(MES_EGG_EVENT, onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(MES_EGG_EVENT, onEgg);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 7500);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="2027 unlocked"
        >
          <Confetti
            width={size.w}
            height={size.h}
            recycle={false}
            numberOfPieces={500}
            gravity={0.16}
            colors={["#ffffff", "#d4d4d4", "#8a8a8a", "#3f3f3f"]}
          />
          <div className="relative flex flex-col items-center text-center">
            {/* Year odometer: 2026 rolls over to 2027. */}
            <motion.div
              className="mb-8 flex text-[clamp(5rem,22vw,14rem)] font-bold leading-none tracking-[-0.05em] text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>202</span>
              <span className="relative inline-block h-[1em] overflow-hidden">
                <motion.span
                  className="flex flex-col"
                  initial={{ y: "0em" }}
                  animate={{ y: "-1em" }}
                  transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
                >
                  <span className="h-[1em] text-white/40">6</span>
                  <span className="h-[1em]">7</span>
                </motion.span>
              </span>
            </motion.div>

            <motion.div
              className="max-w-sm"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
                Founder mode · unlocked
              </p>
              <p className="mb-3 text-2xl font-bold tracking-tight text-white">
                You skipped ahead to 2027.
              </p>
              <p className="text-sm leading-relaxed text-white/60">
                That&apos;s the instinct. We changed the track for you. Flip the
                switch on the right whenever you need quiet.
              </p>
              <p className="mt-6 text-[11px] text-white/30">
                tap anywhere to keep exploring
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
