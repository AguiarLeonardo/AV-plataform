import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clientNames = [
  "PDVSA",
  "Corpoelec",
  "Metro de Caracas",
  "Asamblea Nacional",
  "Banco Industrial",
  "Pequiven",
  "Hotel Humboldt",
  "Fundación Propatria",
  "Distribuidora Adelina C.A",
  "Landscape Vision Corp.",
  "Asian Commerce LTD",
  "Telecomunicaciones Asiaven",
  "Belcor Diseño Construcción",
  "Despacho de la Presidencia",
  "Ministerios",
  "Estadio Monumental Simón Bolívar",
  "Bolipuertos",
  "INEA",
];

const clients = clientNames.map((name) => ({
  name,
  logoUrl: `https://placehold.co/300x150/e2e8f0/475569?text=Logo+${encodeURIComponent(name).replace(/%20/g, "+")}`,
}));

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
          <div key={client.name} className="relative h-24 w-48 flex-shrink-0 snap-start">
            <img
              src={client.logoUrl}
              alt={client.name}
              className="h-full w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
              loading="lazy"
              decoding="async"
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
