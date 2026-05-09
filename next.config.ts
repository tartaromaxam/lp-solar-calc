import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath: '/lp-solar',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
