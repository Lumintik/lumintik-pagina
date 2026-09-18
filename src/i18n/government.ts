import type { Locale } from "@/lib/locale";

/**
 * Public sector page. Every figure is quoted from its primary source and was
 * checked against it in September 2026; the link goes to that source. IHL
 * Group is the exception: its study could only be read through a partner site.
 */
type Datum = {
  figure: string;
  text: string;
  source: string;
  url: string;
};

type Problem = { title: string; data: Datum[] };

export type GovernmentCopy = {
  metaDescription: string;
  pill: string;
  title: string;
  subtitle: string;
  download: string;
  downloadNote: string;
  contact: string;
  context: { pill: string; title: string; body: string; source: string; url: string };
  problems: { pill: string; title: string; items: Problem[] };
  method: { pill: string; title: string; steps: { title: string; desc: string }[] };
  practices: { title: string; body: string; cta: string };
  sourcesNote: string;
};

const SOURCES = {
  google:
    "https://www.thinkwithgoogle.com/_qs/documents/2340/bc22e_The_Need_for_Mobile_Speed_-_FINAL_1.pdf",
  baymard: "https://baymard.com/lists/cart-abandonment-rate",
  pendo:
    "https://go.pendo.io/rs/185-LQW-370/images/2019%20Feature%20Adoption%20Report%20Digital.pdf",
  splunk:
    "https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2024/m06/conf24-splunk-report-shows-downtime-costs-global-2000-companies-400b-annually.html",
  ibm: "https://www.ibm.com/reports/data-breach",
  uk: "https://www.gov.uk/government/publications/digital-efficiency-report/digital-efficiency-report",
  ihl: "https://www.ihlservices.com/",
  conpes: "https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf",
};

const es: GovernmentCopy = {
  metaDescription:
    "Seis problemas frecuentes en los servicios digitales del Estado, cada uno con su cifra y su fuente, y un método de trabajo en cuatro pasos: diagnóstico, piloto, escala y operación.",
  pill: "Sector público",
  title: "Tecnología para entidades del Estado, con cifras verificables.",
  subtitle:
    "Seis problemas frecuentes en los servicios digitales, cada uno con su dato y su fuente, y el método con el que trabajamos para resolverlos.",
  download: "Descargar la presentación en PDF",
  downloadNote: "PDF",
  contact: "Hablar con el equipo",
  context: {
    pill: "Contexto",
    title: "Colombia ya tiene una política de inteligencia artificial.",
    body:
      "El CONPES 4144, aprobado el 14 de febrero de 2025, fija la Política Nacional de Inteligencia Artificial: 106 acciones hasta 2030 con una inversión total aproximada de 479.273 millones de pesos.",
    source: "Departamento Nacional de Planeación, CONPES 4144, 2025",
    url: SOURCES.conpes,
  },
  problems: {
    pill: "Seis problemas",
    title: "Lo que vemos en los servicios digitales, con su dato.",
    items: [
      {
        title: "Trámites lentos que se abandonan",
        data: [
          {
            figure: "53%",
            text: "de las visitas se abandonan si un sitio móvil tarda más de tres segundos en cargar.",
            source: "Google, The Need for Mobile Speed, 2016",
            url: SOURCES.google,
          },
          {
            figure: "17%",
            text: "de los compradores en línea de Estados Unidos ha abandonado un pedido por un proceso demasiado largo o complicado.",
            source: "Baymard Institute, consultado en septiembre de 2026",
            url: SOURCES.baymard,
          },
        ],
      },
      {
        title: "Canales de atención costosos",
        data: [
          {
            figure: "Casi 20 veces",
            text: "menos cuesta una transacción digital que una telefónica en algunos servicios del gobierno británico; unas 30 veces menos que una postal y unas 50 veces menos que una presencial.",
            source: "Gobierno del Reino Unido, Digital Efficiency Report, 2012",
            url: SOURCES.uk,
          },
        ],
      },
      {
        title: "Funcionalidades que nadie usa",
        data: [
          {
            figure: "80%",
            text: "de las funcionalidades de un producto de software promedio se usan rara vez o nunca.",
            source: "Pendo, Feature Adoption Report, 2019",
            url: SOURCES.pendo,
          },
        ],
      },
      {
        title: "Servicios que se caen y datos expuestos",
        data: [
          {
            figure: "USD 400.000 millones",
            text: "al año cuestan las caídas del servicio a las empresas Global 2000, el 9% de sus utilidades.",
            source: "Splunk y Oxford Economics, The Hidden Costs of Downtime, 2024",
            url: SOURCES.splunk,
          },
          {
            figure: "USD 4,99 millones",
            text: "es el costo promedio global de una brecha de datos, un máximo histórico.",
            source: "IBM, Cost of a Data Breach, edición 2026",
            url: SOURCES.ibm,
          },
        ],
      },
      {
        title: "Recursos mal distribuidos",
        data: [
          {
            figure: "USD 1,77 billones",
            text: "costó en 2023 a los minoristas del mundo la distorsión de inventario: productos agotados en un lugar y sobrantes en otro.",
            source: "IHL Group, 2023",
            url: SOURCES.ihl,
          },
        ],
      },
      {
        title: "Poca adopción de inteligencia artificial",
        data: [
          {
            figure: "23,82%",
            text: "de 5.034 entidades públicas afirmó haber usado inteligencia artificial en procesos de innovación digital (FURAG 2022, citado en el CONPES 4144).",
            source: "Departamento Nacional de Planeación, CONPES 4144, 2025",
            url: SOURCES.conpes,
          },
        ],
      },
    ],
  },
  method: {
    pill: "Método",
    title: "Cuatro pasos, cada uno con un entregable.",
    steps: [
      {
        title: "Diagnóstico",
        desc: "Revisamos el servicio, los datos y los sistemas actuales. Entregamos el problema medido y una propuesta con alcance, riesgos y costos.",
      },
      {
        title: "Piloto",
        desc: "Construimos una versión acotada con usuarios reales y la medimos contra la línea base del diagnóstico.",
      },
      {
        title: "Escala",
        desc: "Llevamos lo que funcionó a más usuarios, sedes o trámites, con tres ambientes y despliegues controlados.",
      },
      {
        title: "Operación",
        desc: "Operamos y mejoramos el servicio con telemetría y soporte, y transferimos el conocimiento al equipo de la entidad.",
      },
    ],
  },
  practices: {
    title: "Las mismas buenas prácticas en cada proyecto.",
    body:
      "Cifrado TLS 1.3 y AES 256, acceso mínimo con registro de auditoría, tres ambientes, telemetría desde el primer día, accesibilidad WCAG 2.2 y cumplimiento de la Ley 1581 de datos personales.",
    cta: "Ver los casos",
  },
  sourcesNote:
    "Cada cifra enlaza a su fuente. Las cifras de terceros describen el mercado; no son resultados de Lumintik.",
};

