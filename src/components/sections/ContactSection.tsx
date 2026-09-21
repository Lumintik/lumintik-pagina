"use client";

import { useActionState, useEffect, useRef } from "react";
import posthog from "posthog-js";
import { useT } from "@/components/providers/LocaleProvider";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

export function ContactSection() {
  const t = useT();
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form once a submission is accepted, and report the outcome to
  // analytics. Only the result code travels — never the submitted field values.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      // Honeypot hits come back as a success so the bot notices nothing, but
      // counting them would inflate the only conversion metric the site has.
      if (!state.dropped) posthog.capture("contact_form_submitted");
    } else if (state.status === "error") {
      posthog.capture("contact_form_failed", { code: state.code });
    }
  }, [state]);

  const statusMessage = (() => {
    switch (state.code) {
      case "success":
        return t.contactForm.success;
      case "missing_fields":
        return t.contactForm.errorRequired;
      case "invalid_email":
        return t.contactForm.errorEmail;
      case "file_too_large":
        return t.contactForm.errorFile;
      case "not_configured":
      case "send_failed":
        return t.contactForm.error;
      default:
        return "";
    }
  })();

  const invalid = (field: string) => state.fields?.includes(field) ?? false;

  const servicesMap = [
    t.services.items.productDevelopment.title,
    t.services.items.uxui.title,
    t.services.items.webEngineering.title,
    t.services.items.appliedAI.title,
    t.services.items.performanceSEO.title,
    t.services.items.brandMotion.title,
    t.services.items.platformInfra.title,
  ];

  return (
    <section
      id="contact"
      className="relative box-border outline-none px-5 py-20 md:px-10 md:py-32 w-full z-[2] bg-white border-none"
    >
      <div className="box-border max-w-none w-full mx-auto md:max-w-[1150px] bg-gradient-to-br from-[#171717] to-[#0a0a0a] md:p-10 p-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-white/30 overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.1),transparent_50%)] pointer-events-none" />
        <div className="text-left mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {t.contactForm.title}
          </h2>
          <p className="text-sm md:text-base text-white font-light">
            {t.contactForm.subtitle}
          </p>
        </div>

        <form ref={formRef} action={formAction} className="flex flex-col gap-4 relative z-10">
          {/* Honeypot: hidden from users; bots that fill it are silently dropped. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                aria-invalid={invalid("name")}
                className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.service}
              </label>
              <select
                id="service"
                name="service"
                aria-invalid={invalid("service")}
                className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                defaultValue=""
                required
              >
                <option value="" disabled className="bg-[#171717] text-white">
                  {t.contactForm.serviceSelect}
                </option>
                {servicesMap.map((svc) => (
                  <option key={svc} value={svc} className="bg-[#171717] text-white">
                    {svc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                aria-invalid={invalid("email")}
                className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.phone}
              </label>
              <div className="flex items-center">
                <select
                  id="countryCode"
                  name="countryCode"
                  className="border-b border-white/30 h-[49px] bg-transparent text-white pr-2 mr-2 focus:outline-none focus:border-white transition-colors cursor-pointer text-sm"
                  defaultValue="+57"
                  aria-label="Country code"
                >
                  <option value="+57" className="bg-[#171717]">🇨🇴 +57</option>
                  <option value="+1" className="bg-[#171717]">🇺🇸 +1</option>
                  <option value="+52" className="bg-[#171717]">🇲🇽 +52</option>
                  <option value="+34" className="bg-[#171717]">🇪🇸 +34</option>
                  <option value="+54" className="bg-[#171717]">🇦🇷 +54</option>
                  <option value="+56" className="bg-[#171717]">🇨🇱 +56</option>
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-1 py-3 h-[49px] rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-xs font-semibold uppercase text-white">
                {t.contactForm.role}
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full mt-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase text-white">
              {t.contactForm.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              className="w-full px-1 py-3 rounded-none border-b border-white/30 bg-transparent text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 w-full mt-2">
            <label htmlFor="file" className="text-xs font-semibold uppercase text-white">
              {t.contactForm.attachment}
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,image/*,.doc,.docx"
              className="w-full px-1 py-2 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors cursor-pointer"
            />
          </div>

          <div className="flex items-start gap-4 mt-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              aria-invalid={invalid("terms")}
              className="mt-1 min-w-[20px] min-h-[20px] rounded border-slate-600 bg-transparent text-white cursor-pointer"
              required
            />
            <label htmlFor="terms" className="text-sm text-white leading-tight cursor-pointer">
              {t.contactForm.terms}
            </label>
          </div>

          {/* Submission status (announced to assistive tech). */}
          <p
            aria-live="polite"
            role="status"
            className={`min-h-[1.25rem] text-sm mt-1 ${
              state.status === "success"
                ? "text-emerald-400"
                : state.status === "error"
                  ? "text-red-400"
                  : "text-white"
            }`}
          >
            {statusMessage}
          </p>

          <button
            type="submit"
            disabled={pending}
            className="w-full md:w-auto md:self-center px-16 py-3.5 mt-2 bg-white hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full shadow-lg shadow-black/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            {pending ? t.contactForm.sending : t.contactForm.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
