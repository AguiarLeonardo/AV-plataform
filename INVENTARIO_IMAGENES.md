# Inventario Maestro de Imágenes — Asiaven

Documento de control para el equipo de contenido/fotografía. Lista **todas** las
imágenes reales (fotografías o renders) que deben producirse o conseguirse para
reemplazar los placeholders actuales (100% Unsplash/placehold.co en este momento)
en el sitio corporativo, el catálogo de Envases y la Store de tecnología.

**Cómo usar este documento:** marca el checkbox `- [x]` cuando la imagen final
esté producida, aprobada e integrada en el código.

**Excluido de este inventario:** la sección `/proyectos` (tarjetas de los 6
proyectos del portafolio) — regla de negocio de confidencialidad de clientes ya
establecida, esas tarjetas son y seguirán siendo tipográficas, sin fotos.

---

## 1. Sitio Principal (Corporativo)

### 1.1 Hero Slider (`HeroSlider.tsx` — landing page)
Formato: **Panorámica / 16:9 a 21:9** (banner full-screen, `object-cover`, `h-[82dvh]`+).

- [ ] Slide 1 — "La visión se hizo realidad": fachada/obra corporativa de Asiaven (construcción, maquinaria, tecnología).
- [ ] Slide 2 — "Innovación en Soluciones de Envasado": línea de fabricación de latas/envases metálicos.
- [ ] Slide 3 — "Ingeniería de Precisión en Movilidad Vertical": ascensor o escalera mecánica en operación.
- [ ] Slide 4 — "Vanguardia en Equipamiento Tecnológico": hardware/servidores/data center.

### 1.2 Sección "Nosotros" (`About.astro`)
Formato: **Vertical/libre** (columna del grid 2 columnas, `object-cover`).

- [ ] 1x foto de oficina o equipo corporativo real de Asiaven.

### 1.3 Misión y Visión (`MissionVision.astro`)
Formato: **Vertical / bloque alto** (`min-h-[50–60dvh]`, `object-cover` + overlay de color).

- [ ] "Misión": personas/equipo Asiaven en operación de campo.
- [ ] "Visión": imagen aspiracional de horizonte/futuro tecnológico corporativo.

### 1.4 Divisiones / Afiliadas (`Affiliates.astro`)
Formato: **Horizontal (banda)** — `h-52`, `object-cover`.

- [ ] "División de Infraestructura": obra civil / envasado industrial.
- [ ] "División de Movilidad Vertical": ascensores/escaleras mecánicas.
- [ ] "División Tecnológica y Maquinaria": hardware, telecom, equipos.

### 1.5 Banners de cabecera — `PageHeader.astro` (usado en varias páginas internas)
Formato: **Panorámica / 16:9** (`h-[35vh]`, `object-cover`, overlay `bg-black/65`).

- [ ] `/servicios` — banner "Nuestros Servicios" (instalación/mantenimiento genérico).
- [ ] `/proyectos` — banner "Nuestros Proyectos" (nota: solo el banner de cabecera necesita foto; las 6 tarjetas del listado NO — ver exclusión arriba).
- [ ] `/contactanos` — banner "Detalles de Contacto" (oficina/recepción de Asiaven).
- [ ] `/soporte-tecnico` — banner "Soporte Técnico y Drivers" (hardware/telecom).

### 1.6 Sliders de Servicios (`src/data/services.ts` — `ServiceSlider.tsx`, cuadrado 1:1)
Formato: **Cuadrada / 1:1** por cada una de las 3 imágenes de cada servicio.

- [ ] **Ascensores** (3 fotos): ascensor en edificio, cabina de ascensor, instalación/mantenimiento.
- [ ] **Escaleras mecánicas** (3 fotos): escalera en centro comercial/metro, vista de peldaños, rampa mecánica.
- [ ] **Tecnología y Telecomunicaciones** (3 fotos): sala de servidores/racks, oficina con equipos, torre de telecomunicaciones.
- [ ] **Envases** (3 fotos): latas metálicas en línea de producción (pueden reutilizar las mismas fotos de producto de envases, sección 2).
- [ ] **Construcción** (3 fotos): obra en construcción, estructura metálica, maquinaria pesada.
- [ ] **Recipientes de gas licuado** (3 fotos): cilindros/tanques de gas industrial.
- [ ] **Mantenimiento** (3 fotos): técnico realizando mantenimiento, taller, inspección de equipos.
- [ ] **Compras internacionales** (3 fotos): puerto/contenedores, logística de importación, oficina de comercio.

