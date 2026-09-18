"use client";

import Link from "next/link";
import {
  ArrowRight,
  CaseBlocks,
  CaseCertification,
  CaseCover,
  CaseLinks,
  Eyebrow,
  ToolList,
  useCaseTitle,
} from "@/components/sections/CaseParts";
import type { CaseStudy } from "@/data/cases";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/**
 * One case on the home page: the topic, what we solved, the three blocks, the
 * tools and the links. The full story lives on its own page.
 */
export function CaseCard({ study }: { study: CaseStudy }) {
  const t = useT();
  const { locale } = useLocale();
  const copy = study.copy[locale];
  const title = useCaseTitle(study);

  return (
    <article className="border-t border-slate-200 pt-10 md:pt-14">
      <Eyebrow>{copy.topic}</Eyebrow>
      <h3 className="mt-3 text-slate-900 text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
        {title}
      </h3>
      <p className="mt-3 max-w-[60ch] text-slate-500 text-lg md:text-xl leading-relaxed">{copy.about}</p>

      <div className="relative mt-8 md:mt-10">
        <CaseCover study={study} sizes="(min-width: 768px) min(92vw, 1440px), 100vw" />
        {study.links.length ? (
          <span className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-slate-900 text-xs font-medium z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {t.projects.badge.live}
          </span>
        ) : null}
      </div>

      <div className="mt-8 md:mt-10">
        <CaseBlocks study={study} />
      </div>

      {study.certification ? (
        <div className="mt-8">
          <CaseCertification certification={study.certification} />
        </div>
      ) : null}

      <div className="mt-8">
        <h4 className="text-slate-900 text-lg font-semibold">{t.cases.tools}</h4>
        <div className="mt-3">
          <ToolList tools={study.tools} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={href(locale, paths.caseStudy(study.slug))}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-blue-500 transition-colors duration-300"
        >
          {t.cases.open}
          <span className="sr-only">: {copy.client}</span>
          <ArrowRight />
        </Link>
        <CaseLinks study={study} />
      </div>
    </article>
  );
}
