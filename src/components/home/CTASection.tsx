"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL, CALENDLY_URL } from "@/lib/constants";

export default function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple to-brand-purple/60 p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-purple-light/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                href={WHATSAPP_URL}
              >
                <MessageCircle className="h-5 w-5" />
                {t("whatsapp")}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={CALENDLY_URL}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Calendar className="h-5 w-5" />
                {t("calendar")}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
