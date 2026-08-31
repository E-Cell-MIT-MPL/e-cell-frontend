import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Startup Scoop Blog | E-Cell MIT Manipal - Latest Entrepreneurship Insights",
  description: "Stay updated with E-Cell MIT Manipal Startup Scoop newsletter featuring the latest startup news, entrepreneurship insights, and business trends.",
};

const blogPosts = [
  { id: "startup-scoop-16", image: "/blogScreenshot.webp", title: "Startup Scoop - Edition 16", description: "Thapy makes therapy accessible, Jagriti Yatra fosters startup dreams, loss leader pricing draws customers, and tech firms overhire from FOMO and market growth.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-16-ecellmit-dni7f/?trackingId=qEBPn%2F58SLqObIxdTvrNiw%3D%3D", publishedAt: "2024-12-15" },
  { id: "startup-scoop-15", image: "/blogScreenshot1.webp", title: "Startup Scoop - Edition 15", description: "Blackfrog Technologies boosts healthcare logistics in Fiji, AI revolutionizes finance, Ola Electric faces revenue decline, and drones improve medical supply access.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-15-ecellmit-sew8f/", publishedAt: "2024-12-01" },
  { id: "startup-scoop-14", image: "/blogScreenshot2.webp", title: "Startup Scoop - Edition 14", description: "Instrumus expands rapid prototyping services, Acko disrupts insurance with a digital model, RBI sees a 52% increase in reserves income, and major IPOs like Swiggy and Navi are shaping India's economy.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-14-ecellmit-fbycf/?trackingId=pEiC%2BLhqSpCUc077wVSALw%3D%3D", publishedAt: "2024-11-15" },
  { id: "startup-scoop-13", image: "/blogScreenshot3.webp", title: "Startup Scoop - Edition 13", description: "FightHer offers free self-defense classes for women; InvisaWear provides smart jewelry for safety; Parul Gulati thrives in the hair industry; Canva continues its creative journey.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-13-ecellmit-evqof/?trackingId=ea2RiOGfS0CrVs%2F4ialzMQ%3D%3D", publishedAt: "2024-11-01" },
  { id: "startup-scoop-12", image: "/blogScreenshot4.webp", title: "Startup Scoop - Edition 12", description: "Budget 2024-25 sparks mixed reactions, while WazirX faces a $230M hack, Soothe Healthcare expands, Google targets growth with HubSpot, and Zomato's CEO becomes a billionaire.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-12-ecellmit-ewm4f/?trackingId=fLFOi8X7Rz2JUNV6BNT%2Bdw%3D%3D", publishedAt: "2024-10-15" },
  { id: "startup-scoop-11", image: "/blogScreenshot5.webp", title: "Startup Scoop - Edition 11", description: "SWARM Robotics wins at Regatta 2.0, Unikon.ai raises $2M, OneCoin's $15B scam exposed, Elon Musk innovates with SpaceX, Flipkart launches Super.money UPI app.", postURL: "https://www.linkedin.com/pulse/startup-scoop-edition-11-ecellmit-jkh3f/?trackingId=1Gmk0%2Fq6TNi9w29r9Ybzug%3D%3D", publishedAt: "2024-10-01" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-black/40 backdrop-blur-sm border-b border-white/8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-5">Our newsletter</p>
          <h1 className="text-5xl font-black mb-5 text-white tracking-tight">Startup Scoop</h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-8">Your bi-monthly dose of entrepreneurship insights, startup success stories, and the latest trends shaping the business world.</p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full">
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-white/50 text-sm font-medium">Published Bi-Monthly</span>
          </div>
        </div>
      </section>

      {/* Posts */}
      <main className="py-20 bg-transparent">
        <div className="container mx-auto px-6 mb-16">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Latest Articles</h2>
            <p className="text-white/40 text-lg">Catch up on the most recent startup news and entrepreneurship insights.</p>
          </div>
          <BlogList posts={blogPosts} />
        </div>

        {/* LinkedIn CTA */}
        <section className="py-16 border-t border-white/8">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-5 text-white tracking-tight">Stay Updated</h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">Never miss an edition of Startup Scoop. Follow us on LinkedIn to get the latest entrepreneurship insights delivered directly to your feed.</p>
            <a href="https://www.linkedin.com/company/ecellmit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white/90 transition-all duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              Follow on LinkedIn
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
