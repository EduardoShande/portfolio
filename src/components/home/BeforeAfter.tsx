"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

/**
 * Three real processes, before and after.
 *
 * The rest of the page says what Eduardo builds and how it is wired; this
 * says what it was worth. Each row is a single engagement from the CV, with
 * the manual version struck through on the left and the automated one on the
 * right, and the measured result pulled out at the end.
 *
 * Every figure here traces to a line in the CV. Nothing is estimated.
 */
const ROWS = ["leads", "reporting", "loads"] as const;

export default function BeforeAfter() {
  const t = useTranslations("home.beforeafter");

  return (
    <section className="bg-bg-sunken py-20 lg:py-24">
      <Container>
        <Badge>{t("eyebrow")}</Badge>
        <h2 className="mt-4 max-w-[620px] text-[clamp(30px,3.6vw,50px)]">
          {t("title")} <span className="text-accent">{t("titleAccent")}</span>
        </h2>
        <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-fg-muted">
          {t("subtitle")}
        </p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-12 space-y-4"
        >
          {ROWS.map((row) => (
            <motion.li
              key={row}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="overflow-hidden rounded-[22px] bg-bg-elevated"
            >
              <div className="grid gap-px bg-border-theme lg:grid-cols-[1fr_auto_1fr_auto]">
                {/* Before */}
                <div className="bg-bg-elevated p-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-soft">
                    {t("before")}
                  </span>
                  <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted line-through decoration-fg-soft/50 decoration-1">
                    {t(`${row}_before`)}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center bg-bg-elevated px-7 py-2 lg:px-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                    <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
                  </span>
                </div>

                {/* After */}
                <div className="bg-bg-elevated p-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    {t("after")}
                  </span>
                  <p className="mt-3 text-[15px] leading-[1.6] text-fg">
                    {t(`${row}_after`)}
                  </p>
                </div>

                {/* Result */}
                <div className="flex flex-col justify-center bg-band p-7 lg:min-w-[190px]">
                  <span className="numeral text-[34px] text-white">
                    {t(`${row}_metric`)}
                  </span>
                  <span className="mt-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-band-muted">
                    {t(`${row}_metric_label`)}
                  </span>
                  <span className="mt-3 border-t border-white/15 pt-2.5 text-[11px] text-white/45">
                    {t(`${row}_where`)}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
