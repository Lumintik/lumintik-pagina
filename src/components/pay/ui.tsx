"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Piezas visuales de la página de pago. Blanco sobre negro, sin grises: la
 * jerarquía sale del tamaño, el peso y el espacio, nunca de un color apagado.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Monto que cae cifra por cifra, como un marcador mecánico. */
export function AmountRoll({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex overflow-hidden tabular-nums" aria-label={text}>
      {[...text].map((char, i) => {
        const digit = /\d/.test(char) ? Number(char) : null;
        if (digit === null || reduce) {
          return (
            <span key={i} aria-hidden>
              {char}
            </span>
          );
        }
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1em] leading-none" style={{ width: "0.62em" }}>
            <motion.span
              className="absolute left-0 top-0 flex flex-col"
              initial={{ y: "0em" }}
              animate={{ y: `${-digit}em` }}
              transition={{ duration: 1.4, delay: delay + i * 0.06, ease: EASE }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} className="block h-[1em] leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/** Entrada escalonada: sube y aparece. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Cambio de panel: el que sale se desenfoca, el que entra se enfoca. */
export function Panel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Anillo orbital con reloj de misión: lo que se ve mientras algo se procesa. */
export function Orbit({ steps, label }: { steps: string[]; label?: string }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 250);
    return () => clearInterval(timer);
  }, []);
  const step = steps[Math.min(Math.floor(seconds / 3), steps.length - 1)];

  return (
    <div className="flex flex-col items-center py-10 text-center" role="status" aria-live="polite">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        </svg>
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="4" r="2.5" fill="white" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="36 253" strokeLinecap="round" />
        </motion.svg>
        <motion.span
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-8 font-mono text-sm tabular-nums">
        T+{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          className="mt-2 text-xl font-medium"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {label ?? step}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** Marca de confirmación que se dibuja trazo a trazo. */
export function Seal({ tone }: { tone: "ok" | "fail" | "wait" }) {
  const path =
    tone === "ok" ? "M32 52 L45 64 L69 38" : tone === "fail" ? "M36 36 L64 64 M64 36 L36 64" : "M50 30 L50 52 L64 60";
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        initial={{ pathLength: 0, rotate: -90 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
      />
    </svg>
  );
}

/** Botón principal: blanco lleno, texto negro. Uno por pantalla. */
export function PrimaryButton({
  children,
  busy,
  disabled,
  type = "submit",
  onClick,
}: {
  children: React.ReactNode;
  busy?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || busy}
      whileTap={{ scale: 0.985 }}
      className="group relative mt-8 flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-white text-base font-semibold text-black transition-opacity disabled:opacity-50"
    >
      <span className="relative z-10 flex items-center gap-3">
        {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" /> : null}
        {children}
      </span>
      {/* Barrido de luz al pasar el cursor. */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-black/10 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
    </motion.button>
  );
}

export function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
    >
      {children}
    </button>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl bg-white/[0.06] px-4 text-base text-white outline-none ring-1 ring-white/20 transition placeholder:text-white/40 focus:bg-white/[0.09] focus:ring-2 focus:ring-white aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-white";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

/** Dato con botón de copiar, para llaves, cuentas y referencias. */
export function CopyRow({
  label,
  value,
  copyLabel,
  copiedLabel,
  mono,
  big,
}: {
  label: string;
  value: string;
  copyLabel: string;
  copiedLabel: string;
  mono?: boolean;
  big?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <div className="flex items-end justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className={`mt-1 break-all ${mono ? "font-mono" : ""} ${big ? "text-2xl font-semibold" : "text-lg"}`}>{value}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            // Sin permiso de portapapeles: el dato sigue a la vista.
          }
        }}
        className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/30 transition hover:bg-white hover:text-black"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "c" : "n"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {copied ? copiedLabel : copyLabel}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
