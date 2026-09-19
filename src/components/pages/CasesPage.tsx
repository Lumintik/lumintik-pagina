"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { CASES } from "@/data/cases";
import { href, paths } from "@/lib/routes";

/** The case studies, one card each: the cover, the client and the result. */
export function CasesPage() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <PageShell eyebrow={t.nav.cases} title={t.pages.cases.title} titleAccent={t.pages.cases.titleAccent} intro={t.pages.cases.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CASES.map((study) => {
            const copy = study.copy[locale];
            const cover = study.images[0] ?? study.cardImage;
            return (
              <li key={study.slug}>
                <Link
                  href={href(locale, paths.caseStudy(study.slug))}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt={cover.alt[locale]}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/70">{t.cases.pendingImages}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                    <span className="text-xs md:text-sm font-medium text-slate-500">{copy.sector}</span>
                    <h2 className="text-slate-900 text-xl md:text-2xl font-semibold leading-snug text-balance">{copy.headline ?? copy.why ?? copy.solution}</h2>
                    <p className="text-slate-500 text-base leading-relaxed">{copy.client}. {copy.about}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-slate-900">
                      {t.cases.open}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
