"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/sections/CaseParts";
import { MORE_PROJECTS } from "@/data/cases";
import { useLocale, useT } from "@/components/providers/LocaleProvider";

/** The projects that do not have a case study of their own, in a compact list. */
export function MoreProjects() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <section className="border-t border-slate-200 pt-10 md:pt-14">
      <h3 className="text-slate-900 text-3xl md:text-4xl font-semibold tracking-tight">
        {t.moreProjects.title}{" "}
        <span className="italic text-blue-500">{t.moreProjects.titleAccent}</span>
      </h3>

      <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {MORE_PROJECTS.map((p) => {
          const body = (
            <>
              <span className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 md:w-36">
                <Image src={p.image.src} alt="" fill sizes="144px" className="object-cover object-top" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-2 text-slate-900 text-lg font-semibold">
                  {p.name}
                  {p.href ? (
                    <>
                      <ArrowUpRight className="text-blue-500" />
                      <span className="sr-only">, {t.moreProjects.visit}</span>
                    </>
                  ) : null}
                </span>
                <span className="text-slate-500 leading-relaxed">{p.desc[locale]}</span>
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
                  className="group flex items-start gap-5 transition-opacity hover:opacity-80"
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
    </section>
  );
}
