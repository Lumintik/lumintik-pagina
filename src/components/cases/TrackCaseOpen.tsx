"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Reports that a case study was opened, whether from the site or a shared link. */
export function TrackCaseOpen({ slug, locale }: { slug: string; locale: string }) {
  useEffect(() => {
    track("case_opened", { case: slug, locale });
  }, [slug, locale]);
  return null;
}
