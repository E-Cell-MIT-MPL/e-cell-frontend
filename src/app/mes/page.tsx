import { Metadata } from "next";
import Link from "next/link";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorCarousel from "@/components/mes/SponsorCarousel"; //mes components
import EventScrollStack from "@/components/mes/EventScrollStack"; //mes components

// Static metadata for SEO
export const metadata: Metadata = {
  title:
    "MES 2026 Coming Soon | Manipal Entrepreneurship Summit - E-Cell MIT Manipal",
  description:
    "Get ready for MES 2026 - Manipal Entrepreneurship Summit. Join the biggest entrepreneurship event at MIT Manipal. Register your interest and be the first to know when tickets go live.",
};

export default function MESComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900" />

          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto p-16 text-center">
          {/* MES Logo/Branding */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-4">
              MES
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Manipal Entrepreneurship Summit
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-24" />
              <span className="text-blue-400 font-medium text-lg">2026</span>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-24" />
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Get ready for the biggest entrepreneurship event of the year.
              Where innovation meets opportunity, and dreams become reality.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Industry Leaders
                </h3>
                <p className="text-slate-400 text-sm">
                  Learn from successful entrepreneurs and industry experts
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Startup Showcase
                </h3>
                <p className="text-slate-400 text-sm">
                  Pitch your ideas and compete for exciting prizes
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Workshops
                </h3>
                <p className="text-slate-400 text-sm">
                  Hands-on sessions on entrepreneurship and innovation
                </p>
              </div>
            </div>
          </div>
          {/* Events Scroll Stack */}
          <EventScrollStack />
          
          {/* Sponsors Carousel */}
          <SponsorCarousel />

          {/* Social Proof */}
          <div className="mb-8">
            <p className="text-slate-400 mb-4">
              Join 2000+ entrepreneurs who attended our previous summits
            </p>
            <div className="flex justify-center gap-6 text-slate-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm">Speakers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">100+</div>
                <div className="text-sm">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">2000+</div>
                <div className="text-sm">Attendees</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Learn About E-Cell
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
