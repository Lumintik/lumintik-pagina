import { RiseIn } from "@/components/home/RiseIn";
import { Section } from "@/components/ui/primitives";
import type { Locale } from "@/lib/locale";
import { site } from "@/i18n/site";

export function Stats({ locale }: { locale: Locale }) {
  const t = site[locale].stats;
  return (
    <Section tone="light" labelledBy="stats-title">
      <p className="pill">{t.pill}</p>
      <h2 id="stats-title" className="heading mt-6 max-w-[18ch] text-4xl md:text-6xl">
        {t.title}
      </h2>
      <dl className="mt-16 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-3 md:gap-10">
        {t.items.map((item, i) => (
          <div key={item.label} className="flex flex-col">
            <dt className="order-2 mt-4 text-xl font-medium md:text-2xl">{item.label}</dt>
            <dd className="order-1 display text-[80px] md:text-[112px]">
              <RiseIn delay={i * 120}>
                {item.value}
                {item.suffix}
              </RiseIn>
            </dd>
            {item.detail ? (
              <dd className="order-3 mt-2 max-w-[28ch] text-base leading-relaxed md:text-lg">
                {item.detail}
              </dd>
            ) : null}
          </div>
        ))}
      </dl>
    </Section>
  );
}
