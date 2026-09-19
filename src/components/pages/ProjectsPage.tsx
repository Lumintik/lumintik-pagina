"use client";

import { PageShell } from "@/components/sections/PageShell";
import { ProjectStack } from "@/components/sections/ProjectStack";
import { useT } from "@/components/providers/LocaleProvider";

export function ProjectsPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.work} title={t.pages.projects.title} titleAccent={t.pages.projects.titleAccent} intro={t.pages.projects.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-12 md:pt-20">
        <ProjectStack />
      </div>
    </PageShell>
  );
}
