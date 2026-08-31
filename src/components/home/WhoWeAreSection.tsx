"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BorderGlow from "./BorderGlow";

export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("wwa-in-view");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".wwa-reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black/60 backdrop-blur-sm py-32 lg:py-48 relative border-t border-white/5" ref={sectionRef}>
      <style>{`
        .wwa-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .wwa-reveal.wwa-in-view { opacity: 1; transform: translateY(0); }
        .wwa-reveal:nth-child(1) { transition-delay: 0s; }
        .wwa-reveal:nth-child(2) { transition-delay: 0.1s; }
        .wwa-reveal:nth-child(3) { transition-delay: 0.2s; }
        .wwa-reveal:nth-child(4) { transition-delay: 0.3s; }
        .wwa-reveal:nth-child(5) { transition-delay: 0.4s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">

        <p className="wwa-reveal text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6">
          01 — Who We Are
        </p>

        <h2
          className="wwa-reveal text-white font-black leading-[0.88] mb-16 lg:mb-20"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          WHO<br />WE ARE
        </h2>

        {/* Two column: text left, photos right */}
        <div className="wwa-reveal grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-28">
          {/* Left: editorial text */}
          <div className="space-y-7">
            <p className="text-white text-xl sm:text-2xl font-light leading-relaxed">
              E-Cell MIT Manipal is the{" "}
              <span className="font-semibold">
                Official Entrepreneurship Cell of MIT Manipal.
              </span>{" "}
              Run entirely by students, it exists to build a real culture of entrepreneurship
              across the campus and the wider MAHE ecosystem.
            </p>

            <p className="text-white/55 text-base lg:text-lg leading-relaxed">
              From the moment an idea takes shape to the point it becomes a fundable venture,
              E-Cell is there. Students are connected with founders, investors, VCs, alumni,
              industry experts and mentors who have built what our students are trying to build.
            </p>

            <p className="text-white/55 text-base lg:text-lg leading-relaxed">
              Through initiatives like Startup Scoop, Business Clinic, E-10 Summit, Conceptiō,
              Innovation Policy Consortium and the flagship Manipal Entrepreneurship Summit,
              E-Cell creates concrete platforms for students to build, pitch and scale their ideas.
            </p>
          </div>

          {/* Right: photos with BorderGlow */}
          <div className="flex flex-col gap-6">
            <BorderGlow
              borderRadius={4}
              glowColor="255 255 255"
              glowIntensity={0.9}
              coneSpread={30}
              autoAnimate={isMobile}
              className="aspect-[4/3] group"
            >
              <div className="relative w-full h-full aspect-[4/3]">
                <Image
                  src="/group1.jpg"
                  alt="E-Cell MIT Manipal team"
                  fill
                  className="object-cover brightness-90 grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </BorderGlow>

            <BorderGlow
              borderRadius={4}
              glowColor="255 255 255"
              glowIntensity={0.9}
              coneSpread={30}
              autoAnimate={isMobile}
              className="aspect-[4/3] group"
            >
              <div className="relative w-full h-full aspect-[4/3]">
                <Image
                  src="/group2.jpg"
                  alt="E-Cell MIT Manipal members"
                  fill
                  className="object-cover brightness-90 grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </BorderGlow>
          </div>
        </div>

      </div>
    </section>
  );
}
