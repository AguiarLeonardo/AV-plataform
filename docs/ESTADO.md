# Estado Actual del Proyecto — Auditoría de Reconocimiento

**Última actualización:** 2026-08-31 — corresponde al branch `feat/limpieza-corporativa` (sin mergear; parte de `develop`).

*Documento generado originalmente por una auditoría de solo lectura y actualizado tras la tarea de saneamiento de dependencias. Es descriptivo, no prescriptivo: reporta hechos verificados en el código, no recomendaciones. Si algo cambia después de la fecha de arriba, este documento queda desactualizado en ese punto — no se actualiza automáticamente.*

---

## ⚠️ BLOQUEANTES DE LANZAMIENTO

**Datos de la oficina de Miami son ficticios/provisionales** (confirmado por el dueño del proyecto). La dirección ("1234 Miami Ave, Suite 100, Miami, FL 33132") tiene forma genérica de placeholder, y el teléfono ("+1 (305) 555-0198") usa el prefijo `555`, reservado en Norteamérica para uso ficticio — nunca asignado a líneas reales. Aparece en `Footer.astro`, `contactanos.astro` y `en/contact.astro` (todos con comentario `⚠️ DATOS FICTICIOS/PROVISIONALES` en el código, junto al literal). **Antes de migrar el dominio a producción**: reemplazar por los datos reales de esa sede, o eliminar la sección por completo. No modificado en ninguna fase — solo señalizado.

## 🧹 Limpieza estructural del sitio corporativo (branch `feat/limpieza-corporativa`)

Tres cambios independientes, comiteados por separado.

### 1. Servicio "Mantenimiento" eliminado

Decisión del dueño del proyecto: era redundante — el mantenimiento de ascensores y escaleras ya está cubierto dentro de esos dos servicios, y su contenido no aportaba nada que no estuviera ya cubierto en otro. Eliminado de `services.ts` (registro completo) y de `serviceSlugMap` en `routes.ts`. `/servicios/mantenimiento` y `/en/services/maintenance` ya no se generan — confirmado ausentes de `dist/`.

**Enlaces revisados antes de eliminar:** grep exhaustivo de `"mantenimiento"` y de `servicios/mantenimiento`/`services/maintenance` en todo `src/` y `astro.config.mjs`. Único resultado relevante: las 3 rutas de imagen propias del servicio (eliminadas junto con su registro). El resto de las coincidencias de la palabra "mantenimiento" son contenido no relacionado (FAQ de soporte técnico, la subcategoría "Mantenimiento" de la Store dentro de `techCatalog.ts`/`storeTaxonomy.ts` — un concepto de catálogo de la Store, sin relación con el servicio corporativo eliminado). **No había ningún enlace hardcodeado** en home, Navbar, Footer ni otras páginas de servicio — el listado de servicios (`/servicios`, `/en/services`) genera sus tarjetas iterando el array `services`, así que desapareció automáticamente al quitar el registro; lo mismo para el sitemap, que deriva sus pares `{es,en}` de `serviceSlugMap`.

**Sobre el 404 / redirect:** revisado `vercel.json` — no tiene ninguna redirección configurada todavía, y el despliegue actual (`av-plataform-ruby.vercel.app`) ya envía `X-Robots-Tag: noindex, nofollow` a todo el sitio. El dominio real (`www.asiaven.com`) no ha lanzado esta versión del sitio todavía. **Recomendación: no hace falta agregar un redirect.** No hay indexación real que proteger (el único despliegue existente ya es noindex) y no hay lanzamiento previo cuyas URLs pudieran estar compartidas externamente. Si en el futuro el sitio ya está en producción y se elimina un servicio así, ahí sí correspondería evaluar un redirect en `vercel.json`.

Las 3 imágenes propias del servicio (`public/images/corporativo/servicios/mantenimiento/*.webp`) quedaron huérfanas en disco — no se borraron (no era parte del pedido), solo se dejó de referenciarlas.

### 2. "Ascensores de Lujo" consolidado dentro de "Ascensores para Oficina"

Subproducto "Ascensores de Lujo" eliminado de `services.ts`. Sus 3 características premium se agregaron a "Ascensores para Oficina" (que conserva las 9 que ya tenía), redactadas en el mismo estilo breve de las existentes:

| ES | EN |
|---|---|
| Acabado premium en cabina | Premium cabin finish |
| Piso de mármol | Marble flooring |
| Aire acondicionado | Air conditioning |

"Piso de mármol" se redactó tal cual (no genérico) porque el dueño del proyecto confirmó explícitamente que el acabado del piso es de mármol o de ese estilo — a diferencia de la redacción deliberadamente genérica que se usó en su momento para "Terminaciones premium en cabina" (la feature de Lujo que ahora se retira), donde no había esa confirmación.

**Panorámica 360:** el archivo `ascensores-lujo.jpg` fue renombrado por el dueño del proyecto a `ascensores-oficina.jpg` (fuera de esta tarea, ya en el working tree al empezar). El campo `panorama360` de "Ascensores para Oficina" ahora apunta a ese archivo. Resultado: **4 tipos de ascensor** (antes 5), y **Oficina gana visor 360** (antes no lo tenía). Verificado en navegador: el botón "Ver vista 360°" de Oficina abre el visor y carga el canvas correctamente con el archivo renombrado.

**Verificado sin referencias huérfanas** a `ascensores-lujo`/`"Ascensores de Lujo"`/`"Luxury Elevators"` en `src/` (grep exhaustivo) — el único resto es el comentario explicativo de esta misma consolidación en `services.ts`. **`ascensores-lujo.webp`** (la imagen de tarjeta, distinta de la panorámica) **queda sin uso en disco — no se borró**, ya que el pedido fue reportarlo, no eliminarlo.

### 3. Logo en vez del texto "ASIAVEN" (Navbar y Footer corporativos)

Archivo: `public/images/corporativo/logo-asiaven.svg` — SVG con colores hardcodeados por `path` (`fill="rgb(85,85,85)"` etc., sin `viewBox`, solo `width`/`height="500"`).

**Método elegido: inline con `currentColor`, no `<img>`.** Un `<img src="logo.svg">` no permite recolorear por CSS — el navegador lo trata como una imagen opaca, sin acceso a sus colores internos. Se optó por leer el archivo en build-time (`src/components/ui/AsiavenLogo.astro`, mismo patrón de `process.cwd()` ya usado y verificado en `pdfExists.ts` — no `import.meta.url`) y transformarlo antes de insertarlo inline:
- Cada `fill="rgb(...)"` / `stroke="rgb(...)"` literal se reemplaza por `currentColor` — el logo hereda el `color` CSS de su contenedor (blanco en ambos, vía la clase `text-white` ya existente en los enlaces del Navbar/Footer).
- Se agrega `viewBox="0 0 500 500"` (el archivo no lo trae) para que las clases de tamaño (`h-9 w-9` en Navbar, `h-10 w-10` en Footer) lo escalen proporcionalmente sin deformarlo ni recortarlo, en vez de depender del `width`/`height` fijo original.

**Accesibilidad:** el SVG inline lleva `aria-hidden="true"` (es puramente decorativo una vez inline); el `<a>` que lo envuelve lleva `aria-label="ASIAVEN"`, así que el enlace sigue anunciándose igual que antes para lectores de pantalla. El enlace sigue yendo al home del idioma activo (`getRouteHref("home", lang)`, sin cambios en esa lógica).

