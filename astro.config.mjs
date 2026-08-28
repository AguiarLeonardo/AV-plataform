// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import { routes, getTranslatedEntry, buildAbsoluteUrl } from './src/i18n/routes.ts';
import { getLangFromUrl } from './src/i18n/utils.ts';

/**
 * @astrojs/sitemap trae una opción `i18n` integrada, pero asume que cada
 * locale repite el mismo slug (`/foo` <-> `/en/foo`) — no aplica aquí,
 * porque los slugs se traducen de verdad (`/contactanos` <-> `/en/contact`).
 * Por eso se arma el hreflang del sitemap a mano en `serialize()`, leyendo
 * el mismo registro de src/i18n/routes.ts que usan el Navbar y el
 * LanguageSwitcher — nada hardcodeado aquí aparte de esa única fuente.
 *
 * @param {string} pathname
 * @param {"es" | "en"} locale
 * @returns {keyof typeof routes | undefined}
 */
function findRouteKeyForPath(pathname, locale) {
  const keys = /** @type {(keyof typeof routes)[]} */ (Object.keys(routes));
  return keys.find((key) => {
    const entry = /** @type {{ es: string; en?: string }} */ (routes[key]);
    return locale === 'en' ? entry.en === pathname : entry.es === pathname;
  });
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.asiaven.com',
  trailingSlash: 'never',

  // redirectToDefaultLocale solo tiene efecto con prefixDefaultLocale:
  // true (fuerza que "/" redirija a "/[defaultLocale]/"). Con
  // prefixDefaultLocale: false, el español ya vive en "/" sin redirect, así
  // que esa opción sería un no-op aquí — se omite en vez de dejarla
  // configurada sin efecto, para no inducir a error a quien la lea después.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        const locale = getLangFromUrl(url);
        const routeKey = findRouteKeyForPath(url.pathname, locale);
        const entry = routeKey ? getTranslatedEntry(routeKey) : null;

        if (!entry) {
          return item;
        }

        return {
          ...item,
          links: [
            { lang: 'es', url: buildAbsoluteUrl(entry.es, url.origin) },
            { lang: 'en', url: buildAbsoluteUrl(entry.en, url.origin) },
            { lang: 'x-default', url: buildAbsoluteUrl(entry.es, url.origin) },
          ],
        };
      },
    }),
  ]
});