"use client";

import LogoLoop from "@/components/ui/LogoLoop";

const sponsors = [
  {
    src: "/sponsors/google.png",
    alt: "Google",
    href: "https://google.com",
  },
  {
    src: "/sponsors/meta.png",
    alt: "Meta",
    href: "https://meta.com",
  },
  {
    src: "/sponsors/microsoft.png",
    alt: "Microsoft",
    href: "https://microsoft.com",
  },
  {
    src: "/sponsors/amazon.png",
    alt: "Amazon",
    href: "https://amazon.com",
  },
];

export default function SponsorCarousel() {
  return (
    <section className="bg-slate-900 py-20">
      <h2 className="text-center text-3xl font-bold mb-10 text-white">
        Our Sponsors
      </h2>

      <div className="relative h-[120px] overflow-hidden">
        <LogoLoop
          logos={sponsors}
          speed={80}
          direction="left"
          logoHeight={60}
          gap={80}
          scaleOnHover
          fadeOut
          ariaLabel="MES 2026 Sponsors"
        />
      </div>
    </section>
  );
}
