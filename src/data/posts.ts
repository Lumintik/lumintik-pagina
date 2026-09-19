import type { Locale } from "@/lib/locale";

export type PostSection = { heading: string; paragraphs: string[] };

export type PostCopy = {
  title: string;
  excerpt: string;
  sections: PostSection[];
};

export type Post = {
  slug: string;
  /** ISO date of publication. */
  date: string;
  author: { name: string; avatar: string };
  cover: { src: string; width: number; height: number; alt: Record<Locale, string> };
  copy: Record<Locale, PostCopy>;
};

const LUMINTIK = { name: "Lumintik", avatar: "/lumintik-icon.png" };

/**
 * The posts, newest first. Each one expands on a published case study; the
 * figures come from those cases and nothing here goes beyond them.
 */
export const POSTS: Post[] = [
  {
    slug: "revision-aduanera-con-ia",
    date: "2026-09-19",
    author: LUMINTIK,
    cover: {
      src: "/projects/reco/plataforma-desktop.png",
      width: 2400,
      height: 1500,
      alt: { ES: "Plataforma RECO de Griver", EN: "Griver's RECO platform" },
    },
    copy: {
      ES: {
        title: "De un día a diez minutos: revisar pedimentos con IA sin sacar los datos de casa",
        excerpt:
          "Cómo un modelo de lenguaje auto hospedado y una API de OCR convirtieron una revisión manual de un día en diez minutos para una agencia aduanera mexicana.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Las agencias aduaneras mexicanas revisan cada pedimento y cada factura a mano. Hay que leer los documentos, cruzar cantidades, valores y claves, y detectar cualquier diferencia antes de que llegue a la aduana. En Griver, ese proceso tomaba un día completo.",
              "Además, los documentos son confidenciales: contienen datos de clientes, proveedores y mercancía. Enviarlos a un servicio de IA externo no era una opción.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "Construimos una API de OCR con inteligencia artificial para el prevalidador RECO, la plataforma de comercio exterior de Griver. La API lee el documento, extrae los campos y los entrega listos para cruzar.",
              "La lectura la hace un modelo de lenguaje auto hospedado, servido con vLLM sobre GPU en AWS y empaquetado en Docker. Los datos no salen de la infraestructura del cliente y no se almacenan: cada documento se procesa y se descarta.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Lo que tomaba un día entero de revisión ahora toma diez minutos con el prevalidador RECO. El equipo dedica ese tiempo a resolver las diferencias que el sistema marca, no a encontrarlas.",
              "Para nosotros la lección fue clara: cuando los datos son sensibles, la pregunta no es si usar IA, sino dónde corre. Un modelo propio, dentro de la infraestructura del cliente, resuelve las dos cosas.",
            ],
          },
        ],
      },
      EN: {
        title: "From a day to ten minutes: reviewing customs entries with AI without the data leaving home",
        excerpt:
          "How a self hosted language model and an OCR API turned a full day of manual review into ten minutes for a Mexican customs agency.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "Mexican customs agencies review every customs entry and every invoice by hand. The documents have to be read, quantities, values and codes cross-checked, and any difference caught before it reaches customs. At Griver, that process took a full day.",
              "The documents are also confidential: they hold data about clients, suppliers and goods. Sending them to an external AI service was not an option.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "We built an AI OCR API for the RECO prevalidator, Griver's foreign trade platform. The API reads the document, extracts the fields and hands them over ready to cross-check.",
              "The reading is done by a self hosted language model, served with vLLM on GPU in AWS and packaged with Docker. The data never leaves the client's infrastructure and is not stored: each document is processed and discarded.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "What took a full day of review now takes ten minutes with the RECO prevalidator. The team spends that time resolving the differences the system flags, not finding them.",
              "The lesson for us was clear: when the data is sensitive, the question is not whether to use AI but where it runs. A model of your own, inside the client's infrastructure, solves both.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "un-solo-inventario-para-toda-la-red",
    date: "2026-09-19",
    author: LUMINTIK,
    cover: {
      src: "/projects/samsung/home-desktop.png",
      width: 2880,
      height: 1800,
      alt: { ES: "Tienda en línea de Samsung Colombia", EN: "Samsung Colombia online store" },
    },
    copy: {
      ES: {
        title: "Más de 30 tiendas, un solo inventario: cómo elegimos desde dónde enviar cada pedido",
        excerpt:
          "El distribuidor oficial de Samsung en Colombia tenía el stock disperso entre sus puntos de venta. Un algoritmo lo convirtió en una sola red con entregas en máximo 24 horas.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Imagiq, distribuidor oficial de Samsung en Colombia, tiene más de 30 puntos de venta. Cada uno manejaba su inventario por separado: lo que se agotaba en una ciudad sobraba en otra, y un pedido en línea podía quedarse sin stock aunque el producto existiera a unas cuadras del cliente.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "Construimos un algoritmo que, para cada pedido, cruza el stock de todas las tiendas con la distancia real hasta el cliente. Con esa información elige la tienda óptima y genera la guía de envío, sin que nadie tenga que decidirlo a mano.",
              "La distancia no es la del mapa en línea recta sino la real, calculada con la API de Google Distance Matrix. La tienda en línea corre en Next.js y el back en NestJS con PostgreSQL y Redis.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Toda la red trabaja como un solo inventario, con entregas en máximo 24 horas. Un producto está disponible mientras exista en cualquier tienda, y sale desde la que puede llegar antes.",
            ],
          },
        ],
      },
      EN: {
        title: "More than 30 stores, one inventory: how we choose where each order ships from",
        excerpt:
          "Samsung's official distributor in Colombia had its stock scattered across points of sale. An algorithm turned them into one network with deliveries in 24 hours at most.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "Imagiq, Samsung's official distributor in Colombia, has more than 30 points of sale. Each one managed its inventory separately: what ran out in one city was left over in another, and an online order could show as out of stock even though the product sat a few blocks from the customer.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "We built an algorithm that, for every order, matches the stock of every store against the real distance to the customer. With that it picks the best store and generates the shipping label, with nobody deciding by hand.",
              "The distance is not a straight line on a map but the real one, from the Google Distance Matrix API. The storefront runs on Next.js and the back end on NestJS with PostgreSQL and Redis.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "The whole network works as a single inventory, with deliveries in 24 hours at most. A product is available as long as it exists in any store, and ships from the one that can get there first.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "traducir-sin-transcribir",
    date: "2026-09-19",
    author: LUMINTIK,
    cover: {
      src: "/projects/ezdocu/home-desktop.png",
      width: 2880,
      height: 1800,
      alt: { ES: "Página de inicio de EZDocuAI", EN: "EZDocuAI home page" },
    },
    copy: {
      ES: {
        title: "De 20 a 3 minutos por página: OCR con IA para traductores certificados",
        excerpt:
          "Los traductores certificados perdían horas formateando documentos escaneados antes de traducir. EZDocuAI extrae y formatea cada página automáticamente, con cifrado de extremo a extremo.",
        sections: [
          {
            heading: "El problema",
            paragraphs: [
              "Un traductor certificado recibe actas, diplomas y contratos escaneados. Antes de traducir una sola palabra tiene que reconstruir el documento a mano: tablas, sellos, columnas, numeración. Ese formateo se llevaba la mayor parte del tiempo de cada página.",
            ],
          },
          {
            heading: "Lo que construimos",
            paragraphs: [
              "EZDocuAI usa OCR con inteligencia artificial para extraer el contenido y reconstruir el formato automáticamente. El traductor recibe el documento listo para editar y se concentra en la traducción.",
              "Como los documentos son personales, la seguridad es parte del producto: cifrado TLS 1.3 en tránsito y AES 256 en reposo, borrado programado y un certificado de eliminación con hash SHA 256. Ningún documento queda guardado ni se usa para entrenar modelos.",
            ],
          },
          {
            heading: "El resultado",
            paragraphs: [
              "Cada página pasa de 20 a 3 minutos para el traductor certificado. Y el cliente puede comprobar, con el certificado de eliminación, que su documento ya no existe en el sistema.",
            ],
          },
        ],
      },
      EN: {
        title: "From 20 to 3 minutes per page: AI OCR for certified translators",
        excerpt:
          "Certified translators lost hours formatting scanned documents before translating. EZDocuAI extracts and formats every page automatically, with end to end encryption.",
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "A certified translator receives scanned certificates, diplomas and contracts. Before translating a single word they have to rebuild the document by hand: tables, stamps, columns, numbering. That formatting took most of the time on every page.",
            ],
          },
          {
            heading: "What we built",
            paragraphs: [
              "EZDocuAI uses AI OCR to extract the content and rebuild the layout automatically. The translator gets the document ready to edit and focuses on the translation.",
              "Since the documents are personal, security is part of the product: TLS 1.3 encryption in transit and AES 256 at rest, scheduled deletion and a deletion certificate with a SHA 256 hash. No document is kept or used to train models.",
            ],
          },
          {
            heading: "The result",
            paragraphs: [
              "Every page goes from 20 to 3 minutes for the certified translator. And the client can check, with the deletion certificate, that their document no longer exists in the system.",
            ],
          },
        ],
      },
    },
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
