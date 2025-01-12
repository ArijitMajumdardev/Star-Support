import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mgrzgjskqlimqrgoaway.supabase.co", // Add your Supabase project domain
        port: "",
        pathname: "/storage/v1/object/public/**", // Match all public storage paths
      },
    ],
  },
};

export default nextConfig;
