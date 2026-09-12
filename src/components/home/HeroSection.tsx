"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CV_URL, GITHUB_URL, LINKEDIN_URL, EMAIL_URL } from "@/lib/constants";
import { PROFILE, STATS } from "@/lib/content";
import { useLocale } from "next-intl";
import { toLocale } from "@/lib/content";

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

const socials = [
  { href: GITHUB_URL, Icon: GithubIcon, label: "GitHub" },
  { href: LINKEDIN_URL, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: EMAIL_URL, Icon: Mail, label: "Email" },
];

/**
 * Hero built on the real-estate reference: a two-tone headline on a warm
 * off-white ground, beside a large rounded portrait with white info chips
 * overlapping its corners, and a brushed diagonal across the image taken
 * from the industrial reference.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");
  const lang = toLocale(useLocale());

  return (
    <header className="relative overflow-hidden pt-16 lg:pt-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* ── Type ── */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item}>
              <Badge>
                {PROFILE.role[lang]} · {t("location")}
              </Badge>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-[clamp(40px,5.4vw,74px)]"
            >
              {t("headline")}{" "}
              <span className="text-fg-soft">{t("headlineSoft")}</span>{" "}
              {t("headlineEnd")}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-[480px] text-[17px] leading-[1.65] text-fg-muted"
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
              className="mt-12 flex flex-wrap items-end gap-x-11 gap-y-6 border-t border-border-theme pt-7"
            >
              {STATS.slice(0, 3).map((stat) => (
                <div key={stat.label.en}>
                  <b className="numeral block text-[30px] text-fg">
                    {stat.value}
                    {stat.suffix}
                  </b>
                  <small className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                    {stat.label[lang]}
                  </small>
                </div>
              ))}

              <div className="flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-theme text-fg-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* The placeholder sits underneath and the photo covers it. The
                image carries alt="" so that when the file is missing the
                browser renders nothing at all and the placeholder simply
                shows through — no hydration-timing dance, no state. The
                accessible name lives on the container. */}
            <div
              role="img"
              aria-label={PROFILE.name}
              className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-bg-sunken"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_30%_20%,rgba(232,25,75,.22),transparent_60%),radial-gradient(100%_80%_at_80%_90%,rgba(245,166,35,.25),transparent_60%),linear-gradient(150deg,#2A3050,#12172B)] px-6 text-center text-[11px] uppercase leading-loose tracking-[0.18em] text-white/70"
              >
                {t("photo_placeholder")}
                <br />
                photos/eduardo-speaking.jpg
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/eduardo-speaking.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden="true" className="slash pointer-events-none absolute inset-0" />
            </div>

            {/* Floating chips overlapping the card corners */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.55 }}
              className="absolute bottom-[74px] left-3 rounded-2xl bg-bg-elevated px-5 py-4 shadow-[0_20px_50px_-18px_rgba(18,23,43,.45)] lg:-left-7"
            >
              <b className="block font-heading text-[15px] text-fg">
                {t("chip_role")}
              </b>
              <small className="text-[11px] uppercase tracking-[0.08em] text-fg-muted">
                {t("chip_role_meta")}
              </small>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55 }}
              className="absolute right-3 top-14 flex items-center gap-3 rounded-2xl bg-bg-elevated px-5 py-4 shadow-[0_20px_50px_-18px_rgba(18,23,43,.45)] lg:-right-5"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#19C37D] shadow-[0_0_0_4px_rgba(25,195,125,.18)]" />
              <div>
                <b className="block font-heading text-[15px] text-fg">
                  {t("chip_open")}
                </b>
                <small className="text-[11px] uppercase tracking-[0.08em] text-fg-muted">
                  {t("chip_open_meta")}
                </small>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </header>
  );
}
