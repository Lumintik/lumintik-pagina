import type { Messages, ServiceGroup } from "@/i18n/messages";

export type ServiceKey = keyof Messages["services"]["items"];

export type ServiceMeta = {
  key: ServiceKey;
  /** URL segment for the service detail page. */
  slug: string;
  videoSrc: string;
  /** A still frame of the video, for the menu and as the poster. */
  posterSrc: string;
  group: ServiceGroup;
};

export const services: ServiceMeta[] = [
  {
    key: "productDevelopment",
    group: "product",
    slug: "product-development",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777947436/kling_20260425_%E4%BD%9C%E5%93%81_The_phone__3050_0_eqmcsa.mp4",
    posterSrc: "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777947436/kling_20260425_%E4%BD%9C%E5%93%81_The_phone__3050_0_eqmcsa.jpg",
  },
  {
    key: "uxui",
    group: "product",
    slug: "ux-ui-design",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/Web_design_xewguf.mp4",
    posterSrc: "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/Web_design_xewguf.jpg",
  },
  {
    key: "webEngineering",
    group: "engineering",
    slug: "web-engineering",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/development_vzjgen.mp4",
    posterSrc: "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/development_vzjgen.jpg",
  },
  {
    key: "appliedAI",
    group: "ai",
    slug: "applied-ai",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/brand_dkfgzs.mp4",
    posterSrc: "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/brand_dkfgzs.jpg",
  },
  {
    key: "performanceSEO",
    group: "growth",
    slug: "performance-seo",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/motion_graphics_dojqoq.mp4",
    posterSrc: "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/motion_graphics_dojqoq.jpg",
  },
  {
    key: "brandMotion",
    group: "product",
    slug: "brand-motion",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/branding_qpacwd.mp4",
    posterSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/branding_qpacwd.jpg",
  },
  {
    key: "platformInfra",
    group: "engineering",
    slug: "platform-infrastructure",
    videoSrc: "https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4",
    posterSrc: "https://images.pexels.com/videos/3129671/free-video-3129671.jpg",
  },
];

export function findServiceBySlug(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}
