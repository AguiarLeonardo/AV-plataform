import { useEffect, useState } from "react";
import { CART_EVENT, getCart, removeFromCart, updateQuantity, type QuoteCartItem } from "../../store/quoteCart";

export default function QuoteCartList() {
  const [items, setItems] = useState<QuoteCartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
        <p className="text-lg font-semibold text-gray-900">Tu cotización está vacía</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
          Agrega productos desde el catálogo para solicitar una cotización.
        </p>
        <a
          href="/store"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-corporativo-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-corporativo-blue/90 no-underline"
        >
          Volver a la tienda
        </a>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.fakePrice * item.quantity, 0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">${item.fakePrice.toLocaleString("en-US")} c/u</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              aria-label={`Cantidad de ${item.name}`}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center text-sm focus:border-corporativo-blue focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="text-sm font-semibold text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-sm font-semibold text-gray-900">Total estimado</span>
        <span className="text-lg font-bold text-gray-900">${total.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}
