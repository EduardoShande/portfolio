"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { SERVICES, toLocale } from "@/lib/content";

/**
 * The "Reparto" tiles from the industrial reference: tall dark plates, a
 * grayscale image that gains colour on hover, an index numeral, a heavy
 * uppercase label and a hard accent chip.
 *
 * Until real screenshots arrive, each tile's image is a small live component
 * standing in for the thing it represents, a node canvas, a chart, a chat,
 * a phone. Those read as screenshots and animate, which stock art cannot.
 * Swap in `/photos/work-*.png` as the real captures land.
 */

function NodeCanvas() {
  return (
    <div className="absolute inset-0 bg-[#1B2036]">
      <span className="absolute left-[14%] top-[24%] h-[22px] w-[62px] rounded-md border border-accent bg-[#2A3150] shadow-[0_0_0_3px_rgba(232,25,75,.2)]" />
      <span className="absolute left-[52%] top-[16%] h-[22px] w-[62px] rounded-md border border-[#3C456B] bg-[#2A3150]" />
      <span className="absolute left-[50%] top-[46%] h-[22px] w-[62px] rounded-md border border-[#3C456B] bg-[#2A3150]" />
      <span className="absolute left-[22%] top-[68%] h-[22px] w-[62px] rounded-md border border-accent bg-[#2A3150] shadow-[0_0_0_3px_rgba(232,25,75,.2)]" />
      <span className="absolute left-[26%] top-[33%] h-px w-[28%] bg-[#3C456B]" />
      <span className="absolute left-[26%] top-[55%] h-px w-[26%] bg-[#3C456B]" />
      <span className="absolute left-[30%] top-[33%] h-[22%] w-px bg-[#3C456B]" />
    </div>
  );
}

function BarChart() {
  const heights = [38, 62, 48, 80, 56, 92];
  return (
    <div className="absolute inset-0 flex items-end gap-2 bg-[#161B2E] px-5 pb-10 pt-10">
      {heights.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 bg-gradient-to-b from-accent to-accent/25"
        />
      ))}
    </div>
  );
}

function ChatBubbles() {
  const rows = [
    { w: "76%", me: false },
    { w: "58%", me: true },
    { w: "70%", me: false },
    { w: "44%", me: true },
    { w: "64%", me: false },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 bg-[#101728] p-5">
      {rows.map((r, i) => (
        <span
          key={i}
          style={{ width: r.w }}
          className={`h-4 rounded-full ${
            r.me ? "self-end bg-[#1E5F4B]" : "bg-[#222B45]"
          }`}
        />
      ))}
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#0E1322]">
      <div className="flex aspect-[9/17] w-[58%] flex-col gap-1.5 rounded-2xl border-[5px] border-[#232A44] bg-[#F4F3F0] p-2.5">
        <span className="h-3 w-[55%] rounded-sm bg-accent" />
        <span className="h-3 rounded-sm bg-[#D9D6CF]" />
        <span className="h-3 w-[80%] rounded-sm bg-[#D9D6CF]" />
        <span className="h-3 w-[60%] rounded-sm bg-[#D9D6CF]" />
        <span className="h-3 rounded-sm bg-[#D9D6CF]" />
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  automation: NodeCanvas,
  data: BarChart,
  ai: ChatBubbles,
  web: PhoneMock,
};

const CHIPS: Record<string, string> = {
  automation: "n8n · Airflow",
  data: "ETL · Warehouse",
  ai: "LLM · WhatsApp",
  web: "React · FastAPI",
};

export default function CapabilityTiles() {
  const t = useTranslations("home.capabilities");
  const lang = toLocale(useLocale());

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
          <div>
            <Badge>{t("eyebrow")}</Badge>
            <h2 className="mt-4 max-w-[560px] text-[clamp(30px,3.6vw,50px)]">
              {t("title")} <span className="text-accent">{t("titleAccent")}</span>
            </h2>
          </div>
          <Button variant="ghost" href="/services">
            {t("all")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service, i) => {
            const Visual = VISUALS[service.id] ?? NodeCanvas;
            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                }}
                className="group relative isolate flex aspect-[3/4] items-end overflow-hidden bg-band p-6"
              >
                <div className="absolute inset-0 -z-20 grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0">
                  <Visual />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-b from-band/15 to-band/90"
                />

                <div>
                  <span className="block text-[11px] font-semibold tracking-[0.16em] text-white/60">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1.5 text-[19px] uppercase leading-tight text-white">
                    {service.title[lang]}
                  </h3>
                  <span className="mt-3.5 inline-block bg-accent px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    {CHIPS[service.id] ?? ""}
                  </span>
                </div>

                <Link
                  href="/services"
                  aria-label={service.title[lang]}
                  className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
