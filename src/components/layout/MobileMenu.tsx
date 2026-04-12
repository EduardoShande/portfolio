"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-72 bg-brand-dark border-l border-white/5 p-6">
        <div className="flex items-center justify-between mb-8">
          <LanguageSwitcher />
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button variant="whatsapp" href={WHATSAPP_URL} className="w-full">
            {t("cta")}
          </Button>
        </div>
      </div>
    </div>
  );
}
