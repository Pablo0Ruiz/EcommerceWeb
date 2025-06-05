'use client'
import { useState } from "react";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import Link from "next/link";
import { Header } from '@/modules/market/components/header'
import { Address } from "@/modules/auth/typesAuth";
import { AddressManager } from "@/modules/client/components/addressCard";

export default function AddressPage() {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSave = async (updatedAddress: Address) => {
    console.log("Guardando dirección:", updatedAddress);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <AddressManager enableEdit={true}>
        {({ 
          addresses, 
          loading, 
          error, 
          handleDelete, 
          handleSetDefault, 
          refetch 
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
            <div className="container mx-auto px-4 py-8">
              {/* Flecha de retroceso */}
              <div className="mb-6">
                <Link 
                  href="/user" 
                  className="flex items-center text-[#2E8B57] hover:text-[#3DA56A] transition-colors duration-200"
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

              <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Direcciones de entrega</h1>
              
              <div className="flex flex-wrap justify-center gap-6">
                {/* Tarjeta para añadir nueva dirección */}
                <div 
                  className="border-dashed border-2 border-gray-400 rounded-lg p-6 w-72 h-[336px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setEditingAddress(null);
                    setIsModalOpen(true);
                  }}
                >
                  <svg 
                    className="w-12 h-12 text-gray-400 mb-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 font-medium">Añadir dirección</span>
                </div>

                {/* Lista de direcciones - Reemplazo de AddressCard */}
                {addresses.map((addr) => (
                  <div 
                    key={`${addr.nombre}-${addr.postal}`}
                    className="border border-gray-200 rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
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
                          onClick={() => handleSetDefault(addr.nombre)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium underline"
                        >
                          Establecer como predeterminado
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          setEditingAddress(addr);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(addr.nombre)}
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
                  handleSave(updatedAddress);
                  refetch();
                }}
              />
            </div>
          );
        }}
      </AddressManager>
    </div>
  );
}