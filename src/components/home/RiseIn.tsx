"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lifts its content into place when it first scrolls into view. The content
 * itself never changes: the server HTML already holds the final value, and
 * without JavaScript, with reduced motion, or when it is already on screen at
 * load, nothing moves at all. Only transform is animated, never opacity, so
 * the text is always readable.
 */
export function RiseIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.transform = "translateY(0.35em)";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.style.transition = `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
        el.style.transform = "translateY(0)";
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
