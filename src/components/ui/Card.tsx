import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-brand-dark p-6 lg:p-8",
        hover &&
          "transition-all duration-300 hover:border-brand-purple/30 hover:shadow-lg hover:shadow-brand-purple/5",
        className
      )}
    >
      {children}
    </div>
  );
}
