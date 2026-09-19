import type { Locale } from "@/lib/locale";

/** How the services are grouped for the filters on the home page. */
export type ServiceGroup = "product" | "engineering" | "ai" | "growth";

/** Section labels shared by every service detail page. */
export type DetailChrome = {
  back: string;
  overview: string;
  capabilities: string;
  process: string;
  deliverables: string;
  next: string;
  cta: string;
};

export type Messages = {
  seo: {
    home: { title: string; description: string };
    service: { titleTemplate: string };
  };
  detail: DetailChrome;
  nav: {
    work: string;
    approach: string;
    services: string;
    news: string;
    about: string;
    home: string;
    join: string;
    contact: string;
    team: string;
    blog: string;
  };
  pages: {
    services: { title: string; titleAccent: string; intro: string };
    projects: { title: string; titleAccent: string; intro: string };
    team: { title: string; titleAccent: string; intro: string; roles: Record<"ceo" | "coo", string> };
    blog: { title: string; titleAccent: string; intro: string; read: string; back: string; more: string; empty: string };
    contact: { title: string; titleAccent: string; intro: string };
  };
  hero: {
    rail: string;
    titleParts: string[];
    titleAccent: string;
    titleAccentRotations: string[];
    description: {
      lead: string;
      matters: string;
      buildingWith: string;
      and: string;
    };
    startProject: string;
    howWeWork: string;
  };
  buildingFor: {
    title: string;
    titleAccent: string;
    aria: string;
  };
  tape: string[];
  services: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    /** The filter buttons; keyed by the group in `src/data/services.ts`, plus "all". */
    filters: Record<"all" | ServiceGroup, string>;
    open: string;
    items: {
      productDevelopment: { title: string; desc: string };
      uxui: { title: string; desc: string };
      webEngineering: { title: string; desc: string };
      appliedAI: { title: string; desc: string };
      performanceSEO: { title: string; desc: string };
      brandMotion: { title: string; desc: string };
      platformInfra: { title: string; desc: string };
    };
  };
  projects: {
    marquee: string[];
    badge: { live: string };
  };
  industries: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    previous: string;
    next: string;
    close: string;
    seeCase: string;
    /** Keyed by the industry id in `src/data/industries.ts`. */
    items: Record<string, { category: string; title: string; body: string[] }>;
  };
  cases: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    caseTitle: string;
    problem: string;
    solution: string;
    why: string;
    tools: string;
    open: string;
    visit: string;
    back: string;
    client: string;
    country: string;
    sector: string;
    gallery: string;
    next: string;
    ctaTitle: string;
    ctaBody: string;
    pendingImages: string;
    countries: Record<"CO" | "US" | "MX", string>;
  };
  moreProjects: {
    title: string;
    titleAccent: string;
    visit: string;
    eyebrow: string;
    back: string;
    open: string;
    gallery: string;
    next: string;
  };
  whyWork: {
    eyebrow: string;
    headline: { lead: string; muted: string; tail: string };
    stats: { value: number; suffix: string; label: string }[];
  };
  footer: {
    cta: { lead: string; accent: string };
    tagline: string;
    sitemap: string;
    elsewhere: string;
    line: string;
    rights: string;
  };
  mobileMenu: {
    startProject: string;
    joinUs: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    name: string;
    service: string;
    serviceSelect: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    message: string;
    attachment: string;
    terms: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    errorRequired: string;
    errorEmail: string;
    errorFile: string;
  };
};

