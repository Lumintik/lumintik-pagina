import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_SEGMENT_LIST,
  STORAGE_KEY,
  detectLocaleFromHeader,
  fromSegment,
  toSegment,
} from "@/lib/locale";

/**
 * Sends locale-less URLs to a language. A returning visitor keeps the language
 * they picked (cookie); everyone else gets their browser's preference.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // `skipTrailingSlashRedirect` is on for /ingest's sake, which also switches
  // off Next's own normalisation everywhere else: /es and /es/ would both
  // answer 200, duplicating URLs and splitting their pageviews in analytics.
  // Restored here — /ingest never reaches this code, the matcher excludes it.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    // Built from request.url, not nextUrl.clone(): cloning re-applies the
    // trailing slash and the redirect would point at itself.
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = LOCALE_SEGMENT_LIST.some(
    (seg) => pathname === `/${seg}` || pathname.startsWith(`/${seg}/`),
  );
  if (hasLocale) return;

  const stored = fromSegment(request.cookies.get(STORAGE_KEY)?.value ?? "");
  const locale = stored ?? detectLocaleFromHeader(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${toSegment(locale)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the files that must stay at the root
  // (sitemap.xml, robots.txt, manifest, icons) and /ingest — the PostHog
  // reverse proxy, which must never be rewritten to a locale.
  matcher: [
    "/((?!_next|api|ingest|.*\\..*|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
