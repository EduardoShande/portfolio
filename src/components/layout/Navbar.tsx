"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
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

export default function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-bg/85 backdrop-blur-xl border-b border-border-theme"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Wordmark is the person, not a company */}
            <Link href="/" className="flex items-center gap-2">
              <motion.span
                whileHover={{ x: 2 }}
                className="font-heading text-lg font-bold tracking-[-0.02em]"
              >
                <span className="text-accent">Eduardo</span>
                <span className="text-fg"> Shande</span>
              </motion.span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="rounded-[2px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-accent"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button variant="primary" size="sm" href="/contact">
                {t("cta")}
              </Button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className="rounded-[2px] p-2 text-fg-muted hover:text-fg hover:bg-fg/5 cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
