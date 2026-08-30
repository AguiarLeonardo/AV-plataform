// Pannellum no publica tipos ni un @types/pannellum oficial — es una
// librería legacy que se importa por sus efectos secundarios (asigna
// window.pannellum). La forma pública usada (PannellumGlobal/PannellumViewer)
// está tipada a mano en Panorama360Modal.tsx; estas declaraciones solo
// existen para que TypeScript acepte el import() dinámico de los subpaths.
declare module "pannellum/build/pannellum.js";
declare module "pannellum/build/pannellum.css";
