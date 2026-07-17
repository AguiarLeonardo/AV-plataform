# Estado del Proyecto — Asiaven B2B

*Documento de handoff para continuar en una nueva sesión / sincronizar contexto con otros asistentes. Regla de oro: actualizar este archivo al final de cada tarea completada con éxito.*

---

## 🔄 Sincronización de Sesión (última actualización — cierre por límite de contexto)

### Rama Actual
`develop` — checkout local al día con `origin/develop` **hasta el commit `888d53d`**. Todo lo listado en "Funcionalidades Completadas" a partir de "Mega Menú de Soporte y BTO" está hecho y validado en el navegador, pero **aún sin commitear**.

Estrategia de ramas activa: `main` → `develop` → `staging` (esta última conecta el despliegue automático en Vercel).

### Arquitectura del Navbar de la Tienda (`StoreNavigation.tsx`)
Los 4 ítems del menú principal — **Productos**, **Soluciones Empresariales**, **Equipo a Medida**, **Soporte Técnico** — son ahora `<button type="button">` **sin `href`**. Ninguno navega directamente: solo son disparadores que abren/cierran su mega menú asociado (`onMouseEnter` en hover de escritorio, `onClick` con toggle para touch/teclado). Tres estados de React controlan qué panel está abierto y se cierran entre sí al abrir cualquiera de los otros:
- `hoverIndex: number | null` — mega menú de Productos/Soluciones Empresariales (data-driven desde `storeCategories`).
- `supportOpen: boolean` — mega menú de Soporte Técnico (`supportGroups`, array local).
- `btoOpen: boolean` — mega menú de Equipo a Medida (`btoItems`, array local).

"Equipo a Medida" es la única excepción histórica ya corregida: llegó a existir como `<a href="/contactanos">` y luego como `<a>` normal antes de convertirse también en `<button>` toggle en esta sesión.

Dentro del mega menú de Productos/Soluciones, los "Grupos" (ej. "Equipos de Cómputo") son `<span>` no clicables (solo encabezan visualmente); únicamente los "Ítems" (Laptops, Servidores, etc.) son `<a href>` navegables. El menú de Soporte usa la **misma estructura DOM/clases** que el de Productos (Grupo → Ítem). El menú de Equipo a Medida es distinto a propósito: un grid horizontal de 4 tarjetas sin agrupar (ver detalle abajo).

Las páginas de nivel Categoría (`/store/productos`, `/store/soluciones-empresariales`) siguen existiendo como rutas (generadas por `store/[categoria].astro`) — simplemente no hay ya ningún enlace del navbar que apunte a ellas directamente.

### Funcionalidades Completadas (histórico consolidado, más reciente primero)

**Formularios Híbridos B2C/B2B**
Todos los formularios con campo "Empresa" son personales por defecto — el campo está oculto/desmontado hasta que el usuario activa un toggle sutil alineado a la derecha, encima de los campos ("Tus Datos" + botón). Dos implementaciones según el tipo de archivo:
- **React** (`BTOForm.tsx` y `QuoteRequestForm.tsx`, montado en `/store/cotizacion`): estado `isBusiness` con `useState`; el campo Empresa se renderiza condicionalmente (`{isBusiness && (...)}`, se desmonta del DOM, no solo se oculta) y su `required` es condicional (`required={isBusiness}`). Copy: "¿Compras para una empresa?" ↔ "¿Compra personal?".
- **Vanilla JS** (`/store/soporte/ticket.astro` y `/store/soporte/contacto-ventas.astro`, formularios estáticos): botón `.toggle-b2b` + contenedor `.business-fields.hidden`; un `<script>` hace `classList.toggle("hidden")` y cambia el `textContent` del botón. Se quitó el atributo `required` del input estático de Empresa.
- **Excepción de copy en `ticket.astro`** (contexto de Soporte, distinto a Ventas/Armado): el toggle usa "¿Soporte para tu empresa?" ↔ "¿Soporte personal?".

