import { useEffect, useState } from "react";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";
import { storeCategories, type StoreCategory } from "../../data/storeTaxonomy";
import { CART_EVENT, getCartCount } from "../../store/quoteCart";

// El mega menú de "Equipo a Medida" no agrupa por título de categoría — es
// una fila horizontal simple de 4 tarjetas.
const btoItems = [
  { name: "Laptops Corporativas", href: "/store/medida/laptops" },
  { name: "PCs de Escritorio", href: "/store/medida/desktops" },
  { name: "Workstations", href: "/store/medida/workstations" },
  { name: "Servidores", href: "/store/medida/servidores" },
];

const supportGroups: { name: string; items: { name: string; href?: string }[] }[] = [
  {
    name: "Recursos de Ayuda",
    items: [
      { name: "Software y Drivers", href: "/store/soporte/descargas" },
      { name: "Consultar la garantía", href: "/store/garantia" },
      { name: "Preguntas frecuentes", href: "/store/soporte/faq" },
    ],
  },
  {
    name: "Asistencia Directa",
    items: [
      { name: "Soporte y solución de problemas", href: "/store/soporte/ticket" },
      { name: "Contactar a Ventas", href: "/store/soporte/contacto-ventas" },
    ],
  },
];

interface Props {
  currentPath?: string;
}

interface ActiveState {
  // null = la URL actual no pertenece a ninguna categoría (ej. /store, /store/soporte/*, /store/medida/*).
  categoryIndex: number | null;
  groupIndex: number | null;
}

function resolveActiveFromPath(currentPath: string): ActiveState {
  const slug = currentPath.replace(/^\/store\/?/, "").replace(/\/$/, "");

  for (let ci = 0; ci < storeCategories.length; ci++) {
    const category = storeCategories[ci];
    if (category.slug === slug) return { categoryIndex: ci, groupIndex: null };

    for (let gi = 0; gi < category.groups.length; gi++) {
      const group = category.groups[gi];
      if (group.slug === slug || group.items.some((item) => item.slug === slug)) {
        return { categoryIndex: ci, groupIndex: gi };
      }
    }
  }

  return { categoryIndex: null, groupIndex: null };
}

