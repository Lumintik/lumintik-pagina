"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MegaMenu, type MenuPanel } from "@/components/sections/MegaMenu";
import { services } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { CASES } from "@/data/cases";
import { POSTS } from "@/data/posts";
import { FaBalanceScale, FaFileAlt, FaGraduationCap, FaNewspaper, FaShieldAlt, FaUsers } from "react-icons/fa";

type NavEntry = { key: string; label: string; href: string; panel?: MenuPanel };

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [darkText, setDarkText] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  // The bar gets out of the way while you read down the page and comes back
  // on the first gesture up, which is where a reader looks for it.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { locale, isLoading } = useLocale();
  const t = useT();
  // Every entry is a page of its own, in the language being read.
  const home = `/${toSegment(locale)}`;
  const contactHref = href(locale, paths.contact);
  const navItems: NavEntry[] = [
    { key: "home", label: t.nav.home, href: home },
    {
      key: "services",
      label: t.nav.services,
      href: href(locale, paths.services),
      panel: {
        intro: t.menu.services,
        columns: 4,
        viewAll: { label: t.menu.viewAll, href: href(locale, paths.services) },
        items: services.map((svc) => ({
          key: svc.key,
          label: t.services.items[svc.key].title,
          desc: t.services.items[svc.key].desc,
          href: href(locale, paths.service(svc.slug)),
          image: svc.posterSrc,
        })),
      },
    },
    {
      key: "industries",
      label: t.nav.industries,
      href: href(locale, paths.industries),
      panel: {
        intro: t.menu.industries,
        columns: 4,
        viewAll: { label: t.menu.viewAll, href: href(locale, paths.industries) },
        items: INDUSTRIES.map((ind) => ({
          key: ind.id,
          label: t.industries.items[ind.id].category,
          desc: t.industries.items[ind.id].title,
          href: href(locale, paths.industries),
          image: ind.image,
        })),
      },
    },
    {
      key: "cases",
      label: t.nav.cases,
      href: href(locale, paths.cases),
      panel: {
        intro: t.menu.cases,
        columns: 4,
        viewAll: { label: t.menu.viewAll, href: href(locale, paths.cases) },
        items: CASES.map((c) => {
          const copy = c.copy[locale];
          const cover = c.images[0] ?? c.cardImage;
          return {
            key: c.slug,
            label: copy.client,
            desc: copy.headline ?? copy.solution ?? undefined,
            href: href(locale, paths.caseStudy(c.slug)),
            image: cover?.src,
          };
        }),
      },
    },
    { key: "projects", label: t.nav.work, href: href(locale, paths.projects) },
    {
      key: "company",
      label: t.nav.company,
      href: href(locale, paths.team),
      panel: {
        intro: t.menu.company,
        columns: 4,
        viewAll: { label: t.nav.team, href: href(locale, paths.team) },
        items: [
          { key: "team", label: t.nav.team, desc: t.menu.items.team, href: href(locale, paths.team), icon: <FaUsers /> },
          { key: "governance", label: t.nav.governance, desc: t.menu.items.governance, href: href(locale, paths.governance), icon: <FaBalanceScale /> },
          { key: "companyData", label: t.nav.companyData, desc: t.menu.items.companyData, href: href(locale, paths.governance, "datos"), icon: <FaFileAlt /> },
          { key: "ethics", label: t.nav.ethics, desc: t.menu.items.ethics, href: href(locale, paths.ethics), icon: <FaShieldAlt /> },
        ],
      },
    },
    {
      key: "resources",
      label: t.nav.resources,
      href: href(locale, paths.blog),
      panel: {
        intro: t.menu.resources,
        columns: 4,
        viewAll: { label: t.nav.blog, href: href(locale, paths.blog) },
        items: [
          { key: "blog", label: t.nav.blog, desc: t.menu.items.blog, href: href(locale, paths.blog), image: POSTS[0]?.cover.src },
          { key: "news", label: t.nav.news, desc: t.menu.items.news, href: href(locale, paths.news), icon: <FaNewspaper /> },
          { key: "education", label: t.nav.education, desc: t.menu.items.education, href: href(locale, paths.education), icon: <FaGraduationCap /> },
        ],
      },
    },
  ];

  const [panelKey, setPanelKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A panel opens on hover only after the cursor has rested on the entry:
  // crossing the bar on the way somewhere else should not unfold anything.
  // 450 ms is the window Baymard and NN/g land on, long enough to filter a
  // passing cursor and short enough that someone aiming at the menu does not
  // think it is broken. Keyboard focus and clicks open it at once.
  const HOVER_OPEN_MS = 450;
  const openPanel = (key: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    setPanelKey(key);
  };
  const openPanelAfterHover = (key: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    // Once a panel is open, moving to a sibling entry switches it at once.
    if (panelKey || !key) return setPanelKey(key);
    openTimer.current = setTimeout(() => setPanelKey(key), HOVER_OPEN_MS);
  };
  const closePanelSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setPanelKey(null), 120);
  };
  const activePanel = navItems.find((n) => n.key === panelKey)?.panel ?? null;

  // The mobile menu lists every entry, with a panel's cards nested under it.
  const mobileNavItems = [
    ...navItems.map((n) => ({ label: n.label, href: n.href, children: n.panel?.items.filter((i) => !i.image || n.key === "company" || n.key === "resources").map((i) => ({ label: i.label, href: i.href })) })),
    { label: t.nav.contact, href: contactHref },
  ];

  // Close the panel with Escape.
  useEffect(() => {
    if (!panelKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelKey]);


  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    const onScroll = () => {
      const riseEl = document.getElementById("content-rise");
      if (riseEl) {
        const top = riseEl.getBoundingClientRect().top;
        // The hero scrolls away like any section: the bar turns light with
        // dark text as soon as the white content reaches it.
        setDarkText(top < 80);
        setBgVisible(top < 80);
      } else {
        setDarkText(window.scrollY > 12);
        setBgVisible(window.scrollY > 12);
      }
      // Going down it takes a little travel to leave, so a wobble never hides
      // it. Going up it comes back at once.
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;
      if (y < 140) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -4) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The bar reads dark on white while a panel is open, whatever the scroll.
  const scrolled = darkText || panelKey !== null;
  // It never leaves while a menu is open: that would take the menu with it.
  const away = hidden && panelKey === null && !menuOpen;

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
        onMouseLeave={closePanelSoon}
        /* Focus reaching a hidden bar brings it back: otherwise the keyboard
           lands on a link nobody can see. */
        onFocusCapture={() => setHidden(false)}
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          panelKey ? "bg-white" : bgVisible ? "bg-white/70 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: !mounted ? "translateY(-24px)" : away ? "translateY(-110%)" : "translateY(0)",
          transition: mounted
            ? "transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.4s, background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s"
            : "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <div className="mx-auto flex items-center justify-between max-w-[1600px] w-full pl-10 pr-6 md:pl-20 md:pr-12 min-[1400px]:pl-12 min-[1400px]:pr-8 py-3 md:py-3">
          <a
            href={home}
            aria-label="Lumintik, home"
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
                src={scrolled ? "/lumintik-logo-black.png" : "/lumintik-logo-white.png"}
                alt="Lumintik"
                fill
                priority
                sizes="(max-width: 768px) 140px, 180px"
                className="object-contain object-left"
                draggable={false}
              />
            </span>
          </a>

          <nav className="hidden min-[1400px]:flex items-center gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onMouseEnter={() => openPanelAfterHover(item.panel ? item.key : null)}
                onFocus={() => openPanel(item.panel ? item.key : null)}
                onClick={(e) => {
                  if (item.panel && panelKey !== item.key) {
                    e.preventDefault();
                    openPanel(item.key);
                  }
                }}
                aria-haspopup={item.panel ? "true" : undefined}
                aria-expanded={item.panel ? panelKey === item.key : undefined}
                className={`relative inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors duration-300 ${
                  panelKey === item.key
                    ? "bg-slate-100 text-slate-900"
                    : scrolled
                      ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                      : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                {item.panel ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`transition-transform duration-300 ${panelKey === item.key ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                ) : null}
              </a>
            ))}

            <a
              href={contactHref}
              onMouseEnter={() => openPanel(null)}
              className={`ml-3 inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${
                scrolled
                  ? "bg-slate-900 text-white hover:bg-slate-700"
                  : "bg-white text-slate-900 hover:bg-slate-200"
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
                scrolled ? "text-slate-700" : "text-white"
              }`}
            >
              <LanguageSwitcher />
            </span>
          </nav>

          <button
            ref={toggleRef}
            aria-label={menuOpen ? t.mobileMenu.close : t.mobileMenu.open}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`min-[1400px]:hidden relative inline-flex items-center justify-center w-12 h-12 rounded-full z-[110] transition-colors duration-300 ${
              scrolled ? "bg-transparent text-slate-900" : "bg-transparent text-white"
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

        {/* The dropdown lives inside the bar so the pointer can travel into it */}
        {activePanel ? (
          <div onMouseEnter={() => openPanel(panelKey)} className="hidden min-[1400px]:block">
            <MegaMenu panel={activePanel} open={panelKey !== null} onNavigate={() => setPanelKey(null)} />
          </div>
        ) : null}
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={mobileNavItems}
        contactHref={contactHref}
        startLabel={t.mobileMenu.startProject}
        closeLabel={t.mobileMenu.close}
        triggerRef={toggleRef}
      />
    </>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  items: { label: string; href: string; children?: { label: string; href: string }[] }[];
  contactHref: string;
  startLabel: string;
  closeLabel: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

function MobileMenu({ open, onClose, items, contactHref, startLabel, closeLabel, triggerRef }: MobileMenuProps) {
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
      aria-label={closeLabel}
      aria-hidden={!open}
      inert={!open}
      onKeyDown={trapFocus}
      className="min-[1400px]:hidden fixed inset-0 z-[100]"
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
              src="/lumintik-logo-black.png"
              alt="Lumintik"
              fill
              sizes="173px"
              className="object-contain object-left"
              draggable={false}
            />
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto flex flex-col justify-start px-8 py-4 gap-1">
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 50}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 50}ms`,
              }}
            >
              <a href={item.href} onClick={onClose} className="group flex items-center justify-between py-3">
                <span className="text-slate-900 text-3xl font-semibold tracking-tight">{item.label}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 group-hover:text-slate-500 transition-colors" aria-hidden>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              {item.children?.length ? (
                <ul className="mb-2 flex flex-wrap gap-x-5 gap-y-1 pl-1">
                  {item.children.map((c) => (
                    <li key={c.href + c.label}>
                      <a href={c.href} onClick={onClose} className="text-slate-900 text-base hover:text-slate-900">
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
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
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-slate-900 text-white text-base font-medium hover:bg-slate-700 transition-colors duration-300"
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
