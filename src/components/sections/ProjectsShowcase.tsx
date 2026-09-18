"use client";

import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { CaseCard } from "@/components/sections/CaseCard";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { Eyebrow } from "@/components/sections/CaseParts";
import { WhyWorkStats } from "@/components/sections/WhyWorkStats";
import { CASES } from "@/data/cases";
import { useT } from "@/components/providers/LocaleProvider";

export function ProjectsShowcase() {
  const t = useT();

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

        <div className="mt-12 md:mt-16">
          <Eyebrow>{t.cases.eyebrow}</Eyebrow>
          <p className="mt-3 text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight max-w-[16ch]">
            {t.cases.title}{" "}
            <span className="italic text-blue-500">{t.cases.titleAccent}</span>
          </p>
          <p className="mt-5 max-w-[60ch] text-slate-500 text-lg md:text-xl leading-relaxed">
            {t.cases.intro}
          </p>
        </div>

        <div className="mt-14 md:mt-20 flex flex-col gap-14 md:gap-20">
          {CASES.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}

          <MoreProjects />

          <WhyWorkStats />
        </div>
      </div>
    </section>
  );
}
