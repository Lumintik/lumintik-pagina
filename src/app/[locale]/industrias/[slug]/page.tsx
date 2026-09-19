import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetail } from "@/components/sections/IndustryDetail";
import { INDUSTRIES, findIndustry } from "@/data/industries";
import { messages } from "@/i18n/messages";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => INDUSTRIES.map((i) => ({ locale: toSegment(locale), slug: i.id })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/industrias/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const industry = findIndustry(slug);
  if (!locale || !industry) return {};

  const copy = messages[locale].industries.items[industry.id];
  const path = paths.industry(industry.id);
  const title = `${copy.category}: ${copy.title}`;

  return {
    title,
    description: copy.body[0],
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description: copy.body[0],
      url: absoluteUrl(locale, path),
      images: industry.image ? [{ url: industry.image }] : undefined,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}

export default async function IndustryPage({ params }: PageProps<"/[locale]/industrias/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const industry = findIndustry(slug);
  if (!locale || !industry) notFound();
  return <IndustryDetail id={industry.id} />;
}
