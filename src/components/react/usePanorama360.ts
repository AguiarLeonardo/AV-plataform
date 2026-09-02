import { useEffect, useRef, useState } from "react";

interface PannellumViewer {
  destroy: () => void;
  on: (event: "load" | "error", callback: () => void) => void;
}

interface PannellumGlobal {
  viewer: (
    container: HTMLElement,
    config: { type: "equirectangular"; panorama: string; autoLoad: boolean; showZoomCtrl: boolean }
  ) => PannellumViewer;
}

/**
 * Carga diferida de Pannellum + descarga de la panorámica con progreso real,
 * timeout de 30s y limpieza de recursos — extraído de Panorama360Modal.tsx
 * para que también lo use la página de vista 360 de enlace directo
 * (`src/pages/vista-360/[slug].astro`, vía Panorama360Viewer.tsx) sin
 * reimplementar nada. El modal aporta encima su propia interfaz (overlay,
 * atrapar foco, Escape, bloqueo de scroll) — todo lo que es específico de
 * "abrirse encima de otra página" y no del visor en sí.
 *
 * Ver Panorama360Modal.tsx (antes de esta extracción) para el razonamiento
 * completo de cada decisión: por qué fetch() en vez de dejar que Pannellum
 * cargue la URL directamente, por qué blob: URL, por qué 30s de timeout.
 */
const PANORAMA_LOAD_TIMEOUT_MS = 30_000;

export function usePanorama360(src: string) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let objectUrl: string | null = null;
    const controller = new AbortController();
    setStatus("loading");
    setProgress(null);

    (async () => {
      try {
        timeoutId = setTimeout(() => {
          controller.abort();
          if (!cancelled) setStatus("error");
        }, PANORAMA_LOAD_TIMEOUT_MS);

        const [, , response] = await Promise.all([
          import("pannellum/build/pannellum.css"),
          import("pannellum/build/pannellum.js"),
          fetch(src, { signal: controller.signal }),
        ]);
        if (cancelled || !containerRef.current) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const totalHeader = response.headers.get("Content-Length");
        const total = totalHeader ? Number(totalHeader) : null;

        let blob: Blob;
        if (response.body && total) {
          // Content-Length disponible: progreso real, no simulado.
          const reader = response.body.getReader();
          const chunks: Uint8Array[] = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            if (!cancelled) setProgress(Math.min(100, Math.round((received / total) * 100)));
          }
          blob = new Blob(chunks as BlobPart[]);
        } else {
          // Sin Content-Length (o sin soporte de stream): indicador
          // indeterminado — progress se queda en null, nunca se inventa un %.
          blob = await response.blob();
        }
        if (cancelled || !containerRef.current) return;

        objectUrl = URL.createObjectURL(blob);

        const pannellum = (window as unknown as { pannellum: PannellumGlobal }).pannellum;
        const viewer = pannellum.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: objectUrl,
          autoLoad: true,
          showZoomCtrl: true,
        });

        viewer.on("load", () => {
          clearTimeout(timeoutId);
          if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
          }
          if (!cancelled) setStatus("ready");
        });
        viewer.on("error", () => {
          clearTimeout(timeoutId);
          if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
          }
          if (!cancelled) setStatus("error");
        });

        viewerRef.current = viewer;
      } catch {
        clearTimeout(timeoutId);
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [src]);

  return { status, progress, containerRef };
}