**Mega Menú de Soporte y Equipo a Medida (BTO)**
- Mega menú de Soporte reestructurado a la **misma estética exacta** del menú de Productos (Grupo → Ítem, sin caja gris custom), reducido a las 5 opciones finales: **Recursos de Ayuda** — "Software y Drivers" (`/store/soporte/descargas`), "Consultar la garantía" (`/store/garantia`), "Preguntas frecuentes" (`/store/soporte/faq`); **Asistencia Directa** — "Soporte y solución de problemas" (`/store/soporte/ticket`), "Contactar a Ventas" (`/store/soporte/contacto-ventas`). Los 5 son `<a>` reales, no queda ningún `<span>` estático.
- Nueva página `/store/soporte/ticket.astro`: formulario de apertura de ticket (Nombre y Apellido, Empresa condicional, Serial/Service Tag, Tipo de Falla — select Hardware/Software/Redes/Otro, Descripción).
- Nueva página `/store/soporte/contacto-ventas.astro`: formulario de asesoría comercial (Nombre, Empresa condicional, Correo Corporativo, Teléfono, Solución de Interés — select Equipos de Cómputo/Servidores y Almacenamiento/Licenciamiento/Proyecto a Medida, Mensaje).
- Mega menú "Equipo a Medida" convertido a **grid horizontal simple** (`grid grid-cols-4 gap-6 p-6`), 4 tarjetas visuales (`bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center`) sin agrupar por título: Laptops Corporativas (`/store/medida/laptops`), PCs de Escritorio (`/store/medida/desktops`), Workstations (`/store/medida/workstations`), Servidores (`/store/medida/servidores`).
- **Calculadora BTO dinámica** (`src/components/react/BTOForm.tsx`, nuevo): componente compartido `BTOFormBase` que exporta 3 variantes — `LaptopBTO` ($600 base), `ServerBTO` ($2,500 base), `DesktopBTO` ($500 base, usado tanto en `/store/medida/desktops` como en `/store/medida/workstations`). `useState` para selecciones de specs + datos de cliente (incluida `quantity`); `useMemo` calcula precio unitario = base + suma de `extra` de cada opción elegida; precio total = unitario × cantidad. Un banner fijo (`fixed inset-x-0 bottom-0`) muestra "Precio unitario" y "Precio Estimado" **en tiempo real**. Al enviar: mensaje de éxito y redirección a `/store` tras 2.5s. Las 4 páginas `.astro` de `/store/medida/` solo montan el componente correspondiente con `client:load`.
- **Bug de testing detectado y evitado**: `document.querySelector("form")` sin calificar captura el `<form>` de búsqueda del navbar (aparece antes en el DOM) en vez del formulario de la página — al escribir scripts de prueba (o cualquier futuro código) hay que apuntar al formulario por `id` o `closest("form")` desde un campo conocido.

**Rediseño PDP y Refinamientos de UI**
- `store/producto/[slug].astro` rediseñada estilo Lenovo/HP: breadcrumbs (`findTaxonomyPath()` en `storeTaxonomy.ts`, traza `Inicio > Tienda > [Grupo] > [Ítem] > [Producto]`), Buy Box de 2 columnas (imagen + galería interactiva, badge, `<h1>`, estrellas + reseñas estáticas, precio + precio tachado + badge de ahorro vía `fakePrice.ts`, CTA "Agregar a Cotización" conectado a `quoteCart.ts`, acciones Comparar/Guardar), Specs Grid con íconos por palabra clave, carrusel de "Recomendados para ti" (mismo subcategoría + fallback a categoría amplia hasta 5), sección de cierre "La Promesa Asiaven" (3 columnas).
- **Galería interactiva**: imagen principal `id="main-product-image"`, 4 miniaturas (`class="thumbnail-trigger"` + `data-image-src`, foto real + pool de fotos tech rotadas por `product.id`). Script vanilla intercambia el `src` al clic y mueve el borde activo azul (`ring-2 ring-corporativo-blue`) entre miniaturas.
- **Flechas en el carrusel de Recomendados**: contenedor `id="recomendados-scroll"` envuelto en `relative group`, dos botones circulares blancos con sombra (visibles solo en hover) que hacen `scrollBy({left: ±300, behavior:"smooth"})`.
- **Espaciado bajo "La Promesa Asiaven"**: `pb-24` agregado a esa sección para despegarla del Footer.
- **Footer de la Tienda con esquema claro**: `Footer.astro` computa un objeto `theme` según `isStore` (`Astro.url.pathname.startsWith('/store')`) — la Tienda usa `bg-gray-50` con textos `text-gray-900`/`text-gray-600` y hovers `text-corporativo-blue`; el sitio corporativo conserva el esquema oscuro original (`bg-corporativo-gray`).

