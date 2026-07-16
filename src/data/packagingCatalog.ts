export interface PackagingProduct {
  title: string;
  slug: string;
  group?: string;
  specs: Record<string, string>;
}

export interface PackagingSubcategory {
  slug: string;
  title: string;
  description?: string;
  products: PackagingProduct[];
}

export interface PackagingCategory {
  slug: string;
  title: string;
  image: string;
  shortDescription: string;
  description: string;
  subcategories: PackagingSubcategory[];
}

const CAN_IMAGE_1 = "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=1200";
const CAN_IMAGE_2 = "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=1200";
const CAN_IMAGE_3 = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200";

export const packagingCategories: PackagingCategory[] = [
  {
    slug: "latas-tres-piezas",
    title: "Línea de Latas de Tres Piezas",
    image: CAN_IMAGE_1,
    shortDescription: "Alimentos secos, bebidas y tanques especiales en construcción de tres piezas.",
    description:
      "Latas de tres partes (cuerpo del tanque, tapa de aluminio fácil de abrir y cubierta inferior) con excelente hermeticidad y bloqueo de luz. Cubre desde alimentos secos hasta bebidas y presentaciones especiales de tanque.",
    subcategories: [
      {
        slug: "alimentos-secos",
        title: "Alimentos Secos",
        description:
          "Producto hecho de materiales que cumplen con los estándares nacionales de seguridad alimentaria, con tres partes: cuerpo del tanque, tapa de aluminio fácil de abrir y cubierta inferior. Excelente hermeticidad y bloqueo de luz. Contenido principal: cereales, frijoles, frutos secos, pescado y otras materias primas vegetales. Vida útil hasta 24 meses.",
        products: [
          {
            title: "209/211/209x309",
            slug: "209-211-209x309",
            specs: { "Capacidad (g)": "250", "Altura del Tanque (mm)": "91.50±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "209/211/209x400",
            slug: "209-211-209x400",
            specs: { "Capacidad (g)": "280", "Altura del Tanque (mm)": "102.40±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "209/211/209x408",
            slug: "209-211-209x408",
            specs: { "Capacidad (g)": "320", "Altura del Tanque (mm)": "113.50±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "209/211/209x413",
            slug: "209-211-209x413",
            specs: { "Capacidad (g)": "360", "Altura del Tanque (mm)": "122.00±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "209/211/209x507",
            slug: "209-211-209x507",
            specs: { "Capacidad (g)": "430", "Altura del Tanque (mm)": "138.50±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
        ],
      },
      {
        slug: "bebidas",
        title: "Bebidas",
        description:
          "Materiales que cumplen estándares nacionales de seguridad alimentaria; tres partes: cuerpo del tanque, tapa de aluminio fácil de abrir y cubierta interior. Excelente hermeticidad y bloqueo de luz. Vida útil +18 meses. Usos: bebidas proteicas (leche de soja, jugo de coco, rocío de almendra, leche de nuez), bebidas de té de hierbas, bebidas de jugo (mango, naranja, pera, sidra de manzana, mora, durazno) y bebidas gaseosas o funcionales.",
        products: [
          {
            title: "113/202/200x307",
            slug: "113-202-200x307",
            specs: { "Capacidad (mL)": "145", "Altura del Tanque (mm)": "87.50±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "113/202/200x401",
            slug: "113-202-200x401",
            specs: { "Capacidad (mL)": "180", "Altura del Tanque (mm)": "103.50±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "113/202/200x504",
            slug: "113-202-200x504",
            specs: { "Capacidad (mL)": "240", "Altura del Tanque (mm)": "133.00±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "113/202/200x512",
            slug: "113-202-200x512",
            specs: { "Capacidad (mL)": "270", "Altura del Tanque (mm)": "146.50±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "200/202/200x401",
            slug: "200-202-200x401",
            specs: { "Capacidad (mL)": "180", "Altura del Tanque (mm)": "103.50±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "200/202/200x504",
            slug: "200-202-200x504",
            specs: { "Capacidad (mL)": "240", "Altura del Tanque (mm)": "133.00±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "206/211/209x309",
            slug: "206-211-209x309",
            specs: { "Capacidad (mL)": "240~250", "Altura del Tanque (mm)": "91.50±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "206/211/209x400",
            slug: "206-211-209x400",
            specs: { "Capacidad (mL)": "280", "Altura del Tanque (mm)": "102.40±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
          {
            title: "206/211/209x408",
            slug: "206-211-209x408",
            specs: { "Capacidad (mL)": "310", "Altura del Tanque (mm)": "113.50±0.20", "Diámetro Interior (mm)": "65.30±0.15" },
          },
        ],
      },
      {
        slug: "tanque-especial",
        title: "Tanque Especial",
        description:
          "Familia de tanques especiales derivados de la línea de tres piezas: refuerzo estructural para ahorro de material, cuerpos aerodinámicos con sección antideslizante, formatos de consumo individual, presentaciones para cerveza, gran capacidad para eventos, y tarros especializados para sardinas con vida útil extendida (+3 años).",
        products: [
          {
            title: "200/202/200x504 Refuerzo",
            slug: "200-202-200x504-refuerzo",
            group: "Tanque Reforzado",
            specs: {
              "Descripción": "Añade refuerzo sobre la base de lata ordinaria de tres piezas. Grosor de acero menor que un tanque sin refuerzo del mismo diámetro, ahorra materia prima y reduce costo.",
              "Capacidad (mL)": "240",
              "Altura del Tanque (mm)": "133.00±0.20",
              "Diámetro Interior (mm)": "52.30±0.15",
            },
          },
          {
            title: "206/211/209x610 Refuerzo",
            slug: "206-211-209x610-refuerzo",
            group: "Tanque Reforzado",
            specs: { "Capacidad (mL)": "500", "Altura del Tanque (mm)": "170.50±0.20", "Diámetro Interior (mm)": "52.30±0.15" },
          },
          {
            title: "200/206/202x410 Especial",
            slug: "200-206-202x410-especial",
            group: "Tanque en Forma",
            specs: {
              "Descripción": "Cuerpo aerodinámico, más estético que el cilíndrico tradicional; genera impacto visual en anaquel. Sección media-inferior cóncava, antideslizante.",
              "Capacidad (mL)": "240",
              "Altura del Tanque (mm)": "117.50±0.20",
              "Diámetro Interior": "Cambia el diámetro",
            },
          },
          {
            title: "200/206/204x508",
            slug: "200-206-204x508",
            group: "Latas 204",
            specs: {
              "Descripción": "Diámetro 57.3mm, buen agarre. Capacidad 300ml, ideal para consumo individual. Proporción área 0.382, fuerte estética.",
              "Capacidad (mL)": "300",
              "Altura del Tanque (mm)": "140.50±0.20",
              "Diámetro Interior (mm)": "57.30±0.15",
            },
          },
          {
            title: "307/309/307x707",
            slug: "307-309-307x707",
            group: "Lata de Cerveza",
            specs: {
              "Descripción": "Adecuada para bebidas de cerveza seca. Buena hermeticidad y bloqueo de luz. Vida útil +18 meses.",
              "Capacidad (mL)": "968",
              "Altura del Tanque (mm)": "189.00±0.20",
              "Diámetro Interior (mm)": "86.30±0.15",
            },
          },
          {
            title: "307/309/307x713",
            slug: "307-309-307x713",
            group: "Lata de Cerveza",
            specs: { "Capacidad (mL)": "1000", "Altura del Tanque (mm)": "199.00±0.20", "Diámetro Interior (mm)": "86.30±0.15" },
          },
          {
            title: "300/307/305x802 Refuerzo",
            slug: "300-307-305x802-refuerzo",
            group: "Gran Capacidad",
            specs: {
              "Descripción": "960ml, adecuada para reuniones, banquetes de bodas y ocasiones grandes.",
              "Capacidad (mL)": "960",
              "Altura del Tanque (mm)": "(dato incompleto en el PDF)",
              "Diámetro Interior (mm)": "83.30±0.15",
            },
          },
          {
            title: "202/202/200x308",
            slug: "202-202-200x308",
            group: "Tarro para Sardinas",
            specs: {
              "Descripción": "Material y recubrimiento adaptados a las sardinas enlatadas. Vida útil +3 años.",
              "Capacidad (g)": "155",
              "Altura del Tanque (mm)": "88.80±0.20",
              "Diámetro Interior (mm)": "52.50±0.15",
            },
          },
          {
            title: "300/300/214x407 Refuerzo",
            slug: "300-300-214x407-refuerzo",
            group: "Tarro para Sardinas",
            specs: { "Capacidad (g)": "425", "Altura del Tanque (mm)": "109.65±0.15", "Diámetro Interior (mm)": "73.00±0.15" },
          },
        ],
      },
    ],
  },
  {
    slug: "latas-de-aluminio",
    title: "Línea Latas de Aluminio",
    image: CAN_IMAGE_2,
    shortDescription: "Latas de dos piezas: tanque estándar, de fibra delgada y de cuerpo delgado, 100% reciclables.",
    description:
      "Latas de dos piezas — construcción distinta a las de tres piezas, aunque también se usan para bebidas. Ventajas sobre las latas de tres piezas para esterilización a alta temperatura: 100% reciclables, bajo consumo energético, buena resistencia a corrosión, ligeras y de alta eficiencia de producción.",
    subcategories: [
      {
        slug: "tanque-estandar",
        title: "Tanque Estándar (202/211, 206/211)",
        description:
          "Ventajas sobre latas de tres piezas para esterilización a alta temperatura. 100% reciclable, bajo consumo energético. Buena resistencia a corrosión, difícil de romper o reventar. Ligero, alta eficiencia de producción, reduce costos. Calibres 202/206 diferentes, con cuellos retraídos.",
        products: [
          {
            title: "202/211x310",
            slug: "202-211x310",
            specs: { "Altura (mm)": "92.00±0.38", "Diámetro Interior (mm)": "52.40±0.25", "Capacidad": "250ml" },
          },
          {
            title: "206/211x310",
            slug: "206-211x310",
            specs: { "Altura (mm)": "92.00±0.38", "Diámetro Interior (mm)": "57.40±0.25", "Capacidad": "250ml" },
          },
          {
            title: "202/211x408",
            slug: "202-211x408",
            specs: { "Altura (mm)": "115.20±0.38", "Diámetro Interior (mm)": "52.40±0.25", "Capacidad": "330ml" },
          },
          {
            title: "206/211x408",
            slug: "206-211x408",
            specs: { "Altura (mm)": "115.20±0.38", "Diámetro Interior (mm)": "57.40±0.25", "Capacidad": "330ml" },
          },
          {
            title: "202/211x610",
            slug: "202-211x610",
            specs: { "Altura (mm)": "167.84±0.38", "Diámetro Interior (mm)": "52.40±0.25", "Capacidad": "500ml" },
          },
          {
            title: "206/211x610",
            slug: "206-211x610",
            specs: { "Altura (mm)": "167.84±0.38", "Diámetro Interior (mm)": "57.40±0.25", "Capacidad": "500ml" },
          },
        ],
      },
      {
        slug: "tanque-de-fibra-delgado",
        title: "Tanque de Fibra Delgado (200/204, 202/204)",
        description: "Mismas ventajas de reciclaje y resistencia a corrosión que el estándar.",
        products: [
          {
            title: "200/202x504",
            slug: "200-202x504",
            specs: { "Altura (mm)": "134.00±0.38", "Diámetro Interior (mm)": "50.00±0.25", "Capacidad": "250ml" },
          },
        ],
      },
      {
        slug: "lata-de-cuerpo-delgado",
        title: "Lata de Cuerpo Delgado (200/204, 202/204)",
        description:
          "Lata pequeña/delgada alineada con la mecánica de la palma humana; favorece bebidas de café, jugo y cerveza en formatos de menor volumen; 100% reciclable/reutilizable; menor tamaño, peso y costo de almacenamiento/transporte.",
        products: [
          {
            title: "200/204x312",
            slug: "200-204x312",
            specs: { "Altura (mm)": "50.00±0.25", "Diámetro Interior (mm)": "95.63±0.38", "Capacidad": "200mL" },
          },
          {
            title: "202/204x312",
            slug: "202-204x312",
            specs: { "Altura (mm)": "52.40±0.25", "Diámetro Interior (mm)": "95.63±0.38", "Capacidad": "200mL" },
          },
          {
            title: "200/204x408",
            slug: "200-204x408",
            specs: { "Altura (mm)": "50.00±0.25", "Diámetro Interior (mm)": "115.00±0.38", "Capacidad": "250mL" },
          },
          {
            title: "202/204x408",
            slug: "202-204x408",
            specs: { "Altura (mm)": "52.40±0.25", "Diámetro Interior (mm)": "115.00±0.38", "Capacidad": "250mL" },
          },
          {
            title: "200/204x413",
            slug: "200-204x413",
            specs: { "Altura (mm)": "50.00±0.25", "Diámetro Interior (mm)": "122.55±0.38", "Capacidad": "270mL" },
          },
          {
            title: "202/204x413",
            slug: "202-204x413",
            specs: { "Altura (mm)": "52.40±0.25", "Diámetro Interior (mm)": "122.55±0.38", "Capacidad": "270mL" },
          },
          {
            title: "200/204x507",
            slug: "200-204x507",
            specs: { "Altura (mm)": "50.00±0.25", "Diámetro Interior (mm)": "138.56±0.38", "Capacidad": "310mL" },
          },
          {
            title: "202/204x507",
            slug: "202-204x507",
            specs: { "Altura (mm)": "52.40±0.25", "Diámetro Interior (mm)": "138.56±0.38", "Capacidad": "310mL" },
          },
          {
            title: "200/204x514",
            slug: "200-204x514",
            specs: { "Altura (mm)": "50.00±0.25", "Diámetro Interior (mm)": "146.05±0.38", "Capacidad": "330mL" },
          },
          {
            title: "202/204x512",
            slug: "202-204x512",
            specs: { "Altura (mm)": "52.40±0.25", "Diámetro Interior (mm)": "146.05±0.38", "Capacidad": "330mL" },
          },
        ],
      },
    ],
  },
  {
    slug: "botellas-de-aluminio",
    title: "Línea Botellas de Aluminio",
    image: CAN_IMAGE_3,
    shortDescription: "Alcohol, refrescos y condimentos líquidos en formato premium antifalsificación.",
    description:
      "Adecuadas para servir alcohol, refrescos y condimentos líquidos. Apariencia delicada, material ligero, agarre excelente. Alta resistencia a corrosión, difícil de romper o reventar, alta seguridad. Tecnología antifalsificación de alta calidad, recomendada para productos premium. Proceso de moldeado integrado, excelente sellado. Cumple normas ambientales, 100% reciclable.",
    subcategories: [
      {
        slug: "botellas",
        title: "Botellas de Aluminio",
        products: [
          {
            title: "355ml Boca Plana",
            slug: "355ml-boca-plana",
            specs: { "Altura Tanque (mm)": "194.6±0.5", "Altura Total (mm)": "355", "Diámetro Interior (mm)": "20.5±0.5" },
          },
          {
            title: "355ml Boca Tornillo",
            slug: "355ml-boca-tornillo",
            specs: { "Altura Tanque (mm)": "194.6±0.5", "Altura Total (mm)": "355", "Diámetro Interior (mm)": "20.5±0.5" },
          },
          {
            title: "473ml Boca Plana",
            slug: "473ml-boca-plana",
            specs: { "Altura Tanque (mm)": "238±0.5", "Altura Total (mm)": "473", "Diámetro Interior (mm)": "20.5±0.5", "Notas": "Gran capacidad" },
          },
          {
            title: "473ml Boca Rotativa",
            slug: "473ml-boca-rotativa",
            specs: { "Altura Tanque (mm)": "238±0.5", "Altura Total (mm)": "473", "Diámetro Interior (mm)": "20.5±0.5", "Notas": "Gran capacidad" },
          },
        ],
      },
    ],
  },
  {
    slug: "cubierta-de-aluminio",
    title: "Línea Cubierta de Aluminio",
    image: CAN_IMAGE_1,
    shortDescription: "Cubiertas superiores e inferiores en distintos calibres y sistemas de apertura.",
    description:
      "Cubiertas superiores (con sistemas abre-fácil, completo abierto o cerrado) e inferiores para las líneas de latas de tres piezas. Cada calibre está diseñado para garantizar el sellado hermético requerido según el tipo de producto contenido.",
    subcategories: [
      {
        slug: "cubierta-superior",
        title: "Cubierta Superior",
        products: [
          {
            title: "RPT113 Abre-fácil",
            slug: "rpt113-abre-facil",
            specs: {
              "Diámetro Exterior (mm)": "54.40±0.12",
              "Apertura del Borde (mm)": "—",
              "Profundidad (mm)": "5.40±0.12",
              "Altura del Borde (mm)": "2.00±0.12",
              "Altura del Anillo (mm)": "1.30±0.12",
            },
          },
          {
            title: "JO200 Abre-fácil",
            slug: "jo200-abre-facil",
            specs: {
              "Diámetro Exterior (mm)": "59.00±0.15",
              "Apertura del Borde (mm)": "—",
              "Profundidad (mm)": "6.00±0.12",
              "Altura del Borde (mm)": "2.15±0.16",
              "Altura del Anillo (mm)": "1.25±0.10",
            },
          },
          {
            title: "FO209 Completo abierto",
            slug: "fo209-completo-abierto",
            specs: {
              "Diámetro Exterior (mm)": "72.02±0.15",
              "Apertura del Borde (mm)": "≥3.70",
              "Profundidad (mm)": "4.88±0.12",
              "Altura del Borde (mm)": "2.06±0.12",
              "Altura del Anillo (mm)": "1.09±0.10",
            },
          },
          {
            title: "CE209 Cubierta Cerrada",
            slug: "ce209-cubierta-cerrada",
            specs: {
              "Diámetro Exterior (mm)": "71.85±0.25",
              "Apertura del Borde (mm)": "≥3.70",
              "Profundidad (mm)": "3.60±0.15",
              "Altura del Borde (mm)": "2.04±0.20",
              "Altura del Anillo (mm)": "1.25±0.10",
            },
          },
        ],
      },
      {
        slug: "cubierta-inferior",
        title: "Cubierta Inferior",
        products: [
          {
            title: "200D",
            slug: "200d",
            specs: {
              "Diámetro Exterior (mm)": "58.85±0.10",
              "Altura del Borde (mm) [1]": "1.95±0.10",
              "Apertura del Borde (mm)": "≥3.07",
              "Altura del Borde (mm) [2]": "3.10±0.10",
            },
          },
          {
            title: "204",
            slug: "204",
            specs: {
              "Diámetro Exterior (mm)": "63.70±0.10",
              "Altura del Borde (mm) [1]": "1.95±0.10",
              "Apertura del Borde (mm)": "≥3.07",
              "Altura del Borde (mm) [2]": "3.50±0.10",
            },
          },
          {
            title: "209",
            slug: "209",
            specs: {
              "Diámetro Exterior (mm)": "72.10±0.10",
              "Altura del Borde (mm) [1]": "1.95±0.10",
              "Apertura del Borde (mm)": "≥3.07",
              "Altura del Borde (mm) [2]": "3.12±0.10",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "tapas-giratorias",
    title: "Línea Tapas Giratorias Tipo Garra",
    image: CAN_IMAGE_2,
    shortDescription: "Modelos X30 a X82 en variantes de cubierta normal, media y alta.",
    description:
      "Modelos de tapas metálicas giratorias (roscadas a presión) en distintos calibres (X30 a X82), disponibles en variantes de cubierta normal (RTO/RTB/RTS/RSB), media (FTB/FSB) y alta (MTO/MTB/DTO/DTB), con diferentes acabados de color (ej. 30MTB, 30MTO, 38RTB, 66FTB, 66FTO, 82FSB).",
    subcategories: [
      {
        slug: "modelos",
        title: "Modelos X30–X82",
        products: [
          { title: "X30", slug: "x30", specs: { "Variantes disponibles": "MTO, MTB, DTO" } },
          { title: "X38", slug: "x38", specs: { "Variantes disponibles": "RTO, RTB, DTO, DTB" } },
          { title: "X43", slug: "x43", specs: { "Variantes disponibles": "RTO, RTB" } },
          { title: "X48", slug: "x48", specs: { "Variantes disponibles": "RTO, RTB, DTO, DTB" } },
          { title: "X53", slug: "x53", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB" } },
          { title: "X58", slug: "x58", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB" } },
          { title: "X63", slug: "x63", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB" } },
          { title: "X66", slug: "x66", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB, FTB, FSB, DTO, DTB" } },
          { title: "X70", slug: "x70", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB, DTO, DTB" } },
          { title: "X77", slug: "x77", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB" } },
          { title: "X82", slug: "x82", specs: { "Variantes disponibles": "RTO, RTB, RTS, RSB, FTB, FSB" } },
        ],
      },
    ],
  },
];

export function findProductBySlug(productSlug: string) {
  for (const category of packagingCategories) {
    for (const subcategory of category.subcategories) {
      const product = subcategory.products.find((p) => p.slug === productSlug);
      if (product) return { category, subcategory, product };
    }
  }
  return undefined;
}
