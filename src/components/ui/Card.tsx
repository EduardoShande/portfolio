"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/** Soft rounded panel, matching the listing cards in the real-estate reference. */
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
        "relative rounded-[22px] bg-bg-elevated p-6 lg:p-8",
        hover && "shadow-[0_22px_50px_-32px_rgba(18,23,43,.4)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
