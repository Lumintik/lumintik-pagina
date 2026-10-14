"use server";

import { headers } from "next/headers";

import * as api from "@/lib/pagos/api";
import type { Attempt, Option, Payer, Result } from "@/lib/pagos/types";

/**
 * Acciones de la página de pago. Corren en el servidor de Vercel: el navegador
 * nunca habla con el gateway, y la IP que ePayco exige se toma aquí de las
 * cabeceras de Vercel, que el pagador no puede falsificar.
 */

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "127.0.0.1";
}

async function returnUrl(code: string, locale: string): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "www.lumintik.com";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}/${locale === "en" ? "en/pay" : "es/pagar"}/${code}`;
}

function fail(error: unknown, fallback: string): { ok: false; message: string } {
  if (error instanceof api.PagosError && error.status < 500 && error.message) {
    return { ok: false, message: error.message };
  }
  console.error("[pagos]", error);
  return { ok: false, message: fallback };
}

function payerBody(payer: Payer, ip: string) {
  return {
    name: payer.name,
    last_name: payer.last_name,
    email: payer.email,
    phone: payer.phone,
    doc_type: payer.doc_type,
    doc_number: payer.doc_number,
    ip,
  };
}

export async function payWithCard(
  code: string,
  locale: string,
  input: { cardToken: string; payer: Payer; installments: number },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "tarjeta", {
      card_token: input.cardToken,
      payer: payerBody(input.payer, await clientIp()),
      installments: input.installments,
      return_url: await returnUrl(code, locale),
    });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function startPse(
  code: string,
  locale: string,
  input: { bankCode: string; personType: number; payer: Payer },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "pse", {
      bank_code: input.bankCode,
      person_type: input.personType,
      payer: payerBody(input.payer, await clientIp()),
      return_url: await returnUrl(code, locale),
    });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function startCash(
  code: string,
  locale: string,
  input: { entity: string; payer: Payer },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "efectivo", {
      entity: input.entity,
      payer: payerBody(input.payer, await clientIp()),
      return_url: await returnUrl(code, locale),
    });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function startDaviplata(
  code: string,
  locale: string,
  input: { payer: Payer },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "daviplata", {
      payer: payerBody(input.payer, await clientIp()),
      return_url: await returnUrl(code, locale),
    });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function confirmDaviplata(
  code: string,
  input: { attemptId: string; otp: string },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "daviplata/confirmar", { attempt_id: input.attemptId, otp: input.otp });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function declareTransfer(
  code: string,
  input: {
    method: "breb" | "transferencia";
    name: string;
    email: string;
    note: string;
    /** Comprobante en base64, opcional. */
    proof?: { data: string; name: string };
  },
  fallback: string,
): Promise<Result<Attempt>> {
  try {
    const data = await api.post(code, "aviso", {
      method: `METHOD_${input.method.toUpperCase()}`,
      payer: { name: input.name, email: input.email },
      note: input.note,
      ...(input.proof ? { proof: input.proof.data, proof_filename: input.proof.name } : {}),
    });
    return { ok: true, data };
  } catch (error) {
    return fail(error, fallback);
  }
}

export async function checkAttempt(code: string, attemptId: string): Promise<Result<Attempt | null>> {
  try {
    return { ok: true, data: await api.getAttempt(code, attemptId) };
  } catch (error) {
    return fail(error, "");
  }
}

export async function loadOptions(code: string, kind: "bancos" | "efectivo"): Promise<Result<Option[]>> {
  try {
    const data = kind === "bancos" ? await api.listBanks(code) : await api.listCashEntities(code);
    return { ok: true, data };
  } catch (error) {
    return fail(error, "");
  }
}
