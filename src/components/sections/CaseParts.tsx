"use client";

import Image from "next/image";
import { IphoneFrame, MacbookFrame, MacWindowFrame } from "@/components/ui/DeviceFrames";
import { cn } from "@/lib/cn";
import type { CaseImage, CaseStudy } from "@/data/cases";
import { TOOLS, toolName, type ToolId } from "@/data/tools";
import { useLocale, useT } from "@/components/providers/LocaleProvider";

/** "Cómo lo resolvimos con X", from the case's client name. */
export function useCaseTitle(study: CaseStudy) {
  const t = useT();
  const { locale } = useLocale();
  return t.cases.caseTitle.replace("{client}", study.copy[locale].client);
}

/** A fact the team has not confirmed yet. */
export function Pending() {
  return (
    <span className="inline-block rounded border border-dashed border-slate-400 px-1.5 text-slate-500">
      [dato pendiente]
    </span>
  );
}

/** Small blue label above a title, the way the rest of the site writes them. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium text-slate-500", className)}>
      {children}
    </p>
  );
}

/** A tool, in a light pill with its own logo in its own colours. */
export function ToolPill({ id }: { id: ToolId }) {
  const { locale } = useLocale();
  const tool = TOOLS[id];
  const name = toolName(tool, locale);
  const { logo } = tool;
  return (
    <li className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700">
      {logo.kind === "icon" && <logo.icon aria-hidden className="size-4 shrink-0" style={{ color: logo.color }} />}
      {logo.kind === "glyph" && <span className="size-4 shrink-0 text-slate-700">{logo.node}</span>}
      {logo.kind === "image" && (
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="size-4 shrink-0 object-contain" />
      )}
      {logo.kind === "wordmark" ? (
        <Image src={logo.src} alt={name} width={logo.width} height={logo.height} className="h-3.5 w-auto" />
      ) : (
        <span>{name}</span>
      )}
    </li>
  );
}

export function ToolList({ tools }: { tools: ToolId[] | null }) {
  const t = useT();
  if (!tools) {
    return (
      <p className="text-slate-500">
        <span className="sr-only">{t.cases.tools}: </span>
        <Pending />
      </p>
    );
  }
  return (
    <ul aria-label={t.cases.tools} className="flex flex-wrap gap-2">
      {tools.map((id) => (
        <ToolPill key={id} id={id} />
      ))}
    </ul>
  );
}

/** The three blocks every case has. Missing facts show a pending marker. */
export function CaseBlocks({ study, large }: { study: CaseStudy; large?: boolean }) {
  const t = useT();
  const { locale } = useLocale();
  const copy = study.copy[locale];
  const blocks = [
    { label: t.cases.problem, text: copy.problem },
    { label: t.cases.solution, text: copy.solution },
    { label: t.cases.why, text: copy.why },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
      {blocks.map((b) => (
        <div key={b.label}>
          <h4 className={cn("text-slate-900 font-semibold", large ? "text-xl" : "text-lg")}>{b.label}</h4>
          <p className={cn("mt-2 text-slate-500 leading-relaxed", large ? "text-lg" : "text-base")}>
            {b.text ?? <Pending />}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Project image in the same frame the rest of the site uses for screenshots. */
export function CaseFrame({
  image,
  priority,
  sizes,
  className,
}: {
  image: CaseImage;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const { locale } = useLocale();
  const ratio = image.height / image.width;
  const tall = ratio > 1.4;
  const aspect = `${image.width} / ${image.height}`;
  // The capture keeps its own aspect ratio inside the device and is never
  // cropped: a phone for phone shaped captures, a macOS window for the ones
  // near square (tall dashboards), a laptop for the wide ones.
  if (!tall && ratio > 0.8) {
    return (
      <MacWindowFrame title={image.alt[locale]} className={className}>
        <div className="relative w-full" style={{ aspectRatio: aspect }}>
          <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes={sizes} className="object-contain" />
        </div>
      </MacWindowFrame>
    );
  }
  if (tall) {
    return (
      <div className={cn("flex w-full justify-center", className)}>
        <IphoneFrame className="w-full max-w-[300px]" aspect={aspect}>
          <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes="300px" className="object-contain" />
        </IphoneFrame>
      </div>
    );
  }
  return (
    <MacbookFrame className={className} aspect={aspect}>
      <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes={sizes} className="object-contain" />
    </MacbookFrame>
  );
}

/** The cover, or a placeholder when the photos are still missing. */
export function CaseCover({
  study,
  priority,
  sizes = "(min-width: 1536px) 1440px, 100vw",
}: {
  study: CaseStudy;
  priority?: boolean;
  sizes?: string;
}) {
  const t = useT();
  const { locale } = useLocale();
  const cover = study.images[0];
  if (!cover) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <span className="text-slate-900 font-semibold">{t.cases.pendingImages}</span>
        <span className="max-w-[70ch] text-sm text-slate-500">
          <Pending /> {study.imagesPending?.[locale]}
        </span>
      </div>
    );
  }
  // A phone shaped cover (an app) goes in the phone; anything else opens in
  // a Safari window with the client's address.
  const host = study.links[0]?.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (cover.height / cover.width > 1.4) {
    return (
      <div className="flex w-full justify-center rounded-3xl bg-slate-50 py-12 md:py-16">
        <IphoneFrame className="h-[520px] md:h-[680px]" aspect={`${cover.width} / ${cover.height}`}>
          <Image src={cover.src} alt={cover.alt[locale]} fill priority={priority} sizes="340px" className="object-contain" />
        </IphoneFrame>
      </div>
    );
  }
  return (
    <MacWindowFrame url={host} title={cover.alt[locale]}>
      <div className="relative w-full" style={{ aspectRatio: `${cover.width} / ${cover.height}` }}>
        <Image src={cover.src} alt={cover.alt[locale]} fill priority={priority} sizes={sizes} className="object-contain" />
      </div>
    </MacWindowFrame>
  );
}

/** Official evidence for a case, each item linking to its source document. */
export function CaseCertification({ certification }: { certification: NonNullable<CaseStudy["certification"]> }) {
  const { locale } = useLocale();
  return (
    <div>
      <h4 className="text-slate-900 text-lg font-semibold">{certification.label[locale]}</h4>
      <ul className="mt-4 flex flex-wrap gap-3">
        {certification.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-900"
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white"
              >
                PASS
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{item.title[locale]}</span>
                <span className="text-sm text-slate-500">{item.date[locale]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The case's public sites and, if any, its store badges. */
export function CaseLinks({ study }: { study: CaseStudy }) {
  const t = useT();
  const { locale } = useLocale();
  if (!study.links.length && !study.badges?.length) return null;
  const linkClass =
    "inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-900/30 text-slate-900 text-sm font-medium hover:bg-slate-900 hover:text-white transition-colors duration-300";
  return (
    <>
      {study.links.length === 1 ? (
        <a href={study.links[0].href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t.cases.visit}
          <span className="sr-only">: {study.links[0].label}</span>
          <ArrowUpRight />
        </a>
      ) : (
        study.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {link.label}
            <ArrowUpRight />
          </a>
        ))
      )}
      {study.badges?.map((badge) => (
        <a key={badge.href} href={badge.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
          <Image
            src={badge.src}
            alt={badge.alt[locale]}
            width={badge.width}
            height={badge.height}
            unoptimized
            className="h-11 w-auto"
          />
        </a>
      ))}
    </>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
