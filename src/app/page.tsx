import { Suspense } from "react";
import Link from "next/link";

// Client components for interactive features
import ParticleBackground from "@/components/ParticleBackground";
import TypingAnimation from "@/components/TypingAnimation";
import InitiativesCarousel from "@/components/InitiativesCarousel";
import ScrollToTop from "@/components/ScrollToTop";

// Server components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";

// Data imports
import { initiatives, stats } from "@/data/homeData";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <main>
        {/* Revolutionary Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <ParticleBackground />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-slate-900/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Main Content */}
          <div className="relative z-20 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-400/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-300 text-sm font-medium">
                  MIT Manipal&apos;s Premier Entrepreneurship Cell
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6 mb-8">
                <h1 className="text-5xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  <TypingAnimation
                    words={[
                      "Ideas into Startups",
                      "Dreams into Reality",
                      "Innovation into Impact",
                    ]}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent"
                  />
                </h1>

                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Join India&apos;s most dynamic entrepreneurship ecosystem.
                  Where ambitious minds meet limitless opportunities, and
                  tomorrow&apos;s unicorns are born today.
                </p>
              </div>
  
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="https://mes26.ecellmit.in/"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">MES 2026 WEBSITE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                </Link>

                <Link
                  href="/initiatives"
                  className="group flex items-center justify-center gap-2 border-2 border-slate-500 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-blue-600/10"
                >
                  <span>Explore Initiatives</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <p className="text-slate-400 text-sm">Backed by:</p>
                <div className="flex items-center gap-4 opacity-60">
                  <div className="text-slate-500 font-semibold">MAHE</div>
                  <div className="w-px h-4 bg-slate-600" />
                  <div className="text-slate-500 font-semibold">
                    MIT Manipal
                  </div>
                  <div className="w-px h-4 bg-slate-600" />
                  <div className="text-slate-500 font-semibold">
                    Innovation Centre
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 bg-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Results that matter
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <StatCard key={index} number={stat.number} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives Section */}
        <section className="py-32 bg-slate-800 border-t border-slate-600">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Our Initiatives
            </h2>

            <Suspense
              fallback={
                <div className="h-96 bg-slate-700 animate-pulse rounded" />
              }
            >
              <InitiativesCarousel initiatives={initiatives} />
            </Suspense>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="py-16 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">
                  Discover Our Insights
                </h2>
                <p className="text-xl text-slate-300">
                  Explore Blogs & Stay Updated with E-Cell MIT!
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
