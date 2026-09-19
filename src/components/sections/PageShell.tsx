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
};

/**
 * The frame every inner page shares: the bar, the dark opening with the
 * title, the white content, the contact form and the footer reveal.
 */
export function PageShell({ eyebrow, title, titleAccent, intro, children, contact = true }: PageShellProps) {
  return (
    <div className="relative flex flex-col items-center bg-white min-h-screen">
      <Navbar />

      <main className="relative w-full flex flex-col items-center">
        <header
          className="relative w-full flex justify-center px-5 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #0f172a 45%, #1e3a8a 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-blue-300">{eyebrow}</p>
            <h1 className="mt-4 text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] max-w-[18ch]">
              {title} <span className="italic text-blue-300">{titleAccent}</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-2xl leading-relaxed max-w-[60ch]">{intro}</p>
          </div>
        </header>

        {/* z-[2] keeps the content above the footer wrapper, which is pulled up by 100vh. */}
        <div className="relative z-[2] w-full bg-white flex flex-col items-center">
          {children}
          {contact ? (
            <div className="w-full mt-8 md:mt-12">
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
            "linear-gradient(180deg, #ffffff 0%, #93c5fd 12%, #3b82f6 26%, #1e3a8a 42%, #0f172a 65%, #0a0a0a 100%)",
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
