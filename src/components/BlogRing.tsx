"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlogCard, { type BlogPost, getEditionNumber, formatDate } from "./BlogCard";

/** How far (in px) the cursor must travel sideways to turn the ring by one card. */
const STEP_PX = 70;
/** Minimum time between two turns, so a quick mouse flick doesn't spin the ring wildly. */
const COOLDOWN_MS = 550;

const pad = (num: number) => String(num).padStart(2, "0");

type BlogRingProps = {
  posts: BlogPost[];
};

export default function BlogRing({ posts }: BlogRingProps) {
  const n = posts.length;
  const [step, setStep] = useState(0);
  const [cardW, setCardW] = useState(300);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const lastX = useRef<number | null>(null);
  const travelled = useRef(0);
  const lastTurn = useRef(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mq.matches);
    const syncSize = () => setCardW(window.innerWidth < 640 ? 250 : 300);

    syncMotion();
    syncSize();
    mq.addEventListener("change", syncMotion);
    window.addEventListener("resize", syncSize);
    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  // Fallback: a normal grid for people who prefer reduced motion, or if there are too few cards for a ring.
  if (reduceMotion || n < 3) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  const pillButton =
    "inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  // "View all" mode: every edition in a normal grid.
  if (showAll) {
    return (
      <div>
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={() => setShowAll(false)}
            aria-pressed="true"
            className={pillButton}
          >
            ← Back to 3D ring
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }

  const theta = 360 / n;
  const radius = Math.max(
    Math.round((cardW / 2 / Math.tan(Math.PI / n)) * 1.3),
    240
  );
  const active = ((step % n) + n) % n;
  const go = (dir: 1 | -1) => setStep((s) => s + dir);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (lastX.current === null) {
      lastX.current = e.clientX;
      return;
    }
    travelled.current += e.clientX - lastX.current;
    lastX.current = e.clientX;

    if (Math.abs(travelled.current) >= STEP_PX) {
      const now = performance.now();
      if (now - lastTurn.current > COOLDOWN_MS) {
        go(travelled.current > 0 ? 1 : -1); // cursor moves right -> next card
        lastTurn.current = now;
      }
      travelled.current = 0;
    }
  };

  const resetPointer = () => {
    lastX.current = null;
    travelled.current = 0;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") touchStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // swipe left -> next card
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const arrowButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Past editions of Startup Scoop"
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="select-none touch-pan-y"
    >
      <p className="sr-only" aria-live="polite">
        Showing {posts[active].title}, {active + 1} of {n}
      </p>

      {/* 3D stage */}
      <div
        className="relative mx-auto h-[500px] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        {/* Ellipse on the "floor" under the ring */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 h-28 w-[85%] max-w-4xl -translate-x-1/2 rounded-[50%] border border-white/15"
        />

        {/* The rotating ring */}
        <div
          className="absolute left-1/2 top-8"
          style={{
            width: cardW,
            height: 400,
            marginLeft: -cardW / 2,
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius}px) rotateX(-6deg) rotateY(${-step * theta}deg)`,
            transition: "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {posts.map((post, i) => {
            const offset = (((i - step) % n) + n) % n;
            const d = offset > n / 2 ? offset - n : offset; // signed distance from the front
            const isActive = d === 0;
            const nearby = Math.abs(d) <= 1;
            const edition = getEditionNumber(post.title);

            return (
              <div
                key={post.id}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                  opacity: isActive ? 1 : nearby ? 0.5 : 0,
                  pointerEvents: nearby ? "auto" : "none",
                  backfaceVisibility: "hidden",
                  transition: "opacity 600ms ease",
                }}
              >
                <a
                  href={post.postURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={
                    isActive
                      ? `${post.title} (opens on LinkedIn in a new tab)`
                      : `Show ${post.title}`
                  }
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setStep(step + d); // bring a side card to the front
                    }
                  }}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-black/60 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive ? "border-white/60" : "border-white/20"
                  }`}
                >
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-white/5">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="300px"
                      className={`object-cover transition duration-500 ${
                        isActive ? "" : "grayscale"
                      }`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                    />
                    {edition && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-4 select-none text-6xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]"
                      >
                        {edition}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                    <h3 className="mb-2 line-clamp-1 text-base font-bold text-white">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-white/60">
                      {post.description}
                    </p>
                    <span className="mt-auto pt-3 text-xs font-semibold uppercase tracking-widest text-white">
                      {isActive ? "Read on LinkedIn →" : "Bring to front"}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous edition"
          className={arrowButton}
        >
          ←
        </button>
        <span
          aria-hidden="true"
          className="text-xs font-medium uppercase tabular-nums tracking-[0.3em] text-white/60"
        >
          {pad(active + 1)} / {pad(n)}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next edition"
          className={arrowButton}
        >
          →
        </button>
      </div>
      <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/30">
        Move your cursor sideways or swipe to spin
      </p>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll(true)}
          aria-pressed="false"
          className={pillButton}
        >
          View all {n} editions
        </button>
      </div>
    </div>
  );
}
