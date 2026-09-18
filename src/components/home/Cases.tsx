import Link from "next/link";
import { CaseBlocks, CaseCover, caseTitle } from "@/components/cases/CaseParts";
import { ArrowRight, ArrowUpRight, Flag, Section, ToolList, type Tone } from "@/components/ui/primitives";
import { CASES, type CaseStudy } from "@/data/cases";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

function CaseSection({
  study,
  locale,
  tone,
  intro,
}: {
  study: CaseStudy;
  locale: Locale;
  tone: Tone;
  intro?: boolean;
}) {
  const t = site[locale];
  const copy = study.copy[locale];
  const titleId = `case-${study.slug}`;

  return (
    <Section tone={tone} id={intro ? "cases" : undefined} labelledBy={titleId}>
      {intro ? (
        <div className="mb-20 md:mb-28">
          <p className="pill">{t.cases.pill}</p>
          <p className="heading mt-6 max-w-[16ch] text-4xl md:text-6xl">{t.cases.title}</p>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed md:text-xl">{t.cases.intro}</p>
        </div>
      ) : null}

      <article>
        <p className="pill">
          <Flag country={study.country} />
          <span className="sr-only">{t.countries[study.country]}, </span>
          {copy.topic}
        </p>
        <h2 id={titleId} className="heading mt-6 max-w-[20ch] text-4xl md:text-6xl">
          {caseTitle(study, locale)}
        </h2>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed md:text-xl">{copy.about}</p>

        <div className="mt-12 md:mt-16">
          <CaseCover study={study} locale={locale} />
        </div>

        <div className="mt-12 md:mt-16">
          <CaseBlocks study={study} locale={locale} />
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold md:text-xl">{t.cases.tools}</h3>
          <div className="mt-4">
            <ToolList tools={study.tools} locale={locale} label={t.cases.tools} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href={href(locale, paths.caseStudy(study.slug))} className="btn btn-primary">
            {t.cases.open}
            <span className="sr-only">: {copy.client}</span>
            <ArrowRight />
          </Link>
          {study.url ? (
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              {t.cases.visit}
              <span className="sr-only">: {copy.client}</span>
              <ArrowUpRight />
            </a>
          ) : null}
        </div>
      </article>
    </Section>
  );
}

/** Six case studies, alternating tone, the first one opening with the section intro. */
export function Cases({ locale }: { locale: Locale }) {
  return (
    <>
      {CASES.map((study, i) => (
        <CaseSection
          key={study.slug}
          study={study}
          locale={locale}
          tone={i % 2 === 0 ? "light" : "dark"}
          intro={i === 0}
        />
      ))}
    </>
  );
}
