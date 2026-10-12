/**
 * Lo que devuelve el servicio de pagos a través de Kong. Kong entrega los
 * nombres de campo en snake_case, tal cual el contrato de protobuf.
 */
export type Method = "tarjeta" | "pse" | "breb" | "transferencia" | "efectivo" | "daviplata";
export type Currency = "COP" | "USD";
export type LinkStatus = "pendiente" | "pagado" | "anulado" | "vencido";
export type AttemptStatus =
  | "iniciado"
  | "pendiente"
  | "aprobado"
  | "rechazado"
  | "abandonado"
  | "en_revision";

export type BankAccount = {
  bank: string;
  account_type: string;
  account_number: string;
  holder: string;
  holder_id: string;
  routing: string;
  swift: string;
  bank_address: string;
};

export type Attempt = {
  id: string;
  method: Method;
  status: AttemptStatus;
  amount: string;
  currency: Currency;
  provider_reference: string;
  redirect_url: string;
  cash_code: string;
  cash_agreement: string;
  cash_entity: string;
  cash_expires_at: string | null;
  /** JSON para `window.validate3ds`, vacío si el banco no pidió 3D Secure. */
  three_ds: string;
  message: string;
  created_at: string | null;
};

export type PublicLink = {
  code: string;
  concept: string;
  description: string;
  client_name: string;
  client_email: string;
  client_doc_type: string;
  client_doc_number: string;
  amount: string;
  currency: Currency;
  methods: Method[];
  status: LinkStatus;
  locale: string;
  expires_at: string | null;
  reference: string;
  epayco_public_key: string;
  epayco_test: boolean;
  breb: { key: string; holder: string } | null;
  transfer: BankAccount | null;
  last_attempt: Attempt | null;
  paid_at: string | null;
  paid_method: Method | null;
};

export type Option = { code: string; name: string };

export type Payer = {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  doc_type: string;
  doc_number: string;
};

/** Lo que devuelve cada acción del servidor a la página. */
export type Result<T> = { ok: true; data: T } | { ok: false; message: string };
