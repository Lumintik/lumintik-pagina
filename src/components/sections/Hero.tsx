"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { HeroDemo } from "@/components/hero/HeroDemo";
import { NoiseBackground } from "@/components/ui/noise-background";
import { HERO_SCENES } from "@/data/heroScenes";
import { cn } from "@/lib/cn";

/**
 * The opening screen. On the right, a product demo plays on a loop (a cursor
 * wiring tools together until a result card flips in); on the left, the title
 * and the line follow whichever scene is playing.
 */
export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  // The rail fills over the scene's length; a new run key restarts the fill.
  const [progress, setProgress] = useState<{ index: number; duration: number; run: number }>({ index: 0, duration: 0, run: 0 });
  const [request, setRequest] = useState<{ index: number; nonce: number }>();
  const scene = HERO_SCENES[sceneIndex];

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Crossfade the text when the demo moves to the next scene.
  const onScene = useCallback((i: number, duration: number) => {
    setProgress((p) => ({ index: i, duration, run: p.run + 1 }));
    setTextVisible(false);
    setTimeout(() => {
      setSceneIndex(i);
      setTextVisible(true);
    }, 260);
  }, []);

  const goTo = (i: number) => setRequest((r) => ({ index: i, nonce: (r?.nonce ?? 0) + 1 }));

  const reveal = (delay: number) => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <header
      id="hero"
      className="relative flex flex-col justify-center w-full min-h-screen px-6 md:px-12 xl:px-20 pt-28 md:pt-32 pb-14 overflow-hidden z-[2]"
    >
      {/* The rail: one stop per scene, the active one filling as it plays. */}
      <nav aria-label={t.hero.rail} className="w-full max-w-[1600px] mx-auto mb-10 md:mb-14" style={reveal(200)}>
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
          {HERO_SCENES.map((sc, i) => {
            const active = i === progress.index;
            return (
              <li key={sc.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "group w-full text-left transition-colors duration-300",
                    active ? "text-white" : "text-slate-500 hover:text-slate-300",
                  )}
                >
                  <span className="block h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
                    {active ? (
                      <span
                        key={progress.run}
                        className="block h-full rounded-full bg-blue-300 hero-rail-fill"
                        style={{ animationDuration: `${progress.duration}ms` }}
                      />
                    ) : null}
                  </span>
                  <span className="mt-3 block text-xs md:text-sm font-medium">{sc.eyebrow[locale]}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid w-full max-w-[1600px] mx-auto gap-12 xl:grid-cols-[1.05fr_1fr] xl:gap-16 items-center">
        {/* Text: the scene's eyebrow, title and line */}
        <div className="text-center xl:text-left">

          <div
            style={{
              opacity: started && textVisible ? 1 : 0,
              transform: started && textVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <h1 className="text-white text-[40px] leading-[1.05] md:text-6xl md:leading-[1.05] xl:text-[clamp(3.75rem,4.6vw,5.5rem)] xl:leading-[1.04] font-semibold tracking-tight text-balance max-w-[14ch] mx-auto xl:mx-0">
              {scene.title[locale]}
            </h1>
            <p className="mt-6 text-slate-300 text-base md:text-xl leading-relaxed max-w-[46ch] mx-auto xl:mx-0">
              {scene.line[locale]}
            </p>
          </div>

          <p
            className="mt-10 text-slate-400 text-sm md:text-base leading-relaxed max-w-[52ch] mx-auto xl:mx-0"
            style={reveal(400)}
          >
            {t.hero.description.lead}{" "}
            <span className="font-medium text-white">{t.hero.description.matters}</span>
            . {t.hero.description.buildingWith}{" "}
            <a href="https://www.samsung.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:opacity-70 transition-opacity">
              Samsung
            </a>
            ,{" "}
            <a href="https://www.claro.com.co/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:opacity-70 transition-opacity">
              Claro
            </a>{" "}
            {t.hero.description.and}{" "}
            <a href="#work" className="text-blue-300 hover:opacity-70 transition-opacity">
              EZDocuAI
            </a>
            {"."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center xl:items-start gap-3 justify-center xl:justify-start" style={reveal(520)}>
            <NoiseBackground
              containerClassName="w-full sm:w-fit rounded-full p-1.5"
              gradientColors={["rgb(147, 197, 253)", "rgb(59, 130, 246)", "rgb(255, 255, 255)"]}
              noiseIntensity={0.25}
            >
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-100 via-slate-100 to-white px-6 py-3 text-sm font-medium text-slate-900 shadow-[0px_2px_0px_0px_#ffffff_inset,0px_0.5px_1px_0px_#94a3b8] transition-all duration-100 active:scale-[0.98]"
              >
                {t.hero.startProject}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </NoiseBackground>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto"
            >
              {t.hero.howWeWork}
            </a>
          </div>
        </div>

        {/* The demo */}
        <div className="w-full max-w-[560px] mx-auto xl:max-w-none" style={reveal(300)}>
          <HeroDemo locale={locale} onScene={onScene} request={request} />
        </div>
      </div>

      <style>{`
        @keyframes hero-rail { from { width: 0; } to { width: 100%; } }
        .hero-rail-fill { animation: hero-rail linear forwards; }
      `}</style>
    </header>
  );
}
