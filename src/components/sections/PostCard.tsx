"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/posts";
import { useLocale } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";

/** A post in the blog grid: the cover, the author, the title and the excerpt. */
export function PostCard({ post }: { post: Post }) {
  const { locale } = useLocale();
  const copy = post.copy[locale];

  return (
    <Link
      href={href(locale, paths.post(post.slug))}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={post.cover.src}
          alt={post.cover.alt[locale]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <span className="inline-flex items-center gap-2 text-sm text-slate-500">
          <span className="relative size-6 overflow-hidden rounded-full bg-slate-100">
            <Image src={post.author.avatar} alt="" fill sizes="24px" className="object-contain p-1" />
          </span>
          {post.author.name}
        </span>
        <h2 className="text-slate-900 text-xl md:text-2xl font-semibold leading-snug text-balance">{copy.title}</h2>
        <p className="text-slate-500 text-base leading-relaxed line-clamp-3">{copy.excerpt}</p>
      </div>
    </Link>
  );
}
