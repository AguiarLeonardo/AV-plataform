import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Comprueba en build-time si un PDF bajo public/documentos/catalogos/
 * existe, para no ofrecer un botón que descargue un 404 — mismo criterio
 * que el campo opcional `panorama360` del visor 360 (si no hay archivo, no
 * se ofrece el botón).
 *
 * PROBADO Y DESCARTADO: resolver a partir de `import.meta.url` (la ubicación
 * de este módulo en disco) parecía la opción "no depende de cwd", pero
 * verificado con `npm run build` real, Vite mueve el chunk compilado de
 * este archivo a `dist/.prerender/chunks/pdfExists_[hash].mjs` durante el
 * prerender — dos niveles de profundidad distintos a los del código fuente
 * (`src/utils/`), así que `../../public/...` calculado desde ahí apunta a
 * un `dist/public/` que no existe. Es decir: `import.meta.url` SÍ depende
 * de dónde Vite decida colocar el chunk, que no es estable.
 *
 * Lo que sí funciona, verificado con el mismo build real: `process.cwd()`.
 * Astro siempre se invoca (`npm run build`, y el comando de build por
 * defecto en Vercel) desde la raíz del repo — es la misma asunción de la
 * que ya depende cualquier import relativo en astro.config.mjs.
 */
export function catalogPdfExists(filename: string): boolean {
  return existsSync(join(process.cwd(), "public", "documentos", "catalogos", filename));
}
