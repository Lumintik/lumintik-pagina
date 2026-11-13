"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { enviarCuestionario, type Respuestas } from "@/app/actions/cuestionario";
import { CLIENTE, PANTALLAS, type Campo } from "./preguntas";

const CLAVE = "lumintik-cuestionario-grupo-azul-v1";
const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOTAL = PANTALLAS.length;

type Estado = { paso: number; respuestas: Respuestas };

function leerGuardado(): Estado | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as Estado) : null;
  } catch {
    return null;
  }
}

function guardar(estado: Estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    /* sin almacenamiento disponible: el formulario sigue funcionando */
  }
}

function borrarGuardado() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    /* nada que borrar */
  }
}

const vacio = (v: string | string[] | undefined) => (Array.isArray(v) ? v.length === 0 : !v?.trim());

export function Cuestionario() {
  // paso -1 es la bienvenida; TOTAL es la pantalla de gracias
  const [paso, setPaso] = useState(-1);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorEnvio, setErrorEnvio] = useState("");
  const [retomado, setRetomado] = useState(false);
  const [enviando, iniciarEnvio] = useTransition();
  const trampa = useRef<HTMLInputElement>(null);
  const contenedor = useRef<HTMLDivElement>(null);

  // Recupera lo que la persona llevaba si cerró la pestaña a mitad de camino
  useEffect(() => {
    const g = leerGuardado();
    if (g && g.paso >= 0 && g.paso < TOTAL) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- se lee una sola vez al montar
      setRespuestas(g.respuestas);
      setRetomado(true);
    }
  }, []);

  useEffect(() => {
    if (paso >= 0 && paso < TOTAL) guardar({ paso, respuestas });
  }, [paso, respuestas]);

  // Lleva el foco al primer campo de cada pantalla
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const el = contenedor.current?.querySelector<HTMLElement>("input:not([type=hidden]), textarea, [role=radio], [role=checkbox], button[data-principal]");
    el?.focus({ preventScroll: true });
  }, [paso]);

  const pantalla = paso >= 0 && paso < TOTAL ? PANTALLAS[paso] : null;

  const poner = (id: string, v: string | string[]) => {
    setRespuestas((r) => ({ ...r, [id]: v }));
    setErrores((e) => {
      if (!e[id]) return e;
      const resto = { ...e };
      delete resto[id];
      return resto;
    });
  };

  const validar = useCallback((): boolean => {
    if (!pantalla) return true;
    const nuevos: Record<string, string> = {};
    for (const c of pantalla.campos) {
      const v = respuestas[c.id];
      if (c.requerido && vacio(v)) nuevos[c.id] = c.tipo === "unica" ? "Elige una opción" : "Este campo es necesario";
      else if (c.tipo === "correo" && v && !CORREO_RE.test(String(v).trim())) nuevos[c.id] = "Revisa el correo";
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  }, [pantalla, respuestas]);

  const enviar = useCallback(() => {
    setErrorEnvio("");
    iniciarEnvio(async () => {
      const r = await enviarCuestionario(respuestas, trampa.current?.value ?? "");
      if (r.ok) {
        borrarGuardado();
        setPaso(TOTAL);
        return;
      }
      if (r.codigo === "faltan_campos" || r.codigo === "correo_invalido") {
        const i = PANTALLAS.findIndex((p) => p.campos.some((c) => r.campos?.includes(c.id)));
        if (i >= 0) setPaso(i);
        setErrorEnvio("Falta completar algo en esta pantalla");
        return;
      }
      setErrorEnvio("No pudimos enviar tus respuestas. Quedan guardadas en este navegador, intenta de nuevo en un momento");
    });
  }, [respuestas]);

  const siguiente = useCallback(() => {
    if (enviando) return;
    if (paso === -1) {
      setPaso(retomado ? Math.max(0, leerGuardado()?.paso ?? 0) : 0);
      return;
    }
    if (!validar()) return;
    if (paso === TOTAL - 1) enviar();
    else setPaso((p) => p + 1);
  }, [enviando, paso, retomado, validar, enviar]);

  const anterior = () => {
    setErrores({});
    setErrorEnvio("");
    setPaso((p) => Math.max(0, p - 1));
  };

  // Enter avanza. En los párrafos, Shift + Enter hace un salto de línea
  const alTeclear = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    const destino = e.target as HTMLElement;
    if (destino.tagName === "TEXTAREA" && e.shiftKey) return;
    // En las opciones, el clic o la barra espaciadora eligen y Enter avanza, como en Typeform
    const esOpcion = destino.getAttribute("role") === "radio" || destino.getAttribute("role") === "checkbox";
    if (destino.tagName === "BUTTON" && !destino.dataset.principal && !esOpcion) return;
    e.preventDefault();
    siguiente();
  };

  const pct = paso < 0 ? 0 : Math.round((Math.min(paso, TOTAL) / TOTAL) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white" onKeyDown={alTeclear}>
      <Estrellas />

      <header className="relative z-10 mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 pt-6 sm:gap-8 sm:px-8 sm:pt-8">
        <Image id="navbar-logo" src="/lumintik-logo-white.png" alt="Lumintik" width={675} height={486} priority className="h-9 w-auto" />
        <div className="mx-auto w-full max-w-xs" aria-hidden={paso < 0 || paso >= TOTAL}>
          {paso >= 0 && paso < TOTAL ? (
            <div>
              <div className="h-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-center text-xs text-white/60">
                {paso + 1} de {TOTAL}
              </p>
            </div>
          ) : null}
        </div>
        <p className="hidden text-right text-sm font-medium text-white/70 sm:block">{CLIENTE}</p>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-7rem)] max-w-3xl flex-col justify-center px-5 pb-28 pt-10 sm:px-8">
        <input ref={trampa} type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

        <div key={paso} ref={contenedor} className="animate-[entra_.45s_cubic-bezier(.2,.7,.2,1)_both]">
          {paso === -1 ? (
            <Bienvenida retomado={retomado} alEmpezar={siguiente} />
          ) : paso >= TOTAL ? (
            <Gracias nombre={String(respuestas.nombre ?? "")} />
          ) : pantalla ? (
            <section aria-labelledby={`titulo-${pantalla.id}`}>
              <p className="text-sm font-medium text-white/60">
                {pantalla.numero ? `Pregunta ${pantalla.numero} de 10` : paso === 0 ? "Antes de empezar" : "Para terminar"}
              </p>
              <h1 id={`titulo-${pantalla.id}`} className="mt-3 text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
                {pantalla.titulo}
              </h1>
              {pantalla.bajada ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{pantalla.bajada}</p> : null}

              <div className="mt-10 grid gap-8">
                {pantalla.campos.map((c) => (
                  <CampoFormulario key={c.id} campo={c} valor={respuestas[c.id]} error={errores[c.id]} poner={(v) => poner(c.id, v)} unico={pantalla.campos.length === 1} />
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  data-principal="1"
                  onClick={siguiente}
                  disabled={enviando}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-black transition hover:bg-white/85 disabled:opacity-60"
                >
                  {paso === TOTAL - 1 ? (enviando ? "Enviando…" : "Enviar respuestas") : "Siguiente"}
                  <Flecha />
                </button>
                <span className="hidden text-sm text-white/50 sm:inline">o presiona Enter</span>
              </div>
              <p role="alert" className="mt-4 min-h-6 text-sm text-white">
                {errorEnvio}
              </p>
            </section>
          ) : null}
        </div>
      </main>

      {paso >= 0 && paso < TOTAL ? (
        <nav aria-label="Navegación del cuestionario" className="fixed bottom-6 right-5 z-20 flex gap-2 sm:right-8">
          <button
            type="button"
            onClick={anterior}
            disabled={paso === 0}
            aria-label="Pregunta anterior"
            className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-30"
          >
            <Flecha arriba />
          </button>
          <button
            type="button"
            onClick={siguiente}
            disabled={enviando}
            aria-label={paso === TOTAL - 1 ? "Enviar respuestas" : "Siguiente pregunta"}
            className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <Flecha abajo />
          </button>
        </nav>
      ) : null}

      <style>{`@keyframes entra { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}

function Bienvenida({ retomado, alEmpezar }: { retomado: boolean; alEmpezar: () => void }) {
  return (
    <section aria-labelledby="titulo-bienvenida">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/60">Cuestionario de marca</p>
      <h1 id="titulo-bienvenida" className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
        {CLIENTE}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
        Con lo que decidimos en la sesión del miércoles, estas 10 preguntas nos dan lo que falta para escribir el brief de marca y empezar los logos.
      </p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">
        Toma unos 15 minutos. Respondan cada uno por su cuenta. Lo que escriban se guarda en este navegador, así que pueden pausar y volver.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          data-principal="1"
          onClick={alEmpezar}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-black transition hover:bg-white/85"
        >
          {retomado ? "Continuar donde iba" : "Empezar"}
          <Flecha />
        </button>
        <span className="hidden text-sm text-white/50 sm:inline">o presiona Enter</span>
      </div>
    </section>
  );
}

function Gracias({ nombre }: { nombre: string }) {
  const primero = nombre.trim().split(/\s+/)[0];
  return (
    <section aria-labelledby="titulo-gracias" role="status">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/60">Respuestas enviadas</p>
      <h1 id="titulo-gracias" className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
        Gracias{primero ? `, ${primero}` : ""}.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
        Ya tenemos tus respuestas. Con ellas armamos el brief de marca y te lo compartimos para aprobarlo antes de diseñar.
      </p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">
        Si tienes fotos de la operación, la planta o el equipo, envíalas a david@lumintik.com. Puedes cerrar esta ventana.
      </p>
    </section>
  );
}

function CampoFormulario({
  campo,
  valor,
  error,
  poner,
  unico,
}: {
  campo: Campo;
  valor: string | string[] | undefined;
  error?: string;
  poner: (v: string | string[]) => void;
  unico: boolean;
}) {
  const idError = `${campo.id}-error`;
  const etiqueta = (
    <span className={unico ? "sr-only" : "mb-3 block text-base font-medium text-white/85"}>
      {campo.etiqueta}
      {campo.requerido && !unico ? <span className="text-white/50"> *</span> : null}
    </span>
  );
  const mensaje = (
    <p id={idError} className="mt-2 min-h-5 text-sm text-white" aria-live="polite">
      {error ?? ""}
    </p>
  );
  const base =
    "w-full rounded-2xl bg-white/[0.07] px-5 text-lg text-white placeholder:text-white/35 outline-none transition focus:bg-white/[0.11] focus:ring-2 focus:ring-white/70";

  if (campo.tipo === "texto" || campo.tipo === "correo") {
    return (
      <label className="block">
        {etiqueta}
        <input
          type={campo.tipo === "correo" ? "email" : "text"}
          inputMode={campo.tipo === "correo" ? "email" : undefined}
          autoComplete={campo.id === "nombre" ? "name" : campo.tipo === "correo" ? "email" : campo.id === "cargo" ? "organization-title" : "off"}
          value={String(valor ?? "")}
          onChange={(e) => poner(e.target.value)}
          placeholder={campo.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={idError}
          aria-required={campo.requerido}
          className={`${base} min-h-14`}
        />
        {mensaje}
      </label>
    );
  }

  if (campo.tipo === "parrafo") {
    return (
      <label className="block">
        {etiqueta}
        <textarea
          value={String(valor ?? "")}
          onChange={(e) => poner(e.target.value)}
          placeholder={campo.placeholder ?? "Escribe aquí tu respuesta"}
          rows={unico ? 5 : 3}
          aria-invalid={Boolean(error)}
          aria-describedby={`${idError} ${campo.id}-ayuda`}
          aria-required={campo.requerido}
          className={`${base} resize-y py-4 leading-relaxed`}
        />
        <span id={`${campo.id}-ayuda`} className="mt-2 hidden text-xs text-white/40 sm:block">
          Shift y Enter para un salto de línea
        </span>
        {mensaje}
      </label>
    );
  }

  const multiple = campo.tipo === "multiple";
  const actual = multiple ? (Array.isArray(valor) ? valor : []) : String(valor ?? "");
  const elegir = (v: string) => {
    if (multiple) {
      const lista = actual as string[];
      poner(lista.includes(v) ? lista.filter((x) => x !== v) : [...lista, v]);
    } else poner(v);
  };

  return (
    <fieldset aria-describedby={idError}>
      <legend className={unico ? "sr-only" : "mb-3 block text-base font-medium text-white/85"}>
        {campo.etiqueta}
        {campo.requerido && !unico ? <span className="text-white/50"> *</span> : null}
      </legend>
      <div role={multiple ? "group" : "radiogroup"} className="flex flex-wrap gap-2.5">
        {campo.opciones?.map((o, i) => {
          const marcado = multiple ? (actual as string[]).includes(o.valor) : actual === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              role={multiple ? "checkbox" : "radio"}
              aria-checked={marcado}
              onClick={() => elegir(o.valor)}
              className={`inline-flex min-h-12 items-center gap-3 rounded-full px-5 text-base font-medium transition ${
                marcado ? "bg-white text-black" : "bg-white/[0.07] text-white hover:bg-white/[0.14]"
              }`}
            >
              <span
                aria-hidden
                className={`grid size-6 place-items-center rounded-full text-xs font-semibold ${marcado ? "bg-black text-white" : "bg-white/15 text-white/80"}`}
              >
                {multiple && marcado ? "✓" : LETRAS[i]}
              </span>
              {o.etiqueta}
            </button>
          );
        })}
      </div>
      {mensaje}
    </fieldset>
  );
}

function Flecha({ arriba, abajo }: { arriba?: boolean; abajo?: boolean }) {
  const rot = arriba ? "-rotate-90" : abajo ? "rotate-90" : "";
  return (
    <svg viewBox="0 0 24 24" className={`size-5 ${rot}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Mismo campo de estrellas de la página de pagos, para que se sienta parte de Lumintik. */
function Estrellas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 animate-[deriva_60s_linear_infinite] opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle at center, white 0.6px, transparent 0.8px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-[-30%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      <style>{`@keyframes deriva { from { background-position: 0 0 } to { background-position: 0 -280px } }`}</style>
    </div>
  );
}
