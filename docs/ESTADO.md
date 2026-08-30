# Estado Actual del Proyecto — Auditoría de Reconocimiento

**Última actualización:** 2026-08-28 — corresponde al branch `feat/i18n-cierre-fase-1` (sin mergear; parte de `develop` en `3426abc`, que ya incluye las Fases 1a, 1b y 1c).

*Documento generado originalmente por una auditoría de solo lectura y actualizado tras la tarea de saneamiento de dependencias. Es descriptivo, no prescriptivo: reporta hechos verificados en el código, no recomendaciones. Si algo cambia después de la fecha de arriba, este documento queda desactualizado en ese punto — no se actualiza automáticamente.*

---

## ⚠️ BLOQUEANTES DE LANZAMIENTO

**Datos de la oficina de Miami son ficticios/provisionales** (confirmado por el dueño del proyecto). La dirección ("1234 Miami Ave, Suite 100, Miami, FL 33132") tiene forma genérica de placeholder, y el teléfono ("+1 (305) 555-0198") usa el prefijo `555`, reservado en Norteamérica para uso ficticio — nunca asignado a líneas reales. Aparece en `Footer.astro`, `contactanos.astro` y `en/contact.astro` (todos con comentario `⚠️ DATOS FICTICIOS/PROVISIONALES` en el código, junto al literal). **Antes de migrar el dominio a producción**: reemplazar por los datos reales de esa sede, o eliminar la sección por completo. No modificado en ninguna fase — solo señalizado.

**Las 3 panorámicas 360° de ascensores son versiones degradadas por WhatsApp** (confirmado por el dueño del proyecto: se descargaron vía WhatsApp, que recomprime y redimensiona todo lo que pasa por su compresión de imágenes). `ascensores-residenciales.jpg`, `ascensores-panoramicos.jpg` y `ascensores-lujo.jpg` (en `public/images/corporativo/producto-360/`) miden **1600×791px, ratio 2.0228** en vez de 2:1 exacto (deberían ser 1600×800) — verificado con dos métodos independientes (`file` y parseo manual del marcador SOF del JPEG). Lo habitual para panorámicas equirrectangulares en web es **4000–6000px de ancho**; estas están muy por debajo de eso además de con el ratio ligeramente incorrecto. **Antes de salir a producción**: reemplazar por los archivos originales sin recomprimir (ya se van a solicitar por un canal sin compresión) — las rutas no cambian, así que el reemplazo no requiere tocar código. No se recortaron ni modificaron deliberadamente al implementar el visor, por indicación explícita del dueño del proyecto.

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

## 2. Estado del trabajo de i18n — CIERRE DE FASE 1

**Fase 1 del i18n del sitio corporativo cerrada.** Infraestructura completa y estable; 6 de 11 páginas corporativas traducidas (home incluida) + el 404 global bilingüe. La traducción de `/servicios` y `/envases` (hub + rutas dinámicas) queda **aplazada deliberadamente** — no es deuda técnica ni falta de tiempo, es una dependencia real explicada en detalle más abajo. Todo `/store/*` sigue sin tocar (fuera de alcance de esta fase desde el inicio).

