import Image from "next/image";
import Link from "next/link";
import { Contact } from "@/components/home/Contact";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowRight, Section } from "@/components/ui/primitives";
import { videoPoster, type ServiceMeta } from "@/data/services";
import type { ServiceContent } from "@/i18n/serviceDetails";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

export type ServiceDetailProps = {
  locale: Locale;
  service: ServiceMeta;
  content: ServiceContent;
  next?: { title: string; href: string };
};

export function ServiceDetail({ locale, service, content, next }: ServiceDetailProps) {
  const t = site[locale];
  const item = t.services.items[service.key];
  const d = t.serviceDetail;
  const { media } = service;

  return (
    <>
      <section data-tone="dark" aria-labelledby="service-title" className="w-full px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-[1200px]">
          <Link href={href(locale, paths.home, "services")} className="flex w-fit items-center gap-2 text-base hover:underline underline-offset-4">
            <ArrowRight className="rotate-180" />
            {d.back}
          </Link>
          <p className="pill mt-10">{t.services.pill}</p>
          <h1 id="service-title" className="display mt-6 max-w-[16ch] text-5xl md:text-7xl">
            {item.title}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed md:text-2xl">{item.desc}</p>
          <TrackedLink
            href={href(locale, paths.home, "contact")}
            event="start_project_clicked"
            properties={{ location: "service", service: service.slug }}
            className="btn btn-primary mt-10"
          >
            {t.nav.startProject}
            <ArrowRight />
          </TrackedLink>
        </div>
      </section>

      <Section tone="light" labelledBy="overview-title">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white">
          {media.kind === "video" ? (
            <video
              src={media.src}
              poster={videoPoster(media.src, 1600)}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="size-full object-cover grayscale"
            />
          ) : (
            <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1240px) 1200px, 100vw" className="object-cover object-top" />
          )}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-10">
          <h2 id="overview-title" className="heading text-3xl md:text-5xl">{d.overview}</h2>
          <p className="text-lg leading-relaxed md:text-xl">{content.overview}</p>
        </div>
      </Section>

      <Section tone="dark" labelledBy="capabilities-title">
        <h2 id="capabilities-title" className="heading text-3xl md:text-5xl">{d.capabilities}</h2>
        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((c) => (
            <li key={c.title}>
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-base leading-relaxed md:text-lg">{c.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" labelledBy="process-title">
        <h2 id="process-title" className="heading text-3xl md:text-5xl">{d.process}</h2>
        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {content.process.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--soft)] text-base font-medium">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed md:text-lg">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark" labelledBy="deliverables-title">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          <div>
            <h2 id="deliverables-title" className="heading text-3xl md:text-5xl">{d.deliverables}</h2>
            <ul className="mt-10 flex flex-col gap-4">
              {content.deliverables.map((x) => (
                <li key={x} className="flex items-start gap-3 text-base md:text-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-1 shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-12">
            <p className="heading text-2xl md:text-4xl">{content.outcome}</p>
            {next ? (
              <Link href={next.href} className="group inline-flex flex-col gap-2">
                <span className="text-base">{d.next}</span>
                <span className="heading inline-flex items-center gap-3 text-2xl md:text-4xl">
                  {next.title}
                  <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </Section>

      <Contact locale={locale} />
    </>
  );
}
