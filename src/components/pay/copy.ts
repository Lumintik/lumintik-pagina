import type { Locale } from "@/lib/locale";
import type { AttemptStatus, Method } from "@/lib/pagos/types";

/**
 * Textos de la página de pago. Viven aparte de messages.ts porque esta página
 * no comparte nada con el resto del sitio y así no engorda su paquete.
 * Sin rayas en ningún texto.
 */
const ES = {
  title: "Pago",
  payTo: "Pago a Lumintik",
  for: "Para",
  reference: "Referencia",
  expires: "Vence",
  invoice: "Factura",
  download: "Descargar",
  sheet: {
    total: "Total a pagar",
    subtotal: "Subtotal",
    tax: "IVA",
    withholding: "Retenciones",
    details: "Ver detalle",
    hide: "Ocultar detalle",
    pick: "Elige un medio de pago",
    continueWith: "Continuar con",
  },
  secure: "Conexión cifrada. Los datos de tu tarjeta van directo a ePayco; Lumintik nunca los ve.",
  secureNoCard: "Conexión cifrada. El pago lo procesa ePayco; Lumintik nunca ve tus datos bancarios.",
  testMode: "Modo de prueba: no se cobra dinero real.",
  chooseMethod: "Elige cómo pagar",
  back: "Cambiar medio",
  methods: {
    tarjeta: { name: "Tarjeta", hint: "Crédito o débito" },
    pse: { name: "PSE", hint: "Débito desde tu cuenta, en la página de tu banco" },
    breb: { name: "BreB", hint: "Transferencia inmediata con llave, desde la app de tu banco" },
    transferencia: { name: "Transferencia", hint: "A nuestra cuenta bancaria" },
    efectivo: { name: "Efectivo", hint: "Con un código en un punto de pago" },
    daviplata: { name: "Daviplata", hint: "Con un código que llega a tu celular" },
  } satisfies Record<Method, { name: string; hint: string }>,
  payer: {
    heading: "Datos de quien paga",
    name: "Nombre",
    lastName: "Apellido",
    company: "Razón social",
    email: "Correo",
    phone: "Celular",
    docType: "Documento",
    docNumber: "Número",
  },
  card: {
    holder: "Nombre como aparece en la tarjeta",
    number: "Número de tarjeta",
    expiry: "Vence (MM/AA)",
    cvc: "CVC",
    installments: "Cuotas",
    pay: "Pagar",
  },
  pse: {
    bank: "Banco",
    chooseBank: "Elige tu banco",
    personType: "Tipo de persona",
    natural: "Natural",
    juridica: "Jurídica",
    go: "Continuar al banco",
    note: "Vas a la página de tu banco a autorizar el débito y vuelves aquí para ver el resultado.",
  },
  cash: {
    where: "Dónde vas a pagar",
    go: "Generar código",
    code: "Código de pago",
    agreement: "Convenio",
    until: "Paga antes de",
    note: "Presenta el convenio y el código en el punto. Esta página se actualiza sola cuando el pago llegue.",
  },
  daviplata: {
    go: "Enviar código a mi celular",
    otp: "Código de Daviplata",
    confirm: "Confirmar pago",
    note: "Te llegó un código por mensaje. Escríbelo aquí para autorizar el pago.",
  },
  breb: {
    key: "Llave",
    holder: "A nombre de",
    amount: "Monto exacto",
    steps: [
      "Abre la app de tu banco y elige pagar con BreB.",
      "Escribe la llave y el monto exacto.",
      "En la descripción escribe la referencia.",
    ],
    limit: "Si tu banco no te deja enviar este monto por BreB, elige otro medio de pago.",
    done: "Ya pagué",
  },
  transfer: {
    bank: "Banco",
    type: "Tipo de cuenta",
    number: "Número de cuenta",
    holder: "Titular",
    holderId: "Identificación",
    routing: "Routing",
    swift: "SWIFT",
    address: "Dirección del banco",
    note: "Transfiere el monto exacto y escribe la referencia en el concepto.",
    done: "Ya transferí",
  },
  declare: {
    heading: "Cuéntanos que ya pagaste",
    name: "Nombre de quien pagó",
    email: "Correo para la confirmación",
    note: "Banco u observación (opcional)",
    send: "Avisar el pago",
  },
  copy: "Copiar",
  copied: "Copiado",
  status: {
    paid: "Pago confirmado",
    paidBody: "Recibimos tu pago. Gracias.",
    processing: "Procesando",
    review: "Pago en revisión",
    reviewBody: "Avisaste el pago. Lo confirmamos apenas lo veamos en la cuenta y te escribimos.",
    pending: "Esperando confirmación",
    pendingBody: "El banco todavía no confirma. Esta página se actualiza sola.",
    rejected: "Pago no aprobado",
    rejectedBody: "No se completó el pago. Puedes intentar de nuevo o elegir otro medio.",
    retry: "Intentar de nuevo",
    cancelled: "Este link fue anulado",
    cancelledBody: "Si crees que es un error, escríbenos.",
    expired: "Este link venció",
    expiredBody: "Pídenos uno nuevo y te lo enviamos de inmediato.",
    receipt: "Comprobante",
    method: "Medio",
    date: "Fecha",
  },
  sequence: ["Conectando", "Autorizando", "Confirmando"],
  errors: {
    generic: "No fue posible procesar el pago. Intenta de nuevo en unos minutos.",
    card: "Revisa los datos de la tarjeta.",
    required: "Completa los campos marcados.",
    threeDs: "No se pudo verificar la tarjeta con tu banco. Intenta de nuevo o usa otro medio.",
  },
  contact: "¿Dudas? Escríbenos a",
};

