"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Container from "@/components/ui/Container";

function AnimatedNumber({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-heading text-4xl font-bold lg:text-5xl">
      {count}
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
    <section className="py-16 border-y border-white/5">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
                <AnimatedNumber target={stat.value} />
              </div>
              <p className="mt-2 text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
