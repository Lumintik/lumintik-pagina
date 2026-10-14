import { getMedia } from "@/lib/pagos/api";

/** Certificado bancario de la cuenta para transferencias. */
export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const doc = await getMedia(code, "certificado").catch(() => null);
  if (!doc) return new Response("Certificado no encontrado", { status: 404 });
  return new Response(new Uint8Array(doc.data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(doc.filename || "certificado-bancario.pdf")}`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
