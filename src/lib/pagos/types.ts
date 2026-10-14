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
  /** Franquicia usada si fue tarjeta: visa, mastercard, amex o diners. */
  card_brand: string;
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
  invoice_filename: string;
  invoice_number: string;
  /** Desglose de la factura; vacíos si no se dio. */
  subtotal: string;
  tax: string;
  withholding: string;
  /** Si el cobro trae foto de lo vendido o entregado. */
  has_image: boolean;
  /** Nombre del certificado bancario de la cuenta para transferencias; vacío si no hay. */
  transfer_certificate_filename: string;
  /** Concepto y descripción en inglés; vacíos si no se dieron. */
  concept_en: string;
  description_en: string;
  /** Del cliente, escritos al crear el cobro o leídos de la factura. */
  client_phone: string;
  client_address: string;
  client_city: string;
};

export type Option = { code: string; name: string };

export type Payer = {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  doc_type: string;
  doc_number: string;
  /** Indicativo del celular, "+57" por defecto. */
  phone_country?: string;
  /** Dígito de verificación del NIT. Se calcula al escribir el NIT, pero se puede corregir. */
  dv?: string;
};

/** Lo que devuelve cada acción del servidor a la página. */
export type Result<T> = { ok: true; data: T } | { ok: false; message: string };
