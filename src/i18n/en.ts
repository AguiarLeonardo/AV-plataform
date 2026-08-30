export default {
  home: {
    hero: {
      prevLabel: "Previous slide",
      nextLabel: "Next slide",
      goToSlideLabel: "Go to slide",
      slides: [
        {
          overline: "MORE THAN A LUXURY, A NECESSITY",
          title: "The vision became reality",
          subtitle:
            "We offer comprehensive solutions in construction, heavy machinery supply, and cutting-edge technology distribution with global standards.",
          image: "/images/corporativo/banners/hero/banner-vision-realidad.webp",
          ctas: [
            { text: "See our services", routeKey: "services" as const, primary: true },
            { text: "View Projects", routeKey: "projects" as const, primary: false },
          ],
        },
        {
          title: "Precision Engineering in Vertical Mobility",
          subtitle:
            "Specialists in the installation, modernization, and maintenance of elevator and escalator systems with international standards.",
          image: "/images/corporativo/banners/hero/banner-movilidad-vertical.webp",
          ctas: [{ text: "Elevation Solutions", href: "/servicios/ascensores", primary: true }],
        },
        {
          title: "Innovation in Packaging Solutions",
          subtitle:
            "Manufacturing of high-resistance containers and packaging for the industrial and commercial sector, ensuring maximum durability.",
          image: "/images/corporativo/banners/hero/banner-envasado-innovacion.webp",
          ctas: [{ text: "View Catalog", href: "/servicios/envases", primary: true }],
        },
        {
          title: "State-of-the-Art Technology Equipment",
          subtitle:
            "Supply of corporate hardware, servers, and network infrastructure. Latest-generation equipment backed by a 3-year comprehensive warranty.",
          image: "/images/corporativo/banners/hero/banner-equipamiento-tecnologico.webp",
          ctas: [
            { text: "Technology Division", href: "/servicios/tecnologia-y-telecomunicaciones", primary: true },
          ],
        },
      ],
    },
    stats: {
      items: [
        { value: "802+", label: "Successful Projects" },
        { value: "18+", label: "Years in the market" },
        { value: "50+", label: "International and National Companies" },
        { value: "30+", label: "Employees and counting" },
      ],
    },
    video: {
      fallbackText: "Your browser does not support video playback. Contact us to learn more about Asiaven.",
      activateSoundLabel: "Turn on sound",
      muteLabel: "Mute",
    },
    about: {
      heading: "Excellence and Corporate Strength",
      imageAlt: "About Asiaven",
      paragraph:
        "With more than 18 years of experience in the market, we have established ourselves as a strategic partner in the country's development. We carry out highly complex technical projects for leading corporate and government entities, offering solutions that integrate cutting-edge technology with industrial robustness.",
      items: [
        {
          title: "Global Quality Standards.",
          description:
            "Internationally certified equipment (ISO, CE, FCC), ensuring durability and efficiency in every implementation.",
        },
        {
          title: "Institutional Backing.",
          description:
            "Proven experience in mega-projects for the energy, telecommunications, and public infrastructure sectors.",
        },
        {
          title: "Comprehensive Technical Support.",
          description:
            'Nationwide coverage with preventive maintenance plans and "swap"-type warranty for our technology division.',
        },
      ],
    },
    missionVision: {
      mission: {
        heading: "Mission",
        imageAlt: "Mission",
        text: "To use innovative technologies based on each client's business needs, with the goal of increasing their competitiveness through creative solutions adapted to their practical environment.",
      },
      vision: {
        heading: "Vision",
        imageAlt: "Vision",
        text: "To become a global benchmark with our flagship Asiaven elevator products, solving all of our clients' challenges with tailored solutions that make us the best alternative for businesses in this field.",
      },
    },
    services: {
      heading: "Our Services",
      viewAllLabel: "View all",
      carousel: {
        ctaLabel: "View details",
        prevLabel: "Previous service",
        nextLabel: "Next service",
        goToSlideLabel: "Go to slide",
      },
    },
    affiliates: {
      eyebrow: "Asiaven Companies",
      heading: "Our Specialized Divisions",
      intro: "The backing of Grupo Asiaven, structured to serve every strategic sector.",
      divisions: [
        {
          name: "AV Constructora",
          description: "Infrastructure projects, civil works, and industrial development.",
        },
        {
          name: "AV Elevators",
          description: "Solutions in elevation equipment, cranes, and elevated work platforms.",
        },
        {
          name: "AV Maquinarias Pesadas",
          description: "Rental, sale, and support of heavy machinery for mining and construction.",
        },
        {
          name: "AV Tecnología",
          description: "Technology solutions, automation, and industrial systems development.",
        },
      ],
    },
  },
  common: {
    storeLabel: "Store",
    officeVenezuela: "Venezuela Office",
    officeUnitedStates: "United States Office",
    usOfficeAddress: "1234 Miami Ave, Suite 100, Miami, FL 33132, USA",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    defaultDescription:
      "Grupo Asiaven - Comprehensive corporate solutions. Specialists in vertical mobility, technological infrastructure, and top-tier industrial equipment.",
    whatsappLabel: "Contact us on WhatsApp",
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    services: "Services",
    contact: "Contact",
    openMenu: "Open menu",
  },
  footer: {
    description:
      "Comprehensive solutions in infrastructure and technology, from civil engineering to state-of-the-art corporate equipment.",
    quickLinksHeading: "Quick Links",
    contactHeading: "Contact",
    legalHeading: "Legal",
    storeBridge: "AV Store",
    termsLabel: "Terms of Service",
    privacyLabel: "Privacy Policy",
    copyrightSuffix: "Asiaven. All rights reserved.",
  },
  contact: {
    pageTitle: "Contact Details",
    officesHeading: "Our Offices",
    mapTitle: "Asiaven location on Google Maps",
    formHeading: "Send Us a Message",
    formIntro:
      "At Grupo Asiaven, we're available for you at all times. Get in touch — we want to hear from you. Your feedback matters to us.",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldSubject: "Subject",
    fieldMessage: "Message",
    submitButton: "Send",
    moreInfoEyebrow: "More Information",
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        question: "What type of maintenance do elevator and escalator machines require?",
        answer:
          "Our machines are designed to be efficient and durable, but like any mechanical equipment they require regular preventive maintenance. We offer customized maintenance plans that include periodic inspections, lubrication, and the adjustments needed to keep your equipment running smoothly and avoid costly downtime.",
      },
      {
        question: "How do you guarantee the safety of the elevators and escalators you sell?",
        answer:
          "Safety is our priority. All our products comply with international safety standards and undergo rigorous quality testing. Our systems are also equipped with advanced fault-detection technology, emergency brakes, and overload controllers, guaranteeing maximum protection for users.",
      },
      {
        question:
          "How can I know which equipment is right for my project (elevators, escalators, or parking systems)?",
        answer:
          "We offer personalized guidance for every client. Our experts assess the size and type of your project, the expected number of users, and the building or space specifications to recommend the best-suited solution. From small residential elevators to large systems for commercial buildings, we have the right equipment for every need.",
      },
    ],
  },
  services: {
    carousel: {
      prevLabel: "Previous product",
      nextLabel: "Next product",
    },
    viewer360: {
      buttonLabel: "View 360° tour",
      closeLabel: "Close",
      loadingText: "Loading panorama…",
      errorText: "We couldn't load the 360° view. Please try again later.",
    },
  },
  projects: {
    pageTitle: "Our Projects",
    introHeading: "Some of our projects",
    clientsHeading: "Companies that trust us",
    clients: [
      {
        // Nombres propios: se conservan tal cual, con una aclaración en
        // inglés cuando ayuda (nunca como reemplazo del nombre). Los
        // topónimos administrativos (ubicacion) NUNCA se traducen.
        nombre: "Hotel Humboldt",
        ubicacion: "Distrito Capital, Venezuela",
        sector: "Modernization / Maintenance",
      },
      {
        nombre: "Asamblea Nacional (Venezuela's National Assembly)",
        ubicacion: "Distrito Capital, Venezuela",
        sector: "Elevation Projects",
      },
      {
        nombre: "Corpoelec Headquarters, San Bernardino",
        ubicacion: "Caracas, Venezuela",
        sector: "Escalator Installation",
      },
      {
        nombre: "Metro de Caracas – Colegio de Ingenieros Station",
        ubicacion: "Caracas, Venezuela",
        sector: "Supply and Installation of 6 Escalators",
      },
      {
        nombre: "Hospital Pediátrico Dr. Elías Toro",
        ubicacion: "Caracas, Venezuela",
        sector: "Installation of 7 High-Capacity Elevators",
      },
      {
        nombre: "Bolivariana de Puertos (Bolipuertos)",
        ubicacion: "Venezuela",
        sector: "Specialized Elevator Maintenance",
      },
    ],
  },
  techSupport: {
    pageTitle: "Technical Support & Drivers",
    driversHeading: "Drivers for Your AV Equipment",
    driversIntro:
      "Download the latest drivers and utilities for your Asiaven Laptop, All-in-One, Mini-PC, or Workstation, featuring the latest generation Intel and AMD processors.",
    driversCta: "View drivers",
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        question: "How do I claim the 3-year SWAP warranty?",
        answer:
          "Contact our support team with your equipment's serial number and a description of the issue. We'll validate coverage and coordinate a nationwide replacement at no additional cost.",
      },
      {
        question: "Where can I find my AV equipment's serial number?",
        answer:
          "The serial number is located on the bottom or back label of your equipment (Laptop, All-in-One, Mini-PC, or Workstation), and can also be checked from the system's BIOS/UEFI.",
      },
      {
        question: "Are the drivers compatible with Windows and Linux?",
        answer:
          "Yes, we publish certified driver packages for both Windows and major enterprise Linux distributions, depending on your equipment model.",
      },
      {
        question: "What coverage does the built-in 4G LTE connectivity offer?",
        answer:
          "Portable devices with a built-in 4G LTE module require an active SIM from your local carrier. Our support team can help you with initial setup.",
      },
    ],
    contactPrompt: "Having an issue with your equipment? Contact us for immediate assistance.",
  },
  legal: {
    privacy: {
      pageTitle: "Privacy Policy",
      notice: "The legally binding version of our Privacy Policy is only available in Spanish.",
      linkText: "View the Spanish version",
    },
    terms: {
      pageTitle: "Terms of Service",
      notice: "The legally binding version of our Terms of Service is only available in Spanish.",
      linkText: "View the Spanish version",
    },
  },
  notFound: {
    title: "Page Not Found - Asiaven",
    heading: "Page not found",
    message: "The page you're looking for doesn't exist or was moved.",
    homeLabel: "Back to home",
  },
  seo: {
    home: {
      title: "Asiaven - Home",
      description:
        "Grupo Asiaven - Comprehensive corporate solutions. Specialists in vertical mobility, technological infrastructure, and top-tier industrial equipment.",
    },
    contact: {
      title: "Contact Us - Asiaven",
      description:
        "Get in touch to learn more about Asiaven's corporate solutions in infrastructure, vertical mobility, and industrial technology.",
    },
    projects: {
      title: "Our Projects - Asiaven",
      description:
        "Discover some of the infrastructure, vertical mobility, and technology projects Asiaven has delivered for corporate and government clients.",
    },
    techSupport: {
      title: "Technical Support & Drivers - Asiaven",
      description:
        "Download drivers, check your SWAP warranty, and get answers about Asiaven technology equipment.",
    },
    privacy: {
      title: "Privacy Policy - Asiaven",
      description: "Asiaven's privacy policy.",
    },
    terms: {
      title: "Terms of Service - Asiaven",
      description: "Asiaven's terms of service.",
    },
  },
} satisfies typeof import("./es").default;
