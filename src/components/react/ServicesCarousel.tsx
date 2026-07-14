import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "../../data/services";

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const current = services[currentIndex];

  return (
    <div className="relative h-[60vh] md:h-[65vh] max-h-[500px] w-full overflow-hidden group rounded-xl">
      {/* Background Image */}
      <img
        key={current.images[0]}
        src={current.images[0]}
        alt={current.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
          {current.title}
        </h3>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 font-light drop-shadow-sm">
          {current.shortDescription}
        </p>
        <a
          href={`/servicios/${current.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1E3A8A]/90"
        >
          Ver detalles &rarr;
        </a>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-[#1E3A8A] hover:text-white"
        aria-label="Servicio anterior"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-[#1E3A8A] hover:text-white"
        aria-label="Siguiente servicio"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-10 bg-[#1E3A8A]" : "w-3 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
