import type { Attempt, Currency, LinkStatus, Method, Option, PublicLink } from "./types";

/**
 * Cliente del servicio de pagos, solo de servidor. La página nunca habla con
 * Kong desde el navegador: así la URL del gateway no queda expuesta, no hace
 * falta CORS y la IP real del pagador se toma de las cabeceras de Vercel.
 */
const API = (process.env.PAYMENTS_API_URL ?? "https://gateway-production-4f05.up.railway.app").replace(/\/$/, "");

export class PagosError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: init?.body === undefined ? undefined : { "Content-Type": "application/json" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
    signal: AbortSignal.timeout(28_000),
  });

  if (!response.ok) {
    // Kong entrega el error de gRPC en una cabecera, con el cuerpo vacío.
    const raw = response.headers.get("grpc-message") ?? "";
    let message = raw;
    try {
      message = decodeURIComponent(raw);
    } catch {
      // Se deja tal cual.
    }
    throw new PagosError(response.status, message || `error ${response.status}`);
  }
  return (await response.json()) as T;
}

const strip = (value: string | undefined, prefix: string) =>
  (value ?? "").replace(prefix, "").toLowerCase();

/** Kong devuelve las fechas sin zona; son UTC. */
const utc = (value: string | null | undefined) =>
  value ? (value.endsWith("Z") ? value : `${value}Z`) : null;

function normalizeAttempt(raw: Record<string, string> | null | undefined): Attempt | null {
  if (!raw || !raw.id) return null;
  return {
    id: raw.id,
    method: strip(raw.method, "METHOD_") as Method,
    status: strip(raw.status, "ATTEMPT_STATUS_") as Attempt["status"],
    amount: raw.amount ?? "",
    currency: strip(raw.currency, "CURRENCY_").toUpperCase() as Currency,
    provider_reference: raw.provider_reference ?? "",
    redirect_url: raw.redirect_url ?? "",
    cash_code: raw.cash_code ?? "",
    cash_agreement: raw.cash_agreement ?? "",
    cash_entity: raw.cash_entity ?? "",
    cash_expires_at: utc(raw.cash_expires_at),
    three_ds: raw.three_ds ?? "",
    message: raw.message ?? "",
    created_at: utc(raw.created_at),
  };
}

export async function getLink(code: string): Promise<PublicLink | null> {
  try {
    const raw = await request<Record<string, never>>(`/v1/pagos/publico/${encodeURIComponent(code)}`);
    const r = raw as unknown as Record<string, unknown> & { methods?: string[] };
    return {
      code: String(r.code ?? ""),
      concept: String(r.concept ?? ""),
      description: String(r.description ?? ""),
      client_name: String(r.client_name ?? ""),
      client_email: String(r.client_email ?? ""),
      client_doc_type: String(r.client_doc_type ?? ""),
      client_doc_number: String(r.client_doc_number ?? ""),
      amount: String(r.amount ?? "0"),
      currency: strip(String(r.currency ?? ""), "CURRENCY_").toUpperCase() as Currency,
      methods: (r.methods ?? []).map((m) => strip(m, "METHOD_") as Method),
      status: strip(String(r.status ?? ""), "LINK_STATUS_") as LinkStatus,
      locale: String(r.locale ?? "es"),
      expires_at: utc(r.expires_at as string | undefined),
      reference: String(r.reference ?? ""),
      epayco_public_key: String(r.epayco_public_key ?? ""),
      epayco_test: Boolean(r.epayco_test),
      breb: (r.breb as PublicLink["breb"]) ?? null,
      transfer: (r.transfer as PublicLink["transfer"]) ?? null,
      last_attempt: normalizeAttempt(r.last_attempt as Record<string, string> | undefined),
      paid_at: utc(r.paid_at as string | undefined),
      paid_method: r.paid_method && r.paid_method !== "METHOD_UNSPECIFIED"
        ? (strip(String(r.paid_method), "METHOD_") as Method)
        : null,
      invoice_filename: String(r.invoice_filename ?? ""),
      invoice_number: String(r.invoice_number ?? ""),
    };
  } catch (error) {
    if (error instanceof PagosError && error.status === 404) return null;
    throw error;
  }
}

/** La factura del cobro, para descargarla desde la página de pago. */
export async function getInvoice(code: string): Promise<{ filename: string; contentType: string; data: Buffer } | null> {
  try {
    const raw = await request<{ filename?: string; content_type?: string; data?: string }>(
      `/v1/pagos/publico/${encodeURIComponent(code)}/factura`,
    );
    if (!raw.data) return null;
    return {
      filename: raw.filename || "factura.pdf",
      contentType: raw.content_type || "application/pdf",
      data: Buffer.from(raw.data, "base64"),
    };
  } catch (error) {
    if (error instanceof PagosError && error.status === 404) return null;
    throw error;
  }
}

export async function listBanks(code: string): Promise<Option[]> {
  const raw = await request<{ banks?: Option[] }>(`/v1/pagos/publico/${encodeURIComponent(code)}/bancos`);
  return raw.banks ?? [];
}

export async function listCashEntities(code: string): Promise<Option[]> {
  const raw = await request<{ banks?: Option[] }>(`/v1/pagos/publico/${encodeURIComponent(code)}/efectivo`);
  return raw.banks ?? [];
}

export async function post(code: string, action: string, body: Record<string, unknown>): Promise<Attempt> {
  const raw = await request<Record<string, string>>(
    `/v1/pagos/publico/${encodeURIComponent(code)}/${action}`,
    { method: "POST", body: { code, ...body } },
  );
  const attempt = normalizeAttempt(raw);
  if (!attempt) throw new PagosError(502, "respuesta sin intento");
  return attempt;
}

export async function getAttempt(code: string, attemptId: string): Promise<Attempt | null> {
  const raw = await request<Record<string, string>>(
    `/v1/pagos/publico/${encodeURIComponent(code)}/intentos/${encodeURIComponent(attemptId)}`,
  );
  return normalizeAttempt(raw);
}

export type { LinkStatus };
