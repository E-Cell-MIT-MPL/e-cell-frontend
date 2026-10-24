"use client";

import { Fragment, useEffect, useRef, type ElementType } from "react";

type ScatterTextProps = {
  text: string; // use "\n" for a line break
  as?: "h1" | "h2" | "h3" | "p" | "span" | "dd";
  id?: string;
  className?: string;
  /** How far (px) from the cursor letters get pushed. */
  radius?: number;
};

/** Biggest random shake (px) of a letter right next to the cursor. Lower = subtler. */
const GRAIN_SHAKE = 3;
/** A tiny drift (px) away from the cursor, so the text feels like it is crumbling. */
const GRAIN_DRIFT = 4;
/** Easing speeds. No springs, so nothing overshoots or bounces. */
const EASE_IN = 0.45; // grain appearing near the cursor
const EASE_BACK = 0.1; // letters settling back to sharp

/**
 * Text that turns subtly grainy near the cursor: letters shimmer, fade a little
 * and blur slightly, like film grain or dust, then settle sharp again when the
 * cursor leaves. Plain DOM + requestAnimationFrame, no libraries. Screen readers
 * get the normal text; the effect is skipped for touch screens and "reduce motion".
 */
export default function ScatterText({
  text,
  as = "span",
  id,
  className = "",
  radius = 80,
}: ScatterTextProps) {
  const Tag = as as ElementType;
  const rootRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const chars = charRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );
    const state = chars.map(() => ({ x: 0, y: 0, o: 1, b: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let frame = 0;

    const tick = () => {
      raf = 0;
      frame++;
      const rect = root.getBoundingClientRect();

      const near =
        pointer !== null &&
        pointer.x > rect.left - radius &&
        pointer.x < rect.right + radius &&
        pointer.y > rect.top - radius &&
        pointer.y < rect.bottom + radius;

      let moving = false;
      // Re-roll the grain only every 2nd frame so it shimmers instead of buzzing.
      const reroll = frame % 2 === 0;

      chars.forEach((el, i) => {
        const s = state[i];
        let tx = 0;
        let ty = 0;
        let to = 1;
        let tb = 0;
        let grainy = false;

        if (near && pointer) {
          // offsetLeft/offsetTop ignore transforms, so this is the letter's resting spot.
          const cx = rect.left + el.offsetLeft + el.offsetWidth / 2;
          const cy = rect.top + el.offsetTop + el.offsetHeight / 2;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < radius) {
            const t = 1 - dist / radius;
            const strength = t * t * (3 - 2 * t); // smooth falloff
            const r1 = reroll ? Math.random() : 0.5;
            const r2 = reroll ? Math.random() : 0.5;
            const r3 = reroll ? Math.random() : 0.5;
            tx = (dx / dist) * strength * GRAIN_DRIFT + (r1 - 0.5) * 2 * strength * GRAIN_SHAKE;
            ty = (dy / dist) * strength * GRAIN_DRIFT + (r2 - 0.5) * 2 * strength * GRAIN_SHAKE;
            to = 1 - strength * (0.25 + 0.4 * r3); // some letters fade more: patchy, like grain
            tb = strength * 0.9;
            grainy = true;
          }
        }

        const ease = grainy ? EASE_IN : EASE_BACK;
        s.x += (tx - s.x) * ease;
        s.y += (ty - s.y) * ease;
        s.o += (to - s.o) * ease;
        s.b += (tb - s.b) * ease;

        if (
          Math.abs(s.x) > 0.05 ||
          Math.abs(s.y) > 0.05 ||
          Math.abs(1 - s.o) > 0.01 ||
          s.b > 0.05
        ) {
          moving = true;
          el.style.transform = `translate(${s.x}px, ${s.y}px)`;
          el.style.opacity = String(s.o);
          el.style.filter = `blur(${s.b}px)`;
        } else {
          s.x = s.y = s.b = 0;
          s.o = 1;
          el.style.transform = "";
          el.style.opacity = "";
          el.style.filter = "";
        }
      });

      if (near || moving) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer = null; // cursor left the window
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseout", onOut);
      if (raf) cancelAnimationFrame(raf);
      chars.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
      });
    };
  }, [radius, text]);

  let index = 0;
  const lines = text.split("\n");

  return (
    <Tag ref={rootRef} id={id} className={`relative ${className}`}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <Fragment key={li}>
              {words.map((word, wi) => (
                <Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((ch, ci) => {
                      const i = index++;
                      return (
                        <span
                          key={ci}
                          ref={(el) => {
                            charRefs.current[i] = el;
                          }}
                          className="inline-block"
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </Fragment>
              ))}
              {li < lines.length - 1 ? <br /> : null}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
