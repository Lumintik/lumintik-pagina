"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { INDUSTRIES } from "@/data/industries";
import { href } from "@/lib/routes";

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
        card={{
          src: industry.image,
          category: item.category,
          title: item.title,
          content: (
            <div className="flex flex-col gap-5 max-w-3xl">
              {item.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-slate-600 text-base md:text-xl leading-relaxed"
                >
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ) : null}
            </div>
          ),
        }}
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
          <p className="text-xs md:text-sm font-medium text-slate-500">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05] max-w-[18ch]">
            {copy.title}{" "}
            <span className="italic text-slate-500">{copy.titleAccent}</span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-xl leading-relaxed max-w-[56ch]">
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
