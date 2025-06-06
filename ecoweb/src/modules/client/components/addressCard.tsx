"use client";
import { Address } from "@/modules/auth/typesAuth";
import { useState, useEffect,useCallback } from "react";
import { useProfile } from "@/modules/client/hook/useProfile";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import { doesCookieExist } from "@/shared/utils/cookies";

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
  saveSelectionToLocalStorage = true,
}) => {
  const { fetchProfile, updateProfile } = useProfile();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const LOCAL_STORAGE_KEY = "localAddresses";
  const SELECTED_ADDRESS_KEY = "selectedAddress";

  const checkAuth = () => {
    const token = doesCookieExist("token");
    const userCookie = doesCookieExist("user");
    return !!token || !!userCookie;
  };

  const loadAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);

    const userIsLoggedIn = checkAuth();
    setIsLoggedIn(userIsLoggedIn);

    if (!userIsLoggedIn) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localAddresses = stored ? JSON.parse(stored) : [];
      setAddresses(localAddresses);

      const storedSelected = localStorage.getItem(SELECTED_ADDRESS_KEY);
      if (storedSelected && !selectedAddress) {
        setSelectedAddress(JSON.parse(storedSelected));
      }

      setLoading(false);
      return;
    }

    try {
      const userData = await fetchProfile();

      if (!userData) {
        throw new Error("No se pudo obtener el perfil");
      }

      setIsLoggedIn(true);

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
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar direcciones:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchProfile, selectedAddress]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

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

  const saveToLocal = (updatedList: Address[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
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
      if (isLoggedIn) {
        await updateProfile({ address: updatedList });
      } else {
        saveToLocal(updatedList);
      }
      await refetch();
    } catch (error) {
      console.error("Error al guardar dirección:", error);
      alert("No se pudo guardar la dirección");
    }
  };

  const handleSetDefault = async (nombre: string) => {
    if (!enableEdit) return;

    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.nombre === nombre,
    }));

    try {
      if (isLoggedIn) {
        await updateProfile({ address: updatedAddresses });
      } else {
        saveToLocal(updatedAddresses);
      }
      await refetch();
    } catch (error) {
      console.error("Error al actualizar dirección predeterminada:", error);
      alert("No se pudo establecer como predeterminada");
    }
  };

  const handleDelete = async (nombre: string) => {
    if (!enableEdit) return;

    const updatedAddresses = addresses.filter((addr) => addr.nombre !== nombre);

    try {
      if (isLoggedIn) {
        await updateProfile({ address: updatedAddresses });
      } else {
        saveToLocal(updatedAddresses);
      }
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

  const handleAddressSelect = (
    address: Address,
    writeToLocal: boolean = saveSelectionToLocalStorage
  ) => {
    setSelectedAddress(address);
    if (writeToLocal) {
      localStorage.setItem(SELECTED_ADDRESS_KEY, JSON.stringify(address));
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
