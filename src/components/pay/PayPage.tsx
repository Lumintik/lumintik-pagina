"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { checkAttempt } from "@/app/[locale]/pagar/[code]/actions";
import type { Locale } from "@/lib/locale";
import type { Attempt, Method, PublicLink } from "@/lib/pagos/types";
import { PAY_COPY, attemptTone, formatDate, formatMoney } from "./copy";
import { cleanupThreeDs, runThreeDs } from "./epayco";
import { CardForm, CashForm, DaviplataForm, PseForm, TransferPanel } from "./forms";
import { BrandRow, BrandTile, METHOD_BRANDS, usedBrands } from "./brands";
import { AmountRoll, CopyRow, EASE, GhostButton, Orbit, Panel, PrimaryButton, Rise, SHEET_ACTION_ID, Seal } from "./ui";

type View =
  | { kind: "choose"; error?: string }
  | { kind: "method"; method: Method }
  | { kind: "busy"; method: Method }
  | { kind: "attempt"; attempt: Attempt };

/** Por dónde arranca la página: lo pagado se muestra pagado, lo pendiente se retoma. */
function initialView(link: PublicLink, t: (typeof PAY_COPY)[Locale]): View {
  const last = link.last_attempt;
  if (link.status !== "pendiente") return { kind: "choose" };
  if (!last) return link.methods.length === 1 ? { kind: "method", method: link.methods[0]! } : { kind: "choose" };
  if (last.status === "en_revision") return { kind: "attempt", attempt: last };
  if (last.status === "pendiente" && last.method !== "tarjeta") return { kind: "attempt", attempt: last };
  if (last.status === "rechazado" || last.status === "abandonado") {
    return { kind: "choose", error: last.message || t.status.rejectedBody };
  }
  return { kind: "choose" };
}

