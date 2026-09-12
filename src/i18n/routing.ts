import { defineRouting } from "next-intl/routing";

/**
 * English is the default locale: the site is aimed first at US employers and
 * US clients, with Spanish one click away for local work. The internal
 * pathname keys are English too, so `<Link href="/work">` reads the same way
 * it renders.
 */
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/work": {
      en: "/work",
      es: "/trabajo",
    },
    "/about": {
      en: "/about",
      es: "/sobre-mi",
    },
    "/services": {
      en: "/services",
      es: "/servicios",
    },
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
  },
});
