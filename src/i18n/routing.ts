import { defineRouting } from "next-intl/routing";

export const locales = ["th", "en", "ja", "zh", "ko", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "th",
});
