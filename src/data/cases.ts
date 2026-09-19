import type { Locale } from "@/lib/locale";
import type { ToolId } from "@/data/tools";

/** Countries the studio has delivered work in. */
export type Country = "CO" | "US" | "MX";

/**
 * Case studies. Every statement here was supplied by the team; nothing is
 * inferred. A null field is rendered as a visible "[dato pendiente]" marker
 * until the missing fact is confirmed.
 */
export type CaseCopy = {
  topic: string;
  client: string;
  /** One line that says who the client is. */
  about: string;
  sector: string;
  problem: string | null;
  solution: string | null;
  why: string | null;
  /** Short version of the result, for the clients section. Always a fragment
   * of the copy above, never a new claim. */
  headline?: string;
};

export type CaseImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

/** A public site for the case. Rendered as "Visitar el sitio" when there is
 * only one, or by its own label when a case links to more than one site. */
export type CaseLink = { label: string; href: string };

/** A store badge shown next to the case's links (App Store, Google Play). */
export type CaseBadge = {
  src: string;
  width: number;
  height: number;
  href: string;
  alt: Record<Locale, string>;
};

/** Official evidence for a case, linking to its source document. */
export type CaseCertification = {
  label: Record<Locale, string>;
  items: {
    title: Record<Locale, string>;
    date: Record<Locale, string>;
    href: string;
  }[];
};

export type CaseStudy = {
  slug: string;
  country: Country;
  /** Public sites for this case. Empty when there is nothing to link to. */
  links: CaseLink[];
  badges?: CaseBadge[];
  certification?: CaseCertification;
  /** Null when the tool list has not been confirmed. */
  tools: ToolId[] | null;
  /** First image is the cover. An empty list shows a pending placeholder. */
  images: CaseImage[];
  /** Thumbnail for the work grid when the case has no photos of its own. */
  cardImage?: CaseImage;
  /** What is still missing for the images, shown in the placeholder. */
  imagesPending?: Record<Locale, string>;
  copy: Record<Locale, CaseCopy>;
};

