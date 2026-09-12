import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * The site used to be Spanish-by-default with Spanish pathname keys, so its
 * public URLs were /servicios, /nosotros, /casos, /contacto (and /en/... for
 * English). The rebuild made English the default and renamed the routes, which
 * would leave every existing bookmark, share and search result on a 404.
 *
 * These permanent redirects map each old URL onto its new equivalent. Remove
 * them once the old URLs have dropped out of search results.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old Spanish URLs (no prefix back then) -> new /es/... paths
      { source: "/servicios", destination: "/es/servicios", permanent: true },
      { source: "/nosotros", destination: "/es/sobre-mi", permanent: true },
      { source: "/casos", destination: "/es/trabajo", permanent: true },
      { source: "/contacto", destination: "/es/contacto", permanent: true },

      // Old English URLs (prefixed back then) -> new unprefixed paths
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/services", destination: "/services", permanent: true },
      { source: "/en/about", destination: "/about", permanent: true },
      { source: "/en/cases", destination: "/work", permanent: true },
      { source: "/en/contact", destination: "/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
