"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import TornEdge from "@/components/ui/TornEdge";

/**
 * The page's hero object.
 *
 * Every reference site has one, a plane, a house, a 3D head, a robot arm.
 * Here it is a real automation: the lead engine built at Group Quimera,
 * drawn as the five systems it touches, with each node lighting in turn and
 * a dot travelling each wire. It shows the actual craft in about four
 * seconds, which no stock image can do.
 *
 * Timings are staggered in CSS rather than JS so the loop keeps running with
 * no render cost, and both animations are disabled under reduced motion.
 */
const NODES = ["whatsapp", "n8n", "crm", "postgres", "rep"] as const;

export default function AutomationAnatomy() {
  const t = useTranslations("home.anatomy");

  return (
    <section className="grain relative overflow-hidden bg-band pb-2 pt-4">
      <Container className="relative pb-16 lg:pb-20">
        <Badge tone="band">{t("eyebrow")}</Badge>

        <h2 className="mt-4 max-w-[620px] text-[clamp(28px,3.4vw,46px)] text-white">
          {t("title")} <span className="text-amber">{t("titleAccent")}</span>
        </h2>

        <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-white/60">
          {t("subtitle")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-x-auto rounded-[18px] border border-white/15 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-9"
        >
          <div className="flex min-w-[820px] items-center">
            {NODES.map((node, i) => (
              <div key={node} className="contents">
                <div className="relative flex-1 rounded-xl border border-white/15 bg-band-2 px-4 py-4 text-center">
                  <span
                    className="node-pulse"
                    style={{ animationDelay: `${i * 1.2}s` }}
                  />
                  <b className="block font-heading text-[14px] tracking-[-0.01em] text-white">
                    {t(`${node}_name`)}
                  </b>
                  <small className="mt-1.5 block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {t(`${node}_step`)}
                  </small>
                </div>

                {i < NODES.length - 1 && (
                  <div className="relative h-0.5 w-[54px] shrink-0 bg-white/15">
                    <span
                      className="wire-dot"
                      style={{ animationDelay: `${0.4 + i * 1.2}s` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Tear back out to the light page below */}
      <div className="rotate-180 text-bg">
        <TornEdge />
      </div>
    </section>
  );
}
