"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Workflow,
  Database,
  Bot,
  Code2,
  Check,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProcessSteps from "@/components/shared/ProcessSteps";
import { Link } from "@/i18n/navigation";
import { CALENDLY_URL } from "@/lib/constants";
import { SERVICES, toLocale } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Workflow> = {
  automation: Workflow,
  data: Database,
  ai: Bot,
  web: Code2,
};

export default function ServicesPage() {
  const t = useTranslations("services");
  const lang = toLocale(useLocale());

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-20 h-[30rem] w-[30rem] -rotate-12 bg-accent/[0.05]"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            titleAccent={t("hero.titleAccent")}
            subtitle={t("hero.subtitle")}
            className="mb-0 lg:mb-0"
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-6"
          >
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.id] ?? Workflow;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative overflow-hidden border border-border-theme bg-bg-elevated p-8 transition-colors hover:border-accent/50 lg:p-10",
                    i % 2 === 0 ? "clip-notch" : "clip-notch-bl"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="numeral absolute right-8 top-5 text-7xl text-fg/[0.05]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2">
                      <Icon strokeWidth={1.5} className="h-8 w-8 text-accent" />
                      <h2 className="mt-6 font-heading text-2xl font-bold tracking-[-0.02em] text-fg lg:text-3xl">
                        {service.title[lang]}
                      </h2>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                        {service.description[lang]}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {t("deliverables_label")}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {service.deliverables[lang].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span className="text-sm leading-relaxed text-fg-muted">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-all hover:gap-3"
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

      <ProcessSteps />

      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="clip-notch grain relative overflow-hidden bg-band p-10 text-center sm:p-16"
          >
            <div
              aria-hidden="true"
              className="hatch absolute inset-0 text-white/[0.04]"
            />
            <div className="relative">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/60">
                {t("cta.subtitle")}
              </p>
              <div className="mt-8 flex justify-center">
                <Button variant="primary" size="lg" href={CALENDLY_URL}>
                  <Calendar className="h-4 w-4" />
                  {t("cta.button")}
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
