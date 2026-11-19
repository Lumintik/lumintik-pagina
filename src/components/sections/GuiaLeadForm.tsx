"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { COUNTRY_CODES } from "@/components/sections/ContactSection";
import { Mark } from "@/components/sections/ClientWall";
import { CLIENTS } from "@/data/clients";
import type { LeadMagnet } from "@/data/posts";
import { trackCta } from "@/lib/analytics";
import { href, paths } from "@/lib/routes";

const initialState: ContactState = { status: "idle" };

/** Anchor of the block, linked from the top of the post. */
export const GUIDE_ANCHOR = "guia";

const labelClass = "text-xs font-semibold uppercase text-white";
const inputClass =
  "w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors";

/**
 * The end of a lead magnet post: a call to book a call that is always there,
 * the client logos, and a short form that unlocks the PDF. The form goes
 * through the contact Server Action, so the lead reaches the same inbox.
 */
export function GuiaLeadForm({ slug, leadMagnet }: { slug: string; leadMagnet: LeadMagnet }) {
  const t = useT();
  const { locale } = useLocale();
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const from = href(locale, paths.post(slug));
  const sent = state.status === "success";
  // The PDF is in Spanish; the tag tells Andrey which page the lead read.
  const service = locale === "ES" ? leadMagnet.service : `${leadMagnet.service} (EN)`;

  useEffect(() => {
    if (state.status !== "success") return;
    // Honeypot hits also come back as a success; they are not leads.
    if (!state.dropped) trackCta("guide_form_submitted", from);
    thanksRef.current?.focus();
  }, [state, from]);

  const error =
    state.status !== "error"
      ? ""
      : state.code === "missing_fields"
        ? t.contactForm.errorRequired
        : state.code === "invalid_email"
          ? t.contactForm.errorEmail
          : t.contactForm.error;
  const invalid = (field: string) => state.fields?.includes(field) ?? false;

  return (
    <section id={GUIDE_ANCHOR} className="relative z-[2] w-full scroll-mt-24 bg-white px-5 py-20 md:px-10 md:py-32">
      <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-[#171717] to-[#0a0a0a] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] md:max-w-[1150px] md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t.guideLead.title}</h2>
            <p className="mt-3 text-sm md:text-base font-light text-white">{t.guideLead.proof}</p>
          </div>
          <a
            href={leadMagnet.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("calendly_call", from)}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-5 py-4 text-[15px] font-semibold text-slate-900 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 sm:gap-3 sm:px-8 sm:text-base md:w-auto md:text-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t.guideLead.call}
            <span className="sr-only"> {t.guideLead.newTab}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="hidden sm:block">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        <ul aria-label={t.guideLead.proof} className="mt-8 grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-6 opacity-80 sm:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map((client) => (
            <li key={client.key} className="flex h-12 items-center justify-center">
              <Mark client={client} compact />
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-white/15 pt-10">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{t.guideLead.formTitle}</h3>

          {sent ? (
            <div role="status" className="mt-6 flex flex-col items-start gap-5">
              <div>
                <p ref={thanksRef} tabIndex={-1} className="text-lg md:text-xl font-semibold text-white focus:outline-none">
                  {t.guideLead.successTitle}
                </p>
                <p className="mt-2 text-sm md:text-base font-light text-white">{t.guideLead.successBody}</p>
              </div>
              <a
                href={leadMagnet.pdf}
                download
                target="_blank"
                rel="noopener"
                onClick={() => trackCta("guide_pdf_download", from)}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 md:w-auto"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                {t.guideLead.download}
              </a>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm md:text-base font-light text-white">{t.guideLead.formIntro}</p>
              <form action={formAction} className="relative mt-8 flex flex-col gap-4">
                {/* Honeypot: hidden from users; bots that fill it are silently dropped. */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-px w-px opacity-0"
                />
                <input type="hidden" name="service" value={service} />

                <div className="grid w-full grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guia-name" className={labelClass}>
                      {t.guideLead.name}
                    </label>
                    <input id="guia-name" name="name" type="text" autoComplete="name" aria-invalid={invalid("name")} className={inputClass} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guia-phone" className={labelClass}>
                      {t.guideLead.whatsapp}
                    </label>
                    <div className="flex items-center">
                      <select
                        name="countryCode"
                        defaultValue={COUNTRY_CODES[0].code}
                        aria-label={t.guideLead.countryCode}
                        className="mr-2 h-[49px] cursor-pointer border-b border-white/30 bg-transparent pr-2 text-sm text-white transition-colors focus:border-white focus:outline-none"
                      >
                        {COUNTRY_CODES.map(({ code, flag }) => (
                          <option key={code} value={code} className="bg-[#171717]">
                            {`${flag} ${code}`}
                          </option>
                        ))}
                      </select>
                      <input
                        id="guia-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        minLength={7}
                        className={`${inputClass} h-[49px]`}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
                    <label htmlFor="guia-email" className={labelClass}>
                      {t.guideLead.email}
                    </label>
                    <input id="guia-email" name="email" type="email" autoComplete="email" aria-invalid={invalid("email")} className={inputClass} required />
                  </div>
                </div>

                <div className="mt-2 flex w-full flex-col gap-2">
                  <label htmlFor="guia-message" className={labelClass}>
                    {t.guideLead.idea}
                  </label>
                  <textarea id="guia-message" name="message" rows={2} placeholder={t.guideLead.ideaPlaceholder} className={`${inputClass} resize-y`} />
                </div>

                <div className="mt-4 flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="guia-terms"
                    name="terms"
                    aria-invalid={invalid("terms")}
                    className="mt-1 min-h-[20px] min-w-[20px] cursor-pointer rounded border-slate-600 bg-transparent"
                    required
                  />
                  <label htmlFor="guia-terms" className="cursor-pointer text-sm leading-tight text-white">
                    {t.contactForm.terms}
                  </label>
                </div>

                <p aria-live="polite" role="status" className="mt-1 min-h-[1.25rem] text-sm text-red-400">
                  {error}
                </p>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-full border border-white/60 px-12 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:self-start"
                >
                  {pending ? t.contactForm.sending : t.guideLead.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
