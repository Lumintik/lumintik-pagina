import type { ReactNode } from "react";
import { FaAws, FaBoxes, FaDatabase, FaFileInvoice, FaHistory, FaServer, FaStore, FaTruck } from "react-icons/fa";
import {
  SiCloudflare,
  SiCloudflarepages,
  SiCloudflareworkers,
  SiDocker,
  SiGooglebigquery,
  SiGooglecloud,
  SiGooglecloudstorage,
  SiGooglemaps,
  SiInstagram,
  SiNestjs,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiRedis,
  SiWhatsapp,
} from "react-icons/si";
import type { Locale } from "@/lib/locale";

/** A point on the stage, in percent of its width and height. */
export type Pt = [number, number];

export type Chip = {
  id: string;
  label: string;
  icon?: ReactNode;
  at: Pt;
};

export type Stat = { big: string; small: Record<Locale, string> };

/**
 * Where a line ends. With a label it shows a small chip there (the service
 * the provider is wired to); without one it ends at that point, which is
 * how a line reaches a chip that already exists.
 */
export type Target = { at: Pt; label?: string; icon?: ReactNode };

/**
 * One step of a scene. The player runs them in order; `dur` is how long the
 * step takes before the next one starts.
 */
export type Step =
  | { t: "chip"; chip: Chip; dur?: number }
  | { t: "cursor"; to: Pt; dur?: number }
  | { t: "click"; dur?: number }
  | { t: "lines"; from: string; to: Target[]; dur?: number }
  | { t: "drag"; chip: Chip; to: Pt; dur?: number }
  | { t: "flip"; stats: Stat[]; dur?: number }
  | { t: "wait"; dur: number };

export type Scene = {
  id: string;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  line: Record<Locale, string>;
  steps: Step[];
};

const icon = (node: ReactNode) => <span className="size-4 shrink-0">{node}</span>;

