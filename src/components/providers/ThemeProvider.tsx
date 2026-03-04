"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import {
  type ColorMode,
  type Mood,
  type LayoutTemplate,
  type ThemeState,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  getActiveSeasonalTheme,
} from "@/config/themes";

// --- Context ---
interface ThemeContextValue extends ThemeState {
  /** Resolved color mode (never "system" — always "light" or "dark") */
  resolvedColorMode: "light" | "dark";
  /** Active seasonal theme ID, or null */
  seasonalId: string | null;
  setColorMode: (mode: ColorMode) => void;
  setMood: (mood: Mood) => void;
  setLayout: (layout: LayoutTemplate) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

// --- Provider ---
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME);
  const [resolvedColorMode, setResolvedColorMode] = useState<"light" | "dark">(
    "light"
  );
  const [seasonalId, setSeasonalId] = useState<string | null>(null);

  // --- Load persisted theme on mount ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ThemeState>;
        setTheme((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // --- Resolve system color mode ---
  useEffect(() => {
    function resolve() {
      if (theme.colorMode === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setResolvedColorMode(prefersDark ? "dark" : "light");
      } else {
        setResolvedColorMode(theme.colorMode);
      }
    }

    resolve();

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme.colorMode === "system") resolve();
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme.colorMode]);

  // --- Apply data attributes to <html> ---
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", resolvedColorMode);
    html.setAttribute("data-mood", theme.mood);
    html.setAttribute("data-layout", theme.layout);

    // Apply seasonal overrides via inline styles
    const seasonal = getActiveSeasonalTheme();
    setSeasonalId(seasonal?.id ?? null);
    if (seasonal) {
      for (const [prop, value] of Object.entries(seasonal.overrides)) {
        html.style.setProperty(prop, value);
      }
    } else {
      // Clean up any seasonal overrides
      html.style.removeProperty("--color-accent");
      html.style.removeProperty("--color-accent-light");
    }
  }, [resolvedColorMode, theme.mood, theme.layout]);

  // --- Persist to localStorage ---
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  // --- Setters ---
  const setColorMode = useCallback((mode: ColorMode) => {
    setTheme((prev) => ({ ...prev, colorMode: mode }));
  }, []);

  const setMood = useCallback((mood: Mood) => {
    setTheme((prev) => ({ ...prev, mood }));
  }, []);

  const setLayout = useCallback((layout: LayoutTemplate) => {
    setTheme((prev) => ({ ...prev, layout }));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...theme,
      resolvedColorMode,
      seasonalId,
      setColorMode,
      setMood,
      setLayout,
    }),
    [theme, resolvedColorMode, seasonalId, setColorMode, setMood, setLayout]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// --- Inline script to prevent FOUC (Flash of Unstyled Content) ---
// This runs BEFORE React hydrates, so the correct theme is applied instantly.
export function ThemeScript() {
  const script = `
(function(){
  try {
    var s = localStorage.getItem('${THEME_STORAGE_KEY}');
    var t = s ? JSON.parse(s) : {};
    var cm = t.colorMode || 'system';
    var resolved = cm;
    if (cm === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var h = document.documentElement;
    h.setAttribute('data-theme', resolved);
    h.setAttribute('data-mood', t.mood || 'corporate');
    h.setAttribute('data-layout', t.layout || 'standard');
  } catch(e) {}
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
