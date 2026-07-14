# Contexto y Arquitectura del Proyecto: Asiaven B2B

## Visión General

Desarrollo de la plataforma corporativa web (B2B) para **Asiaven**, un holding internacional con sede en Venezuela y más de 15 años de experiencia (fundada en 2010). La empresa se especializa en proveer soluciones de infraestructura, mantenimiento, tecnología industrial y manufactura. El objetivo del sitio es proyectar madurez, solidez empresarial y captar clientes corporativos de alto perfil.

---

## Stack Tecnológico

| Tecnología          | Rol en el Proyecto        | Justificación                                                                                              |
| ------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Astro**           | Framework Principal (MPA) | Enrutamiento basado en archivos, generación estática, ligereza extrema sin lógica de estado global pesada. |
| **React**           | Interactividad UI (Islas) | Utilizado exclusivamente donde se requiere estado del lado del cliente (ej. `ServicesCarousel.tsx`).       |
| **Tailwind CSS v4** | Sistema de Estilos        | Utilidades atómicas estrictas, sin hojas de estilo externas, garantizando consistencia y rendimiento.      |
| **Lucide React**    | Sistema de Íconos         | Íconos vectoriales consistentes, renderizados estáticamente en Astro para no bloquear la carga.            |

---

## Reglas de Desarrollo y UI/UX

### 1. Sistema Visual y Corporativo

- **Colores Base:** Uso estricto de una paleta profesional basada en _Titanium Gray_ (grises oscuros/metálicos) y _Navy Blue_ (azul corporativo para acentos y llamadas a la acción).
- **Tipografía:** Limpia, sin serifas. Títulos imponentes (`font-extrabold`, `tracking-tight`) y textos legibles con buen contraste.
- **Imágenes:** Fotografías de stock _premium_ (Unsplash) orientadas a la ingeniería, arquitectura y maquinaria.
- **Efecto Scrim:** Toda imagen de fondo que lleve texto encima debe usar un overlay oscuro (gradiente o `bg-black/65`) para garantizar un contraste de accesibilidad AAA.

### 2. Estructura y Responsividad

- **Viewport Dinámico:** Uso obligatorio de unidades dinámicas (`dvh`) en lugar de `vh` estándar para evitar rupturas de diseño en navegadores móviles (barras de navegación del SO).
- **Efecto Peekaboo (Asomo):** En el `Hero.astro`, la altura se calcula mediante `h-[calc(100dvh-100px)]` para permitir que el contenido inferior (estadísticas) sea visible parcialmente sin hacer scroll.
- **Respiro Visual (White Space):** Uso generoso de paddings (`py-16`, `pb-20`) para separar secciones. El contenido no debe sentirse aglomerado.

### 3. Buenas Prácticas de Código

- **Manejo de Íconos de Marca:** Los logotipos de marcas externas (ej. WhatsApp) no usan Lucide. Se inyectan mediante código `<svg>` nativo para evitar fallos de renderizado de la librería.
- **Flexbox para Grillas Irregulares:** Cuando una cuadrícula CSS (`grid`) deja elementos desbalanceados en la última fila (ej. 8 servicios en 3 columnas), se utiliza `flex flex-wrap` con anchos calculados (`calc()`) para forzar el centrado perfecto de la última fila.
- **Componentes Reutilizables:** Centralización de elementos repetitivos, como el `PageHeader.astro`, que estandariza la cabecera de todas las páginas internas.

---

## Estructura de Rutas y Páginas (MPA)

- `/` **(Landing Page):** Contiene el Hero (peekaboo), franja de estadísticas, Misión/Visión, y el carrusel interactivo de servicios.
- `/servicios` **(Catálogo):** Muestra el portafolio completo (8 servicios actuales). Implementa una cuadrícula basada en Flexbox centrada.
- `/servicios/[servicio]` **(Rutas Dinámicas):** Plantilla base para renderizar información específica de cada servicio basándose en un parámetro (slug).
- `/proyectos` **(Client Roster):** Lista de experiencia y clientes corporativos.

