# Estado del Proyecto — Asiaven B2B

*Documento de handoff para continuar en una nueva sesión / sincronizar contexto con otros asistentes. Regla de oro: actualizar este archivo al final de cada tarea completada con éxito.*

---

## 🔄 Sincronización de Sesión (última actualización)

### Rama Actual
`develop` — checkout local al día con `origin/develop` **hasta el commit `3f7404a`**. Los cambios de esta sesión (motor de búsqueda/ordenamiento + carrito de cotización B2B) están hechos y validados localmente pero **aún sin commitear**.

Estrategia de ramas activa: `main` → `develop` → `staging` (esta última conecta el despliegue automático en Vercel).

### Hitos Completados (última sesión)
**Páginas Legales y de Soporte (nuevo)**
0i. **4 páginas de texto nuevas**, diseño "documento" limpio (`max-w-4xl mx-auto`, `space-y-*`, sin plugin typography): `/privacidad` y `/terminos` (`Layout.astro`, corporativo), `/store/garantia` y `/store/envios` (`StoreLayout.astro` + `StoreNavigation`, tienda). Todos los `href="#"` del Footer relacionados (Política de Privacidad, Términos y Condiciones/Servicio, Políticas de Garantía, Envíos) quedaron conectados a estas rutas reales.

**Tienda (`/store`) — Refinamientos de UI/UX**
0e. **Galería interactiva en la PDP**: imagen principal con `id="main-product-image"`, 4 miniaturas (`class="thumbnail-trigger"` + `data-image-src`) construidas combinando la foto real del producto con un pool de fotos tech de Unsplash rotadas por `product.id`. Script vanilla intercambia el `src` de la imagen principal al clic y mueve la clase de "borde activo" entre miniaturas.
0f. **Flechas de navegación en "Recomendados para ti"**: contenedor `id="recomendados-scroll"` envuelto en `relative group`, botones circulares blancos con sombra (visibles solo en hover) que hacen `scrollBy({left: ±300, behavior:"smooth"})`.
0g. **Más espacio bajo "La Promesa Asiaven"**: `pb-24` agregado a esa sección para separarla del Footer.
0h. **Footer de la Tienda con esquema claro**: `Footer.astro` ahora computa un objeto `theme` según `isStore` — la Tienda usa `bg-gray-50` con textos `text-gray-900`/`text-gray-600` y hovers `text-corporativo-blue`; el sitio corporativo conserva el esquema oscuro original (`bg-corporativo-gray`) sin cambios.

**Tienda (`/store`) — Rediseño de la Ficha de Producto / PDP**
0d. **`store/producto/[slug].astro` rediseñada por completo estilo Lenovo/HP**: `findTaxonomyPath()` (nuevo helper en `storeTaxonomy.ts`) traza las migas de pan `Inicio > Tienda > [Grupo] > [Ítem] > [Producto]`. **Buy Box** de 2 columnas: imagen grande + 4 miniaturas de galería (placeholder, misma imagen) a la izquierda; badge "Configurable", `<h1>`, 5 estrellas doradas + "(4.8) 24 reseñas" (estático), precio real + precio tachado 20% más alto + badge verde "Ahorra $X" (misma fórmula de `fakePrice.ts`), botón gigante "Agregar a Cotización" (conectado a `quoteCart.ts`, con feedback "¡Agregado!"), acciones secundarias "Comparar"/"Guardar" a la derecha. **Specs Grid**: cada `feature` (`"Etiqueta: Valor"`) se parsea y se renderiza en `grid-cols-2` con un ícono de `lucide-react` elegido por palabras clave (Cpu, MemoryStick, HardDrive, etc., con `Settings2` de respaldo). **Cross-selling**: carrusel horizontal con scroll nativo (`overflow-x-auto snap-x`, última tarjeta cortada por el borde) usando `StoreProductCard`, primero productos de la misma subcategoría exacta y, como el catálogo solo tiene 3 por subcategoría, se completa con productos de la misma categoría amplia hasta 5. **Promesa de Marca**: sección de cierre de 3 columnas (Soporte Técnico VIP, Garantía Extendida, Logística Segura) antes del Footer. Probado en navegador: breadcrumbs, specs grid (4 celdas), recomendados (5, con fallback), y el CTA agregando correctamente al carrito.

