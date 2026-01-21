// /components/HeroBanner.tsx
"use client";
import React from "react";
import Image from "next/image";

import { useCountdown } from "@/hooks/use-countdown";
import { SUBMISSION_CLOSES_DATE } from "@/data/ipc-config";

export const HeroBanner: React.FC = () => {
  const timeLeft = useCountdown(SUBMISSION_CLOSES_DATE);

  // Helper for smooth scrolling (optional, but good for accessibility)
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // Use a small offset instead of calculating Navbar height for simplicity
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="w-full relative">
      <div className="relative w-full h-[900px]">
        <Image
          src="/image.png"
          alt="Starry background with landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/70" />
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pointer-events-auto">
          <div className="grid lg:grid-cols-12 items-center gap-8">
            <div className="lg:col-span-7">
              {/* Event Header */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full 
                   bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30"
                >
                  📣 Phase 4:  Final Policy Document Submission Open
                </span>
              </div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="text-xs bg-slate-800/60 px-3 py-1 rounded-full text-slate-300">
                  E-Cell MIT
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  presents
                </span>
              </div>

              <h2
                className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-3 text-white"
                style={{ letterSpacing: "-1px" }}
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-violet-600">
                  Innovation Policy Consortium
                </span>
                <span className="block text-white text-3xl mt-1">(IPC)</span>
              </h2>

              <p className="max-w-xl text-slate-300 mb-8">
                An Inter-College Policy & Research Initiative by E-Cell, MIT
                Manipal.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="https://ipc.ecellmit.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-slate-900/60 ring-1 ring-slate-700 hover:ring-blue-500 transition focus:outline-none text-white font-semibold"
                >
                  Login to Submit
                </a>

                <a
                  href="#timeline-section"
                  className="text-sm font-medium text-slate-200 hover:text-white inline-flex items-center gap-1 transition"
                  onClick={(e) => handleScrollTo(e, "timeline-section")}
                >
                  View Timeline
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>

              <p className="mt-3 text-xs text-slate-400 max-w-md">
                Login credentials have been shared via email with registered
                teams.
              </p>
            </div>

            {/* Countdown Timer Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md mt-12 lg:mt-0">
                <div className="bg-slate-900/70 border border-slate-700 rounded-xl px-6 py-6 shadow-xl text-center">
                  <div className="text-xl text-slate-100 mb-3">
                    Submissions Closes In
                  </div>
                  <div className="flex justify-center items-end gap-6 text-white font-semibold text-5xl">
                    <div>
                      <div className="text-5xl">{timeLeft.days}</div>
                      <div className="text-xs text-slate-400 mt-1">Days</div>
                    </div>
                    <div className="text-5xl">:</div>

                    <div>
                      <div className="text-5xl">
                        {String(timeLeft.hr).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Hours</div>
                    </div>

                    <div className="text-5xl">:</div>

                    <div>
                      <div className="text-5xl">
                        {String(timeLeft.min).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Minutes</div>
                    </div>
                  </div>

                  {timeLeft.total <= 0 && (
                    <div className="text-xs text-rose-400 mt-2">
                      Submissions closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