### Guía rápida para traducir una página nueva (leer esto primero si retomas el proyecto)
1. **`src/i18n/routes.ts` es la única fuente de verdad de rutas.** Agrega la clave `en` a la entrada correspondiente (ej. `services: { es: "/servicios", en: "/en/services" }`). Eso solo ya activa: el `LanguageSwitcher` en esa página, el fallback del Navbar/Footer (que dejan de apuntar a la versión española), y los alternates del sitemap — **nada más que tocar en esos tres sitios**, todos leen de `routes.ts`.
2. **Diccionarios:** agrega las claves que esa página necesita a `src/i18n/es.ts` (base) y su traducción real a `src/i18n/en.ts` (`satisfies typeof import('./es').default` hace que el build falle si falta una clave — pruébalo borrando una clave de `en.ts` y corriendo `npm run check` si tienes dudas). No agregues claves para páginas que todavía no vas a traducir.
3. **Página en español:** si no lee ya del diccionario, migra su texto hardcodeado a `es.ts` y reemplázalo por referencias (`es.miPagina.titulo`, etc.) — sin cambiar diseño ni markup.
4. **Página en inglés:** crea el archivo gemelo bajo `src/pages/en/...` (ver `routes.ts` para el slug exacto), mismos componentes, mismo layout, leyendo de `en.ts`. Pásale `routeKey="miPagina"` a `Layout` en ambas versiones — eso activa el `Hreflang` (canonical + alternates) automáticamente.
5. **Si la página consume datos de `src/data/*`** (como `services.ts`) y esos datos ya usan `Localized<T>`: nunca escribas `campo.es`/`campo.en` a mano en un `.astro` — siempre `localize(campo, locale)` con `locale = Astro.currentLocale === "en" ? "en" : "es"`. Esto aplica **incluso si la página todavía no se va a traducir** (ver `servicios/index.astro`/`servicios/[servicio].astro`, que ya usan `localize()` sin tener versión en inglés) — un `.es` hardcodeado compila igual y falla en silencio el día que sí se traduzca.
6. **Si la página monta una isla de React** (`client:load`/`client:visible`): la isla recibe las cadenas ya traducidas como props planas (`string`, nunca el objeto `Localized<T>` ni el diccionario completo). Cero Context, cero provider, cero hook de i18n en React — cada isla se hidrata aislada y no tiene acceso al `Astro.currentLocale` del servidor. Ver `HeroSlider.tsx`/`ServicesCarousel.tsx` como referencia del patrón (reciben `slides`, labels, etc. por props desde `Hero.astro`/`Services.astro`).
7. **`npm run build`** corre `astro check` antes de `astro build` — cualquier clave de diccionario faltante o mal tipada rompe el build, no llega a producción en silencio.

### Páginas traducidas (6 + el 404)
| Español | Inglés | Notas |
|---|---|---|
| `/` (home) | `/en` | Fase 1c. 7 secciones: Hero, StatsStrip, CorporateVideo, Services, About, MissionVision, Affiliates — todas leen del diccionario vía `t()`/`Astro.currentLocale`, sin duplicar lógica entre la página es/en |
| `/contactanos` | `/en/contact` | Fase 1a |
| `/proyectos` | `/en/projects` | Fase 1b/1c. `clientes` traducidos en el diccionario con nombres propios preservados (ver Fase 1c); `ClientLogosCarousel.tsx` no tocado |
| `/soporte-tecnico` | `/en/technical-support` | Fase 1b |
| `/privacidad` | `/en/privacy` | Fase 1b. Aviso breve, no traducción del documento — decisión de negocio ya tomada |
| `/terminos` | `/en/terms` | Fase 1b, misma lógica que `/en/privacy` |
| `/404` (no existe como ruta) | igual | Cierre de Fase 1. Único 404.html global (ver más abajo), detecta idioma en cliente por `pathname`, no emite canonical/hreflang |

### Páginas pendientes (4 corporativas + todo `/store/*`)
`servicios` (hub + `[servicio]` dinámica), `envases` (hub + `[categoria]`/`producto/[producto]` dinámicas) — **APLAZADAS**, ver la sección dedicada justo abajo. Todo `/store/*` sin tocar, fuera de alcance de la Fase 1 desde el inicio.

### ⏸️ Aplazamiento deliberado: `/servicios` y `/envases` (rutas dinámicas)

**Decisión del dueño del proyecto, tomada en el cierre de la Fase 1.** No es falta de tiempo — es una dependencia real con un trabajo de infraestructura que va a pasar pronto y que cambiaría la respuesta correcta.

**El motivo:** `packagingCatalog.ts` y `techCatalog.ts` van a migrar a una base de datos real en un futuro cercano, como parte de estructurar un e-commerce con productos y clientes de verdad (hoy son arrays de TypeScript hardcodeados en el repo). Traducir esos datos ahora, dentro de los `.ts`, sería trabajo desechable: el día de la migración, el idioma tiene que vivir en el esquema de la base de datos (columnas `title_es`/`title_en`, o una tabla de traducciones aparte) — no en `Localized<T>` de TypeScript, que deja de existir en cuanto el dato deja de estar en un archivo `.ts`. Escribir las traducciones dos veces (ahora en `Localized<T>`, después en el esquema de la BD) no tiene sentido.

