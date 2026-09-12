"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle, Calendar, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WHATSAPP_URL, CALENDLY_URL, EMAIL_URL } from "@/lib/constants";

/**
 * Full-bleed closing band with a sloped top edge and an oversized ghost word
 * behind the headline, the way the airline reference closes its page with
 * "CONTACT US" set huge and faint behind the actual question.
 */
export default function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="clip-angle-t grain relative overflow-hidden bg-band py-28 lg:py-40">
      <div
        aria-hidden="true"
        className="hatch absolute inset-0 text-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-full w-[36rem] -rotate-12 bg-accent/[0.09]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] -rotate-12 bg-white/[0.02]"
      />

      <span
        aria-hidden="true"
        className="numeral numeral-ghost pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[18vw] text-white lg:text-[12rem]"
      >
        {t("ghost")}
      </span>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex justify-center">
            <Badge tone="band">{t("eyebrow")}</Badge>
          </div>

          <h2 className="mt-8 font-heading text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            {t("subtitle")}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
              <MessageCircle className="h-4 w-4" />
              {t("whatsapp")}
            </Button>
            <Button variant="band" size="lg" href={CALENDLY_URL}>
              <Calendar className="h-4 w-4" />
              {t("calendar")}
            </Button>
          </div>

          <a
            href={EMAIL_URL}
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" />
            {t("email")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
