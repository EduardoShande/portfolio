"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Bot,
  Workflow,
  Megaphone,
  Globe,
  MessageSquareMore,
  TrendingUp,
  Check,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const serviceKeys = [
  { key: "ai_agents", icon: Bot, highlight: true },
  { key: "automation", icon: Workflow, highlight: false },
  { key: "meta_ads", icon: Megaphone, highlight: false },
  { key: "web_dev", icon: Globe, highlight: false },
  { key: "chatbots", icon: MessageSquareMore, highlight: false },
  { key: "consulting", icon: TrendingUp, highlight: false },
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
          <div className="space-y-16">
            {serviceKeys.map((service, i) => {
              const Icon = service.icon;
              const features: string[] = t.raw(`${service.key}.features`);
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    className={cn(
                      "lg:p-10",
                      service.highlight &&
                        "border-brand-purple/40 bg-gradient-to-br from-brand-purple/10 to-brand-dark"
                    )}
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      <div>
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-xl",
                            service.highlight
                              ? "bg-brand-purple text-white"
                              : "bg-white/5 text-brand-purple-light"
                          )}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 font-heading text-2xl font-bold">
                          {t(`${service.key}.title`)}
                        </h3>
                        <p className="mt-3 text-white/60 leading-relaxed">
                          {t(`${service.key}.description`)}
                        </p>
                      </div>
                      <div>
                        <ul className="space-y-3">
                          {features.map((feature: string, j: number) => (
                            <li key={j} className="flex items-start gap-3">
                              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-purple" />
                              <span className="text-sm text-white/70">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-brand-purple/20 to-brand-dark border border-brand-purple/20 p-8 sm:p-12 text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="mt-3 text-white/60 max-w-lg mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                {t("cta.button")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
