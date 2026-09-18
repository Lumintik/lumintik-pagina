export const LOCALES = ["ES", "EN"] as const;
export type Locale = (typeof LOCALES)[number];

/** Spanish first: most of the audience, and every public sector reader, is in Colombia. */
export const DEFAULT_LOCALE: Locale = "ES";

/**
 * URL segment for each locale. The app speaks `EN`/`ES` internally but the
 * routes are lowercase (`/en`, `/es`), the shape crawlers expect.
 */
export const LOCALE_SEGMENTS = { EN: "en", ES: "es" } as const;
export type LocaleSegment = (typeof LOCALE_SEGMENTS)[Locale];

export const LOCALE_SEGMENT_LIST = Object.values(LOCALE_SEGMENTS) as LocaleSegment[];

/** BCP-47 tags used for `hreflang`, and their Open Graph equivalents. */
export const LOCALE_TAGS: Record<Locale, string> = { EN: "en", ES: "es" };
export const OG_LOCALES: Record<Locale, string> = { EN: "en_US", ES: "es_CO" };

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

/**
 * Countries whose visitors get Spanish even when their browser asks for
 * English: Colombia first, and the rest of Spanish speaking America.
 */
const SPANISH_COUNTRIES = new Set([
  "CO", "MX", "AR", "BO", "CL", "CR", "CU", "DO", "EC", "ES", "GT", "HN",
  "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

/**
 * Picks a locale for a first time visitor, before any JS runs. The country
 * (from the hosting platform's geolocation header) wins over the browser
 * language, so someone in Bogotá with an English browser still lands in /es.
 */
export function detectLocale(
  acceptLanguage: string | null,
  country: string | null,
): Locale {
  if (country && SPANISH_COUNTRIES.has(country.toUpperCase())) return "ES";
  return detectLocaleFromHeader(acceptLanguage);
}

/** Picks a locale from an `Accept-Language` header. */
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

export function writeStoredLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  // A cookie because the proxy runs on the server and needs the choice to
  // route locale-less URLs.
  document.cookie = `${STORAGE_KEY}=${toSegment(locale)};path=/;max-age=31536000;samesite=lax`;
}