export const CASES: CaseStudy[] = [
  {
    slug: "imagiq",
    country: "CO",
    links: [{ label: "Imagiq", href: "https://www.imagiq.com/" }],
    tools: ["gcp", "aws", "nextjs", "nestjs", "posthog", "distanceMatrix", "redis", "postgresql"],
    images: [
      {
        src: "/projects/samsung/home-desktop.png",
        width: 2880,
        height: 1800,
        alt: {
          ES: "Página de inicio de la tienda Samsung de Imagiq en escritorio",
          EN: "Home page of Imagiq's Samsung store on desktop",
        },
      },
      {
        src: "/projects/samsung/dashboard-orders.png",
        width: 1200,
        height: 1227,
        alt: {
          ES: "Panel interno de órdenes con el estado de cada envío",
          EN: "Internal orders dashboard with the status of each shipment",
        },
      },
      {
        src: "/projects/samsung/pdp-desktop.png",
        width: 2880,
        height: 1800,
        alt: {
          ES: "Página de producto de la tienda Samsung de Imagiq",
          EN: "Product page of Imagiq's Samsung store",
        },
      },
      {
        src: "/projects/samsung/cart-mobile.png",
        width: 1179,
        height: 1980,
        alt: {
          ES: "Carrito de compras de la tienda en celular",
          EN: "Shopping cart of the store on a phone",
        },
      },
    ],
    copy: {
      ES: {
        topic: "Operación nacional",
        client: "Imagiq",
        about: "Distribuidor oficial de Samsung en Colombia.",
        sector: "Comercio minorista",
        problem:
          "Más de 30 puntos de venta con inventario disperso; lo que se agotaba en una ciudad sobraba en otra.",
        solution:
          "Un algoritmo que cruza el stock de cada tienda con la distancia real al cliente, elige la tienda óptima y genera la guía de envío.",
        why: "Toda la red trabaja como un solo inventario, con entregas en máximo 24 horas.",
        headline: "Toda la red trabaja como un solo inventario.",
      },
      EN: {
        topic: "National operations",
        client: "Imagiq",
        about: "Official Samsung distributor in Colombia.",
        sector: "Retail",
        problem:
          "More than 30 points of sale with scattered inventory; what sold out in one city sat unsold in another.",
        solution:
          "An algorithm that matches each store's stock against the real distance to the customer, picks the best store and generates the shipping label.",
        why: "The whole network works as a single inventory, with deliveries in 24 hours at most.",
        headline: "The whole network works as a single inventory.",
      },
    },
  },
  {
    slug: "ezmig",
    country: "US",
    links: [{ label: "EZMig", href: "https://www.ezmig.ai/" }],
    tools: ["aws", "languageModels", "uscis", "posthog"],
    certification: {
      label: {
        ES: "Evaluación técnica de USCIS superada",
        EN: "USCIS technical evaluation passed",
      },
      items: [
        {
          title: { ES: "Resultados de la demo", EN: "Demo results" },
          date: { ES: "30 de julio de 2026 · PASS", EN: "July 30, 2026 · PASS" },
          href: "/documentos/ezmig-uscis-demo-results.pdf",
        },
        {
          title: { ES: "Acceso a producción concedido", EN: "Production access granted" },
          date: { ES: "9 de septiembre de 2026", EN: "September 9, 2026" },
          href: "/documentos/ezmig-uscis-production-access.pdf",
        },
      ],
    },
    images: [
      {
        src: "/projects/ezmig/home.png",
        width: 2880,
        height: 1800,
        alt: {
          ES: "Página de inicio de EZMig con el formulario I 130 en pantalla",
          EN: "EZMig home page showing the I 130 form",
        },
      },
    ],
    copy: {
      ES: {
        topic: "Experiencia y conversión",
        client: "EZMig",
        about: "Plataforma para abogados de inmigración en Estados Unidos.",
        sector: "Servicios legales",
        problem: "Abogados de inmigración llenando a mano formularios largos de USCIS.",
        solution: "Un flujo guiado con IA que completa y valida los formularios en minutos.",
        why: null,
      },
      EN: {
        topic: "Experience and conversion",
        client: "EZMig",
        about: "Platform for immigration attorneys in the United States.",
        sector: "Legal services",
        problem: "Immigration attorneys filling out long USCIS forms by hand.",
        solution: "An AI guided flow that completes and validates the forms in minutes.",
        why: null,
      },
    },
  },
  {
    slug: "claro",
    country: "CO",
    links: [{ label: "Claro", href: "https://www.claro.com.co/" }],
    tools: null,
    images: [],
    cardImage: {
      src: "/projects/claro/home.png",
      width: 2880,
      height: 1800,
      alt: { ES: "Sitio de Claro Colombia", EN: "Claro Colombia website" },
    },
    imagesPending: {
      ES: "Fotos del proyecto Mi Claro: mockup de la app sin fondo, foto del equipo y sala de trabajo.",
      EN: "Mi Claro project photos: app mockup without background, team photo and workroom.",
    },
    copy: {
      ES: {
        topic: "Telemetría",
        client: "Claro",
        about: "Super app Mi Claro.",
        sector: "Telecomunicaciones",
        problem: "Entender cómo usan la app sus clientes para decidir qué mejorar.",
        solution:
          "Consultoría y telemetría: plan de eventos, embudos y tableros para análisis de datos.",
        headline: "Plan de eventos, embudos y tableros para decidir con datos.",
        why: null,
      },
      EN: {
        topic: "Telemetry",
        client: "Claro",
        about: "Mi Claro super app.",
        sector: "Telecommunications",
        problem: "Understanding how customers use the app in order to decide what to improve.",
        solution:
          "Consulting and telemetry: an event plan, funnels and dashboards for data analysis.",
        headline: "An event plan, funnels and dashboards to decide with data.",
        why: null,
      },
    },
  },
  {
    slug: "futtem",
    country: "CO",
    links: [{ label: "FUTTEM", href: "https://www.futtem.com/" }],
    badges: [
      {
        src: "/badges/appstore.png",
        width: 810,
        height: 240,
        href: "https://apps.apple.com/app/id6739542468",
        alt: { ES: "Descargar FUTTEM en el App Store", EN: "Download FUTTEM on the App Store" },
      },
      {
        src: "/badges/googleplay.png",
        width: 620,
        height: 186,
        href: "https://play.google.com/store/apps/details?id=com.futtem.app",
        alt: { ES: "Disponible en Google Play", EN: "Get it on Google Play" },
      },
    ],
    tools: ["aws", "nestjs", "flutter", "postgresql", "socketio", "firebase", "opentelemetry", "posthog"],
    images: [
      {
        src: "/projects/futtem/app.png",
        width: 980,
        height: 960,
        alt: {
          ES: "App de FUTTEM en Android y iPhone, en el ambiente de pruebas",
          EN: "FUTTEM app on Android and iPhone, in the staging environment",
        },
      },
    ],
    copy: {
      ES: {
        topic: "Confiabilidad",
        client: "FUTTEM",
        about: "Aplicación móvil en producción, Colombia.",
        sector: "Deporte",
        problem: "Una app en producción con usuarios reales que no podía detenerse con cada cambio.",
        solution: "Tres ambientes separados, despliegues controlados y trazas de extremo a extremo.",
        why: null,
      },
      EN: {
        topic: "Reliability",
        client: "FUTTEM",
        about: "Mobile app in production, Colombia.",
        sector: "Sports",
        problem: "An app in production with real users that could not stop every time something changed.",
        solution: "Three separate environments, controlled deployments and end to end tracing.",
        why: null,
      },
    },
  },
  {
    slug: "ezdocuai",
    country: "US",
    links: [{ label: "EZDocuAI", href: "https://www.ezdocu.ai/" }],
    tools: ["nextjs", "aws", "vanta"],
    images: [
      {
        src: "/projects/ezdocu/home-desktop.png",
        width: 2880,
        height: 1800,
        alt: {
          ES: "Página de inicio de EZDocuAI en escritorio",
          EN: "EZDocuAI home page on desktop",
        },
      },
      {
        src: "/projects/ezdocu/how-desktop.png",
        width: 2880,
        height: 1800,
        alt: {
          ES: "Sección de EZDocuAI que explica cómo funciona el servicio",
          EN: "EZDocuAI section explaining how the service works",
        },
      },
      {
        src: "/projects/ezdocu/editor-mobile.png",
        width: 780,
        height: 1688,
        alt: {
          ES: "Editor de traducción de EZDocuAI en celular",
          EN: "EZDocuAI translation editor on a phone",
        },
      },
    ],
    copy: {
      ES: {
        topic: "Seguridad y cifrado",
        client: "EZDocuAI",
        about: "Traducción de documentos con inteligencia artificial, Estados Unidos.",
        sector: "Traducción",
        problem:
          "Los traductores certificados dedican horas a formatear a mano cada documento escaneado antes de poder traducirlo.",
        solution:
          "OCR con inteligencia artificial que extrae y formatea el documento automáticamente: cada página pasa de 20 a 3 minutos para el traductor certificado.",
        why: "El cifrado TLS 1.3 en tránsito y AES 256 en reposo, el borrado programado y el certificado de eliminación con hash SHA 256 respaldan el dato: ningún documento queda guardado ni entrena modelos.",
        headline: "Cada página pasa de 20 a 3 minutos para el traductor certificado.",
      },
      EN: {
        topic: "Security and encryption",
        client: "EZDocuAI",
        about: "AI document translation, United States.",
        sector: "Translation",
        problem:
          "Certified translators spend hours manually formatting each scanned document before they can translate it.",
        solution:
          "AI powered OCR that extracts and formats the document automatically: each page goes from 20 to 3 minutes for the certified translator.",
        why: "TLS 1.3 encryption in transit and AES 256 at rest, scheduled deletion and a deletion certificate with a SHA 256 hash back up the data: no document is kept or used to train models.",
        headline: "Each page goes from 20 to 3 minutes for the certified translator.",
      },
    },
  },
  {
    slug: "griver",
    country: "MX",
    links: [{ label: "Griver", href: "https://www.reco.com.mx/" }],
    tools: ["awsGpu", "vllm", "qwen", "docker", "cloudflareTunnel"],
    images: [
      {
        src: "/projects/reco/plataforma-desktop.png",
        width: 2400,
        height: 1500,
        alt: {
          ES: "Plataforma RECO, el ecosistema de comercio exterior de Griver",
          EN: "The RECO platform, Griver's foreign trade ecosystem",
        },
      },
      {
        src: "/projects/reco/plataforma-mobile.png",
        width: 1170,
        height: 2532,
        alt: {
          ES: "Plataforma RECO en celular",
          EN: "The RECO platform on a phone",
        },
      },
    ],
    copy: {
      ES: {
        topic: "Inteligencia artificial",
        client: "Griver",
        about: "Grupo Inversor Veracruzano, México.",
        sector: "Comercio exterior",
        problem:
          "Las agencias aduaneras mexicanas revisan cada pedimento y factura a mano, un proceso que tomaba un día completo.",
        solution:
          "Una API de OCR con IA para el prevalidador RECO y un modelo de lenguaje auto hospedado; los datos no salen de la infraestructura del cliente ni se almacenan.",
        why: "Lo que tomaba un día entero de revisión ahora toma 10 minutos con el prevalidador RECO.",
        headline: "Un día entero de revisión, ahora 10 minutos.",
      },
      EN: {
        topic: "Artificial intelligence",
        client: "Griver",
        about: "Grupo Inversor Veracruzano, Mexico.",
        sector: "Foreign trade",
        problem:
          "Mexican customs agencies review every pedimento and invoice by hand, a process that used to take a full day.",
        solution:
          "An AI OCR API for the RECO prevalidator and a self hosted language model; the data never leaves the client's infrastructure and is not stored.",
        why: "What used to take a full day of review now takes 10 minutes with the RECO prevalidator.",
        headline: "A full day of review, now 10 minutes.",
      },
    },
  },
  {
    slug: "ia-multicanal",
    country: "CO",
    links: [
      { label: "Imagiq", href: "https://www.imagiq.com/" },
      { label: "Accesify", href: "https://www.accesify.com/" },
      { label: "Fridoom", href: "https://fridoom.com/" },
    ],
    tools: [
      "openai",
      "langgraph",
      "whatsappBusiness",
      "instagram",
      "metaGraphApi",
      "nestjs",
      "postgresql",
    ],
    images: [
      {
        src: "/projects/ia-multicanal/imagiq.png",
        width: 706,
        height: 1453,
        alt: {
          ES: "Asistente de IA de Imagiq respondiendo en la web",
          EN: "Imagiq's AI assistant answering on the web",
        },
      },
      {
        src: "/projects/ia-multicanal/accesify.png",
        width: 706,
        height: 1453,
        alt: {
          ES: "Asistente de IA de Accesify respondiendo por WhatsApp",
          EN: "Accesify's AI assistant answering over WhatsApp",
        },
      },
      {
        src: "/projects/ia-multicanal/fridoom.png",
        width: 706,
        height: 1453,
        alt: {
          ES: "Asistente de IA de Fridoom respondiendo dentro de la app",
          EN: "Fridoom's AI assistant answering inside the app",
        },
      },
    ],
    copy: {
      ES: {
        topic: "IA multicanal",
        client: "Imagiq, Accesify y Fridoom",
        about: "Comercio y finanzas personales en Colombia.",
        sector: "Atención al cliente",
        problem: "Clientes que escriben por WhatsApp, Instagram y la web a toda hora, con las mismas preguntas.",
        solution: "Un agente de IA conectado al catálogo, al stock y a las tiendas, que responde en cada canal.",
        why: "Una sola inteligencia para todos los canales, con respuestas al instante y el equipo libre para vender.",
      },
      EN: {
        topic: "Multichannel AI",
        client: "Imagiq, Accesify and Fridoom",
        about: "Commerce and personal finance in Colombia.",
        sector: "Customer support",
        problem: "Customers writing on WhatsApp, Instagram and the web at all hours, with the same questions.",
        solution: "An AI agent connected to the catalog, stock and stores, that answers on every channel.",
        why: "One intelligence for every channel, with instant answers and the team free to sell.",
      },
    },
  },
];

