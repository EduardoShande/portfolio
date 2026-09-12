"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/servicios", key: "services" },
  { href: "/nosotros", key: "about" },
  { href: "/casos", key: "cases" },
  { href: "/contacto", key: "contact" },
] as const;

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
            className="fixed right-0 top-0 h-full w-72 bg-bg-elevated border-l border-border-theme p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <LanguageSwitcher />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="rounded-[2px] p-2 text-fg-muted hover:text-fg hover:bg-fg/5 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-[2px] px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-8">
              <Button variant="whatsapp" href={WHATSAPP_URL} className="w-full">
                {t("cta")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
