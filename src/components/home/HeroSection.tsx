"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Three depth layers — different parallax intensities
  const orb1X = useTransform(smoothX, [-1, 1], [-40, 40]);
  const orb1Y = useTransform(smoothY, [-1, 1], [-40, 40]);
  const orb2X = useTransform(smoothX, [-1, 1], [25, -25]);
  const orb2Y = useTransform(smoothY, [-1, 1], [25, -25]);
  const orb3X = useTransform(smoothX, [-1, 1], [-15, 15]);
  const orb3Y = useTransform(smoothY, [-1, 1], [-15, 15]);
  const shapeX = useTransform(smoothX, [-1, 1], [-60, 60]);
  const shapeY = useTransform(smoothY, [-1, 1], [-60, 60]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isMobile, mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg to-bg" />
      </div>

      {/* Parallax layered orbs */}
      <motion.div
        style={isMobile ? undefined : { x: orb1X, y: orb1Y }}
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
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl will-change-transform"
      />
      <motion.div
        style={isMobile ? undefined : { x: orb2X, y: orb2Y }}
        animate={
          isMobile
            ? { x: [0, -20, 0], y: [0, 25, 0] }
            : undefined
        }
        transition={
          isMobile
            ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent-light/15 blur-3xl will-change-transform"
      />
      <motion.div
        style={isMobile ? undefined : { x: orb3X, y: orb3Y }}
        animate={
          isMobile
            ? { x: [0, 15, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }
            : { scale: [1, 1.1, 1] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/10 blur-3xl will-change-transform"
      />

      {/* Geometric shape */}
      <motion.div
        style={isMobile ? undefined : { x: shapeX, y: shapeY }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 h-32 w-32 hidden md:block will-change-transform"
      >
        <div className="h-full w-full border-2 border-accent/20 rotate-45 rounded-2xl" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-20 h-20 w-20 hidden md:block will-change-transform"
      >
        <div className="h-full w-full border-2 border-accent-light/30 rounded-full" />
      </motion.div>

      <Container className="relative z-10">
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
      </Container>
    </section>
  );
}
