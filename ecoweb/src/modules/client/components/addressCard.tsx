'use client'
import { Address } from "@/modules/auth/typesAuth";

interface Props {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault?: () => void;
}

export const AddressCard: React.FC<Props> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
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

      <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap gap-3">
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-green-600 hover:text-green-800 text-sm font-medium underline"
          >
            Establecer como predeterminado
          </button>
        )}
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
        >
          Editar
        </button>
        <button 
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};