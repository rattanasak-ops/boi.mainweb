// ===== BOI Theme Engine Configuration =====
// Act As: P1 Design System Architect + P2 Frontend Theme Engine Developer
// TOR 4.2.11 (Template >= 3) + TOR 4.2.12 (Theme Color Switching)

// --- Color Modes ---
export type ColorMode = "light" | "dark" | "system";

// --- Moods (Visual Style Variants) ---
export type Mood = "corporate" | "modern" | "elegant";

export const MOOD_META: Record<Mood, { label: string; description: string }> = {
  corporate: {
    label: "Corporate",
    description: "Sharp & professional — minimal radius, clean shadows",
  },
  modern: {
    label: "Modern",
    description: "Soft & approachable — rounded corners, gentle shadows",
  },
  elegant: {
    label: "Elegant",
    description: "Premium & refined — generous spacing, gold-tinted accents",
  },
};

// --- Layout Templates (TOR 4.2.11: >= 3 templates) ---
export type LayoutTemplate =
  | "standard"
  | "wide"
  | "compact"
  | "magazine"
  | "dashboard";

export const LAYOUT_META: Record<
  LayoutTemplate,
  { label: string; description: string }
> = {
  standard: {
    label: "Standard",
    description: "Default balanced layout — 1200px max width",
  },
  wide: {
    label: "Wide",
    description: "Expansive hero + wider content area — 1400px",
  },
  compact: {
    label: "Compact",
    description: "Dense information display — 1000px, tighter spacing",
  },
  magazine: {
    label: "Magazine",
    description: "Editorial style — asymmetric grids, larger typography",
  },
  dashboard: {
    label: "Dashboard",
    description: "Card-based grid layout — optimal for data display",
  },
};

// --- Seasonal Theme Overrides ---
export interface SeasonalTheme {
  id: string;
  name: string;
  /** MM-DD start (inclusive) */
  startDate: string;
  /** MM-DD end (inclusive) */
  endDate: string;
  /** CSS custom properties to override */
  overrides: Record<string, string>;
}

export const SEASONAL_THEMES: SeasonalTheme[] = [
  {
    id: "new-year",
    name: "New Year Celebration",
    startDate: "12-28",
    endDate: "01-05",
    overrides: {
      "--color-accent": "#D4AF37",
      "--color-accent-light": "#F0D060",
    },
  },
  {
    id: "songkran",
    name: "Songkran Festival",
    startDate: "04-10",
    endDate: "04-17",
    overrides: {
      "--color-accent": "#4FC3F7",
      "--color-accent-light": "#81D4FA",
    },
  },
  {
    id: "national-day",
    name: "Thailand National Day",
    startDate: "12-01",
    endDate: "12-10",
    overrides: {
      "--color-accent": "#E53935",
      "--color-accent-light": "#EF5350",
    },
  },
  {
    id: "investment-week",
    name: "BOI Investment Week",
    startDate: "02-10",
    endDate: "02-16",
    overrides: {
      "--color-accent": "#43A047",
      "--color-accent-light": "#66BB6A",
    },
  },
];

// --- Theme State ---
export interface ThemeState {
  colorMode: ColorMode;
  mood: Mood;
  layout: LayoutTemplate;
}

export const DEFAULT_THEME: ThemeState = {
  colorMode: "system",
  mood: "corporate",
  layout: "standard",
};

// --- Storage Keys ---
export const THEME_STORAGE_KEY = "boi-theme";
export const THEME_COOKIE_KEY = "boi-theme-color-mode";

// --- Utility: Check if a seasonal theme is active ---
export function getActiveSeasonalTheme(): SeasonalTheme | null {
  const now = new Date();
  const monthDay = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  for (const theme of SEASONAL_THEMES) {
    const { startDate, endDate } = theme;
    // Handle year-wrapping (e.g., 12-28 to 01-05)
    if (startDate > endDate) {
      if (monthDay >= startDate || monthDay <= endDate) return theme;
    } else {
      if (monthDay >= startDate && monthDay <= endDate) return theme;
    }
  }
  return null;
}