**Tienda (`/store`) — Carrito de Cotización B2B**
0. **Flujo de cotización funcional end-to-end**: los botones "Comprar" ahora son **"Agregar a Cotización"** en `StoreProductCard.astro` y `SearchResultCard.tsx`, con feedback visual "¡Agregado!" por 2s. Estado global del carrito en `src/store/quoteCart.ts` (localStorage + `CustomEvent("cart-updated")`, `@nanostores/react` no está instalado así que no se usó). El ícono de carrito en `StoreNavigation.tsx` ahora enlaza a `/store/cotizacion` y muestra un badge rojo con la cantidad de ítems, sincronizado en tiempo real vía el evento. Nueva página `/store/cotizacion.astro`: columna izquierda `QuoteCartList.tsx` (editar cantidad, eliminar ítems, total ficticio, estado vacío con CTA a la tienda) + columna derecha `QuoteRequestForm.tsx` (Nombre/Empresa/Correo/Teléfono/Mensaje). Al enviar: mensaje de éxito simulado, `clearCart()`, y redirección a `/store` tras 2.5s. **Probado end-to-end en navegador** (agregar, badge, eliminar, cambiar cantidad, submit, limpieza de carrito, redirección).

**Tienda (`/store`) — Búsqueda y Ordenamiento (nuevo)**
0b. **Buscador funcional**: el input de `StoreNavigation.tsx` está envuelto en un `<form>` que redirige a `/store/busqueda?q={término}`. Nueva página `/store/busqueda.astro` monta `SearchResults.tsx` (`client:load`) que lee `?q=` en runtime, filtra `techProducts` por título/categoría/descripción (case-insensitive) y renderiza con `SearchResultCard.tsx` (versión React de `StoreProductCard`, con su propio "Ver más/Ver menos" vía `useState`). Muestra mensaje de "sin resultados" si el filtro da vacío.
0c. **Ordenamiento real en `/store/[categoria]`**: `CatalogControls.astro` reemplazó el dropdown decorativo por un `<select id="sort-select">` (`price_asc`/`price_desc`/`name_asc`) con un `<script>` vanilla que reordena los hijos de `#product-grid` vía `.sort()` + `appendChild`. **Bug encontrado y corregido durante las pruebas**: Astro inyecta el `<script>` deduplicado de `StoreProductCard` como hijo literal de `#product-grid` (por invocarse dentro de un `.map()`), rompiendo el `.sort()` — se resolvió filtrando explícitamente por `.store-product-card` en vez de usar `grid.children`. Precio ficticio unificado en `src/utils/fakePrice.ts` (una sola fórmula, reutilizada por la vitrina y el ordenamiento).

**Tienda (`/store`) — sesión anterior**
1. **Catálogo poblado al 100%**: 126 productos placeholder (nomenclatura `"<Ítem> AV 1/2/3"`) inyectados en `techCatalog.ts`, 3 por cada una de las **42 subcategorías reales** de `storeTaxonomy.ts` (antes solo 15/42 tenían datos, el resto mostraba "Cotización a medida").
2. **`/store` rediseñada como landing comercial estilo HP/Lenovo**: `StoreHeroSlider` (3 slides promocionales con CTA "Explorar") + 3 bandas de vitrina (`StoreShowcaseCard`: Productos Destacados, Ofertas Especiales, Más Vendidos) con precio ficticio y badges.
3. **Sección de Propuesta de Valor / Trust Badges**: 4 columnas (Garantía Extendida, Configuración a Medida, Respaldo Directo, Asesoría Preventa Especializada).
4. **Barra secundaria de navegación** (`StoreNavigation.tsx`) oculta solo en la raíz `/store` (protagonismo total para la vitrina); sigue visible en `/store/[categoria]` y fichas de producto.
5. **Megamenú**: los "Grupos" (ej. "Equipos de Cómputo") dejaron de ser `<a>` navegables — ahora son encabezados estáticos (`<span>`); solo los "Ítems" (Laptops, Servidores, etc.) navegan.
6. **"Ver más / Ver menos" dinámico** en `StoreProductCard` — se eliminó el botón duplicado (quedaba un `<details>` estático conviviendo con el toggle nuevo).
7. **Enlace "Equipo a Medida"**: agregado, corregido de ubicación (se había colado en el navbar corporativo) y dejado **exclusivamente** en el navbar de la Store, justo antes de "Soporte Técnico".

