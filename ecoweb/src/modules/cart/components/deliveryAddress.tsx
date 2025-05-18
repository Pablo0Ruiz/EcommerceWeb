"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/components/headerWizard";
import { getUserCookie } from "@/shared/utils/cookies";
import { Address } from "@/modules/auth/typesAuth";
import Link from "next/link";

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
      <HeaderWizardSteps currentStep={3} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Dirección de entrega
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* Tarjeta para añadir nueva dirección */}
          <div className="w-[300px] h-[300px] border-2 border-dashed border-[#909090] rounded-[18px] flex flex-col items-center justify-center cursor-pointer">
            <div className="text-5xl mb-3 text-gray-400">+</div>
            <h3 className="text-[28px] font-bold text-black">
              Añadir dirección
            </h3>
          </div>

          {/* Lista de direcciones existentes */}
          {addresses.map((address) => (
            <div
              key={address.nombre}
              className={`relative w-[300px] h-[300px] bg-white rounded-[18px] overflow-hidden ${
                selectedAddress === address.nombre
                  ? "border-[3px] border-[#0CAA2A]"
                  : "border border-[#909090]"
              }`}
              onClick={() => handleAddressSelect(address.nombre)}
            >
              {address.isDefault && (
                <div className="absolute top-0 left-0 right-0 h-[40px] bg-[#0CAA2A] flex items-center px-[16px] rounded-t-[18px]">
                  <span className="text-white font-bold text-[22px] leading-[28px]">
                    Predeterminado
                  </span>
                </div>
              )}

              <div
                className={`pt-3 px-[16px] ${
                  address.isDefault ? "mt-[40px]" : ""
                }`}
              >
                <h3 className="text-[22px] leading-[28px] text-[#1E1E1E] font-bold mb-1">
                  {address.nombre}
                </h3>
                <p className="text-[22px] leading-[28px] text-[#1E1E1E] font-normal">
                  {address.street}, {address.number}
                </p>
                <p className="text-[22px] leading-[28px] text-[#1E1E1E] font-normal">
                  {address.postal}, {address.city}
                </p>
                <p className="text-[22px] leading-[28px] text-[#1E1E1E] font-normal">
                  {address.province}
                </p>
                {userPhone && (
                  <p className="text-[22px] leading-[28px] text-[#1E1E1E] font-normal mt-1">
                    Teléfono: {userPhone}
                  </p>
                )}

                {/* Botón Establecer como predeterminado - solo muestra si no es predeterminado */}
                {!address.isDefault && (
                  <div className="mt-4 mb-2 flex justify-center">
                    <button
                      className="text-[#0CAA2A] font-bold text-[16px] leading-[20px] underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(address.nombre);
                      }}
                    >
                      Establecer como predeterminado
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute bottom-3 left-[16px] right-[16px] flex justify-between">
                <button
                  className="text-[#0CAA2A] font-bold text-[16px] leading-[20px] underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Editar
                </button>
                <button
                  className="text-[#0CAA2A] font-bold text-[16px] leading-[20px] underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
          <button
            onClick={() => router.push("/cart")}
            className="bg-[#909090] hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
          >
            Volver
          </button>
          <Link href="/cart/payment">
            <button
              onClick={handleContinue}
              className="bg-[#0CAA2A] hover:bg-green-700 text-white font-bold py-3 px-10 rounded-[14px] text-[36px]"
            >
              Siguiente
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
