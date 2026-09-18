"use client";

import { useT } from "@/components/providers/LocaleProvider";

function Row({
  items,
  reverse = false,
  duration = 26,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="flex whitespace-nowrap"
      style={{
        width: "max-content",
        animation: `lumintik-tape ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {repeated.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-4 mr-10 text-white font-bold text-2xl md:text-4xl tracking-tight"
        >
          {item}
          <Sparkle />
        </span>
      ))}
    </div>
  );
}

function Sparkle() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0 text-white/90"
      aria-hidden
    >
      <path d="M12 0 L13.5 9 L22 10.5 L13.5 12.5 L12 24 L10.5 12.5 L2 10.5 L10.5 9 Z" />
    </svg>
  );
}

export function MarqueeTape() {
  const t = useT();

  return (
    <section
      id="marquee-tape"
      aria-hidden
      className="relative w-full overflow-hidden h-[260px] md:h-[420px] flex flex-col justify-center gap-6 md:gap-12 z-[2] bg-transparent"
    >
      <style>{`
        @keyframes lumintik-tape {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="relative overflow-hidden py-3 md:py-5 bg-blue-500 rotate-[6deg] scale-110">
        <Row items={t.tape} duration={26} />
      </div>

      <div className="relative overflow-hidden py-3 md:py-5 bg-blue-500 -rotate-[6deg] scale-110">
        <Row items={t.tape} duration={32} reverse />
      </div>
    </section>
  );
}
