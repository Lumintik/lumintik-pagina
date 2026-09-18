"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

type Landing = { tx: number; ty: number; scale: number } | null;

export function Splash() {
  const { isLoading } = useLocale();
  const [render, setRender] = useState(true);
  const [landing, setLanding] = useState<Landing>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);

  // When isLoading flips to false, measure the navbar logo target and start landing.
  useEffect(() => {
    if (isLoading) {
      setRender(true);
      setLanding(null);
      return;
    }

    const target = document.getElementById("navbar-logo");
    const wrap = logoWrapRef.current;
    if (!target || !wrap) {
      // Fallback to plain fade.
      const t = setTimeout(() => setRender(false), 900);
      return () => clearTimeout(t);
    }

    const from = wrap.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const fromCx = from.left + from.width / 2;
    const fromCy = from.top + from.height / 2;
    const toCx = to.left + to.width / 2;
    const toCy = to.top + to.height / 2;
    const scale = to.height / from.height;

    setLanding({ tx: toCx - fromCx, ty: toCy - fromCy, scale });

    const t = setTimeout(() => setRender(false), 1000);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (!render) return null;

  const exiting = !isLoading;
  const hasLanding = exiting && landing !== null;

  return (
    <div
      aria-hidden={exiting}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 450ms cubic-bezier(0.16,1,0.3,1) 400ms",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 50%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.05) 45%, rgba(255,255,255,0) 75%)",
          opacity: exiting ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1) 250ms",
        }}
      />
      <div
        ref={logoWrapRef}
        className="relative"
        style={{
          width: "min(22vw, 280px)",
          opacity: 1,
          transform: hasLanding
            ? `translate(${landing!.tx}px, ${landing!.ty}px) scale(${landing!.scale})`
            : "translate(0,0) scale(1)",
          transformOrigin: "center center",
          transition: hasLanding
            ? "transform 700ms cubic-bezier(0.65,0,0.35,1)"
            : "transform 0ms",
          animation: exiting ? "none" : "splash-breathe 2.6s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/lumintik-logo.png"
          alt="Lumintik"
          width={1600}
          height={1600}
          priority
          unoptimized
          sizes="(max-width: 768px) 50vw, 280px"
          className="w-full h-auto select-none"
          draggable={false}
          style={{ imageRendering: "auto" }}
        />
      </div>
      <style>{`
        @keyframes splash-breathe {
          0%, 100% { filter: drop-shadow(0 8px 24px rgba(59,130,246,0.18)); }
          50%      { filter: drop-shadow(0 12px 36px rgba(59,130,246,0.28)); }
        }
      `}</style>
    </div>
  );
}
