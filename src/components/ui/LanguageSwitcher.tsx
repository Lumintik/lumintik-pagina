"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_TAGS, fromSegment, toSegment, type Locale } from "@/lib/locale";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SECTION_SEGMENTS } from "@/lib/routes";

type Props = {
  className?: string;
};

/**
 * Swaps the locale segment of the current path, keeping the reader on the same
 * page. These are real links, so crawlers can follow them to the translation.
 */
function swapLocale(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length ? fromSegment(parts[0]) : null;
  if (current) {
    parts[0] = toSegment(target);
    // The section segment is translated too, so the link lands without a redirect.
    const section = Object.values(SECTION_SEGMENTS).find((seg) => seg[current] === parts[1]);
    if (section) parts[1] = section[target];
    return `/${parts.join("/")}`;
  }
  return `/${toSegment(target)}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ className }: Props) {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (
    <ul
      className={`flex items-center gap-1 text-xs font-medium ${className ?? ""}`}
      role="list"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <li key={code}>
            <Link
              href={swapLocale(pathname, code)}
              hrefLang={LOCALE_TAGS[code]}
              aria-current={isActive ? "true" : undefined}
              className={`relative block px-2 py-1 cursor-pointer transition-colors duration-200 ${
                isActive ? "text-slate-900" : "text-slate-900 hover:text-slate-700"
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
