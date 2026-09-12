"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/navigation";

/**
 * Buttons are sharp rectangles, not pills — matching the hard-edged CTA
 * blocks in the industrial and airline references. Weight and tracking do
 * the work that a border-radius used to.
 */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-[2px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-deep shadow-[0_8px_30px_-12px] shadow-accent/60",
        secondary:
          "border border-fg/25 text-fg hover:border-accent hover:text-accent",
        outline:
          "border border-accent text-accent hover:bg-accent hover:text-white",
        ghost: "text-fg-muted hover:text-accent",
        band: "border border-white/30 text-white hover:bg-white hover:text-band",
        whatsapp:
          "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[0_8px_30px_-12px] shadow-whatsapp/60",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-xs",
        lg: "h-14 px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  href?: string;
  /** Force an external anchor for an internal-looking path (e.g. a PDF). */
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
    // resolves /work to /trabajo. Anything else — http(s), mailto, tel, a
    // hash, or a static file like the CV — stays a plain anchor.
    const isRoute =
      !external && href.startsWith("/") && !href.includes(".");

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
