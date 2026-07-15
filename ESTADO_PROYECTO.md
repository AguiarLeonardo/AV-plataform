# Estado del Proyecto — Asiaven B2B

*Última actualización: "Inteligencia Artificial" dejó de ser categoría principal — ahora es un Grupo dentro de "Soluciones Empresariales", según `categorias_productos_asiaven.md` actualizado por el cliente. El menú principal quedó en 3 pilares.*

## Ecosistemas

- **Sitio corporativo** (`Layout.astro` — Navbar + Footer + WhatsAppButton): `/`, `/servicios`, `/servicios/[servicio]`, `/proyectos`, `/contactanos`, `/soporte-tecnico`, `/envases`, `/envases/producto/[producto]`.
- **Store** (`StoreLayout.astro` — sin Navbar/Footer corporativo, `bg-white`): `/store`, `/store/[categoria]`, `/store/producto/[slug]`.

## Rutas de la Tienda (`/store`)

- `/store` — Hub: catálogo completo (32 productos de `techCatalog.ts`) + `StoreNavigation` + `CatalogControls`.
- `/store/[categoria]` — Ruta dinámica única que sirve **los 3 niveles de la taxonomía** (Categoría, Grupo o Ítem), generados desde `storeTaxonomy.ts`:
  - Nivel 1 (Categoría): `/store/productos`, `/store/soluciones-empresariales`.
  - Nivel 2 (Grupo): ej. `/store/equipos-de-computo`, `/store/infraestructura-y-redes`, `/store/inteligencia-artificial` (ahora Grupo dentro de Soluciones Empresariales, no Categoría).
  - Nivel 3 (Ítem): ej. `/store/laptops`, `/store/servidores`, `/store/ia`.
  - Si el slug (a cualquier nivel) no tiene productos reales asociados, la página muestra un estado **"Cotización a medida"** con CTA a `/contactanos` en vez de una grilla vacía.
- `/store/producto/[slug]` — Nivel de detalle: ficha de producto individual (imagen + specs + CTA "Solicitar Cotización"). El link "Volver a" resuelve la página de Ítem correcta vía `hrefForRealSubcategory()`.

## Layout Activo de la Tienda

`src/layouts/StoreLayout.astro` — HTML standalone, importa `global.css`, `bg-white text-gray-900`, sin Navbar/Footer corporativo.

## Componentes Clave de la Tienda

- `StoreNavigation.tsx` (React, `client:load`) — Navbar + Mega-menú + Sub-navbar, con **Hover y Click desacoplados**:
  - **Hover** sobre una categoría principal → abre un mega-menú (grid de Grupos con sus Ítems debajo, `absolute inset-x-0 top-full`, `shadow-lg`). No toca el sub-navbar.
  - **Click** en categoría/grupo/ítem → navega a su página real y fija ese Grupo como "activo" para el sub-navbar (memorizado vía el prop `currentPath`, derivado de `Astro.url.pathname` en el servidor — no de estado de cliente volátil, para que sobreviva recargas de página en la arquitectura MPA de Astro).
  - **3 pilares en el menú principal**: Productos, Soluciones Empresariales, Soporte Técnico (enlace directo a `/soporte-tecnico`, fuera del mega-menú, sin subnav). "Inteligencia Artificial" ya no aparece ahí — vive como Grupo dentro del mega-menú de "Soluciones Empresariales" (con "IA" como su único ítem).
- `StoreProductCard.astro` — tarjeta de producto (badge opcional, imagen, precio, specs, "Ver más" vía `<details>` nativo, botones Comprar/Saber más).
- `CatalogControls.astro` — barra de Mostrar Filtros / contador de resultados / Ordenar por (dropdown con inversión de color vía CSS scoped, no Tailwind `group-open`).

## Fuente de Datos

- `src/data/techCatalog.ts` — 32 productos, 15 subcategorías reales, 6 categorías (`category`), interfaz `TechProduct`.
- `src/data/storeTaxonomy.ts` — **fuente única** del árbol de 3 niveles (Categoría → Grupo → Ítem) para toda la tienda, consumida tanto por `StoreNavigation.tsx` como por `store/[categoria].astro`. Incluye el mapa de alias (`slugAliases`) que conecta nombres del `.md` con los `subcategorySlug` reales de `techCatalog.ts`, y los helpers `productsForItem/Group/Category()` + `hrefForRealSubcategory()`.
- **Taxonomía definitiva de navegación:** `categorias_productos_asiaven.md` (Categoría > Grupo > Ítem, ~40 ítems totales). **Gap conocido:** solo 15 ítems tienen productos reales en `techCatalog.ts`; el resto muestra el estado "Cotización a medida" en su página `/store/[categoria]` en vez de una grilla vacía o un 404. Pendiente: expandir `techCatalog.ts` para cubrir el resto de la taxonomía.
- `src/data/services.ts` — 8 servicios corporativos (línea de negocio distinta al catálogo de la tienda).
- `src/data/packagingCatalog.ts` — catálogo de envases metálicos (`/envases`).

## Paleta de Colores (definida en `src/styles/global.css` vía `@theme`)

- `--color-corporativo-blue: #1E3A8A` (azul corporativo, acentos y CTAs).
- `--color-corporativo-gray: #4A5056` (texto principal, Navbar/Footer corporativo).
- La Store usa principalmente `gray-900`/`gray-700`/`gray-50` (paleta neutra minimalista) + `corporativo-blue` como acento puntual (logo, focus states, botón primario de producto).
