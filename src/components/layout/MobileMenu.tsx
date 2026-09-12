"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import { navLinks } from "./Navbar";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 flex h-full w-72 flex-col border-l border-border-theme bg-bg-elevated p-6"
          >
            <div className="mb-10 flex items-center justify-between">
              <LanguageSwitcher />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close menu"
                className="cursor-pointer rounded-full p-2 text-fg-muted hover:bg-fg/5 hover:text-fg"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-baseline gap-3 border-b border-border-theme py-4 transition-colors hover:text-accent"
                  >
                    <span className="numeral text-[11px] text-accent">
                      0{i + 1}
                    </span>
                    <span className="font-heading text-lg font-semibold text-fg">
                      {t(link.key)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <SocialLinks className="mb-5" />
              <Button variant="primary" href="/contact" className="w-full">
                {t("cta")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
