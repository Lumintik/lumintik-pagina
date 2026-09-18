"use client";

import { SiSamsung, SiCocacola } from "react-icons/si";
import { LogoLoop, type LogoLoopItem } from "@/components/effects/LogoLoop";
import { useT } from "@/components/providers/LocaleProvider";

const BRAND_LOGOS: LogoLoopItem[] = [
  {
    src: "/logos/claro.svg",
    alt: "Claro",
    title: "Claro",
    href: "https://www.claro.com.co/",
  },
  {
    node: <SiSamsung />,
    title: "Samsung",
    href: "https://imagiq.com",
  },
  {
    node: <SiCocacola />,
    title: "Coca-Cola",
    href: "https://www.coca-cola.com/",
  },
];

export function BuildingFor() {
  const t = useT();
  return (
    <section
      id="clients"
      className="relative w-full px-5 md:px-12 pt-2 pb-8 md:pt-4 md:pb-12 z-[2]"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-slate-900 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            {t.buildingFor.title}{" "}
            <span className="italic text-blue-500">{t.buildingFor.titleAccent}</span>
          </h2>
        </div>

        <div
          className="relative overflow-hidden text-slate-500"
          style={{ height: 140 }}
        >
          <LogoLoop
            logos={BRAND_LOGOS}
            speed={40}
            direction="left"
            logoHeight={96}
            gap={160}
            hoverSpeed={15}
            scaleOnHover
            ariaLabel={t.buildingFor.aria}
          />
        </div>
      </div>
    </section>
  );
}
