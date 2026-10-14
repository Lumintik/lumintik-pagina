"use client";

import { useEffect, useState } from "react";

import * as actions from "@/app/[locale]/pagar/[code]/actions";
import type { Locale } from "@/lib/locale";
import type { Attempt, Option, Payer, PublicLink } from "@/lib/pagos/types";
import { formatMoney, type PayCopy } from "./copy";
import { BrandTile, CASH_BRANDS } from "./brands";
import { cardBrand, formatCardNumber, luhn, prepareTokenizer, tokenizeCard } from "./epayco";
import { CopyRow, ErrorNote, Field, PrimaryButton, inputClass } from "./ui";

type Common = {
  link: PublicLink;
  locale: Locale;
  t: PayCopy;
  /** El formulario terminó y hay un intento que seguir. */
  onAttempt: (attempt: Attempt) => void;
  /** Mientras el servidor procesa, la página muestra la órbita. */
  onBusy: (busy: boolean) => void;
};

const DOC_TYPES_CO = ["CC", "CE", "NIT", "PPT", "PPN"];
const DOC_TYPES_INTL = ["PPN", "DNI", "CE"];

function splitName(full: string): { name: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { name: full.trim(), last: "" };
  const half = Math.ceil(parts.length / 2);
  return { name: parts.slice(0, half).join(" "), last: parts.slice(half).join(" ") };
}

/** Datos del pagador. Vienen precargados con lo que el link ya sabe del cliente. */
export function usePayer(link: PublicLink) {
  const company = link.client_doc_type === "NIT";
  const split = splitName(link.client_name);
  const [payer, setPayer] = useState<Payer>({
    name: company ? link.client_name : split.name,
    last_name: company ? "" : split.last,
    email: link.client_email,
    phone: "",
    doc_type: link.client_doc_type || (link.currency === "USD" ? "PPN" : "CC"),
    doc_number: link.client_doc_number,
  });
  return [payer, setPayer] as const;
}

function missing(payer: Payer): boolean {
  return (
    payer.name.trim().length < 2 ||
    !/^\S+@\S+\.\S+$/.test(payer.email) ||
    payer.phone.replace(/\D/g, "").length < 7 ||
    payer.doc_number.replace(/\W/g, "").length < 4
  );
}

