"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-fg-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-12 rounded-full bg-accent",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
