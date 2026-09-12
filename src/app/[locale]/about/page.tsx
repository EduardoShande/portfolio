"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Download, GraduationCap, Award, Languages } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ExperienceTimeline from "@/components/shared/ExperienceTimeline";
import { CV_URL } from "@/lib/constants";
import {
  PROFILE,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
  toLocale,
} from "@/lib/content";

export default function AboutPage() {
  const t = useTranslations("about");
  const tHome = useTranslations("home.experience");
  const lang = toLocale(useLocale());

  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-16 h-[30rem] w-[30rem] -rotate-12 bg-accent/[0.05]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={t("hero.eyebrow")}
                title={t("hero.title")}
                titleAccent={t("hero.titleAccent")}
                subtitle={t("hero.subtitle")}
                className="mb-0 lg:mb-0"
              />
            </div>

            <div className="lg:col-span-5">
              <div className="clip-notch border border-border-theme bg-bg-elevated p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
                  {PROFILE.role[lang]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {PROFILE.location[lang]}
                </p>
                <div className="mt-6 border-t border-border-theme pt-6">
                  <Button variant="outline" href={CV_URL} external>
                    <Download className="h-4 w-4" />
                    {t("cv.button")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-fg">
              {t("story.title")}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-fg-muted">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
              <p>{t("story.p4")}</p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Experience */}
      <section className="relative overflow-hidden bg-bg-sunken py-20 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute -left-32 top-10 h-[32rem] w-[32rem] -rotate-12 bg-accent/[0.04]"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow={t("experience.eyebrow")}
            title={t("experience.title")}
            titleAccent={t("experience.titleAccent")}
          />
          <ExperienceTimeline currentLabel={tHome("current_label")} />
        </Container>
      </section>

      {/* Skills */}
      <section className="py-20 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={t("skills.eyebrow")}
            title={t("skills.title")}
            titleAccent={t("skills.titleAccent")}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 gap-px bg-border-theme sm:grid-cols-2 lg:grid-cols-3"
          >
            {SKILL_GROUPS.map((group, i) => (
              <motion.div
                key={group.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="relative overflow-hidden bg-bg-elevated p-7 lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="numeral absolute right-5 top-3 text-5xl text-fg/[0.05]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-heading text-sm font-bold uppercase tracking-[0.12em] text-accent">
                  {group.label[lang]}
                </h3>
                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-border-theme px-2.5 py-1 text-[11px] font-medium text-fg-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Education, certifications, languages */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="clip-notch border border-border-theme bg-bg-elevated p-7 lg:p-8">
              <GraduationCap
                strokeWidth={1.5}
                className="h-7 w-7 text-accent"
              />
              <h3 className="mt-6 font-heading text-sm font-bold uppercase tracking-[0.14em] text-fg">
                {t("education.title")}
              </h3>
              <p className="mt-4 text-base font-semibold text-fg">
                {EDUCATION.degree[lang]}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {EDUCATION.institution[lang]}
              </p>
            </div>

            <div className="clip-notch-bl border border-border-theme bg-bg-elevated p-7 lg:p-8">
              <Award strokeWidth={1.5} className="h-7 w-7 text-accent" />
              <h3 className="mt-6 font-heading text-sm font-bold uppercase tracking-[0.14em] text-fg">
                {t("certifications.title")}
              </h3>
              <ul className="mt-4 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                    />
                    <span className="text-sm leading-snug text-fg-muted">
                      <span className="text-fg">{cert.name}</span>
                      {" — "}
                      {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="clip-notch border border-border-theme bg-bg-elevated p-7 lg:p-8">
              <Languages strokeWidth={1.5} className="h-7 w-7 text-accent" />
              <h3 className="mt-6 font-heading text-sm font-bold uppercase tracking-[0.14em] text-fg">
                {t("languages.title")}
              </h3>
              <ul className="mt-4 space-y-4">
                {LANGUAGES.map((language) => (
                  <li key={language.name.en}>
                    <p className="text-base font-semibold text-fg">
                      {language.name[lang]}
                    </p>
                    <p className="mt-0.5 text-sm text-fg-muted">
                      {language.level[lang]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CV */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="clip-notch grain relative overflow-hidden bg-band p-10 text-center sm:p-16"
          >
            <div
              aria-hidden="true"
              className="hatch absolute inset-0 text-white/[0.04]"
            />
            <div className="relative">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                {t("cv.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/60">
                {t("cv.subtitle")}
              </p>
              <div className="mt-8 flex justify-center">
                <Button variant="primary" size="lg" href={CV_URL} external>
                  <Download className="h-4 w-4" />
                  {t("cv.button")}
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
