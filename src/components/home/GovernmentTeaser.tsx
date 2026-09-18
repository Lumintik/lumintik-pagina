import Link from "next/link";
import { ArrowRight, Section } from "@/components/ui/primitives";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";
import { government } from "@/i18n/government";

export function GovernmentTeaser({ locale }: { locale: Locale }) {
  const t = site[locale].governmentTeaser;
  const steps = government[locale].method.steps;
  return (
    <Section tone="dark" id="public-sector" labelledBy="gov-title">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
        <div>
          <p className="pill">{t.pill}</p>
          <h2 id="gov-title" className="heading mt-6 max-w-[16ch] text-4xl md:text-6xl">
            {t.title}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-8 md:pt-16">
          <p className="text-lg leading-relaxed md:text-xl">{t.body}</p>
          <ol className="flex flex-wrap gap-2">
            {steps.map((s, i) => (
              <li key={s.title} className="pill">
                {i + 1}. {s.title}
              </li>
            ))}
          </ol>
          <Link href={href(locale, paths.government)} className="btn btn-primary">
            {t.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </Section>
  );
}
