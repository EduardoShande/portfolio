"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  CV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  EMAIL_URL,
} from "@/lib/constants";
import { PROFILE, toLocale } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
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

const socials = [
  { href: GITHUB_URL, Icon: GithubIcon, label: "GitHub" },
  { href: LINKEDIN_URL, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: EMAIL_URL, Icon: Mail, label: "Email" },
];

/**
 * Split hero: the person on the left, a canted "right now" card on the right,
 * sloped bottom edge handing off into the ticker.
 *
 * Two CTAs on purpose — the site serves a hiring manager and a paying client,
 * and they want different things in the first five seconds. "See my work"
 * leads because it serves both.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");
  const lang = toLocale(useLocale());
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Small travel on the layers carrying real content, larger on the backdrop.
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

  const chips = [
    { value: "3+", label: t("chip_years") },
    { value: "−50%", label: t("chip_impact") },
  ];

  return (
    <section className="relative grain clip-angle-b overflow-hidden bg-bg pt-28 pb-24 lg:pt-36 lg:pb-40">
      {/* Canted steel bands, from the industrial reference */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[160%] w-[42rem] -rotate-12 bg-bg-elevated/60" />
        <div className="absolute left-[8%] top-0 h-[160%] w-40 -rotate-12 bg-fg/[0.03]" />
        <div className="absolute right-[-6rem] top-0 h-[160%] w-[30rem] -rotate-12 bg-accent/[0.06]" />
      </div>

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
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t("available")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                <MapPin className="h-3 w-3 text-accent" />
                Santa Cruz, Bolivia
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-7 font-heading text-sm font-semibold uppercase tracking-[0.22em] text-accent"
            >
              {PROFILE.name}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-4 font-heading text-[2.5rem] font-bold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            >
              {t("headline")}{" "}
              <span className="relative inline-block text-accent">
                {t("headlineAccent")}
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
              </span>{" "}
              {t("headlineEnd")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button variant="primary" size="lg" href="/work">
                {t("cta_work")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" href={CV_URL} external>
                <Download className="h-4 w-4" />
                {t("cta_cv")}
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-2"
            >
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-border-theme text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
              <div className="clip-notch absolute inset-0 translate-x-4 translate-y-4 bg-accent" />

              <div className="clip-notch relative h-full w-full border border-border-theme bg-band p-7">
                <div
                  aria-hidden="true"
                  className="hatch absolute inset-0 text-white/[0.06]"
                />

                {/* Label top-right and caption held to 70% width so the
                    floating chips never land on readable text. */}
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-end gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {t("panel_label")}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <span className="numeral block text-[6.5rem] leading-none text-white/10">
                      {PROFILE.initials}
                    </span>
                    <p className="mt-4 max-w-[70%] border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
                      {t("panel_caption")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={still ? undefined : { x: nearX, y: nearY }}
              className="pointer-events-none absolute inset-0 will-change-transform"
            >
              {chips.map((chip, i) => (
                <motion.div
                  key={chip.label}
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
                    <span className="numeral text-xl text-accent">
                      {chip.value}
                    </span>
                    <p className="mt-1 max-w-[9rem] text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-fg-muted">
                      {chip.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
