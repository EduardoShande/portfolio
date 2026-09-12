import { cn } from "@/lib/utils";

/**
 * Eyebrow label — a squared tag with a leading accent rule, the way the
 * industrial reference marks each section rather than a rounded pill.
 */
export default function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "band";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "band" ? "text-white/70" : "text-fg-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-px w-8 bg-accent"
      />
      {children}
    </span>
  );
}
