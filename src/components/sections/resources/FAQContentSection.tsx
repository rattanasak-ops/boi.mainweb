"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Briefcase, FileText, Globe2, Shield, HelpCircle } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

const CATEGORIES = [
  { key: "general", icon: HelpCircle },
  { key: "eligibility", icon: Briefcase },
  { key: "application", icon: FileText },
  { key: "incentives", icon: Globe2 },
  { key: "compliance", icon: Shield },
];

const FAQ_DATA: Record<string, string[]> = {
  general: ["what_is_boi", "who_can_apply", "how_long"],
  eligibility: ["eligible_activities", "minimum_investment", "foreign_ownership"],
  application: ["how_to_apply", "documents_needed", "processing_time"],
  incentives: ["tax_exemption", "non_tax_benefits", "zone_benefits"],
  compliance: ["reporting", "revocation", "extension"],
};

export default function FAQContentSection() {
  const t = useTranslations("faq_page.content");
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Category Sidebar */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="text-sm font-semibold text-navy-600 mb-4 tracking-wide uppercase">
              {t("categories_label")}
            </p>
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setOpenItem(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 text-left ${
                    activeCategory === cat.key
                      ? "bg-navy-600 text-white"
                      : "text-text-secondary hover:bg-navy-600/5 hover:text-navy-600"
                  }`}
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <cat.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t(`cat_${cat.key}`)}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <div className="space-y-3">
              {(FAQ_DATA[activeCategory] || []).map((faqKey, i) => {
                const isOpen = openItem === faqKey;
                return (
                  <motion.div
                    key={faqKey}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * i,
                      ease: EASE_OUT,
                    }}
                  >
                    <div
                      className={`bg-white border transition-all duration-300 ${
                        isOpen
                          ? "border-gold-500/30 shadow-[0_10px_40px_rgba(27,42,74,0.06)]"
                          : "border-border hover:border-gold-500/20"
                      }`}
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      <button
                        onClick={() => toggleItem(faqKey)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`text-base font-semibold transition-colors duration-300 ${
                            isOpen ? "text-gold-600" : "text-navy-600"
                          }`}
                        >
                          {t(`${activeCategory}.${faqKey}_q`)}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-gold-500"
                              : "text-text-secondary"
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5">
                              <div className="h-[1px] bg-gradient-to-r from-gold-500/20 via-border to-transparent mb-4" />
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {t(`${activeCategory}.${faqKey}_a`)}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
