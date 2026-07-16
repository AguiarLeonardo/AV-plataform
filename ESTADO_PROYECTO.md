# Estado del Proyecto — Asiaven B2B

*Documento de handoff para continuar en una nueva sesión. Última actualización: sincronización final antes de cierre de contexto — cubre el rediseño editorial de `[servicio].astro`, el fix de flexbox de los botones de Tecnología, y los 6 proyectos definitivos del portafolio.*

---

## 1. Estructura del Proyecto (Layouts)

El sitio tiene **dos ecosistemas visualmente independientes**, cada uno con su propio layout raíz:

### `src/layouts/Layout.astro` — Sitio corporativo
- Incluye `<Navbar />` (sticky, `bg-corporativo-gray`) + `<slot />` dentro de `<main>` + `<Footer />` + `<WhatsAppButton />` (SVG nativo, flotante).
- Meta description corporativa, favicon, `bg-white text-corporativo-gray`.
- Usado por **todas** las páginas corporativas: `/`, `/servicios`, `/servicios/[servicio]`, `/proyectos`, `/contactanos`, `/soporte-tecnico`, `/envases`, `/envases/producto/[producto]`.
- Nota histórica: Navbar/Footer estaban duplicados en cada página hasta que se centralizaron aquí (refactor DRY). Ninguna página corporativa debe volver a importar `Navbar`/`Footer` directamente.

### `src/layouts/StoreLayout.astro` — Ecosistema Store
- HTML **standalone**, propio `<head>` (meta description distinta, orientada a e-commerce B2B).
- `bg-white text-gray-900`, **sin** `<Navbar />`/`<Footer />` corporativo — la Store tiene su propia navegación (`StoreNavigation.tsx`, ver sección 2).
- Usado por: `/store`, `/store/[categoria]`, `/store/producto/[slug]`.
- Decisión deliberada del cliente: separar completamente la identidad visual/UX de la tienda del sitio corporativo (paleta neutra minimalista vs. la paleta corporativa gris/azul).

**Paleta de colores** (definida en `src/styles/global.css` vía `@theme`):
- `--color-corporativo-blue: #1E3A8A` — azul corporativo, acentos y CTAs en todo el sitio.
- `--color-corporativo-gray: #4A5056` — texto principal del sitio corporativo, Navbar/Footer.
- La Store usa `gray-900`/`gray-700`/`gray-50` como base neutra + `corporativo-blue` como acento puntual (logo, focus states, botón primario).

---

## 2. Estado de la Tienda (`/store`)

### Rutas
- **`/store`** — Hub: catálogo completo (32 productos de `techCatalog.ts`) + `StoreNavigation` + `CatalogControls`, grid de `StoreProductCard`.
- **`/store/[categoria]`** — Ruta dinámica **única** que sirve los 3 niveles de la taxonomía (mismo archivo, `getStaticPaths` genera entradas para Categoría, Grupo e Ítem indistintamente):
  - Nivel 1 (Categoría): `/store/productos`, `/store/soluciones-empresariales`.
  - Nivel 2 (Grupo): ej. `/store/equipos-de-computo`, `/store/infraestructura-y-redes`, `/store/inteligencia-artificial`.
  - Nivel 3 (Ítem): ej. `/store/laptops`, `/store/servidores`, `/store/ia`.
- **`/store/producto/[slug]`** — Ficha de producto individual (imagen grande + specs en lista + CTA "Solicitar Cotización" → `/contactanos`). El link "Volver a" resuelve la página de Ítem correcta vía `hrefForRealSubcategory()` (no asume el slug literal).

### `StoreNavigation.tsx` (React, `client:load`) — Navbar + Mega-menú + Sub-navbar
Un solo componente combinado porque Navbar y Sub-navbar comparten estado. **Hover y Click están desacoplados**:

