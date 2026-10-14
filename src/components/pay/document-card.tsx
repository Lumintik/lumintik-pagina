/**
 * Tarjeta de un documento descargable (factura, certificado bancario): la
 * miniatura de la primera página como una hoja inclinada que se endereza al
 * pasar el cursor, el nombre y el botón de descarga.
 */
export function DocumentCard({
  href,
  thumbnail,
  title,
  subtitle,
  action,
  preview,
}: {
  href: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  action: string;
  preview: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl p-4 ring-1 ring-white transition hover:bg-white hover:text-black sm:p-5"
    >
      <div className="flex items-center gap-5">
        <div className="relative w-24 shrink-0 sm:w-28 [perspective:600px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- miniatura dinámica del documento */}
          <img
            src={thumbnail}
            alt={preview}
            className="block h-auto w-full rounded-md bg-white shadow-[0_20px_40px_rgba(255,255,255,0.12)] transition duration-500 [transform:rotateY(-12deg)_rotateZ(-2deg)] group-hover:[transform:rotateY(0deg)_rotateZ(0deg)_translateY(-4px)]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="mt-1 truncate text-sm">{subtitle}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition group-hover:bg-black group-hover:text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {action}
          </span>
        </div>
      </div>
    </a>
  );
}
