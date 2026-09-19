"use client";

import Image from "next/image";
import Link from "next/link";
import { SiSamsung } from "react-icons/si";
import type { ReactNode } from "react";
import { CASES } from "@/data/cases";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/**
 * Clients that lead with a result we can state. Each one keeps the image and
 * the wording of its case study; nothing new is claimed here.
 */
const STORIES: { slug: string; logo?: ReactNode; image: string }[] = [
  { slug: "imagiq", logo: <SiSamsung className="h-6 w-auto" aria-hidden />, image: "/projects/samsung/home-desktop.png" },
  { slug: "claro", image: "/projects/claro/home.png" },
  { slug: "ezdocuai", image: "/projects/ezdocu/home-desktop.png" },
  { slug: "griver", image: "/projects/reco/plataforma-desktop.png" },
];

/**
 * The cards stack as you scroll: each one sticks under the navbar and the next
 * slides over it. Without JavaScript, and on browsers without sticky, they
 * simply read as a list of cards.
 */
export function ClientStories() {
  const t = useT();
  const { locale } = useLocale();

  const stories = STORIES.map((s) => {
    const study = CASES.find((c) => c.slug === s.slug)!;
    const copy = study.copy[locale];
    return {
      ...s,
      client: copy.client,
      line: copy.headline ?? copy.why ?? copy.solution ?? copy.about,
      href: href(locale, paths.caseStudy(study.slug)),
    };
  });

  return (
    <section id="clients" className="relative w-full px-5 md:px-12 pt-6 pb-16 md:pt-10 md:pb-24 z-[2]">
      <div className="mx-auto max-w-[1600px] w-full">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            {t.buildingFor.title}{" "}
            <span className="italic text-blue-500">{t.buildingFor.titleAccent}</span>
          </h2>
        </div>

        <ul aria-label={t.buildingFor.aria} className="relative">
          {stories.map((story, i) => (
            <li
              key={story.slug}
              className="sticky mb-6 md:mb-10"
              // Each card pins a little lower than the one before, so the edge
              // of the card underneath stays visible as the stack grows.
              style={{ top: `calc(5rem + ${i * 0.75}rem)` }}
            >
              <Link
                href={story.href}
                className="group relative block h-[52vh] min-h-[320px] md:h-[68vh] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-900 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]"
              >
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(min-width: 1536px) 1536px, 100vw"
                  quality={85}
                  className="object-contain object-top md:object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Screenshots are mostly light, so the caption needs its own
                    scrim to stay readable over any of them. */}
                <span className="absolute inset-0 bg-slate-950/15" />
                <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10">
                  <span className="flex items-center gap-2 text-white/90">
                    {story.logo ?? null}
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase">
                      {story.client}
                    </span>
                  </span>
                  <span className="text-white text-xl md:text-3xl font-semibold leading-snug max-w-[34ch]">
                    {story.line}
                  </span>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                    {t.cases.open}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
