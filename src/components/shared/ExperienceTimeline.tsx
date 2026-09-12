"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXPERIENCE, toLocale } from "@/lib/content";

/**
 * Career as a zig-zag rail, the same device as the ribbon infographic
 * reference: odd roles left, even roles right, a spine running between them.
 *
 * On mobile it collapses to a single left rail, a zig-zag has nowhere to go
 * at 375px.
 */
export default function ExperienceTimeline({
  currentLabel,
  compact = false,
}: {
  currentLabel: string;
  /** Hide the bullet lists and show only the summary line. */
  compact?: boolean;
}) {
  const lang = toLocale(useLocale());

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[1.4rem] top-8 w-px bg-border-theme lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="space-y-12 lg:space-y-0">
        {EXPERIENCE.map((job, i) => {
          const isRight = i % 2 === 1;

          return (
            <li key={job.id} className="relative lg:min-h-[16rem]">
              <motion.div
                initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative pl-16 lg:w-1/2 lg:pl-0",
                  isRight
                    ? "lg:ml-auto lg:pl-16 lg:text-left"
                    : "lg:pr-16 lg:text-right"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-2 flex h-11 w-11 items-center justify-center border bg-bg lg:top-4",
                    job.current
                      ? "border-accent bg-accent text-white"
                      : "border-accent text-accent",
                    isRight
                      ? "lg:-left-[1.4rem]"
                      : "lg:left-auto lg:-right-[1.4rem]"
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                </span>

                <div
                  className={cn(
                    "border border-border-theme bg-bg-elevated p-7 lg:p-8",
                    isRight ? "rounded-[22px]" : "rounded-[22px]"
                  )}
                >
                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-3",
                      !isRight && "lg:justify-end"
                    )}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {job.period[lang]}
                    </span>
                    {job.current && (
                      <span className="bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        {currentLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold leading-tight tracking-[-0.02em] text-fg lg:text-2xl">
                    {job.role[lang]}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-fg-muted">
                    {job.company}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-fg-muted">
                    {job.summary[lang]}
                  </p>

                  {!compact && (
                    <ul
                      className={cn(
                        "mt-5 space-y-2.5 border-t border-border-theme pt-5",
                        !isRight && "lg:text-right"
                      )}
                    >
                      {job.highlights[lang].map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted",
                            !isRight && "lg:flex-row-reverse lg:text-right"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul
                    className={cn(
                      "mt-6 flex flex-wrap gap-2",
                      !isRight && "lg:justify-end"
                    )}
                  >
                    {job.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-border-theme px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