export function PayPage({ link: initial, locale }: { link: PublicLink; locale: Locale }) {
  const t = PAY_COPY[locale];
  const [link, setLink] = useState(initial);
  const [view, setView] = useState<View>(() => initialView(initial, t));
  const other: Locale = locale === "ES" ? "EN" : "ES";
  const otherHref = other === "EN" ? `/en/pay/${link.code}` : `/es/pagar/${link.code}`;
  const amount = formatMoney(link.amount, link.currency, locale);

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

  // En el teléfono el formulario queda debajo del resumen: al elegir medio,
  // la página baja hasta él.
  const actionRef = useRef<HTMLElement>(null);
  const viewKey = view.kind === "method" ? `method-${view.method}` : view.kind;
  useEffect(() => {
    if (viewKey === "choose" || viewKey === "busy" || !actionRef.current) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    actionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [viewKey]);

  const onAttempt = (attempt: Attempt) => settled(attempt);
  const busyFor = (method: Method) => (busy: boolean) =>
    setView(busy ? { kind: "busy", method } : { kind: "method", method });

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white">
      <Starfield />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 sm:px-6 sm:pt-8">
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
        <div className="flex items-center gap-3">
          {link.epayco_test ? (
            <span className="rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/40">TEST</span>
          ) : null}
          <Link
            href={otherHref}
            className="rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-white/30 transition hover:bg-white hover:text-black"
          >
            {other}
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-56 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-20 lg:pt-24">
        {/* Resumen */}
        <section aria-label={t.payTo} className="lg:sticky lg:top-24 lg:self-start">
          <Rise delay={1.5}>
            <p className="text-sm font-semibold">{t.payTo}</p>
          </Rise>
          <Rise delay={1.6}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{link.concept}</h1>
          </Rise>
          {link.description ? (
            <Rise delay={1.7}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed">{link.description}</p>
            </Rise>
          ) : null}
          <Rise delay={1.75}>
            <p className="mt-12 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-light leading-none tracking-tight">
              <span className="text-5xl sm:text-7xl lg:text-8xl">
                <AmountRoll text={amount} delay={1.8} />
              </span>
              <span className="text-xl font-semibold">{link.currency}</span>
            </p>
          </Rise>
          <Rise delay={2}>
            <dl className="mt-12 grid max-w-md grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-base">
              {link.client_name ? (
                <>
                  <dt className="font-semibold">{t.for}</dt>
                  <dd>{link.client_name}</dd>
                </>
              ) : null}
              <dt className="font-semibold">{t.reference}</dt>
              <dd className="font-mono">{link.reference}</dd>
              {link.invoice_filename ? (
                <>
                  <dt className="font-semibold">{t.invoice}</dt>
                  <dd>
                    <a
                      href={`/${locale === "EN" ? "pay" : "pagar"}/${link.code}/factura`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:no-underline"
                    >
                      {link.invoice_number ? `${link.invoice_number}, ` : ""}
                      {t.download}
                    </a>
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
          <Rise delay={2.1} className="hidden lg:block">
            <SecureNote t={t} test={link.epayco_test} card={link.methods.includes("tarjeta")} />
          </Rise>
        </section>

        {/* Acción */}
        <section ref={actionRef} aria-live="polite" className="min-w-0 scroll-mt-6">
          <Rise delay={1.9}>
            <Panel id={panelKey(link, view)}>
              <ActionPanel
                link={link}
                locale={locale}
                view={view}
                t={t}
                setView={setView}
                onAttempt={onAttempt}
                busyFor={busyFor}
              />
            </Panel>
          </Rise>
          {/* En el teléfono la nota va al final, para que los medios se vean primero. */}
          <div className="lg:hidden">
            <SecureNote t={t} test={link.epayco_test} card={link.methods.includes("tarjeta")} />
          </div>
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
  const rows: [string, string][] = link.subtotal
    ? [
        [t.sheet.subtotal, money(link.subtotal)],
        [t.sheet.tax, money(link.tax || "0")],
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">{t.sheet.total}</p>
                <p className="mt-1 flex items-baseline gap-2 tabular-nums">
                  <span className="text-3xl font-light tracking-tight">{formatMoney(link.amount, link.currency, locale)}</span>
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
  return "choose";
}

function ActionPanel({
  link,
  locale,
  view,
  t,
  setView,
  onAttempt,
  busyFor,
}: {
  link: PublicLink;
  locale: Locale;
  view: View;
  t: (typeof PAY_COPY)[Locale];
  setView: (v: View) => void;
  onAttempt: (a: Attempt) => void;
  busyFor: (m: Method) => (busy: boolean) => void;
}) {
  if (link.status === "pagado") {
    return (
      <Outcome tone="ok" title={t.status.paid} body={t.status.paidBody}>
        <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-base">
          <dt className="font-semibold">{t.status.receipt}</dt>
          <dd className="font-mono">{link.reference}</dd>
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

  if (view.kind === "busy") return <Orbit steps={t.sequence} />;

  if (view.kind === "attempt") {
    const a = view.attempt;
    const tone = attemptTone(a.status);
    if (a.status === "en_revision") return <Outcome tone="wait" title={t.status.review} body={t.status.reviewBody} />;
    if (tone === "fail") {
      return (
        <Outcome tone="fail" title={t.status.rejected} body={a.message || t.status.rejectedBody}>
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
    return <Orbit steps={t.sequence} label={`${t.status.pending}`} />;
  }

  if (view.kind === "method") {
    const common = { link, locale, t, onAttempt, onBusy: busyFor(view.method) };
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-2xl font-semibold">{t.methods[view.method].name}</p>
            <BrandRow ids={METHOD_BRANDS[view.method]} />
          </div>
          {link.methods.length > 1 ? (
            <GhostButton onClick={() => setView({ kind: "choose" })}>{t.back}</GhostButton>
          ) : null}
        </div>
        {view.method === "tarjeta" ? <CardForm {...common} /> : null}
        {view.method === "pse" ? <PseForm {...common} /> : null}
        {view.method === "efectivo" ? <CashForm {...common} /> : null}
        {view.method === "daviplata" ? <DaviplataForm {...common} /> : null}
        {view.method === "breb" || view.method === "transferencia" ? (
          <TransferPanel {...common} method={view.method} />
        ) : null}
      </div>
    );
  }

  return <ChooseMethod link={link} t={t} error={view.error} onContinue={(method) => setView({ kind: "method", method })} />;
}

/**
 * Elegir medio es marcarlo; continuar es el botón de la hoja fija de abajo.
 * Todo cobro muestra todos los medios disponibles.
 */
function ChooseMethod({
  link,
  t,
  error,
  onContinue,
}: {
  link: PublicLink;
  t: (typeof PAY_COPY)[Locale];
  error?: string;
  onContinue: (method: Method) => void;
}) {
  const [picked, setPicked] = useState<Method | null>(null);
  return (
    <div>
      <p className="text-2xl font-semibold">{t.chooseMethod}</p>
      {error ? (
        <p role="alert" className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
          {error}
        </p>
      ) : null}
      <ul className="mt-6 space-y-2" role="radiogroup" aria-label={t.chooseMethod}>
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
                className={`group flex w-full items-center gap-5 rounded-2xl px-4 py-5 text-left ring-1 transition focus-visible:outline-none ${
                  on ? "bg-white/[0.08] ring-white" : "ring-transparent hover:bg-white/[0.05] focus-visible:ring-white"
                }`}
              >
                <span className="font-mono text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                    {t.methods[method].name}
                  </span>
                  <span className="mt-1 block text-sm">{t.methods[method].hint}</span>
                  <BrandRow ids={METHOD_BRANDS[method]} className="mt-3" />
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

function SecureNote({ t, test, card }: { t: (typeof PAY_COPY)[Locale]; test: boolean; card: boolean }) {
  return (
    <div className="mt-12 flex max-w-md items-start gap-3 text-sm leading-relaxed">
      <LockIcon />
      <div>
        <p>
          {card ? t.secure : t.secureNoCard}
          {test ? ` ${t.testMode}` : ""}
        </p>
        <BrandTile id="epayco" size="md" className="mt-3" />
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
