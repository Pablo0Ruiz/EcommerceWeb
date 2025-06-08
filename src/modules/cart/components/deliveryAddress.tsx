'use client';
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { AddressManager } from "@/modules/client/components/addressCard";

export default function DeliveryAddressPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={2} />

      <AddressManager enableEdit={true}>
        {({
          addresses,
          loading,
          error,
          selectedAddress,
          handleAddressSelect,
          handleSetDefault,
          handleEdit,
          handleAddNew,
          refetch
        }) => {
          if (loading)
            return (
              <div className="container mx-auto px-4 py-8 text-center">
                <p>Cargando direcciones...</p>
              </div>
            );
          if (error)
            return (
              <div className="container mx-auto px-4 py-8 text-center text-red-500">
                <p>Error: {error}</p>
                <button
                  onClick={refetch}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Reintentar
                </button>
              </div>
            );

          return (
            <div className="max-w-6xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Dirección de entrega
              </h1>

              <div className="flex flex-wrap justify-center gap-6">
                <div
                  className="border-dashed border-2 border-gray-400 rounded-lg p-6 w-72 h-[336px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleAddNew}
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">
                    Añadir dirección
                  </span>
                </div>


                {addresses.map((addr) => (
                  <div
                    key={addr._id || `${addr.street}-${addr.postal}`}
                    className={`border rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col cursor-pointer ${selectedAddress?._id === addr._id
                        ? "border-green-600 border-2"
                        : "border-gray-200"
                      }`}
                    onClick={() => handleAddressSelect(addr, true)}
                  >
                    {addr.isDefault && (
                      <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 rounded-t-lg text-sm font-medium">
                        Predeterminado
                      </div>
                    )}

                    <div className={addr.isDefault ? "mt-8" : ""}>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">
                        {addr.street}
                      </h3>
                      <div className="space-y-1 text-gray-900">
                        <p>{addr.number}</p>
                        <p>{addr.postal}</p>
                        <p>{addr.city}</p>
                        <p>{addr.province}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                      {!addr.isDefault && addr._id &&(
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDefault(addr._id!);
                          }}
                          className="text-green-600 hover:text-green-800 text-sm font-medium underline"
                        >
                          Establecer como predeterminado
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(addr);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
                <button
                  onClick={() => router.push("/cart")}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-lg text-xl"
                >
                  Volver
                </button>
                <button
                  onClick={() => {
                    if (selectedAddress) {
                      router.push("/cart/payment");
                    } else {
                      alert("Por favor selecciona una dirección de envío");
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg text-xl"
                >
                  Siguiente
                </button>
              </div>
            </div>
          );
        }}
      </AddressManager>
    </div>
  );
}