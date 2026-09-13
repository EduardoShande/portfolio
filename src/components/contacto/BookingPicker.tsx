"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { BOOKING, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const inputStyles =
  "w-full rounded-xl border border-border-theme bg-bg/50 px-4 py-3 text-sm text-fg placeholder:text-fg-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all";

type Day = { y: number; m: number; d: number };

const noopSubscribe = () => () => {};

/**
 * The next few weekdays in Bolivia, starting tomorrow there. Starting
 * tomorrow means no slot on offer has already passed, whatever the hour.
 */
function upcomingWeekdays(now: number): Day[] {
  const bolivia = new Date(now + BOOKING.utcOffsetHours * 3_600_000);
  const days: Day[] = [];
  for (let i = 1; days.length < BOOKING.weekdays; i++) {
    const date = new Date(
      Date.UTC(bolivia.getUTCFullYear(), bolivia.getUTCMonth(), bolivia.getUTCDate() + i)
    );
    const weekday = date.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    days.push({ y: date.getUTCFullYear(), m: date.getUTCMonth(), d: date.getUTCDate() });
  }
  return days;
}

/** The real instant a Bolivia wall-clock slot on a given day refers to. */
function slotInstant(day: Day, slot: string): Date {
  const [h, min] = slot.split(":").map(Number);
  return new Date(Date.UTC(day.y, day.m, day.d, h - BOOKING.utcOffsetHours, min));
}

/**
 * A booking request composed on the site and sent through WhatsApp.
 *
 * It replaces an embedded Calendly widget, which looked like someone else's
 * product dropped into the page. The visitor picks a day and a slot, both
 * shown in Bolivia time with their own local time alongside when it
 * differs, and the button opens WhatsApp with the request already written
 * in the site's language. Nothing is checked against a calendar: Eduardo
 * confirms the slot in the chat.
 *
 * Dates depend on the visitor's clock and time zone, so the picker renders
 * only in the browser; the server sends a placeholder of the same height.
 */
