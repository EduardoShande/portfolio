"use client";

import { useLocale } from "next-intl";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { CalendarClock, Gauge, Timer, Globe2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { STATS, toLocale } from "@/lib/content";

const ICONS = [CalendarClock, Gauge, Timer, Globe2];

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 1.8,
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
 * Dark stat band with sloped edges, icon rules and vertical dividers, the way
 * the airline reference breaks its page with a solid navy field. The `band`
 * token stays near-black in both themes on purpose — it is the anchor the rest
 * of the page is measured against.
 *
 * Every figure traces back to a line in the CV; see STATS in lib/content.ts.
 */
export default function StatsBar() {
  const lang = toLocale(useLocale());

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
          {STATS.map((stat, i) => {
            const Icon = ICONS[i] ?? Gauge;
            return (
              <motion.div
                key={stat.label.en}
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
                  {stat.label[lang]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
