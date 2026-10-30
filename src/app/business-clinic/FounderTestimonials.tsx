"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { founderStories } from "./clinicData";
import ClinicBookingCTA from "./ClinicBookingCTA";
import styles from "./clinic.module.css";

export default function FounderTestimonials() {
  const [active, setActive] = useState(1);
  const touchStart = useRef<number | null>(null);
  const count = founderStories.length;
  const select = (index: number) => setActive((index + count) % count);
  return (
    <section className={styles.testimonials} aria-labelledby="stories-title">
      <div className={styles.storiesLayout}>
        <div className={styles.storiesIntro} data-reveal>
          <p className={styles.eyebrow}>03 / FOUNDERS&apos; STORIES</p>
          <h2 id="stories-title">
            REAL PEOPLE.
            <br />
            REAL PROGRESS.
          </h2>
          <p>
            Every founder&apos;s journey is different. This space is reserved
            for their experiences, in their own words.
          </p>
          <p className={styles.storiesDisclaimer}>
            Featuring founders from E-Cell associated startups.
          </p>
          <span className={styles.placeholderNotice}>
            STORY PREVIEW Â· VERIFIED CONTENT TO FOLLOW
          </span>
          <div className={styles.carouselControls}>
            <button
              type="button"
              aria-label="Previous founder story"
              onClick={() => select(active - 1)}
            >
              <ArrowLeft size={20} strokeWidth={1.3} />
            </button>
            <button
              type="button"
              aria-label="Next founder story"
              onClick={() => select(active + 1)}
            >
              <ArrowRight size={20} strokeWidth={1.3} />
            </button>
            <span aria-live="polite" aria-atomic="true">
              0{active + 1} / 0{count}
            </span>
          </div>
        </div>
        <div className={styles.carouselViewport}>
          <div
            className={styles.carousel}
            role="region"
            aria-roledescription="carousel"
            aria-label="Founder story previews"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                select(active + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                select(active - 1);
              }
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "touch")
                touchStart.current = event.clientX;
            }}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
            onPointerUp={(event) => {
              if (touchStart.current === null) return;
              const delta = event.clientX - touchStart.current;
              touchStart.current = null;
              if (Math.abs(delta) > 45) select(active + (delta < 0 ? 1 : -1));
            }}
          >
            {founderStories.map((story, index) => {
              let slot = (index - active + count) % count;
              if (slot > Math.floor(count / 2)) slot -= count;
              const isActive = active === index;
              return (
                <article
                  key={story.id}
                  className={
                    styles.storyCard +
                    (isActive ? " " + styles.storyActive : "")
                  }
                  style={
                    {
                      "--slot": slot,
                      "--depth": Math.abs(slot),
                      zIndex: 20 - Math.abs(slot),
                    } as CSSProperties
                  }
                  aria-roledescription="slide"
                  aria-label={
                    index + 1 + " of " + count + ": " + story.category
                  }
                >
                  {story.status === "verified" && (
                    <Image
                      src={story.portrait}
                      alt={story.name}
                      fill
                      sizes="(max-width: 767px) 78vw, 340px"
                      className={styles.storyPortrait}
                    />
                  )}
                  <span className={styles.storyCategory}>{story.category}</span>
                  {story.status === "placeholder" ? (
                    <>
                      <div
                        className={styles.placeholderArch}
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.storyCopy}>
                        <span className={styles.storyPending}>
                          FOUNDER STORY / COMING SOON
                        </span>
                        <h3>
                          Real journeys.
                          <br />
                          In their own words.
                        </h3>
                        <p>
                          We&apos;re making room for genuine founder
                          perspectives. Approved stories and portraits will
                          appear here.
                        </p>
                      </div>
                      <div className={styles.storyIdentity}>
                        <span>Verified story pending</span>
                        <small>Content placeholder</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <blockquote>{story.quote}</blockquote>
                      <div className={styles.storyIdentity}>
                        <span>{story.name}</span>
                        <small>{story.role}</small>
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    className={styles.storySelect}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(index)}
                    aria-label={
                      (isActive ? "Current preview: " : "View preview: ") +
                      story.category
                    }
                    aria-pressed={isActive}
                  >
                    <span
                      className={styles.storySelectArrow}
                      aria-hidden="true"
                    >
                      <ArrowRight size={21} />
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.finalAction} data-reveal>
        <ClinicBookingCTA className={styles.bookingPill} />
      </div>
      <div className={styles.endnote}>
        <span>E-CELL MIT / BUSINESS CLINIC</span>
        <a href="#clinic-title">BACK TO THE BEGINNING â†‘</a>
      </div>
    </section>
  );
}
