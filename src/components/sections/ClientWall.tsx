"use client";

import Image from "next/image";
import { CLIENTS, type Client } from "@/data/clients";
import Link from "next/link";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { href, paths } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Flag } from "@/components/ui/Flag";
import { NoiseBackground } from "@/components/ui/noise-background";

/** Every mark is forced to white so the wall reads as one set. */
function Mark({ client }: { client: Client }) {
  const { logo, name } = client;
  if (logo.kind === "icon") {
    // These wordmarks sit inside a square icon box, so they are sized by width.
    return <logo.icon role="img" aria-label={name} className="w-[120px] h-auto text-white md:w-[140px]" />;
  }
  // Wide wordmarks get less height than square marks so they read at a similar size.
  const ratio = logo.width / logo.height;
  const height = ratio > 3 ? "h-5 md:h-6" : ratio > 1.6 ? "h-8 md:h-9" : "h-11 md:h-12";
  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      sizes="160px"
      className={cn("w-auto max-w-[140px] object-contain", logo.mono ? "" : "[filter:brightness(0)_invert(1)]", height)}
    />
  );
}

/** A still grid of client logos, cells divided by thin lines, right under the hero. */
export function ClientWall() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <section aria-label={t.buildingFor.aria} className="relative w-full z-[3]">
      <div className="px-6 md:px-12 xl:px-20">
        {/* The bottom of the wall fades out, as if it went on. */}
        <ul className="mx-auto grid w-full max-w-[1600px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-white/10 rounded-t-2xl overflow-hidden [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)]">
          {CLIENTS.map((client) => {
            const cell = "relative flex h-24 md:h-28 w-full items-center justify-center px-6 opacity-80 transition-opacity duration-300 hover:opacity-100";
            const inner = (
              <>
                <Mark client={client} />
                {/* The country, bottom left */}
                <span className="absolute left-3 bottom-3 flex size-5 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 p-[3px]">
                  <Flag country={client.country} className="size-full" />
                </span>
              </>
            );
            return (
              <li key={client.key} className="border border-white/10 -m-px">
                {client.href ? (
                  <a href={client.href} target="_blank" rel="noopener noreferrer" className={cell}>
                    {inner}
                  </a>
                ) : (
                  <div className={cell}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Blue turns to white over a long gradient; a light blur sits where the wall dissolves. */}
      <div className="relative -mt-16 h-64 w-full [background:linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.75)_75%,#ffffff_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,transparent,black_60%,transparent)]" />
        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <NoiseBackground
            containerClassName="w-fit rounded-full p-1.5"
            gradientColors={["rgb(147, 197, 253)", "rgb(59, 130, 246)", "rgb(255, 255, 255)"]}
            noiseIntensity={0.25}
          >
            <Link
              href={href(locale, paths.projects)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-100 via-slate-100 to-white px-6 py-3 text-sm font-medium text-slate-900 shadow-[0px_2px_0px_0px_#ffffff_inset,0px_0.5px_1px_0px_#94a3b8] transition-all duration-100 active:scale-[0.98]"
            >
              {t.buildingFor.all}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </NoiseBackground>
        </div>
      </div>
    </section>
  );
}
