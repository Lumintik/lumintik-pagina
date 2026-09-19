"use client";

import { PageShell } from "@/components/sections/PageShell";
import { ContactSection } from "@/components/sections/ContactSection";
import { useT } from "@/components/providers/LocaleProvider";

export function ContactPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.contact} title={t.pages.contact.title} titleAccent={t.pages.contact.titleAccent} intro={t.pages.contact.intro} contact={false}>
      <div className="w-full pt-4 md:pt-8">
        <ContactSection />
      </div>
    </PageShell>
  );
}
