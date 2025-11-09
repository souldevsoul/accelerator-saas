import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Skip analyzing API routes during build
  outputFileTracingExcludes: {
    '*': ['packages/db/node_modules/**'],
  },
};

export default nextConfig;
