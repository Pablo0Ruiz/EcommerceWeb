"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PopUp } from "@/shared/components/popup";
import type { CartListProps } from "../typesCart";
import { useCartStore } from "@/modules/cart/hook/cart";

export default function CartList({
  showCheckoutButton = false,
  showNextButton = false,
  nextStepPath = "",
  nextButtonLabel = "Siguiente paso",
}: CartListProps) {
  const cart = useCartStore((s) => s.cart);
  const calculateTotal = useCartStore((s) => s.calculateTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const shippingOptions = useCartStore((s) => s.shippingOptions); 

  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const total = calculateTotal();


  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const shippingSummary: Record<string, {count: number, price: number}> = {};
  let shippingTotal = 0;
  
  cart.forEach((item) => {
    const method = item.selectedShipping || "standard";
    const option = shippingOptions.find(o => o.method === method);
    const price = option?.price || 0;
    
    if (!shippingSummary[method]) {
      shippingSummary[method] = {count: 0, price};
    }
    
    shippingSummary[method].count += 1;
    shippingTotal += price * item.quantity; 
  });

  const handleNavigation = (path: string) => {
    clearCart();
    router.push(path);
  };

  const handleCheckout = () => {
    setShowPopup(true);
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Resumen de compra
      </h2>

      <div className="text-sm text-gray-600 space-y-3">
        <div className="flex justify-between">
          <span>
            Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            artículos)
          </span>
          <span>€{subTotal.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between mb-1">
            <span className="font-medium">Envíos:</span>
            <span>€{shippingTotal.toFixed(2)}</span>
          </div>
          <div className="pl-2 text-xs text-gray-500">
            {Object.entries(shippingSummary).map(([method, {count, price}]) => {
              const option = shippingOptions.find(o => o.method === method);
              return (
                <div key={method} className="flex justify-between">
                  <span>
                    {count} {count > 1 ? "productos" : "producto"} con:
                  </span>
                  <span>
                    {option?.label || method} (€{price.toFixed(2)} c/u)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total (impuestos incluidos)</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          >
            Realizar pedido
          </button>

          <PopUp
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            title="Gracias por comprar en MateZone"
            message="Su pedido ha sido registrado con éxito, puede consultar el estado en Mis Pedidos"
            primaryButtonText="Seguir comprando"
            secondaryButtonText="Ir a Mis Pedidos"
            onPrimaryButtonClick={() => handleNavigation("/market")}
            onSecondaryButtonClick={() => handleNavigation("/orders")}
            showSuccessIcon={true}
            secondaryButtonHref="/orders"
          />
        </>
      )}

      {showNextButton && nextStepPath && (
        <button
          onClick={() => cart.length > 0 && router.push(nextStepPath)}
          className={`mt-4 w-full py-3 rounded-lg transition ${
            cart.length === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#0CAA2A] hover:bg-green-700 text-white"
          }`}
        >
          {cart.length === 0
            ? "Agregue productos para continuar"
            : nextButtonLabel}
        </button>
      )}
    </div>
  );
}