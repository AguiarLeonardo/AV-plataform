/**
 * Diccionario base (español). NO se declara `as const`: con `as const` cada
 * valor se tipa a su literal exacto (ej. "Inicio" en vez de `string`), y
 * `en.ts` (con traducciones reales, no el mismo texto) dejaría de ser
 * asignable bajo `satisfies typeof es` — el chequeo de "misma forma" que
 * queremos se rompería con un chequeo de "mismo contenido" que no queremos.
 * Sin `as const`, cada valor se infiere como `string`, y `satisfies` solo
 * exige que `en.ts` tenga las mismas claves con el mismo tipo estructural.
 */
const es = {
  home: {
    hero: {
      prevLabel: "Diapositiva anterior",
      nextLabel: "Siguiente diapositiva",
      goToSlideLabel: "Ir a la diapositiva",
      slides: [
        {
          overline: "MÁS QUE UN LUJO, UNA NECESIDAD",
          title: "La visión se hizo realidad",
          subtitle:
            "Ofrecemos soluciones integrales en construcción, suministro de maquinaria pesada y distribución de tecnología de punta con estándares globales.",
          image: "/images/corporativo/banners/hero/banner-vision-realidad.webp",
          ctas: [
            { text: "Conoce nuestros servicios", routeKey: "services" as const, primary: true },
            { text: "Ver Proyectos", routeKey: "projects" as const, primary: false },
          ],
        },
        {
          title: "Ingeniería de Precisión en Movilidad Vertical",
          subtitle:
            "Especialistas en la instalación, modernización y mantenimiento de sistemas de ascensores y escaleras mecánicas con estándares internacionales.",
          image: "/images/corporativo/banners/hero/banner-movilidad-vertical.webp",
          ctas: [{ text: "Soluciones en Elevación", serviceSlug: "ascensores" as const, primary: true }],
        },
        {
          title: "Innovación en Soluciones de Envasado",
          subtitle:
            "Fabricación de recipientes y envases de alta resistencia para el sector industrial y comercial, garantizando la máxima durabilidad.",
          image: "/images/corporativo/banners/hero/banner-envasado-innovacion.webp",
          ctas: [{ text: "Ver Catálogo", serviceSlug: "envases" as const, primary: true }],
        },
        {
          title: "Vanguardia en Equipamiento Tecnológico",
          subtitle:
            "Suministro de hardware corporativo, servidores e infraestructura de redes. Equipos de última generación respaldados por 3 años de garantía integral.",
          image: "/images/corporativo/banners/hero/banner-equipamiento-tecnologico.webp",
          ctas: [
            { text: "División Tecnológica", serviceSlug: "tecnologia-y-telecomunicaciones" as const, primary: true },
          ],
        },
      ],
    },
    stats: {
      items: [
        { value: "802+", label: "Proyectos Exitosos" },
        { value: "18+", label: "Años en el mercado" },
        { value: "50+", label: "Empresas Internacionales y Nacionales" },
        { value: "30+", label: "Trabajadores y sumando" },
      ],
    },
    video: {
      fallbackText:
        "Tu navegador no soporta la reproducción de este video. Contáctanos para conocer más sobre Asiaven.",
      activateSoundLabel: "Activar sonido",
      muteLabel: "Silenciar",
    },
    about: {
      heading: "Excelencia y Solidez Corporativa",
      imageAlt: "Acerca de Asiaven",
      paragraph:
        "Con más de 18 años de trayectoria en el mercado, nos hemos consolidado como un aliado estratégico en el desarrollo del país. Ejecutamos proyectos de alta complejidad técnica para las principales entidades corporativas y estatales, ofreciendo soluciones que integran tecnología de punta y robustez industrial.",
      items: [
        {
          title: "Estándares de Calidad Global.",
          description:
            "Equipamiento certificado internacionalmente (ISO, CE, FCC), garantizando durabilidad y eficiencia en cada implementación.",
        },
        {
          title: "Respaldo Institucional.",
          description:
            "Experiencia probada en mega-proyectos para sectores de energía, telecomunicaciones e infraestructura pública.",
        },
        {
          title: "Soporte Técnico Integral.",
          description:
            'Cobertura a nivel nacional con planes de mantenimiento preventivo y garantía tipo "swap" para nuestra división tecnológica.',
        },
      ],
    },
    missionVision: {
      mission: {
        heading: "Misión",
        imageAlt: "Misión",
        text: "Utilizar tecnologías innovadoras dependiendo de las necesidades del cliente a nivel empresarial con el objetivo de incrementar su competitividad mediante soluciones creativas adaptadas al entorno práctico del mismo.",
      },
      vision: {
        heading: "Visión",
        imageAlt: "Visión",
        text: "Poder ser referente mundial con nuestros principales productos elevadores Asiaven y solventar todos los problemas de nuestros clientes dándole soluciones a medida para convertirnos en la mejor alternativa de las empresas en esta área.",
      },
    },
    services: {
      heading: "Nuestros Servicios",
      viewAllLabel: "Ver todos",
      carousel: {
        ctaLabel: "Ver detalles",
        prevLabel: "Servicio anterior",
        nextLabel: "Siguiente servicio",
        goToSlideLabel: "Ir a la diapositiva",
      },
    },
    affiliates: {
      eyebrow: "Empresas Asiaven",
      heading: "Nuestras Divisiones Especializadas",
      intro: "El respaldo del Grupo Asiaven estructurado para atender cada sector estratégico.",
      divisions: [
        {
          name: "AV Constructora",
          description: "Proyectos de infraestructura, obras civiles y desarrollo industrial.",
        },
        {
          name: "AV Elevators",
          description: "Soluciones en equipos de elevación, grúas y plataformas de trabajo en altura.",
        },
        {
          name: "AV Maquinarias Pesadas",
          description: "Alquiler, venta y soporte de maquinaria pesada para minería y construcción.",
        },
        {
          name: "AV Tecnología",
          description: "Soluciones tecnológicas, automatización y desarrollo de sistemas industriales.",
        },
        {
          name: "AV Envasados",
          description: "Fabricación y distribución de envases de aluminio para la industria alimentaria y de bebidas.",
        },
      ],
      carousel: {
        prevLabel: "División anterior",
        nextLabel: "Siguiente división",
      },
    },
  },
  common: {
    storeLabel: "Tienda",
    officeVenezuela: "Oficina en Venezuela",
    officeUnitedStates: "Oficina en Estados Unidos",
    usOfficeAddress: "1234 Miami Ave, Suite 100, Miami, FL 33132, EE. UU.",
    addressLabel: "Dirección",
    phoneLabel: "Teléfono",
    emailLabel: "Email",
    defaultDescription:
      "Grupo Asiaven - Soluciones corporativas integrales. Especialistas en movilidad vertical, infraestructura tecnológica, y equipamiento industrial de alto nivel.",
    whatsappLabel: "Contactar por WhatsApp",
  },
  nav: {
    home: "Inicio",
    about: "Nosotros",
    projects: "Proyectos",
    services: "Servicios",
    contact: "Contáctanos",
    openMenu: "Abrir menú",
  },
  footer: {
    description:
      "Soluciones integrales en infraestructura y tecnología, desde ingeniería civil hasta equipamiento corporativo de última generación.",
    quickLinksHeading: "Enlaces Rápidos",
    contactHeading: "Contacto",
    legalHeading: "Legal",
    storeBridge: "AV Store",
    termsLabel: "Términos de Servicio",
    privacyLabel: "Política de Privacidad",
    copyrightSuffix: "Asiaven. Todos los derechos reservados.",
  },
  contact: {
    pageTitle: "Detalles de Contacto",
    officesHeading: "Nuestras Oficinas",
    mapTitle: "Ubicación de Asiaven en Google Maps",
    formHeading: "Realizar Consulta",
    formIntro:
      "En grupo Asiaven estamos disponibles para ti en todo momento. Contáctanos, queremos saber de ti. Tu opinión es muy importante.",
    fieldName: "Nombre",
    fieldEmail: "Email",
    fieldSubject: "Asunto",
    fieldMessage: "Mensaje",
    submitButton: "Enviar",
    moreInfoEyebrow: "Más información",
    faqHeading: "Preguntas Frecuentes",
    faqs: [
      {
        question:
          "¿Qué tipo de mantenimiento requieren las máquinas para elevadores y escaleras mecánicas?",
        answer:
          "Nuestras máquinas están diseñadas para ser eficientes y duraderas, pero requieren mantenimiento preventivo regular, como cualquier equipo mecánico. Ofrecemos planes de mantenimiento personalizados que incluyen inspecciones periódicas, lubricación, y ajustes necesarios para garantizar que el equipo funcione sin problemas y evitar costosos tiempos de inactividad.",
      },
      {
        question:
          "¿Cómo garantizan la seguridad de los elevadores y escaleras mecánicas que venden?",
        answer:
          "La seguridad es nuestra prioridad. Todos nuestros productos cumplen con las normativas internacionales de seguridad y pasan por rigurosas pruebas de calidad. Además, nuestros sistemas están equipados con tecnología avanzada de detección de fallos, frenos de emergencia y controladores de sobrecarga, lo que garantiza la máxima protección para los usuarios.",
      },
      {
        question:
          "¿Cómo puedo saber cuál es el equipo adecuado para mi proyecto (elevadores, escaleras mecánicas o sistemas de aparcamiento)?",
        answer:
          "Ofrecemos asesoría personalizada para cada cliente. Nuestros expertos evaluarán el tamaño y tipo de proyecto, el número de usuarios esperados y las especificaciones del edificio o espacio para recomendar la solución más adecuada. Desde pequeños elevadores residenciales hasta grandes sistemas para edificios comerciales, tenemos el equipo perfecto para cada necesidad.",
      },
    ],
  },
  services: {
    pageHeading: "Nuestros Servicios",
    pageIntro:
      "En Asiaven procuramos brindar los mejores servicios desde hace más de 15 años, enfocándonos siempre en la calidad, la innovación y la satisfacción absoluta de nuestros clientes corporativos en cada proyecto que emprendemos.",
    carousel: {
      prevLabel: "Producto anterior",
      nextLabel: "Producto siguiente",
    },
    viewer360: {
      buttonLabel: "Ver vista 360°",
      closeLabel: "Cerrar",
      loadingText: "Cargando panorámica…",
      // {percent} se reemplaza en cliente por el porcentaje real de descarga
      // (Content-Length + stream) — solo se usa cuando ese dato está
      // disponible; si no, se cae a loadingText (indicador indeterminado).
      loadingProgressText: "Cargando panorámica… {percent}%",
      errorText: "No se pudo cargar la vista 360°. Inténtalo de nuevo más tarde.",
    },
    detail: {
      quoteCta: "Solicitar Cotización",
      viewProductCta: "Ver producto en la tienda",
      supportCta: "Soporte Técnico",
      // storeCta/storeSpanishOnlyNote: sin uso desde que el CTA de
      // Tecnología y Telecomunicaciones pasó a apuntar al PDF del catálogo
      // en vez de a la Store (branch feat/ocultar-store, ver docs/ESTADO.md
      // — la Store completa se ocultó por tener datos de relleno). Se
      // conservan a propósito, sin borrarse: vuelven a hacer falta cuando
      // se revierta ese apagado. Nunca se muestran en español (la Tienda ya
      // está en español) — existen solo para que en.ts tenga la misma forma.
      storeCta: "Ir a la tienda",
      storeSpanishOnlyNote: "Nuestra tienda está disponible en español.",
      techCatalogPdfCta: "Ver catálogo (PDF)",
      catalogCta: "Ver catálogo completo",
      catalogPdfCta: "Descargar catálogo (PDF)",
      // Mismo caso que storeSpanishOnlyNote: no se muestra en español.
      catalogSpanishOnlyNote: "Nuestro catálogo está disponible en español.",
      // Aviso de venta exclusiva a distribuidores — solo en la rama de
      // recipientes-gas-licuado (mismo aviso que en la ficha de producto de
      // la Store). Pendiente de aprobación del dueño del proyecto.
      distributorsOnlyNotice: "Venta exclusiva para distribuidores oficiales. Este servicio no se ofrece a particulares.",
    },
    // Mensaje precargado del botón de cotización por WhatsApp — uno por
    // servicio, indexado por su slug (no por t() con ruta dinámica: t()
    // exige una ruta literal conocida en build-time, y aquí el slug se
    // conoce recién en runtime). Ascensores y escaleras mecánicas llevan un
    // marcador [indicar tipo] entre corchetes -- no paréntesis, para que se
    // lea inequívocamente como algo a reemplazar -- porque tienen varios
    // subtipos; el resto no.
    whatsappQuote: {
      ascensores:
        "Hola, quisiera solicitar una cotización para el servicio de ascensores de Asiaven. Tipo de interés: [indicar tipo]",
      "escaleras-mecanicas":
        "Hola, quisiera solicitar una cotización para el servicio de escaleras mecánicas de Asiaven. Tipo de interés: [indicar tipo]",
      "tecnologia-y-telecomunicaciones":
        "Hola, quisiera solicitar una cotización para el servicio de tecnología y telecomunicaciones de Asiaven.",
      envases: "Hola, quisiera solicitar una cotización para el servicio de envases de Asiaven.",
      construccion: "Hola, quisiera solicitar una cotización para el servicio de construcción de Asiaven.",
      "recipientes-gas-licuado":
        "Hola, quisiera solicitar una cotización para el servicio de recipientes de gas licuado de Asiaven. Soy distribuidor.",
      "compras-internacionales":
        "Hola, quisiera solicitar una cotización para el servicio de compras internacionales de Asiaven.",
    },
  },
  packaging: {
    // No lo usa ninguna página en español (el catálogo /envases no pasa por
    // este diccionario) — existe solo para que en.ts, consumido por
    // /en/packaging.astro, tenga la misma forma (satisfies typeof es).
    pageTitle: "Catálogo de Envases",
    notice: "Nuestro catálogo completo de envases está disponible únicamente en español.",
    linkText: "Ver el catálogo en español",
  },
  projects: {
    pageTitle: "Nuestros Proyectos",
    introHeading: "Algunos de nuestros proyectos",
    brochureCta: "Ver más proyectos",
    clientsHeading: "Empresas que confían en nosotros",
    clients: [
      {
        nombre: "Hotel Humboldt",
        ubicacion: "Distrito Capital, Venezuela",
        sector: "Modernización / Mantenimiento",
      },
      {
        nombre: "Asamblea Nacional",
        ubicacion: "Distrito Capital, Venezuela",
        sector: "Proyectos de Elevación",
      },
      {
        nombre: "Sede Principal Corpoelec San Bernardino",
        ubicacion: "Caracas, Venezuela",
        sector: "Instalación de Escaleras Mecánicas",
      },
      {
        nombre: "Metro de Caracas – Estación Colegio de Ingenieros",
        ubicacion: "Caracas, Venezuela",
        sector: "Suministro e Instalación de 6 Escaleras Mecánicas",
      },
      {
        nombre: "Hospital Pediátrico Dr. Elías Toro",
        ubicacion: "Caracas, Venezuela",
        sector: "Instalación de 7 Ascensores de Alta Capacidad",
      },
      {
        nombre: "Bolivariana de Puertos (Bolipuertos)",
        ubicacion: "Venezuela",
        sector: "Mantenimiento Especializado de Ascensores",
      },
    ],
  },
  techSupport: {
    pageTitle: "Soporte Técnico y Drivers",
    driversHeading: "Controladores para tu Equipo AV",
    driversIntro:
      "Descarga los drivers y utilidades más recientes para tu Laptop, All-in-One, Mini-PC o Workstation Asiaven, con procesadores Intel y AMD de última generación.",
    driversCta: "Ver drivers",
    faqHeading: "Preguntas Frecuentes",
    faqs: [
      {
        question: "¿Cómo aplico la garantía SWAP de 3 años?",
        answer:
          "Contacta a nuestro equipo de soporte con el número de serie de tu equipo y una descripción de la falla. Validaremos la cobertura y coordinaremos el reemplazo a nivel nacional sin costo adicional.",
      },
      {
        question: "¿Dónde encuentro el número de serie de mi equipo AV?",
        answer:
          "El número de serie se encuentra en la etiqueta inferior o trasera del equipo (Laptop, All-in-One, Mini-PC o Workstation), y también puede consultarse desde el BIOS/UEFI del sistema.",
      },
      {
        question: "¿Los drivers son compatibles con Windows y Linux?",
        answer:
          "Sí, publicamos paquetes de controladores certificados tanto para Windows como para las principales distribuciones Linux empresariales, según el modelo de tu equipo.",
      },
      {
        question: "¿Qué cobertura tiene la conectividad 4G LTE integrada?",
        answer:
          "Los equipos portátiles con módulo 4G LTE integrado requieren una SIM activa de tu operador local. Nuestro equipo de soporte puede ayudarte con la configuración inicial.",
      },
    ],
    contactPrompt: "¿Tienes algún problema con tu equipo? Contáctanos para asistencia inmediata.",
  },
  legal: {
    privacy: {
      pageTitle: "Política de Privacidad",
      notice:
        "La versión legalmente vinculante de nuestra Política de Privacidad está disponible únicamente en español.",
      linkText: "Ver la versión en español",
    },
    terms: {
      pageTitle: "Términos de Servicio",
      notice:
        "La versión legalmente vinculante de nuestros Términos de Servicio está disponible únicamente en español.",
      linkText: "Ver la versión en español",
    },
  },
  notFound: {
    title: "Página no encontrada - Asiaven",
    heading: "Página no encontrada",
    message: "La página que buscas no existe o fue movida.",
    homeLabel: "Volver al inicio",
  },
  seo: {
    home: {
      title: "Asiaven - Inicio",
      description:
        "Grupo Asiaven - Soluciones corporativas integrales. Especialistas en movilidad vertical, infraestructura tecnológica, y equipamiento industrial de alto nivel.",
    },
    contact: {
      title: "Contáctanos - Asiaven",
      description:
        "Contáctanos para conocer más sobre las soluciones corporativas de Asiaven en infraestructura, movilidad vertical y tecnología industrial.",
    },
    projects: {
      title: "Nuestros Proyectos - Asiaven",
      description:
        "Conoce algunos de los proyectos de infraestructura, movilidad vertical y tecnología que Asiaven ha ejecutado para clientes corporativos y estatales.",
    },
    services: {
      title: "Nuestros Servicios - Asiaven",
      description:
        "Conoce todos los servicios de Grupo Asiaven: ascensores, escaleras mecánicas, tecnología, construcción y más.",
    },
    packaging: {
      // No la usa /envases (no pasa por el diccionario) — misma razón que
      // packaging.pageTitle más arriba: solo para que en.ts tenga la misma forma.
      title: "Catálogo de Envases - Asiaven",
      description: "El catálogo completo de envases de Asiaven está disponible en español.",
    },
    techSupport: {
      title: "Soporte Técnico y Drivers - Asiaven",
      description:
        "Descarga drivers, consulta la garantía SWAP y resuelve tus dudas sobre los equipos tecnológicos Asiaven.",
    },
    privacy: {
      title: "Política de Privacidad - Asiaven",
      description: "Política de privacidad de Asiaven.",
    },
    terms: {
      title: "Términos de Servicio - Asiaven",
      description: "Términos de servicio de Asiaven.",
    },
  },
};

export default es;