**Verificado con `npm run build` + `npm run preview`:**
- Confirmado por `grep` sobre el HTML generado: 0 ocurrencias de `fill="rgb`/`stroke="rgb` restantes, 2 `viewBox="0 0 500 500"` (Navbar + Footer), 2 `aria-label="ASIAVEN"`.
- Confirmado en navegador (JS, `getComputedStyle`) que ambos SVG resuelven `color: rgb(255, 255, 255)` — blanco — con las dimensiones esperadas (36×36 Navbar, 40×40 Footer) y el `viewBox` correcto, es decir, sin deformación.
- Confirmado visualmente (captura de pantalla) en desktop (top de página) y en el menú móvil abierto (375×812) que el logo se ve blanco y nítido.
- **Limitación del entorno de prueba, no del código:** la herramienta de captura de pantalla de esta sesión devolvió una imagen en blanco al capturar con la página desplazada hacia el footer (funciona bien en la parte superior de la página) — un problema de la herramienta ya observado antes en este proyecto con contenido WebGL, aquí con contenido normal DOM/SVG desplazado. La verificación del logo del Footer se apoya en la evidencia de `getComputedStyle` + `getBoundingClientRect` (confirmando que el elemento está en el viewport, visible, con el color y tamaño correctos), no en una captura visual directa de esa sección.
- Confirmado en ambos idiomas (ES: `href="/"`, EN: `href="/en"`).

### Verificación general de los 3 cambios

`npm run build` → **0 errores, 116 páginas** (118 − 2: `/servicios/mantenimiento` + `/en/services/maintenance`, únicas rutas que dejaron de generarse — la consolidación de Lujo/Oficina y el logo no agregan ni quitan páginas). Las 7 páginas de servicio restantes, en ambos idiomas, verificadas sin regresión (cada una con su `<h1>` presente).

**Hallazgo, sin tocar:** al sincronizar con `develop` para esta rama, 3 archivos aparecieron modificados/nuevos en el working tree sin relación con esta tarea — `public/images/corporativo/servicios/recipientes-gas-licuado/cilindros-gas.webp` (modificado), `public/images/corporativo/afiliadas/av-envasados.webp` (nuevo) y `public/images/store/` (directorio nuevo). No se incluyeron en ningún commit de esta tarea; quedan sin commitear para que el equipo los revise por separado.

---

## 🔒 Store oculta temporalmente (branch `feat/ocultar-store`)

**Motivo:** el catálogo de la Store (`techCatalog.ts`) tiene 126 productos con datos de relleno (imágenes de stock de Unsplash, precios simulados) — no debía publicarse así en producción. Se apagó de forma deliberadamente reversible: **nada se borró** (ni código, ni datos, ni componentes de la Store), todo queda detrás de un único flag.

### El flag — único punto de control

`src/config/storeFlags.ts` exporta `STORE_CATALOG_LIVE = false`. **Revertir esto cuando la base de datos de productos reales esté lista es cambiar ese valor a `true`** — no hace falta tocar ningún otro archivo para que el catálogo, la navegación con submenús y los CTAs hacia la Store vuelvan a su comportamiento original. El resto de esta sección documenta CÓMO cada archivo usa ese flag, para poder verificar la reversión si algo no vuelve como se espera.

### ✅ Checklist de reversión — qué vuelve al cambiar el flag a `true`

Para quien retome esto en meses sin haber seguido el detalle: cambiar `STORE_CATALOG_LIVE` a `true` en `src/config/storeFlags.ts` restaura, todo junto, sin tocar nada más:

1. **El botón "Tienda" del Navbar corporativo** (desktop y móvil, ambos idiomas) — hoy oculto.
2. **El enlace "AV Store →" del Footer corporativo** — hoy oculto.
3. **La sección "Drivers" completa de `/soporte-tecnico` y `/en/technical-support`** (encabezado + texto + botón "Ver drivers") — hoy oculta.
4. **El botón "Ver producto en la tienda" de `/envases/producto/[producto]`** — hoy oculto.
5. **Las 14 páginas estáticas de la Store** (`store/index`, `garantia`, `envios`, `busqueda`, `cotizacion`, `medida/*` ×4, `soporte/*` ×5 salvo `contacto-ventas`) — hoy muestran "Próximamente", vuelven a su contenido real.
6. **`store/[categoria].astro`** — hoy genera solo 2 stubs de "Próximamente" (`/store/productos`, `/store/soluciones-empresariales`); vuelve a generar los ~73 slugs de grupo/ítem con productos reales.
7. **`store/producto/[slug].astro`** — hoy no genera nada (126 productos); vuelve a generar las 126 páginas.
8. **`store/envases/[slug].astro`** — hoy no genera nada (67 páginas: 5 categorías + 62 productos); vuelve a generarlas.
9. **`StoreNavigation.tsx`** — los 5 disparadores del navbar de la Store vuelven a abrir su mega-menú en vez de ser enlaces directos.

Los CTAs de PDF en `/servicios/tecnologia-y-telecomunicaciones` y `/servicios/envases` (sección "Catálogos PDF" más abajo) **NO dependen de este flag** — esos son permanentes, no se revierten con la Store.

### Qué queda con contenido real (sin cambios de comportamiento)

- **`/store/recipientes/gas-licuado`** — el único producto real de la Store hoy. No depende del flag, nunca se tocó.
- **`/store/soporte/contacto-ventas`** — formulario de contacto genérico y real (no depende del catálogo falso); es el destino del CTA "Solicitar Cotización" de gas licuado, así que debía seguir funcionando. No depende del flag.

### Qué muestra "Próximamente" (`src/components/store/ComingSoon.astro`)

Componente único y reutilizable — recibe `sectionName` y muestra `"{sectionName} — Próximamente"` (no un cartel idéntico en todas partes: "Productos — Próximamente", "Garantía — Próximamente", etc.). Siempre con `noindex,nofollow` (prop `noindex` nueva en `StoreLayout.astro`).

Cada página sigue existiendo como archivo, con su contenido real intacto más abajo en el mismo archivo — solo se envuelve en `{STORE_CATALOG_LIVE ? (<real>) : <ComingSoon sectionName="..." />}`, así que revertir el flag basta para que todas vuelvan a mostrar su contenido real sin tocarlas una por una:

| Archivo | `sectionName` |
|---|---|
| `store/index.astro` | Asiaven Store |
| `store/garantia.astro` | Garantía |
| `store/envios.astro` | Envíos |
| `store/busqueda.astro` | Búsqueda |
| `store/cotizacion.astro` | Cotización |
| `store/medida/{laptops,desktops,workstations,servidores}.astro` | Equipo a Medida |
| `store/soporte/descargas.astro` | Software y Drivers |
| `store/soporte/faq.astro` | Preguntas Frecuentes |
| `store/soporte/informacion.astro` | Soporte Técnico |
| `store/soporte/ticket.astro` | Soporte y Solución de Problemas |
| `store/soporte/asesoria-compra.astro` | Asesoría de Compra |

