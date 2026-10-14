"use client";

import { useEffect, useMemo, useState } from "react";

import * as actions from "@/app/[locale]/pagar/[code]/actions";
import type { Locale } from "@/lib/locale";
import type {
  Attempt,
  Method,
  Option,
  Payer,
  PublicLink,
} from "@/lib/pagos/types";
import { BrandRow, BrandTile, CASH_BRANDS, brandsForMethod } from "./brands";
import { formatMoney, type PayCopy } from "./copy";
import { DocumentCard } from "./document-card";
import {
  cardBrand,
  formatCardNumber,
  luhn,
  prepareTokenizer,
  tokenizeCard,
} from "./epayco";
import { Select } from "./select";
import {
  CopyRow,
  ErrorNote,
  Field,
  Orbit,
  Panel,
  PayForm,
  PrimaryButton,
  StepHeader,
  inputClass,
} from "./ui";

/**
 * El pago, un paso a la vez, como un formulario de Typeform. Cada medio pide
 * solo lo que necesita y en este orden: los datos del pago, los de quien paga
 * y una hoja final para revisar todo, con un botón de editar por sección.
 *
 * - Tarjeta, PSE y efectivo: datos del pago, quién paga, confirmar.
 * - Daviplata: quién paga, confirmar y el código que llega al celular.
 * - BreB y transferencia: datos para pagar, el aviso con su comprobante, confirmar.
 */

type StepId = "data" | "payer" | "report" | "confirm" | "otp";

const STEPS: Record<Method, StepId[]> = {
  tarjeta: ["data", "payer", "confirm"],
  pse: ["data", "payer", "confirm"],
  efectivo: ["data", "payer", "confirm"],
  daviplata: ["payer", "confirm", "otp"],
  breb: ["data", "report", "confirm"],
  transferencia: ["data", "report", "confirm"],
};

/** Cuántos pasos tiene el pago con este medio, contando resumen y elección de medio. */
export function totalSteps(method: Method | null): number {
  return 2 + (method ? STEPS[method].length : 3);
}

/** Códigos de PSE con logo oficial (los publica pse.com.co). */
const BANK_LOGOS = new Set(["1001", "1002", "1006", "1007", "1009", "1012", "1013", "1019", "1023", "1032", "1040", "1047", "1051", "1052", "1059", "1060", "1061", "1062", "1063", "1065", "1066", "1069", "1070", "1071", "1097", "1121", "1283", "1286", "1289", "1292", "1303", "1370", "1507", "1551", "1558", "1637", "1801", "1802", "1803", "1804", "1808", "1809", "1811", "1812", "1814", "1815", "1816", "1819", "1824", "1831"]);
/** Logos blancos: van sobre ficha negra. */
const DARK_BANK_LOGOS = new Set(["1802"]);

const DOC_TYPES_CO = ["CC", "CE", "NIT", "PPT", "PPN"];
const DOC_TYPES_INTL = ["PPN", "DNI", "CE"];

const COUNTRIES: { code: string; dial: string; name: string }[] = [
  { code: "CO", dial: "+57", name: "Colombia" },
  { code: "US", dial: "+1", name: "Estados Unidos / United States" },
  { code: "MX", dial: "+52", name: "México" },
  { code: "ES", dial: "+34", name: "España" },
  { code: "PE", dial: "+51", name: "Perú" },
  { code: "EC", dial: "+593", name: "Ecuador" },
  { code: "PA", dial: "+507", name: "Panamá" },
  { code: "CL", dial: "+56", name: "Chile" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "VE", dial: "+58", name: "Venezuela" },
  { code: "BR", dial: "+55", name: "Brasil" },
  { code: "CR", dial: "+506", name: "Costa Rica" },
];

/** Dígito de verificación del NIT, con los pesos de la DIAN. */
export function nitCheckDigit(nit: string): string {
  const digits = nit.replace(/\D/g, "");
  if (!digits) return "";
  const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let sum = 0;
  [...digits].reverse().forEach((d, i) => {
    sum += Number(d) * (weights[i] ?? 0);
  });
  const rest = sum % 11;
  return String(rest > 1 ? 11 - rest : rest);
}

