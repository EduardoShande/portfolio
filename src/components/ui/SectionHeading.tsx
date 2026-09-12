"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeadingProps {
  /** Leading half of the headline — rendered in the base text colour. */
  title: string;
  /** Trailing half — rendered in the accent. Two-tone headlines are the
   *  single strongest device in the Web3 and real-estate references. */
  titleAccent?: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "band";
  className?: string;
}

export default function SectionHeading({
  title,
  titleAccent,
  eyebrow,
  subtitle,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12 lg:mb-16 max-w-3xl",
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("mb-6", align === "center" && "flex justify-center")}>
          <Badge tone={tone}>{eyebrow}</Badge>
        </div>
      )}

      <h2
        className={cn(
          "font-heading text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl",
          tone === "band" ? "text-white" : "text-fg"
        )}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-accent">{titleAccent}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed",
            tone === "band" ? "text-white/60" : "text-fg-muted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
