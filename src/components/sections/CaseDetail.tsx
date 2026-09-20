"use client";

import { ProductTour } from "@/components/sections/ProductTour";
import { TOURS } from "@/data/tours";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  ArrowRight,
  CaseBlocks,
  CaseCertification,
  CaseCover,
  CaseFrame,
  CaseLinks,
  ToolList,
  useCaseTitle,
} from "@/components/sections/CaseParts";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import type { CaseStudy } from "@/data/cases";

export type CaseDetailProps = {
  study: CaseStudy;
  next: CaseStudy;
};

/** One case study in full, in the same shape as the service detail pages. */
export function CaseDetail({ study, next }: Readonly<CaseDetailProps>) {
  const t = useT();
  const { locale } = useLocale();
  const home = `/${toSegment(locale)}`;
  const copy = study.copy[locale];
  const title = useCaseTitle(study);
  const nextTitle = t.cases.caseTitle.replace("{client}", next.copy[locale].client);
  const gallery = study.images.slice(1);

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* Dark opening, echoing the home page's hero gradient. */}
        <header
          className="relative w-full flex justify-center px-5 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <Link
              href={`${home}#work`}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {t.cases.back}
            </Link>

            <p className="mt-10 text-xs font-medium text-slate-400">
              {copy.topic}
            </p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] max-w-[18ch]">
              {title}
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-2xl leading-relaxed max-w-[60ch]">
              {copy.about}
            </p>

            <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { label: t.cases.client, value: copy.client },
                { label: t.cases.country, value: t.cases.countries[study.country] },
                { label: t.cases.sector, value: copy.sector },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-white text-lg font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`${home}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-200 transition-colors duration-300"
              >
                {t.detail.cta}
                <ArrowRight />
              </a>
              <span className="[&_a]:border-white/40 [&_a]:text-white [&_a:hover]:bg-white [&_a:hover]:text-slate-900 inline-flex flex-wrap items-center gap-3">
                <CaseLinks study={study} />
              </span>
            </div>
          </div>
        </header>

        {/* z-[2] mirrors #content-rise on the home page: the footer wrapper is
            pulled up by 100vh, and without this the content would sit under it. */}
        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12">
            <div className="-mt-10 md:-mt-16">
              <CaseCover study={study} priority sizes="(min-width: 1536px) 1440px, 100vw" />
            </div>

            <section className="mt-16 md:mt-24">
              <CaseBlocks study={study} large />
            </section>

            {TOURS[study.slug] ? (
              <section className="mt-16 md:mt-24">
                <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{t.cases.tour}</h2>
                <p className="mt-3 mb-8 text-slate-500 text-base md:text-lg max-w-[60ch]">{t.cases.tourIntro}</p>
                {/* Kept under the capture's own width so the zoom stays sharp. */}
                <ProductTour tour={TOURS[study.slug]} className="max-w-[1180px]" />
              </section>
            ) : null}

            {study.certification ? (
              <section className="mt-16 md:mt-24">
                <CaseCertification certification={study.certification} />
              </section>
            ) : null}

            <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h2 className="md:col-span-4 text-xs font-medium text-slate-400">
                {t.cases.tools}
              </h2>
              <div className="md:col-span-8">
                <ToolList tools={study.tools} />
              </div>
            </section>

            {gallery.length ? (
              <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
                <h2 className="md:col-span-4 text-xs font-medium text-slate-400">
                  {t.cases.gallery}
                </h2>
                <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {gallery.map((image) => (
                    <li key={image.src}>
                      <CaseFrame image={image} sizes="(min-width: 768px) 600px, 100vw" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-16 md:mt-24 rounded-md bg-slate-50 border border-slate-200 px-6 py-10 md:px-12 md:py-14">
              <p className="text-slate-900 text-2xl md:text-4xl font-semibold leading-[1.25] max-w-[30ch]">
                {t.cases.ctaTitle}
              </p>
              <p className="mt-4 text-slate-500 text-lg max-w-[50ch]">{t.cases.ctaBody}</p>
            </section>

            <section className="mt-20 md:mt-28">
              <Link href={href(locale, paths.caseStudy(next.slug))} className="group inline-flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-400">
                  {t.cases.next}
                </span>
                <span className="inline-flex items-center gap-3 text-slate-900 text-3xl md:text-5xl font-semibold transition-colors duration-300 group-hover:text-slate-500">
                  {nextTitle}
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

      {/* Same wrapper as the home page: the id is what Footer measures to fade
          its text from dark to light, and the sticky child is what produces the
          reveal. */}
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
