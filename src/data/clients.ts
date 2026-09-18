import type { IconType } from "react-icons";
import { SiCocacola, SiSamsung } from "react-icons/si";

export type Country = "CO" | "US" | "MX";

type ClientLogo =
  | { kind: "icon"; icon: IconType; color: string }
  | { kind: "image"; src: string; width: number; height: number };

export type Client = {
  key: string;
  name: string;
  /** Shown under the name, e.g. who the work was delivered through. */
  via?: string;
  country: Country;
  logo: ClientLogo;
  /** Only live, verified URLs. */
  href?: string;
};

/** The client wall, in the order it reads: four columns, three rows. */
export const CLIENTS: Client[] = [
  {
    key: "samsung",
    name: "Samsung",
    via: "Imagiq",
    country: "CO",
    logo: { kind: "icon", icon: SiSamsung, color: "#1428A0" },
    href: "https://www.imagiq.com/",
  },
  {
    key: "claro",
    name: "Claro",
    country: "CO",
    logo: { kind: "image", src: "/clients/claro.svg", width: 601, height: 218 },
    href: "https://www.claro.com.co/",
  },
  {
    key: "coca-cola",
    name: "Coca-Cola",
    country: "CO",
    logo: { kind: "icon", icon: SiCocacola, color: "#F40009" },
    href: "https://www.coca-cola.com/co/es",
  },
  {
    key: "griver",
    name: "Griver",
    country: "MX",
    logo: { kind: "image", src: "/clients/griver.webp", width: 400, height: 144 },
  },
  {
    key: "ezdocuai",
    name: "EZDocuAI",
    country: "US",
    logo: { kind: "image", src: "/clients/ezdocuai.webp", width: 240, height: 235 },
    href: "https://www.ezdocu.ai/",
  },
  {
    key: "ezmig",
    name: "EZMig",
    country: "US",
    logo: { kind: "image", src: "/clients/ezmig.webp", width: 320, height: 151 },
  },
  {
    key: "piebald",
    name: "Piebald Capital",
    country: "US",
    logo: { kind: "image", src: "/clients/piebald.svg", width: 1790, height: 1234 },
    href: "https://www.piebaldcapital.com/",
  },
  {
    key: "minnesota",
    name: "Minnesota",
    country: "US",
    logo: { kind: "image", src: "/clients/minnesota.webp", width: 177, height: 240 },
    href: "https://www.minnesotaent.net/",
  },
  {
    key: "lenspr",
    name: "LensPR",
    country: "CO",
    logo: { kind: "image", src: "/clients/lenspr.svg", width: 1060, height: 1276 },
    href: "https://www.lenspr.com/es",
  },
  {
    key: "attosound",
    name: "Attosound",
    country: "US",
    logo: { kind: "image", src: "/clients/attosound.webp", width: 240, height: 238 },
    href: "https://www.attosound.com/",
  },
  {
    key: "futtem",
    name: "FUTTEM",
    country: "CO",
    logo: { kind: "image", src: "/clients/futtem.png", width: 900, height: 159 },
    href: "https://www.futtem.com/",
  },
  {
    key: "accesify",
    name: "Accesify",
    country: "CO",
    logo: { kind: "image", src: "/clients/accesify.webp", width: 419, height: 240 },
    href: "https://www.accesify.com/",
  },
];
