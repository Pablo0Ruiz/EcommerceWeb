'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { AddressManager } from "@/modules/client/components/addressCard";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import { Address } from "@/modules/auth/typesAuth";
import { PopUp } from "@/shared/components/popup"; // Importa el componente PopUp

export default function DeliveryAddressPage() {
  const router = useRouter();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar autenticación al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    if (!token) {
      setShowAuthPopup(true);
    }
  }, []);

  const handleSave = async (updatedAddress: Address) => {
    console.log("Guardando dirección:", updatedAddress);
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setShowAuthPopup(false);
    router.push('/auth/login');
  };

  const handleRegister = () => {
    setShowAuthPopup(false);
    router.push('/auth/register');
  };

  const handleAddressAction = (e: React.MouseEvent, action: () => void) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthPopup(true);
    } else {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderWizardSteps currentStep={3} />

      <AddressManager enableEdit={true}>
        {({
          addresses,
          loading,
          error,
          selectedAddress,
          handleAddressSelect,
          handleSetDefault,
          refetch,
        }) => {
          if (loading) {
            return (
              <div className="container mx-auto px-4 py-8 text-center">
                <p>Cargando direcciones...</p>
              </div>
            );
          }

          if (error) {
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
          }

          return (
            <div className="max-w-6xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Dirección de entrega
              </h1>

              <div className="flex flex-wrap justify-center gap-6">
                {/* Tarjeta para añadir nueva dirección */}
                <div
                  className="border-dashed border-2 border-gray-400 rounded-lg p-6 w-72 h-[336px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={(e) => handleAddressAction(e, () => {
                    setEditingAddress(null);
                    setIsModalOpen(true);
                  })}
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
                  <span className="text-gray-600 font-medium">Añadir dirección</span>
                </div>

                {/* Lista de direcciones */}
                {addresses.map((addr) => (
                  <div
                    key={`${addr.nombre}-${addr.postal}`}
                    className={`border rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col cursor-pointer ${
                      selectedAddress?.nombre === addr.nombre ? "border-green-600 border-2" : "border-gray-200"
                    }`}
                    onClick={() => {
                      if (isLoggedIn) {
                        handleAddressSelect(addr, true);
                      } else {
                        setShowAuthPopup(true);
                      }
                    }}
                  >
                    {addr.isDefault && (
                      <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 rounded-t-lg text-sm font-medium">
                        Predeterminado
                      </div>
                    )}

                    <div className={addr.isDefault ? "mt-8" : ""}>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{addr.nombre}</h3>
                      <div className="space-y-1 text-gray-900">
                        <p>{addr.street}</p>
                        <p>{addr.number}</p>
                        <p>{addr.postal}</p>
                        <p>{addr.city}</p>
                        <p>{addr.province}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                      {!addr.isDefault && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddressAction(e, () => handleSetDefault(addr.nombre));
                          }}
                          className="text-green-600 hover:text-green-800 text-sm font-medium underline"
                        >
                          Establecer como predeterminado
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddressAction(e, () => {
                            setEditingAddress(addr);
                            setIsModalOpen(true);
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isLoggedIn) {
                            // Aquí deberías llamar a tu lógica de eliminación
                            alert("Implementa la lógica para eliminar si es necesario.");
                          } else {
                            setShowAuthPopup(true);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal de edición */}
              <EditAddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                address={editingAddress}
                onSave={async (updatedAddress) => {
                  await handleSave(updatedAddress);
                  refetch();
                }}
              />

              <div className="flex justify-between mt-10 max-w-6xl mx-auto px-4">
                <button
                  onClick={() => router.push("/cart")}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-lg text-xl"
                >
                  Volver
                </button>
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowAuthPopup(true);
                    } else if (selectedAddress) {
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

      {/* Popup de autenticación */}
      <PopUp
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        title="Acceso requerido"
        message="Para gestionar direcciones, por favor inicia sesión o regístrate"
        primaryButtonText="Iniciar sesión"
        secondaryButtonText="Registrarse"
        onPrimaryButtonClick={handleLogin}
        onSecondaryButtonClick={handleRegister}
        primaryButtonColor="bg-[#0CAA2A] hover:bg-green-700"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        showSuccessIcon={false}
        animationDuration={300}
      />
    </div>
  );
}