- **Hover** sobre una categoría principal → abre un **mega-menú** (`absolute inset-x-0 top-full`, `shadow-lg`, grid de Grupos con sus Ítems debajo de cada título de grupo en negrita). El hover **no** toca el sub-navbar inferior.
- **Click** en categoría, grupo o ítem (en el navbar, o dentro del mega-menú) → navegación real (`<a href>`) a la página correspondiente, y además fija ese Grupo como "activo" visualmente antes de navegar.
- **Sub-navbar inferior** (franja `bg-gray-50`): muestra los ítems del Grupo activo. El Grupo activo se determina en cada carga de página a partir del prop `currentPath` (derivado de `Astro.url.pathname` en el servidor, **no** de estado de cliente volátil) — así el sub-navbar "recuerda" el grupo correcto incluso después de una navegación completa (recarga de página en la arquitectura MPA de Astro, donde el componente React se re-monta desde cero en cada page load).
- **Menú principal reducido a 3 pilares**: Productos, Soluciones Empresariales, Soporte Técnico (este último es un enlace directo a `/soporte-tecnico`, fuera del mega-menú, sin subnav propio). **"Inteligencia Artificial" ya no es categoría principal** — el cliente la reclasificó como Grupo dentro de "Soluciones Empresariales" (con "IA" como su único ítem). Este cambio se hizo en `storeTaxonomy.ts` únicamente; `StoreNavigation.tsx` no necesitó tocarse porque es 100% data-driven.

### Fuente única de la taxonomía: `src/data/storeTaxonomy.ts`
- Árbol de 3 niveles (`StoreCategory` → `StoreGroup` → `StoreItem`), construido con los helpers `makeCategory`/`makeGroup`/`makeItem`, tomado directamente de `categorias_productos_asiaven.md`.
- Consumido tanto por `StoreNavigation.tsx` como por `store/[categoria].astro` — **si hay que agregar/quitar una categoría, grupo o ítem, este es el único archivo a tocar**; el navbar, el mega-menú, el sub-navbar y las rutas se regeneran solos.
- `slugAliases`: mapa que conecta nombres del `.md` (que no siempre coinciden literalmente) con los `subcategorySlug` reales de `techCatalog.ts`. Ejemplos: `"centros-de-computo"` → `"centros-de-computos"`, `"reguladores-de-voltaje-y-ups"` → `"ups"`, `"aires-acondicionados-de-precision"` → `"aires-de-precision"`, `"desarrollo-de-software-y-aplicaciones"` → `"desarrollo-de-software"`, `"desarrollo-y-manejo-de-proyectos"` → `"gestion-de-proyectos"`.
- Helpers exportados: `resolveRealSlug(itemSlug)`, `productsForItem/Group/Category()`, `hrefForRealSubcategory(realSlug)`.

### Estrategia "Cotización a medida" (en `store/[categoria].astro`)
La taxonomía definitiva (`categorias_productos_asiaven.md`) tiene **~40 ítems**, pero `techCatalog.ts` solo tiene productos reales para **15** de ellos. En vez de generar rutas rotas (404) o esconder ítems del menú, **todas** las ~40 páginas de nivel Categoría/Grupo/Ítem se generan siempre (así el navbar/mega-menú nunca enlaza a nada roto), y cada página decide su contenido según si `products.length > 0`:
- **Con productos reales** → grid normal de `StoreProductCard` + `CatalogControls` con el contador correcto.
- **Sin productos reales** → bloque `"Cotización a medida"`: mensaje explicando que aún no hay modelos publicados para ese ítem/grupo/categoría, + botón "Solicitar Cotización" → `/contactanos`. Nunca se ve una grilla vacía ni un error.

### Componentes de la Store
- `StoreProductCard.astro` — tarjeta de producto: badge opcional (`"Nuevo"`/`"Promo"`), imagen, precio (**siempre `"Consultar"` por ahora** — `TechProduct` no tiene campo de precio real), specs (primeras 4 features), "Ver más" vía `<details>` nativo (sin JS), botones "Comprar" (placeholder `href="#"`) / "Saber más" (enlaza al detalle real vía prop `href`).
- `CatalogControls.astro` — barra "Mostrar Filtros" (placeholder, sin lógica de filtrado real aún) / contador de resultados / dropdown "Ordenar por" (opciones son placeholder, sin lógica de ordenamiento real). El dropdown usa **CSS scoped nativo de Astro** para la inversión de color al abrir, no el variant `group-open` de Tailwind — se probó y no pintaba de forma confiable en el navegador de pruebas de esta sesión (aunque el CSS generado era correcto), así que se optó por una solución `<style>` con selector `[open]` explícito, más robusta.

