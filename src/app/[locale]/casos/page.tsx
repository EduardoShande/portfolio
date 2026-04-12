"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

export default function CasosPage() {
  const t = useTranslations("cases");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      {/* Coming Soon */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-purple/10">
              <Rocket className="h-10 w-10 text-brand-purple" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold">
              {t("coming_soon.title")}
            </h3>
            <p className="mt-3 text-white/60 leading-relaxed">
              {t("coming_soon.description")}
            </p>
            <div className="mt-8">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                {t("coming_soon.cta")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
