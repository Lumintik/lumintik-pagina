import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { MORE_PROJECTS } from "@/data/cases";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    MORE_PROJECTS.map((p) => ({ locale: toSegment(locale), slug: p.key })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/proyectos/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const project = MORE_PROJECTS.find((p) => p.key === slug);
  if (!locale || !project) return {};

  const description = project.desc[locale];
  const path = paths.project(project.key);

  return {
    title: project.name,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: project.name,
      description,
      url: absoluteUrl(locale, path),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
    twitter: { card: "summary_large_image", title: project.name, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/proyectos/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const index = MORE_PROJECTS.findIndex((p) => p.key === slug);
  if (!locale || index === -1) notFound();

  const project = MORE_PROJECTS[index];
  const next = MORE_PROJECTS[(index + 1) % MORE_PROJECTS.length];

  return <ProjectDetail project={project} next={next} />;
}
