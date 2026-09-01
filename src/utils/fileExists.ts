import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Comprueba en build-time si un archivo bajo public/ existe, para no
 * ofrecer un botón o una fuente que apunte a un 404 — mismo criterio que el
 * campo opcional `panorama360` del visor 360 (si no hay archivo, no se
 * ofrece la acción).
 *
 * `process.cwd()`, no `import.meta.url` — verificado (ver pdfExists.ts, que
 * usaba esta misma lógica antes de compartirla aquí) que Vite mueve el
 * chunk compilado a una profundidad distinta durante el build real,
 * haciendo que las rutas relativas calculadas desde `import.meta.url` no
 * sean estables. `process.cwd()` sí lo es: Astro siempre se invoca desde la
 * raíz del repo.
 */
export function publicFileExists(...pathSegments: string[]): boolean {
  return existsSync(join(process.cwd(), "public", ...pathSegments));
}
