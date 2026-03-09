// ===== BOI Site Template System =====
// TOR 4.2.11: Template >= 3 (we provide 5)
// Each template changes: colors, fonts, border-radius, shadows, header/hero/card style

export interface SiteTemplate {
  id: string;
  name: { th: string; en: string };
  description: { th: string; en: string };
  colors: {
    primary: string;
    primaryLight: string;
    accent: string;
    accentLight: string;
    surface: string;
    surfaceAlt: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    headerBg: string;
    headerText: string;
    heroOverlay: string;
  };
  fontFamily: string;
  borderRadius: string;
  cardRadius: string;
  buttonRadius: string;
  shadow: string;
  shadowLg: string;
  heroStyle: "fullscreen" | "split" | "minimal" | "gradient" | "cinematic";
  headerStyle: "light" | "dark" | "transparent" | "colored";
  cardStyle: "sharp" | "rounded" | "glass" | "bordered" | "elevated";
  /** 3 preview swatch colors for admin thumbnail */
  previewSwatches: [string, string, string];
}

export const SITE_TEMPLATES: SiteTemplate[] = [
  {
    id: "royal-navy",
    name: { th: "Royal Navy", en: "Royal Navy" },
    description: {
      th: "ธีมทางการ หรูหรา สง่างาม - Navy + Gold สไตล์ราชการระดับสูง",
      en: "Official & luxurious - Navy + Gold, premium government style",
    },
    colors: {
      primary: "#1B2A4A",
      primaryLight: "#2a4170",
      accent: "#C5A572",
      accentLight: "#d9be86",
      surface: "#F8FAFC",
      surfaceAlt: "#f0f2f6",
      textPrimary: "#1B2A4A",
      textSecondary: "#475f8f",
      textMuted: "#94a3b8",
      border: "#e2e8f0",
      headerBg: "rgba(255,255,255,0.95)",
      headerText: "#1B2A4A",
      heroOverlay: "rgba(12,18,38,0.75)",
    },
    fontFamily:
      'var(--font-inter), var(--font-noto-sans-thai), "Noto Sans Thai", "Inter", system-ui, sans-serif',
    borderRadius: "0.375rem",
    cardRadius: "0.5rem",
    buttonRadius: "0.375rem",
    shadow: "0 1px 3px rgba(0,0,0,0.08)",
    shadowLg: "0 4px 20px rgba(0,0,0,0.08)",
    heroStyle: "fullscreen",
    headerStyle: "light",
    cardStyle: "sharp",
    previewSwatches: ["#1B2A4A", "#C5A572", "#F8FAFC"],
  },
  {
    id: "modern-white",
    name: { th: "Modern White", en: "Modern White" },
    description: {
      th: "ธีมสะอาด มินิมอล สมัยใหม่ - ขาว + น้ำเงินสด ดูโปร่งสบายตา",
      en: "Clean & minimal - White + vivid blue, open and modern feel",
    },
    colors: {
      primary: "#1e40af",
      primaryLight: "#3b82f6",
      accent: "#2563EB",
      accentLight: "#60a5fa",
      surface: "#FFFFFF",
      surfaceAlt: "#f1f5f9",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e2e8f0",
      headerBg: "rgba(255,255,255,0.98)",
      headerText: "#0f172a",
      heroOverlay: "rgba(15,23,42,0.60)",
    },
    fontFamily:
      '"Plus Jakarta Sans", var(--font-inter), var(--font-noto-sans-thai), system-ui, sans-serif',
    borderRadius: "0.75rem",
    cardRadius: "1rem",
    buttonRadius: "0.75rem",
    shadow: "0 2px 8px rgba(0,0,0,0.05)",
    shadowLg: "0 8px 30px rgba(0,0,0,0.08)",
    heroStyle: "split",
    headerStyle: "light",
    cardStyle: "rounded",
    previewSwatches: ["#1e40af", "#2563EB", "#FFFFFF"],
  },
  {
    id: "forest-green",
    name: { th: "Forest Green", en: "Forest Green" },
    description: {
      th: "ธีมธรรมชาติ ยั่งยืน BCG - เขียวเข้ม + ครีม ร่มรื่น สบายตา",
      en: "Natural & sustainable BCG - Deep green + cream, organic feel",
    },
    colors: {
      primary: "#065F46",
      primaryLight: "#059669",
      accent: "#D97706",
      accentLight: "#F59E0B",
      surface: "#FFFBEB",
      surfaceAlt: "#FEF3C7",
      textPrimary: "#064E3B",
      textSecondary: "#065F46",
      textMuted: "#6B7280",
      border: "#D1D5DB",
      headerBg: "rgba(255,251,235,0.95)",
      headerText: "#064E3B",
      heroOverlay: "rgba(6,78,59,0.70)",
    },
    fontFamily:
      '"DM Sans", var(--font-inter), var(--font-noto-sans-thai), system-ui, sans-serif',
    borderRadius: "1rem",
    cardRadius: "1.25rem",
    buttonRadius: "2rem",
    shadow: "0 2px 12px rgba(6,95,70,0.06)",
    shadowLg: "0 12px 40px rgba(6,95,70,0.1)",
    heroStyle: "minimal",
    headerStyle: "colored",
    cardStyle: "rounded",
    previewSwatches: ["#065F46", "#D97706", "#FFFBEB"],
  },
  {
    id: "sunrise-gradient",
    name: { th: "Sunrise Gradient", en: "Sunrise Gradient" },
    description: {
      th: "ธีมพลังงาน นวัตกรรม - ส้ม+ชมพู gradient สไตล์ Startup ล้ำสมัย",
      en: "Energy & innovation - Orange to pink gradient, futuristic startup style",
    },
    colors: {
      primary: "#9333EA",
      primaryLight: "#A855F7",
      accent: "#EA580C",
      accentLight: "#FB923C",
      surface: "#FAFAFA",
      surfaceAlt: "#F5F3FF",
      textPrimary: "#18181B",
      textSecondary: "#52525B",
      textMuted: "#A1A1AA",
      border: "#E4E4E7",
      headerBg: "rgba(250,250,250,0.95)",
      headerText: "#18181B",
      heroOverlay:
        "linear-gradient(135deg, rgba(234,88,12,0.85), rgba(147,51,234,0.85))",
    },
    fontFamily:
      '"Space Grotesk", var(--font-inter), var(--font-noto-sans-thai), system-ui, sans-serif',
    borderRadius: "0.875rem",
    cardRadius: "1rem",
    buttonRadius: "0.75rem",
    shadow: "0 4px 16px rgba(147,51,234,0.06)",
    shadowLg: "0 16px 48px rgba(147,51,234,0.12)",
    heroStyle: "gradient",
    headerStyle: "light",
    cardStyle: "glass",
    previewSwatches: ["#9333EA", "#EA580C", "#FAFAFA"],
  },
  {
    id: "dark-executive",
    name: { th: "Dark Executive", en: "Dark Executive" },
    description: {
      th: "ธีมพรีเมียม ดูแพง - ดำเข้ม + ทอง สไตล์ผู้บริหารระดับสูง",
      en: "Premium & expensive - Dark + Gold, top executive style",
    },
    colors: {
      primary: "#F8FAFC",
      primaryLight: "#E2E8F0",
      accent: "#F59E0B",
      accentLight: "#FBBF24",
      surface: "#0F172A",
      surfaceAlt: "#1E293B",
      textPrimary: "#F1F5F9",
      textSecondary: "#94A3B8",
      textMuted: "#64748B",
      border: "#334155",
      headerBg: "rgba(15,23,42,0.95)",
      headerText: "#F1F5F9",
      heroOverlay: "rgba(15,23,42,0.85)",
    },
    fontFamily:
      '"Outfit", var(--font-inter), var(--font-noto-sans-thai), system-ui, sans-serif',
    borderRadius: "0.5rem",
    cardRadius: "0.75rem",
    buttonRadius: "0.5rem",
    shadow: "0 2px 8px rgba(0,0,0,0.3)",
    shadowLg: "0 12px 40px rgba(0,0,0,0.5)",
    heroStyle: "cinematic",
    headerStyle: "dark",
    cardStyle: "bordered",
    previewSwatches: ["#0F172A", "#F59E0B", "#1E293B"],
  },
];

export const DEFAULT_SITE_TEMPLATE = "royal-navy";
export const SITE_TEMPLATE_STORAGE_KEY = "boi-site-template";

export function getSiteTemplate(id: string): SiteTemplate | undefined {
  return SITE_TEMPLATES.find((t) => t.id === id);
}
