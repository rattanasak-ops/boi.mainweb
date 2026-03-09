"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTAV3() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background image */}
      <Image
        src="/images/hero/golden-arch.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B2A4A]/85" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="rounded-2xl bg-white/5 p-10 text-center shadow-2xl backdrop-blur-md md:p-14"
          style={{
            border: "1px solid transparent",
            backgroundClip: "padding-box",
            boxShadow:
              "0 0 0 1px rgba(197,165,114,0.3), 0 25px 50px -12px rgba(0,0,0,0.5)",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/invest/getting-started"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold text-[#1B2A4A] transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #C5A572 0%, #E8D5B0 100%)",
              }}
            >
              {t("cta_button")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {tCommon("contact_us")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Subtle gold radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 w-full max-w-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(197,165,114,0.08), transparent 70%)",
        }}
      />
    </section>
  );
}
