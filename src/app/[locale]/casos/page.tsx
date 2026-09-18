import { permanentRedirect } from "next/navigation";
import { fromSegment, toSegment } from "@/lib/locale";

/** The case studies live in the work section of the home page. */
export default async function CasesIndex({ params }: PageProps<"/[locale]/casos">) {
  const locale = fromSegment((await params).locale) ?? "ES";
  permanentRedirect(`/${toSegment(locale)}#work`);
}
