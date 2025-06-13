"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { useCartStore } from "@/modules/cart/hook/cart";
import {
  CardData,
  FormErrors,
  formatCardInput,
  validatePaymentForm,
} from "@/modules/cart/utils/paymentForm";
import { useOrder } from "../hook/useCart";
import { prepareOrderData } from "../utils/orderUtils";
import { useProfile } from "@/modules/client/hook/useProfile";
import { getUserCookie } from "@/shared/utils/cookies";
import { Address } from "@/modules/auth/typesAuth";
import {User} from '@/modules/auth/typesAuth'



export default function PaymentPage() {
  const router = useRouter();
  const { cart, loadCart } = useCartStore();
  const { createNewOrder } = useOrder();
  const { fetchProfile } = useProfile();

  const [addr, setAddr] = useState<Address | null>(null);

  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  // Cargar dirección del localStorage al montar el componente
  useEffect(() => {
    const storedAddr = localStorage.getItem("selectedAddress");
    if (storedAddr) {
      try {
        const parsedAddr: Address = JSON.parse(storedAddr);
        setAddr(parsedAddr);
      } catch (e) {
        console.error("Error parsing address from localStorage", e);
        setAddr(null);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatCardInput(name, value);
    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validatePaymentForm(cardData);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    if (!addr) {
      alert("No hay dirección seleccionada para el envío.");
      return;
    }

    try {
      let profileData = await fetchProfile();

      if (!profileData || !profileData._id) {
        console.warn("fetchProfile falló, intentando con getUserClient()");
        profileData = getUserCookie() as User; 
      }

      if (!profileData || !profileData._id) {
        console.error("Usuario no autenticado");
        return;
      }

      const orderData = prepareOrderData(profileData, cart, addr);
      if (!orderData) return;

      const order = await createNewOrder(orderData);
      if (order) {
        router.replace("/cart/completed");
      }
    } catch (err) {
      console.error("Error al crear la orden:", err);
    }
  }

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