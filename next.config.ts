import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // Example for Cloudinary
      },
      {
        protocol: "https",
        hostname: "**.supabase.co", // Example for Supabase Storage
      },
    ],
  },
};

export default nextConfig;
