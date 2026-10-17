"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getImageProps } from "next/image";
import styles from "./mes.module.css";

interface MesLetterReelProps {
  /** The word whose letters act as the window, e.g. "MES". */
  text: string;
  /** Photos shown inside the letters, crossfading in turn. */
  frames: string[];
  /** Time each frame is on screen, in ms. */
  intervalMs?: number;
  /** Crossfade duration, in ms. */
  fadeMs?: number;
  className?: string;
}

/**
 * Giant text filled with a crossfading photo slideshow. Photos are clipped to
 * the glyphs (background-clip: text), so nothing shows outside the letters.
 * Each frame fades in while slowly zooming, then fades out.
 */
export default function MesLetterReel({
  text,
  frames,
  intervalMs = 2200,
  fadeMs = 900,
  className = "",
}: MesLetterReelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const loadedRef = useRef<Set<number>>(new Set());

  // Optimised (resized, AVIF/WebP) URLs from next/image, as CSS image-set().
  const layers = useMemo(
    () =>
      frames.map((src) => {
        const { props } = getImageProps({
          alt: "",
          src,
          width: 1200,
          height: 675,
          quality: 90,
        });
        const set = (props.srcSet ?? "")
          .split(", ")
          .filter(Boolean)
          .map((s) => {
            const [url, density] = s.split(" ");
            return `url("${url}") ${density}`;
          })
          .join(", ");
        return {
          src: props.src,
          srcSet: props.srcSet,
          background: set ? `image-set(${set})` : `url("${props.src}")`,
        };
      }),
    [frames],
  );

  // Preload every frame and remember which are ready.
  useEffect(() => {
    layers.forEach((layer, i) => {
      const img = new window.Image();
      img.onload = () => loadedRef.current.add(i);
      if (layer.srcSet) img.srcset = layer.srcSet;
      img.src = layer.src;
    });
  }, [layers]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || frames.length < 2) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setInterval(
      () => {
        if (document.hidden) return;
        // Skip frames that haven't loaded yet, so a fade never lands on an empty frame.
        setIndex((i) => {
          for (let k = 1; k <= frames.length; k++) {
            const next = (i + k) % frames.length;
            if (loadedRef.current.has(next)) return next;
          }
          return i;
        });
      },
      reduced ? intervalMs * 2 : intervalMs,
    );
    return () => window.clearInterval(id);
  }, [visible, frames.length, intervalMs]);

  const zoomMs = intervalMs + fadeMs;

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      aria-hidden="true"
    >
      <span className={`${styles.heroText} ${styles.letterBase} select-none`}>
        {text}
      </span>
      {layers.map((layer, i) => {
        const active = i === index;
        return (
          <span
            key={layer.src}
            className={`${styles.heroText} ${styles.letterFill} absolute inset-0 select-none`}
            style={{
              backgroundImage: layer.background,
              opacity: active ? 1 : 0,
              backgroundSize: active ? "112% auto" : "100% auto",
              // Zoom runs while the frame is up; the reset waits until it has faded out.
              transition: active
                ? `opacity ${fadeMs}ms ease-in-out, background-size ${zoomMs}ms linear`
                : `opacity ${fadeMs}ms ease-in-out, background-size 0s linear ${fadeMs}ms`,
            }}
          >
            {text}
          </span>
        );
      })}
      <span
        className={`${styles.heroText} ${styles.heroOutline} pointer-events-none absolute inset-0 select-none`}
      >
        {text}
      </span>
    </div>
  );
}
