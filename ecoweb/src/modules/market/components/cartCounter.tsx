"use client"
import { useCartStore } from "@/modules/cart/hook/cart";
import { CartItem } from "@/modules/cart/typesCart";
import { useEffect, useState } from "react";

export const CartCounter = () => {
  const { cart } = useCartStore();
  const [itemCount, setItemCount] = useState(0);

  // Efecto para sincronizar con el localStorage y reaccionar a cambios
  useEffect(() => {
    const updateCount = () => {
      const storedCart = localStorage.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setItemCount(parsedCart.reduce((total: number, item: CartItem) => total + (item.quantity || 0), 0));
    };

    // Actualizar al montar el componente
    updateCount();

    // Escuchar eventos personalizados de actualización del carrito
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, [cart]); // Dependencia del carrito del store

  return (
    <span className="absolute top-0 right-0 bg-[#FFD712] text-[#131921] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </span>
  );
};