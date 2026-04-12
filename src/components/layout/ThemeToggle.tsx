"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Check } from "lucide-react";
import { useTheme, THEMES, type Theme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        className="flex items-center gap-2 rounded-full border border-border-theme bg-bg-elevated px-3 py-1.5 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Palette className="h-4 w-4 text-accent-light" />
        </motion.div>
        <div
          className="h-3 w-3 rounded-full border border-border-theme"
          style={{ backgroundColor: THEMES.find((t) => t.id === theme)?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border-theme bg-bg-elevated shadow-2xl"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Theme
                </p>
                {THEMES.map((t, i) => (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ x: 4 }}
                    onClick={() => handleSelect(t.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
                      theme === t.id ? "bg-accent/10" : "hover:bg-fg/5"
                    )}
                  >
                    <div
                      className="h-4 w-4 rounded-full border border-border-theme"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="flex-1 text-left text-fg">{t.label}</span>
                    {theme === t.id && (
                      <Check className="h-4 w-4 text-accent-light" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