**Páginas Legales y de Soporte**
4 páginas de texto nuevas, diseño "documento" limpio (`max-w-4xl mx-auto`, `space-y-*`, sin plugin de typography): `/privacidad` y `/terminos` (`Layout.astro`, corporativo), `/store/garantia` y `/store/envios` (`StoreLayout.astro` + `StoreNavigation`, tienda). Todos los `href="#"` del Footer relacionados quedaron conectados a estas rutas reales.

**Carrito de Cotización B2B**
Los botones "Comprar" en `StoreProductCard.astro` y `SearchResultCard.tsx` ahora son **"Agregar a Cotización"**, con feedback "¡Agregado!" por 2s. Estado global del carrito en `src/store/quoteCart.ts` (localStorage + `CustomEvent("cart-updated")` — `@nanostores/react` no está instalado, no se usó). El ícono de carrito en `StoreNavigation.tsx` enlaza a `/store/cotizacion` y muestra un badge rojo con la cantidad de ítems. Página `/store/cotizacion.astro`: `QuoteCartList.tsx` (editar cantidad, eliminar ítems, total) + `QuoteRequestForm.tsx` (formulario, envío simulado, limpia el carrito y redirige a `/store`).

**Búsqueda y Ordenamiento**
- Buscador funcional: input del navbar envuelto en `<form>` que redirige a `/store/busqueda?q={término}`. Página `/store/busqueda.astro` monta `SearchResults.tsx` (`client:load`), filtra `techProducts` por título/categoría/descripción, renderiza con `SearchResultCard.tsx`.
- Ordenamiento real en `/store/[categoria]`: `CatalogControls.astro` tiene un `<select id="sort-select">` (`price_asc`/`price_desc`/`name_asc`) con script vanilla que reordena `#product-grid`. Precio ficticio unificado en `src/utils/fakePrice.ts`.

**Catálogo y Landing de la Tienda**
- Catálogo poblado al 100%: 126 productos placeholder (`"<Ítem> AV 1/2/3"`) en `techCatalog.ts`, 3 por cada una de las 42 subcategorías reales de `storeTaxonomy.ts`. Ya no genera páginas de "Cotización a medida" en ninguna ruta.
- `/store` rediseñada como landing comercial estilo HP/Lenovo: `StoreHeroSlider` (3 slides) + 3 bandas de vitrina (`StoreShowcaseCard`: Destacados/Ofertas/Más Vendidos, precio ficticio) + sección de Trust Badges (4 columnas). Barra secundaria de navegación oculta solo en la raíz `/store`.
- `StoreProductCard`: "Ver más/Ver menos" dinámico vía `useState`/vanilla JS (sin duplicados).

**Sitio Corporativo**
- Fix de hidratación: `ServiceSlider`/`ProductFeatureSlider` con `client:load` (antes `client:visible`, podía colgarse si la pestaña cargaba en segundo plano).
- Fix de texto cortado en tarjetas móviles de Ascensores/Escaleras Mecánicas (scroll interno).
- Botón "Tienda" destacado en el navbar corporativo, tras "Servicios".

**Transversal**
- `/envases` rediseñada a taxonomía de 3 niveles (acordeón + carruseles con flechas de navegación).
- `INVENTARIO_IMAGENES.md` creado — checklist maestro de imágenes placeholder.

