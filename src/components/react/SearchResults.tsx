import { useEffect, useState } from "react";
import { techProducts, type TechProduct } from "../../data/techCatalog";
import SearchResultCard from "./SearchResultCard";

export default function SearchResults() {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<TechProduct[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? "";
    setQuery(q);

    const term = q.trim().toLowerCase();
    if (!term) {
      setResults([]);
      return;
    }

    setResults(
      techProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      )
    );
  }, []);

  // Evita parpadeo de "sin resultados" mientras se lee la URL en el primer render.
  if (query === null) return null;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Resultados de búsqueda</h1>

      {query ? (
        <p className="mb-8 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{results.length}</span> resultado
          {results.length === 1 ? "" : "s"} para &ldquo;{query}&rdquo;
        </p>
      ) : (
        <p className="mb-8 text-sm text-gray-500">Escribe un término en el buscador para ver resultados.</p>
      )}

      {query && results.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900">No se encontraron resultados para &ldquo;{query}&rdquo;</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Prueba con otro término, o contáctanos y te ayudamos a encontrar la solución exacta que tu empresa
            necesita.
          </p>
          <a
            href="/contactanos"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-corporativo-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-corporativo-blue/90 no-underline"
          >
            Solicitar Cotización &rarr;
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <SearchResultCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
