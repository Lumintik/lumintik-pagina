"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Tour } from "@/data/tours";
import { cn } from "@/lib/cn";
import { IphoneFrame, MacWindowFrame } from "@/components/ui/DeviceFrames";

// Each stop: the screen fades in, the camera settles on the focus, then it
// follows the cursor to the next control, clicks, and moves on.
const STEP_MS = 4600;
const SETTLE_AT = 250;
const TRAVEL_AT = 1150;
const CLICK_AT = STEP_MS - 650;
// How much closer the camera gets while it follows the cursor.
const TRAVEL_ZOOM = 1.05;

/**
 * A guided tour over real screens of the product: the camera eases toward
 * what matters on each one, a cursor glides to the next control and clicks,
 * and the rail on top follows, the same way the hero does.
 */
export function ProductTour({ tour, className }: { tour: Tour; className?: string }) {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<"enter" | "settled" | "travel" | "click">("enter");
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only plays while it is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The phone beside the browser has to end up exactly as tall as it, and the
  // browser's height depends on its own width, which depends on the phone's.
  // Measuring the row and solving for it once avoids a resize loop: a laptop
  // window is its title bar plus width * ratio, and a phone frame is
  // 0.93 * ratio + 0.07 tall for its width.
  const rowRef = useRef<HTMLDivElement>(null);
  const [phoneWidth, setPhoneWidth] = useState<number | null>(null);
  const mobile = tour.mobile;
  const measure = useCallback(() => {
    const el = rowRef.current;
    if (!el || !mobile) return;
    const gap = window.innerWidth >= 768 ? 24 : 16;
    const bar = window.innerWidth >= 768 ? 48 : 44;
    const r = tour.height / tour.width;
    const k = 0.93 * (mobile.height / mobile.width) + 0.07;
    const w = (bar + (el.clientWidth - gap) * r) / (k + r);
    setPhoneWidth(Math.round(w));
  }, [mobile, tour.height, tour.width]);
  useEffect(() => {
    if (!mobile) return;
    measure();
    const el = rowRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobile, measure]);

  useEffect(() => {
    if (!inView || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("settled"), reduced ? 0 : SETTLE_AT);
    const t2 = setTimeout(() => setPhase("travel"), TRAVEL_AT);
    const t3 = setTimeout(() => setPhase("click"), CLICK_AT);
    const t4 = setTimeout(() => {
      setPhase("enter");
      setIndex((i) => (i + 1) % tour.steps.length);
      setRun((r) => r + 1);
    }, STEP_MS);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [index, run, inView, paused, tour.steps.length]);

  const goTo = (i: number) => {
    setPhase("enter");
    setIndex(i);
    setRun((r) => r + 1);
  };

  const step = tour.steps[index];

  /** The stacked screens, the camera and the cursor; shared by both devices. */
  const screens = tour.steps.map((s, i) => {
    const active = i === index;
    return (
      <div key={s.id} aria-hidden={!active} className="absolute inset-0 transition-opacity duration-700 ease-out" style={{ opacity: active ? 1 : 0 }}>
        {/* The camera settles on the focus, then follows the cursor to the
            control it is heading for: the origin travels with it and the
            zoom tightens a little, so the eye goes where the click will be. */}
        <div
          className="absolute inset-0"
          style={{
            transformOrigin:
              active && (phase === "travel" || phase === "click")
                ? `${s.click[0]}% ${s.click[1]}%`
                : `${s.focus.at[0]}% ${s.focus.at[1]}%`,
            transform:
              active && (phase === "travel" || phase === "click")
                ? `scale(${s.focus.zoom * TRAVEL_ZOOM})`
                : active && phase === "settled"
                  ? `scale(${s.focus.zoom})`
                  : "scale(1)",
            transition: "transform 1300ms cubic-bezier(0.22, 1, 0.36, 1), transform-origin 1300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Image src={s.image} alt="" fill sizes={tour.device === "phone" ? "340px" : "(min-width: 1280px) 1100px, 100vw"} className="object-cover" priority={i === 0} />

          {/* Cursor on a browser, a fingertip on a phone; both ride with the camera */}
          <span
            className="absolute z-10"
            style={{
              left: `${active && (phase === "travel" || phase === "click") ? s.click[0] : s.focus.at[0]}%`,
              top: `${active && (phase === "travel" || phase === "click") ? s.click[1] : s.focus.at[1]}%`,
              opacity: active && phase !== "enter" ? 1 : 0,
              transition: "left 1200ms cubic-bezier(0.22, 1, 0.36, 1), top 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms",
            }}
          >
            <span className={cn("absolute -left-4 -top-4 size-8 rounded-full border-2 border-slate-900/70 transition-all duration-500", active && phase === "click" ? "scale-150 opacity-0" : "scale-50 opacity-0")} />
            {tour.device === "phone" ? (
              <span className={cn("absolute -left-4 -top-4 size-8 rounded-full border border-white/30 bg-slate-900/25 shadow-[0_4px_14px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-transform duration-200", active && phase === "click" ? "scale-75" : "scale-100")} />
            ) : (
              <>
                <span className={cn("absolute -left-2.5 -top-2.5 size-5 rounded-full bg-slate-900/15 transition-transform duration-200", active && phase === "click" ? "scale-100" : "scale-0")} />
                <svg width="20" height="20" viewBox="0 0 24 24" className={cn("drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)] transition-transform duration-150", active && phase === "click" ? "scale-90" : "")}>
                  <path d="M5 3l14 8-6 1.5L16 19l-2.5 1-3-6.5L6 18z" fill="#fff" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </span>
        </div>
      </div>
    );
  });

  const railFill = (active: boolean) =>
    active ? (
      <span
        key={run}
        className="block h-full rounded-full bg-slate-900 tour-rail-fill"
        style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: paused || !inView ? "paused" : "running" }}
      />
    ) : null;

  if (tour.device === "phone") {
    return (
      <div ref={rootRef} className={cn("w-full", className)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          {/* The stops, each with its line; the active one opens */}
          <ol className="order-2 flex flex-col gap-2 md:order-1">
            {tour.steps.map((s, i) => {
              const active = i === index;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={cn("w-full rounded-2xl p-5 text-left transition-colors duration-300", active ? "bg-slate-50" : "hover:bg-slate-50/60")}
                  >
                    <span className={cn("flex items-center gap-3 text-lg font-semibold transition-colors duration-300 md:text-xl", active ? "text-slate-900" : "text-slate-900")}>
                      <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium", active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-900/25")}>{i + 1}</span>
                      {s.label[locale]}
                    </span>
                    <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="mt-3 block pl-10 text-base leading-relaxed text-slate-900">{s.caption[locale]}</span>
                        <span className="mt-4 ml-10 block h-[3px] overflow-hidden rounded-full bg-slate-200">{railFill(active)}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The phone */}
          <div className="order-1 mx-auto md:order-2">
            <IphoneFrame className="w-[270px] md:w-[320px]" aspect={`${tour.width} / ${tour.height}`}>
              {screens}
            </IphoneFrame>
          </div>
        </div>

        <style>{`
          @keyframes tour-rail { from { width: 0; } to { width: 100%; } }
          .tour-rail-fill { animation: tour-rail linear forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("w-full", className)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* The browser with its rail, and the same surface on a phone beside it
          when the tour has one: the rail stays exactly as wide as the screen
          it belongs to. */}
      <div ref={rowRef} className="flex w-full items-end gap-4 md:gap-6">
      <div className="min-w-0 flex-1">
      {/* The rail: one stop per screen */}
      <ol className="grid gap-x-3 md:gap-x-4" style={{ gridTemplateColumns: `repeat(${tour.steps.length}, minmax(0, 1fr))` }}>
        {tour.steps.map((s, i) => {
          const active = i === index;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={active ? "step" : undefined}
                aria-label={s.label[locale]}
                className={cn("flex h-full w-full flex-col justify-end text-left transition-colors duration-300", active ? "text-slate-900" : "text-slate-900 hover:text-slate-600")}
              >
                <span className="hidden md:flex min-h-[2.5em] items-end text-sm font-medium leading-tight text-balance">{s.label[locale]}</span>
                <span className="md:mt-2.5 block h-[3px] w-full overflow-hidden rounded-full bg-slate-200">{railFill(active)}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="md:hidden mt-3 text-sm font-medium text-slate-900">{step.label[locale]}</p>

      <MacWindowFrame title={tour.url} className="mt-6">
        <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: `${tour.width} / ${tour.height}` }}>
          {screens}

          {/* Caption, in glass */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 md:inset-x-auto md:bottom-5 md:left-5 md:max-w-[46ch]">
            <p
              key={step.id}
              className="rounded-2xl border border-white/30 bg-slate-950/70 px-4 py-3 text-sm leading-relaxed text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:text-base tour-caption"
            >
              {step.caption[locale]}
            </p>
          </div>
        </div>
      </MacWindowFrame>
      </div>
      {tour.mobile ? (
        <IphoneFrame
          className="hidden shrink-0 lg:block"
          style={phoneWidth ? { width: phoneWidth } : undefined}
          aspect={`${tour.mobile.width} / ${tour.mobile.height}`}
        >
          {tour.mobile.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              poster={tour.mobile.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={tour.mobile.alt[locale]}
            >
              <source src={tour.mobile.video} type="video/mp4" />
            </video>
          ) : (
            <Image src={tour.mobile.src} alt={tour.mobile.alt[locale]} fill sizes="160px" className="object-contain" />
          )}
        </IphoneFrame>
      ) : null}
      </div>

      <style>{`
        @keyframes tour-rail { from { width: 0; } to { width: 100%; } }
        .tour-rail-fill { animation: tour-rail linear forwards; }
        @keyframes tour-caption { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .tour-caption { animation: tour-caption 600ms cubic-bezier(0.22, 1, 0.36, 1) 300ms backwards; }
      `}</style>
    </div>
  );
}
