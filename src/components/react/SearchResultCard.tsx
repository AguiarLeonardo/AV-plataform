import { useRef, useState } from "react";
import type { TechProduct } from "../../data/techCatalog";
import { fakePriceValue } from "../../utils/fakePrice";
import { addToCart } from "../../store/quoteCart";

interface Props {
  product: TechProduct;
}

// Versión React de StoreProductCard.astro (mismo diseño visual) — necesaria
// porque esta página se renderiza 100% en cliente para poder leer ?q= de la URL.
export default function SearchResultCard({ product }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>();
  const visibleCount = 2;
  const visibleSpecs = product.features.slice(0, visibleCount);
  const extraSpecs = product.features.slice(visibleCount);
  const specsToShow = isExpanded ? product.features : visibleSpecs;

  const handleAddToQuote = () => {
    addToCart({
      id: product.id,
      name: product.title,
      fakePrice: fakePriceValue(product.id),
    });
    setAdded(true);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-40 items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">{product.title}</h3>
      </div>

      <ul className="mt-3 flex flex-col gap-1 text-xs text-gray-500">
        {specsToShow.map((spec) => (
          <li key={spec} className="flex items-start gap-1.5">
            <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
            <span>{spec}</span>
          </li>
        ))}
      </ul>

      {extraSpecs.length > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-1 self-start text-xs font-semibold text-corporativo-blue hover:underline"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToQuote}
          disabled={added}
          className="w-full rounded-md bg-corporativo-blue py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-corporativo-blue/90"
        >
          {added ? "¡Agregado!" : "Agregar a Cotización"}
        </button>
        <a
          href={`/store/producto/${product.slug}`}
          className="w-full rounded-md border border-corporativo-blue py-2 text-center text-sm font-semibold text-corporativo-blue no-underline transition-colors hover:bg-blue-50"
        >
          Saber más
        </a>
      </div>
    </div>
  );
}
