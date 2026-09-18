import type { Metadata } from "next";
import { LOCALES, LOCALE_TAGS, toSegment, type Locale } from "@/lib/locale";

export const SITE_NAME = "Lumintik SAS";
// The apex redirects to www, so canonicals must point at www — otherwise every
// canonical and hreflang names a URL that 307s somewhere else.
export const SITE_URL = "https://www.lumintik.com";

/** A route without its locale segment. Case studies read differently in each
 * language ("/casos/imagiq", "/cases/imagiq"), so a path can also be a
 * function of the locale. */
export type LocalePath = string | ((locale: Locale) => string);

function resolve(path: LocalePath, locale: Locale): string {
  return typeof path === "function" ? path(locale) : path;
}

/**
 * Builds `canonical` + `hreflang` for one page in one language.
 *
 * @param locale the language being rendered
 * @param path   the route *without* the locale segment: "" for the home page,
 *               "/services/applied-ai" for a service page.
 */
export function localizedAlternates(
  locale: Locale,
  path: LocalePath = "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_TAGS[l]] = `/${toSegment(l)}${resolve(path, l)}`;
  }
  // Tells Google which version to serve when no language matches.
  languages["x-default"] = `/${toSegment("EN")}${resolve(path, "EN")}`;

  return {
    canonical: `/${toSegment(locale)}${resolve(path, locale)}`,
    languages,
  };
}

/** Absolute URL for a localized path, for Open Graph and JSON-LD. */
export function absoluteUrl(locale: Locale, path: LocalePath = ""): string {
  return `${SITE_URL}/${toSegment(locale)}${resolve(path, locale)}`;
}
