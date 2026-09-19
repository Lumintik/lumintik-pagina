import type { NextConfig } from "next";
import { SECTION_SEGMENTS } from "./src/lib/routes";

/**
 * Case studies live under their Spanish folder (app/[locale]/casos). The
 * English URL is rewritten onto it, and the mixed forms redirect, so each page
 * has one address per language.
 */
// Sections with the same segment in both languages need no rewrite.
const sections = Object.values(SECTION_SEGMENTS).filter(({ ES, EN }) => ES !== EN);

const nextConfig: NextConfig = {
  images: {
    // Whitelist the quality values used across the app (Next 16 requires this).
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Allow contact-form file attachments (default body limit is 1 MB).
      bodySizeLimit: "10mb",
    },
  },
  // PostHog reverse proxy: analytics is served from our own domain, so the
  // ad blockers that blocklist *.i.posthog.com don't silently drop the traffic.
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
  // PostHog's ingest endpoints are sensitive to a trailing-slash redirect.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
