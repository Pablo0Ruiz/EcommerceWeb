import type { CartItem } from "../typesCart";
import { ProductsLanding } from "@/modules/landing/components/heroSection";


export const totalPrecioCarrito = (productos: (ProductsLanding & { quantity?: number })[]) => {
    return productos.reduce((total, producto) => {
        return total + (producto.price * (producto.quantity || 1));
    }, 0);
}


export const calculateSubTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
