"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [darkText, setDarkText] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { locale, isLoading } = useLocale();
  const t = useT();
  // Anchors are written absolute (/en#work) so they also resolve from a case
  // study or service page, where those sections don't exist in the document.
  const home = `/${toSegment(locale)}`;
  const navItems = [
    { label: t.nav.home, href: `${home}#hero` },
    { label: t.nav.services, href: `${home}#services` },
    { label: t.nav.work, href: `${home}#work` },
  ];

  const mobileNavItems = [
    ...navItems,
    { label: t.nav.contact, href: `${home}#contact` },
  ];

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    const el = id ? document.getElementById(id) : null;
    if (el) {
      // Same page: scroll instead of navigating.
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "hero" && window.location.pathname === home) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Otherwise let the browser follow the link back to the home page.
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    // Cache vh to avoid mobile URL-bar toggle from oscillating the threshold.
    let cachedVh = window.innerHeight || 1;
    const refreshVh = () => {
      cachedVh = window.innerHeight || 1;
      onScroll();
    };
    const onScroll = () => {
      const riseEl = document.getElementById("content-rise");
      const vh = cachedVh;
      if (riseEl) {
        const top = riseEl.getBoundingClientRect().top;
        // Text switches to dark when hero reaches its final light state.
        setDarkText(top < vh * 2.3);
        // Background only appears once we leave the hero entirely.
        setBgVisible(top <= 0);
      } else {
        setDarkText(window.scrollY > 12);
        setBgVisible(window.scrollY > 12);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("orientationchange", refreshVh);
    onScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("orientationchange", refreshVh);
    };
  }, []);

  const scrolled = darkText;

  // Lock body scroll when menu is open and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          bgVisible
            ? "bg-white/70 backdrop-blur-md border-b border-slate-200/60"
            : "bg-transparent"
        }`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-24px)",
          transition:
            "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <div className="mx-auto flex items-center justify-between max-w-[1600px] w-full pl-10 pr-6 md:pl-20 md:pr-12 py-3 md:py-3">
          <a
            href={home}
            aria-label="Lumintik — home"
            className="inline-flex items-center select-none"
          >
            <span
              id="navbar-logo"
              className="relative block w-[140px] h-[40px] md:w-[180px] md:h-[50px]"
              style={{
                opacity: isLoading ? 0 : 1,
                transition: "opacity 250ms cubic-bezier(0.16,1,0.3,1) 550ms",
              }}
            >
              <Image
                src="/lumintik-logo.png"
                alt="Lumintik"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 140px, 180px"
                className="object-contain object-left"
                draggable={false}
              />
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => smoothScroll(e, item.href)}
                className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href={`${home}#contact`}
              onClick={(e) => smoothScroll(e, `${home}#contact`)}
              className={`ml-1 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "bg-slate-900 text-white hover:bg-blue-500"
                  : "bg-white text-slate-900 hover:bg-blue-300"
              }`}
            >
              {t.nav.contact}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <span
              className={`ml-3 inline-flex transition-colors duration-300 ${
                scrolled ? "text-slate-700" : "text-white/80"
              }`}
            >
              <LanguageSwitcher />
            </span>
          </nav>

          <button
            ref={toggleRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden relative inline-flex items-center justify-center w-12 h-12 rounded-full z-[110] transition-colors duration-300 ${
              scrolled ? "bg-transparent text-blue-500" : "bg-transparent text-white"
            }`}
          >
            <span
              className="absolute block w-5 h-px bg-current"
              style={{
                transform: menuOpen ? "rotate(45deg)" : "translateY(-5px)",
                transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              className="absolute block w-5 h-px bg-current"
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 200ms ease",
              }}
            />
            <span
              className="absolute block w-5 h-px bg-current"
              style={{
                transform: menuOpen ? "rotate(-45deg)" : "translateY(5px)",
                transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={mobileNavItems}
        contactHref={`${home}#contact`}
        startLabel={t.mobileMenu.startProject}
        smoothScroll={smoothScroll}
        triggerRef={toggleRef}
      />
    </>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  items: { label: string; href: string }[];
  contactHref: string;
  startLabel: string;
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

function MobileMenu({ open, onClose, items, contactHref, startLabel, smoothScroll, triggerRef }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  // Move focus into the dialog on open, and restore it to the toggle on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  // Keep Tab focus cycling inside the open dialog.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !asideRef.current) return;
    const focusables = asideRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      onKeyDown={trapFocus}
      className="md:hidden fixed inset-0 z-[100]"
      style={{
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <aside
        ref={asideRef}
        className="absolute top-0 right-0 h-full w-full bg-white flex flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: open ? "-20px 0 60px rgba(15,23,42,0.12)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <span className="relative block w-[173px] h-[48px]">
            <Image
              src="/lumintik-logo.png"
              alt="Lumintik"
              fill
              unoptimized
              sizes="173px"
              className="object-contain object-left"
              draggable={false}
            />
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close menu"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {items.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { smoothScroll(e, item.href); onClose(); }}
              className="group flex items-center justify-between py-4 border-b border-slate-100"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 60}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 60}ms`,
              }}
            >
              <span className="text-slate-900 text-4xl font-semibold tracking-tight">
                {item.label}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-blue-500 transition-colors" aria-hidden>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </nav>

        <div
          className="px-8 pb-8 pt-4 flex flex-col gap-5"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${200 + items.length * 60 + 80}ms`,
          }}
        >
          <a
            href={contactHref}
            onClick={(e) => { smoothScroll(e, contactHref); onClose(); }}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-slate-900 text-white text-base font-medium hover:bg-blue-500 transition-colors duration-300"
          >
            {startLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <div className="flex items-center justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </aside>
    </div>
  );
}
