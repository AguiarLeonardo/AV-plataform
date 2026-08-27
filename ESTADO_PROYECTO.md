# Estado del Proyecto — Asiaven B2B

*Documento de handoff para continuar en una nueva sesión / sincronizar contexto con otros asistentes. Regla de oro: actualizar este archivo al final de cada tarea completada con éxito.*

---

## 🔄 Sincronización de Sesión (última actualización — cierre por límite de contexto)

### Rama Actual
`develop` y `main` sincronizadas (commit más reciente en `develop`: `5f70fd5` "feat(ui): integrar video corporativo en la landing page con control de audio"; `main` tiene ese mismo contenido más 1 commit extra de imagen, `b5918cc`). Working tree limpio.

Estrategia de ramas activa (**Git Flow formalizado**): todo desarrollo nuevo nace de una rama dedicada `feat/...` o `fix/...` creada desde `develop` sincronizado — **prohibido commitear directo a `main`/`develop`**. El flujo normal es rama → build OK → commit → push → PR → merge a `main`. `staging` (conectada al despliegue de Vercel) suele quedar varios commits atrás; hacer fast-forward manual cuando se decida publicar.

### ⚠️ Incidente resuelto: fallo de despliegue en Vercel (lectura obligatoria si vuelve a pasar)
Vercel falló repetidamente con `Unable to unpack repo: there was at least one filename that was too long`, incluso tras recrear el proyecto de Vercel y migrar a un repositorio de GitHub completamente nuevo. **Causa raíz real**: `CLAUDE.md` había quedado trackeado en git con modo `120000` (symlink) en vez de `100644` (archivo regular) — arrastrado desde una sesión donde se reemplazó el contenido de un symlink roto (`CLAUDE.md → AGENTS.md`) sin corregir el bit de modo. En Windows (`core.symlinks=false`) esto pasaba desapercibido (git nunca crea symlinks reales ahí); en el build machine Linux de Vercel, git sí intentaba crear un symlink real usando ~1400 bytes de markdown como "destino", lo cual disparaba el error. **Fix**: `git rm --cached CLAUDE.md && git add CLAUDE.md` (re-trackea con el modo correcto). **Lección**: si un error de "unpack"/"filename too long" reaparece, verificar primero `git ls-tree -r HEAD | awk '$1=="120000"'` (busca symlinks mal registrados) antes de sospechar del historial o de Vercel.

Como parte de ese incidente también se hizo un **saneamiento completo del historial de git** (`filter-branch` + force-push en todas las ramas) para eliminar trailers `Co-Authored-By: Claude` de commits antiguos, por política de IP del cliente. Esto llevó a establecer la regla permanente en `CLAUDE.md` (sección "⚠️ REGLA ESTRICTA DE PROPIEDAD INTELECTUAL"): **cero firmas de IA** en código, comentarios o commits, siempre.

### Arquitectura del Navbar de la Tienda (`StoreNavigation.tsx`)
5 disparadores raíz — **Productos**, **Soluciones Empresariales**, **Equipo a Medida**, **Recipientes**, **Soporte Técnico** — todos `<button type="button">` sin `href`, solo abren/cierran su mega menú. Estados de React (se cierran entre sí al abrir cualquiera):
- `hoverIndex: number | null` — Productos/Soluciones Empresariales (data-driven desde `storeCategories`).
- `btoOpen: boolean` — Equipo a Medida (`btoItems`, array local).
- `recipientesOpen: boolean` — Recipientes (`recipientesGroups`, array local; ver sección 2).
- `supportOpen: boolean` — Soporte Técnico (`supportGroups`, array local).

Dentro del mega menú de Productos/Soluciones, los "Grupos" son `<span>` no clicables; solo los "Ítems" son `<a href>`. Soporte y Recipientes usan la **misma estructura DOM/clases** (Grupo → Ítem) que Productos. Equipo a Medida es un grid horizontal de 4 tarjetas sin agrupar. Móvil: acordeón vertical en flujo normal (`mobileExpanded: string | null`), mismo patrón para las 5 secciones.

### Funcionalidades Completadas (histórico consolidado, más reciente primero)

