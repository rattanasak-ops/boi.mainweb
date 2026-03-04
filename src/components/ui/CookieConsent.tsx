"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cookie, X, ChevronDown, Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsent() {
  const t = useTranslations("cookie_consent");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after short delay for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const all: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(all));
    setVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  };

  const rejectOptional = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(DEFAULT_PREFS));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-60 p-4 sm:p-6"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div
            className="mx-auto max-w-4xl bg-white border border-border shadow-[0_-20px_60px_rgba(27,42,74,0.1)]"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Main banner */}
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
                  <Cookie className="h-5 w-5 text-gold-500" aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-navy-600 mb-1">
                        {t("title")}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {t("description")}{" "}
                        <Link
                          href="/privacy"
                          className="text-gold-600 hover:underline"
                        >
                          {t("privacy_link")}
                        </Link>
                      </p>
                    </div>
                    <button
                      onClick={rejectOptional}
                      className="shrink-0 p-1.5 text-text-secondary/40 hover:text-navy-600 transition-colors"
                      aria-label={t("close")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Details toggle */}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-3 flex items-center gap-1.5 text-xs text-gold-600 font-medium hover:text-gold-500 transition-colors"
                  >
                    <Shield className="h-3 w-3" aria-hidden="true" />
                    {t("manage_preferences")}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        showDetails ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Preference toggles */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3">
                          {(
                            [
                              "necessary",
                              "analytics",
                              "marketing",
                              "functional",
                            ] as const
                          ).map((key) => (
                            <label
                              key={key}
                              className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0"
                            >
                              <div>
                                <p className="text-xs font-semibold text-navy-600">
                                  {t(`${key}_label`)}
                                  {key === "necessary" && (
                                    <span className="ml-1.5 text-[10px] text-gold-600 font-normal">
                                      ({t("always_on")})
                                    </span>
                                  )}
                                </p>
                                <p className="text-[10px] text-text-secondary mt-0.5">
                                  {t(`${key}_desc`)}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  if (key === "necessary") return;
                                  setPrefs((p) => ({
                                    ...p,
                                    [key]: !p[key],
                                  }));
                                }}
                                disabled={key === "necessary"}
                                className={`relative h-5 w-9 rounded-full transition-colors shrink-0 ${
                                  prefs[key]
                                    ? "bg-gold-500"
                                    : "bg-navy-600/15"
                                } ${
                                  key === "necessary"
                                    ? "opacity-60 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                role="switch"
                                aria-checked={prefs[key]}
                                aria-label={t(`${key}_label`)}
                              >
                                <span
                                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                    prefs[key]
                                      ? "translate-x-4"
                                      : "translate-x-0.5"
                                  }`}
                                />
                              </button>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={acceptAll}
                      className="px-5 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-xs font-semibold hover:from-gold-400 hover:to-gold-500 transition-all shadow-sm"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {t("accept_all")}
                    </button>
                    {showDetails && (
                      <button
                        onClick={acceptSelected}
                        className="px-5 py-2 border border-navy-600/20 text-navy-600 text-xs font-semibold hover:border-gold-500/30 transition-all"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {t("accept_selected")}
                      </button>
                    )}
                    <button
                      onClick={rejectOptional}
                      className="px-5 py-2 text-text-secondary text-xs font-medium hover:text-navy-600 transition-colors"
                    >
                      {t("reject_optional")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
