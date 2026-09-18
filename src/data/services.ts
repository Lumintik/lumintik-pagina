import type { Messages } from "@/i18n/messages";

export type ServiceKey = keyof Messages["services"]["items"];

export type ServiceMeta = {
  key: ServiceKey;
  /** URL segment for the service detail page. */
  slug: string;
  videoSrc: string;
  posterSrc?: string;
  span: string;
};

export const services: ServiceMeta[] = [
  {
    key: "productDevelopment",
    slug: "product-development",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777947436/kling_20260425_%E4%BD%9C%E5%93%81_The_phone__3050_0_eqmcsa.mp4",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_4] md:col-start-[span_4] md:border-r",
  },
  {
    key: "uxui",
    slug: "ux-ui-design",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/Web_design_xewguf.mp4",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_8] md:col-start-[span_8] md:border-r",
  },
  {
    key: "webEngineering",
    slug: "web-engineering",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/development_vzjgen.mp4",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_4] md:col-start-[span_4] md:border-r",
  },
  {
    key: "appliedAI",
    slug: "applied-ai",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/brand_dkfgzs.mp4",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_5] md:col-start-[span_5] md:border-r",
  },
  {
    key: "performanceSEO",
    slug: "performance-seo",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/motion_graphics_dojqoq.mp4",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_3] md:col-start-[span_3] md:border-r",
  },
  {
    key: "brandMotion",
    slug: "brand-motion",
    videoSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/v1777897916/branding_qpacwd.mp4",
    posterSrc:
      "https://res.cloudinary.com/dgnqk0ucm/video/upload/so_3/v1777897916/branding_qpacwd.jpg",
    span:
      "col-end-[span_1] col-start-[span_1] border-r-0 border-b md:col-end-[span_7] md:col-start-[span_7] md:border-b-0 md:border-r",
  },
  {
    key: "platformInfra",
    slug: "platform-infrastructure",
    videoSrc: "https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4",
    posterSrc: "https://images.pexels.com/videos/3129671/free-video-3129671.jpg",
    span:
      "col-end-[span_4] col-start-[span_4] border-r md:col-end-[span_5] md:col-start-[span_5]",
  },
];

export function findServiceBySlug(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}
