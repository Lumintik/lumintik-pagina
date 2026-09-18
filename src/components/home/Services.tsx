import Link from "next/link";
import { ArrowRight, Section } from "@/components/ui/primitives";
import { services } from "@/data/services";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

export function Services({ locale }: { locale: Locale }) {
  const t = site[locale].services;
  return (
    <Section tone="light" id="services" labelledBy="services-title">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
        <div>
          <p className="pill">{t.pill}</p>
          <h2 id="services-title" className="heading mt-6 text-4xl md:sticky md:top-32 md:text-6xl">
            {t.title}
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {services.map((s) => {
            const item = t.items[s.key];
            return (
              <li key={s.key}>
                <Link
                  href={href(locale, paths.service(s.slug))}
                  className="group flex items-start justify-between gap-6 rounded-2xl p-5 transition-colors hover:bg-[var(--soft)] md:p-6"
                >
                  <span>
                    <span className="block text-xl font-semibold md:text-2xl">{item.title}</span>
                    <span className="mt-2 block text-base leading-relaxed md:text-lg">{item.desc}</span>
                  </span>
                  <ArrowRight className="mt-2 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
