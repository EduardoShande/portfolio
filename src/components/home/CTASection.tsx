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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent/60 p-8 sm:p-12 lg:p-16 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl will-change-transform"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-light/30 blur-3xl will-change-transform"
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-lg text-white/85 max-w-xl mx-auto"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                <MessageCircle className="h-5 w-5" />
                {t("whatsapp")}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={CALENDLY_URL}
                className="border-white/40 text-white hover:bg-white/10"
              >
                <Calendar className="h-5 w-5" />
                {t("calendar")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
