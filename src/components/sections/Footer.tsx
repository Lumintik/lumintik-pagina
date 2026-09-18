"use client";

import { useEffect, useState } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { toSegment } from "@/lib/locale";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/ANDREYPLAZAST" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: "mailto:hello@lumintik.com" },
] as const;

export function Footer() {
  const t = useT();
  const { locale } = useLocale();
  const [shift, setShift] = useState(0);

  // Absolute so the links also work from a case study or service page.
  const home = `/${toSegment(locale)}`;

  const footerLinks = [
    { label: t.nav.work, href: `${home}#work` },
    { label: t.nav.services, href: `${home}#services` },
    { label: t.nav.about, href: `${home}#about` },
    { label: t.nav.contact, href: `${home}#contact` },
  ];

  // Track scroll within the footer wrapper to invert text colors.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const wrap = document.getElementById("footer-wrap");
      const vh = window.innerHeight || 1;
      if (wrap) {
        const rect = wrap.getBoundingClientRect();
        const start = vh * 0.8;
        const end = -vh * 0.4;
        const raw = (start - rect.top) / (start - end);
        setShift(Math.max(0, Math.min(1, raw)));
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lerp = (a: number[], b: number[], t: number) =>
    a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb = (c: number[]) => `rgb(${c.join(",")})`;
  const titleColor = rgb(lerp([15, 23, 42], [255, 255, 255], shift));
  const accentColor = rgb(lerp([59, 130, 246], [147, 197, 253], shift));
  const tagColor = rgb(lerp([71, 85, 105], [203, 213, 225], shift));
  const labelColor = rgb(lerp([100, 116, 139], [148, 163, 184], shift));
  const linkColor = rgb(lerp([51, 65, 85], [203, 213, 225], shift));
  const lineColor = `rgba(${shift > 0.5 ? "255,255,255" : "15,23,42"},0.12)`;
  const btnBg = rgb(lerp([15, 23, 42], [255, 255, 255], shift));
  const btnText = rgb(lerp([255, 255, 255], [15, 23, 42], shift));

  return (
    <footer
      id="footer"
      className="relative w-full z-[2] overflow-hidden flex-1 flex flex-col justify-end md:justify-start xl:justify-end"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-6 md:px-12 pt-32 pb-20 md:py-20 lg:py-24 xl:pt-44 xl:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ color: titleColor, transition: "color 0.4s ease" }}
            >
              {t.footer.cta.lead}{" "}
              <span
                className="italic"
                style={{ color: accentColor, transition: "color 0.4s ease" }}
              >
                {t.footer.cta.accent}
              </span>
            </h3>
            <p
              className="mt-4 text-base max-w-md"
              style={{ color: tagColor, transition: "color 0.4s ease" }}
            >
              {t.footer.tagline}
            </p>
            <a
              href={`${home}#contact`}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
              style={{
                backgroundColor: btnBg,
                color: btnText,
              }}
            >
              {t.hero.startProject}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-3 md:mt-0 md:contents">
            <nav aria-label="Footer navigation">
              <h4
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: labelColor, transition: "color 0.4s ease" }}
              >
                {t.footer.sitemap}
              </h4>
              <ul className="mt-6 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base transition-colors hover:opacity-70"
                      style={{ color: linkColor }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <h4
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: labelColor, transition: "color 0.4s ease" }}
              >
                {t.footer.elsewhere}
              </h4>
              <ul className="mt-6 flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-base transition-colors hover:opacity-70"
                      style={{ color: linkColor }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div
          className="mt-24 md:mt-32 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: lineColor, transition: "border-color 0.4s ease" }}
        >
          <p
            className="text-xs tracking-[0.18em] uppercase"
            style={{ color: labelColor, transition: "color 0.4s ease" }}
          >
            {t.footer.line}
          </p>
          {t.footer.rights ? (
            <p
              className="text-xs"
              style={{ color: labelColor, transition: "color 0.4s ease" }}
            >
              {t.footer.rights}
            </p>
          ) : null}
        </div>

        <div className="mt-10 md:mt-24 lg:mt-28">
          <p
            className="text-center uppercase font-extrabold tracking-tight leading-none text-[56px] md:text-[120px] lg:text-[160px]"
            style={{ color: `rgba(${shift > 0.5 ? "255,255,255" : "15,23,42"},0.18)` }}
          >
            LUMINTIK
          </p>
        </div>
      </div>
    </footer>
  );
}
