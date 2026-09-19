"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";
import { HERO_SCENES, type Chip, type Pt, type Scene, type Stat, type Step, type Target } from "@/data/heroScenes";

type Line = { id: string; from: Pt; to: Target };

type Frame = {
  chips: Chip[];
  lines: Line[];
  cursor: Pt;
  cursorVisible: boolean;
  clicking: boolean;
  dragging: string | null;
  stats: Stat[] | null;
  /** Where the result card is: it starts in a corner and the cursor drags it to the centre. */
  cardAt: Pt;
  cardDragging: boolean;
  leaving: boolean;
};

const CARD_CORNER: Pt = [86, 84];
const CARD_CENTER: Pt = [50, 50];

const EMPTY: Frame = {
  chips: [],
  lines: [],
  cursor: [50, 90],
  cursorVisible: false,
  clicking: false,
  dragging: null,
  stats: null,
  cardAt: CARD_CORNER,
  cardDragging: false,
  leaving: false,
};

const DEFAULT_DUR: Record<Step["t"], number> = {
  chip: 400,
  cursor: 700,
  click: 350,
  lines: 800,
  drag: 1100,
  flip: 3600,
  wait: 500,
};

/** How long a scene takes end to end, so a progress rail can follow it. */
export function sceneDuration(scene: Scene, reduced = false): number {
  const clamp = (ms: number) => (reduced ? Math.min(ms, 200) : ms);
  const steps = scene.steps.reduce((sum, step) => {
    const dur = step.dur ?? DEFAULT_DUR[step.t];
    // A click pauses briefly before its own duration; a drag pauses inside it.
    return sum + clamp(dur) + (step.t === "click" ? clamp(180) : 0);
  }, 0);
  return clamp(350) + steps + clamp(450);
}

/**
 * Plays the hero scenes on a loop: chips appear, a cursor clicks and drags
 * them, lines draw out to services, and a card flips in with the result.
 * Reports the active scene so the text beside it can follow.
 */
