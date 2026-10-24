import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getEditionNumber } from "@/components/BlogCard";

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
  const latestEdition = getEditionNumber(blogPosts[0].title);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 pt-24 md:pt-32">
        {/* Giant outlined edition number, echoing the big lettering on the MES page */}
        {latestEdition && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[16rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)] sm:text-[24rem] md:text-[34rem]"
          >
            {latestEdition}
          </div>
        )}

        <div className="container relative mx-auto px-6">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            E-Cell MIT Manipal presents
          </p>
          <h1 className="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl">
            Startup
            <br />
            Scoop
          </h1>
          <p className="mb-14 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            Your bi-monthly dose of entrepreneurship insights, startup success
            stories, and the latest trends shaping the business world.
          </p>

          <dl className="grid divide-y divide-white/10 overflow-hidden rounded-t-2xl border border-b-0 border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {latestEdition && (
              <div className="p-6">
                <dt className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">01 — Latest</dt>
                <dd className="text-2xl font-black uppercase tracking-tight">Edition {latestEdition}</dd>
              </div>
            )}
            <div className="p-6">
              <dt className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">02 — Published</dt>
              <dd className="text-2xl font-black uppercase tracking-tight">Bi-monthly</dd>
            </div>
            <div className="p-6">
              <dt className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">03 — Read it on</dt>
              <dd className="text-2xl font-black uppercase tracking-tight">LinkedIn</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* White strip */}
      <div
        aria-hidden="true"
        className="overflow-hidden whitespace-nowrap bg-white py-3 text-sm font-black uppercase tracking-[0.3em] text-black"
      >
        {Array.from({ length: 8 }, () => "Read what founders read • ").join("")}
      </div>

      {/* Posts */}
      <main className="bg-transparent py-16 md:py-24">
        <div className="container mx-auto mb-24 px-6">
          <BlogList posts={blogPosts} />
        </div>

        {/* LinkedIn CTA */}
        <section className="container mx-auto px-6">
          <div className="rounded-3xl border border-white/10 p-8 md:p-14">
            <h2 className="mb-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl">
              Never miss an edition.
            </h2>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/50">
              Follow us on LinkedIn to get the latest entrepreneurship insights
              delivered directly to your feed.
            </p>
            <a
              href="https://www.linkedin.com/company/ecellmit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              Follow on LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}