import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bazi-career",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