export function findCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export type MoreProject = {
  key: string;
  name: string;
  image: { src: string; width: number; height: number };
  href?: string;
  desc: Record<Locale, string>;
};

export const MORE_PROJECTS: MoreProject[] = [
  {
    key: "attosound",
    name: "Attosound",
    image: { src: "/projects/atto/home.png", width: 2880, height: 1800 },
    href: "https://www.attosound.com/",
    desc: {
      ES: "Plataforma de audio social que conecta la telefonía pública con la app en tiempo real.",
      EN: "Social audio platform that connects the public phone network with the app in real time.",
    },
  },
  {
    key: "piebald",
    name: "Piebald Capital",
    image: { src: "/projects/piebald/loaded.png", width: 1600, height: 1100 },
    href: "https://www.piebaldcapital.com/",
    desc: {
      ES: "Gestora de créditos hipotecarios en Miami.",
      EN: "Mortgage lending firm in Miami.",
    },
  },
  {
    key: "minnesota",
    name: "Minnesota",
    image: { src: "/projects/minnesota/hero-desktop.png", width: 2880, height: 1800 },
    href: "https://www.minnesotaent.net/",
    desc: {
      ES: "Estudio de grabación en Miami.",
      EN: "Recording studio in Miami.",
    },
  },
  {
    key: "lenspr",
    name: "LensPR",
    image: { src: "/projects/lenspr/home.png", width: 2880, height: 1800 },
    href: "https://www.lenspr.com/es",
    desc: {
      ES: "La agencia de relaciones públicas más grande de Latam.",
      EN: "The largest public relations agency in Latin America.",
    },
  },
  {
    key: "fridoom",
    name: "Fridoom",
    image: { src: "/projects/fridoom/home.png", width: 2560, height: 1600 },
    href: "https://fridoom.com/",
    desc: {
      ES: "Educación financiera con más de 200.000 seguidores.",
      EN: "Financial education with more than 200,000 followers.",
    },
  },
  {
    key: "accesify",
    name: "Accesify",
    image: { src: "/projects/accesify/home.png", width: 2560, height: 1600 },
    href: "https://www.accesify.com/",
    desc: {
      ES: "Tienda en línea de accesorios para celulares: fundas para iPhone y Samsung, protectores de pantalla y más.",
      EN: "Online store for phone accessories: iPhone and Samsung cases, screen protectors and more.",
    },
  },
  {
    key: "relatos",
    name: "Relatos por Venezuela",
    image: { src: "/projects/relatos/home.png", width: 1920, height: 1200 },
    href: "https://www.relatosporvenezuela.org/",
    desc: {
      ES: "Cortometrajes convertidos en ayuda humanitaria: dona desde US$5, accede a la colección y financia la asistencia tras el terremoto.",
      EN: "Short films turned into humanitarian aid: donate from US$5, unlock the collection and fund relief after the earthquake.",
    },
  },
];
