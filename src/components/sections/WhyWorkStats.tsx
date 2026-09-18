"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/providers/LocaleProvider";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return value;
}

type CardProps = {
  value: number;
  suffix: string;
  desc: string;
  active: boolean;
  delay: number;
};

function StatCard({ value, suffix, desc, active, delay }: CardProps) {
  const count = useCounter(value, 1800, active);
  return (
    <div
      className="bg-slate-100 border border-slate-200 rounded-3xl p-5 md:p-7 flex flex-col justify-between h-[200px] md:h-[260px]"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <h3 className="text-slate-900 text-[44px] md:text-[64px] font-semibold tracking-tight leading-none">
        {count}
        <span className="text-blue-500">{suffix}</span>
      </h3>
      <p className="text-slate-600 text-sm md:text-base leading-snug">
        {desc}
      </p>
    </div>
  );
}

export function WhyWorkStats() {
  const t = useT();
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const items = t.whyWork.stats;

  return (
    <div ref={ref} className="w-full mt-20 md:mt-28">
      <div
        className="mb-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="text-slate-500 text-base md:text-xl font-medium">
          {t.whyWork.eyebrow}
        </p>
      </div>

      <h2
        className="text-slate-900 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-[900px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 100ms",
        }}
      >
        {t.whyWork.headline.lead}{" "}
        <span className="text-slate-400">{t.whyWork.headline.muted}</span>
        {t.whyWork.headline.tail}
      </h2>

      <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-stretch">
        {items.map((s, i) => (
          <StatCard
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            desc={s.label}
            active={visible}
            delay={250 + i * 120}
          />
        ))}
      </div>
    </div>
  );
}