**Por qué esto importa más allá de la traducción — consecuencia para el diseño de la base de datos nueva (léase con cuidado si te toca diseñar ese esquema):** el sitio ya es bilingüe desde esta fase. **Todo campo de texto visible al usuario en el esquema nuevo necesita la dimensión de idioma desde el diseño inicial** — nombre de producto, descripción, categoría, lo que sea que el usuario lea. Agregar la dimensión de idioma *después* de que el esquema ya existe y tiene datos cargados es sustancialmente más caro que incluirla desde el primer `CREATE TABLE` (migración de datos, backfill, código ya escrito asumiendo un solo idioma por fila, etc.). Este documento es el lugar donde queda registrado que esa necesidad ya existía cuando se diseñe esa base de datos, aunque quien la diseñe no haya trabajado en el i18n.

**Pregunta abierta de modelado, sin resolver, que motivó este análisis:** en `packagingCatalog.ts`, `PackagingProduct.specs` es un `Record<string, string>` donde **las claves también están en español** (ej. `"Capacidad (mL)": "250"`, `"Diámetro Interior (mm)": "65.30±0.15"` — ver `catalogo_latas_asiaven.md`). Al modelar esto en una base de datos hay que decidir explícitamente si:
- (a) las claves de specs se convierten en identificadores estables no traducibles (ej. `capacity_ml`, `inner_diameter_mm`) con una etiqueta visible aparte que sí se traduce (`spec_labels.es`/`spec_labels.en`), o
- (b) se modelan de otra forma (una tabla `product_specs` con `spec_key`, `spec_value`, y una tabla de labels separada; o algo específico del dominio de envases).

No se decide aquí — se registra como pregunta abierta para quien diseñe ese esquema, porque la estructura actual (clave de texto libre en español, sin separación entre identificador y etiqueta) no sobrevive la migración tal cual sin que alguien tome esta decisión primero.

**La UI fija de esas páginas tampoco se traduce por ahora**, aunque no dependa en absoluto de la base de datos (encabezados, labels de botones, textos fijos de `/servicios`, `/servicios/[servicio]`, `/envases`, etc. son contenido puramente `.astro`, no datos). Motivo: una página con interfaz en inglés pero tarjetas de producto todavía en español (porque los datos no están traducidos) se ve peor y es más confusa que una página que simplemente no existe en inglés todavía. El comportamiento actual — selector de idioma oculto en esas páginas, Navbar/Footer en inglés cayendo a la versión española vía `getRouteHref()` — es más honesto con el visitante y **se mantiene tal cual** hasta que los datos estén listos para traducirse de verdad.

**Qué es seguro hacer ya, sin esperar la migración de base de datos** (y de hecho ya se hizo en la Fase 1c, como preparación): `services.ts` — que es contenido editorial fijo del sitio corporativo, no un catálogo que vaya a vivir en una base de datos de e-commerce — ya usa `Localized<T>` y no está afectado por este aplazamiento.

