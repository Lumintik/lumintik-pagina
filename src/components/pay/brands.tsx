/**
 * Logos oficiales de los medios de pago y de las marcas que la página nombra.
 * Regla de David: nunca un ícono genérico ni el nombre en texto en su lugar.
 *
 * Cada logo va en un espacio del mismo tamaño, entero (nunca recortado) y sin
 * ficha de fondo: va directo sobre el negro de la página. Los que son oscuros
 * van en su versión en blanco; los que ya se ven sobre negro o traen su propio
 * sello de color (Amex, BreB, Global66, PCI) van tal cual.
 */
import type { Method } from "@/lib/pagos/types";

export type BrandId =
  | "visa"
  | "mastercard"
  | "amex"
  | "diners"
  | "pse"
  | "breb"
  | "daviplata"
  | "efecty"
  | "gana"
  | "puntored"
  | "epayco"
  | "global66"
  | "davivienda"
  | "pci";

const BRANDS: Record<
  BrandId,
  { src: string; name: string; tone: "white" | "own"; wide?: boolean }
> = {
  visa: { src: "/brands/visa.svg", name: "Visa", tone: "white" },
  mastercard: { src: "/brands/mastercard.svg", name: "Mastercard", tone: "own" },
  amex: { src: "/brands/amex.svg", name: "American Express", tone: "own" },
  diners: { src: "/brands/diners.svg", name: "Diners Club", tone: "white" },
  pse: { src: "/brands/pse.png", name: "PSE", tone: "own" },
  breb: { src: "/brands/breb.png", name: "Bre-B", tone: "own" },
  daviplata: { src: "/brands/daviplata.svg", name: "Daviplata", tone: "white" },
  efecty: { src: "/brands/efecty.svg", name: "Efecty", tone: "white" },
  gana: { src: "/brands/gana.svg", name: "Gana", tone: "own" },
  puntored: { src: "/brands/puntored.svg", name: "Punto Red", tone: "white" },
  epayco: { src: "/brands/epayco.svg", name: "ePayco", tone: "white" },
  global66: { src: "/brands/global66.png", name: "Global66", tone: "own" },
  // Davivienda publica su logo en negativo; va en blanco.
  davivienda: { src: "/brands/davivienda.svg", name: "Davivienda", tone: "own", wide: true },
  // Sello PCI DSS que publica ePayco (evaluado por ControlCase).
  pci: { src: "/brands/pci-dss.png", name: "PCI DSS, evaluado por ControlCase", tone: "own" },
};

/** El logo del banco de una cuenta, si lo tenemos. */
export function bankBrand(name: string): BrandId | null {
  if (/davivienda/i.test(name)) return "davivienda";
  if (/global ?66/i.test(name)) return "global66";
  return null;
}

/** Las marcas de cada medio, en el orden en que se muestran. */
export const METHOD_BRANDS: Record<Method, BrandId[]> = {
  tarjeta: ["visa", "mastercard", "amex", "diners"],
  pse: ["pse"],
  breb: ["breb"],
  transferencia: [],
  efectivo: ["efecty", "gana", "puntored"],
  daviplata: ["daviplata"],
};

/** Códigos de puntos de efectivo que entrega ePayco. Red Servi no tiene logo oficial publicado. */
export const CASH_BRANDS: Record<string, BrandId | undefined> = {
  EF: "efecty",
  GA: "gana",
  PR: "puntored",
};

/** Logos alargados (Davivienda es 10 a 1): misma altura, más ancho, nunca recortados. */
const WIDE: Record<string, string> = { xs: "!w-24", sm: "!w-28", md: "!w-32", lg: "!w-40", wide: "" };

const SIZES = {
  xs: "h-6 w-9 rounded",
  sm: "h-7 w-11 rounded-md",
  wide: "h-9 w-32 rounded-lg",
  md: "h-9 w-14 rounded-lg",
  lg: "h-11 w-[4.5rem] rounded-lg",
};

export function BrandTile({ id, size = "sm", className = "" }: { id: BrandId; size?: keyof typeof SIZES; className?: string }) {
  const brand = BRANDS[id];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${SIZES[size]} ${brand.wide ? WIDE[size] : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- logos de marca, SVG estáticos */}
      <img
        src={brand.src}
        alt={brand.name}
        className={`h-full w-full object-contain ${brand.tone === "white" ? "brightness-0 invert" : ""}`}
        decoding="async"
      />
    </span>
  );
}

export function BrandRow({ ids, size = "sm", className = "" }: { ids: BrandId[]; size?: keyof typeof SIZES; className?: string }) {
  if (!ids.length) return null;
  return (
    <span className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {ids.map((id) => (
        <BrandTile key={id} id={id} size={size} />
      ))}
    </span>
  );
}

const CARD_BRANDS: BrandId[] = ["visa", "mastercard", "amex", "diners"];

/** Los logos de lo que se usó de verdad: la franquicia o el punto de pago, si se saben. */
export function usedBrands(method: Method, attempt: { card_brand?: string; cash_entity?: string } | null): BrandId[] {
  if (method === "tarjeta" && CARD_BRANDS.includes(attempt?.card_brand as BrandId)) return [attempt!.card_brand as BrandId];
  if (method === "efectivo") {
    const cash = CASH_BRANDS[(attempt?.cash_entity ?? "").toUpperCase()];
    if (cash) return [cash];
  }
  return METHOD_BRANDS[method];
}

/** Los logos de un medio en este cobro: en transferencia, el del banco de la cuenta. */
export function brandsForMethod(method: Method, bank: string | undefined): BrandId[] {
  if (method === "transferencia") {
    const id = bankBrand(bank ?? "");
    return id ? [id] : [];
  }
  return METHOD_BRANDS[method];
}
