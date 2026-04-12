"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Bot,
  Workflow,
  Megaphone,
  Globe,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const services = [
  { key: "ai_agents", icon: Bot, highlight: true },
  { key: "automation", icon: Workflow, highlight: false },
  { key: "meta_ads", icon: Megaphone, highlight: false },
  { key: "web_dev", icon: Globe, highlight: false },
  { key: "mobile_apps", icon: Smartphone, highlight: false },
  { key: "consulting", icon: TrendingUp, highlight: false },
] as const;

export default function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "rounded-2xl border border-border-theme bg-bg-elevated p-6 lg:p-8 transition-colors hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
                  service.highlight &&
                    "border-accent/40 bg-gradient-to-br from-accent/10 to-bg-elevated"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    service.highlight
                      ? "bg-accent text-white"
                      : "bg-fg/5 text-accent-light"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold font-heading text-fg">
                  {t(service.key)}
                </h3>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                  {t(`${service.key}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <Button variant="secondary" href="/servicios">
            {t("view_all")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
