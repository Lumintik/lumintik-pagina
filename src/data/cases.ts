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
  /** The capture already has a device drawn around it: do not add another. */
  framed?: boolean;
  /** A short silent loop of the product in use; the capture is its poster. */
  video?: string;
  /** Which device to draw around it; inferred from the shape when left out. */
  device?: "phone" | "ipad" | "watch" | "laptop" | "window";
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

/** A public site for the case. Rendered as "Visitar el sitio" when there is
 * only one, or by its own label when a case links to more than one site. */
export type CaseLink = { label: string; href: string };

/** Photos of the team on site, with the story of what that visit was for. */
export type CaseFieldwork = {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  images: CaseImage[];
};

/**
 * How the thing actually works, step by step. Written from the code, never
 * from memory: it is what makes a case read as engineering and not as a
 * brochure.
 */
export type CaseHowItWorks = {
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  steps: { title: Record<Locale, string>; body: Record<Locale, string> }[];
  /** One line under the steps, for what the reader should take away. */
  note?: Record<Locale, string>;
};

export type CaseMetric = {
  value: string;
  label: Record<Locale, string>;
};
/** Where the figures of a case were read, shown once under the strip. */
export type CaseMetricsSource = Record<Locale, string>;

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
  /** Empty means the section is left out on purpose; null means the team still owes the list. */
  tools: ToolId[] | null;
  /** Figures measured on the live product or verifiable in the code, with where they come from. */
  metrics?: CaseMetric[];
  metricsSource?: CaseMetricsSource;
  fieldwork?: CaseFieldwork;
  howItWorks?: CaseHowItWorks;
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
    metrics: [
      { value: "37", label: { ES: "tiendas en 13 ciudades trabajando como un solo inventario", EN: "stores in 13 cities working as a single inventory" } },
      { value: "587", label: { ES: "referencias en el catálogo", EN: "products in the catalog" } },
      { value: "341.139", label: { ES: "correos enviados desde el panel de campañas", EN: "emails sent from the campaigns panel" } },
      { value: "4", label: { ES: "canales de campaña: correo, WhatsApp, SMS y mensajes en el sitio", EN: "campaign channels: email, WhatsApp, SMS and on site messages" } },
    ],
    metricsSource: { ES: "Leído en la tienda y el panel de administración en producción, septiembre de 2026.", EN: "Read from the live store and admin panel, September 2026." },
    tools: ["gcp", "aws", "nextjs", "nestjs", "posthog", "distanceMatrix", "redis", "postgresql"],
    howItWorks: {
      title: {
        ES: "Cómo se decide desde qué tienda sale tu pedido",
        EN: "How the store your order ships from is decided",
      },
      intro: {
        ES: "Entre el clic en comprar y el correo con la guía pasan unos segundos. Esto es lo que ocurre en ellos.",
        EN: "A few seconds pass between the buy click and the email with the tracking number. This is what happens in them.",
      },
      steps: [
        {
          title: { ES: "Se expande cada referencia", EN: "Each reference is expanded" },
          body: {
            ES: "Un mismo teléfono vive en el ERP con varios códigos según el lote. El pedido se traduce primero a todos los códigos equivalentes, para que una tienda no quede descartada por tener el mismo producto con otro número.",
            EN: "The same phone lives in the ERP under several codes depending on the batch. The order is first translated into every equivalent code, so a store is never ruled out for holding the same product under a different number.",
          },
        },
        {
          title: { ES: "Se pregunta el inventario en vivo", EN: "Live inventory is asked for" },
          body: {
            ES: "Una sola consulta al inventario de las 37 tiendas, sin caché. Solo siguen las tiendas que cubren el pedido completo, línea por línea y en la cantidad pedida.",
            EN: "A single query against the inventory of all 37 stores, no cache. Only the stores that cover the whole order, line by line and in the quantity ordered, go on.",
          },
        },
        {
          title: { ES: "Se mide la distancia real, no la del mapa", EN: "The real distance is measured, not the one on the map" },
          body: {
            ES: "De las tiendas que quedan se mide la distancia de conducción hasta la dirección del cliente, no la línea recta. Cada par tienda-dirección se guarda: una distancia física no cambia, así que la segunda vez la respuesta ya está.",
            EN: "For the stores that are left, the driving distance to the customer's address is measured, not the straight line. Every store-address pair is kept: a physical distance does not change, so the second time the answer is already there.",
          },
        },
        {
          title: { ES: "Gana la más cercana", EN: "The nearest one wins" },
          body: {
            ES: "El pedido se asigna a la tienda con menos kilómetros por recorrer. Algunas categorías salen siempre del centro de distribución, y esa regla se aplica antes de medir nada.",
            EN: "The order goes to the store with the fewest kilometres to cover. Some categories always ship from the distribution centre, and that rule is applied before anything is measured.",
          },
        },
        {
          title: { ES: "Si nadie lo tiene todo, se reparte", EN: "If nobody has it all, it is split" },
          body: {
            ES: "Cuando ninguna tienda cubre el carrito completo, el pedido se reparte entre la menor cantidad de tiendas posible, empezando por el producto más escaso. El cliente recibe varias guías en lugar de un pedido cancelado.",
            EN: "When no store covers the whole cart, the order is split across as few stores as possible, starting with the scarcest product. The customer gets several tracking numbers instead of a cancelled order.",
          },
        },
        {
          title: { ES: "Se vuelve a mirar antes de despachar", EN: "It is checked again before dispatch" },
          body: {
            ES: "Justo antes de generar la guía se vuelve a leer el inventario de la tienda elegida. Si la unidad ya se vendió en el mostrador, el pedido se detiene en vez de salir con un dato viejo.",
            EN: "Right before the label is created the chosen store's inventory is read again. If the unit has already been sold over the counter, the order stops instead of shipping on stale data.",
          },
        },
        {
          title: { ES: "Guía, rótulo y recogida", EN: "Label, sticker and pickup" },
          body: {
            ES: "Con la tienda ya definida se genera la guía y el rótulo con la transportadora y se agenda la recogida en esa tienda, todo en la misma operación que confirma el pago.",
            EN: "With the store settled, the carrier's tracking number and label are generated and the pickup at that store is scheduled, all in the same operation that confirms the payment.",
          },
        },
      ],
      note: {
        ES: "El mismo cálculo decide si el cliente puede recoger en tienda: se le ofrece cuando hay una tienda con todo en su ciudad o a menos de quince kilómetros.",
        EN: "The same calculation decides whether the customer can pick up in store: it is offered when there is a store with everything in their city or within fifteen kilometres.",
      },
    },
    images: [
      {
        src: "/projects/imagiq/tour/operacion/panel.jpg",
        video: "/projects/video/imagiq-desktop.mp4",
        width: 1512,
        height: 806,
        alt: {
          ES: "El panel de Imagiq: ventas, órdenes, zonas de cobertura, campañas por canal y transmisiones en vivo",
          EN: "Imagiq's panel: sales, orders, coverage zones, campaigns by channel and live streams",
        },
      },
      {
        src: "/projects/mobile/imagiq.webp",
        video: "/projects/video/imagiq-mobile.mp4",
        width: 604,
        height: 1308,
        alt: { ES: "La tienda de Imagiq en un iPhone", EN: "The Imagiq store on an iPhone" },
      },
      {
        src: "/projects/samsung/home-desktop.webp",
        width: 2000,
        height: 1250,
        alt: {
          ES: "Página de inicio de la tienda Samsung de Imagiq en escritorio",
          EN: "Home page of Imagiq's Samsung store on desktop",
        },
      },
      {
        src: "/projects/imagiq/tour/operacion/ordenes.jpg",
        width: 1512,
        height: 806,
        alt: {
          ES: "Panel interno de órdenes con el estado de cada envío",
          EN: "Internal orders dashboard with the status of each shipment",
        },
      },
      {
        src: "/projects/samsung/pdp-desktop.webp",
        width: 2000,
        height: 1250,
        alt: {
          ES: "Página de producto de la tienda Samsung de Imagiq",
          EN: "Product page of Imagiq's Samsung store",
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
    metrics: [
      { value: "19", label: { ES: "formularios de USCIS con flujo guiado", EN: "USCIS forms with a guided flow" } },
      { value: "3", label: { ES: "idiomas: español, inglés y portugués", EN: "languages: Spanish, English and Portuguese" } },
      { value: "3", label: { ES: "portales: abogado, cliente y administración", EN: "portals: attorney, client and admin" } },
    ],
    metricsSource: { ES: "Verificable en el producto en producción, septiembre de 2026.", EN: "Verifiable in the live product, September 2026." },
    tools: ["aws", "languageModels", "uscis", "posthog"],
    certification: {
      label: {
        ES: "Evaluación técnica de USCIS superada",
        EN: "USCIS technical evaluation passed",
      },
      items: [
        {
          title: { ES: "Resultados de la demo", EN: "Demo results" },
          date: { ES: "30 de julio de 2026, PASS", EN: "July 30, 2026, PASS" },
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
        src: "/projects/ezmig/panel.webp",
        video: "/projects/video/ezmig-desktop.mp4",
        width: 1512,
        height: 806,
        alt: {
          ES: "El formulario N-400 guiado de EZMig, pregunta por pregunta, con los datos del cliente ya puestos",
          EN: "EZMig's guided N-400 form, question by question, with the client's data already filled in",
        },
      },
      {
        src: "/projects/mobile/ezmig.webp",
        video: "/projects/video/ezmig-mobile.mp4",
        width: 604,
        height: 1308,
        alt: { ES: "EZMig en un iPhone", EN: "EZMig on an iPhone" },
      },
      {
        src: "/projects/ezmig/home.webp",
        width: 2000,
        height: 1250,
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
        why:
          "Los 19 formularios de USCIS que más se usan (I-130, I-485, N-400 y más) se completan en un flujo guiado en español, inglés y portugués, con validación antes de generar el PDF oficial.",
      },
      EN: {
        topic: "Experience and conversion",
        client: "EZMig",
        about: "Platform for immigration attorneys in the United States.",
        sector: "Legal services",
        problem: "Immigration attorneys filling out long USCIS forms by hand.",
        solution: "An AI guided flow that completes and validates the forms in minutes.",
        why:
          "The 19 most used USCIS forms (I-130, I-485, N-400 and more) are completed in a guided flow in Spanish, English and Portuguese, with validation before the official PDF is generated.",
      },
    },
  },
  {
    slug: "claro",
    country: "CO",
    links: [{ label: "Claro", href: "https://www.claro.com.co/" }],
    tools: [],
    images: [
      {
        src: "/projects/claro/home.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Sitio de Claro Colombia", EN: "Claro Colombia website" },
      },
    ],
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
        why:
          "Un plan de eventos único para toda la app, embudos por cada flujo y tableros listos para que el equipo priorice con datos en vez de intuiciones.",
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
        why:
          "A single event plan for the whole app, funnels for every flow and dashboards ready for the team to prioritize with data instead of hunches.",
      },
    },
  },
  {
    slug: "futtem",
    country: "CO",
    links: [{ label: "FUTTEM", href: "https://www.futtem.com/" }],
    metrics: [
      { value: "3", label: { ES: "ambientes aislados: pruebas, QA y producción", EN: "isolated environments: testing, QA and production" } },
      { value: "3", label: { ES: "plataformas: iOS, Android y Apple Watch", EN: "platforms: iOS, Android and Apple Watch" } },
      { value: "1.2.2", label: { ES: "versión publicada en las tiendas", EN: "version published on the stores" } },
    ],
    metricsSource: { ES: "Verificable en el código y en las tiendas de aplicaciones, septiembre de 2026.", EN: "Verifiable in the code and on the app stores, September 2026." },
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
        src: "/projects/futtem/admin.webp",
        video: "/projects/video/futtem-admin.mp4",
        width: 1512,
        height: 806,
        alt: {
          ES: "El panel de administración de FUTTEM: partidos, clubes, cohortes y uso de la aplicación",
          EN: "FUTTEM's admin panel: matches, clubs, cohorts and app usage",
        },
      },
      {
        src: "/projects/futtem/tour/inicio.jpg",
        video: "/projects/video/futtem-app.mp4",
        width: 604,
        height: 1312,
        alt: {
          ES: "App de FUTTEM en Android y iPhone, en el ambiente de pruebas",
          EN: "FUTTEM app on Android and iPhone, in the staging environment",
        },
      },
      {
        src: "/projects/futtem/watch/notificaciones.webp",
        device: "watch",
        width: 422,
        height: 514,
        alt: {
          ES: "Convocatorias de FUTTEM en el Apple Watch",
          EN: "FUTTEM call ups on the Apple Watch",
        },
      },
      {
        src: "/projects/futtem/tour/club.jpg",
        width: 603,
        height: 1311,
        alt: { ES: "Pantalla de un club con su plantilla y sus próximas partidas", EN: "A club screen with its squad and upcoming matches" },
      },
      {
        src: "/projects/futtem/tour/partida.jpg",
        width: 603,
        height: 1311,
        alt: { ES: "Detalle de una partida: cancha, hora, cupos y costo", EN: "A match in detail: pitch, time, spots and cost" },
      },
      {
        src: "/projects/futtem/tour/jugadores.jpg",
        width: 603,
        height: 1311,
        alt: { ES: "Los convocados repartidos en dos equipos, con la lista de espera", EN: "The players called up split into two teams, with the waiting list" },
      },
      {
        src: "/projects/futtem/tour/entreno.jpg",
        width: 603,
        height: 1311,
        alt: { ES: "Videos de entrenamiento, físico y promocionales", EN: "Training, fitness and promotional videos" },
      },
      {
        src: "/projects/futtem/tour/crear-partida.jpg",
        width: 603,
        height: 1311,
        alt: { ES: "Formulario para convocar una partida nueva", EN: "The form to call a new match" },
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
        why:
          "La app está publicada en App Store y Google Play, con widget y Apple Watch, y cada cambio pasa por tres ambientes (pruebas, QA y producción) con trazas de extremo a extremo antes de llegar a los jugadores.",
      },
      EN: {
        topic: "Reliability",
        client: "FUTTEM",
        about: "Mobile app in production, Colombia.",
        sector: "Sports",
        problem: "An app in production with real users that could not stop every time something changed.",
        solution: "Three separate environments, controlled deployments and end to end tracing.",
        why:
          "The app is live on the App Store and Google Play, with a widget and Apple Watch, and every change goes through three environments (testing, QA and production) with end to end traces before it reaches the players.",
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
        src: "/projects/ezdocu/panel.webp",
        video: "/projects/video/ezdocu-desktop.mp4",
        width: 1512,
        height: 806,
        alt: {
          ES: "El panel de EZDocuAI: las órdenes, el recorrido de un documento y los certificados de exactitud",
          EN: "EZDocuAI's panel: the orders, one document's journey and the certificates of accuracy",
        },
      },
      {
        src: "/projects/ezdocu/home-desktop.webp",
        width: 2000,
        height: 1250,
        alt: {
          ES: "Página de inicio de EZDocuAI en escritorio",
          EN: "EZDocuAI home page on desktop",
        },
      },
      {
        src: "/projects/ezdocu/how-desktop.webp",
        width: 2000,
        height: 1250,
        alt: {
          ES: "Sección de EZDocuAI que explica cómo funciona el servicio",
          EN: "EZDocuAI section explaining how the service works",
        },
      },
      {
        src: "/projects/mobile/ezdocu.webp",
        video: "/projects/video/ezdocu-mobile.mp4",
        width: 604,
        height: 1308,
        alt: { ES: "EZDocuAI en un iPhone", EN: "EZDocuAI on an iPhone" },
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
    metrics: [
      { value: "18 s", label: { ES: "de proceso automático por documento (mediana)", EN: "of automatic processing per document (median)" } },
      { value: "11.546", label: { ES: "documentos procesados en una semana", EN: "documents processed in one week" } },
      { value: "21.591", label: { ES: "páginas leídas en esa misma semana", EN: "pages read that same week" } },
      { value: "74%", label: { ES: "de los documentos llegan escaneados, no digitales", EN: "of documents arrive scanned, not digital" } },
    ],
    metricsSource: { ES: "Consola de operación en producción, semana del 14 al 20 de septiembre de 2026.", EN: "Live operations console, week of September 14 to 20, 2026." },
    fieldwork: {
      title: {
        ES: "En el patio, antes de escribir una línea",
        EN: "On the yard, before writing a line",
      },
      body: {
        ES: "Fuimos al puerto con el equipo de Griver: ver de dónde sale cada documento, cómo se mueve un contenedor y qué mira un agente aduanal cuando revisa un pedimento. Lo que se construye después se parece a lo que pasa en el patio, no a lo que uno se imagina desde una oficina.",
        EN: "We went to the port with Griver's team: to see where each document comes from, how a container moves and what a customs agent looks at when reviewing an entry. What gets built afterwards resembles what happens on the yard, not what you picture from an office.",
      },
      images: [
        { src: "/projects/reco/puerto/equipo-contenedores.jpg", width: 960, height: 1280, alt: { ES: "Equipo de Lumintik entre pilas de contenedores en el puerto", EN: "The Lumintik team among stacks of containers at the port" } },
        { src: "/projects/reco/puerto/equipo-grua.jpg", width: 960, height: 1280, alt: { ES: "El equipo frente a una grúa de patio y contenedores Maersk y Hapag Lloyd", EN: "The team in front of a yard crane and Maersk and Hapag Lloyd containers" } },
        { src: "/projects/reco/puerto/recorrido-patio.jpg", width: 960, height: 1280, alt: { ES: "Recorrido por el patio de contenedores con casco de seguridad", EN: "Walking the container yard in hard hats" } },
        { src: "/projects/reco/puerto/equipo-patio.jpg", width: 960, height: 1280, alt: { ES: "Conversación con el equipo de operación en el patio", EN: "Talking with the operations team on the yard" } },
        { src: "/projects/reco/puerto/revision-patio.jpg", width: 960, height: 1280, alt: { ES: "Revisión de documentos junto a un contenedor", EN: "Reviewing documents next to a container" } },
        { src: "/projects/reco/puerto/bodega-revision.jpg", width: 960, height: 1280, alt: { ES: "Visita a la bodega donde se revisa la mercancía", EN: "Visiting the warehouse where the goods are inspected" } },
      ],
    },
    tools: ["awsGpu", "vllm", "qwen", "docker", "cloudflareTunnel"],
    images: [
      {
        src: "/projects/reco/portal-entrenamiento.webp",
        video: "/projects/video/reco-portal.mp4",
        width: 1512,
        height: 806,
        alt: {
          ES: "Portal de entrenamiento de RECO: al pasar el cursor por un campo, el documento se acerca a ese dato",
          EN: "RECO's training portal: hovering a field brings the document up to that value",
        },      },
      {
        src: "/projects/mobile/reco.webp",
        video: "/projects/video/reco-mobile.mp4",
        width: 604,
        height: 1314,
        alt: { ES: "Sitio de RECO en un iPhone", EN: "The RECO site on an iPhone" },
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
        framed: true,
        width: 706,
        height: 1453,
        alt: {
          ES: "Asistente de IA de Imagiq respondiendo en la web",
          EN: "Imagiq's AI assistant answering on the web",
        },
      },
      {
        src: "/projects/ia-multicanal/accesify.png",
        framed: true,
        width: 706,
        height: 1453,
        alt: {
          ES: "Asistente de IA de Accesify respondiendo por WhatsApp",
          EN: "Accesify's AI assistant answering over WhatsApp",
        },
      },
      {
        src: "/projects/ia-multicanal/fridoom.png",
        framed: true,
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
        headline: "Una sola inteligencia para todos los canales.",
      },
      EN: {
        topic: "Multichannel AI",
        client: "Imagiq, Accesify and Fridoom",
        about: "Commerce and personal finance in Colombia.",
        sector: "Customer support",
        problem: "Customers writing on WhatsApp, Instagram and the web at all hours, with the same questions.",
        solution: "An AI agent connected to the catalog, stock and stores, that answers on every channel.",
        why: "One intelligence for every channel, with instant answers and the team free to sell.",
        headline: "One intelligence for every channel.",
      },
    },
  },
];

