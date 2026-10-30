"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./clinic.module.css";

export default function ClinicExperience({
  children,
}: {
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const match = gsap.matchMedia();
    const context = gsap.context(() => {
      match.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
            clearProps: "all",
          });
        });
        gsap.to(progress.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
          },
        });
      });
    }, root);

    // Re-measure once local fonts and imagery settle without retaining handlers.
    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => {
      mounted = false;
      match.revert();
      context.revert();
    };
  }, []);

  return (
    <div ref={root} className={styles.page}>
      <div
        ref={progress}
        className={styles.scrollProgress}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
