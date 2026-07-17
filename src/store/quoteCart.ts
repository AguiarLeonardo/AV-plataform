// @nanostores/react no está instalado en este proyecto — utilidad basada en
// localStorage + CustomEvent("cart-updated") para que cualquier componente
// React (montado como isla Astro independiente) pueda sincronizarse.

export interface QuoteCartItem {
  id: number;
  name: string;
  fakePrice: number;
  quantity: number;
}

const STORAGE_KEY = "asiaven-quote-cart";
export const CART_EVENT = "cart-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifyChange() {
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function getCart(): QuoteCartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteCartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: QuoteCartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  notifyChange();
}

export function addToCart(item: Omit<QuoteCartItem, "quantity">, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  saveCart(cart);
}

export function removeFromCart(id: number) {
  saveCart(getCart().filter((c) => c.id !== id));
}

export function updateQuantity(id: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  const cart = getCart();
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.quantity = quantity;
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
