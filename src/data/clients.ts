import type { IconType } from "react-icons";
import { SiCocacola, SiSamsung } from "react-icons/si";

type ClientLogo =
  | { kind: "icon"; icon: IconType }
  | { kind: "image"; src: string; width: number; height: number; /** Already white, so it skips the filter. */ mono?: boolean };

export type Client = {
  key: string;
  name: string;
  logo: ClientLogo;
  /** Only live, verified URLs. */
  href?: string;
};

/** The client wall under the hero, in reading order. */
export const CLIENTS: Client[] = [
  { key: "samsung", name: "Samsung", logo: { kind: "icon", icon: SiSamsung }, href: "https://www.imagiq.com/" },
  { key: "claro", name: "Claro", logo: { kind: "image", src: "/clients/claro.svg", width: 601, height: 218 }, href: "https://www.claro.com.co/" },
  { key: "coca-cola", name: "Coca-Cola", logo: { kind: "icon", icon: SiCocacola }, href: "https://www.coca-cola.com/co/es" },
  { key: "griver", name: "Griver", logo: { kind: "image", src: "/clients/griver.png", width: 400, height: 144 } },
  { key: "ezdocuai", name: "EZDocuAI", logo: { kind: "image", src: "/clients/ezdocuai.png", width: 240, height: 235 }, href: "https://www.ezdocu.ai/" },
  { key: "ezmig", name: "EZMig", logo: { kind: "image", src: "/clients/ezmig.png", width: 320, height: 151 } },
  { key: "piebald", name: "Piebald Capital", logo: { kind: "image", src: "/clients/piebald.svg", width: 1790, height: 1234 }, href: "https://www.piebaldcapital.com/" },
  { key: "minnesota", name: "Minnesota", logo: { kind: "image", src: "/clients/minnesota.png", width: 177, height: 240 }, href: "https://www.minnesotaent.net/" },
  { key: "lenspr", name: "LensPR", logo: { kind: "image", src: "/clients/lenspr.svg", width: 1060, height: 1276 }, href: "https://www.lenspr.com/es" },
  { key: "attosound", name: "Attosound", logo: { kind: "image", src: "/clients/attosound.png", width: 240, height: 238 }, href: "https://www.attosound.com/" },
  { key: "futtem", name: "FUTTEM", logo: { kind: "image", src: "/clients/futtem.svg", width: 136, height: 25 }, href: "https://www.futtem.com/" },
  { key: "accesify", name: "Accesify", logo: { kind: "image", src: "/clients/accesify-mono.png", width: 419, height: 240, mono: true }, href: "https://www.accesify.com/" },
];
