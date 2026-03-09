"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Phone } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTAV2() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="w-full bg-[#1B2A4A] py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Split cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Start Investing card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          >
            <div
              className="flex h-full flex-col justify-between rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, #C5A572 0%, #E8D5B0 100%)",
              }}
            >
              <div>
                <h3 className="text-2xl font-bold text-[#1B2A4A]">
                  {t("title")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1B2A4A]/70">
                  {t("description")}
                </p>
              </div>
              <Link
                href="/invest/getting-started"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#1B2A4A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1B2A4A]/90 hover:scale-[1.03]"
              >
                {t("cta_button")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Contact Us card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C5A572]/10">
                  <Phone className="h-5 w-5 text-[#C5A572]" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {tCommon("contact_us")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {t("description")}
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-[#C5A572] px-6 py-3 text-sm font-semibold text-[#C5A572] transition-all duration-300 hover:bg-[#C5A572] hover:text-[#1B2A4A] hover:scale-[1.03]"
              >
                {tCommon("contact_us")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
