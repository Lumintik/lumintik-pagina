import type { Locale } from "@/lib/locale";
import type { Country } from "@/data/clients";

/**
 * Interface copy for the whole site. Rules that apply to every string here:
 * sober tone, no figure that the team has not supplied, and no dashes used as
 * punctuation.
 */
const es = {
  meta: {
    home: {
      title: "Lumintik · Ingeniería de software para operar a escala real",
      description:
        "Productos digitales, inteligencia artificial y datos para empresas y entidades en Colombia, Estados Unidos y México. Casos con el problema, la solución y las herramientas.",
    },
    caseTitle: "Cómo lo resolvimos con {client}",
    governmentTitle: "Sector público",
    privacyTitle: "Política de tratamiento de datos personales",
    serviceTitle: "{service} · Servicios",
  },
  a11y: {
    skip: "Saltar al contenido",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    menu: "Menú",
    language: "Idioma",
    home: "Lumintik, inicio",
    mainNav: "Navegación principal",
  },
  nav: {
    cases: "Casos",
    services: "Servicios",
    government: "Sector público",
    contact: "Contacto",
    startProject: "Iniciar un proyecto",
  },
  hero: {
    pill: "Bogotá, Colombia",
    title: "Ingeniería de software para operar a escala real.",
    subtitle:
      "Productos digitales, inteligencia artificial y datos para empresas y entidades en Colombia, Estados Unidos y México.",
    primary: "Iniciar un proyecto",
    secondary: "Ver casos",
  },
  stats: {
    pill: "Cifras",
    title: "Lo que hacemos, en tres datos.",
    items: [
      { value: 3, suffix: "", label: "países", detail: "Colombia, Estados Unidos y México." },
      { value: 7, suffix: "", label: "sectores atendidos", detail: "" },
      {
        value: 30,
        suffix: "%",
        label: "del desarrollo con agentes de IA",
        detail: "Con entregas hasta 50% más rápidas.",
      },
    ],
  },
  clients: {
    pill: "Clientes",
    title: "Empresas con las que trabajamos.",
    via: "vía",
  },
  countries: {
    CO: "Colombia",
    US: "Estados Unidos",
    MX: "México",
  } satisfies Record<Country, string>,
  cases: {
    pill: "Casos",
    title: "Problemas reales, resueltos con datos.",
    intro:
      "Siete proyectos en producción. En cada uno, el problema que había, cómo lo resolvimos y por qué funcionó.",
    caseTitle: "Cómo lo resolvimos con {client}",
    problem: "El problema",
    solution: "La solución",
    why: "Por qué funcionó",
    tools: "Herramientas",
    open: "Ver el caso completo",
    visit: "Visitar el sitio",
    back: "Todos los casos",
    client: "Cliente",
    country: "País",
    sector: "Sector",
    gallery: "Imágenes del proyecto",
    next: "Siguiente caso",
    ctaTitle: "¿Tienes un problema parecido?",
    ctaBody: "Cuéntanos qué necesitas. Revisamos tu caso y te respondemos por correo.",
    pendingImages: "Imágenes pendientes",
  },
  more: {
    pill: "Más proyectos",
    title: "Otros proyectos que hemos construido.",
    visit: "abre su sitio en una pestaña nueva",
  },
  practices: {
    pill: "Buenas prácticas",
    title: "Buenas prácticas en cada proyecto.",
    items: [
      {
        title: "Cifrado TLS 1.3 y AES 256",
        desc: "Los datos viajan cifrados con TLS 1.3 y se guardan cifrados con AES 256.",
      },
      {
        title: "Acceso mínimo con registro de auditoría",
        desc: "Cada persona tiene solo los permisos que necesita, y cada acceso queda registrado.",
      },
      {
        title: "Tres ambientes",
        desc: "Pruebas, preproducción y producción separados, para cambiar sin detener el servicio.",
      },
      {
        title: "Telemetría desde el primer día",
        desc: "Eventos, errores y rendimiento medidos desde la primera entrega.",
      },
      {
        title: "Accesibilidad WCAG 2.2",
        desc: "Contraste, textos alternativos y navegación por teclado revisados en cada pantalla.",
      },
      {
        title: "Cumplimiento de la Ley 1581",
        desc: "Tratamiento de datos personales conforme a la ley colombiana de protección de datos.",
      },
    ],
  },
  services: {
    pill: "Servicios",
    title: "Qué hacemos.",
    open: "Ver servicio",
    items: {
      productDevelopment: {
        title: "Desarrollo de producto",
        desc: "Del diagnóstico a producción, con usuarios reales desde la primera entrega.",
      },
      uxui: {
        title: "Diseño UX y UI",
        desc: "Interfaces claras, accesibles y medibles.",
      },
      webEngineering: {
        title: "Ingeniería web",
        desc: "Sitios y aplicaciones rápidos, accesibles y fáciles de mantener.",
      },
      appliedAI: {
        title: "Inteligencia artificial aplicada",
        desc: "Agentes, OCR y modelos de lenguaje en producción, también auto hospedados.",
      },
      performanceSEO: {
        title: "Rendimiento y SEO",
        desc: "Core Web Vitals y SEO técnico medidos en cada entrega.",
      },
      brandMotion: {
        title: "Marca y movimiento",
        desc: "Sistemas de identidad y animación que funcionan en cada pantalla.",
      },
      platformInfra: {
        title: "Plataforma e infraestructura",
        desc: "Ambientes separados, despliegues controlados y observabilidad.",
      },
    },
  },
  serviceDetail: {
    back: "Todos los servicios",
    overview: "En qué consiste",
    capabilities: "Qué cubre",
    process: "Cómo trabajamos",
    deliverables: "Qué recibes",
    next: "Siguiente servicio",
  },
  governmentTeaser: {
    pill: "Sector público",
    title: "Tecnología para entidades del Estado.",
    body:
      "Un método en cuatro pasos para pasar de un diagnóstico a un servicio en operación, con cifras que se pueden verificar.",
    cta: "Conocer el enfoque",
  },
  contact: {
    pill: "Contacto",
    title: "Iniciar un proyecto.",
    subtitle: "Cuéntanos qué necesitas. Te respondemos por correo.",
    required: "Los campos marcados con * son obligatorios.",
    name: "Nombre *",
    email: "Correo electrónico *",
    service: "Qué necesitas *",
    serviceSelect: "Selecciona una opción",
    serviceOther: "Otro",
    phone: "Teléfono",
    countryCode: "Indicativo",
    company: "Empresa o entidad",
    role: "Cargo",
    message: "Cuéntanos sobre el proyecto",
    attachment: "Adjuntar archivo (PDF, imagen o documento, máximo 8 MB)",
    termsLead: "Acepto la ",
    termsLink: "política de tratamiento de datos personales",
    termsTail: ".",
    submit: "Enviar",
    sending: "Enviando…",
    success: "Gracias. Recibimos tu mensaje y te responderemos pronto.",
    error: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a {email}.",
    errorRequired: "Completa los campos obligatorios.",
    errorEmail: "Escribe un correo electrónico válido.",
    errorFile: "El archivo adjunto supera los 8 MB.",
  },
  footer: {
    tagline: "Ingeniería de software para operar a escala real.",
    company: "Empresa",
    contact: "Contacto",
    site: "Sitio",
    legalName: "Razón social",
    nit: "NIT",
    address: "Dirección",
    email: "Correo",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    privacy: "Política de tratamiento de datos",
    rights: "Todos los derechos reservados.",
  },
};

