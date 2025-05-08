import { Product } from "../product/typesProduct";

interface CartItem extends Product {
    cantidad: number
}

export interface CartState {
    productos: CartItem[],
    add: (producto: Product) => void,
    remove: (id: string) => void,
    disminuirItem : (id: string) => void
}