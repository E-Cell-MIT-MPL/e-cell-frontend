import { Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";

import HomeNavbar from "@/components/home/HomeNavbar";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import JourneySection from "@/components/home/JourneySection";
import StatsSection from "@/components/home/StatsSection";
import InitiativesSection from "@/components/home/InitiativesSection";
import SpeakersSection from "@/components/home/SpeakersSection";
import MonochromeFooter from "@/components/home/MonochromeFooter";
import CursorGlow from "@/components/home/CursorGlow";

export const metadata = {
  title: "E-Cell MIT Manipal | Ideas Into Impact",
  description:
    "E-Cell MIT Manipal — The Official Entrepreneurship Cell of MIT. We build the ecosystem that helps students transform ideas into ventures through mentorship, exposure, and opportunity.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Ambient cursor glow — desktop only */}
      <CursorGlow />

      {/* Floating pill navbar */}
      <HomeNavbar />

      <main>
        {/* 1. Full-screen video hero */}
        <HeroSection />

        {/* 2. Who We Are */}
        <Suspense fallback={<div className="h-screen bg-black" />}>
          <WhoWeAreSection />
        </Suspense>

        {/* 3. From Idea to Venture */}
        <Suspense fallback={<div className="h-64 bg-[#0a0a0a]" />}>
          <JourneySection />
        </Suspense>

        {/* 4. Results That Matter */}
        <Suspense fallback={<div className="h-64 bg-black" />}>
          <StatsSection />
        </Suspense>

        {/* 5. MES Spotlight — Past speakers */}
        <Suspense fallback={<div className="h-96 bg-[#080808]" />}>
          <SpeakersSection />
        </Suspense>

        {/* 6. What We Do */}
        <Suspense fallback={<div className="h-96 bg-black/50" />}>
          <InitiativesSection />
        </Suspense>
      </main>

      {/* Footer */}
      <MonochromeFooter />

      <ScrollToTop />
    </div>
  );
}