---

## 3. Estado de la Web Corporativa (Asiaven)

### Portafolio de Proyectos (`src/pages/proyectos/index.astro`)
Actualizado a los **6 proyectos definitivos** del cliente (reemplazando la lista placeholder anterior de 4). Diseño **sin cambios** (tarjetas tipográficas, sin fotos — regla de negocio de confidencialidad de clientes, ya establecida desde el inicio del proyecto):
1. Hotel Humboldt — Distrito Capital — Modernización / Mantenimiento
2. Asamblea Nacional — Distrito Capital — Proyectos de Elevación
3. Sede Principal Corpoelec San Bernardino — Caracas — Instalación de Escaleras Mecánicas
4. Metro de Caracas – Estación Colegio de Ingenieros — Caracas — Suministro e Instalación de 6 Escaleras Mecánicas
5. Hospital Pediátrico Dr. Elías Toro — Caracas — Instalación de 7 Ascensores de Alta Capacidad
6. Bolivariana de Puertos (Bolipuertos) — Venezuela — Mantenimiento Especializado de Ascensores

Grid `grid-cols-1 md:grid-cols-2` (sin `lg:grid-cols-3`) → con 6 ítems se ve como 3 filas de 2 columnas en desktop.

### Rediseño editorial de `src/pages/servicios/[servicio].astro`
Iteración final tras varias rondas de ajuste con el cliente:

- **Banner `PageHeader` eliminado por completo** (ya no se importa ni se usa) — ya no hay imagen de fondo con overlay oscuro sobre el título.
- **`<h1>` con el título del servicio** movido directamente al inicio de la columna de texto (dentro del `div.prose`, antes de los párrafos de `fullDescription`), clases `text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight`. Queda **alineado en paralelo con el borde superior de la imagen** del `ServiceSlider` (grid `items-start`, sin ningún `pt-*`/`mt-*` extra en el contenedor de texto — se probaron y se revirtieron un "centrado vertical" y un "respiro superior" antes de llegar a esta versión final, que el cliente prefirió).
- **Contenedor principal** (`<div class="max-w-7xl mx-auto ...">`) usa `pt-24 pb-16 md:pt-32 md:pb-24` para compensar la falta de banner y no chocar con el Navbar sticky.
- **Botones de "Tecnología y Telecomunicaciones"** ("Ir a la tienda" → `/store`, "Soporte Técnico" → `/soporte-tecnico`): ya **no** usan posicionamiento absoluto (`absolute bottom-0 right-0`) — ese approach causaba solapamientos cuando la columna de texto crecía. Solución final: ambos botones viven **dentro del flujo normal** en un único contenedor `<div class="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">` al final del bloque condicional — se apilan en móvil, quedan lado a lado en desktop, y nunca colisionan sin importar cuánto texto haya arriba. "Ir a la tienda" es botón primario sólido, "Soporte Técnico" es outline (mismo patrón visual que el bloque de "Envases", que también tiene 2 botones primario+outline).
- El bloque condicional por servicio sigue siendo un ternario anidado: `tecnologia-y-telecomunicaciones` → botones tienda+soporte · `envases` → botones catálogo+PDF · default → botón único "Solicitar Cotización" → `/contactanos`.
- Los `ProductFeatureSlider` de Ascensores/Escaleras Mecánicas (con sus datos inline `elevatorsData`/`escalatorsData` en el frontmatter) siguen debajo del grid 50/50, sin cambios.

---

## 4. Gaps / Tareas Pendientes (Roadmap)

