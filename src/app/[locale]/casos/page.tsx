import { permanentRedirect } from "next/navigation";
import { fromSegment } from "@/lib/locale";
import { href, paths } from "@/lib/routes";

/** The case studies live on the home page; this address points there. */
export default async function CasesIndex({ params }: PageProps<"/[locale]/casos">) {
  const locale = fromSegment((await params).locale) ?? "ES";
  permanentRedirect(href(locale, paths.home, "cases"));
}
