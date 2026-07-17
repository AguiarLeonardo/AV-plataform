import { useState } from "react";
import { clearCart } from "../../store/quoteCart";

export default function QuoteRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => {
      window.location.href = "/store";
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">¡Solicitud enviada!</p>
        <p className="mt-2 text-sm text-green-700">
          Tu solicitud fue enviada a <span className="font-semibold">ventas@asiaven.com</span>. Nuestro equipo de
          ventas se pondrá en contacto contigo pronto.
        </p>
        <p className="mt-4 text-xs text-green-600">Redirigiendo a la tienda...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Tus Datos</h3>
        <button
          type="button"
          onClick={() => setIsBusiness(!isBusiness)}
          className="text-sm text-gray-500 hover:text-blue-600 underline transition-colors"
        >
          {isBusiness ? "¿Compra personal?" : "¿Compras para una empresa?"}
        </button>
      </div>

      <div>
        <label htmlFor="quote-name" className="mb-1 block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
        />
      </div>

      {isBusiness && (
        <div>
          <label htmlFor="quote-company" className="mb-1 block text-sm font-medium text-gray-700">
            Empresa
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            required={isBusiness}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
          />
        </div>
      )}

      <div>
        <label htmlFor="quote-email" className="mb-1 block text-sm font-medium text-gray-700">
          Correo
        </label>
        <input
          id="quote-email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="quote-phone" className="mb-1 block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="quote-message" className="mb-1 block text-sm font-medium text-gray-700">
          Mensaje (opcional)
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-corporativo-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-corporativo-blue/90"
      >
        Enviar Solicitud de Cotización
      </button>
    </form>
  );
}
