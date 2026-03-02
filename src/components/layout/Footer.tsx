"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-600 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-gold-400 mb-4">
              {t("contact")}
            </h2>
            <address className="not-italic space-y-3 text-sm text-navy-200">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <a href="tel:+6625538111" className="hover:text-white transition-colors">
                  {t("phone")}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <a href="mailto:head@boi.go.th" className="hover:text-white transition-colors">
                  {t("email")}
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gold-400 mb-4">
              {t("quick_links")}
            </h2>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>
                <Link href="/discover" className="hover:text-white transition-colors">
                  {tNav("discover")}
                </Link>
              </li>
              <li>
                <Link href="/invest" className="hover:text-white transition-colors">
                  {tNav("invest")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  {tNav("resources")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Sites */}
          <div>
            <h2 className="text-lg font-semibold text-gold-400 mb-4">
              {t("related_sites")}
            </h2>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>
                <a
                  href="https://www.thaigov.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Thai Government
                </a>
              </li>
              <li>
                <a
                  href="https://osos.boi.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  OSOS (One Start One Stop)
                </a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h2 className="text-lg font-semibold text-gold-400 mb-4">
              {t("follow_us")}
            </h2>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/boiofthailand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold" aria-hidden="true">f</span>
              </a>
              <a
                href="https://www.youtube.com/@BOIThailand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 transition-colors"
                aria-label="YouTube"
              >
                <span className="text-sm font-bold" aria-hidden="true">YT</span>
              </a>
              <a
                href="https://line.me/R/ti/p/@babornsongsoem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 transition-colors"
                aria-label="LINE"
              >
                <span className="text-sm font-bold" aria-hidden="true">L</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-500 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-navy-300">
              {t("copyright", { year: String(year) })}
            </p>
            <div className="flex gap-4 text-sm text-navy-300">
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t("privacy")}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t("terms")}
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                {t("accessibility")}
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                {t("sitemap")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
