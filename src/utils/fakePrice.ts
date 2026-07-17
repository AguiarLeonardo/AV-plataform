// Fórmula de precio ficticio determinística (no son precios reales de catálogo).
// Compartida entre la vitrina de /store y el ordenamiento del grid de categorías
// para que ambos usen exactamente el mismo valor por producto.
export function fakePriceValue(id: number): number {
  return 250 + ((id * 137) % 4750);
}

export function fakePrice(id: number): string {
  return `$${fakePriceValue(id).toLocaleString("en-US")}`;
}