1. **Catálogo de la Store incompleto**: de ~40 ítems en `categorias_productos_asiaven.md`, solo 15 tienen productos reales en `techCatalog.ts`. El resto muestra "Cotización a medida". Pendiente: cargar productos reales para Ultrabooks, Tabletas, Todo en Uno (AIO), Impresoras, Infraestructura, Almacenamiento, Radio enlaces, Bases, Redes inalámbricas y cableado, Tótems, Digital Signage, Pole Advertising, Videoconferencias, Teléfonos celulares, IA, y todo el árbol de "Soluciones Empresariales" (Diseño, Fabricación, Consultoría, Procura, Suministro, Cyberseguridad, Control de acceso y videovigilancia, Cursos y Talleres, Salas de eventos, Coworking, Metro-Hub) — hoy son servicios/verticales sin SKUs de producto asociados.
2. **Sin precios reales**: `TechProduct` no tiene campo `price`; todas las fichas muestran `"Consultar"`. Si se agregan precios reales, hay que tocar `techCatalog.ts` (agregar campo) y los 3 archivos que renderizan precio (`store/index.astro`, `store/[categoria].astro`, `store/producto/[slug].astro`, más `StoreProductCard.astro`).
3. **Botones "Comprar" son placeholders** (`href="#"`) — no hay carrito ni checkout implementado. Los íconos de carrito/perfil en `StoreNavigation.tsx` tampoco tienen funcionalidad, son solo visuales.
4. **`CatalogControls.astro`**: el botón "Mostrar Filtros" no despliega filtros reales (solo un mensaje placeholder), y "Ordenar por" no reordena la grilla — son solo UI de referencia.
5. **Barra de búsqueda** en `StoreNavigation.tsx` no tiene lógica de búsqueda conectada.
6. **`/envases`**: el cliente reestructuró `catalogo_latas_asiaven.md` a una taxonomía de **3 niveles** (Categoría > Subcategoría > Producto), lo que obligó a rediseñar la arquitectura (antes era de 2 niveles, hub de carruseles planos). Estado actual:
   - **`src/data/packagingCatalog.ts`**: `PackagingCategory` ahora tiene `subcategories: PackagingSubcategory[]` en vez de `products` directo. 5 categorías: `latas-tres-piezas` (subcategorías: alimentos-secos, bebidas, tanque-especial), `latas-de-aluminio` (tanque-estandar, tanque-de-fibra-delgado, lata-de-cuerpo-delgado), `botellas-de-aluminio`, `cubierta-de-aluminio` (cubierta-superior, cubierta-inferior), `tapas-giratorias` (modelos) — estas 2 últimas tienen una única subcategoría "contenedora" ya que el `.md` no las subdivide. Se agregó el helper `findProductBySlug()`.
   - **`/envases` (hub)**: rediseñado como **acordeón horizontal a pantalla completa** (`flex w-full h-[70vh] md:h-[80vh]`) — una franja por categoría (`flex-1 hover:flex-[3_3_0%]`), con título rotado 90° por defecto y, al hacer hover, se expande revelando descripción + lista de subcategorías + CTA "Ver Catálogo" hacia `/envases/[categoria]`.
   - **`/envases/[categoria]` (nueva ruta dinámica)**: reintroduce el nivel intermedio — aquí vive el patrón "estilo Netflix" original (una fila con carrusel horizontal de tarjetas por cada subcategoría de esa categoría).
   - **`/envases/producto/[producto]`**: el botón "Volver al Catálogo" ahora apunta a `/envases/${category.slug}` (no a `/envases`); se agregó un badge visual con el nombre de la subcategoría junto al de la categoría.
   - Sin gaps conocidos adicionales; imágenes siguen siendo placeholders Unsplash reciclados entre categorías (ver inventario de imágenes de sesión anterior).
7. **Botón "Descargar catálogo (PDF)"** en el servicio de "Envases" (`/servicios/envases`) es `href="#"` — no existe un PDF real todavía.
8. **Contraste de datos entre `services.ts` y `techCatalog.ts`**: son catálogos de dos líneas de negocio distintas (servicios corporativos vs. productos de tienda) — mantenerlos sincronizados manualmente si cambian los nombres de servicios/categorías.

---

## Archivos de referencia (fuente, no código)
- `categorias_productos_asiaven.md` — taxonomía definitiva de navegación de la Store (Categoría > Grupo > Ítem). El cliente la ha actualizado más de una vez (última vez: reclasificación de "Inteligencia Artificial"); **siempre releer este archivo antes de tocar `storeTaxonomy.ts`** por si hay cambios no sincronizados.
- `catalogo_latas_asiaven.md` — specs técnicas reales del catálogo de envases (`packagingCatalog.ts`).
