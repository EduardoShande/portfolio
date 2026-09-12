"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Container from "@/components/ui/Container";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  EMAIL_URL,
  WHATSAPP_URL,
} from "@/lib/constants";
import { PROFILE } from "@/lib/content";
import { navLinks } from "./Navbar";
import { useLocale } from "next-intl";
import { toLocale } from "@/lib/content";

const elsewhere = [
  { href: GITHUB_URL, Icon: GithubIcon, label: "GitHub" },
  { href: LINKEDIN_URL, Icon: LinkedinIcon, label: "LinkedIn" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const lang = toLocale(useLocale());
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border-theme bg-bg-sunken">
      <div
        aria-hidden="true"
        className="absolute -left-20 top-0 h-full w-[24rem] -rotate-12 bg-accent/[0.04]"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <p className="font-heading text-xl font-bold tracking-[-0.02em]">
              <span className="text-accent">Eduardo</span>
              <span className="text-fg"> Shande</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {t("description")}
            </p>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {PROFILE.location[lang]}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg">
              {t("nav_title")}
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + elsewhere */}
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg">
              {t("contact_title")}
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={EMAIL_URL}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" />
                  {PROFILE.phone}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg">
              {t("elsewhere_title")}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {elsewhere.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-border-theme text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border-theme pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            © {year} {PROFILE.shortName}. {t("rights")}
          </p>
          <p className="text-xs text-fg-muted">
            {t("studio_note")}{" "}
            <span className="font-semibold text-accent">{PROFILE.studio}</span>.
          </p>
        </div>
      </Container>
    </footer>
  );
}
