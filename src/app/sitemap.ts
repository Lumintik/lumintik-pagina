import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_TAGS, toSegment } from "@/lib/locale";
import { CASES } from "@/data/cases";
import { services } from "@/data/services";
import { paths, type PagePath } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

/** Every page, in every language, with its translations paired up. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: PagePath; priority: number }[] = [
    { path: paths.home, priority: 1 },
    ...CASES.map((c) => ({ path: paths.caseStudy(c.slug), priority: 0.9 })),
    { path: paths.government, priority: 0.9 },
    ...services.map((s) => ({ path: paths.service(s.slug), priority: 0.6 })),
    { path: paths.privacy, priority: 0.3 },
  ];

  return pages.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${toSegment(locale)}${path(locale)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [LOCALE_TAGS[l], `${SITE_URL}/${toSegment(l)}${path(l)}`]),
        ),
      },
    })),
  );
}
