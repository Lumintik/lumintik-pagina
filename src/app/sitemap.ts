import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_TAGS, toSegment } from "@/lib/locale";
import { services } from "@/data/services";
import { CASES, MORE_PROJECTS } from "@/data/cases";
import { POSTS } from "@/data/posts";
import { paths } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

/** Locale-less paths that exist in every language. Case studies use a
 * different segment per language, so they carry a function instead. */
function routes(): ((locale: "ES" | "EN") => string)[] {
  return [
    () => "",
    ...CASES.map((c) => paths.caseStudy(c.slug)),
    ...MORE_PROJECTS.map((p) => paths.project(p.key)),
    ...services.map((s) => paths.service(s.slug)),
    paths.services,
    paths.projects,
    paths.team,
    paths.blog,
    paths.industries,
    paths.cases,
    ...POSTS.map((p) => paths.post(p.slug)),
    paths.contact,
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes().flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${toSegment(locale)}${path(locale)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path(locale) === "" ? 1 : 0.8,
      // Each entry advertises its translations, so crawlers pair them up.
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [LOCALE_TAGS[l], `${SITE_URL}/${toSegment(l)}${path(l)}`]),
        ),
      },
    })),
  );
}
