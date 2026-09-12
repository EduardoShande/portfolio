"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { type Project, toLocale } from "@/lib/content";

const CATEGORY_KEY: Record<Project["category"], string> = {
  automation: "cat_automation",
  data: "cat_data",
  product: "cat_product",
  web: "cat_web",
};

/**
 * Visual header for a card. Real screenshots go in `/photos/work-*.png`;
 * until they arrive each category gets a small live component that stands
 * in for the kind of artefact it is.
 */
function CardVisual({ category }: { category: Project["category"] }) {
  if (category === "data") {
    const bars = [44, 70, 52, 88, 60];
    return (
      <div className="flex h-full items-end gap-2 bg-[#161B2E] px-6 pb-7 pt-10">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 bg-gradient-to-b from-accent to-accent/25"
          />
        ))}
      </div>
    );
  }

  if (category === "product" || category === "web") {
    return (
      <div className="grid h-full place-items-center bg-[#0E1322]">
        <div className="flex aspect-[9/13] w-[26%] flex-col gap-1.5 rounded-xl border-4 border-[#232A44] bg-[#F4F3F0] p-2">
          <span className="h-2.5 rounded-sm bg-accent" />
          <span className="h-2.5 w-[70%] rounded-sm bg-[#D9D6CF]" />
          <span className="h-2.5 rounded-sm bg-[#D9D6CF]" />
          <span className="h-2.5 w-[84%] rounded-sm bg-[#D9D6CF]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-[#1B2036]">
      <span className="absolute left-[12%] top-[30%] h-5 w-14 rounded-md border border-accent bg-[#2A3150]" />
      <span className="absolute left-[48%] top-[20%] h-5 w-14 rounded-md border border-[#3C456B] bg-[#2A3150]" />
      <span className="absolute left-[46%] top-[56%] h-5 w-14 rounded-md border border-[#3C456B] bg-[#2A3150]" />
      <span className="absolute left-[76%] top-[38%] h-5 w-14 rounded-md border border-accent bg-[#2A3150]" />
      <span className="absolute left-[24%] top-[38%] h-px w-[24%] bg-[#3C456B]" />
      <span className="absolute left-[60%] top-[38%] h-px w-[16%] bg-[#3C456B]" />
    </div>
  );
}

/**
 * A project as a soft rounded card with an image header, the shape the
 * real-estate reference uses for its listings. Told as problem → what I
 * built → outcome; the outcome block is skipped entirely when there is no
 * measured result, rather than filled with an estimate.
 */
export default function ProjectCard({
  project,
  namespace = "work",
}: {
  project: Project;
  namespace?: "work" | "home.work";
}) {
  const t = useTranslations(namespace);
  const tCat = useTranslations("work");
  const lang = toLocale(useLocale());

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col overflow-hidden rounded-[22px] bg-bg-elevated shadow-[0_22px_50px_-32px_rgba(18,23,43,.4)] hover:shadow-[0_32px_60px_-30px_rgba(18,23,43,.5)]"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <CardVisual category={project.category} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            {tCat(CATEGORY_KEY[project.category])}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
            {project.year}
          </span>
        </div>

        <h3 className="mt-3.5 text-[19px] leading-[1.25]">
          {project.title[lang]}
        </h3>
        <p className="mt-1.5 text-[13px] font-medium text-accent">
          {project.client[lang]}
        </p>

        <p className="mt-3 text-[13.5px] leading-[1.65] text-fg-muted">
          {project.problem[lang]}
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.65] text-fg">
          {project.solution[lang]}
        </p>

        {project.outcome && (
          <p className="numeral mt-auto border-t border-border-theme pt-4 text-[17px] text-accent">
            <span className="sr-only">{t("outcome_label")}: </span>
            {project.outcome[lang]}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border-theme px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
              >
                {link.label[lang]}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
