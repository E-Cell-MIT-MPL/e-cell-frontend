"use client";

const words = [
  "ENTREPRENEURSHIP",
  "·",
  "INNOVATION",
  "·",
  "MIT MANIPAL",
  "·",
  "STARTUP ECOSYSTEM",
  "·",
  "MES 2025",
  "·",
  "PITCH TANK",
  "·",
  "VENTURE BUILDING",
  "·",
  "MENTORSHIP",
  "·",
  "MAHE",
  "·",
  "IDEATION",
  "·",
  "NETWORKING",
  "·",
  "300+ STARTUPS",
  "·",
];

export default function MarqueeStrip({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden py-4 border-y ${
        inverted
          ? "bg-white border-white/20"
          : "bg-[#0d0d0d] border-white/8"
      }`}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track select-none">
        {/* Duplicate for seamless loop */}
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className={`inline-flex items-center px-5 text-[11px] font-semibold tracking-[0.25em] whitespace-nowrap ${
              word === "·"
                ? inverted ? "text-black/20" : "text-white/15"
                : inverted ? "text-black/70" : "text-white/40"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