### 1.7 Sliders de producto adicionales (`ProductFeatureSlider.tsx`, dentro de `[servicio].astro`)
Formato: **Vertical/libre** (`h-64` mobile, `h-full` desktop).

- [ ] Ascensores Residenciales — cabina/interior residencial.
- [ ] Ascensores para Oficina — hall de oficina con ascensor.
- [ ] Ascensores Panorámicos — cabina de vidrio panorámica.
- [ ] Ascensores para Hospitales — ascensor de camillas en hospital.
- [ ] Escaleras Mecánicas — tramo de escalera en uso.
- [ ] Rampas Mecánicas — rampa mecánica horizontal/inclinada.

### 1.8 Logos de Clientes (`ClientLogosCarousel.tsx` en `/proyectos`)
Formato: **Logo PNG/SVG, fondo transparente**, banda `h-24 w-48`, `object-contain`.
Actualmente son cajas grises `placehold.co` con el nombre en texto — máxima prioridad visual por lo notorio del placeholder.

- [ ] PDVSA
- [ ] Corpoelec
- [ ] Metro de Caracas
- [ ] Asamblea Nacional
- [ ] Banco Industrial
- [ ] Pequiven
- [ ] Hotel Humboldt
- [ ] Fundación Propatria
- [ ] Distribuidora Adelina C.A
- [ ] Landscape Vision Corp.
- [ ] Asian Commerce LTD
- [ ] Telecomunicaciones Asiaven
- [ ] Belcor Diseño Construcción
- [ ] Despacho de la Presidencia
- [ ] Ministerios
- [ ] Estadio Monumental Simón Bolívar
- [ ] Bolipuertos
- [ ] INEA

---

## 2. Catálogo de Envases (`/envases` — `packagingCatalog.ts`)

**Diseño actual de imágenes:** una sola foto por **categoría** (no por subcategoría ni por producto individual) se usa en el acordeón del hub y se reutiliza en todas las tarjetas de producto de esa categoría en `/envases/[categoria]`. La ficha de producto individual (`/envases/producto/[slug]`) no muestra imagen.

**Recuento exacto del catálogo actual** (todo transcrito de `catalogo_latas_asiaven.md`): **5 categorías, 11 subcategorías, 62 modelos/variantes de producto específicos.**

Formato: **Panorámica / 16:9** (`aspect-video` en tarjetas de `/envases/[categoria]`) y **Horizontal amplia** para el fondo del acordeón del hub (`h-[70–80vh]`, `object-cover`).

### 2.1 Mínimo recomendado — 1 foto por categoría (uso actual del código)
- [ ] Línea de Latas de Tres Piezas
- [ ] Línea Latas de Aluminio
- [ ] Línea Botellas de Aluminio
- [ ] Línea Cubierta de Aluminio
- [ ] Línea Tapas Giratorias Tipo Garra

### 2.2 Recomendado (calidad premium) — 1 foto por subcategoría, mostrando el modelo representativo
- [ ] Alimentos Secos (5 modelos: 209/211/209x309, x400, x408, x413, x507)
- [ ] Bebidas (9 modelos)
- [ ] Tanque Especial (9 modelos: Tanque Reforzado, Tanque en Forma, Latas 204, Lata de Cerveza, Gran Capacidad, Tarro para Sardinas)
- [ ] Tanque Estándar (6 modelos)
- [ ] Tanque de Fibra Delgado (1 modelo)
- [ ] Lata de Cuerpo Delgado (10 modelos)
- [ ] Botellas de Aluminio (4 modelos)
- [ ] Cubierta Superior (4 modelos)
- [ ] Cubierta Inferior (3 modelos)
- [ ] Modelos X30–X82 — Tapas Giratorias (11 modelos)

