import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Device frames drawn in CSS: a phone, a laptop and a macOS window. They wrap
 * real screenshots on the case pages, the product tours and the blog covers.
 * No images: gradients and shadows only, so they stay sharp at any size.
 */

/**
 * An iPhone with a titanium band, black bezel and the island at the top.
 * Give it a width or a height: the other side follows from the screen's
 * aspect ratio, and the screen keeps exactly that ratio, so the capture
 * inside is never cropped.
 */
export function IphoneFrame({
  children,
  className,
  aspect = "402 / 874",
}: {
  children: ReactNode;
  className?: string;
  /** Screen aspect ratio, `width / height`. */
  aspect?: string;
}) {
  const [w, h] = aspect.split("/").map((n) => Number(n.trim()));
  // Band and bezel add 3% of the width on every side, so the outer box is a
  // little wider and taller than the screen; this keeps the screen exact.
  const outer = `${w * 1.06} / ${h + 0.06 * w}`;
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: outer }}>
      {/* Side buttons sit on the band, so they go behind it */}
      <span aria-hidden className="absolute -left-[3px] top-[19%] h-[5%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -left-[3px] top-[27%] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -left-[3px] top-[37%] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -right-[3px] top-[30%] h-[12%] w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />

      {/* Titanium band */}
      <div
        className="absolute inset-0 rounded-[15.5%/7.2%] p-[0.9%] shadow-[0_60px_120px_-40px_rgba(15,23,42,0.55),0_20px_40px_-20px_rgba(15,23,42,0.35)]"
        style={{ background: "linear-gradient(155deg, #f1f1f4 0%, #b9b9c0 22%, #6f6f76 48%, #a7a7ad 72%, #e6e6ea 100%)" }}
      >
        {/* Black bezel */}
        <div className="relative h-full w-full rounded-[15%/7%] bg-[#050506] p-[2.1%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          {/* Screen: exactly the capture's aspect ratio */}
          <div className="relative h-full w-full overflow-hidden rounded-[12.5%/5.8%] bg-black">
            {children}
            {/* Dynamic Island */}
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-[1.6%] h-[3.2%] w-[31%] -translate-x-1/2 rounded-full bg-[#050506] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
          </div>
          {/* Glass reflection */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[15%/7%]"
            style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 28%, rgba(255,255,255,0) 45%)" }}
          />
        </div>
      </div>
    </div>
  );
}

/** A MacBook Pro in space black: aluminum lid around a black bezel, the notch, and the base with its lip. */
export function MacbookFrame({
  children,
  className,
  aspect = "16 / 10",
}: {
  children: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Lid: space black aluminum around the glass */}
      <div
        className="relative mx-[6%] rounded-t-[1.4vw] rounded-b-[0.5vw] p-[0.45%] shadow-[0_50px_100px_-40px_rgba(15,23,42,0.65)]"
        style={{ background: "linear-gradient(160deg, #4a4a4f 0%, #2b2b2f 30%, #1d1d21 60%, #3a3a3f 100%)" }}
      >
        <div className="relative rounded-t-[1.2vw] rounded-b-[0.4vw] bg-[#050506] p-[0.9%] pt-[1.1%]">
          <div className="relative w-full overflow-hidden rounded-[0.45vw] bg-black" style={{ aspectRatio: aspect }}>
            {children}
          </div>
          {/* Notch with the camera */}
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 flex h-[2.6%] w-[11%] -translate-x-1/2 items-center justify-center rounded-b-[0.45vw] bg-[#050506]">
            <span className="block size-[5px] rounded-full bg-[#17171c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
          </span>
          {/* Reflection on the glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-t-[1.2vw] rounded-b-[0.4vw]"
            style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 50%)" }}
          />
        </div>
      </div>
      {/* Base: the wider body the lid sits on */}
      <div
        className="relative h-[1.5vw] min-h-[11px] w-full rounded-b-[1.1vw] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.6)]"
        style={{ background: "linear-gradient(180deg, #56565b 0%, #34343a 40%, #202024 100%)" }}
      >
        <span aria-hidden className="absolute left-1/2 top-0 h-[42%] w-[13%] -translate-x-1/2 rounded-b-[0.5vw] bg-gradient-to-b from-[#232327] to-[#3d3d42]" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/25" />
      </div>
    </div>
  );
}

/**
 * A macOS window, the way Safari draws it: traffic lights, back and forward,
 * the address in the middle with its lock, and the content below. Pass `url`
 * for the address bar or `title` for a plain title.
 */
export function MacWindowFrame({
  children,
  title,
  url,
  className,
  dark,
}: {
  children: ReactNode;
  /** A plain title in the middle of the bar. */
  title?: string;
  /** An address; shown in Safari's pill with the lock. Wins over `title`. */
  url?: string;
  className?: string;
  /** A dark bar for screens that are dark themselves. */
  dark?: boolean;
}) {
  const fg = dark ? "#c5c5cc" : "#5b5b66";
  const pill = dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.06)";
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5),0_0_0_1px_rgba(15,23,42,0.08)]",
        dark ? "bg-[#1e1e22]" : "bg-white",
        className,
      )}
    >
      <div className={cn("relative flex h-11 items-center gap-3 px-4 md:h-12", dark ? "bg-[#2a2a2f]" : "bg-[#f3f3f5]")}>
        <span aria-hidden className="flex gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
        </span>
        <span aria-hidden className="ml-2 hidden gap-3 md:flex" style={{ color: fg }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M9 6l6 6-6 6" /></svg>
        </span>
        {url || title ? (
          <span
            className="pointer-events-none absolute left-1/2 flex h-7 max-w-[56%] -translate-x-1/2 items-center gap-1.5 truncate rounded-lg px-3 text-[11px] md:text-xs"
            style={{ color: fg, background: pill }}
          >
            {url ? (
              <svg aria-hidden width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 opacity-70"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2zm-8-2a3 3 0 0 1 6 0v2H9V7z" /></svg>
            ) : null}
            <span className="truncate">{url ?? title}</span>
          </span>
        ) : null}
        <span aria-hidden className="ml-auto hidden gap-3 md:flex" style={{ color: fg }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v12M8 7l4-4 4 4" /></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
