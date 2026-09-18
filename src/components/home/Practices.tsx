import { Section } from "@/components/ui/primitives";
import type { Locale } from "@/lib/locale";
import { site } from "@/i18n/site";

export function Practices({ locale }: { locale: Locale }) {
  const t = site[locale].practices;
  return (
    <Section tone="dark" id="practices" labelledBy="practices-title">
      <p className="pill">{t.pill}</p>
      <h2 id="practices-title" className="heading mt-6 max-w-[18ch] text-4xl md:text-6xl">
        {t.title}
      </h2>
      <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item) => (
          <li key={item.title}>
            <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed md:text-lg">{item.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
