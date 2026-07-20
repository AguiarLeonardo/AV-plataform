# Asiaven — Plataforma B2B y Sitio Corporativo

Plataforma web de Asiaven, un holding con sede en Venezuela especializado en infraestructura, movilidad vertical, tecnología industrial y manufactura. El proyecto tiene dos ecosistemas independientes bajo un mismo repositorio:

- **Sitio corporativo** (`/`, `/servicios`, `/proyectos`, `/contactanos`, `/envases`, etc.) — presencia institucional orientada a captar clientes corporativos de alto perfil.
- **Asiaven Store** (`/store/*`) — plataforma de e-commerce B2B para equipos tecnológicos: catálogo con sidebar de filtros, ficha de producto (PDP), carrito de cotización, configuradores Build-to-Order y centro de soporte técnico.

## Stack Tecnológico

- **[Astro](https://astro.build)** — framework principal, arquitectura MPA (Multi-Page App) con generación estática.
- **React** — islas interactivas (`client:load`) donde se requiere estado del lado del cliente: navegación de la Tienda, filtros de catálogo, formularios BTO, carrito de cotización.
- **TypeScript** — tipado en componentes React y utilidades compartidas.
- **Tailwind CSS v4** — sistema de estilos basado en utilidades atómicas.
- **Lucide React** — sistema de íconos.

## Desarrollo

```sh
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # build de producción a ./dist/
npm run preview  # previsualizar el build localmente
```

## Estado del Proyecto

El estado detallado de las tareas, arquitectura, decisiones de diseño y deuda técnica pendiente se documenta en [`ESTADO_PROYECTO.md`](./ESTADO_PROYECTO.md) — es la fuente de verdad para retomar el desarrollo entre sesiones. Las convenciones de negocio, marca y UI/UX del sitio corporativo están en [`CONVENCIONES.md`](./CONVENCIONES.md).
