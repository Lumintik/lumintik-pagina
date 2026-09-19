"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  title: string;
  description: string;
  group: string;
  href: string;
  videoSrc: string;
  posterSrc?: string;
  cta: string;
};

/** A text card; its video fades in behind the text while the pointer is on it. */
export function ServiceTile({ title, description, group, href, videoSrc, posterSrc, cta }: Props) {
  const [hover, setHover] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const enter = () => {
    setHover(true);
    video.current?.play().catch(() => {});
  };
  const leave = () => {
    setHover(false);
    video.current?.pause();
  };

  return (
    <Link
      href={href}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      className="group relative flex h-full min-h-[260px] md:min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-slate-50 p-6 md:p-8 transition-colors duration-500"
    >
      {/* The media, only while hovered */}
      <video
        ref={video}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`}
      />
      <span className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20 transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />

      <span className={`relative text-xs font-medium transition-colors duration-500 ${hover ? "text-blue-200" : "text-blue-600"}`}>{group}</span>
      <span className="relative">
        <span className={`block text-2xl md:text-3xl font-semibold leading-tight transition-colors duration-500 ${hover ? "text-white" : "text-slate-900"}`}>
          {title}
        </span>
        <span className={`mt-3 block text-base leading-relaxed transition-colors duration-500 ${hover ? "text-slate-200" : "text-slate-500"}`}>
          {description}
        </span>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${hover ? "text-white" : "text-slate-900"}`}>
          {cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
