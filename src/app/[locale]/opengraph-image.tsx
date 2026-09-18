import { site } from "@/i18n/site";
import { fromSegment } from "@/lib/locale";
import { OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Lumintik";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = fromSegment((await params).locale) ?? "ES";
  const t = site[locale];
  return ogCard({
    label: t.hero.pill,
    title: t.hero.title,
    footer: "lumintik.com",
  });
}