export function HeroDemo({
  locale,
  onScene,
  request,
  className,
}: {
  locale: Locale;
  /** Called when a scene starts, with how long it will play. */
  onScene?: (index: number, duration: number) => void;
  /** A scene someone asked for; a new `nonce` restarts there even if it is the same scene. */
  request?: { index: number; nonce: number };
  className?: string;
}) {
  const [frame, setFrame] = useState<Frame>(EMPTY);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // The lines are drawn in pixels, so the stage's size is measured.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // One token per run: a strict-mode remount must not leave the first loop alive.
    const cancelled = { current: false };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sceneI = request?.index ?? 0;

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, reduced ? Math.min(ms, 200) : ms));

    async function playScene(i: number) {
      const scene = HERO_SCENES[i];
      onScene?.(i, sceneDuration(scene, reduced));
      let f: Frame = { ...EMPTY };
      const chipAt = (id: string) => f.chips.find((c) => c.id === id)?.at ?? f.cursor;
      setFrame(f);
      await sleep(350);

      for (const step of scene.steps) {
        if (cancelled.current) return;
        const dur = step.dur ?? DEFAULT_DUR[step.t];
        switch (step.t) {
          case "chip":
            f = { ...f, chips: [...f.chips, step.chip] };
            break;
          case "cursor":
            f = { ...f, cursor: step.to, cursorVisible: true };
            break;
          case "click":
            f = { ...f, clicking: true };
            setFrame(f);
            await sleep(180);
            f = { ...f, clicking: false };
            break;
          case "lines": {
            const from = chipAt(step.from);
            const fresh = step.to.map((to, k) => ({ id: `${step.from}-${k}-${f.lines.length}`, from, to }));
            f = { ...f, lines: [...f.lines, ...fresh] };
            break;
          }
          case "drag": {
            // Cursor goes to the chip, grabs it, and both move to the target.
            f = { ...f, chips: [...f.chips, step.chip], cursor: step.chip.at, cursorVisible: true };
            setFrame(f);
            await sleep(600);
            if (cancelled.current) return;
            f = {
              ...f,
              dragging: step.chip.id,
              cursor: step.to,
              chips: f.chips.map((c) => (c.id === step.chip.id ? { ...c, at: step.to } : c)),
            };
            setFrame(f);
            await sleep(dur - 600);
            f = { ...f, dragging: null };
            setFrame(f);
            continue;
          }
          case "flip": {
            // The cursor goes to the corner, the card appears under it, and
            // both travel to the centre; the wiring stays on the stage behind.
            f = { ...f, cursor: CARD_CORNER, cursorVisible: true };
            setFrame(f);
            await sleep(650);
            if (cancelled.current) return;
            f = { ...f, stats: step.stats, cardAt: CARD_CORNER, cardDragging: true };
            setFrame(f);
            await sleep(300);
            if (cancelled.current) return;
            f = { ...f, cardAt: CARD_CENTER, cursor: CARD_CENTER };
            setFrame(f);
            await sleep(950);
            if (cancelled.current) return;
            f = { ...f, cardDragging: false, cursorVisible: false };
            setFrame(f);
            await sleep(Math.max(0, dur - 1900));
            continue;
          }
          case "wait":
            break;
        }
        setFrame(f);
        await sleep(dur);
      }

      if (cancelled.current) return;
      setFrame({ ...f, leaving: true });
      await sleep(450);
    }

    (async () => {
      while (!cancelled.current) {
        await playScene(sceneI);
        sceneI = (sceneI + 1) % HERO_SCENES.length;
      }
    })();

    return () => {
      cancelled.current = true;
    };
  }, [onScene, request]);

  const pct = (p: Pt) => ({ left: `${p[0]}%`, top: `${p[1]}%` });
  const px = (p: Pt): Pt => [(p[0] / 100) * size.w, (p[1] / 100) * size.h];

  return (
    <div
      ref={stageRef}
      aria-hidden
      className={cn(
        "relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10",
        "bg-[radial-gradient(120%_90%_at_30%_10%,rgba(59,130,246,0.22),rgba(15,23,42,0)_60%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]",
        "shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] transition-opacity duration-500",
        frame.leaving ? "opacity-0" : "opacity-100",
        className,
      )}
    >
      {/* Faint grid, like a canvas */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Lines drawn out to services, in pixels so they land exactly on the chips */}
      <svg
        className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", frame.stats ? "opacity-60" : "opacity-100")}
        viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
      >
        {size.w > 0 &&
          frame.lines.map((l) => {
            const [x1, y1] = px(l.from);
            const [x2, y2] = px(l.to.at);
            const mx = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            return (
              <g key={l.id}>
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="rgba(147,197,253,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: "hero-draw 700ms ease-out forwards" }}
                />
                {/* A bare end gets a dot; a labelled one gets the service chip below. */}
                {l.to.label ? null : (
                  <circle cx={x2} cy={y2} r="4" fill="#93c5fd" style={{ animation: "hero-fade 300ms 500ms ease-out both" }} />
                )}
              </g>
            );
          })}
      </svg>

      {/* The services at the end of the lines, popping in once the line gets there */}
      {frame.lines.map((l) =>
        l.to.label ? (
          <div
            key={`${l.id}-svc`}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap",
              "bg-slate-950/70 border-blue-300/25 text-blue-100 backdrop-blur transition-all duration-400",
              frame.stats ? "opacity-60" : "opacity-100",
            )}
            style={{ ...pct(l.to.at), animation: "hero-pop 380ms 520ms cubic-bezier(.22,1,.36,1) backwards" }}
          >
            {l.to.icon}
            {l.to.label}
          </div>
        ) : null,
      )}

      {/* Chips */}
      {frame.chips.map((c) => (
        <div
          key={c.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap",
            "bg-slate-900/80 border-white/15 text-white backdrop-blur",
            frame.dragging === c.id ? "scale-105 border-blue-300/60 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]" : "",
            frame.stats ? "opacity-60" : "opacity-100",
          )}
          style={{
            ...pct(c.at),
            transition: "left 900ms cubic-bezier(.22,1,.36,1), top 900ms cubic-bezier(.22,1,.36,1), opacity 400ms, transform 400ms",
            animation: "hero-pop 380ms cubic-bezier(.22,1,.36,1) backwards",
          }}
        >
          {c.icon}
          {c.label}
        </div>
      ))}

      {/* Result card, dragged in from the corner */}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 w-[78%] max-w-[360px] rounded-2xl border border-white/15 bg-white p-6 text-slate-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]",
          "transition-[left,top,scale,opacity] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
          frame.stats ? "opacity-100" : "opacity-0",
          frame.stats && frame.cardDragging ? "scale-[0.55]" : "scale-100",
        )}
        style={{ ...pct(frame.cardAt), pointerEvents: "none", transformOrigin: "center" }}
      >
        <div className="flex flex-col gap-4">
          {(frame.stats ?? []).map((s, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-semibold leading-none tracking-tight">{s.big}</p>
              <p className="mt-1.5 text-sm text-slate-500">{s.small[locale]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor */}
      <div
        className="absolute z-10"
        style={{
          ...pct(frame.cursor),
          opacity: frame.cursorVisible ? 1 : 0,
          transition: "left 650ms cubic-bezier(.22,1,.36,1), top 650ms cubic-bezier(.22,1,.36,1), opacity 300ms",
        }}
      >
        <span
          className={cn(
            "absolute -left-3 -top-3 size-6 rounded-full border-2 border-blue-300 transition-all duration-300",
            frame.clicking ? "scale-150 opacity-0" : "scale-50 opacity-0",
          )}
        />
        <svg width="22" height="22" viewBox="0 0 24 24" className={cn("drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-150", frame.clicking ? "scale-90" : "")}>
          <path d="M5 3l14 8-6 1.5L16 19l-2.5 1-3-6.5L6 18z" fill="#fff" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes hero-draw { to { stroke-dashoffset: 0; } }
        @keyframes hero-pop { from { opacity: 0; scale: 0.7; } to { opacity: 1; scale: 1; } }
        @keyframes hero-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
