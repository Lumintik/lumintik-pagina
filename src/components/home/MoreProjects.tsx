import Image from "next/image";
import { ArrowUpRight, Section } from "@/components/ui/primitives";
import { MORE_PROJECTS } from "@/data/cases";
import type { Locale } from "@/lib/locale";
import { site } from "@/i18n/site";

export function MoreProjects({ locale }: { locale: Locale }) {
  const t = site[locale].more;
  return (
    <Section tone="light" id="more-projects" labelledBy="more-title">
      <p className="pill">{t.pill}</p>
      <h2 id="more-title" className="heading mt-6 max-w-[18ch] text-4xl md:text-6xl">
        {t.title}
      </h2>
      <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2">
        {MORE_PROJECTS.map((p) => {
          const body = (
            <>
              <span className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-xl bg-white md:w-36">
                <Image
                  src={p.image.src}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </span>
              <span className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-2 text-lg font-semibold">
                  {p.name}
                  {p.href ? (
                    <>
                      <ArrowUpRight />
                      <span className="sr-only">, {t.visit}</span>
                    </>
                  ) : null}
                </span>
                <span className="text-base leading-relaxed">{p.desc[locale]}</span>
              </span>
            </>
          );
          return (
            <li key={p.key}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5"
                >
                  {body}
                </a>
              ) : (
                <div className="flex items-start gap-5">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
