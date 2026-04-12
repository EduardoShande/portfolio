"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "black" | "deep-purple" | "purple" | "white" | "light-gray";

export const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: "black", label: "Black", color: "#0A0A0A" },
  { id: "deep-purple", label: "Deep Purple", color: "#4C1D95" },
  { id: "purple", label: "Purple", color: "#7C3AED" },
  { id: "light-gray", label: "Light Gray", color: "#F4F4F5" },
  { id: "white", label: "White", color: "#FFFFFF" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "sycosmart-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("black");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.setAttribute("data-theme", "black");
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(next.id);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
