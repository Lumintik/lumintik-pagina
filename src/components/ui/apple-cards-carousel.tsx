"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useOutsideClick } from "@/hooks/use-outside-click";

/*
 * Adapted from Aceternity's "Apple cards carousel": a row of tall cards you
 * scroll sideways; each opens as a sheet over the page.
 */

type CarouselProps = {
  items: ReactNode[];
  initialScroll?: number;
  labels: { previous: string; next: string; close: string };
};

export type CarouselCard = {
  /** Without a cover the card shows a dark surface. */
  src?: string;
  title: string;
  category: string;
  /** Only for cards that open the sheet; a linked card needs none. */
  content?: ReactNode;
};

const CarouselContext = createContext<{ onCardClose: (index: number) => void; currentIndex: number }>({
  onCardClose: () => {},
  currentIndex: 0,
});

const ArrowLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);
const ArrowRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export function Carousel({ items, initialScroll = 0, labels }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;
    checkScrollability();
  }, [initialScroll, checkScrollability]);

  const scrollBy = (dx: number) => carouselRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  const handleCardClose = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const mobile = window.innerWidth < 768;
    const cardWidth = mobile ? 224 : 384;
    const gap = mobile ? 16 : 16;
    el.scrollTo({ left: (cardWidth + gap) * (index + 1), behavior: "smooth" });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth pt-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pt-12 md:pb-6"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-4 px-5 md:px-12">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.08 * index, ease: "easeOut" } }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 md:px-12">
          <button
            type="button"
            aria-label={labels.previous}
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-40"
            onClick={() => scrollBy(-320)}
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-40"
            onClick={() => scrollBy(320)}
            disabled={!canScrollRight}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

function MotionCard({ href, onClick, className, children }: { href?: string; onClick?: () => void; className?: string; children: ReactNode }) {
  const props = { className, whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 } };
  return href ? (
    <motion.div {...props}>
      <Link href={href} className="block h-full w-full">
        {children}
      </Link>
    </motion.div>
  ) : (
    <motion.button type="button" onClick={onClick} {...props}>
      {children}
    </motion.button>
  );
}

export function Card({ card, index, closeLabel, className, href }: { card: CarouselCard; index: number; closeLabel: string; className?: string; href?: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  useOutsideClick(containerRef, handleClose);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={card.title}
              className="relative z-[210] mx-auto my-6 h-fit max-w-5xl rounded-3xl bg-white p-5 md:my-10 md:p-10"
            >
              <button
                type="button"
                aria-label={closeLabel}
                className="sticky top-4 right-0 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white"
                onClick={handleClose}
              >
                <Cross />
              </button>
              <p className="text-base font-medium text-slate-900">{card.category}</p>
              <p className="mt-3 text-2xl font-semibold leading-tight text-slate-900 md:text-5xl">{card.title}</p>
              <div className="py-8 md:py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* With a href the card is a link to its own page; otherwise it opens the sheet. */}
      <MotionCard
        href={href}
        onClick={href ? undefined : () => setOpen(true)}
        className={cn("group relative z-10 flex flex-col items-start justify-start overflow-hidden rounded-3xl bg-slate-900 text-left", className ?? "h-80 w-56 md:h-[40rem] md:w-96")}
      >
        {/* Most captures are light, so the caption needs its own scrim. */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-slate-950/35" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-3/4 bg-gradient-to-b from-black/85 via-black/45 to-transparent" />
        <div className="relative z-40 p-6 md:p-8">
          <p className="text-left text-sm font-medium text-white md:text-base">{card.category}</p>
          <p className="mt-2 max-w-xs text-left text-xl font-semibold text-balance text-white md:text-3xl">{card.title}</p>
        </div>
        {card.src ? (
          <Image
            src={card.src}
            alt=""
            fill
            sizes="(min-width: 768px) 384px, 224px"
            className="absolute inset-0 z-10 object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_30%_10%,rgba(0,0,0,0.35),rgba(15,23,42,0)_60%),linear-gradient(180deg,#0f172a,#020617)]" />
        )}
      </MotionCard>
    </>
  );
}
