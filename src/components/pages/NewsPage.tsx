"use client";

import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/** News from the studio; nothing is published yet, so it shows the empty state and a way to hear first. */
export function NewsPage() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.pages.news;
  return (
    <PageShell eyebrow={t.nav.news} title={copy.title} titleAccent={copy.titleAccent} intro={copy.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 rounded-3xl bg-slate-50 p-6 md:p-10">
          <p className="text-slate-900 text-lg">{copy.empty}</p>
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
