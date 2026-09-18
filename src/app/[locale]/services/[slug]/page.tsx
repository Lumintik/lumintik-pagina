import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { findServiceBySlug, services } from "@/data/services";
import { messages } from "@/i18n/messages";
import { serviceDetails } from "@/i18n/serviceDetails";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    services.map((s) => ({ locale: toSegment(locale), slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const service = findServiceBySlug(slug);
  if (!locale || !service) return {};

  const t = messages[locale];
  const item = t.services.items[service.key];
  const title = t.seo.service.titleTemplate.replace("%s", item.title);
  const path = `/services/${service.slug}`;
  // The overview reads better as a meta description than the one-line teaser.
  const description = serviceDetails[locale][service.key].overview;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(locale, path),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[locale]/services/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const service = findServiceBySlug(slug);
  if (!locale || !service) notFound();

  const t = messages[locale];
  const item = t.services.items[service.key];

  const index = services.findIndex((s) => s.slug === service.slug);
  const upcoming = services[(index + 1) % services.length];

  return (
    <ServiceDetail
      title={item.title}
      description={item.desc}
      content={serviceDetails[locale][service.key]}
      video={{ src: service.videoSrc, poster: service.posterSrc }}
      next={
        upcoming && upcoming.slug !== service.slug
          ? {
              title: t.services.items[upcoming.key].title,
              href: `/${toSegment(locale)}/services/${upcoming.slug}`,
            }
          : undefined
      }
    />
  );
}
