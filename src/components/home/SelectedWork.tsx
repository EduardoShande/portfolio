"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/work/ProjectCard";
import { FEATURED_PROJECTS } from "@/lib/content";

export default function SelectedWork() {
  const t = useTranslations("home.work");

  return (
    <section className="pb-24 pt-4 lg:pb-28">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
          <div>
            <Badge>{t("eyebrow")}</Badge>
            <h2 className="mt-4 text-[clamp(30px,3.6vw,50px)]">
              {t("title")} <span className="text-accent">{t("titleAccent")}</span>
            </h2>
          </div>
          <Button variant="ghost" href="/work">
            {t("view_all")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              namespace="home.work"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
