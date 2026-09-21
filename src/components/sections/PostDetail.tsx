"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { PostCard, coverAddress } from "@/components/sections/PostCard";
import { useEffect, useState } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import type { Post } from "@/data/posts";
import { LOCALE_TAGS } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { CASES } from "@/data/cases";
import { cn } from "@/lib/cn";
import { IphoneFrame, MacWindowFrame } from "@/components/ui/DeviceFrames";

/** Words per minute a reader gets through; the count rounds up to a full minute. */
const WORDS_PER_MINUTE = 200;

/** Anchor id for a section heading: lowercase, accents stripped, words joined by hyphens. */
export function headingId(heading: string): string {
  return heading
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function readingMinutes(sections: { heading: string; paragraphs: string[] }[]): number {
  const words = sections.reduce((n, s) => n + s.heading.split(/\s+/).length + s.paragraphs.join(" ").split(/\s+/).length, 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** One post: the cover, the title, who wrote it and when, then the sections. */
export function PostDetail({ post, others }: { post: Post; others: Post[] }) {
  const t = useT();
  const { locale } = useLocale();
  const copy = post.copy[locale];
  const date = new Intl.DateTimeFormat(LOCALE_TAGS[locale], { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${post.date}T12:00:00Z`),
  );
  const fmt = new Intl.DateTimeFormat(LOCALE_TAGS[locale], { day: "numeric", month: "long", year: "numeric" });
  const updated = post.updated ? fmt.format(new Date(`${post.updated}T12:00:00Z`)) : null;
  const minutes = readingMinutes(copy.sections);
  const coverUrl = coverAddress(post);
  const related = post.relatedCase ? CASES.find((c) => c.slug === post.relatedCase) : undefined;
  const [current, setCurrent] = useState<string>(headingId(copy.sections[0]?.heading ?? ""));
  const [copied, setCopied] = useState(false);

  // The table of contents follows the reader: the last heading that crossed
  // the upper third of the viewport is the current one.
  useEffect(() => {
    const headings = copy.sections.map((sec) => document.getElementById(headingId(sec.heading))).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    const update = () => {
      const line = window.innerHeight / 3;
      let id = headings[0].id;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) id = h.id;
      setCurrent(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [copy.sections]);

  // Read after mount so the server and the first client render agree.
  const [pageUrl, setPageUrl] = useState("");
  useEffect(() => setPageUrl(window.location.href), []);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* the browser refused the clipboard; nothing to do */
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* A short dark opening so the bar reads on it; the article is on white. */}
        <div className="w-full h-20 md:h-24" style={{ background: "linear-gradient(180deg, #000000 0%, #0f172a 100%)" }} />

        <article className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="w-full max-w-[1600px] px-5 md:px-12 pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 xl:col-span-8 min-w-0">
            <Link href={href(locale, paths.blog)} className="inline-flex items-center gap-2 text-sm text-slate-900 hover:text-slate-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {t.pages.blog.back}
            </Link>

            {/* The cover keeps its own aspect ratio inside the frame; nothing is cropped. */}
            {post.cover.height > post.cover.width ? (
              <div className="mt-6 flex justify-center rounded-3xl bg-slate-100 p-8">
                <IphoneFrame className="w-[260px]" aspect={`${post.cover.width} / ${post.cover.height}`}>
                  <Image src={post.cover.src} alt={post.cover.alt[locale]} fill priority sizes="260px" className="object-contain" />
                </IphoneFrame>
              </div>
            ) : (
              <MacWindowFrame dark url={coverUrl} title={post.cover.alt[locale]} className="mt-6">
                <div className="relative w-full" style={{ aspectRatio: `${post.cover.width} / ${post.cover.height}` }}>
                  <Image src={post.cover.src} alt={post.cover.alt[locale]} fill priority sizes="(min-width: 1100px) 1000px, 100vw" className="object-contain" />
                </div>
              </MacWindowFrame>
            )}

            <h1 className="mt-10 text-slate-900 text-3xl md:text-5xl font-semibold leading-[1.1]">{copy.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-sm md:text-base text-slate-900">
              <span className="inline-flex items-center gap-2">
                <span className="relative size-7 overflow-hidden rounded-full bg-slate-100">
                  <Image src={post.author.avatar} alt="" fill sizes="28px" className="object-contain p-1" />
                </span>
                {post.author.name}
              </span>
              <time dateTime={post.date}>{date}</time>
              <span aria-hidden>·</span>
              <span>{t.pages.blog.readingTime.replace("{n}", String(minutes))}</span>
              {updated ? (
                <span className="hidden sm:inline">
                  {t.pages.blog.updated} <time dateTime={post.updated}>{updated}</time>
                </span>
              ) : null}
            </div>
            {post.tags?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.pages.blog.topics}>
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-900">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-12 md:mt-16 flex flex-col gap-10 md:gap-14 max-w-[72ch]">
              {copy.sections.map((section) => (
                <section key={section.heading} id={headingId(section.heading)} className="scroll-mt-28">
                  <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{section.heading}</h2>
                  <div className="mt-4 flex flex-col gap-5">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-slate-900 text-lg md:text-xl leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
              {related ? (
                <Link
                  href={href(locale, paths.caseStudy(related.slug))}
                  className="group inline-flex items-center gap-3 self-start rounded-full border border-slate-900 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  {t.pages.blog.relatedCase}: {related.copy[locale].client}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>

          {/* The aside stays in view while the reader scrolls: where they are
              in the post, how to share it, and what to read next. */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-10">
              <nav aria-label={t.pages.blog.toc}>
                <p className="text-xs font-medium text-slate-900">{t.pages.blog.toc}</p>
                <ol className="mt-4 flex flex-col border-l border-slate-200">
                  {copy.sections.map((section) => {
                    const id = headingId(section.heading);
                    const active = id === current;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={cn(
                            "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                            active ? "border-slate-900 text-slate-900 font-medium" : "border-transparent text-slate-900 hover:text-slate-900",
                          )}
                        >
                          {section.heading}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div>
                <p className="text-xs font-medium text-slate-900">{t.pages.blog.share}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm text-slate-700 transition-colors hover:border-slate-900"
                  >
                    {copied ? t.pages.blog.copied : t.pages.blog.copyLink}
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm text-slate-700 transition-colors hover:border-slate-900"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(copy.title)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm text-slate-700 transition-colors hover:border-slate-900"
                  >
                    X
                  </a>
                </div>
              </div>

              {others.length > 0 ? (
                <div>
                  <p className="text-xs font-medium text-slate-900">{t.pages.blog.suggestions}</p>
                  <ul className="mt-4 flex flex-col divide-y divide-slate-100">
                    {others.map((p) => (
                      <li key={p.slug}>
                        <Link href={href(locale, paths.post(p.slug))} className="group flex gap-4 py-4">
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <Image src={p.cover.src} alt="" fill sizes="64px" className="object-cover object-top" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium leading-snug text-slate-900 group-hover:underline line-clamp-2">{p.copy[locale].title}</span>
                            <span className="mt-1 block text-xs text-slate-900">
                              {t.pages.blog.readingTime.replace("{n}", String(readingMinutes(p.copy[locale].sections)))}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>
          </div>

          {others.length > 0 ? (
            <div className="w-full max-w-[1600px] px-5 md:px-12 mt-20 md:mt-28 lg:hidden">
              <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{t.pages.blog.more}</h2>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {others.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="w-full mt-8 md:mt-12">
            <ContactSection />
          </div>
        </article>
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
