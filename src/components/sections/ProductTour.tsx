"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Tour } from "@/data/tours";
import { cn } from "@/lib/cn";

const STEP_MS = 5200;

/**
 * A guided tour over real screens of the product: the camera eases toward
 * what matters on each one, a cursor glides to the next control and clicks,
 * and the rail on top follows, the same way the hero does.
 */
export function ProductTour({ tour, className }: { tour: Tour; className?: string }) {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<"enter" | "settled" | "click">("enter");
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

  useEffect(() => {
    if (!inView || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("settled"), reduced ? 0 : 500);
    const t2 = setTimeout(() => setPhase("click"), STEP_MS - 900);
    const t3 = setTimeout(() => {
      setPhase("enter");
      setIndex((i) => (i + 1) % tour.steps.length);
      setRun((r) => r + 1);
    }, STEP_MS);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [index, run, inView, paused, tour.steps.length]);

  const goTo = (i: number) => {
    setPhase("enter");
    setIndex(i);
    setRun((r) => r + 1);
  };

  const step = tour.steps[index];

  return (
    <div ref={rootRef} className={cn("w-full", className)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
                className={cn("flex h-full w-full flex-col justify-end text-left transition-colors duration-300", active ? "text-slate-900" : "text-slate-400 hover:text-slate-600")}
              >
                <span className="hidden md:flex min-h-[2.5em] items-end text-sm font-medium leading-tight text-balance">{s.label[locale]}</span>
                <span className="md:mt-2.5 block h-[3px] w-full overflow-hidden rounded-full bg-slate-200">
                  {active ? (
                    <span
                      key={run}
                      className="block h-full rounded-full bg-slate-900 tour-rail-fill"
                      style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: paused || !inView ? "paused" : "running" }}
                    />
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="md:hidden mt-3 text-sm font-medium text-slate-900">{step.label[locale]}</p>

      {/* The browser */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((k) => (
              <span key={k} className="size-2.5 rounded-full bg-slate-300" />
            ))}
          </span>
          <span className="mx-auto w-full max-w-sm truncate rounded-full bg-white px-4 py-1 text-center text-xs text-slate-500 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]">{tour.url}</span>
          <span className="w-10" />
        </div>

        <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: `${tour.width} / ${tour.height}` }}>
          {tour.steps.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.id}
                aria-hidden={!active}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: active ? 1 : 0 }}
              >
                {/* The camera eases toward the focus once the screen is in */}
                <div
                  className="absolute inset-0"
                  style={{
                    transformOrigin: `${s.focus.at[0]}% ${s.focus.at[1]}%`,
                    transform: active && phase !== "enter" ? `scale(${s.focus.zoom})` : "scale(1)",
                    transition: "transform 3200ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <Image src={s.image} alt="" fill sizes="(min-width: 1280px) 1100px, 100vw" className="object-cover" priority={i === 0} />

                  {/* Cursor: rides with the camera, so it lands on the control */}
                  <span
                    className="absolute z-10"
                    style={{
                      left: `${active && phase !== "enter" ? s.click[0] : 50}%`,
                      top: `${active && phase !== "enter" ? s.click[1] : 70}%`,
                      opacity: active ? 1 : 0,
                      transition: "left 2600ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, top 2600ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, opacity 400ms",
                    }}
                  >
                    <span className={cn("absolute -left-4 -top-4 size-8 rounded-full border-2 border-slate-900/70 transition-all duration-500", active && phase === "click" ? "scale-150 opacity-0" : "scale-50 opacity-0")} />
                    <span className={cn("absolute -left-2.5 -top-2.5 size-5 rounded-full bg-slate-900/15 transition-transform duration-200", active && phase === "click" ? "scale-100" : "scale-0")} />
                    <svg width="20" height="20" viewBox="0 0 24 24" className={cn("drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)] transition-transform duration-150", active && phase === "click" ? "scale-90" : "")}>
                      <path d="M5 3l14 8-6 1.5L16 19l-2.5 1-3-6.5L6 18z" fill="#fff" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}

          {/* Caption, in glass */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 md:inset-x-auto md:bottom-5 md:left-5 md:max-w-[46ch]">
            <p
              key={step.id}
              className="rounded-2xl border border-white/40 bg-slate-950/70 px-4 py-3 text-sm leading-relaxed text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:text-base tour-caption"
            >
              {step.caption[locale]}
            </p>
          </div>
        </div>
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
