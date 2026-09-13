"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Workflow,
  Database,
  HardDrive,
  Code2,
  Server,
  Bot,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { SKILL_GROUPS, PROFILE, toLocale } from "@/lib/content";

/**
 * Portrait at the centre with the six skill groups orbiting it.
 *
 * Taken from two references at once: the city app, where labelled circular
 * nodes sit on an arc swung off a photographic disc, and the smart-mirror
 * dashboard, where a cut-out portrait is flanked by labelled tiles. Both
 * put a person in a circle and hang the capabilities around them, which is
 * exactly what a skills section should do and is a great deal better than
 * the flat grid of chips this replaces.
 *
 * Desktop places three nodes down each side on an arc drawn in SVG. Below
 * lg the arc is meaningless, so it collapses to a two-column list under the
 * portrait.
 */
const ICONS: Record<string, typeof Workflow> = {
  automation: Workflow,
  data: Database,
  databases: HardDrive,
  development: Code2,
  infra: Server,
  ai: Bot,
};

/** Vertical placement down each arc, as a percentage of the orbit height. */
const LEFT_POSITIONS = ["8%", "38%", "68%"];
const RIGHT_POSITIONS = ["14%", "44%", "74%"];

export default function CapabilityOrbit() {
  const t = useTranslations("orbit");
  const lang = toLocale(useLocale());

  const left = SKILL_GROUPS.slice(0, 3);
  const right = SKILL_GROUPS.slice(3, 6);

  return (
    <section className="relative overflow-hidden bg-bg-sunken py-20 lg:py-24">
      <Container>
        <div className="max-w-[620px]">
          <h2 className="text-[clamp(30px,3.6vw,50px)]">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-fg-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Desktop: portrait with two arcs of nodes ── */}
        <div className="relative mt-16 hidden lg:block">
          <div className="relative mx-auto h-[520px] max-w-[1000px]">
            {/* The two arcs the nodes sit on */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-fg/15"
            >
              <path
                d="M 330 40 C 150 150, 150 370, 330 480"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 670 40 C 850 150, 850 370, 670 480"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            {/* Portrait disc */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
            >
              <div
                role="img"
                aria-label={PROFILE.name}
                className="relative h-full w-full overflow-hidden rounded-full bg-band"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center px-10 text-center text-[10px] uppercase leading-loose tracking-[0.18em] text-white/50"
                >
                  {t("photo_placeholder")}
                  <br />
                  photos/eduardo-portrait.jpg
                </div>
                {/* Painted as a background so a missing file simply reveals
                    the placeholder instead of a broken-image marker. */}
                <div
                  aria-hidden="true"
                  style={{
                    backgroundImage: "url('/photos/eduardo-portrait.jpg')",
                  }}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-full border border-accent/25"
              />
            </motion.div>

            {/* Nodes */}
            {[
              ...left.map((g, i) => ({ g, side: "left" as const, i })),
              ...right.map((g, i) => ({ g, side: "right" as const, i })),
            ].map(({ g, side, i }) => {
              const Icon = ICONS[g.id] ?? Workflow;
              const top =
                side === "left" ? LEFT_POSITIONS[i] : RIGHT_POSITIONS[i];
              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                  style={{ top }}
                  className={`absolute flex max-w-[230px] items-center gap-4 ${
                    side === "left"
                      ? "left-0 flex-row-reverse text-right"
                      : "right-0 text-left"
                  }`}
                >
                  <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border border-border-theme bg-bg-elevated text-accent shadow-[0_16px_40px_-24px_rgba(18,23,43,.5)]">
                    <Icon strokeWidth={1.4} className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="block font-heading text-[15px] font-bold text-fg">
                      {g.label[lang]}
                    </span>
                    <span className="mt-1 block text-[12px] leading-snug text-fg-muted">
                      {g.items.slice(0, 3).join(" · ")}
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Below lg: portrait on top, nodes as a list ── */}
        <div className="mt-12 lg:hidden">
          <div
            role="img"
            aria-label={PROFILE.name}
            className="relative mx-auto h-[220px] w-[220px] overflow-hidden rounded-full bg-band"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center px-6 text-center text-[10px] uppercase leading-loose tracking-[0.16em] text-white/50"
            >
              {t("photo_placeholder")}
            </div>
            <div
              aria-hidden="true"
              style={{ backgroundImage: "url('/photos/eduardo-portrait.jpg')" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            />
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {SKILL_GROUPS.map((g) => {
              const Icon = ICONS[g.id] ?? Workflow;
              return (
                <li key={g.id} className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border-theme bg-bg-elevated text-accent">
                    <Icon strokeWidth={1.4} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-heading text-[15px] font-bold text-fg">
                      {g.label[lang]}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-fg-muted">
                      {g.items.slice(0, 3).join(" · ")}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