`store/[categoria].astro` es un caso especial: su `getStaticPaths()`, cuando el flag está apagado, genera **solo** las 2 categorías de nivel superior (`/store/productos`, `/store/soluciones-empresariales`) como stubs de `ComingSoon` — los ~73 slugs de grupo/ítem (`/store/laptops`, `/store/equipos-de-computo`, etc.) **no se generan en absoluto** mientras el flag esté apagado.

### Qué deja de generarse por completo (0 páginas en `dist/` mientras el flag esté apagado)

- **`store/producto/[slug].astro`** — los 126 productos falsos. `getStaticPaths()` retorna `[]` si `!STORE_CATALOG_LIVE`.
- **`store/[categoria].astro`** — los ~73 slugs de grupo/ítem (ver tabla arriba); solo se generan cuando el flag está en `true`.
- **`store/envases/[slug].astro`** (67 páginas: 5 categorías + 62 productos). **Cambio de criterio respecto a la decisión anterior** (que las dejaba generándose por tratarse de catálogo real, no relleno): verificado que este contenido es un **duplicado exacto** del catálogo corporativo `/envases/*` — misma fuente de datos (`packagingCatalog.ts`), mismos títulos, mismas specs, ninguna diferencia sustantiva salvo el layout de la Store alrededor. Ocultarlas no pierde ningún contenido (el corporativo sigue publicado) y evita contenido duplicado de cara a Google. Motivo adicional que ya se había reportado: tras simplificar `StoreNavigation.tsx`, estas páginas se habían quedado sin ningún enlace entrante en todo el sitio — alguien que llegara desde una búsqueda aterrizaba en una sección de una tienda que anuncia estar cerrada. `getStaticPaths()` retorna `[]` si `!STORE_CATALOG_LIVE`, mismo mecanismo que los otros dos casos.

Verificado explícitamente: `/store/producto/mantenimiento-av-3` y `/store/laptops` devuelven **404** en el build real (`npm run preview`), no un cartel — coherente con "no queremos que existan ni que Google las indexe". `/store/envases` (directorio completo) confirmado ausente de `dist/`.

### Navegación (`StoreNavigation.tsx`)

Los 5 disparadores del navbar (2 `storeCategories` + "Equipo a Medida" + "Recipientes" + "Soporte Técnico") dejan de abrir su mega-menú y pasan a ser enlaces directos — guardado con `{STORE_CATALOG_LIVE ? <botones originales> : <enlaces>}` en el bloque desktop y en el acordeón móvil, así que revertir el flag restaura el comportamiento de submenú exacto sin tocar este archivo. Con el flag apagado:

| Etiqueta | Enlace |
|---|---|
| Productos | `/store/productos` (Próximamente) |
| Soluciones Empresariales | `/store/soluciones-empresariales` (Próximamente) |
| Equipo a Medida | `/store/medida/laptops` (Próximamente) |
| **Recipientes** | `/store/recipientes/gas-licuado` (**real** — es la única forma de llegar ahí por navegación normal) |
| Soporte Técnico | `/store/soporte/informacion` (Próximamente) |

Este componente nunca pasó por i18n (texto hardcodeado en español) — decisión consciente del dueño del proyecto, no tocada en esta tarea ni antes.

### Enlaces corporativos ocultados mientras la Store está apagada

**Cambio de criterio respecto al cierre anterior de esta tarea**, que dejaba el botón "Tienda" del Navbar/Footer y el CTA de drivers sin tocar (razonando que un "Próximamente" profesional era aceptable). Decisión del dueño del proyecto: el sitio corporativo es lo que se publica, y no debe tener puertas visibles hacia secciones cerradas — un botón de navegación principal ("Tienda") es demasiado prominente para una promesa. Los 4 enlaces corporativos hacia `/store` que existían se ocultan, todos con el mismo mecanismo `{STORE_CATALOG_LIVE && (...)}` (ninguno se repunta a otro destino, ninguna clave de diccionario se borra):

| Ubicación | Elemento | Antes llevaba a |
|---|---|---|
| `Navbar.astro` (desktop + móvil, ambos idiomas) | Botón "Tienda" / "Store" | `/store` |
| `Footer.astro` (ambos idiomas) | Enlace "AV Store →" | `/store` |
| `soporte-tecnico.astro` / `en/technical-support.astro` | Sección completa "Drivers" (encabezado + texto + botón "Ver drivers") — se oculta la sección entera, no solo el botón, porque sin CTA quedaría un bloque promocional sin ninguna acción posible | `/store/soporte/descargas` |
| `envases/producto/[producto].astro` | Botón "Ver producto en la tienda" (ver detalle abajo) | `/store/envases/{slug}` |

Revisado explícitamente el resto del sitio corporativo (`grep` sobre todos los `.astro`/`.tsx` fuera de `src/pages/store/` y `src/components/store/`) — no quedó ningún otro enlace corporativo hacia `/store`; los únicos otros archivos que mencionan `/store` (`BTOForm.tsx`, `QuoteCartList.tsx`, `QuoteRequestForm.tsx`, `SearchResultCard.tsx`, `StoreHeroSlider.tsx`) son componentes internos de la Store, usados solo desde páginas de `store/*`.

### Enlace corporativo ocultado (no repuntado) — `/envases/producto/[producto]`

El botón "Ver producto en la tienda" (llevaba a `/store/envases/{slug}`) se oculta con `{STORE_CATALOG_LIVE && (...)}` en vez de repuntarse a otro destino — un botón que promete un producto específico y entrega un cartel genérico de "Próximamente" es peor que no ofrecer el botón. El resto de la página (specs, breadcrumb) no cambió.

### Catálogos PDF (`public/documentos/catalogos/`)

Ruta acordada, ya con los 2 archivos que subió el dueño del proyecto: `catalogo-envases.pdf` (7.2 MB, 15 páginas) y `catalogo-tecnologia.pdf` (2.9 MB, 2 páginas) — estaban subidos en `public/documentos/` a secas (root) y se movieron a la subcarpeta `catalogos/` para coincidir con la ruta acordada.

**Comprobación de existencia en build-time — `src/utils/pdfExists.ts`.** Mismo criterio que `panorama360` opcional del visor 360: si el PDF no existe, el botón no se ofrece. **Hallazgo importante, verificado con `npm run build` + `npm run preview` reales (no `astro dev`):** la resolución de ruta vía `import.meta.url` (que parecía la opción "no depende de cwd") en realidad SÍ depende de dónde Vite decide colocar el chunk compilado — en el build real, el archivo termina en `dist/.prerender/chunks/pdfExists_[hash].mjs`, dos niveles de profundidad distintos a los de `src/utils/`, así que la ruta relativa calculada apuntaba a un `dist/public/` inexistente y el chequeo SIEMPRE daba `false` (confirmado con logging temporal antes del fix). La solución que sí funciona, verificada con el mismo build real: `path.join(process.cwd(), "public", "documentos", "catalogos", filename)` — asume que `npm run build`/`astro build` se invoca desde la raíz del repo, la misma asunción de la que ya depende cualquier import relativo de `astro.config.mjs`.

Verificado en ambos sentidos: quitando temporalmente `catalogo-tecnologia.pdf` del disco y reconstruyendo, el botón correspondiente desaparece del HTML generado (0 coincidencias por grep) mientras el botón de envases (archivo presente) sigue apareciendo — confirma que el chequeo es específico por archivo, no global.

