import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { CaseBlocks, CaseCover, CaseFrame, CaseLinks, caseTitle } from "@/components/cases/CaseParts";
import { TrackCaseOpen } from "@/components/cases/TrackCaseOpen";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowRight, Flag, Section, ToolList } from "@/components/ui/primitives";
import { CASES, findCase } from "@/data/cases";
import { TOOLS, toolName } from "@/data/tools";
import { site } from "@/i18n/site";
import { LOCALES, LOCALE_TAGS, fromSegment, toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { ORGANIZATION_ID, SITE_URL, absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CASES.map((c) => ({ locale: toSegment(locale), slug: c.slug })),
  );
}

export const dynamicParams = false;

function describe(slug: string, locale: "ES" | "EN") {
  const study = findCase(slug)!;
  const copy = study.copy[locale];
  // The problem and the solution make the best summary; fall back to what is known.
  return [copy.about, copy.problem, copy.solution].filter(Boolean).join(" ");
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/casos/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const study = findCase(slug);
  if (!locale || !study) return {};

  return pageMetadata({
    locale,
    path: paths.caseStudy(study.slug),
    title: caseTitle(study, locale),
    description: describe(study.slug, locale),
    type: "article",
  });
}

export default async function CasePage({ params }: PageProps<"/[locale]/casos/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const study = findCase(slug);
  if (!locale || !study) notFound();

  const t = site[locale];
  const copy = study.copy[locale];
  const title = caseTitle(study, locale);
  const index = CASES.findIndex((c) => c.slug === study.slug);
  const next = CASES[(index + 1) % CASES.length];
  const gallery = study.images.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(locale, paths.caseStudy(study.slug))}#case`,
    name: title,
    headline: title,
    description: describe(study.slug, locale),
    url: absoluteUrl(locale, paths.caseStudy(study.slug)),
    inLanguage: LOCALE_TAGS[locale],
    about: copy.topic,
    genre: copy.sector,
    creator: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    sourceOrganization: { "@type": "Organization", name: copy.client },
    locationCreated: { "@type": "Country", name: t.countries[study.country] },
    ...(study.images[0] && { image: `${SITE_URL}${study.images[0].src}` }),
    ...(study.tools && {
      keywords: study.tools.map((id) => toolName(TOOLS[id], locale)).join(", "),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <TrackCaseOpen slug={study.slug} locale={toSegment(locale)} />

      <section data-tone="dark" aria-labelledby="case-title" className="w-full px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-[1200px]">
          <Link href={href(locale, paths.home, "cases")} className="flex w-fit items-center gap-2 text-base hover:underline underline-offset-4">
            <ArrowRight className="rotate-180" />
            {t.cases.back}
          </Link>
          <p className="pill mt-10">
            <Flag country={study.country} />
            <span className="sr-only">{t.countries[study.country]}, </span>
            {copy.topic}
          </p>
          <h1 id="case-title" className="display mt-6 max-w-[16ch] text-5xl md:text-7xl lg:text-[88px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed md:text-2xl">{copy.about}</p>

          <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium">{t.cases.client}</dt>
              <dd className="mt-1 text-lg font-semibold">{copy.client}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">{t.cases.country}</dt>
              <dd className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <Flag country={study.country} />
                {t.countries[study.country]}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium">{t.cases.sector}</dt>
              <dd className="mt-1 text-lg font-semibold">{copy.sector}</dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <TrackedLink
              href={href(locale, paths.home, "contact")}
              event="start_project_clicked"
              properties={{ location: "case", case: study.slug }}
              className="btn btn-primary"
            >
              {t.nav.startProject}
              <ArrowRight />
            </TrackedLink>
            <CaseLinks study={study} locale={locale} />
          </div>
        </div>
      </section>

      <Section tone="light" labelledBy="case-blocks">
        <h2 id="case-blocks" className="sr-only">{title}</h2>
        <CaseCover study={study} locale={locale} priority />
        <div className="mt-16 md:mt-24">
          <CaseBlocks study={study} locale={locale} headingLevel="h3" large />
        </div>
        {/* Without a gallery the tools stay in this band, so the tones keep alternating. */}
        {gallery.length ? null : (
          <div className="mt-16">
            <h3 className="text-xl font-semibold md:text-2xl">{t.cases.tools}</h3>
            <div className="mt-5">
              <ToolList tools={study.tools} locale={locale} label={t.cases.tools} />
            </div>
          </div>
        )}
      </Section>

      {gallery.length ? (
        <Section tone="dark" labelledBy="case-tools">
          <p className="pill">{copy.client}</p>
          <h2 id="case-tools" className="heading mt-6 text-4xl md:text-6xl">{t.cases.tools}</h2>
          <div className="mt-12">
            <ToolList tools={study.tools} locale={locale} label={t.cases.tools} />
          </div>
        </Section>
      ) : null}

      {gallery.length ? (
        <Section tone="light" labelledBy="case-gallery">
          <h2 id="case-gallery" className="heading text-4xl md:text-6xl">{t.cases.gallery}</h2>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {gallery.map((image) => (
              <li key={image.src}>
                <CaseFrame image={image} locale={locale} sizes="(min-width: 768px) 600px, 100vw" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <section data-tone="dark" aria-labelledby="next-case" className="w-full px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          <div>
            <h2 id="next-case" className="heading text-3xl md:text-5xl">{t.cases.ctaTitle}</h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed md:text-xl">{t.cases.ctaBody}</p>
          </div>
          <Link href={href(locale, paths.caseStudy(next.slug))} className="group flex flex-col gap-3 md:items-start md:pt-2">
            <span className="text-base">{t.cases.next}</span>
            <span className="heading inline-flex items-center gap-3 text-2xl md:text-4xl">
              {caseTitle(next, locale)}
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <Contact locale={locale} />
    </>
  );
}
