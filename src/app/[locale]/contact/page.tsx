"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  MessageCircle,
  Calendar,
  Clock,
  Gift,
  Shield,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contacto/ContactForm";
import BookingPicker from "@/components/contacto/BookingPicker";
import {
  WHATSAPP_URL,
  WHATSAPP_NUMBER,
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/constants";
import { PROFILE } from "@/lib/content";

const valueProps = [
  { icon: Clock, key: "response_time" },
  { icon: Gift, key: "free_consultation" },
  { icon: Shield, key: "no_commitment" },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Headline + Value Props + Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg lg:text-5xl">
                {t("hero.title")}{" "}
                <span className="text-accent">{t("hero.titleAccent")}</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">
                {t("hero.subtitle")}
              </p>

              {/* Value props */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                }}
                className="mt-10 space-y-5"
              >
                {valueProps.map((vp) => {
                  const Icon = vp.icon;
                  return (
                    <motion.div
                      key={vp.key}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-fg">
                          {t(`value_props.${vp.key}`)}
                        </p>
                        <p className="text-sm text-fg-muted">
                          {t(`value_props.${vp.key}_desc`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Contact methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 rounded-[22px] border border-border-theme bg-bg-elevated p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
                  {t("direct_contact")}
                </p>
                <div className="space-y-3">
                  <a
                    href={EMAIL_URL}
                    className="flex items-center gap-3 text-sm text-fg transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    {PROFILE.email}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-fg transition-colors hover:text-whatsapp"
                  >
                    <MessageCircle className="h-4 w-4 text-whatsapp" />
                    +{WHATSAPP_NUMBER}
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-fg transition-colors hover:text-accent"
                  >
                    <GithubIcon className="h-4 w-4 text-accent" />
                    github.com/EduardoShande
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-fg transition-colors hover:text-accent"
                  >
                    <LinkedinIcon className="h-4 w-4 text-accent" />
                    LinkedIn
                  </a>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="whatsapp" size="sm" href={WHATSAPP_URL}>
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="ghost" size="sm" href="#book">
                    <Calendar className="h-4 w-4" />
                    {t("book_call")}
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[22px] border border-border-theme bg-bg-elevated p-8 lg:p-10"
            >
              <h2 className="font-heading text-2xl font-bold text-fg">
                {t("form.title")}
              </h2>
              <p className="mt-2 text-sm text-fg-muted mb-8">
                {t("form.description")}
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Booking request, sent through WhatsApp */}
      <section id="book" className="scroll-mt-24 pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[22px] border border-border-theme bg-bg-elevated p-6 lg:p-10"
          >
            <div className="mb-8 max-w-[560px]">
              <h2 className="font-heading text-2xl font-bold text-fg lg:text-3xl">
                {t("booking.title")}
              </h2>
              <p className="mt-2 text-fg-muted">{t("booking.description")}</p>
            </div>
            <BookingPicker />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
