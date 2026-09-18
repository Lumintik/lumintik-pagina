"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { writeStoredLocale, type Locale } from "@/lib/locale";
import { messages, type Messages } from "@/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  isLoading: boolean;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * The locale is decided by the URL segment and handed down from the server, so
 * the first paint is already in the right language — no flash of English, and
 * crawlers see the translated markup.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remember the choice so the proxy can route locale-less URLs next time.
    writeStoredLocale(locale);
  }, [locale]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, isLoading, t: messages[locale] }),
    [locale, isLoading],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT(): Messages {
  return useLocale().t;
}
