import Image from "next/image";
import { Flag, Section } from "@/components/ui/primitives";
import { CLIENTS, type Client } from "@/data/clients";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";
import { site } from "@/i18n/site";

/** Wide wordmarks get less height than square marks so they read at a similar size. */
function heightClass(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 3) return "h-7 md:h-9";
  if (ratio > 1.6) return "h-10 md:h-12";
  return "h-14 md:h-16";
}

function ClientLogo({ client }: { client: Client }) {
  const { logo, name } = client;
  if (logo.kind === "icon") {
    return (
      <logo.icon
        role="img"
        aria-label={name}
        className="h-auto w-[60%] max-w-[180px]"
        style={{ color: logo.color }}
      />
    );
  }
  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      sizes="200px"
      className={cn("w-auto max-w-[75%] object-contain", heightClass(logo.width, logo.height))}
    />
  );
}

export function Clients({ locale }: { locale: Locale }) {
  const t = site[locale];
  return (
    <Section tone="dark" id="clients" labelledBy="clients-title">
      <p className="pill">{t.clients.pill}</p>
      <h2 id="clients-title" className="heading mt-6 max-w-[18ch] text-4xl md:text-6xl">
        {t.clients.title}
      </h2>
      <ul className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
        {CLIENTS.map((client) => {
          const card = (
            <>
              <span className="flex flex-1 items-center justify-center">
                <ClientLogo client={client} />
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Flag country={client.country} />
                <span className="sr-only">{t.countries[client.country]}: </span>
                <span>
                  {client.name}
                  {client.via ? ` ${t.clients.via} ${client.via}` : ""}
                </span>
              </span>
            </>
          );
          const className =
            "flex aspect-[4/3] flex-col rounded-2xl bg-white p-4 text-black md:p-5";
          return (
            <li key={client.key}>
              {client.href ? (
                <a
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(className, "transition-transform duration-300 hover:-translate-y-0.5")}
                >
                  {card}
                </a>
              ) : (
                <div className={className}>{card}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