### 2.3 Ideal (cobertura total) — foto individual de cada uno de los 62 modelos
Sobre fondo blanco/estudio, encuadre de producto. Ver `packagingCatalog.ts` para la lista completa de 62 slugs de producto (agrupados por subcategoría arriba). No se listan uno por uno aquí por volumen — usar la sección 2.2 como checklist de grupos y fotografiar variantes de tamaño dentro de cada uno según prioridad comercial.

---

## 3. Ecosistema Store (`/store` — `techCatalog.ts`)

**Diseño actual:** cada uno de los **32 productos tecnológicos reales** tiene su propio campo `image` individual (a diferencia de Envases). Varias de estas URLs de Unsplash ya se reciclan entre 2-3 productos distintos que deberían tener fotos diferenciadas. No hay banners ni imágenes promocionales adicionales en `StoreNavigation.tsx`, `/store/index.astro` ni `/store/[categoria].astro` — son 100% texto/iconos SVG.

Formato: **Cuadrada / libre, fondo blanco de producto** (`StoreProductCard.astro`, contenedor `h-40`, `object-contain`) — estilo catálogo de e-commerce, no lifestyle.

### 3.1 Computación y Dispositivos de Usuario (10 productos)
- [ ] Laptop Ejecutiva UltraSlim
- [ ] Laptop Workstation Móvil
- [ ] Laptop UltraSlim Corporativa
- [ ] PC Básica de Oficina
- [ ] PC Corporativa OptiPro 3000
- [ ] PC Alto Rendimiento X-Treme
- [ ] Mini-PC Industrial Edge
- [ ] Mini-PC Oficina Compacta
- [ ] Monitor Profesional 24"
- [ ] Monitor Curvo 34" UltraWide

### 3.2 Infraestructura IT y Telecomunicaciones (6 productos)
- [ ] Servidor Rack Pro 1U
- [ ] Servidor Torre Empresarial
- [ ] Switch Gestionado 48 Puertos PoE
- [ ] Switch de Acceso 24 Puertos
- [ ] Router Empresarial VPN
- [ ] Router de Sucursal Multi-WAN

### 3.3 Audiovisual y Cartelería Digital (4 productos)
- [ ] Pantalla LED Outdoor P4 Pro
- [ ] Pantalla LED Indoor P2.5
- [ ] Videowall Modular UltraSlim 3x3
- [ ] Videowall Compacto 2x2

### 3.4 Centros de Operaciones y Espacios Inteligentes (4 productos)
- [ ] Centro de Cómputo Modular Tier III
- [ ] Centro de Cómputo Compacto Edge
- [ ] Sala Situacional Ejecutiva
- [ ] Sala Situacional Compacta

### 3.5 Respaldo, Seguridad y Climatización Crítica (4 productos)
- [ ] UPS Enterprise 20kVA Online
- [ ] UPS Compacta 3kVA Line-Interactive
- [ ] Aire de Precisión CRAC 5TR
- [ ] Aire de Precisión CRAC 10TR

### 3.6 Software, Servicios y Proyectos (4 "productos" — sin equipo físico)
Nota: estos 4 ítems son paquetes de servicio, no hardware — considerar reemplazar por imágenes conceptuales/ilustrativas en vez de fotografía de producto real.
- [ ] Paquete Desarrollo Web Corporativo
- [ ] Paquete Desarrollo de Aplicaciones Móviles
- [ ] Paquete Gestión de Proyecto Estándar
- [ ] Paquete Gestión de Proyecto Premium

---

## Resumen numérico

| Área | Ítems que requieren imagen | Estado |
|---|---|---|
| Sitio Principal — banners, secciones y sliders de servicios | ~30 fotos + 18 logos | 0% real |
| Envases — mínimo por categoría | 5 fotos | 0% real |
| Envases — recomendado por subcategoría | 11 fotos | 0% real |
| Envases — ideal por modelo | 62 fotos | 0% real |
| Store — producto individual | 32 fotos | 0% real |

**Total de placeholders activos en el proyecto: 100% Unsplash/placehold.co.** Ninguna imagen real existe todavía en `/public` ni `/src/assets`.
