import { Product } from "../product/typesProduct";

export interface CartItem extends Product {
  quantity: number;
  selectedShipping?: ShippingMethod; // Añadimos el método de envío por producto
}
export interface CartState {
    productos: CartItem[],
    add: (producto: Product) => void,
    remove: (id: string) => void,
    disminuirItem : (id: string) => void
}