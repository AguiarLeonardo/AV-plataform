import { techProducts, type TechProduct } from "./techCatalog";

export interface StoreItem {
  name: string;
  slug: string;
  href: string;
}

export interface StoreGroup {
  name: string;
  slug: string;
  href: string;
  items: StoreItem[];
}

export interface StoreCategory {
  name: string;
  slug: string;
  href: string;
  groups: StoreGroup[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeItem(name: string): StoreItem {
  const slug = slugify(name);
  return { name, slug, href: `/store/${slug}` };
}

function makeGroup(name: string, itemNames: string[]): StoreGroup {
  const slug = slugify(name);
  return { name, slug, href: `/store/${slug}`, items: itemNames.map(makeItem) };
}

function makeCategory(name: string, groups: StoreGroup[]): StoreCategory {
  const slug = slugify(name);
  return { name, slug, href: `/store/${slug}`, groups };
}

// Tomado de categorias_productos_asiaven.md (Categoría > Grupo > Ítem)
export const storeCategories: StoreCategory[] = [
  makeCategory("Productos", [
    makeGroup("Equipos de Cómputo", [
      "Computadoras de escritorio",
      "Mini-PC",
      "Monitores",
      "Laptops",
      "Ultrabooks",
      "Tabletas",
      "Todo en Uno (AIO)",
      "Impresoras",
      "Servidores",
    ]),
    makeGroup("Infraestructura y Redes", [
      "Infraestructura",
      "Routers",
      "Switches",
      "Almacenamiento",
      "Radio enlaces",
      "Bases",
      "Centros de cómputo",
      "Redes inalámbricas y cableado",
    ]),
    makeGroup("Audiovisual y Señalización Digital", [
      "Pantallas LED",
      "Tótems",
      "Videowall",
      "Digital Signage",
      "Pole Advertising",
      "Videoconferencias",
      "Salas Situacionales",
    ]),
    makeGroup("Telecomunicaciones y Movilidad", ["Teléfonos celulares (Smartphones)"]),
    makeGroup("Energía y Climatización", [
      "Reguladores de voltaje y UPS",
      "Aires acondicionados de precisión",
    ]),
  ]),
  makeCategory("Soluciones Empresariales", [
    makeGroup("Servicios Profesionales", [
      "Diseño",
      "Fabricación",
      "Consultoría",
      "Procura",
      "Suministro",
      "Mantenimiento",
    ]),
    makeGroup("Seguridad", ["Control de acceso y videovigilancia", "Cyberseguridad"]),
    makeGroup("Desarrollo Tecnológico", ["Desarrollo de Software y Aplicaciones"]),
    makeGroup("Formación y Capacitación", ["Cursos y Talleres"]),
    makeGroup("Espacios de Trabajo y Eventos", ["Salas de eventos y conferencias", "Coworking", "Metro-Hub"]),
    makeGroup("Gestión de Proyectos", ["Desarrollo y manejo de proyectos"]),
    makeGroup("Inteligencia Artificial", ["IA"]),
  ]),
];

// Algunos ítems del catálogo definitivo tienen un nombre distinto al
// subcategorySlug real ya cargado en techCatalog.ts. Este mapa los conecta.
const slugAliases: Record<string, string> = {
  "centros-de-computo": "centros-de-computos",
  "reguladores-de-voltaje-y-ups": "ups",
  "aires-acondicionados-de-precision": "aires-de-precision",
  "desarrollo-de-software-y-aplicaciones": "desarrollo-de-software",
  "desarrollo-y-manejo-de-proyectos": "gestion-de-proyectos",
};

const realSubcategorySlugs = new Set(techProducts.map((product) => product.subcategorySlug));

export function resolveRealSlug(itemSlug: string): string | null {
  const resolved = slugAliases[itemSlug] ?? itemSlug;
  return realSubcategorySlugs.has(resolved) ? resolved : null;
}

export function productsForItem(itemSlug: string): TechProduct[] {
  const realSlug = resolveRealSlug(itemSlug);
  return realSlug ? techProducts.filter((product) => product.subcategorySlug === realSlug) : [];
}

export function productsForGroup(group: StoreGroup): TechProduct[] {
  return group.items.flatMap((item) => productsForItem(item.slug));
}

export function productsForCategory(category: StoreCategory): TechProduct[] {
  return category.groups.flatMap((group) => productsForGroup(group));
}

export function hrefForRealSubcategory(realSlug: string): string {
  for (const category of storeCategories) {
    for (const group of category.groups) {
      for (const item of group.items) {
        if (resolveRealSlug(item.slug) === realSlug) return item.href;
      }
    }
  }
  return "/store";
}

export function findTaxonomyPath(
  realSlug: string
): { category: StoreCategory; group: StoreGroup; item: StoreItem } | null {
  for (const category of storeCategories) {
    for (const group of category.groups) {
      for (const item of group.items) {
        if (resolveRealSlug(item.slug) === realSlug) return { category, group, item };
      }
    }
  }
  return null;
}
