"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { services } from "@/data/services";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import type { ServiceGroup } from "@/i18n/messages";
import { href, paths } from "@/lib/routes";
import { ServiceTile } from "@/components/sections/ServiceTile";

type Filter = "all" | ServiceGroup;
const FILTERS: Filter[] = ["all", "product", "engineering", "ai", "growth"];

/** The services: filter buttons on top, text cards below that show their media on hover. */
export function ServicesSection() {
  const t = useT();
  const { locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = services.filter((s) => filter === "all" || s.group === filter);

  return (
    <section id="services" className="relative w-full px-5 pt-4 pb-14 md:px-12 md:pt-6 md:pb-24 z-[2]">
      <div className="mx-auto max-w-[1600px] w-full">
        <p className="text-xs md:text-sm font-medium text-slate-500">{t.services.eyebrow}</p>
        <h2 className="mt-3 text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
          {t.services.title} <span className="italic text-slate-500">{t.services.titleAccent}</span>
        </h2>

        <div role="tablist" aria-label={t.services.eyebrow} className="mt-8 md:mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.services.filters[f]}
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence initial={false}>
            {visible.map((service) => {
              const copy = t.services.items[service.key];
              return (
                <motion.li
                  key={service.key}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ServiceTile
                    title={copy.title}
                    description={copy.desc}
                    group={t.services.filters[service.group]}
                    href={href(locale, paths.service(service.slug))}
                    videoSrc={service.videoSrc}
                    posterSrc={service.posterSrc}
                    cta={t.services.open}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
