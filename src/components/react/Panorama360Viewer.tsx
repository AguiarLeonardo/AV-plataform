import { usePanorama360 } from "./usePanorama360";

interface Props {
  src: string;
  title: string;
  loadingText: string;
  loadingProgressText: string;
  errorText: string;
}

/**
 * Visor 360 a pantalla completa, para las páginas de enlace directo
 * (`src/pages/vista-360/[slug].astro`) — la panorámica ES la página, no un
 * contenido que se abre encima. Misma carga diferida/progreso/timeout/
 * limpieza que Panorama360Modal.tsx (compartido vía usePanorama360), pero
 * sin nada específico de modal: no hay overlay, no hay que atrapar foco, no
 * hay botón de cerrar ni Escape que capturar, no hay scroll de fondo que
 * bloquear (la página no tiene nada más debajo que bloquear). La carga
 * empieza sola al montarse, no al pulsar un botón.
 */
export default function Panorama360Viewer({ src, title, loadingText, loadingProgressText, errorText }: Props) {
  const { status, progress, containerRef } = usePanorama360(src);

  const loadingLabel =
    progress !== null ? loadingProgressText.replace("{percent}", String(progress)) : loadingText;

  return (
    <div className="relative h-full w-full bg-black" aria-label={title}>
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
  );
}