export function PayerFields({
  payer,
  setPayer,
  t,
  link,
  showErrors,
}: {
  payer: Payer;
  setPayer: (p: Payer) => void;
  t: PayCopy;
  link: PublicLink;
  showErrors: boolean;
}) {
  const company = payer.doc_type === "NIT";
  const set = (patch: Partial<Payer>) => setPayer({ ...payer, ...patch });
  const types = link.currency === "USD" ? DOC_TYPES_INTL : DOC_TYPES_CO;
  const bad = (ok: boolean) => (showErrors && !ok ? true : undefined);

  return (
    <fieldset className="mt-10">
      <legend className="text-lg font-semibold">{t.payer.heading}</legend>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
        <Field label={t.payer.docType}>
          <select
            className={inputClass}
            value={payer.doc_type}
            onChange={(e) => set({ doc_type: e.target.value })}
          >
            {types.map((type) => (
              <option key={type} value={type} className="bg-black">
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.payer.docNumber}>
          <input
            className={inputClass}
            inputMode={company || payer.doc_type === "CC" ? "numeric" : "text"}
            autoComplete="off"
            value={payer.doc_number}
            aria-invalid={bad(payer.doc_number.replace(/\W/g, "").length >= 4)}
            onChange={(e) => set({ doc_number: e.target.value })}
          />
        </Field>
      </div>
      <div className={`mt-4 grid grid-cols-1 gap-4 ${company ? "" : "sm:grid-cols-2"}`}>
        <Field label={company ? t.payer.company : t.payer.name}>
          <input
            className={inputClass}
            autoComplete={company ? "organization" : "given-name"}
            value={payer.name}
            aria-invalid={bad(payer.name.trim().length >= 2)}
            onChange={(e) => set({ name: e.target.value })}
          />
        </Field>
        {company ? null : (
          <Field label={t.payer.lastName}>
            <input
              className={inputClass}
              autoComplete="family-name"
              value={payer.last_name}
              onChange={(e) => set({ last_name: e.target.value })}
            />
          </Field>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t.payer.email}>
          <input
            className={inputClass}
            type="email"
            autoComplete="email"
            value={payer.email}
            aria-invalid={bad(/^\S+@\S+\.\S+$/.test(payer.email))}
            onChange={(e) => set({ email: e.target.value })}
          />
        </Field>
        <Field label={t.payer.phone}>
          <input
            className={inputClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={payer.phone}
            aria-invalid={bad(payer.phone.replace(/\D/g, "").length >= 7)}
            onChange={(e) => set({ phone: e.target.value })}
          />
        </Field>
      </div>
    </fieldset>
  );
}

export function CardForm({ link, locale, t, onAttempt, onBusy }: Common) {
  const [payer, setPayer] = usePayer(link);
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [installments, setInstallments] = useState(1);
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Se descarga mientras el cliente escribe, no cuando ya presionó pagar.
    prepareTokenizer(link.epayco_public_key).catch(() => undefined);
  }, [link.epayco_public_key]);

  const brand = cardBrand(number);
  const [month, yy] = expiry.split("/");
  const cardOk =
    holder.trim().length >= 3 &&
    luhn(number) &&
    /^(0[1-9]|1[0-2])$/.test(month ?? "") &&
    /^\d{2}$/.test(yy ?? "") &&
    cvc.length >= (brand === "amex" ? 4 : 3);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!cardOk || missing(payer)) {
      setShowErrors(true);
      setError(!cardOk ? t.errors.card : t.errors.required);
      return;
    }
    setBusy(true);
    onBusy(true);
    try {
      const token = await tokenizeCard(link.epayco_public_key, {
        name: holder,
        email: payer.email,
        number,
        cvc,
        month: month!,
        year: `20${yy}`,
      });
      const result = await actions.payWithCard(link.code, link.locale, { cardToken: token, payer, installments }, t.errors.generic);
      if (!result.ok) {
        setError(result.message);
        onBusy(false);
      } else {
        onAttempt(result.data);
      }
    } catch (failure) {
      // El tokenizador devuelve un texto o un objeto con la descripción.
      const detail =
        typeof failure === "string"
          ? failure
          : (failure as { description?: string; data?: { description?: string } })?.data?.description ??
            (failure as { description?: string })?.description;
      setError(detail ? `${t.errors.card} ${detail}` : t.errors.generic);
      onBusy(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="ph-no-capture" autoComplete="on">
      <div className="grid grid-cols-1 gap-4">
        <Field label={t.card.number}>
          <div className="relative">
            <input
              className={`${inputClass} pr-24 font-mono tracking-normal`}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              value={number}
              aria-invalid={showErrors && !luhn(number) ? true : undefined}
              onChange={(e) => setNumber(formatCardNumber(e.target.value))}
            />
            {brand === "other" ? null : (
              <BrandTile id={brand} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t.card.expiry}>
            <input
              className={`${inputClass} font-mono`}
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => {
                const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
              }}
            />
          </Field>
          <Field label={t.card.cvc}>
            <input
              className={`${inputClass} font-mono`}
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder={brand === "amex" ? "0000" : "000"}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          </Field>
        </div>
        <Field label={t.card.holder}>
          <input
            className={inputClass}
            autoComplete="cc-name"
            value={holder}
            onChange={(e) => setHolder(e.target.value.toUpperCase())}
          />
        </Field>
        {link.currency === "COP" ? (
          <Field label={t.card.installments}>
            <select className={inputClass} value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
              {[1, 2, 3, 6, 12, 24, 36].map((n) => (
                <option key={n} value={n} className="bg-black">
                  {n}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
      </div>

      <PayerFields payer={payer} setPayer={setPayer} t={t} link={link} showErrors={showErrors} />

      <ErrorNote message={error} />
      <PrimaryButton busy={busy}>
        {t.card.pay} {formatMoney(link.amount, link.currency, locale)}
      </PrimaryButton>
    </form>
  );
}

/** Carga la lista de bancos o de puntos de efectivo una sola vez. */
function useOptions(code: string, kind: "bancos" | "efectivo") {
  const [options, setOptions] = useState<Option[] | null>(null);
  useEffect(() => {
    let alive = true;
    actions.loadOptions(code, kind).then((result) => {
      if (alive) setOptions(result.ok ? result.data : []);
    });
    return () => {
      alive = false;
    };
  }, [code, kind]);
  return options;
}

export function PseForm({ link, t, onAttempt, onBusy }: Common) {
  const [payer, setPayer] = usePayer(link);
  const banks = useOptions(link.code, "bancos");
  const [bank, setBank] = useState("");
  const [person, setPerson] = useState(link.client_doc_type === "NIT" ? 1 : 0);
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!bank || missing(payer)) {
      setShowErrors(true);
      setError(t.errors.required);
      return;
    }
    setBusy(true);
    onBusy(true);
    const result = await actions.startPse(link.code, link.locale, { bankCode: bank, personType: person, payer }, t.errors.generic);
    if (result.ok && result.data.redirect_url) {
      // Al banco: PSE siempre se autoriza en la página del banco del pagador.
      window.location.assign(result.data.redirect_url);
      return;
    }
    setBusy(false);
    onBusy(false);
    if (result.ok) onAttempt(result.data);
    else setError(result.message);
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_12rem]">
        <Field label={t.pse.bank}>
          <select
            className={inputClass}
            value={bank}
            aria-invalid={showErrors && !bank ? true : undefined}
            onChange={(e) => setBank(e.target.value)}
            disabled={!banks}
          >
            <option value="" className="bg-black">
              {banks ? t.pse.chooseBank : "…"}
            </option>
            {(banks ?? []).map((b) => (
              <option key={b.code} value={b.code} className="bg-black">
                {b.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.pse.personType}>
          <select className={inputClass} value={person} onChange={(e) => setPerson(Number(e.target.value))}>
            <option value={0} className="bg-black">
              {t.pse.natural}
            </option>
            <option value={1} className="bg-black">
              {t.pse.juridica}
            </option>
          </select>
        </Field>
      </div>
      <PayerFields payer={payer} setPayer={setPayer} t={t} link={link} showErrors={showErrors} />
      <p className="mt-6 text-sm">{t.pse.note}</p>
      <ErrorNote message={error} />
      <PrimaryButton busy={busy}>{t.pse.go}</PrimaryButton>
    </form>
  );
}

export function CashForm({ link, t, onAttempt, onBusy }: Common) {
  const [payer, setPayer] = usePayer(link);
  const entities = useOptions(link.code, "efectivo");
  const [chosen, setEntity] = useState("");
  // Sin elección todavía, queda el primero de la lista.
  const entity = chosen || entities?.[0]?.code || "";
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!entity || missing(payer)) {
      setShowErrors(true);
      setError(t.errors.required);
      return;
    }
    setBusy(true);
    onBusy(true);
    const result = await actions.startCash(link.code, link.locale, { entity, payer }, t.errors.generic);
    setBusy(false);
    if (result.ok) onAttempt(result.data);
    else {
      onBusy(false);
      setError(result.message);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-sm font-medium">{t.cash.where}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(entities ?? []).map((e) => (
          <button
            key={e.code}
            type="button"
            onClick={() => setEntity(e.code)}
            aria-pressed={entity === e.code}
            className={`flex items-center gap-2.5 rounded-full py-2 pr-5 text-sm font-semibold ring-1 transition ${CASH_BRANDS[e.code] ? "pl-2" : "pl-5"} ${
              entity === e.code ? "bg-white text-black ring-white" : "ring-white/30 hover:ring-white"
            }`}
          >
            {CASH_BRANDS[e.code] ? <BrandTile id={CASH_BRANDS[e.code]!} /> : null}
            {e.name}
          </button>
        ))}
        {entities === null ? <span className="text-sm">…</span> : null}
      </div>
      <PayerFields payer={payer} setPayer={setPayer} t={t} link={link} showErrors={showErrors} />
      <ErrorNote message={error} />
      <PrimaryButton busy={busy}>{t.cash.go}</PrimaryButton>
    </form>
  );
}

export function DaviplataForm({ link, t, onAttempt, onBusy }: Common) {
  const [payer, setPayer] = usePayer(link);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);

  async function start(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (missing(payer)) {
      setShowErrors(true);
      setError(t.errors.required);
      return;
    }
    setBusy(true);
    const result = await actions.startDaviplata(link.code, link.locale, { payer }, t.errors.generic);
    setBusy(false);
    if (!result.ok) setError(result.message);
    else if (result.data.status === "rechazado") onAttempt(result.data);
    else setAttempt(result.data);
  }

  async function confirm(event: React.FormEvent) {
    event.preventDefault();
    if (!attempt) return;
    setError("");
    setBusy(true);
    onBusy(true);
    const result = await actions.confirmDaviplata(link.code, { attemptId: attempt.id, otp }, t.errors.generic);
    setBusy(false);
    if (result.ok) onAttempt(result.data);
    else {
      onBusy(false);
      setError(result.message);
    }
  }

  if (attempt) {
    return (
      <form onSubmit={confirm} noValidate>
        <p className="text-base">{t.daviplata.note}</p>
        <Field label={t.daviplata.otp} className="mt-6">
          <input
            className={`${inputClass} h-16 text-center font-mono text-3xl`}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
          />
        </Field>
        <ErrorNote message={error} />
        <PrimaryButton busy={busy} disabled={otp.length < 4}>
          {t.daviplata.confirm}
        </PrimaryButton>
      </form>
    );
  }

  return (
    <form onSubmit={start} noValidate>
      <PayerFields payer={payer} setPayer={setPayer} t={t} link={link} showErrors={showErrors} />
      <ErrorNote message={error} />
      <PrimaryButton busy={busy}>{t.daviplata.go}</PrimaryButton>
    </form>
  );
}

/** BreB y transferencia: datos para copiar y un aviso de "ya pagué". */
export function TransferPanel({
  link,
  locale,
  t,
  method,
  onAttempt,
}: Common & { method: "breb" | "transferencia" }) {
  const [declaring, setDeclaring] = useState(false);
  const [name, setName] = useState(link.client_name);
  const [email, setEmail] = useState(link.client_email);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const amount = formatMoney(link.amount, link.currency, locale);
  // Sin separadores: así se pega directo en la app del banco.
  const rawAmount = link.amount;
  const account = link.transfer;
  const c = { copyLabel: t.copy, copiedLabel: t.copied };

  async function declare(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError(t.errors.required);
      return;
    }
    setBusy(true);
    const result = await actions.declareTransfer(link.code, { method, name, email, note }, t.errors.generic);
    setBusy(false);
    if (result.ok) onAttempt(result.data);
    else setError(result.message);
  }

  return (
    <div>
      {method === "breb" && link.breb ? (
        <div>
          <CopyRow label={t.breb.key} value={link.breb.key} mono big {...c} />
          <CopyRow label={t.breb.holder} value={link.breb.holder} {...c} />
          <CopyRow label={t.breb.amount} value={rawAmount} mono {...c} />
          <CopyRow label={t.reference} value={link.reference} mono {...c} />
          <ol className="mt-8 space-y-3">
            {t.breb.steps.map((step, i) => (
              <li key={step} className="flex gap-4 text-base">
                <span className="font-mono text-sm tabular-nums">0{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm">{t.breb.limit}</p>
        </div>
      ) : null}

      {method === "transferencia" && account ? (
        <div>
          <CopyRow label={t.transfer.bank} value={account.bank} {...c} />
          <CopyRow label={t.transfer.type} value={account.account_type} {...c} />
          <CopyRow label={t.transfer.number} value={account.account_number} mono big {...c} />
          <CopyRow label={t.transfer.holder} value={account.holder} {...c} />
          <CopyRow label={t.transfer.holderId} value={account.holder_id} mono {...c} />
          <CopyRow label={t.transfer.routing} value={account.routing} mono {...c} />
          <CopyRow label={t.transfer.swift} value={account.swift} mono {...c} />
          <CopyRow label={t.transfer.address} value={account.bank_address} {...c} />
          <CopyRow label={t.breb.amount} value={rawAmount} mono {...c} />
          <CopyRow label={t.reference} value={link.reference} mono {...c} />
          <p className="mt-6 text-base">{t.transfer.note}</p>
        </div>
      ) : null}

      {declaring ? (
        <form onSubmit={declare} noValidate className="mt-10">
          <p className="text-lg font-semibold">{t.declare.heading}</p>
          <div className="mt-5 grid grid-cols-1 gap-4">
            <Field label={t.declare.name}>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            </Field>
            <Field label={t.declare.email}>
              <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label={t.declare.note}>
              <input className={inputClass} value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>
          <ErrorNote message={error} />
          <PrimaryButton busy={busy}>
            {t.declare.send} {amount}
          </PrimaryButton>
        </form>
      ) : (
        <PrimaryButton type="button" onClick={() => setDeclaring(true)}>
          {method === "breb" ? t.breb.done : t.transfer.done}
        </PrimaryButton>
      )}
    </div>
  );
}
