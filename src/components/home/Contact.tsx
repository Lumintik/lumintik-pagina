import { ContactForm } from "@/components/home/ContactForm";
import { Section } from "@/components/ui/primitives";
import { COMPANY } from "@/data/company";
import { services } from "@/data/services";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

export function Contact({ locale }: { locale: Locale }) {
  const t = site[locale];
  const serviceOptions = [
    ...services.map((s) => t.services.items[s.key].title),
    t.nav.government,
    t.contact.serviceOther,
  ];

  return (
    <Section tone="light" id="contact" labelledBy="contact-title">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
        <div>
          <p className="pill">{t.contact.pill}</p>
          <h2 id="contact-title" className="heading mt-6 text-4xl md:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed md:text-xl">{t.contact.subtitle}</p>
          <p className="mt-6 text-lg">
            <a href={`mailto:${COMPANY.email}`} className="link">
              {COMPANY.email}
            </a>
          </p>
        </div>
        <ContactForm
          t={t.contact}
          serviceOptions={serviceOptions}
          privacyHref={href(locale, paths.privacy)}
          email={COMPANY.email}
        />
      </div>
    </Section>
  );
}
