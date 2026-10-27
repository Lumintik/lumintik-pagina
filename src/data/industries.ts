import { paths, type PagePath } from "@/lib/routes";

export type Industry = {
  /** Key into `messages.industries.items`; also the URL segment. */
  id: string;
  image?: string;
  /** The case study or project page behind the industry, when there is one. */
  path?: PagePath;
  /** Photos shown on the industry page. */
  gallery?: { src: string; width: number; height: number }[];
  /** What we work with in this sector; product names, so they are not translated. */
  stack: string[];
};

/** The industries, in the order they show. */
export const INDUSTRIES: Industry[] = [
  {
    id: "aerospace",
    image: "/projects/orion/vab-nasa.jpg",
    stack: ["C++", "Python", "ROS", "Control de motores", "Telemetría"],
    gallery: [
      { src: "/projects/orion/rover-equipo.jpg", width: 1600, height: 1200 },
      { src: "/projects/orion/rover-exterior.jpg", width: 1200, height: 1600 },
      { src: "/projects/orion/modulo-controles.jpg", width: 1200, height: 1600 },
      { src: "/projects/orion/astronauta.jpg", width: 1600, height: 1200 },
      { src: "/projects/orion/motor-principal.jpg", width: 1600, height: 1200 },
      { src: "/projects/orion/motores-transbordador.jpg", width: 1200, height: 1600 },
      { src: "/projects/orion/modulo-lunar.jpg", width: 1200, height: 1600 },
      { src: "/projects/orion/rocket-garden.jpg", width: 1600, height: 1200 },
      { src: "/projects/orion/transbordador.jpg", width: 1200, height: 1600 },
      { src: "/projects/orion/monumento-apolo.jpg", width: 1600, height: 1200 },
    ],
  },
  {
    id: "retail",
    image: "/projects/samsung/cart-mobile.webp",
    path: paths.caseStudy("imagiq"),
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Google Distance Matrix", "AWS"],
    gallery: [
      { src: "/projects/samsung/home-desktop.webp", width: 2880, height: 1800 },
      { src: "/projects/samsung/dashboard-orders.webp", width: 2880, height: 1800 },
      { src: "/projects/samsung/dashboard-home.webp", width: 2880, height: 1800 },
    ],
  },
  {
    id: "telecom",
    image: "/projects/claro/home.webp",
    path: paths.caseStudy("claro"),
    stack: ["PostHog", "Plan de eventos", "Embudos", "Tableros"],
  },
  {
    id: "support",
    image: "/projects/ia-multicanal/fridoom.png",
    path: paths.caseStudy("ia-multicanal"),
    stack: ["Agentes de IA", "WhatsApp Business API", "Instagram API", "Next.js"],
    gallery: [
      { src: "/projects/ia-multicanal/imagiq.png", width: 1170, height: 2532 },
      { src: "/projects/ia-multicanal/accesify.png", width: 1170, height: 2532 },
    ],
  },
  {
    id: "sports",
    image: "/projects/futtem/app.webp",
    path: paths.caseStudy("futtem"),
    stack: ["React Native", "NestJS", "PostgreSQL", "App Store", "Google Play"],
  },
  {
    id: "fintech",
    image: "/projects/fridoom/home.webp",
    path: paths.project("fridoom"),
    stack: ["Next.js", "Agentes de IA", "PostgreSQL"],
  },
];

export function findIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
