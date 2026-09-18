import { caseTitle } from "@/components/cases/CaseParts";
import { findCase } from "@/data/cases";
import { site } from "@/i18n/site";
import { fromSegment } from "@/lib/locale";
import { OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Lumintik";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function CaseOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment) ?? "ES";
  const study = findCase(slug);
  if (!study) return new Response(null, { status: 404 });
  const copy = study.copy[locale];
  return ogCard({
    label: copy.topic,
    title: caseTitle(study, locale),
    footer: `${copy.about.replace(/\.$/, "")} · lumintik.com`,
  });
}
