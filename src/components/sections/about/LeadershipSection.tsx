"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Building2, Globe2, Award } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const departments = [
  {
    icon: Building2,
    titleKey: "dept_promotion",
    descKey: "dept_promotion_desc",
  },
  {
    icon: Globe2,
    titleKey: "dept_international",
    descKey: "dept_international_desc",
  },
  {
    icon: Award,
    titleKey: "dept_services",
    descKey: "dept_services_desc",
  },
  {
    icon: User,
    titleKey: "dept_regional",
    descKey: "dept_regional_desc",
  },
];

export default function LeadershipSection() {
  const t = useTranslations("about_page.leadership");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("title_1")}
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex items-end"
          >
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* Secretary General card — featured */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mb-10"
        >
          <div
            className="relative bg-white border border-border p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Gold accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(197,165,114,0.5) 30%, rgba(197,165,114,0.5) 70%, transparent)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
            />

            {/* Avatar placeholder */}
            <div className="shrink-0 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 border-2 border-gold-500/20">
              <User
                className="h-14 w-14 text-gold-500/60"
                aria-hidden="true"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <p className="text-gold-600 font-medium text-sm tracking-[0.15em] uppercase mb-2">
                {t("sg_role")}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-600">
                {t("sg_name")}
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed max-w-xl">
                {t("sg_quote")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Department grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group h-full bg-white border border-border p-6 sm:p-8 hover:border-gold-500/30 hover:shadow-[0_16px_40px_rgba(27,42,74,0.06)] transition-all duration-500"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-4 group-hover:bg-gold-500/20 transition-all duration-300">
                  <dept.icon
                    className="h-5 w-5 text-gold-500"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                  {t(dept.titleKey)}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(dept.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
