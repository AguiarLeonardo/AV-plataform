export interface TechProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategoryName: string;
  subcategorySlug: string;
  image: string;
  description: string;
  features: string[];
}

export const techProducts: TechProduct[] = [
  // ============================================================
  // 1. Computación y Dispositivos de Usuario
  // ============================================================

  // Subcategoría: Laptops
  {
    id: 1,
    title: "Laptop Ejecutiva UltraSlim",
    slug: "laptop-ejecutiva-ultraslim",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Laptops",
    subcategorySlug: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200",
    description:
      "Portátil ultradelgada de gama ejecutiva, diseñada para movilidad corporativa sin comprometer rendimiento ni autonomía de batería.",
    features: [
      "Procesador: Intel Core i7-1355U (13ª Gen)",
      "Memoria: 16 GB LPDDR5",
      "Almacenamiento: SSD NVMe 1 TB",
      "Conectividad: Wi-Fi 6E y módulo 4G LTE opcional",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 2,
    title: "Laptop Workstation Móvil",
    slug: "laptop-workstation-movil",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Laptops",
    subcategorySlug: "laptops",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1200",
    description:
      "Laptop de alto rendimiento certificada para software de diseño e ingeniería, pensada para profesionales que requieren potencia de workstation en movimiento.",
    features: [
      "Procesador: Intel Core i9-13900H (13ª Gen)",
      "Memoria: 32 GB DDR5 (expandible a 64 GB)",
      "Almacenamiento: SSD NVMe 2 TB",
      "Gráficos: NVIDIA RTX profesional certificada ISV",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 3,
    title: "Laptop UltraSlim Corporativa",
    slug: "laptop-ultraslim-corporativa",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Laptops",
    subcategorySlug: "laptops",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipo portátil liviano orientado a personal administrativo y comercial, con balance entre autonomía, portabilidad y costo total de propiedad.",
    features: [
      "Procesador: Intel Core i5-1335U (13ª Gen)",
      "Memoria: 8 GB LPDDR5 (expandible a 16 GB)",
      "Almacenamiento: SSD NVMe 512 GB",
      "Peso: 1.3 kg, chasis en aleación de aluminio",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Computadoras de Escritorio
  {
    id: 4,
    title: "PC Básica de Oficina",
    slug: "pc-basica-de-oficina",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Computadoras de Escritorio",
    subcategorySlug: "computadoras-de-escritorio",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipo de escritorio de entrada para tareas administrativas y ofimática, optimizado en costo para despliegues masivos.",
    features: [
      "Procesador: Intel Core i3-13100",
      "Memoria: 8 GB DDR4",
      "Almacenamiento: SSD SATA 256 GB",
      "Gráficos: Intel UHD Graphics integrados",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 5,
    title: "PC Corporativa OptiPro 3000",
    slug: "pc-corporativa-optipro-3000",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Computadoras de Escritorio",
    subcategorySlug: "computadoras-de-escritorio",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipo de escritorio corporativo balanceado, pensado para productividad de oficina en despliegues a gran escala.",
    features: [
      "Procesador: Intel Core i5-13500 (13ª Gen)",
      "Memoria: 16 GB DDR4 (expandible a 64 GB)",
      "Almacenamiento: SSD NVMe 512 GB",
      "Gráficos: Intel UHD Graphics 770 integrados",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 6,
    title: "PC Alto Rendimiento X-Treme",
    slug: "pc-alto-rendimiento-x-treme",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Computadoras de Escritorio",
    subcategorySlug: "computadoras-de-escritorio",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    description:
      "Estación de escritorio de alto rendimiento certificada para modelado BIM, renderizado 3D y análisis de datos exigente.",
    features: [
      "Procesador: Intel Core i9-13900K (13ª Gen)",
      "Memoria: 64 GB DDR5 ECC (expandible a 128 GB)",
      "Almacenamiento: SSD NVMe 2 TB + HDD 4 TB",
      "Gráficos: NVIDIA RTX profesional certificada ISV",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Mini-PC
  {
    id: 7,
    title: "Mini-PC Industrial Edge",
    slug: "mini-pc-industrial-edge",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Mini-PC",
    subcategorySlug: "mini-pc",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipo compacto de cómputo en el borde (edge computing), certificado para operación continua en entornos industriales con rango de temperatura extendido.",
    features: [
      "Procesador: AMD Ryzen Embedded serie V3000",
      "Memoria: 32 GB DDR5",
      "Almacenamiento: SSD industrial M.2 1 TB",
      "Chasis: Fanless, rango operativo -20°C a 60°C",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 8,
    title: "Mini-PC Oficina Compacta",
    slug: "mini-pc-oficina-compacta",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Mini-PC",
    subcategorySlug: "mini-pc",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipo de bajo perfil para instalaciones discretas detrás de monitores o en espacios reducidos, ideal para puestos de trabajo administrativos.",
    features: [
      "Procesador: Intel Core i5-1335U",
      "Memoria: 16 GB DDR4 (expandible a 32 GB)",
      "Almacenamiento: SSD NVMe 512 GB",
      "Formato ultra compacto apto para montaje VESA",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Monitores
  {
    id: 9,
    title: "Monitor Profesional 24\"",
    slug: "monitor-profesional-24",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Monitores",
    subcategorySlug: "monitores",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    description:
      "Monitor corporativo estándar para estaciones de trabajo, con panel de alta fidelidad de color y tecnología de bajo parpadeo.",
    features: [
      "Panel: 24\" Full HD IPS",
      "Tecnología de bajo parpadeo y filtro de luz azul",
      "Entradas: HDMI, DisplayPort y VGA",
      "Soporte ajustable en altura e inclinación",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 10,
    title: "Monitor Curvo 34\" UltraWide",
    slug: "monitor-curvo-34-ultrawide",
    category: "Computación y Dispositivos de Usuario",
    subcategoryName: "Monitores",
    subcategorySlug: "monitores",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=1200",
    description:
      "Monitor curvo ultra ancho para estaciones de diseño, trading y monitoreo multi-ventana, con máxima superficie de trabajo visual.",
    features: [
      "Panel: 34\" curvo QHD (3440x1440)",
      "Frecuencia de actualización: 100 Hz",
      "Entradas: USB-C con entrega de energía, HDMI, DisplayPort",
      "Cobertura de color 99% sRGB",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // ============================================================
  // 2. Infraestructura IT y Telecomunicaciones
  // ============================================================

  // Subcategoría: Servidores
  {
    id: 11,
    title: "Servidor Rack Pro 1U",
    slug: "servidor-rack-pro-1u",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Servidores",
    subcategorySlug: "servidores",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Servidor rack 1U para virtualización y bases de datos empresariales, con redundancia de componentes críticos para alta disponibilidad.",
    features: [
      "Procesador: 2x Intel Xeon Silver (hasta 32 núcleos totales)",
      "Memoria: 128 GB DDR5 ECC (expandible a 1 TB)",
      "Almacenamiento: RAID 10 con bahías hot-swap",
      "Fuentes de poder redundantes 800W",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 12,
    title: "Servidor Torre Empresarial",
    slug: "servidor-torre-empresarial",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Servidores",
    subcategorySlug: "servidores",
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Servidor en formato torre para oficinas sin sala de racks dedicada, ideal como servidor de archivos, dominio o respaldo local.",
    features: [
      "Procesador: Intel Xeon E-2400 (hasta 8 núcleos)",
      "Memoria: 64 GB DDR5 ECC (expandible a 128 GB)",
      "Almacenamiento: hasta 4 bahías hot-swap RAID 1/5",
      "Operación silenciosa apta para entornos de oficina",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Switches
  {
    id: 13,
    title: "Switch Gestionado 48 Puertos PoE",
    slug: "switch-gestionado-48-puertos-poe",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Switches",
    subcategorySlug: "switches",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Switch administrable de capa 3 para infraestructura LAN corporativa, con alimentación PoE+ integrada para telefonía IP, cámaras y access points.",
    features: [
      "Puertos: 48x Gigabit PoE+ / 4x SFP+ 10G uplink",
      "Presupuesto PoE total: 740W",
      "Segmentación VLAN y QoS avanzado",
      "Administración vía SNMP, CLI y consola web",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 14,
    title: "Switch de Acceso 24 Puertos",
    slug: "switch-de-acceso-24-puertos",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Switches",
    subcategorySlug: "switches",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Switch de acceso compacto para sucursales y pisos de oficina, con gestión básica y bajo costo operativo.",
    features: [
      "Puertos: 24x Gigabit / 2x SFP uplink",
      "Presupuesto PoE opcional: 370W",
      "Gestión vía consola web simplificada",
      "Formato de escritorio o montaje en rack",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Routers
  {
    id: 15,
    title: "Router Empresarial VPN",
    slug: "router-empresarial-vpn",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Routers",
    subcategorySlug: "routers",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1200",
    description:
      "Router de borde para interconexión segura entre sedes, con soporte de VPN site-to-site y balanceo multi-WAN para continuidad operativa.",
    features: [
      "Throughput de firewall: hasta 5 Gbps",
      "Túneles VPN IPsec simultáneos: hasta 500",
      "Balanceo de carga multi-WAN con failover automático",
      "Puertos: 8x Gigabit + 2x SFP",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 16,
    title: "Router de Sucursal Multi-WAN",
    slug: "router-de-sucursal-multi-wan",
    category: "Infraestructura IT y Telecomunicaciones",
    subcategoryName: "Routers",
    subcategorySlug: "routers",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1200",
    description:
      "Router compacto para sucursales remotas, con conectividad de respaldo celular y gestión centralizada desde la casa matriz.",
    features: [
      "Puertos: 4x Gigabit LAN + 1x WAN",
      "Respaldo de conectividad vía módem 4G LTE",
      "Gestión centralizada en la nube",
      "VPN site-to-site hacia la sede principal",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // ============================================================
  // 3. Audiovisual y Cartelería Digital
  // ============================================================

  // Subcategoría: Pantallas LED
  {
    id: 17,
    title: "Pantalla LED Outdoor P4 Pro",
    slug: "pantalla-led-outdoor-p4-pro",
    category: "Audiovisual y Cartelería Digital",
    subcategoryName: "Pantallas LED",
    subcategorySlug: "pantallas-led",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=1200",
    description:
      "Pantalla LED modular para exteriores de alto brillo, diseñada para publicidad corporativa y señalización de gran formato en fachadas.",
    features: [
      "Pitch de píxel: 4 mm",
      "Brillo: 5,500 nits (apto para luz solar directa)",
      "Protección: IP65 resistente a intemperie",
      "Módulos escalables en configuración a medida",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 18,
    title: "Pantalla LED Indoor P2.5",
    slug: "pantalla-led-indoor-p2-5",
    category: "Audiovisual y Cartelería Digital",
    subcategoryName: "Pantallas LED",
    subcategorySlug: "pantallas-led",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Pantalla LED de interior de alta densidad de píxel, ideal para lobbies corporativos, salas de conferencia y centros de experiencia de marca.",
    features: [
      "Pitch de píxel: 2.5 mm",
      "Brillo: 1,200 nits ajustable",
      "Bisel ultra delgado para imagen continua",
      "Procesador de video multi-fuente incluido",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Videowall
  {
    id: 19,
    title: "Videowall Modular UltraSlim 3x3",
    slug: "videowall-modular-ultraslim-3x3",
    category: "Audiovisual y Cartelería Digital",
    subcategoryName: "Videowall",
    subcategorySlug: "videowall",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Muro de video de 9 paneles con bisel ultra delgado, ideal para salas de control, lobbies corporativos y centros de monitoreo situacional.",
    features: [
      "Configuración: 3x3 paneles (55\" cada uno)",
      "Bisel: 1.7 mm ultra delgado para imagen continua",
      "Procesador de video multi-fuente incluido",
      "Resolución total: 4K a 8K según configuración",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 20,
    title: "Videowall Compacto 2x2",
    slug: "videowall-compacto-2x2",
    category: "Audiovisual y Cartelería Digital",
    subcategoryName: "Videowall",
    subcategorySlug: "videowall",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    description:
      "Muro de video compacto de 4 paneles, ideal para recepciones corporativas y salas de reunión de mediano formato.",
    features: [
      "Configuración: 2x2 paneles (46\" cada uno)",
      "Bisel: 3.5 mm",
      "Procesador de video con múltiples entradas",
      "Instalación en pared o estructura autoportante",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // ============================================================
  // 4. Centros de Operaciones y Espacios Inteligentes
  // ============================================================

  // Subcategoría: Centros de Cómputos
  {
    id: 21,
    title: "Centro de Cómputo Modular Tier III",
    slug: "centro-de-computo-modular-tier-iii",
    category: "Centros de Operaciones y Espacios Inteligentes",
    subcategoryName: "Centros de Cómputos",
    subcategorySlug: "centros-de-computos",
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Solución integral de centro de datos modular, diseñada bajo normativas TIA-942 Tier III, con redundancia eléctrica y de climatización.",
    features: [
      "Diseño bajo normativa TIA-942 Tier III",
      "Racks, cableado estructurado y piso técnico elevado",
      "Redundancia N+1 en energía y climatización",
      "Monitoreo remoto de condiciones ambientales (DCIM)",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 22,
    title: "Centro de Cómputo Compacto Edge",
    slug: "centro-de-computo-compacto-edge",
    category: "Centros de Operaciones y Espacios Inteligentes",
    subcategoryName: "Centros de Cómputos",
    subcategorySlug: "centros-de-computos",
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Micro data center autocontenido para sucursales o plantas remotas, con energía, climatización y seguridad integradas en un solo gabinete.",
    features: [
      "Gabinete autocontenido con climatización integrada",
      "Capacidad: hasta 10 servidores rack",
      "UPS y control de acceso incorporados",
      "Despliegue en menos de 4 semanas",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Salas Situacionales
  {
    id: 23,
    title: "Sala Situacional Ejecutiva",
    slug: "sala-situacional-ejecutiva",
    category: "Centros de Operaciones y Espacios Inteligentes",
    subcategoryName: "Salas Situacionales",
    subcategorySlug: "salas-situacionales",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Sala de control y toma de decisiones con videowall integrado, estaciones de operador y software de gestión centralizada.",
    features: [
      "Videowall de hasta 3x3 paneles integrado",
      "Estaciones de operador ergonómicas",
      "Software de gestión y despliegue de contenido",
      "Redundancia eléctrica y de conectividad",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 24,
    title: "Sala Situacional Compacta",
    slug: "sala-situacional-compacta",
    category: "Centros de Operaciones y Espacios Inteligentes",
    subcategoryName: "Salas Situacionales",
    subcategorySlug: "salas-situacionales",
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Sala de monitoreo de menor escala para operaciones departamentales, con una sola pantalla de gran formato y estación de operador.",
    features: [
      "Pantalla única de gran formato (85\"-98\")",
      "Estación de operador con doble monitor",
      "Software de monitoreo multi-fuente",
      "Instalación en menos de 2 semanas",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // ============================================================
  // 5. Respaldo, Seguridad y Climatización Crítica
  // ============================================================

  // Subcategoría: UPS
  {
    id: 25,
    title: "UPS Enterprise 20kVA Online",
    slug: "ups-enterprise-20kva-online",
    category: "Respaldo, Seguridad y Climatización Crítica",
    subcategoryName: "UPS",
    subcategorySlug: "ups",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200",
    description:
      "Sistema de respaldo de energía en línea de doble conversión, diseñado para proteger centros de cómputo y cargas críticas ante fallas eléctricas.",
    features: [
      "Capacidad: 20 kVA / 18 kW",
      "Topología: Online de doble conversión",
      "Autonomía: hasta 15 minutos a plena carga (ampliable)",
      "Monitoreo remoto vía SNMP",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 26,
    title: "UPS Compacta 3kVA Line-Interactive",
    slug: "ups-compacta-3kva-line-interactive",
    category: "Respaldo, Seguridad y Climatización Crítica",
    subcategoryName: "UPS",
    subcategorySlug: "ups",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1200",
    description:
      "UPS compacta line-interactive para proteger racks pequeños, puestos de trabajo críticos o equipos de red departamentales.",
    features: [
      "Capacidad: 3 kVA / 2.7 kW",
      "Topología: Line-interactive con regulación automática de voltaje",
      "Autonomía: hasta 10 minutos a plena carga",
      "Formato rack/torre convertible",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // Subcategoría: Aires de Precisión
  {
    id: 27,
    title: "Aire de Precisión CRAC 5TR",
    slug: "aire-de-precision-crac-5tr",
    category: "Respaldo, Seguridad y Climatización Crítica",
    subcategoryName: "Aires de Precisión",
    subcategorySlug: "aires-de-precision",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1200",
    description:
      "Unidad de climatización de precisión para salas de servidores, con control estricto de temperatura y humedad para proteger infraestructura crítica.",
    features: [
      "Capacidad de enfriamiento: 5 toneladas de refrigeración",
      "Control de temperatura: ±1°C de precisión",
      "Control de humedad: ±5% HR",
      "Configuración redundante N+1 disponible",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },
  {
    id: 28,
    title: "Aire de Precisión CRAC 10TR",
    slug: "aire-de-precision-crac-10tr",
    category: "Respaldo, Seguridad y Climatización Crítica",
    subcategoryName: "Aires de Precisión",
    subcategorySlug: "aires-de-precision",
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Unidad de climatización de precisión de mayor capacidad, orientada a centros de datos de tamaño mediano con alta densidad de racks.",
    features: [
      "Capacidad de enfriamiento: 10 toneladas de refrigeración",
      "Control de temperatura: ±1°C de precisión",
      "Distribución de aire por piso técnico o ducto",
      "Configuración redundante N+1 disponible",
      "Garantía: 3 años con soporte swap a nivel nacional",
    ],
  },

  // ============================================================
  // 6. Software, Servicios y Proyectos
  // ============================================================

  // Subcategoría: Desarrollo de Software
  {
    id: 29,
    title: "Paquete Desarrollo Web Corporativo",
    slug: "paquete-desarrollo-web-corporativo",
    category: "Software, Servicios y Proyectos",
    subcategoryName: "Desarrollo de Software",
    subcategorySlug: "desarrollo-de-software",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Desarrollo a medida de plataformas web corporativas, desde portales institucionales hasta sistemas internos de gestión.",
    features: [
      "Análisis de requerimientos y arquitectura a medida",
      "Desarrollo frontend y backend a medida",
      "Integración con sistemas existentes vía API",
      "Mantenimiento y soporte post-lanzamiento",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
  {
    id: 30,
    title: "Paquete Desarrollo de Aplicaciones Móviles",
    slug: "paquete-desarrollo-de-aplicaciones-moviles",
    category: "Software, Servicios y Proyectos",
    subcategoryName: "Desarrollo de Software",
    subcategorySlug: "desarrollo-de-software",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=1200",
    description:
      "Diseño y desarrollo de aplicaciones móviles nativas e híbridas para procesos operativos, ventas y atención al cliente.",
    features: [
      "Desarrollo nativo iOS/Android o multiplataforma",
      "Diseño de experiencia de usuario (UX/UI)",
      "Integración con backend y servicios en la nube",
      "Publicación y mantenimiento en tiendas de aplicaciones",
      "Soporte técnico especializado a nivel nacional",
    ],
  },

  // Subcategoría: Gestión de Proyectos
  {
    id: 31,
    title: "Paquete Gestión de Proyecto Estándar",
    slug: "paquete-gestion-de-proyecto-estandar",
    category: "Software, Servicios y Proyectos",
    subcategoryName: "Gestión de Proyectos",
    subcategorySlug: "gestion-de-proyectos",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    description:
      "Gestión integral de proyectos tecnológicos de alcance medio, desde la planificación hasta la puesta en marcha.",
    features: [
      "Metodologías ágiles y tradicionales de gestión",
      "Cronograma, presupuesto y control de riesgos",
      "Coordinación de proveedores y contratistas",
      "Reportes de avance periódicos para stakeholders",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
  {
    id: 32,
    title: "Paquete Gestión de Proyecto Premium",
    slug: "paquete-gestion-de-proyecto-premium",
    category: "Software, Servicios y Proyectos",
    subcategoryName: "Gestión de Proyectos",
    subcategorySlug: "gestion-de-proyectos",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    description:
      "Gestión integral de proyectos tecnológicos de gran envergadura, con oficina de proyecto dedicada y reportes ejecutivos en tiempo real.",
    features: [
      "PMO dedicada con gerente de proyecto asignado",
      "Reportes ejecutivos en tiempo real",
      "Gestión multi-proveedor y multi-sede",
      "Auditorías de calidad y cumplimiento normativo",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
];
