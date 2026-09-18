import type { Metadata } from "next";
import { LOCALES, LOCALE_TAGS, OG_LOCALES, toSegment, type Locale } from "@/lib/locale";
import type { PagePath } from "@/lib/routes";
import { COMPANY } from "@/data/company";

export const SITE_NAME = "Lumintik";
// The apex redirects to www, so canonicals must point at www; otherwise every
// canonical and hreflang names a URL that 307s somewhere else.
export const SITE_URL = "https://www.lumintik.com";

/** Builds `canonical` + `hreflang` for one page in one language. */
export function localizedAlternates(
  locale: Locale,
  path: PagePath = () => "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_TAGS[l]] = `/${toSegment(l)}${path(l)}`;
  }
  // Which version to serve when no language matches: Spanish, the default.
  languages["x-default"] = `/${toSegment("ES")}${path("ES")}`;

  return {
    canonical: `/${toSegment(locale)}${path(locale)}`,
    languages,
  };
}

/** Absolute URL for a localized path, for Open Graph and JSON-LD. */
export function absoluteUrl(locale: Locale, path: PagePath = () => ""): string {
  return `${SITE_URL}/${toSegment(locale)}${path(locale)}`;
}

/** Title, description, canonical, hreflang and Open Graph for one page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
}: {
  locale: Locale;
  path: PagePath;
  title: string;
  description: string;
  /** Absolute or root-relative image for Open Graph. Defaults to the site card. */
  image?: { url: string; alt: string };
  type?: "website" | "article";
}): Metadata {
  const images = image ? [{ url: image.url, alt: image.alt }] : undefined;
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(locale, path),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    taxID: COMPANY.nit,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/lumintik-lockup-black.png`,
    image: `${SITE_URL}/lumintik-icon.png`,
    description,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressCountry: "CO",
    },
    areaServed: ["CO", "US", "MX"],
    sameAs: COMPANY.linkedin ? [COMPANY.linkedin] : [],
  };
}
