"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Workflow, Database, Bot, Code2, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SERVICES, toLocale } from "@/lib/content";

const ICONS: Record<string, typeof Workflow> = {
  automation: Workflow,
  data: Database,
  ai: Bot,
  web: Code2,
};

/**
 * Capability grid modelled on the "Reparto" tiles in the industrial
 * reference: a dark plate, an oversized index numeral, a heavy uppercase
 * label and a hard-edged link. The lead service spans two columns so the grid
 * has a focal point instead of four equal boxes.
 */
export default function ServicesOverview() {
  const t = useTranslations("home.services");
  const lang = toLocale(useLocale());

  return (
    <section className="relative py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            titleAccent={t("titleAccent")}
            subtitle={t("subtitle")}
            className="mb-0 lg:mb-0"
          />
          <div className="shrink-0 lg:pb-2">
            <Button variant="outline" href="/services">
              {t("view_all")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-16 grid grid-cols-1 gap-px bg-border-theme sm:grid-cols-2"
        >
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.id] ?? Workflow;
            const index = String(i + 1).padStart(2, "0");
            const feature = i === 0;

            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                }}
                className={cn(
                  "group relative overflow-hidden p-8 lg:p-10",
                  feature ? "bg-band sm:col-span-2" : "bg-bg-elevated"
                )}
              >
                {/* Accent wash sweeps up from the bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0 bg-accent transition-all duration-500 ease-out group-hover:h-full"
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "numeral absolute right-6 top-4 text-6xl transition-colors duration-500 lg:text-7xl",
                    feature
                      ? "text-white/[0.07] group-hover:text-white/20"
                      : "text-fg/[0.06] group-hover:text-white/25"
                  )}
                >
                  {index}
                </span>

                <div className="relative">
                  <Icon
                    strokeWidth={1.5}
                    className="h-8 w-8 text-accent transition-colors duration-500 group-hover:text-white"
                  />

                  <h3
                    className={cn(
                      "mt-8 font-heading text-lg font-bold uppercase leading-tight tracking-[0.02em] transition-colors duration-500 group-hover:text-white lg:text-xl",
                      feature ? "text-white" : "text-fg"
                    )}
                  >
                    {service.title[lang]}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 max-w-md text-sm leading-relaxed transition-colors duration-500 group-hover:text-white/85",
                      feature ? "text-white/60" : "text-fg-muted"
                    )}
                  >
                    {service.description[lang]}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors duration-500 group-hover:text-white">
                    {t("learn_more")}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <Link
                  href="/services"
                  aria-label={service.title[lang]}
                  className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
