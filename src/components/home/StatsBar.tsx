"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Workflow, Clock, Users, Gauge } from "lucide-react";
import Container from "@/components/ui/Container";

function AnimatedNumber({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) {
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
    <span ref={ref} className="numeral text-5xl text-white lg:text-6xl">
      {displayValue}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/**
 * Dark stat band with sloped edges, icon rules and vertical dividers, the
 * way the airline reference breaks its page with a solid navy field. The
 * band token stays near-black in both themes on purpose: it is the anchor
 * the rest of the page is measured against.
 */
export default function StatsBar() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: 50, suffix: "+", label: t("automations"), icon: Workflow },
    { value: 200, suffix: "+", label: t("hours"), icon: Clock },
    { value: 10, suffix: "+", label: t("clients"), icon: Users },
    { value: 99, suffix: "%", label: t("uptime"), icon: Gauge },
  ];

  return (
    <section className="clip-angle-both grain relative bg-band py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="hatch absolute inset-0 text-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-20 top-0 h-full w-[28rem] -rotate-12 bg-accent/[0.07]"
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className={
                  i === 0
                    ? "px-4 lg:px-8"
                    : "border-l border-white/10 px-4 lg:px-8"
                }
              >
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <div className="mt-5">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 max-w-[12rem] text-[11px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-band-muted">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
