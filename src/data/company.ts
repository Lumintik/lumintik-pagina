/**
 * Legal and contact details, as registered with the Cámara de Comercio de
 * Bogotá and in the RUT. A null value is shown on the site as a visible
 * pending marker until someone fills it in.
 */
export const COMPANY = {
  legalName: "Lumintik Developers SAS",
  /** NIT with its check digit, in the format DIAN prints it. */
  nit: "902.069.502-5",
  address: {
    street: "Calle 24 No. 95 12, Bodega 12, Piso 2",
    city: "Bogotá D.C.",
    country: "Colombia",
  },
  /** Already public in the previous footer. */
  email: "hello@lumintik.com",
  /** Full wa.me link, e.g. "https://wa.me/573001234567". */
  whatsapp: null as string | null,
  /** Company page, e.g. "https://www.linkedin.com/company/lumintik". */
  linkedin: null as string | null,
} as const;

export const PENDING = "[dato pendiente]";
