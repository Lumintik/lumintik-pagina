import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Device frames drawn in CSS: a phone, a laptop and a macOS window. They wrap
 * real screenshots on the case pages, the product tours and the blog covers.
 * No images: gradients and shadows only, so they stay sharp at any size.
 */

/** An iPhone with a titanium band, black bezel and the island at the top. */
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
  return (
    <div className={cn("relative", className)}>
      {/* Side buttons sit on the band, so they go behind it */}
      <span aria-hidden className="absolute -left-[3px] top-[19%] h-[5%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -left-[3px] top-[27%] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -left-[3px] top-[37%] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />
      <span aria-hidden className="absolute -right-[3px] top-[30%] h-[12%] w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#c9c9cf] via-[#7d7d84] to-[#b8b8be]" />

      {/* Titanium band */}
      <div
        className="relative rounded-[15.5%/7.2%] p-[3px] shadow-[0_60px_120px_-40px_rgba(15,23,42,0.55),0_20px_40px_-20px_rgba(15,23,42,0.35)]"
        style={{ background: "linear-gradient(155deg, #f1f1f4 0%, #b9b9c0 22%, #6f6f76 48%, #a7a7ad 72%, #e6e6ea 100%)" }}
      >
        {/* Black bezel */}
        <div className="relative rounded-[15%/7%] bg-[#050506] p-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          {/* Screen */}
          <div className="relative w-full overflow-hidden rounded-[12.5%/5.8%] bg-black" style={{ aspectRatio: aspect }}>
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

/** A MacBook: thin black lid with the notch, aluminum base with the lip. */
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
      {/* Lid */}
      <div className="relative mx-[6%] rounded-t-[1.4vw] rounded-b-[0.6vw] bg-[#0c0c0e] p-[1.1%] pt-[1.2%] shadow-[0_50px_100px_-40px_rgba(15,23,42,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative w-full overflow-hidden rounded-[0.6vw] bg-black" style={{ aspectRatio: aspect }}>
          {children}
        </div>
        {/* Notch with the camera */}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 flex h-[2.4%] w-[12%] -translate-x-1/2 items-center justify-center rounded-b-[0.5vw] bg-[#0c0c0e]">
          <span className="block size-[5px] rounded-full bg-[#1c1c22] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
        </span>
        {/* Reflection on the glass */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-[1.4vw] rounded-b-[0.6vw]"
          style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 50%)" }}
        />
      </div>
      {/* Base */}
      <div
        className="relative h-[1.4vw] min-h-[10px] w-full rounded-b-[1vw] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]"
        style={{ background: "linear-gradient(180deg, #e9e9ec 0%, #c7c7cc 45%, #9d9da3 100%)" }}
      >
        {/* Lip where the lid opens */}
        <span aria-hidden className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[0.5vw] bg-gradient-to-b from-[#b6b6bc] to-[#d9d9de]" />
        {/* Edge highlight */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/70" />
      </div>
    </div>
  );
}

/** A macOS window: traffic lights, a centered title or address, then the content. */
export function MacWindowFrame({
  children,
  title,
  className,
  dark,
}: {
  children: ReactNode;
  /** The address or the title shown in the middle of the bar. */
  title?: string;
  className?: string;
  /** A dark bar for screens that are dark themselves. */
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5),0_0_0_1px_rgba(15,23,42,0.08)]",
        dark ? "bg-[#1e1e22]" : "bg-white",
        className,
      )}
    >
      <div className={cn("flex h-10 items-center px-4 md:h-11", dark ? "bg-[#2a2a2f]" : "bg-[#f3f3f5]")}>
        <span aria-hidden className="flex gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
        </span>
        {title ? (
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 max-w-[55%] truncate rounded-md px-3 py-1 text-[11px] md:text-xs" style={{ color: dark ? "#c5c5cc" : "#5b5b66", background: dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)" }}>
            {title}
          </span>
        ) : null}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
