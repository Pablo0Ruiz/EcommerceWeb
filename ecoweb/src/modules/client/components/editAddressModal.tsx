"use client";
import { useEffect } from "react";
import { Address } from "@/modules/auth/typesAuth";
import { useForm } from "react-hook-form";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address | null;
  onSave: (address: Address) => void;
}



export const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  address,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>();

  useEffect(() => {
    if (address) {
      reset(address);
    } else {
      reset({
        nombre: "",
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
        isDefault: false,
      });
    }
  }, [address, reset]);

  const onSubmit = (data: Address) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          {address ? "Editar dirección" : "Añadir nueva dirección"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { name: "nombre", label: "Nombre de la dirección*", placeholder: "Ej: Casa, Trabajo..." },
            { name: "street", label: "Calle*", placeholder: "Ej: Calle Mayor" },
            { name: "number", label: "Número*", placeholder: "Ej: 12" },
            { name: "city", label: "Ciudad*", placeholder: "" },
            { name: "postal", label: "Código postal*", placeholder: "" },
            { name: "province", label: "Provincia*", placeholder: "" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof Address, { required: "Este campo es obligatorio" })}
                className="w-full px-3 py-2 border rounded text-gray-900"
                placeholder={field.placeholder}
              />
              {errors[field.name as keyof Address] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name as keyof Address]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("isDefault")}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Establecer como dirección predeterminada
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
