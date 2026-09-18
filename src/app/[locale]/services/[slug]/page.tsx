import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { findServiceBySlug, services } from "@/data/services";
import { site } from "@/i18n/site";
import { serviceDetails } from "@/i18n/serviceDetails";
import { LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

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

  const item = site[locale].services.items[service.key];
  return pageMetadata({
    locale,
    path: paths.service(service.slug),
    title: item.title,
    // The overview's opening sentence reads better than the one line teaser.
    description: serviceDetails[locale][service.key].overview.split(/(?<=\.)\s/)[0],
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/[locale]/services/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const service = findServiceBySlug(slug);
  if (!locale || !service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const upcoming = services[(index + 1) % services.length];

  return (
    <ServiceDetail
      locale={locale}
      service={service}
      content={serviceDetails[locale][service.key]}
      next={{
        title: site[locale].services.items[upcoming.key].title,
        href: href(locale, paths.service(upcoming.slug)),
      }}
    />
  );
}