const en: GovernmentCopy = {
  metaDescription:
    "Six common problems in public digital services, each with its figure and source, and a four step method: assessment, pilot, scale and operation.",
  pill: "Public sector",
  title: "Technology for public entities, with figures you can verify.",
  subtitle:
    "Six common problems in digital services, each with its figure and its source, and the method we use to solve them.",
  download: "Download the presentation as a PDF",
  downloadNote: "PDF",
  contact: "Talk to the team",
  context: {
    pill: "Context",
    title: "Colombia already has an artificial intelligence policy.",
    body:
      "CONPES 4144, approved on 14 February 2025, sets the National Artificial Intelligence Policy: 106 actions through 2030 with a total investment of about COP 479,273 million.",
    source: "National Planning Department (DNP), CONPES 4144, 2025",
    url: SOURCES.conpes,
  },
  problems: {
    pill: "Six problems",
    title: "What we see in digital services, with the figure behind it.",
    items: [
      {
        title: "Slow services that people abandon",
        data: [
          {
            figure: "53%",
            text: "of visits are abandoned if a mobile site takes more than three seconds to load.",
            source: "Google, The Need for Mobile Speed, 2016",
            url: SOURCES.google,
          },
          {
            figure: "17%",
            text: "of US online shoppers have abandoned an order because of a checkout process that was too long or complicated.",
            source: "Baymard Institute, accessed September 2026",
            url: SOURCES.baymard,
          },
        ],
      },
      {
        title: "Costly service channels",
        data: [
          {
            figure: "Almost 20 times",
            text: "lower is the cost of a digital transaction than a telephone one for some UK government services; about 30 times lower than post and about 50 times lower than face to face.",
            source: "UK Government, Digital Efficiency Report, 2012",
            url: SOURCES.uk,
          },
        ],
      },
      {
        title: "Features nobody uses",
        data: [
          {
            figure: "80%",
            text: "of features in the average software product are rarely or never used.",
            source: "Pendo, Feature Adoption Report, 2019",
            url: SOURCES.pendo,
          },
        ],
      },
      {
        title: "Outages and exposed data",
        data: [
          {
            figure: "USD 400 billion",
            text: "a year is what downtime costs Global 2000 companies, 9% of their profits.",
            source: "Splunk and Oxford Economics, The Hidden Costs of Downtime, 2024",
            url: SOURCES.splunk,
          },
          {
            figure: "USD 4.99 million",
            text: "is the global average cost of a data breach, a record high.",
            source: "IBM, Cost of a Data Breach, 2026 edition",
            url: SOURCES.ibm,
          },
        ],
      },
      {
        title: "Resources in the wrong place",
        data: [
          {
            figure: "USD 1.77 trillion",
            text: "is what inventory distortion cost retailers worldwide in 2023: products sold out in one place and left over in another.",
            source: "IHL Group, 2023",
            url: SOURCES.ihl,
          },
        ],
      },
      {
        title: "Low adoption of artificial intelligence",
        data: [
          {
            figure: "23.82%",
            text: "of 5,034 public entities said they had used artificial intelligence in digital innovation processes (FURAG 2022, cited in CONPES 4144).",
            source: "National Planning Department (DNP), CONPES 4144, 2025",
            url: SOURCES.conpes,
          },
        ],
      },
    ],
  },
  method: {
    pill: "Method",
    title: "Four steps, each with a deliverable.",
    steps: [
      {
        title: "Assessment",
        desc: "We review the service, the data and the current systems. We deliver the problem, measured, and a proposal with scope, risks and costs.",
      },
      {
        title: "Pilot",
        desc: "We build a scoped version with real users and measure it against the assessment baseline.",
      },
      {
        title: "Scale",
        desc: "We take what worked to more users, offices or procedures, with three environments and controlled deployments.",
      },
      {
        title: "Operation",
        desc: "We run and improve the service with telemetry and support, and hand the knowledge over to the entity's team.",
      },
    ],
  },
  practices: {
    title: "The same good practices in every project.",
    body:
      "TLS 1.3 and AES 256 encryption, least privilege access with an audit log, three environments, telemetry from day one, WCAG 2.2 accessibility and compliance with Colombia's Law 1581 on personal data.",
    cta: "See the case studies",
  },
  sourcesNote:
    "Every figure links to its source. Third party figures describe the market; they are not Lumintik results.",
};

export const government: Record<Locale, GovernmentCopy> = { ES: es, EN: en };
