import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PENDING } from "@/data/company";
import type { Country } from "@/data/clients";
import { TOOLS, toolName, type ToolId } from "@/data/tools";
import type { Locale } from "@/lib/locale";

export type Tone = "dark" | "light";

/** One idea per section: a full width band in one of the two tones. */
export function Section({
  tone,
  id,
  labelledBy,
  className,
  children,
}: {
  tone: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cn("w-full px-5 py-24 md:px-10 md:py-32 lg:py-40", className)}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

/** Visible placeholder for a fact the team still has to confirm. */
export function Pending({ children }: { children?: ReactNode }) {
  return (
    <span className="pending">
      {PENDING}
      {children ? <> {children}</> : null}
    </span>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Country flag in a small circle. Decorative: the country name is given in text. */
export function Flag({ country, className }: { country: Country; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="size-full">
        {country === "CO" && (
          <>
            <rect width="20" height="10" fill="#FCD116" />
            <rect y="10" width="20" height="5" fill="#003893" />
            <rect y="15" width="20" height="5" fill="#CE1126" />
          </>
        )}
        {country === "MX" && (
          <>
            <rect width="7" height="20" fill="#006847" />
            <rect x="7" width="6" height="20" fill="#FFFFFF" />
            <rect x="13" width="7" height="20" fill="#CE1126" />
            <circle cx="10" cy="10" r="1.8" fill="#8C6A3F" />
          </>
        )}
        {country === "US" && (
          <>
            <rect width="20" height="20" fill="#FFFFFF" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} y={i * (20 / 6.5)} width="20" height={20 / 13} fill="#B22234" />
            ))}
            <rect width="9" height={(20 / 13) * 7} fill="#3C3B6E" />
          </>
        )}
      </svg>
    </span>
  );
}

/** A tool, as a light capsule with its own logo in its own colours. */
export function ToolPill({ id, locale }: { id: ToolId; locale: Locale }) {
  const tool = TOOLS[id];
  const name = toolName(tool, locale);
  const { logo } = tool;
  return (
    <li className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black">
      {logo.kind === "icon" && <logo.icon aria-hidden className="size-4 shrink-0" style={{ color: logo.color }} />}
      {logo.kind === "glyph" && <span className="size-4 shrink-0 text-black">{logo.node}</span>}
      {logo.kind === "image" && (
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="size-4 shrink-0 object-contain" />
      )}
      {logo.kind === "wordmark" ? (
        <Image src={logo.src} alt={name} width={logo.width} height={logo.height} className="h-3.5 w-auto" />
      ) : (
        <span>{name}</span>
      )}
    </li>
  );
}

export function ToolList({
  tools,
  locale,
  label,
}: {
  tools: ToolId[] | null;
  locale: Locale;
  label: string;
}) {
  if (!tools) {
    return (
      <p>
        <span className="sr-only">{label}: </span>
        <Pending />
      </p>
    );
  }
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tools.map((id) => (
        <ToolPill key={id} id={id} locale={locale} />
      ))}
    </ul>
  );
}
