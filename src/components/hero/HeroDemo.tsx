"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";
import { HERO_SCENES, type Chip, type Pt, type Stat, type Step } from "@/data/heroScenes";

type Line = { id: string; from: Pt; to: Pt };

type Frame = {
  chips: Chip[];
  lines: Line[];
  cursor: Pt;
  cursorVisible: boolean;
  clicking: boolean;
  dragging: string | null;
  stats: Stat[] | null;
  leaving: boolean;
};

const EMPTY: Frame = {
  chips: [],
  lines: [],
  cursor: [50, 90],
  cursorVisible: false,
  clicking: false,
  dragging: null,
  stats: null,
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

/**
 * Plays the hero scenes on a loop: chips appear, a cursor clicks and drags
 * them, lines draw out to services, and a card flips in with the result.
 * Reports the active scene so the text beside it can follow.
 */
export function HeroDemo({
  locale,
  onScene,
  className,
}: {
  locale: Locale;
  onScene?: (index: number) => void;
  className?: string;
}) {
  const [frame, setFrame] = useState<Frame>(EMPTY);
  const [sceneIndex, setSceneIndex] = useState(0);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sceneI = 0;

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, reduced ? Math.min(ms, 200) : ms));

    async function playScene(i: number) {
      const scene = HERO_SCENES[i];
      setSceneIndex(i);
      onScene?.(i);
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
          case "flip":
            f = { ...f, stats: step.stats, cursorVisible: false };
            break;
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
  }, [onScene]);

  const pct = (p: Pt) => ({ left: `${p[0]}%`, top: `${p[1]}%` });

  return (
    <div
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

      {/* Lines drawn out to services */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {frame.lines.map((l) => {
          const d = `M ${l.from[0]} ${l.from[1]} C ${(l.from[0] + l.to[0]) / 2} ${l.from[1]}, ${(l.from[0] + l.to[0]) / 2} ${l.to[1]}, ${l.to[0]} ${l.to[1]}`;
          return (
            <g key={l.id}>
              <path
                d={d}
                fill="none"
                stroke="rgba(147,197,253,0.9)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: "hero-draw 700ms ease-out forwards" }}
              />
              <circle cx={l.to[0]} cy={l.to[1]} r="1.1" fill="#93c5fd" style={{ animation: "hero-fade 300ms 500ms ease-out both" }} />
            </g>
          );
        })}
      </svg>

      {/* Chips */}
      {frame.chips.map((c) => (
        <div
          key={c.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap",
            "bg-slate-900/80 border-white/15 text-white backdrop-blur",
            frame.dragging === c.id ? "scale-105 border-blue-300/60 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]" : "",
            frame.stats ? "opacity-0 scale-90" : "opacity-100",
          )}
          style={{
            ...pct(c.at),
            transition: "left 900ms cubic-bezier(.22,1,.36,1), top 900ms cubic-bezier(.22,1,.36,1), opacity 400ms, transform 400ms",
            animation: "hero-pop 380ms cubic-bezier(.22,1,.36,1) both",
          }}
        >
          {c.icon}
          {c.label}
        </div>
      ))}

      {/* Result card */}
      <div
        className="absolute inset-0 flex items-center justify-center p-6 [perspective:1200px]"
        style={{ pointerEvents: "none" }}
      >
        <div
          className={cn(
            "w-[78%] max-w-[360px] rounded-2xl border border-white/15 bg-white p-6 text-slate-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 [transform-style:preserve-3d]",
            frame.stats ? "opacity-100 [transform:rotateY(0deg)]" : "opacity-0 [transform:rotateY(90deg)]",
          )}
        >
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-blue-500">
            {HERO_SCENES[sceneIndex]?.eyebrow[locale]}
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {(frame.stats ?? []).map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-semibold leading-none tracking-tight">{s.big}</p>
                <p className="mt-1.5 text-sm text-slate-500">{s.small[locale]}</p>
              </div>
            ))}
          </div>
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
        @keyframes hero-pop { from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes hero-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