### Fase 1c — resumen
1. **`services.ts` migrado a `Localized<T>`** — `title`/`shortDescription`/`fullDescription` pasan de `string`/`string[]` a `Localized<string>`/`Localized<string[]>`; `slug`/`images` sin cambios. `: Service[]` → `satisfies Service[]` (prerrequisito de la 1a: slugs quedan como unión de literales, condición para los slug-maps exhaustivos de la 1d).
2. **Regla de proyecto nueva:** en `.astro`, nunca se accede a `.es`/`.en` de un campo `Localized<T>` de forma literal — siempre `localize(campo, locale)`, con `locale` derivado de `Astro.currentLocale`. Aplica incluso a páginas 100% españolas que aún no se traducen (`servicios/index.astro`, `servicios/[servicio].astro`) — un `.es` hardcodeado ahí compilaría igual y fallaría en silencio (español en la futura versión inglesa) sin ningún error.
3. **`HeroSlider.tsx` y `ServicesCarousel.tsx` refactorizados a props tipadas** — ya no importan datos ni tienen contenido embebido; `Hero.astro`/`Services.astro` resuelven diccionario + `localize()` y pasan strings ya traducidos. Sin Context/provider — cada isla sigue hidratándose aislada. Payload de props de `HeroSlider` (`client:load` en la home): **~1.9 KB** decodificado (~2.5 KB como atributo HTML-escapado) — negligible.
4. **`src/pages/en/index.astro`** creado, reutilizando las mismas 7 secciones `.astro` de la home española (que ya son locale-aware desde este mismo commit).
5. **Efecto en cascada de traducir `home`:** `routes.home` gana `en: "/en"` → el selector de idioma ahora aparece también en la home española (antes no, porque ninguna ruta traducida coincidía); los links "Home" de Navbar/Footer en inglés apuntan a `/en`; el ancla `#nosotros` (única ancla interna del proyecto — se revisó explícitamente, no hay otra) ya resuelve a `/en#nosotros` sin tocar código, porque `Navbar.astro`/`Footer.astro` ya construían ese href como `` `${getRouteHref("home", lang)}#nosotros` `` desde la Fase 1a.
6. **Nombres de clientes en `/en/projects` corregidos** según decisión del dueño del proyecto: se preserva el nombre propio y se añade aclaración en vez de sustituir (ej. "Asamblea Nacional (Venezuela's National Assembly)", no "National Assembly" a secas). Se revirtieron los topónimos administrativos que habían quedado traducidos ("Capital District" → "Distrito Capital").
7. **Placeholder de Miami señalizado con comentario en el código** (`Footer.astro`, `contactanos.astro`, `en/contact.astro`) — ver BLOQUEANTES DE LANZAMIENTO al inicio del documento.
8. **Bug propio encontrado y corregido:** el tipo `TranslationKey` en `utils.ts` solo permitía rutas hoja (`"home.about.heading"`), no ramas intermedias (`"home.about"` completo) — `NestedKeyOf` se corrigió para incluir ambas, ya que varias secciones necesitan `t(lang, "home.about")` devolviendo el objeto completo.

### Post-1c — subproductos de `/servicios/ascensores` y `/servicios/escaleras-mecanicas` estructurados (refactor sin traducción de ruta)
Un análisis previo detectó que los 4 tipos de ascensor y los 2 de escalera/rampa vivían como constantes literales sin tipo (`elevatorsData`/`escalatorsData`) en el frontmatter de `servicios/[servicio].astro`, en español plano, renderizados con condicionales `service.slug === "..."` — fuera del alcance de la Fase 1c por completo. Se movieron a `services.ts`:
- Nueva interfaz exportada `SubProduct` (`title: Localized<string>`, `image: string` sin traducir, `features: Localized<string[]>` — el array completo localizado, misma razón que `fullDescription`: la traducción no tiene por qué respetar el mismo número de bullets).
- `Service.subProducts?: SubProduct[]` y `Service.subProductsHeading?: Localized<string>` (opcionales — solo `ascensores` y `escaleras-mecanicas` los tienen). El heading viaja junto a `subProducts` porque su texto difiere por servicio ("Nuestras Soluciones en Elevación" vs "Nuestros Sistemas de Movilidad") y sin ese campo no era posible eliminar el condicional por slug sin cambiar el texto visible.
- `servicios/[servicio].astro` ya no pregunta por slug: renderiza `ProductFeatureSlider` si `service.subProducts` existe. Genérico — un servicio nuevo con subproductos funcionaría sin tocar este archivo.
- `ProductFeatureSlider.tsx` mantiene su firma pública (`products: {title, image, features: string[]}[]`, strings planos, cero locale) pero el tipo ahora se deriva de `SubProduct` vía un mapped type, en vez de declararse a mano — evita que ambos se desincronicen si `SubProduct` cambia.
- Contenido traducido al inglés en la misma migración (terminología técnica de ascensores/escaleras).
- **No se tradujo la ruta** — `/servicios/[servicio]` sigue sin versión en inglés; esto es puramente estructural, preparación para cuando esa ruta se traduzca.
- Verificado sin cambio visible en `/servicios/ascensores` y `/servicios/escaleras-mecanicas` (texto idéntico al de antes del refactor).

