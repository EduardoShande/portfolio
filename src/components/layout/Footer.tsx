"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-white/5 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-bold font-heading tracking-tight">
              <span className="text-brand-purple">Syco</span>
              <span className="text-brand-off-white">smart</span>
            </span>
            <p className="mt-3 text-sm text-white/50 max-w-xs">
              {t("description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/30">
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
                    className="text-sm text-white/50 hover:text-brand-purple-light transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/30">
              {t("company")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-white/50 hover:text-brand-purple-light transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/casos"
                  className="text-sm text-white/50 hover:text-brand-purple-light transition-colors"
                >
                  {nav("cases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-white/50 hover:text-brand-purple-light transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/30">
              {t("contact")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-whatsapp transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-white/50 hover:text-brand-purple-light transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
