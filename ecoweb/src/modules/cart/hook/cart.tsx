import { create } from "zustand";
import { CartItem } from "../typesCart";
import { CartStore } from "../typesCart";

const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  shippingMethod: "standard",
  shippingOptions: [
    {
      method: "standard",
      label: "Estándar: Entrega en 7 días",
      price: 0,
      deliveryTime: "7 días",
    },
    {
      method: "urgent",
      label: "Urgente: Entrega de 2 a 4 días",
      price: 4,
      deliveryTime: "2-4 días",
    },
    {
      method: "express",
      label: "Express: Entrega mañana",
      price: 6,
      deliveryTime: "24 horas",
    },
  ],

  setProductShipping: (productId, method) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, selectedShipping: method } : item
      ),
    }));
  },
  loadCart: () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        set({ cart: JSON.parse(savedCart) });
      }
    }
  },

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

    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
  setShippingMethod: (method) => {
    set({ shippingMethod: method });
  },
  calculateProductTotal: (productId) => {
    const { cart, shippingOptions } = get();
    const product = cart.find((item) => item.id === productId);
    if (!product) return 0;

    const shippingPrice = product.selectedShipping
      ? shippingOptions.find((o) => o.method === product.selectedShipping)
          ?.price || 0
      : 0;

    return product.price * product.quantity + shippingPrice;
  },

  calculateTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => {
      return total + get().calculateProductTotal(item.id);
    }, 0);
  },
}));