`/servicios/tecnologia-y-telecomunicaciones`: el botón "Ir a la tienda" se reemplazó por "Ver catálogo (PDF)" → `catalogo-tecnologia.pdf` (nueva clave de diccionario `services.detail.techCatalogPdfCta`, ES/EN). `/servicios/envases`: el botón ya existente "Descargar catálogo (PDF)" pasó de `href="#"` a `catalogo-envases.pdf` (misma clave `catalogPdfCta`, sin clave nueva).

**`storeCta`/`storeSpanishOnlyNote` (diccionario `services.detail`) se conservan sin uso, a propósito** — existían para el CTA hacia la Store que el punto anterior reemplaza. No se borraron: vuelven a hacer falta si se revierte el apagado de la Store y el CTA a `/store` regresa a `/servicios/tecnologia-y-telecomunicaciones`. Comentario explicativo ya agregado en `es.ts` junto a esas claves.

### Divisiones especializadas de la home (`Affiliates.astro`)

Las 4 tarjetas (`AV Constructora`, `AV Elevators`, `AV Maquinarias Pesadas`, `AV Tecnología`) tenían `href="#"` — enlaces rotos. Se cambió el elemento contenedor de `<a>` a `<div>` (mismas clases, sin ningún otro cambio de markup): las tarjetas ya no navegan a ningún lado, pero conservan exactamente el mismo hover/transición (que es puro CSS vía la clase `group`, no depende de que el elemento sea un enlace). Verificado en navegador.

### i18n — fuera de alcance en esta tarea

No se tocó nada de `src/i18n/*` salvo las 3 claves de diccionario ya mencionadas (nueva `techCatalogPdfCta`, conservación de `storeCta`/`storeSpanishOnlyNote`). La Store completa (`StoreNavigation.tsx`, `StoreLayout.astro`, `StoreFooter.astro`, todas las páginas `store/*`) permanece 100% en español, sin diccionario y sin `routeKey`/hreflang — decisión ya vigente desde antes de esta tarea, reafirmada aquí explícitamente.

### Verificación ejecutada

- `npm run build` → **0 errores, 118 páginas** (185 − 67, cierre anterior de esta tarea). Diferencia explicada: las 67 páginas de `store/envases/[slug]` (5 categorías + 62 productos) dejaron de generarse.
- Confirmado por `grep` exhaustivo sobre las 100 páginas corporativas de `dist/` (ES + EN, excluyendo `dist/store/*`): **0 coincidencias** de `href="/store"` en cualquiera de ellas.
- Confirmado `find dist/store` — el directorio `store/envases` ya no existe.
- Gas licuado: confirmado accesible desde el navbar de la Store vía "Recipientes" → `/store/recipientes/gas-licuado`.
- Sin regresión visual en el navbar/footer corporativos tras quitar el botón "Tienda" — confirmado en navegador (desktop y menú móvil) que no queda ningún hueco ni desalineación; `/soporte-tecnico` pasa directo del título a la sección de FAQ, sin bloque vacío donde antes estaba "Drivers".
- Tarjetas de divisiones: confirmado en navegador que son `<div>` sin `href`, con las mismas clases de hover/transición.
- Páginas "Próximamente": confirmado `noindex,nofollow` presente y `sectionName` contextual correcto en varias (`Productos`, `Soluciones Empresariales`).
- 404 real confirmado para una ruta de grupo/ítem (`/store/laptops`) y un producto falso (`/store/producto/mantenimiento-av-3`).
- Páginas corporativas traducidas sin regresión: `/servicios/envases` y `/servicios/tecnologia-y-telecomunicaciones` (ambos idiomas) con selector, hreflang y botones de PDF funcionando.

### Listado de rutas `/store` en `dist/` (post-cambio)

```
store/index.html                              (Próximamente)
store/productos/index.html                    (Próximamente — antes categoría de nivel superior)
store/soluciones-empresariales/index.html      (Próximamente — antes categoría de nivel superior)
store/garantia/index.html                      (Próximamente)
store/envios/index.html                        (Próximamente)
store/busqueda/index.html                      (Próximamente)
store/cotizacion/index.html                    (Próximamente)
store/medida/{laptops,desktops,workstations,servidores}/index.html   (Próximamente ×4)
store/soporte/{descargas,faq,informacion,ticket,asesoria-compra}/index.html   (Próximamente ×5)
store/soporte/contacto-ventas/index.html       (real)
store/recipientes/gas-licuado/index.html       (real)
```
`store/[categoria]` (grupos/ítems, ~73), `store/producto/*` (126) y `store/envases/*` (67, cierre de esta tarea) — ausentes del build, confirmado.

---

**✅ RESUELTO (2026-08-31) — Las 3 panorámicas 360° de ascensores ya no son las versiones degradadas por WhatsApp.** El dueño del proyecto consiguió los originales sin recomprimir y los commiteó directamente (`bf3def7 aumento de resolucion en imagenes 360`, fuera de cualquier tarea de este historial — no lo hice yo). `ascensores-residenciales.jpg`, `ascensores-panoramicos.jpg` y `ascensores-lujo.jpg` pasaron de **1600×791px (~230 KB)** a **2912×1440px (~2.3 MB)** cada una, mismas rutas (sin tocar código).

**Consecuencia (a) — el ratio 2:1 sigue sin ser exacto, pero la desviación es ahora menor y no visible.** 2912×1440 da un ratio de 2.0222 (2880×1440 sería el 2:1 exacto — faltan 32px de ancho, un 1.1% de desviación, contra el 1.4% de la versión anterior). Inspeccionadas las 3 imágenes visualmente (herramienta de lectura de imágenes, no el visor Pannellum en vivo — ver limitación de entorno ya documentada más abajo): **no se observa costura visible en los bordes izquierdo/derecho ni distorsión de remolino/pellizco en los polos** (techo y piso) más allá de la curvatura esperada de cualquier proyección equirrectangular real sobre un techo/piso curvo de cabina de ascensor — esa curvatura es una propiedad de la proyección, no un defecto de esta imagen en particular. La desviación de 1.1% en el ancho se traduciría en un estiramiento horizontal casi imperceptible a simple vista dentro del visor.

**Consecuencia (b) — el peso se multiplicó por ~10 (230 KB → 2.3 MB), y el timeout del visor (20s, elegido sin conocer este peso real) puede generar falsos errores en conexiones móviles lentas.** Cálculo de tiempo de descarga para 2.3 MB según velocidad de conexión:

| Conexión | Velocidad | Tiempo estimado |
|---|---|---|
| Edge/2G | 250 kbps | ~74s |
| 3G lenta (perfil "Slow 3G" de Chrome DevTools) | 400 kbps | ~46s |
| 3G rápida | 1.6 Mbps | ~12s |
| 4G típico | 15 Mbps | ~1s |

**✅ RESUELTO (branch `fix/visor-360-timeout` → continuado en `feat/ocultar-store`).** Decisión del dueño del proyecto: 45s era demasiado tiempo mirando un indicador que no dice nada — a esa altura el usuario ya cerró la pestaña. Se implementaron dos cambios en `Panorama360Modal.tsx`, ver sección dedicada más abajo ("Timeout de 30s + indicador de progreso real"): el timeout bajó a **30s** (no a 45s) y se agregó un **indicador de progreso real** (no simulado) que hace tolerable la espera — el problema no era solo "cuánto esperar", era "esperar sin saber si algo está pasando".

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