type Copy = typeof ES;

const EN: Copy = {
  title: "Payment",
  payTo: "Payment to Lumintik",
  for: "For",
  reference: "Reference",
  expires: "Due",
  invoice: "Invoice",
  download: "Download",
  sheet: {
    total: "Total due",
    subtotal: "Subtotal",
    tax: "VAT",
    withholding: "Withholdings",
    details: "See breakdown",
    hide: "Hide breakdown",
    pick: "Choose a payment method",
    continueWith: "Continue with",
  },
  secure: "Encrypted connection. Your card details go straight to ePayco; Lumintik never sees them.",
  secureNoCard: "Encrypted connection. ePayco processes the payment; Lumintik never sees your bank details.",
  testMode: "Test mode: no real money is charged.",
  chooseMethod: "Choose how to pay",
  back: "Change method",
  methods: {
    tarjeta: { name: "Card", hint: "Credit or debit" },
    pse: { name: "PSE", hint: "Debit from your Colombian bank account" },
    breb: { name: "BreB", hint: "Instant transfer with a key, from your bank app" },
    transferencia: { name: "Bank transfer", hint: "To our bank account" },
    efectivo: { name: "Cash", hint: "With a code at a payment point" },
    daviplata: { name: "Daviplata", hint: "With a code sent to your phone" },
  },
  payer: {
    heading: "Payer details",
    name: "First name",
    lastName: "Last name",
    company: "Company name",
    email: "Email",
    phone: "Phone",
    docType: "ID type",
    docNumber: "ID number",
  },
  card: {
    holder: "Name as it appears on the card",
    number: "Card number",
    expiry: "Expiry (MM/YY)",
    cvc: "CVC",
    installments: "Installments",
    pay: "Pay",
  },
  pse: {
    bank: "Bank",
    chooseBank: "Choose your bank",
    personType: "Person type",
    natural: "Individual",
    juridica: "Company",
    go: "Continue to your bank",
    note: "You will authorize the debit on your bank's site and come back here for the result.",
  },
  cash: {
    where: "Where you will pay",
    go: "Get payment code",
    code: "Payment code",
    agreement: "Agreement",
    until: "Pay before",
    note: "Show the agreement and the code at the counter. This page updates on its own once the payment arrives.",
  },
  daviplata: {
    go: "Send code to my phone",
    otp: "Daviplata code",
    confirm: "Confirm payment",
    note: "You received a code by text message. Enter it here to authorize the payment.",
  },
  breb: {
    key: "Key",
    holder: "Account holder",
    amount: "Exact amount",
    steps: [
      "Open your bank app and choose BreB.",
      "Enter the key and the exact amount.",
      "Write the reference in the description.",
    ],
    limit: "If your bank does not let you send this amount through BreB, choose another payment method.",
    done: "I have paid",
  },
  transfer: {
    bank: "Bank",
    type: "Account type",
    number: "Account number",
    holder: "Account holder",
    holderId: "Tax ID",
    routing: "Routing",
    swift: "SWIFT",
    address: "Bank address",
    note: "Send the exact amount and include the reference in the memo.",
    done: "I have transferred",
  },
  declare: {
    heading: "Let us know you paid",
    name: "Payer name",
    email: "Email for the confirmation",
    note: "Bank or note (optional)",
    send: "Report payment",
  },
  copy: "Copy",
  copied: "Copied",
  status: {
    paid: "Payment confirmed",
    paidBody: "We received your payment. Thank you.",
    processing: "Processing",
    review: "Payment under review",
    reviewBody: "You reported the payment. We confirm it as soon as it shows in the account and email you.",
    pending: "Awaiting confirmation",
    pendingBody: "The bank has not confirmed yet. This page updates on its own.",
    rejected: "Payment not approved",
    rejectedBody: "The payment did not go through. Try again or choose another method.",
    retry: "Try again",
    cancelled: "This link was cancelled",
    cancelledBody: "If you think this is a mistake, write to us.",
    expired: "This link has expired",
    expiredBody: "Ask us for a new one and we will send it right away.",
    receipt: "Receipt",
    method: "Method",
    date: "Date",
  },
  sequence: ["Connecting", "Authorizing", "Confirming"],
  errors: {
    generic: "We could not process the payment. Please try again in a few minutes.",
    card: "Check your card details.",
    required: "Fill in the highlighted fields.",
    threeDs: "Your bank could not verify the card. Try again or use another method.",
  },
  contact: "Questions? Write to",
};

export const PAY_COPY: Record<Locale, Copy> = { ES, EN };
export type PayCopy = Copy;

export function attemptTone(status: AttemptStatus): "ok" | "wait" | "fail" {
  if (status === "aprobado") return "ok";
  if (status === "rechazado" || status === "abandonado") return "fail";
  return "wait";
}

export function formatMoney(amount: string, currency: "COP" | "USD", locale: Locale): string {
  const value = Number(amount);
  if (currency === "COP") {
    return `$${value.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
  }
  return `US$${value.toLocaleString(locale === "ES" ? "es-CO" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(iso: string | null, locale: Locale, withTime = false): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString(locale === "ES" ? "es-CO" : "en-US", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}