### Bugs Conocidos / Pendientes de Revisión (limpio — solo lo que sigue vigente)
- **PDP**: las 4 miniaturas de galería, "(4.8) 24 reseñas" y el "precio original" tachado son **datos simulados/estáticos** (no hay reseñas ni fotos reales por producto todavía).
- **Carrito de cotización es 100% front-end**: `quoteCart.ts` en `localStorage`, sin backend — no persiste entre dispositivos, y el envío del formulario es simulado (no llega correo real a ventas@asiaven.com).
- El carrito no distingue variantes ni valida stock.
- **Confirmar despliegue**: todos los commits están en el checkout local de `develop`; verificar que `staging`/Vercel ya los refleje.
- **`lucide-react` instalado es v1.24.0**, no incluye íconos de marca (LinkedIn/Twitter/Instagram) — el Footer usa SVGs custom como workaround.
- Precios en la vitrina de `/store`, la PDP y las calculadoras BTO son **ficticios** (fórmulas/valores inventados) — no son datos reales de catálogo.
- Catálogo de 126 productos "AV" sigue siendo **data provisional/placeholder** — pendiente reemplazo por el catálogo real del cliente.
- Imágenes: 100% placeholders de Unsplash en todo el sitio — ver `INVENTARIO_IMAGENES.md`.
- Las páginas legales/de soporte/BTO usan texto boilerplate genérico — pendiente revisión y aprobación final del cliente.
- `CatalogControls.astro`: "Mostrar Filtros" sigue siendo solo UI de referencia sin lógica real (el ordenamiento sí es funcional).

*(Resueltos y retirados de esta lista en esta sesión: enlaces muertos `href="#"` del Footer → ahora apuntan a páginas reales; botones "Comprar" placeholder → ahora "Agregar a Cotización" funcional; barra de búsqueda sin lógica → ahora funcional.)*

### Siguientes Pasos
*(pendiente de definir con el cliente en la próxima sesión)*

---

## 1. Estructura del Proyecto (Layouts)

El sitio tiene **dos ecosistemas visualmente independientes**, cada uno con su propio layout raíz:

### `src/layouts/Layout.astro` — Sitio corporativo
- Incluye `<Navbar />` (sticky, `bg-corporativo-gray`) + `<slot />` dentro de `<main>` + `<Footer />` (adaptativo, ver sección 3) + `<WhatsAppButton />` (SVG nativo, flotante).
- Meta description corporativa, favicon, `bg-white text-corporativo-gray`.
- Usado por **todas** las páginas corporativas: `/`, `/servicios`, `/servicios/[servicio]`, `/proyectos`, `/contactanos`, `/soporte-tecnico`, `/envases`, `/envases/[categoria]`, `/envases/producto/[producto]`, `/privacidad`, `/terminos`.

### `src/layouts/StoreLayout.astro` — Ecosistema Store
- HTML **standalone**, propio `<head>`, `bg-white text-gray-900`, **sin** `<Navbar />` corporativo — la Store tiene su propia navegación (`StoreNavigation.tsx`, ver sección 2). **Sí incluye** el `<Footer />` global adaptativo.
- Usado por toda la sección `/store/*` (ver rutas completas en sección 2).
- Decisión deliberada del cliente: separar completamente la identidad visual/UX de la tienda del sitio corporativo.

**Paleta de colores** (definida en `src/styles/global.css` vía `@theme`):
- `--color-corporativo-blue: #1E3A8A` — azul corporativo, acentos y CTAs en todo el sitio.
- `--color-corporativo-gray: #4A5056` — texto principal del sitio corporativo, Navbar/Footer.
- La Store usa `gray-900`/`gray-700`/`gray-50` como base neutra + `corporativo-blue` como acento puntual.

---

## 2. Estado de la Tienda (`/store`)