**Sección de Video Corporativo + Rediseño de Divisiones (Landing corporativa)**
- **`CorporateVideo.astro`** (nuevo, `src/components/sections/`): montado en `index.astro` justo debajo de `<StatsStrip />`. Contenedor `max-w-7xl mx-auto px-4`, `rounded-2xl/3xl shadow-2xl overflow-hidden`, video en `aspect-video object-cover`. `<video autoplay muted loop playsinline preload="metadata">` con doble `<source>` (`/videos/video-corporativo.webm` + `.mp4`, **archivos reales ya subidos por el cliente**) y mensaje de fallback. Botón flotante inferior-derecho para mute/unmute (`VolumeX`/`Volume2` de lucide-react, toggle vía `<script>` vanilla que sincroniza `aria-pressed`).
- **`Affiliates.astro` rediseñado**: ahora **4 divisiones** con nombres comerciales reales — *AV Constructora*, *AV Elevators*, *AV Maquinarias Pesadas*, *AV Tecnología* (imágenes 1:1 en `public/images/corporativo/afiliadas/`: `division-infraestructura`, `division-movilidad-vertical`, `division-maquinaria`, `division-tecnologia`, todas `.webp`). Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`, tarjetas `h-80 sm:h-96` con efecto hover: la foto + overlay oscuro se desvanecen (`group-hover:opacity-0`) revelando un fondo sólido `bg-corporativo-gray`; el bloque de texto está `absolute inset-0 flex flex-col justify-end` con la descripción en `max-h-0 opacity-0 → group-hover:max-h-40 group-hover:opacity-100` (el título "sube" visualmente al abrirse espacio para la descripción, sin necesidad de animar `justify-content`, que no es animable en CSS). Sin íconos de marca por tarjeta (se removieron en una sesión previa).

**Sincronización de Sedes y Footer Corporativo**
- **`Footer.astro`** (corporativo): reemplazados todos los acentos `corporativo-blue` por blancos/grises (`hover:border-white`, `text-gray-300`) para mejor contraste sobre el fondo oscuro. Columna "Contacto" ahora es un array `offices` con 2 sedes — **Oficina en Venezuela** (datos originales) y **Oficina en Estados Unidos** (nueva: Miami, `ventas@asiaven.com`). Redes sociales con URLs reales: LinkedIn, Instagram, TikTok (nuevo), Facebook (nuevo, ícono SVG en el mismo estilo de línea genérica); **Twitter/X retirado** (no había handle real, se decidió no dejar un `href="#"` muerto).
- **`contactanos.astro`** sincronizado con las mismas 2 sedes (mismo patrón `offices`), apiladas verticalmente (`flex flex-col gap-10`) — Venezuela arriba, EE. UU. debajo.
- Nota importante: `Footer.astro` (corporativo) y `StoreFooter.astro` (Tienda) son **archivos completamente separados** desde hace varias sesiones — no hay ya ningún footer "adaptativo" único (ver sección 1).

**Navegación Cruzada Store ↔ Corporativo**
- **`StoreHeroSlider.tsx`**: enlace fijo `"← Volver al sitio corporativo"` (`ChevronLeft` + texto, `absolute top-4 left-4 z-50`, blanco → azul en hover) visible sobre todos los slides, apunta a `/`.
- **Envases embebidos en la Tienda**: nueva ruta unificada `src/pages/store/envases/[slug].astro` — un solo `getStaticPaths` cubre tanto los 5 slugs de categoría (hub, replica `[categoria].astro` corporativo) como los 62 slugs de producto individual (ficha con specs + CTA), gracias a que ambos namespaces de slug no colisionan. El CTA "Solicitar Cotización" en `src/pages/envases/producto/[producto].astro` (corporativo) ahora dice **"Ver producto en la tienda"** y enlaza a `/store/envases/${slug}` — puente explícito de compra hacia la Tienda.
- **Categoría "Recipientes"** en `StoreNavigation.tsx`: grupo "Envases de Aluminio" (5 ítems → `/store/envases/*`) + "Recipientes de Gas Licuado" (ítem único → nueva página `/store/recipientes/gas-licuado.astro`, patrón "cotización a medida" + CTA a `/store/soporte/contacto-ventas`).
- **`soporte-tecnico.astro`** (corporativo): botón "Descargar Drivers" → **"Ver drivers"**, `href="#"` → `/store/soporte/descargas` (ruta real ya existente).
- **`ClientLogosCarousel.tsx`** (corporativo, logos de clientes): convertido de carrusel con botones de scroll a **marquee CSS infinito** — fila de logos duplicada (`[...clients, ...clients]`), animación `animate-marquee` (definida en `global.css` vía `@theme` → `--animate-marquee: marquee 40s linear infinite` + `@keyframes marquee` de `0` a `-50%`, patrón idiomático de Tailwind v4 CSS-first). Pausa en hover, respeta `prefers-reduced-motion`. Se eliminó el logo `telecomunicaciones-asiaven` (imagen inexistente, dejaba hueco visual) — quedan 17 logos.

**Migración de Imágenes a WebP y Estructura de Assets**
- Estructura de carpetas creada en `public/images/{corporativo,envases,logos}/...` con inventario de nombres kebab-case entregado al cliente.
- Todas las referencias de imagen del sitio corporativo (Hero, banners de página, Nosotros, Misión/Visión, Afiliadas, sliders de servicios, logos de clientes) y de Envases (categorías) migradas de Unsplash/placehold.co a rutas locales reales (`/images/...`), y luego de `.jpg`/`.png` a `.webp` en un segundo pase cuando el cliente optimizó los archivos. `packagingCatalog.ts`: cada una de las 5 categorías tiene ahora su propia foto distintiva (antes solo 3 fotos de Unsplash se reciclaban entre 5 categorías).
- Fallbacks visuales (`bg-gray-200`/`bg-gray-100` + `onerror`/`onError` que oculta el `<img>` roto) añadidos donde alguna imagen podía faltar temporalmente.
- El ecosistema **Store** (`techCatalog.ts`, PDP, tarjetas de producto) permanece 100% en placeholders de Unsplash — la migración a assets reales fue exclusiva del sitio corporativo y de Envases.

**Consolidación de Catálogo, Soporte VIP y Limpieza Técnica**
- **Layout del Catálogo** (`store/[categoria].astro`): sidebar de filtros real (`CatalogFilters.tsx`) con acordeones de Disponibilidad, Precio, Línea de Producto y Especificaciones — `lg:sticky lg:top-24` en escritorio, drawer off-canvas en móvil. Grilla de productos en `lg:col-span-3`. `StoreProductCard.astro` con hover B2B estricto (solo sombra, sin `scale`/`translate`) e imagen envuelta en `<a>` hacia la PDP.
- **Página "Soporte Técnico VIP"** (`/store/soporte/informacion`) y **"Asesoría de Compra"** (`/store/soporte/asesoria-compra`, con CTA de WhatsApp) — ambas enlazadas desde el grupo "Recursos de Ayuda"/"Asistencia Directa" del mega menú de Soporte.
- **DRY en formularios de Soporte**: lógica vanilla compartida (validación + toggle B2B/B2C) extraída a `src/utils/formSupport.ts` (`initSupportForm()`).
- Componente huérfano `src/components/ui/CategoryCard.astro` eliminado (sin ninguna referencia en el proyecto).

**Auditoría y Optimización Móvil (Responsive, `< 768px`)**
- **Navbar**: menú hamburguesa (`md:hidden`) con acordeón vertical en flujo normal del documento (no absoluto). Bug de estado activo corregido: `categoryIndex: number | null` (antes el fallback `0` marcaba "Productos" en negrita en cualquier página no reconocida).
- **PDP**: Buy Box `flex flex-col md:grid md:grid-cols-2` (galería primero en móvil), miniaturas con scroll táctil `snap-x`, flechas del carrusel "Recomendados" ocultas en móvil (`hidden md:flex`, swipe nativo).
- **BTOForm y formularios de Soporte**: grids a `grid-cols-1 md:grid-cols-2`, banner de precio fijo endurecido (`fixed inset-x-0 bottom-0 z-40`, sombra superior), `pb-32` en el form.

**Formularios Híbridos B2C/B2B**
Todo formulario con campo "Empresa" es personal por defecto (toggle sutil "¿Compras para una empresa?"). React (`BTOForm.tsx`, `QuoteRequestForm.tsx`): estado `isBusiness`, campo condicional desmontado del DOM. Vanilla (`ticket.astro`, `contacto-ventas.astro`): clase `.business-fields.hidden` + `initSupportForm()`.

**Mega Menú de Soporte y Equipo a Medida (BTO)**
- Soporte: **Recursos de Ayuda** (Software y Drivers, Garantía, FAQ, Soporte VIP) + **Asistencia Directa** (Ticket, Contactar a Ventas, Asesoría de Compra).
- Equipo a Medida: grid de 4 tarjetas (Laptops, Desktops, Workstations, Servidores) → `BTOForm.tsx` (`BTOFormBase` + 3 variantes: Laptop $600, Server $2,500, Desktop $500), precio en tiempo real.

**Rediseño PDP, Carrito de Cotización, Búsqueda, Catálogo**
- `store/producto/[slug].astro` estilo Lenovo/HP: breadcrumbs, Buy Box, galería interactiva, Specs Grid, "Recomendados para ti", "La Promesa Asiaven".
- Carrito B2B: `src/store/quoteCart.ts` (localStorage + `CustomEvent`), `/store/cotizacion` (`QuoteCartList.tsx` + `QuoteRequestForm.tsx`).
- Buscador funcional (`/store/busqueda`), ordenamiento real (`CatalogControls.astro`).
- Catálogo `techCatalog.ts`: 126 productos placeholder, 42/42 subcategorías cubiertas.

**Sitio Corporativo (histórico)**
- Fix de hidratación `ServiceSlider`/`ProductFeatureSlider` (`client:load`). `/envases` migrado a taxonomía de 3 niveles real (`catalogo_latas_asiaven.md`).

### Bugs Conocidos / Pendientes de Revisión (limpio — solo lo que sigue vigente)
- **PDP de la Store**: miniaturas de galería, reseñas y "precio original" tachado son **datos simulados**. Catálogo `techCatalog.ts` (126 productos) sigue siendo placeholder — el ecosistema Store **no** recibió la migración a imágenes reales/WebP (esa migración fue solo para sitio corporativo + Envases).
- **Carrito de cotización 100% front-end**: sin backend, envío de formularios simulado (no llega correo real).
- **`CatalogFilters.tsx`**: UI de filtros completamente interactiva pero **sin lógica de filtrado real** — `techCatalog.ts` no tiene campos estructurados de línea/RAM/almacenamiento para cruzar.
- **`lucide-react` v1.24.0** no incluye íconos de marca — Facebook/LinkedIn/Instagram/TikTok en `Footer.astro` usan SVGs custom.
- Precios en toda la Store son **ficticios**. Catálogo de 126 productos sigue siendo placeholder.
- Páginas legales/de soporte/BTO usan texto boilerplate genérico — pendiente aprobación final del cliente.
- `href="#"` restantes: carrusel de `Affiliates.astro` (el enlace de cada tarjeta, no las imágenes), botón "Descargar catálogo (PDF)" en `/servicios/[servicio]` (envases), botones de descarga individual en `store/soporte/descargas.astro`.
- **Confirmar despliegue en `staging`**: sigue detrás de `develop`/`main`, sin fast-forward reciente.

### Siguientes Pasos
*(pendiente de definir con el cliente en la próxima sesión)*

---

## 1. Estructura del Proyecto (Layouts)

Dos ecosistemas visualmente independientes, cada uno con su propio layout raíz **y su propio Footer** (ya no hay un Footer único adaptativo):

### `src/layouts/Layout.astro` — Sitio corporativo
- `<Navbar />` + `<slot />` + **`<Footer />`** (`src/components/sections/Footer.astro`, 100% corporativo — ver sección 3) + `<WhatsAppButton />`.
- Usado por: `/`, `/servicios`, `/servicios/[servicio]`, `/proyectos`, `/contactanos`, `/soporte-tecnico`, `/envases`, `/envases/[categoria]`, `/envases/producto/[producto]`, `/privacidad`, `/terminos`.

### `src/layouts/StoreLayout.astro` — Ecosistema Store
- HTML standalone, **sin** `<Navbar />` corporativo (usa `StoreNavigation.tsx`). Incluye **`<StoreFooter />`** (`src/components/store/StoreFooter.astro`, 100% Tienda).
- Usado por toda la sección `/store/*`.

**Regla de aislamiento (auditada)**: cada footer tiene exactamente **un** enlace puente hacia el otro ecosistema — `Footer.astro` → "AV Store" → `/store`; `StoreFooter.astro` → "Sitio Corporativo Asiaven" → `/`. Ningún otro enlace cruza. La única excepción deliberada son los CTAs de cotización de Envases (`/store/envases/*`, ver sección 2) y el enlace de vuelta del Hero de la Tienda.

**Paleta de colores** (`src/styles/global.css`, `@theme`): `--color-corporativo-blue: #1E3A8A`, `--color-corporativo-gray: #4A5056`, `--animate-marquee` (carrusel de logos infinito, ver sección 3).

---

## 2. Estado de la Tienda (`/store`)

### Rutas completas
- **`/store`** — Landing: `StoreHeroSlider` (con enlace de vuelta al corporativo) + 3 bandas de vitrina + Trust Badges.
- **`/store/[categoria]`** — Ruta dinámica de 3 niveles de taxonomía, con `CatalogFilters.tsx` (sidebar/drawer) + grilla `StoreProductCard`.
- **`/store/producto/[slug]`** — PDP.
- **`/store/envases/[slug]`** — **Nuevo**: catálogo de Envases embebido en la Tienda (5 categorías + 62 productos individuales, un solo archivo con `getStaticPaths` dual). No participa del sidebar de filtros ni del catálogo general.
- **`/store/recipientes/gas-licuado`** — **Nuevo**: página "cotización a medida" para Recipientes de Gas Licuado.
- **`/store/busqueda`**, **`/store/cotizacion`**, **`/store/garantia`**, **`/store/envios`**.
- **`/store/soporte/{descargas,faq,ticket,contacto-ventas,informacion,asesoria-compra}`**.
- **`/store/medida/{laptops,desktops,workstations,servidores}`** — BTO.

### `StoreNavigation.tsx` — Navbar + 5 Mega-menús + Sub-navbar
Ver "Arquitectura del Navbar" al inicio del documento. Productos/Soluciones son data-driven (`storeTaxonomy.ts`); Equipo a Medida, Recipientes y Soporte son arrays locales dentro del propio componente.

### Fuente de la taxonomía: `src/data/storeTaxonomy.ts`
Árbol de 3 niveles, 42 ítems, tomado de `categorias_productos_asiaven.md`. Helpers: `resolveRealSlug()`, `productsForItem/Group/Category()`, `hrefForRealSubcategory()`, `findTaxonomyPath()`.

### Catálogo `techCatalog.ts` — 126 productos placeholder, 42/42 subcategorías
Sin cambios — **no** recibió la migración a imágenes reales (sigue en Unsplash).

### Componentes de la Store
`StoreProductCard.astro`, `StoreShowcaseCard.astro`, `StoreHeroSlider.tsx`, `CatalogControls.astro`, `CatalogFilters.tsx` (sin filtrado real), `SearchResultCard.tsx`, `BTOForm.tsx`, `QuoteCartList.tsx`/`QuoteRequestForm.tsx`, `StoreFooter.astro`.

### `src/store/quoteCart.ts` y `src/utils/fakePrice.ts`
Sin cambios respecto a la versión anterior de este documento.

---

## 3. Estado de la Web Corporativa (Asiaven)

### Landing (`src/pages/index.astro`)
Orden de secciones: `Hero` → `StatsStrip` → **`CorporateVideo`** (nuevo) → `Services` → `About` → `MissionVision` → **`Affiliates`** (rediseñado, 4 divisiones con hover, ver arriba).

### Navbar (`src/components/sections/Navbar.astro`)
Inicio, Nosotros, Proyectos, Servicios, Tienda, Contáctanos. Sin cambios.

### Footer (`src/components/sections/Footer.astro`) — 100% corporativo
Ver detalle completo arriba ("Sincronización de Sedes y Footer Corporativo"). Columnas: Marca+Redes, Enlaces Rápidos (+ puente "AV Store"), Contacto (2 sedes), Legal.

### `contactanos.astro`
Sincronizado con las 2 sedes del Footer, apiladas verticalmente.

### Portafolio de Proyectos, `/servicios/[servicio].astro`, `/privacidad`, `/terminos`
Sin cambios respecto a la versión anterior de este documento.

---

## 4. Gaps / Tareas Pendientes (Roadmap)

1. **Sin precios reales** en la Store (`fakePrice.ts` + constantes de `BTOForm.tsx`).
2. **Catálogo Store 100% placeholder** (126 productos "AV") — incluye imágenes, que a diferencia del sitio corporativo **no** se migraron a assets reales/WebP.
3. **`CatalogFilters.tsx`**: interacción completa, sin lógica de filtrado real.
4. **`/envases`**: taxonomía completa (5/11/62), ahora también embebida en `/store/envases/*`. Sin gaps conocidos de datos.
5. **PDFs/descargas reales pendientes**: catálogo de envases (`/servicios/[servicio]`), drivers individuales (`store/soporte/descargas.astro`).
6. **Contraste de datos entre `services.ts` y `techCatalog.ts`**: mantener sincronizados manualmente.
7. **`lucide-react` v1.24.0** sin íconos de marca — Footer usa SVGs custom (LinkedIn/Instagram/TikTok/Facebook).
8. **Backend de formularios**: todo simula envío con `alert`/mensaje local — falta email/CRM real.
9. **`staging`** desactualizada frente a `develop`/`main` — hacer fast-forward antes de depender de ese entorno para QA.

---

## Archivos de referencia (fuente, no código)
- `categorias_productos_asiaven.md` — taxonomía de navegación de la Store. Releer antes de tocar `storeTaxonomy.ts`.
- `catalogo_latas_asiaven.md` — specs reales del catálogo de envases (`packagingCatalog.ts`).
- `INVENTARIO_IMAGENES.md` — checklist de imágenes (mayormente resuelto para sitio corporativo/Envases; Store sigue pendiente).
- `CLAUDE.md` — instrucciones del asistente + **regla estricta de IP** (leer siempre antes de commitear).
- `CONVENCIONES.md` — arquitectura, stack, reglas de negocio y de UI/UX del sitio corporativo.
