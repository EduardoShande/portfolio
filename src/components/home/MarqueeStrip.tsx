"use client";

/**
 * A quiet hairline band of the tools he works in.
 *
 * This was a thick saturated slab tilted a couple of degrees, which is a
 * sale-banner gesture: it read louder than the work it sits above and dated
 * the page. It is now level, unfilled, bounded by two hairlines, set small
 * and muted with the accent used only for the separators. It still moves,
 * slowly, so the band reads as a list rather than a decoration.
 *
 * The edges fade rather than cut, so items enter and leave instead of
 * appearing at a hard boundary.
 */
const TOOLS = [
  "Python",
  "n8n",
  "Apache Airflow",
  "dbt",
  "PostgreSQL",
  "Snowflake",
  "BigQuery",
  "Docker",
  "FastAPI",
  "LangChain",
  "WhatsApp API",
  "Power BI",
];

export default function MarqueeStrip() {
  // The track holds the list twice and translates -50%, so the loop is
  // seamless regardless of how wide the content renders.
  const sequence = [...TOOLS, ...TOOLS];

  return (
    <div className="border-y border-border-theme bg-bg-sunken/40">
      <div
        className="overflow-hidden py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track">
          {sequence.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="flex shrink-0 items-center whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-fg-muted"
            >
              {tool}
              <span
                aria-hidden="true"
                className="mx-8 text-[7px] text-accent/70"
              >
                &#9670;
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
