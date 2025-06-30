import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
     
      },
      
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // ✅ Add this for ImageKit
      },
    ],
  },
};

export default nextConfig;
