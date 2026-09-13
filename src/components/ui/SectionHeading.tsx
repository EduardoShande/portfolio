"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Trailing half, set in the accent. Two-tone headlines are the strongest
   *  device in the real-estate and Web3 references. */
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "band";
  className?: string;
}

export default function SectionHeading({
  title,
  titleAccent,
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 max-w-3xl lg:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2
        className={cn(
          "text-[clamp(30px,3.6vw,50px)]",
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
            "mt-5 text-[17px] leading-relaxed",
            tone === "band" ? "text-white/60" : "text-fg-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
