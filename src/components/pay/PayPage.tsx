"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { checkAttempt, refreshLink } from "@/app/[locale]/pagar/[code]/actions";
import type { Locale } from "@/lib/locale";
import type { Attempt, Method, PublicLink } from "@/lib/pagos/types";
import { PAY_COPY, attemptTone, formatDate, formatMoney } from "./copy";
import { cleanupThreeDs, runThreeDs } from "./epayco";
import { Checkout, totalSteps } from "./checkout";
import { BrandRow, BrandTile, brandsForMethod, usedBrands } from "./brands";
import { DocumentCard } from "./document-card";
import { AmountRoll, CopyRow, EASE, GhostButton, Orbit, Panel, PrimaryButton, Rise, SHEET_ACTION_ID, Seal, StepHeader } from "./ui";

type View =
  | { kind: "summary" }
  | { kind: "choose"; error?: string }
  | { kind: "method"; method: Method }
  | { kind: "busy"; method: Method }
  | { kind: "attempt"; attempt: Attempt };

/** Por dónde arranca la página: lo pagado se muestra pagado, lo pendiente se retoma. */
function initialView(link: PublicLink, t: (typeof PAY_COPY)[Locale]): View {
  const last = link.last_attempt;
  if (link.status !== "pendiente") return { kind: "summary" };
  if (!last) return { kind: "summary" };
  if (last.status === "en_revision") return { kind: "attempt", attempt: last };
  if (last.status === "pendiente" && last.method !== "tarjeta") return { kind: "attempt", attempt: last };
  // Tarjeta retenida por el antifraude de ePayco: se muestra en revisión, para
  // que nadie pague dos veces al volver a abrir el link.
  if (last.status === "pendiente" && last.method === "tarjeta" && !last.three_ds) return { kind: "attempt", attempt: last };
  if (last.status === "rechazado" || last.status === "abandonado") {
    return { kind: "choose", error: friendly(last.message, t) || t.status.rejectedBody };
  }
  return { kind: "choose" };
}

