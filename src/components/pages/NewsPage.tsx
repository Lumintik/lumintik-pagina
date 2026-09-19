"use client";

import { PageShell } from "@/components/sections/PageShell";
import { useT } from "@/components/providers/LocaleProvider";

/** News from the studio; nothing is published yet, so it shows the empty state. */
export function NewsPage() {
  const t = useT();
  const copy = t.pages.news;
  return (
    <PageShell eyebrow={t.nav.news} title={copy.title} titleAccent={copy.titleAccent} intro={copy.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <p className="rounded-3xl bg-slate-50 p-8 md:p-12 text-slate-500 text-lg">{copy.empty}</p>
      </div>
    </PageShell>
  );
}
