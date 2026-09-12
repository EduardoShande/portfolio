"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ExperienceTimeline from "@/components/shared/ExperienceTimeline";

export default function ExperienceSection() {
  const t = useTranslations("home.experience");

  return (
    <section className="relative overflow-hidden bg-bg-sunken py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-[32rem] w-[32rem] -rotate-12 bg-accent/[0.04]"
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
            <Button variant="outline" href="/about">
              {t("view_all")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <ExperienceTimeline currentLabel={t("current_label")} compact />
        </div>
      </Container>
    </section>
  );
}