export function PayPage({ link: initial, locale }: { link: PublicLink; locale: Locale }) {
  const t = PAY_COPY[locale];
  const [link, setLink] = useState(initial);
  const [view, setView] = useState<View>(() => initialView(initial, t));
  // Cuándo fue la última consulta del estado, para mostrarle a quien paga que
  // la página sigue viva mientras espera.
  const [lastCheck, setLastCheck] = useState<number | null>(null);
  const other: Locale = locale === "ES" ? "EN" : "ES";
  const otherHref = other === "EN" ? `/en/pay/${link.code}` : `/es/pagar/${link.code}`;
  const settled = useCallback((attempt: Attempt) => {
    setView({ kind: "attempt", attempt });
    if (attempt.status === "aprobado") {
      setLink((l) => ({ ...l, status: "pagado", paid_at: new Date().toISOString(), paid_method: attempt.method }));
    }
  }, []);

  // Tarjeta con 3D Secure: el banco verifica encima de la página y luego se
  // pregunta el estado real al servidor.
  const threeDsRan = useRef<string | null>(null);
  useEffect(() => {
    if (view.kind !== "attempt" || !view.attempt.three_ds || threeDsRan.current === view.attempt.id) return;
    const attempt = view.attempt;
    threeDsRan.current = attempt.id;
    setView({ kind: "busy", method: "tarjeta" });
    runThreeDs(JSON.parse(attempt.three_ds))
      .catch(() => "fail" as const)
      .then(async (outcome) => {
        if (outcome === "fail") cleanupThreeDs();
        const fresh = await checkAttempt(link.code, attempt.id);
        const next = fresh.ok && fresh.data ? { ...fresh.data, three_ds: "" } : { ...attempt, three_ds: "" };
        if (outcome === "fail" && next.status === "pendiente") {
          setView({ kind: "choose", error: t.errors.threeDs });
        } else {
          settled(next);
        }
      });
  }, [view, link.code, settled, t.errors.threeDs]);

  // Seguimiento: mientras el intento esté pendiente, se pregunta solo. Rápido
  // los primeros minutos, después cada quince segundos.
  useEffect(() => {
    if (view.kind !== "attempt" || view.attempt.three_ds) return;
    const { attempt } = view;
    if (attempt.status !== "pendiente" && attempt.status !== "iniciado" && attempt.status !== "en_revision") return;
    const started = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;
    const tick = async () => {
      const result = await checkAttempt(link.code, attempt.id);
      if (!alive) return;
      setLastCheck(Date.now());
      if (result.ok && result.data && result.data.status !== attempt.status) {
        settled(result.data);
        return;
      }
      timer = setTimeout(tick, Date.now() - started < 3 * 60_000 ? 4_000 : 15_000);
    };
    timer = setTimeout(tick, 3_000);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [view, link.code, settled]);

  // BreB: el aviso de Global66 puede llegar mientras el cliente sigue en las
  // instrucciones, sin haber tocado "Ya pagué". Se pregunta por el cobro y, si
  // ya quedó pagado, la página lo muestra sola.
  const onBreb = view.kind === "method" && view.method === "breb" && link.status === "pendiente";
  useEffect(() => {
    if (!onBreb) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = async () => {
      const fresh = await refreshLink(link.code);
      if (!alive) return;
      if (fresh && fresh.status !== "pendiente") {
        setLink(fresh);
        return;
      }
      timer = setTimeout(tick, 5_000);
    };
    timer = setTimeout(tick, 5_000);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [onBreb, link.code]);

  // Una pantalla a la vez, como un formulario de Typeform: al cambiar de paso
  // se vuelve arriba.
  const viewKey = view.kind === "method" ? `method-${view.method}` : view.kind;
  const firstView = useRef(true);
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [viewKey]);

  const onAttempt = (attempt: Attempt) => settled(attempt);
  // Paso actual dentro del pago (lo informa Checkout) para el indicador de arriba.
  const [progress, setProgress] = useState({ step: 3, label: "" });
  const onProgress = useCallback((step: number, label: string) => setProgress({ step, label }), []);
  const activeMethod = view.kind === "method" || view.kind === "busy" ? view.method : null;
  const stepNow =
    view.kind === "summary"
      ? { step: 1, label: t.flow.steps.summary }
      : view.kind === "choose"
        ? { step: 2, label: t.flow.steps.method }
        : progress;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white">
      <Starfield />

      <header className="relative z-10 mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 pt-6 sm:gap-8 sm:px-6 sm:pt-8">
        <Link href={locale === "ES" ? "/es" : "/en"} aria-label="Lumintik">
          <Image
            id="navbar-logo"
            src="/lumintik-logo-white.png"
            alt="Lumintik"
            width={675}
            height={486}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <div className="mx-auto w-full max-w-xs">
          {link.status === "pendiente" && view.kind !== "attempt" ? (
            <Stepper step={stepNow.step} total={totalSteps(activeMethod)} label={stepNow.label} />
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {link.epayco_test ? (
            <span className="hidden rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/40 sm:inline">TEST</span>
          ) : null}
          <Link
            href={otherHref}
            className="rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-white/30 transition hover:bg-white hover:text-black"
          >
            {other}
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-64 pt-10 sm:px-6 sm:pt-16">
        <section
          aria-live="polite"
          className={`min-w-0 ${view.kind === "summary" && link.status === "pendiente" ? "" : "max-w-2xl"}`}
        >
          <Panel id={panelKey(link, view)}>
            <ActionPanel
              link={link}
              locale={locale}
              view={view}
              lastCheck={lastCheck}
              t={t}
              setView={setView}
              onAttempt={onAttempt}
              onProgress={onProgress}
            />
          </Panel>
        </section>
      </main>

      {link.status === "pendiente" ? <PaySheet link={link} locale={locale} t={t} /> : null}
    </div>
  );
}

/**
 * Hoja fija de abajo: el total con su desglose y el único botón de la
 * pantalla. Siempre a la vista, en el teléfono y en el computador.
 */
function PaySheet({ link, locale, t }: { link: PublicLink; locale: Locale; t: (typeof PAY_COPY)[Locale] }) {
  const [open, setOpen] = useState(false);
  const money = (value: string) => `${formatMoney(value, link.currency, locale)} ${link.currency}`;
  // El porcentaje del IVA sale de la factura misma: 2.090.000 sobre 11.000.000 es 19 %.
  const rate = link.subtotal && Number(link.subtotal) > 0 ? (Number(link.tax || 0) / Number(link.subtotal)) * 100 : 0;
  const rateLabel = rate > 0 ? ` ${Number.isInteger(Math.round(rate * 10) / 10) ? Math.round(rate) : rate.toFixed(1)} %` : "";
  const rows: [string, string][] = link.subtotal
    ? [
        [t.sheet.subtotal, money(link.subtotal)],
        [`${t.sheet.tax}${rateLabel}`, money(link.tax || "0")],
        ...(link.withholding && Number(link.withholding) > 0
          ? ([[t.sheet.withholding, money(link.withholding)]] as [string, string][])
          : []),
      ]
    : [];

  return (
    <motion.div
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-30"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <div className="rounded-t-[28px] bg-black/85 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-30px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:px-6">
          <span aria-hidden className="mx-auto block h-1 w-10 rounded-full bg-white" />
          <AnimatePresence initial={false}>
            {open && rows.length ? (
              <motion.dl
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 overflow-hidden pt-4 text-sm"
              >
                {rows.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="font-semibold">{label}</dt>
                    <dd className="text-right tabular-nums">{value}</dd>
                  </div>
                ))}
              </motion.dl>
            ) : null}
          </AnimatePresence>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex min-w-0 flex-1 items-end justify-between gap-4 sm:justify-start">
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t.sheet.total}</p>
                <p className="mt-1 flex items-baseline gap-2 tabular-nums">
                  <span className="text-3xl font-light">
                    <AmountRoll text={formatMoney(link.amount, link.currency, locale)} delay={2.4} />
                  </span>
                  <span className="text-sm font-semibold">{link.currency}</span>
                </p>
              </div>
              {rows.length ? (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="shrink-0 text-sm font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {open ? t.sheet.hide : t.sheet.details}
                </button>
              ) : null}
            </div>
            <div id={SHEET_ACTION_ID} className="w-full sm:w-[24rem]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function panelKey(link: PublicLink, view: View) {
  if (link.status !== "pendiente") return `link-${link.status}`;
  if (view.kind === "attempt") return `attempt-${view.attempt.id}-${view.attempt.status}`;
  if (view.kind === "method" || view.kind === "busy") return `${view.kind}-${view.method}`;
  return view.kind;
}

