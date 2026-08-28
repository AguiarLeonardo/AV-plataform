import type { Localized } from "../i18n/utils";

export interface Service {
  slug: string;
  title: Localized<string>;
  shortDescription: Localized<string>;
  fullDescription: Localized<string[]>;
  images: string[];
}

export const services = [
  {
    slug: "ascensores",
    title: { es: "Ascensores", en: "Elevators" },
    shortDescription: {
      es: "Instalación, modernización y mantenimiento de sistemas de elevación vertical para edificios residenciales y comerciales.",
      en: "Installation, modernization, and maintenance of vertical elevation systems for residential and commercial buildings.",
    },
    fullDescription: {
      es: [
        "En Asiaven diseñamos e instalamos sistemas de elevación vertical de última generación, cumpliendo con los más altos estándares internacionales de seguridad y eficiencia energética. Nuestro equipo técnico certificado acompaña cada proyecto desde la ingeniería inicial hasta la puesta en marcha, garantizando soluciones a la medida de torres corporativas, conjuntos residenciales y centros comerciales de gran altura.",
        "Contamos con programas de modernización que extienden la vida útil de equipos existentes, incorporando tecnología de control inteligente, ahorro energético y mejoras sustanciales en el confort y la seguridad de los usuarios finales.",
        "Nuestro servicio de mantenimiento preventivo y correctivo asegura la continuidad operativa, con tiempos de respuesta rápidos y personal especializado disponible para atender cualquier eventualidad en la infraestructura vertical de nuestros clientes.",
      ],
      en: [
        "At Asiaven we design and install state-of-the-art vertical elevation systems, meeting the highest international standards for safety and energy efficiency. Our certified technical team supports every project from initial engineering through commissioning, delivering solutions tailored to corporate towers, residential complexes, and high-rise shopping centers.",
        "We offer modernization programs that extend the service life of existing equipment, incorporating smart control technology, energy savings, and substantial improvements in end-user comfort and safety.",
        "Our preventive and corrective maintenance service ensures operational continuity, with fast response times and specialized staff available to address any incident in our clients' vertical infrastructure.",
      ],
    },
    images: [
      "/images/corporativo/servicios/ascensores/ascensor-panel.webp",
      "/images/corporativo/servicios/ascensores/ascensor-cuarto-maquinas.webp",
      "/images/corporativo/servicios/ascensores/ascensor-cabina.webp",
    ],
  },
  {
    slug: "escaleras-mecanicas",
    title: { es: "Escaleras Mecánicas", en: "Escalators" },
    shortDescription: {
      es: "Sistemas de transporte mecánico para centros comerciales, aeropuertos y espacios de alto tráfico peatonal.",
      en: "Mechanical transport systems for shopping centers, airports, and high pedestrian-traffic spaces.",
    },
    fullDescription: {
      es: [
        "Ofrecemos soluciones integrales de transporte mecánico, incluyendo escaleras y pasillos rodantes diseñados para operar de forma continua en entornos de alto tráfico peatonal como aeropuertos, centros comerciales y estaciones de transporte.",
        "Nuestros equipos incorporan tecnología de última generación en materia de seguridad, con sistemas de frenado, sensores de sobrecarga y componentes de bajo mantenimiento que reducen significativamente el tiempo de inactividad.",
        "El plan de mantenimiento preventivo que ofrecemos está diseñado para maximizar la vida útil de los equipos, minimizando interrupciones operativas y garantizando el cumplimiento de las normativas técnicas vigentes en cada país donde operamos.",
      ],
      en: [
        "We offer comprehensive mechanical transport solutions, including escalators and moving walkways designed to operate continuously in high pedestrian-traffic environments such as airports, shopping centers, and transit stations.",
        "Our equipment incorporates the latest safety technology, with braking systems, overload sensors, and low-maintenance components that significantly reduce downtime.",
        "Our preventive maintenance plan is designed to maximize equipment lifespan, minimizing operational interruptions and ensuring compliance with current technical regulations in every country where we operate.",
      ],
    },
    images: [
      "/images/corporativo/servicios/escaleras-mecanicas/escalera-centro-comercial.webp",
      "/images/corporativo/servicios/escaleras-mecanicas/escalera-peldanos.webp",
      "/images/corporativo/servicios/escaleras-mecanicas/rampa-mecanica.webp",
    ],
  },
  {
    slug: "tecnologia-y-telecomunicaciones",
    title: { es: "Tecnología y Telecomunicaciones", en: "Technology & Telecommunications" },
    shortDescription: {
      es: "Soluciones tecnológicas avanzadas en telecomunicaciones e infraestructura digital para empresas.",
      en: "Advanced technology solutions in telecommunications and digital infrastructure for businesses.",
    },
    fullDescription: {
      es: [
        "Diseñamos e implementamos infraestructura de telecomunicaciones y conectividad digital adaptada a las necesidades de operaciones industriales y corporativas de alto nivel, integrando estándares internacionales de calidad.",
        "Nuestro portafolio incluye redes de datos, sistemas de video vigilancia, conectividad inalámbrica y proyectos de transformación digital que permiten a nuestros clientes optimizar sus procesos y mejorar la toma de decisiones.",
        "Acompañamos a cada organización en su hoja de ruta tecnológica, desde el diagnóstico inicial hasta la implementación y soporte continuo, asegurando escalabilidad y seguridad en cada solución desplegada.",
      ],
      en: [
        "We design and implement telecommunications infrastructure and digital connectivity tailored to the needs of high-level industrial and corporate operations, integrating international quality standards.",
        "Our portfolio includes data networks, video surveillance systems, wireless connectivity, and digital transformation projects that help our clients optimize their processes and improve decision-making.",
        "We guide every organization along its technology roadmap, from initial assessment through implementation and ongoing support, ensuring scalability and security in every solution we deploy.",
      ],
    },
    images: [
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/sala-servidores-racks.webp",
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/pantalla-led.webp",
      "/images/corporativo/servicios/tecnologia-y-telecomunicaciones/switch-redes.webp",
    ],
  },
  {
    slug: "envases",
    title: { es: "Envases", en: "Packaging" },
    shortDescription: {
      es: "Fabricación y distribución de envases de aluminio de alta calidad para la industria alimentaria y de bebidas.",
      en: "Manufacturing and distribution of high-quality aluminum packaging for the food and beverage industry.",
    },
    fullDescription: {
      es: [
        "Fabricamos y distribuimos envases de aluminio de alta calidad, diseñados para cumplir con los estrictos estándares sanitarios y de resistencia exigidos por las marcas líderes de la industria alimentaria y de bebidas.",
        "Nuestra capacidad de producción está respaldada por controles de calidad en cada etapa del proceso, garantizando consistencia dimensional, hermeticidad y durabilidad en cada lote fabricado.",
        "Ofrecemos soluciones de envasado flexibles y escalables, adaptadas al volumen y requerimientos específicos de cada cliente, con tiempos de entrega competitivos y trazabilidad completa del producto.",
      ],
      en: [
        "We manufacture and distribute high-quality aluminum packaging, designed to meet the strict sanitary and strength standards required by leading food and beverage brands.",
        "Our production capacity is backed by quality controls at every stage of the process, ensuring dimensional consistency, sealing integrity, and durability in every batch manufactured.",
        "We offer flexible, scalable packaging solutions tailored to each client's specific volume and requirements, with competitive delivery times and complete product traceability.",
      ],
    },
    images: [
      "/images/corporativo/servicios/envases/linea-produccion-latas-1.webp",
      "/images/corporativo/servicios/envases/linea-produccion-latas-2.webp",
      "/images/corporativo/servicios/envases/linea-produccion-latas-3.webp",
    ],
  },
  {
    slug: "construccion",
    title: { es: "Construcción", en: "Construction" },
    shortDescription: {
      es: "Proyectos de construcción civil e infraestructura con los más altos estándares de calidad internacional.",
      en: "Civil construction and infrastructure projects built to the highest international quality standards.",
    },
    fullDescription: {
      es: [
        "Gestionamos proyectos de construcción civil e infraestructura corporativa e industrial, aplicando rigurosos controles de seguridad, cronograma y calidad en cada etapa, desde la planificación hasta la entrega final.",
        "Nuestro equipo de ingeniería trabaja con metodologías internacionales de gestión de proyectos, coordinando de forma eficiente a contratistas, proveedores y equipos multidisciplinarios para cumplir con los plazos establecidos.",
        "Priorizamos la seguridad ocupacional y el cumplimiento normativo en cada obra, ofreciendo a nuestros clientes la tranquilidad de trabajar con un socio confiable y con experiencia comprobada en proyectos de gran envergadura.",
      ],
      en: [
        "We manage civil construction and corporate/industrial infrastructure projects, applying rigorous safety, schedule, and quality controls at every stage, from planning through final delivery.",
        "Our engineering team works with international project management methodologies, efficiently coordinating contractors, suppliers, and multidisciplinary teams to meet established deadlines.",
        "We prioritize occupational safety and regulatory compliance on every site, giving our clients the peace of mind of working with a reliable partner with proven experience in large-scale projects.",
      ],
    },
    images: [
      "/images/corporativo/servicios/construccion/obra-en-construccion.webp",
      "/images/corporativo/servicios/construccion/estructura-metalica.webp",
      "/images/corporativo/servicios/construccion/maquinaria-pesada.webp",
    ],
  },
  {
    slug: "recipientes-gas-licuado",
    title: { es: "Recipientes de Gas Licuado", en: "Liquefied Gas Containers" },
    shortDescription: {
      es: "Fabricación y suministro de cilindros industriales certificados para el almacenamiento y distribución de gas licuado.",
      en: "Manufacturing and supply of certified industrial cylinders for the storage and distribution of liquefied gas.",
    },
    fullDescription: {
      es: [
        "Fabricamos y suministramos cilindros industriales certificados para el almacenamiento y distribución de gas licuado, cumpliendo con las normas técnicas internacionales de seguridad más exigentes del sector.",
        "Cada recipiente es sometido a rigurosas pruebas de presión y control de calidad antes de salir de nuestras instalaciones, garantizando confiabilidad en su uso dentro de entornos energéticos, industriales y domésticos.",
        "Contamos con capacidad de producción a gran escala y asesoría técnica especializada, acompañando a nuestros clientes en la selección de la solución más adecuada para sus necesidades de almacenamiento y transporte de gas.",
      ],
      en: [
        "We manufacture and supply certified industrial cylinders for the storage and distribution of liquefied gas, meeting the sector's most demanding international technical safety standards.",
        "Every container undergoes rigorous pressure testing and quality control before leaving our facilities, ensuring reliability for use in energy, industrial, and domestic settings.",
        "We have large-scale production capacity and specialized technical advisory services, guiding our clients in selecting the best solution for their gas storage and transport needs.",
      ],
    },
    images: [
      "/images/corporativo/servicios/recipientes-gas-licuado/cilindro-gas-industrial.webp",
      "/images/corporativo/servicios/recipientes-gas-licuado/tanque-gas-industrial.webp",
      "/images/corporativo/servicios/recipientes-gas-licuado/cilindros-gas.webp",
    ],
  },
  {
    slug: "mantenimiento",
    title: { es: "Mantenimiento", en: "Maintenance" },
    shortDescription: {
      es: "Servicio preventivo y correctivo para garantizar el funcionamiento óptimo de todos nuestros equipos instalados.",
      en: "Preventive and corrective service to ensure the optimal operation of all our installed equipment.",
    },
    fullDescription: {
      es: [
        "Nuestro servicio de mantenimiento está diseñado para garantizar la continuidad operativa de infraestructuras críticas, mediante contratos adaptados a las necesidades específicas de cada cliente y equipo instalado.",
        "Contamos con un sistema de monitoreo continuo y protocolos de respuesta rápida que permiten anticipar fallas antes de que afecten la operación, reduciendo costos asociados a paradas no programadas.",
        "El equipo técnico de Asiaven combina experiencia de campo con herramientas de diagnóstico modernas, asegurando intervenciones precisas y un historial documentado del estado de cada activo bajo mantenimiento.",
      ],
      en: [
        "Our maintenance service is designed to ensure the operational continuity of critical infrastructure, through contracts tailored to the specific needs of each client and installed equipment.",
        "We have a continuous monitoring system and rapid-response protocols that anticipate failures before they affect operations, reducing costs associated with unplanned downtime.",
        "Asiaven's technical team combines field experience with modern diagnostic tools, ensuring precise interventions and a documented history of the condition of every asset under maintenance.",
      ],
    },
    images: [
      "/images/corporativo/servicios/mantenimiento/tecnico-realizando-mantenimiento.webp",
      "/images/corporativo/servicios/mantenimiento/taller-de-mantenimiento.webp",
      "/images/corporativo/servicios/mantenimiento/almacen-de-mantenimiento.webp",
    ],
  },
  {
    slug: "compras-internacionales",
    title: { es: "Compras Internacionales", en: "International Purchasing" },
    shortDescription: {
      es: "Gestión integral de importación y distribución de productos desde el continente asiático.",
      en: "Comprehensive management of importing and distributing products from Asia.",
    },
    fullDescription: {
      es: [
        "Facilitamos el acceso de nuestros clientes corporativos a los mercados de manufactura asiática mediante un servicio integral de compras internacionales, que abarca la negociación directa con fabricantes certificados hasta la entrega final en destino.",
        "Nuestro equipo gestiona el proceso logístico y aduanero de principio a fin, incluyendo control de calidad en origen, consolidación de carga y trazabilidad completa de cada embarque, reduciendo tiempos y costos operativos.",
        "Trabajamos con una red consolidada de proveedores en Asia, lo que nos permite ofrecer condiciones comerciales competitivas y garantizar la continuidad del suministro para proyectos industriales y comerciales de gran escala.",
      ],
      en: [
        "We give our corporate clients access to Asian manufacturing markets through a comprehensive international purchasing service, covering everything from direct negotiation with certified manufacturers to final delivery at destination.",
        "Our team manages the logistics and customs process from start to finish, including quality control at origin, cargo consolidation, and complete traceability of every shipment, reducing operating times and costs.",
        "We work with a well-established network of suppliers in Asia, allowing us to offer competitive commercial terms and guarantee supply continuity for large-scale industrial and commercial projects.",
      ],
    },
    images: [
      "/images/corporativo/servicios/compras-internacionales/puerto-contenedores.webp",
      "/images/corporativo/servicios/compras-internacionales/logistica-importacion.webp",
      "/images/corporativo/servicios/compras-internacionales/camion-puerto.webp",
    ],
  },
] satisfies Service[];
