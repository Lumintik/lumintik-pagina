"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/apple-cards-carousel";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { INDUSTRIES } from "@/data/industries";
import { href } from "@/lib/routes";

/** Every industry as a card; each opens the same sheet as on the home page. */
export function IndustriesPage() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.industries;

  return (
    <PageShell eyebrow={t.nav.industries} title={t.pages.industries.title} titleAccent={t.pages.industries.titleAccent} intro={t.pages.industries.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {INDUSTRIES.map((industry, index) => {
            const item = copy.items[industry.id];
            return (
              <li key={industry.id}>
                <Card
                  index={index}
                  className="h-[26rem] w-full md:h-[32rem]"
                  closeLabel={copy.close}
                  card={{
                    src: industry.image,
                    category: item.category,
                    title: item.title,
                    content: (
                      <div className="flex flex-col gap-5 max-w-3xl">
                        {item.body.map((paragraph, i) => (
                          <p key={i} className="text-slate-600 text-base md:text-xl leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                        {industry.gallery?.length ? (
                          <ul className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {industry.gallery.map((photo) => (
                              <li key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                                <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover" />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {industry.path ? (
                          <Link
                            href={href(locale, industry.path)}
                            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                          >
                            {copy.seeCase}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </Link>
                        ) : null}
                      </div>
                    ),
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
