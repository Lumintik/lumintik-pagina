"use client";

import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/** Education: the formats we offer, the dates when there are any, and how to ask for a session. */
export function EducationPage() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.pages.education;
  return (
    <PageShell eyebrow={t.nav.education} title={copy.title} titleAccent={copy.titleAccent} intro={copy.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{copy.formatsTitle}</h2>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.formats.map((f) => (
            <li key={f.title} className="rounded-3xl bg-slate-950 p-6 md:p-8 text-white">
              <h3 className="text-2xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-slate-900 text-base leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 rounded-3xl bg-slate-50 p-6 md:p-10">
          <div>
            <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{copy.datesTitle}</h2>
            <p className="mt-2 text-slate-900 text-base md:text-lg">{copy.dates}</p>
          </div>
          <Link
            href={href(locale, paths.contact)}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            {copy.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
