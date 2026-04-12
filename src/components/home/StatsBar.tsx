"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Container from "@/components/ui/Container";

function AnimatedNumber({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });
    return controls.stop;
  }, [isInView, target, count]);

  return (
    <span ref={ref} className="font-heading text-4xl font-bold lg:text-5xl">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: 50, label: t("automations") },
    { value: 200, label: t("hours") },
    { value: 10, label: t("clients") },
  ];

  return (
    <section className="py-16 border-y border-border-theme bg-bg-elevated/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                <AnimatedNumber target={stat.value} />
              </div>
              <p className="mt-2 text-sm text-fg-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
