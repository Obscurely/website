import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

// Bundle analyzer setup
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env["ANALYZE"] === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Image optimization
  images: {
    domains: [], // External images
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Example: Allow images from specific domains with patterns
      // {
      //   protocol: 'https',
      //   hostname: '**.example.com',
      // },
    ],
  },

  // Build optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
    // Remove React dev tools in production
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },

  // Security
  poweredByHeader: false,

  // Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  // Output configuration
  output: "standalone", // For better Docker support
};

export default withBundleAnalyzer(nextConfig);
