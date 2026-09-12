import { cn } from "@/lib/utils";

/**
 * Eyebrow label: a short accent rule followed by tracked uppercase text.
 * Used to open every section, the way the industrial reference marks its
 * blocks without a pill or a box.
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
        tone === "band" ? "text-white/55" : "text-fg-muted",
        className
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-[30px] bg-accent" />
      {children}
    </span>
  );
}
