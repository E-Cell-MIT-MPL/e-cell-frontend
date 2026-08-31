"use client";

import { useState } from "react";

// High-quality direct image sources for each speaker
const row1 = [
  { name: "Ankur Warikoo", role: "Entrepreneur & Author", img: "/speakers/ankur-warikoo.jpg" },
  { name: "Ashneer Grover", role: "Co-Founder, BharatPe", img: "/speakers/ashneer-grover.jpg" },
  { name: "Aman Gupta", role: "Co-Founder & CMO, boAt", img: "/speakers/aman-gupta.jpg" },
  { name: "Shantanu Deshpande", role: "Founder & CEO, Bombay Shaving Co.", img: "/speakers/shantanu-deshpande.jpg" },
  { name: "Gaurav Taneja", role: "Creator & Entrepreneur", img: "/speakers/gaurav-taneja.jpg" },
  { name: "Dr. A. Velumani", role: "Founder, Thyrocare", img: "/speakers/velumani.jpg" },
  { name: "Raj Shamani", role: "Entrepreneur & Podcaster", img: "/speakers/raj-shamani.jpg" },
  { name: "Akshat Rathee", role: "Co-Founder, NODWIN Gaming", img: "/speakers/akshat-rathee.jpg" },
];

const row2 = [
  { name: "Parul Gulati", role: "Actress & Entrepreneur", img: "/speakers/parul-gulati.jpg" },
  { name: "Sahiba Bali", role: "Entrepreneur & Speaker", img: "/speakers/sahiba-bali.jpg" },
  { name: "Samay Raina", role: "Comedian & Creator", img: "/speakers/samay-raina.jpg" },
  { name: "Prafull Billore", role: "Founder, MBA Chai Wala", img: "/speakers/prafull-billore.jpg" },
  { name: "Ishan Sukul", role: "Founder, Kreo", img: "/speakers/ishan-sukul.jpg" },
  { name: "Aditi Madan", role: "Founder, Bluepine Foods", img: "/speakers/aditi-madan.jpg" },
  { name: "Karunesh Talwar", role: "Standup Comedian", img: "/speakers/karunesh-talwar.jpg" },
  { name: "Yash Rathi", role: "Standup Comedian", img: "/speakers/yash-rathi.jpg" },
];

function SpeakerCard({ name, role, img }: { name: string; role: string; img: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="group flex-shrink-0 w-[160px] mx-3 cursor-default">
      {/* Photo */}
      <div className="relative w-[160px] h-[200px] overflow-hidden mb-3 bg-[#111]">
        {!err ? (
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 brightness-90 group-hover:brightness-100"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-white/20 text-3xl font-black tracking-tight">{initials}</span>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      {/* Info */}
      <div>
        <p className="text-white text-[13px] font-semibold leading-tight">{name}</p>
        <p className="text-white/35 text-[10px] mt-0.5 leading-snug">{role}</p>
      </div>
    </div>
  );
}

export default function SpeakersSection() {
  return (
    <section className="bg-black/60 backdrop-blur-sm py-24 lg:py-36 overflow-hidden border-t border-white/5">
      <style>{`
        @keyframes scrollLeft  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollRight { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .spk-row-l { display:flex; width:max-content; animation:scrollLeft 40s linear infinite; }
        .spk-row-r { display:flex; width:max-content; animation:scrollRight 40s linear infinite; }
        .spk-row-l:hover,.spk-row-r:hover { animation-play-state:paused; }
        .spk-fade {
          mask-image:linear-gradient(to right,transparent 0%,black 6%,black 94%,transparent 100%);
          -webkit-mask-image:linear-gradient(to right,transparent 0%,black 6%,black 94%,transparent 100%);
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 mb-14">
        <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-5">MES Spotlight</p>
        <h2
          className="text-white font-black"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: "0.9" }}
        >
          VOICES THAT<br />SHAPED US.
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="spk-fade mb-6">
        <div className="spk-row-l">
          {[...row1, ...row1].map((s, i) => <SpeakerCard key={i} {...s} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="spk-fade">
        <div className="spk-row-r">
          {[...row2, ...row2].map((s, i) => <SpeakerCard key={i} {...s} />)}
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 mt-14">
        <p className="text-white/20 text-sm">
          9 editions of MES · 30,000+ footfall · India&apos;s top entrepreneurs, investors &amp; creators
        </p>
      </div>
    </section>
  );
}
