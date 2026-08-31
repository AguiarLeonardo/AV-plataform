/**
 * Apagado deliberado del catálogo de la Store (branch `feat/ocultar-store`)
 * — el catálogo tiene 126 productos de datos de relleno (imágenes de stock,
 * precios simulados) y no debe publicarse así. Ver docs/ESTADO.md para el
 * detalle completo y el checklist exacto de reversión.
 *
 * Cuando la base de datos de productos reales esté lista, cambiar esto a
 * `true` reactiva todo el catálogo (rutas dinámicas, navegación con
 * submenús, botones de la Store en /servicios) sin tocar ningún otro
 * archivo — es el único punto de control.
 */
export const STORE_CATALOG_LIVE = false;
