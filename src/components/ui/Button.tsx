"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/navigation";

/**
 * Pill buttons with tracked uppercase labels, matching the rounded CTAs in
 * the real-estate and airline references.
 */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase tracking-[0.1em] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-band",
        ghost:
          "border border-fg/25 text-fg hover:border-accent hover:text-accent",
        band: "border border-white/30 text-white hover:bg-white hover:text-band",
        bandSolid: "bg-accent text-white hover:bg-white hover:text-band",
        link: "text-accent hover:text-band px-0",
        whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
      },
      size: {
        sm: "h-10 px-5 text-[11px]",
        md: "h-12 px-6 text-[12px]",
        lg: "h-14 px-8 text-[12px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  href?: string;
  /** Force a plain anchor for an internal-looking path (e.g. the CV PDF). */
  external?: boolean;
  children?: React.ReactNode;
};

type ButtonProps = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps>;

const MotionLink = motion.create(Link);

const hoverMotion = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { duration: 0.2 },
} as const;

export default function Button({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    // Internal routes go through the locale-aware Link so the Spanish site
    // resolves /work to /trabajo. Absolute URLs, mailto:, hashes and static
    // files (anything with a dot) stay plain anchors.
    const isRoute = !external && href.startsWith("/") && !href.includes(".");

    if (isRoute) {
      return (
        <MotionLink
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={href as any}
          {...hoverMotion}
          className={classes}
        >
          {children}
        </MotionLink>
      );
    }

    const isAbsolute = href.startsWith("http");
    return (
      <motion.a
        href={href}
        target={isAbsolute || external ? "_blank" : undefined}
        rel={isAbsolute || external ? "noopener noreferrer" : undefined}
        {...hoverMotion}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...hoverMotion} className={classes} {...props}>
      {children}
    </motion.button>
  );
}

export { buttonVariants };
