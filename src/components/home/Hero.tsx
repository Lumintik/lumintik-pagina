import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowRight } from "@/components/ui/primitives";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

/**
 * Plain server rendered text: the title is the largest element on the page,
 * so it is also the LCP, and nothing waits on JavaScript to show it.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = site[locale].hero;
  return (
    <section
      data-tone="dark"
      aria-labelledby="hero-title"
      className="flex min-h-[92svh] w-full items-end px-5 pb-20 pt-36 md:px-10 md:pb-28"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="pill">{t.pill}</p>
        <h1
          id="hero-title"
          className="display mt-8 max-w-[14ch] text-[44px] sm:text-6xl md:text-7xl lg:text-[96px]"
        >
          {t.title}
        </h1>
        <p className="mt-8 max-w-[44ch] text-lg leading-relaxed md:text-2xl md:leading-relaxed">
          {t.subtitle}
        </p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href={href(locale, paths.home, "contact")}
            event="start_project_clicked"
            properties={{ location: "hero" }}
            className="btn btn-primary"
          >
            {t.primary}
            <ArrowRight />
          </TrackedLink>
          <Link href={href(locale, paths.home, "cases")} className="btn btn-secondary">
            {t.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
