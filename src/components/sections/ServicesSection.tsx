"use client";

import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/data/services";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";

export function ServicesSection() {
  const t = useT();
  const { locale } = useLocale();
  const heading = `${t.services.title} ${t.services.titleAccent}`;
  const words = heading.split(" ");
  const totalChars = heading.length;

  return (
    <section
      id="services"
      className="relative box-border outline-none px-5 py-6 md:px-0 md:py-10 z-[2] w-full"
    >
      <div className="box-border max-w-none w-full mx-auto md:max-w-screen-xl">
        <div className="items-start box-border gap-x-5 flex flex-col justify-between max-w-none gap-y-5 w-full mb-5 mx-auto md:items-end md:gap-x-[normal] md:flex-row md:max-w-screen-xl md:gap-y-[normal] md:mb-10">
          <div className="box-border min-h-[auto] min-w-[auto]">
            <div className="box-border">
              <h2
                aria-label={heading}
                className="text-transparent text-[38px] font-bold bg-clip-text box-border leading-[1.05] tracking-tight max-w-xl md:text-6xl md:leading-[1.1]"
              >
                {words.map((word, wi) => {
                  let charsBefore = 0;
                  for (let k = 0; k < wi; k++) charsBefore += words[k].length + 1;
                  return (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {word.split("").map((ch, ci) => {
                        const idx = charsBefore + ci;
                        const ratio = idx / Math.max(1, totalChars - 1);
                        return (
                          <span
                            key={ci}
                            className="bg-clip-text"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, rgb(59,130,246) 0%, rgb(15,23,42) 50%, rgb(59,130,246) 100%)",
                              backgroundSize: "1100% 100%",
                              backgroundPosition: `${ratio * 100}% top`,
                            }}
                          >
                            {ch}
                          </span>
                        );
                      })}
                      {wi < words.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </h2>
            </div>
          </div>

          <a
            href="#services"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/40 text-slate-900 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <span>{t.hero.howWeWork}</span>
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="box-border flex flex-col grid-cols-[repeat(1,minmax(0px,1fr))] border-slate-200 overflow-hidden -mt-1.5 rounded-xl border-b border-l border-r border-t border-solid md:grid md:flex-row md:grid-cols-[repeat(12,minmax(0px,1fr))] md:mt-0 md:border-r-0">
          {services.map((service) => {
            const copy = t.services.items[service.key];
            return (
              <ServiceCard
                key={service.key}
                title={copy.title}
                description={copy.desc}
                href={`/${toSegment(locale)}/services/${service.slug}`}
                videoSrc={service.videoSrc}
                posterSrc={service.posterSrc}
                span={service.span}
                mobileObjectPosition={service.key === "uxui" ? "right center" : undefined}
              />
            );
          })}
        </div>

        <a
          href="#services"
          className="mt-8 flex md:hidden items-center justify-center gap-2 px-6 py-3 rounded-full border border-blue-500/40 text-slate-900 w-full"
        >
          <span>{t.hero.howWeWork}</span>
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}
