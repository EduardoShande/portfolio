"use client";

import { useTranslations } from "next-intl";

const ITEM_KEYS = [
  "ai_agents",
  "automation",
  "data",
  "whatsapp",
  "web",
  "ads",
  "apps",
  "integrations",
] as const;

/**
 * Angled infinite ticker straddling the seam between the hero and the stat
 * band. Lifted from the Web3 reference, where the tilted service strip is
 * what makes the fold feel engineered rather than stacked.
 *
 * The track holds the item list twice; the keyframe translates it -50%, so
 * the loop is seamless regardless of how wide the content renders.
 */
export default function MarqueeStrip() {
  const t = useTranslations("home.marquee");
  const items = ITEM_KEYS.map((key) => t(key));
  const sequence = [...items, ...items];

  // overflow-x-clip on the wrapper is load-bearing: the track is rotated and
  // scaled past 100% width, which otherwise puts a horizontal scrollbar on
  // the whole page.
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
