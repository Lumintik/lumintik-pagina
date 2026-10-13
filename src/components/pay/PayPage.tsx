"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { checkAttempt } from "@/app/[locale]/pagar/[code]/actions";
import type { Locale } from "@/lib/locale";
import type { Attempt, Method, PublicLink } from "@/lib/pagos/types";
import { PAY_COPY, attemptTone, formatDate, formatMoney } from "./copy";
import { cleanupThreeDs, runThreeDs } from "./epayco";
import { CardForm, CashForm, DaviplataForm, PseForm, TransferPanel } from "./forms";
import { AmountRoll, CopyRow, EASE, GhostButton, Orbit, Panel, PrimaryButton, Rise, Seal } from "./ui";

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

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-20 lg:pt-24">
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
            <SecureNote t={t} test={link.epayco_test} />
          </Rise>
        </section>

        {/* Acción */}
        <section aria-live="polite" className="min-w-0">
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
            <SecureNote t={t} test={link.epayco_test} />
          </div>
        </section>
      </main>
    </div>
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
              <dd>{t.methods[link.paid_method].name}</dd>
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
          <p className="text-2xl font-semibold">{t.methods[view.method].name}</p>
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

  return (
    <div>
      <p className="text-2xl font-semibold">{t.chooseMethod}</p>
      {view.error ? (
        <p role="alert" className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
          {view.error}
        </p>
      ) : null}
      <ul className="mt-6 space-y-1">
        {link.methods.map((method, i) => (
          <motion.li
            key={method}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => setView({ kind: "method", method })}
              className="group flex w-full items-center gap-5 rounded-2xl px-4 py-5 text-left transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
            >
              <span className="font-mono text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                  {t.methods[method].name}
                </span>
                <span className="mt-1 block text-sm">{t.methods[method].hint}</span>
              </span>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
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

function SecureNote({ t, test }: { t: (typeof PAY_COPY)[Locale]; test: boolean }) {
  return (
    <p className="mt-12 flex max-w-md items-start gap-3 text-sm leading-relaxed">
      <LockIcon />
      <span>
        {t.secure}
        {test ? ` ${t.testMode}` : ""}
      </span>
    </p>
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
