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
  { name: "Belcor Diseño Construcción", logoUrl: "/images/logos/clientes/belcor-diseno-construccion.webp" },
  { name: "Despacho de la Presidencia", logoUrl: "/images/logos/clientes/despacho-de-la-presidencia.webp" },
  { name: "Ministerios", logoUrl: "/images/logos/clientes/ministerios.webp" },
  { name: "Estadio Monumental Simón Bolívar", logoUrl: "/images/logos/clientes/estadio-monumental-simon-bolivar.webp" },
  { name: "Bolipuertos", logoUrl: "/images/logos/clientes/bolipuertos.webp" },
  { name: "INEA", logoUrl: "/images/logos/clientes/inea.webp" },
];

// Fila duplicada para que el marquee sea continuo: la animación (definida en
// global.css, --animate-marquee) recorre exactamente -50% del ancho total,
// es decir, un set completo — cuando el primero termina de salir por la
// izquierda, su clon ya está entrando por la derecha, sin corte visible.
const loopedClients = [...clients, ...clients];

export default function ClientLogosCarousel() {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex w-max animate-marquee gap-8 py-4 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {loopedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="relative flex h-24 w-48 flex-shrink-0 items-center justify-center"
          >
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
    </div>
  );
}