### Post-1c — quinto tipo "Ascensores de Lujo" agregado a `/servicios/ascensores`
Se agregó un quinto `SubProduct` al registro `ascensores` en `services.ts` (`title: "Ascensores de Lujo" / "Luxury Elevators"`, imagen `ascensores-lujo.webp`, al final del array después de hospitales). Verificado en navegador: el carrusel de `ProductFeatureSlider` renderiza los 5 elementos, la imagen carga (`naturalWidth` > 0, no rota), y la navegación con los botones anterior/siguiente completa el ciclo correctamente (4 clics en "siguiente" llega a Lujo, el 5º vuelve a Residenciales).

**⚠️ Features de "Ascensores de Lujo" pendientes de revisión del dueño del proyecto.** Se construyeron a partir de "Ascensores Residenciales" (features base tomadas literalmente, una adaptada al acabado de lujo, tres agregadas de cero para el segmento premium — detalle completo en el resumen de la tarea que las creó). No son contenido verificado por el negocio, son una propuesta razonable a partir del patrón existente.

### Visor 360° en `/servicios/ascensores`
`SubProduct.panorama360?: string` (no localizado, no se traduce) — solo lo tienen los tipos que ya cuentan con panorámica equirrectangular: **Residenciales, Panorámicos y Lujo**. **Oficina y Hospitales no tienen el campo** (no hay imagen todavía) y por lo tanto no muestran ningún botón — mismo criterio que el `LanguageSwitcher` en páginas no traducidas: nada se renderiza en vez de un botón deshabilitado o un "próximamente".

**Convención de nombres** — `public/images/corporativo/producto-360/{slug-del-tipo}.jpg` (kebab-case español, coincide con el nombre del archivo en `producto-detalle/` pero con extensión `.jpg` simple, sin el `.webp` de las fotos normales — las panorámicas son JPEG equirrectangular, formato que Pannellum espera).

**Implementación:** `pannellum` (MIT) instalado por npm, cargado con `import()` dinámico dentro de `Panorama360Modal.tsx` — Vite lo empaqueta en un chunk aparte que solo se pide al pulsar "Ver vista 360°"; verificado con `npm run build` + `npm run preview` (no solo `astro dev`) que ni el JS/CSS de pannellum ni las panorámicas se descargan al cargar la página. El modal atrapa el foco, cierra con botón/Escape/clic fuera, devuelve el foco al botón que lo abrió, bloquea el scroll del fondo, y muestra estados de carga/error (ambos del diccionario, namespace `services.viewer360`). El contenedor del visor tiene su altura fija por Tailwind ya aplicada desde el primer render (sin animación de apertura que la retrase) para evitar el fallo silencioso característico de Pannellum de inicializarse con alto cero.

**Verificado:** los 3 tipos con panorámica muestran el botón y abren el visor; Oficina/Hospitales no muestran botón; las 3 vías de cierre funcionan (botón, Escape, clic fuera — confirmado por JS que el foco vuelve exactamente al botón que abrió el modal en cada caso); scroll del fondo bloqueado mientras está abierto; funciona en viewport móvil (375×812) con el listener táctil de Pannellum (`.pnlm-container`) presente y respondiendo sin error. **No verificado en esta tarea:** el manejo de error cuando la imagen falla realmente a cargar — se revisó por código (try/catch + `viewer.on("error")`) pero no se ejecutó una prueba en vivo de un fallo de red real.

**Limitación del entorno de prueba, no del código:** la herramienta de captura de pantalla de este entorno no compone el contenido WebGL de Pannellum (pantalla en blanco, reproducible en pestañas nuevas) — confirmado por evidencia programática (JS) que el modal, el canvas y el contexto WebGL están correctamente inicializados con dimensiones reales, pero no fue posible obtener una captura visual del renderizado ni describir su nitidez/costuras a partir de esta sesión.

