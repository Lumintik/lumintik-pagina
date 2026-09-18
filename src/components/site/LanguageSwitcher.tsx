"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_TAGS, writeStoredLocale, type Locale } from "@/lib/locale";
import { translatePath } from "@/lib/routes";

/**
 * Links to the same page in the other language. Real links, so crawlers can
 * follow them to the translation.
 */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";

  return (
    <ul className="flex items-center gap-1 text-sm font-medium" aria-label={label}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <li key={code}>
            <Link
              href={translatePath(pathname, code)}
              hrefLang={LOCALE_TAGS[code]}
              lang={LOCALE_TAGS[code]}
              aria-current={active ? "true" : undefined}
              onClick={() => writeStoredLocale(code)}
              className={
                active
                  ? "flex size-10 items-center justify-center rounded-full bg-white text-black"
                  : "flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              }
            >
              {code}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
