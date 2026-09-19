"use client";

import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/** The ethics line: what can be reported, how it is handled, and where to write. */
export function EthicsPage() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.pages.ethics;

  return (
    <PageShell eyebrow={t.nav.ethics} title={copy.title} titleAccent={copy.titleAccent} intro={copy.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {[
            { title: copy.whatTitle, items: copy.what },
            { title: copy.howTitle, items: copy.how },
          ].map((block) => (
            <section key={block.title} className="rounded-3xl bg-slate-50 p-6 md:p-10">
              <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{block.title}</h2>
              <ol className="mt-6 flex flex-col gap-4">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-600 text-base md:text-lg leading-relaxed">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-900/30 text-sm font-medium text-slate-900">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href={href(locale, paths.contact)}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            {copy.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <p className="text-slate-500 text-sm">{copy.channel}</p>
        </div>
      </div>
    </PageShell>
  );
}
