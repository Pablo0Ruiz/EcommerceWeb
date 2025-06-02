'use client'
import { AddressCard } from "@/modules/client/components/addressCard";
import { useState, useEffect } from "react";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import Link from "next/link";
import { Header } from '@/modules/market/components/header'
import { useGetProfile } from "@/modules/client/hook/useGetProfile"; 
import { useProfile } from "@/modules/client/hook/useProfile"; //revisa que se haga bien el put de las address
import { Address } from "@/modules/auth/typesAuth";

export default function AddressPage() {
  const { userData: user, loading, error, refetch } = useGetProfile();
  const { onSubmit: updateProfile } = useProfile(() => {});
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar direcciones del perfil
  useEffect(() => {
    if (user?.address) {
      setAddresses(user.address);
    }
  }, [user]);

  const setDefault = async (nombre: string) => {
    try {
      if (!user) return;
      
      // Actualizar todas las direcciones para marcar solo una como predeterminada
      const updatedAddresses = user.address.map(addr => ({
        ...addr,
        isDefault: addr.nombre === nombre
      }));
      
      // Llamar al backend para actualizar
      await updateProfile({
        address: updatedAddresses
      });
      
      // Refrescar los datos
      refetch();
      
    } catch (error) {
      console.error("Error al actualizar dirección predeterminada:", error);
      alert("No se pudo establecer como predeterminada");
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (nombre: string) => {
    try {
      if (!user) return;
      
      const updatedAddresses = user.address.filter(addr => addr.nombre !== nombre);
      
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
      if (!user) return;
      
      const updatedAddresses = editingAddress
        ? user.address.map(addr => 
            addr.nombre === editingAddress.nombre ? updatedAddress : addr
          )
        : [...user.address, updatedAddress];
      
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
      <Header />
      
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

          {/* Lista de direcciones */}
          {addresses.map((addr) => (
            <AddressCard
              key={addr.nombre}
              address={{
                nombre: addr.nombre,
                street: addr.street,
                number: addr.number,
                city: `${addr.postal}, ${addr.city}`,
                postal: addr.postal,
                province: addr.province,
                isDefault: addr.isDefault || false
              }}
              onEdit={() => handleEdit(addr)}
              onDelete={() => handleDelete(addr.nombre)}
              onSetDefault={() => setDefault(addr.nombre)}
            />
          ))}
        </div>

        {/* Modal de edición */}
        <EditAddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          address={editingAddress}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}