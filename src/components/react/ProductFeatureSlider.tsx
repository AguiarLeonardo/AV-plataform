import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface Product {
  title: string;
  image: string;
  features: string[];
}

interface Props {
  products: Product[];
}

export default function ProductFeatureSlider({ products }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? products.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === products.length - 1 ? 0 : i + 1));
  };

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

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="text-2xl font-extrabold tracking-tight text-corporativo-gray lg:text-3xl">
                {product.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-600">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-corporativo-blue" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {products.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20 flex gap-3 lg:bottom-8 lg:right-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-corporativo-gray shadow-md transition-colors hover:bg-corporativo-blue hover:text-white"
              aria-label="Producto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-corporativo-gray shadow-md transition-colors hover:bg-corporativo-blue hover:text-white"
              aria-label="Producto siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
