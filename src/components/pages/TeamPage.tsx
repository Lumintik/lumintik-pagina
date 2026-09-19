"use client";

import { PageShell } from "@/components/sections/PageShell";
import { useT } from "@/components/providers/LocaleProvider";

/** Names and roles as the team supplied them. Photos and bios are still to come. */
const PEOPLE: { name: string; role: "ceo" | "coo"; initials: string }[] = [
  { name: "David Espejo", role: "ceo", initials: "DE" },
  { name: "Andrey Plazas", role: "coo", initials: "AP" },
];

export function TeamPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.team} title={t.pages.team.title} titleAccent={t.pages.team.titleAccent} intro={t.pages.team.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PEOPLE.map((p) => (
            <li key={p.name} className="flex flex-col">
              <div className="relative aspect-[4/5] w-full rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center">
                <span className="text-slate-400 text-5xl font-semibold tracking-tight" aria-hidden>
                  {p.initials}
                </span>
              </div>
              <h2 className="mt-5 text-slate-900 text-2xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-slate-500 text-lg">{t.pages.team.roles[p.role]}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
