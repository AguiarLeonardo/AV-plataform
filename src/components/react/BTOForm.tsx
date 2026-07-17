import { useMemo, useState } from "react";

interface OptionSpec {
  label: string;
  options: { label: string; value: string; extra: number }[];
}

interface BTOConfig {
  title: string;
  subtitle: string;
  basePrice: number;
  specs: OptionSpec[];
  submitLabel?: string;
}

function formatUSD(value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function BTOFormBase({ title, subtitle, basePrice, specs }: BTOConfig) {
  const [selections, setSelections] = useState<string[]>(() => specs.map(() => ""));
  const [customer, setCustomer] = useState({ name: "", company: "", email: "", quantity: 1 });
  const [submitted, setSubmitted] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  const unitPrice = useMemo(() => {
    return specs.reduce((total, spec, index) => {
      const chosen = spec.options.find((option) => option.value === selections[index]);
      return total + (chosen?.extra ?? 0);
    }, basePrice);
  }, [specs, selections, basePrice]);

  const totalPrice = unitPrice * Math.max(1, customer.quantity || 1);

  const updateSelection = (index: number, value: string) => {
    setSelections((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "/store";
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">¡Solicitud enviada!</p>
        <p className="mt-2 text-sm text-green-700">
          Nuestro equipo comercial armará tu configuración a medida y te contactará a la brevedad al correo
          proporcionado.
        </p>
        <p className="mt-4 text-xs text-green-600">Redirigiendo a la tienda...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base text-gray-600">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8 pb-32">
        <div>
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="bto-name" className="mb-1 block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="bto-name"
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
              />
            </div>
            {isBusiness && (
              <div>
                <label htmlFor="bto-company" className="mb-1 block text-sm font-medium text-gray-700">
                  Empresa
                </label>
                <input
                  id="bto-company"
                  type="text"
                  required={isBusiness}
                  value={customer.company}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
                />
              </div>
            )}
            <div>
              <label htmlFor="bto-email" className="mb-1 block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                id="bto-email"
                type="email"
                required
                value={customer.email}
                onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="bto-quantity" className="mb-1 block text-sm font-medium text-gray-700">
                Cantidad de equipos
              </label>
              <input
                id="bto-quantity"
                type="number"
                min={1}
                required
                value={customer.quantity}
                onChange={(e) => setCustomer((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Especificaciones</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {specs.map((spec, index) => (
              <div key={spec.label}>
                <label htmlFor={`bto-spec-${index}`} className="mb-1 block text-sm font-medium text-gray-700">
                  {spec.label}
                </label>
                <select
                  id={`bto-spec-${index}`}
                  required
                  value={selections[index]}
                  onChange={(e) => updateSelection(index, e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-corporativo-blue focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  {spec.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                      {option.extra > 0 ? ` (+$${option.extra})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-corporativo-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-corporativo-blue/90"
        >
          Solicitar Cotización
        </button>
      </form>

      <div className="fixed inset-x-0 bottom-0 left-0 z-40 w-full border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-4xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-600">
            Precio unitario: <span className="font-semibold text-gray-900">${formatUSD(unitPrice)} USD</span>
          </span>
          <span className="text-lg font-bold text-gray-900">Precio Estimado: ${formatUSD(totalPrice)} USD</span>
        </div>
      </div>
    </div>
  );
}

const laptopSpecs: OptionSpec[] = [
  {
    label: "Procesador",
    options: [
      { label: "Core i5 / Ryzen 5", value: "core-i5-ryzen-5", extra: 0 },
      { label: "Core i7 / Ryzen 7", value: "core-i7-ryzen-7", extra: 200 },
    ],
  },
  {
    label: "Memoria RAM",
    options: [
      { label: "8GB", value: "8gb", extra: 0 },
      { label: "16GB", value: "16gb", extra: 80 },
      { label: "32GB", value: "32gb", extra: 160 },
    ],
  },
  {
    label: "Almacenamiento SSD",
    options: [
      { label: "256GB", value: "256gb", extra: 0 },
      { label: "512GB", value: "512gb", extra: 50 },
      { label: "1TB", value: "1tb", extra: 120 },
    ],
  },
];

const serverSpecs: OptionSpec[] = [
  {
    label: "Factor de Forma",
    options: [
      { label: "Torre", value: "torre", extra: 0 },
      { label: "Rack 1U", value: "rack-1u", extra: 300 },
      { label: "Rack 2U", value: "rack-2u", extra: 500 },
    ],
  },
  {
    label: "Procesadores",
    options: [
      { label: "1x Intel Xeon", value: "1x-xeon", extra: 0 },
      { label: "2x Intel Xeon", value: "2x-xeon", extra: 800 },
      { label: "AMD EPYC", value: "amd-epyc", extra: 1200 },
    ],
  },
  {
    label: "Memoria RAM ECC",
    options: [
      { label: "32GB", value: "32gb", extra: 0 },
      { label: "64GB", value: "64gb", extra: 250 },
      { label: "128GB", value: "128gb", extra: 600 },
    ],
  },
  {
    label: "Fuentes de Poder",
    options: [
      { label: "Sencilla", value: "sencilla", extra: 0 },
      { label: "Redundante", value: "redundante", extra: 400 },
    ],
  },
];

const desktopSpecs: OptionSpec[] = [
  {
    label: "Procesador",
    options: [
      { label: "Estándar", value: "estandar", extra: 0 },
      { label: "Alto Rendimiento", value: "alto-rendimiento", extra: 250 },
    ],
  },
  {
    label: "Memoria RAM",
    options: [
      { label: "16GB", value: "16gb", extra: 0 },
      { label: "32GB", value: "32gb", extra: 100 },
      { label: "64GB", value: "64gb", extra: 250 },
    ],
  },
  {
    label: "Tarjeta Gráfica",
    options: [
      { label: "Integrada", value: "integrada", extra: 0 },
      { label: "Dedicada Gama Media", value: "dedicada-media", extra: 300 },
      { label: "Pro/Quadro", value: "pro-quadro", extra: 800 },
    ],
  },
];

export function LaptopBTO() {
  return (
    <BTOFormBase
      title="Configurar Laptop Corporativa"
      subtitle="Selecciona las especificaciones requeridas."
      basePrice={600}
      specs={laptopSpecs}
    />
  );
}

export function ServerBTO() {
  return (
    <BTOFormBase
      title="Configurar Servidor"
      subtitle="Armado a medida para tu centro de datos."
      basePrice={2500}
      specs={serverSpecs}
    />
  );
}

export function DesktopBTO() {
  return (
    <BTOFormBase
      title="Configurar PC de Escritorio / Workstation"
      subtitle="Selecciona las especificaciones requeridas."
      basePrice={500}
      specs={desktopSpecs}
    />
  );
}
