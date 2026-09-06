import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
