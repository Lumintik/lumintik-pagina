import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PayPage } from "@/components/pay/PayPage";
import { PAY_COPY, formatMoney } from "@/components/pay/copy";
import { fromSegment } from "@/lib/locale";
import { getLink } from "@/lib/pagos/api";

// Cada visita pregunta el estado real: un link pagado hace un minuto ya no se
// puede volver a cobrar.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/pagar/[code]">): Promise<Metadata> {
  const { locale: segment, code } = await params;
  const locale = fromSegment(segment) ?? "ES";
  const t = PAY_COPY[locale];
  const link = await getLink(code).catch(() => null);
  if (!link) return { title: t.title, robots: { index: false, follow: false, nocache: true } };

  // La vista previa al compartir el link es del cobro, con el cliente y el
  // monto: es lo que David pidió (2026-10-14). Sigue sin indexarse.
  const amount = `${formatMoney(link.amount, link.currency, locale)} ${link.currency}`;
  const en = locale === "EN";
  const title = link.client_name
    ? `${en ? "Payment for" : "Cobro para"} ${link.client_name}: ${amount}`
    : `${t.payTo}: ${amount}`;
  const description = [
    link.concept,
    link.invoice_number ? `${en ? "Invoice" : "Factura"} ${link.invoice_number}` : "",
    en ? `Reference ${link.reference}. Secure payment with Lumintik.` : `Referencia ${link.reference}. Pago seguro con Lumintik.`,
  ]
    .filter(Boolean)
    .join(". ");

  return {
    title,
    description,
    robots: { index: false, follow: false, nocache: true },
    openGraph: { type: "website", siteName: "Lumintik", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/pagar/[code]">) {
  const { locale: segment, code } = await params;
  const locale = fromSegment(segment);
  if (!locale) notFound();

  const link = await getLink(code);
  if (!link) notFound();

  return <PayPage link={link} locale={locale} />;
}
