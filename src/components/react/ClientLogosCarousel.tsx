import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clients = [
  { name: "PDVSA", logoUrl: "/images/logos/clientes/pdvsa.webp" },
  { name: "Corpoelec", logoUrl: "/images/logos/clientes/corpoelec.webp" },
  { name: "Metro de Caracas", logoUrl: "/images/logos/clientes/metro-de-caracas.webp" },
  { name: "Asamblea Nacional", logoUrl: "/images/logos/clientes/asamblea-nacional.webp" },
  { name: "Banco Industrial", logoUrl: "/images/logos/clientes/banco-industrial.webp" },
  { name: "Pequiven", logoUrl: "/images/logos/clientes/pequiven.webp" },
  { name: "Hotel Humboldt", logoUrl: "/images/logos/clientes/hotel-humboldt.webp" },
  { name: "Fundación Propatria", logoUrl: "/images/logos/clientes/fundacion-propatria.webp" },
  { name: "Distribuidora Adelina C.A", logoUrl: "/images/logos/clientes/distribuidora-adelina.webp" },
  { name: "Landscape Vision Corp.", logoUrl: "/images/logos/clientes/landscape-vision-corp.webp" },
  { name: "Asian Commerce LTD", logoUrl: "/images/logos/clientes/asian-commerce-ltd.webp" },
  { name: "Telecomunicaciones Asiaven", logoUrl: "/images/logos/clientes/telecomunicaciones-asiaven.webp" },
  { name: "Belcor Diseño Construcción", logoUrl: "/images/logos/clientes/belcor-diseno-construccion.webp" },
  { name: "Despacho de la Presidencia", logoUrl: "/images/logos/clientes/despacho-de-la-presidencia.webp" },
  { name: "Ministerios", logoUrl: "/images/logos/clientes/ministerios.webp" },
  { name: "Estadio Monumental Simón Bolívar", logoUrl: "/images/logos/clientes/estadio-monumental-simon-bolivar.webp" },
  { name: "Bolipuertos", logoUrl: "/images/logos/clientes/bolipuertos.webp" },
  { name: "INEA", logoUrl: "/images/logos/clientes/inea.webp" },
];

export default function ClientLogosCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 snap-x snap-mandatory scroll-smooth px-4 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {clients.map((client) => (
          <div key={client.name} className="relative flex h-24 w-48 flex-shrink-0 snap-start items-center justify-center">
            <img
              src={client.logoUrl}
              alt={client.name}
              className="h-full w-full object-contain transition-all duration-300 hover:-translate-y-1.5 hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-corporativo-gray opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 hover:bg-corporativo-blue hover:text-white"
        aria-label="Desplazar a la izquierda"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-corporativo-gray opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 hover:bg-corporativo-blue hover:text-white"
        aria-label="Desplazar a la derecha"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
