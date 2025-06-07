"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { useCartStore } from "@/modules/cart/hook/cart";
import { useOrder } from "../hook/useCart";
import { prepareOrderData } from "../utils/orderUtils";
import { User } from "@/modules/auth/typesAuth";
import InputField from "@/shared/components/inputField"
import { useProfile } from "@/modules/client/hook/useProfile";

type PaymentForm = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

export default function PaymentPage() {
  const router = useRouter();
  const { fetchProfile } = useProfile()
  const { cart, loadCart } = useCartStore();
  const { createNewOrder } = useOrder();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentForm>();

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
    const orderData = prepareOrderData(user, cart);
    console.log("Datos de la orden:", orderData);
    if (!orderData) return;

    try {
      const order = await createNewOrder(orderData);
      if (order) router.replace("/cart/completed");
    } catch (err) {
      console.error("Error al crear la orden:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={3} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Método de pago</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F5F5F5] rounded-[18px] p-6 mb-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Introduce los datos de tu tarjeta</h2>

          <InputField
            id="cardNumber"
            label="Número de tarjeta"
            type="text"
            register={register}
            error={errors.cardNumber}
            requiredMsg="El número es obligatorio"
            validationRules={{
              required: "El número es obligatorio",
              pattern: {
                value: /^(\d{4} ?){3}\d{4}$/,
                message: "Debe tener 16 dígitos válidos",
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const formatted = formatCardNumber(e.target.value);
                setValue("cardNumber", formatted);
              },
            }}
            className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="expiryDate"
              label="Fecha de expiración (MM/AA)"
              type="text"
              register={register}
              error={errors.expiryDate}
              requiredMsg="Este campo es obligatorio"
              validationRules={{
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Formato inválido (MM/AA)",
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatExpiryDate(e.target.value);
                  setValue("expiryDate", formatted);
                },
              }}
              className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
            />
            <InputField
              id="cvv"
              label="CVV"
              type="text"
              register={register}
              error={errors.cvv}
              requiredMsg="Este campo es obligatorio"
              validationRules={{
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\d{3}$/,
                  message: "Debe tener 3 dígitos",
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatCardCvv(e.target.value);
                  setValue("cvv", formatted);
                },
              }}
              className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
            />
          </div>
          <InputField
            id="cardholderName"
            label="Nombre del titular"
            type="text"
            register={register}
            error={errors.cardholderName}
            requiredMsg="Este campo es obligatorio"
            className="w-full p-3 border border-gray-300 rounded-[10px] text-lg text-black"
          />
          <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
            <button
              type="button"
              onClick={() => router.push("/cart/delivery")}
              className="bg-[#909090] hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-[#0CAA2A] hover:bg-green-700 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
            >
              Pagar ahora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
