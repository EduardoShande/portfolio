/**
 * The brush-stroke tear where the light page gives way to the navy band 
 * the device the airline reference uses instead of a straight section rule.
 *
 * `flip` inverts it for the bottom of a band. The colour comes from the
 * parent's `currentColor`, so wrap it in a `text-band` element.
 */
export default function TornEdge({
  flip = false,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-[46px] w-full lg:h-[70px] ${
        flip ? "rotate-180" : ""
      } ${className ?? ""}`}
    >
      <path
        fill="currentColor"
        d="M0,44 C120,64 210,18 330,30 C450,42 520,72 640,60 C760,48 830,8 950,16 C1070,24 1150,58 1270,52 C1350,48 1400,36 1440,30 L1440,70 L0,70 Z"
      />
    </svg>
  );
}
