import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MES 2026 Coming Soon | Manipal Entrepreneurship Summit - E-Cell MIT Manipal",
  description: "Get ready for MES 2026 - Manipal Entrepreneurship Summit. Join the biggest entrepreneurship event at MIT Manipal.",
};

export default function MESComingSoonPage() {
  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden">
      <Navbar />

      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center">
        {/* Subtle background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          {/* Branding */}
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-8">E-Cell MIT Manipal Presents</p>
          <h1 className="text-[clamp(5rem,15vw,10rem)] font-black tracking-tight leading-none text-white mb-2">MES</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white/70 mb-3">Manipal Entrepreneurship Summit</h2>
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px bg-gradient-to-r from-transparent to-white/30 w-20" />
            <span className="text-white/50 font-medium text-lg tracking-widest">2026</span>
            <div className="h-px bg-gradient-to-l from-transparent to-white/30 w-20" />
          </div>

          <p className="text-xl md:text-2xl text-white/50 mb-14 max-w-3xl mx-auto leading-relaxed">Get ready for the biggest entrepreneurship event of the year. Where innovation meets opportunity, and dreams become reality.</p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
            {[
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Industry Leaders", desc: "Learn from successful entrepreneurs and industry experts" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Startup Showcase", desc: "Pitch your ideas and compete for exciting prizes" },
              { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Workshops", desc: "Hands-on sessions on entrepreneurship and innovation" },
            ].map((card) => (
              <div key={card.title} className="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/8 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-white/40 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-16">
            {[["50+","Speakers"],["100+","Startups"],["30,000+","Footfall"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-white">{num}</div>
                <div className="text-sm text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="https://mes26.ecellmit.in/" className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold tracking-wide hover:bg-white/90 transition-all duration-200">
            Visit MES Website →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
