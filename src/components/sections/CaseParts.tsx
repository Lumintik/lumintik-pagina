"use client";

import Image from "next/image";
import { IpadFrame, IphoneFrame, MacbookFrame, MacWindowFrame, WatchFrame } from "@/components/ui/DeviceFrames";
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
    <span className="inline-block rounded border border-dashed border-slate-400 px-1.5 text-slate-900">
      [dato pendiente]
    </span>
  );
}

/** Small blue label above a title, the way the rest of the site writes them. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium text-slate-900", className)}>
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
    <li className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-900/15 bg-white px-4 text-sm font-medium text-slate-700">
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
      <p className="text-slate-900">
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
          <p className={cn("mt-2 text-slate-900 leading-relaxed", large ? "text-lg" : "text-base")}>
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
  if (image.framed) {
    // The capture already has its device: show it as it is.
    return (
      <Image
        src={image.src}
        alt={image.alt[locale]}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        className={cn("h-auto w-full", className)}
      />
    );
  }
  const ratio = image.height / image.width;
  const tall = image.device === "phone" || (!image.device && ratio > 1.4);
  const aspect = `${image.width} / ${image.height}`;
  if (image.device === "watch") {
    return (
      <div className={cn("flex w-full justify-center", className)}>
        <WatchFrame className="w-full max-w-[220px]" aspect={aspect}>
          <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes="220px" className="object-contain" />
        </WatchFrame>
      </div>
    );
  }
  if (image.device === "ipad") {
    return (
      <div className={cn("flex w-full justify-center", className)}>
        <IpadFrame className="w-full max-w-[420px]" aspect={aspect}>
          <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes="420px" className="object-contain" />
        </IpadFrame>
      </div>
    );
  }
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

/**
 * What goes inside a frame: a silent looping video when the case has one (with
 * the capture as its poster, so there is never an empty box), the capture
 * otherwise. The loop never plays for someone who asked for less motion.
 */
function Screen({ image, priority, sizes }: { image: CaseImage; priority?: boolean; sizes: string }) {
  const { locale } = useLocale();
  if (image.video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        poster={image.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={image.alt[locale]}
      >
        <source src={image.video} type="video/mp4" />
      </video>
    );
  }
  return <Image src={image.src} alt={image.alt[locale]} fill priority={priority} sizes={sizes} className="object-contain" />;
}

/** The first landscape capture and the first phone one, if the case has them. */
export function coverPair(study: CaseStudy): { desktop?: CaseImage; mobile?: CaseImage } {
  const real = study.images.filter((i) => !i.src.startsWith("/badges/"));
  return {
    desktop: real.find((i) => i.height / i.width <= 1),
    mobile: real.find((i) => i.height / i.width > 1.4),
  };
}

/**
 * The cover: the desktop screen on a laptop at the left and the phone one at
 * the right, both whole and both small enough to fit on screen at once. Every
 * project is responsive, and the cover says so without a word.
 */
export function CaseCover({
  study,
  priority,
  sizes = "(min-width: 1536px) 1100px, 80vw",
}: {
  study: CaseStudy;
  priority?: boolean;
  sizes?: string;
}) {
  const t = useT();
  const { locale } = useLocale();
  const { desktop, mobile } = coverPair(study);
  const cover = desktop ?? mobile ?? study.images[0];
  if (!cover) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-900/25 bg-slate-50 p-6 text-center">
        <span className="text-slate-900 font-semibold">{t.cases.pendingImages}</span>
        <span className="max-w-[70ch] text-sm text-slate-900">
          <Pending /> {study.imagesPending?.[locale]}
        </span>
      </div>
    );
  }

  // No desktop capture: the phones lead, up to three across, with the watch
  // beside them when the app has one.
  if (!desktop) {
    const phones = study.images
      .filter((i) => i.device !== "watch" && (i.device === "phone" || i.height / i.width > 1.4))
      .slice(0, 3);
    const watch = study.images.find((i) => i.device === "watch");
    return (
      <div className="flex w-full items-end justify-center gap-4 py-6 md:gap-8 md:py-10">
        {watch ? (
          <WatchFrame className="w-[13%] min-w-[70px] max-w-[130px] shrink-0" aspect={`${watch.width} / ${watch.height}`}>
            <Image src={watch.src} alt={watch.alt[locale]} fill priority={priority} sizes="130px" className="object-contain" />
          </WatchFrame>
        ) : null}
        {(phones.length ? phones : [cover]).map((img) =>
          img.framed ? (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt[locale]}
              width={img.width}
              height={img.height}
              priority={priority}
              sizes="280px"
              className="h-auto w-full max-w-[260px]"
            />
          ) : (
            <IphoneFrame key={img.src} className="w-full max-w-[260px]" aspect={`${img.width} / ${img.height}`}>
              <Image src={img.src} alt={img.alt[locale]} fill priority={priority} sizes="280px" className="object-contain" />
            </IphoneFrame>
          ),
        )}
      </div>
    );
  }

  // The two frames end up the same height, so they read as one machine and
  // one pocket rather than two loose pictures. A laptop is about
  // 0.88 * ratio + 0.045 tall for its width, and a phone 0.93 * ratio + 0.07;
  // that gives the share of the row each one needs.
  const laptopK = 0.88 * (desktop.height / desktop.width) + 0.045;
  const phoneK = mobile ? 0.93 * (mobile.height / mobile.width) + 0.07 : 0;
  const phoneShare = mobile ? (laptopK / phoneK) / (1 + laptopK / phoneK) : 0;

  return (
    <div className="flex w-full items-end justify-center gap-4 md:gap-8">
      <MacbookFrame
        className="min-w-0"
        style={{ width: `${(1 - phoneShare) * 100}%` }}
        aspect={`${desktop.width} / ${desktop.height}`}
      >
        <Screen image={desktop} priority={priority} sizes={sizes} />
      </MacbookFrame>
      {mobile ? (
        <IphoneFrame
          className="shrink-0"
          style={{ width: `${phoneShare * 100}%` }}
          aspect={`${mobile.width} / ${mobile.height}`}
        >
          <Screen image={mobile} priority={priority} sizes="240px" />
        </IphoneFrame>
      ) : null}
    </div>
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
              className="flex items-center gap-3 rounded-xl border border-slate-900/15 bg-white px-4 py-3 transition-colors hover:border-slate-900"
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white"
              >
                PASS
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{item.title[locale]}</span>
                <span className="text-sm text-slate-900">{item.date[locale]}</span>
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
