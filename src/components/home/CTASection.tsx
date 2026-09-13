"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle, Calendar, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL, BOOKING_HREF, EMAIL_URL } from "@/lib/constants";

/**
 * Closing block with an oversized hollow word behind the question, the way
 * the airline reference sets "CONTACT US" huge and faint behind its actual
 * call to action.
 */
export default function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="relative overflow-hidden bg-bg-sunken py-28 text-center lg:py-32">
      <span
        aria-hidden="true"
        className="numeral numeral-ghost pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(90px,19vw,250px)] text-fg"
      >
        {t("ghost")}
      </span>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mx-auto max-w-[760px] text-[clamp(30px,4vw,54px)]">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.65] text-fg-muted">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button variant="primary" size="lg" href={BOOKING_HREF}>
              <Calendar className="h-4 w-4" />
              {t("calendar")}
            </Button>
            <Button variant="ghost" size="lg" href={WHATSAPP_URL}>
              <MessageCircle className="h-4 w-4" />
              {t("whatsapp")}
            </Button>
          </div>

          <a
            href={EMAIL_URL}
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" />
            {t("email")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
