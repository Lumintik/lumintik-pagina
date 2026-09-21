import posthog from "posthog-js";

/*
 * The events behind the HEART metrics (Rodden, Hutchinson and Fu, Google,
 * CHI 2010). Every event here answers one question about the site:
 *
 *   Engagement    tour_step_viewed, case_metrics_viewed, post_progress
 *   Task success  cta_click (reaching the contact form, and from where)
 *   Adoption      post_progress on a second article, lead_submitted
 *   Happiness     web_vital (what the visitor actually waited)
 *
 * Nothing here records anything about the person: only which part of the page
 * they reached and how fast it was.
 */

type Props = Record<string, string | number | boolean | undefined>;

function track(event: string, props: Props) {
  try {
    posthog.capture(event, props);
  } catch {
    /* analytics must never break a page */
  }
}

/** A stop of a product tour came into view. */
export function trackTourStep(tour: string, step: string, index: number) {
  track("tour_step_viewed", { tour, step, index });
}

/** The measured figures of a case came into view. */
export function trackCaseMetrics(slug: string) {
  track("case_metrics_viewed", { slug });
}

/** How far down an article the reader got: 25, 50, 75 or 100. */
export function trackPostProgress(slug: string, percent: number) {
  track("post_progress", { slug, percent });
}

/** A call to action was clicked, and from which page. */
export function trackCta(action: string, from: string) {
  track("cta_click", { action, from });
}

/** A Core Web Vital, as the visitor's own browser measured it. */
export function trackWebVital(name: string, value: number, rating?: string) {
  track("web_vital", { metric: name, value: Math.round(value), rating });
}
