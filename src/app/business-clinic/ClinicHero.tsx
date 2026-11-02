"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { clinicHeroMedia, clinicHeroLogo } from "./clinicHeroMedia";
import styles from "./hero.module.css";

const photographs = clinicHeroMedia.flatMap((photo) => [
  photo,
  ...(photo.companion ? [{ ...photo.companion, id: "group" }] : []),
]);

export default function ClinicHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = root.current;
    const heading = hero?.querySelector<HTMLElement>("h1");
    const copy = hero?.querySelector<HTMLElement>(`.${styles.copy}`);
    if (!heading || !copy) return;
    let mounted = true;
    const fitHeading = () => {
      if (!mounted) return;
      heading.style.removeProperty("font-size");
      const available = heading.clientWidth - 2;
      const widest = Math.max(
        ...Array.from(
          heading.querySelectorAll<HTMLElement>("[data-headline-line]"),
        ).map((line) => line.scrollWidth),
      );
      if (available > 0 && widest > available) {
        const size = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = `${(size * available) / widest}px`;
      }
    };
    fitHeading();
    const observer = new ResizeObserver(fitHeading);
    observer.observe(copy);
    document.fonts.ready.then(fitHeading);
    document.fonts.addEventListener("loadingdone", fitHeading);
    return () => {
      mounted = false;
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fitHeading);
    };
  }, []);

  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = root.current;
        if (!hero) return;
        const compact = window.matchMedia("(max-width: 767px)").matches;
        const frames = Array.from(
          hero.querySelectorAll<HTMLElement>("[data-photo-reveal]"),
        );
        frames.sort(
          (a, b) =>
            Number(b.dataset.main === "true") -
            Number(a.dataset.main === "true"),
        );
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        try {
          entrance
            .fromTo(
              "[data-hero-brand]",
              { y: compact ? 6 : 12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, clearProps: "all" },
              0,
            )
            .fromTo(
              "[data-headline-line]",
              { yPercent: compact ? 50 : 110 },
              {
                yPercent: 0,
                duration: 0.8,
                stagger: compact ? 0.08 : 0.12,
                clearProps: "all",
              },
              0.1,
            )
            .fromTo(
              frames,
              { clipPath: "inset(100% 0 0 0)" },
              {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.7,
                stagger: compact ? 0.035 : 0.065,
                clearProps: "clipPath",
              },
              0.15,
            )
            .fromTo(
              frames.map((frame) => frame.querySelector("[data-photo-scale]")),
              { scale: compact ? 1.02 : 1.06 },
              {
                scale: 1,
                duration: 0.8,
                stagger: compact ? 0.035 : 0.065,
                clearProps: "transform",
              },
              0.15,
            )
            .fromTo(
              "[data-hero-description]",
              { y: compact ? 5 : 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, clearProps: "all" },
              0.55,
            )
            .fromTo(
              "[data-hero-scroll]",
              { opacity: 0 },
              { opacity: 1, duration: 0.45, clearProps: "all" },
              0.95,
            );
        } catch {
          entrance.revert();
        }
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className={styles.hero}
      aria-labelledby="clinic-title"
      data-hero
    >
      <style>{`
        @font-face {
          font-family: "Clinic Anton";
          src: url("/fonts/anton/Anton-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <div className={styles.eyebrow} data-hero-brand>
            <Image
              src={clinicHeroLogo.src}
              width={clinicHeroLogo.width}
              height={clinicHeroLogo.height}
              alt="Business Clinic"
              className={styles.heroLogo}
              unoptimized
            />
            <span>E-CELL MIT</span>
          </div>
          <h1
            id="clinic-title"
            className={styles.headline}
            style={{
              fontFamily: '"Clinic Anton", Impact, "Arial Narrow", sans-serif',
            }}
            aria-label="BUSINESS CLINIC."
          >
            <span className={styles.lineMask} aria-hidden="true">
              <span className={styles.lineText} data-headline-line>
                BUSINESS
              </span>
            </span>
            <span className={styles.lineMask} aria-hidden="true">
              <span className={styles.lineText} data-headline-line>
                CLINIC.
              </span>
            </span>
          </h1>
          <p className={styles.description} data-hero-description>
            Real-world guidance, meaningful feedback,
            <br className={styles.lineBreak} /> and the support to move your
            startup forward.
          </p>
        </div>
        <div
          className={styles.collage}
          aria-label="E-Cell mentoring, speakers, and student entrepreneurship"
        >
          {photographs.map((photo) => (
            <figure
              key={photo.id}
              className={styles.photo}
              data-slot={photo.id}
            >
              <div
                className={styles.photoReveal}
                data-photo-reveal
                data-main={photo.id === "conversations"}
              >
                <div className={styles.photoScale} data-photo-scale>
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    priority={
                      photo.id === "conversations" || photo.id === "community"
                    }
                    sizes="(max-width: 767px) 90vw, (max-width: 1200px) 40vw, 36vw"
                    className={styles.photoImage}
                    style={{ objectPosition: photo.position }}
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <a className={styles.scroll} href="#discover" data-hero-scroll>
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={28} strokeWidth={1} aria-hidden="true" />
      </a>
    </section>
  );
}