### Patrón de datos multiidioma (`Localized<T>`) y quién lo hereda
`Localized<T>` (`{ es: T; en: T }`) y `localize()` viven en `src/i18n/utils.ts` — es un concepto de i18n, no de un dataset concreto. `services.ts` es el primer archivo de datos que lo adopta (Fase 1c). **Pendiente de heredarlo:** `packagingCatalog.ts` (`title`/`shortDescription`/`description` en sus 3 niveles) y `techCatalog.ts` (`title`/`category`/`subcategoryName`/`description`/`features`) — ninguno tocado todavía. Ambos, igual que `services.ts` antes de esta fase, declaran sus arrays con anotación de tipo explícita (`: PackagingCategory[]`, `: TechProduct[]`) en vez de `satisfies`, así que antes de escribir sus slug-maps exhaustivos necesitan el mismo cambio de anotación que se aplicó a `services.ts` en este commit.

### Archivos nuevos y su propósito (acumulado, Fases 1a–1c)
| Archivo | Propósito |
|---|---|
| `src/i18n/routes.ts` | Fuente única de rutas estáticas corporativas. "Traducida" se deriva de si la entrada tiene `en`. `RouteKey`, `isTranslated()`, `getTranslatedEntry()`, `getRouteHref()` (fallback a español), `buildAbsoluteUrl()`. En 1c gana `en` en `home`. |
| `src/i18n/es.ts` / `en.ts` | Diccionarios. Namespaces: `home` (hero, stats, video, about, missionVision, services, affiliates — Fase 1c), `common`, `nav`, `footer`, `contact`, `projects`, `techSupport`, `legal`, `seo`. `es.ts` sin `as const` (ver razón en el propio archivo); `en.ts` con `satisfies typeof import('./es').default` — **verificado que romper una clave rompe el build** (Fase 1a). |
| `src/i18n/index.ts` | `dictionaries = { es, en }`, `type Locale`. |
| `src/i18n/utils.ts` | `t(locale, key)` tipado (`NestedKeyOf`/`PathValue`, corregido en 1c para rutas intermedias). `getLangFromUrl(url)` para contextos sin `Astro` (sitemap). `Localized<T>`/`localize()` (Fase 1c) — regla de proyecto: nunca `.es`/`.en` literal en `.astro`. |
| `src/components/seo/Hreflang.astro` | Canonical + alternate es/en + x-default. Solo si la página pasó `routeKey`. |
| `src/components/ui/LanguageSwitcher.astro` | Server-only, cero JS. Sin ruta traducida, no renderiza nada. |
| `src/pages/en/index.astro` | Fase 1c — home en inglés, mismas 7 secciones que la home española. |
| `src/pages/en/contact.astro` | Fase 1a. |
| `src/pages/en/projects.astro`, `en/technical-support.astro` | Fase 1b. |
| `src/pages/en/privacy.astro`, `en/terms.astro` | Fase 1b — avisos breves, no traducciones del documento. |
| `src/pages/404.astro` | Cierre de Fase 1 — único 404 del proyecto (antes no existía ninguno, ni en español). Detección de idioma en cliente por `pathname`, sin `routeKey` (sin canonical/hreflang). |

### Selector de idioma y navegación en páginas no traducidas
Sin cambios de mecanismo desde la Fase 1a — política única leída de `routes.ts` en los tres consumidores (switcher, Navbar, `serialize()` del sitemap): el switcher no se renderiza si la ruta actual no está traducida; Navbar cae a la versión española para rutas sin `en`; el sitemap solo agrega alternates a pares traducidos. 6 rutas traducidas ahora, mecanismo idéntico, cero cambios de código adicionales.

### `StoreLayout.astro` — pendiente, no tocado
Sigue con `<html lang="es">` hardcodeado.

