"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import TornEdge from "@/components/ui/TornEdge";
import { Link } from "@/i18n/navigation";
import { CV_URL, EMAIL_URL, WHATSAPP_URL } from "@/lib/constants";
import { PROFILE, HEADER_WORK, toLocale } from "@/lib/content";

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Dark editorial header modelled closely on the studio reference.
 *
 * Its composition, which is the whole point of it: the portrait is centred
 * and full height rather than pushed to one side, desaturated so it melts
 * into the dark field instead of sitting on top of it. There is no headline.
 * The content is a numbered index of work down the right, each entry a name
 * over a rule with the nature of the job beneath and its number set out to
 * the edge. A circular button sits at the left, contact details sit bottom
 * left under a short dash, and the social marks sit bottom right.
 *
 * The photograph is prepared by scripts/build-photos.py, which composites
 * the seated portrait onto a wide black canvas through a feathered radial
 * mask. The source is vignetted to a hard circle; feathering it means the
 * image arrives with no boundary of its own, so the overlays here only have
 * to darken the columns the type sits in.
 */
export default function HeroSection() {
  const t = useTranslations("home.hero");
  const lang = toLocale(useLocale());

  return (
    <header className="relative -mt-[72px] bg-band text-white lg:-mt-[76px]">
      <div className="relative min-h-[760px] overflow-hidden lg:min-h-screen">
        {/* ── Portrait, centred and full height ── */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 grid place-items-center px-10 pb-24 text-center text-[11px] uppercase leading-loose tracking-[0.2em] text-white/30">
            {t("photo_placeholder")}
            <br />
            photos/eduardo-hero.jpg
          </div>
          {/* Painted as a background so a missing file reveals the placeholder
              rather than a broken-image marker. */}
          <div
            style={{ backgroundImage: "url('/photos/eduardo-hero.jpg')" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale contrast-[1.08]"
          />
        </div>

        {/* Melt the frame edges into the field, so the photo has no seam */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(62%_66%_at_50%_44%,transparent_0%,rgba(18,23,43,.18)_62%,rgba(18,23,43,.75)_92%,#12172B_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-band via-band/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-band/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-band via-band/60 to-transparent"
        />

        {/* ── Numbered index of work, down the right ── */}
        <Container className="pointer-events-none relative flex min-h-[760px] items-center justify-end pb-48 pt-[120px] lg:min-h-screen lg:pb-32">
          <motion.ol
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } }}
            className="pointer-events-auto w-full max-w-[420px] lg:w-[420px]"
          >
            {HEADER_WORK.map((entry, i) => (
              <motion.li key={entry.id} variants={fade} className="group">
                <Link
                  href="/work"
                  className="block pt-6 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex items-baseline justify-end gap-5">
                    <span
                      className={
                        i === 0
                          ? "font-heading text-[clamp(24px,2.6vw,34px)] font-bold tracking-[-0.02em] text-white"
                          : "font-heading text-[clamp(18px,1.9vw,23px)] font-bold tracking-[-0.02em] text-white/85 transition-colors group-hover:text-white"
                      }
                    >
                      {entry.name}
                    </span>
                    <span className="w-7 shrink-0 text-left text-[11px] font-semibold tracking-[0.1em] text-white/40">
                      0{i + 1}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={
                      i === 0
                        ? "mt-2.5 mr-12 block h-[3px] bg-white"
                        : "mt-2.5 mr-12 block h-px bg-white/25 transition-colors group-hover:bg-accent"
                    }
                  />

                  <span className="mr-12 mt-2.5 block text-[12px] text-white/45">
                    {entry.desc[lang]}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        </Container>

        {/* ── Circular CTA at the left ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <Container>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-band transition-colors group-hover:bg-accent group-hover:text-white">
                <Download className="h-4 w-4" />
              </span>
              <span className="font-heading text-[15px] font-bold leading-tight text-white">
                {t("cta_cv_line1")}
                <br />
                {t("cta_cv_line2")}
              </span>
            </a>
          </Container>
        </motion.div>

        {/* ── Bottom rail: contact left, socials right ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 z-10 pb-9"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
              <div>
                <p className="flex items-center gap-5 text-[13px] font-semibold text-accent">
                  {t("hello")}
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-accent/60"
                  />
                </p>
                <address className="mt-3.5 space-y-1 text-[12px] not-italic leading-relaxed text-white/45">
                  <p>{PROFILE.role[lang]}</p>
                  <p>{PROFILE.location[lang]}</p>
                  <p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {PROFILE.phone}
                    </a>
                    <span aria-hidden="true" className="mx-2 text-white/25">
                      |
                    </span>
                    <a
                      href={EMAIL_URL}
                      className="transition-colors hover:text-accent"
                    >
                      {PROFILE.email}
                    </a>
                  </p>
                </address>
              </div>

              <SocialLinks tone="band" />
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
