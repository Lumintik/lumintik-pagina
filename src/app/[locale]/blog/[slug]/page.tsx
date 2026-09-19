import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/sections/PostDetail";
import { POSTS, findPost } from "@/data/posts";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => POSTS.map((p) => ({ locale: toSegment(locale), slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const post = findPost(slug);
  if (!locale || !post) return {};

  const copy = post.copy[locale];
  const path = paths.post(post.slug);

  return {
    title: copy.title,
    description: copy.excerpt,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: copy.title,
      description: copy.excerpt,
      url: absoluteUrl(locale, path),
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt[locale] }],
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: segment, slug } = await params;
  const locale = fromSegment(segment);
  const post = findPost(slug);
  if (!locale || !post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return <PostDetail post={post} others={others} />;
}
