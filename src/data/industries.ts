import { paths, type PagePath } from "@/lib/routes";

export type Industry = {
  /** Key into `messages.industries.items`. */
  id: string;
  /** Missing while the photos are pending; the card shows a dark cover instead. */
  image?: string;
  /** The case study or project page behind the industry, when there is one. */
  path?: PagePath;
  /** Extra photos shown inside the card, when the industry has no page of its own. */
  gallery?: { src: string; width: number; height: number }[];
};

/** The industries on the home page, in the order they show. */
export const INDUSTRIES: Industry[] = [
  {
    id: "aerospace",
    image: "/projects/orion/vab-nasa.jpg",
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
  { id: "retail", image: "/projects/samsung/cart-mobile.png", path: paths.caseStudy("imagiq") },
  { id: "trade", image: "/projects/reco/plataforma-mobile.png", path: paths.caseStudy("griver") },
  { id: "legal", image: "/projects/ezmig/home.png", path: paths.caseStudy("ezmig") },
  { id: "translation", image: "/projects/ezdocu/home-mobile.png", path: paths.caseStudy("ezdocuai") },
  { id: "telecom", image: "/projects/claro/home.png", path: paths.caseStudy("claro") },
  { id: "support", image: "/projects/ia-multicanal/fridoom.png", path: paths.caseStudy("ia-multicanal") },
  { id: "sports", image: "/projects/futtem/app.png", path: paths.caseStudy("futtem") },
  { id: "fintech", image: "/projects/fridoom/home.png", path: paths.project("fridoom") },
];
