import type { NextConfig } from "next";
import { SECTION_SEGMENTS } from "./src/lib/routes";

/**
 * Pages live under their Spanish folder (app/[locale]/casos). The English URL
 * is rewritten onto it, and the mixed forms (/en/casos, /es/cases) redirect
 * to the right one so every page has a single address per language.
 */
const sections = Object.values(SECTION_SEGMENTS);

const nextConfig: NextConfig = {
  // Two lockfiles (bun and npm) sit next to each other; pin the root so
  // Next does not go looking in parent folders.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  images: {
    // AVIF first, WebP as the fallback, for every image served by next/image.
    formats: ["image/avif", "image/webp"],
    // Screenshots are shown at 1200 px at most; skipping the 3840 variant
    // keeps first-request AVIF encoding short.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2400],
    // Whitelist the quality values used across the app (Next 16 requires this).
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Allow contact form file attachments (default body limit is 1 MB).
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return sections.flatMap(({ ES, EN }) => [
      { source: `/en/${ES}`, destination: `/en/${EN}`, permanent: true },
      { source: `/en/${ES}/:path*`, destination: `/en/${EN}/:path*`, permanent: true },
      { source: `/es/${EN}`, destination: `/es/${ES}`, permanent: true },
      { source: `/es/${EN}/:path*`, destination: `/es/${ES}/:path*`, permanent: true },
    ]);
  },
  async rewrites() {
    return {
      beforeFiles: sections.flatMap(({ ES, EN }) => [
        { source: `/en/${EN}`, destination: `/en/${ES}` },
        { source: `/en/${EN}/:path*`, destination: `/en/${ES}/:path*` },
      ]),
      afterFiles: [
        // PostHog reverse proxy: analytics is served from our own domain, so
        // the ad blockers that blocklist *.i.posthog.com don't drop the traffic.
        {
          source: "/ingest/static/:path*",
          destination: "https://us-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/ingest/:path*",
          destination: "https://us.i.posthog.com/:path*",
        },
      ],
      fallback: [],
    };
  },
  // PostHog's ingest endpoints are sensitive to a trailing slash redirect.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
