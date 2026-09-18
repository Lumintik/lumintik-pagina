"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowRight } from "@/components/ui/primitives";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import type { Site } from "@/i18n/site";

type Props = {
  locale: Locale;
  nav: Site["nav"];
  a11y: Site["a11y"];
};

/**
 * Always dark, so the logo is always the white version and the bar reads the
 * same over every section it scrolls past.
 */
export function Navbar({ locale, nav, a11y }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: nav.cases, href: href(locale, paths.home, "cases") },
    { label: nav.services, href: href(locale, paths.home, "services") },
    { label: nav.government, href: href(locale, paths.government) },
    { label: nav.contact, href: href(locale, paths.home, "contact") },
  ];
  const contactHref = href(locale, paths.home, "contact");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  // Keep Tab inside the open menu.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>("a[href],button");
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header data-tone="dark" className="fixed inset-x-0 top-0 z-50 print:hidden bg-[#0A0A0A]/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        {a11y.skip}
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:h-20 md:px-10 min-[1280px]:px-0">
        <Link href={href(locale, paths.home)} aria-label={a11y.home} className="inline-flex items-center">
          <Logo tone="dark" priority className="h-7 md:h-8" />
        </Link>

        <nav aria-label={a11y.mainNav} className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[15px] font-medium text-white hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <TrackedLink
            href={contactHref}
            event="start_project_clicked"
            properties={{ location: "navbar" }}
            className="btn btn-primary ml-2 min-h-10 px-5 py-2 text-[15px]"
          >
            {nav.startProject}
            <ArrowRight />
          </TrackedLink>
          <div className="ml-3">
            <LanguageSwitcher locale={locale} label={a11y.language} />
          </div>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.menuClose : a11y.menuOpen}
          onClick={() => setOpen((v) => !v)}
          className="relative flex size-12 items-center justify-center rounded-full text-white lg:hidden"
        >
          <span aria-hidden className="absolute h-px w-5 bg-current transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }} />
          <span aria-hidden className="absolute h-px w-5 bg-current transition-transform duration-300" style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }} />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={a11y.menu}
        hidden={!open}
        onKeyDown={trapFocus}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[#0A0A0A] px-5 pb-10 pt-6 lg:hidden"
      >
        <nav aria-label={a11y.mainNav} className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="heading py-3 text-4xl text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 flex flex-col items-start gap-6">
          <TrackedLink
            href={contactHref}
            event="start_project_clicked"
            properties={{ location: "mobile_menu" }}
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full"
          >
            {nav.startProject}
            <ArrowRight />
          </TrackedLink>
          <LanguageSwitcher locale={locale} label={a11y.language} />
        </div>
      </div>
    </header>
  );
}
