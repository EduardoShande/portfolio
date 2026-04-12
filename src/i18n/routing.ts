import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      en: "/services",
    },
    "/nosotros": {
      es: "/nosotros",
      en: "/about",
    },
    "/casos": {
      es: "/casos",
      en: "/cases",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
  },
});
