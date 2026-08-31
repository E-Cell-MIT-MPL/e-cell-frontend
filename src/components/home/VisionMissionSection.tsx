"use client";

import { useEffect, useRef } from "react";

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vm-in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".vm-reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black border-t border-white/10 py-32 lg:py-48">
      <style>{`
        .vm-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1);
        }
        .vm-reveal.vm-in-view { opacity: 1; transform: translateY(0); }
        .vm-reveal:nth-child(2) { transition-delay: 0.08s; }
        .vm-reveal:nth-child(3) { transition-delay: 0.18s; }
        .vm-reveal:nth-child(4) { transition-delay: 0.28s; }
        .vm-reveal:nth-child(5) { transition-delay: 0.38s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        {/* Section label */}
        <p className="vm-reveal text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
          05 — Purpose
        </p>

        {/* Heading */}
        <h2
          className="vm-reveal text-white font-black leading-[0.88] mb-24 lg:mb-32"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          OUR<br />PURPOSE
        </h2>

        {/* Vision + Mission grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-white/10">
          {/* Vision */}
          <div className="vm-reveal lg:pr-20 pb-16 lg:pb-0 border-b border-white/10 lg:border-b-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-white/40" />
              <p className="text-white/40 text-[10px] font-semibold tracking-[0.3em] uppercase">
                Our Vision
              </p>
            </div>
            <p
              className="text-white/80 font-light leading-[1.7]"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
            >
              To empower entrepreneurs by providing them with a vibrant start-up
              ecosystem and developing ideas into successful ventures through
              dedicated mentorship.
            </p>
          </div>

          {/* Mission */}
          <div className="vm-reveal lg:pl-20 pt-16 lg:pt-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-white/40" />
              <p className="text-white/40 text-[10px] font-semibold tracking-[0.3em] uppercase">
                Our Mission
              </p>
            </div>
            <p
              className="text-white/80 font-light leading-[1.7]"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
            >
              To inculcate the spirit of entrepreneurship within the student
              community through greater awareness and act as a one-stop
              destination for all students looking to convert their ideas into
              viable start-ups.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="vm-reveal mt-24 lg:mt-32 flex items-center gap-6">
          <div className="flex-1 h-px bg-white/8" />
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase font-medium whitespace-nowrap">
            E-Cell MIT Manipal
          </p>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </div>
    </section>
  );
}
