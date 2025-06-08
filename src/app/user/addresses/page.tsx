'use client'

import { useState, useEffect } from "react";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import { Header } from '@/modules/market/components/header'
import { useProfile } from "@/modules/client/hook/useProfile";
import { Address } from "@/modules/auth/typesAuth";

export default function AddressPage() {
  const { fetchProfile, updateProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const userData = await fetchProfile();
        if (userData.address) {
          setAddresses(userData.address);
        }
      } catch (err) {
        setError("Error al cargar direcciones");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [fetchProfile]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchProfile();
      if (userData.address) {
        setAddresses(userData.address);
      }
    } catch (err) {
      setError("Error al recargar direcciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setDefault = async (id: string) => {
    try {
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr._id === id
      }));

      await updateProfile({
        address: updatedAddresses
      });

      await refetch();

    } catch (error) {
      console.error("Error al actualizar dirección predeterminada:", error);
      alert("No se pudo establecer como predeterminada");
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const updatedAddresses = addresses.filter(addr => addr._id !== id);

      await updateProfile({
        address: updatedAddresses
      });

      refetch();

    } catch (error) {
      console.error("Error al eliminar dirección:", error);
      alert("No se pudo eliminar la dirección");
    }
  };

  const handleSave = async (updatedAddress: Address) => {
    try {
      const updatedAddresses = editingAddress
        ? addresses.map(addr =>
          addr._id === editingAddress._id ? updatedAddress : addr
        )
        : [...addresses, updatedAddress];

      await updateProfile({
        address: updatedAddresses
      });

      setIsModalOpen(false);
      refetch();

    } catch (error) {
      console.error("Error al guardar dirección:", error);
      alert("No se pudo guardar la dirección");
    }

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Cargando direcciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen bg-white">
        <Header />

        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Direcciones de entrega</h1>

        <div className="flex flex-wrap justify-center gap-6">
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

          {addresses.map((addr) => (
            <div
              key={`${addr._id}-${addr.postal}`}
              className="border border-gray-200 rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              {addr.isDefault && (
                <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 rounded-t-lg text-sm font-medium">
                  Predeterminado
                </div>
              )}

              <div className={addr.isDefault ? "mt-8" : ""}>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{addr.street}</h3>
                <div className="space-y-1 text-gray-900">
                  <p>{addr.street}</p>
                  <p>{addr.number}</p>
                  <p>{addr.postal}</p>
                  <p>{addr.city}</p>
                  <p>{addr.province}</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                {!addr.isDefault && addr._id && (
                  <button
                    onClick={() => setDefault(addr._id!)}
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
                {addr._id && (
                  <button
                    onClick={() => handleDelete(addr._id!)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <EditAddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          address={editingAddress}
          onSave={async (updatedAddress) => {
            await handleSave(updatedAddress);
            refetch();
          }}
        />
      </div>
      </div>
      );
}