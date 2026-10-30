"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clinicHeroMedia, clinicHeroLogo } from "./clinicHeroMedia";
import styles from "./hero.module.css";

export default function ClinicHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = root.current;
        if (!hero) return;
        const lines = hero.querySelectorAll<HTMLElement>(
          "[data-headline-line]",
        );
        const photos = hero.querySelectorAll<HTMLElement>(
          "[data-photo-reveal]",
        );
        const support = hero.querySelectorAll<HTMLElement>(
          "[data-hero-support]",
        );
        const entrance = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            hero.setAttribute("data-hero-entered", "");
            gsap.set([...lines, ...photos, ...support], {
              clearProps: "transform,opacity",
            });
          },
        });
        entrance
          .fromTo(
            photos,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.075, duration: 0.8 },
            0.05,
          )
          .fromTo(
            lines,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.18, duration: 0.9 },
            0.25,
          )
          .fromTo(
            support,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
            0.85,
          );

        const cursors = [
          ...hero.querySelectorAll<HTMLElement>("[data-photo-cursor]"),
        ].map((node, i) => ({
          x: gsap.quickTo(node, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(node, "y", { duration: 1.2, ease: "power3.out" }),
          depth: clinicHeroMedia[i].depth,
        }));
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          cursors.forEach(({ x: setX, y: setY, depth }) => {
            setX(x * 12 * depth);
            setY(y * 10 * depth);
          });
        };
        const reset = () =>
          cursors.forEach(({ x, y }) => {
            x(0);
            y(0);
          });
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", reset);
        hero
          .querySelectorAll<HTMLElement>("[data-photo-scroll]")
          .forEach((photo, i) => {
            gsap.to(photo, {
              yPercent: clinicHeroMedia[i].depth * -5,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          });
        return () => {
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", reset);
        };
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
      <div className={styles.collage}>
        {clinicHeroMedia.map((media, index) => (
          <figure key={media.id} className={styles.photo} data-slot={media.id}>
            <div className={styles.photoReveal} data-photo-reveal>
              <div className={styles.photoScroll} data-photo-scroll>
                <div className={styles.photoCursor} data-photo-cursor>
                  {media.companion ? (
                    <div className={styles.photoPair}>
                      {[media, media.companion].map((photo) => (
                        <div className={styles.photoFrame} key={photo.image}>
                          <Image
                            src={photo.image}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 600px) 21vw, (max-width: 1000px) 16vw, 12vw"
                            className={styles.photoImage}
                            style={{ objectPosition: photo.position }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={media.image}
                      alt={media.alt}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 600px) 55vw, (max-width: 1000px) 40vw, 30vw"
                      className={styles.photoImage}
                      style={{ objectPosition: media.position }}
                    />
                  )}
                </div>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.copy}>
        <p className={styles.eyebrow} data-hero-support>
          <Image
            src={clinicHeroLogo.src}
            width={clinicHeroLogo.width}
            height={clinicHeroLogo.height}
            alt="Business Clinic"
            className={styles.heroLogo}
            unoptimized
          />{" "}
          BUSINESS CLINIC / E-CELL MIT
        </p>
        <h1
          id="clinic-title"
          className={styles.headline}
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
        <p className={styles.description} data-hero-support>
          Real-world guidance, meaningful feedback,
          <br className={styles.lineBreak} /> and the support to move your
          startup forward.
        </p>
      </div>
      <a className={styles.scroll} href="#discover" data-hero-support>
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={28} strokeWidth={1} aria-hidden="true" />
      </a>
    </section>
  );
}
