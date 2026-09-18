import { COMPANY } from "@/data/company";
import type { Locale } from "@/lib/locale";

/**
 * Personal data processing policy under Colombian Law 1581 of 2012 and
 * Decree 1377 of 2013 (compiled in Decree 1074 of 2015). Draft prepared with
 * the company's registered details; it should be reviewed by counsel before
 * it is treated as final.
 */
export type PrivacyCopy = {
  pill: string;
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; list?: string[] }[];
};

const responsible = `${COMPANY.legalName}, NIT ${COMPANY.nit}, ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.country}`;

const es: PrivacyCopy = {
  pill: "Legal",
  title: "Política de tratamiento de datos personales",
  updated: "Vigente desde el 18 de septiembre de 2026.",
  intro:
    "Esta política explica cómo tratamos los datos personales que recibimos a través de este sitio y en la relación con clientes y proveedores, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.",
  sections: [
    {
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `${responsible}. Correo para asuntos de datos personales: ${COMPANY.email}.`,
      ],
    },
    {
      title: "2. Datos que tratamos",
      paragraphs: ["Tratamos solo los datos necesarios para cada finalidad:"],
      list: [
        "Datos de contacto enviados en el formulario: nombre, correo electrónico, teléfono, empresa o entidad, cargo, mensaje y archivos adjuntos.",
        "Datos de navegación del sitio: páginas visitadas, dispositivo, navegador, país aproximado y eventos como el envío del formulario o la descarga de documentos.",
        "Datos de clientes y proveedores necesarios para cotizar, contratar, facturar y ejecutar proyectos.",
      ],
    },
    {
      title: "3. Finalidades",
      paragraphs: ["Usamos los datos para:"],
      list: [
        "Responder solicitudes de información y cotizaciones.",
        "Preparar, celebrar y ejecutar contratos, y cumplir obligaciones legales, contables y tributarias.",
        "Medir el uso del sitio de forma agregada para mejorarlo.",
        "Enviar información sobre nuestros servicios, solo cuando el titular lo haya autorizado; puede retirar esa autorización en cualquier momento.",
      ],
    },
    {
      title: "4. Autorización",
      paragraphs: [
        "Al marcar la casilla del formulario de contacto, el titular autoriza el tratamiento de sus datos para las finalidades descritas. No recolectamos datos sensibles ni datos de niños, niñas o adolescentes a través del sitio; si un titular decide compartirlos, su entrega es facultativa.",
      ],
    },
    {
      title: "5. Derechos del titular",
      paragraphs: ["Como titular de los datos, usted puede:"],
      list: [
        "Conocer, actualizar y rectificar sus datos.",
        "Solicitar prueba de la autorización otorgada.",
        "Ser informado sobre el uso que se ha dado a sus datos.",
        "Revocar la autorización o pedir la supresión de sus datos cuando no exista un deber legal o contractual de conservarlos.",
        "Acceder gratuitamente a sus datos.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio, después de haber agotado el trámite de consulta o reclamo ante nosotros.",
      ],
    },
    {
      title: "6. Consultas y reclamos",
      paragraphs: [
        `Las solicitudes se envían a ${COMPANY.email} indicando nombre, identificación, la solicitud concreta y un medio de respuesta.`,
        "Las consultas se responden en un máximo de diez (10) días hábiles, prorrogables por cinco (5) días hábiles más, informando el motivo. Los reclamos se atienden en un máximo de quince (15) días hábiles, prorrogables por ocho (8) días hábiles más, informando el motivo.",
      ],
    },
    {
      title: "7. Transmisión y transferencia",
      paragraphs: [
        "Para operar el sitio y nuestros servicios usamos proveedores de alojamiento, correo y analítica que pueden almacenar datos fuera de Colombia, incluido Estados Unidos. Con ellos existen condiciones que exigen proteger los datos y usarlos solo para prestarnos el servicio. No vendemos datos personales.",
      ],
    },
    {
      title: "8. Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y administrativas razonables, entre ellas cifrado en tránsito, control de acceso por mínimo privilegio y registro de accesos, para evitar la pérdida, el uso o el acceso no autorizado a los datos.",
      ],
    },
    {
      title: "9. Conservación y vigencia",
      paragraphs: [
        "Conservamos los datos mientras sean necesarios para las finalidades descritas o mientras lo exija la ley. Esta política rige desde la fecha indicada y cualquier cambio sustancial se publicará en esta página.",
      ],
    },
  ],
};

const en: PrivacyCopy = {
  pill: "Legal",
  title: "Personal data processing policy",
  updated: "In force since 18 September 2026.",
  intro:
    "This policy explains how we process the personal data we receive through this site and in our relationship with clients and suppliers, under Colombian Law 1581 of 2012 and Decree 1377 of 2013, compiled in Decree 1074 of 2015. This is a translation; the Spanish version governs.",
  sections: [
    {
      title: "1. Data controller",
      paragraphs: [`${responsible}. Email for personal data matters: ${COMPANY.email}.`],
    },
    {
      title: "2. Data we process",
      paragraphs: ["We process only the data each purpose needs:"],
      list: [
        "Contact details sent through the form: name, email, phone, company or entity, role, message and attachments.",
        "Browsing data: pages visited, device, browser, approximate country and events such as submitting the form or downloading documents.",
        "Client and supplier data needed to quote, contract, invoice and deliver projects.",
      ],
    },
    {
      title: "3. Purposes",
      paragraphs: ["We use the data to:"],
      list: [
        "Answer requests for information and quotes.",
        "Prepare, sign and perform contracts, and meet legal, accounting and tax obligations.",
        "Measure use of the site in aggregate in order to improve it.",
        "Send information about our services, only when the data subject has authorised it; that authorisation can be withdrawn at any time.",
      ],
    },
    {
      title: "4. Authorisation",
      paragraphs: [
        "By ticking the box on the contact form, the data subject authorises the processing of their data for the purposes above. We do not collect sensitive data or data from minors through the site; if a data subject chooses to share it, doing so is optional.",
      ],
    },
    {
      title: "5. Rights of the data subject",
      paragraphs: ["As the data subject, you can:"],
      list: [
        "Access, update and correct your data.",
        "Request proof of the authorisation given.",
        "Be informed about how your data has been used.",
        "Withdraw the authorisation or request deletion when there is no legal or contractual duty to keep the data.",
        "Access your data free of charge.",
        "File complaints with the Superintendency of Industry and Commerce (SIC), after completing the inquiry or claim process with us.",
      ],
    },
    {
      title: "6. Inquiries and claims",
      paragraphs: [
        `Requests go to ${COMPANY.email} with your name, identification, the specific request and a way to reply.`,
        "Inquiries are answered within ten (10) business days, extendable by five (5) more with notice of the reason. Claims are resolved within fifteen (15) business days, extendable by eight (8) more with notice of the reason.",
      ],
    },
    {
      title: "7. Transmission and transfer",
      paragraphs: [
        "To run the site and our services we use hosting, email and analytics providers that may store data outside Colombia, including the United States. They are bound by terms that require them to protect the data and use it only to provide their service to us. We do not sell personal data.",
      ],
    },
    {
      title: "8. Security",
      paragraphs: [
        "We apply reasonable technical and administrative measures, including encryption in transit, least privilege access control and access logging, to prevent loss, misuse or unauthorised access to the data.",
      ],
    },
    {
      title: "9. Retention and validity",
      paragraphs: [
        "We keep data for as long as the purposes above require or the law demands. This policy applies from the date shown and any material change will be published on this page.",
      ],
    },
  ],
};

export const privacy: Record<Locale, PrivacyCopy> = { ES: es, EN: en };
