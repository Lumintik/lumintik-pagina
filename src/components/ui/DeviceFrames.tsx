import type { CSSProperties, ReactNode } from "react";
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
  style,
  aspect = "402 / 874",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
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
    <div className={cn("relative [container-type:inline-size]", className)} style={{ aspectRatio: outer, ...style }}>
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
  style,
  aspect = "16 / 10",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspect?: string;
}) {
  // The capture is shown the way a page looks in full screen on a MacBook Pro:
  // the menu bar is hidden and the top safe area, where the notch lives, stays
  // black. Drawing a menu bar meant inventing an interface, and an invented
  // interface always reads as fake next to a real screenshot.
  const SAFE_AREA = 1.6;
  // The screen is as tall as the capture needs PLUS the safe area. Without
  // that extra height the capture was letterboxed inside the screen and the
  // black bars read as a thick bezel, which no Mac has.
  const [aw, ah] = aspect.split("/").map((n) => Number(n.trim()));
  const LID = 100 - 2 * 6 - 2 * 0.35 - 2 * 0.8; // screen width, in frame units
  const screenAspect = `${aw} / ${ah + (aw * SAFE_AREA) / LID}`;
  return (
    <div className={cn("relative w-full [container-type:inline-size]", className)} style={style}>
      {/* Lid: space black aluminum around the glass */}
      <div
        className="relative mx-[6cqw] rounded-t-[1.1cqw] rounded-b-[0.4cqw] p-[0.35cqw] shadow-[0_50px_100px_-40px_rgba(15,23,42,0.65)]"
        style={{ background: "linear-gradient(160deg, #4a4a4f 0%, #2b2b2f 30%, #1d1d21 60%, #3a3a3f 100%)" }}
      >
        <div className="relative rounded-t-[0.95cqw] rounded-b-[0.3cqw] bg-[#050506] p-[0.8cqw]">
          <div className="relative w-full overflow-hidden rounded-[0.35cqw] bg-black" style={{ aspectRatio: screenAspect }}>
            {/* The page, below the safe area the notch sits in */}
            <div className="absolute inset-x-0 bottom-0" style={{ top: `${SAFE_AREA}cqw` }}>
              {children}
            </div>

            {/* The safe area: black across the top, with the notch in it */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 block bg-black"
              style={{ height: `${SAFE_AREA}cqw` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 flex w-[10.5cqw] -translate-x-1/2 items-center justify-center rounded-b-[0.55cqw] bg-black"
              style={{ height: `${SAFE_AREA * 1.45}cqw` }}
            >
              <span className="mt-[0.2cqw] block size-[0.3cqw] rounded-full bg-[#1b1b21] shadow-[inset_0_0_0_0.05cqw_rgba(255,255,255,0.22)]" />
            </span>
          </div>
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

/**
 * An iPad: thin aluminium band, even black bezel on all four sides and a
 * front camera on the long edge, the way a modern iPad Pro sits in landscape
 * or portrait. Same rules as the phone: radii in `cqw`, screen untouched.
 */
export function IpadFrame({
  children,
  className,
  style,
  aspect = "834 / 1210",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspect?: string;
}) {
  const [w, h] = aspect.split("/").map((n) => Number(n.trim()));
  const BAND_I = 0.9;
  const BEZEL_I = 3.2;
  const SCREEN = 100 - 2 * (BAND_I + BEZEL_I);
  const R = SCREEN * 0.055;
  const portrait = h >= w;
  const outer = `100 / ${(SCREEN * h) / w + 2 * (BAND_I + BEZEL_I)}`;
  return (
    <div className={cn("relative [container-type:inline-size]", className)} style={{ aspectRatio: outer, ...style }}>
      <div
        className="absolute inset-0 shadow-[0_45px_100px_-40px_rgba(15,23,42,0.5)]"
        style={{
          borderRadius: `${R + BEZEL_I + BAND_I}cqw`,
          padding: `${BAND_I}cqw`,
          background: "linear-gradient(150deg, #f2f2f5 0%, #c2c2c9 20%, #8b8b93 46%, #b5b5bc 72%, #eaeaee 100%)",
        }}
      >
        <div
          className="relative h-full w-full bg-[#050506]"
          style={{ borderRadius: `${R + BEZEL_I}cqw`, padding: `${BEZEL_I}cqw` }}
        >
          <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: `${R}cqw` }}>
            {children}
          </div>
          {/* Camera, centred on the long edge */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute block rounded-full bg-[#15151a] shadow-[inset_0_0_0_0.06cqw_rgba(255,255,255,0.25)]",
              portrait ? "left-1/2 top-[1.1cqw] -translate-x-1/2" : "left-[1.1cqw] top-1/2 -translate-y-1/2",
            )}
            style={{ width: "0.9cqw", height: "0.9cqw" }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * An Apple Watch: titanium case, flat black display, the crown and the side
 * button on the right. The band is left out on purpose, so the screen stays
 * the subject.
 */
export function WatchFrame({
  children,
  className,
  style,
  aspect = "422 / 514",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspect?: string;
}) {
  const [w, h] = aspect.split("/").map((n) => Number(n.trim()));
  const CASE_W = 8;
  const SCREEN = 100 - 2 * CASE_W;
  const R = SCREEN * 0.3;
  const outer = `100 / ${(SCREEN * h) / w + 2 * CASE_W}`;
  return (
    <div className={cn("relative [container-type:inline-size]", className)} style={{ aspectRatio: outer, ...style }}>
      {/* Digital crown and side button */}
      <span
        aria-hidden
        className="absolute -right-[1.6cqw] top-[27%] h-[13%] w-[3.4cqw] rounded-[1.2cqw] bg-[linear-gradient(180deg,#e4e4e9,#9a9aa2_40%,#74747c_70%,#cfcfd6)]"
      />
      <span
        aria-hidden
        className="absolute -right-[0.9cqw] top-[46%] h-[14%] w-[1.9cqw] rounded-[0.8cqw] bg-[linear-gradient(180deg,#d8d8de,#8f8f98_45%,#c5c5cc)]"
      />
      <div
        className="absolute inset-0 shadow-[0_35px_70px_-30px_rgba(15,23,42,0.55)]"
        style={{
          borderRadius: `${R + CASE_W}cqw`,
          padding: `${CASE_W}cqw`,
          background: "linear-gradient(155deg, #efeff2 0%, #b9b9c1 22%, #6f6f78 52%, #a9a9b1 74%, #e6e6ea 100%)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: `${R}cqw` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
