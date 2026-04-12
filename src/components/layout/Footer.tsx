"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { WHATSAPP_URL, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-border-theme bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-bold font-heading tracking-tight">
              <span className="text-accent-light">Syco</span>
              <span className="text-fg">smart</span>
            </span>
            <p className="mt-3 text-sm text-fg-muted max-w-xs">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-muted">
              {t("services")}
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Agentes de IA",
                "Automatización",
                "Meta Ads",
                "Desarrollo Web",
                "Chatbots",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/servicios"
                    className="text-sm text-fg-muted hover:text-accent-light transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-muted">
              {t("company")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-fg-muted hover:text-accent-light transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/casos"
                  className="text-sm text-fg-muted hover:text-accent-light transition-colors"
                >
                  {nav("cases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-fg-muted hover:text-accent-light transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-muted">
              {t("contact")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted hover:text-whatsapp transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-fg-muted hover:text-accent-light transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 border-t border-border-theme pt-8">
          <p className="text-center text-xs text-fg-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