export type Site = typeof es;

const en: Site = {
  meta: {
    home: {
      title: "Lumintik · Software engineering built to run at real scale",
      description:
        "Digital products, artificial intelligence and data for companies and public entities in Colombia, the United States and Mexico. Case studies with the problem, the solution and the tools.",
    },
    caseTitle: "How we solved it with {client}",
    governmentTitle: "Public sector",
    privacyTitle: "Personal data processing policy",
    serviceTitle: "{service} · Services",
  },
  a11y: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
    language: "Language",
    home: "Lumintik, home",
    mainNav: "Main navigation",
  },
  nav: {
    cases: "Case studies",
    services: "Services",
    government: "Public sector",
    contact: "Contact",
    startProject: "Start a project",
  },
  hero: {
    pill: "Bogotá, Colombia",
    title: "Software engineering built to run at real scale.",
    subtitle:
      "Digital products, artificial intelligence and data for companies and public entities in Colombia, the United States and Mexico.",
    primary: "Start a project",
    secondary: "See case studies",
  },
  stats: {
    pill: "Figures",
    title: "What we do, in three figures.",
    items: [
      { value: 3, suffix: "", label: "countries", detail: "Colombia, the United States and Mexico." },
      { value: 7, suffix: "", label: "sectors served", detail: "" },
      {
        value: 30,
        suffix: "%",
        label: "of development done with AI agents",
        detail: "With deliveries up to 50% faster.",
      },
    ],
  },
  clients: {
    pill: "Clients",
    title: "Companies we work with.",
    via: "via",
  },
  countries: {
    CO: "Colombia",
    US: "United States",
    MX: "Mexico",
  },
  cases: {
    pill: "Case studies",
    title: "Real problems, solved with data.",
    intro:
      "Seven projects in production. For each one, the problem, how we solved it and why it worked.",
    caseTitle: "How we solved it with {client}",
    problem: "The problem",
    solution: "The solution",
    why: "Why it worked",
    tools: "Tools",
    open: "Read the full case study",
    visit: "Visit the site",
    back: "All case studies",
    client: "Client",
    country: "Country",
    sector: "Sector",
    gallery: "Project images",
    next: "Next case study",
    ctaTitle: "Facing a similar problem?",
    ctaBody: "Tell us what you need. We review your case and reply by email.",
    pendingImages: "Images pending",
  },
  more: {
    pill: "More projects",
    title: "Other projects we have built.",
    visit: "opens their site in a new tab",
  },
  practices: {
    pill: "Good practices",
    title: "Good practices in every project.",
    items: [
      {
        title: "TLS 1.3 and AES 256 encryption",
        desc: "Data travels encrypted with TLS 1.3 and is stored encrypted with AES 256.",
      },
      {
        title: "Least privilege access with an audit log",
        desc: "Each person gets only the permissions they need, and every access is logged.",
      },
      {
        title: "Three environments",
        desc: "Separate testing, staging and production, so changes ship without stopping the service.",
      },
      {
        title: "Telemetry from day one",
        desc: "Events, errors and performance measured from the first delivery.",
      },
      {
        title: "WCAG 2.2 accessibility",
        desc: "Contrast, alternative text and keyboard navigation reviewed on every screen.",
      },
      {
        title: "Compliance with Law 1581",
        desc: "Personal data handled under Colombia's data protection law.",
      },
    ],
  },
  services: {
    pill: "Services",
    title: "What we do.",
    open: "See service",
    items: {
      productDevelopment: {
        title: "Product development",
        desc: "From assessment to production, with real users from the first delivery.",
      },
      uxui: {
        title: "UX and UI design",
        desc: "Clear, accessible and measurable interfaces.",
      },
      webEngineering: {
        title: "Web engineering",
        desc: "Fast, accessible sites and applications that are easy to maintain.",
      },
      appliedAI: {
        title: "Applied artificial intelligence",
        desc: "Agents, OCR and language models in production, self hosted when needed.",
      },
      performanceSEO: {
        title: "Performance and SEO",
        desc: "Core Web Vitals and technical SEO measured on every delivery.",
      },
      brandMotion: {
        title: "Brand and motion",
        desc: "Identity and motion systems that work on every screen.",
      },
      platformInfra: {
        title: "Platform and infrastructure",
        desc: "Separate environments, controlled deployments and observability.",
      },
    },
  },
  serviceDetail: {
    back: "All services",
    overview: "Overview",
    capabilities: "What it covers",
    process: "How we work",
    deliverables: "What you get",
    next: "Next service",
  },
  governmentTeaser: {
    pill: "Public sector",
    title: "Technology for public entities.",
    body:
      "A four step method to go from an assessment to a service in operation, with figures that can be verified.",
    cta: "See the approach",
  },
  contact: {
    pill: "Contact",
    title: "Start a project.",
    subtitle: "Tell us what you need. We reply by email.",
    required: "Fields marked with * are required.",
    name: "Name *",
    email: "Email *",
    service: "What you need *",
    serviceSelect: "Select an option",
    serviceOther: "Other",
    phone: "Phone",
    countryCode: "Country code",
    company: "Company or entity",
    role: "Role",
    message: "Tell us about the project",
    attachment: "Attach a file (PDF, image or document, up to 8 MB)",
    termsLead: "I accept the ",
    termsLink: "personal data processing policy",
    termsTail: ".",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you. We received your message and will reply soon.",
    error: "We could not send your message. Try again or write to {email}.",
    errorRequired: "Complete the required fields.",
    errorEmail: "Enter a valid email address.",
    errorFile: "The attachment is larger than 8 MB.",
  },
  footer: {
    tagline: "Software engineering built to run at real scale.",
    company: "Company",
    contact: "Contact",
    site: "Site",
    legalName: "Legal name",
    nit: "Tax ID (NIT)",
    address: "Address",
    email: "Email",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    privacy: "Data processing policy",
    rights: "All rights reserved.",
  },
};

export const site: Record<Locale, Site> = { ES: es, EN: en };

/** Replaces `{key}` placeholders. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
}
