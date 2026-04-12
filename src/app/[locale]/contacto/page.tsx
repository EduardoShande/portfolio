"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle, FileText, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contacto/ContactForm";
import CalendlyEmbed from "@/components/contacto/CalendlyEmbed";
import { WHATSAPP_URL } from "@/lib/constants";

export default function ContactoPage() {
  const t = useTranslations("contact");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      {/* Contact Options */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="h-full text-center flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">
                  {t("whatsapp.title")}
                </h3>
                <p className="mt-2 text-sm text-white/50 flex-1">
                  {t("whatsapp.description")}
                </p>
                <div className="mt-6">
                  <Button variant="whatsapp" href={WHATSAPP_URL}>
                    {t("whatsapp.button")}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    {t("form.title")}
                  </h3>
                </div>
                <p className="text-sm text-white/50 mb-6">
                  {t("form.description")}
                </p>
                <ContactForm />
              </Card>
            </motion.div>

            {/* Calendly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    {t("calendly.title")}
                  </h3>
                </div>
                <p className="text-sm text-white/50 mb-6">
                  {t("calendly.description")}
                </p>
                <CalendlyEmbed />
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
