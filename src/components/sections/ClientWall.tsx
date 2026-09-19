"use client";

import Image from "next/image";
import { CLIENTS, type Client } from "@/data/clients";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

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
  return (
    <section aria-label={t.buildingFor.aria} className="relative w-full z-[2] px-6 md:px-12 xl:px-20 pb-14 md:pb-20">
      <ul className="mx-auto grid w-full max-w-[1600px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-white/10 rounded-2xl overflow-hidden">
        {CLIENTS.map((client) => {
          const cell = "flex h-24 md:h-28 w-full items-center justify-center px-6 opacity-80 transition-opacity duration-300 hover:opacity-100";
          return (
            <li key={client.key} className="border border-white/10 -m-px">
              {client.href ? (
                <a href={client.href} target="_blank" rel="noopener noreferrer" className={cell}>
                  <Mark client={client} />
                </a>
              ) : (
                <div className={cell}>
                  <Mark client={client} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
