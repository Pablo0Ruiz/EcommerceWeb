// store/cartStore.ts
import { create } from "zustand";
import { Product } from "@/shared/mockProduct/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; // Changed to string
  decreaseQuantity: (productId: string) => void; // Changed to string
  clearCart: () => void;
}
const getCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  }
  return [];
};

const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: getCartFromStorage(),

  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find((item) => item.id === product.id);
    const updatedCart = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    saveCartToStorage(updatedCart);
    set({ cart: updatedCart });
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCartToStorage(updatedCart);
    set({ cart: updatedCart });
  },

  decreaseQuantity: (productId) => {
    const { cart } = get();
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Elimina si quantity llega a 0

    saveCartToStorage(updatedCart);
    set({ cart: updatedCart });
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ cart: [] });
  },
}));