**Sitio Corporativo**
8. Fix de hidratación: `ServiceSlider`/`ProductFeatureSlider` pasaron de `client:visible` a `client:load` (el primero podía quedarse colgado si la pestaña cargaba en segundo plano).
9. Fix de texto cortado en tarjetas móviles de Ascensores/Escaleras Mecánicas (scroll interno con `max-h` + `overflow-y-auto`).
10. Botón "Tienda" destacado (`bg-white text-corporativo-blue`) agregado al navbar corporativo, justo después de "Servicios".

**Transversal**
11. **Footer global adaptativo**: un solo componente (`Footer.astro`) que detecta el contexto vía `Astro.url.pathname.startsWith('/store')` y cambia columnas/contacto/copyright entre vista Corporativa y Tienda. Se agregó también a `StoreLayout.astro` (antes la Store no tenía footer).
12. `/envases` rediseñada a taxonomía de 3 niveles (acordeón + carruseles con flechas de navegación) — ver detalle en sección 4.
13. `INVENTARIO_IMAGENES.md` creado — checklist maestro de todas las imágenes placeholder a reemplazar en todo el sitio.

### Bugs Conocidos / Pendientes de Revisión
- **PDP**: las 4 miniaturas de galería, las "(4.8) 24 reseñas" y el "precio original" tachado son **datos simulados/estáticos** (no hay reseñas reales ni fotos adicionales por producto todavía) — construidos únicamente para armar la anatomía visual estilo Lenovo/HP que pidió el cliente.
- **Carrito de cotización es 100% front-end**: `quoteCart.ts` guarda en `localStorage` del navegador — no hay backend, no persiste entre dispositivos/navegadores, y se borra si el usuario limpia datos del sitio. El "envío" del formulario en `/store/cotizacion` es **simulado** (no llega ningún correo real a ventas@asiaven.com todavía) — falta conectar a un backend/servicio de email real.
- El carrito no distingue variantes ni valida stock — cualquier cantidad ≥1 es aceptada sin límite.
- **Confirmar despliegue**: los commits de esta sesión y la anterior están en el checkout local de `develop`; verificar que ya estén reflejados en `staging`/Vercel si el cliente lo está revisando ahí.
- **`lucide-react` instalado es v1.24.0**, una versión que **no incluye íconos de marca** (LinkedIn/Twitter/Instagram no existen como export). El Footer usa SVGs custom de línea como workaround — si se actualiza el paquete, revisar que no rompa el resto de íconos ya usados en el sitio.
- Precios en la vitrina de `/store` (Destacados/Ofertas/Más Vendidos) son **ficticios**, generados por fórmula a partir del `id` del producto — no son datos reales de catálogo.
- Catálogo de 126 productos "AV" sigue siendo **data provisional/placeholder** (nomenclatura genérica, no SKUs reales) — pendiente reemplazo cuando el cliente entregue el catálogo real con precios.
- Imágenes: 100% placeholders de Unsplash en todo el sitio (corporativo, Envases, Store) — ver `INVENTARIO_IMAGENES.md` para el checklist completo.
- Las 4 páginas legales/de soporte (`/privacidad`, `/terminos`, `/store/garantia`, `/store/envios`) usan texto boilerplate genérico — pendiente que legal/el cliente revise y apruebe el contenido final antes de considerarlas definitivas.

### Siguientes Pasos (Para hoy)
*(pendiente de definir con el cliente)*

---

## 1. Estructura del Proyecto (Layouts)

El sitio tiene **dos ecosistemas visualmente independientes**, cada uno con su propio layout raíz:

