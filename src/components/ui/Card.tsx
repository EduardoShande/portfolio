"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Slice a corner off the panel instead of rounding it. */
  notch?: false | "tr" | "bl";
}

export default function Card({
  children,
  className,
  hover = true,
  notch = "tr",
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative border border-border-theme bg-bg-elevated p-6 lg:p-8",
        notch === "tr" && "clip-notch",
        notch === "bl" && "clip-notch-bl",
        hover && "hover:border-accent/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
