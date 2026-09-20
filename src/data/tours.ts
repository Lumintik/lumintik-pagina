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
  /** Shown in the browser bar. */
  url: string;
  width: number;
  height: number;
  steps: TourStep[];
};

/** Product tours, keyed by case slug. Every screen is from the live product with no client data on it. */
export const TOURS: Record<string, Tour> = {
  ezmig: {
    url: "ezmig.ai/dashboard",
    width: 1512,
    height: 806,
    steps: [
      {
        id: "panel",
        image: "/projects/ezmig/tour/panel.jpg",
        label: { ES: "El despacho de un vistazo", EN: "The practice at a glance" },
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
        label: { ES: "Un caso, todo en un lugar", EN: "One case, everything in one place" },
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
        label: { ES: "Asistente con fuentes", EN: "An assistant with sources" },
        caption: {
          ES: "Responde qué evidencia exige cada formulario y cita de dónde lo saca. Respuestas verificadas contra las fuentes.",
          EN: "It answers what evidence each form requires and cites where it comes from. Answers verified against sources.",
        },
        focus: { at: [95, 55], zoom: 1.18 },
        click: [97.4, 92.8],
      },
    ],
  },
};
