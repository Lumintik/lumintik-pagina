"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type MenuCard = {
  key: string;
  label: string;
  desc?: string;
  href: string;
  /** With an image the card shows it on top; otherwise a dark tile with the icon. */
  image?: string;
  icon?: ReactNode;
  /** External images (Cloudinary, Pexels) are allowed in next.config. */
};

export type MenuPanel = {
  intro: string;
  items: MenuCard[];
  viewAll: { label: string; href: string };
  /** Cards per row on wide screens. */
  columns: 3 | 4;
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** The full-width panel under a header entry: a line, the cards, a link to the whole section. */
export function MegaMenu({ panel, open, onNavigate }: { panel: MenuPanel; open: boolean; onNavigate: () => void }) {
  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className="absolute left-0 right-0 top-full bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35)]"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 220ms cubic-bezier(0.22,1,0.36,1), transform 220ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="mx-auto max-w-[1600px] px-12 py-8">
        <div className="flex items-end justify-between gap-6">
          <p className="text-slate-500 text-sm max-w-[60ch]">{panel.intro}</p>
          <Link
            href={panel.viewAll.href}
            onClick={onNavigate}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-900 px-4 py-2 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
          >
            {panel.viewAll.label}
            <Arrow />
          </Link>
        </div>
        <ul className={`mt-6 grid gap-4 ${panel.columns === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
          {panel.items.map((item) => (
            <li key={item.key}>
              <Link href={item.href} onClick={onNavigate} className="group block rounded-2xl p-2 transition-colors hover:bg-slate-50">
                {item.image ? (
                  <span className="relative block aspect-[2/1] w-full overflow-hidden rounded-xl bg-slate-900">
                    <Image src={item.image} alt="" fill sizes="320px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                  </span>
                ) : (
                  <span className="flex aspect-[2/1] w-full items-center justify-center rounded-xl bg-slate-950 text-white text-3xl transition-colors group-hover:bg-slate-800">
                    {item.icon}
                  </span>
                )}
                <span className="mt-3 flex items-center justify-between gap-2 px-1">
                  <span className="text-slate-900 text-sm font-semibold leading-snug">{item.label}</span>
                  <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-slate-900">
                    <Arrow />
                  </span>
                </span>
                {item.desc ? <span className="mt-1 block px-1 text-slate-500 text-xs leading-relaxed line-clamp-2">{item.desc}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
