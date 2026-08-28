/**
 * Fuente única de verdad para las rutas corporativas estáticas: selector de
 * idioma, hreflang/canonical, sitemap y navegación leen todos de aquí.
 *
 * Una clave es "traducida" si (y solo si) su entrada tiene `en`. No existe
 * ninguna lista separada de claves traducidas — se deriva de esta misma
 * tabla, para que no puedan desincronizarse. Traducir una página en el
 * futuro es agregar su `en` aquí; nada más necesita tocarse a mano.
 *
 * Los slug-maps de rutas dinámicas (servicios, envases) van en este mismo
 * archivo cuando lleguen, con esta forma:
 *
 *   import type { services } from "../data/services";
 *   type ServiceSlug = (typeof services)[number]["slug"];
 *   export const serviceSlugMap: Record<ServiceSlug, string> = { ... };
 *
 * Prerrequisito para esa fase (no aplica ahora): `services.ts` y
 * `packagingCatalog.ts` declaran sus arrays con `: Service[]` /
 * `: PackagingCategory[]`, una anotación que ensancha cada `slug` a `string`
 * genérico. `(typeof services)[number]["slug"]` necesita en cambio
 * `satisfies Service[]` (sin anotación de tipo explícita) para que los
 * slugs se infieran como unión de literales — de lo contrario
 * `Record<ServiceSlug, string>` sería en la práctica `Record<string, string>`
 * y no fallaría el build si falta un slug en inglés. Ver docs/ESTADO.md.
 */

export const routes = {
  home: { es: "/" },
  contact: { es: "/contactanos", en: "/en/contact" },
  projects: { es: "/proyectos" },
  services: { es: "/servicios" },
  packaging: { es: "/envases" },
  support: { es: "/soporte-tecnico" },
  privacy: { es: "/privacidad" },
  terms: { es: "/terminos" },
} as const;

export type RouteKey = keyof typeof routes;

/** Claves cuya entrada tiene `en` — derivado del propio objeto `routes`, no de una lista aparte. */
type TranslatedRouteKey = {
  [K in RouteKey]: (typeof routes)[K] extends { en: string } ? K : never;
}[RouteKey];

export function isTranslated(key: RouteKey): key is TranslatedRouteKey {
  return "en" in routes[key];
}

/**
 * Entrada completa {es, en} si `key` está traducida, o `null`. Se indexa
 * `routes[key]` DESPUÉS del narrowing de `isTranslated` (no antes, en una
 * variable ya calculada) — de lo contrario TypeScript no propaga el tipo
 * estrechado y `entry.en` no tipa como presente aunque en runtime sí lo esté.
 */
export function getTranslatedEntry(key: RouteKey): { es: string; en: string } | null {
  if (!isTranslated(key)) return null;
  return routes[key];
}

/**
 * URL para `key` en `locale`. Si `locale` es "en" pero la ruta no está
 * traducida todavía, cae al español — misma política para Navbar y para
 * cualquier otro consumidor futuro, todos leyendo esta única función.
 */
export function getRouteHref(key: RouteKey, locale: "es" | "en"): string {
  if (locale === "en" && isTranslated(key)) {
    return routes[key].en;
  }
  return routes[key].es;
}

/**
 * URL absoluta a partir de un path relativo. Trata la raíz explícitamente
 * en vez de concatenar a ciegas (evitar "https://site" + "/" mal unido, o
 * "https://site" + "" si algún día un path llegara vacío).
 */
export function buildAbsoluteUrl(path: string, origin: string): string {
  const cleanOrigin = origin.replace(/\/$/, "");
  return path === "/" ? `${cleanOrigin}/` : `${cleanOrigin}${path}`;
}
