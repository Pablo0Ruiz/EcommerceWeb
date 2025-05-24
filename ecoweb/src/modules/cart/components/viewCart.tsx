"use client";
import { useState } from "react";
import { useCartStore } from "../hook/cart";
import { PopUp } from "@/shared/components/popup";
import { useRouter } from "next/navigation";

interface CartListProps {
  showCheckoutButton?: boolean;
  showNextButton?: boolean;
  nextStepPath?: string;
  nextButtonLabel?: string;
}

const CartList = ({
  showCheckoutButton = false,
  showNextButton = false,
  nextStepPath = "",
  nextButtonLabel = "Siguiente paso",
}: CartListProps) => {
  const { cart, calculateTotal, shippingOptions, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const total = calculateTotal();
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingTotal = total - subTotal;

  const shippingSummary = cart.reduce((acc, item) => {
    const shippingMethod =
      shippingOptions.find((o) => o.method === item.selectedShipping) ||
      shippingOptions[0];
    const key = `${shippingMethod.label} (+${shippingMethod.price}€)`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleCheckout = () => {
    setShowPopup(true);
  };

  const handleNavigation = (path: string) => {
    clearCart();
    router.push(path);
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Resumen de compra
      </h2>

      <div className="text-sm text-gray-600 space-y-3">
        <div className="flex justify-between">
          <span>
            Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} artículos)
          </span>
          <span>€{subTotal.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between mb-1">
            <span className="font-medium">Envíos:</span>
            <span>€{shippingTotal.toFixed(2)}</span>
          </div>
          <div className="pl-2 text-xs text-gray-500">
            {Object.entries(shippingSummary).map(([method, count]) => (
              <div key={method} className="flex justify-between">
                <span>
                  {count} {count > 1 ? "pedidos" : "pedido"} con:
                </span>
                <span>{method}</span>
              </div>
            ))}
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
          onClick={() => router.push(nextStepPath)}
          className="mt-4 w-full bg-[#0CAA2A] hover:bg-[#217731] text-white py-3 rounded-lg transition"
        >
          {nextButtonLabel}
        </button>
      )}
    </div>
  );
};

export default CartList;
