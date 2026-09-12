"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";

/**
 * Names of the organisations whose systems he built, set as a quiet strip —
 * the same move as the partner-logo row in the industrial reference. Text
 * rather than logos, because these are employers and clients, not sponsors.
 */
const ORGS = [
  "CarSans",
  "Group Quimera",
  "Gerona SVF",
  "US e-commerce",
  "US home automation",
];

export default function ClientStrip() {
  const t = useTranslations("home.clients");

  return (
    <section className="pb-2 pt-16 text-center lg:pt-20">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
          {t("label")}
        </p>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-7 flex flex-wrap justify-center gap-x-14 gap-y-5"
        >
          {ORGS.map((org) => (
            <motion.li
              key={org}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="font-heading text-xl font-semibold tracking-[-0.01em] text-fg-soft transition-colors hover:text-fg"
            >
              {org}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
