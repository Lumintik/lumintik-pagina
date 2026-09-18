"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import type { Locale } from "@/lib/locale";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Initialised here, in the application bundle, rather than in
 * `instrumentation-client.ts`: Next compiles that file as its own entry point,
 * so it ships a second copy of posthog-js. `init()` would run on one instance
 * while every `capture()` in the app ran on the other — which silently sent
 * nothing at all.
 */
if (typeof window !== "undefined" && key && !posthog.__loaded) {
  try {
    posthog.init(key, {
      // Same-origin path, rewritten to PostHog in next.config.ts. Sending
      // analytics through our own domain keeps ad blockers from dropping it.
      api_host: "/ingest",
      // Only used to build links back to the PostHog app (e.g. the toolbar).
      ui_host: "https://us.posthog.com",
      // Pins autocapture behaviour so a posthog-js upgrade can't silently
      // change what gets tracked.
      defaults: "2026-06-25",
      // That preset resolves capture_pageview to "history_change", which only
      // fires on History API navigations. Pageviews are sent from the router
      // below instead, so the first load counts too.
      capture_pageview: false,
      capture_pageleave: true,
    });
  } catch (err) {
    console.error("[posthog] init failed:", err);
  }
}

function PageviewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!key || !pathname) return;
    posthog.capture("$pageview", {
      // location.search, not searchParams.toString(): the latter re-encodes the
      // query (%20 becomes +, ?promo becomes promo=, a comma becomes %2C), so
      // the recorded URL stopped matching the one the visitor actually opened.
      $current_url: `${window.location.origin}${pathname}${window.location.search}`,
      locale,
    });
    // searchParams stays in the deps so a query-only change still counts as a view.
  }, [pathname, searchParams, locale]);

  return null;
}

export function PostHogProvider({ locale }: { locale: Locale }) {
  // useSearchParams needs a Suspense boundary or it opts the tree out of
  // static rendering.
  return (
    <Suspense fallback={null}>
      <PageviewTracker locale={locale} />
    </Suspense>
  );
}
