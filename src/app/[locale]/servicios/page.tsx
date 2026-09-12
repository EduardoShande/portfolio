"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Bot,
  Globe,
  Smartphone,
  Database,
  Megaphone,
  Search,
  Code2,
  Check,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const serviceList = [
  { key: "ai_agents", icon: Bot, highlight: true },
  { key: "web_dev", icon: Globe, highlight: false },
  { key: "mobile_apps", icon: Smartphone, highlight: false },
  { key: "crm", icon: Database, highlight: false },
  { key: "meta_ads", icon: Megaphone, highlight: false },
  { key: "digital_marketing", icon: Search, highlight: false },
  { key: "custom_software", icon: Code2, highlight: false },
] as const;

export default function ServiciosPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      {/* Services */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-8"
          >
            {serviceList.map((service) => {
              const Icon = service.icon;
              const deliverables: string[] = t.raw(`${service.key}.deliverables`);
              return (
                <motion.div
                  key={service.key}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "clip-notch border border-border-theme bg-bg-elevated p-8 lg:p-10 transition-colors hover:border-accent/50",
                    service.highlight &&
                      "border-accent/40 bg-gradient-to-br from-accent/10 to-bg-elevated"
                  )}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div
                        className={cn(
                          "flex h-14 w-14 items-center justify-center",
                          service.highlight
                            ? "bg-accent text-white"
                            : "bg-fg/5 text-accent"
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-4 font-heading text-2xl font-bold text-fg">
                        {t(`${service.key}.title`)}
                      </h3>
                      <p className="mt-3 text-fg-muted leading-relaxed">
                        {t(`${service.key}.description`)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                        {t("deliverables_label")}
                      </p>
                      <ul className="space-y-3">
                        {deliverables.map((d, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                            <span className="text-sm text-fg-muted">{d}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contacto"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
                      >
                        {t("request_button")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clip-notch grain relative overflow-hidden bg-band p-10 sm:p-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] sm:text-4xl text-white">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                {t("cta.button")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
