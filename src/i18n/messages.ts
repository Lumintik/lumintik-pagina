import type { Locale } from "@/lib/locale";

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
  };
  hero: {
    eyebrow: string;
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
      title: "Lumintik SAS — Software studio that builds inevitable products",
      description:
        "Lumintik SAS is a software engineering studio for companies that care about craft. Headless commerce, applied AI, web engineering and design systems for Samsung, Claro, Coca-Cola, EZDocuAI and more.",
    },
    service: { titleTemplate: "%s — Services" },
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
  },
  hero: {
    eyebrow: "Software studio · 2026",
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
    items: {
      productDevelopment: {
        title: "Product Development",
        desc: "From discovery to ship — software products that earn trust.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces designed for clarity, scale and conversion.",
      },
      webEngineering: {
        title: "Web Engineering",
        desc: "Performant, accessible web at the edge — sub-second LCP by default.",
      },
      appliedAI: {
        title: "Applied AI",
        desc: "Practical AI pipelines — RAG, agents, streaming LLM workflows.",
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
      { value: 12, suffix: "+", label: "Industries shipped — fintech, AI, telecom, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Let's build something", accent: "inevitable." },
    tagline: "Software engineering studio for companies that care about craft.",
    sitemap: "Sitemap",
    elsewhere: "Elsewhere",
    line: "Lumintik SAS · Software studio · 2026",
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
    success: "Thanks! Your message is on its way — we'll be in touch shortly.",
    error: "Something went wrong sending your message. Please try again or email us directly.",
    errorRequired: "Please complete the required fields.",
    errorEmail: "Please enter a valid email address.",
    errorFile: "The attachment is too large (max 8 MB).",
  },
};

const es: Messages = {
  seo: {
    home: {
      title: "Lumintik SAS — Estudio de software que construye productos inevitables",
      description:
        "Lumintik SAS es un estudio de ingeniería de software para empresas que cuidan el detalle. Headless commerce, IA aplicada, ingeniería web y design systems para Samsung, Claro, Coca-Cola, EZDocuAI y más.",
    },
    service: { titleTemplate: "%s — Servicios" },
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
  },
  hero: {
    eyebrow: "Estudio de software · 2026",
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
    items: {
      productDevelopment: {
        title: "Desarrollo de Producto",
        desc: "De la idea al lanzamiento — productos de software que se ganan la confianza.",
      },
      uxui: {
        title: "UX / UI",
        desc: "Interfaces diseñadas para claridad, escala y conversión.",
      },
      webEngineering: {
        title: "Ingeniería Web",
        desc: "Web rápida y accesible en el edge — LCP sub-segundo por defecto.",
      },
      appliedAI: {
        title: "IA Aplicada",
        desc: "Pipelines de IA prácticos — RAG, agentes y flujos LLM en streaming.",
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
      { value: 12, suffix: "+", label: "Industrias atendidas — fintech, IA, telco, e-commerce" },
    ],
  },
  footer: {
    cta: { lead: "Construyamos algo", accent: "inevitable." },
    tagline: "Estudio de ingeniería de software para empresas que valoran el oficio.",
    sitemap: "Mapa del sitio",
    elsewhere: "En otros lugares",
    line: "Lumintik SAS · Estudio de software · 2026",
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
    success: "¡Gracias! Tu mensaje va en camino — te contactaremos muy pronto.",
    error: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente.",
    errorRequired: "Por favor completa los campos obligatorios.",
    errorEmail: "Por favor ingresa un correo electrónico válido.",
    errorFile: "El archivo adjunto es demasiado grande (máx. 8 MB).",
  },
};

export const messages: Record<Locale, Messages> = { EN: en, ES: es };
