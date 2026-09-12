"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion } from "motion/react";
import { Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export const navLinks = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Deliberately quiet.
 *
 * The bar previously carried a large filled accent pill, a bordered language
 * toggle and a bordered theme button, which together made the loudest thing
 * on the page a set of controls nobody came for. Everything here is now type
 * and space: a wordmark closed with an accent full stop, links that state
 * themselves once, and a contact link that underlines on hover rather than
 * sitting in a block of colour. The accent appears exactly twice.
 */
export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only the home page opens on the dark header, so only there does the bar
  // start transparent with light type.
  const onDark = pathname === "/" && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-40 transition-colors duration-500",
          onDark
            ? "bg-transparent"
            : isScrolled
              ? "border-b border-border-theme bg-bg/90 backdrop-blur-xl"
              : "bg-bg"
        )}
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="flex h-[76px] items-center justify-between gap-8">
            <Link
              href="/"
              className={cn(
                "font-heading text-[19px] font-bold tracking-[-0.025em] transition-colors",
                onDark ? "text-white" : "text-fg"
              )}
            >
              Eduardo Shande<span className="text-accent">.</span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-medium tracking-[0.01em] transition-colors",
                    onDark
                      ? "text-white/65 hover:text-white"
                      : "text-fg-muted hover:text-fg"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-7 lg:flex">
              <LanguageSwitcher onDark={onDark} />
              <ThemeToggle onDark={onDark} />
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex items-center gap-2 border-b pb-1 text-[13px] font-medium transition-colors",
                  onDark
                    ? "border-white/25 text-white hover:border-accent hover:text-accent"
                    : "border-fg/20 text-fg hover:border-accent hover:text-accent"
                )}
              >
                {t("cta")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle onDark={onDark} />
              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "cursor-pointer transition-colors hover:text-accent",
                  onDark ? "text-white" : "text-fg"
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
