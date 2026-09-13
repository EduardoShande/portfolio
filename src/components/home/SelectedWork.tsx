"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BellRing,
  Database,
  MessageCircle,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { FEATURED_PROJECTS, toLocale, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const CATEGORY_KEY: Record<Project["category"], string> = {
  automation: "cat_automation",
  data: "cat_data",
  product: "cat_product",
  web: "cat_web",
};

const MAX_TAGS = 4;

/**
 * Three projects, told results first.
 *
 * The previous cards led with a paragraph of problem and a paragraph of
 * solution, so the number that mattered sat at the bottom of a wall of text.
 * Each card now opens on its figures, set large, with the problem and the
 * build cut to a sentence each. The first project is a wide feature card;
 * the other two sit beneath it. Every card is one link to the full write-up
 * on /work.
 */
export default function SelectedWork() {
  const t = useTranslations("home.work");
  const [feature, ...rest] = FEATURED_PROJECTS;

  return (
    <section id="work" className="scroll-mt-24 pb-24 pt-4 lg:pb-28">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
          <div>
            <h2 className="text-[clamp(30px,3.6vw,50px)]">
              {t("title")} <span className="text-accent">{t("titleAccent")}</span>
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] leading-[1.65] text-fg-muted">
              {t("subtitle")}
            </p>
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
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {feature && <WorkCard project={feature} wide />}
          {rest.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function WorkCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const t = useTranslations("home.work");
  const tCat = useTranslations("work");
  const lang = toLocale(useLocale());
  const extraTags = project.stack.length - MAX_TAGS;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={cn(wide && "lg:col-span-2")}
    >
      <Link
        href="/work"
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[22px] border border-border-theme bg-bg-elevated shadow-[0_22px_50px_-32px_rgba(18,23,43,.4)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_32px_60px_-30px_rgba(18,23,43,.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          wide && "lg:flex-row"
        )}
      >
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]",
            wide && "lg:aspect-auto lg:w-[52%] lg:shrink-0"
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              sizes={wide ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 600px, 100vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <CardVisual category={project.category} lang={lang} />
          )}
        </div>

        <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "lg:p-10")}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                {tCat(CATEGORY_KEY[project.category])}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                {/* A product's "client" is Eduardo himself, which the
                    category chip already says. */}
                {project.category === "product" ? project.year : `${project.client[lang]} · ${project.year}`}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-theme text-fg-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {project.metrics.map((metric) => (
                <div key={metric.value}>
                  <dt className="sr-only">{metric.label[lang]}</dt>
                  <dd>
                    <span
                      className={cn(
                        "numeral block leading-none text-accent",
                        wide ? "text-[clamp(44px,5vw,64px)]" : "text-[44px]"
                      )}
                    >
                      {metric.value}
                    </span>
                    <span className="mt-2 block max-w-[220px] text-[13px] leading-snug text-fg-muted">
                      {metric.label[lang]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <h3 className={cn("mt-6 leading-[1.2]", wide ? "text-[24px]" : "text-[20px]")}>
            {project.title[lang]}
          </h3>

          {project.pitch && (
            <dl className="mt-4 space-y-2.5 text-[14px] leading-[1.6]">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 pt-px sm:w-[92px] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
                  {t("problem_label")}
                </dt>
                <dd className="text-fg-muted">{project.pitch.problem[lang]}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 pt-px sm:w-[92px] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
                  {t("solution_label")}
                </dt>
                <dd className="text-fg">{project.pitch.built[lang]}</dd>
              </div>
            </dl>
          )}

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {project.stack.slice(0, MAX_TAGS).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border-theme px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted"
              >
                {tech}
              </li>
            ))}
            {extraTags > 0 && (
              <li className="rounded-full px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
                +{extraTags}
              </li>
            )}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * A drawn stand-in for a screenshot, one per kind of project: the pipeline
 * for automation, a dashboard for data, the app itself for a product.
 */
function CardVisual({ category, lang }: { category: Project["category"]; lang: "es" | "en" }) {
  if (category === "data") {
    const bars = [38, 56, 47, 72, 64, 88, 79];
    return (
      <div className="flex h-full flex-col bg-[#131A2E] p-6 sm:p-7">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ["PIPELINES", "OK"],
            ["LOAD TIME", "-50%"],
            ["RELIABILITY", "95%"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-white/40">{k}</p>
              <p className="numeral mt-0.5 text-[16px] text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-1 items-end gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 pb-3 pt-6">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-b from-accent to-accent/20 transition-transform duration-500 group-hover:scale-y-110"
            />
          ))}
        </div>
      </div>
    );
  }

  if (category === "product" || category === "web") {
    const rows: [string, string, boolean][] = [
      ["Doña Rosa", "Bs 120", true],
      ["Don Julio", "Bs 45", true],
      ["Marta", "Bs 0", false],
    ];
    return (
      <div className="grid h-full place-items-center overflow-hidden bg-[#0E1322] py-6">
        <div className="w-[46%] max-w-[190px] rounded-[22px] border-[5px] border-[#232A44] bg-[#F4F3F0] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] transition-transform duration-500 group-hover:-translate-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-[#12172B]">Casera</span>
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
          </div>
          <div className="mt-2 rounded-lg bg-accent px-2.5 py-2 text-white">
            <p className="text-[7px] font-semibold uppercase tracking-[0.12em] opacity-80">Fiado</p>
            <p className="numeral text-[15px] leading-tight">Bs 165</p>
          </div>
          <div className="mt-2 space-y-1">
            {rows.map(([n, v, owes]) => (
              <div key={n} className="flex items-center justify-between rounded-md bg-white px-2 py-1.5">
                <span className="text-[8px] font-medium text-[#12172B]">{n}</span>
                <span className={cn("text-[8px] font-semibold", owes ? "text-accent" : "text-[#6B7185]")}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const nodes: [LucideIcon, string][] = [
    [MessageCircle, "WhatsApp"],
    [Workflow, "n8n"],
    [UserPlus, "CRM"],
    [Database, "Postgres"],
    [BellRing, "Sales"],
  ];
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#141A30] px-6 py-8 sm:px-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* The incoming message, above the first node */}
      <div className="relative mb-7 w-full max-w-[460px]">
        <div className="w-fit max-w-[70%] rounded-2xl rounded-bl-sm bg-[#1F2C34] px-3.5 py-2.5 shadow-[0_16px_30px_-18px_rgba(0,0,0,.8)] transition-transform duration-500 group-hover:-translate-y-1">
          <p className="text-[11.5px] leading-snug text-white/85">
            {lang === "es" ? "Hola, quiero información y precios" : "Hi, I'd like info and prices"}
          </p>
          <p className="mt-0.5 text-right text-[9px] text-white/35">10:42</p>
        </div>
      </div>

      <div className="relative flex w-full max-w-[460px] items-start">
        {nodes.map(([Icon, label], i) => (
          <div key={label} className="contents">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-[#1E2542] transition-colors duration-500 sm:h-14 sm:w-14",
                  i === 0 || i === nodes.length - 1
                    ? "border-amber/70 text-amber"
                    : "border-white/15 text-white/70 group-hover:border-amber/50 group-hover:text-amber"
                )}
              >
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/40">
                {label}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <span className="relative mt-[22px] h-0.5 flex-1 bg-white/15 sm:mt-7">
                <span className="absolute inset-y-0 left-0 w-0 bg-amber transition-[width] duration-700 group-hover:w-full" />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* The alert that comes out the other end */}
      <div className="relative mt-7 flex w-full max-w-[460px] justify-end">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 shadow-[0_16px_30px_-18px_rgba(0,0,0,.8)] transition-transform duration-500 group-hover:translate-y-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber/15 text-amber">
            <BellRing className="h-3 w-3" />
          </span>
          <p className="text-[11px] text-white/80">Lead #1284 → Ana</p>
        </div>
      </div>
    </div>
  );
}
