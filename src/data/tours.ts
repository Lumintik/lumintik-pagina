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
        id: "formularios",
        image: "/projects/ezmig/tour/formularios.jpg",
        label: { ES: "Formularios por caso", EN: "Forms per case" },
        caption: {
          ES: "Cada formulario de USCIS con su avance por rol: solicitante, intérprete y preparador. El PDF final sale de aquí.",
          EN: "Every USCIS form with its progress by role: applicant, interpreter and preparer. The final PDF comes out of here.",
        },
        focus: { at: [58, 48], zoom: 1.12 },
        click: [89, 59],
      },
      {
        id: "asistente-formulario",
        image: "/projects/ezmig/tour/asistente-formulario.jpg",
        label: { ES: "El motor de formularios", EN: "The form engine" },
        caption: {
          ES: "Dieciséis partes del N-400 convertidas en preguntas con el nombre del solicitante, validadas una por una.",
          EN: "Sixteen parts of the N-400 turned into questions with the applicant's name, validated one by one.",
        },
        focus: { at: [60, 30], zoom: 1.12 },
        click: [87.3, 61.6],
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
