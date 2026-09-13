"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useInView, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Three real processes, switched from manual to automated in place.
 *
 * This replaced a row of four-box cards (struck-through "before", an arrow
 * badge, "after", a stat panel), which is the stock layout generated sites
 * reach for. Reading two columns and diffing them in your head is work;
 * flipping one switch and watching every process change where it stands is
 * not, and people remember a change they caused. So the section is plain
 * editorial rows on hairlines, a large figure and one sentence each, and a
 * single Manual / Automated switch that rewrites all three at once.
 *
 * The switch flips to Automated by itself the first time the rows come into
 * view, so the change is seen even by visitors who never touch it. Figures
 * count up when automated; under reduced motion they appear directly.
 *
 * Every figure traces to a line in the CV. Nothing is estimated.
 */
const ROWS = ["leads", "reporting", "loads"] as const;

export default function BeforeAfter() {
  const t = useTranslations("home.beforeafter");
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.35 });
  const [automated, setAutomated] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    const id = window.setTimeout(() => setAutomated(true), 900);
    return () => window.clearTimeout(id);
  }, [inView, touched]);

  const flip = (next: boolean) => {
    setTouched(true);
    setAutomated(next);
  };

  return (
    <section className="bg-bg-sunken py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="max-w-[720px] text-[clamp(30px,3.6vw,50px)]">
              {t("title")} <span className="text-accent">{t("titleAccent")}</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-fg-muted">
              {t("subtitle")}
            </p>
          </div>

          <Switch
            on={automated}
            onChange={flip}
            offLabel={t("toggle_manual")}
            onLabel={t("toggle_automated")}
            label={t("toggle_label")}
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {automated ? t("status_automated") : t("status_manual")}
        </p>

        <ol ref={listRef} className="mt-14 border-b border-border-theme">
          {ROWS.map((row) => (
            <li
              key={row}
              className="grid gap-4 border-t border-border-theme py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12 lg:py-11"
            >
              <div>
                <span
                  className={cn(
                    "numeral block leading-[0.9] tabular-nums transition-colors duration-500",
                    "text-[clamp(64px,8.5vw,120px)]",
                    automated ? "text-accent" : "text-fg-soft"
                  )}
                >
                  {/* Remounting on each flip restarts the count from zero */}
                  <Figure key={String(automated)} metric={t(`${row}_metric`)} on={automated} />
                </span>
                <span className="mt-3 block text-[13px] font-medium text-fg-muted">
                  {automated ? t(`${row}_metric_label`) : t("manual_label")}
                </span>
              </div>

              <div>
                {/* Both versions share one grid cell, so the row is always as
                    tall as the longer one and nothing jumps when it flips. */}
                <div className="grid text-[clamp(18px,1.7vw,23px)] leading-[1.45]">
                  {(["before", "after"] as const).map((side) => {
                    const shown = (side === "after") === automated;
                    return (
                      <p
                        key={side}
                        aria-hidden={!shown}
                        className={cn(
                          "[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                          shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                          side === "after" ? "text-fg" : "text-fg-muted"
                        )}
                      >
                        {t(`${row}_${side}`)}
                      </p>
                    );
                  })}
                </div>
                <p className="mt-4 text-[13px] text-fg-muted">
                  <span className="font-semibold text-fg">{t(`${row}_where`)}</span>
                  <span aria-hidden="true" className="mx-2 text-fg-soft">/</span>
                  {t(`${row}_area`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** A two-state pill switch; both labels stay visible so the choice is plain. */
function Switch({
  on,
  onChange,
  offLabel,
  onLabel,
  label,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  offLabel: string;
  onLabel: string;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative grid grid-cols-2 rounded-full border border-border-theme bg-bg-elevated p-1 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
          on ? "translate-x-full bg-accent" : "translate-x-0 bg-fg"
        )}
      />
      <span
        className={cn(
          "relative z-10 px-5 py-2.5 transition-colors duration-300",
          on ? "text-fg-muted" : "text-bg"
        )}
      >
        {offLabel}
      </span>
      <span
        className={cn(
          "relative z-10 px-5 py-2.5 transition-colors duration-300",
          on ? "text-white" : "text-fg-muted"
        )}
      >
        {onLabel}
      </span>
    </button>
  );
}

/** "40%" counts up from 0 when on; a dash when off. */
function Figure({ metric, on }: { metric: string; on: boolean }) {
  const reduceMotion = useReducedMotion();
  const match = metric.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on || reduceMotion || !match) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `match` is derived from `metric`, which is what the dependency tracks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, reduceMotion, target, metric]);

  if (!on) return <>&ndash;</>;
  if (reduceMotion || !match) return <>{metric}</>;
  return (
    <>
      {n}
      {match[2]}
    </>
  );
}
