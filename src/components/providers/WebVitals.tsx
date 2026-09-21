"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackWebVital } from "@/lib/analytics";

/**
 * Sends Core Web Vitals as the visitor's own browser measured them. Lab
 * numbers say what a fast machine on a fast network gets; these say what the
 * person in front of the page actually waited.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (metric.name === "LCP" || metric.name === "CLS" || metric.name === "INP" || metric.name === "TTFB" || metric.name === "FCP") {
      trackWebVital(metric.name, metric.name === "CLS" ? metric.value * 1000 : metric.value, metric.rating);
    }
  });
  return null;
}
