import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Potencia tu infraestructura",
    subtitle: "Descubre nuestra línea de servidores empresariales.",
    cta: "Explorar Servidores",
    href: "/store/servidores",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Movilidad y rendimiento",
    subtitle: "Encuentra el equipo de cómputo ideal para tu equipo.",
    cta: "Explorar Equipos de Cómputo",
    href: "/store/equipos-de-computo",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Protección continua",
    subtitle: "Soluciones de respaldo de energía y UPS de alta capacidad.",
    cta: "Explorar UPS",
    href: "/store/reguladores-de-voltaje-y-ups",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function StoreHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-16 text-left sm:pb-20">
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {slide.title}
            </h2>

            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-gray-200 sm:text-lg">
              {slide.subtitle}
            </p>

            <a
              href={slide.href}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
            >
              {slide.cta} &rarr;
            </a>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-corporativo-blue hover:opacity-100"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-corporativo-blue hover:opacity-100"
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-10 bg-white" : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
