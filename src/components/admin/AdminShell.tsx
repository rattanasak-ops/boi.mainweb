"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Globe,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const ADMIN_LABELS = {
  th: {
    dashboard: "แดชบอร์ด",
    templates: "จัดการ Template",
    sections: "จัดการ Section",
    viewSite: "ดูเว็บไซต์",
    signOut: "ออกจากระบบ",
    adminPanel: "Admin Panel",
    boiAdmin: "BOI Admin",
  },
  en: {
    dashboard: "Dashboard",
    templates: "Templates",
    sections: "Sections",
    viewSite: "View Site",
    signOut: "Sign Out",
    adminPanel: "Admin Panel",
    boiAdmin: "BOI Admin",
  },
};

type AdminLang = "th" | "en";

const navItems = [
  { key: "dashboard" as const, href: "/admin", icon: LayoutDashboard },
  { key: "templates" as const, href: "/admin/templates", icon: Palette },
  { key: "sections" as const, href: "/admin/sections", icon: Layers },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [lang, setLang] = useState<AdminLang>("th");
  const [authed, setAuthed] = useState<boolean | null>(null);

  const t = ADMIN_LABELS[lang];

  // Auth check
  useEffect(() => {
    const isLogin = pathname === "/admin/login";
    const hasCookie = document.cookie.includes("boi-admin-auth=1");
    if (!isLogin && !hasCookie) {
      router.replace("/admin/login");
      setAuthed(false);
    } else {
      setAuthed(true);
    }
  }, [pathname, router]);

  // Show login page without shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading auth check
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1629]">
        <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
      </div>
    );
  }

  function handleSignOut() {
    document.cookie = "boi-admin-auth=; path=/; max-age=0";
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0A0F1E] border-r border-white/[0.06] flex flex-col z-50 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06]">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {t.boiAdmin}
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Nav — use <a> + onClick for reliable navigation in fixed sidebar */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04] border border-transparent"
                }`}
                title={collapsed ? t[item.key] : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{t[item.key]}</span>}
              </a>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/[0.06] p-3 space-y-1">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all w-full"
            title={collapsed ? "TH/EN" : undefined}
          >
            <Globe className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span>{lang === "th" ? "English" : "ภาษาไทย"}</span>
            )}
          </button>

          {/* View site */}
          <a
            href="/th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all w-full"
            title={collapsed ? t.viewSite : undefined}
          >
            <ExternalLink className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{t.viewSite}</span>}
          </a>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all w-full"
            title={collapsed ? t.signOut : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{t.signOut}</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        {/* Top bar */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#0F1629]/80 backdrop-blur-xl sticky top-0 z-40">
          <h2 className="text-sm font-medium text-white/60">{t.adminPanel}</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-white/50">admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
