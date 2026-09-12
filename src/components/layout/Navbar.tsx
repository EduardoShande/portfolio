"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
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
  // start transparent with light type. Everywhere else it is a normal light
  // bar from the first pixel.
  const overDarkHero = pathname === "/" && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          overDarkHero
            ? "border-b border-transparent bg-transparent"
            : isScrolled
              ? "border-b border-border-theme bg-bg/88 backdrop-blur-xl"
              : "border-b border-transparent bg-bg/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto max-w-[1240px] px-7">
          <div className="flex h-[72px] items-center justify-between lg:h-[76px]">
            <Link href="/" className="flex items-center gap-2">
              <motion.span
                whileHover={{ x: 2 }}
                className="font-heading text-lg font-bold tracking-[-0.02em]"
              >
                <span className="text-accent">Eduardo</span>
                <span className={overDarkHero ? "text-white" : "text-fg"}>
                  {" "}
                  Shande
                </span>
              </motion.span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-accent",
                      overDarkHero ? "text-white/70" : "text-fg-muted"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button variant="primary" size="sm" href="/contact">
                {t("cta")}
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "cursor-pointer rounded-full p-2 transition-colors hover:text-accent",
                  overDarkHero ? "text-white" : "text-fg-muted"
                )}
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
