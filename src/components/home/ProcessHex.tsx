"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Search, PenTool, Hammer, LineChart } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

/**
 * The four-step process as interlocking hexagons.
 *
 * From the hex infographic reference: a white tile with an icon, a title and
 * a line of text, offset against a solid coloured hexagon peeking out behind
 * it, with the column staggered left and right so the tiles interlock. It
 * replaces four identical numbered rows, which said the same thing with none
 * of the movement.
 *
 * The shape is a single clip-path, so the tile and its coloured shadow are
 * plain divs rather than images and stay crisp at any size. Below md the
 * stagger is dropped and the hexagons stack straight down, since interlocking
 * needs horizontal room it does not have on a phone.
 */
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const STEPS = [
  { id: "diagnose", Icon: Search, shadow: "#2BB3A3", offset: "md:ml-0" },
  { id: "design", Icon: PenTool, shadow: "#E8194B", offset: "md:ml-[18%]" },
  { id: "build", Icon: Hammer, shadow: "#7B3FA0", offset: "md:ml-0" },
  { id: "tune", Icon: LineChart, shadow: "#F5622D", offset: "md:ml-[18%]" },
] as const;

export default function ProcessHex() {
  const t = useTranslations("home.process");

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          {/* Heading column, so the hex stack has something to sit beside */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Badge>{t("eyebrow")}</Badge>
            <h2 className="mt-4 text-[clamp(30px,3.6vw,50px)]">
              {t("title")}{" "}
              <span className="text-accent">{t("titleAccent")}</span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.65] text-fg-muted">
              {t("subtitle")}
            </p>
          </div>

          {/* Hex stack */}
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
            className="relative mx-auto w-full max-w-[520px] space-y-[-14px] md:space-y-[-26px]"
          >
            {STEPS.map((step, i) => {
              const { Icon } = step;
              return (
                <motion.li
                  key={step.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className={`relative ${step.offset}`}
                >
                  {/* Coloured hexagon offset behind the tile */}
                  <div
                    aria-hidden="true"
                    style={{ clipPath: HEX, background: step.shadow }}
                    className="absolute inset-0 translate-x-[7%] translate-y-[7%]"
                  />

                  {/* The tile itself */}
                  <div
                    style={{ clipPath: HEX }}
                    className="relative bg-bg-elevated px-[14%] py-[13%] text-center"
                  >
                    <span
                      className="mx-auto flex h-11 w-11 items-center justify-center"
                      style={{ color: step.shadow }}
                    >
                      <Icon strokeWidth={1.4} className="h-8 w-8" />
                    </span>

                    <h3 className="mt-3 text-[17px] uppercase tracking-[0.04em]">
                      <span className="numeral mr-2 text-fg-soft">
                        0{i + 1}
                      </span>
                      {t(`${step.id}_title`)}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[78%] text-[13px] leading-[1.6] text-fg-muted">
                      {t(`${step.id}_desc`)}
                    </p>

                    <span
                      className="mt-2.5 inline-block text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: step.shadow }}
                    >
                      {t(`${step.id}_when`)}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
