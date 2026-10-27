import type { IconType } from "react-icons";
import { SiCocacola, SiSamsung } from "react-icons/si";
import { paths, type PagePath } from "@/lib/routes";

type ClientLogo =
  | { kind: "icon"; icon: IconType }
  | { kind: "image"; src: string; width: number; height: number; /** Already white, so it skips the filter. */ mono?: boolean };

export type Country = "CO" | "US" | "MX";

export type Client = {
  key: string;
  name: string;
  country: Country;
  logo: ClientLogo;
  /** Nuestra página del proyecto o los proyectos con ese cliente. Sin página, el logo no enlaza. */
  page?: PagePath;
};

/** The client wall under the hero, in reading order. */
export const CLIENTS: Client[] = [
  { key: "samsung", country: "CO", name: "Samsung", logo: { kind: "icon", icon: SiSamsung }, page: paths.caseStudy("imagiq") },
  { key: "nasa", country: "US", name: "NASA", logo: { kind: "image", src: "/clients/nasa.svg", width: 508, height: 142 }, page: paths.industry("aerospace") },
  { key: "claro", country: "CO", name: "Claro", logo: { kind: "image", src: "/clients/claro.svg", width: 601, height: 218 }, page: paths.caseStudy("claro") },
  { key: "coca-cola", country: "CO", name: "Coca-Cola", logo: { kind: "icon", icon: SiCocacola } },
  { key: "minnesota", country: "US", name: "Minnesota", logo: { kind: "image", src: "/clients/minnesota.png", width: 177, height: 240 }, page: paths.project("minnesota") },
  { key: "lenspr", country: "CO", name: "LensPR", logo: { kind: "image", src: "/clients/lenspr.svg", width: 1060, height: 1276 }, page: paths.project("lenspr") },
  { key: "attosound", country: "US", name: "Attosound", logo: { kind: "image", src: "/clients/attosound.png", width: 240, height: 238 }, page: paths.project("attosound") },
  { key: "futtem", country: "CO", name: "FUTTEM", logo: { kind: "image", src: "/clients/futtem.svg", width: 136, height: 25 }, page: paths.caseStudy("futtem") },
  { key: "accesify", country: "CO", name: "Accesify", logo: { kind: "image", src: "/clients/accesify-mono.png", width: 419, height: 240, mono: true }, page: paths.caseStudy("ia-multicanal") },
  { key: "fridoom", country: "CO", name: "Fridoom", logo: { kind: "image", src: "/clients/fridoom.png", width: 320, height: 162 }, page: paths.project("fridoom") },
  { key: "tata", country: "CO", name: "Tata", logo: { kind: "image", src: "/clients/tata.png", width: 414, height: 288, mono: true } },
];
