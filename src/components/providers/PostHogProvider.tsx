"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/lib/analytics";
import type { Locale } from "@/lib/locale";

function PageviewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    // location.search, not searchParams.toString(): the latter re-encodes the
    // query, so the recorded URL stopped matching the one actually opened.
    const url = `${window.location.origin}${pathname}${window.location.search}`;
    const send = () =>
      void posthog().then((ph) => ph?.capture("$pageview", { $current_url: url, locale }));
    // Wait for the browser to be idle so loading analytics never delays the page.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(send, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(send, 1500);
    return () => clearTimeout(id);
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
