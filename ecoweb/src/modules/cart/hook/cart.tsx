// store/cartStore.ts
import { create } from 'zustand'
import { Product } from '@/shared/mockProduct/product'

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

const getCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
      return []
    }
  }
  return []
}

const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

export const useCartStore = create<CartStore>((set) => ({
  cart: getCartFromStorage(),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id)
      let updatedCart

      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }]
      }

      saveCartToStorage(updatedCart)
      return { cart: updatedCart }
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId)
      saveCartToStorage(updatedCart)
      return { cart: updatedCart }
    }),

  decreaseQuantity: (productId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)

      saveCartToStorage(updatedCart)
      return { cart: updatedCart }
    }),

  clearCart: () =>
    set(() => {
      saveCartToStorage([])
      return { cart: [] }
    }),
}))
