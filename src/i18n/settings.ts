import type { InitOptions } from "i18next";

export const FALLBACK_LOCALE = "en";
export const supportedLocales = ["en", "ru", "rs"] as const;
export type Locales = (typeof supportedLocales)[number];

export const LANGUAGE_COOKIE = "preferred_language";

export function getOptions(lang = FALLBACK_LOCALE): InitOptions {
  return {
    // debug: true,
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
  };
}
