"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40",
        secondary:
          "border-2 border-accent-light text-accent-light hover:bg-accent-light/10",
        ghost: "text-fg hover:bg-fg/5",
        whatsapp:
          "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-lg shadow-whatsapp/25",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
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
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { buttonVariants };
