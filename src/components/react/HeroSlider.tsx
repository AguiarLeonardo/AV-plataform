import { useEffect, useState } from "react";

const slides = [
  {
    title: "Innovación y Excelencia Industrial",
    subtext:
      "Líderes corporativos en infraestructura, con más de 15 años entregando soluciones de ingeniería a la altura de nuestros clientes.",
    cta: "Conócenos",
    href: "#nosotros",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Especializados en Diferentes Servicios",
    subtext:
      "Desde manufactura avanzada hasta mantenimiento de precisión, cubrimos todas las necesidades de tu empresa.",
    cta: "Ver Catálogo",
    href: "/servicios",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "La Opción Más Confiable",
    subtext:
      "Más de 15 años brindando soluciones integrales y calidad garantizada a nuestros clientes.",
    cta: "Nuestra Experiencia",
    href: "/proyectos",
    image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[82dvh] md:h-[calc(100dvh-100px)] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 py-12 text-left sm:px-8 lg:px-16">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-200 sm:text-xl md:max-w-3xl">
              {slide.subtext}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href={slide.href}
                className="rounded-lg bg-corporativo-blue px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-corporativo-blue/90 hover:shadow-xl"
              >
                {slide.cta}
              </a>
              <a
                href="#servicios"
                className="rounded-lg border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-corporativo-gray"
              >
                Servicios
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-10 bg-corporativo-blue" : "w-3 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
