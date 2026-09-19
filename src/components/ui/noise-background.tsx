"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";

/*
 * Adapted from Aceternity's "Noise background": soft gradients wander behind
 * the content under a grain texture. The texture is served from public/hero.
 */

function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  gradientColor: string;
  opacity: number;
  multiplier: number;
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;
  return <motion.div className="absolute inset-0" style={{ opacity, background }} />;
}

type NoiseBackgroundProps = {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  noiseIntensity?: number;
  speed?: number;
  animating?: boolean;
};

export function NoiseBackground({
  children,
  className,
  containerClassName,
  gradientColors = ["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"],
  noiseIntensity = 0.2,
  speed = 0.1,
  animating = true,
}: NoiseBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);

  const velocity = useRef({ x: 0, y: 0 });
  const lastDirectionChange = useRef(0);

  const randomVelocity = () => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = speed * (0.5 + Math.random() * 0.5);
    return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude };
  };

  // Start from the centre.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);
  }, [x, y]);

  useAnimationFrame((time) => {
    const el = containerRef.current;
    if (!animating || !el) return;
    const { width: maxX, height: maxY } = el.getBoundingClientRect();

    if (time - lastDirectionChange.current > 1500 + Math.random() * 1500) {
      velocity.current = randomVelocity();
      lastDirectionChange.current = time;
    }

    const deltaTime = 16;
    let newX = x.get() + velocity.current.x * deltaTime;
    let newY = y.get() + velocity.current.y * deltaTime;

    // At an edge, pick a new direction and stay inside.
    const padding = 20;
    if (newX < padding || newX > maxX - padding || newY < padding || newY > maxY - padding) {
      velocity.current = randomVelocity();
      lastDirectionChange.current = time;
      newX = Math.max(padding, Math.min(maxX - padding, newX));
      newY = Math.max(padding, Math.min(maxY - padding, newY));
    }
    x.set(newX);
    y.set(newY);
  });

  return (
    <div
      ref={containerRef}
      className={cn("group relative overflow-hidden rounded-2xl bg-white/15 p-1.5 backdrop-blur-sm", containerClassName)}
      style={{ "--noise-opacity": noiseIntensity } as CSSProperties}
    >
      <GradientLayer springX={springX} springY={springY} gradientColor={gradientColors[0]} opacity={0.4} multiplier={1} />
      <GradientLayer springX={springX} springY={springY} gradientColor={gradientColors[1]} opacity={0.3} multiplier={0.7} />
      <GradientLayer springX={springX} springY={springY} gradientColor={gradientColors[2] || gradientColors[0]} opacity={0.25} multiplier={1.2} />

      {/* Top strip */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-80 blur-sm"
        style={{ background: `linear-gradient(to right, ${gradientColors.join(", ")})`, x: animating ? topGradientX : 0 }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[var(--noise-opacity)] [background-image:url(/hero/noise.png)] [background-size:128px_128px]"
        style={{ mixBlendMode: "overlay" }}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
