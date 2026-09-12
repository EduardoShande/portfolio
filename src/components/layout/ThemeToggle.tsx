"use client";

import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/** A bare icon. The bordered accent-coloured button it replaces read as a
 *  primary action, which a theme switch is not. */
export default function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className={cn(
        "relative flex h-5 w-5 cursor-pointer items-center justify-center transition-colors",
        onDark ? "text-white/55 hover:text-white" : "text-fg-muted hover:text-fg"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Moon className="h-[17px] w-[17px]" />
          ) : (
            <Sun className="h-[17px] w-[17px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