### `src/layouts/Layout.astro` — Sitio corporativo
- Incluye `<Navbar />` (sticky, `bg-corporativo-gray`) + `<slot />` dentro de `<main>` + `<Footer />` + `<WhatsAppButton />` (SVG nativo, flotante).
- Meta description corporativa, favicon, `bg-white text-corporativo-gray`.
- Usado por **todas** las páginas corporativas: `/`, `/servicios`, `/servicios/[servicio]`, `/proyectos`, `/contactanos`, `/soporte-tecnico`, `/envases`, `/envases/[categoria]`, `/envases/producto/[producto]`.
- Nota histórica: Navbar/Footer estaban duplicados en cada página hasta que se centralizaron aquí (refactor DRY). Ninguna página corporativa debe volver a importar `Navbar`/`Footer` directamente.

### `src/layouts/StoreLayout.astro` — Ecosistema Store
- HTML **standalone**, propio `<head>` (meta description distinta, orientada a e-commerce B2B).
- `bg-white text-gray-900`, **sin** `<Navbar />` corporativo — la Store tiene su propia navegación (`StoreNavigation.tsx`, ver sección 2). **Sí incluye** el `<Footer />` global (adaptativo, ver sección "Hitos" arriba).
- Usado por: `/store`, `/store/[categoria]`, `/store/producto/[slug]`.
- Decisión deliberada del cliente: separar completamente la identidad visual/UX de la tienda del sitio corporativo (paleta neutra minimalista vs. la paleta corporativa gris/azul).

**Paleta de colores** (definida en `src/styles/global.css` vía `@theme`):
- `--color-corporativo-blue: #1E3A8A` — azul corporativo, acentos y CTAs en todo el sitio.
- `--color-corporativo-gray: #4A5056` — texto principal del sitio corporativo, Navbar/Footer.
- La Store usa `gray-900`/`gray-700`/`gray-50` como base neutra + `corporativo-blue` como acento puntual (logo, focus states, botón primario).

---

## 2. Estado de la Tienda (`/store`)

### Rutas
- **`/store`** — Landing comercial: `StoreNavigation` (sin barra secundaria) + `StoreHeroSlider` + 3 bandas de vitrina (`StoreShowcaseCard`) + sección de Trust Badges. **Ya no muestra el catálogo completo** — el grid de 126 productos se eliminó de esta vista; los productos solo aparecen al navegar a un Ítem/Grupo/Categoría específico.
- **`/store/[categoria]`** — Ruta dinámica **única** que sirve los 3 niveles de la taxonomía (mismo archivo, `getStaticPaths` genera entradas para Categoría, Grupo e Ítem indistintamente):
  - Nivel 1 (Categoría): `/store/productos`, `/store/soluciones-empresariales`.
  - Nivel 2 (Grupo): ej. `/store/equipos-de-computo`, `/store/infraestructura-y-redes`, `/store/inteligencia-artificial`.
  - Nivel 3 (Ítem): ej. `/store/laptops`, `/store/servidores`, `/store/ia`.
- **`/store/producto/[slug]`** — Ficha de producto individual (imagen grande + specs en lista + CTA "Solicitar Cotización" → `/contactanos`). El link "Volver a" resuelve la página de Ítem correcta vía `hrefForRealSubcategory()` (no asume el slug literal).

### `StoreNavigation.tsx` (React, `client:load`) — Navbar + Mega-menú + Sub-navbar
Un solo componente combinado porque Navbar y Sub-navbar comparten estado. **Hover y Click están desacoplados**:

- **Hover** sobre una categoría principal → abre un **mega-menú** (`absolute inset-x-0 top-full`, `shadow-lg`, grid de Grupos con sus Ítems debajo). Los **Grupos ya no son clickeables** (son `<span>` estáticos, solo encabezan visualmente); únicamente los **Ítems** son `<a href>` navegables.
- **Click** en categoría o ítem → navegación real (`<a href>`), y además fija ese Grupo como "activo" antes de navegar.
- **Sub-navbar inferior** (franja `bg-gray-50`): muestra los ítems del Grupo activo. **Se oculta por completo cuando `currentPath` es `/store` o `/store/`** (para no competir con el Hero/vitrina); en el resto de páginas de la Store sigue visible, determinada por `currentPath` derivado de `Astro.url.pathname` en el servidor (no estado de cliente volátil).
- **Menú principal**: Productos, Soluciones Empresariales, **Equipo a Medida** (nuevo — enlace plano a `/contactanos`, posicionado antes de "Soporte Técnico"), Soporte Técnico. **"Inteligencia Artificial" ya no es categoría principal** — es Grupo dentro de "Soluciones Empresariales" (con "IA" como único ítem). Todo esto viene de `storeTaxonomy.ts`, 100% data-driven.