### Rutas completas
- **`/store`** — Landing comercial: `StoreNavigation` (sin barra secundaria) + `StoreHeroSlider` + 3 bandas de vitrina + Trust Badges. No muestra el catálogo completo.
- **`/store/[categoria]`** — Ruta dinámica única para los 3 niveles de taxonomía (Categoría/Grupo/Ítem, ej. `/store/productos`, `/store/equipos-de-computo`, `/store/laptops`).
- **`/store/producto/[slug]`** — Ficha de producto individual (PDP), rediseñada estilo Lenovo/HP.
- **`/store/busqueda`** — Resultados de búsqueda (`SearchResults.tsx`, lee `?q=` en runtime).
- **`/store/cotizacion`** — Carrito de cotización B2B.
- **`/store/garantia`**, **`/store/envios`** — Políticas (texto), enlazadas desde el Footer y el mega menú de Soporte.
- **`/store/soporte/descargas`** — Centro de Descargas (buscador simulado + grid de drivers/manuales, `href="#"`).
- **`/store/soporte/faq`** — Preguntas Frecuentes B2B (`<details>` nativo).
- **`/store/soporte/ticket`** — Formulario de apertura de ticket de soporte.
- **`/store/soporte/contacto-ventas`** — Formulario de asesoría comercial.
- **`/store/medida/laptops`**, **`/store/medida/desktops`**, **`/store/medida/workstations`**, **`/store/medida/servidores`** — Configuradores Build-to-Order con calculadora de precio en tiempo real (`BTOForm.tsx`).

### `StoreNavigation.tsx` (React, `client:load`) — Navbar + 3 Mega-menús + Sub-navbar
Ver la sección **"Arquitectura del Navbar"** al inicio de este documento para el detalle completo de estados y comportamiento. Resumen:
- Header con logo, 4 botones toggle de mega menú, carrito (con badge), perfil, buscador.
- **Sub-navbar inferior** (franja `bg-gray-50`): muestra los ítems del Grupo activo (Productos/Soluciones). Se oculta por completo en la raíz `/store`. Determinada por `currentPath` derivado de `Astro.url.pathname` en el servidor (arquitectura MPA de Astro, el componente se re-monta en cada carga de página).
- Los menús de Productos/Soluciones Empresariales son 100% data-driven desde `storeTaxonomy.ts`; los de Soporte (`supportGroups`) y Equipo a Medida (`btoItems`) son arrays locales dentro del propio componente.

### Fuente única de la taxonomía: `src/data/storeTaxonomy.ts`
- Árbol de 3 niveles (`StoreCategory` → `StoreGroup` → `StoreItem`), tomado de `categorias_productos_asiaven.md`. **42 ítems en total.**
- Consumido por `StoreNavigation.tsx` y `store/[categoria].astro` — único archivo a tocar para agregar/quitar categoría, grupo o ítem.
- `slugAliases`: conecta nombres del `.md` con `subcategorySlug` reales de `techCatalog.ts` (5 alias: centros-de-computo, ups, aires-de-precision, desarrollo-de-software, gestion-de-proyectos).
- Helpers: `resolveRealSlug()`, `productsForItem/Group/Category()`, `hrefForRealSubcategory()`, `findTaxonomyPath()` (para breadcrumbs de la PDP).

### Catálogo `techCatalog.ts` — 126 productos, 42/42 subcategorías (100%)
Nomenclatura placeholder `"<Tipo de Ítem> AV 1/2/3"`, 3 variantes por subcategoría con specs técnicas inventadas pero realistas.

### Componentes de la Store
- `StoreProductCard.astro` — tarjeta de catálogo real: imagen, título, 2 specs + "Ver más/Ver menos", botón **"Agregar a Cotización"** (conectado a `quoteCart.ts`) + "Saber más". Sin precio visible (`TechProduct` no tiene campo `price` real).
- `StoreShowcaseCard.astro` — tarjeta de la landing (`/store` raíz): precio ficticio, badge opcional. Separado de `StoreProductCard` a propósito.
- `StoreHeroSlider.tsx` — slider promocional de 3 slides con autoplay.
- `CatalogControls.astro` — resultados + `<select id="sort-select">` funcional + "Mostrar Filtros" (placeholder).
- `SearchResultCard.tsx` — versión React de `StoreProductCard` para `/store/busqueda`.
- `BTOForm.tsx` — calculadora de configuración a medida (3 variantes: Laptop/Server/Desktop).
- `QuoteCartList.tsx` / `QuoteRequestForm.tsx` — carrito y formulario de `/store/cotizacion`.

