// Lógica vanilla compartida entre los formularios estáticos de Soporte y
// Ventas (ticket.astro, contacto-ventas.astro): validación simple al enviar
// y el toggle B2B/B2C ("¿Compras para una empresa?" / campo Empresa oculto).
// Los formularios React (BTOForm.tsx, QuoteRequestForm.tsx) manejan este
// mismo patrón con useState y no usan este helper.
interface SupportFormConfig {
  formId: string;
  submitId: string;
  successMessage: string;
  toggleLabelOn: string;
  toggleLabelOff: string;
}

export function initSupportForm({ formId, submitId, successMessage, toggleLabelOn, toggleLabelOff }: SupportFormConfig) {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const submitButton = document.getElementById(submitId);

  submitButton?.addEventListener("click", () => {
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }
    alert(successMessage);
  });

  const toggleButton = form?.querySelector<HTMLButtonElement>(".toggle-b2b");
  const businessFields = form?.querySelector<HTMLElement>(".business-fields");

  toggleButton?.addEventListener("click", () => {
    businessFields?.classList.toggle("hidden");
    const isHidden = businessFields?.classList.contains("hidden");
    toggleButton.textContent = isHidden ? toggleLabelOn : toggleLabelOff;
  });
}
