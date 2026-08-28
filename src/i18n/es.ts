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
    addressLabel: "Dirección",
    phoneLabel: "Teléfono",
    emailLabel: "Email",
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
  seo: {
    contact: {
      title: "Contáctanos - Asiaven",
      description:
        "Contáctanos para conocer más sobre las soluciones corporativas de Asiaven en infraestructura, movilidad vertical y tecnología industrial.",
    },
  },
};

export default es;
