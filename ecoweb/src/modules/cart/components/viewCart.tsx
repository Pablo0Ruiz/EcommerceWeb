"use client";
import { useCartStore } from "../hook/cart";

const CartList = () => {
  const { 
    cart, 
    calculateTotal,
    shippingOptions
  } = useCartStore();
  
  const total = calculateTotal();
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingTotal = total - subTotal;

  // Calcular resumen de métodos de envío
  const shippingSummary = cart.reduce((acc, item) => {
    const shippingMethod = shippingOptions.find(o => o.method === item.selectedShipping) || shippingOptions[0];
    const key = `${shippingMethod.label} (+${shippingMethod.price}€)`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Resumen de compra</h2>

      <div className="text-sm text-gray-600 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} artículos)</span>
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
                <span>{count} {count > 1 ? 'artículos' : 'artículo'} con:</span>
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

      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition">
        Realizar pedido
      </button>
    </div>
  );
};

export default CartList;