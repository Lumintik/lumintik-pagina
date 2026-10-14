"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { BrandTile, type BrandId } from "./brands";
import { EASE, inputClass } from "./ui";

/**
 * Menú desplegable propio. En el teléfono abre una hoja desde abajo con las
 * opciones grandes y fáciles de tocar; en el computador, una lista bajo el
 * campo. Con más de diez opciones (los bancos de PSE) trae buscador.
 */

export type SelectOption = {
  value: string;
  label: string;
  brand?: BrandId;
  /** Lo que se ve en el campo cerrado, si el texto completo no cabe. */
  short?: string;
  /** Logo como imagen suelta (los bancos de PSE). */
  image?: string;
  /** El logo es blanco: va sobre ficha negra con borde. */
  imageDark?: boolean;
};

/** Logo de un banco en ficha blanca del mismo tamaño para todos, nunca recortado. */
function LogoTile({ src, dark }: { src: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-8 w-16 shrink-0 items-center justify-center rounded-md px-1.5 py-1 ${dark ? "bg-black ring-1 ring-white" : "bg-white"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- logos de bancos, archivos estáticos */}
      <img
        src={src}
        alt=""
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

const noSubscribe = () => () => undefined;
const isPhone = () => window.matchMedia("(max-width: 639px)").matches;

export function Select({
  value,
  options,
  placeholder,
  onChange,
  invalid,
  disabled,
  title,
  searchLabel,
  closeLabel,
}: {
  value: string;
  options: SelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  /** Encabezado de la hoja en el teléfono. */
  title: string;
  searchLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const phone = useSyncExternalStore(noSubscribe, isPhone, () => false);
  const body = useSyncExternalStore(
    noSubscribe,
    () => document.body,
    () => null,
  );
  const current = options.find((o) => o.value === value);
  const searchable = options.length > 10;
  const shown = query
    ? options.filter((o) =>
        o.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options;

  // Clic afuera o Escape cierran la lista del computador.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (
        !phone &&
        root.current &&
        !root.current.contains(event.target as Node)
      )
        setOpen(false);
    };
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, phone]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    setQuery("");
  };

  // El buscador va fijo arriba, fuera de lo que se desplaza: así no se corta
  // su borde ni se pierde al bajar por la lista.
  const search = searchable ? (
    <input
      autoFocus={!phone}
      className={inputClass}
      placeholder={searchLabel}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  ) : null;

  const list = (
    <ul id={listId} role="listbox" className="flex flex-col gap-1">
      {shown.map((option) => {
        const on = option.value === value;
        return (
          <li key={option.value}>
            <button
              type="button"
              role="option"
              aria-selected={on}
              onClick={() => choose(option.value)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base transition ${
                on
                  ? "bg-white font-semibold text-black"
                  : "hover:bg-white/[0.08]"
              }`}
            >
              {option.brand ? <BrandTile id={option.brand} size="xs" /> : null}
              {option.image ? <LogoTile src={option.image} dark={option.imageDark} /> : null}
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {on ? <Check /> : null}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${inputClass} flex items-center gap-3 text-left disabled:opacity-50 ${invalid ? "ring-2" : ""}`}
      >
        {current?.brand ? <BrandTile id={current.brand} size="xs" /> : null}
        {current?.image ? <LogoTile src={current.image} dark={current.imageDark} /> : null}
        <span className="min-w-0 flex-1 truncate">
          {current ? (current.short ?? current.label) : placeholder}
        </span>
        <Chevron open={open} />
      </button>

      {/* Computador: lista bajo el campo. */}
      <AnimatePresence>
        {open && !phone ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute inset-x-0 top-full z-40 mt-2 flex max-h-96 flex-col rounded-2xl bg-black shadow-[0_24px_60px_rgba(0,0,0,0.9)] ring-1 ring-white"
          >
            {search ? <div className="p-2 pb-1">{search}</div> : null}
            <div className="min-h-0 flex-1 overflow-auto p-2">{list}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Teléfono: hoja desde abajo, sobre todo lo demás. */}
      {body
        ? createPortal(
            <AnimatePresence>
              {open && phone ? (
                <motion.div
                  className="fixed inset-0 z-[60]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    type="button"
                    aria-label={closeLabel}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                  />
                  <motion.div
                    role="dialog"
                    aria-label={title}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`absolute inset-x-0 bottom-0 flex flex-col rounded-t-[28px] ${searchable ? "h-[85dvh]" : "max-h-[80dvh]"} bg-black px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-white ring-1 ring-white`}
                  >
                    <span
                      aria-hidden
                      className="mx-auto block h-1 w-10 rounded-full bg-white"
                    />
                    <div className="mt-4 flex items-center justify-between px-1">
                      <p className="text-lg font-semibold">{title}</p>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-sm font-semibold underline underline-offset-4"
                      >
                        {closeLabel}
                      </button>
                    </div>
                    {search ? (
                      <div className="mt-4 px-0.5">{search}</div>
                    ) : null}
                    <div className="-mx-1 mt-3 min-h-0 flex-1 overflow-auto px-1 pb-1">
                      {list}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            body,
          )
        : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
