"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Project, toLocale } from "@/lib/content";

const CATEGORY_KEY: Record<Project["category"], string> = {
  automation: "cat_automation",
  data: "cat_data",
  product: "cat_product",
  web: "cat_web",
};

/**
 * One project, told as problem → what I built → outcome.
 *
 * `outcome` is optional by design: projects without a measured result simply
 * do not render the block, rather than getting an invented number.
 */
export default function ProjectCard({
  project,
  index,
  namespace = "work",
}: {
  project: Project;
  index: number;
  /** Message namespace holding the label strings. */
  namespace?: "work" | "home.work";
}) {
  const t = useTranslations(namespace);
  const tCat = useTranslations("work");
  const lang = toLocale(useLocale());
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative flex flex-col border border-border-theme bg-bg-elevated p-7 transition-colors hover:border-accent/50 lg:p-9",
        index % 2 === 0 ? "clip-notch" : "clip-notch-bl"
      )}
    >
      <span
        aria-hidden="true"
        className="numeral absolute right-7 top-5 text-6xl text-fg/[0.05] transition-colors duration-500 group-hover:text-accent/20 lg:text-7xl"
      >
        {number}
      </span>

      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          {tCat(CATEGORY_KEY[project.category])}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
          {project.year}
        </span>
      </div>

      <h3 className="relative mt-6 max-w-[88%] font-heading text-xl font-bold leading-tight tracking-[-0.02em] text-fg lg:text-2xl">
        {project.title[lang]}
      </h3>

      <p className="mt-2 text-sm font-medium text-accent">
        {project.client[lang]}
      </p>

      <dl className="mt-7 space-y-5 border-t border-border-theme pt-6">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
            {t("problem_label")}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
            {project.problem[lang]}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
            {t("solution_label")}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-fg">
            {project.solution[lang]}
          </dd>
        </div>
      </dl>

      {project.outcome && (
        <p className="mt-6 flex items-start gap-2.5 border-l-2 border-accent bg-accent/[0.06] px-4 py-3">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="numeral text-base leading-snug text-accent">
            {project.outcome[lang]}
          </span>
        </p>
      )}

      <ul className="mt-auto flex flex-wrap gap-2 pt-7">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-border-theme px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent hover:underline"
            >
              {link.label[lang]}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