export function findCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

/**
 * A project without a case study of its own. It still gets a page: the live
 * site recorded scrolling, the screenshots we have and the link. Nothing is
 * claimed about the work beyond the one line the team supplied.
 */
export type MoreProject = {
  /** Also its URL segment. */
  key: string;
  name: string;
  image: { src: string; width: number; height: number };
  href?: string;
  desc: Record<Locale, string>;
  /** Recording of the live site, shown at the top of the project page. */
  video?: string;
  /** Screenshots for the project page. */
  gallery?: CaseImage[];
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
    gallery: [
      {
        src: "/projects/atto/home.png",
        width: 2880,
        height: 1800,
        alt: { ES: "Página de inicio de Attosound", EN: "Attosound home page" },
      },
      {
        src: "/projects/atto/mobile.webp",
        width: 604,
        height: 1308,
        alt: { ES: "Attosound en un iPhone", EN: "Attosound on an iPhone" },
      },
    ],
  },
  {
    key: "piebald",
    name: "Piebald Capital",
    image: { src: "/projects/piebald/loaded.webp", width: 1600, height: 1100 },
    href: "https://www.piebaldcapital.com/",
    desc: {
      ES: "Gestora de créditos hipotecarios en Miami.",
      EN: "Mortgage lending firm in Miami.",
    },
    video: "/videos/proyectos/piebald.mp4",
    gallery: [
      {
        src: "/projects/piebald/hero.png",
        width: 1600,
        height: 1333,
        alt: { ES: "Portada del sitio de Piebald Capital", EN: "Piebald Capital site hero" },
      },
      {
        src: "/projects/piebald/secondary.webp",
        width: 1280,
        height: 720,
        alt: { ES: "Sección interior del sitio de Piebald Capital", EN: "Inner section of the Piebald Capital site" },
      },
      {
        src: "/projects/piebald/mobile.webp",
        width: 604,
        height: 1308,
        alt: { ES: "El sitio de Piebald Capital en un iPhone", EN: "The Piebald Capital site on an iPhone" },
      },
    ],
  },
  {
    key: "minnesota",
    name: "Minnesota",
    image: { src: "/projects/minnesota/hero-desktop.webp", width: 2880, height: 1800 },
    href: "https://www.minnesotaent.net/",
    desc: {
      ES: "Estudio de grabación en Miami.",
      EN: "Recording studio in Miami.",
    },
    video: "/videos/proyectos/minnesota.mp4",
    gallery: [
      {
        src: "/projects/minnesota/hero-desktop.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Portada de Minnesota en escritorio", EN: "Minnesota home page on desktop" },
      },
      {
        src: "/projects/minnesota/films-desktop.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Catálogo de películas de Minnesota", EN: "Minnesota films catalogue" },
      },
      {
        src: "/projects/minnesota/records-desktop.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Sección de música de Minnesota", EN: "Minnesota records section" },
      },
      {
        src: "/projects/minnesota/management-desktop.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Sección de management de Minnesota", EN: "Minnesota management section" },
      },
      {
        src: "/projects/minnesota/hero-mobile.webp",
        width: 780,
        height: 1688,
        alt: { ES: "Portada de Minnesota en celular", EN: "Minnesota home page on a phone" },
      },
    ],
  },
  {
    key: "lenspr",
    name: "LensPR",
    image: { src: "/projects/lenspr/home.webp", width: 2880, height: 1800 },
    href: "https://www.lenspr.com/es",
    desc: {
      ES: "La agencia de relaciones públicas más grande de Latam.",
      EN: "The largest public relations agency in Latin America.",
    },
    video: "/videos/proyectos/lenspr.mp4",
    gallery: [
      {
        src: "/projects/lenspr/home.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Página de inicio de LensPR", EN: "LensPR home page" },
      },
      {
        src: "/projects/lenspr/mobile.webp",
        width: 604,
        height: 1308,
        alt: { ES: "El sitio de LensPR en un iPhone", EN: "The LensPR site on an iPhone" },
      },
    ],
  },
  {
    key: "fridoom",
    name: "Fridoom",
    image: { src: "/projects/fridoom/home.webp", width: 2560, height: 1600 },
    href: "https://fridoom.com/",
    desc: {
      ES: "Educación financiera con más de 200.000 seguidores.",
      EN: "Financial education with more than 200,000 followers.",
    },
    video: "/videos/proyectos/fridoom.mp4",
    gallery: [
      {
        src: "/projects/fridoom/home.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Página de inicio de Fridoom", EN: "Fridoom home page" },
      },
      {
        src: "/projects/fridoom/ipad.webp",
        device: "ipad",
        width: 834,
        height: 1210,
        alt: { ES: "Fridoom en un iPad", EN: "Fridoom on an iPad" },
      },
      {
        src: "/projects/fridoom/mobile.webp",
        width: 604,
        height: 1308,
        alt: { ES: "Fridoom en un iPhone", EN: "Fridoom on an iPhone" },
      },
    ],
  },
  {
    key: "accesify",
    name: "Accesify",
    image: { src: "/projects/accesify/home.webp", width: 2560, height: 1600 },
    href: "https://www.accesify.com/",
    desc: {
      ES: "Tienda en línea de accesorios para celulares: fundas para iPhone y Samsung, protectores de pantalla y más.",
      EN: "Online store for phone accessories: iPhone and Samsung cases, screen protectors and more.",
    },
    video: "/videos/proyectos/accesify.mp4",
    gallery: [
      {
        src: "/projects/accesify/home.webp",
        width: 2000,
        height: 1250,
        alt: { ES: "Tienda en línea de Accesify", EN: "Accesify online store" },
      },
      {
        src: "/projects/accesify/mobile.webp",
        width: 604,
        height: 1308,
        alt: { ES: "La tienda de Accesify en un iPhone", EN: "The Accesify store on an iPhone" },
      },
    ],
  },
  {
    key: "relatos",
    name: "Relatos por Venezuela",
    image: { src: "/projects/relatos/home.webp", width: 1920, height: 1200 },
    href: "https://www.relatosporvenezuela.org/",
    desc: {
      ES: "Cortometrajes convertidos en ayuda humanitaria: dona desde US$5, accede a la colección y financia la asistencia tras el terremoto.",
      EN: "Short films turned into humanitarian aid: donate from US$5, unlock the collection and fund relief after the earthquake.",
    },
    video: "/videos/proyectos/relatos.mp4",
    gallery: [
      {
        src: "/projects/relatos/home.webp",
        width: 1920,
        height: 1200,
        alt: { ES: "Página de inicio de Relatos por Venezuela", EN: "Relatos por Venezuela home page" },
      },
      {
        src: "/projects/relatos/home-mobile.webp",
        width: 780,
        height: 1688,
        alt: { ES: "Relatos por Venezuela en celular", EN: "Relatos por Venezuela on a phone" },
      },
    ],
  },
];
