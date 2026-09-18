export const LOCALES = ["EN", "ES"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "EN";

/**
 * URL segment for each locale. The app speaks `EN`/`ES` internally but the
 * routes are lowercase (`/en`, `/es`) — that is the shape crawlers expect.
 */
export const LOCALE_SEGMENTS = { EN: "en", ES: "es" } as const;
export type LocaleSegment = (typeof LOCALE_SEGMENTS)[Locale];

export const LOCALE_SEGMENT_LIST = Object.values(LOCALE_SEGMENTS) as LocaleSegment[];

/** BCP-47 tags used for `hreflang`, and their Open Graph equivalents. */
export const LOCALE_TAGS: Record<Locale, string> = { EN: "en", ES: "es" };
export const OG_LOCALES: Record<Locale, string> = { EN: "en_US", ES: "es_ES" };

export function toSegment(locale: Locale): LocaleSegment {
  return LOCALE_SEGMENTS[locale];
}

export function fromSegment(segment: string): Locale | null {
  const match = LOCALES.find((l) => LOCALE_SEGMENTS[l] === segment.toLowerCase());
  return match ?? null;
}

const NAV_TO_LOCALE: Record<string, Locale> = {
  en: "EN",
  es: "ES",
};

export function detectLocaleFromNavigator(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    const code = raw?.toLowerCase().split("-")[0];
    if (code && code in NAV_TO_LOCALE) return NAV_TO_LOCALE[code];
  }
  return DEFAULT_LOCALE;
}

/**
 * Picks a locale from an `Accept-Language` header, so a first-time visitor is
 * routed to their language before any JS runs.
 */
export function detectLocaleFromHeader(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.split("=")[1]) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const code = tag.split("-")[0];
    if (code in NAV_TO_LOCALE) return NAV_TO_LOCALE[code];
  }
  return DEFAULT_LOCALE;
}

export const STORAGE_KEY = "lumintik:locale";

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v && (LOCALES as readonly string[]).includes(v) ? (v as Locale) : null;
}

export function writeStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, locale);
  // Mirrored into a cookie because the proxy runs on the server, where
  // localStorage does not exist, and needs the choice to route locale-less URLs.
  document.cookie = `${STORAGE_KEY}=${locale};path=/;max-age=31536000;samesite=lax`;
}