**Fase 1 del i18n del sitio corporativo cerrada.** Infraestructura completa y estable; 6 de 11 páginas corporativas traducidas (home incluida) + el 404 global bilingüe. La traducción de `/servicios` y `/envases` (hub + rutas dinámicas) quedó **aplazada deliberadamente** — no era deuda técnica ni falta de tiempo, era una dependencia real explicada en detalle más abajo. Todo `/store/*` sigue sin tocar (fuera de alcance desde el inicio).

**Fase 2 — `/servicios` traducido, levantando parcialmente el aplazamiento anterior** (branch `feat/i18n-servicios`). El catálogo de envases (`/envases` y sus rutas) sigue aplazado por el motivo original (migración a base de datos, sin cambios) — ver sección dedicada más abajo. Detalle completo de la Fase 2 en su propia sección, después del resumen de la Fase 1.

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

### Páginas pendientes (al cierre de la Fase 1; ver Fase 2 más abajo para `/servicios`)
`servicios` (hub + `[servicio]` dinámica), `envases` (hub + `[categoria]`/`producto/[producto]` dinámicas) — **APLAZADAS** al cierre de la Fase 1, ver la sección dedicada justo abajo. Todo `/store/*` sin tocar, fuera de alcance desde el inicio. **Actualización Fase 2:** `servicios` ya se tradujo — ver sección "Fase 2" más abajo. `envases` sigue aplazado.

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

**Features de "Ascensores de Lujo" corregidas (branch `fix/tarjetas-producto`).** Las 3 features inventadas sin aprobar (iluminación LED de diseño, panel táctil de control, personalización con materiales concretos) fueron rechazadas por el dueño del proyecto y reemplazadas: ahora son las mismas 8 features de "Ascensores Residenciales" (excepto "Reducción de espacios", que no aplica a Lujo) más una única feature nueva y genérica sobre el acabado ("Terminaciones premium en cabina" / "Premium cabin finishes") que deliberadamente no nombra materiales concretos (mármol, piedra natural, maderas específicas), ya que no está confirmado qué ofrece Asiaven realmente. Total: 9 features (antes 11). Ya no es un pendiente de revisión — el contenido inventado sin aprobar fue removido.

### Visor 360° en `/servicios/ascensores`
`SubProduct.panorama360?: string` (no localizado, no se traduce) — solo lo tienen los tipos que ya cuentan con panorámica equirrectangular: **Residenciales, Panorámicos y Oficina**. **Solo Hospitales no tiene el campo** (no hay imagen todavía) y por lo tanto no muestra ningún botón — mismo criterio que el `LanguageSwitcher` en páginas no traducidas: nada se renderiza en vez de un botón deshabilitado o un "próximamente".

**Actualización (branch `feat/limpieza-corporativa`):** "Ascensores de Lujo" se eliminó como tarjeta propia (consolidado dentro de "Ascensores para Oficina", ver sección dedicada más abajo) — su panorámica (`ascensores-lujo.jpg`, renombrada por el dueño del proyecto a `ascensores-oficina.jpg`) pasó a ser la de Oficina. Antes eran 3 de 5 tipos con panorámica (Residenciales, Panorámicos, Lujo); ahora son 3 de 4 (Residenciales, Panorámicos, Oficina) — Hospitales sigue siendo el único sin visor 360.

**Convención de nombres** — `public/images/corporativo/producto-360/{slug-del-tipo}.jpg` (kebab-case español, coincide con el nombre del archivo en `producto-detalle/` pero con extensión `.jpg` simple, sin el `.webp` de las fotos normales — las panorámicas son JPEG equirrectangular, formato que Pannellum espera).

**Implementación:** `pannellum` (MIT) instalado por npm, cargado con `import()` dinámico dentro de `Panorama360Modal.tsx` — Vite lo empaqueta en un chunk aparte que solo se pide al pulsar "Ver vista 360°"; verificado con `npm run build` + `npm run preview` (no solo `astro dev`) que ni el JS/CSS de pannellum ni las panorámicas se descargan al cargar la página. El modal atrapa el foco, cierra con botón/Escape/clic fuera, devuelve el foco al botón que lo abrió, bloquea el scroll del fondo, y muestra estados de carga/error (ambos del diccionario, namespace `services.viewer360`). El contenedor del visor tiene su altura fija por Tailwind ya aplicada desde el primer render (sin animación de apertura que la retrase) para evitar el fallo silencioso característico de Pannellum de inicializarse con alto cero.

**Verificado:** los 3 tipos con panorámica muestran el botón y abren el visor; Oficina/Hospitales no muestran botón; las 3 vías de cierre funcionan (botón, Escape, clic fuera — confirmado por JS que el foco vuelve exactamente al botón que abrió el modal en cada caso); scroll del fondo bloqueado mientras está abierto; funciona en viewport móvil (375×812) con el listener táctil de Pannellum (`.pnlm-container`) presente y respondiendo sin error.

### Corrección del manejo de errores del visor 360° (branch `fix/visor-360-errores`)
**Fallo confirmado en producción (Vercel):** desconectando la red y pulsando "Ver vista 360°", el modal se quedaba mostrando el indicador de carga indefinidamente — el mensaje de error nunca aparecía. Causa: `viewer.on("error")` solo cubre errores que el propio Pannellum llega a emitir (por ejemplo un 404 real, donde el navegador sí responde), no una petición que se queda colgada por falta de red — en ese caso no hay ningún evento inmediato, solo el timeout propio del navegador, que puede tardar decenas de segundos.

**Fix:** timeout propio de **20 segundos** (`PANORAMA_LOAD_TIMEOUT_MS` en `Panorama360Modal.tsx`) que fuerza el estado de error si la panorámica no ha cargado en ese plazo, sin esperar al navegador. Se eligió 20s como punto medio deliberado: tolera una conexión lenta cargando un archivo de varios MB (las panorámicas HD que van a reemplazar a las actuales — ver bloqueante de panorámicas degradadas por WhatsApp) sin dejar al usuario esperando el tiempo que un navegador tardaría en darse por vencido por su cuenta. El timeout se cancela (`clearTimeout`) tanto en `viewer.on("load")` como en `viewer.on("error")` — el error real (ej. 404) sigue apareciendo de inmediato, sin esperar los 20s — y también en la limpieza del efecto al desmontar el modal, para no dejar temporizadores huérfanos si el usuario cierra antes de que expire el plazo. El mensaje de error reutiliza la clave ya existente en el diccionario (`services.viewer360.errorText`, ambos idiomas) — no se agregó ninguna clave nueva. No se agregó botón de reintentar: cerrar el modal (ya soportado por las 3 vías existentes) es la vía de salida.