function ActionPanel({
  link,
  locale,
  view,
  t,
  setView,
  onAttempt,
  onProgress,
  lastCheck,
}: {
  link: PublicLink;
  locale: Locale;
  view: View;
  lastCheck: number | null;
  t: (typeof PAY_COPY)[Locale];
  setView: (v: View) => void;
  onAttempt: (a: Attempt) => void;
  onProgress: (step: number, label: string) => void;
}) {
  if (link.status === "pagado") {
    return (
      <Outcome tone="ok" title={t.status.paid} body={t.status.paidBody}>
        <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-base">
          <dt className="font-semibold">{t.status.receipt}</dt>
          <dd className="tabular-nums">{link.reference}</dd>
          {link.paid_method ? (
            <>
              <dt className="font-semibold">{t.status.method}</dt>
              <dd className="flex flex-wrap items-center gap-3">
                {t.methods[link.paid_method].name}
                <BrandRow
                  ids={usedBrands(
                    link.paid_method,
                    link.last_attempt?.method === link.paid_method ? link.last_attempt : null,
                  )}
                />
              </dd>
            </>
          ) : null}
          {link.paid_at ? (
            <>
              <dt className="font-semibold">{t.status.date}</dt>
              <dd>{formatDate(link.paid_at, locale, true)}</dd>
            </>
          ) : null}
        </dl>
      </Outcome>
    );
  }
  if (link.status === "anulado") return <Outcome tone="fail" title={t.status.cancelled} body={t.status.cancelledBody} />;
  if (link.status === "vencido") return <Outcome tone="wait" title={t.status.expired} body={t.status.expiredBody} />;

  if (view.kind === "summary") {
    return <SummaryStep link={link} locale={locale} t={t} onContinue={() => setView({ kind: "choose" })} />;
  }

  if (view.kind === "busy") return <Orbit steps={t.sequence} />;

  if (view.kind === "attempt") {
    const a = view.attempt;
    const tone = attemptTone(a.status);
    // BreB se confirma solo con el aviso de Global66: se espera en vivo. La
    // transferencia a Davivienda la confirma una persona y puede tardar más.
    if (a.status === "en_revision" && a.method === "breb") {
      return <Waiting attempt={a} t={t} locale={locale} lastCheck={lastCheck} />;
    }
    if (a.status === "en_revision") return <Outcome tone="wait" title={t.status.review} body={t.status.reviewBody} />;
    if (tone === "fail") {
      return (
        <Outcome tone="fail" title={t.status.rejected} body={friendly(a.message, t) || t.status.rejectedBody}>
          <PrimaryButton type="button" onClick={() => setView({ kind: "choose" })}>
            {t.status.retry}
          </PrimaryButton>
        </Outcome>
      );
    }
    if (a.method === "efectivo" && a.cash_code) {
      return (
        <div>
          <p className="text-2xl font-semibold">{a.cash_entity}</p>
          <div className="mt-6">
            <CopyRow label={t.cash.agreement} value={a.cash_agreement} mono big copyLabel={t.copy} copiedLabel={t.copied} />
            <CopyRow label={t.cash.code} value={a.cash_code} mono big copyLabel={t.copy} copiedLabel={t.copied} />
            <CopyRow label={t.breb.amount} value={link.amount} mono copyLabel={t.copy} copiedLabel={t.copied} />
          </div>
          {a.cash_expires_at ? (
            <p className="mt-6 text-base">
              <span className="font-semibold">{t.cash.until}</span> {formatDate(a.cash_expires_at, locale, true)}
            </p>
          ) : null}
          <p className="mt-6 text-base">{t.cash.note}</p>
          <div className="mt-8">
            <GhostButton onClick={() => setView({ kind: "choose" })}>{t.back}</GhostButton>
          </div>
        </div>
      );
    }
    // Pendiente: una tarjeta sin 3D Secure quedó en la revisión antifraude de
    // ePayco; PSE y Daviplata esperan al banco. Puede tardar minutos u horas, y
    // la página lo cuenta en vivo para que nadie crea que se trabó ni pague dos veces.
    return <Waiting attempt={a} t={t} locale={locale} lastCheck={lastCheck} />;
  }

  if (view.kind === "method") {
    return (
      <div>
        <Checkout
          link={link}
          locale={locale}
          t={t}
          method={view.method}
          onAttempt={onAttempt}
          onChangeMethod={() => setView({ kind: "choose" })}
          onProgress={onProgress}
        />
        <SecureNote
          t={t}
          test={link.epayco_test}
          card={view.method === "tarjeta"}
          direct={view.method === "breb" || view.method === "transferencia"}
        />
      </div>
    );
  }

  return (
    <ChooseMethod
      link={link}
      t={t}
      error={view.error}
      onBack={() => setView({ kind: "summary" })}
      onContinue={(method) => setView({ kind: "method", method })}
    />
  );
}

