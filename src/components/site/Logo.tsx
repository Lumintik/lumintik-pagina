import Image from "next/image";
import type { Tone } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * The Lumintik lockup in one flat colour: white on dark backgrounds, black on
 * light ones. The blue gradient original stays in /public for other uses.
 */
export function Logo({
  tone,
  priority,
  className,
}: {
  tone: Tone;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={tone === "dark" ? "/brand/lumintik-lockup-white.png" : "/brand/lumintik-lockup-black.png"}
      alt="Lumintik"
      width={1640}
      height={400}
      priority={priority}
      sizes="160px"
      className={cn("h-8 w-auto", className)}
    />
  );
}
