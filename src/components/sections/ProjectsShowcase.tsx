"use client";

import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { WhyWorkStats } from "@/components/sections/WhyWorkStats";
import { CASES, MORE_PROJECTS } from "@/data/cases";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

export function ProjectsShowcase() {
  const t = useT();
  const { locale } = useLocale();

  // The first case leads the grid, the way the featured project used to.
  const [lead, ...rest] = CASES;

  function caseCard(study: (typeof CASES)[number]) {
    const copy = study.copy[locale];
    const cover = study.images[0] ?? study.cardImage;
    return {
      title: copy.client,
      desc: copy.about,
      href: href(locale, paths.caseStudy(study.slug)),
      badge: study.links.length > 0,
      image: cover ? { src: cover.src, alt: cover.alt[locale] } : null,
    };
  }

  return (
    <section
      id="work"
      className="relative w-full px-5 py-14 md:px-12 md:py-24 z-[2]"
    >
      <style>{`
        @keyframes lumintik-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px] w-full">
        <h2 className="sr-only">{t.nav.work}</h2>
        <div className="relative -mb-2">
          <MarqueeRow items={t.projects.marquee} duration={28} primary />
          <div className="-mt-10 opacity-50">
            <MarqueeRow
              items={t.projects.marquee}
              duration={36}
              primary={false}
              reverse
            />
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col gap-12 md:gap-16">
          <ProjectCard {...caseCard(lead)} large />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {rest.map((study) => (
              <ProjectCard key={study.slug} {...caseCard(study)} />
            ))}

            {MORE_PROJECTS.map((p) => (
              <ProjectCard
                key={p.key}
                image={{ src: p.image.src, alt: p.name }}
                title={p.name}
                desc={p.desc[locale]}
                href={href(locale, paths.project(p.key))}
                badge={Boolean(p.href)}
              />
            ))}
          </div>

          <WhyWorkStats />
        </div>
      </div>
    </section>
  );
}