### Fuente única de la taxonomía: `src/data/storeTaxonomy.ts`
- Árbol de 3 niveles (`StoreCategory` → `StoreGroup` → `StoreItem`), construido con los helpers `makeCategory`/`makeGroup`/`makeItem`, tomado directamente de `categorias_productos_asiaven.md`. **42 ítems en total.**
- Consumido tanto por `StoreNavigation.tsx` como por `store/[categoria].astro` — **si hay que agregar/quitar una categoría, grupo o ítem, este es el único archivo a tocar**; el navbar, el mega-menú, el sub-navbar y las rutas se regeneran solos.
- `slugAliases`: mapa que conecta nombres del `.md` con los `subcategorySlug` reales de `techCatalog.ts`. Ejemplos: `"centros-de-computo"` → `"centros-de-computos"`, `"reguladores-de-voltaje-y-ups"` → `"ups"`, `"aires-acondicionados-de-precision"` → `"aires-de-precision"`, `"desarrollo-de-software-y-aplicaciones"` → `"desarrollo-de-software"`, `"desarrollo-y-manejo-de-proyectos"` → `"gestion-de-proyectos"`.
- Helpers exportados: `resolveRealSlug(itemSlug)`, `productsForItem/Group/Category()`, `hrefForRealSubcategory(realSlug)`.

### Catálogo `techCatalog.ts` — **126 productos, 42/42 subcategorías cubiertas (100%)**
Nomenclatura placeholder `"<Tipo de Ítem> AV 1/2/3"` (ej. "Laptop AV 1", "UPS AV 2", "Solución de IA AV 3") — 3 variantes por subcategoría (entrada/estándar/alto rendimiento), con specs técnicas inventadas pero realistas. Ya **no** genera páginas de "Cotización a medida" en ninguna ruta — el 100% del árbol de navegación tiene productos.

### Componentes de la Store
- `StoreProductCard.astro` — tarjeta de catálogo real: imagen, título, 2 specs visibles + "Ver más/Ver menos" dinámico (JS vanilla vía `data-specs-toggle`, sin duplicados), botones "Comprar" (placeholder `href="#"`) / "Saber más". **Sin precio** (`TechProduct` no tiene campo `price` real; se removió el texto "Consultar" a pedido del cliente).
- `StoreShowcaseCard.astro` — tarjeta de la landing (`/store` raíz): imagen, título, **precio ficticio** (fórmula determinística por `id`), badge opcional ("Nuevo"/"Oferta"/"Más Vendido"). Componente separado de `StoreProductCard` a propósito, para no reintroducir precios falsos en el catálogo real.
- `StoreHeroSlider.tsx` — slider promocional de 3 slides (servidores, equipos de cómputo, UPS) con autoplay, flechas y dots.
- `CatalogControls.astro` — barra "Mostrar Filtros" (placeholder) / contador de resultados / dropdown "Ordenar por" (placeholder). Sigue usándose en `/store/[categoria]`, no en la raíz.

---

## 3. Estado de la Web Corporativa (Asiaven)

### Navbar (`src/components/sections/Navbar.astro`)
Orden actual: Inicio, Nosotros, Proyectos, Servicios, **Tienda** (botón `bg-white text-corporativo-blue`, posicionado tras Servicios), Contáctanos. *("Equipo a Medida" NO va aquí — es exclusivo del navbar de la Store, ver sección 2.)*

### Footer (`src/components/sections/Footer.astro`)
Adaptativo: detecta `Astro.url.pathname.startsWith('/store')` y cambia contenido (ver detalle en "Hitos Completados" arriba). Íconos sociales son SVG custom por la limitación de `lucide-react` v1.24.0.

