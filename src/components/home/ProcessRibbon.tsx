"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

/**
 * The four-step process, carrying the ribbon infographic's own palette 
 * terracotta, mauve, charcoal, red, on the numerals, so the sequence reads
 * as one flowing run rather than four identical boxes.
 */
const STEPS = [
  { id: "diagnose", color: "#E8A08C" },
  { id: "design", color: "#7E7791" },
  { id: "build", color: "#4A4655" },
  { id: "tune", color: "#E8194B" },
] as const;

export default function ProcessRibbon() {
  const t = useTranslations("home.process");

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <Badge>{t("eyebrow")}</Badge>
        <h2 className="mt-4 max-w-[560px] text-[clamp(30px,3.6vw,50px)]">
          {t("title")} <span className="text-accent">{t("titleAccent")}</span>
        </h2>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-12 grid gap-x-14 md:grid-cols-2"
        >
          {STEPS.map((step, i) => (
            <motion.li
              key={step.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="flex items-start gap-6 py-7"
            >
              <span
                aria-hidden="true"
                className="numeral shrink-0 text-[56px]"
                style={{ color: step.color }}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="text-xl">{t(`${step.id}_title`)}</h3>
                <p className="mt-2 max-w-[330px] text-sm leading-[1.7] text-fg-muted">
                  {t(`${step.id}_desc`)}
                </p>
                <span className="mt-3 inline-block border-t border-accent/30 pt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {t(`${step.id}_when`)}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
