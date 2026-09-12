"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

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
  children?: React.ReactNode;
};

type ButtonProps = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps>;

export default function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { buttonVariants };