/** The AWS marks are the official architecture icons, served as files. */
const aws = (name: string) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/hero/aws/${name}.svg`} alt="" className="size-4 shrink-0 rounded-[3px]" />
);
const oracle = (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/hero/oracle.svg" alt="" className="h-3 w-[19px] shrink-0" />
);

/**
 * The scenes, in the order they play. The first uses the example figures the
 * team gave to describe the idea; they are placeholders, not results. The
 * others use results already published in the case studies.
 */
export const HERO_SCENES: Scene[] = [
  {
    id: "infra",
    eyebrow: { ES: "Plataforma e infraestructura", EN: "Platform and infrastructure" },
    title: { ES: "Infraestructura eficiente", EN: "Efficient infrastructure" },
    line: {
      ES: "Ambientes aislados y blindados para testeo, despliegues controlados y observabilidad desde el primer día.",
      EN: "Isolated, hardened environments for testing, controlled deployments and observability from day one.",
    },
    steps: [
      { t: "chip", chip: { id: "aws", label: "AWS", icon: icon(<FaAws style={{ color: "#FF9900" }} />), at: [20, 14] }, dur: 500 },
      { t: "cursor", to: [20, 14], dur: 700 },
      { t: "click", dur: 350 },
      { t: "lines", from: "aws", to: [
        { at: [60, 8], label: "S3", icon: aws("s3") },
        { at: [76, 19], label: "Lambda", icon: aws("lambda") },
        { at: [60, 30], label: "RDS", icon: aws("rds") },
      ], dur: 1000 },
      { t: "drag", chip: { id: "gcp", label: "GCP", icon: icon(<SiGooglecloud style={{ color: "#4285F4" }} />), at: [10, 94] }, to: [20, 40], dur: 1100 },
      { t: "lines", from: "gcp", to: [
        { at: [60, 44], label: "Cloud Storage", icon: icon(<SiGooglecloudstorage style={{ color: "#8AB4F8" }} />) },
        { at: [76, 55], label: "BigQuery", icon: icon(<SiGooglebigquery style={{ color: "#669DF6" }} />) },
      ], dur: 900 },
      { t: "drag", chip: { id: "oracle", label: "Oracle", icon: oracle, at: [46, 94] }, to: [20, 66], dur: 1100 },
      { t: "lines", from: "oracle", to: [
        { at: [60, 68], label: "Autonomous DB", icon: icon(<FaDatabase style={{ color: "#C74634" }} />) },
        { at: [76, 79], label: "OCI Compute", icon: icon(<FaServer style={{ color: "#C74634" }} />) },
      ], dur: 900 },
      { t: "chip", chip: { id: "cf", label: "Cloudflare", icon: icon(<SiCloudflare style={{ color: "#F38020" }} />), at: [20, 90] }, dur: 300 },
      { t: "cursor", to: [20, 90], dur: 600 },
      { t: "click", dur: 350 },
      { t: "lines", from: "cf", to: [
        { at: [60, 92], label: "Workers", icon: icon(<SiCloudflareworkers style={{ color: "#F38020" }} />) },
        { at: [82, 82], label: "Pages", icon: icon(<SiCloudflarepages style={{ color: "#F38020" }} />) },
      ], dur: 800 },
      { t: "wait", dur: 500 },
      // EXAMPLE FIGURES from the brief, not measured results. Replace before publishing.
      { t: "flip", stats: [
        { big: "50%", small: { ES: "ahorro en costos de nube", EN: "cloud cost savings" } },
        { big: "80%", small: { ES: "menos tiempo de despliegue", EN: "less deployment time" } },
      ], dur: 3600 },
    ],
  },
  {
    id: "ai",
    eyebrow: { ES: "Inteligencia artificial aplicada", EN: "Applied artificial intelligence" },
    title: { ES: "Documentos que se revisan solos", EN: "Documents that review themselves" },
    line: {
      ES: "OCR con IA y un modelo de lenguaje auto hospedado: los datos no salen de la infraestructura del cliente.",
      EN: "AI OCR and a self hosted language model: the data never leaves the client's infrastructure.",
    },
    steps: [
      { t: "chip", chip: { id: "ocr", label: "OCR con IA", icon: icon(<SiOpenai style={{ color: "#fff" }} />), at: [24, 30] }, dur: 500 },
      { t: "cursor", to: [24, 30], dur: 700 },
      { t: "click", dur: 350 },
      { t: "lines", from: "ocr", to: [
        { at: [60, 16], label: "Pedimentos", icon: icon(<FaFileInvoice style={{ color: "#93c5fd" }} />) },
        { at: [64, 40], label: "Facturas", icon: icon(<FaFileInvoice style={{ color: "#93c5fd" }} />) },
      ], dur: 800 },
      { t: "chip", chip: { id: "docker", label: "Docker", icon: icon(<SiDocker style={{ color: "#2496ED" }} />), at: [70, 64] }, dur: 300 },
      { t: "drag", chip: { id: "pg", label: "PostgreSQL", icon: icon(<SiPostgresql style={{ color: "#4169E1" }} />), at: [16, 80] }, to: [34, 66], dur: 1100 },
      { t: "lines", from: "pg", to: [
        { at: [64, 84], label: "Histórico", icon: icon(<FaHistory style={{ color: "#93c5fd" }} />) },
      ], dur: 600 },
      { t: "wait", dur: 500 },
      // Griver case: a full day of review down to 10 minutes.
      { t: "flip", stats: [
        { big: "1 día → 10 min", small: { ES: "revisión de pedimentos y facturas", EN: "reviewing customs entries and invoices" } },
      ], dur: 3600 },
    ],
  },
  {
    id: "ops",
    eyebrow: { ES: "Operación a escala real", EN: "Operations at real scale" },
    title: { ES: "Toda la red, un solo inventario", EN: "The whole network, one inventory" },
    line: {
      ES: "Un algoritmo cruza el stock de cada tienda con la distancia real al cliente y elige la tienda óptima.",
      EN: "An algorithm matches each store's stock against the real distance to the customer and picks the best store.",
    },
    steps: [
      { t: "chip", chip: { id: "next", label: "Next.js", icon: icon(<SiNextdotjs style={{ color: "#fff" }} />), at: [22, 28] }, dur: 400 },
      { t: "chip", chip: { id: "nest", label: "NestJS", icon: icon(<SiNestjs style={{ color: "#E0234E" }} />), at: [22, 52] }, dur: 400 },
      { t: "cursor", to: [22, 52], dur: 700 },
      { t: "click", dur: 350 },
      { t: "lines", from: "nest", to: [
        { at: [56, 30], label: "Inventario", icon: icon(<FaBoxes style={{ color: "#93c5fd" }} />) },
        { at: [60, 52], label: "Tiendas", icon: icon(<FaStore style={{ color: "#93c5fd" }} />) },
        { at: [56, 74], label: "Pedidos", icon: icon(<FaTruck style={{ color: "#93c5fd" }} />) },
      ], dur: 900 },
      { t: "drag", chip: { id: "maps", label: "Distance Matrix", icon: icon(<SiGooglemaps style={{ color: "#4285F4" }} />), at: [70, 88] }, to: [72, 60], dur: 1100 },
      { t: "chip", chip: { id: "redis", label: "Redis", icon: icon(<SiRedis style={{ color: "#DC382D" }} />), at: [74, 28] }, dur: 300 },
      { t: "lines", from: "maps", to: [{ at: [74, 28] }], dur: 600 },
      { t: "wait", dur: 500 },
      // Imagiq case: more than 30 points of sale, deliveries in 24 hours at most.
      { t: "flip", stats: [
        { big: "30+", small: { ES: "puntos de venta como un solo inventario", EN: "points of sale as a single inventory" } },
        { big: "24 h", small: { ES: "entrega máxima", EN: "delivery at most" } },
      ], dur: 3600 },
    ],
  },
  {
    id: "channels",
    eyebrow: { ES: "Experiencia y conversión", EN: "Experience and conversion" },
    title: { ES: "Una inteligencia, todos los canales", EN: "One intelligence, every channel" },
    line: {
      ES: "Un agente conectado al catálogo, al stock y a las tiendas, que responde en WhatsApp, Instagram y la web.",
      EN: "An agent connected to the catalog, stock and stores, answering on WhatsApp, Instagram and the web.",
    },
    steps: [
      { t: "chip", chip: { id: "agent", label: "Agente IA", icon: icon(<SiOpenai style={{ color: "#fff" }} />), at: [50, 50] }, dur: 500 },
      { t: "drag", chip: { id: "wa", label: "WhatsApp", icon: icon(<SiWhatsapp style={{ color: "#25D366" }} />), at: [14, 84] }, to: [20, 24], dur: 1000 },
      { t: "lines", from: "agent", to: [{ at: [20, 24] }], dur: 500 },
      { t: "chip", chip: { id: "ig", label: "Instagram", icon: icon(<SiInstagram style={{ color: "#E4405F" }} />), at: [80, 26] }, dur: 300 },
      { t: "lines", from: "agent", to: [{ at: [80, 26] }], dur: 500 },
      { t: "chip", chip: { id: "web", label: "Web", icon: icon(<SiNextdotjs style={{ color: "#fff" }} />), at: [78, 78] }, dur: 300 },
      { t: "cursor", to: [78, 78], dur: 600 },
      { t: "click", dur: 350 },
      { t: "lines", from: "agent", to: [{ at: [78, 78] }], dur: 500 },
      { t: "wait", dur: 500 },
      // Multichannel case: the result as stated there.
      { t: "flip", stats: [
        { big: "1", small: { ES: "sola inteligencia para todos los canales, con respuestas al instante", EN: "intelligence for every channel, with instant answers" } },
      ], dur: 3600 },
    ],
  },
];
