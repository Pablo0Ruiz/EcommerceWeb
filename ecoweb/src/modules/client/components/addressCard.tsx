<<<<<<< HEAD
"use client";
import { Address } from "@/modules/auth/typesAuth";
import { useState, useEffect } from "react";
import { useProfile } from "@/modules/client/hook/useProfile";
import { EditAddressModal } from "@/modules/client/components/editAddressModal"; //falta meter todo lo de direcciones aqui
=======
'use client'
import { Address } from "@/modules/auth/typesAuth";
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)

interface AddressManagerProps {
  children: (props: {
    addresses: Address[];
    loading: boolean;
    error: string | null;
    handleEdit: (address: Address) => void;
    handleDelete: (nombre: string) => void;
    handleSetDefault: (nombre: string) => void;
    handleAddNew: () => void;
    refetch: () => void;
    selectedAddress: Address | null;
    handleAddressSelect: (address: Address, writeToLocal?: boolean) => void;
  }) => React.ReactNode;
  enableEdit?: boolean;
  saveSelectionToLocalStorage?: boolean;
}

export const AddressManager: React.FC<AddressManagerProps> = ({
  children,
  enableEdit = true,
}) => {
<<<<<<< HEAD
  const { fetchProfile, updateProfile } = useProfile();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
=======
  return (
    <div className="border border-gray-200 rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      {address.isDefault && (
        <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 rounded-t-lg text-sm font-medium">
          Predeterminado
        </div>
      )}
      
      <div className={address.isDefault ? "mt-8" : ""}>
        <h3 className="font-bold text-lg mb-2 text-gray-900">{address.nombre}</h3>
        <div className="space-y-1 text-gray-900">
          <p>{address.street}</p>
          <p>{address.number}</p>
          <p>{address.postal}</p>
          <p>{address.city}</p>
          <p>{address.province}</p>
        </div>
      </div>
>>>>>>> 48f5ea6 (Refactor address and order management components; integrate new hooks for profile and order fetching, enhance error handling, and update address structure)

  const loadAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchProfile();
      if (userData.address) {
        setAddresses(userData.address);
        if (!selectedAddress) {
          const defaultAddr =
            userData.address.find((addr) => addr.isDefault) ||
            userData.address[0];
          setSelectedAddress(defaultAddr || null);
        }
      }
    } catch (err) {
      setError("Error al cargar direcciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [fetchProfile]);

  const refetch = async () => {
    await loadAddresses();
  };

  const openModalToEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const openModalToCreate = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSaveAddress = async (updatedAddress: Address) => {
    const updatedList = [...addresses];
    const existingIndex = updatedList.findIndex(
      (addr) => addr.nombre === updatedAddress.nombre
    );

    if (updatedAddress.isDefault) {
      updatedList.forEach((a) => (a.isDefault = false));
    }

    if (existingIndex >= 0) {
      updatedList[existingIndex] = updatedAddress;
    } else {
      updatedList.push(updatedAddress);
    }

    try {
      await updateProfile({ address: updatedList });
      await refetch();
    } catch (error) {
      console.error("Error al guardar dirección:", error);
      alert("No se pudo guardar la dirección");
    }
  };

  const handleSetDefault = async (nombre: string) => {
    if (!enableEdit) return;

    try {
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr.nombre === nombre,
      }));

      await updateProfile({ address: updatedAddresses });
      await refetch();
    } catch (error) {
      console.error("Error al actualizar dirección predeterminada:", error);
      alert("No se pudo establecer como predeterminada");
    }
  };

  const handleDelete = async (nombre: string) => {
    if (!enableEdit) return;

    try {
      const updatedAddresses = addresses.filter(
        (addr) => addr.nombre !== nombre
      );
      await updateProfile({ address: updatedAddresses });
      await refetch();
    } catch (error) {
      console.error("Error al eliminar dirección:", error);
      alert("No se pudo eliminar la dirección");
    }
  };

  const handleEdit = (address: Address) => {
    if (!enableEdit) return;
    openModalToEdit(address);
  };

  const handleAddNew = () => {
    if (!enableEdit) return;
    openModalToCreate();
  };

  // handleAddressSelect con writeToLocal controlando el guardado en localStorage
  const handleAddressSelect = (
    address: Address,
    writeToLocal: boolean = false
  ) => {
    setSelectedAddress(address);
    if (writeToLocal) {
      localStorage.setItem("selectedAddress", JSON.stringify(address));
    }
  };
  return (
    <>
      {children({
        addresses,
        loading,
        error,
        handleEdit,
        handleDelete,
        handleSetDefault,
        handleAddNew,
        refetch,
        selectedAddress,
        handleAddressSelect,
      })}

      <EditAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={editingAddress}
        onSave={handleSaveAddress}
      />
    </>
  );
};
