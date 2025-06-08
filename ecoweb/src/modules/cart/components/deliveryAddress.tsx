"use client";
import { useState } from "react";
import { AddressManager } from "@/modules/client/components/addressCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/modules/market/components/header";
import { Address } from "@/modules/auth/typesAuth";

export default function DeliveryAddressPage() {
  const router = useRouter();
  const [temporarySelectedAddress, setTemporarySelectedAddress] = useState<Address | null>(null);

  const handleSelect = (address: Address) => {
    setTemporarySelectedAddress(address);
  };

  const handleContinue = () => {
    if (!temporarySelectedAddress) {
      alert("Por favor selecciona una dirección de envío");
      return;
    }
    

    localStorage.setItem("selectedAddress", JSON.stringify(temporarySelectedAddress));
    router.push("/cart/payment");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/cart"
            className="flex items-center text-[#2E8B57] hover:text-[#3DA56A]"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Selecciona tu dirección de entrega
        </h1>

        <AddressManager
          selectable={true}
          onSelect={handleSelect}
          defaultView={true}
          enableEdit={true}
        />

        <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
          <button
            onClick={() => router.push("/cart")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-lg text-xl transition-colors"
          >
            Volver
          </button>
          <button
            onClick={handleContinue}
            className={`font-bold py-3 px-10 rounded-lg text-xl transition-colors ${
              temporarySelectedAddress 
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!temporarySelectedAddress}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}