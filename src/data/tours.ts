import type { Locale } from "@/lib/locale";

/** A point on the screenshot, in percent of its width and height. */
type Pt = [number, number];

export type TourStep = {
  id: string;
  image: string;
  label: Record<Locale, string>;
  caption: Record<Locale, string>;
  /** Where the camera settles: the point it zooms toward and how far. */
  focus: { at: Pt; zoom: number };
  /** Where the cursor ends up and clicks before the next step. */
  click: Pt;
};

export type Tour = {
  id: string;
  /** A browser window for the desktop product, a phone for the mobile one. */
  device: "browser" | "phone";
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  /** Shown in the browser bar. */
  url: string;
  width: number;
  height: number;
  steps: TourStep[];
};

/** Product tours, keyed by case slug. Every screen is from the live product: a fictional demo case where one exists, blurred figures and names otherwise. */
export const TOURS: Record<string, Tour[]> = {
  ezmig: [
    {
      id: "abogado",
      device: "browser",
      title: { ES: "El portal del abogado", EN: "The attorney portal" },
      intro: {
        ES: "Pantallas reales de la plataforma en producción, sobre un caso de demostración. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the platform in production, on a demo case. Hover to pause, or pick a stop on the rail.",
      },
      url: "ezmig.ai/dashboard",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "panel",
          image: "/projects/ezmig/tour/panel.jpg",
          label: {
            ES: "El despacho de un vistazo",
            EN: "The practice at a glance",
          },
          caption: {
            ES: "Casos por estado y por tipo de trámite, clientes activos y vencimientos, sin abrir una hoja de cálculo.",
            EN: "Cases by status and by filing type, active clients and deadlines, without opening a spreadsheet.",
          },
          focus: { at: [58, 45], zoom: 1.08 },
          click: [4, 33.4],
        },
        {
          id: "caso",
          image: "/projects/ezmig/tour/caso-demo.jpg",
          label: {
            ES: "Un caso, todo en un lugar",
            EN: "One case, everything in one place",
          },
          caption: {
            ES: "Tipo de trámite, recibo de USCIS, vencimiento, notas internas y el cliente al lado. Los datos de esta demostración son ficticios.",
            EN: "Filing type, USCIS receipt, deadline, internal notes and the client beside it. The data in this demo is fictional.",
          },
          focus: { at: [45, 40], zoom: 1.1 },
          click: [25.8, 15.2],
        },
        {
          id: "formularios",
          image: "/projects/ezmig/tour/formularios-demo.jpg",
          label: { ES: "Prellenado por rol", EN: "Role-aware prefill" },
          caption: {
            ES: "Al agregar el N-400 ya arranca con avance: lo que el despacho sabe del cliente cae en los campos del solicitante, nunca en los del intérprete o el preparador.",
            EN: "The N-400 starts with progress the moment it is added: what the firm knows about the client lands in the applicant's fields, never the interpreter's or the preparer's.",
          },
          focus: { at: [40, 42], zoom: 1.14 },
          click: [89, 40.6],
        },
        {
          id: "asistente-formulario",
          image: "/projects/ezmig/tour/motor-formularios-demo.jpg",
          label: { ES: "El motor de formularios", EN: "The form engine" },
          caption: {
            ES: "Dieciséis partes del N-400 convertidas en preguntas con el nombre del solicitante. Cada campo se valida al escribir y lo corregido actualiza el perfil.",
            EN: "Sixteen parts of the N-400 turned into questions with the applicant's name. Every field validates as you type, and a correction updates the profile.",
          },
          focus: { at: [68, 48], zoom: 1.12 },
          click: [87.3, 79.5],
        },
        {
          id: "asistente-ia",
          image: "/projects/ezmig/tour/asistente-ia.jpg",
          label: {
            ES: "Asistente con fuentes",
            EN: "An assistant with sources",
          },
          caption: {
            ES: "Responde qué evidencia exige cada formulario y cita de dónde lo saca. Respuestas verificadas contra las fuentes.",
            EN: "It answers what evidence each form requires and cites where it comes from. Answers verified against sources.",
          },
          focus: { at: [95, 55], zoom: 1.18 },
          click: [97.4, 92.8],
        },
      ],
    },
    {
      id: "cliente",
      device: "phone",
      title: {
        ES: "El portal del cliente, en el celular",
        EN: "The client portal, on a phone",
      },
      intro: {
        ES: "El cliente del abogado entra desde un enlace de invitación y completa su parte del trámite desde el teléfono.",
        EN: "The attorney's client comes in through an invite link and completes their part of the filing from their phone.",
      },
      url: "ezmig.ai/portal",
      width: 603,
      height: 1311,
      steps: [
        {
          id: "bienvenida",
          image: "/projects/ezmig/portal/bienvenida.jpg",
          label: {
            ES: "Un enlace, sin instalar nada",
            EN: "One link, nothing to install",
          },
          caption: {
            ES: "El despacho genera un enlace para el caso. El cliente ve quién lo invita y qué formulario le corresponde antes de crear su cuenta.",
            EN: "The firm generates a link for the case. The client sees who is inviting them and which form is theirs before creating an account.",
          },
          focus: { at: [50, 45], zoom: 1.03 },
          click: [50, 64.6],
        },
        {
          id: "escaneo",
          image: "/projects/ezmig/portal/escaneo.jpg",
          label: { ES: "Escanear el documento", EN: "Scan the document" },
          caption: {
            ES: "En vez de teclear, el cliente escanea su documento de identidad y el registro se llena solo.",
            EN: "Instead of typing, the client scans their identity document and the registration fills itself in.",
          },
          focus: { at: [50, 55], zoom: 1.03 },
          click: [50, 62],
        },
        {
          id: "registro",
          image: "/projects/ezmig/portal/registro.jpg",
          label: {
            ES: "Registro en cuatro pasos",
            EN: "Sign up in four steps",
          },
          caption: {
            ES: "El correo ya viene del caso. Cuatro pasos cortos y el cliente queda frente a su formulario.",
            EN: "The email already comes from the case. Four short steps and the client is looking at their form.",
          },
          focus: { at: [50, 60], zoom: 1.03 },
          click: [50, 85.8],
        },
        {
          id: "mis-casos",
          image: "/projects/ezmig/portal/mis-casos-v2.jpg",
          label: {
            ES: "Su caso, de un vistazo",
            EN: "Their case, at a glance",
          },
          caption: {
            ES: "El cliente ve su caso, qué formulario le toca, su rol y cuánto le falta. Nada del trabajo interno del despacho.",
            EN: "The client sees their case, which form is theirs, their role and how much is left. None of the firm's internal work.",
          },
          focus: { at: [50, 48], zoom: 1.03 },
          click: [83, 46.5],
        },
        {
          id: "formulario",
          image: "/projects/ezmig/portal/formulario-v2.jpg",
          label: {
            ES: "El mismo formulario, en el bolsillo",
            EN: "The same form, in a pocket",
          },
          caption: {
            ES: "El cliente retoma el N-400 donde lo dejó el abogado, con lo que el despacho ya sabía de él. Lo que corrige aquí actualiza su perfil.",
            EN: "The client picks the N-400 up where the attorney left it, with what the firm already knew about them. What they correct here updates their profile.",
          },
          focus: { at: [50, 60], zoom: 1.03 },
          click: [81, 86.6],
        },
        {
          id: "asistente",
          image: "/projects/ezmig/portal/asistente.jpg",
          label: {
            ES: "Respuestas sin llamar al despacho",
            EN: "Answers without calling the firm",
          },
          caption: {
            ES: "El asistente le explica al cliente en qué estado va su caso y qué sigue, con enlaces a las fuentes.",
            EN: "The assistant tells the client where their case stands and what comes next, with links to the sources.",
          },
          focus: { at: [50, 50], zoom: 1.03 },
          click: [90.5, 86.8],
        },
      ],
    },
    {
      id: "admin",
      device: "browser",
      title: { ES: "El panel de administración", EN: "The admin panel" },
      intro: {
        ES: "Lo que mantiene la plataforma al día con USCIS: el catálogo de formularios, su mapeo al PDF oficial y un vigilante de cambios de edición. Los datos son de prueba.",
        EN: "What keeps the platform current with USCIS: the form catalog, its mapping onto the official PDF and a watcher for edition changes. The data is test data.",
      },
      url: "ezmig.ai/admin",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "formularios",
          image: "/projects/ezmig/admin/formularios.jpg",
          label: { ES: "Catálogo de formularios", EN: "Form catalog" },
          caption: {
            ES: "Diecinueve formularios de USCIS como esquemas versionados: edición vigente, estado, uso, y un aviso cuando una edición necesita atención.",
            EN: "Nineteen USCIS forms as versioned schemas: current edition, status, usage, and a flag when an edition needs attention.",
          },
          focus: { at: [60, 45], zoom: 1.08 },
          click: [88.6, 52.3],
        },
        {
          id: "mapeo-pdf",
          image: "/projects/ezmig/admin/mapeo-pdf.jpg",
          label: {
            ES: "Del formulario al PDF oficial",
            EN: "From the form to the official PDF",
          },
          caption: {
            ES: "Cada respuesta cae en su casilla del PDF de USCIS. En el I-130, 189 de 190 campos mapeados, con el documento oficial al lado para comprobarlo.",
            EN: "Every answer lands in its box on the USCIS PDF. On the I-130, 189 of 190 fields mapped, with the official document beside it to check.",
          },
          focus: { at: [45, 50], zoom: 1.1 },
          click: [16, 75.9],
        },
        {
          id: "uscis",
          image: "/projects/ezmig/admin/uscis.jpg",
          label: {
            ES: "Vigilante de ediciones de USCIS",
            EN: "USCIS edition watcher",
          },
          caption: {
            ES: "Un proceso revisa las publicaciones de USCIS y avisa cuando una edición deja de aceptarse, con la fecha de corte, la severidad y el enlace a la fuente oficial.",
            EN: "A process checks what USCIS publishes and raises a notice when an edition stops being accepted, with the cutover date, the severity and the link to the official source.",
          },
          focus: { at: [55, 40], zoom: 1.1 },
          click: [94.4, 11.2],
        },
        {
          id: "analitica",
          image: "/projects/ezmig/admin/analitica.jpg",
          label: {
            ES: "La plataforma en números",
            EN: "The platform in numbers",
          },
          caption: {
            ES: "Usuarios por rol, despachos, casos, documentos y solicitudes a la IA, con la actividad del día, la semana y el mes.",
            EN: "Users by role, firms, cases, documents and AI requests, with activity for the day, the week and the month.",
          },
          focus: { at: [58, 40], zoom: 1.08 },
          click: [4.3, 77.9],
        },
      ],
    },
  ],
  ezdocuai: [
    {
      id: "traductor",
      device: "browser",
      title: {
        ES: "El espacio de trabajo del traductor",
        EN: "The translator's workspace",
      },
      intro: {
        ES: "Pantallas reales de la plataforma en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the platform in production. Hover to pause, or pick a stop on the rail.",
      },
      url: "ezdocu.ai/dashboard",
      width: 1512,
      height: 757,
      steps: [
        {
          id: "panel",
          image: "/projects/ezdocu/tour/panel.jpg",
          label: {
            ES: "Todas las órdenes, en un panel",
            EN: "Every order, on one panel",
          },
          caption: {
            ES: "Créditos, órdenes por estado y pares de idiomas más usados. Cada documento avanza por OCR, revisión y traducción.",
            EN: "Credits, orders by status and the language pairs used most. Every document moves through OCR, review and translation.",
          },
          focus: { at: [55, 45], zoom: 1.08 },
          click: [5.8, 33.8],
        },
        {
          id: "terminos",
          image: "/projects/ezdocu/tour/terminos.jpg",
          label: {
            ES: "El vocabulario del traductor",
            EN: "The translator's own vocabulary",
          },
          caption: {
            ES: "Glosarios propios por idioma y tipo de documento, con documentos de ejemplo y reglas de estilo. La IA traduce con los términos de quien firma.",
            EN: "Personal glossaries by language and document type, with sample documents and style rules. The AI translates with the terms of the person who signs.",
          },
          focus: { at: [45, 45], zoom: 1.1 },
          click: [24, 33.7],
        },
        {
          id: "editor",
          image: "/projects/ezdocu/tour/editor.jpg",
          label: {
            ES: "El diseño se reconstruye solo",
            EN: "The layout rebuilds itself",
          },
          caption: {
            ES: "A la izquierda, el escaneo de un artículo de 1971. A la derecha, el mismo documento con su título, sus columnas y sus negritas, listo para editar en vez de transcribir.",
            EN: "On the left, the scan of a 1971 article. On the right, the same document with its title, columns and bold type, ready to edit instead of retype.",
          },
          focus: { at: [62, 62], zoom: 1.12 },
          click: [95, 10.6],
        },
        {
          id: "eliminacion",
          image: "/projects/ezdocu/tour/eliminacion.jpg",
          label: { ES: "Borrado con constancia", EN: "Deletion with proof" },
          caption: {
            ES: "Al terminar, los archivos se eliminan de forma permanente y la orden conserva su certificado de eliminación. Ningún documento queda guardado.",
            EN: "Once finished, the files are permanently deleted and the order keeps its deletion certificate. No document stays stored.",
          },
          focus: { at: [50, 78], zoom: 1.12 },
          click: [29, 84.9],
        },
      ],
    },
  ],
  griver: [
    {
      id: "consola",
      device: "browser",
      title: {
        ES: "La consola de operación",
        EN: "The operations console",
      },
      intro: {
        ES: "Pantallas reales de la consola en producción, con importes y nombres difuminados. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the console in production, with amounts and names blurred. Hover to pause, or pick a stop on the rail.",
      },
      url: "RECO OCR API",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "metricas",
          image: "/projects/reco/tour/metricas.jpg",
          label: {
            ES: "Cada página, medida",
            EN: "Every page, measured",
          },
          caption: {
            ES: "Páginas por día, documentos digitales frente a escaneados, latencia y errores, por ambiente y por rango de fechas. La consola solo ve metadatos de negocio, nunca los documentos.",
            EN: "Pages per day, digital versus scanned documents, latency and errors, by environment and date range. The console only sees business metadata, never the documents.",
          },
          focus: { at: [56, 60], zoom: 1.08 },
          click: [4.8, 21.6],
        },
        {
          id: "procesar",
          image: "/projects/reco/tour/procesar.jpg",
          label: {
            ES: "El mismo camino que una agencia",
            EN: "The same path an agency takes",
          },
          caption: {
            ES: "Un lote de facturas o conocimientos de embarque entra por el mismo endpoint público que usan las agencias, con su propia credencial. El resultado llega agrupado por factura y los documentos no se guardan.",
            EN: "A batch of invoices or bills of lading goes through the same public endpoint the agencies use, with their own credential. The result comes back grouped by invoice and the documents are not stored.",
          },
          focus: { at: [52, 40], zoom: 1.12 },
          click: [5.9, 16.4],
        },
        {
          id: "entrenamiento",
          image: "/projects/reco/tour/entrenamiento.jpg",
          label: {
            ES: "Dónde se va el tiempo",
            EN: "Where the time goes",
          },
          caption: {
            ES: "El recorrido de cada documento partido en tramos: proceso automático, espera, revisión humana y total. Se ve de inmediato qué parte es de la máquina y cuál de las personas.",
            EN: "Each document's journey split into stages: automatic processing, waiting, human review and total. It is clear at a glance which part belongs to the machine and which to people.",
          },
          focus: { at: [56, 34], zoom: 1.14 },
          click: [4.8, 32],
        },
        {
          id: "auditoria",
          image: "/projects/reco/tour/auditoria.jpg",
          label: {
            ES: "Quién hizo qué",
            EN: "Who did what",
          },
          caption: {
            ES: "Un registro inmutable de cada acción administrativa, humana o de máquina: accesos, canjes de credencial, planes asignados. Exportable por evento, por día o por usuario.",
            EN: "An immutable record of every administrative action, human or machine: logins, credential exchanges, assigned plans. Exportable by event, by day or by user.",
          },
          focus: { at: [56, 62], zoom: 1.1 },
          click: [36, 17.3],
        },
      ],
    },
  ],
  imagiq: [
    {
      id: "operacion",
      device: "browser",
      title: {
        ES: "La operación, en un solo panel",
        EN: "Operations, on a single panel",
      },
      intro: {
        ES: "Pantallas reales del panel en producción, con nombres, documentos e importes difuminados. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production, with names, documents and amounts blurred. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "panel",
          image: "/projects/imagiq/tour/operacion/panel.jpg",
          label: {
            ES: "El negocio de un vistazo",
            EN: "The business at a glance",
          },
          caption: {
            ES: "Ventas, órdenes, clientes nuevos y ticket promedio del período, con la actividad reciente de la tienda al lado.",
            EN: "Sales, orders, new customers and average ticket for the period, with the store's recent activity alongside.",
          },
          focus: {
            at: [55, 45],
            zoom: 1.06,
          },
          click: [4.4, 24.8],
        },
        {
          id: "ordenes",
          image: "/projects/imagiq/tour/operacion/ordenes.jpg",
          label: {
            ES: "Cada orden, con su estado",
            EN: "Every order, with its status",
          },
          caption: {
            ES: "Todas las órdenes con su estado y su medio de pago: datáfono en tienda, PSE o crédito. Se filtran por estado, por pago o por cliente.",
            EN: "Every order with its status and payment method: in store card terminal, bank transfer or credit. Filter by status, payment or customer.",
          },
          focus: {
            at: [58, 55],
            zoom: 1.08,
          },
          click: [5.2, 59.6],
        },
        {
          id: "tiendas",
          image: "/projects/imagiq/tour/operacion/tiendas.jpg",
          label: {
            ES: "Toda la red de tiendas",
            EN: "The whole store network",
          },
          caption: {
            ES: "Cada punto de venta con su código, dirección y horario, junto a las órdenes de kiosko y las recogidas pendientes por verificar.",
            EN: "Every point of sale with its code, address and opening hours, next to kiosk orders and pickups waiting to be verified.",
          },
          focus: {
            at: [56, 68],
            zoom: 1.1,
          },
          click: [4.2, 64],
        },
        {
          id: "bodega",
          image: "/projects/imagiq/tour/operacion/bodega.jpg",
          label: {
            ES: "La demanda que no se ve",
            EN: "The demand you cannot see",
          },
          caption: {
            ES: "Los productos agotados que los clientes siguen pidiendo, ordenados por cuántos esperan. Debajo, el estado de cada guía de envío en tiempo real.",
            EN: "Sold out products customers keep asking for, ranked by how many are waiting. Below, the live status of every shipping label.",
          },
          focus: {
            at: [55, 50],
            zoom: 1.08,
          },
          click: [4.8, 68.5],
        },
        {
          id: "cobertura",
          image: "/projects/imagiq/tour/operacion/cobertura.jpg",
          label: {
            ES: "Zonas de entrega dibujadas a mano",
            EN: "Delivery zones drawn by hand",
          },
          caption: {
            ES: "El equipo dibuja sobre el mapa hasta dónde llega cada ciudad, con las tiendas encima, y verifica una dirección antes de prometer la entrega.",
            EN: "The team draws on the map how far each city reaches, with the stores on top, and checks an address before promising delivery.",
          },
          focus: {
            at: [48, 62],
            zoom: 1.12,
          },
          click: [89, 34.7],
        },
      ],
    },
    {
      id: "marketing",
      device: "browser",
      title: {
        ES: "Campañas por cada canal",
        EN: "Campaigns on every channel",
      },
      intro: {
        ES: "Pantallas reales del panel en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com/marketing",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "campanas",
          image: "/projects/imagiq/tour/marketing/campanas.jpg",
          label: {
            ES: "Todas las campañas, con su resultado",
            EN: "Every campaign, with its result",
          },
          caption: {
            ES: "Correo, WhatsApp, SMS y mensajes dentro del sitio en una sola lista, con alcance, aperturas y clics de cada envío.",
            EN: "Email, WhatsApp, SMS and on site messages in a single list, with reach, opens and clicks for every send.",
          },
          focus: {
            at: [50, 55],
            zoom: 1.06,
          },
          click: [93.6, 11.7],
        },
        {
          id: "canales",
          image: "/projects/imagiq/tour/marketing/canales.jpg",
          label: {
            ES: "Un canal para cada objetivo",
            EN: "A channel for every goal",
          },
          caption: {
            ES: "Al crear una campaña se elige por dónde sale: automatización por eventos, WhatsApp, correo, SMS o un mensaje dentro de la tienda.",
            EN: "Creating a campaign starts by choosing where it goes out: event automation, WhatsApp, email, SMS or a message inside the store.",
          },
          focus: {
            at: [58, 35],
            zoom: 1.1,
          },
          click: [58.5, 34.7],
        },
        {
          id: "correo",
          image: "/projects/imagiq/tour/marketing/correo.jpg",
          label: {
            ES: "Correos armados arrastrando bloques",
            EN: "Emails built by dragging blocks",
          },
          caption: {
            ES: "Un editor visual con plantillas propias: columnas, botones, imágenes y HTML. El equipo de mercadeo arma el correo sin pedirle nada a desarrollo.",
            EN: "A visual editor with the brand's own templates: columns, buttons, images and HTML. Marketing builds the email without asking engineering for anything.",
          },
          focus: {
            at: [52, 55],
            zoom: 1.06,
          },
          click: [84, 23.4],
        },
        {
          id: "whatsapp",
          image: "/projects/imagiq/tour/marketing/whatsapp.jpg",
          label: {
            ES: "WhatsApp, con vista previa en vivo",
            EN: "WhatsApp, with a live preview",
          },
          caption: {
            ES: "Producto, precio, descuento y botones de compra. A la derecha, el mensaje tal como lo verá el cliente en su teléfono mientras se escribe.",
            EN: "Product, price, discount and buy buttons. On the right, the message exactly as the customer will see it on their phone, as it is written.",
          },
          focus: {
            at: [70, 55],
            zoom: 1.1,
          },
          click: [86, 48],
        },
        {
          id: "sms",
          image: "/projects/imagiq/tour/marketing/sms.jpg",
          label: {
            ES: "SMS con plantillas y variables",
            EN: "SMS with templates and variables",
          },
          caption: {
            ES: "Plantillas por categoría, variables de nombre y apellido, y el conteo de caracteres y segmentos antes de enviar.",
            EN: "Templates by category, first and last name variables, and the character and segment count before sending.",
          },
          focus: {
            at: [62, 55],
            zoom: 1.08,
          },
          click: [58.4, 37.5],
        },
        {
          id: "inweb",
          image: "/projects/imagiq/tour/marketing/inweb.jpg",
          label: {
            ES: "Mensajes dentro de la tienda",
            EN: "Messages inside the store",
          },
          caption: {
            ES: "Un pop up o un aviso sobre el sitio real, segmentado por audiencia, ciudad, número de compras y edad, con vista previa en escritorio y móvil.",
            EN: "A pop up or a notice over the real site, segmented by audience, city, number of purchases and age, with desktop and mobile preview.",
          },
          focus: {
            at: [45, 55],
            zoom: 1.06,
          },
          click: [89, 10.2],
        },
      ],
    },
    {
      id: "sitio",
      device: "browser",
      title: {
        ES: "El sitio lo maneja el equipo",
        EN: "The team runs the site",
      },
      intro: {
        ES: "Pantallas reales del panel en producción. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "Real screens from the panel in production. Hover to pause, or pick a stop on the rail.",
      },
      url: "admin.imagiq.com/pagina-web",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "banners",
          image: "/projects/imagiq/tour/sitio/banners.jpg",
          label: {
            ES: "Los banners de la portada",
            EN: "The home page banners",
          },
          caption: {
            ES: "Cada banner con su ubicación, su llamado a la acción y su estado. Se activan y se ordenan sin tocar código.",
            EN: "Every banner with its placement, call to action and status. They are switched on and reordered without touching code.",
          },
          focus: {
            at: [55, 60],
            zoom: 1.06,
          },
          click: [94, 11.7],
        },
        {
          id: "landing",
          image: "/projects/imagiq/tour/sitio/landing.jpg",
          label: {
            ES: "Landings con vista previa en vivo",
            EN: "Landing pages with a live preview",
          },
          caption: {
            ES: "Título, fechas, carrusel de banners y secciones de productos a la izquierda. A la derecha, la página real actualizándose mientras se edita.",
            EN: "Title, dates, banner carousel and product sections on the left. On the right, the real page updating as it is edited.",
          },
          focus: {
            at: [72, 60],
            zoom: 1.08,
          },
          click: [55.5, 70],
        },
        {
          id: "en-vivo",
          image: "/projects/imagiq/tour/sitio/en-vivo.jpg",
          label: {
            ES: "Transmisiones en vivo con compra",
            EN: "Live streams you can buy from",
          },
          caption: {
            ES: "Un YouTube Live con chat y cuenta regresiva dentro de la landing, con enlace de respaldo, horario programado y hasta 12 productos para comprar durante la transmisión.",
            EN: "A YouTube Live with chat and countdown inside the landing page, with a backup link, a schedule and up to 12 products to buy during the stream.",
          },
          focus: {
            at: [38, 55],
            zoom: 1.1,
          },
          click: [51, 36.2],
        },
      ],
    },
    {
      id: "tienda",
      device: "browser",
      title: {
        ES: "La tienda que ve el cliente",
        EN: "The store the customer sees",
      },
      intro: {
        ES: "La tienda pública en producción, recorrida con datos ficticios. Pasa el cursor para pausar, o elige una parada en el riel.",
        EN: "The public store in production, walked through with fictional details. Hover to pause, or pick a stop on the rail.",
      },
      url: "imagiq.com",
      width: 1512,
      height: 806,
      steps: [
        {
          id: "inicio",
          image: "/projects/imagiq/tour/tienda/inicio.jpg",
          label: {
            ES: "La portada",
            EN: "The home page",
          },
          caption: {
            ES: "Los banners que mercadeo administra desde el panel, el buscador y el asistente siempre a un clic.",
            EN: "The banners marketing manages from the panel, search, and the assistant always one click away.",
          },
          focus: {
            at: [55, 50],
            zoom: 1.05,
          },
          click: [96.7, 72.7],
        },
        {
          id: "asistente",
          image: "/projects/imagiq/tour/tienda/asistente.jpg",
          label: {
            ES: "Un asistente que conoce el catálogo",
            EN: "An assistant that knows the catalog",
          },
          caption: {
            ES: "El cliente pregunta como le hablaría a un vendedor y recibe una recomendación con la tarjeta del producto, su precio y el botón de compra.",
            EN: "The customer asks the way they would ask a salesperson and gets a recommendation with the product card, its price and the buy button.",
          },
          focus: {
            at: [16, 50],
            zoom: 1.18,
          },
          click: [25.4, 4.1],
        },
        {
          id: "producto",
          image: "/projects/imagiq/tour/tienda/producto.jpg",
          label: {
            ES: "La página de producto",
            EN: "The product page",
          },
          caption: {
            ES: "Variantes de almacenamiento y color con su precio y su cuota mensual, siempre con el botón de compra a la vista.",
            EN: "Storage and color variants with their price and monthly installment, with the buy button always in view.",
          },
          focus: {
            at: [70, 50],
            zoom: 1.08,
          },
          click: [92.5, 15.6],
        },
        {
          id: "carrito",
          image: "/projects/imagiq/tour/tienda/carrito.jpg",
          label: {
            ES: "El carrito",
            EN: "The cart",
          },
          caption: {
            ES: "Descuentos aplicados, plan de entrega del equipo usado, accesorios sugeridos para ese modelo y las opciones de financiación.",
            EN: "Discounts applied, trade in of the old device, accessories suggested for that model and the financing options.",
          },
          focus: {
            at: [55, 40],
            zoom: 1.08,
          },
          click: [67, 37],
        },
        {
          id: "datos",
          image: "/projects/imagiq/tour/tienda/datos.jpg",
          label: {
            ES: "Comprar sin crear cuenta",
            EN: "Buying without an account",
          },
          caption: {
            ES: "Cuatro pasos: datos, entrega, pago y confirmación. Se puede seguir como invitado o iniciar sesión para acumular puntos.",
            EN: "Four steps: details, delivery, payment and confirmation. Continue as a guest or sign in to collect points.",
          },
          focus: {
            at: [45, 50],
            zoom: 1.08,
          },
          click: [51.3, 7.7],
        },
        {
          id: "tiendas",
          image: "/projects/imagiq/tour/tienda/tiendas.jpg",
          label: {
            ES: "Todas las tiendas en el mapa",
            EN: "Every store on the map",
          },
          caption: {
            ES: "Cada punto de venta con su dirección, su horario y la ruta en Maps o Waze. La misma red desde la que se despacha cada pedido.",
            EN: "Every point of sale with its address, opening hours and the route in Maps or Waze. The same network every order ships from.",
          },
          focus: {
            at: [55, 60],
            zoom: 1.06,
          },
          click: [10.2, 51.2],
        },
      ],
    },
  ],
};
