import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check, View } from "lucide-react";
import type { SubProduct } from "../../data/services";
import type { Localized } from "../../i18n/utils";
import Panorama360Modal from "./Panorama360Modal.tsx";

// El componente sigue sin saber nada de locales: recibe strings ya
// resueltos por el .astro padre vía localize(), nunca el objeto
// Localized<T> completo. Este tipo se deriva de SubProduct en vez de
// declarar los campos a mano, para que un cambio futuro en la forma de
// SubProduct se refleje aquí sin tener que acordarse de actualizar dos
// lugares. `panorama360` (no localizado) pasa igual sin cambios.
type ResolvedSubProduct = {
  [K in keyof SubProduct]: SubProduct[K] extends Localized<infer V> ? V : SubProduct[K];
};

interface Viewer360Labels {
  buttonLabel: string;
  closeLabel: string;
  loadingText: string;
  errorText: string;
}

interface Props {
  products: ResolvedSubProduct[];
  prevLabel: string;
  nextLabel: string;
  viewer360: Viewer360Labels;
}

export default function ProductFeatureSlider({ products, prevLabel, nextLabel, viewer360 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openPanoramaIndex, setOpenPanoramaIndex] = useState<number | null>(null);
  const triggerButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? products.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === products.length - 1 ? 0 : i + 1));
  };

  const openProduct = openPanoramaIndex !== null ? products[openPanoramaIndex] : null;

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="relative min-h-[500px]">
        {products.map((product, index) => (
          <div
            key={product.title}
            className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <div className="relative h-64 w-full lg:h-full">
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>

            {/*
              overflow-y-auto (no justify-center) en esta columna + el wrapper
              interno con m-auto: cuando el contenido cabe, el margen
              automático lo centra exactamente igual que justify-center antes
              (cero cambio visual). Cuando el contenido NO cabe (desborda los
              500px de la tarjeta), el margen colapsa a 0 y el contenido se
              ancla arriba, quedando accesible completo con scroll — el bug
              original era que un bloque centrado con overflow-visible dentro
              de un contenedor de altura fija se desborda simétricamente por
              ARRIBA y por ABAJO, y el overflow-hidden del contenedor raíz
              recorta ambos extremos sin dejar forma de alcanzarlos.
            */}
            <div className="flex min-h-0 flex-col overflow-y-auto p-8 lg:p-12">
              <div className="m-auto w-full">
                <h3 className="text-2xl font-extrabold tracking-tight text-corporativo-gray lg:text-3xl">
                  {product.title}
                </h3>

                <ul
                  className="mt-6 flex max-h-40 flex-col gap-3 overflow-y-auto pr-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent lg:max-h-none lg:overflow-visible lg:pr-0"
                >
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-gray-600">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-corporativo-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Sin panorámica, no hay botón — nada de deshabilitado ni "próximamente" (mismo criterio que el LanguageSwitcher en páginas no traducidas). */}
                {product.panorama360 && (
                  <button
                    type="button"
                    ref={(el) => {
                      triggerButtonRefs.current[index] = el;
                    }}
                    onClick={() => {
                      activeTriggerRef.current = triggerButtonRefs.current[index];
                      setOpenPanoramaIndex(index);
                    }}
                    aria-label={`${viewer360.buttonLabel} — ${product.title}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-corporativo-blue px-4 py-2 text-sm font-semibold text-corporativo-blue transition-colors hover:bg-corporativo-blue hover:text-white"
                  >
                    <View className="h-4 w-4" />
                    {viewer360.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {products.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20 flex gap-3 lg:bottom-8 lg:right-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-corporativo-gray shadow-md transition-colors hover:bg-corporativo-blue hover:text-white"
              aria-label={prevLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-corporativo-gray shadow-md transition-colors hover:bg-corporativo-blue hover:text-white"
              aria-label={nextLabel}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {openProduct?.panorama360 && (
        <Panorama360Modal
          src={openProduct.panorama360}
          title={openProduct.title}
          closeLabel={viewer360.closeLabel}
          loadingText={viewer360.loadingText}
          errorText={viewer360.errorText}
          onClose={() => setOpenPanoramaIndex(null)}
          triggerRef={activeTriggerRef}
        />
      )}
    </div>
  );
}
