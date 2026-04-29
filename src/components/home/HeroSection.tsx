"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CALENDLY_URL } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Transparent SVG plexus pattern in accent purple — works in both themes
// because the accent color is identical (#7C3AED) in light and dark mode
// and the SVG has no opaque background.
const HERO_IMAGE = "/hero/hero.svg";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll-linked zoom effect
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 4 layers at different depths (farthest → closest)
  // Layer 1: farthest — 10% of cursor speed
  const layer1X = useTransform(smoothX, [-1, 1], [-50, 50]);
  const layer1Y = useTransform(smoothY, [-1, 1], [-50, 50]);
  // Layer 2: mid — 20% of cursor speed
  const layer2X = useTransform(smoothX, [-1, 1], [-100, 100]);
  const layer2Y = useTransform(smoothY, [-1, 1], [-100, 100]);
  // Layer 3: near — 35% of cursor speed
  const layer3X = useTransform(smoothX, [-1, 1], [-175, 175]);
  const layer3Y = useTransform(smoothY, [-1, 1], [-175, 175]);
  // Layer 4: headline — 5% subtle depth movement
  const layer4X = useTransform(smoothX, [-1, 1], [-25, 25]);
  const layer4Y = useTransform(smoothY, [-1, 1], [-25, 25]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isMobile, reducedMotion, mouseX, mouseY]);

  return (
    <div ref={wrapperRef} className="relative h-[130vh]">
      <motion.section
        style={{ scale, opacity }}
        className="sticky top-0 h-screen flex items-center overflow-hidden pt-20 will-change-transform"
      >
        {/* Base gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg to-bg" />
        </div>

        {/* ── Header image: transparent SVG plexus — works in both themes ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="h-full w-full object-cover"
          />
          {/* Soft fade to bg at the bottom so the next section blends in */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
        </div>

        {/* ── LAYER 1: Farthest — background orbs (10% cursor / slow float) ── */}
        <motion.div
          style={isMobile ? undefined : { x: layer1X, y: layer1Y }}
          animate={
            isMobile
              ? { x: [0, 30, 0], y: [0, -20, 0] }
              : undefined
          }
          transition={
            isMobile
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl will-change-transform"
        />
        <motion.div
          style={isMobile ? undefined : { x: layer1X, y: layer1Y }}
          animate={
            isMobile
              ? { x: [0, -25, 0], y: [0, 20, 0] }
              : undefined
          }
          transition={
            isMobile
              ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          className="absolute bottom-1/4 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent-light/10 blur-3xl will-change-transform"
        />

        {/* ── LAYER 2: Mid — floating geometric blobs (20% cursor) ── */}
        <motion.div
          style={isMobile ? undefined : { x: layer2X, y: layer2Y }}
          animate={
            isMobile
              ? { x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }
              : { scale: [1, 1.08, 1] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/10 blur-3xl will-change-transform"
        />
        <motion.div
          style={isMobile ? undefined : { x: layer2X, y: layer2Y }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-24 right-24 h-32 w-32 hidden md:block will-change-transform"
        >
          <div className="h-full w-full border-2 border-accent/20 rotate-45 rounded-2xl" />
        </motion.div>

        {/* ── LAYER 3: Near — foreground decorative elements (35% cursor) ── */}
        <motion.div
          style={isMobile ? undefined : { x: layer3X, y: layer3Y }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-20 h-20 w-20 hidden md:block will-change-transform"
        >
          <div className="h-full w-full border-2 border-accent-light/40 rounded-full" />
        </motion.div>
        <motion.div
          style={isMobile ? undefined : { x: layer3X, y: layer3Y }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 left-1/4 h-16 w-16 hidden md:block will-change-transform"
        >
          <div className="h-full w-full border border-accent/30" />
        </motion.div>

        {/* ── LAYER 4: Closest — headline with subtle 5% movement ── */}
        <Container className="relative z-10">
          <motion.div
            style={isMobile ? undefined : { x: layer4X, y: layer4Y }}
            className="will-change-transform"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div variants={itemVariants}>
                <Badge>{t("badge")}</Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-8 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
              >
                {t("title")}{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  {t("titleHighlight")}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg text-fg-muted max-w-2xl mx-auto sm:text-xl"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="primary" size="lg" href="#simulator">
                  {t("cta_primary")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="lg" href={CALENDLY_URL}>
                  <Calendar className="h-5 w-5" />
                  {t("cta_secondary")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>
    </div>
  );
}