### Cierre de Fase 1 — resumen
1. **404 bilingüe** (`src/pages/404.astro`, único archivo): verificado contra la documentación oficial de Vercel que un despliegue estático sirve un único `404.html` global, sin soporte documentado para 404 distinto por subdirectorio (`/docs/kb/guide/custom-404-page`, `/docs/custom-error-pages`). Detecta el idioma en el cliente por `window.location.pathname`, con el texto de ambos locales resuelto en build vía `data-*` attributes (mismo patrón que `CorporateVideo.astro`). No pasa `routeKey` a `Layout` — no emite canonical ni hreflang, correcto para una página que no es un recurso real.
2. **Aplazamiento formal de `/servicios` y `/envases`** — ver sección dedicada arriba. No se tradujo nada nuevo de esas rutas en este cierre.
3. **Namespace `notFound`** agregado a `es.ts`/`en.ts` (título, encabezado, mensaje, label del link de vuelta).

### Verificación ejecutada (Cierre de Fase 1)
`npm run build` → **0 errores**, **355 páginas** (354 + 1: `404.html`). Verificado por grep sobre `dist/`:
- `dist/404.html` — sin `<link rel="canonical">` ni `<link rel="alternate">` (confirmado, sin coincidencias).
- Páginas ya traducidas sin regresión: `index.html`, `en/index.html`, `contactanos/index.html`, `en/contact/index.html` — las 4 mantienen exactamente 3 `<link rel="alternate">` cada una (el conteo inicial con `grep -c` reportó 1 por estar el HTML en una sola línea — recontado con `grep -o | wc -l`, que sí cuenta ocurrencias en vez de líneas, y confirma 3).
- `servicios/index.html`, `envases/index.html` (no traducidas): 0 hreflang/canonical, 0 selector — sin cambios.

Verificado en navegador (variante de detección de cliente): `http://localhost:4321/pagina-inexistente` → español, `html lang="es"`, link "Volver al inicio" → `href="/"`. `http://localhost:4321/en/pagina-inexistente` → inglés (`document.title` cambia a "Page Not Found - Asiaven"), `html lang="en"`, link "Back to home" → `href="/en"`. Ambos casos confirmados leyendo el DOM tras la ejecución del script (no solo el HTML estático servido, que es idéntico para ambas rutas — el cambio ocurre en cliente).

### Deuda pendiente y bloqueantes que se mantienen
1. **`StoreLayout.astro`** sigue con `<html lang="es">` hardcodeado — toda la sección `/store/*` permanece sin ninguna adaptación i18n (fuera de alcance desde el inicio de la Fase 1, no solo de este cierre).
2. **`/servicios` y `/envases`** — aplazadas, ver sección dedicada arriba. No es un "olvido", es una decisión registrada con motivo y dependencia explícita.
3. **Prerrequisito de tipos para cuando se retomen:** `packagingCatalog.ts` y `techCatalog.ts` necesitan `satisfies` en vez de su anotación de tipo explícita actual, tanto para heredar `Localized<T>` como para que los futuros slug-maps de rutas dinámicas sean exhaustivos (ver Fase 1a/1c).
4. **`ClientLogosCarousel.tsx`** — sin texto de UI propio más allá de los 17 nombres de cliente (`alt` de cada logo); nada que traducir en el componente en sí.
5. **PENDIENTE DE VERIFICACIÓN:** cuando `www.asiaven.com` migre a Vercel, confirmar con `curl -I` que ese host **no** devuelve `X-Robots-Tag`, mientras `av-plataform-ruby.vercel.app` sí lo hace (ya verificado en producción el 2026-08-28 — ver sección 8).
6. **BLOQUEANTE DE LANZAMIENTO — datos de oficina de Miami ficticios.** Ver encabezado dedicado al inicio de este documento. Se mantiene sin cambios: no se tocó en este cierre, solo se reafirma que sigue pendiente.

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
| `ProductFeatureSlider.tsx` | `client:load` (en `servicios/[servicio].astro`) | `products: {title, image, features: string[]}[]`, tipo derivado de `SubProduct` (`src/data/services.ts`) vía mapped type — actualizado post-1c, antes eran datos embebidos en la página | Parcial — el contenido viene por prop, ya resuelto con `localize()` desde `service.subProducts`; los 2 `aria-label` ("Producto anterior/siguiente") siguen hardcodeados. |
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
