"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Download, MapPin, ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import { CV_URL } from "@/lib/constants";
import { PROFILE, STATS, toLocale } from "@/lib/content";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Full-bleed split header.
 *
 * The portrait is no longer a card floating inside the grid: it is a navy
 * panel running off the right edge of the screen, the way the airline
 * reference lets its aircraft photograph break the page boundary. Type sits
 * on the light half; the panel carries the image, the current-role chip and
 * the scroll cue.
 *
 * A thin status rail above the fold states availability and location before
 * the headline is read, which is the first thing both a hiring manager and a
 * client want to know.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");
  const lang = toLocale(useLocale());

  return (
    <header className="relative">
      {/* Status rail */}
      <div className="border-b border-border-theme bg-bg-sunken/60">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
            <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("available")}
            </span>
            <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-accent" />
                {t("location")}
              </span>
              <span className="hidden sm:inline">{t("timezone")}</span>
            </span>
          </div>
        </Container>
      </div>

      <div className="relative lg:grid lg:grid-cols-[1fr_minmax(0,46%)]">
        {/* Type half */}
        <div className="relative z-10 pb-14 pt-14 lg:pb-24 lg:pt-20">
          <Container className="lg:ml-auto lg:mr-0 lg:max-w-[700px] lg:pr-14">
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.p
                variants={item}
                className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent"
              >
                {PROFILE.name}
              </motion.p>

              <motion.h1
                variants={item}
                className="mt-5 text-[clamp(38px,5vw,68px)]"
              >
                {t("headline")}{" "}
                <span className="text-fg-soft">{t("headlineSoft")}</span>{" "}
                {t("headlineEnd")}
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-6 max-w-[520px] text-[17px] leading-[1.65] text-fg-muted"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
                <Button variant="primary" size="lg" href="/work">
                  {t("cta_work")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="ghost" size="lg" href={CV_URL} external>
                  <Download className="h-4 w-4" />
                  {t("cta_cv")}
                </Button>
              </motion.div>

              <motion.div
                variants={item}
                className="mt-11 grid grid-cols-3 gap-6 border-t border-border-theme pt-7"
              >
                {STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label.en}>
                    <b className="numeral block text-[clamp(26px,3vw,34px)] text-fg">
                      {stat.value}
                      {stat.suffix}
                    </b>
                    <small className="mt-1.5 block text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-fg-muted">
                      {stat.label[lang]}
                    </small>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={item} className="mt-8">
                <SocialLinks />
              </motion.div>
            </motion.div>
          </Container>
        </div>

        {/* Portrait half, bleeding off the right edge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[440px] overflow-hidden bg-band lg:min-h-full"
        >
          {/* The placeholder sits underneath and the photo paints over it. */}
          <div role="img" aria-label={PROFILE.name} className="absolute inset-0">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_30%_20%,rgba(232,25,75,.25),transparent_60%),radial-gradient(100%_80%_at_80%_90%,rgba(245,166,35,.22),transparent_60%)] px-8 text-center text-[11px] uppercase leading-loose tracking-[0.18em] text-white/60"
            >
              {t("photo_placeholder")}
              <br />
              photos/eduardo-speaking.jpg
            </div>

            {/* Painted as a background rather than an <img>: a missing file
                then renders nothing at all, with no broken-image marker to
                clean up, and the placeholder underneath simply shows. */}
            <div
              aria-hidden="true"
              style={{ backgroundImage: "url('/photos/eduardo-speaking.jpg')" }}
              className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            />
          </div>

          <div
            aria-hidden="true"
            className="slash pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-band/90 via-transparent to-transparent"
          />

          {/* Current role, anchored to the panel rather than floating loose */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-7 left-7 right-7 flex flex-wrap items-end justify-between gap-4"
          >
            <div className="rounded-2xl bg-bg-elevated/95 px-5 py-4 backdrop-blur-sm">
              <b className="block font-heading text-[15px] text-fg">
                {t("chip_role")}
              </b>
              <small className="text-[11px] uppercase tracking-[0.08em] text-fg-muted">
                {t("chip_role_meta")}
              </small>
            </div>

            <a
              href="#work"
              aria-label={t("scroll")}
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-accent hover:bg-accent sm:flex"
            >
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
