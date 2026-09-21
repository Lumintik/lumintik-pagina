"use client";

import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { ArrowRight, ArrowUpRight, CaseFrame } from "@/components/sections/CaseParts";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import type { MoreProject } from "@/data/cases";

export type ProjectDetailProps = {
  project: MoreProject;
  next: MoreProject;
};

/**
 * A project without a case study: what it is, the site recorded scrolling,
 * the screens we have and the link. Deliberately shorter than a case study,
 * because there is no measured result to tell yet.
 */
export function ProjectDetail({ project, next }: Readonly<ProjectDetailProps>) {
  const t = useT();
  const { locale } = useLocale();
  const home = `/${toSegment(locale)}`;
  const cover = project.gallery?.[0];
  const rest = project.gallery?.slice(1) ?? [];

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        <header
          className="relative w-full flex justify-center px-5 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <Link
              href={`${home}#work`}
              className="inline-flex items-center gap-2 text-white hover:text-white/70 text-sm transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {t.moreProjects.back}
            </Link>

            <p className="mt-10 text-xs font-medium text-white">
              {t.moreProjects.eyebrow}
            </p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              {project.name}
            </h1>
            <p className="mt-6 text-white text-lg md:text-2xl leading-relaxed max-w-[60ch]">
              {project.desc[locale]}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`${home}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-200 transition-colors duration-300"
              >
                {t.detail.cta}
                <ArrowRight />
              </a>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-slate-900 transition-colors duration-300"
                >
                  {t.cases.visit}
                  <ArrowUpRight />
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12">
            <div className="-mt-8 md:-mt-14">
              {project.video ? (
                <div className="relative w-full overflow-hidden rounded-md border border-slate-900/15 bg-slate-900 aspect-[16/10]">
                  <video
                    src={project.video}
                    poster={project.image.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={project.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : cover ? (
                <CaseFrame image={cover} priority sizes="(min-width: 1536px) 1440px, 100vw" />
              ) : null}
            </div>

            {rest.length ? (
              <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
                <h2 className="md:col-span-4 text-xs font-medium text-slate-900">
                  {t.moreProjects.gallery}
                </h2>
                <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {rest.map((image) => (
                    <li key={image.src}>
                      <CaseFrame image={image} sizes="(min-width: 768px) 600px, 100vw" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-20 md:mt-28">
              <Link href={href(locale, paths.project(next.key))} className="group inline-flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-900">
                  {t.moreProjects.next}
                </span>
                <span className="inline-flex items-center gap-3 text-slate-900 text-3xl md:text-5xl font-semibold transition-colors duration-300 group-hover:text-slate-500">
                  {next.name}
                  <ArrowRight className="size-7 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </section>
          </div>

          <div className="w-full mt-20 md:mt-28">
            <ContactSection />
          </div>
        </div>
      </main>

      <div
        id="footer-wrap"
        className="relative w-full flex justify-center overflow-clip -mt-[100vh] md:-mt-[90vh] lg:-mt-[96vh] xl:-mt-[100vh] h-[200vh] md:h-[185vh] lg:h-[195vh] xl:h-[200vh]"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #d4d4d4 12%, #737373 26%, #262626 42%, #111111 65%, #0a0a0a 100%)",
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
