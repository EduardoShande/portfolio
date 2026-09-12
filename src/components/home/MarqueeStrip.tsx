"use client";

/**
 * Angled infinite ticker straddling the seam between the hero and the stat
 * band, lifted from the Web3 reference where the tilted strip is what makes
 * the fold feel engineered rather than stacked.
 *
 * The items are tool names, so they are language-neutral and live here rather
 * than in the message files.
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
  "React",
  "FastAPI",
  "LangChain",
  "WhatsApp API",
  "Power BI",
  "AWS",
];

// overflow-x-clip on the wrapper is load-bearing: the track is rotated and
// scaled past 100% width, which otherwise puts a horizontal scrollbar on the
// whole page.
export default function MarqueeStrip() {
  // The track holds the list twice and translates -50%, so the loop is
  // seamless regardless of how wide the content renders.
  const sequence = [...TOOLS, ...TOOLS];

  return (
    <div className="relative z-20 -mt-10 mb-[-3rem] overflow-x-clip lg:-mt-16 lg:mb-[-4rem]">
      <div className="-rotate-[2.5deg] scale-110">
        <div className="overflow-hidden border-y border-accent-deep/40 bg-accent py-3.5">
          <div className="marquee-track">
            {sequence.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs"
              >
                {item}
                <span aria-hidden="true" className="mx-6 text-white/50 sm:mx-9">
                  &#10022;
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
