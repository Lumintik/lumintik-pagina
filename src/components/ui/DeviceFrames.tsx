import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Device frames drawn in CSS: a phone, a laptop and a macOS window. They wrap
 * real screenshots on the case pages, the product tours and the blog covers.
 *
 * Every radius and thickness is in `cqw` (percent of the frame's own width),
 * so the corners stay circular and the bezel stays even at any size. A plain
 * percentage radius draws an ellipse, which is what made the first phone look
 * like a drawing of a phone instead of a phone.
 */

// Proportions of an iPhone 16 Pro, as percentages of the device width:
// band 1, bezel 2.5, screen corner radius 13.7% of the screen's own width,
// island 31% of the screen wide and 29% of its own width tall.
const BAND = 1;
const BEZEL = 2.5;
const SCREEN_W = 100 - 2 * (BAND + BEZEL);
const SCREEN_R = SCREEN_W * 0.137;
const BEZEL_R = SCREEN_R + BEZEL;
const BAND_R = BEZEL_R + BAND;
const ISLAND_W = SCREEN_W * 0.31;
const ISLAND_H = ISLAND_W * 0.29;

/**
 * An iPhone: titanium band, black bezel, the island and the side buttons.
 * Give it a width or a height; the other side follows from the screen's
 * aspect ratio, and the screen keeps that ratio exactly, so the capture
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
  // The device is 100 wide; the screen is SCREEN_W wide and as tall as its own
  // ratio demands, plus band and bezel above and below.
  const outer = `100 / ${(SCREEN_W * h) / w + 2 * (BAND + BEZEL)}`;
  const button =
    "absolute w-[0.9cqw] rounded-[0.3cqw] bg-[linear-gradient(180deg,#d7d7dc,#8e8e96_35%,#6c6c74_65%,#c2c2c9)]";

  return (
    <div className={cn("relative [container-type:inline-size]", className)} style={{ aspectRatio: outer }}>
      {/* Side buttons, mostly behind the band so only their edge shows */}
      <span aria-hidden className={cn(button, "-left-[0.5cqw] top-[16%] h-[4.4%]")} />
      <span aria-hidden className={cn(button, "-left-[0.5cqw] top-[24%] h-[7.6%]")} />
      <span aria-hidden className={cn(button, "-left-[0.5cqw] top-[33.5%] h-[7.6%]")} />
      <span aria-hidden className={cn(button, "-right-[0.5cqw] top-[27%] h-[11%]")} />

      {/* Titanium band */}
      <div
        className="absolute inset-0 shadow-[0_50px_110px_-45px_rgba(15,23,42,0.55),0_14px_30px_-18px_rgba(15,23,42,0.35)]"
        style={{
          borderRadius: `${BAND_R}cqw`,
          padding: `${BAND}cqw`,
          background:
            "linear-gradient(152deg, #fafafc 0%, #c3c3ca 14%, #83838c 33%, #5f5f68 50%, #9a9aa3 68%, #dcdce1 86%, #f4f4f7 100%)",
        }}
      >
        {/* Black bezel around the screen */}
        <div
          className="relative h-full w-full bg-[#050506]"
          style={{ borderRadius: `${BEZEL_R}cqw`, padding: `${BEZEL}cqw` }}
        >
          {/* Screen: exactly the capture's aspect ratio */}
          <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: `${SCREEN_R}cqw` }}>
            {children}
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 bg-black"
              style={{
                top: `${BEZEL * 0.95}cqw`,
                width: `${ISLAND_W}cqw`,
                height: `${ISLAND_H}cqw`,
                borderRadius: `${ISLAND_H / 2}cqw`,
              }}
            />
          </div>
          {/* The line where the bezel meets the band, and the sheen on the glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: `${BEZEL_R}cqw`,
              boxShadow: "inset 0 0 0 0.12cqw rgba(255,255,255,0.10)",
              background:
                "linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0) 40%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** A MacBook Pro in space black: aluminum lid, black bezel, notch and base. */
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
    <div className={cn("relative w-full [container-type:inline-size]", className)}>
      {/* Lid: space black aluminum around the glass */}
      <div
        className="relative mx-[6cqw] rounded-t-[1.1cqw] rounded-b-[0.4cqw] p-[0.35cqw] shadow-[0_50px_100px_-40px_rgba(15,23,42,0.65)]"
        style={{ background: "linear-gradient(160deg, #4a4a4f 0%, #2b2b2f 30%, #1d1d21 60%, #3a3a3f 100%)" }}
      >
        <div className="relative rounded-t-[0.95cqw] rounded-b-[0.3cqw] bg-[#050506] p-[0.8cqw] pt-[1cqw]">
          <div className="relative w-full overflow-hidden rounded-[0.35cqw] bg-black" style={{ aspectRatio: aspect }}>
            {children}
          </div>
          {/* Notch with the camera */}
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 flex h-[0.95cqw] w-[10cqw] -translate-x-1/2 items-center justify-center rounded-b-[0.35cqw] bg-[#050506]">
            <span className="block size-[0.3cqw] rounded-full bg-[#17171c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
          </span>
          {/* Reflection on the glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-t-[0.95cqw] rounded-b-[0.3cqw]"
            style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 50%)" }}
          />
        </div>
      </div>
      {/* Base: the wider body the lid sits on */}
      <div
        className="relative h-[1.5cqw] min-h-[10px] w-full rounded-b-[1.1cqw] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.6)]"
        style={{ background: "linear-gradient(180deg, #56565b 0%, #34343a 40%, #202024 100%)" }}
      >
        <span aria-hidden className="absolute left-1/2 top-0 h-[42%] w-[13%] -translate-x-1/2 rounded-b-[0.5cqw] bg-gradient-to-b from-[#232327] to-[#3d3d42]" />
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
