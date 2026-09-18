import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { privacy } from "@/i18n/privacy";
import { site } from "@/i18n/site";
import { fromSegment } from "@/lib/locale";
import { paths } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacidad">): Promise<Metadata> {
  const locale = fromSegment((await params).locale);
  if (!locale) return {};
  return pageMetadata({
    locale,
    path: paths.privacy,
    title: site[locale].meta.privacyTitle,
    description: privacy[locale].intro,
  });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacidad">) {
  const locale = fromSegment((await params).locale);
  if (!locale) notFound();
  const p = privacy[locale];

  return (
    <>
      <section data-tone="dark" aria-labelledby="privacy-title" className="w-full px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="pill">{p.pill}</p>
          <h1 id="privacy-title" className="display mt-6 max-w-[18ch] text-4xl md:text-6xl">
            {p.title}
          </h1>
          <p className="mt-6 text-lg">{p.updated}</p>
        </div>
      </section>

      <section data-tone="light" className="w-full px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-[760px]">
          <p className="text-lg leading-relaxed md:text-xl">{p.intro}</p>
          {p.sections.map((s) => (
            <div key={s.title} className="mt-14">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{s.title}</h2>
              {s.paragraphs.map((para) => (
                <p key={para} className="mt-4 text-base leading-relaxed md:text-lg">
                  {para}
                </p>
              ))}
              {s.list ? (
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-relaxed md:text-lg">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
