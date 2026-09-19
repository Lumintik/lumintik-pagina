"use client";

import { PageShell } from "@/components/sections/PageShell";
import { PostCard } from "@/components/sections/PostCard";
import { useT } from "@/components/providers/LocaleProvider";
import { POSTS } from "@/data/posts";

export function BlogPage() {
  const t = useT();
  return (
    <PageShell eyebrow={t.nav.blog} title={t.pages.blog.title} titleAccent={t.pages.blog.titleAccent} intro={t.pages.blog.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24">
        {POSTS.length === 0 ? (
          <p className="text-slate-500 text-lg">{t.pages.blog.empty}</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
