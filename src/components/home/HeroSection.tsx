"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Download, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import TornEdge from "@/components/ui/TornEdge";
import { Link } from "@/i18n/navigation";
import { CV_URL } from "@/lib/constants";
import { PROFILE } from "@/lib/content";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Dark editorial header, built on the fashion reference.
 *
 * Its devices, in order of how much they carry: a near-black field with the
 * subject shot full height and dominant on the right; a heavy uppercase
 * headline stacked at the left whose first line is hollow and whose
 * remaining lines are solid, with the hollow line running across the photo;
 * a rotated label pinned to the right edge; two small marked callouts along
 * the bottom; and a signature in the opposite corner.
 *
 * It is the only dark section on a light site, which is deliberate: it tears
 * into the page through the same brush edge the stat band uses, so the
 * contrast reads as structure rather than accident.
 *
 * The photograph is not a cut-out, so the composition does the separating
 * instead: a vignette pulls the frame edges down, and a left-to-right wash
 * keeps the type side clean no matter what is behind him.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");

  const callouts = [
    { title: t("callout_roles"), desc: t("callout_roles_desc") },
    { title: t("callout_projects"), desc: t("callout_projects_desc") },
  ];

  return (
    <header className="relative -mt-[72px] bg-band text-white lg:-mt-[76px]">
      <div className="relative min-h-[732px] overflow-hidden lg:min-h-screen">
        {/* ── Photograph ── */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full lg:w-[58%]"
        >
          <div className="absolute inset-0 grid place-items-center px-10 text-center text-[11px] uppercase leading-loose tracking-[0.2em] text-white/35">
            {t("photo_placeholder")}
            <br />
            photos/eduardo-speaking.jpg
          </div>
          {/* Painted as a background so a missing file reveals the placeholder
              rather than a broken-image marker. */}
          <div
            style={{ backgroundImage: "url('/photos/eduardo-speaking.jpg')" }}
            className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
          />
        </div>

        {/* Separation, since the subject is not cut out of its background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(80%_70%_at_62%_45%,transparent_0%,rgba(10,13,24,.55)_72%,rgba(10,13,24,.95)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-band via-band/85 to-transparent lg:via-band/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-band to-transparent"
        />

        {/* ── Type ── */}
        <Container className="relative flex min-h-[732px] flex-col justify-center pb-36 pt-[128px] lg:min-h-screen lg:pb-40 lg:pt-[140px]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[820px]"
          >
            <motion.p
              variants={item}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent"
            >
              {PROFILE.name}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 font-heading text-[clamp(38px,6vw,78px)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]"
            >
              {/* Hollow first line, carried across the photograph */}
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.85)" }}
              >
                {t("headline_outline")}
              </span>
              <span className="block text-white">{t("headline_solid1")}</span>
              <span className="block text-white">{t("headline_solid2")}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-[440px] text-[16px] leading-[1.7] text-white/65"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
              <Button variant="primary" size="lg" href="/work">
                {t("cta_work")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="band" size="lg" href={CV_URL} external>
                <Download className="h-4 w-4" />
                {t("cta_cv")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* ── Rotated edge label ── */}
        <Link
          href="/contact"
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center text-[11px] font-semibold uppercase tracking-[0.34em] text-white/55 transition-colors hover:text-accent lg:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          {t("edge_label")}
        </Link>

        {/* ── Bottom rail: callouts, socials, signature ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 z-10 pb-9"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
              <div className="flex flex-wrap gap-x-14 gap-y-6">
                {callouts.map((c) => (
                  <div key={c.title} className="max-w-[210px]">
                    <X
                      aria-hidden="true"
                      strokeWidth={3}
                      className="h-3.5 w-3.5 text-white"
                    />
                    <p className="mt-3 text-[13px] font-semibold text-white">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-white/45">
                      {c.desc}
                    </p>
                  </div>
                ))}

                <div>
                  <SocialLinks tone="band" />
                </div>
              </div>

              <span className="font-heading text-[clamp(18px,2vw,26px)] font-semibold uppercase tracking-[0.02em] text-white/75">
                {PROFILE.studio}
              </span>
            </div>
          </Container>
        </motion.div>
      </div>

      {/* Tear out of the dark header into the light page */}
      <div className="rotate-180 text-bg">
        <TornEdge />
      </div>
    </header>
  );
}
