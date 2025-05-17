"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";
import { getUserCookie } from "@/shared/utils/cookies";
import { Address } from "@/modules/auth/typesAuth";

export default function DeliveryAddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string>("");

  useEffect(() => {
    const userData = getUserCookie();
    if (userData) {
      setUserPhone(userData.phoneNumber || "");
      if (userData.address) {
        const savedDefault = localStorage.getItem("defaultAddress");
        const savedSelected = localStorage.getItem("selectedAddress");
        const defaultNombre = savedDefault || userData.address[0]?.nombre;
        const initialSelected = savedSelected || defaultNombre;
        
        const addressesWithDefault = userData.address.map((addr) => ({
          ...addr,
          isDefault: addr.nombre === defaultNombre,
        }));
        
        setAddresses(addressesWithDefault);
        setSelectedAddress(initialSelected);
      }
    }
  }, []);

  const handleSetDefault = (nombre: string) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.nombre === nombre,
    }));
    setAddresses(updated);
    localStorage.setItem("defaultAddress", nombre);
    handleAddressSelect(nombre);
  };

  const handleAddressSelect = (nombre: string) => {
    setSelectedAddress(nombre);
    localStorage.setItem("selectedAddress", nombre);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      router.push("/cart/payment");
    } else {
      alert("Por favor selecciona una dirección de envío");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={2} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dirección de entrega
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* Tarjeta para añadir nueva dirección */}
          <div className="w-[350px] h-[350px] border-2 border-dashed border-[#909090] rounded-[20px] flex flex-col items-center justify-center cursor-pointer">
            <div className="text-6xl mb-4 text-gray-400">+</div>
            <h3 className="text-[32px] font-bold text-black">
              Añadir dirección
            </h3>
          </div>

          {/* Lista de direcciones existentes */}
          {addresses.map((address) => (
            <div
              key={address.nombre}
              className={`relative w-[350px] h-[350px] bg-white rounded-[20px] overflow-hidden ${
                selectedAddress === address.nombre 
                  ? "border-[2px] border-[#0CAA2A]" 
                  : "border border-[#909090]"
              }`}
              onClick={() => handleAddressSelect(address.nombre)}
            >
              {address.isDefault && (
                <div className="absolute top-0 left-0 right-0 h-[44px] bg-[#0CAA2A] flex items-center px-[18px] rounded-t-[20px]">
                  <span className="text-white font-bold text-[24px] leading-[32px]">
                    Predeterminado
                  </span>
                </div>
              )}

              <div className={`pt-4 px-[18px] ${address.isDefault ? 'mt-[44px]' : ''}`}>
                <h3 className="text-[24px] leading-[32px] text-[#1E1E1E] font-bold mb-2">
                  {address.nombre}
                </h3>
                <p className="text-[24px] leading-[32px] text-[#1E1E1E] font-normal">
                  {address.street}, {address.number}
                </p>
                <p className="text-[24px] leading-[32px] text-[#1E1E1E] font-normal">
                  {address.postal}, {address.city}
                </p>
                <p className="text-[24px] leading-[32px] text-[#1E1E1E] font-normal">
                  {address.province}
                </p>
                {userPhone && (
                  <p className="text-[24px] leading-[32px] text-[#1E1E1E] font-normal mt-2">
                    Teléfono: {userPhone}
                  </p>
                )}
              </div>

              <div className="absolute bottom-4 left-[18px] right-[18px] flex justify-between">
                <button 
                  className="text-[#0CAA2A] font-bold text-[18px] leading-[21px] underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Editar
                </button>
                <button
                  className="text-[#0CAA2A] font-bold text-[18px] leading-[21px] underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(address.nombre);
                  }}
                >
                  {address.isDefault
                    ? "✓ Predeterminado"
                    : "Establecer como predeterminado"}
                </button>
                <button 
                  className="text-[#0CAA2A] font-bold text-[18px] leading-[21px] underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-12 max-w-7xl mx-auto px-4">
          <button
            onClick={() => router.push("/cart")}
            className="bg-[#909090] hover:bg-gray-600 text-white font-bold py-4 px-12 rounded-[15px] text-[40px]"
          >
            Volver
          </button>
          <button
            onClick={handleContinue}
            className="bg-[#0CAA2A] hover:bg-green-700 text-white font-bold py-4 px-12 rounded-[15px] text-[40px]"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}