### Portafolio de Proyectos (`src/pages/proyectos/index.astro`)
6 proyectos definitivos del cliente, tarjetas tipográficas sin fotos (regla de negocio de confidencialidad):
1. Hotel Humboldt — Distrito Capital — Modernización / Mantenimiento
2. Asamblea Nacional — Distrito Capital — Proyectos de Elevación
3. Sede Principal Corpoelec San Bernardino — Caracas — Instalación de Escaleras Mecánicas
4. Metro de Caracas – Estación Colegio de Ingenieros — Caracas — Suministro e Instalación de 6 Escaleras Mecánicas
5. Hospital Pediátrico Dr. Elías Toro — Caracas — Instalación de 7 Ascensores de Alta Capacidad
6. Bolivariana de Puertos (Bolipuertos) — Venezuela — Mantenimiento Especializado de Ascensores

### `src/pages/servicios/[servicio].astro`
- Sin banner `PageHeader`; `<h1>` al inicio de la columna de texto, alineado con el borde superior del `ServiceSlider` (grid `items-start`).
- `ServiceSlider`/`ProductFeatureSlider` con `client:load` (fix de hidratación de esta sesión) y scroll interno en la lista de features para móvil.
- Bloque condicional por servicio: `tecnologia-y-telecomunicaciones` → botones tienda+soporte · `envases` → botones catálogo+PDF · default → botón único "Solicitar Cotización".

---

## 4. Gaps / Tareas Pendientes (Roadmap)

1. **Sin precios reales**: `TechProduct` no tiene campo `price`. La vitrina de `/store` y la PDP usan precios ficticios generados por fórmula (`fakePrice.ts`), solo para fines visuales. Si se agregan precios reales, hay que tocar `techCatalog.ts` y decidir si `StoreProductCard` (catálogo real) también debe mostrarlos.
2. **Catálogo 100% placeholder**: los 126 productos "AV" son data provisional para validar diseño UI/UX — pendiente reemplazo por el catálogo real del cliente (SKUs, specs y precios reales).
3. **`CatalogControls.astro`**: "Mostrar Filtros" sigue siendo solo UI de referencia sin lógica real (el ordenamiento sí es funcional, ver sección 2).
4. **`/envases`**: taxonomía de 3 niveles (Categoría > Subcategoría > Producto), ya migrada:
   - `packagingCatalog.ts`: `PackagingCategory.subcategories: PackagingSubcategory[]`. 5 categorías, 11 subcategorías, 62 modelos — el árbol está **completo** (transcrito íntegro de `catalogo_latas_asiaven.md`).
   - `/envases` (hub): acordeón horizontal a pantalla completa, hover expande con CTA "Ver Catálogo" → `/envases/[categoria]`.
   - `/envases/[categoria]`: una fila por subcategoría, carrusel horizontal con flechas de navegación (izquierda/derecha, vanilla JS).
   - `/envases/producto/[producto]`: "Volver al Catálogo" apunta a `/envases/${category.slug}`.
   - Sin gaps conocidos adicionales.
5. **Botón "Descargar catálogo (PDF)"** en `/servicios/envases` es `href="#"` — no existe un PDF real todavía.
6. **Contraste de datos entre `services.ts` y `techCatalog.ts`**: catálogos de dos líneas de negocio distintas — mantener sincronizados manualmente si cambian nombres.
7. **Imágenes**: 100% placeholders de Unsplash en todo el sitio (corporativo, Envases, Store). Ver `INVENTARIO_IMAGENES.md` para el checklist completo por sección con formato/orientación sugerida.
8. **`lucide-react` v1.24.0** no incluye íconos de marca (redes sociales) — si se actualiza el paquete a una versión con esos íconos, se puede simplificar el Footer reemplazando los SVG custom por los componentes de la librería.

---

## Archivos de referencia (fuente, no código)
- `categorias_productos_asiaven.md` — taxonomía definitiva de navegación de la Store (Categoría > Grupo > Ítem). **Siempre releer antes de tocar `storeTaxonomy.ts`** por si hay cambios no sincronizados.
- `catalogo_latas_asiaven.md` — specs técnicas reales del catálogo de envases (`packagingCatalog.ts`), taxonomía de 3 niveles.
- `INVENTARIO_IMAGENES.md` — checklist maestro de imágenes placeholder a reemplazar por fotos/renders reales, en todo el sitio.
