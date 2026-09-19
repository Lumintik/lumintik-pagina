"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/providers/LocaleProvider";
import Spline from "@splinetool/react-spline";

/**
 * The opening screen. It scrolls away like any other section: the text is
 * white on the dark gradient, and the accent word rotates on a timer rather
 * than being driven by the scroll position.
 */
export function Hero() {
  const t = useT();
  const [started, setStarted] = useState(false);
  const [accentIndex, setAccentIndex] = useState(0);

  const accents = t.hero.titleAccentRotations ?? [t.hero.titleAccent];

  // Word entrance on load. Switching language navigates to another URL, so
  // the page mounts again and the entrance plays again on its own.
  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Rotate the accent word every few seconds.
  useEffect(() => {
    if (accents.length < 2) return;
    const id = setInterval(() => {
      setAccentIndex((i) => (i + 1) % accents.length);
    }, 2800);
    return () => clearInterval(id);
  }, [accents.length]);

  return (
    <header
      id="hero"
      className="relative flex flex-col w-full min-h-screen px-6 md:px-20 pt-28 md:pt-32 pb-10 md:pb-6 overflow-hidden z-[2]"
    >
      <div className="relative flex flex-col flex-1 justify-between w-full max-w-[1880px] mx-auto pt-6 md:pt-6 xl:pt-16 pb-8 md:pb-12">
        <div className="xl:max-w-[60%] text-center xl:text-left">
          <span
            className="block uppercase tracking-[0.2em] text-xs md:text-sm font-medium mb-5 md:mb-6 text-blue-300"
            style={{
              opacity: started ? 1 : 0,
              transition: "opacity 0.6s ease 60ms",
            }}
          >
            {t.hero.eyebrow}
          </span>

          <h1 className="text-white text-[40px] leading-[1.05] md:text-7xl md:leading-[1.05] xl:text-[clamp(5rem,5.3vw,6.75rem)] xl:leading-[1.04] font-semibold tracking-tight text-balance">
            {t.hero.titleParts.map((text, i) => {
              const delay = i * 60;
              return (
                <span
                  key={text + i}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ verticalAlign: "bottom" }}
                >
                  <span
                    className="inline-block"
                    style={{
                      opacity: started ? 1 : 0,
                      transform: started ? "translateY(0)" : "translateY(100%)",
                      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                    }}
                  >
                    {text}&nbsp;
                  </span>
                </span>
              );
            })}
            <span className="text-blue-300">
              <span
                className="relative block xl:inline-block overflow-hidden align-bottom"
                style={{
                  verticalAlign: "bottom",
                  minWidth: `${Math.max(...accents.map((w) => w.length))}ch`,
                  height: "1.1em",
                }}
              >
                {accents.map((word, i) => {
                  const isActive = started && i === accentIndex;
                  const isPast = i < accentIndex;
                  let accentTransform = "translateY(110%)";
                  if (isActive) accentTransform = "translateY(0)";
                  else if (isPast) accentTransform = "translateY(-110%)";
                  return (
                    <span
                      key={word + i}
                      className="absolute inset-x-0 top-0 block whitespace-nowrap text-center xl:text-left"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: accentTransform,
                        transition:
                          "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </span>
          </h1>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          spline-viewer::part(logo) { display: none !important; }
          #logo { display: none !important; }
        `}} />
        <div
          className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8 mt-[300px] xl:mt-0 relative"
          style={{
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 1100ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 1100ms",
          }}
        >
          {/* Spline 3D scene anchored to the top of the description block so it pushes up on mobile */}
          <div
            className="absolute left-1/2 flex items-center justify-center -translate-x-[50%] bottom-[100%] xl:left-auto xl:-translate-x-0 xl:right-[-80px] xl:bottom-full w-[390px] h-[480px] md:w-[460px] md:h-[560px] xl:w-[clamp(730px,48vw,940px)] xl:h-[clamp(730px,48vw,940px)] mb-[-75px] xl:mb-[-100px] pointer-events-none z-0"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 70px), max(50%, calc(100% - 180px)) calc(100% - 70px), max(50%, calc(100% - 180px)) 100%, min(50%, 180px) 100%, min(50%, 180px) calc(100% - 70px), 0% calc(100% - 70px))"
            }}
          >
            {/* pointer-events-auto restores drag controls. scaleX(-1) mirrors the model. touch-none lets fingers orbit without scrolling the page. onWheelCapture stops zooming. */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none xl:pointer-events-auto xl:cursor-grab xl:active:cursor-grabbing xl:touch-none"
              style={{ transform: "scaleX(-1)" }}
              onWheelCapture={(e) => e.stopPropagation()}
            >
              <Spline scene="https://prod.spline.design/Hic65A1wo9S7zyNu/scene.splinecode?v=7" />
            </div>
          </div>

          <p className="text-slate-300 text-sm md:text-xl xl:text-[clamp(1.25rem,1.2vw,1.55rem)] leading-relaxed xl:max-w-[60%] z-10 relative pointer-events-auto">
            {t.hero.description.lead}{" "}
            <span className="font-medium text-white">{t.hero.description.matters}</span>
            . {t.hero.description.buildingWith}{" "}
            <a
              href="https://www.samsung.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:opacity-70 transition-opacity"
            >
              Samsung
            </a>
            ,{" "}
            <a
              href="https://www.claro.com.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:opacity-70 transition-opacity"
            >
              Claro
            </a>
            {" "}
            {t.hero.description.and}{" "}
            <a href="#work" className="text-blue-300 hover:opacity-70 transition-opacity">
              EZDocuAI
            </a>
            {"."}
          </p>

          <div className="flex flex-col items-start xl:items-end gap-2 xl:gap-4 relative w-full xl:w-auto">
            <div className="flex flex-wrap flex-col xl:flex-row items-center gap-3 z-10 w-full xl:w-auto">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-blue-300 transition-colors duration-300 w-full xl:w-auto"
              >
                {t.hero.startProject}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#services"
                className="hidden xl:inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300 w-full xl:w-auto"
              >
                {t.hero.howWeWork}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
