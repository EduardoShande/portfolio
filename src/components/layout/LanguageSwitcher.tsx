"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "es" | "en") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-[2px] border border-border-theme bg-bg-elevated p-0.5">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => switchLocale("es")}
        className={cn(
          "rounded-[2px] px-3 py-1 text-xs font-medium transition-all cursor-pointer",
          locale === "es"
            ? "bg-accent text-white"
            : "text-fg-muted hover:text-fg"
        )}
      >
        ES
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-[2px] px-3 py-1 text-xs font-medium transition-all cursor-pointer",
          locale === "en"
            ? "bg-accent text-white"
            : "text-fg-muted hover:text-fg"
        )}
      >
        EN
      </motion.button>
    </div>
  );
}