function splitName(full: string): { name: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { name: full.trim(), last: "" };
  const half = Math.ceil(parts.length / 2);
  return {
    name: parts.slice(0, half).join(" "),
    last: parts.slice(half).join(" "),
  };
}

/** Quien paga, precargado con lo que el cobro ya sabe (y lo que trajo la factura). */
function initialPayer(link: PublicLink): Payer {
  const company = link.client_doc_type === "NIT";
  const split = splitName(link.client_name);
  return {
    name: company ? link.client_name : split.name,
    last_name: company ? "" : split.last,
    email: link.client_email,
    phone: link.client_phone,
    phone_country: "+57",
    doc_type: link.client_doc_type || (link.currency === "USD" ? "PPN" : "CC"),
    // El NIT se guarda sin el dígito de verificación; ese va aparte.
    doc_number: company
      ? link.client_doc_number.replace(/\D/g, "").slice(0, 9)
      : link.client_doc_number,
    dv: company ? nitCheckDigit(link.client_doc_number.replace(/\D/g, "").slice(0, 9)) : "",
  };
}

function payerOk(payer: Payer) {
  if (payer.doc_type === "NIT" && !/^\d$/.test(payer.dv ?? "")) return false;
  return (
    payer.name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(payer.email) &&
    payer.phone.replace(/\D/g, "").length >= 7 &&
    payer.doc_number.replace(/\W/g, "").length >= 4
  );
}

type Props = {
  link: PublicLink;
  locale: Locale;
  t: PayCopy;
  method: Method;
  onAttempt: (attempt: Attempt) => void;
  /** Volver a elegir medio. */
  onChangeMethod: () => void;
  /** Para el indicador del encabezado: número de paso (desde 3) y su nombre. */
  onProgress: (step: number, label: string) => void;
};

