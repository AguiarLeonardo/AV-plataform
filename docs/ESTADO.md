# Estado Actual del Proyecto — Auditoría de Reconocimiento

**Última actualización:** 2026-08-28 — corresponde al branch `feat/i18n-fase-1b` (sin mergear; parte de `develop` en `e176906`, que ya incluye la Fase 1a).

*Documento generado originalmente por una auditoría de solo lectura y actualizado tras la tarea de saneamiento de dependencias. Es descriptivo, no prescriptivo: reporta hechos verificados en el código, no recomendaciones. Si algo cambia después de la fecha de arriba, este documento queda desactualizado en ese punto — no se actualiza automáticamente.*

---

## 1. Stack y configuración

**Versiones** (de `package.json`, rangos declarados con `^`):
- Astro: `^7.0.7`
- React: `^19.2.7` / `react-dom: ^19.2.7`
- `@astrojs/react`: `^6.0.1`
- Tailwind CSS: `^4.3.2` (vía `@tailwindcss/vite`)
- `lucide-react`: `^1.24.0`
- TypeScript: `^6.0.3` (devDependency) — **pinneado deliberadamente a la major 6**, no a la 7: TypeScript 7 es el nuevo compilador nativo y todavía no expone la API programática que `@astrojs/check` necesita para funcionar (`astro check` falla con un error explícito en TS7). `@astrojs/check@^0.9.10` declara como peer dependency `typescript: "^5.0.0 || ^6.0.0"`, así que 6.x es además la versión más nueva compatible.
- `@astrojs/check`: `^0.9.10` (devDependency)
- Node requerido: `>=22.12.0` (campo `engines`)

**`astro.config.mjs`** (contenido íntegro):
```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.asiaven.com',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});
```
- `site`: **definido** — `https://www.asiaven.com` (dominio de producción; usado para URLs absolutas en canonical/hreflang/sitemap el día que existan, y por integraciones que lo requieran).
- `trailingSlash`: **definido** — `'never'` (sin barra final en las rutas generadas).
- `output`: **no definido** → por defecto `static` (SSG).
- `i18n`: **no definido** (sigue fuera de alcance — ver sección 2).
- Integraciones instaladas: únicamente `@astrojs/react`. No hay `@astrojs/sitemap` ni ninguna otra. `@astrojs/check` está instalado pero no es una integración de Astro (es una devDependency de CLI usada por el script `check`, ver más abajo).

