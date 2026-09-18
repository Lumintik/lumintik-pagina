"use client";

import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";
import type { ServiceContent } from "@/i18n/serviceDetails";

export type ServiceDetailProps = {
  title: string;
  description: string;
  content: ServiceContent;
  video: { src: string; poster?: string };
  next?: { title: string; href: string };
};

export function ServiceDetail({
  title,
  description,
  content,
  video,
  next,
}: Readonly<ServiceDetailProps>) {
  const t = useT();
  const { locale } = useLocale();
  const home = `/${toSegment(locale)}`;

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* Dark opening, echoing the home page's hero gradient. */}
        <header
          className="relative w-full flex justify-center px-5 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #0f172a 45%, #1e3a8a 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <Link
              href={`${home}#services`}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {t.detail.back}
            </Link>

            <p className="mt-10 text-[11px] font-medium tracking-[0.18em] uppercase text-blue-300">
              {t.services.eyebrow}
            </p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] max-w-[18ch]">
              {title}
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-2xl leading-relaxed max-w-[60ch]">
              {description}
            </p>

            <a
              href={`${home}#contact`}
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-blue-300 transition-colors duration-300"
            >
              {t.detail.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </header>

        {/* z-[2] mirrors #content-rise on the home page: the footer wrapper is
            pulled up by 100vh, and without this the content would sit under it. */}
        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12">
            <div className="-mt-10 md:-mt-16 relative w-full rounded-md overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9]">
              <video
                src={video.src}
                poster={video.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overview */}
            <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h2 className="md:col-span-4 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-400">
                {t.detail.overview}
              </h2>
              <p className="md:col-span-8 text-slate-700 text-xl md:text-2xl leading-relaxed">
                {content.overview}
              </p>
            </section>

            {/* Capabilities */}
            <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h2 className="md:col-span-4 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-400">
                {t.detail.capabilities}
              </h2>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {content.capabilities.map((c) => (
                  <div key={c.title} className="border-t border-slate-200 pt-5">
                    <h3 className="text-slate-900 text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-slate-500 text-base leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h2 className="md:col-span-4 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-400">
                {t.detail.process}
              </h2>
              <ol className="md:col-span-8 flex flex-col gap-8">
                {content.process.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="shrink-0 w-9 h-9 rounded-full border border-blue-500/40 text-blue-500 text-sm font-medium flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-slate-900 text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-slate-500 text-base md:text-lg leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Deliverables */}
            <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h2 className="md:col-span-4 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-400">
                {t.detail.deliverables}
              </h2>
              <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {content.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-slate-700 text-base md:text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-1 shrink-0 text-blue-500">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            {/* Outcome */}
            <section className="mt-16 md:mt-24 rounded-md bg-slate-50 border border-slate-200 px-6 py-10 md:px-12 md:py-14">
              <p className="text-slate-900 text-2xl md:text-4xl font-semibold leading-[1.25] max-w-[40ch]">
                {content.outcome}
              </p>
            </section>

            {next && (
              <section className="mt-20 md:mt-28 border-t border-slate-200 pt-10">
                <Link href={next.href} className="group inline-flex flex-col gap-2">
                  <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-slate-400">
                    {t.detail.next}
                  </span>
                  <span className="inline-flex items-center gap-3 text-slate-900 text-3xl md:text-5xl font-semibold transition-colors duration-300 group-hover:text-blue-500">
                    {next.title}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </section>
            )}
          </div>

          <div className="w-full mt-20 md:mt-28">
            <ContactSection />
          </div>
        </div>
      </main>

      {/* Same wrapper as the home page: the id is what Footer measures to fade
          its text from dark to light, and the sticky child is what produces the
          reveal. Without both, the footer renders in its light-background
          colours on top of the dark gradient. */}
      <div
        id="footer-wrap"
        className="relative w-full flex justify-center overflow-clip -mt-[100vh] md:-mt-[90vh] lg:-mt-[96vh] xl:-mt-[100vh] h-[200vh] md:h-[185vh] lg:h-[195vh] xl:h-[200vh]"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #93c5fd 12%, #3b82f6 26%, #1e3a8a 42%, #0f172a 65%, #0a0a0a 100%)",
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
