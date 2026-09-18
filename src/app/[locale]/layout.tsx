import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import "../globals.css";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { Splash } from "@/components/effects/Splash";
import { messages } from "@/i18n/messages";
import {
  LOCALES,
  LOCALE_TAGS,
  OG_LOCALES,
  fromSegment,
  toSegment,
} from "@/lib/locale";
import { SITE_NAME, SITE_URL, absoluteUrl, localizedAlternates } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: toSegment(l) }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = fromSegment(segment);
  if (!locale) return {};

  const t = messages[locale];
  const other = LOCALES.filter((l) => l !== locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.seo.home.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: t.seo.home.description,
    applicationName: SITE_NAME,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: [
      "Lumintik",
      "Lumintik SAS",
      "software studio",
      "software engineering",
      "headless commerce",
      "applied AI",
      "Next.js studio",
      "design engineering",
      "web performance",
      "Samsung Imagiq",
      "Claro",
      "EZDocuAI",
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    alternates: localizedAlternates(locale),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: absoluteUrl(locale),
      locale: OG_LOCALES[locale],
      alternateLocale: other.map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.home.title,
      description: t.seo.home.description,
      creator: "@lumintik",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: SITE_NAME,
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: SITE_NAME,
  alternateName: "Lumintik",
  url: SITE_URL,
  logo: `${SITE_URL}/lumintik-logo.png`,
  image: `${SITE_URL}/lumintik-icon.png`,
  email: "andrey@lumintik.com",
  sameAs: ["https://github.com/ANDREYPLAZAST"],
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: segment } = await params;
  const locale = fromSegment(segment);
  if (!locale) notFound();

  const t = messages[locale];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(locale),
    inLanguage: LOCALE_TAGS[locale],
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <html lang={LOCALE_TAGS[locale]} className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="" />
        <link
          rel="preload"
          as="fetch"
          href="https://prod.spline.design/Hic65A1wo9S7zyNu/scene.splinecode?v=7"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...ORGANIZATION_JSONLD,
              description: t.seo.home.description,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <LocaleProvider locale={locale}>
          <PostHogProvider locale={locale} />
          <Splash />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
