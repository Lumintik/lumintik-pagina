import type { Site } from "@/i18n/site";

export type ServiceKey = keyof Site["services"]["items"];

type Media =
  /** Cloudinary video; the poster is derived from the same asset. */
  | { kind: "video"; src: string }
  /** Our own still, from a project in /public. */
  | { kind: "image"; src: string; width: number; height: number; alt: string };

export type ServiceMeta = {
  key: ServiceKey;
  /** URL segment for the service detail page. */
  slug: string;
  media: Media;
};

export const services: ServiceMeta[] = [
  {
    key: "productDevelopment",
    slug: "product-development",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777947436/kling_20260425_%E4%BD%9C%E5%93%81_The_phone__3050_0_eqmcsa.mp4",
    },
  },
  {
    key: "uxui",
    slug: "ux-ui-design",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/Web_design_xewguf.mp4",
    },
  },
  {
    key: "webEngineering",
    slug: "web-engineering",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/development_vzjgen.mp4",
    },
  },
  {
    key: "appliedAI",
    slug: "applied-ai",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/brand_dkfgzs.mp4",
    },
  },
  {
    key: "performanceSEO",
    slug: "performance-seo",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/motion_graphics_dojqoq.mp4",
    },
  },
  {
    key: "brandMotion",
    slug: "brand-motion",
    media: {
      kind: "video",
      src: "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/branding_qpacwd.mp4",
    },
  },
  {
    key: "platformInfra",
    slug: "platform-infrastructure",
    // Replaces a Pexels stock clip: the operations dashboard we built for Imagiq.
    media: {
      kind: "image",
      src: "/projects/samsung/dashboard-orders.png",
      width: 1200,
      height: 1227,
      alt: "Imagiq orders dashboard",
    },
  },
];

export function findServiceBySlug(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Still frame of a Cloudinary video, sized and in black and white: the site
 * keeps color for client logos, tools and project photos only.
 */
export function videoPoster(src: string, width: number): string {
  return src
    .replace("/video/upload/", `/video/upload/so_2,e_grayscale,f_auto,q_auto,w_${width}/`)
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}
