import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { inter, notoSansThai } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import ClientWidgets from "@/components/providers/ClientWidgets";
import AnimatedFavicon from "@/components/ui/AnimatedFavicon";
import GrandGateLoading from "@/components/ui/GrandGateLoading";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      template: `%s | BOI Thailand`,
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.boi.go.th"
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        th: "/th",
        en: "/en",
        ja: "/ja",
        zh: "/zh",
        ko: "/ko",
        de: "/de",
        fr: "/fr",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "BOI Thailand",
      locale,
      type: "website",
    },
    other: {
      "theme-color": "#1B2A4A",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansThai.variable}`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <AnimatedFavicon />
        <NextIntlClientProvider messages={messages}>
          <GrandGateLoading />
          <MotionProvider>
          <SmoothScrollProvider>
            {/* Skip to main content — WCAG 2.4.1 */}
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>

            <Header />

            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>

            <Footer />
            <ClientWidgets />
          </SmoothScrollProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
