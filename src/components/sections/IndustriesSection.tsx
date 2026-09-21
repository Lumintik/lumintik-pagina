"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { INDUSTRIES } from "@/data/industries";
import { href, paths } from "@/lib/routes";

/** The industries we have shipped for, as a row of cards under the hero. */
export function IndustriesSection() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.industries;

  const cards = INDUSTRIES.map((industry, index) => {
    const item = copy.items[industry.id];
    return (
      <Card
        key={industry.id}
        index={index}
        closeLabel={copy.close}
        href={href(locale, paths.industry(industry.id))}
        card={{ src: industry.image, category: item.category, title: item.title }}
      />
    );
  });

  return (
    <section
      id="industries"
      className="relative w-full pt-14 pb-4 md:pt-24 md:pb-6 z-[2] overflow-hidden"
    >
      <div className="px-5 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <p className="text-xs md:text-sm font-medium text-slate-900">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05]">
            {copy.title}{" "}
            <span className="italic text-slate-900">{copy.titleAccent}</span>
          </h2>
          <p className="mt-5 text-slate-900 text-base md:text-xl leading-relaxed max-w-[56ch]">
            {copy.intro}
          </p>
        </div>
      </div>
      <Carousel
        items={cards}
        labels={{ previous: copy.previous, next: copy.next, close: copy.close }}
      />
    </section>
  );
}
