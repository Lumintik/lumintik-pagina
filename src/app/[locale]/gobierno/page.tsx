import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { ArrowRight, ArrowUpRight, Section } from "@/components/ui/primitives";
import { government } from "@/i18n/government";
import { site } from "@/i18n/site";
import { fromSegment, toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

/** The downloadable version of this page, printed from it by scripts/build-deck-pdf.mjs. */
function deckHref(locale: "ES" | "EN") {
  return `/documentos/lumintik-sector-publico-${toSegment(locale)}.pdf`;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gobierno">): Promise<Metadata> {
  const locale = fromSegment((await params).locale);
  if (!locale) return {};
  return pageMetadata({
    locale,
    path: paths.government,
    title: site[locale].meta.governmentTitle,
    description: government[locale].metaDescription,
  });
}

export default async function GovernmentPage({ params }: PageProps<"/[locale]/gobierno">) {
  const locale = fromSegment((await params).locale);
  if (!locale) notFound();

  const g = government[locale];

  return (
    <>
      <section data-tone="dark" aria-labelledby="gov-title" className="w-full px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="pill">{g.pill}</p>
          <h1 id="gov-title" className="display mt-6 max-w-[16ch] text-5xl md:text-7xl lg:text-[88px]">
            {g.title}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed md:text-2xl">{g.subtitle}</p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row print:hidden">
            <TrackedAnchor
              href={deckHref(locale)}
              download
              event="government_deck_downloaded"
              properties={{ locale: toSegment(locale) }}
              className="btn btn-primary"
            >
              {g.download}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v12M6 10l6 6 6-6M5 20h14" />
              </svg>
            </TrackedAnchor>
            <Link href={href(locale, paths.home, "contact")} className="btn btn-secondary">
              {g.contact}
            </Link>
          </div>
        </div>
      </section>

      <Section tone="light" labelledBy="gov-context">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="pill">{g.context.pill}</p>
            <h2 id="gov-context" className="heading mt-6 text-4xl md:text-5xl">{g.context.title}</h2>
          </div>
          <div className="md:pt-14">
            <p className="text-lg leading-relaxed md:text-xl">{g.context.body}</p>
            <p className="mt-6 text-base">
              <a href={g.context.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                {g.context.source}
                <ArrowUpRight />
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="gov-problems">
        <p className="pill">{g.problems.pill}</p>
        <h2 id="gov-problems" className="heading mt-6 max-w-[20ch] text-4xl md:text-6xl">{g.problems.title}</h2>
        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {g.problems.items.map((problem, i) => (
            <li key={problem.title} className="break-inside-avoid">
              <h3 className="text-xl font-semibold md:text-2xl">
                {i + 1}. {problem.title}
              </h3>
              <div className="mt-6 flex flex-col gap-8">
                {problem.data.map((d) => (
                  <figure key={d.figure}>
                    <p className="display text-5xl md:text-6xl">{d.figure}</p>
                    <blockquote className="mt-3 text-base leading-relaxed md:text-lg">{d.text}</blockquote>
                    <figcaption className="mt-3 text-sm">
                      <a href={d.url} target="_blank" rel="noopener noreferrer" className="link">
                        {d.source}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-16 max-w-[60ch] text-base">{g.sourcesNote}</p>
      </Section>

      <Section tone="light" labelledBy="gov-method">
        <p className="pill">{g.method.pill}</p>
        <h2 id="gov-method" className="heading mt-6 max-w-[18ch] text-4xl md:text-6xl">{g.method.title}</h2>
        <ol className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {g.method.steps.map((step, i) => (
            <li key={step.title} className="break-inside-avoid">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--soft)] text-lg font-semibold">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold md:text-2xl">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed md:text-lg">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark" labelledBy="gov-practices">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <h2 id="gov-practices" className="heading text-4xl md:text-5xl">{g.practices.title}</h2>
          <div className="flex flex-col items-start gap-8">
            <p className="text-lg leading-relaxed md:text-xl">{g.practices.body}</p>
            <Link href={href(locale, paths.home, "cases")} className="btn btn-primary print:hidden">
              {g.practices.cta}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>

      <div className="print:hidden">
        <Contact locale={locale} />
      </div>
    </>
  );
}
