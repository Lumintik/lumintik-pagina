"use client";

import Image from "next/image";
import { PageShell } from "@/components/sections/PageShell";
import { useT } from "@/components/providers/LocaleProvider";

type Person = {
  name: string;
  role: "ceo" | "coo";
  initials: string;
  photo?: string;
  links?: { label: string; href: string }[];
};

/** Names, roles and public profiles as the team supplied them; the bios live in messages. */
const PEOPLE: Person[] = [
  { name: "David Espejo", role: "ceo", initials: "DE" },
  {
    name: "Andrey Plazas",
    role: "coo",
    initials: "AP",
    photo: "/equipo/andrey-plazas.jpg",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/andrey-steven-plazas-torres-4b8279192/" },
      { label: "GitHub", href: "https://github.com/ANDREYPLAZAST" },
    ],
  },
];

export function TeamPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.team} title={t.pages.team.title} titleAccent={t.pages.team.titleAccent} intro={t.pages.team.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PEOPLE.map((p) => (
            <li key={p.name} className="flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center">
                {p.photo ? (
                  <Image src={p.photo} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                ) : (
                  <span className="text-slate-900 text-5xl font-semibold tracking-tight" aria-hidden>
                    {p.initials}
                  </span>
                )}
              </div>
              <h2 className="mt-5 text-slate-900 text-2xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-slate-900 text-lg">{t.pages.team.roles[p.role]}</p>
              <p className="mt-4 text-slate-900 text-base leading-relaxed max-w-[42ch]">{t.pages.team.bios[p.role]}</p>
              {p.links?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                      >
                        {link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