export default function BookingPicker() {
  const t = useTranslations("contact.booking");
  const locale = useLocale();
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const days = useMemo(() => (isClient ? upcomingWeekdays(Date.now()) : []), [isClient]);
  const visitorZone = isClient
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : BOOKING.timeZone;

  const fmt = useMemo(() => {
    const intlLocale = locale === "es" ? "es-BO" : "en-US";
    return {
      dayShort: new Intl.DateTimeFormat(intlLocale, { weekday: "short", timeZone: "UTC" }),
      dayNum: new Intl.DateTimeFormat(intlLocale, { day: "numeric", timeZone: "UTC" }),
      month: new Intl.DateTimeFormat(intlLocale, { month: "short", timeZone: "UTC" }),
      dayLong: new Intl.DateTimeFormat(intlLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      }),
      boliviaTime: new Intl.DateTimeFormat(intlLocale, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: BOOKING.timeZone,
      }),
      localTime: new Intl.DateTimeFormat(intlLocale, {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        timeZone: visitorZone,
      }),
      boliviaDay: new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: BOOKING.timeZone }),
      localDay: new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: visitorZone }),
      localHour: new Intl.DateTimeFormat(intlLocale, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: visitorZone,
      }),
    };
  }, [locale, visitorZone]);

  if (!isClient) {
    return (
      <div className="grid min-h-[420px] place-items-center text-sm text-fg-muted">
        {t("loading")}
      </div>
    );
  }

  const day = dayIndex === null ? null : days[dayIndex];
  const dayDate = (d: Day) => new Date(Date.UTC(d.y, d.m, d.d));
  const sameZone = (d: Day, s: string) =>
    fmt.boliviaTime.format(slotInstant(d, s)) === fmt.localHour.format(slotInstant(d, s));

  const chosen =
    day && slot
      ? {
          date: fmt.dayLong.format(dayDate(day)),
          time: fmt.boliviaTime.format(slotInstant(day, slot)),
        }
      : null;
  let href: string | undefined;
  if (chosen) {
    const parts = [t("message", chosen)];
    if (name.trim()) parts.push(t("message_name", { name: name.trim() }));
    if (topic.trim()) parts.push(t("message_topic", { topic: topic.trim() }));
    href = `${WHATSAPP_URL}?text=${encodeURIComponent(parts.join(" "))}`;
  }

  const stepLabel = "mb-3 text-xs font-semibold uppercase tracking-wider text-fg-muted";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      <div>
        {/* Day */}
        <p className={stepLabel}>{t("day_label")}</p>
        <div
          role="radiogroup"
          aria-label={t("day_label")}
          className="grid grid-cols-3 gap-2 sm:grid-cols-5"
        >
          {days.map((d, i) => {
            const selected = i === dayIndex;
            const date = dayDate(d);
            return (
              <button
                key={`${d.y}-${d.m}-${d.d}`}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={fmt.dayLong.format(date)}
                onClick={() => setDayIndex(i)}
                className={cn(
                  "flex flex-col items-center rounded-xl border px-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-border-theme bg-bg/50 text-fg hover:border-accent"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-[0.14em]",
                    selected ? "text-white/80" : "text-fg-muted"
                  )}
                >
                  {fmt.dayShort.format(date)}
                </span>
                <span className="numeral mt-1 text-[22px] leading-none">
                  {fmt.dayNum.format(date)}
                </span>
                <span
                  className={cn("mt-1 text-[11px]", selected ? "text-white/80" : "text-fg-muted")}
                >
                  {fmt.month.format(date)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time */}
        <p className={cn(stepLabel, "mt-8")}>{t("time_label")}</p>
        <div
          role="radiogroup"
          aria-label={t("time_label")}
          className="grid grid-cols-2 gap-2 sm:grid-cols-5"
        >
          {BOOKING.slots.map((s) => {
            const selected = s === slot;
            const reference = day ?? days[0];
            const instant = slotInstant(reference, s);
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSlot(s)}
                className={cn(
                  "flex flex-col items-center rounded-xl border px-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-border-theme bg-bg/50 text-fg hover:border-accent"
                )}
              >
                <span className="text-[15px] font-semibold">
                  {fmt.boliviaTime.format(instant)}
                </span>
                {!sameZone(reference, s) && (
                  <span
                    className={cn(
                      "mt-0.5 text-[10.5px]",
                      selected ? "text-white/80" : "text-fg-muted"
                    )}
                  >
                    {t("your_time", {
                      // Name the day only when the slot falls on a different
                      // date for the visitor, which keeps the common case short.
                      time:
                        fmt.boliviaDay.format(instant) === fmt.localDay.format(instant)
                          ? fmt.localHour.format(instant)
                          : fmt.localTime.format(instant),
                    })}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-fg-muted">{t("zone_note")}</p>
      </div>

      {/* Details and send */}
      <div className="flex flex-col rounded-2xl border border-border-theme bg-bg/40 p-5">
        <p className={stepLabel}>{t("details_label")}</p>
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name_placeholder")}
            aria-label={t("name_placeholder")}
            maxLength={80}
            className={inputStyles}
          />
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("topic_placeholder")}
            aria-label={t("topic_placeholder")}
            rows={3}
            maxLength={400}
            className={cn(inputStyles, "resize-none")}
          />
        </div>

        <div className="mt-5 border-t border-border-theme pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
            {t("summary_label")}
          </p>
          <p className="mt-1.5 min-h-[44px] text-[15px] font-semibold leading-snug text-fg" aria-live="polite">
            {chosen ? t("summary", chosen) : t("pick_first")}
          </p>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-whatsapp-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MessageCircle className="h-4 w-4" />
            {t("submit")}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white opacity-40"
          >
            <MessageCircle className="h-4 w-4" />
            {t("submit")}
          </button>
        )}
        <p className="mt-3 text-center text-[11.5px] leading-relaxed text-fg-muted">
          {t("confirm_note")}
        </p>
      </div>
    </div>
  );
}
