"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Brain, Workflow, Megaphone, Code, Target, Eye, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const expertise = [
  { key: "ai", icon: Brain },
  { key: "automation", icon: Workflow },
  { key: "marketing", icon: Megaphone },
  { key: "development", icon: Code },
] as const;

const values = [
  { key: "results", icon: Target },
  { key: "transparency", icon: Eye },
  { key: "innovation", icon: Lightbulb },
] as const;

export default function NosotrosPage() {
  const t = useTranslations("about");

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <h3 className="font-heading text-2xl font-bold mb-6 text-fg">
              {t("story.title")}
            </h3>
            <div className="space-y-4 text-fg-muted leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32 bg-bg-elevated/50">
        <Container className="py-20">
          <SectionHeading title={t("expertise.title")} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {expertise.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-border-theme bg-bg-elevated p-6 text-center transition-colors hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent-light">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 font-heading font-semibold text-fg">
                    {t(`expertise.${item.key}`)}
                  </h4>
                  <p className="mt-2 text-sm text-fg-muted">
                    {t(`expertise.${item.key}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <SectionHeading title={t("values.title")} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-border-theme bg-bg-elevated p-6 lg:p-8 transition-colors hover:border-accent/40"
                >
                  <Icon className="h-8 w-8 text-accent" />
                  <h4 className="mt-4 font-heading text-lg font-semibold text-fg">
                    {t(`values.${item.key}`)}
                  </h4>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                    {t(`values.${item.key}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
