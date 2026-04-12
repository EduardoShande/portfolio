"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "es" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5">
      <button
        onClick={() => switchLocale("es")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer",
          locale === "es"
            ? "bg-brand-purple text-white"
            : "text-white/50 hover:text-white"
        )}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer",
          locale === "en"
            ? "bg-brand-purple text-white"
            : "text-white/50 hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  );
}
