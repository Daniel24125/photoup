import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://v5.airtableusercontent.com/**')],
  },
};

export default nextConfig;
