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
 */
export default function Panorama360Modal({
  src,
  title,
  closeLabel,
  loadingText,
  errorText,
  onClose,
  triggerRef,
}: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
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

  // Carga diferida de Pannellum + inicialización del visor.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        await Promise.all([import("pannellum/build/pannellum.css"), import("pannellum/build/pannellum.js")]);
        if (cancelled || !containerRef.current) return;

        const pannellum = (window as unknown as { pannellum: PannellumGlobal }).pannellum;
        const viewer = pannellum.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: src,
          autoLoad: true,
          showZoomCtrl: true,
        });

        viewer.on("load", () => {
          if (!cancelled) setStatus("ready");
        });
        viewer.on("error", () => {
          if (!cancelled) setStatus("error");
        });

        viewerRef.current = viewer;
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [src]);

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
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
            {loadingText}
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
