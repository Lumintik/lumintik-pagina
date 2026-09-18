import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Clients } from "@/components/home/Clients";
import { Cases } from "@/components/home/Cases";
import { MoreProjects } from "@/components/home/MoreProjects";
import { Practices } from "@/components/home/Practices";
import { Services } from "@/components/home/Services";
import { GovernmentTeaser } from "@/components/home/GovernmentTeaser";
import { Contact } from "@/components/home/Contact";
import { fromSegment } from "@/lib/locale";

/**
 * Dark and light bands alternate from top to bottom: hero (dark), figures,
 * clients, six cases, more projects, practices, services, public sector,
 * contact, and the dark footer.
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: segment } = await params;
  const locale = fromSegment(segment);
  if (!locale) notFound();

  return (
    <>
      <Hero locale={locale} />
      <Stats locale={locale} />
      <Clients locale={locale} />
      <Cases locale={locale} />
      <MoreProjects locale={locale} />
      <Practices locale={locale} />
      <Services locale={locale} />
      <GovernmentTeaser locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
