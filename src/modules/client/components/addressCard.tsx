import { useEffect, useState } from "react";
import { Address } from "@/modules/auth/typesAuth";
import { useProfile } from "@/modules/client/hook/useProfile";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";

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
  const { fetchProfile, updateProfile } = useProfile();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const loadAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchProfile();
      const fetchedAddresses = userData.address ?? [];
      setAddresses(fetchedAddresses);

      if (!selectedAddress && fetchedAddresses.length > 0) {
        const defaultAddr = fetchedAddresses.find((a) => a.isDefault) || fetchedAddresses[0];
        setSelectedAddress(defaultAddr);
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar direcciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = loadAddresses;

  const handleSaveAddress = async (updatedAddress: Address) => {
    try {
      let updatedList = addresses.filter((a) => a.nombre !== updatedAddress.nombre);

      if (updatedAddress.isDefault) {
        updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      }

      updatedList.push(updatedAddress);

      await updateProfile({ address: updatedList });
      await refetch();

      if (
        updatedAddress.isDefault ||
        updatedList.length === 1 ||
        !selectedAddress ||
        selectedAddress.nombre === updatedAddress.nombre
      ) {
        setSelectedAddress(updatedAddress);
      }
    } catch (err) {
      console.error("Error al guardar dirección:", err);
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
    } catch (err) {
      console.error("Error al establecer dirección predeterminada:", err);
      alert("No se pudo establecer como predeterminada");
    }
  };

  const handleDelete = async (nombre: string) => {
    if (!enableEdit) return;
    try {
      const updatedAddresses = addresses.filter((addr) => addr.nombre !== nombre);
      await updateProfile({ address: updatedAddresses });
      await refetch();
    } catch (err) {
      console.error("Error al eliminar dirección:", err);
      alert("No se pudo eliminar la dirección");
    }
  };

  const handleEdit = (address: Address) => {
    if (!enableEdit) return;
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    if (!enableEdit) return;
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleAddressSelect = (address: Address, writeToLocal = false) => {
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
      </>)
};
