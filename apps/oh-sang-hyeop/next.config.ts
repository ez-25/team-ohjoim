import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/ui"],
  /** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000', // json-server port
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