**Verificado con `npm run build` + `npm run preview`**, tres escenarios por separado:
1. **Red caída:** no es posible desconectar la red real del entorno de este navegador de pruebas, así que se simuló interceptando el constructor `Image` global para que, para la panorámica, nunca disparara ni `load` ni `error` (ninguno de los dos eventos, indefinidamente) — esto reproduce exactamente la condición real (ninguna señal de Pannellum) sin depender de que el navegador del entorno soporte modo offline. Confirmado: a los ~23s (pasado el plazo de 20s) el mensaje de error reemplazó al indicador de carga; el modal se pudo cerrar con normalidad después.
2. **Imagen inexistente (404 real):** se renombró temporalmente el archivo servido (`dist/images/corporativo/producto-360/ascensores-residenciales.jpg`, restaurado al terminar la prueba; el original en `public/` no se tocó) para forzar un 404 real de red — confirmado en el listado de requests (`404 Not Found`). El error apareció en ~2.5s, sin esperar el timeout de 20s, confirmando que ambos caminos (evento nativo de Pannellum vs. timeout propio) funcionan de forma independiente.
3. **Carga normal:** sin ninguna intercepción, el visor cargó con normalidad (canvas presente, sin overlay de carga ni de error) y se esperó explícitamente más allá del plazo de 20s (25s en total) para confirmar que el error nunca aparece sobre una panorámica ya cargada — el `clearTimeout` en `viewer.on("load")` funciona.

También verificado: cerrando el modal 1.5s después de abrirlo con la carga colgada (antes de que expiren los 20s) y esperando 23s adicionales, no aparece ningún error tardío ni advertencia de React por actualizar estado en un componente desmontado — el timeout se limpia correctamente al desmontar.

**Limitación del entorno de prueba, no del código:** la herramienta de captura de pantalla de este entorno no compone el contenido WebGL de Pannellum (pantalla en blanco, reproducible en pestañas nuevas) — confirmado por evidencia programática (JS) que el modal, el canvas y el contexto WebGL están correctamente inicializados con dimensiones reales, pero no fue posible obtener una captura visual del renderizado ni describir su nitidez/costuras a partir de esta sesión.

### Timeout de 30s + indicador de progreso real (branch `fix/visor-360-timeout`, continuado en `feat/ocultar-store`)

**Motivo:** con las panorámicas en alta resolución (~2.3MB, ver bloqueante resuelto más arriba), 45s de espera frente a un indicador indeterminado era demasiado — el usuario ya se habría ido antes de que el error apareciera. La solución real no era solo ajustar el número: era mostrar progreso, para que la espera se sienta acotada y activa en vez de un spinner sin información.

**Timeout bajado a 30s** (`PANORAMA_LOAD_TIMEOUT_MS` en `Panorama360Modal.tsx`) — cubre 3G decente y conexiones móviles normales; en las muy malas (3G lenta ~46s, Edge/2G ~74s calculados) el usuario recibe el mensaje de error en vez de esperar el doble de ese tiempo sin ninguna señal.

**Indicador de progreso real, no simulado.** La panorámica se descarga con `fetch()` en vez de dejar que Pannellum la pida por su cuenta:
- Se lee el header `Content-Length` de la respuesta y se consume el `body` como stream (`response.body.getReader()`), acumulando bytes recibidos para calcular `Math.round((recibidos / total) * 100)` en cada chunk — el progreso avanza con la descarga real, no con un temporizador que simula avance.
- **Si `Content-Length` no está disponible** (o el navegador no soporta leer el `body` como stream), se cae a `response.blob()` directo — el progreso se queda en `null` y la UI muestra el mismo indicador indeterminado de antes (el texto `loadingText` sin porcentaje). Nunca se inventa un número.
- El blob resultante se pasa a Pannellum como **blob: URL** (`URL.createObjectURL`), no como la URL http original. **Verificado en el código fuente de Pannellum** (`node_modules/pannellum/build/pannellum.js`) que esto es soportado nativamente: su función interna `qa()` detecta explícitamente el prefijo `"blob:"` para tratar la URL como absoluta (sin anteponerle `basePath`) — Pannellum internamente vuelve a "cargar" ese blob por su cuenta (instantáneo, ya está en memoria) y sigue su flujo normal de `load`/`error`. No hizo falta ninguna solución alternativa.
- El object URL se libera (`URL.revokeObjectURL`) tanto en `viewer.on("load")`/`on("error")` como en la limpieza del efecto al desmontar — cualquiera de los dos casos que ocurra primero revoca exactamente una vez (la variable se pone en `null` tras revocar, así que el otro camino no vuelve a intentarlo).
- El timeout de 30s sigue aplicando sobre el ciclo completo (fetch + stream + entrega a Pannellum): se arma antes del `fetch()` y solo se cancela en `load`/`error`, igual que en la versión anterior.
- Nueva clave de diccionario `services.viewer360.loadingProgressText` (ES: `"Cargando panorámica… {percent}%"`, EN: `"Loading panorama… {percent}%"`) — el `{percent}` se reemplaza en cliente por el número real. Se propaga a través de `ProductFeatureSlider.tsx` (`Viewer360Labels`) igual que las claves existentes, sin tocar las páginas `.astro` que ya pasan el objeto `viewer360` completo vía `t(lang, "services.viewer360")`.

**Verificado con `npm run build` + `npm run preview`:**
1. **Progreso visible bajo red lenta:** no fue posible usar el throttling nativo de las DevTools del navegador de este entorno (no expuesto por las herramientas disponibles), así que se simuló interceptando `fetch()` para envolver el `body` real de la respuesta en un stream que retrasa cada chunk (~250-700ms) antes de entregarlo — reproduce el efecto de una conexión lenta sobre datos reales (mismo `Content-Length`, mismos bytes), sin inventar nada. Confirmado: el porcentaje avanza de forma visible entre snapshots sucesivos (`"loading-no-%"` → `49%` → `92%` → listo) en vez de saltar de 0 a 100 de una vez, y la panorámica termina cargando correctamente (canvas presente, overlay de carga desaparece).
2. **Timeout sigue disparando el error:** simulado un stream cuyo `body` nunca entrega datos ni cierra (una conexión que responde pero se cuelga a mitad de transferencia). Confirmado: a los ~30s aparece el mensaje de error; el modal cierra con normalidad después.
3. **Sin `Content-Length`:** simulado eliminando ese header de la respuesta (con throttle de stream para poder observar el estado intermedio). Confirmado: se muestra el indicador indeterminado (`"Cargando panorámica…"`, sin ningún `%`) durante toda la carga, y la panorámica igual termina cargando correctamente.
4. **Desmontaje a mitad de descarga:** instrumentados `URL.createObjectURL`/`revokeObjectURL` para contar URLs vivas. Abierto el visor con descarga lenta (~700ms/chunk), cerrado el modal ~400ms después (a mitad de la descarga, antes de que se creara ningún blob todavía) y esperado 5s adicionales (más que suficiente para que la descarga hubiera terminado de no haberse cancelado). Confirmado: **0 URLs de blob pendientes** en todo momento, sin errores ni advertencias tardías en consola — el `AbortController` corta el `fetch()`/stream a tiempo y la limpieza del efecto no revoca nada porque nunca llegó a crearse un blob.

### Corrección de desbordamiento en `ProductFeatureSlider.tsx` (branch `fix/tarjetas-producto`)
**Síntoma reportado:** en viewport de laptop (1366×768 y 1440×900), la tarjeta "Ascensores de Lujo" (la única con 9 features, más contenido que las demás) mostraba el título cortado arriba (solo se veía la mitad inferior de las letras) y el botón de vista 360° cortado abajo. En móvil no ocurría, por tener proporcionalmente más alto disponible.

