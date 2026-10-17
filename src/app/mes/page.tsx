import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MesBackground from "@/components/mes/MesBackground";
import MesHero from "@/components/mes/MesHero";
import MesNextEdition from "@/components/mes/MesNextEdition";
import MesRecap from "@/components/mes/MesRecap";
import MesEasterEgg from "@/components/mes/MesEasterEgg";
import MesSoundtrack from "@/components/mes/MesSoundtrack";
import MESFeatureCards from "@/components/MESFeatureCards";
import EntrepreneurshipEcosystem from "@/components/EntrepreneurshipEcosystem";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleField from "@/components/ParticleField";
import {
  mesEventGroups2026,
  mesReelFrames,
  mesStats2026,
} from "@/data/mesEvents";

export const metadata: Metadata = {
  title: "MES 2027 | Manipal Entrepreneurship Summit - E-Cell MIT Manipal",
  description:
    "MES 2027 - the Manipal Entrepreneurship Summit returns to MIT Manipal. See the competitions, platforms and conclaves that set the bar in 2026.",
};

// Each section is a self-contained component. To add a section, create a
// component and drop it into the list below.
export default function MESPage() {
  return (
    <div className="relative min-h-screen text-white">
      <MesBackground />
      {/* Cursor-reactive particle network over the background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleField />
      </div>
      <MesEasterEgg />
      <MesSoundtrack />
      <Navbar />

      <main className="relative">
        <MesHero frames={mesReelFrames} />
        <MesNextEdition year={2027} />

        <MesRecap
          year={2026}
          stats={mesStats2026}
          groups={mesEventGroups2026}
        />

        <div className="px-6 pb-12">
          <ScrollReveal once={false}>
            <MESFeatureCards />
          </ScrollReveal>

          <ScrollReveal once={false} delay={100}>
            <EntrepreneurshipEcosystem />
          </ScrollReveal>

          {/* Call to action */}
          <ScrollReveal once={false} delay={150} className="pb-16 text-center">
            <Link
              href="https://mes26.ecellmit.in/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Visit MES Website
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </main>

      <div className="relative">
        <Footer />
      </div>
    </div>
  );
}
