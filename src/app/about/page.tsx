import { Metadata } from "next";
import { Suspense } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import bgBuildingImg from "@/../public/bg-building.webp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | E-Cell MIT Manipal - Empowering Innovation",
  description: "Learn about E-Cell MIT Manipal, our vision, mission, and the Manipal Entrepreneurship Summit (MES). Discover how we foster entrepreneurial thinking and support startups.",
};

const carouselImages = [
  { src: "/InnovationCentre_ECellPic.webp", alt: "E-Cell Innovation Centre MIT Manipal", title: "Innovation Centre" },
  { src: "/Reveal_Board_Faculty_Pic_2025.webp", alt: "E-Cell Board and Faculty Reveal 2025", title: "Board Reveal 2025" },
  { src: "/MES_Creative_Handout_Banner.webp", alt: "Manipal Entrepreneurship Summit 2025 Banner", title: "MES 2025" },
];

function CarouselSkeleton() {
  return (
    <div className="w-full lg:w-1/2">
      <div className="aspect-video bg-white/5 animate-pulse rounded-lg mb-4" />
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="w-24 h-16 bg-white/5 animate-pulse rounded" />)}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-transparent min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative" style={{ backgroundImage: `url(${bgBuildingImg.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <Suspense fallback={<CarouselSkeleton />}>
              <ImageCarousel images={carouselImages} />
            </Suspense>
            <div className="w-full lg:w-1/2">
              <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h1 className="text-4xl font-bold mb-6 text-white tracking-tight">About E-Cell MIT Manipal</h1>
                <div className="space-y-4 text-white/70">
                  <p className="text-base leading-relaxed">E-Cell MIT Manipal is a student-led organization that fosters entrepreneurial thinking, encourages innovation, and supports startups. We aim to create an ecosystem where ideas can thrive and leaders are born.</p>
                  <p className="text-base leading-relaxed">Through a combination of workshops, events, and mentorship programs, we provide the tools and resources needed to turn ideas into successful ventures.</p>
                  <p className="text-base leading-relaxed font-medium text-white">Join us on this journey to innovation and leadership. Together, let&apos;s build something extraordinary!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-4 text-center">What drives us</p>
          <h2 className="text-4xl font-black text-center mb-14 text-white tracking-tight">Our Vision &amp; Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/4 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-white/25 transition-all duration-300 group">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/60">To empower entrepreneurs by providing them with a vibrant start-up ecosystem and developing ideas into successful ventures through dedicated mentorship.</p>
            </div>
            <div className="bg-white/4 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-white/25 transition-all duration-300 group">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/60">To inculcate the spirit of entrepreneurship within the student community through greater awareness and act as a one-stop destination for all students looking to convert their ideas into viable start-ups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About MES */}
      <section className="py-20 bg-[#080808] border-t border-white/8">
        <div className="container mx-auto px-6">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-4 text-center">Our flagship event</p>
          <h2 className="text-4xl font-black text-center mb-14 text-white tracking-tight">About MES</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/4 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <div className="space-y-5 text-white/70">
                <p className="text-lg leading-relaxed"><strong className="text-white">Manipal Entrepreneurship Summit (MES)</strong> is the flagship event of MAHE organized by E-Cell, MIT Manipal. Driven by our dedication to entrepreneurial growth, MES aims to transform the campus into a hub of innovation, where students are empowered to become job creators.</p>
                <p className="text-lg leading-relaxed">The summit provides an inspiring platform, connecting ambitious students with successful alumni and industry leaders. It serves as a launchpad for ideas, a hub for networking, and a breeding ground for the next wave of Indian innovators and visionaries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/8">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-black mb-5 text-white tracking-tight">Ready to Join Our Journey?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-white/50">Be part of MIT Manipal&apos;s thriving entrepreneurship ecosystem and turn your ideas into reality.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/initiatives" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white/90 transition-all duration-200">Explore Our Initiatives</a>
            <a href="/team" className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200">Meet Our Team</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
