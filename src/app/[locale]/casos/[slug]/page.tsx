import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/sections/CaseDetail";
import { CASES, findCase } from "@/data/cases";
import { messages } from "@/i18n/messages";
import { LOCALES, OG_LOCALES, fromSegment, toSegment, type Locale } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CASES.map((c) => ({ locale: toSegment(locale), slug: c.slug })),
  );
}

export const dynamicParams = false;

function caseTitle(slug: string, locale: Locale) {
  const study = findCase(slug)!;
  return messages[locale].cases.caseTitle.replace("{client}", study.copy[locale].client);
}

/** The problem and the solution make the best summary; fall back to what is known. */
function describe(slug: string, locale: Locale) {
  const copy = findCase(slug)!.copy[locale];
  return [copy.about, copy.problem, copy.solution].filter(Boolean).join(" ");
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/casos/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const study = findCase(slug);
  if (!locale || !study) return {};

  const title = caseTitle(slug, locale);
  const description = describe(slug, locale);
  const path = paths.caseStudy(study.slug);

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "article",
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

export default async function CasePage({ params }: PageProps<"/[locale]/casos/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const study = findCase(slug);
  if (!locale || !study) notFound();

  const index = CASES.findIndex((c) => c.slug === study.slug);
  const next = CASES[(index + 1) % CASES.length];

  return <CaseDetail study={study} next={next} />;
}
