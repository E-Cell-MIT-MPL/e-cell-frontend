"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Gates the single global canvas for this page. Once first exposed, it stays
 * mounted across scrolling; its render loop is suspended behind the hero.
 */
export default function ClinicBackgroundGate({
  children,
}: {
  children: (active: boolean) => ReactNode;
}) {
  const [state, setState] = useState({
    mounted: false,
    active: false,
    motionAllowed: false,
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersects = false;
    let hasBeenExposed = false;
    let intersection: IntersectionObserver | undefined;
    let discovery: MutationObserver | undefined;

    const update = () => {
      const motionAllowed = !media.matches;
      if (intersects && motionAllowed) hasBeenExposed = true;
      setState((previous) => {
        const next = {
          mounted: hasBeenExposed,
          active: intersects && motionAllowed,
          motionAllowed,
        };
        return previous.mounted === next.mounted &&
          previous.active === next.active &&
          previous.motionAllowed === next.motionAllowed
          ? previous
          : next;
      });
    };

    const observeRegion = () => {
      const region = document.querySelector("[data-clinic-background-region]");
      if (!region) return false;
      const bounds = region.getBoundingClientRect();
      intersects = bounds.top < window.innerHeight && bounds.bottom > 0;
      // A zero threshold treats touching the viewport edge as intersecting
      // and may not report the first visible pixels on the next scroll.
      intersection = new IntersectionObserver(
        ([entry]) => {
          intersects =
            entry.isIntersecting && entry.intersectionRatio >= 0.0001;
          update();
        },
        { threshold: 0.0001 },
      );
      intersection.observe(region);
      discovery?.disconnect();
      update();
      return true;
    };

    media.addEventListener("change", update);
    if (!observeRegion()) {
      // App Router may stream the page after the shared layout has mounted.
      discovery = new MutationObserver(() => {
        observeRegion();
      });
      discovery.observe(document.body, { childList: true, subtree: true });
      update();
    }

    return () => {
      media.removeEventListener("change", update);
      intersection?.disconnect();
      discovery?.disconnect();
    };
  }, []);

  // Reduced motion never creates a WebGL context; the global charcoal fill
  // remains behind the page. Other routes do not use this gate.
  return state.mounted && state.motionAllowed ? children(state.active) : null;
}
