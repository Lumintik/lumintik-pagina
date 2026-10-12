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
  const title = link ? `${t.title} ${formatMoney(link.amount, link.currency, locale)}` : t.title;
  return {
    title,
    description: link?.concept ?? t.payTo,
    // Un link de pago no se indexa ni se previsualiza con datos del cliente.
    robots: { index: false, follow: false, nocache: true },
    openGraph: { title: t.payTo, description: t.payTo },
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
