"use client";

import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { COMPANY, COMPANY_DOCUMENTS } from "@/data/company";
import { href, paths } from "@/lib/routes";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Download = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 4v12M6 10l6 6 6-6M4 20h16" />
  </svg>
);

/** Structure, principles, policies, and the company's registry details with its documents. */
export function GovernancePage() {
  const t = useT();
  const { locale } = useLocale();
  const copy = t.pages.governance;
  const fields: { key: keyof typeof copy.companyFields; value: string }[] = [
    { key: "name", value: COMPANY.name },
    { key: "nit", value: COMPANY.nit },
    { key: "registry", value: COMPANY.registry[locale] },
    { key: "domicile", value: COMPANY.domicile },
    { key: "address", value: COMPANY.address },
    { key: "activity", value: COMPANY.activity[locale] },
  ];
  const docs: (keyof typeof COMPANY_DOCUMENTS)[] = ["certificate", "rut", "rub"];

  return (
    <PageShell eyebrow={t.nav.governance} title={copy.title} titleAccent={copy.titleAccent} intro={copy.intro}>
      <div className="mx-auto max-w-[1600px] w-full px-5 md:px-12 pt-16 md:pt-24 flex flex-col gap-16 md:gap-24">
        {/* Structure */}
        <section>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{copy.structureTitle}</h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.structure.map((p) => (
              <li key={p.name} className="rounded-3xl bg-slate-950 p-6 md:p-8 text-white">
                <p className="text-xs font-medium text-slate-400">{p.role}</p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold">{p.name}</p>
                <p className="mt-3 text-slate-300 text-base leading-relaxed">{p.scope}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{copy.principlesTitle}</h2>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy.principles.map((p, i) => (
              <li key={p.title} className="rounded-3xl bg-slate-50 p-6 md:p-8">
                <span className="flex size-8 items-center justify-center rounded-full border border-slate-900/30 text-sm font-medium text-slate-900">{i + 1}</span>
                <h3 className="mt-5 text-slate-900 text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 text-slate-600 text-base leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Policies */}
        <section>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{copy.policiesTitle}</h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.policies.map((p) => (
              <li key={p.title} className="flex flex-col rounded-3xl border border-slate-200 p-6 md:p-8">
                <h3 className="text-slate-900 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 flex-1 text-slate-600 text-base leading-relaxed">{p.desc}</p>
                <Link
                  href={href(locale, p.link === "ethics" ? paths.ethics : paths.contact)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-900 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  {p.link === "ethics" ? t.nav.ethics : t.nav.contact}
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Company details and documents */}
        <section id="datos" className="scroll-mt-28">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">{copy.companyTitle}</h2>
          <p className="mt-3 text-slate-500 text-base md:text-lg">{copy.companyIntro}</p>
          <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 rounded-3xl bg-slate-50 p-6 md:p-10">
            {fields.map((f) => (
              <div key={f.key}>
                <dt className="text-xs font-medium text-slate-500">{copy.companyFields[f.key]}</dt>
                <dd className="mt-1 text-slate-900 text-lg font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 text-slate-900 text-2xl md:text-3xl font-semibold">{copy.documentsTitle}</h3>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {docs.map((key) => (
              <li key={key} className="flex flex-col rounded-3xl bg-slate-950 p-6 md:p-8 text-white">
                <h4 className="text-xl font-semibold leading-snug">{copy.documents[key].title}</h4>
                <p className="mt-3 flex-1 text-slate-300 text-base leading-relaxed">{copy.documents[key].desc}</p>
                <a
                  href={COMPANY_DOCUMENTS[key]}
                  download
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
                >
                  {copy.download}
                  <Download />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
