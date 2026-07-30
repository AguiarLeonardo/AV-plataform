export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  images: string[];
}

export const services: Service[] = [
  {
    slug: "ascensores",
    title: "Ascensores",
    shortDescription:
      "Instalación, modernización y mantenimiento de sistemas de elevación vertical para edificios residenciales y comerciales.",
    fullDescription: [
      "En Asiaven diseñamos e instalamos sistemas de elevación vertical de última generación, cumpliendo con los más altos estándares internacionales de seguridad y eficiencia energética. Nuestro equipo técnico certificado acompaña cada proyecto desde la ingeniería inicial hasta la puesta en marcha, garantizando soluciones a la medida de torres corporativas, conjuntos residenciales y centros comerciales de gran altura.",
      "Contamos con programas de modernización que extienden la vida útil de equipos existentes, incorporando tecnología de control inteligente, ahorro energético y mejoras sustanciales en el confort y la seguridad de los usuarios finales.",
      "Nuestro servicio de mantenimiento preventivo y correctivo asegura la continuidad operativa, con tiempos de respuesta rápidos y personal especializado disponible para atender cualquier eventualidad en la infraestructura vertical de nuestros clientes.",
    ],
    images: [
      "/images/corporativo/servicios/ascensores/ascensor-panel.jpg",
      "/images/corporativo/servicios/ascensores/ascensor-cuarto-maquinas.jpg",
      "/images/corporativo/servicios/ascensores/ascensor-cabina.jpg",
    ],
  },
  {
    slug: "escaleras-mecanicas",
    title: "Escaleras Mecánicas",
    shortDescription:
      "Sistemas de transporte mecánico para centros comerciales, aeropuertos y espacios de alto tráfico peatonal.",
    fullDescription: [
      "Ofrecemos soluciones integrales de transporte mecánico, incluyendo escaleras y pasillos rodantes diseñados para operar de forma continua en entornos de alto tráfico peatonal como aeropuertos, centros comerciales y estaciones de transporte.",
      "Nuestros equipos incorporan tecnología de última generación en materia de seguridad, con sistemas de frenado, sensores de sobrecarga y componentes de bajo mantenimiento que reducen significativamente el tiempo de inactividad.",
      "El plan de mantenimiento preventivo que ofrecemos está diseñado para maximizar la vida útil de los equipos, minimizando interrupciones operativas y garantizando el cumplimiento de las normativas técnicas vigentes en cada país donde operamos.",
    ],
    images: [
      "/images/corporativo/servicios/escaleras-mecanicas/escalera-centro-comercial.jpg",
      "/images/corporativo/servicios/escaleras-mecanicas/escalera-peldanos.jpg",
      "/images/corporativo/servicios/escaleras-mecanicas/rampa-mecanica.jpg",
    ],
  },
  {
    slug: "tecnologia-y-telecomunicaciones",
    title: "Tecnología y Telecomunicaciones",
    shortDescription:
      "Soluciones tecnológicas avanzadas en telecomunicaciones e infraestructura digital para empresas.",
    fullDescription: [
      "Diseñamos e implementamos infraestructura de telecomunicaciones y conectividad digital adaptada a las necesidades de operaciones industriales y corporativas de alto nivel, integrando estándares internacionales de calidad.",
      "Nuestro portafolio incluye redes de datos, sistemas de video vigilancia, conectividad inalámbrica y proyectos de transformación digital que permiten a nuestros clientes optimizar sus procesos y mejorar la toma de decisiones.",
      "Acompañamos a cada organización en su hoja de ruta tecnológica, desde el diagnóstico inicial hasta la implementación y soporte continuo, asegurando escalabilidad y seguridad en cada solución desplegada.",
    ],
    images: [
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/sala-servidores-racks.jpg",
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/pantalla-led.jpg",
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/switch-redes.jpg",
    ],
  },
  {
    slug: "envases",
    title: "Envases",
    shortDescription:
      "Fabricación y distribución de envases de aluminio de alta calidad para la industria alimentaria y de bebidas.",
    fullDescription: [
      "Fabricamos y distribuimos envases de aluminio de alta calidad, diseñados para cumplir con los estrictos estándares sanitarios y de resistencia exigidos por las marcas líderes de la industria alimentaria y de bebidas.",
      "Nuestra capacidad de producción está respaldada por controles de calidad en cada etapa del proceso, garantizando consistencia dimensional, hermeticidad y durabilidad en cada lote fabricado.",
      "Ofrecemos soluciones de envasado flexibles y escalables, adaptadas al volumen y requerimientos específicos de cada cliente, con tiempos de entrega competitivos y trazabilidad completa del producto.",
    ],
    images: [
      "/images/corporativo/servicios/envases/linea-produccion-latas-1.jpg",
      "/images/corporativo/servicios/envases/linea-produccion-latas-2.jpg",
      "/images/corporativo/servicios/envases/linea-produccion-latas-3.jpg",
    ],
  },
  {
    slug: "construccion",
    title: "Construcción",
    shortDescription:
      "Proyectos de construcción civil e infraestructura con los más altos estándares de calidad internacional.",
    fullDescription: [
      "Gestionamos proyectos de construcción civil e infraestructura corporativa e industrial, aplicando rigurosos controles de seguridad, cronograma y calidad en cada etapa, desde la planificación hasta la entrega final.",
      "Nuestro equipo de ingeniería trabaja con metodologías internacionales de gestión de proyectos, coordinando de forma eficiente a contratistas, proveedores y equipos multidisciplinarios para cumplir con los plazos establecidos.",
      "Priorizamos la seguridad ocupacional y el cumplimiento normativo en cada obra, ofreciendo a nuestros clientes la tranquilidad de trabajar con un socio confiable y con experiencia comprobada en proyectos de gran envergadura.",
    ],
    images: [
      "/images/corporativo/servicios/construccion/obra-en-construccion.jpg",
      "/images/corporativo/servicios/construccion/estructura-metalica.jpg",
      "/images/corporativo/servicios/construccion/maquinaria-pesada.jpg",
    ],
  },
  {
    slug: "recipientes-gas-licuado",
    title: "Recipientes de Gas Licuado",
    shortDescription:
      "Fabricación y suministro de cilindros industriales certificados para el almacenamiento y distribución de gas licuado.",
    fullDescription: [
      "Fabricamos y suministramos cilindros industriales certificados para el almacenamiento y distribución de gas licuado, cumpliendo con las normas técnicas internacionales de seguridad más exigentes del sector.",
      "Cada recipiente es sometido a rigurosas pruebas de presión y control de calidad antes de salir de nuestras instalaciones, garantizando confiabilidad en su uso dentro de entornos energéticos, industriales y domésticos.",
      "Contamos con capacidad de producción a gran escala y asesoría técnica especializada, acompañando a nuestros clientes en la selección de la solución más adecuada para sus necesidades de almacenamiento y transporte de gas.",
    ],
    images: [
      "/images/corporativo/servicios/recipientes-gas-licuado/cilindro-gas-industrial.jpg",
      "/images/corporativo/servicios/recipientes-gas-licuado/tanque-gas-industrial.jpg",
      "/images/corporativo/servicios/recipientes-gas-licuado/cilindros-gas.jpg",
    ],
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento",
    shortDescription:
      "Servicio preventivo y correctivo para garantizar el funcionamiento óptimo de todos nuestros equipos instalados.",
    fullDescription: [
      "Nuestro servicio de mantenimiento está diseñado para garantizar la continuidad operativa de infraestructuras críticas, mediante contratos adaptados a las necesidades específicas de cada cliente y equipo instalado.",
      "Contamos con un sistema de monitoreo continuo y protocolos de respuesta rápida que permiten anticipar fallas antes de que afecten la operación, reduciendo costos asociados a paradas no programadas.",
      "El equipo técnico de Asiaven combina experiencia de campo con herramientas de diagnóstico modernas, asegurando intervenciones precisas y un historial documentado del estado de cada activo bajo mantenimiento.",
    ],
    images: [
      "/images/corporativo/servicios/mantenimiento/tecnico-realizando-mantenimiento.jpg",
      "/images/corporativo/servicios/mantenimiento/taller-de-mantenimiento.jpg",
      "/images/corporativo/servicios/mantenimiento/almacen-de-mantenimiento.jpg",
    ],
  },
  {
    slug: "compras-internacionales",
    title: "Compras Internacionales",
    shortDescription:
      "Gestión integral de importación y distribución de productos desde el continente asiático.",
    fullDescription: [
      "Facilitamos el acceso de nuestros clientes corporativos a los mercados de manufactura asiática mediante un servicio integral de compras internacionales, que abarca la negociación directa con fabricantes certificados hasta la entrega final en destino.",
      "Nuestro equipo gestiona el proceso logístico y aduanero de principio a fin, incluyendo control de calidad en origen, consolidación de carga y trazabilidad completa de cada embarque, reduciendo tiempos y costos operativos.",
      "Trabajamos con una red consolidada de proveedores en Asia, lo que nos permite ofrecer condiciones comerciales competitivas y garantizar la continuidad del suministro para proyectos industriales y comerciales de gran escala.",
    ],
    images: [
      "/images/corporativo/servicios/compras-internacionales/puerto-contenedores.jpg",
      "/images/corporativo/servicios/compras-internacionales/logistica-importacion.jpg",
      "/images/corporativo/servicios/compras-internacionales/camion-puerto.jpg",
    ],
  },
];
