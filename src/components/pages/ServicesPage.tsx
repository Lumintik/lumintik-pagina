"use client";

import { PageShell } from "@/components/sections/PageShell";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { useT } from "@/components/providers/LocaleProvider";

export function ServicesPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.services} title={t.pages.services.title} titleAccent={t.pages.services.titleAccent} intro={t.pages.services.intro}>
      <div className="w-full pt-6 md:pt-10">
        <ServicesSection />
      </div>
    </PageShell>
  );
}
