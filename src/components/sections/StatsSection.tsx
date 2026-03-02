"use client";

import { motion } from "framer-motion";
import { TrendingUp, Landmark, Globe2, Users } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    icon: Landmark,
    target: 1500,
    suffix: "+",
    label: "โครงการที่ได้รับการส่งเสริม",
    labelEn: "Promoted Projects",
    color: "from-gold-400 to-gold-600",
    iconBg: "bg-gold-500/10",
    iconColor: "text-gold-500",
  },
  {
    icon: TrendingUp,
    target: 850,
    prefix: "฿",
    suffix: "B",
    label: "มูลค่าการลงทุนรวม",
    labelEn: "Total Investment",
    color: "from-navy-400 to-navy-600",
    iconBg: "bg-navy-500/10",
    iconColor: "text-navy-500",
  },
  {
    icon: Globe2,
    target: 50,
    suffix: "+",
    label: "ประเทศที่เข้ามาลงทุน",
    labelEn: "Countries Investing",
    color: "from-gold-400 to-gold-600",
    iconBg: "bg-gold-500/10",
    iconColor: "text-gold-500",
  },
  {
    icon: Users,
    target: 500,
    suffix: "K+",
    label: "ตำแหน่งงานที่สร้างขึ้น",
    labelEn: "Jobs Created",
    color: "from-navy-400 to-navy-600",
    iconBg: "bg-navy-500/10",
    iconColor: "text-navy-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background — subtle gradient + pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-600 via-navy-700 to-navy-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,165,114,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A572' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3">
            Investment Impact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Driving Growth Across Thailand
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.labelEn}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 text-center hover:bg-white/10 hover:border-gold-500/30 transition-all duration-500">
                {/* Top glow line */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 bg-gradient-to-r ${stat.color} transition-all duration-500 rounded-full`} />

                {/* Icon */}
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} backdrop-blur-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} aria-hidden="true" />
                </div>

                {/* Number */}
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>

                {/* Label */}
                <p className="text-sm text-navy-300 group-hover:text-gold-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
