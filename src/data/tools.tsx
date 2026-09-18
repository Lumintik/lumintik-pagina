import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiCloudflare,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGooglecloud,
  SiGooglemaps,
  SiInstagram,
  SiLanggraph,
  SiMeta,
  SiNestjs,
  SiNextdotjs,
  SiOpenai,
  SiOpentelemetry,
  SiPostgresql,
  SiPosthog,
  SiRedis,
  SiSocketdotio,
  SiWhatsapp,
} from "react-icons/si";
import type { Locale } from "@/lib/locale";

type ToolLogo =
  | { kind: "icon"; icon: IconType; color: string }
  | { kind: "image"; src: string; width: number; height: number }
  /** A wordmark already spells the name, so the label is not repeated. */
  | { kind: "wordmark"; src: string; width: number; height: number }
  | { kind: "glyph"; node: ReactNode };

export type Tool = {
  name: string | Record<Locale, string>;
  logo: ToolLogo;
};

const languageModelGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const apiGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
  </svg>
);

export const TOOLS = {
  gcp: { name: "Google Cloud", logo: { kind: "icon", icon: SiGooglecloud, color: "#4285F4" } },
  aws: { name: "AWS", logo: { kind: "icon", icon: FaAws, color: "#FF9900" } },
  awsGpu: { name: "AWS GPU", logo: { kind: "icon", icon: FaAws, color: "#FF9900" } },
  nextjs: { name: "Next.js", logo: { kind: "icon", icon: SiNextdotjs, color: "#000000" } },
  nestjs: { name: "NestJS", logo: { kind: "icon", icon: SiNestjs, color: "#E0234E" } },
  posthog: { name: "PostHog", logo: { kind: "icon", icon: SiPosthog, color: "#000000" } },
  distanceMatrix: {
    name: "Google Distance Matrix",
    logo: { kind: "icon", icon: SiGooglemaps, color: "#4285F4" },
  },
  redis: { name: "Redis", logo: { kind: "icon", icon: SiRedis, color: "#DC382D" } },
  postgresql: { name: "PostgreSQL", logo: { kind: "icon", icon: SiPostgresql, color: "#4169E1" } },
  languageModels: {
    name: { ES: "Modelos de lenguaje", EN: "Language models" },
    logo: { kind: "glyph", node: languageModelGlyph },
  },
  uscis: {
    name: { ES: "API oficial de USCIS", EN: "Official USCIS API" },
    logo: { kind: "glyph", node: apiGlyph },
  },
  flutter: { name: "Flutter", logo: { kind: "icon", icon: SiFlutter, color: "#02569B" } },
  socketio: { name: "Socket.IO", logo: { kind: "icon", icon: SiSocketdotio, color: "#010101" } },
  firebase: { name: "Firebase", logo: { kind: "icon", icon: SiFirebase, color: "#DD2C00" } },
  opentelemetry: {
    name: "OpenTelemetry",
    logo: { kind: "icon", icon: SiOpentelemetry, color: "#F5A800" },
  },
  vanta: { name: "Vanta", logo: { kind: "wordmark", src: "/tools/vanta.svg", width: 159, height: 39 } },
  vllm: { name: "vLLM", logo: { kind: "image", src: "/tools/vllm.png", width: 96, height: 96 } },
  qwen: { name: "Qwen 2.5", logo: { kind: "image", src: "/tools/qwen.png", width: 96, height: 96 } },
  docker: { name: "Docker", logo: { kind: "icon", icon: SiDocker, color: "#2496ED" } },
  cloudflareTunnel: {
    name: "Cloudflare Tunnel",
    logo: { kind: "icon", icon: SiCloudflare, color: "#F38020" },
  },
  openai: { name: "OpenAI", logo: { kind: "icon", icon: SiOpenai, color: "#000000" } },
  langgraph: { name: "LangGraph", logo: { kind: "icon", icon: SiLanggraph, color: "#1C3C3C" } },
  whatsappBusiness: {
    name: "WhatsApp Business API",
    logo: { kind: "icon", icon: SiWhatsapp, color: "#25D366" },
  },
  instagram: { name: "Instagram", logo: { kind: "icon", icon: SiInstagram, color: "#E4405F" } },
  metaGraphApi: { name: "Meta Graph API", logo: { kind: "icon", icon: SiMeta, color: "#0866FF" } },
} satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOLS;

export function toolName(tool: Tool, locale: Locale): string {
  return typeof tool.name === "string" ? tool.name : tool.name[locale];
}
