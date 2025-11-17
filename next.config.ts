import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  /* config options here */
  images: {
    remotePatterns: [new URL("https://placehold.co/**")], //https://placehold.co/600x400/orange/white
  },
};

export default nextConfig;
