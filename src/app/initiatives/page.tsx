import { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Initiatives | E-Cell MIT Manipal - Driving Innovation",
  description: "Explore E-Cell MIT Manipal key initiatives including E-10 Summit, Startup Scoop newsletter, and Business Clinic program that empower entrepreneurs and foster innovation.",
};

function InitiativeCard({ image, title, description, isExternal = false }: { image: string | StaticImageData; title: string; description: string; isExternal?: boolean; }) {
  return (
    <div className="group bg-white/4 border border-white/10 rounded-2xl overflow-hidden w-full max-w-sm transform transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <div className="relative h-52 overflow-hidden bg-black">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image as string} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" loading="lazy" />
        ) : (
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" sizes="(max-width: 768px) 100vw, 33vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function InitiativesPage() {
  const initiatives = [
    { image: "/picture_e10_summit.webp", title: "E-10 Summit", description: `The inaugural E10 Entrepreneurship Summit, held on January 16, 2024, brought together the entrepreneurial communities of MAHE colleges. Organized by E-Cell, MIT Manipal, the event tackled challenges like securing sponsorships, boosting student interest, and improving networking. Insightful discussions set the stage for a stronger entrepreneurial ecosystem in Manipal.`, isExternal: false },
    { image: "https://media.licdn.com/dms/image/v2/D4D12AQHkJQEjTr3knw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723120932662?e=1740614400&v=beta&t=2mCjuIp_BiBCk6oIU9qI0U7H_ef_lFq5bHjAQLIwVbM", title: "Startup Scoop", description: `Startup Scoop is a bi-monthly newsletter where the latest news and updates from the dynamic world of business and entrepreneurship are delivered. Trending topics, and inspiring success stories are highlighted to keep readers informed.`, isExternal: true },
    { image: "/logo_business_clinic.webp", title: "Business Clinic", description: `Business Clinic is a structured approach to helping startups refine ideas, validate feasibility, and identify target markets. It emphasizes solving key problems, understanding customer needs, and analyzing competition. Startups test core functionality and launch simplified products.`, isExternal: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-16 bg-black/40 backdrop-blur-sm border-b border-white/8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-5">What we do</p>
          <h1 className="text-5xl font-black mb-5 text-white tracking-tight">Our Initiatives</h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">Discover the programs and events that drive innovation, foster entrepreneurship, and build the startup ecosystem at MIT Manipal.</p>
        </div>
      </section>

      {/* Grid */}
      <main className="flex-grow py-20 bg-transparent">
        <div className="container mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {initiatives.map((initiative, index) => (
              <InitiativeCard key={index} image={initiative.image} title={initiative.title} description={initiative.description} isExternal={initiative.isExternal} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="py-16 border-t border-white/8">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-5 text-white tracking-tight">Want to Get Involved?</h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">Join our initiatives and be part of MIT Manipal&apos;s thriving entrepreneurship community. Whether you&apos;re looking to start your own venture or support others, there&apos;s a place for you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/blog" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white/90 transition-all duration-200">Explore Blogs</a>
              <a href="/about" className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200">Learn More About Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
