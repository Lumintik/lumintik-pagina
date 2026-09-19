import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustriesPage } from "@/components/pages/IndustriesPage";
import { messages } from "@/i18n/messages";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: toSegment(l) }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/industrias">): Promise<Metadata> {
  const locale = fromSegment((await params).locale);
  if (!locale) return {};
  const t = messages[locale];
  const title = t.nav.industries;
  const description = t.pages.industries.intro;
  return {
    title,
    description,
    alternates: localizedAlternates(locale, paths.industries),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(locale, paths.industries),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/industrias">) {
  const locale = fromSegment((await params).locale);
  if (!locale) notFound();
  return <IndustriesPage />;
}