export default function StoreNavigation({ currentPath = "/store" }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [btoOpen, setBtoOpen] = useState(false);
  const [active, setActive] = useState<ActiveState>(() => resolveActiveFromPath(currentPath));
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Acordeón móvil: identifica la sección expandida por su slug ("bto", "support" o el slug de la categoría).
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const isStoreRoot = currentPath === "/store" || currentPath === "/store/";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  };

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());
    syncCartCount();
    window.addEventListener(CART_EVENT, syncCartCount);
    window.addEventListener("storage", syncCartCount);
    return () => {
      window.removeEventListener(CART_EVENT, syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  const activeCategory: StoreCategory | null =
    active.categoryIndex !== null ? storeCategories[active.categoryIndex] : null;
  const activeGroup = active.groupIndex !== null ? activeCategory?.groups[active.groupIndex] ?? null : null;
  const isBtoActive = currentPath.startsWith("/store/medida");
  const isSupportActive = currentPath.startsWith("/store/soporte");

  const selectGroup = (categoryIndex: number, groupIndex: number | null) => {
    setActive({ categoryIndex, groupIndex });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    window.location.href = `/store/busqueda?q=${encodeURIComponent(term)}`;
  };

  return (
    <div className="w-full">
      <div
        className="relative"
        onMouseLeave={() => {
          setHoverIndex(null);
          setSupportOpen(false);
          setBtoOpen(false);
        }}
      >
        <header className="w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <a href="/store" className="flex-shrink-0 text-xl font-bold tracking-tight text-gray-900 no-underline">
              ASIAVEN <span className="text-corporativo-blue">Store</span>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {storeCategories.map((category, ci) => (
                <button
                  key={category.slug}
                  type="button"
                  onMouseEnter={() => {
                    setHoverIndex(ci);
                    setSupportOpen(false);
                    setBtoOpen(false);
                  }}
                  onClick={() => {
                    setHoverIndex((prev) => (prev === ci ? null : ci));
                    setSupportOpen(false);
                    setBtoOpen(false);
                  }}
                  className={`whitespace-nowrap text-sm transition-colors ${
                    ci === active.categoryIndex
                      ? "font-bold text-black"
                      : "font-normal text-gray-600 hover:font-semibold hover:text-gray-900 focus-visible:font-semibold focus-visible:text-gray-900"
                  }`}
                >
                  {category.name}
                </button>
              ))}
              <button
                type="button"
                onMouseEnter={() => {
                  setHoverIndex(null);
                  setSupportOpen(false);
                  setBtoOpen(true);
                }}
                onClick={() => {
                  setBtoOpen((prev) => !prev);
                  setHoverIndex(null);
                  setSupportOpen(false);
                }}
                className={`whitespace-nowrap text-sm transition-colors ${
                  isBtoActive
                    ? "font-bold text-black"
                    : "font-normal text-gray-600 hover:font-semibold hover:text-gray-900 focus-visible:font-semibold focus-visible:text-gray-900"
                }`}
              >
                Equipo a Medida
              </button>
              <button
                type="button"
                onMouseEnter={() => {
                  setHoverIndex(null);
                  setSupportOpen(true);
                  setBtoOpen(false);
                }}
                onClick={() => {
                  setSupportOpen((prev) => !prev);
                  setHoverIndex(null);
                  setBtoOpen(false);
                }}
                className={`whitespace-nowrap text-sm transition-colors ${
                  isSupportActive
                    ? "font-bold text-black"
                    : "font-normal text-gray-600 hover:font-semibold hover:text-gray-900 focus-visible:font-semibold focus-visible:text-gray-900"
                }`}
              >
                Soporte Técnico
              </button>
            </nav>

            <div className="flex flex-shrink-0 items-center gap-5">
              <a
                href="/store/cotizacion"
                aria-label="Ver cotización"
                className="relative text-gray-700 transition-colors hover:text-gray-900"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </a>
              <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  aria-label="Buscar productos"
                  className="w-56 rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:border-corporativo-blue focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Buscar"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                >
                  <Search className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                onClick={() => {
                  setMobileMenuOpen((prev) => !prev);
                  setMobileExpanded(null);
                }}
                className="text-gray-700 transition-colors hover:text-gray-900 md:hidden"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </header>

        {hoverIndex !== null && storeCategories[hoverIndex].groups.length > 0 && (
          <div className="absolute inset-x-0 top-full z-30 border-t border-gray-100 bg-white shadow-lg">
            <div
              className="mx-auto grid max-w-7xl gap-8 px-6 py-8"
              style={{ gridTemplateColumns: `repeat(${storeCategories[hoverIndex].groups.length}, minmax(0, 1fr))` }}
            >
              {storeCategories[hoverIndex].groups.map((group, gi) => (
                <div key={group.slug}>
                  <span className="mb-3 block cursor-default text-sm font-bold text-gray-900 select-none">
                    {group.name}
                  </span>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <a
                          href={item.href}
                          onClick={() => selectGroup(hoverIndex, gi)}
                          className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {btoOpen && (
          <div className="absolute inset-x-0 top-full z-30 border-t border-gray-100 bg-white shadow-lg">
            <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
              {btoItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-lg bg-gray-50 p-4 text-center text-sm font-semibold text-gray-900 no-underline transition-colors hover:bg-gray-100"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {supportOpen && (
          <div className="absolute inset-x-0 top-full z-30 border-t border-gray-100 bg-white shadow-lg">
            <div
              className="mx-auto grid max-w-7xl gap-8 px-6 py-8"
              style={{ gridTemplateColumns: `repeat(${supportGroups.length}, minmax(0, 1fr))` }}
            >
              {supportGroups.map((group) => (
                <div key={group.name}>
                  <span className="mb-3 block cursor-default text-sm font-bold text-gray-900 select-none">
                    {group.name}
                  </span>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) =>
                      item.href ? (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                          >
                            {item.name}
                          </a>
                        </li>
                      ) : (
                        <li key={item.name}>
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="w-full border-t border-gray-100 bg-white md:hidden">
          <form onSubmit={handleSearchSubmit} className="px-4 pt-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="¿Qué estás buscando?"
                aria-label="Buscar productos"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:border-corporativo-blue focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
              >
                <Search className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </form>

          <div className="flex flex-col divide-y divide-gray-100 px-4 py-2">
            {storeCategories.map((category, ci) => {
              const expanded = mobileExpanded === category.slug;
              return (
                <div key={category.slug}>
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => (prev === category.slug ? null : category.slug))}
                    aria-expanded={expanded}
                    className={`flex w-full items-center justify-between py-3 text-left text-sm ${
                      ci === active.categoryIndex ? "font-bold text-black" : "text-gray-700"
                    }`}
                  >
                    {category.name}
                    {category.groups.length > 0 && (
                      <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={1.5} />
                    )}
                  </button>
                  {expanded && category.groups.length > 0 && (
                    <div className="flex flex-col gap-4 pb-4 pl-4">
                      {category.groups.map((group, gi) => (
                        <div key={group.slug}>
                          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-900 select-none">
                            {group.name}
                          </span>
                          <ul className="flex flex-col gap-2">
                            {group.items.map((item) => (
                              <li key={item.slug}>
                                <a
                                  href={item.href}
                                  onClick={() => {
                                    selectGroup(ci, gi);
                                    closeMobileMenu();
                                  }}
                                  className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded((prev) => (prev === "bto" ? null : "bto"))}
                aria-expanded={mobileExpanded === "bto"}
                className="flex w-full items-center justify-between py-3 text-left text-sm text-gray-700"
              >
                Equipo a Medida
                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${mobileExpanded === "bto" ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {mobileExpanded === "bto" && (
                <ul className="flex flex-col gap-2 pb-4 pl-4">
                  {btoItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded((prev) => (prev === "support" ? null : "support"))}
                aria-expanded={mobileExpanded === "support"}
                className="flex w-full items-center justify-between py-3 text-left text-sm text-gray-700"
              >
                Soporte Técnico
                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${mobileExpanded === "support" ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {mobileExpanded === "support" && (
                <div className="flex flex-col gap-4 pb-4 pl-4">
                  {supportGroups.map((group) => (
                    <div key={group.name}>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-900 select-none">
                        {group.name}
                      </span>
                      <ul className="flex flex-col gap-2">
                        {group.items.map((item) =>
                          item.href ? (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                              >
                                {item.name}
                              </a>
                            </li>
                          ) : (
                            <li key={item.name}>
                              <span className="text-sm text-gray-600">{item.name}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!isStoreRoot && activeCategory && (
        <div className="w-full border-y border-gray-100 bg-gray-50">
          <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-6 py-3">
            {activeGroup ? (
              activeGroup.items.map((item) => (
                <a
                  key={item.slug}
                  href={item.href}
                  className="whitespace-nowrap text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))
            ) : (
              <a
                href={activeCategory.href}
                className="whitespace-nowrap text-sm font-semibold text-gray-700 no-underline"
              >
                {activeCategory.name}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
