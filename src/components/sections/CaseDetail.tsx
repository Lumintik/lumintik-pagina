"use client";

import { ProductTour } from "@/components/sections/ProductTour";
import { TOURS } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  ArrowRight,
  CaseBlocks,
  CaseCertification,
  CaseCover,
  CaseFrame,
  coverPair,
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
  // The cover already shows the desktop and the phone screens; the gallery
  // picks up from there.
  const { desktop, mobile } = coverPair(study);
  const gallery = study.images.filter((i) => i !== desktop && i !== mobile);

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* Dark opening, echoing the home page's hero gradient. */}
        <header
          className="relative w-full flex justify-center px-5 pt-24 pb-10 md:px-12 md:pt-28 md:pb-14"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
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
              {t.cases.back}
            </Link>

            <p className="mt-6 text-xs font-medium text-white">
              {copy.topic}
            </p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              {title}
            </h1>
            <p className="mt-6 text-white text-lg md:text-2xl leading-relaxed max-w-[60ch]">
              {copy.about}
            </p>

            {/* The facts and the two buttons share one row: the header stays
                short and the cover starts higher up the page. */}
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <dl className="grid max-w-3xl flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { label: t.cases.client, value: copy.client },
                { label: t.cases.country, value: t.cases.countries[study.country] },
                { label: t.cases.sector, value: copy.sector },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium text-white">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-white text-lg font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </header>

        {/* z-[2] mirrors #content-rise on the home page: the footer wrapper is
            pulled up by 100vh, and without this the content would sit under it. */}
        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12">
            <div className="-mt-8 md:-mt-14">
              <CaseCover study={study} priority sizes="(min-width: 1536px) 1440px, 100vw" />
            </div>

            <section className="mt-16 md:mt-24">
              <CaseBlocks study={study} large />
            </section>

            {study.metrics?.length ? (
              <section className="mt-16 md:mt-24">
                <h2 className="text-xs font-medium text-slate-900">{t.cases.metrics}</h2>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                  {study.metrics.map((m) => (
                    <div key={m.label[locale]}>
                      <dd className="text-slate-900 text-4xl md:text-5xl font-semibold tracking-tight">{m.value}</dd>
                      <dt className="mt-3 text-slate-900 text-sm md:text-base max-w-[22ch]">{m.label[locale]}</dt>
                    </div>
                  ))}
                </dl>
                {study.metricsSource ? (
                  <p className="mt-8 text-xs text-slate-900">{study.metricsSource[locale]}</p>
                ) : null}
              </section>
            ) : null}

            {(TOURS[study.slug] ?? []).map((tour) => (
              <section key={tour.id} className="mt-16 md:mt-24">
                <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{tour.title[locale]}</h2>
                <p className="mt-3 mb-8 text-slate-900 text-base md:text-lg max-w-[60ch]">{tour.intro[locale]}</p>
                {/* Kept under the capture's own width so the zoom stays sharp. */}
                {/* Capped by the viewport height so a whole stop fits on screen. */}
                <ProductTour tour={tour} className={tour.device === "browser" ? "max-w-[min(1180px,calc(66vh*1.875))]" : "max-w-[1000px]"} />
              </section>
            ))}

            {study.fieldwork ? (
              <section className="mt-16 md:mt-24">
                <h2 className="text-xs font-medium text-slate-900">{t.cases.fieldwork}</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-5">
                    <p className="text-slate-900 text-2xl md:text-3xl font-semibold leading-snug">
                      {study.fieldwork.title[locale]}
                    </p>
                    <p className="mt-4 text-slate-900 text-lg leading-relaxed">{study.fieldwork.body[locale]}</p>
                  </div>
                  {/* Photographs, not screens: no device frame, and never cropped. */}
                  <ul className="md:col-span-7 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                    {study.fieldwork.images.map((image) => (
                      <li key={image.src} className="overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                          src={image.src}
                          alt={image.alt[locale]}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 768px) 260px, 45vw"
                          className="h-auto w-full"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}

            {study.certification ? (
              <section className="mt-16 md:mt-24">
                <CaseCertification certification={study.certification} />
              </section>
            ) : null}

            {study.tools?.length === 0 ? null : (
              <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
                <h2 className="md:col-span-4 text-xs font-medium text-slate-900">
                  {t.cases.tools}
                </h2>
                <div className="md:col-span-8">
                  <ToolList tools={study.tools} />
                </div>
              </section>
            )}

            {/* The gallery label sits on top and the frames take the whole width. */}
            {gallery.length ? (
              <section className="mt-16 md:mt-24">
                <h2 className="text-xs font-medium text-slate-900">{t.cases.gallery}</h2>
                {/* Phone captures sit three or four across; wider ones take half
                    the row, so the grid never leaves a hole beside them. */}
                <ul
                  className={cn(
                    "mt-6 grid items-center gap-6 md:gap-8",
                    gallery.every((i) => i.height / i.width > 1.4)
                      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-1 sm:grid-cols-2",
                  )}
                >
                  {gallery.map((image) => (
                    <li key={image.src} className="min-w-0">
                      <CaseFrame image={image} sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 45vw" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-16 md:mt-24 rounded-md bg-slate-50 border border-slate-900/15 px-6 py-10 md:px-12 md:py-14">
              <p className="text-slate-900 text-2xl md:text-4xl font-semibold leading-[1.25] max-w-[30ch]">
                {t.cases.ctaTitle}
              </p>
              <p className="mt-4 text-slate-900 text-lg max-w-[50ch]">{t.cases.ctaBody}</p>
            </section>

            <section className="mt-20 md:mt-28">
              <Link href={href(locale, paths.caseStudy(next.slug))} className="group inline-flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-900">
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
