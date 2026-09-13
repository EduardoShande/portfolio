"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Search, PenTool, Rocket, LineChart } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const steps = [
  { key: "discovery", icon: Search },
  { key: "design", icon: PenTool },
  { key: "build", icon: Rocket },
  { key: "scale", icon: LineChart },
] as const;

/**
 * The ribbon infographic, rebuilt as real layout rather than an illustration.
 *
 * Odd steps sit left, even steps sit right, and a connector runs down the
 * centre between them, so the eye zig-zags exactly the way it does in the
 * reference. On mobile the whole thing collapses to a single rail on the
 * left, since a zig-zag has nowhere to go at 375px.
 */
export default function ProcessSteps() {
  const t = useTranslations("services.process");

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] -rotate-12 bg-accent/[0.04]"
      />

      <Container className="relative">
        <SectionHeading
          title={t("title")}
          titleAccent={t("titleAccent")}
          subtitle={t("subtitle")}
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Spine: full height on desktop (centre), left rail on mobile */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[1.4rem] top-8 w-px bg-border-theme lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              const number = String(i + 1).padStart(2, "0");

              return (
                <li key={step.key} className="relative lg:min-h-[15rem]">
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
                    {/* Node on the spine */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-2 flex h-11 w-11 items-center justify-center border border-accent bg-bg text-accent lg:top-4",
                        isRight
                          ? "lg:-left-[1.4rem]"
                          : "lg:left-auto lg:-right-[1.4rem]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div
                      className={cn(
                        "rounded-[22px] border border-border-theme bg-bg-elevated p-7 lg:p-8",
                        isRight && "rounded-[22px]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-baseline gap-4",
                          !isRight && "lg:flex-row-reverse"
                        )}
                      >
                        <span className="numeral numeral-ghost text-5xl text-accent lg:text-6xl">
                          {number}
                        </span>
                        <h3 className="font-heading text-xl font-bold tracking-tight text-fg lg:text-2xl">
                          {t(`${step.key}_title`)}
                        </h3>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-base">
                        {t(`${step.key}_desc`)}
                      </p>

                      <p className="mt-5 border-t border-border-theme pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                        {t(`${step.key}_meta`)}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
