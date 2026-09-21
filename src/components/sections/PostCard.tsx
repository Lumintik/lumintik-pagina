"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/posts";
import { useLocale } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { CASES } from "@/data/cases";
import { IphoneFrame, MacWindowFrame } from "@/components/ui/DeviceFrames";

/** The address Safari shows over a cover: the related client's site, or ours. */
export function coverAddress(post: Post): string {
  const site = post.relatedCase ? CASES.find((c) => c.slug === post.relatedCase)?.links[0]?.href : undefined;
  return (site ?? "https://www.lumintik.com").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * A post in the blog grid: the cover in a device frame, the author, the title
 * and the excerpt. The cover keeps its own aspect ratio and is never cropped:
 * a landscape capture sits in a macOS window, a portrait one in a phone.
 */
export function PostCard({ post, dark }: { post: Post; dark?: boolean }) {
  const { locale } = useLocale();
  const copy = post.copy[locale];
  const portrait = post.cover.height > post.cover.width;
  const coverUrl = coverAddress(post);
  const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  return (
    <Link
      href={href(locale, paths.post(post.slug))}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border transition-transform duration-500 hover:-translate-y-1",
        dark ? "border-white/10 bg-[#0d0d10]" : "border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]",
      )}
    >
      <div className={cn("relative flex aspect-[16/10] w-full items-end justify-center overflow-hidden px-6 pt-6", dark ? "bg-[#151519]" : "bg-slate-100")}>
        {portrait ? (
          <IphoneFrame className="h-full w-auto" aspect={`${post.cover.width} / ${post.cover.height}`}>
            <Image src={post.cover.src} alt={post.cover.alt[locale]} fill sizes="200px" className="object-contain" />
          </IphoneFrame>
        ) : (
          <MacWindowFrame dark url={coverUrl} title={post.cover.alt[locale]} className="w-full rounded-b-none md:rounded-b-none">
            <div className="relative w-full" style={{ aspectRatio: `${post.cover.width} / ${post.cover.height}` }}>
              <Image src={post.cover.src} alt={post.cover.alt[locale]} fill sizes={sizes} className="object-contain" />
            </div>
          </MacWindowFrame>
        )}
      </div>
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <span className={cn("inline-flex items-center gap-2 text-sm", dark ? "text-slate-400" : "text-slate-500")}>
          <span className={cn("relative size-6 overflow-hidden rounded-full", dark ? "bg-white/10" : "bg-slate-100")}>
            <Image src={post.author.avatar} alt="" fill sizes="24px" className="object-contain p-1" />
          </span>
          {post.author.name}
        </span>
        <h2 className={cn("text-xl md:text-2xl font-semibold leading-snug text-balance", dark ? "text-white" : "text-slate-900")}>{copy.title}</h2>
        <p className={cn("text-base leading-relaxed line-clamp-3", dark ? "text-slate-400" : "text-slate-500")}>{copy.excerpt}</p>
      </div>
    </Link>
  );
}
