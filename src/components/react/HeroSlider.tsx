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

interface Props {
  slides: Slide[];
  prevLabel: string;
  nextLabel: string;
  goToSlideLabel: string;
}

export default function HeroSlider({ slides, prevLabel, nextLabel, goToSlideLabel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative h-[82dvh] md:h-[calc(100dvh-var(--header-height,104px))] w-full overflow-hidden">
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
        aria-label={prevLabel}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-corporativo-blue hover:opacity-100"
        aria-label={nextLabel}
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
            aria-label={`${goToSlideLabel} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