**Causa raíz confirmada** (medida con `getBoundingClientRect()` antes de tocar nada, en 1440×900): la columna de texto usaba `flex flex-col justify-center` dentro de un contenedor `.relative.min-h-[500px]` con `overflow-hidden` en el ancestro. Cuando el contenido de una tarjeta supera los 500px, el centrado vertical la desborda simétricamente por AMBOS extremos — arriba y abajo — y el `overflow-hidden` del contenedor raíz recorta ambos extremos sin que el scroll pueda alcanzarlos (el scroll interno de la lista `<ul>` solo cubre la lista, no el título ni el botón que quedan fuera de ella). Confirmado: título 26.8px por encima del borde superior del contenedor, botón 26.8px por debajo del inferior.

**Fix aplicado:** se reemplazó `justify-content: center` por `overflow-y-auto` en la columna de texto, envolviendo el título/lista/botón en un `<div className="m-auto w-full">` interno. Cuando el contenido cabe, el margen automático centra igual que `justify-content: center` (cero cambio visual). Cuando desborda, el margen colapsa a 0 y el contenido se ancla arriba, quedando accesible completo vía scroll del contenedor. Es el mismo mecanismo que `justify-content: safe center`, pero implementado sin depender de ese valor CSS más nuevo (soporte cross-browser menos seguro). El fix es genérico — aplica a las 5 tarjetas por igual, no es específico de Lujo.

**Verificado con `npm run build` + `npm run preview`** (no solo `astro dev` — evita falsos positivos de HMR/dev mode):
- **1366×768 y 1440×900:** Residenciales y Lujo (las únicas con 9 features, `scrollHeight` 530 vs `clientHeight` 500 — 30px de desborde real) no muestran clipping de título ni de botón; scroll confirmado programáticamente en ambos extremos (`scrollTop=0` → título completamente visible; `scrollTop=max` → botón completamente visible). Oficina, Panorámicos y Hospitales (`scrollHeight === clientHeight === 500`) no necesitan scroll y no cambian visualmente.
- **375×812 (móvil):** las 5 tarjetas necesitan scroll en la columna completa (contenido apilado en una sola columna ocupa más alto que en desktop), pero las 5 confirman scroll completo hasta ambos extremos (título visible en `scrollTop=0`, último elemento visible en `scrollTop=max`) — sin regresión respecto al comportamiento previo.

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
| `src/pages/en/services/index.astro` | Fase 2 — listado de servicios en inglés (`/en/services`). |
| `src/pages/en/services/[service].astro` | Fase 2 — detalle de servicio en inglés, `getStaticPaths` propio sobre los 8 slugs traducidos (`serviceSlugMap`). |
| `src/pages/en/packaging.astro` | Fase 2 — aviso del catálogo de envases en inglés (mismo patrón que `en/privacy.astro`/`en/terms.astro`). |

### Selector de idioma y navegación en páginas no traducidas
Mismo mecanismo desde la Fase 1a, con una vía adicional agregada en la Fase 2 (ver esa sección): política leída de `routes.ts` en los tres consumidores (switcher, Navbar, `serialize()` del sitemap) para RouteKeys fijas, más `getServiceDetailUrls`/`getAllTranslatedPairs` para los 8 pares de detalle de servicios (que no encajan en una RouteKey única). El switcher no se renderiza si la ruta actual no está traducida (o no pasó ni `routeKey` ni un par explícito); Navbar cae a la versión española para rutas sin `en`; el sitemap solo agrega alternates a pares traducidos.

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
2. **`/servicios` y `/envases`** — aplazadas en el cierre de la Fase 1. **`/servicios` ya se tradujo en la Fase 2** (ver sección dedicada arriba); `/envases` (el catálogo) sigue aplazado, mismo motivo original. No es un "olvido", es una decisión registrada con motivo y dependencia explícita.
3. **Prerrequisito de tipos para cuando se retome `/envases`:** `packagingCatalog.ts` y `techCatalog.ts` necesitan `satisfies` en vez de su anotación de tipo explícita actual — **pero eso NO basta por sí solo** (hallazgo de la Fase 2, ver sección dedicada): cada `slug`/identificador que deba quedar como literal necesita además `as const` en el campo individual, porque el campo está tipado como `string` en la interfaz (`PackagingCategory.slug`, `TechProduct.slug` o equivalente) y `satisfies` por sí solo ensancha ese campo a `string` de todas formas. Ver el fix aplicado a `services.ts` como referencia exacta del patrón a replicar.
4. **`ClientLogosCarousel.tsx`** — sin texto de UI propio más allá de los 17 nombres de cliente (`alt` de cada logo); nada que traducir en el componente en sí.
5. **PENDIENTE DE VERIFICACIÓN:** cuando `www.asiaven.com` migre a Vercel, confirmar con `curl -I` que ese host **no** devuelve `X-Robots-Tag`, mientras `av-plataform-ruby.vercel.app` sí lo hace (ya verificado en producción el 2026-08-28 — ver sección 8).
6. **BLOQUEANTE DE LANZAMIENTO — datos de oficina de Miami ficticios.** Ver encabezado dedicado al inicio de este documento. Se mantiene sin cambios: no se tocó en este cierre, solo se reafirma que sigue pendiente.

### Fase 2 — `/servicios` traducido (branch `feat/i18n-servicios`)

**Alcance:** `/servicios` → `/en/services`, `/servicios/[slug]` → `/en/services/[slug-en]` (8 páginas de detalle, incluida `/servicios/envases` — es la ficha descriptiva del servicio, distinta de `/envases` el catálogo; no muestra productos directamente, así que entraba en el alcance). El catálogo de envases (`/envases` y sus rutas de detalle) **sigue sin traducirse**, mismo motivo que en la Fase 1 (migración a base de datos pendiente) — se agrega únicamente `/en/packaging`, un aviso breve (mismo patrón que `/en/privacy`/`/en/terms`) que enlaza a la versión española.

**Prerrequisito resuelto — slugs de `services.ts` como unión de literales, NO `string`.** El diagnóstico original (comentario en `routes.ts` desde la Fase 1a) decía que bastaba con `satisfies Service[]` en vez de `: Service[]`. **Ese diagnóstico era incompleto y se comprobó incorrecto en esta fase**: `Service.slug` está tipado como `string` en la interfaz, y `satisfies` usa ese tipo como contexto para inferir el objeto literal, ensanchando cada `slug` a `string` de todas formas — verificado con un caso mínimo aislado (un slug inventado como `"nonsense"` compilaba sin error pese al `satisfies Service[]` ya vigente). El fix real: `as const` en cada `slug` individual (`"ascensores" as const`, etc.), NO en el objeto completo — así `images`/`features` del mismo objeto siguen siendo arrays mutables normales, sin arrastrar `readonly` a componentes que esperan `string[]` mutable. **Esto aplica también a `packagingCatalog.ts`/`techCatalog.ts` cuando les llegue su turno** — el punto 3 de "Deuda pendiente" de la Fase 1 (más abajo) queda corregido con este hallazgo.

Verificado explícitamente (quitando a propósito una entrada de `serviceSlugMap`): el build falla con `Property 'mantenimiento' is missing in type ... but required in type Record<ServiceSlug, string>` en vez de compilar en silencio.

**Slugs en inglés elegidos** (`serviceSlugMap` en `routes.ts`) — criterio: término del sector, no traducción literal:

