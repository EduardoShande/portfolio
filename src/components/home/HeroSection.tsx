"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowRight, Calendar, Zap, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CALENDLY_URL } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const HERO_IMAGE = "/hero/hero.svg";

/**
 * Split hero: type on the left, a canted visual panel on the right, and a
 * sloped bottom edge that hands off into the ticker. The centred-gradient
 * layout it replaces was symmetrical in a way none of the references are.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Depth layers: far background drifts least, foreground chips drift most.
  // Ranges are deliberately small for the mid/near layers — unlike the
  // decorative blobs this replaced, those layers carry real content, so a
  // large travel pushes the panel past the section edge and gets clipped.
  const farX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const farY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const midX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const midY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const nearX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const nearY = useTransform(smoothY, [-1, 1], [-24, 24]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isMobile, reducedMotion, mouseX, mouseY]);

  const still = isMobile || reducedMotion;

  const floatingStats = [
    { value: "24/7", label: t("stat_uptime"), icon: Clock },
    { value: "-70%", label: t("stat_time"), icon: Zap },
  ];

  return (
    <section className="relative grain clip-angle-b overflow-hidden bg-bg pt-28 pb-24 lg:pt-36 lg:pb-40">
      {/* Canted steel bands, borrowed from the industrial reference */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[160%] w-[42rem] -rotate-12 bg-bg-elevated/60" />
        <div className="absolute left-[8%] top-0 h-[160%] w-40 -rotate-12 bg-fg/[0.03]" />
        <div className="absolute right-[-6rem] top-0 h-[160%] w-[30rem] -rotate-12 bg-accent/[0.06]" />
      </div>

      {/* Plexus field, drifting slowly behind everything */}
      <motion.div
        aria-hidden="true"
        style={still ? undefined : { x: farX, y: farY }}
        className="absolute inset-0 opacity-50 will-change-transform"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Type column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={itemVariants}>
              <Badge>{t("badge")}</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 font-heading text-[2.75rem] font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              {t("title")}{" "}
              <span className="relative inline-block text-accent">
                {t("titleHighlight")}
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-1 left-0 h-1.5 w-full origin-left bg-accent"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button variant="primary" size="lg" href="#simulator">
                {t("cta_primary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" href={CALENDLY_URL}>
                <Calendar className="h-4 w-4" />
                {t("cta_secondary")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual column */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={still ? undefined : { x: midX, y: midY }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm will-change-transform"
            >
              {/* Solid accent plate sitting behind the panel */}
              <div className="clip-notch absolute inset-0 translate-x-4 translate-y-4 bg-accent" />

              {/* Foreground panel */}
              <div className="clip-notch relative h-full w-full border border-border-theme bg-band p-7">
                <div
                  aria-hidden="true"
                  className="hatch absolute inset-0 text-white/[0.06]"
                />

                {/* Label sits top-right and the caption is held to 70% width
                    so the floating chips, which deliberately overlap the
                    panel, never land on top of readable text. */}
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-end gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {t("panel_label")}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <span className="numeral block text-[7rem] leading-none text-white/10">
                      AI
                    </span>
                    <p className="mt-4 max-w-[70%] border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
                      {t("panel_caption")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating stat chips: the Web3 reference headline device */}
            <motion.div
              style={still ? undefined : { x: nearX, y: nearY }}
              className="pointer-events-none absolute inset-0 will-change-transform"
            >
              {floatingStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
                    className={
                      i === 0
                        ? "absolute left-0 top-12 sm:left-4 lg:-left-6"
                        : "absolute bottom-1/3 right-0 sm:right-4 lg:-right-6"
                    }
                  >
                    <div className="clip-notch border border-border-theme bg-bg-elevated/90 px-4 py-3 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-accent">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="numeral text-xl">{stat.value}</span>
                      </div>
                      <p className="mt-1 max-w-[9rem] text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-fg-muted">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
