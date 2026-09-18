import Image from "next/image";
import { Pending } from "@/components/ui/primitives";
import type { CaseImage, CaseStudy } from "@/data/cases";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";
import { fill, site } from "@/i18n/site";

export function caseTitle(study: CaseStudy, locale: Locale) {
  return fill(site[locale].cases.caseTitle, { client: study.copy[locale].client });
}

/** The three blocks every case has. Missing facts show a pending marker. */
export function CaseBlocks({
  study,
  locale,
  headingLevel = "h3",
  large,
}: {
  study: CaseStudy;
  locale: Locale;
  headingLevel?: "h2" | "h3";
  large?: boolean;
}) {
  const t = site[locale].cases;
  const copy = study.copy[locale];
  const blocks = [
    { label: t.problem, text: copy.problem },
    { label: t.solution, text: copy.solution },
    { label: t.why, text: copy.why },
  ];
  const Heading = headingLevel;
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
      {blocks.map((b) => (
        <div key={b.label}>
          <Heading className={cn("font-semibold", large ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
            {b.label}
          </Heading>
          <p className={cn("mt-3 leading-relaxed", large ? "text-lg md:text-xl" : "text-base md:text-lg")}>
            {b.text ?? <Pending />}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Project image, or a visible placeholder when the photos are still missing. */
export function CaseCover({
  study,
  locale,
  priority,
  sizes = "(min-width: 1240px) 1200px, 100vw",
}: {
  study: CaseStudy;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
}) {
  const cover = study.images[0];
  if (!cover) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--fg)] p-6 text-center">
        <span className="text-lg font-semibold">{site[locale].cases.pendingImages}</span>
        <Pending>{study.imagesPending?.[locale]}</Pending>
      </div>
    );
  }
  return <CaseFrame image={cover} locale={locale} priority={priority} sizes={sizes} />;
}

export function CaseFrame({
  image,
  locale,
  priority,
  sizes,
  className,
}: {
  image: CaseImage;
  locale: Locale;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const tall = image.height > image.width;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-white",
        tall ? "aspect-[4/5]" : "aspect-[16/9]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt[locale]}
        fill
        priority={priority}
        sizes={sizes}
        className={tall ? "object-contain" : "object-cover object-top"}
      />
    </div>
  );
}
