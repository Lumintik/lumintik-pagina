import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { METHOD_BRANDS, type BrandId } from "@/components/pay/brands";
import { PAY_COPY, formatDate, formatMoney } from "@/components/pay/copy";
import { fromSegment } from "@/lib/locale";
import { getLink } from "@/lib/pagos/api";

/**
 * La tarjeta que se ve al compartir un link de pago por WhatsApp o redes:
 * el cobro de verdad, con el cliente, el concepto, el monto y la factura, en
 * el mismo lenguaje de la página. Negro y blanco; el color solo en la línea
 * del borde del botón y en los logos oficiales de los medios.
 */

export const alt = "Cobro de Lumintik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

async function dataUri(path: string) {
  return `data:image/png;base64,${(await asset("public", ...path.split("/"))).toString("base64")}`;
}

function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const COPY = {
  ES: {
    kicker: "Cobro de Lumintik",
    for: "Para",
    reference: "Referencia",
    invoice: "Factura",
    expires: "Vence",
    secure: "Pago seguro",
    states: { pagado: "Pagado", anulado: "Anulado", vencido: "Vencido" } as Record<string, string>,
  },
  EN: {
    kicker: "Lumintik invoice",
    for: "For",
    reference: "Reference",
    invoice: "Invoice",
    expires: "Due",
    secure: "Secure payment",
    states: { pagado: "Paid", anulado: "Cancelled", vencido: "Expired" } as Record<string, string>,
  },
};

export default async function Image({ params }: { params: Promise<{ locale: string; code: string }> }) {
  const { locale: segment, code } = await params;
  const locale = fromSegment(segment) ?? "ES";
  const c = COPY[locale];
  const t = PAY_COPY[locale];
  const link = await getLink(code).catch(() => null);

  const [light, medium, bold, mono, logo] = await Promise.all([
    asset("src", "assets", "fonts", "manrope-300.woff"),
    asset("src", "assets", "fonts", "manrope-500.woff"),
    asset("src", "assets", "fonts", "manrope-700.woff"),
    asset("src", "assets", "fonts", "jetbrains-mono-500.woff"),
    dataUri("lumintik-logo-white.png"),
  ]);

  const brands: BrandId[] = link
    ? [...new Set(link.methods.flatMap((m) => METHOD_BRANDS[m]))].slice(0, 8)
    : [];
  const tiles = await Promise.all(brands.map((id) => dataUri(`brands/mail/${id}.png`)));

  const state = link ? c.states[link.status] : undefined;
  const amount = link ? formatMoney(link.amount, link.currency, locale) : "";
  const facts: [string, string][] = link
    ? [
        [c.reference, link.reference],
        ...(link.invoice_number ? ([[c.invoice, link.invoice_number]] as [string, string][]) : []),
        ...(link.expires_at && link.status === "pendiente"
          ? ([[c.expires, formatDate(link.expires_at, locale)]] as [string, string][])
          : []),
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(255,255,255,0.16) 0%, rgba(0,0,0,0) 45%), radial-gradient(circle, rgba(255,255,255,0.13) 1.2px, rgba(0,0,0,0) 1.6px)",
          backgroundSize: "100% 100%, 30px 30px",
          color: "#fff",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={logo} height={64} alt="" style={{ height: 64 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 24px",
              borderRadius: 999,
              border: "2px solid #fff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#fff" }} />
            {state ?? c.secure}
          </div>
        </div>

        {link ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
              {c.kicker}
            </div>
            {link.client_name ? (
              <div style={{ display: "flex", marginTop: 18, fontSize: 30, fontWeight: 500 }}>
                {`${c.for} ${clip(link.client_name, 48)}`}
              </div>
            ) : null}
            <div style={{ display: "flex", marginTop: 6, fontSize: 52, fontWeight: 700, lineHeight: 1.1, maxWidth: 1050 }}>
              {clip(link.concept, 64)}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 14 }}>
              <div style={{ display: "flex", fontSize: 128, fontWeight: 300, lineHeight: 1, letterSpacing: -4 }}>
                {amount}
              </div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 500, marginLeft: 18, marginBottom: 16 }}>
                {link.currency}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>{t.payTo}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 4,
              borderRadius: 4,
              backgroundImage: "linear-gradient(90deg, #ff6496, #6496ff, #ffc864, #ff6496)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 26 }}>
            <div style={{ display: "flex", gap: 44 }}>
              {facts.map(([label, value]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 18, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                    {label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 6,
                      fontSize: 26,
                      fontFamily: label === c.reference ? "Mono" : "Manrope",
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {tiles.map((src, i) => (
                <img key={brands[i]} src={src} width={66} height={42} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: light, weight: 300, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
