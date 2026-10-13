import { getInvoice } from "@/lib/pagos/api";

/** La factura del cobro. Quien tiene el código del link puede verla. */
export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const invoice = await getInvoice(code).catch(() => null);
  if (!invoice) return new Response("Factura no encontrada", { status: 404 });
  return new Response(new Uint8Array(invoice.data), {
    headers: {
      "Content-Type": invoice.contentType,
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(invoice.filename)}`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
