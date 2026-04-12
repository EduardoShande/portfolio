"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Brain, Workflow, Megaphone, Code, Target, Eye, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

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
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      {/* Story */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-2xl font-bold mb-6">
                {t("story.title")}
              </h3>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>{t("story.p1")}</p>
                <p>{t("story.p2")}</p>
                <p>{t("story.p3")}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Expertise */}
      <section className="pb-20 lg:pb-32 bg-brand-dark/50">
        <Container className="py-20">
          <SectionHeading title={t("expertise.title")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h4 className="mt-4 font-heading font-semibold">
                      {t(`expertise.${item.key}`)}
                    </h4>
                    <p className="mt-2 text-sm text-white/50">
                      {t(`expertise.${item.key}_desc`)}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <SectionHeading title={t("values.title")} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <Icon className="h-8 w-8 text-brand-purple" />
                    <h4 className="mt-4 font-heading text-lg font-semibold">
                      {t(`values.${item.key}`)}
                    </h4>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      {t(`values.${item.key}_desc`)}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
