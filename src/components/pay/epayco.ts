/**
 * Scripts de ePayco en el navegador, cargados solo cuando hacen falta.
 *
 * Tokenización: `epayco.min.js` cifra la tarjeta en el navegador y la manda a
 * ePayco; a nuestro servidor solo llega el token. El script usa `$.ajax`, así
 * que necesita jQuery. Se carga jQuery solo aquí, al elegir tarjeta, para no
 * pesar en el resto del sitio.
 *
 * 3D Secure: `validateThreeds.min.js` dibuja la verificación del banco encima
 * de la página y avisa el resultado con `postMessage`. Es lo que ya funciona
 * en Imagiq.
 */

type TokenCallback = (error: unknown, token: string | null) => void;

declare global {
  interface Window {
    ePayco?: {
      setPublicKey: (key: string) => void;
      token: { create: (data: unknown, callback: TokenCallback) => void };
    };
    jQuery?: unknown;
    validate3ds?: (data: unknown) => void;
  }
}

const JQUERY = "https://code.jquery.com/jquery-3.7.1.min.js";
const JQUERY_SRI = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
const TOKENIZER = "https://checkout.epayco.co/epayco.min.js";
const THREE_DS = "https://multimedia.epayco.co/general/3DS/validateThreeds.min.js";

const loading = new Map<string, Promise<void>>();

function script(src: string, integrity?: string): Promise<void> {
  const existing = loading.get(src);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    if (integrity) {
      el.integrity = integrity;
      el.crossOrigin = "anonymous";
    }
    el.onload = () => resolve();
    el.onerror = () => {
      loading.delete(src);
      reject(new Error(`no cargó ${src}`));
    };
    document.head.appendChild(el);
  });
  loading.set(src, promise);
  return promise;
}

/**
 * `epayco.min.js` guarda su sesión en `keyUserIndex`, pero la primera vez la
 * crea con `setItem`, que devuelve `undefined`, y cifra con eso: el primer pago
 * de cada navegador falla. Se crea antes para que nunca llegue vacía.
 */
function seedSession() {
  try {
    if (!localStorage.getItem("keyUserIndex")) localStorage.setItem("keyUserIndex", crypto.randomUUID());
  } catch {
    // Sin almacenamiento local el script de ePayco tampoco funciona; el error
    // llega por su callback.
  }
}

/** Precarga apenas el cliente elige tarjeta, para que pagar no espere. */
export async function prepareTokenizer(publicKey: string) {
  seedSession();
  await script(JQUERY, JQUERY_SRI);
  await script(TOKENIZER);
  window.ePayco?.setPublicKey(publicKey);
}

export type CardData = {
  name: string;
  email: string;
  number: string;
  cvc: string;
  month: string;
  /** Cuatro cifras. */
  year: string;
};

export async function tokenizeCard(publicKey: string, card: CardData): Promise<string> {
  await prepareTokenizer(publicKey);
  const ePayco = window.ePayco;
  if (!ePayco) throw new Error("tokenizador no disponible");

  return new Promise((resolve, reject) => {
    // Un objeto en vez de un formulario: el script lo acepta igual y así ningún
    // dato de tarjeta queda en el DOM con atributos que otro script pueda leer.
    ePayco.token.create(
      {
        card: {
          name: card.name,
          email: card.email,
          number: card.number.replace(/\s/g, ""),
          cvc: card.cvc,
          exp_month: card.month.padStart(2, "0"),
          exp_year: card.year,
        },
      },
      (error, token) => {
        if (error || !token) reject(error ?? new Error("sin token"));
        else resolve(token);
      },
    );
  });
}

export type ThreeDsOutcome = "ok" | "fail";

/**
 * Corre la verificación del banco y espera su resultado. Lo que vuelve es solo
 * una pista: el estado real del pago se pregunta siempre al servidor.
 */
export async function runThreeDs(data: unknown, timeoutMs = 10 * 60_000): Promise<ThreeDsOutcome> {
  await script(THREE_DS);
  if (!window.validate3ds) throw new Error("3DS no disponible");

  return new Promise((resolve) => {
    let done = false;
    const finish = (outcome: ThreeDsOutcome) => {
      if (done) return;
      done = true;
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      resolve(outcome);
    };

    function onMessage(event: MessageEvent) {
      let payload: unknown = event.data;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      if (!payload || typeof payload !== "object") return;
      const p = payload as Record<string, unknown> & { data?: { ref_payco?: unknown } };

      if ((p.success && p.success !== "false") || p.data?.ref_payco) finish("ok");
      else if (p.success === false || p.message === "Error" || (p.MessageType === "profile.completed" && p.Status === false)) {
        finish("fail");
      }
    }

    window.addEventListener("message", onMessage);
    const timer = setTimeout(() => finish("fail"), timeoutMs);
    window.validate3ds!(data);
  });
}

/** Lo que el script de 3DS deja colgando si el banco rechaza. */
export function cleanupThreeDs() {
  document.querySelectorAll("iframe").forEach((frame) => {
    if (/epayco|3ds|cardinal/i.test(frame.src) || /modal/i.test(frame.id)) frame.remove();
  });
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

export type Brand = "visa" | "mastercard" | "amex" | "diners" | "other";

export function cardBrand(number: string): Brand {
  const n = number.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^3(0[0-5]|[68])/.test(n)) return "diners";
  return "other";
}

/** Grupos de cuatro, o 4 6 5 en Amex. */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  if (cardBrand(digits) === "amex") {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)].filter(Boolean).join(" ");
  }
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function luhn(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 13) return false;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}
