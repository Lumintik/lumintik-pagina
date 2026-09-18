"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_TAGS, fromSegment, toSegment } from "@/lib/locale";
import { useLocale } from "@/components/providers/LocaleProvider";

type Props = {
  className?: string;
};

/**
 * Swaps the locale segment of the current path, keeping the reader on the same
 * page. These are real links, so crawlers can follow them to the translation.
 */
function swapLocale(pathname: string, target: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && fromSegment(parts[0])) {
    parts[0] = target;
    return `/${parts.join("/")}`;
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ className }: Props) {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (
    <ul
      className={`flex items-center gap-1 text-[11px] font-medium tracking-[0.18em] uppercase ${className ?? ""}`}
      role="list"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <li key={code}>
            <Link
              href={swapLocale(pathname, toSegment(code))}
              hrefLang={LOCALE_TAGS[code]}
              aria-current={isActive ? "true" : undefined}
              className={`relative block px-2 py-1 cursor-pointer transition-colors duration-200 ${
                isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span className={isActive ? "line-through decoration-1 underline-offset-2" : ""}>
                {code}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
