"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { INDUSTRIES, findIndustry } from "@/data/industries";
import { href, paths } from "@/lib/routes";

const Arrow = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** One industry: what the sector demands, what we built, the photos and the case behind it. */
export function IndustryDetail({ id }: { id: string }) {
  const t = useT();
  const { locale } = useLocale();
  // Looked up here: `path` is a function, which a server component cannot hand over.
  const industry = findIndustry(id)!;
  const copy = t.industries.items[industry.id];
  const chrome = t.industries.page;
  const others = INDUSTRIES.filter((i) => i.id !== industry.id).slice(0, 4);

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* Opening: the cover behind the title */}
        <header className="relative w-full flex justify-center overflow-hidden bg-slate-950 px-5 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
          {industry.image ? (
            <Image src={industry.image} alt="" fill priority sizes="100vw" className="object-cover object-center opacity-35" />
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          <div className="relative mx-auto max-w-[1600px] w-full">
            <Link href={href(locale, paths.industries)} className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
              <Arrow className="rotate-180" />
              {chrome.back}
            </Link>
            <p className="mt-8 text-xs md:text-sm font-medium text-white/70">{copy.category}</p>
            <h1 className="mt-3 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] max-w-[20ch]">{copy.title}</h1>
            <p className="mt-6 text-white/70 text-lg md:text-2xl leading-relaxed max-w-[60ch]">{copy.body[0]}</p>
          </div>
        </header>

        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 py-16 md:py-24 flex flex-col gap-16 md:gap-24">
            {/* What the sector demands */}
            <section>
              <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{chrome.demands}</h2>
              <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {copy.demands.map((d, i) => (
                  <li key={d.title} className="rounded-3xl bg-slate-50 p-6 md:p-8">
                    <span className="flex size-8 items-center justify-center rounded-full border border-slate-900/30 text-sm font-medium text-slate-900">{i + 1}</span>
                    <h3 className="mt-5 text-slate-900 text-xl font-semibold leading-snug">{d.title}</h3>
                    <p className="mt-3 text-slate-600 text-base leading-relaxed">{d.desc}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* What we built, and what with */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
              <h2 className="md:col-span-4 text-slate-900 text-3xl md:text-4xl font-semibold">{chrome.whatWeBuilt}</h2>
              <div className="md:col-span-8 flex flex-col gap-5">
                {copy.body.map((paragraph, i) => (
                  <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed">{paragraph}</p>
                ))}
                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500">{chrome.stack}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {industry.stack.map((tool) => (
                      <li key={tool} className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-700">{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Photos */}
            {industry.gallery?.length ? (
              <section>
                <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{chrome.gallery}</h2>
                <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {industry.gallery.map((photo) => (
                    <li key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                      <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover object-top" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* The case behind it */}
            {industry.path ? (
              <section>
                <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{chrome.caseTitle}</h2>
                <Link
                  href={href(locale, industry.path)}
                  className="group mt-8 flex flex-col md:flex-row md:items-center gap-6 rounded-3xl bg-slate-950 p-6 md:p-10 text-white transition-transform duration-500 hover:-translate-y-1"
                >
                  {industry.image ? (
                    <span className="relative block h-40 w-full md:h-32 md:w-52 shrink-0 overflow-hidden rounded-2xl bg-slate-900">
                      <Image src={industry.image} alt="" fill sizes="220px" className="object-cover object-top" />
                    </span>
                  ) : null}
                  <span className="flex-1">
                    <span className="block text-2xl md:text-3xl font-semibold leading-snug">{copy.title}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                      {t.industries.seeCase}
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </section>
            ) : null}

            {/* Where to go next */}
            <section>
              <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{chrome.others}</h2>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {others.map((other) => (
                  <li key={other.id}>
                    <Link href={href(locale, paths.industry(other.id))} className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 p-6 transition-colors hover:bg-slate-50">
                      <span className="text-xs font-medium text-slate-500">{t.industries.items[other.id].category}</span>
                      <span className="mt-6 flex items-center justify-between gap-3 text-slate-900 text-lg font-semibold leading-snug">
                        {t.industries.items[other.id].title}
                        <Arrow className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Talk to us */}
            <section className="rounded-3xl bg-slate-50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{chrome.ctaTitle}</h2>
                <p className="mt-3 text-slate-600 text-base md:text-lg leading-relaxed max-w-[60ch]">{chrome.ctaBody}</p>
              </div>
              <Link href={href(locale, paths.contact)} className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                {chrome.ctaButton}
                <Arrow />
              </Link>
            </section>
          </div>

          <ContactSection />
        </div>
      </main>

      <div
        id="footer-wrap"
        className="relative w-full flex justify-center overflow-clip -mt-[100vh] md:-mt-[90vh] lg:-mt-[96vh] xl:-mt-[100vh] h-[200vh] md:h-[185vh] lg:h-[195vh] xl:h-[200vh]"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #d4d4d4 12%, #737373 26%, #262626 42%, #111111 65%, #0a0a0a 100%)" }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
