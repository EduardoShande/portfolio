"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-border-theme bg-bg-elevated p-6 lg:p-8",
        hover && "hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
