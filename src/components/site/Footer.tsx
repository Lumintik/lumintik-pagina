import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Pending } from "@/components/ui/primitives";
import { COMPANY } from "@/data/company";
import type { Locale } from "@/lib/locale";
import { href, paths } from "@/lib/routes";
import { site } from "@/i18n/site";

export function Footer({ locale }: { locale: Locale }) {
  const t = site[locale];
  const f = t.footer;

  const siteLinks = [
    { label: t.nav.cases, href: href(locale, paths.home, "cases") },
    { label: t.nav.services, href: href(locale, paths.home, "services") },
    { label: t.nav.government, href: href(locale, paths.government) },
    { label: t.nav.contact, href: href(locale, paths.home, "contact") },
    { label: f.privacy, href: href(locale, paths.privacy) },
  ];

  return (
    <footer data-tone="dark" className="w-full px-5 pb-12 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-5">
          <Logo tone="dark" />
          <p className="max-w-[28ch] text-base leading-relaxed">{f.tagline}</p>
        </div>

        <nav aria-label={f.site}>
          <h2 className="text-base font-semibold">{f.site}</h2>
          <ul className="mt-5 flex flex-col gap-3 text-base">
            {siteLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-semibold">{f.contact}</h2>
          <dl className="mt-5 flex flex-col gap-3 text-base">
            <div>
              <dt className="sr-only">{f.email}</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`} className="hover:underline underline-offset-4">
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline">{f.whatsapp}: </dt>
              <dd className="inline">
                {COMPANY.whatsapp ? (
                  <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                    {COMPANY.whatsapp.replace("https://wa.me/", "+")}
                  </a>
                ) : (
                  <Pending />
                )}
              </dd>
            </div>
            <div>
              <dt className="inline">{f.linkedin}: </dt>
              <dd className="inline">
                {COMPANY.linkedin ? (
                  <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                    Lumintik
                  </a>
                ) : (
                  <Pending />
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-base font-semibold">{f.company}</h2>
          <dl className="mt-5 flex flex-col gap-3 text-base">
            <div>
              <dt className="sr-only">{f.legalName}</dt>
              <dd>{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="inline">{f.nit} </dt>
              <dd className="inline">{COMPANY.nit}</dd>
            </div>
            <div>
              <dt className="sr-only">{f.address}</dt>
              <dd>
                <address className="not-italic">
                  {COMPANY.address.street}
                  <br />
                  {COMPANY.address.city}, {COMPANY.address.country}
                </address>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mx-auto mt-20 w-full max-w-[1200px] text-sm">
        © {new Date().getFullYear()} {COMPANY.legalName}. {f.rights}
      </p>
    </footer>
  );
}