**`tsconfig.json`** (contenido íntegro):
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```
Extiende el preset `strict` de Astro. `strict` está activo por herencia del preset (no se sobreescribe).

**Scripts (`package.json`):**
```json
"dev": "astro dev",
"build": "astro check && astro build",
"preview": "astro preview",
"astro": "astro",
"check": "astro check"
```
`build` ahora ejecuta `astro check` antes de `astro build` — si el type-check falla, el build entero falla (no llega a generar HTML). `check` queda disponible también como script independiente para correr solo el type-check.

**Gestor de paquetes:** npm — existe `package-lock.json` en la raíz. No hay `pnpm-lock.yaml` ni `yarn.lock`.

**Configuración de despliegue:** existe `vercel.json` en la raíz (agregado en la tarea de saneamiento) — su único contenido es una regla de `headers` condicionada por host (ver sección de indexación más abajo), no configura build/output/rutas. No hay `netlify.toml`, `wrangler.toml`, ni directorio `.github/` (por tanto tampoco `.github/workflows/`). Sigue sin haber evidencia en el repo de qué proyecto/organización de Vercel sirve el despliegue; según el historial de trabajo previo documentado en `ESTADO_PROYECTO.md`, el proyecto se despliega en Vercel mediante integración Git del dashboard (configuración fuera del repo).

---

## 2. Estado del trabajo de i18n

**Infraestructura completa; 5 de 11 páginas corporativas traducidas. El resto del sitio corporativo (home, servicios + dinámica, envases + dinámicas) y todo `/store/*` siguen sin tocar.**

### Páginas traducidas (5)
| Español | Inglés | Notas |
|---|---|---|
| `/contactanos` | `/en/contact` | Fase 1a |
| `/proyectos` | `/en/projects` | Fase 1b. `clientes` (nombre/ubicación/sector) traducidos en el diccionario; `ClientLogosCarousel.tsx` **no se tocó** (17 nombres de cliente hardcodeados, son nombres propios — ver Gaps) |
| `/soporte-tecnico` | `/en/technical-support` | Fase 1b |
| `/privacidad` | `/en/privacy` | Fase 1b. Página breve: aviso en inglés de que la versión vinculante es la española, con link a `/privacidad`. No es una traducción del documento — decisión de negocio ya tomada |
| `/terminos` | `/en/terms` | Fase 1b, misma lógica que `/en/privacy` |

### Páginas pendientes (6 corporativas + todo `/store/*`)
`index` (home) y sus secciones, `servicios` (hub + `[servicio]` dinámica), `envases` (hub + `[categoria]`/`producto/[producto]` dinámicas). Ninguna de estas se tocó esta fase.

### Defectos corregidos en esta fase (detectados en el HTML generado de `/en/contact` tras la 1a)
1. **Meta description en español en páginas en inglés.** `Layout.astro` emitía siempre la description hardcodeada (español). Se agregó una prop `description?: string`; si la página no la pasa, cae a `common.defaultDescription` del locale activo (`Astro.currentLocale`), no a un string hardcodeado — mismo patrón que ya existía para `title`. Todas las páginas traducidas (incluida `contact`, retroactivamente) ahora pasan su propia `seo.*.description`.
2. **"EE. UU." en la página en inglés** (dos veces: `en/contact.astro` y `Footer.astro`). Causa raíz: la dirección de la oficina de EE. UU. estaba hardcodeada como string literal duplicado en 3 lugares (`contactanos.astro`, `en/contact.astro`, `Footer.astro`). Se creó la clave `common.usOfficeAddress` en ambos diccionarios (es: "...EE. UU.", en: "...USA") y los 3 lugares ahora la consumen — fuente única, ya no puede volver a desincronizarse entre idiomas.
3. **`WhatsAppButton.astro`** tenía `aria-label="Contactar por WhatsApp"` hardcodeado. Se movió a `common.whatsappLabel`, único cambio que necesitó ese componente.

### Archivos nuevos y su propósito (acumulado, Fase 1a + 1b)
| Archivo | Propósito |
|---|---|
| `src/i18n/routes.ts` | Fuente única de verdad de rutas estáticas corporativas. Una clave es "traducida" si y solo si su entrada tiene `en` — no existe una lista separada que pueda desincronizarse. Expone `RouteKey`, `isTranslated()`, `getTranslatedEntry()`, `getRouteHref()` (con fallback a español si no hay traducción) y `buildAbsoluteUrl()` (trata la raíz explícitamente). En 1b se agregaron `en` a `projects`, `support`, `privacy` y `terms`. |
| `src/i18n/es.ts` | Diccionario base español. Namespaces: `common`, `nav`, `footer`, `contact`, `projects`, `techSupport`, `legal`, `seo`. Solo las claves que hoy usan las páginas ya traducidas — nada para páginas futuras. **No** lleva `as const` (si lo tuviera, cada valor se tiparía a su literal exacto y `en.ts` con traducciones reales dejaría de ser asignable bajo `satisfies`). |
| `src/i18n/en.ts` | `export default { ... } satisfies typeof import('./es').default`. Si falta una clave, `npm run check` falla — **verificado en la Fase 1a** (se borró `common.storeLabel` temporalmente, `astro check` reportó el error esperado, se restauró). |
| `src/i18n/index.ts` | Exporta `dictionaries = { es, en }` y `type Locale`. |
| `src/i18n/utils.ts` | `t(locale, key)` con autocompletado y tipo de retorno derivados del diccionario. `getLangFromUrl(url)` para contextos sin `Astro` global (el `serialize()` del sitemap). |
| `src/components/seo/Hreflang.astro` | Canonical + alternate es + alternate en + x-default (→es), URLs absolutas. Layout solo la renderiza si la página pasó `routeKey`. |
| `src/components/ui/LanguageSwitcher.astro` | Server-only, cero JS. Sin `routeKey` traducida, no renderiza nada. |
| `src/pages/en/contact.astro` | Fase 1a. |
| `src/pages/en/projects.astro` | Fase 1b — mismos componentes que `proyectos/index.astro`, incluyendo `ClientLogosCarousel` sin tocar. |
| `src/pages/en/technical-support.astro` | Fase 1b — mismos componentes que `soporte-tecnico.astro`. |
| `src/pages/en/privacy.astro`, `src/pages/en/terms.astro` | Fase 1b — páginas breves de aviso (ver decisión de legales), no traducciones del documento. |

### Archivos modificados en 1b
`src/i18n/es.ts`/`en.ts` (nuevas claves y namespaces), `src/i18n/routes.ts` (4 nuevas `en`), `src/layouts/Layout.astro` (prop `description?`), `src/components/sections/{Footer,WhatsAppButton}.astro`, `src/pages/contactanos.astro` + `src/pages/en/contact.astro` (pasan `description` retroactivamente, usan `common.usOfficeAddress`), `src/pages/proyectos/index.astro`, `src/pages/soporte-tecnico.astro` (leen del diccionario `es`, sin cambios de diseño/markup).

### Selector de idioma y navegación en páginas no traducidas
Sin cambios respecto a la Fase 1a — política única leída de `routes.ts` en los tres consumidores (switcher, Navbar, `serialize()` del sitemap). Ahora con 5 rutas traducidas en vez de 1, pero el mecanismo es idéntico y no requirió ningún cambio de código.

### `StoreLayout.astro` — pendiente, no tocado
Sigue con `<html lang="es">` hardcodeado.

### Verificación ejecutada (Fase 1b)
`npm run build` → **0 errores**, **353 páginas** (349 + 4: `en/projects`, `en/technical-support`, `en/privacy`, `en/terms`). Verificado por grep directo sobre `dist/`:
- `en/projects/index.html` y `en/technical-support/index.html` tienen canonical + 3 `hreflang` correctos.
- Ninguna página bajo `dist/en/` contiene "EE. UU.", "Contactar por WhatsApp", ni el fragmento de la description en español.
- La meta description de las 5 páginas en inglés está en inglés (verificado una por una).
- `index.html`, `servicios/index.html`, `envases/index.html` (no traducidas): 0 tags hreflang/canonical, 0 selector — cero regresión.

### Hallazgo pendiente de decisión de negocio (NO modificado)
**Los datos de la oficina de Estados Unidos parecen ser de relleno/placeholder:** la dirección ("1234 Miami Ave, Suite 100, Miami, FL 33132") tiene forma genérica de dirección de ejemplo, y el teléfono ("+1 (305) 555-0198") usa el prefijo `555`, reservado en Norteamérica para números ficticios (nunca asignado a líneas reales). Esto aparece igual en `Footer.astro` y en las páginas de contacto de ambos idiomas — no es un defecto introducido por i18n, ya estaba así antes de esta fase. Requiere que el dueño del proyecto confirme los datos reales de esa sede o decida eliminar la sección. No se modificó nada al respecto.

### Gaps / prerrequisitos para las próximas fases
1. **`src/pages/en/404.astro` — sigue sin implementar.** Requiere verificar contra la documentación de Vercel el comportamiento real de 404 por subdirectorio en hosting estático antes de implementarlo.
2. **Prerrequisito para slug-maps dinámicos (servicios, envases):** `services.ts` y `packagingCatalog.ts` necesitan `satisfies Service[]` / `satisfies PackagingCategory[]` en vez de la anotación de tipo explícita actual, para que un futuro `Record<ServiceSlug, string>` sea realmente exhaustivo. No se tocó `src/data/*` esta fase tampoco.
3. **`StoreLayout.astro`** sigue con `<html lang="es">` hardcodeado.
4. **`ClientLogosCarousel.tsx`** — revisado en esta fase por el alcance de `/en/projects`: no tiene texto de UI propio más allá de los 17 nombres de cliente (usados como `alt` de cada logo) — no hay nada que traducir en el componente en sí. Si en el futuro se le agrega texto de interfaz (títulos, botones), ese sí necesitaría diccionario.
5. **PENDIENTE DE VERIFICACIÓN:** cuando `www.asiaven.com` migre a Vercel, confirmar con `curl -I` que ese host **no** devuelve `X-Robots-Tag`, mientras `av-plataform-ruby.vercel.app` sí lo hace (ya verificado en producción el 2026-08-28 — ver sección 8).
6. **Datos de oficina de EE. UU. posiblemente ficticios** — ver hallazgo arriba, pendiente de confirmación del dueño del proyecto.

### Configuración
`astro.config.mjs` tiene el bloque `i18n`:
```js
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en'],
  routing: { prefixDefaultLocale: false },
}
```
`redirectToDefaultLocale` se omitió deliberadamente: solo tiene efecto con `prefixDefaultLocale: true` (fuerza que `/` redirija a `/[defaultLocale]/`); con `prefixDefaultLocale: false` el español ya vive en `/` sin redirect, así que sería un no-op — se prefirió omitirla y dejar un comentario explicando por qué, en vez de una opción configurada sin efecto que induzca a error a quien la lea después.

`@astrojs/sitemap` instalado y configurado con un `serialize()` custom (ver más abajo). `site`/`trailingSlash`/`vercel.json` no se tocaron (ya resueltos en la fase de saneamiento).

### Archivos nuevos y su propósito
| Archivo | Propósito |
|---|---|
| `src/i18n/routes.ts` | Fuente única de verdad de rutas estáticas corporativas. Una clave es "traducida" si y solo si su entrada tiene `en` — no existe una lista separada que pueda desincronizarse. Expone `RouteKey`, `isTranslated()`, `getTranslatedEntry()`, `getRouteHref()` (con fallback a español si no hay traducción) y `buildAbsoluteUrl()` (trata la raíz explícitamente). Contiene el comentario de prerrequisito para los slug-maps dinámicos futuros (ver Gaps más abajo). |
| `src/i18n/es.ts` | Diccionario base español. Namespaces: `common`, `nav`, `footer`, `contact`, `seo`. Solo las claves que hoy usan `contactanos.astro`, `Navbar.astro`, `Footer.astro` — nada para páginas futuras. **No** lleva `as const` (si lo tuviera, cada valor se tiparía a su literal exacto y `en.ts` con traducciones reales dejaría de ser asignable bajo `satisfies`). |
| `src/i18n/en.ts` | `export default { ... } satisfies typeof import('./es').default`. Si falta una clave, `npm run check` falla — **verificado**: se borró `common.storeLabel` temporalmente, `astro check` reportó `error ts(2741): Property 'storeLabel' is missing...`, se restauró y el check volvió a 0 errores. |
| `src/i18n/index.ts` | Exporta `dictionaries = { es, en }` y `type Locale`. |
| `src/i18n/utils.ts` | `t(locale, key)` con autocompletado y tipo de retorno derivados del diccionario (`NestedKeyOf`/`PathValue`). `getLangFromUrl(url)` — documentado como uso exclusivo de contextos sin `Astro` global (el `serialize()` del sitemap, que corre como función plana de Node en build); en cualquier `.astro` la fuente de verdad sigue siendo `Astro.currentLocale`. |
| `src/components/seo/Hreflang.astro` | Monta canonical + alternate es + alternate en + x-default (→es) en el `<head>`, URLs absolutas vía `buildAbsoluteUrl` + `Astro.site`. Layout solo la renderiza si la página pasó `routeKey`. |
| `src/components/ui/LanguageSwitcher.astro` | Server-only, cero JS. Si la ruta actual no está traducida (o no se pasó `routeKey`), **no renderiza nada** — nunca cae a un fallback tipo home, que además ni siquiera existe en inglés esta fase. |
| `src/pages/en/contact.astro` | Versión en inglés de `/contactanos`, mismos componentes, `routeKey="contact"`. |

### Archivos modificados
`Layout.astro` (`<html lang>` dinámico vía `Astro.currentLocale`, prop `routeKey?` opcional, monta `Hreflang` condicionalmente), `Navbar.astro` (labels desde diccionario, hrefs vía `routes.ts`, monta `LanguageSwitcher`), `Footer.astro` (ídem, sin el switcher), `contactanos.astro` (lee del diccionario `es`, sin cambios de diseño/markup), `astro.config.mjs` (i18n + sitemap).

### Selector de idioma y navegación en páginas no traducidas
Política única, leída del mismo `routes.ts` en los tres consumidores (switcher, Navbar, `serialize()` del sitemap) — traducir una página en el futuro es agregar su `en` a `routes.ts`, nada más:
- **LanguageSwitcher:** si la ruta actual no está traducida, no se renderiza. Sin fallback.
- **Navbar (en inglés):** los links a páginas no traducidas (Inicio/Nosotros/Proyectos/Servicios) apuntan a su versión en español — `getRouteHref()` decide esto centralmente, ningún condicional propio en `Navbar.astro`.
- **Sitemap:** `serialize()` solo agrega `links` (alternates) a las URLs cuya `routeKey` está traducida; el resto entra al sitemap como entrada independiente, sin alternates. Escala sin tocar el sitemap: agregar una traducción a `routes.ts` basta.

### `StoreLayout.astro` — pendiente, no tocado esta fase
Sigue con `<html lang="es">` hardcodeado, igual que antes de esta fase.

### Verificación ejecutada
`npm run build` (con `astro check` incluido) → **0 errores**, **349 páginas** (348 + 1, solo `en/contact` — no se creó `en/404.astro`, ver Gaps). Ninguna URL generada termina en `/`, ni siquiera la raíz (`site` sin slash + `trailingSlash: 'never'`). Verificado además en navegador: `/contactanos` y `/en/contact` renderizan correctamente con el selector, `html lang` correcto en cada uno, hreflang/canonical correctos; `/servicios` (no traducida) no muestra el selector ni hreflang — cero regresión.

### Decisión registrada — documentos legales
`privacidad`/`terminos` **no se traducen**; la versión en español es la vinculante. `routes.ts` los tiene registrados (sin `en`) para que sus labels de footer/nav puedan resolverse vía `getRouteHref()`, pero no existen `src/pages/en/privacy.astro` ni `.../terms.astro` todavía. Cuando se construyan, mostrarán una nota breve en inglés indicando que la versión vinculante está en español, con link a ella — no una traducción completa del documento.

### Gaps / prerrequisitos para las próximas fases
1. **`src/pages/en/404.astro` — NO implementado, fuera de alcance de esta fase.** En build estático, Astro genera un único `404.html` desde `src/pages/404.astro` (que tampoco existe hoy en español). Un archivo en `src/pages/en/404.astro` produciría una página normal en `/en/404`, pero que Vercel la sirva automáticamente para rutas no encontradas bajo `/en/*` **no está confirmado** — requiere verificar contra la documentación de Vercel el comportamiento real de 404 por subdirectorio en hosting estático antes de implementarlo, no asumirlo de memoria.
2. **Prerrequisito para slug-maps dinámicos (servicios, envases):** `services.ts` y `packagingCatalog.ts` declaran sus arrays con `: Service[]` / `: PackagingCategory[]`, anotación que ensancha cada `slug` a `string` genérico. Para que un futuro `Record<ServiceSlug, string>` (donde `ServiceSlug = (typeof services)[number]["slug"]`) sea realmente exhaustivo — y falle el build si falta un slug en inglés, en vez de generar silenciosamente una página faltante — esos arrays necesitan `satisfies Service[]` / `satisfies PackagingCategory[]` en vez de la anotación de tipo explícita actual. Cambio trivial pero **no hecho todavía** (`src/data/*` no se tocó esta fase, según alcance).
3. **`StoreLayout.astro`** sigue con `<html lang="es">` hardcodeado (ver arriba).
4. **PENDIENTE DE VERIFICACIÓN:** cuando `www.asiaven.com` migre a Vercel, confirmar con `curl -I` que ese host **no** devuelve `X-Robots-Tag`, mientras `av-plataform-ruby.vercel.app` sí lo hace (ya verificado en producción el 2026-08-28 — ver sección 8).

---

## 3. Mapa de rutas

### Sitio corporativo (`Layout.astro`)
| Ruta URL | Archivo | Tipo | Origen de slugs (si dinámica) |
|---|---|---|---|
| `/` | `src/pages/index.astro` | Estática | — |
| `/contactanos` | `src/pages/contactanos.astro` | Estática | — |
| `/privacidad` | `src/pages/privacidad.astro` | Estática | — |
| `/terminos` | `src/pages/terminos.astro` | Estática | — |
| `/soporte-tecnico` | `src/pages/soporte-tecnico.astro` | Estática | — |
| `/proyectos` | `src/pages/proyectos/index.astro` | Estática | — |
| `/servicios` | `src/pages/servicios/index.astro` | Estática | — |
| `/servicios/[servicio]` | `src/pages/servicios/[servicio].astro` | Dinámica | `getStaticPaths` itera `services` de `src/data/services.ts` (8 registros) |
| `/envases` | `src/pages/envases/index.astro` | Estática | — |
| `/envases/[categoria]` | `src/pages/envases/[categoria].astro` | Dinámica | itera `packagingCategories` de `src/data/packagingCatalog.ts` (5 categorías) |
| `/envases/producto/[producto]` | `src/pages/envases/producto/[producto].astro` | Dinámica | itera los productos anidados dentro de `packagingCategories` (62 productos, vía subcategorías) |

### Asiaven Store (`StoreLayout.astro`)
| Ruta URL | Archivo | Tipo | Origen de slugs (si dinámica) |
|---|---|---|---|
| `/store` | `src/pages/store/index.astro` | Estática | — |
| `/store/[categoria]` | `src/pages/store/[categoria].astro` | Dinámica | itera categorías/grupos/ítems de `src/data/storeTaxonomy.ts` |
| `/store/producto/[slug]` | `src/pages/store/producto/[slug].astro` | Dinámica | itera `techProducts` de `src/data/techCatalog.ts` (126 registros) |
| `/store/envases/[slug]` | `src/pages/store/envases/[slug].astro` | Dinámica | itera `packagingCategories` de `src/data/packagingCatalog.ts` (categoría + producto, dual) |
| `/store/busqueda` | `src/pages/store/busqueda.astro` | Estática (contenido 100% client-side vía `SearchResults` hidratado) | — |
| `/store/cotizacion` | `src/pages/store/cotizacion.astro` | Estática | — |
| `/store/garantia` | `src/pages/store/garantia.astro` | Estática | — |
| `/store/envios` | `src/pages/store/envios.astro` | Estática | — |
| `/store/recipientes/gas-licuado` | `src/pages/store/recipientes/gas-licuado.astro` | Estática | — |
| `/store/medida/laptops` | `src/pages/store/medida/laptops.astro` | Estática | — |
| `/store/medida/desktops` | `src/pages/store/medida/desktops.astro` | Estática | — |
| `/store/medida/workstations` | `src/pages/store/medida/workstations.astro` | Estática | — |
| `/store/medida/servidores` | `src/pages/store/medida/servidores.astro` | Estática | — |
| `/store/soporte/ticket` | `src/pages/store/soporte/ticket.astro` | Estática | — |
| `/store/soporte/contacto-ventas` | `src/pages/store/soporte/contacto-ventas.astro` | Estática | — |
| `/store/soporte/faq` | `src/pages/store/soporte/faq.astro` | Estática | — |
| `/store/soporte/descargas` | `src/pages/store/soporte/descargas.astro` | Estática | — |
| `/store/soporte/informacion` | `src/pages/store/soporte/informacion.astro` | Estática | — |
| `/store/soporte/asesoria-compra` | `src/pages/store/soporte/asesoria-compra.astro` | Estática | — |

El build genera **348 páginas HTML** en total (ver sección 8), consistente con la suma de rutas estáticas + todas las combinaciones dinámicas de `[servicio]` (8), `[categoria]`/`producto/[producto]` de envases (5 + 62), `[categoria]` y `producto/[slug]` de Store (decenas de categorías/grupos/ítems de `storeTaxonomy.ts` + 126 productos), y `/store/envases/[slug]` (5 + 62).

---

## 4. Árbol de `src/`

```
src/
├── components/
│   ├── react/                     (14 archivos .tsx — ver sección 5)
│   ├── sections/
│   │   ├── About.astro            — bloque "Excelencia y Solidez Corporativa" con 3 íconos+texto; usado en / (index.astro)
│   │   ├── Affiliates.astro       — grid de 4 tarjetas hover "Divisiones" (AV Constructora/Elevators/Maquinarias/Tecnología); usado en /
│   │   ├── CorporateVideo.astro   — sección de video full-bleed con botón mute/unmute; usado en /
│   │   ├── Footer.astro           — footer 100% corporativo (marca, enlaces, 2 sedes, legal, redes); usado en Layout.astro (todo el sitio corporativo)
│   │   ├── Hero.astro             — wrapper de una sola línea que monta <HeroSlider client:load />; usado en /
│   │   ├── MissionVision.astro    — bloque 2 columnas Misión/Visión con imagen de fondo; usado en /
│   │   ├── Navbar.astro           — navbar corporativo (Inicio/Nosotros/Proyectos/Servicios + CTAs Tienda/Contáctanos); usado en Layout.astro (todo el sitio corporativo)
│   │   ├── Services.astro         — wrapper que monta <ServicesCarousel client:visible />; usado en /
│   │   ├── StatsStrip.astro       — franja de 4 cifras (802+, 18+, 50+, 30+); usado en /
│   │   └── WhatsAppButton.astro   — botón flotante fijo a wa.me; usado en Layout.astro (todo el sitio corporativo)
│   ├── store/
│   │   ├── CatalogControls.astro  — selector de orden ("Ordenar por") con lógica de reordenado en <script>; usado en /store/[categoria]
│   │   ├── StoreFooter.astro      — footer 100% Store (marca, categorías, soporte, contacto ventas, legal); usado en StoreLayout.astro (todo /store/*)
│   │   ├── StoreProductCard.astro — tarjeta de producto con toggle "ver más/menos" y botón "Agregar a Cotización" (lógica en <script>); usado en /store/index, /store/[categoria], /store/producto/[slug]
│   │   └── StoreShowcaseCard.astro— tarjeta de vitrina con badge (Nuevo/Oferta/Más Vendido); no se encontró import activo en las páginas revisadas
│   └── ui/
│       └── PageHeader.astro       — banner de cabecera reutilizable (título + imagen de fondo); usado en /servicios, /proyectos, /soporte-tecnico, /contactanos
├── data/
│   ├── packagingCatalog.ts        — catálogo de Envases (ver sección 6)
│   ├── services.ts                — catálogo de 8 servicios corporativos (ver sección 6)
│   ├── storeTaxonomy.ts           — árbol de navegación de 3 niveles de la Store (Categoría→Grupo→Ítem)
│   └── techCatalog.ts             — catálogo de 126 productos placeholder de la Store (ver sección 6)
├── layouts/
│   ├── Layout.astro                — layout raíz del sitio corporativo (Navbar+Footer+WhatsAppButton, `<html lang="es">` hardcodeado)
│   └── StoreLayout.astro           — layout raíz de la Store (StoreFooter, `<html lang="es">` hardcodeado)
├── pages/                          (27 rutas — ver sección 3 para el mapa completo)
├── store/
│   └── quoteCart.ts                — utilidades de carrito de cotización sobre localStorage + CustomEvent
├── styles/
│   └── global.css                  — theming Tailwind v4 (@theme), sin tailwind.config.mjs
└── utils/
    ├── fakePrice.ts                 — genera un precio determinístico simulado a partir del id de producto
    └── formSupport.ts               — helper vanilla compartido para formularios de soporte (toggle B2B/B2C)
```

---

## 5. Componentes de React

| Archivo | Directiva de hidratación (dónde se monta) | Props | Texto hardcodeado visible |
|---|---|---|---|
| `HeroSlider.tsx` | `client:load` (en `Hero.astro`) | Ninguna | **Sí, extenso** — los 4 slides completos (overline, título, subtitle, texto de cada CTA) viven como array literal dentro del componente. ~14 cadenas. |
| `ServicesCarousel.tsx` | `client:visible` (en `Services.astro`) | Ninguna | Parcial — importa `services` (título/descripción vienen de datos), pero el CTA "Ver detalles →" y todos los `aria-label` (3) están hardcodeados. |
| `ClientLogosCarousel.tsx` | `client:visible` (en `proyectos/index.astro`) | Ninguna | Los 17 nombres de cliente están hardcodeados como array interno (son nombres propios, no traducibles en rigor, pero viven en el componente, no en datos). |
| `FAQAccordion.tsx` | `client:visible` (en `contactanos.astro`) | `faqs: {question, answer}[]` | No — el texto llega 100% vía prop desde la página. |
| `BTOForm.tsx` (exporta `LaptopBTO`, `ServerBTO`, `DesktopBTO`) | `client:load` (en `store/medida/{laptops,servidores,desktops,workstations}.astro`) | Ninguna (cada export es un wrapper sin props) | **Sí, extenso** — títulos, subtítulos, labels de specs (Procesador, RAM, Factor de Forma, etc.), labels de opciones, textos de formulario ("Nombre", "Empresa", "Correo"...), mensaje de éxito y botón "Solicitar Cotización". ~40+ cadenas entre los 3 configuradores. |
| `CatalogFilters.tsx` | `client:load` (en `store/[categoria].astro`) | Ninguna | **Sí, extenso** — "Disponibilidad", "Precio", "Línea de Producto", "Especificaciones", las 4 opciones de línea, labels RAM/almacenamiento, botones "Limpiar todo"/"Filtros"/"Ver Resultados". ~20 cadenas. UI funcional a nivel de estado, pero no filtra la grilla real (nota propia en el código). |
| `ProductFeatureSlider.tsx` | `client:load` (en `servicios/[servicio].astro`) | `products: {title, image, features}[]` | Parcial — el contenido viene por prop (desde datos embebidos en la página, ver sección 6), pero 2 `aria-label` ("Producto anterior/siguiente") están hardcodeados. |
| `ServiceSlider.tsx` | `client:load` (en `servicios/[servicio].astro`) | `images: string[]` | Solo `aria-label`s (4: "Imagen anterior/siguiente", "Ir a la imagen N"). |
| `QuoteCartList.tsx` | `client:load` (en `store/cotizacion.astro`) | Ninguna | **Sí** — "Tu cotización está vacía", "Agrega productos...", "Volver a la tienda", "Eliminar", "Total estimado". ~6 cadenas. |
| `QuoteRequestForm.tsx` | `client:load` (en `store/cotizacion.astro`) | Ninguna | **Sí, extenso** — todos los labels de formulario, mensaje de éxito (incluye el correo `ventas@asiaven.com` embebido en el texto), botón de envío. ~12 cadenas. |
| `SearchResultCard.tsx` | Ninguna directa — se renderiza dentro de `SearchResults.tsx` (que sí tiene `client:load`), por eso no aparece con su propia directiva en ningún `.astro` | `product: TechProduct` | **Sí** — "Ver más/Ver menos", "¡Agregado!", "Agregar a Cotización", "Saber más". ~4 cadenas. |
| `SearchResults.tsx` | `client:load` (en `store/busqueda.astro`) | Ninguna | **Sí** — título "Resultados de búsqueda", mensajes de conteo/pluralización, mensaje de "sin resultados", CTA "Solicitar Cotización →". ~6 cadenas, con lógica de pluralización en español embebida. |
| `StoreHeroSlider.tsx` | `client:load` (en `store/index.astro`) | Ninguna | **Sí, extenso** — los 3 slides completos (título, subtítulo, CTA) + el link "Volver al sitio corporativo" + 5 `aria-label`. ~15 cadenas. |
| `StoreNavigation.tsx` | `client:load` (en las ~20 páginas de `/store/*`) | `currentPath?: string` | **Sí, muy extenso** — es el componente con más texto hardcodeado del proyecto: los 4 grupos "Equipo a Medida" (`btoItems`), los 2 grupos "Recipientes" (`recipientesGroups`, 6 ítems), los 2 grupos "Soporte Técnico" (`supportGroups`, 7 ítems), las etiquetas de los botones raíz ("Equipo a Medida", "Recipientes", "Soporte Técnico"), placeholders de búsqueda, `aria-label`s. ~30+ cadenas. |

**Superficie total de contenido dentro de islas de React (no en `.astro`):** los componentes con mayor concentración de texto hardcodeado son `StoreNavigation.tsx`, `HeroSlider.tsx`, `StoreHeroSlider.tsx`, `BTOForm.tsx` y `CatalogFilters.tsx` — juntos concentran la mayoría del texto de UI de la Store y toda la copy del Hero corporativo. Ningún componente React usa Context ni ningún mecanismo de estado compartido entre islas; cada uno se hidrata de forma aislada.

---

## 6. Capa de datos

### `src/data/services.ts` — 8 registros
```ts
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  images: string[];
}
```
Campos de texto visible al usuario: `title`, `shortDescription`, `fullDescription` (array de párrafos) → 3 de 5 campos son texto de usuario (`slug` e `images` no lo son). No hay tipos derivados en otros archivos.

### `src/data/packagingCatalog.ts` — 5 categorías / 11 subcategorías / 62 productos (cifra reportada en documentación previa del proyecto, no recontada línea por línea en esta auditoría)
```ts
export interface PackagingProduct {
  title: string;
  slug: string;
  group?: string;
  specs: Record<string, string>;
}
export interface PackagingSubcategory {
  slug: string;
  title: string;
  description?: string;
  products: PackagingProduct[];
}
export interface PackagingCategory {
  slug: string;
  title: string;
  image: string;
  shortDescription: string;
  description: string;
  subcategories: PackagingSubcategory[];
}
```
Campos de texto visible: `title` (en los 3 niveles), `shortDescription`/`description` (categoría y subcategoría), `specs` (claves y valores del `Record`, ej. "Capacidad (mL)": "250"). No hay tipos derivados en otros archivos.

### `src/data/techCatalog.ts` — 126 registros
```ts
export interface TechProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategoryName: string;
  subcategorySlug: string;
  image: string;
  description: string;
  features: string[];
}
```
Registro de ejemplo:
```ts
{
  id: 1,
  title: "Computadora de Escritorio AV 1",
  slug: "computadoras-de-escritorio-av-1",
  category: "Equipos de Cómputo",
  subcategoryName: "Computadoras de Escritorio",
  subcategorySlug: "computadoras-de-escritorio",
  image: "https://images.unsplash.com/photo-1496181133206-...",
  description: "Equipo de escritorio de entrada para tareas administrativas y ofimática básica.",
  features: ["Procesador: Intel Core i3-13100", "Memoria: 8 GB DDR4", "..."],
}
```
Campos de texto visible: `title`, `category`, `subcategoryName`, `description`, `features` (array) → 5 de 9 campos. `image` sigue siendo URL de Unsplash (no migrado a asset local, confirmado por grep — ver también nota en `ESTADO_PROYECTO.md`).

### `src/data/storeTaxonomy.ts` — árbol de navegación (no un catálogo de productos)
No se documenta como "N registros" porque es una jerarquía Categoría→Grupo→Ítem, no una lista plana. Alimenta el menú de `StoreNavigation.tsx` y `getStaticPaths` de `/store/[categoria]`.

---

## 7. Texto hardcodeado — estimación por grupo

| Grupo | Estimación de cadenas en español embebidas directamente en markup/componentes |
|---|---|
| Componentes de layout (Navbar, Footer corporativo, StoreFooter, WhatsAppButton) | ~35 cadenas (labels de navegación, columnas de footer, textos de contacto, `aria-label`s) |
| Secciones de la home (Hero incl. HeroSlider, StatsStrip, About, MissionVision, Services/ServicesCarousel, Affiliates, CorporateVideo) | ~45 cadenas (la mayor concentración: los 4 slides del Hero, los 3 íconos+texto de About, Misión+Visión completas, 4 divisiones de Affiliates con descripción larga cada una) |
| Páginas estáticas (contactanos, privacidad, terminos, soporte-tecnico, proyectos, servicios/index, envases/index) | Alto pero no cuantificado con precisión en esta pasada — incluye el formulario de contacto completo, 3 FAQ, y el texto íntegro de los documentos legales (privacidad/términos), que son de los bloques de texto más largos del repo |
| Páginas/componentes dinámicos (servicios/[servicio], envases/[categoria]/producto, store/[categoria], store/producto/[slug], StoreNavigation, CatalogFilters, BTOForm, StoreHeroSlider) | ~90+ cadenas de UI fija (no de datos) — el componente con más concentración es `StoreNavigation.tsx` |
| Datos (`services.ts`, `packagingCatalog.ts`, `techCatalog.ts`) | El volumen más grande en carácteres, pero es contenido de catálogo, no UI: 8 descripciones largas de servicio, ~78 títulos/descripciones de Envases, 126 descripciones + ~500 líneas de `features` en `techCatalog.ts` |

Nota: esta es una estimación de orden de magnitud a partir de la lectura manual de cada archivo en esta auditoría, no un conteo automatizado por herramienta de extracción de cadenas.

---

## 8. Estado de salud

**Build:** ✅ Pasa. `npm run build` (ahora `astro check && astro build`) completa sin errores — **348 páginas generadas**. El conteo de páginas se mantuvo en 348 en cada verificación a lo largo de todo el saneamiento de dependencias (antes y después de `npm audit fix`, de instalar TypeScript, de corregir tipos, y de agregar `site`/`trailingSlash`).

**Verificación de tipos:** ✅ Habilitada y haciéndose cumplir. `typescript@^6.0.3` + `@astrojs/check@^0.9.10` instalados como devDependencies (ver sección 1 para el porqué del pin a la major 6). `npm run check` (`astro check`) reporta **0 errores, 0 warnings, 0 hints** en 70 archivos — se corrigieron los 5 hallazgos que existían (1 error de `useRef` sin argumento inicial, y 4 usos de `React.FormEvent`/`FormEvent`, deprecados en el paquete de tipos instalado, reemplazados por `SubmitEvent<T>` — el tipo no deprecado correcto para handlers de `onSubmit`). El script `build` ahora ejecuta `astro check` antes de `astro build`, así que un error de tipos rompe el build.

**Vulnerabilidades (`npm audit`):** **0** — antes había 4 (2 moderate, 2 high: Astro XSS en View Transitions, js-yaml, nanoid, postcss), resueltas con `npm audit fix` sin `--force` (67 paquetes transitivos actualizados dentro de rango semver; ningún rango de `package.json` cambió).

**Linter/formateador:** No hay ninguno configurado — no se encontró configuración de ESLint ni Prettier en la raíz del proyecto.

**Tests:** No existen. No se encontró ningún archivo `*.test.*` ni `*.spec.*` en `src/`, ni ninguna dependencia de testing (Vitest, Jest, Playwright, etc.) en `package.json`.

**Indexación del deployment de Vercel:** el diagnóstico original (sin mecanismo alguno) llevó a agregar `vercel.json` con una regla `headers` condicionada por host: cuando el `Host` de la petición es `av-plataform-ruby.vercel.app`, se envía `X-Robots-Tag: noindex, nofollow`; `www.asiaven.com` (y cualquier otro host) no matchea la condición y no recibe el header. Mecanismo verificado contra la documentación oficial de Vercel (KB "Avoiding Duplicate-Content SEO with Vercel.app URLs and Custom Domains"): `has: [{ "type": "host", "value": "..." }]` en un objeto de `headers`. **Pendiente de confirmación en producción** — el archivo está commiteado pero su efecto solo es verificable tras el próximo deploy en Vercel (`curl -I` contra el host de preview debería mostrar el header; contra `www.asiaven.com` no).

---

## 9. Git

- **Branch de esta actualización:** `chore/saneamiento-deps` (creada desde `main` en `7546078`, aún sin mergear al momento de escribir esto).
- **Commits de la rama** (más reciente primero):
  ```
  5b2eb91 chore(seo): noindex en el dominio de preview
  1a325c5 chore(ts): corregir tipos y anadir check al build
  72d78f5 chore(config): definir site de produccion
  2792bd9 docs: corregir años en el mercado a 18+
  b8cea4e chore(ts): instalar typescript y @astrojs/check
  0cad219 chore(deps): npm audit fix
  ```
- **Base en `main` antes de esta rama:**
  ```
  7546078 update fotos de cilindros
  4883836 Merge branch 'develop' into main
  5ce60a8 Merge branch 'feat/landing-video-hero-final' into develop
  6d634fb feat(ui): video corporativo a pantalla completa estilo Hero + docs actualizados
  02489fc Merge branch 'develop'
  ```
  Nota: el commit `7546078 "update fotos de cilindros"` es posterior al último trabajo registrado en `ESTADO_PROYECTO.md` — no hay contexto de sesión sobre su contenido exacto más allá del mensaje del commit.

---

## RESUMEN PARA DESARROLLADORES

**Estado:** completado
**Tarea:** Auditoría de reconocimiento de solo lectura del estado actual del proyecto (stack, i18n, rutas, árbol de `src/`, componentes React, capa de datos, texto hardcodeado, salud del build, git).

**Archivos creados:** `docs/ESTADO.md` — inventario factual completo, único artefacto de escritura autorizado por el prompt.

**Archivos modificados:** ninguno.

**Archivos eliminados:** ninguno.

**Decisiones tomadas no especificadas en el prompt:**
- Para el punto 6 (capa de datos), reporté el conteo de Envases (5/11/62) citando que proviene de documentación previa del proyecto ya verificada contra la fuente (`catalogo_latas_asiaven.md`) en sesiones anteriores, en vez de re-contar línea por línea con una herramienta — un recuento automatizado con regex dio resultados inconsistentes por variaciones de indentación en el archivo, y forzar una cifra exacta nueva con baja confianza me pareció peor que citar la cifra ya verificada con su procedencia explícita.
- En la sección 7 (texto hardcodeado), dejé explícito que la estimación es de orden de magnitud por lectura manual, no un conteo por herramienta — el prompt pedía "un conteo aproximado", así que prioricé honestidad sobre la precisión antes que inventar una cifra exacta no verificada.

**Desviaciones del prompt:**
- El prompt pidió type-checking si TypeScript está instalado. No lo está — intenté `npx tsc` para confirmarlo con evidencia en vez de asumir, y documenté el resultado exacto (instaló un paquete `tsc` no relacionado) en vez de omitir la sección.
- No se instaló `typescript` ni ningún otro paquete para poder ejecutar el type-check, porque el prompt es explícitamente de solo lectura y la única escritura permitida es `docs/ESTADO.md`.

**Verificaciones ejecutadas:**
- `npx astro build` → ✅ éxito, 348 páginas, sin errores ni warnings relevantes.
- `npx tsc --noEmit` → no aplicable (TypeScript no instalado; se descargó un paquete `tsc` incorrecto que lo confirma).
- `grep -r "unsplash|placehold.co" src/` → confirma que solo 4 archivos de la Store (`StoreHeroSlider.tsx`, `store/index.astro`, `store/producto/[slug].astro`, `techCatalog.ts`) siguen en placeholders; el resto del sitio ya usa assets locales.
- `git status --short` / `git log --oneline -5` → árbol limpio, branch `main`, historial confirmado.

**Deuda técnica o TODOs dejados:** ninguno introducido por esta auditoría (es de solo lectura). Deuda ya existente y observada: ausencia de TypeScript instalado pese a que `tsconfig.json` extiende `astro/tsconfigs/strict` (el "strict" nunca se aplica en CI/build porque no hay paso de type-check); ausencia total de linter, formateador y tests; discrepancia de copy encontrada entre `src/components/sections/StatsStrip.astro`/`About.astro` (dicen "18+ años") y `CONVENCIONES.md` (dice "15+ años") — no se corrigió, solo se reporta como hallazgo factual.

**Requiere decisión humana:**
- Confirmar a dónde se despliega realmente el sitio (no hay archivo de configuración de despliegue en el repo que lo documente).
- Decidir si instalar TypeScript + un paso de type-check es una prioridad, dado que el proyecto ya asume modo `strict` en `tsconfig.json` sin poder hacerlo cumplir.
- Resolver la discrepancia "18+" vs "15+" años en el mercado antes de que se use como fuente para cualquier trabajo futuro (i18n u otro) que toque esas cadenas.

**Estado del repo:** branch `main`, árbol de trabajo limpio, últimos 5 commits listados arriba en la sección Git.
