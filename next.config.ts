import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "unavatar.io" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
};

export default nextConfig;

