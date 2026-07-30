import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clients = [
  { name: "PDVSA", logoUrl: "/images/logos/clientes/pdvsa.png" },
  { name: "Corpoelec", logoUrl: "/images/logos/clientes/corpoelec.png" },
  { name: "Metro de Caracas", logoUrl: "/images/logos/clientes/metro-de-caracas.png" },
  { name: "Asamblea Nacional", logoUrl: "/images/logos/clientes/asamblea-nacional.png" },
  { name: "Banco Industrial", logoUrl: "/images/logos/clientes/banco-industrial.png" },
  { name: "Pequiven", logoUrl: "/images/logos/clientes/pequiven.png" },
  { name: "Hotel Humboldt", logoUrl: "/images/logos/clientes/hotel-humboldt.png" },
  { name: "Fundación Propatria", logoUrl: "/images/logos/clientes/fundacion-propatria.png" },
  { name: "Distribuidora Adelina C.A", logoUrl: "/images/logos/clientes/distribuidora-adelina.png" },
  { name: "Landscape Vision Corp.", logoUrl: "/images/logos/clientes/landscape-vision-corp.png" },
  { name: "Asian Commerce LTD", logoUrl: "/images/logos/clientes/asian-commerce-ltd.png" },
  { name: "Telecomunicaciones Asiaven", logoUrl: "/images/logos/clientes/telecomunicaciones-asiaven.png" },
  { name: "Belcor Diseño Construcción", logoUrl: "/images/logos/clientes/belcor-diseno-construccion.png" },
  { name: "Despacho de la Presidencia", logoUrl: "/images/logos/clientes/despacho-de-la-presidencia.png" },
  { name: "Ministerios", logoUrl: "/images/logos/clientes/ministerios.png" },
  { name: "Estadio Monumental Simón Bolívar", logoUrl: "/images/logos/clientes/estadio-monumental-simon-bolivar.png" },
  { name: "Bolipuertos", logoUrl: "/images/logos/clientes/bolipuertos.png" },
  { name: "INEA", logoUrl: "/images/logos/clientes/inea.png" },
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