const en: Messages = {
  seo: {
    home: {
      title: "Lumintik SAS, software studio that builds inevitable products",
      description:
        "Lumintik SAS is a software engineering studio for companies that care about craft. Headless commerce, applied AI, web engineering and design systems for Samsung, Claro, Coca-Cola, EZDocuAI and more.",
    },
    service: { titleTemplate: "%s, Services" },
  },
  detail: {
    back: "All services",
    overview: "Overview",
    capabilities: "What it covers",
    process: "How we work",
    deliverables: "What you get",
    next: "Next service",
    cta: "Start a project",
  },
  nav: {
    work: "Work",
    approach: "Approach",
    services: "Services",
    news: "News",
    about: "About",
    home: "Home",
    join: "Join",
    contact: "Contact",
    team: "Our team",
    blog: "Blog",
  },
  pages: {
    services: {
      title: "What we",
      titleAccent: "do.",
      intro: "Seven services, each one described by how we work, not by promises.",
    },
    projects: {
      title: "What we have",
      titleAccent: "built.",
      intro: "Every project, case studies first. Each one opens its own page.",
    },
    team: {
      title: "The people",
      titleAccent: "behind it.",
      intro: "A small team that designs and builds in the same room.",
      roles: { ceo: "Chief Executive Officer", coo: "Chief Operating Officer" },
    },
    blog: {
      title: "What we learn",
      titleAccent: "while building.",
      intro: "Notes from the projects: what the problem was, what we built and what it changed.",
      read: "Read the post",
      back: "Back to the blog",
      more: "More posts",
      empty: "No posts yet.",
    },
    contact: {
      title: "Let's talk about",
      titleAccent: "your project.",
      intro: "Tell us what you need. We reply by email.",
    },
  },
  hero: {
    rail: "What we do",
    titleParts: ["We", "build", "software", "that", "feels"],
    titleAccent: "intuitive.",
    titleAccentRotations: ["intuitive.", "scalable.", "indispensable."],
    description: {
      lead: "Software engineering studio for companies that understand the difference between a product that works and one that",
      matters: "matters",
      buildingWith: "Currently building with",
      and: "and",
    },
    startProject: "Start a project",
    howWeWork: "How we work",
  },
  buildingFor: {
    title: "Who we",
    titleAccent: "build for.",
    aria: "Companies we build for",
  },
  tape: [
    "Software that feels inevitable",
    "Headless commerce at the edge",
    "Applied AI, shipped to production",
    "Design and engineering, in the same room",
    "Built by engineers, not by templates",
  ],
  services: {
    eyebrow: "Our services",
    title: "Our",
    titleAccent: "services.",
    filters: { all: "All", product: "Product and design", engineering: "Engineering", ai: "AI and data", growth: "Growth" },
    open: "See the service",
    items: {
      productDevelopment: {
        title: "Product Development",
        desc: "From discovery to ship: software products that earn trust.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces designed for clarity, scale and conversion.",
      },
      webEngineering: {
        title: "Web Engineering",
        desc: "Performant, accessible web at the edge, with sub-second LCP by default.",
      },
      appliedAI: {
        title: "Applied AI",
        desc: "Practical AI pipelines: RAG, agents, streaming LLM workflows.",
      },
      performanceSEO: {
        title: "Performance & SEO",
        desc: "Core Web Vitals, technical SEO, and infra-level wins.",
      },
      brandMotion: {
        title: "Brand & Motion",
        desc: "Identity systems, motion design and storytelling that scales.",
      },
      platformInfra: {
        title: "Platform & Infra",
        desc: "Multi-region, observability-first platforms ready for prime time.",
      },
    },
  },
  industries: {
    eyebrow: "Industries",
    title: "Where we have",
    titleAccent: "shipped.",
    intro: "Every industry has its own rules, data and pace. These are the ones we have already built for, with the project behind each one.",
    previous: "Previous",
    next: "Next",
    close: "Close",
    seeCase: "See the project",
    items: {
      aerospace: {
        category: "Aerospace",
        title: "[pending: aerospace project title]",
        body: ["[pending: what the problem was, what we built and what it changed. Photos to come.]"],
      },
      retail: {
        category: "Retail and e-commerce",
        title: "The whole network working as one inventory.",
        body: [
          "For Samsung's official distributor in Colombia, more than 30 points of sale had scattered stock: what ran out in one city was left over in another.",
          "We built an algorithm that matches each store's stock against the real distance to the customer, picks the best store and generates the shipping label. Deliveries now take 24 hours at most.",
        ],
      },
      telecom: {
        category: "Telecommunications",
        title: "Deciding with data in the Mi Claro super app.",
        body: [
          "Claro needed to understand how customers use the Mi Claro app to decide what to improve.",
          "We did the consulting and the telemetry: an event plan, funnels and dashboards for data analysis.",
        ],
      },
      trade: {
        category: "Foreign trade and logistics",
        title: "Customs documents reviewed by AI.",
        body: [
          "For Griver we built an AI OCR pipeline that reads customs entries and invoices, cross-checks them and flags the differences, with a self hosted model so the data never leaves their infrastructure.",
          "A review that took a full day now takes about ten minutes.",
        ],
      },
      legal: {
        category: "Legal and immigration",
        title: "USCIS forms completed in minutes.",
        body: [
          "Immigration attorneys in the United States were filling in long USCIS forms by hand.",
          "EZMig is a guided flow with AI that completes and validates the forms in minutes, with output certified by USCIS.",
        ],
      },
      translation: {
        category: "Translation and documents",
        title: "Translators editing instead of retyping.",
        body: [
          "EZDocuAI translates documents keeping the original layout, so a translator's time per page went from about twenty minutes to three.",
          "Document parsing, layout reconstruction and a review editor built for professionals.",
        ],
      },
      sports: {
        category: "Sports and communities",
        title: "A live app that could not stop for each change.",
        body: [
          "FUTTEM is a mobile app in production in Colombia, on the App Store and Google Play, with real users who could not be interrupted by every release.",
          "We set up three separate environments, controlled deployments and end to end tracing.",
        ],
      },
      support: {
        category: "Customer support",
        title: "One AI agent on every channel.",
        body: [
          "Customers in commerce and personal finance writing on WhatsApp, Instagram and the web at all hours, with the same questions.",
          "An AI agent connected to the catalog, the stock and the stores answers on every channel: one intelligence, instant answers and the team free to sell.",
        ],
      },
      fintech: {
        category: "Fintech",
        title: "Financial education at the scale of a community.",
        body: [
          "Fridoom is a financial education brand with more than 200,000 followers.",
          "It is one of the clients of the multichannel AI agent, which answers its users inside the app.",
        ],
      },
    },
  },
  projects: {
    marquee: ["SHOW CASE", "PROJECTS", "CASE STUDIES", "WORKS"],
    badge: { live: "Live" },
  },
  cases: {
    eyebrow: "Case studies",
    title: "Real problems,",
    titleAccent: "solved with data.",
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
    countries: { CO: "Colombia", US: "United States", MX: "Mexico" },
  },
  moreProjects: {
    title: "More",
    titleAccent: "projects.",
    visit: "opens their site in a new tab",
    eyebrow: "Project",
    back: "All projects",
    open: "See the project",
    gallery: "Screens",
    next: "Next project",
  },
  whyWork: {
    eyebrow: "Why work with us?",
    headline: {
      lead: "It's not just about shipping software. It's about ",
      muted: "engineering products that earn trust",
      tail: " and outlast trends.",
    },
    stats: [
      { value: 100, suffix: "%", label: "Work completed in house" },
      { value: 2, suffix: "+", label: "Years crafting digital products" },
      { value: 15, suffix: "+", label: "Happy clients across 3 continents" },
      { value: 12, suffix: "+", label: "Industries shipped: fintech, AI, telecom, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Let's build something", accent: "inevitable." },
    tagline: "Software engineering studio for companies that care about craft.",
    sitemap: "Sitemap",
    elsewhere: "Elsewhere",
    line: "Lumintik SAS, software studio, 2026",
    rights: "",
  },
  mobileMenu: {
    startProject: "Start a project",
    joinUs: "Join us",
  },
  contactForm: {
    title: "Get a Quote",
    subtitle: "Complete the form and discover how we can help you achieve your growth goals with custom solutions.",
    name: "Name *",
    service: "Service/Solution of interest",
    serviceSelect: "Select a product",
    email: "Email address *",
    phone: "Phone",
    company: "Company name",
    role: "Your role",
    message: "Tell us a bit about your company",
    attachment: "Attach file (PDF, Image, etc.)",
    terms: "By submitting you agree to our privacy policy and terms and conditions",
    submit: "Send",
    sending: "Sending…",
    success: "Thanks! Your message is on its way. We'll be in touch shortly.",
    error: "Something went wrong sending your message. Please try again or email us directly.",
    errorRequired: "Please complete the required fields.",
    errorEmail: "Please enter a valid email address.",
    errorFile: "The attachment is too large (max 8 MB).",
  },
};

const es: Messages = {
  seo: {
    home: {
      title: "Lumintik SAS, estudio de software que construye productos inevitables",
      description:
        "Lumintik SAS es un estudio de ingeniería de software para empresas que cuidan el detalle. Headless commerce, IA aplicada, ingeniería web y design systems para Samsung, Claro, Coca-Cola, EZDocuAI y más.",
    },
    service: { titleTemplate: "%s, Servicios" },
  },
  detail: {
    back: "Todos los servicios",
    overview: "Resumen",
    capabilities: "Qué incluye",
    process: "Cómo trabajamos",
    deliverables: "Qué recibes",
    next: "Siguiente servicio",
    cta: "Empezar un proyecto",
  },
  nav: {
    work: "Proyectos",
    approach: "Enfoque",
    services: "Servicios",
    news: "Novedades",
    about: "Nosotros",
    home: "Inicio",
    join: "Únete",
    contact: "Contacto",
    team: "Nuestro equipo",
    blog: "Blog",
  },
  pages: {
    services: {
      title: "Qué",
      titleAccent: "hacemos.",
      intro: "Siete servicios, cada uno descrito por cómo trabajamos, no por promesas.",
    },
    projects: {
      title: "Lo que hemos",
      titleAccent: "construido.",
      intro: "Todos los proyectos, primero los casos. Cada uno abre su propia página.",
    },
    team: {
      title: "Las personas",
      titleAccent: "detrás.",
      intro: "Un equipo pequeño que diseña y construye en la misma sala.",
      roles: { ceo: "Director ejecutivo", coo: "Director de operaciones" },
    },
    blog: {
      title: "Lo que aprendemos",
      titleAccent: "construyendo.",
      intro: "Notas desde los proyectos: cuál era el problema, qué construimos y qué cambió.",
      read: "Leer la entrada",
      back: "Volver al blog",
      more: "Más entradas",
      empty: "Aún no hay entradas.",
    },
    contact: {
      title: "Hablemos de",
      titleAccent: "tu proyecto.",
      intro: "Cuéntanos qué necesitas. Te respondemos por correo.",
    },
  },
  hero: {
    rail: "Lo que hacemos",
    titleParts: ["Creamos", "software", "que", "se", "siente"],
    titleAccent: "intuitivo.",
    titleAccentRotations: ["intuitivo.", "escalable.", "indispensable."],
    description: {
      lead: "Estudio de ingeniería de software para empresas que entienden la diferencia entre un producto que funciona y uno que",
      matters: "importa",
      buildingWith: "Actualmente construyendo con",
      and: "y",
    },
    startProject: "Iniciar un proyecto",
    howWeWork: "Cómo trabajamos",
  },
  buildingFor: {
    title: "Para quién",
    titleAccent: "construimos.",
    aria: "Empresas para las que construimos",
  },
  tape: [
    "Software que se siente inevitable",
    "Commerce headless en el edge",
    "IA aplicada, lista para producción",
    "Diseño e ingeniería, en la misma sala",
    "Hecho por ingenieros, no por plantillas",
  ],
  services: {
    eyebrow: "Nuestros servicios",
    title: "Nuestros",
    titleAccent: "servicios.",
    filters: { all: "Todos", product: "Producto y diseño", engineering: "Ingeniería", ai: "IA y datos", growth: "Crecimiento" },
    open: "Ver el servicio",
    items: {
      productDevelopment: {
        title: "Desarrollo de Producto",
        desc: "De la idea al lanzamiento: productos de software que se ganan la confianza.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces diseñadas para claridad, escala y conversión.",
      },
      webEngineering: {
        title: "Ingeniería Web",
        desc: "Web rápida y accesible en el edge, con LCP por debajo de un segundo por defecto.",
      },
      appliedAI: {
        title: "IA Aplicada",
        desc: "Pipelines de IA prácticos: RAG, agentes y flujos LLM en streaming.",
      },
      performanceSEO: {
        title: "Performance y SEO",
        desc: "Core Web Vitals, SEO técnico y mejoras a nivel de infraestructura.",
      },
      brandMotion: {
        title: "Marca y Motion",
        desc: "Sistemas de identidad, motion design y narrativa que escala.",
      },
      platformInfra: {
        title: "Plataforma e Infraestructura",
        desc: "Plataformas multi-región con observabilidad lista para producción.",
      },
    },
  },
  industries: {
    eyebrow: "Industrias",
    title: "Donde ya hemos",
    titleAccent: "construido.",
    intro: "Cada industria tiene sus reglas, sus datos y su ritmo. Estas son en las que ya hemos trabajado, con el proyecto detrás de cada una.",
    previous: "Anterior",
    next: "Siguiente",
    close: "Cerrar",
    seeCase: "Ver el proyecto",
    items: {
      aerospace: {
        category: "Aeroespacial",
        title: "[dato pendiente: título del proyecto aeroespacial]",
        body: ["[dato pendiente: cuál era el problema, qué construimos y qué cambió. Fotos por llegar.]"],
      },
      retail: {
        category: "Retail y e-commerce",
        title: "Toda la red trabajando como un solo inventario.",
        body: [
          "Para el distribuidor oficial de Samsung en Colombia, más de 30 puntos de venta tenían el inventario disperso: lo que se agotaba en una ciudad sobraba en otra.",
          "Construimos un algoritmo que cruza el stock de cada tienda con la distancia real al cliente, elige la tienda óptima y genera la guía de envío. Las entregas ahora toman máximo 24 horas.",
        ],
      },
      telecom: {
        category: "Telecomunicaciones",
        title: "Decidir con datos en la super app Mi Claro.",
        body: [
          "Claro necesitaba entender cómo usan la app sus clientes para decidir qué mejorar.",
          "Hicimos la consultoría y la telemetría: plan de eventos, embudos y tableros para análisis de datos.",
        ],
      },
      trade: {
        category: "Comercio exterior y logística",
        title: "Documentos aduaneros revisados con IA.",
        body: [
          "Para Griver construimos un pipeline de OCR con IA que lee pedimentos y facturas, los cruza y marca las diferencias, con un modelo auto hospedado para que los datos no salgan de su infraestructura.",
          "Una revisión que tomaba un día completo ahora toma unos diez minutos.",
        ],
      },
      legal: {
        category: "Legal y migración",
        title: "Formularios de USCIS completos en minutos.",
        body: [
          "Abogados de inmigración en Estados Unidos llenaban a mano formularios largos de USCIS.",
          "EZMig es un flujo guiado con IA que completa y valida los formularios en minutos, con salida certificada por USCIS.",
        ],
      },
      translation: {
        category: "Traducción y documentos",
        title: "Traductores que editan en vez de transcribir.",
        body: [
          "EZDocuAI traduce documentos conservando el diseño original, así que el tiempo de un traductor por página pasó de unos veinte minutos a tres.",
          "Lectura de documentos, reconstrucción del diseño y un editor de revisión hecho para profesionales.",
        ],
      },
      sports: {
        category: "Deporte y comunidades",
        title: "Una app en producción que no podía detenerse.",
        body: [
          "FUTTEM es una app móvil en producción en Colombia, en App Store y Google Play, con usuarios reales que no podían interrumpirse con cada cambio.",
          "Montamos tres ambientes separados, despliegues controlados y trazas de extremo a extremo.",
        ],
      },
      support: {
        category: "Atención al cliente",
        title: "Un agente de IA en todos los canales.",
        body: [
          "Clientes de comercio y finanzas personales que escriben por WhatsApp, Instagram y la web a toda hora, con las mismas preguntas.",
          "Un agente de IA conectado al catálogo, al stock y a las tiendas responde en cada canal: una sola inteligencia, respuestas al instante y el equipo libre para vender.",
        ],
      },
      fintech: {
        category: "Fintech",
        title: "Educación financiera a escala de comunidad.",
        body: [
          "Fridoom es una marca de educación financiera con más de 200.000 seguidores.",
          "Es uno de los clientes del agente de IA multicanal, que responde a sus usuarios dentro de la app.",
        ],
      },
    },
  },
  projects: {
    marquee: ["MOSTRARIO", "PROYECTOS", "CASOS DE ESTUDIO", "TRABAJOS"],
    badge: { live: "En vivo" },
  },
  cases: {
    eyebrow: "Casos",
    title: "Problemas reales,",
    titleAccent: "resueltos con datos.",
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
    countries: { CO: "Colombia", US: "Estados Unidos", MX: "México" },
  },
  moreProjects: {
    title: "Más",
    titleAccent: "proyectos.",
    visit: "abre su sitio en una pestaña nueva",
    eyebrow: "Proyecto",
    back: "Todos los proyectos",
    open: "Ver el proyecto",
    gallery: "Pantallas",
    next: "Siguiente proyecto",
  },
  whyWork: {
    eyebrow: "¿Por qué trabajar con nosotros?",
    headline: {
      lead: "No se trata solo de lanzar software. Se trata de ",
      muted: "ingeniería de productos que se ganan la confianza",
      tail: " y trascienden las tendencias.",
    },
    stats: [
      { value: 100, suffix: "%", label: "Trabajo realizado in-house" },
      { value: 2, suffix: "+", label: "Años creando productos digitales" },
      { value: 15, suffix: "+", label: "Clientes felices en 3 continentes" },
      { value: 12, suffix: "+", label: "Industrias atendidas: fintech, IA, telco, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Construyamos algo", accent: "inevitable." },
    tagline: "Estudio de ingeniería de software para empresas que valoran el oficio.",
    sitemap: "Mapa del sitio",
    elsewhere: "En otros lugares",
    line: "Lumintik SAS, estudio de software, 2026",
    rights: "",
  },
  mobileMenu: {
    startProject: "Iniciar un proyecto",
    joinUs: "Únete",
  },
  contactForm: {
    title: "Cotización",
    subtitle: "Completa el formulario de cotización y descubre cómo podemos ayudarte a alcanzar tus objetivos de crecimiento con soluciones personalizadas.",
    name: "Nombre *",
    service: "Servicio/Solución de interés",
    serviceSelect: "Selecciona un producto",
    email: "Correo electrónico *",
    phone: "Teléfono",
    company: "Nombre de la empresa",
    role: "Tu cargo",
    message: "Cuéntanos un poco sobre tu empresa",
    attachment: "Adjuntar archivo (PDF, Imagen, etc.)",
    terms: "Al enviar aceptas la política de tratamiento de datos personales y los términos y condiciones",
    submit: "Enviar",
    sending: "Enviando…",
    success: "¡Gracias! Tu mensaje va en camino. Te contactaremos muy pronto.",
    error: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente.",
    errorRequired: "Por favor completa los campos obligatorios.",
    errorEmail: "Por favor ingresa un correo electrónico válido.",
    errorFile: "El archivo adjunto es demasiado grande (máx. 8 MB).",
  },
};

export const messages: Record<Locale, Messages> = { EN: en, ES: es };
