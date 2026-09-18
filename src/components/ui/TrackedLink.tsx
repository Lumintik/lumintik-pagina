"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  properties?: Record<string, unknown>;
};

/** A normal link that also reports the click to analytics. */
export function TrackedLink({ event, properties, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, properties);
        onClick?.(e);
      }}
    />
  );
}

type AnchorProps = ComponentProps<"a"> & {
  event: AnalyticsEvent;
  properties?: Record<string, unknown>;
};

/** For files and external URLs, where next/link does not apply. */
export function TrackedAnchor({ event, properties, onClick, ...props }: AnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, properties);
        onClick?.(e);
      }}
    />
  );
}