export function Checkout({
  link,
  locale,
  t,
  method,
  onAttempt,
  onChangeMethod,
  onProgress,
}: Props) {
  const steps = STEPS[method];
  const [index, setIndex] = useState(0);
  const step = steps[index]!;
  const amount = formatMoney(link.amount, link.currency, locale);
  const base = `/${link.locale === "en" ? "pay" : "pagar"}/${link.code}`;
  const c = { copyLabel: t.copy, copiedLabel: t.copied };
  const selectCopy = { searchLabel: t.flow.search, closeLabel: t.flow.close };

  // Estado de todo el pago: sobrevive al ir y volver entre pasos.
  const [payer, setPayer] = useState<Payer>(() => initialPayer(link));
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    holder: "",
    installments: "1",
  });
  const [pse, setPse] = useState({
    bank: "",
    person: link.client_doc_type === "NIT" ? "1" : "0",
  });
  const [cash, setCash] = useState("");
  const [report, setReport] = useState({
    name: link.client_name,
    email: link.client_email,
    note: "",
    proof: null as File | null,
  });
  const [daviAttempt, setDaviAttempt] = useState<Attempt | null>(null);
  const [otp, setOtp] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // Mientras se procesa, el formulario sigue montado (con todo lo escrito) y
  // solo se ve la órbita. Si algo falla, se vuelve a la confirmación con el motivo.
  const [processing, setProcessing] = useState(false);

  const banks = useOptions(link.code, "bancos", method === "pse");
  const entities = useOptions(link.code, "efectivo", method === "efectivo");
  const entity = cash || entities?.[0]?.code || "";

  const stepLabel = (id: StepId) =>
    id === "data"
      ? method === "breb" || method === "transferencia"
        ? t.flow.steps.account
        : t.flow.steps[method as "tarjeta" | "pse" | "efectivo"]
      : t.flow.steps[id];

  useEffect(() => {
    onProgress(3 + index, stepLabel(step));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo cuando cambia el paso
  }, [index, method]);

  useEffect(() => {
    if (method === "tarjeta")
      prepareTokenizer(link.epayco_public_key).catch(() => undefined);
  }, [method, link.epayco_public_key]);

  const go = (target: StepId) => {
    setError("");
    setShowErrors(false);
    setIndex(steps.indexOf(target));
  };
  const back = () =>
    index === 0 ? onChangeMethod() : (setError(""), setIndex(index - 1));

  // Tarjeta
  const brand = cardBrand(card.number);
  const [month, yy] = card.expiry.split("/");
  const cardOk =
    card.holder.trim().length >= 3 &&
    luhn(card.number) &&
    /^(0[1-9]|1[0-2])$/.test(month ?? "") &&
    /^\d{2}$/.test(yy ?? "") &&
    card.cvc.length >= (brand === "amex" ? 4 : 3);

  const dataOk = () => {
    if (method === "tarjeta") return cardOk;
    if (method === "pse") return Boolean(pse.bank);
    if (method === "efectivo") return Boolean(entity);
    return true;
  };

  function next(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (step === "data" && !dataOk()) {
      setShowErrors(true);
      setError(method === "tarjeta" ? t.errors.card : t.errors.required);
      return;
    }
    if (step === "payer" && !payerOk(payer)) {
      setShowErrors(true);
      setError(t.errors.required);
      return;
    }
    if (step === "report") {
      if (report.name.trim().length < 2) {
        setShowErrors(true);
        setError(t.errors.required);
        return;
      }
      if (report.proof && report.proof.size > 2_500_000) {
        setError(t.declare.proofTooBig);
        return;
      }
    }
    setShowErrors(false);
    setIndex(index + 1);
  }

  // Al ePayco va el celular sin indicativo y el NIT sin dígito de verificación.
  const payerForApi = (): Payer => ({
    ...payer,
    phone: payer.phone.replace(/\D/g, ""),
  });

  async function pay(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);

    if (method === "tarjeta") {
      setProcessing(true);
      try {
        const token = await tokenizeCard(link.epayco_public_key, {
          name: card.holder,
          email: payer.email,
          number: card.number,
          cvc: card.cvc,
          month: month!,
          year: `20${yy}`,
        });
        const result = await actions.payWithCard(
          link.code,
          link.locale,
          {
            cardToken: token,
            payer: payerForApi(),
            installments: Number(card.installments),
          },
          t.errors.generic,
        );
        if (result.ok) onAttempt(result.data);
        else {
          setError(result.message);
          setProcessing(false);
        }
      } catch (failure) {
        const detail = describeFailure(failure);
        void actions.reportClientError(link.code, "tokenizar tarjeta", detail || String(failure));
        // ePayco antepone "Error general contacte con soporte." al motivo real.
        const reason = detail.replace(/^error general,? contacte con soporte\.?\s*/i, "");
        setError(
          /restringid/i.test(reason)
            ? t.errors.cardRestricted
            : reason
              ? t.errors.cardWithReason(reason)
              : t.errors.generic,
        );
        setProcessing(false);
      } finally {
        setBusy(false);
      }
      return;
    }

    if (method === "pse") {
      setProcessing(true);
      const result = await actions.startPse(
        link.code,
        link.locale,
        {
          bankCode: pse.bank,
          personType: Number(pse.person),
          payer: payerForApi(),
        },
        t.errors.generic,
      );
      if (result.ok && result.data.redirect_url) {
        window.location.assign(result.data.redirect_url);
        return;
      }
      setBusy(false);
      setProcessing(false);
      if (result.ok) onAttempt(result.data);
      else setError(result.message);
      return;
    }

    if (method === "efectivo") {
      setProcessing(true);
      const result = await actions.startCash(
        link.code,
        link.locale,
        { entity, payer: payerForApi() },
        t.errors.generic,
      );
      setBusy(false);
      if (result.ok) onAttempt(result.data);
      else {
        setProcessing(false);
        setError(result.message);
      }
      return;
    }

    if (method === "daviplata") {
      const result = await actions.startDaviplata(
        link.code,
        link.locale,
        { payer: payerForApi() },
        t.errors.generic,
      );
      setBusy(false);
      if (!result.ok) setError(result.message);
      else if (result.data.status === "rechazado") onAttempt(result.data);
      else {
        setDaviAttempt(result.data);
        setIndex(steps.indexOf("otp"));
      }
      return;
    }

    // BreB y transferencia: el aviso con su comprobante.
    let proof: { data: string; name: string } | undefined;
    if (report.proof)
      proof = { data: await toBase64(report.proof), name: report.proof.name };
    const result = await actions.declareTransfer(
      link.code,
      {
        method: method as "breb" | "transferencia",
        name: report.name,
        email: report.email,
        note: report.note,
        proof,
      },
      t.errors.generic,
    );
    setBusy(false);
    if (result.ok) onAttempt(result.data);
    else setError(result.message);
  }

  async function confirmOtp(event: React.FormEvent) {
    event.preventDefault();
    if (!daviAttempt) return;
    setError("");
    setBusy(true);
    setProcessing(true);
    const result = await actions.confirmDaviplata(
      link.code,
      { attemptId: daviAttempt.id, otp },
      t.errors.generic,
    );
    setBusy(false);
    if (result.ok) onAttempt(result.data);
    else {
      setProcessing(false);
      setError(result.message);
    }
  }

  const payLabel =
    method === "tarjeta"
      ? `${t.card.pay} ${amount}`
      : method === "pse"
        ? t.pse.go
        : method === "efectivo"
          ? t.cash.go
          : method === "daviplata"
            ? t.daviplata.go
            : `${t.declare.send} ${amount}`;

  const bankName = banks?.find((b) => b.code === pse.bank)?.name ?? "";
  const entityName = entities?.find((e) => e.code === entity)?.name ?? "";
  const account = link.transfer;

  return (
    <div>
      <StepHeader
        title={step === "confirm" ? t.flow.confirmTitle : stepLabel(step)}
        backLabel={index === 0 ? t.back : t.previous}
        onBack={back}
      >
        {step === "data" ? (
          <BrandRow ids={brandsForMethod(method, account?.bank)} size="sm" />
        ) : null}
      </StepHeader>

      {processing ? <Orbit steps={t.sequence} /> : null}
      <div hidden={processing}>
      <Panel id={step}>
        {step === "data" && method === "tarjeta" ? (
          <PayForm onSubmit={next} className="ph-no-capture" autoComplete="on">
            <div className="grid grid-cols-1 gap-4">
              <Field label={t.card.number}>
                <div className="relative">
                  <input
                    className={`${inputClass} pr-24 tabular-nums`}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    value={card.number}
                    aria-invalid={
                      showErrors && !luhn(card.number) ? true : undefined
                    }
                    onChange={(e) =>
                      setCard({
                        ...card,
                        number: formatCardNumber(e.target.value),
                      })
                    }
                  />
                  {brand === "other" ? null : (
                    <BrandTile
                      id={brand}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              </Field>
              <div
                className={`grid gap-3 ${link.currency === "COP" ? "grid-cols-[1fr_1fr_1.1fr]" : "grid-cols-2"}`}
              >
                <Field label={t.card.expiry}>
                  <input
                    className={`${inputClass} tabular-nums`}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/AA"
                    value={card.expiry}
                    aria-invalid={
                      showErrors &&
                      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)
                        ? true
                        : undefined
                    }
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({
                        ...card,
                        expiry:
                          d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
                      });
                    }}
                  />
                </Field>
                <Field label={t.card.cvc}>
                  <input
                    className={`${inputClass} tabular-nums`}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder={brand === "amex" ? "0000" : "000"}
                    value={card.cvc}
                    aria-invalid={
                      showErrors && card.cvc.length < 3 ? true : undefined
                    }
                    onChange={(e) =>
                      setCard({
                        ...card,
                        cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                  />
                </Field>
                {link.currency === "COP" ? (
                  <Field label={t.card.installments}>
                    <Select
                      value={card.installments}
                      options={[1, 2, 3, 6, 12, 24, 36].map((n) => ({
                        value: String(n),
                        label: String(n),
                      }))}
                      placeholder="1"
                      title={t.card.installments}
                      onChange={(v) => setCard({ ...card, installments: v })}
                      {...selectCopy}
                    />
                  </Field>
                ) : null}
              </div>
              <Field label={t.card.holder}>
                <input
                  className={inputClass}
                  autoComplete="cc-name"
                  value={card.holder}
                  aria-invalid={
                    showErrors && card.holder.trim().length < 3
                      ? true
                      : undefined
                  }
                  onChange={(e) =>
                    setCard({ ...card, holder: e.target.value.toUpperCase() })
                  }
                />
              </Field>
            </div>
            <ErrorNote message={error} />
            <PrimaryButton>{t.flow.continue} →</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "data" && method === "pse" ? (
          <PayForm onSubmit={next}>
            <Field label={t.pse.bank}>
              <Select
                value={pse.bank}
                options={(banks ?? []).map((b) => ({
                  value: b.code,
                  label: b.name,
                  image: BANK_LOGOS.has(b.code)
                    ? `/brands/bancos/${b.code}.png`
                    : undefined,
                  imageDark: DARK_BANK_LOGOS.has(b.code),
                }))}
                placeholder={banks ? t.pse.chooseBank : "…"}
                disabled={!banks}
                invalid={showErrors && !pse.bank ? true : undefined}
                title={t.pse.bank}
                onChange={(v) => setPse({ ...pse, bank: v })}
                {...selectCopy}
              />
            </Field>
            <Field label={t.pse.personType} className="mt-4">
              <Segmented
                value={pse.person}
                options={[
                  { value: "0", label: t.pse.natural },
                  { value: "1", label: t.pse.juridica },
                ]}
                onChange={(v) => setPse({ ...pse, person: v })}
              />
            </Field>
            <p className="mt-6 text-sm">{t.pse.note}</p>
            <ErrorNote message={error} />
            <PrimaryButton>{t.flow.continue} →</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "data" && method === "efectivo" ? (
          <PayForm onSubmit={next}>
            <Field label={t.cash.where}>
              <Select
                value={entity}
                options={(entities ?? []).map((e) => ({
                  value: e.code,
                  label: e.name,
                  brand: CASH_BRANDS[e.code],
                }))}
                placeholder={entities ? t.flow.choose : "…"}
                disabled={!entities}
                invalid={showErrors && !entity ? true : undefined}
                title={t.cash.where}
                onChange={setCash}
                {...selectCopy}
              />
            </Field>
            <ErrorNote message={error} />
            <PrimaryButton>{t.flow.continue} →</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "data" &&
        (method === "breb" || method === "transferencia") ? (
          <PayForm onSubmit={next}>
            {method === "breb" && link.breb ? (
              <div>
                <CopyRow
                  label={t.breb.key}
                  value={link.breb.key}
                  mono
                  big
                  {...c}
                />
                <CopyRow
                  label={t.breb.holder}
                  value={link.breb.holder}
                  {...c}
                />
                <CopyRow
                  label={t.breb.amount}
                  value={link.amount}
                  mono
                  {...c}
                />
                <CopyRow
                  label={t.reference}
                  value={link.reference}
                  mono
                  {...c}
                />
                <ol className="mt-6 space-y-2">
                  {t.breb.steps.map((s, i) => (
                    <li key={s} className="flex gap-4 text-base">
                      <span className="text-sm tabular-nums">0{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm">{t.breb.limit}</p>
              </div>
            ) : null}
            {method === "transferencia" && account ? (
              <div>
                <CopyRow
                  label={t.transfer.number}
                  value={account.account_number}
                  mono
                  big
                  {...c}
                />
                <div className="grid grid-cols-2 gap-x-6">
                  <CopyRow
                    label={t.transfer.bank}
                    value={account.bank}
                    {...c}
                  />
                  <CopyRow
                    label={t.transfer.type}
                    value={account.account_type}
                    {...c}
                  />
                </div>
                <CopyRow
                  label={t.transfer.holder}
                  value={account.holder}
                  {...c}
                />
                <CopyRow
                  label={t.transfer.holderId}
                  value={account.holder_id}
                  mono
                  {...c}
                />
                <CopyRow
                  label={t.transfer.routing}
                  value={account.routing}
                  mono
                  {...c}
                />
                <CopyRow
                  label={t.transfer.swift}
                  value={account.swift}
                  mono
                  {...c}
                />
                <CopyRow
                  label={t.transfer.address}
                  value={account.bank_address}
                  {...c}
                />
                <div className="grid grid-cols-2 gap-x-6">
                  <CopyRow
                    label={t.breb.amount}
                    value={link.amount}
                    mono
                    {...c}
                  />
                  <CopyRow
                    label={t.reference}
                    value={link.reference}
                    mono
                    {...c}
                  />
                </div>
                <p className="mt-4 text-base">{t.transfer.note}</p>
                {link.transfer_certificate_filename ? (
                  <div className="mt-6">
                    <DocumentCard
                      href={`${base}/certificado`}
                      thumbnail={`${base}/certificado-miniatura`}
                      title={t.certificateCard.title}
                      subtitle={
                        account.bank
                          ? `${account.bank}, ${account.account_type}`
                          : link.transfer_certificate_filename
                      }
                      action={t.certificateCard.action}
                      preview={t.certificateCard.preview}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
            <PrimaryButton>
              {method === "breb" ? t.breb.done : t.transfer.done} →
            </PrimaryButton>
          </PayForm>
        ) : null}

        {step === "payer" ? (
          <PayForm onSubmit={next}>
            <PayerFields
              payer={payer}
              setPayer={setPayer}
              t={t}
              link={link}
              showErrors={showErrors}
            />
            <ErrorNote message={error} />
            <PrimaryButton>{t.flow.continue} →</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "report" ? (
          <PayForm onSubmit={next}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={t.declare.name}>
                <input
                  className={inputClass}
                  value={report.name}
                  aria-invalid={
                    showErrors && report.name.trim().length < 2
                      ? true
                      : undefined
                  }
                  onChange={(e) =>
                    setReport({ ...report, name: e.target.value })
                  }
                />
              </Field>
              <Field label={t.declare.email}>
                <input
                  className={inputClass}
                  type="email"
                  value={report.email}
                  onChange={(e) =>
                    setReport({ ...report, email: e.target.value })
                  }
                />
              </Field>
            </div>
            <Field label={t.declare.note} className="mt-4">
              <input
                className={inputClass}
                value={report.note}
                onChange={(e) => setReport({ ...report, note: e.target.value })}
              />
            </Field>
            <label className="mt-4 flex cursor-pointer items-center gap-4 rounded-2xl p-4 ring-1 ring-white transition hover:bg-white/[0.06]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden
                >
                  <path
                    d="M12 16V4m0 0l-5 5m5-5l5 5M5 20h14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">
                  {report.proof ? report.proof.name : t.declare.proof}
                </span>
                <span className="block text-sm">
                  {report.proof ? t.declare.proofChange : t.declare.proofHint}
                </span>
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                className="sr-only"
                onChange={(e) =>
                  setReport({ ...report, proof: e.target.files?.[0] ?? null })
                }
              />
            </label>
            <ErrorNote message={error} />
            <PrimaryButton>{t.flow.continue} →</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "confirm" ? (
          <PayForm onSubmit={pay}>
            <p className="text-base">{t.flow.confirmNote}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Summary
                title={t.flow.sections.method}
                edit={t.flow.edit}
                onEdit={onChangeMethod}
              >
                <span className="flex flex-wrap items-center gap-3">
                  {t.methods[method].name}
                  <BrandRow
                    ids={
                      method === "tarjeta" && brand !== "other"
                        ? [brand]
                        : brandsForMethod(method, account?.bank)
                    }
                    size="xs"
                  />
                </span>
              </Summary>

              {method === "tarjeta" ? (
                <Summary
                  title={t.flow.sections.data}
                  edit={t.flow.edit}
                  onEdit={() => go("data")}
                >
                  <span className="flex items-center gap-3">
                    {brand !== "other" ? (
                      <BrandTile id={brand} size="xs" />
                    ) : null}
                    {t.flow.cardEnding(
                      card.number.replace(/\D/g, "").slice(-4),
                    )}
                  </span>
                  <span className="block">
                    {card.holder}, {card.expiry}
                    {link.currency === "COP"
                      ? `, ${t.flow.installmentsShort(Number(card.installments))}`
                      : ""}
                  </span>
                </Summary>
              ) : null}
              {method === "pse" ? (
                <Summary
                  title={t.flow.sections.data}
                  edit={t.flow.edit}
                  onEdit={() => go("data")}
                >
                  <span className="block">{bankName}</span>
                  <span className="block">
                    {pse.person === "1" ? t.pse.juridica : t.pse.natural}
                  </span>
                </Summary>
              ) : null}
              {method === "efectivo" ? (
                <Summary
                  title={t.flow.sections.data}
                  edit={t.flow.edit}
                  onEdit={() => go("data")}
                >
                  <span className="flex items-center gap-3">
                    {CASH_BRANDS[entity] ? (
                      <BrandTile id={CASH_BRANDS[entity]!} size="xs" />
                    ) : null}
                    {entityName}
                  </span>
                </Summary>
              ) : null}
              {method === "breb" || method === "transferencia" ? (
                <Summary
                  title={t.flow.sections.data}
                  edit={t.flow.edit}
                  onEdit={() => go("data")}
                >
                  <span className="block">
                    {method === "breb"
                      ? link.breb?.key
                      : `${account?.bank ?? ""} ${account?.account_number ?? ""}`}
                  </span>
                  <span className="block">
                    {t.reference} {link.reference}
                  </span>
                </Summary>
              ) : null}

              {steps.includes("payer") ? (
                <Summary
                  title={t.flow.sections.payer}
                  edit={t.flow.edit}
                  onEdit={() => go("payer")}
                >
                  <span className="block">
                    {[payer.name, payer.last_name].filter(Boolean).join(" ")}
                  </span>
                  <span className="block">
                    {payer.doc_type} {payer.doc_number}
                    {payer.doc_type === "NIT"
                      ? `-${payer.dv ?? ""}`
                      : ""}
                  </span>
                  <span className="block">{payer.email}</span>
                  <span className="block">
                    {payer.phone_country} {payer.phone}
                  </span>
                </Summary>
              ) : null}
              {steps.includes("report") ? (
                <Summary
                  title={t.flow.sections.report}
                  edit={t.flow.edit}
                  onEdit={() => go("report")}
                >
                  <span className="block">{report.name}</span>
                  {report.email ? (
                    <span className="block">{report.email}</span>
                  ) : null}
                  <span className="block">
                    {report.proof
                      ? `${t.flow.proofAttached}: ${report.proof.name}`
                      : t.flow.noProof}
                  </span>
                </Summary>
              ) : null}
            </div>
            <ErrorNote message={error} />
            <PrimaryButton busy={busy}>{payLabel}</PrimaryButton>
          </PayForm>
        ) : null}

        {step === "otp" ? (
          <PayForm onSubmit={confirmOtp}>
            <p className="text-base">{t.daviplata.note}</p>
            <Field label={t.daviplata.otp} className="mt-6">
              <input
                className={`${inputClass} h-16 text-center text-3xl tabular-nums`}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
              />
            </Field>
            <ErrorNote message={error} />
            <PrimaryButton busy={busy} disabled={otp.length < 4}>
              {t.daviplata.confirm}
            </PrimaryButton>
          </PayForm>
        ) : null}
      </Panel>
      </div>
    </div>
  );
}

/** Una sección de la hoja de confirmación, con su botón para editarla. */
function Summary({
  title,
  edit,
  onEdit,
  children,
}: {
  title: string;
  edit: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-start gap-4 rounded-2xl p-4 ring-1 ring-white">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <div className="mt-1.5 flex flex-col gap-0.5 text-base">{children}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ring-white transition hover:bg-white hover:text-black"
      >
        {edit}
      </button>
    </section>
  );
}

/** Dos o tres opciones cortas: más rápido que un menú. */
function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl p-1 ring-1 ring-white"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`h-10 rounded-lg text-sm font-semibold transition ${value === o.value ? "bg-white text-black" : "hover:bg-white/[0.08]"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Quién paga: documento y número en un renglón, nombre y apellido en otro, correo y celular con indicativo. */
function PayerFields({
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
  const selectCopy = { searchLabel: t.flow.search, closeLabel: t.flow.close };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div
        className={`grid gap-3 ${company ? "grid-cols-[6.5rem_1fr_4.5rem]" : "grid-cols-[6.5rem_1fr]"}`}
      >
        <Field label={t.payer.docType}>
          <Select
            value={payer.doc_type}
            options={types.map((type) => ({ value: type, label: type }))}
            placeholder="CC"
            title={t.payer.docType}
            onChange={(v) => {
              const number =
                v === "NIT"
                  ? payer.doc_number.replace(/\D/g, "").slice(0, 9)
                  : payer.doc_number;
              set({
                doc_type: v,
                doc_number: number,
                dv: v === "NIT" ? nitCheckDigit(number) : "",
              });
            }}
            {...selectCopy}
          />
        </Field>
        <Field label={t.payer.docNumber}>
          <input
            className={`${inputClass} tabular-nums`}
            inputMode={company || payer.doc_type === "CC" ? "numeric" : "text"}
            autoComplete="off"
            value={payer.doc_number}
            aria-invalid={bad(payer.doc_number.replace(/\W/g, "").length >= 4)}
            onChange={(e) => {
              const number = company
                ? e.target.value.replace(/\D/g, "").slice(0, 9)
                : e.target.value;
              // Al cambiar el NIT, el DV se vuelve a calcular; después se puede corregir a mano.
              set({ doc_number: number, ...(company ? { dv: nitCheckDigit(number) } : {}) });
            }}
          />
        </Field>
        {company ? (
          <Field label={t.flow.dv}>
            <input
              className={`${inputClass} text-center tabular-nums`}
              inputMode="numeric"
              autoComplete="off"
              maxLength={1}
              value={payer.dv ?? ""}
              aria-invalid={bad(/^\d$/.test(payer.dv ?? ""))}
              onChange={(e) => set({ dv: e.target.value.replace(/\D/g, "").slice(-1) })}
            />
          </Field>
        ) : null}
      </div>
      <div className={`grid gap-3 ${company ? "grid-cols-1" : "grid-cols-2"}`}>
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
      <div className="grid grid-cols-[6.5rem_1fr] gap-3">
        <Field label={t.flow.country}>
          <Select
            value={payer.phone_country ?? "+57"}
            options={COUNTRIES.map((c) => ({
              value: c.dial,
              label: `${c.name} ${c.dial}`,
              short: c.dial,
            }))}
            placeholder="+57"
            title={t.flow.country}
            onChange={(v) => set({ phone_country: v })}
            {...selectCopy}
          />
        </Field>
        <Field label={t.payer.phone}>
          <input
            className={`${inputClass} tabular-nums`}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={payer.phone}
            aria-invalid={bad(payer.phone.replace(/\D/g, "").length >= 7)}
            onChange={(e) => set({ phone: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

/** Carga la lista de bancos o de puntos de efectivo una sola vez, y solo si hace falta. */
function useOptions(
  code: string,
  kind: "bancos" | "efectivo",
  needed: boolean,
) {
  const [options, setOptions] = useState<Option[] | null>(null);
  useEffect(() => {
    if (!needed) return;
    let alive = true;
    actions.loadOptions(code, kind).then((result) => {
      if (alive) setOptions(result.ok ? result.data : []);
    });
    return () => {
      alive = false;
    };
  }, [code, kind, needed]);
  return useMemo(() => options, [options]);
}

/** Archivo a base64, sin el prefijo `data:`. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** El motivo que da ePayco al rechazar una tarjeta, venga como venga. */
function describeFailure(failure: unknown): string {
  if (!failure) return "";
  if (typeof failure === "string") return failure;
  const f = failure as Record<string, unknown> & { data?: Record<string, unknown> };
  const text = [f.data?.description, f.description, f.data?.message, f.message, f.title].find(
    (v): v is string => typeof v === "string" && v.trim().length > 0,
  );
  return text ?? "";
}
