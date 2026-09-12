"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/work/ProjectCard";
import { FEATURED_PROJECTS } from "@/lib/content";

export default function SelectedWork() {
  const t = useTranslations("home.work");

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-24 h-[34rem] w-[34rem] -rotate-12 bg-accent/[0.04]"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            titleAccent={t("titleAccent")}
            subtitle={t("subtitle")}
            className="mb-0 lg:mb-0"
          />
          <div className="shrink-0 lg:pb-2">
            <Button variant="outline" href="/work">
              {t("view_all")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              namespace="home.work"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
