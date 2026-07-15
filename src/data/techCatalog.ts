export interface TechProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  features: string[];
}

export const techProducts: TechProduct[] = [
  // Dispositivos de Usuario
  {
    id: 1,
    title: "Computadoras de Escritorio",
    slug: "computadoras-de-escritorio",
    category: "Dispositivos de Usuario",
    subcategory: "Computadoras de Escritorio",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipos de escritorio corporativos diseñados para cargas de trabajo intensivas, con configuraciones escalables adaptadas a cada puesto de trabajo.",
    features: [
      "Procesadores Intel y AMD de última generación",
      "Configuraciones escalables de memoria y almacenamiento",
      "Chasis de fácil mantenimiento y gestión de cables",
      "Certificaciones de eficiencia energética",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 2,
    title: "Laptops",
    slug: "laptops",
    category: "Dispositivos de Usuario",
    subcategory: "Laptops",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1200",
    description:
      "Portátiles corporativos livianos y resistentes, pensados para movilidad ejecutiva y productividad sin interrupciones.",
    features: [
      "Procesadores Intel y AMD de última generación",
      "Integración 4G LTE para conectividad móvil",
      "Chasis reforzado y batería de larga duración",
      "Lectores biométricos y cifrado de disco",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 3,
    title: "Todo en Uno (AIO)",
    slug: "todo-en-uno-aio",
    category: "Dispositivos de Usuario",
    subcategory: "Todo en Uno (AIO)",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipos All-in-One que integran CPU y pantalla en un solo cuerpo, ideales para espacios de oficina que priorizan el orden y la estética.",
    features: [
      "Pantalla Full HD/QHD integrada",
      "Diseño compacto que libera espacio de escritorio",
      "Procesadores Intel y AMD de última generación",
      "Cámara, micrófono y parlantes integrados para videollamadas",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 4,
    title: "Mini-PC",
    slug: "mini-pc",
    category: "Dispositivos de Usuario",
    subcategory: "Mini-PC",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipos de bajo perfil para instalaciones discretas detrás de monitores o en espacios reducidos, sin sacrificar rendimiento.",
    features: [
      "Formato ultra compacto apto para montaje VESA",
      "Bajo consumo energético y operación silenciosa",
      "Procesadores Intel y AMD de última generación",
      "Múltiples salidas de video para monitores duales",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 5,
    title: "Ultra Mini-PC",
    slug: "ultra-mini-pc",
    category: "Dispositivos de Usuario",
    subcategory: "Ultra Mini-PC",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200",
    description:
      "La opción más compacta de nuestra línea, orientada a kioscos, digital signage y puestos de trabajo con espacio mínimo disponible.",
    features: [
      "Tamaño de bolsillo, montaje oculto en cualquier superficie",
      "Consumo energético mínimo",
      "Procesadores de bajo perfil térmico",
      "Conectividad Wi-Fi y Bluetooth integradas",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 6,
    title: "Tabletas",
    slug: "tabletas",
    category: "Dispositivos de Usuario",
    subcategory: "Tabletas",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200",
    description:
      "Tabletas corporativas para fuerza de ventas, inventarios de campo y presentaciones ejecutivas, con conectividad permanente.",
    features: [
      "Pantallas de alta resolución y respuesta táctil precisa",
      "Integración 4G LTE en modelos portátiles",
      "Batería de larga duración para jornadas completas",
      "Compatibilidad con lápiz óptico y teclado externo",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 7,
    title: "Teléfonos Celulares",
    slug: "telefonos-celulares",
    category: "Dispositivos de Usuario",
    subcategory: "Teléfonos Celulares",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=1200",
    description:
      "Dispositivos móviles corporativos con gestión centralizada, pensados para equipos que requieren comunicación constante en campo.",
    features: [
      "Compatibilidad con soluciones MDM de gestión corporativa",
      "Conectividad 4G LTE de alta cobertura",
      "Resistencia reforzada para entornos industriales",
      "Baterías de alta duración",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 8,
    title: "Monitores",
    slug: "monitores",
    category: "Dispositivos de Usuario",
    subcategory: "Monitores",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    description:
      "Monitores corporativos de alta fidelidad de color, disponibles en configuraciones simples, duales y curvas para cada estación de trabajo.",
    features: [
      "Paneles Full HD, QHD y 4K disponibles",
      "Tecnología de bajo parpadeo y filtro de luz azul",
      "Múltiples entradas de video (HDMI, DisplayPort, USB-C)",
      "Soportes ajustables en altura e inclinación",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },

  // Redes y Servidores
  {
    id: 9,
    title: "Servidores",
    slug: "servidores",
    category: "Redes y Servidores",
    subcategory: "Servidores",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Servidores rack y torre para cargas de trabajo empresariales, virtualización y bases de datos con alta disponibilidad.",
    features: [
      "Procesadores multinúcleo de nivel empresarial",
      "Configuraciones RAID redundantes",
      "Fuentes de poder redundantes hot-swap",
      "Gestión remota fuera de banda",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 10,
    title: "Routers",
    slug: "routers",
    category: "Redes y Servidores",
    subcategory: "Routers",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1200",
    description:
      "Routers empresariales para conectividad WAN de alto rendimiento, con enrutamiento seguro entre sedes.",
    features: [
      "Soporte multi-WAN con balanceo de carga",
      "VPN site-to-site y cifrado de tráfico",
      "Gestión centralizada en la nube",
      "Alta disponibilidad y failover automático",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 11,
    title: "Switches",
    slug: "switches",
    category: "Redes y Servidores",
    subcategory: "Switches",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Switches administrables para infraestructura de red LAN, desde acceso hasta núcleo de red corporativo.",
    features: [
      "Puertos Gigabit y 10G disponibles",
      "Soporte PoE/PoE+ para dispositivos de red",
      "Segmentación por VLAN",
      "Administración remota vía SNMP/Web",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 12,
    title: "Almacenamiento",
    slug: "almacenamiento",
    category: "Redes y Servidores",
    subcategory: "Almacenamiento",
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Soluciones de almacenamiento NAS/SAN escalables para respaldo, archivo y continuidad operativa de datos críticos.",
    features: [
      "Configuraciones RAID para redundancia de datos",
      "Escalabilidad en caliente por bahías adicionales",
      "Replicación y respaldo programado",
      "Compatibilidad con entornos virtualizados",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 13,
    title: "Radio Enlaces",
    slug: "radio-enlaces",
    category: "Redes y Servidores",
    subcategory: "Radio Enlaces",
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Enlaces de radiofrecuencia punto a punto y punto-multipunto para conectividad de larga distancia entre sedes o zonas remotas.",
    features: [
      "Enlaces punto a punto de alta capacidad",
      "Resistencia a condiciones climáticas adversas",
      "Baja latencia para aplicaciones críticas",
      "Instalación y alineación por técnicos certificados",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 14,
    title: "Bases",
    slug: "bases",
    category: "Redes y Servidores",
    subcategory: "Bases",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    description:
      "Estaciones base y torres de comunicación para ampliar la cobertura de red en instalaciones industriales y corporativas.",
    features: [
      "Estructuras certificadas para carga de antenas",
      "Compatibilidad con múltiples bandas de frecuencia",
      "Sistemas de puesta a tierra y protección contra rayos",
      "Mantenimiento preventivo programado",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },

  // Infraestructura Crítica
  {
    id: 15,
    title: "Centros de Cómputos",
    slug: "centros-de-computos",
    category: "Infraestructura Crítica",
    subcategory: "Centros de Cómputos",
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Diseño, construcción y equipamiento integral de centros de datos, desde el piso técnico hasta la climatización de precisión.",
    features: [
      "Diseño bajo normativas TIA-942",
      "Racks, cableado estructurado y piso elevado",
      "Sistemas redundantes de energía y climatización",
      "Monitoreo remoto de condiciones ambientales",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 16,
    title: "Salas Situacionales",
    slug: "salas-situacionales",
    category: "Infraestructura Crítica",
    subcategory: "Salas Situacionales",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Salas de control y monitoreo integral con videowalls, estaciones de operador y sistemas de gestión centralizada.",
    features: [
      "Integración de videowall y múltiples fuentes de video",
      "Estaciones de operador ergonómicas",
      "Software de gestión y despliegue de contenido",
      "Redundancia eléctrica y de conectividad",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 17,
    title: "Reguladores de Voltaje y UPS",
    slug: "reguladores-de-voltaje-y-ups",
    category: "Infraestructura Crítica",
    subcategory: "Reguladores de Voltaje y UPS",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200",
    description:
      "Sistemas de respaldo y regulación eléctrica para proteger infraestructura crítica ante fallas o fluctuaciones de suministro.",
    features: [
      "UPS en línea de doble conversión",
      "Autonomía configurable según carga crítica",
      "Regulación automática de voltaje",
      "Monitoreo remoto de baterías y carga",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 18,
    title: "Aires Acondicionados de Precisión",
    slug: "aires-acondicionados-de-precision",
    category: "Infraestructura Crítica",
    subcategory: "Aires Acondicionados de Precisión",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1200",
    description:
      "Climatización de precisión para salas de servidores y centros de datos, con control estricto de temperatura y humedad.",
    features: [
      "Control de temperatura y humedad de alta precisión",
      "Configuraciones redundantes N+1",
      "Monitoreo remoto de condiciones ambientales",
      "Bajo consumo energético en operación continua",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 19,
    title: "Control de Acceso y Videovigilancia",
    slug: "control-de-acceso-y-videovigilancia",
    category: "Infraestructura Crítica",
    subcategory: "Control de Acceso y Videovigilancia",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=1200",
    description:
      "Soluciones integrales de seguridad perimetral, control de acceso biométrico y videovigilancia con grabación centralizada.",
    features: [
      "Cámaras IP de alta resolución con visión nocturna",
      "Control de acceso biométrico y por tarjeta",
      "Grabación centralizada con respaldo en la nube",
      "Analítica de video e integración con alarmas",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },

  // Pantallas y Exhibición
  {
    id: 20,
    title: "Pantallas LED",
    slug: "pantallas-led",
    category: "Pantallas y Exhibición",
    subcategory: "Pantallas LED",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=1200",
    description:
      "Pantallas LED de alto brillo para interiores y exteriores, ideales para publicidad corporativa y eventos de gran formato.",
    features: [
      "Alto brillo apto para uso exterior",
      "Píxel fino para visualización de cerca",
      "Estructura modular escalable",
      "Control de contenido remoto",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 21,
    title: "Videowall",
    slug: "videowall",
    category: "Pantallas y Exhibición",
    subcategory: "Videowall",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Muros de video de alta resolución para salas de control, lobbies corporativos y centros de experiencia de marca.",
    features: [
      "Bisel ultra delgado para imagen continua",
      "Procesador de video multi-fuente",
      "Configuraciones 2x2, 3x3 y a medida",
      "Calibración de color uniforme entre paneles",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 22,
    title: "Totems",
    slug: "totems",
    category: "Pantallas y Exhibición",
    subcategory: "Totems",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    description:
      "Totems interactivos autoportantes para información, autoservicio y publicidad digital en espacios de alto tráfico.",
    features: [
      "Pantallas táctiles de alta durabilidad",
      "Estructura robusta para uso público continuo",
      "Software de gestión de contenido remoto",
      "Opciones con impresora o lector de pagos integrados",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 23,
    title: "Digital Signage",
    slug: "digital-signage",
    category: "Pantallas y Exhibición",
    subcategory: "Digital Signage",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=1200",
    description:
      "Redes de pantallas para señalización digital corporativa, con programación de contenido centralizada por sucursal.",
    features: [
      "Gestión de contenido multi-pantalla en la nube",
      "Programación por horarios y ubicación",
      "Reportes de reproducción y disponibilidad",
      "Integración con reproductores multimedia dedicados",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 24,
    title: "Pole Advertising",
    slug: "pole-advertising",
    category: "Pantallas y Exhibición",
    subcategory: "Pole Advertising",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    description:
      "Pantallas publicitarias verticales de poste, diseñadas para exteriores en estaciones de servicio y centros comerciales.",
    features: [
      "Diseño resistente a intemperie",
      "Alto brillo para visibilidad diurna",
      "Estructura de montaje sobre poste o base fija",
      "Contenido gestionado de forma remota",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },

  // Software y Proyectos
  {
    id: 25,
    title: "Cyberseguridad",
    slug: "cyberseguridad",
    category: "Software y Proyectos",
    subcategory: "Cyberseguridad",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200",
    description:
      "Servicios de ciberseguridad corporativa: auditorías, monitoreo de amenazas y protección perimetral para infraestructura crítica.",
    features: [
      "Auditorías de vulnerabilidades y pentesting",
      "Monitoreo de amenazas 24/7",
      "Firewalls de nueva generación",
      "Planes de respuesta a incidentes",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
  {
    id: 26,
    title: "Desarrollo de Software y Aplicaciones",
    slug: "desarrollo-de-software-y-aplicaciones",
    category: "Software y Proyectos",
    subcategory: "Desarrollo de Software y Aplicaciones",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
    description:
      "Desarrollo a medida de software y aplicaciones empresariales, desde sistemas internos hasta plataformas orientadas al cliente.",
    features: [
      "Análisis de requerimientos y arquitectura a medida",
      "Desarrollo web, móvil y de escritorio",
      "Integración con sistemas existentes vía API",
      "Mantenimiento y soporte post-lanzamiento",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
  {
    id: 27,
    title: "Redes Inalámbricas y Cableado",
    slug: "redes-inalambricas-y-cableado",
    category: "Software y Proyectos",
    subcategory: "Redes Inalámbricas y Cableado",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    description:
      "Diseño e instalación de infraestructura de red cableada e inalámbrica corporativa, certificada bajo estándares internacionales.",
    features: [
      "Cableado estructurado categoría 6/6A certificado",
      "Diseño de cobertura Wi-Fi empresarial",
      "Segmentación de red por departamento o uso",
      "Certificación y documentación as-built",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
  {
    id: 28,
    title: "Desarrollo y Manejo de Proyectos",
    slug: "desarrollo-y-manejo-de-proyectos",
    category: "Software y Proyectos",
    subcategory: "Desarrollo y Manejo de Proyectos",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    description:
      "Gestión integral de proyectos tecnológicos, desde la planificación hasta la puesta en marcha, con metodologías internacionales.",
    features: [
      "Metodologías ágiles y tradicionales de gestión",
      "Cronogramas, presupuestos y control de riesgos",
      "Coordinación de proveedores y contratistas",
      "Reportes de avance para stakeholders",
      "Soporte técnico especializado a nivel nacional",
    ],
  },

  // Espacios y Colaboración
  {
    id: 29,
    title: "Videoconferencias",
    slug: "videoconferencias",
    category: "Espacios y Colaboración",
    subcategory: "Videoconferencias",
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?auto=format&fit=crop&q=80&w=1200",
    description:
      "Sistemas de videoconferencia profesional para salas de reunión corporativas, con audio e imagen de calidad empresarial.",
    features: [
      "Cámaras con seguimiento automático de voz",
      "Audio de cancelación de eco y ruido ambiente",
      "Compatibilidad con plataformas líderes de videollamada",
      "Instalación integrada en salas de reunión",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 30,
    title: "Salas de Eventos / Conferencias",
    slug: "salas-de-eventos-conferencias",
    category: "Espacios y Colaboración",
    subcategory: "Salas de Eventos / Conferencias",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipamiento audiovisual integral para salas de conferencias y auditorios corporativos, incluyendo sonido, video y control.",
    features: [
      "Sistemas de sonido profesional y micrófonos inalámbricos",
      "Proyección y pantallas de gran formato",
      "Paneles de control centralizado de sala",
      "Iluminación escénica programable",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 31,
    title: "Coworking",
    slug: "coworking",
    category: "Espacios y Colaboración",
    subcategory: "Coworking",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    description:
      "Equipamiento tecnológico para espacios de coworking: conectividad, mobiliario inteligente y estaciones de trabajo compartidas.",
    features: [
      "Redes Wi-Fi de alta densidad de usuarios",
      "Estaciones de carga y conectividad compartida",
      "Sistemas de reserva de espacios",
      "Videoconferencia integrada en salas privadas",
      "3 años de garantía con soporte swap a nivel nacional",
    ],
  },
  {
    id: 32,
    title: "Metro-Hub",
    slug: "metro-hub",
    category: "Espacios y Colaboración",
    subcategory: "Metro-Hub",
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=1200",
    description:
      "Centros de conectividad metropolitana que interconectan sedes corporativas mediante infraestructura de red de alta capacidad.",
    features: [
      "Interconexión de sedes vía fibra y radio enlaces",
      "Redundancia de rutas de conectividad",
      "Monitoreo centralizado de la red metropolitana",
      "Escalabilidad para nuevas sedes",
      "Soporte técnico especializado a nivel nacional",
    ],
  },
];
