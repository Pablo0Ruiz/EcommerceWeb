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
    handleDelete: (idOrKey: string) => void;
    handleSetDefault: (idOrKey: string) => void;
    handleAddNew: () => void;
    refetch: () => void;
    selectedAddress: Address | null;
    handleAddressSelect: (address: Address, writeToLocal?: boolean) => void;
  }) => React.ReactNode;
  enableEdit?: boolean;
  saveSelectionToLocalStorage?: boolean;
}

function getAddressKey(addr: Address) {
  return addr._id || `${addr.street}-${addr.number}-${addr.postal}`;
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

      if (
        (!selectedAddress && fetchedAddresses.length > 0) ||
        (selectedAddress && !fetchedAddresses.some(a => a._id === selectedAddress._id))
      ) {
        const defaultAddr = fetchedAddresses.find((a) => a.isDefault) || fetchedAddresses[0];
        if (defaultAddr) setSelectedAddress(defaultAddr);
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

  const handleSaveAddress = async (newAddress: Address) => {
    try {
      const user = await fetchProfile();
      const existingAddresses = user.address || [];

      let updatedList: Address[];

      if (newAddress._id) {

        updatedList = existingAddresses.map(addr =>
          addr._id === newAddress._id ? newAddress : addr
        );
      } else {

        updatedList = [...existingAddresses, newAddress];
      }

      await updateProfile({ address: updatedList });
      await loadAddresses();
    } catch (err) {
      console.error("Error al guardar dirección:", err);
    }
  };


  const handleSetDefault = async (idOrKey: string) => {
    if (!enableEdit) return;
    try {
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault:
          (addr._id && addr._id === idOrKey) ||
          (!addr._id && getAddressKey(addr) === idOrKey),
      }));
      await updateProfile({ address: updatedAddresses });
      await refetch();
    } catch (err) {
      console.error("Error al establecer dirección predeterminada:", err);
      alert("No se pudo establecer como predeterminada");
    }
  };

  const handleDelete = async (idOrKey: string) => {
    if (!enableEdit) return;
    try {
      const updatedAddresses = addresses.filter(
        (addr) =>
          (addr._id && addr._id !== idOrKey) ||
          (!addr._id && getAddressKey(addr) !== idOrKey)
      );
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
    </>
  );
};