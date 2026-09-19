"use client";

import { Card } from "@/components/ui/apple-cards-carousel";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { INDUSTRIES } from "@/data/industries";
import { href, paths } from "@/lib/routes";

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
                  closeLabel={copy.close}
                  className="h-[26rem] w-full md:h-[32rem]"
                  href={href(locale, paths.industry(industry.id))}
                  card={{ src: industry.image, category: item.category, title: item.title }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
