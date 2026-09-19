import { paths, type PagePath } from "@/lib/routes";

export type Industry = {
  /** Key into `messages.industries.items`. */
  id: string;
  /** Missing while the photos are pending; the card shows a dark cover instead. */
  image?: string;
  /** The case study or project page behind the industry, when there is one. */
  path?: PagePath;
};

/** The industries on the home page, in the order they show. */
export const INDUSTRIES: Industry[] = [
  // Aerospace first, as asked; photos and the project behind it are pending.
  { id: "aerospace" },
  { id: "retail", image: "/projects/samsung/cart-mobile.png", path: paths.caseStudy("imagiq") },
  { id: "trade", image: "/projects/reco/plataforma-mobile.png", path: paths.caseStudy("griver") },
  { id: "legal", image: "/projects/ezmig/home.png", path: paths.caseStudy("ezmig") },
  { id: "translation", image: "/projects/ezdocu/home-mobile.png", path: paths.caseStudy("ezdocuai") },
  { id: "telecom", image: "/projects/claro/home.png", path: paths.caseStudy("claro") },
  { id: "support", image: "/projects/ia-multicanal/fridoom.png", path: paths.caseStudy("ia-multicanal") },
  { id: "sports", image: "/projects/futtem/app.png", path: paths.caseStudy("futtem") },
  { id: "fintech", image: "/projects/fridoom/home.png", path: paths.project("fridoom") },
];
