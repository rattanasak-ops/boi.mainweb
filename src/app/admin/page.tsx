"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, Globe, BarChart3, FileText, ArrowRight } from "lucide-react";
import { SITE_TEMPLATES, SITE_TEMPLATE_STORAGE_KEY, DEFAULT_SITE_TEMPLATE } from "@/config/site-templates";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTemplate, setActiveTemplate] = useState(DEFAULT_SITE_TEMPLATE);

  useEffect(() => {
    const stored = localStorage.getItem(SITE_TEMPLATE_STORAGE_KEY);
    if (stored) setActiveTemplate(stored);
  }, []);

  const active = SITE_TEMPLATES.find((t) => t.id === activeTemplate);

  const stats = [
    { label: "Templates", value: SITE_TEMPLATES.length.toString(), icon: Palette, color: "from-amber-500 to-orange-500" },
    { label: "Languages", value: "7", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { label: "Pages", value: "41+", icon: FileText, color: "from-emerald-500 to-green-500" },
    { label: "Components", value: "50+", icon: BarChart3, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">
          BOI Website Template Management System
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active template */}
      {active && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Active Template
            </h3>
            <button
              onClick={() => router.push("/admin/templates")}
              className="flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Change Template <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            {/* Color swatches */}
            <div className="flex gap-2">
              {active.previewSwatches.map((color, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl border border-white/10 shadow-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div>
              <p className="font-semibold text-white">{active.name.en}</p>
              <p className="text-sm text-white/40 mt-0.5">
                {active.description.en}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => router.push("/admin/templates")}
          className="group text-left bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 hover:from-amber-500/15 hover:to-orange-500/15 transition-all cursor-pointer"
        >
          <Palette className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
            Manage Templates
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Choose from 5 unique templates. Preview and activate instantly.
          </p>
        </button>

        <a
          href="/th"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 hover:from-blue-500/15 hover:to-cyan-500/15 transition-all"
        >
          <Globe className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
            View Live Website
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Open the public website to see the active template in action.
          </p>
        </a>
      </div>
    </div>
  );
}