---

## Directrices de Negocio (Business Rules)

- **Enfoque en el Servicio, no en la Marca del Cliente:** Por motivos de confidencialidad y estrategia de ventas, la sección de Proyectos no debe utilizar fotografías de las instalaciones de los clientes (ej. Hotel Humboldt, Asamblea Nacional).
- **Client Roster Tipográfico:** La experiencia de la empresa se demuestra mediante un diseño de lista premium (tarjetas corporativas), destacando el nombre del proyecto, ubicación y el tipo de intervención técnica realizada por Asiaven.

Claude: Cada vez que inicies una sesión o vayas a crear un nuevo componente, debes leer este archivo para garantizar que respetas las reglas de Tailwind v4, Astro y las directrices de negocio de Asiaven.

## Base de Conocimiento Corporativo (Knowledge Base)

### Identidad y Filosofía
* **Nombre Oficial:** Grupo Asiaven (F. 1 de enero de 2010).
* **Slogan Principal:** "La visión se hizo realidad" / "Construye tu sueño".
* **Slogan Secundario:** "El camino hacia el éxito siempre está en construcción".
* **Propuesta de Valor Integral:** "Más que un lujo es una necesidad. Asiaven está compuesto por diversas filiales que abarcan desde la construcción de infraestructuras hasta la implementación de sistemas de ascensores y motores. Ofrecemos servicios de construcción, maquinaria pesada e importación y distribución de productos con estándares de calidad global."
* **Misión:** Utilizar tecnologías innovadoras dependiendo de las necesidades del cliente a nivel empresarial con el objetivo de incrementar su competitividad mediante soluciones creativas adaptadas al entorno práctico del mismo.
* **Visión:** Poder ser referente mundial con nuestros principales productos elevadores Asiaven y solventar todos los problemas de nuestros clientes dándole soluciones a medida para convertirnos en la mejor alternativa de las empresas en esta área.

### Cifras Oficiales (Estadísticas)
* **18+** Años en el mercado / Éxito Invicto.
* **802** Proyectos Exitosos / Realizados.
* **50+** Empresas Internacionales y Nacionales.
* **30+** Trabajadores y sumando.
* **51K** Seguidores.

### Catálogo Oficial de Servicios (8 Servicios)
1. Ascensores
2. Escaleras Mecánicas
3. Compras Internacionales
4. Mantenimiento
5. Tecnología
6. Construcción
7. Envasados
8. Recipientes de Gas Licuado

### División Tecnológica (Equipos AV)
* **Portafolio:** Laptops, All-in-One, Mini-PCs, Workstations y Monitores corporativos.
* **Procesadores:** Intel y AMD de última generación.
* **Garantía:** 3 años de garantía post-venta con soporte integral tipo swap (reemplazo) a nivel nacional.
* **Conectividad:** Integración 4G LTE en equipos portátiles.

### Beneficios Clave (Value Props)
* **Horario Flexible:** Consulta en la hora que mejor sea ideal para ti.
* **Paquete Asequible:** Amplia variedad de equipos ofrecidos.
* **Cobertura Nacional:** En cualquier estado del país, si deseas concretar algún proyecto, lo llevamos hacia ti.

### Datos de Contacto y Ubicación
* **Sede Principal:** C.C Paseo Las Mercedes, Piso 2, Caracas, Venezuela.
* **Teléfono:** +58 212-9924333
* **Email:** proyectos@asiaven.com
* **Director Comercial:** Jackson Barroso | jb@asiaven.com
* **Soporte:** soporte@asiaven.com

### Client Roster (Cartera de Clientes)
* Fundación Propatria
* Pequiven
* Distribuidora Adelina. C.A
* Landscape Vision Corp.
* Hotel Humboldt
* Asian Commerce. LTD
* Telecomunicaciones Asiaven
* Belcor Diseño Construcción
* PDVSA
* Corpoelec
* Metro de Caracas
* Despacho de la Presidencia
* Ministerios
* Estadio Monumental Simón Bolívar
* Bolipuertos
* INEA
