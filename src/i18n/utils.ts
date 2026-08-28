import { dictionaries, type Locale } from "./index";

type Dictionary = (typeof dictionaries)["es"];

/** Todas las rutas de clave anidadas del diccionario ("nav.home", "contact.faqs", ...). Los arrays cuentan como hoja: no se expanden índice por índice. */
type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends readonly unknown[]
    ? K
    : T[K] extends object
      ? `${K}.${NestedKeyOf<T[K]>}`
      : K;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<Dictionary>;

/** Resuelve el tipo del valor real al final de una ruta de clave (string, array de FAQs, etc.), no solo `unknown`. */
type PathValue<T, Path extends string> = Path extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? PathValue<T[Head], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

function readPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);
}

/** `t('es', 'contact.formHeading')` — autocompletado y tipo de retorno derivados del diccionario. */
export function t<K extends TranslationKey>(locale: Locale, key: K): PathValue<Dictionary, K> {
  return readPath(dictionaries[locale], key) as PathValue<Dictionary, K>;
}

/**
 * Deriva el locale a partir de una URL para contextos SIN acceso al global
 * `Astro` — hoy, el único caso real es el `serialize()` de @astrojs/sitemap
 * en astro.config.mjs, que corre como función plana de Node en build.
 *
 * En cualquier archivo .astro la fuente de verdad es siempre
 * `Astro.currentLocale`: no uses esta función ahí, para no tener dos formas
 * de determinar el idioma compitiendo entre sí.
 */
export function getLangFromUrl(url: URL): Locale {
  return url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "es";
}

/**
 * Forma de los campos de texto multiidioma en src/data/* (services.ts y,
 * cuando llegue su fase, packagingCatalog.ts / techCatalog.ts). Se ancla
 * aquí — no en cada archivo de datos — porque es un concepto de i18n, no de
 * un dataset concreto, y todos los datasets lo comparten.
 */
export interface Localized<T> {
  es: T;
  en: T;
}

/**
 * Única forma permitida de leer un campo `Localized<T>` en un .astro: NUNCA
 * accedas a `campo.es`/`campo.en` de forma literal. Un `.es` hardcodeado
 * compila igual en una página que después se traduzca — mostraría español
 * en la versión en inglés sin ningún error, un fallo silencioso. Con
 * `localize(campo, locale)`, traducir esa ruta en el futuro es cuestión de
 * que le llegue el `locale` correcto, no de perseguir accesos literales.
 */
export function localize<T>(field: Localized<T>, locale: Locale): T {
  return field[locale];
}
