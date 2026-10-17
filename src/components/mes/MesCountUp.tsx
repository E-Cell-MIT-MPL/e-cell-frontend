"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface MesCountUpProps {
  to: number;
  from?: number;
  /** Seconds. */
  duration?: number;
  /** Group digits Indian-style (30,000). Turn off for years. */
  grouped?: boolean;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A number that counts up every time it scrolls into view, and resets when it
 * leaves so it plays again on the way back. Renders the final value on the
 * server and for reduced motion.
 */
export default function MesCountUp({
  to,
  from = 0,
  duration = 1.8,
  grouped = true,
  className,
}: MesCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduced = useReducedMotion();
  const format = (v: number) =>
    grouped ? Math.round(v).toLocaleString("en-IN") : String(Math.round(v));

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!inView) {
      el.textContent = format(from);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // format only depends on `grouped`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, from, to, duration, grouped]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
