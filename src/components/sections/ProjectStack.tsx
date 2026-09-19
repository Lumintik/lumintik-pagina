"use client";

import Image from "next/image";
import Link from "next/link";
import { CASES, MORE_PROJECTS } from "@/data/cases";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

type Card = {
  key: string;
  name: string;
  line: string;
  image: { src: string; alt: string } | null;
  href: string;
  cta: string;
};

/**
 * Every project, case studies first, as cards that stack while you scroll:
 * each one sticks under the navbar and the next slides over it, leaving a
 * sliver of the one underneath. Without JavaScript, or where sticky is not
 * supported, they read as a plain list of cards.
 */
export function ProjectStack() {
  const t = useT();
  const { locale } = useLocale();

  const cards: Card[] = [
    ...CASES.map((study) => {
      const copy = study.copy[locale];
      const cover = study.images[0] ?? study.cardImage;
      return {
        key: study.slug,
        name: copy.client,
        // The result when the case has one, otherwise what was built.
        line: copy.headline ?? copy.why ?? copy.solution ?? copy.about,
        image: cover ? { src: cover.src, alt: cover.alt[locale] } : null,
        href: href(locale, paths.caseStudy(study.slug)),
        cta: t.cases.open,
      };
    }),
    ...MORE_PROJECTS.map((p) => ({
      key: p.key,
      name: p.name,
      line: p.desc[locale],
      image: { src: p.image.src, alt: p.name },
      href: href(locale, paths.project(p.key)),
      cta: t.moreProjects.open,
    })),
  ];

  return (
    <ul data-stack className="relative">
      {cards.map((card, i) => (
        <li
          key={card.key}
          className="sticky mb-5 md:mb-8"
          // A small stagger per card keeps the edges of the stack visible.
          style={{ top: `calc(5rem + ${i * 0.4}rem)` }}
        >
          <Link
            href={card.href}
            className="group relative block h-[48vh] min-h-[300px] md:h-[60vh] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-900 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]"
          >
            {card.image ? (
              <Image
                src={card.image.src}
                alt=""
                fill
                sizes="(min-width: 1536px) 1536px, 100vw"
                quality={82}
                // A desktop capture cropped to a phone width shows a slice of
                // text; on small screens it is shown whole instead.
                className="object-contain object-top md:object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/70">
                {t.cases.pendingImages}
              </span>
            )}

            {/* Screenshots are mostly light, so the caption needs its own scrim. */}
            <span className="absolute inset-0 bg-slate-950/15" />
            <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />

            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10">
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/90">
                {card.name}
              </span>
              <span className="text-white text-xl md:text-3xl font-semibold leading-snug max-w-[34ch]">
                {card.line}
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                {card.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
