import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import "../globals.css";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { site } from "@/i18n/site";
import { LOCALES, LOCALE_TAGS, fromSegment, toSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import {
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
  pageMetadata,
} from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

  const t = site[locale].meta.home;

  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({ locale, path: paths.home, title: t.title, description: t.description }),
    // Pages set their own title; the template adds the brand after it.
    title: { default: t.title, template: `%s · ${SITE_NAME}` },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
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
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: segment } = await params;
  const locale = fromSegment(segment);
  if (!locale) notFound();

  const t = site[locale];

  const jsonLd = [
    organizationJsonLd(t.meta.home.description),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl(locale),
      inLanguage: LOCALE_TAGS[locale],
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];

  return (
    <html lang={LOCALE_TAGS[locale]} className={poppins.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <PostHogProvider locale={locale} />
        <Navbar locale={locale} nav={t.nav} a11y={t.a11y} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
