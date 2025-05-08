import { create } from 'zustand'
import { CartState } from '../typesCart'


export const useCart = create<CartState>((set, get) => ({
    productos: [],
    add: (producto) => {
        const items = get().productos;
        const yaExiste = items.find(p => p.id === producto.id);

        if (yaExiste) {
            set({
                productos: items.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                ),
            });
        } else {
            set({
                productos: [...items, { ...producto, cantidad: 1 }]
            });
        }
    },
    remove: (id) => {
        set({
            productos: get().productos.filter(p => p.id !== id)
        });
    },
    disminuirItem: (id) => {
        const items = get().productos;
        const producto = items.find(p => p.id === id)

        if (producto && producto.cantidad > 1) {
            set({
                productos: items.map(p =>
                    p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
                )
            });
        } else if (producto) {
            set({
                productos: items.filter(p => p.id !== id)
            });
        }
    }
}));