"use client";
import { Address } from "@/modules/auth/typesAuth";
import { useState, useEffect, useCallback } from "react";
import { useProfile } from "@/modules/client/hook/useProfile";
import { EditAddressModal } from "@/modules/client/components/editAddressModal";
import { doesCookieExist } from "@/shared/utils/cookies";

interface AddressManagerProps {
  children?: (props: {
    addresses: Address[];
    loading: boolean;
    error: string | null;
    handleDelete: (nombre: string) => void;
    handleSetDefault: (nombre: string) => void;
    handleEdit: (address: Address) => void;
    handleAddNew: () => void;
    handleSelect: (address: Address) => void;
    selectedAddress: Address | null;
    refetch: () => void;
  }) => React.ReactNode;
  enableEdit?: boolean;
  defaultView?: boolean;
  selectable?: boolean;
  onSelect?: (address: Address) => void;
}

export const AddressManager: React.FC<AddressManagerProps> = ({
  children,
  enableEdit = true,
  defaultView = false,
  selectable = false,
  onSelect,
}) => {
  const { fetchProfile, updateProfile } = useProfile();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const LOCAL_STORAGE_KEY = "localAddresses";
  const SELECTED_ADDRESS_KEY = "selectedAddress";

  const checkAuth = () => {
    const token = doesCookieExist("token");
    const userCookie = doesCookieExist("user");
    const regEmailFlag = doesCookieExist("regEmail"); // Buscamos la flag regEmail

    // Si existe regEmail (true), consideramos que es un usuario invitado (no autenticado)
    if (regEmailFlag === "true") {
      return false;
    }

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
      if (storedSelected) {
        setSelectedAddress(JSON.parse(storedSelected));
      }

      setLoading(false);
      return;
    }

    try {
      const userData = await fetchProfile();
      if (!userData) throw new Error("No se pudo obtener el perfil");
      if (userData.address) {
        setAddresses(userData.address);

        // Usamos el estado actual de selectedAddress con el callback
        setSelectedAddress((prevSelected) => {
          if (prevSelected) return prevSelected;
          const defaultAddr =
            userData.address.find((addr) => addr.isDefault) ||
            userData.address[0];
          return defaultAddr || null;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]); // Eliminamos selectedAddress de las dependencias
  const saveToLocal = (updatedList: Address[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  };

  const handleAddressUpdate = async (updatedAddress: Address) => {
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

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses, isLoggedIn]); // Añadimos isLoggedIn como dependencia

  const refetch = async () => {
    await loadAddresses();
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
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    if (!enableEdit) return;
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSelect = (address: Address) => {
    // Solo actualizamos el estado, no localStorage
    if (onSelect) {
      onSelect(address);
    }
  };

  const renderDefaultView = () => {
    if (loading) {
      return <p>Cargando direcciones...</p>;
    }

    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
          <button onClick={refetch}>Reintentar</button>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap justify-center gap-6">
        {enableEdit && (
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
            <span className="text-gray-600 font-medium">Añadir dirección</span>
          </div>
        )}

        {addresses.map((addr) => (
          <div
            key={`${addr.nombre ?? addr.street}-${addr.postal ?? addr.city}`}
            className={`border rounded-lg p-6 w-72 h-[336px] relative shadow-sm hover:shadow-md transition-shadow flex flex-col ${selectable && selectedAddress?.nombre === addr.nombre
                ? "border-2 border-green-500"
                : "border-gray-200"
              }`}
            onClick={() => selectable && handleSelect(addr)}
          >
            {addr.isDefault && (
              <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 rounded-t-lg text-sm font-medium">
                Predeterminado
              </div>
            )}

            <div className={addr.isDefault ? "mt-8" : ""}>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {addr.nombre}
              </h3>
              <div className="space-y-1 text-gray-900">
                <p>{addr.street}</p>
                <p>{addr.number}</p>
                <p>{addr.postal}</p>
                <p>{addr.city}</p>
                <p>{addr.province}</p>
              </div>
            </div>

            {enableEdit && (
              <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                {!addr.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(addr.nombre);
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(addr.nombre);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {children
        ? children({
          addresses,
          loading,
          error,
          handleDelete,
          handleSetDefault,
          handleEdit,
          handleAddNew,
          handleSelect,
          selectedAddress,
          refetch,
        })
        : defaultView
          ? renderDefaultView()
          : null}

      <EditAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={editingAddress}
        onSave={handleAddressUpdate}
      />
    </>
  );
};
