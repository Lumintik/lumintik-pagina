/**
 * Logos oficiales de los medios de pago y de las marcas que la página nombra.
 * Regla de David: nunca un ícono genérico ni el nombre en texto en su lugar.
 *
 * Cada logo va en una ficha del mismo tamaño, con el logo entero adentro
 * (nunca recortado). La ficha es blanca porque la mayoría de logos oficiales
 * son oscuros; los que ya traen su fondo (BreB, Global66) van tal cual, y el
 * de Gana, que solo existe en blanco, va sobre negro.
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
  | "global66";

const BRANDS: Record<BrandId, { src: string; name: string; tile: "white" | "black" | "own" }> = {
  visa: { src: "/brands/visa.svg", name: "Visa", tile: "white" },
  mastercard: { src: "/brands/mastercard.svg", name: "Mastercard", tile: "white" },
  amex: { src: "/brands/amex.svg", name: "American Express", tile: "white" },
  diners: { src: "/brands/diners.svg", name: "Diners Club", tile: "white" },
  pse: { src: "/brands/pse.png", name: "PSE", tile: "white" },
  breb: { src: "/brands/breb.png", name: "Bre-B", tile: "own" },
  daviplata: { src: "/brands/daviplata.svg", name: "Daviplata", tile: "white" },
  efecty: { src: "/brands/efecty.svg", name: "Efecty", tile: "white" },
  gana: { src: "/brands/gana.svg", name: "Gana", tile: "black" },
  puntored: { src: "/brands/puntored.svg", name: "Punto Red", tile: "white" },
  epayco: { src: "/brands/epayco.svg", name: "ePayco", tile: "white" },
  global66: { src: "/brands/global66.png", name: "Global66", tile: "own" },
};

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

const SIZES = {
  sm: "h-7 w-11 rounded-md p-1",
  md: "h-9 w-14 rounded-lg p-1.5",
  lg: "h-11 w-[4.5rem] rounded-lg p-2",
};

export function BrandTile({ id, size = "sm", className = "" }: { id: BrandId; size?: keyof typeof SIZES; className?: string }) {
  const brand = BRANDS[id];
  const tile =
    brand.tile === "white" ? "bg-white" : brand.tile === "black" ? "bg-black ring-1 ring-white" : "overflow-hidden !p-0";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${SIZES[size]} ${tile} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- logos de marca, SVG estáticos */}
      <img src={brand.src} alt={brand.name} className="h-full w-full object-contain" loading="lazy" decoding="async" />
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
