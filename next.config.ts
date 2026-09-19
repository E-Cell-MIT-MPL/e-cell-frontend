import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first, fall back to WebP — significant size savings over JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (Vercel re-optimizes on source change)
    minimumCacheTTL: 31536000,
    // Standard responsive breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "unavatar.io" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
};

export default nextConfig;

