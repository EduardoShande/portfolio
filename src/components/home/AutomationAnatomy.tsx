"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  BellRing,
  Database,
  MessageCircle,
  Pause,
  Play,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import TornEdge from "@/components/ui/TornEdge";
import { cn } from "@/lib/utils";

const STEPS: { id: string; icon: LucideIcon }[] = [
  { id: "whatsapp", icon: MessageCircle },
  { id: "n8n", icon: Workflow },
  { id: "crm", icon: UserPlus },
  { id: "postgres", icon: Database },
  { id: "rep", icon: BellRing },
];

const STEP_MS = 3600;

/**
 * The page's hero object: a real automation, the lead engine built at Group
 * Quimera, drawn as the five systems a lead passes through.
 *
 * Box names alone only say which tools are involved. What makes the craft
 * legible is watching the lead change shape on the way through, so a panel
 * under the pipeline shows the sample artefact at the current step: the
 * WhatsApp message, the fields n8n extracts, the CRM lead, the database row
 * and the salesperson's alert. The run advances on its own while the
 * section is on screen; clicking a step pauses on it.
 *
 * Under reduced motion the run does not advance by itself and the progress
 * rail jumps instead of sliding.
 */
export default function AutomationAnatomy() {
  const t = useTranslations("home.anatomy");
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { margin: "-120px" });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduceMotion && inView;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STEPS.length),
      STEP_MS
    );
    return () => window.clearInterval(id);
  }, [playing]);

  const progress = (active / (STEPS.length - 1)) * 100;
  // A CSS variant rather than reduceMotion, which is only known after
  // hydration and would make the server and client class names differ.
  const rail = "transition-[width,height] duration-700 ease-out motion-reduce:transition-none";

  return (
    <section className="grain relative overflow-hidden bg-band pb-2 pt-4">
      <Container className="relative pb-16 lg:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[620px] text-[clamp(28px,3.4vw,46px)] text-white">
              {t("title")} <span className="text-amber">{t("titleAccent")}</span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-white/60">
              {t("subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? t("play") : t("pause")}
          </button>
        </div>

        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-[22px] border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 sm:p-8"
        >
          {/* ── Pipeline ── */}
          <div className="relative">
            {/* Horizontal rail on desktop, through the icon centres */}
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-[27px] hidden h-0.5 bg-white/12 lg:block"
            >
              <div className={cn("h-full bg-amber", rail)} style={{ width: `${progress}%` }} />
            </div>
            {/* Vertical rail on mobile */}
            <div
              aria-hidden="true"
              className="absolute bottom-[27px] left-[27px] top-[27px] w-0.5 bg-white/12 lg:hidden"
            >
              <div className={cn("w-full bg-amber", rail)} style={{ height: `${progress}%` }} />
            </div>

            <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-3">
              {STEPS.map(({ id, icon: Icon }, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      className="group flex w-full items-center gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber lg:flex-col lg:gap-3 lg:text-center"
                    >
                      <span
                        className={cn(
                          "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-band-2 transition-all duration-500",
                          isActive
                            ? "border-amber text-amber shadow-[0_0_0_6px_rgba(245,166,35,.12),0_0_28px_-4px_rgba(245,166,35,.6)]"
                            : isDone
                              ? "border-amber/50 text-amber/80"
                              : "border-white/15 text-white/55 group-hover:border-white/40 group-hover:text-white"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-[10px] font-semibold tracking-[0.16em] transition-colors",
                            isActive ? "text-amber" : "text-white/35"
                          )}
                        >
                          0{i + 1}
                        </span>
                        <b
                          className={cn(
                            "mt-0.5 block font-heading text-[15px] tracking-[-0.01em] transition-colors",
                            isActive ? "text-white" : "text-white/75"
                          )}
                        >
                          {t(`${id}_name`)}
                        </b>
                        <small className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/45">
                          {t(`${id}_step`)}
                        </small>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── What the lead looks like at this step ── */}
          <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                aria-live="polite"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber">
                  {t("step_of", { n: active + 1, total: STEPS.length })}
                  <span className="mx-2 text-white/25">/</span>
                  <span className="text-white/50">{t(`${STEPS[active].id}_tool`)}</span>
                </p>
                <h3 className="mt-3 text-[22px] text-white">
                  {t(`${STEPS[active].id}_name`)}: {t(`${STEPS[active].id}_step`).toLowerCase()}
                </h3>
                <p className="mt-3 max-w-[460px] text-[15px] leading-[1.7] text-white/60">
                  {t(`${STEPS[active].id}_desc`)}
                </p>

                {/* Step dots double as a compact progress readout */}
                <div className="mt-6 flex gap-1.5" aria-hidden="true">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === active ? "w-8 bg-amber" : i < active ? "w-3 bg-amber/50" : "w-3 bg-white/15"
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative">
              <span className="absolute -top-2.5 right-4 z-10 rounded-full border border-white/15 bg-band px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {t("sample")}
              </span>
              <div className="min-h-[216px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F1E] p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`artefact-${active}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Artefact step={STEPS[active].id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Results ── */}
        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {(["time", "manual", "always"] as const).map((key) => (
            <div key={key} className="bg-band px-6 py-5">
              <dt className="sr-only">{t(`result_${key}_label`)}</dt>
              <dd>
                <span className="numeral block text-[34px] leading-none text-white">
                  {t(`result_${key}_value`)}
                </span>
                <span className="mt-2 block text-[13px] text-white/55">
                  {t(`result_${key}_label`)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Tear back out to the light page below */}
      <div className="rotate-180 text-bg">
        <TornEdge />
      </div>
    </section>
  );
}

/** The sample lead as it looks inside each system. */
function Artefact({ step }: { step: string }) {
  const t = useTranslations("home.anatomy");
  const phone = "+591 7•• ••• 412";
  const mono = "font-mono text-[12.5px] leading-[1.8]";

  if (step === "whatsapp") {
    return (
      <div>
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-whatsapp/15 text-[12px] font-semibold text-whatsapp">
            CR
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">{phone}</p>
            <p className="text-[11px] text-white/40">WhatsApp</p>
          </div>
        </div>
        <div className="mt-4 max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1F2C34] px-4 py-3">
          <p className="text-[13.5px] leading-relaxed text-white/90">{t("sample_message")}</p>
          <p className="mt-1 text-right text-[10px] text-white/40">10:42</p>
        </div>
      </div>
    );
  }

  if (step === "n8n") {
    const fields: [string, string, string][] = [
      ["name", '"Carla Rojas"', "text-[#A5E3B5]"],
      ["phone", `"${phone}"`, "text-[#A5E3B5]"],
      ["interest", `"${t("sample_interest")}"`, "text-[#A5E3B5]"],
      ["source", '"whatsapp"', "text-[#A5E3B5]"],
      ["valid", "true", "text-amber"],
    ];
    return (
      <pre className={cn(mono, "overflow-x-auto text-white/50")}>
        {"{\n"}
        {fields.map(([k, v, color], i) => (
          <span key={k}>
            {"  "}
            <span className="text-[#8FB8FF]">&quot;{k}&quot;</span>: <span className={color}>{v}</span>
            {i < fields.length - 1 ? ",\n" : "\n"}
          </span>
        ))}
        {"}"}
      </pre>
    );
  }

  if (step === "crm") {
    const rows: [string, string][] = [
      [t("sample_row_name"), "Carla Rojas"],
      [t("sample_row_interest"), t("sample_interest")],
      [t("sample_row_source"), "WhatsApp"],
      [t("sample_row_owner"), t("sample_owner")],
    ];
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="font-heading text-[16px] text-white">Lead #1284</p>
          <span className="rounded-full bg-amber/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber">
            {t("sample_status")}
          </span>
        </div>
        <dl className="mt-4 divide-y divide-white/10">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2 text-[13px]">
              <dt className="text-white/45">{label}</dt>
              <dd className="text-right text-white/90">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (step === "postgres") {
    return (
      <div>
        <pre className={cn(mono, "overflow-x-auto whitespace-pre text-white/80")}>
          <span className="text-[#C792EA]">INSERT INTO</span> leads (name, phone, interest, crm_id){"\n"}
          <span className="text-[#C792EA]">VALUES</span> (<span className="text-[#A5E3B5]">&apos;Carla Rojas&apos;</span>,{" "}
          <span className="text-[#A5E3B5]">&apos;{phone}&apos;</span>,{"\n        "}
          <span className="text-[#A5E3B5]">&apos;{t("sample_interest")}&apos;</span>,{" "}
          <span className="text-amber">1284</span>);
        </pre>
        <p className="mt-4 inline-flex items-center gap-2 text-[12px] text-whatsapp">
          <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
          {t("sample_synced")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/15 text-amber">
          <BellRing className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-white">{t("sample_alert_title")}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white/65">{t("sample_alert_body")}</p>
          <p className="mt-2 text-[11px] text-white/35">{t("sample_alert_meta")}</p>
        </div>
      </div>
    </div>
  );
}
