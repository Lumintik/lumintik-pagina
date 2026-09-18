"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { track } from "@/lib/analytics";
import { fill, type Site } from "@/i18n/site";

const initialState: ContactState = { status: "idle" };

type Props = {
  t: Site["contact"];
  serviceOptions: string[];
  privacyHref: string;
  email: string;
};

const field =
  "h-12 w-full min-w-0 rounded-xl border border-black/20 bg-white px-4 text-base text-black focus:border-black focus:outline-none focus-visible:outline-2";
const label = "text-sm font-medium text-black";

export function ContactForm({ t, serviceOptions, privacyHref, email }: Props) {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form once a submission is accepted, and report the outcome.
  // Only the result code travels, never the submitted values.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      // Honeypot hits come back as a success so the bot notices nothing, but
      // counting them would inflate the only conversion metric the site has.
      if (!state.dropped) track("contact_form_submitted");
    } else if (state.status === "error") {
      track("contact_form_failed", { code: state.code });
    }
  }, [state]);

  const message = (() => {
    switch (state.code) {
      case "success":
        return t.success;
      case "missing_fields":
        return t.errorRequired;
      case "invalid_email":
        return t.errorEmail;
      case "file_too_large":
        return t.errorFile;
      case "not_configured":
      case "send_failed":
        return fill(t.error, { email });
      default:
        return "";
    }
  })();

  const invalid = (name: string) => state.fields?.includes(name) || undefined;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5" noValidate={false}>
      {/* Honeypot: hidden from people; bots that fill it are silently dropped. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <p className="text-sm text-black">{t.required}</p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={label}>{t.name}</label>
          <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={invalid("name")} className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>{t.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={invalid("email")} className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={label}>{t.company}</label>
          <input id="company" name="company" type="text" autoComplete="organization" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className={label}>{t.role}</label>
          <input id="role" name="role" type="text" autoComplete="organization-title" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className={label}>{t.service}</label>
          <select id="service" name="service" required defaultValue="" aria-invalid={invalid("service")} className={field}>
            <option value="" disabled>{t.serviceSelect}</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={label}>{t.phone}</label>
          <div className="flex gap-2">
            <select
              id="countryCode"
              name="countryCode"
              defaultValue="+57"
              aria-label={t.countryCode}
              className={`${field.replace("w-full", "")} w-28 shrink-0 px-3`}
            >
              <option value="+57">CO +57</option>
              <option value="+1">US +1</option>
              <option value="+52">MX +52</option>
              <option value="+34">ES +34</option>
            </select>
            <input id="phone" name="phone" type="tel" autoComplete="tel-national" className={field} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={label}>{t.message}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-base text-black focus:border-black focus:outline-none focus-visible:outline-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="file" className={label}>{t.attachment}</label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,image/*,.doc,.docx"
          aria-invalid={invalid("file")}
          className="w-full text-sm text-black file:mr-4 file:rounded-full file:border file:border-black/20 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          required
          aria-invalid={invalid("terms")}
          className="mt-0.5 size-5 shrink-0 accent-black"
        />
        <label htmlFor="terms" className="text-base leading-snug text-black">
          {t.termsLead}
          <Link href={privacyHref} className="link" target="_blank">
            {t.termsLink}
          </Link>
          {t.termsTail}
        </label>
      </div>

      <p role="status" aria-live="polite" className="min-h-6 text-base font-medium text-black">
        {message}
      </p>

      <button type="submit" disabled={pending} className="btn btn-primary self-start disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
