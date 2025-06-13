"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { useCartStore } from "@/modules/cart/hook/cart";
import { useOrder } from "../hook/useCart";
import { prepareOrderData } from "../utils/orderUtils";
import { getUserCookie } from "@/shared/utils/cookies";
import { Address } from "@/modules/auth/typesAuth";

export default function PaymentPage() {
  const router = useRouter();
  const { fetchProfile } = useProfile()
  const { cart, loadCart } = useCartStore();
  const { createNewOrder } = useOrder();

  function formatExpiryDate(value: string): string {

    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return cleaned;
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }

  function formatCardNumber(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }
  function formatCardCvv(value: string): string {
    return value.replace(/\D/g, "").slice(0, 3);

  }


  useEffect(() => {
    loadCart();
    const stored = localStorage.getItem("selectedAddress");
    if (stored) {
      try {
        JSON.parse(stored);

      } catch (e) {
        console.error("Error parsing address from localStorage", e);
      }
    }
  }, [loadCart]);

  const onSubmit = async () => {
    let user: User | null = null;
    try {
      user = await fetchProfile();
    } catch (e) {
      console.error("No se pudo obtener el usuario", e);
      return;
    }
    try {
      // Get user data from cookie
      const profileData = getUserCookie();

      // Check if we have valid user data
      if (!profileData || !profileData._id) {
        console.error("No valid user data available");
        alert("Por favor inicia sesión nuevamente");
        return;
      }

      // Prepare order data with full user object
      const orderData = prepareOrderData(cart, addr);
      if (!orderData) {
        console.error("Failed to prepare order data");
        return;
      }

      // Create the order
      console.log("Creating order with data:", orderData);
      const order = await createNewOrder(orderData);
      if (order) {
        // Clear stored address and redirect on success
        localStorage.removeItem("selectedAddress");
        router.replace("/cart/completed");
      } else {
        console.error("Order creation failed");
        alert("No se pudo crear el pedido. Por favor intenta nuevamente.");
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert(
        "Ocurrió un error al procesar tu pedido. Por favor intenta nuevamente."
      );
    }
  };

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={4} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Método de pago
        </h1>

        <div className="bg-[#F5F5F5] rounded-[18px] p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Introduce los datos de tu tarjeta
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Número de tarjeta
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
              />
              {errors.cardNumber && (
                <p className="text-red-500 mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Fecha de expiración (MM/AA)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-gray-700 font-medium mb-2"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
                />
                {errors.cvv && (
                  <p className="text-red-500 mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="cardholderName"
                className="block text-gray-700 font-medium mb-2"
              >
                Nombre del titular
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={cardData.cardholderName}
                onChange={handleInputChange}
                placeholder="Como aparece en la tarjeta"
                className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
              />
              {errors.cardholderName && (
                <p className="text-red-500 mt-1">{errors.cardholderName}</p>
              )}
            </div>
          </form>
        </div>

        <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
          <button
            onClick={() => router.push("/cart/delivery")}
            className="bg-[#909090] hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
          >
            Volver
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#0CAA2A] hover:bg-green-700 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
