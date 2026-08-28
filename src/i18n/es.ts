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
  projects: {
    pageTitle: "Nuestros Proyectos",
    introHeading: "Algunos de nuestros proyectos",
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
  seo: {
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
