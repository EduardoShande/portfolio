"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { TrendingUp, Clock, CheckCheck, Briefcase } from "lucide-react";
import Container from "@/components/ui/Container";
import TornEdge from "@/components/ui/TornEdge";
import { toLocale } from "@/lib/content";

/**
 * The navy field the airline reference tears into the middle of its page:
 * a brush edge on top, outlined ghost numerals, a line icon, a vertical rule
 * between each column.
 *
 * Each figure is a claim from the CV with the engagement that produced it
 * named underneath, so the numbers are checkable rather than decorative.
 */
const FIGURES = [
  { id: "loads", value: "50%", Icon: TrendingUp },
  { id: "leads", value: "40%", Icon: Clock },
  { id: "reports", value: "95%", Icon: CheckCheck },
  { id: "years", value: "3+", Icon: Briefcase },
] as const;

export default function StatsBand() {
  const t = useTranslations("home.figures");
  toLocale(useLocale());

  return (
    <>
      <div className="text-band">
        <TornEdge />
      </div>

      <section className="grain relative overflow-hidden bg-band pb-24 pt-6 lg:pb-28">
        <div
          aria-hidden="true"
          className="absolute -left-28 top-0 h-[140%] w-[420px] -rotate-12 bg-accent/10"
        />

        <Container className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 gap-y-11 lg:grid-cols-4 lg:gap-y-0"
          >
            {FIGURES.map(({ id, value, Icon }, i) => (
              <motion.div
                key={id}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                }}
                className={
                  i === 0
                    ? "px-4 lg:px-7"
                    : "border-l border-white/15 px-4 lg:px-7"
                }
              >
                <div className="numeral numeral-ghost text-[62px] text-white lg:text-[78px]">
                  {value}
                </div>
                <Icon
                  strokeWidth={1.4}
                  className="mb-3 mt-5 h-6 w-6 text-accent"
                />
                <p className="text-[13px] leading-[1.6] text-band-muted">
                  <b className="font-semibold text-white">{t(`${id}_title`)}</b>{" "}
                  {t(`${id}_desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
