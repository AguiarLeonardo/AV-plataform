import { useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { storeCategories, type StoreCategory } from "../../data/storeTaxonomy";

interface Props {
  currentPath?: string;
}

interface ActiveState {
  categoryIndex: number;
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

  return { categoryIndex: 0, groupIndex: null };
}

export default function StoreNavigation({ currentPath = "/store" }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [active, setActive] = useState<ActiveState>(() => resolveActiveFromPath(currentPath));
  const isStoreRoot = currentPath === "/store" || currentPath === "/store/";

  const activeCategory: StoreCategory = storeCategories[active.categoryIndex];
  const activeGroup = active.groupIndex !== null ? activeCategory.groups[active.groupIndex] : null;

  const selectGroup = (categoryIndex: number, groupIndex: number | null) => {
    setActive({ categoryIndex, groupIndex });
  };

  return (
    <div className="w-full">
      <div className="relative" onMouseLeave={() => setHoverIndex(null)}>
        <header className="w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <a href="/store" className="flex-shrink-0 text-xl font-bold tracking-tight text-gray-900 no-underline">
              ASIAVEN <span className="text-corporativo-blue">Store</span>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {storeCategories.map((category, ci) => (
                <a
                  key={category.slug}
                  href={category.href}
                  onMouseEnter={() => setHoverIndex(ci)}
                  onClick={() => selectGroup(ci, null)}
                  className={`whitespace-nowrap text-sm no-underline transition-colors ${
                    ci === active.categoryIndex ? "font-bold text-black" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {category.name}
                </a>
              ))}
              <a
                href="/soporte-tecnico"
                className="whitespace-nowrap text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
              >
                Soporte Técnico
              </a>
            </nav>

            <div className="flex flex-shrink-0 items-center gap-5">
              <button type="button" aria-label="Carrito de compras" className="text-gray-700 transition-colors hover:text-gray-900">
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button type="button" aria-label="Perfil de usuario" className="text-gray-700 transition-colors hover:text-gray-900">
                <User className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="¿Qué estás buscando?"
                  className="w-56 rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:border-corporativo-blue focus:outline-none"
                />
                <Search
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  strokeWidth={1.5}
                />
              </div>
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
      </div>

      {!isStoreRoot && (
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
