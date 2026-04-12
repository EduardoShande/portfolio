import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-light",
        className
      )}
    >
      {children}
    </span>
  );
}
