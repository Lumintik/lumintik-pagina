"use client";

import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { ProjectStack } from "@/components/sections/ProjectStack";
import { WhyWorkStats } from "@/components/sections/WhyWorkStats";
import { useT } from "@/components/providers/LocaleProvider";

/** The one projects section: the marquee, every project stacked, the stats. */
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
          <ProjectStack />
        </div>

        <div className="mt-6 md:mt-10">
          <WhyWorkStats />
        </div>
      </div>
    </section>
  );
}
