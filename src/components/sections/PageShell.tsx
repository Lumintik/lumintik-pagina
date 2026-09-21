"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactSection } from "@/components/sections/ContactSection";

export type PageShellProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  children: ReactNode;
  /** The contact form at the end; off for the contact page itself. */
  contact?: boolean;
  /** Black content area instead of white, for pages made of dark cards. */
  dark?: boolean;
};

/**
 * The frame every inner page shares: the bar, the dark opening with the
 * title, the white content, the contact form and the footer reveal.
 */
export function PageShell({ eyebrow, title, titleAccent, intro, children, contact = true, dark = false }: PageShellProps) {
  return (
    <div className={dark ? "relative flex flex-col items-center bg-black min-h-screen" : "relative flex flex-col items-center bg-white min-h-screen"}>
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        <header
          className="relative w-full flex justify-center px-5 pt-28 pb-10 md:px-12 md:pt-36 md:pb-14"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <p className="text-xs font-medium text-slate-400">{eyebrow}</p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              {title} <span className="italic text-slate-400">{titleAccent}</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-2xl leading-relaxed max-w-[60ch]">{intro}</p>
          </div>
        </header>

        {/* z-[2] keeps the content above the footer wrapper, which is pulled up by 100vh. */}
        <div className={dark ? "relative z-[2] w-full bg-black flex flex-col items-center" : "relative z-[2] w-full bg-white flex flex-col items-center"}>
          {children}
          {contact ? (
            <div className={dark ? "w-full mt-16 md:mt-24 bg-white" : "w-full mt-8 md:mt-12"}>
              <ContactSection />
            </div>
          ) : null}
        </div>
      </main>

      <div
        id="footer-wrap"
        className="relative w-full flex justify-center overflow-clip -mt-[100vh] md:-mt-[90vh] lg:-mt-[96vh] xl:-mt-[100vh] h-[200vh] md:h-[185vh] lg:h-[195vh] xl:h-[200vh]"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #d4d4d4 12%, #737373 26%, #262626 42%, #111111 65%, #0a0a0a 100%)",
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
