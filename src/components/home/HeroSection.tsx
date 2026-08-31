"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2.0;
    // Trigger reveal after a tiny delay so CSS animations fire after paint
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggleAudio = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  const wordClass = (delay: string) =>
    `block overflow-hidden`;

  const innerClass = (delay: string) =>
    `block transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      loaded ? "opacity-100 translate-y-0 skew-y-0" : "opacity-0 translate-y-[0.5em] skew-y-2"
    }`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(2%, 1%); }
          30% { transform: translate(-1%, 4%); }
          40% { transform: translate(3%, -2%); }
          50% { transform: translate(-3%, 1%); }
          60% { transform: translate(1%, 3%); }
          70% { transform: translate(-2%, -1%); }
          80% { transform: translate(2%, -3%); }
          90% { transform: translate(-1%, 2%); }
        }
        .hero-grain {
          animation: grain 7s steps(1) infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-sub {
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-cta {
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Breathing glow on the hero text */
        @keyframes textBreath {
          0%, 100% { text-shadow: 0 0 40px rgba(255,255,255,0); }
          50%       { text-shadow: 0 0 80px rgba(255,255,255,0.06); }
        }
        .hero-headline span.text-white {
          animation: textBreath 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(100%) contrast(1.15) brightness(1.15)", opacity: 0.9 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Film grain overlay — animated */}
      <div
        className="hero-grain absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
          opacity: 0.045,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pt-28 pb-24 lg:pt-36">

        {/* Eyebrow — fades up */}
        <p
          className="text-white/45 text-xs font-medium tracking-[0.35em] uppercase mb-10 hero-sub"
          style={{ animationDelay: "0.1s" }}
        >
          MIT Manipal · Official Entrepreneurship Cell
        </p>

        {/* Main headline — word reveal */}
        <h1 className="hero-headline text-left mb-10">
          {/* IDEAS */}
          <span className={wordClass("0s")}>
            <span
              className={`block text-white font-black ${loaded ? "opacity-100 translate-y-0 [skew-y:0deg]" : "opacity-0 translate-y-[0.5em] [skew-y:2deg]"} transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
              style={{
                fontSize: "clamp(4rem, 13vw, 12rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.88",
                transitionDelay: "0.15s",
              }}
            >
              IDEAS
            </span>
          </span>

          {/* INTO */}
          <span className={wordClass("0.3s")}>
            <span
              className={`block text-white/22 font-black ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.5em]"} transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
              style={{
                fontSize: "clamp(4rem, 13vw, 12rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.88",
                transitionDelay: "0.3s",
              }}
            >
              INTO
            </span>
          </span>

          {/* IMPACT. */}
          <span className={wordClass("0.5s")}>
            <span
              className={`block text-white font-black ${loaded ? "opacity-100 translate-y-0 [skew-y:0deg]" : "opacity-0 translate-y-[0.5em] [skew-y:2deg]"} transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
              style={{
                fontSize: "clamp(4rem, 13vw, 12rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.88",
                transitionDelay: "0.45s",
              }}
            >
              IMPACT.
            </span>
          </span>
        </h1>

        {/* Subtext + CTAs */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mt-14 items-end hero-cta"
          style={{ animationDelay: "0.7s" }}
        >
          <div>
            <p className="text-white/70 text-lg sm:text-xl font-light leading-relaxed mb-2">
              Where ideas meet opportunity.
            </p>
            <p className="text-white/35 text-sm sm:text-base leading-relaxed max-w-md">
              At E-Cell MIT Manipal, we build the ecosystem that helps students
              transform ideas into ventures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link
              href="/about"
              id="hero-explore-btn"
              className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Explore E-Cell
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#initiatives"
              id="hero-initiatives-btn"
              className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white px-7 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/5"
            >
              Initiatives
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 lg:left-12 xl:left-20 flex items-center gap-3 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40 animate-pulse" />
        <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase">Scroll</p>
      </div>

      {/* Audio toggle */}
      <button
        onClick={toggleAudio}
        className="absolute bottom-7 right-6 lg:right-10 z-10 group flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm hover:border-white/35 hover:bg-black/60 transition-all duration-300"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/45 group-hover:text-white transition-colors duration-200">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white transition-colors duration-200">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/45 group-hover:text-white/80 transition-colors duration-200">
          {muted ? "Sound off" : "Sound on"}
        </span>
      </button>
    </section>
  );
}
