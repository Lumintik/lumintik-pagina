/** Company details as they appear in the DIAN tax registry and the chamber of commerce certificate. */
export const COMPANY = {
  name: "Lumintik Developers SAS",
  nit: "902069502-5",
  registry: { ES: "04107473, Cámara de Comercio de Bogotá, 22 de mayo de 2026", EN: "04107473, Bogotá Chamber of Commerce, May 22, 2026" },
  domicile: "Bogotá D.C., Colombia",
  address: "Cl 24 # 95 12 Bd 12 P 2, Bogotá D.C.",
  /** CIIU 6201 */
  activity: { ES: "CIIU 6201, actividades de desarrollo de sistemas informáticos", EN: "CIIU 6201, software development activities" },
} as const;

export const COMPANY_DOCUMENTS = {
  rut: "/documentos/empresa/rut-lumintik-developers-sas.pdf",
  rub: "/documentos/empresa/reporte-beneficiarios-finales.pdf",
  certificate: "/documentos/empresa/certificado-existencia-representacion-legal.pdf",
} as const;
