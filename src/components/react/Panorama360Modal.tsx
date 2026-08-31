import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

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

interface Props {
  src: string;
  title: string;
  closeLabel: string;
  loadingText: string;
  loadingProgressText: string;
  errorText: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Visor 360 en modal. Pannellum (JS + CSS) se carga con import() dinámico
 * dentro del efecto de montaje — nada se descarga hasta que este componente
 * existe en el árbol, que solo ocurre tras pulsar "Ver vista 360°". Vite
 * parte esto en un chunk aparte servido desde el propio origen, sin CDN.
 *
 * El contenedor del visor (`containerRef`) tiene una altura fija por clase
 * de Tailwind (`h-[70vh]`) ya aplicada en el primer render — Pannellum
 * necesita el contenedor visible y con dimensiones ANTES de inicializar, o
 * se monta con alto cero sin lanzar ningún error (el fallo silencioso más
 * común de esta librería). Este modal no anima su apertura (aparece/
 * desaparece del DOM directamente, sin transición de tamaño), así que el
 * efecto que inicializa el visor siempre corre con el contenedor ya en su
 * tamaño final.
 *
 * La panorámica se descarga con fetch() en vez de dejar que Pannellum la
 * pida por su cuenta, para poder leer el header Content-Length y el stream
 * de la respuesta y mostrar un progreso real (no simulado). El blob
 * resultante se pasa a Pannellum como blob: URL — Pannellum lo soporta
 * nativamente (su propio código detecta el prefijo "blob:" para saltarse
 * basePath), así que internamente vuelve a "cargarlo" de forma instantánea
 * (un blob: ya está en memoria, no hay red de por medio) y punto.
 */
// Cuánto esperar antes de dar la panorámica por caída, en vez de depender de
// que el navegador emita su propio timeout de red. 30s: las panorámicas HD
// pesan ~2.3MB — en 3G decente/4G eso carga en segundos, y en el peor caso
// razonable (3G lenta, ~46s calculados) igual se habría tardado demasiado
// para valer la pena esperar; a los 30s el usuario recibe un mensaje en vez
// de seguir mirando un indicador indefinidamente.
const PANORAMA_LOAD_TIMEOUT_MS = 30_000;

export default function Panorama360Modal({
  src,
  title,
  closeLabel,
  loadingText,
  loadingProgressText,
  errorText,
  onClose,
  triggerRef,
}: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);

  // Bloquea el scroll del fondo mientras el modal está abierto.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Foco al modal al abrir; de vuelta al botón que lo abrió al cerrar.
  useEffect(() => {
    dialogRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      trigger?.focus();
    };
  }, [triggerRef]);

  // Escape cierra; Tab/Shift+Tab quedan atrapados dentro del modal.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Descarga de la panorámica (con progreso) + carga diferida de Pannellum.
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

  const loadingLabel =
    progress !== null ? loadingProgressText.replace("{percent}", String(progress)) : loadingText;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-corporativo-gray shadow-md transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div ref={containerRef} className="h-full w-full" />

        {status === "loading" && (
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/60 px-6 text-center text-sm font-medium text-white">
            <span>{loadingLabel}</span>
            {progress !== null && (
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 px-6 text-center text-sm font-medium text-white">
            {errorText}
          </div>
        )}
      </div>
    </div>
  );
}