### `src/store/quoteCart.ts` — Estado global del carrito
localStorage + `CustomEvent("cart-updated")`. Funciones: `getCart()`, `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`, `getCartCount()`.

### `src/utils/fakePrice.ts` — Fórmula de precio ficticio unificada
Usada por la vitrina, el ordenamiento y la PDP (`fakePriceValue()`, `fakePrice()`).

---

## 3. Estado de la Web Corporativa (Asiaven)

### Navbar (`src/components/sections/Navbar.astro`)
Orden: Inicio, Nosotros, Proyectos, Servicios, **Tienda** (botón `bg-white text-corporativo-blue`, tras Servicios), Contáctanos. *("Equipo a Medida" es exclusivo del navbar de la Store.)*

### Footer (`src/components/sections/Footer.astro`)
Adaptativo: detecta `Astro.url.pathname.startsWith('/store')` y cambia todo el esquema — fondo (`bg-corporativo-gray` oscuro corporativo vs. `bg-gray-50` claro tienda), columnas, contacto y copyright. Íconos sociales son SVG custom por la limitación de `lucide-react` v1.24.0.

### Portafolio de Proyectos (`src/pages/proyectos/index.astro`)
6 proyectos definitivos del cliente, tarjetas tipográficas sin fotos (confidencialidad): Hotel Humboldt, Asamblea Nacional, Corpoelec San Bernardino, Metro de Caracas, Hospital Pediátrico Elías Toro, Bolipuertos.

### `src/pages/servicios/[servicio].astro`
Sin banner `PageHeader`; `<h1>` al inicio de la columna de texto. `ServiceSlider`/`ProductFeatureSlider` con `client:load` y scroll interno en la lista de features para móvil.

### `/privacidad` y `/terminos`
Páginas de texto legal, diseño limpio `max-w-4xl mx-auto`.

---

## 4. Gaps / Tareas Pendientes (Roadmap)

1. **Sin precios reales**: `TechProduct` no tiene campo `price`. La vitrina, la PDP y las calculadoras BTO usan precios ficticios (`fakePrice.ts` y constantes en `BTOForm.tsx`), solo para fines visuales.
2. **Catálogo 100% placeholder**: los 126 productos "AV" son data provisional — pendiente reemplazo por el catálogo real del cliente (SKUs, specs y precios reales).
3. **`CatalogControls.astro`**: "Mostrar Filtros" sigue siendo solo UI de referencia sin lógica real.
4. **`/envases`**: taxonomía de 3 niveles ya migrada y completa (5 categorías, 11 subcategorías, 62 modelos, transcritos íntegros de `catalogo_latas_asiaven.md`). Sin gaps conocidos.
5. **Botón "Descargar catálogo (PDF)"** en `/servicios/envases` es `href="#"` — no existe un PDF real todavía.
6. **Contraste de datos entre `services.ts` y `techCatalog.ts`**: catálogos de dos líneas de negocio distintas — mantener sincronizados manualmente.
7. **Imágenes**: 100% placeholders de Unsplash en todo el sitio. Ver `INVENTARIO_IMAGENES.md`.
8. **`lucide-react` v1.24.0** no incluye íconos de marca — si se actualiza el paquete, se puede simplificar el Footer.
9. **Backend de formularios**: todos los formularios (cotización, ticket, ventas, BTO) simulan el envío con `alert`/mensaje de éxito local — falta conectar a un servicio de email/CRM real para que las solicitudes lleguen de verdad.

---

## Archivos de referencia (fuente, no código)
- `categorias_productos_asiaven.md` — taxonomía definitiva de navegación de la Store. **Siempre releer antes de tocar `storeTaxonomy.ts`**.
- `catalogo_latas_asiaven.md` — specs técnicas reales del catálogo de envases (`packagingCatalog.ts`).
- `INVENTARIO_IMAGENES.md` — checklist maestro de imágenes placeholder a reemplazar.
