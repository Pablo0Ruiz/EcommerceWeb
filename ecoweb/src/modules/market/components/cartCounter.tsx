// components/CartCounter.tsx
"use client"
import { useCartStore } from "@/modules/cart/hook/cart";

export const CartCounter = () => {
  const { cart } = useCartStore();
  
  return (
    <span className="absolute top-0 right-0 bg-[#FFD712] text-[#131921] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {cart.reduce((total, item) => total + item.quantity, 0)}
    </span>
  );
};