/**
 * Número de WhatsApp único para todos los enlaces "wa.me" del sitio (botón
 * flotante, CTAs de cotización de servicios, CTA del cilindro de GLP, CTA de
 * asesoría de compra de la Store). Cambiarlo aquí es suficiente — ningún
 * otro archivo debe tener el número escrito literalmente.
 *
 * No confundir con el teléfono de contacto de la oficina de Venezuela
 * ("+58 212-9924333" en Footer.astro, StoreFooter.astro, contactanos.astro,
 * en/contact.astro) — ese es un dato de contacto de la empresa, no un
 * destino de enlace, y es un número distinto a propósito.
 */
export const WHATSAPP_NUMBER = "584122712253";

/** Construye un enlace wa.me, con mensaje precargado si se provee. */
export function buildWhatsappHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
