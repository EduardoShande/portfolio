"use client";

import { TOOL_MARKS } from "@/lib/tool-marks";

/**
 * A slow band of the tools he works in, each shown by its own mark.
 *
 * Names alone read as a keyword list; the logos make the band scannable at a
 * glance and say "these are real tools" without any extra copy. Each mark
 * sits on a small white tile in its brand colour, so dark marks such as
 * Python's blue stay legible in the dark theme too.
 *
 * The edges fade rather than cut, so items enter and leave instead of
 * appearing at a hard boundary.
 */
export default function MarqueeStrip() {
  // The track holds the list twice and translates -50%, so the loop is
  // seamless regardless of how wide the content renders.
  const sequence = [...TOOL_MARKS, ...TOOL_MARKS];

  return (
    <div className="border-y border-border-theme bg-bg-sunken/40">
      <p className="sr-only">
        Tools: {TOOL_MARKS.map((tool) => tool.name).join(", ")}
      </p>
      <div
        aria-hidden="true"
        className="overflow-hidden py-5"
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
              key={`${tool.name}-${i}`}
              className="mr-12 flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(18,23,43,.08)] bg-white shadow-[0_6px_14px_-10px_rgba(18,23,43,.45)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill={`#${tool.hex}`}
                >
                  <path d={tool.path} />
                </svg>
              </span>
              <span className="font-heading text-[15px] font-semibold tracking-[-0.01em] text-fg">
                {tool.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
