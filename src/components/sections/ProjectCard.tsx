"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useT } from "@/components/providers/LocaleProvider";

export type ProjectCardProps = {
  /** Null when the project has no photo yet: the card says so instead. */
  image: { src: string; alt: string } | null;
  title: string;
  desc: string;
  /** Case studies point at their own page; the rest at the live site. */
  href: string;
  external?: boolean;
  badge?: boolean;
  large?: boolean;
};

/**
 * A project in the work grid. Case studies open their own page, where the
 * problem, the solution, why it worked and the tools live.
 */
export function ProjectCard({
  image,
  title,
  desc,
  href,
  external = false,
  badge = false,
  large = false,
}: Readonly<ProjectCardProps>) {
  const t = useT();

  const body = (
    <>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200",
          large ? "h-[440px] md:h-[624px]" : "h-[320px] md:h-[440px]",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              large
                ? "(min-width: 1536px) 1536px, (min-width: 768px) min(92vw, 1440px), 100vw"
                : "(min-width: 768px) min(46vw, 720px), 100vw"
            }
            quality={large ? 85 : 80}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-slate-500">
            {t.cases.pendingImages}
          </span>
        )}

        {badge && (
          <span className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-slate-900 text-xs font-medium z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {t.projects.badge.live}
          </span>
        )}

        <div className="absolute bottom-7 left-7 w-8 h-12 rounded-[625%_416.667%] bg-white/30 backdrop-blur-sm rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 z-10">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-900 -rotate-45"
            aria-hidden
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1">
        <h3 className="text-slate-900 text-2xl font-semibold leading-[33.6px]">{title}</h3>
        <p className="text-slate-500 text-xl md:text-2xl leading-[33.6px]">{desc}</p>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block w-full">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block w-full">
      {body}
    </Link>
  );
}
