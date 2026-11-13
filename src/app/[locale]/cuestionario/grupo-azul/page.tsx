import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import { Cuestionario } from "@/components/cuestionario/Cuestionario";
import { fromSegment } from "@/lib/locale";

/** Como la página de pagos, el cuestionario va en Poppins de punta a punta. */
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Cuestionario de marca Grupo Azul Energy",
  description: "Diez preguntas para construir la marca de Grupo Azul Energy con Lumintik.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    siteName: "Lumintik",
    title: "Cuestionario de marca Grupo Azul Energy",
    description: "Diez preguntas para construir la marca de Grupo Azul Energy con Lumintik.",
  },
};

export default async function Page({ params }: PageProps<"/[locale]/cuestionario/grupo-azul">) {
  const { locale: segment } = await params;
  // El cuestionario es para un cliente que habla español
  if (fromSegment(segment) !== "ES") notFound();
  return (
    <div className={poppins.className}>
      <Cuestionario />
    </div>
  );
}
