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
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const services = [
  { key: "ai_agents", icon: Bot, highlight: true },
  { key: "automation", icon: Workflow, highlight: false },
  { key: "meta_ads", icon: Megaphone, highlight: false },
  { key: "web_dev", icon: Globe, highlight: false },
  { key: "chatbots", icon: MessageSquareMore, highlight: false },
  { key: "consulting", icon: TrendingUp, highlight: false },
] as const;

export default function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card
                  className={cn(
                    "h-full",
                    service.highlight &&
                      "border-brand-purple/40 bg-gradient-to-br from-brand-purple/10 to-brand-dark"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      service.highlight
                        ? "bg-brand-purple text-white"
                        : "bg-white/5 text-brand-purple-light"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold font-heading">
                    {t(service.key)}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    {t(`${service.key}_desc`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" href="/servicios">
            {t("view_all")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
