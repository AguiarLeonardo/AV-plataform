import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Cta {
  text: string;
  href: string;
  primary: boolean;
}

interface Slide {
  overline?: string;
  title: string;
  subtitle: string;
  ctas: Cta[];
  image: string;
}

const slides: Slide[] = [
  {
    overline: "MÁS QUE UN LUJO, UNA NECESIDAD",
    title: "La visión se hizo más grande",
    subtitle:
      "Ofrecemos soluciones integrales en construcción, suministro de maquinaria pesada y distribución de tecnología de punta con estándares globales.",
    ctas: [
      { text: "Conoce nuestros servicios", href: "/servicios", primary: true },
      { text: "Nuestra Historia", href: "/#about", primary: false },
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Innovación en Soluciones de Envasado",
    subtitle:
      "Fabricación de recipientes y envases de alta resistencia para el sector industrial y comercial, garantizando la máxima durabilidad.",
    ctas: [{ text: "Ver Catálogo", href: "/servicios/envasados", primary: true }],
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Ingeniería de Precisión en Movilidad Vertical",
    subtitle:
      "Especialistas en la instalación, modernización y mantenimiento de sistemas de ascensores y escaleras mecánicas con estándares internacionales.",
    ctas: [{ text: "Soluciones en Elevación", href: "/servicios/ascensores", primary: true }],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Vanguardia en Equipamiento Tecnológico",
    subtitle:
      "Suministro de hardware corporativo, servidores e infraestructura de redes. Equipos de última generación respaldados por 3 años de garantía integral.",
    ctas: [{ text: "División Tecnológica", href: "/servicios/tecnologia", primary: true }],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative h-[82dvh] md:h-[calc(100dvh-100px)] w-full overflow-hidden">
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
            {slide.overline && (
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                {slide.overline}
              </p>
            )}

            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-200 sm:text-xl md:max-w-3xl">
              {slide.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              {slide.ctas.map((cta) => (
                <a
                  key={cta.text}
                  href={cta.href}
                  className={
                    cta.primary
                      ? "rounded-lg bg-corporativo-blue px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-corporativo-blue/90 hover:shadow-xl"
                      : "rounded-lg border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-corporativo-gray"
                  }
                >
                  {cta.text}
                </a>
              ))}
            </div>
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
              index === currentIndex ? "w-10 bg-corporativo-blue" : "w-3 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
