import { getMedia } from "@/lib/pagos/api";

/** Imagen del cobro para la página de pago. Cambia poco: una hora en caché del navegador. */
export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const media = await getMedia(code, "certificado/miniatura").catch(() => null);
  if (!media) return new Response("Miniatura no disponible", { status: 404 });
  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "private, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
