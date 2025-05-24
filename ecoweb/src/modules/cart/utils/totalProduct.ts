// utils/totalProduct.ts
import { Product } from "@/modules/product/typesProduct";

export const totalPrecioCarrito = (productos: (Product & { quantity?: number })[]) => {
    return productos.reduce((total, producto) => {
        return total + (producto.price * (producto.quantity || 1));
    }, 0);
}