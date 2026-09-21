import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/sections/PostDetail";
import { POSTS, findPost } from "@/data/posts";
import { LOCALES, OG_LOCALES, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { SITE_NAME, SITE_URL, absoluteUrl, localizedAlternates } from "@/lib/seo";
import { messages } from "@/i18n/messages";

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
    keywords: post.tags,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: copy.title,
      description: copy.excerpt,
      url: absoluteUrl(locale, path),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author.name],
      tags: post.tags,
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
  const copy = post.copy[locale];
  const url = absoluteUrl(locale, paths.post(post.slug));
  // Search engines read the article and its place in the site from here.
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: copy.title,
    description: copy.excerpt,
    image: [`${SITE_URL}${post.cover.src}`],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale === "ES" ? "es" : "en",
    keywords: post.tags?.join(", "),
    articleSection: post.tags?.[0],
    author: { "@type": "Organization", name: post.author.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}${post.author.avatar}` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleBody: copy.sections.map((s) => `${s.heading}\n${s.paragraphs.join("\n")}`).join("\n\n"),
  };
  const t = messages[locale];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl(locale, "") },
      { "@type": "ListItem", position: 2, name: t.nav.blog, item: absoluteUrl(locale, paths.blog) },
      { "@type": "ListItem", position: 3, name: copy.title, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PostDetail post={post} others={others} />
    </>
  );
}
