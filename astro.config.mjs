// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import { getAllTranslatedPairs, buildAbsoluteUrl } from './src/i18n/routes.ts';
import { getLangFromUrl } from './src/i18n/utils.ts';

/**
 * @astrojs/sitemap trae una opción `i18n` integrada, pero asume que cada
 * locale repite el mismo slug (`/foo` <-> `/en/foo`) — no aplica aquí,
 * porque los slugs se traducen de verdad (`/contactanos` <-> `/en/contact`,
 * `/servicios/ascensores` <-> `/en/services/elevators`). Por eso se arma el
 * hreflang del sitemap a mano en `serialize()`, leyendo el mismo
 * `getAllTranslatedPairs()` de src/i18n/routes.ts que usan Hreflang y
 * LanguageSwitcher — nada hardcodeado aquí aparte de esa única fuente. Cubre
 * tanto las RouteKey fijas como los 8 pares de detalle de servicios por
 * igual, sin distinguir entre ambos.
 *
 * @param {string} pathname
 * @param {"es" | "en"} locale
 * @returns {{ es: string; en: string } | undefined}
 */
function findTranslatedPair(pathname, locale) {
  return getAllTranslatedPairs().find((pair) => (locale === 'en' ? pair.en === pathname : pair.es === pathname));
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
        const entry = findTranslatedPair(url.pathname, locale);

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