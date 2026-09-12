"use client";

/**
 * Angled infinite ticker, from the Web3 reference, straddling the seam
 * below the hero. Tool names are language-neutral, so they live here.
 */
const TOOLS = [
  "Python", "n8n", "Apache Airflow", "dbt", "PostgreSQL", "Snowflake",
  "BigQuery", "Docker", "FastAPI", "LangChain", "WhatsApp API", "Power BI",
];

// overflow-x-clip on the wrapper is load-bearing: the track is rotated and
// scaled past 100% width, which otherwise puts a horizontal scrollbar on the
// whole page.
export default function MarqueeStrip() {
  const sequence = [...TOOLS, ...TOOLS];

  return (
    <div className="mt-16 overflow-x-clip lg:mt-20">
      <div className="rotate-[-2.2deg] scale-[1.06]">
        <div className="overflow-hidden border-y border-black/15 bg-accent py-[15px]">
          <div className="marquee-track">
            {sequence.map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="flex shrink-0 items-center whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.22em] text-white"
              >
                {tool}
                <span aria-hidden="true" className="mx-[30px] text-white/50">
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