/**
 * Elegir medio es marcarlo; continuar es el botón de la hoja fija de abajo.
 * Todo cobro muestra todos los medios disponibles.
 */
function ChooseMethod({
  link,
  t,
  error,
  onBack,
  onContinue,
}: {
  link: PublicLink;
  t: (typeof PAY_COPY)[Locale];
  error?: string;
  onBack: () => void;
  onContinue: (method: Method) => void;
}) {
  const [picked, setPicked] = useState<Method | null>(null);
  useEnter(() => picked && onContinue(picked));
  return (
    <div>
      <StepHeader title={t.chooseMethod} backLabel={t.previous} onBack={onBack} />
      {error ? (
        <p role="alert" className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
          {error}
        </p>
      ) : null}
      <ul className="space-y-1.5" role="radiogroup" aria-label={t.chooseMethod}>
        {link.methods.map((method, i) => {
          const on = picked === method;
          return (
            <motion.li
              key={method}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
            >
              <button
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPicked(method)}
                onDoubleClick={() => onContinue(method)}
                className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left ring-1 transition focus-visible:outline-none ${
                  on ? "bg-white/[0.08] ring-white" : "ring-transparent hover:bg-white/[0.05] focus-visible:ring-white"
                }`}
              >
                <span className="text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-lg font-semibold">{t.methods[method].name}</span>
                    <BrandRow ids={brandsForMethod(method, link.transfer?.bank)} size="xs" />
                  </span>
                  <span className="mt-0.5 block text-sm">
                    {method === "transferencia" ? t.transferTo(link.transfer?.bank ?? "") : t.methods[method].hint}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-2 ring-white transition ${on ? "bg-white" : ""}`}
                >
                  <AnimatePresence>
                    {on ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="h-2.5 w-2.5 rounded-full bg-black"
                      />
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
      <PrimaryButton type="button" disabled={!picked} onClick={() => picked && onContinue(picked)}>
        {picked ? `${t.sheet.continueWith} ${t.methods[picked].name}` : t.sheet.pick}
      </PrimaryButton>
    </div>
  );
}

/** Enter avanza, como en Typeform, salvo que el foco esté en un control. */
function useEnter(action: () => void) {
  const ref = useRef(action);
  useEffect(() => {
    ref.current = action;
  });
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|SELECT|TEXTAREA|BUTTON|A)$/.test(target.tagName)) return;
      ref.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Paso 1: qué se paga, a quién, por cuánto, con la factura y lo entregado a la vista. */
function SummaryStep({
  link,
  locale,
  t,
  onContinue,
}: {
  link: PublicLink;
  locale: Locale;
  t: (typeof PAY_COPY)[Locale];
  onContinue: () => void;
}) {
  useEnter(onContinue);
  const concept = locale === "EN" && link.concept_en ? link.concept_en : link.concept;
  const description = locale === "EN" && link.description_en ? link.description_en : link.description;
  const base = `/${locale === "EN" ? "pay" : "pagar"}/${link.code}`;
  const visuals = link.has_image || link.invoice_filename;
  return (
    <div className={visuals ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16" : ""}>
      <div className="min-w-0">
        <Rise delay={1.6}>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{concept}</h1>
        </Rise>
        {description ? (
          <Rise delay={1.7}>
            <p className="mt-4 text-lg leading-relaxed">{description}</p>
          </Rise>
        ) : null}
        <Rise delay={2}>
          <dl className="mt-8 grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-3 text-base">
            {link.client_name ? (
              <>
                <dt className="font-semibold">{t.for}</dt>
                <dd>{link.client_name}</dd>
              </>
            ) : null}
            <dt className="font-semibold">{t.reference}</dt>
            <dd className="tabular-nums">{link.reference}</dd>
            {link.invoice_number ? (
              <>
                <dt className="font-semibold">{t.invoice}</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  {link.invoice_number}
                  {link.invoice_filename ? (
                    <a
                      href={`${base}/factura`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-black transition hover:bg-black hover:text-white hover:ring-1 hover:ring-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t.download}
                    </a>
                  ) : null}
                </dd>
              </>
            ) : null}
            {link.expires_at && link.status === "pendiente" ? (
              <>
                <dt className="font-semibold">{t.expires}</dt>
                <dd>{formatDate(link.expires_at, locale)}</dd>
              </>
            ) : null}
          </dl>
        </Rise>
        <Rise delay={2.2} className="hidden lg:block">
          <SecureNote t={t} test={link.epayco_test} card={link.methods.includes("tarjeta")} />
        </Rise>
      </div>

      {visuals ? (
        <div className="flex min-w-0 flex-col gap-6">
          {link.has_image ? (
            <Rise delay={1.9}>
              <figure>
                <div className="overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white">
                  {/* eslint-disable-next-line @next/next/no-img-element -- imagen dinámica del cobro */}
                  <img src={`${base}/imagen`} alt={t.photo} className="h-auto max-h-80 w-full object-contain" />
                </div>
                <figcaption className="mt-3 text-sm font-semibold">{t.photo}</figcaption>
              </figure>
            </Rise>
          ) : null}
          {link.invoice_filename ? (
            <Rise delay={2.05}>
              <DocumentCard
                href={`${base}/factura`}
                thumbnail={`${base}/factura-miniatura`}
                title={`${t.invoiceCard.title} ${link.invoice_number}`.trim()}
                subtitle={link.invoice_filename}
                action={t.invoiceCard.action}
                preview={t.invoiceCard.preview}
              />
            </Rise>
          ) : null}
        </div>
      ) : null}

      <div className="lg:hidden">
        <SecureNote t={t} test={link.epayco_test} card={link.methods.includes("tarjeta")} />
      </div>
      <PrimaryButton type="button" onClick={onContinue}>
        {t.review} →
      </PrimaryButton>
    </div>
  );
}

/** Indicador de pasos en el encabezado: el paso y su nombre centrados, y una barra por paso. */
function Stepper({ step, total, label }: { step: number; total: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="flex items-baseline gap-2 whitespace-nowrap text-xs sm:text-sm">
        <span className="tabular-nums">
          {step}/{total}
        </span>
        <span className="font-semibold">{label}</span>
      </p>
      <div className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="relative h-1 overflow-hidden rounded-full bg-white/20">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              initial={false}
              animate={{ width: i < step ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Cada cuánto cambia el mensaje de calma, en minutos de espera. */
const WAIT_STAGES = [2, 10];

function elapsedText(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  if (h) return `${h} h ${m} min`;
  if (m) return `${m} min ${sec} s`;
  return `${sec} s`;
}

/** Espera de un pago pendiente: qué pasa, que no se pague de nuevo y que la página sigue viva. */
function Waiting({
  attempt,
  t,
  locale,
  lastCheck,
}: {
  attempt: Attempt;
  t: (typeof PAY_COPY)[Locale];
  locale: Locale;
  lastCheck: number | null;
}) {
  const [mounted] = useState(() => Date.now());
  const [now, setNow] = useState(mounted);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const w = t.waiting;
  const kind = attempt.method === "tarjeta" ? w.card : attempt.method === "breb" ? w.breb : w.bank;
  const started = attempt.created_at ? Math.min(Date.parse(attempt.created_at), mounted) : mounted;
  const elapsed = Math.max(0, now - started);
  const stage = WAIT_STAGES.filter((minutes) => elapsed >= minutes * 60_000).length;
  const sentAt = new Date(started).toLocaleTimeString(locale === "ES" ? "es-CO" : "en-US", {
    timeZone: "America/Bogota",
    hour: "numeric",
    minute: "2-digit",
  });

  const steps: { label: string; detail?: string; state: "done" | "now" | "next" }[] = [
    { label: kind.sent, detail: sentAt, state: "done" },
    { label: kind.check, detail: w.since(elapsedText(elapsed)), state: "now" },
    { label: w.receipt, state: "next" },
  ];

  return (
    <div className="flex flex-col items-start">
      <Seal tone="wait" />
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">{kind.title}</h2>
      <p className="mt-3 text-lg leading-relaxed">{kind.body}</p>

      <div className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-black">
        <p className="text-base font-semibold">{w.dontRetry}</p>
        <p className="mt-1 text-sm leading-relaxed">{kind.dontRetryBody}</p>
      </div>

      <ol className="mt-10 grid gap-6">
        {steps.map((step) => (
          <li key={step.label} className="flex items-start gap-4">
            <StepMark state={step.state} />
            <div>
              <p className={`text-base ${step.state === "now" ? "font-semibold" : ""}`}>{step.label}</p>
              {step.detail ? (
                <p className="mt-0.5 text-sm tabular-nums" suppressHydrationWarning>
                  {step.detail}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          role="status"
          aria-live="polite"
          className="mt-10 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {kind.stages[Math.min(stage, kind.stages.length - 1)]}
        </motion.p>
      </AnimatePresence>

      <p className="mt-4 flex items-center gap-2.5 text-sm tabular-nums" suppressHydrationWarning>
        <motion.span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full bg-white"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {lastCheck ? w.lastCheck(Math.max(0, Math.floor((now - lastCheck) / 1000))) : w.checking}
      </p>

      <p className="mt-10 text-base leading-relaxed">{w.close}</p>
      <p className="mt-4 text-base">
        {w.help}{" "}
        <a href="mailto:hello@lumintik.com" className="font-semibold underline underline-offset-4">
          hello@lumintik.com
        </a>
      </p>
    </div>
  );
}

/** Marca de cada paso de la espera: hecho, en curso (con pulso) o por venir. */
function StepMark({ state }: { state: "done" | "now" | "next" }) {
  if (state === "done") {
    return (
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
          <path d="M6 12.5 L10 16.5 L18 8" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (state === "now") {
    return (
      <span className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-white" aria-hidden>
        <motion.span
          className="absolute inset-0 rounded-full ring-1 ring-white"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="h-2 w-2 rounded-full bg-white" />
      </span>
    );
  }
  return <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full ring-1 ring-white/40" aria-hidden />;
}

function Outcome({
  tone,
  title,
  body,
  children,
}: {
  tone: "ok" | "fail" | "wait";
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start">
      <Seal tone={tone} />
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-lg leading-relaxed">{body}</p>
      <div className="w-full">{children}</div>
    </div>
  );
}

function SecureNote({
  t,
  test,
  card,
  direct = false,
}: {
  t: (typeof PAY_COPY)[Locale];
  test: boolean;
  card: boolean;
  /** BreB y transferencia: el dinero va directo a la cuenta, sin ePayco. */
  direct?: boolean;
}) {
  return (
    <div className="mt-12 flex max-w-md items-start gap-3 text-sm leading-relaxed">
      <LockIcon />
      <div>
        <p>
          {direct ? t.secureDirect : card ? t.secure : t.secureNoCard}
          {test && !direct ? ` ${t.testMode}` : ""}
        </p>
        {direct ? null : (
          <span className="mt-3 flex items-center gap-2">
            <BrandTile id="epayco" size="md" />
            <BrandTile id="pci" size="md" />
            <span className="sr-only">{t.pci}</span>
          </span>
        )}
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** Campo de puntos que se desplaza despacio, con el centro más visible. */
function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 animate-[pay-drift_60s_linear_infinite] opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle at center, white 0.6px, transparent 0.8px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-[-30%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      <style>{`@keyframes pay-drift { from { background-position: 0 0 } to { background-position: 0 -280px } }`}</style>
    </div>
  );
}

/** Los mensajes de ePayco que tienen arreglo, dichos para el cliente. */
function friendly(message: string, t: (typeof PAY_COPY)[Locale]): string {
  if (/monto\s+m[ií]nimo/i.test(message)) return t.errors.minimum;
  return message;
}
