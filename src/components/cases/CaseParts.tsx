import Image from "next/image";
import { ArrowUpRight, Pending } from "@/components/ui/primitives";
import type { CaseStudy, CaseImage } from "@/data/cases";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";
import { fill, site } from "@/i18n/site";

export function caseTitle(study: CaseStudy, locale: Locale) {
  return fill(site[locale].cases.caseTitle, { client: study.copy[locale].client });
}

/**
 * The case's public sites. A single site reads as the generic "Visitar el
 * sitio" button; more than one shows each site by its own name, since a
 * generic label would no longer say which is which.
 */
export function CaseLinks({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const t = site[locale].cases;
  if (!study.links.length) return null;
  return (
    <>
      {study.links.length === 1 ? (
        <a
          href={study.links[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          {t.visit}
          <span className="sr-only">: {study.links[0].label}</span>
          <ArrowUpRight />
        </a>
      ) : (
        study.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {link.label}
            <ArrowUpRight />
          </a>
        ))
      )}
    </>
  );
}

/** Official evidence for a case (e.g. a government certification), each item
 * linking to its source document. */
export function CaseCertification({
  certification,
  locale,
}: {
  certification: NonNullable<CaseStudy["certification"]>;
  locale: Locale;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold md:text-xl">{certification.label[locale]}</h3>
      <ul className="mt-4 flex flex-wrap gap-3">
        {certification.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-black"
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-[11px] font-semibold tracking-wide text-white"
              >
                PASS
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{item.title[locale]}</span>
                <span className="text-sm">{item.date[locale]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
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
