"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/work/ProjectCard";
import { PROJECTS, type ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

const FILTERS: { value: ProjectCategory | "all"; key: string }[] = [
  { value: "all", key: "filter_all" },
  { value: "automation", key: "cat_automation" },
  { value: "data", key: "cat_data" },
  { value: "product", key: "cat_product" },
  { value: "web", key: "cat_web" },
];

export default function WorkPage() {
  const t = useTranslations("work");
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === active);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-20 h-[30rem] w-[30rem] -rotate-12 bg-accent/[0.05]"
        />
        <Container className="relative">
          <SectionHeading
            title={t("hero.title")}
            titleAccent={t("hero.titleAccent")}
            subtitle={t("hero.subtitle")}
            className="mb-0 lg:mb-0"
          />

          <div className="mt-12 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActive(filter.value)}
                aria-pressed={active === filter.value}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  active === filter.value
                    ? "bg-accent text-white"
                    : "border border-border-theme text-fg-muted hover:border-accent hover:text-accent"
                )}
              >
                {t(filter.key)}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            // Re-keying on the filter replays the stagger when the set changes.
            key={active}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[22px] grain relative overflow-hidden bg-band p-10 text-center sm:p-16"
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
                <Button variant="primary" size="lg" href="/contact">
                  <MessageCircle className="h-4 w-4" />
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
