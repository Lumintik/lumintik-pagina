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

/** Product tours, keyed by case slug. Every screen is from the live product, on a fictional demo case. */
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
          image: "/projects/ezmig/portal/mis-casos.jpg",
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
};
