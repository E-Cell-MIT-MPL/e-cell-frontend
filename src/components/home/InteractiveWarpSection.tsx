"use client";

import Link from "next/link";
import CRTWarp from "@/components/CRTWarp";

export default function InteractiveWarpSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808] border-t border-white/10">
      {/* ── CRTWarp WebGL Background Canvas ── */}
      <div className="relative w-full h-[600px] lg:h-[650px] overflow-hidden">
        <CRTWarp
          color="#575656"
          backgroundColor="#121212"
          speed={0.5}
          curvature={0.25}
          scanlineStrength={0.25}
          scanlineFrequency={200}
          waveAmplitude={0.3}
          waveFrequency={2.5}
          bloom={1.5}
          bloomRadius={1}
          noise={0.1}
          vignette={0}
          brightness={1.25}
          pixelation={1}
          rgbShift={0.015}
          mouseReact
          mouseStrength={0.5}
          dpr={1}
          fps={30}
          paused={false}
        />

        {/* Soft Vignette & Gradient Overlays for Smooth Blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none" />

        {/* ── Foreground Interactive Hero Content ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pointer-events-none">
          {/* Eyebrow Badge */}
          <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md mb-6 hover:bg-white/[0.14] transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span className="text-white/80 text-[11px] font-semibold tracking-wider uppercase">
              Innovation in Motion
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-white font-black tracking-tight leading-[0.95] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
          >
            MAKE EVERY IDEA <br />
            <span className="text-white/40">PULSE WITH IMPACT.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            E-Cell MIT Manipal is the launchpad for visionary student founders,
            groundbreaking startups, and transformative industry connections.
          </p>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/initiatives"
              className="px-7 py-3 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_45px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore Our Initiatives →
            </Link>

            <Link
              href="/team"
              className="px-7 py-3 rounded-full bg-white/[0.06] border border-white/20 text-white font-medium text-sm tracking-wide backdrop-blur-md hover:bg-white/[0.15] hover:border-white/40 transition-all duration-200"
            >
              Meet The Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
