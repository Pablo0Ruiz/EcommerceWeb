import { Product } from "@/modules/product/typesProduct";

export const totalPrecioCarrito = (productos: (Product & { quantity?: number })[]) => {
    return productos.reduce((total, producto) => {
        return total + (producto.price * (producto.quantity || 1));
    }, 0);
}

// cart/utils/calculateSubTotal.ts
import type { CartItem } from "../typesCart";

export const calculateSubTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
