/**
 * Fuente única de verdad para las rutas corporativas estáticas: selector de
 * idioma, hreflang/canonical, sitemap y navegación leen todos de aquí.
 *
 * Una clave es "traducida" si (y solo si) su entrada tiene `en`. No existe
 * ninguna lista separada de claves traducidas — se deriva de esta misma
 * tabla, para que no puedan desincronizarse. Traducir una página en el
 * futuro es agregar su `en` aquí; nada más necesita tocarse a mano.
 *
 * `packaging` (`/envases`) traduce aquí solo el aviso `/en/packaging` — el
 * catálogo en sí (`/envases` y sus rutas de detalle) sigue sin versión
 * inglesa a propósito (ver docs/ESTADO.md). `/envases/index.astro` no pasa
 * `routeKey`, así que no muestra selector ni hreflang pese a que esta
 * entrada ya tiene `en` — la traducción es unidireccional, solo para que
 * `/en/packaging` tenga adónde apuntar.
 *
 * Las 8 páginas de detalle de servicios (`/servicios/[slug]`) NO son una
 * RouteKey fija — son 8 pares {es,en} distintos, uno por servicio. Su mapa
 * de slugs y sus helpers de URL viven más abajo en este mismo archivo
 * (`serviceSlugMap`, `getServiceDetailUrls`), no aquí en `routes`.
 */

export const routes = {
  home: { es: "/", en: "/en" },
  contact: { es: "/contactanos", en: "/en/contact" },
  projects: { es: "/proyectos", en: "/en/projects" },
  services: { es: "/servicios", en: "/en/services" },
  packaging: { es: "/envases", en: "/en/packaging" },
  support: { es: "/soporte-tecnico", en: "/en/technical-support" },
  privacy: { es: "/privacidad", en: "/en/privacy" },
  terms: { es: "/terminos", en: "/en/terms" },
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

// ---------------------------------------------------------------------------
// Detalle de servicios: 8 pares {es,en} con slug traducido, no una RouteKey.
// ---------------------------------------------------------------------------

import type { services } from "../data/services";

/**
 * `services.ts` declara su array con `satisfies Service[]` (no `: Service[]`)
 * Y cada `slug` lleva `as const` (ej. `"ascensores" as const`) — las dos
 * cosas son necesarias, no una sola: `satisfies Service[]` por sí solo NO
 * alcanza, porque `Service.slug` está tipado como `string` en la interfaz y
 * `satisfies` usa ese tipo como contexto para inferir el literal, ensanchando
 * cada slug a `string` de todas formas (comprobado con un caso mínimo antes
 * de aplicar este fix — sin `as const` en el campo, un slug inventado
 * compilaba sin error). Con `as const` por campo, `images`/`features` del
 * mismo objeto siguen siendo arrays mutables normales — el `as const` no se
 * aplica al objeto completo, solo al string literal de `slug`.
 *
 * Verificado: quitando una entrada de `serviceSlugMap` a propósito, el build
 * (`astro check`, parte de `npm run build`) falla con "Property [slug] is
 * missing in type... but required in type Record<ServiceSlug, string>" en
 * vez de compilar en silencio y servir un 404 en producción.
 */
export type ServiceSlug = (typeof services)[number]["slug"];

/**
 * Slug en inglés por servicio — término del sector, no traducción literal
 * (criterio explícito de la tarea que agregó esta fase). Si se agrega un
 * servicio nuevo a `services.ts` sin su entrada aquí, `Record<ServiceSlug,
 * string>` hace fallar el build en vez de servir un 404 en producción.
 */
export const serviceSlugMap: Record<ServiceSlug, string> = {
  ascensores: "elevators",
  "escaleras-mecanicas": "escalators",
  "tecnologia-y-telecomunicaciones": "technology-and-telecommunications",
  envases: "packaging",
  construccion: "construction",
  "recipientes-gas-licuado": "lpg-containers",
  mantenimiento: "maintenance",
  "compras-internacionales": "international-procurement",
} as const;

/**
 * Slug español a partir del slug traducido que llega en la URL — usado por
 * `getStaticPaths` de la página de detalle en inglés, que solo conoce el
 * slug ya traducido (el `param` de la ruta), no el original.
 */
export function getEsSlugFromEnSlug(enSlug: string): ServiceSlug | undefined {
  return (Object.keys(serviceSlugMap) as ServiceSlug[]).find((esSlug) => serviceSlugMap[esSlug] === enSlug);
}

/**
 * Par {es,en} de URLs de detalle para un slug español dado. Es la función
 * que usan Hreflang y LanguageSwitcher en las páginas de detalle — ninguna
 * de las dos calcula el slug hermano quitando/poniendo el prefijo "/en/" a
 * mano, por indicación explícita de la tarea que agregó esta fase.
 */
export function getServiceDetailUrls(esSlug: ServiceSlug): { es: string; en: string } {
  return {
    es: `${routes.services.es}/${esSlug}`,
    en: `${routes.services.en}/${serviceSlugMap[esSlug]}`,
  };
}

/**
 * Todos los pares {es,en} traducidos del sitio — las RouteKey fijas más los
 * 8 de detalle de servicios. Única lista que usa `serialize()` del sitemap
 * (astro.config.mjs) para decidir a qué páginas agregarles hreflang; nada
 * hardcodeado ahí aparte de esta función.
 */
export function getAllTranslatedPairs(): { es: string; en: string }[] {
  const fixedPairs = (Object.keys(routes) as RouteKey[])
    .map((key) => getTranslatedEntry(key))
    .filter((entry): entry is { es: string; en: string } => entry !== null);

  const servicePairs = (Object.keys(serviceSlugMap) as ServiceSlug[]).map((slug) => getServiceDetailUrls(slug));

  return [...fixedPairs, ...servicePairs];
}
