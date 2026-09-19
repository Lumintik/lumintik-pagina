import { LOCALES, toSegment, type Locale } from "./locale";

/**
 * Route segments that read differently in each language. The files live under
 * the Spanish name (`app/[locale]/casos`) and next.config.ts rewrites the
 * English one onto it, so `/en/cases/imagiq` and `/es/casos/imagiq` are the
 * same page in two languages.
 */
export const SECTION_SEGMENTS = {
  cases: { ES: "casos", EN: "cases" },
  projects: { ES: "proyectos", EN: "projects" },
  services: { ES: "servicios", EN: "services" },
  team: { ES: "equipo", EN: "team" },
  contact: { ES: "contacto", EN: "contact" },
} as const satisfies Record<string, Record<Locale, string>>;

export type Section = keyof typeof SECTION_SEGMENTS;

/** Locale-less path of a page, e.g. "/casos/imagiq" or "" for the home page. */
export type PagePath = (locale: Locale) => string;

export const paths = {
  home: (() => "") as PagePath,
  cases: ((locale) => `/${SECTION_SEGMENTS.cases[locale]}`) as PagePath,
  caseStudy: (slug: string): PagePath => (locale) =>
    `/${SECTION_SEGMENTS.cases[locale]}/${slug}`,
  project: (slug: string): PagePath => (locale) =>
    `/${SECTION_SEGMENTS.projects[locale]}/${slug}`,
  projects: ((locale) => `/${SECTION_SEGMENTS.projects[locale]}`) as PagePath,
  services: ((locale) => `/${SECTION_SEGMENTS.services[locale]}`) as PagePath,
  service: (slug: string): PagePath => (locale) =>
    `/${SECTION_SEGMENTS.services[locale]}/${slug}`,
  team: ((locale) => `/${SECTION_SEGMENTS.team[locale]}`) as PagePath,
  contact: ((locale) => `/${SECTION_SEGMENTS.contact[locale]}`) as PagePath,
};

/** Full localized href, e.g. href("EN", paths.government) → "/en/government". */
export function href(locale: Locale, path: PagePath, hash?: string): string {
  return `/${toSegment(locale)}${path(locale)}${hash ? `#${hash}` : ""}`;
}

/**
 * Maps a pathname in one language to the same page in another, used by the
 * language switcher. Unknown paths keep their shape and only swap the locale.
 */
export function translatePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1);
  if (rest.length) {
    for (const segments of Object.values(SECTION_SEGMENTS)) {
      const names = LOCALES.map((l) => segments[l] as string);
      if (names.includes(rest[0])) {
        rest[0] = segments[target];
        break;
      }
    }
  }
  return `/${[toSegment(target), ...rest].join("/")}`;
}
