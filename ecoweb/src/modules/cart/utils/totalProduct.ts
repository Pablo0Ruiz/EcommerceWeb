import { CartItem } from "../typesCart";

export const totalPrecioCarrito= (items: CartItem[]): number =>{
    return items.reduce((total,item) => total + item.precio * item.cantidad,0)
};