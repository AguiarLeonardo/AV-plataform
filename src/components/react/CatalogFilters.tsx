import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

// Data de referencia para la UI de filtros. Los checkboxes/inputs son
// funcionales a nivel de estado local (marcar, limpiar, escribir precio),
// pero -al igual que el placeholder "Mostrar Filtros" que reemplazan en
// CatalogControls.astro- todavía no filtran la grilla de productos: el
// catálogo no tiene campos de línea/RAM/almacenamiento estructurados aún.
// Nota: Asiaven vende exclusivamente equipos de marca propia, por eso el
// filtro es "Línea de Producto" (series propias) y no un filtro de marcas
// de terceros (Dell, HP, etc.).
const productLineOptions = ["Serie Essential", "Serie Pro", "Serie Enterprise", "Workstations"];
const ramOptions = ["8GB", "16GB", "32GB"];
const storageOptions = ["256GB", "512GB", "1TB"];

type SectionId = "disponibilidad" | "precio" | "linea" | "especificaciones";

interface FiltersState {
  inStockOnly: boolean;
  priceMin: string;
  priceMax: string;
  productLines: string[];
  ram: string[];
  storage: string[];
}

const emptyFilters: FiltersState = {
  inStockOnly: false,
  priceMin: "",
  priceMax: "",
  productLines: [],
  ram: [],
  storage: [],
};

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

interface SectionProps {
  id: SectionId;
  title: string;
  isOpen: boolean;
  onToggle: (id: SectionId) => void;
  children: React.ReactNode;
}

function FilterSection({ id, title, isOpen, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-900"
      >
        {title}
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function CatalogFilters() {
  const [filters, setFilters] = useState<FiltersState>(emptyFilters);
  const [openSections, setOpenSections] = useState<Record<SectionId, boolean>>({
    disponibilidad: true,
    precio: true,
    linea: true,
    especificaciones: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAll = () => setFilters(emptyFilters);

  const filterBody = (
    <>
      <FilterSection id="disponibilidad" title="Disponibilidad" isOpen={openSections.disponibilidad} onToggle={toggleSection}>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-corporativo-blue focus:ring-corporativo-blue"
          />
          Solo productos en stock
        </label>
      </FilterSection>

      <FilterSection id="precio" title="Precio" isOpen={openSections.precio} onToggle={toggleSection}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => setFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
          />
          <button
            type="button"
            aria-label="Aplicar rango de precio"
            className="flex-shrink-0 rounded-md border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-corporativo-blue hover:text-corporativo-blue"
          >
            <ChevronDown className="h-4 w-4 -rotate-90" strokeWidth={1.5} />
          </button>
        </div>
      </FilterSection>

      <FilterSection id="linea" title="Línea de Producto" isOpen={openSections.linea} onToggle={toggleSection}>
        <ul className="flex flex-col gap-2">
          {productLineOptions.map((line) => (
            <li key={line}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={filters.productLines.includes(line)}
                  onChange={() => setFilters((prev) => ({ ...prev, productLines: toggleValue(prev.productLines, line) }))}
                  className="h-4 w-4 rounded border-gray-300 text-corporativo-blue focus:ring-corporativo-blue"
                />
                {line}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection id="especificaciones" title="Especificaciones" isOpen={openSections.especificaciones} onToggle={toggleSection}>
        <div className="flex flex-col gap-4">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Memoria RAM</span>
            <ul className="flex flex-col gap-2">
              {ramOptions.map((ram) => (
                <li key={ram}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={filters.ram.includes(ram)}
                      onChange={() => setFilters((prev) => ({ ...prev, ram: toggleValue(prev.ram, ram) }))}
                      className="h-4 w-4 rounded border-gray-300 text-corporativo-blue focus:ring-corporativo-blue"
                    />
                    {ram}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Almacenamiento</span>
            <ul className="flex flex-col gap-2">
              {storageOptions.map((storage) => (
                <li key={storage}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={filters.storage.includes(storage)}
                      onChange={() => setFilters((prev) => ({ ...prev, storage: toggleValue(prev.storage, storage) }))}
                      className="h-4 w-4 rounded border-gray-300 text-corporativo-blue focus:ring-corporativo-blue"
                    />
                    {storage}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
      {/* Disparador móvil */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="mb-6 flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-corporativo-blue hover:text-corporativo-blue lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
        Filtros
      </button>

      {/* Sidebar de escritorio */}
      <aside className="col-span-1 hidden self-start rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-24 lg:block">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Filtros</h2>
          <button type="button" onClick={clearAll} className="text-xs font-semibold text-corporativo-blue hover:underline">
            Limpiar todo
          </button>
        </div>
        {filterBody}
      </aside>

      {/* Off-canvas móvil */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white p-5 shadow-xl transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Filtros</h2>
            <div className="flex items-center gap-4">
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-corporativo-blue hover:underline">
                Limpiar todo
              </button>
              <button type="button" aria-label="Cerrar filtros" onClick={() => setDrawerOpen(false)} className="text-gray-500 hover:text-gray-900">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">{filterBody}</div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="mt-4 w-full rounded-lg bg-corporativo-blue py-3 text-center text-sm font-semibold text-white shadow-lg transition-colors hover:bg-corporativo-blue/90"
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </>
  );
}