| Slug ES | Slug EN | Nota |
|---|---|---|
| `ascensores` | `elevators` | — |
| `escaleras-mecanicas` | `escalators` | — |
| `tecnologia-y-telecomunicaciones` | `technology-and-telecommunications` | — |
| `envases` | `packaging` | Coincide con el slug de ruta de detalle; no colisiona con `routes.packaging` (`/en/packaging`) porque vive bajo `/en/services/` |
| `construccion` | `construction` | — |
| `recipientes-gas-licuado` | `lpg-containers` | Aprobado por el dueño del proyecto — LPG es la sigla estándar del sector, el término por el que buscaría un comprador internacional |
| `mantenimiento` | `maintenance` | — |
| `compras-internacionales` | `international-procurement` | Aprobado por el dueño del proyecto |

**Inconsistencia título/slug de "Compras Internacionales" — resuelta.** El slug `international-procurement` quedó aprobado junto con el título traducido, que decía "International Purchasing" desde una fase anterior. Se corrigió el título a **"International Procurement"** y la única otra ocurrencia de "purchasing" en el contenido en inglés de este servicio (`fullDescription`, primer párrafo: "international purchasing service" → "international procurement service") — 2 ocurrencias en total, ambas en `services.ts`. Verificado por grep que "purchasing" ya no aparece en ningún archivo de `src/`.

**Mecanismo de hreflang/selector para slugs traducidos:** `Hreflang.astro`, `LanguageSwitcher.astro`, `Navbar.astro` y `Layout.astro` ganan una vía alternativa a la `RouteKey` fija — un par `{es,en}` explícito (`dynamicHreflang` en `Layout`, propagado como `urls`/`entry`/`switcherEntry` respectivamente). Necesaria porque las 8 páginas de detalle no comparten una sola `RouteKey`: cada una tiene su propio par, calculado por `getServiceDetailUrls(esSlug)` — nunca derivando el slug hermano quitando/poniendo el prefijo `/en/` a mano, por indicación explícita de la tarea. El resto del sitio sigue usando solo `routeKey`, sin cambios.

`astro.config.mjs` (`serialize()` del sitemap) se generalizó: en vez de `findRouteKeyForPath` + `getTranslatedEntry(routeKey)` (solo RouteKeys fijas), ahora usa `getAllTranslatedPairs()` — RouteKeys fijas + los 8 pares de servicios, con un único mecanismo de búsqueda de pares `{es,en}` por pathname.

**`routes.packaging` gana `en: "/en/packaging"` — traducción unidireccional, a propósito.** `/envases/index.astro` no pasa `routeKey`, así que sigue sin mostrar selector ni hreflang aunque la entrada ya tenga `en` — la única función de ese `en` es darle a `/en/packaging` un destino al que apuntar su propio selector/hreflang. Verificado con grep sobre `dist/`: `envases/index.html` y sus rutas de detalle (`envases/[categoria]`, `envases/producto/[producto]`) siguen sin ningún `<link rel="canonical">`/`<link rel="alternate">`.

**Decisión del dueño del proyecto — CTA a la Store y al catálogo de envases en las páginas en inglés.** Ninguno de los dos se oculta: el CTA se mantiene (`/store` y `/envases` respectivamente, ambos sin traducir), acompañado de una nota discreta en inglés (`<p class="text-xs text-gray-500">`, no un bloque de advertencia) indicando que ese destino sigue solo en español. Texto en diccionario (`services.detail.storeSpanishOnlyNote` / `catalogSpanishOnlyNote`), reutilizado tal cual en ambos casos. **El CTA de catálogo en `/en/services/packaging` queda confirmado como enlace directo a `/envases`** (no a `/en/packaging`): el aviso intermedio tiene sentido para quien navega buscando el catálogo sin haber elegido idioma todavía, no para quien ya pulsó un botón que dice "View full catalog".

**Efecto en cascada — CTAs de la home que enlazaban a una ficha de servicio.** `Hero.astro` (slides de ascensores/envases/tecnología) y `Services.astro` (carrusel de servicios) construían el href con un slug fijo idéntico en ambos idiomas (`/servicios/ascensores` incluso en la versión en inglés de la home) — no era un bug hasta ahora, porque no existía nada mejor a lo que enlazar. Corregido: ambos resuelven el par `{es,en}` vía `getServiceDetailUrls` y toman el lado que corresponde al locale activo. `ServicesCarousel.tsx` (isla React) pasa a recibir el `href` ya resuelto en vez de un `slug` crudo — sigue sin saber nada de locales, mismo patrón que el resto de las islas.

**Verificación ejecutada:**
- `npm run build` → **0 errores**, **365 páginas** (355 + 10: `/en/services`, 8 detalles, `/en/packaging`). La tarea estimaba +11 — el aviso del catálogo (punto 5 de la tarea) **es** `/en/packaging`, no una página aparte, así que el conteo correcto es +10.
- Canonical + hreflang verificados por grep en `dist/en/services/elevators/index.html` y `dist/en/services/packaging/index.html`: ambos con `canonical` propio, `hreflang="es"` apuntando al slug español correcto (`/servicios/ascensores`, `/servicios/envases`), `hreflang="en"` y `hreflang="x-default"` apuntando al español.
- Confirmado en navegador: desde `/en/services/elevators`, el selector ES lleva a `/servicios/ascensores` (no a `/servicios` ni a `/en/services`).
- Las 8 páginas de detalle en inglés existen, ninguna da 404 (`dist/en/services/{elevators,escalators,technology-and-telecommunications,packaging,construction,lpg-containers,maintenance,international-procurement}/index.html`, todas presentes).
- `/envases` y sus rutas de detalle siguen sin hreflang ni selector (grep sin coincidencias).
- Grep sobre las 10 páginas nuevas en inglés buscando frases en español conocidas (CTAs, títulos, avisos) — sin coincidencias.
- Verificado en navegador que los subproductos de `/en/services/elevators` se muestran en inglés correctamente (ya estaban traducidos desde la Fase 1c/post-1c) — no se retradujeron.
- Regresión: home en español (`/`) sigue enlazando a `/servicios/ascensores`, `/servicios/envases`, `/servicios/tecnologia-y-telecomunicaciones` — sin cambios.

**Deuda técnica — CTA "Descargar catálogo (PDF)" apunta a `href="#"` en ambos idiomas.** En `/servicios/envases` y su contraparte `/en/services/packaging`, el botón de descarga del catálogo en PDF es un placeholder roto desde antes de esta fase (nunca se implementó, no se introdujo ni se corrigió en ninguna de las tareas de i18n). El dueño del proyecto va a montar los PDF próximamente. Hasta entonces es un enlace roto visible también para clientes internacionales, no solo en la versión española.

**La Store (`/store/*`) sigue sin traducir — decisión explícita, no un olvido.** Se traducirá solo si la empresa se expande a mercados donde el inglés sea necesario para vender (hoy el negocio es 100% hispanohablante); si ese día llega, sus propios slugs de categoría/producto (hoy en español, ej. `/store/ciberseguridad`) también se traducirían con el mismo criterio de esta fase (término del sector, no traducción literal) — no es un trabajo trivial de "agregar `en`", es un slug-map completo como el de `services.ts`.

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
│   ├── services.ts                — catálogo de 7 servicios corporativos (ver sección 6; era 8, ver "Limpieza estructural" más abajo)
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
