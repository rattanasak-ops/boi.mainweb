"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import BOILogo from "@/components/ui/BOILogo";
import FooterCanvas from "@/components/ui/FooterCanvas";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-b from-navy-600 via-navy-700 to-navy-800 text-white"
      role="contentinfo"
    >
      {/* Interactive Golden Network background */}
      <FooterCanvas />

      {/* Content layer — above canvas */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Logo + divider */}
        <div className="pt-12 pb-8 border-b border-navy-500/50">
          <Link href="/" aria-label="BOI Thailand - Home">
            <BOILogo variant="footer" />
          </Link>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.05 1.593.11v3.178c-.477-.05-.87-.074-1.166-.074-1.657 0-2.298.631-2.298 2.272v2.072h3.323l-.573 3.668h-2.75v8.166C19.396 23.07 24 18.07 24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.618Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@BOIThailand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 hover:scale-110 transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
                </svg>
              </a>
              <a
                href="https://line.me/R/ti/p/@babornsongsoem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 hover:bg-gold-500 hover:scale-110 transition-all duration-200"
                aria-label="LINE"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
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
