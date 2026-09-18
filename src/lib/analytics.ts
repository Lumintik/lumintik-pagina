import type { PostHog } from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

let client: Promise<PostHog | null> | null = null;

/**
 * Loads posthog-js on first use instead of shipping it in the main bundle, so
 * analytics never competes with the first paint. Every call goes through the
 * same promise, so `init()` and `capture()` always run on one instance.
 */
export function posthog(): Promise<PostHog | null> {
  if (typeof window === "undefined" || !key) return Promise.resolve(null);
  client ??= import("posthog-js")
    .then(({ default: ph }) => {
      if (!ph.__loaded) {
        ph.init(key, {
          // Same origin path, rewritten to PostHog in next.config.ts, so ad
          // blockers that list *.i.posthog.com don't drop the traffic.
          api_host: "/ingest",
          ui_host: "https://us.posthog.com",
          // Pins autocapture behaviour across posthog-js upgrades.
          defaults: "2026-06-25",
          // Pageviews are sent by the router listener, so the first load counts.
          capture_pageview: false,
          capture_pageleave: true,
        });
      }
      return ph;
    })
    .catch((err) => {
      console.error("[posthog] init failed:", err);
      return null;
    });
  return client;
}

/** Events the site sends. Only names and non personal properties travel. */
export type AnalyticsEvent =
  | "start_project_clicked"
  | "case_opened"
  | "government_deck_downloaded"
  | "contact_form_submitted"
  | "contact_form_failed";

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  void posthog().then((ph) => ph?.capture(event, properties));
}
