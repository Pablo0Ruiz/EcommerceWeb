"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";

export default function PaymentPage() {
  const router = useRouter();
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formateo de campos según el tipo
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 4) return;
    }
    
    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    };

    // Validación número de tarjeta (16 dígitos)
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Número de tarjeta inválido";
      valid = false;
    }

    // Validación fecha de expiración (MM/YY)
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Fecha inválida";
      valid = false;
    }

    // Validación CVV (3 o 4 dígitos)
    if (!cardData.cvv || !/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "CVV inválido";
      valid = false;
    }

    // Validación nombre del titular
    if (!cardData.cardholderName || cardData.cardholderName.trim().length < 3) {
      newErrors.cardholderName = "Nombre inválido";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simular procesamiento del pago
      setTimeout(() => {
        router.push("/cart/completed");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={3} />

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
              <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
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
              {errors.cardNumber && <p className="text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
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
                {errors.expiryDate && <p className="text-red-500 mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
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
                {errors.cvv && <p className="text-red-500 mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="cardholderName" className="block text-gray-700 font-medium mb-2">
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
              {errors.cardholderName && <p className="text-red-500 mt-1">{errors.cardholderName}</p>}
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