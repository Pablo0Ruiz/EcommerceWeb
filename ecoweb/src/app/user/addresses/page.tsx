// app/user/addresses/page.tsx
'use client'
import { AddressCard } from "@/modules/client/components/addressCard";
import { useState } from "react";
import { Address } from "@/modules/client/components/typesClient";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";

const initialAddresses: Address[] = [
  {
    id: "1",
    name: "Juan Fernandez Garcia",
    street: "Calle alguna, 6",
    floor: "3º, 3",
    city: "Castilla y Leon, Palencia",
    postalCode: "34004",
    country: "España",
    phone: "123456789",
    isDefault: true,
  },
  {
    id: "2",
    name: "Paca Fernandez Garica",
    street: "Calle alguna, 8",
    floor: "4º, 4",
    city: "Castilla y Leon, Palencia",
    postalCode: "34004",
    country: "España",
    phone: "987654321",
    isDefault: false,
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSave = (updatedAddress: Address) => {
    setAddresses(prev =>
      prev.map(addr =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Direcciones de entrega</h1>
        
        <div className="flex flex-wrap justify-center gap-6">
          {/* Tarjeta para añadir nueva dirección */}
          <div 
            className="border-dashed border-2 border-gray-400 rounded-lg p-6 w-72 h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
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
              key={addr.id}
              address={addr}
              onEdit={() => handleEdit(addr)}
              onDelete={() => handleDelete(addr.id)}
              onSetDefault={() => setDefault(addr.id)}
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