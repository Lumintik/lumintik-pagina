"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { PostCard } from "@/components/sections/PostCard";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import type { Post } from "@/data/posts";
import { LOCALE_TAGS } from "@/lib/locale";
import { href, paths } from "@/lib/routes";

/** One post: the cover, the title, who wrote it and when, then the sections. */
export function PostDetail({ post, others }: { post: Post; others: Post[] }) {
  const t = useT();
  const { locale } = useLocale();
  const copy = post.copy[locale];
  const date = new Intl.DateTimeFormat(LOCALE_TAGS[locale], { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${post.date}T12:00:00Z`),
  );

  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        {/* A short dark opening so the bar reads on it; the article is on white. */}
        <div className="w-full h-24 md:h-28" style={{ background: "linear-gradient(180deg, #000000 0%, #0f172a 100%)" }} />

        <article className="relative z-[2] w-full bg-white flex flex-col items-center">
          <div className="w-full max-w-[1100px] px-5 md:px-12 pt-10 md:pt-16">
            <Link href={href(locale, paths.blog)} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {t.pages.blog.back}
            </Link>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100">
              <Image
                src={post.cover.src}
                alt={post.cover.alt[locale]}
                fill
                priority
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="object-cover object-top"
              />
            </div>

            <h1 className="mt-10 text-slate-900 text-3xl md:text-5xl font-semibold leading-[1.1] text-balance">{copy.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-sm md:text-base text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="relative size-7 overflow-hidden rounded-full bg-slate-100">
                  <Image src={post.author.avatar} alt="" fill sizes="28px" className="object-contain p-1" />
                </span>
                {post.author.name}
              </span>
              <time dateTime={post.date}>{date}</time>
            </div>

            <div className="mt-12 md:mt-16 flex flex-col gap-10 md:gap-14 max-w-[72ch]">
              {copy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-slate-900 text-2xl md:text-3xl font-semibold">{section.heading}</h2>
                  <div className="mt-4 flex flex-col gap-5">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {others.length > 0 ? (
            <div className="w-full max-w-[1600px] px-5 md:px-12 mt-20 md:mt-28">
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
