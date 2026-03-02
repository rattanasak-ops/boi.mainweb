"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const flags: Record<Locale, string> = {
  th: "🇹🇭",
  en: "🇬🇧",
  ja: "🇯🇵",
  zh: "🇨🇳",
  ko: "🇰🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as Locale });
  }

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        {t("select")}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-transparent border border-border rounded-md px-3 py-1.5 pr-8 text-sm text-text-primary cursor-pointer hover:border-gold-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
        aria-label={t("select")}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {flags[loc]} {t(loc)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-4 w-4 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
