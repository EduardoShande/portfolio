"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "es"] as const;

/**
 * Two words and a divider. The bordered pill with a filled accent pip this
 * replaces drew more attention than a language toggle deserves; the active
 * locale is simply the one that is not dimmed.
 */
export default function LanguageSwitcher({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-[12px] font-medium">
      {LOCALES.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && (
            <span
              aria-hidden="true"
              className={onDark ? "text-white/25" : "text-fg/25"}
            >
              /
            </span>
          )}
          <button
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              router.replace(pathname as any, { locale: code })
            }
            aria-current={locale === code ? "true" : undefined}
            className={cn(
              "cursor-pointer uppercase tracking-[0.06em] transition-colors",
              locale === code
                ? onDark
                  ? "text-white"
                  : "text-fg"
                : onDark
                  ? "text-white/40 hover:text-white/70"
                  : "text-fg-muted hover:text-fg"
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
